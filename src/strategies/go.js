import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { runInstallWithProgress, log } from '../logger.js';

/**
 * Go execution strategy (Under Development / Experimental)
 */
export const goStrategy = {
  name: 'go',

  async install(dir, detection) {
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
      log.dim('Go project — skipping module download.');
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
