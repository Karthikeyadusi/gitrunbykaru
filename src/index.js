import { cloneRepo } from './clone.js';
import { detectProject } from './detect.js';
import { getStrategy } from './strategies/index.js';
import { spawnProject } from './runner.js';
import { log, printBanner, printSuccess, printError, printWarning } from './logger.js';
import { rmSync } from 'fs';
import * as readline from 'readline/promises';

export async function run(repoUrl, options = {}) {
  printBanner();

  // Validate URL
  if (!repoUrl || !repoUrl.includes('github.com')) {
    printError('Please provide a valid GitHub URL.');
    printError('Example: gitrunbykaru https://github.com/user/repo');
    process.exit(1);
  }

  // Normalize URL (strip .git suffix if present)
  const url = repoUrl.replace(/\.git$/, '');
  let tmpDir = null;

  // Cleanup handler
  const cleanup = () => {
    if (tmpDir && !options.keep) {
      try {
        rmSync(tmpDir, { recursive: true, force: true });
        log.dim(`Cleaned up ${tmpDir}`);
      } catch {
        // best effort
      }
    }
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', () => {
    if (tmpDir && !options.keep) {
      try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* best effort */ }
    }
  });

  try {
    // Step 1: Clone
    tmpDir = await cloneRepo(url);

    // Step 2: Detect
    let detection = await detectProject(tmpDir);

    if (!detection) {
      printWarning("Couldn't detect project type automatically.");
      
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      console.log('\nWhat type of project is this?');
      console.log('1) Node.js');
      console.log('2) Python');
      console.log('3) Static HTML');
      console.log('0) Exit');

      const answer = await rl.question('\nEnter number (1-3): ');
      
      if (answer === '1') {
        const cmd = await rl.question('Run command (default: npm start): ');
        detection = { type: 'node', label: 'Node.js (manual)', runCommand: cmd || 'npm start', installCommand: 'npm install', port: 3000 };
      } else if (answer === '2') {
        const cmd = await rl.question('Run command (default: python main.py): ');
        detection = { type: 'python', label: 'Python (manual)', runCommand: cmd || 'python main.py', installCommand: 'pip install -r requirements.txt', port: 8000 };
      } else if (answer === '3') {
        detection = { type: 'static', label: 'Static HTML (manual)', runCommand: null, installCommand: null, port: 8080 };
      } else {
        process.exit(1);
      }
      rl.close();
    }

    log.info(`Detected  ${detection.label}`);

    // Step 3: Get strategy
    const strategy = getStrategy(detection.type);

    if (!strategy) {
      printWarning(`No strategy available for "${detection.type}" projects yet.`);
      printWarning('Supported: Node.js, Python, Static HTML');
      process.exit(1);
    }

    // Step 4: Install
    await strategy.install(tmpDir, detection);

    // Step 5: Run
    await spawnProject(tmpDir, detection, strategy, options);

  } catch (err) {
    printError(err.message || String(err));
    if (tmpDir && !options.keep) {
      try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* best effort */ }
    }
    process.exit(1);
  }
}