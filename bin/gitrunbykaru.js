#!/usr/bin/env node
import { program } from 'commander';
import { run } from '../src/index.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

program
  .name('gitrunbykaru')
  .description('Run any GitHub repo locally in seconds — no setup, no friction.')
  .version(pkg.version)
  .argument('[target]', 'GitHub repository URL or local project path')
  .option('-p, --port <port>', 'preferred port (tool will still detect from app output)')
  .option('--no-open', 'skip auto-opening the browser')
  .option('--keep', 'keep the cloned temp directory after exit')
  .option('--json', 'output machine-readable RuntimeSession JSON payload')
  .option('--mcp', 'start Anthropic Model Context Protocol (MCP) stdio server')
  .action(async (target, options) => {
    if (options.mcp) {
      await import('../src/mcp/server.js');
      return;
    }
    await run(target || '.', options);
  });

program.parse();