import { execSync, spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { runInstallWithProgress, log } from '../logger.js';

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

    // Create a venv to avoid polluting global Python
    const venvDir = join(dir, '.gitrunbykaru-venv');
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

    await runInstallWithProgress(installCmd, { cwd: dir, timeout: 300000 }, 'Installing Python packages');
  },

  getRunCommand(detection, dir) {
    if (dir) {
      const venvDir = join(dir, '.gitrunbykaru-venv');
      const pyBin = process.platform === 'win32'
        ? join(venvDir, 'Scripts', 'python')
        : join(venvDir, 'bin', 'python');
      if (existsSync(pyBin)) {
        // Use the venv python binary
        return detection.runCommand.replace(/^python/, `"${pyBin}"`);
      }
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