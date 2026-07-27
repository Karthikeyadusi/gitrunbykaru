import { spawnSync } from 'child_process';
import { runInstallWithProgress, log } from '../logger.js';

export const nodeStrategy = {
  name: 'node',

  async install(dir, detection) {
    // If they use a package manager other than npm, make sure it executes via corepack/npx if not installed
    let installCmd = detection.installCommand;
    if (installCmd.startsWith('yarn') && !checkCommand('yarn')) installCmd = `npx ${installCmd}`;
    if (installCmd.startsWith('pnpm') && !checkCommand('pnpm')) installCmd = `npx ${installCmd}`;
    if (installCmd.startsWith('bun') && !checkCommand('bun')) installCmd = `npx ${installCmd}`;

    try {
      await runInstallWithProgress(installCmd, { cwd: dir, timeout: 600000 }, 'Installing dependencies');
    } catch (err) {
      if (installCmd.includes('npm ci')) {
        log.warn('npm ci failed, falling back to npm install...');
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