import { execSync, spawnSync } from 'child_process';
import { createSpinner, log } from '../logger.js';

export const staticStrategy = {
  name: 'static',

  async install(dir, detection) {
    // No install needed for static sites
    log.dim('Static site — no dependencies to install.');
  },

  getRunCommand(detection) {
    // Prefer npx serve, fall back to python http.server
    const hasNode = checkCommand('node');
    const hasPython = checkCommand('python3') || checkCommand('python');

    if (hasNode) {
      return `npx serve . -p ${detection.port} --no-clipboard`;
    } else if (hasPython) {
      return `python3 -m http.server ${detection.port}`;
    }
    throw new Error('Neither Node.js nor Python found — cannot serve static files.');
  },

  portPattern: /(?:localhost|127\.0\.0\.1):(\d{4,5})|Serving!\s+.*?:(\d{4,5})|port\s+(\d{4,5})/i,
};

function checkCommand(cmd) {
  try {
    const result = spawnSync(cmd, ['--version'], { stdio: 'pipe' });
    return result.status === 0;
  } catch {
    return false;
  }
}