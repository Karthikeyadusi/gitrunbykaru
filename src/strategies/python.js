import { execSync, spawnSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
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

    // Sanitize UTF-16LE encoding & filter out platform-incompatible packages (e.g. gunicorn on Windows)
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

    // Use --prefer-binary by default so pip downloads pre-built wheels instead of building C extensions from source
    const installCmd = detection.installCommand
      .replace(/^pip install/, `"${pipBin}" install --prefer-binary`)
      .replace(/^pipenv install/, `"${pipBin}" install`);

    try {
      await runInstallWithProgress(installCmd, { cwd: dir, timeout: 600000 }, 'Installing Python packages');
    } catch (err) {
      // Fallback: If pip install fails with strict pinned versions, try ignoring exact version locks
      if (installCmd.includes('-r requirements.txt')) {
        log.warn('Standard pip install encountered conflicting locks — retrying with loose version fallback...');
        const reqPath = join(dir, 'requirements.txt');
        if (existsSync(reqPath)) {
          const looseReqPath = join(dir, 'requirements.loose.txt');
          const content = readFileSync(reqPath, 'utf8').replace(/==[^\s\r\n]+/g, '');
          writeFileSync(looseReqPath, content, 'utf8');
          const fallbackCmd = `"${pipBin}" install --prefer-binary -r "${looseReqPath}"`;
          try {
            await runInstallWithProgress(fallbackCmd, { cwd: dir, timeout: 600000 }, 'Installing Python packages (loose fallback)');
          } catch {
            log.warn('Retrying package-by-package install fallback...');
            installRequirementsLineByLine(pipBin, looseReqPath, dir);
          }
        }
      }
    }

    // Check for missing unlisted imports (skipping local project files)
    const reqPath = join(dir, 'requirements.txt');
    const missingImports = findMissingImports(dir, reqPath);
    if (missingImports.length > 0) {
      log.dim(`→ Self-healing missing Python imports: ${missingImports.join(', ')}`);
      try {
        execSync(`"${pipBin}" install --prefer-binary ${missingImports.join(' ')}`, { cwd: dir, stdio: 'pipe' });
      } catch { /* ignore if install fails */ }
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
    let content = '';

    if (buffer.length >= 2 && ((buffer[0] === 0xff && buffer[1] === 0xfe) || (buffer[0] === 0xfe && buffer[1] === 0xff) || buffer.includes(0x00))) {
      content = buffer[0] === 0xff && buffer[1] === 0xfe
        ? buffer.toString('utf16le')
        : buffer.toString('utf16le').replace(/\0/g, '');
      log.dim('→ Converted requirements.txt from UTF-16 encoding to UTF-8');
    } else {
      content = buffer.toString('utf8');
    }

    // On Windows, remove Unix-only WSGI servers that crash pip install (e.g. gunicorn, uvloop, uwsgi)
    if (process.platform === 'win32') {
      const lines = content.split(/\r?\n/);
      const filtered = lines.filter(line => {
        const pkg = line.trim().toLowerCase().split(/[=<>&~]/)[0];
        return !['gunicorn', 'uvloop', 'pylibmc', 'uwsgi'].includes(pkg);
      });
      content = filtered.join('\n');
    }

    writeFileSync(reqPath, content, 'utf8');
  } catch { /* ignore */ }
}

function installRequirementsLineByLine(pipBin, reqPath, dir) {
  if (!existsSync(reqPath)) return;
  try {
    const lines = readFileSync(reqPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const pkg = line.trim();
      if (!pkg || pkg.startsWith('#')) continue;
      try {
        execSync(`"${pipBin}" install --prefer-binary ${pkg}`, { cwd: dir, stdio: 'pipe' });
      } catch { /* ignore single broken package */ }
    }
  } catch { /* ignore */ }
}

function findMissingImports(dir, reqPath) {
  const stdLib = new Set([
    'sys', 'os', 're', 'json', 'time', 'datetime', 'math', 'random', 'typing',
    'pathlib', 'functools', 'collections', 'itertools', 'threading', 'asyncio',
    'subprocess', 'http', 'urllib', 'string', 'hashlib', 'base64', 'unittest',
    'logging', 'io', 'csv', 'copy', 'tempfile', 'shutil', 'platform', 'inspect',
    'traceback', 'socket', 'email', 'enum', 'dataclasses', 'abc', 'typing_extensions'
  ]);

  const reqContent = existsSync(reqPath)
    ? readFileSync(reqPath, 'utf8').toLowerCase().replace(/_/g, '-')
    : '';

  const missing = new Set();

  try {
    const pyFiles = readdirSync(dir).filter(f => f.endsWith('.py'));
    for (const file of pyFiles) {
      const code = readFileSync(join(dir, file), 'utf8');
      const matches = code.matchAll(/(?:from|import)\s+([a-zA-Z0-9_]+)/g);
      for (const m of matches) {
        const mod = m[1].toLowerCase();
        if (stdLib.has(mod)) continue;

        // Skip local project files and directories
        if (existsSync(join(dir, `${mod}.py`)) || existsSync(join(dir, mod))) continue;

        const normalizedPkg = mod.replace(/_/g, '-');
        if (!reqContent.includes(normalizedPkg)) {
          missing.add(normalizedPkg);
        }
      }
    }
  } catch { /* ignore */ }

  return Array.from(missing);
}