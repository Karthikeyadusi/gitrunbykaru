import { spawnSync } from 'child_process';
import { exec } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Go execution strategy (Under Development / Experimental)
 */
export const goStrategy = {
  name: 'go',

  async install(dir, detection, logger = {}) {
    const log = logger;
    const runInstallWithProgress = createInstallProgress(log);

    if (!ensureGoInPath()) {
      throw new Error('Go toolchain is not installed or not found on PATH. Please install Go from https://go.dev/dl/');
    }

    if (detection.installCommand) {
      await runInstallWithProgress(
        detection.installCommand,
        { cwd: dir, timeout: 300000 },
        'Downloading Go modules'
      );
    } else {
      log.dim?.('Go project — skipping module download.');
    }
  },

  getRunCommand(detection) {
    ensureGoInPath();
    return detection.runCommand || 'go run .';
  },

  // Matches Go server output formats (Gin, Fiber, Echo, standard net/http)
  portPattern: /(?:localhost|127\.0\.0\.1|0\.0\.0\.0):(\d{4,5})|(?:listening on|Listening and serving HTTP on|started at)\s*:?\s*(?::?(\d{4,5}))/i,
};

function ensureGoInPath() {
  try {
    const result = spawnSync('go', ['version'], { stdio: 'pipe', shell: process.platform === 'win32' });
    if (result.status === 0) return true;
  } catch { /* ignore */ }

  if (process.platform === 'win32') {
    const standardDirs = [
      'C:\\Program Files\\Go\\bin',
      'C:\\Go\\bin',
      join(process.env.USERPROFILE || '', 'go', 'bin'),
      join(process.env.LOCALAPPDATA || '', 'Programs', 'Go', 'bin'),
    ];
    for (const dir of standardDirs) {
      if (existsSync(join(dir, 'go.exe')) || existsSync(dir)) {
        process.env.PATH = `${dir};${process.env.PATH}`;
        return true;
      }
    }
  }

  return false;
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
        timeout: options.timeout || 300000,
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