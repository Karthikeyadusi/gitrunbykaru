#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { RemoteWorkspaceProvider } from '../providers/remote.js';
import { LocalWorkspaceProvider } from '../providers/local.js';

const activeSessions = new Map();

const server = new Server(
  {
    name: 'gitrunbykaru-mcp',
    version: '2.0.3',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/** Expose available MCP tools to AI Agents */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'gitrun_remote',
        description: 'Clones a remote GitHub repository to an ephemeral workspace, auto-mocks .env, installs dependencies, and launches dev server on localhost.',
        inputSchema: {
          type: 'object',
          properties: {
            repoUrl: {
              type: 'string',
              description: 'GitHub repository URL (e.g. https://github.com/expressjs/express)'
            },
            preferredPort: {
              type: 'number',
              description: 'Optional preferred listening port'
            }
          },
          required: ['repoUrl']
        }
      },
      {
        name: 'gitrun_local',
        description: 'Detects framework, auto-mocks .env, heals lockfiles, and launches dev server in-place for a local workspace without deleting files on exit.',
        inputSchema: {
          type: 'object',
          properties: {
            workspacePath: {
              type: 'string',
              description: 'Local workspace directory path (defaults to current working directory ".")'
            },
            preferredPort: {
              type: 'number',
              description: 'Optional preferred listening port'
            }
          }
        }
      },
      {
        name: 'gitrun_stop',
        description: 'Stops a running RuntimeSession by sessionId, killing process trees and executing cleanup.',
        inputSchema: {
          type: 'object',
          properties: {
            sessionId: {
              type: 'string',
              description: 'The unique sessionId returned by gitrun_remote or gitrun_local'
            }
          },
          required: ['sessionId']
        }
      }
    ]
  };
});

/** Handle MCP tool invocations from AI Agents */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'gitrun_remote') {
      const repoUrl = args.repoUrl;
      const port = args.preferredPort ? Number(args.preferredPort) : undefined;
      const session = await RemoteWorkspaceProvider.acquireAndRun(repoUrl, {
        quiet: true,
        open: false,
        port
      });

      activeSessions.set(session.sessionId, session);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(session.toJSON(), null, 2)
          }
        ]
      };
    }

    if (name === 'gitrun_local') {
      const targetPath = args.workspacePath || '.';
      const port = args.preferredPort ? Number(args.preferredPort) : undefined;
      const session = await LocalWorkspaceProvider.acquireAndRun(targetPath, {
        quiet: true,
        open: false,
        port
      });

      activeSessions.set(session.sessionId, session);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(session.toJSON(), null, 2)
          }
        ]
      };
    }

    if (name === 'gitrun_stop') {
      const sessionId = args.sessionId;
      const session = activeSessions.get(sessionId);
      if (!session) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ status: 'error', message: `Session ID "${sessionId}" not found or already stopped.` }, null, 2)
            }
          ],
          isError: true
        };
      }

      await session.stop();
      activeSessions.delete(sessionId);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ status: 'stopped', sessionId }, null, 2)
          }
        ]
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (err) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ status: 'error', message: err.message || String(err) }, null, 2)
        }
      ],
      isError: true
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Fatal MCP Server error:', err);
  process.exit(1);
});
