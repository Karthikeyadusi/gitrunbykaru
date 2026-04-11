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
  .argument('<repo-url>', 'GitHub repository URL (e.g. https://github.com/user/repo)')
  .option('-p, --port <port>', 'preferred port (tool will still detect from app output)')
  .option('--no-open', 'skip auto-opening the browser')
  .option('--keep', 'keep the cloned temp directory after exit')
  .action(async (repoUrl, options) => {
    await run(repoUrl, options);
  });

program.parse();