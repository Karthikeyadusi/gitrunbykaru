import { execSync, spawnSync } from 'child_process';
import { createSpinner, log } from '../logger.js';

export const nodeStrategy = {
  name: 'node',

  async install(dir, detection) {
    const spinner = createSpinner(`Installing  dependencies...`);
    spinner.start();
    try {
      // If they use a package manager other than npm, make sure it executes via corepack/npx if not installed
      let installCmd = detection.installCommand;
      if (installCmd.startsWith('yarn') && !checkCommand('yarn')) installCmd = `npx ${installCmd}`;
      if (installCmd.startsWith('pnpm') && !checkCommand('pnpm')) installCmd = `npx ${installCmd}`;
      if (installCmd.startsWith('bun') && !checkCommand('bun')) installCmd = `npx ${installCmd}`;

      execSync(installCmd, {
        cwd: dir,
        stdio: 'pipe',
        timeout: 600000,
      });
      spinner.succeed(`Installed  node_modules ready`);
    } catch (err) {
      spinner.fail('Dependency install failed');
      const stderr = err.stderr?.toString() || err.message;
      throw new Error(`Dependency install failed (Exit code: ${err.status}):\n${stderr.slice(0, 1500)}`);
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