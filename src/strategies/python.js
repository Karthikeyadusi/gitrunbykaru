import { execSync, spawnSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createSpinner, log } from '../logger.js';

export const pythonStrategy = {
  name: 'python',

  async install(dir, detection) {
    // Check python is available
    const pyBin = getPythonBin();
    if (!pyBin) {
      throw new Error('Python is not installed or not in PATH. Please install Python 3.');
    }

    if (!detection.installCommand) {
      log.dim('No install command needed for this Python project.');
      return;
    }

    const spinner = createSpinner('Installing  Python dependencies...');
    spinner.start();

    try {
      // Create a venv to avoid polluting global Python
      const venvDir = join(dir, '.gitrunbykarubykaru-venv');
      if (!existsSync(venvDir)) {
        execSync(`${pyBin} -m venv "${venvDir}"`, { cwd: dir, stdio: 'pipe' });
      }

      // Use venv pip
      const pipBin = process.platform === 'win32'
        ? join(venvDir, 'Scripts', 'pip')
        : join(venvDir, 'bin', 'pip');

      const installCmd = detection.installCommand
        .replace(/^pip install/, `"${pipBin}" install`)
        .replace(/^pipenv install/, `"${pipBin}" install`);

      execSync(installCmd, {
        cwd: dir,
        stdio: 'pipe',
        timeout: 120000,
      });

      // Store venv path so runner can use the right python binary
      detection._venvDir = venvDir;
      detection._pyBin = process.platform === 'win32'
        ? join(venvDir, 'Scripts', 'python')
        : join(venvDir, 'bin', 'python');

      spinner.succeed('Installed  Python packages ready');
    } catch (err) {
      spinner.fail('pip install failed');
      const stderr = err.stderr?.toString() || err.message;
      throw new Error(`Python dependency install failed:\n${stderr.slice(0, 500)}`);
    }
  },

  getRunCommand(detection) {
    if (detection._pyBin) {
      // Use the venv python binary
      return detection.runCommand.replace(/^python/, `"${detection._pyBin}"`);
    }
    return detection.runCommand;
  },

  portPattern: /(?:localhost|127\.0\.0\.1|0\.0\.0\.0):(\d{4,5})|(?:Running on|Serving on|Uvicorn running on)\s+.*?:(\d{4,5})|port\s+(\d{4,5})/i,
};

function getPythonBin() {
  for (const bin of ['python3', 'python']) {
    try {
      const result = spawnSync(bin, ['--version'], { stdio: 'pipe' });
      if (result.status === 0) return bin;
    } catch { /* try next */ }
  }
  return null;
}