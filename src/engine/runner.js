import { spawn, spawnSync } from 'child_process';
import openBrowser from 'open';
import readline from 'readline';
import { verifyHttpServerReady } from './readiness.js';

const PORT_TIMEOUT_MS = 45000;

export async function spawnProcessTree(dir, detection, strategy, options = {}, logger = {}) {
  const runCmd = strategy.getRunCommand(detection, dir);
  const portPattern = strategy.portPattern;

  if (logger && typeof logger.step === 'function') {
    logger.step(`Starting  ${runCmd}`);
    logger.dim('─'.repeat(48));
  }

  return new Promise((resolve, reject) => {
    let fullCommand = runCmd;
    if (runCmd.startsWith('yarn ') && !checkCommand('yarn')) fullCommand = `npx ${runCmd}`;
    if (runCmd.startsWith('pnpm ') && !checkCommand('pnpm')) fullCommand = `npx ${runCmd}`;
    if (runCmd.startsWith('bun ') && !checkCommand('bun')) fullCommand = `npx ${runCmd}`;

    const [bin, ...args] = parseCommand(fullCommand);

    const child = spawn(bin, args, {
      cwd: dir,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: process.platform === 'win32',
      env: {
        ...process.env,
        FORCE_COLOR: '1',
        PORT: String(options.port || detection.port),
      },
    });

    let portFound = false;
    let detectedPort = options.port || detection.port;
    let portTimer = null;

    const killChild = () => {
      if (process.platform === 'win32') {
        try {
          spawnSync('taskkill', ['/pid', String(child.pid), '/f', '/t'], { stdio: 'ignore' });
        } catch { /* ignore */ }
      } else {
        try {
          child.kill('SIGINT');
        } catch { /* ignore */ }
      }
    };

    const checkForPort = (line) => {
      if (portFound) return;
      const cleanLine = line.replace(/\x1b\[[0-9;]*[mGK]/g, '');
      const match = cleanLine.match(portPattern);
      if (match) {
        const port = match[1] || match[2] || match[3] || match[4];
        if (port) {
          portFound = true;
          detectedPort = parseInt(port, 10);
          clearTimeout(portTimer);
          const url = `http://localhost:${detectedPort}`;
          if (logger && typeof logger.success === 'function') {
            logger.success(url);
          }
          if (options.open !== false) {
            verifyHttpServerReady(detectedPort)
              .then(() => {
                openBrowser(url).catch(() => {});
              });
          }
          resolve({ pid: child.pid, port: detectedPort, killChild });
        }
      }
    };

    const rlStdout = readline.createInterface({ input: child.stdout, terminal: false });
    rlStdout.on('line', checkForPort);

    const rlStderr = readline.createInterface({ input: child.stderr, terminal: false });
    rlStderr.on('line', checkForPort);

    child.stdout.on('data', (data) => {
      if (!options.quiet) process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      if (!options.quiet) process.stderr.write(data);
    });

    child.on('error', (err) => {
      clearTimeout(portTimer);
      rlStdout.close();
      rlStderr.close();
      reject(err);
    });

    child.on('close', (code) => {
      clearTimeout(portTimer);
      rlStdout.close();
      rlStderr.close();
      if (!portFound) {
        resolve({ pid: child.pid, port: detectedPort, killChild });
      }
    });

    portTimer = setTimeout(() => {
      if (!portFound) {
        if (logger && typeof logger.warning === 'function') {
          logger.warning(`No port detected after ${PORT_TIMEOUT_MS / 1000}s.`);
        }
        resolve({ pid: child.pid, port: detectedPort, killChild });
      }
    }, PORT_TIMEOUT_MS);
  });
}

function parseCommand(cmd) {
  const parts = [];
  let current = '';
  let inQuote = false;

  for (let i = 0; i < cmd.length; i++) {
    const ch = cmd[i];
    if (ch === '"') {
      inQuote = !inQuote;
    } else if (ch === ' ' && !inQuote) {
      if (current) { parts.push(current); current = ''; }
    } else {
      current += ch;
    }
  }
  if (current) parts.push(current);
  return parts;
}

function checkCommand(cmd) {
  try {
    const result = spawnSync(cmd, ['--version'], { stdio: 'pipe', shell: process.platform === 'win32' });
    return result.status === 0;
  } catch {
    return false;
  }
}
