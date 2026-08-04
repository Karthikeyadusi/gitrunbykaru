import { execSync, spawnSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { runInstallWithProgress, log } from '../logger.js';

export const pythonStrategy = {
  name: 'python',

  async install(dir, detection) {
    const pyBin = getPythonBin();
    if (!pyBin) {
      throw new Error('Python is not installed or not in PATH. Please install Python 3.');
    }

    if (!detection.installCommand) {
      log.dim('No install command needed for this Python project.');
      return;
    }

    // Sanitize UTF-16LE encoded requirements.txt (common PowerShell redirection bug)
    sanitizeRequirementsFile(dir);

    // Create a venv to avoid polluting global Python
    const venvDir = join(dir, '.gitrunbykaru-venv');
    if (!existsSync(venvDir)) {
      execSync(`${pyBin} -m venv "${venvDir}"`, { cwd: dir, stdio: 'pipe' });
    }

    // Use venv pip
    const pipBin = process.platform === 'win32'
      ? join(venvDir, 'Scripts', 'pip')
      : join(venvDir, 'bin', 'pip');

    // Upgrade pip in venv silently to avoid wheel build failures on modern Python versions
    try {
      execSync(`"${pipBin}" install --upgrade pip setuptools wheel`, { cwd: dir, stdio: 'pipe' });
    } catch { /* ignore if offline */ }

    const installCmd = detection.installCommand
      .replace(/^pip install/, `"${pipBin}" install`)
      .replace(/^pipenv install/, `"${pipBin}" install`);

    try {
      await runInstallWithProgress(installCmd, { cwd: dir, timeout: 300000 }, 'Installing Python packages');
    } catch (err) {
      // Fallback: If pip install fails, try with --prefer-binary
      if (installCmd.includes('-r requirements.txt')) {
        log.warning('Standard pip install failed — retrying with --prefer-binary fallback...');
        const fallbackCmd = installCmd.replace('-r requirements.txt', '--prefer-binary -r requirements.txt');
        await runInstallWithProgress(fallbackCmd, { cwd: dir, timeout: 300000 }, 'Installing Python packages (fallback)');
      } else {
        throw err;
      }
    }
  },

  getRunCommand(detection, dir) {
    if (dir) {
      const venvDir = join(dir, '.gitrunbykaru-venv');
      const pyBin = process.platform === 'win32'
        ? join(venvDir, 'Scripts', 'python')
        : join(venvDir, 'bin', 'python');
      if (existsSync(pyBin)) {
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

function sanitizeRequirementsFile(dir) {
  const reqPath = join(dir, 'requirements.txt');
  if (!existsSync(reqPath)) return;

  try {
    const buffer = readFileSync(reqPath);
    // Detect UTF-16 LE / BE BOM or null byte presence
    if (buffer.length >= 2 && ((buffer[0] === 0xff && buffer[1] === 0xfe) || (buffer[0] === 0xfe && buffer[1] === 0xff) || buffer.includes(0x00))) {
      let content = '';
      if (buffer[0] === 0xff && buffer[1] === 0xfe) {
        content = buffer.toString('utf16le');
      } else {
        content = buffer.toString('utf16le').replace(/\0/g, '');
      }
      writeFileSync(reqPath, content, 'utf8');
      log.dim('→ Converted requirements.txt from UTF-16 encoding to UTF-8');
    }
  } catch { /* ignore */ }
}