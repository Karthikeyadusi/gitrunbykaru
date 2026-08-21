import { spawnSync } from 'child_process';
import { runInstallWithProgress, log } from '../logger.js';

/**
 * Rust execution strategy (Under Development / Experimental)
 */
export const rustStrategy = {
  name: 'rust',

  async install(dir, detection) {
    if (!checkCargoInstalled()) {
      throw new Error('Cargo toolchain is not installed or not found on PATH. Please install Rust and Cargo from https://rustup.rs/');
    }

    if (detection.installCommand) {
      await runInstallWithProgress(
        detection.installCommand,
        { cwd: dir, timeout: 600000 },
        'Compiling Rust project'
      );
    } else {
      log.dim('Rust project — skipping compilation step.');
    }
  },

  getRunCommand(detection) {
    return detection.runCommand || 'cargo run';
  },

  // Matches Actix-web, Axum, Rocket, Warp, Poem listening output patterns
  portPattern: /(?:localhost|127\.0\.0\.1|0\.0\.0\.0):(\d{4,5})|(?:listening on|launched from|running on|serving at)\s*:?\s*(?:https?:\/\/[^:]+:)?(\d{4,5})/i,
};

function checkCargoInstalled() {
  try {
    const result = spawnSync('cargo', ['--version'], { stdio: 'pipe', shell: process.platform === 'win32' });
    return result.status === 0;
  } catch {
    return false;
  }
}
