import { RemoteWorkspaceProvider, LocalWorkspaceProvider } from '../core/index.js';
import { cliUi } from './ui.js';
import { createCliLogger } from './logger.js';

export async function runCli(target, options = {}) {
  // Handle --mcp helper flag
  if (options.mcp) {
    printMcpGuide();
    return;
  }

  const isJson = options.json === true;
  const logger = isJson ? {} : createCliLogger();

  if (!isJson) {
    logger.printBanner?.();
  }

  if (!target) {
    if (!isJson) {
      logger.printError('Please provide a valid GitHub URL or local workspace directory.');
      logger.printError('Example: gitrunbykaru https://github.com/user/repo');
      logger.printError('For MCP setup info: gitrunbykaru --mcp');
    } else {
      console.log(JSON.stringify({ status: 'error', message: 'Missing target argument' }));
    }
    process.exit(1);
  }

  let activeSession = null;
  let isCleaningUp = false;

  const cleanup = async (signal) => {
    if (isCleaningUp) return;
    isCleaningUp = true;

    if (signal && !isJson) {
      console.log('');
      logger.step?.(`Received ${signal} — terminating process tree...`);
    }

    if (activeSession) {
      await activeSession.stop();
    }
    process.exit(0);
  };

  process.on('SIGINT', () => cleanup('SIGINT'));
  process.on('SIGTERM', () => cleanup('SIGTERM'));

  try {
    const isGithub = target.includes('github.com');

    if (isGithub) {
      activeSession = await RemoteWorkspaceProvider.acquireAndRun(target, options, logger);
    } else {
      activeSession = await LocalWorkspaceProvider.acquireAndRun(target, options, logger);
    }

    if (isJson) {
      console.log(JSON.stringify(activeSession.toJSON(), null, 2));
    } else {
      logger.dim?.('Press Ctrl+C to exit & stop session');
    }

  } catch (err) {
    if (isJson) {
      console.log(JSON.stringify({
        status: 'error',
        message: err.message || String(err)
      }));
    } else {
      logger.printError(err.message || String(err));
    }
    if (activeSession) {
      await activeSession.stop();
    }
    process.exit(1);
  }
}

function printMcpGuide() {
  logger.printBanner?.();
  console.log(`
🤖 GitRunByKaru Model Context Protocol (MCP) Setup Guide

GitRunByKaru includes a native MCP server so AI Agents (Cursor, Claude Desktop, VS Code)
can run and inspect repositories using the exact same execution engine.

📋 Copy-Paste Configuration (Cursor mcp.json / Claude Desktop):

{
  "mcpServers": {
    "gitrunbykaru": {
      "command": "npx",
      "args": ["-y", "gitrunbykaru-mcp"]
    }
  }
}

🛠️ Available MCP Tools:
- gitrun_remote({ repoUrl })      : Ephemeral remote GitHub repo launch
- gitrun_local({ workspacePath }): In-place local workspace dev server launch
- gitrun_stop({ sessionId })     : Clean process tree termination

📖 Full Documentation: https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/docs/MCP_GUIDE.md
`);
}
