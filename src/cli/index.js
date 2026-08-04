import { RemoteWorkspaceProvider } from '../providers/remote.js';
import { LocalWorkspaceProvider } from '../providers/local.js';
import { cliUi } from './ui.js';

export async function runCli(target, options = {}) {
  // Handle --mcp helper flag
  if (options.mcp) {
    printMcpGuide();
    return;
  }

  const isJson = options.json === true;
  const logger = isJson ? {} : cliUi;

  if (!isJson) {
    cliUi.printBanner();
  }

  if (!target) {
    if (!isJson) {
      cliUi.printError('Please provide a valid GitHub URL or local workspace directory.');
      cliUi.printError('Example: gitrunbykaru https://github.com/user/repo');
      cliUi.printError('For MCP setup info: gitrunbykaru --mcp');
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
      cliUi.step(`Received ${signal} — terminating process tree...`);
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
      cliUi.dim('Press Ctrl+C to exit & stop session');
    }

  } catch (err) {
    if (isJson) {
      console.log(JSON.stringify({
        status: 'error',
        message: err.message || String(err)
      }));
    } else {
      cliUi.printError(err.message || String(err));
    }
    if (activeSession) {
      await activeSession.stop();
    }
    process.exit(1);
  }
}

function printMcpGuide() {
  cliUi.printBanner();
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
