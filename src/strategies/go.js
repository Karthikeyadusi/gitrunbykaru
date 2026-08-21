import { spawnSync } from 'child_process';
import { runInstallWithProgress, log } from '../logger.js';

export const goStrategy = {
  name: 'go',

  async install(dir, detection) {
    if (!checkGoInstalled()) {
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
    return detection.runCommand || 'go run .';
  },

  // Matches Go server output formats (Gin, Fiber, Echo, standard net/http)
  portPattern: /(?:localhost|127\.0\.0\.1|0\.0\.0\.0):(\d{4,5})|(?:listening on|Listening and serving HTTP on|started at)\s*:?\s*(?::?(\d{4,5}))/i,
};

function checkGoInstalled() {
  try {
    const result = spawnSync('go', ['version'], { stdio: 'pipe', shell: process.platform === 'win32' });
    return result.status === 0;
  } catch {
    return false;
  }
}
