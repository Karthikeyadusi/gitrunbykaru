import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { runInstallWithProgress, log } from '../logger.js';

export const goStrategy = {
  name: 'go',

  async install(dir, detection) {
    const goBin = getGoBin();
    if (!goBin) {
      throw new Error('Go toolchain is not installed or not found on PATH. Please install Go from https://go.dev/dl/');
    }

    if (detection.installCommand) {
      const installCmd = detection.installCommand.replace(/^go\s+/, `"${goBin}" `);
      await runInstallWithProgress(
        installCmd,
        { cwd: dir, timeout: 300000 },
        'Downloading Go modules'
      );
    } else {
      log.dim('Go project — skipping module download.');
    }
  },

  getRunCommand(detection) {
    const goBin = getGoBin() || 'go';
    const baseCmd = detection.runCommand || 'go run .';
    return baseCmd.replace(/^go\s+/, `"${goBin}" `);
  },

  // Matches Go server output formats (Gin, Fiber, Echo, standard net/http)
  portPattern: /(?:localhost|127\.0\.0\.1|0\.0\.0\.0):(\d{4,5})|(?:listening on|Listening and serving HTTP on|started at)\s*:?\s*(?::?(\d{4,5}))/i,
};

function getGoBin() {
  try {
    const result = spawnSync('go', ['version'], { stdio: 'pipe', shell: process.platform === 'win32' });
    if (result.status === 0) return 'go';
  } catch { /* ignore */ }

  if (process.platform === 'win32') {
    const standardPaths = [
      'C:\\Program Files\\Go\\bin\\go.exe',
      'C:\\Go\\bin\\go.exe',
      join(process.env.USERPROFILE || '', 'go', 'bin', 'go.exe'),
      join(process.env.LOCALAPPDATA || '', 'Programs', 'Go', 'bin', 'go.exe'),
    ];
    for (const p of standardPaths) {
      if (existsSync(p)) return p;
    }
  }

  return null;
}
