import { spawnSync } from 'child_process';
import { exec } from 'child_process';

export const nodeStrategy = {
  name: 'node',

  async install(dir, detection, logger = {}) {
    const log = logger;
    const runInstallWithProgress = createInstallProgress(log);

    // If they use a package manager other than npm, make sure it executes via corepack/npx if not installed
    let installCmd = detection.installCommand;
    if (installCmd.startsWith('yarn') && !checkCommand('yarn')) installCmd = `npx ${installCmd}`;
    if (installCmd.startsWith('pnpm') && !checkCommand('pnpm')) installCmd = `npx ${installCmd}`;
    if (installCmd.startsWith('bun') && !checkCommand('bun')) installCmd = `npx ${installCmd}`;

    try {
      await runInstallWithProgress(installCmd, { cwd: dir, timeout: 600000 }, 'Installing dependencies');
    } catch (err) {
      if (installCmd.includes('npm ci')) {
        log.warn?.('npm ci failed, falling back to npm install...');
        await runInstallWithProgress('npm install --prefer-offline --no-audit --no-fund', { cwd: dir, timeout: 600000 }, 'Installing dependencies (npm install)');
      } else {
        throw err;
      }
    }
  },

  getRunCommand(detection) {
    return detection.runCommand;
  },

  // Pattern to detect the running port from stdout/stderr
  portPattern: /(?:localhost|127\.0\.0\.1|0\.0\.0\.0):(\d{4,5})|(?:port|PORT|listening on)\s*:?\s*(\d{4,5})|(?:running at|started on)\s+.*?:(\d{4,5})/i,
};

function checkCommand(cmd) {
  try {
    const result = spawnSync(cmd, ['--version'], { stdio: 'pipe', shell: process.platform === 'win32' });
    return result.status === 0;
  } catch {
    return false;
  }
}

function createInstallProgress(log) {
  return function runInstallWithProgress(cmd, options, label = 'Installing dependencies...') {
    return new Promise((resolve, reject) => {
      const spinner = log.createSpinner ? log.createSpinner(label) : { start: () => {}, succeed: (msg) => log.success?.(msg), fail: (msg) => log.error?.(msg) };
      spinner.start();

      const startTime = Date.now();
      let currentPct = 0;
      let lastTickTime = Date.now();

      const interval = setInterval(() => {
        const elapsedSec = (Date.now() - startTime) / 1000;
        const now = Date.now();

        if (currentPct < 85) {
          const targetPct = Math.min(85, Math.floor(95 * (1 - Math.exp(-elapsedSec / 40))));
          if (currentPct < targetPct) {
            currentPct += 1;
          }
        } else if (currentPct < 99) {
          if (now - lastTickTime >= 2500) {
            currentPct += 1;
            lastTickTime = now;
          }
        }

        const filled = Math.round((currentPct / 100) * 20);
        const empty = 20 - filled;
        const bar = '█'.repeat(filled) + '░'.repeat(empty);
        log.step?.(`${label}  [${bar}] ${currentPct}% (${Math.floor(elapsedSec)}s)`);
      }, 80);

      exec(cmd, {
        cwd: options.cwd,
        timeout: options.timeout || 600000,
        maxBuffer: 20 * 1024 * 1024,
      }, (error, stdout, stderr) => {
        clearInterval(interval);
        if (error) {
          spinner.fail(`${label} failed`);
          const errObj = new Error(`Dependency install failed (Exit code: ${error.code || 1}):\n${(stderr || stdout || error.message).slice(0, 1500)}`);
          errObj.status = error.code || 1;
          errObj.stderr = stderr || stdout || error.message;
          reject(errObj);
        } else {
          const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
          spinner.succeed(`Installed dependencies ready (${totalTime}s)`);
          resolve({ stdout, stderr });
        }
      });
    });
  };
}