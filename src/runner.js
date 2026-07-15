import { spawn, spawnSync } from 'child_process';
import { log, printSuccess, printError, printWarning } from './logger.js';
import openBrowser from 'open';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import readline from 'readline';
import http from 'http';

const PORT_TIMEOUT_MS = 45000; // Wait up to 45s for the port to appear in output

export async function spawnProject(dir, detection, strategy, options = {}) {
  const runCmd = strategy.getRunCommand(detection, dir);
  const portPattern = strategy.portPattern;

  // Auto-mocking .env files
  const envPath = join(dir, '.env');
  if (!existsSync(envPath)) {
    const examples = ['.env.example', '.env.local.example', '.env.sample', '.env.template', 'env.example'];
    const foundExample = examples.find(ex => existsSync(join(dir, ex)));
    
    if (foundExample) {
      log.dim(`→ Auto-generating .env from ${foundExample}`);
      const content = readFileSync(join(dir, foundExample), 'utf8');
      
      // Inject dummy keys into empty variables to prevent immediate crashes
      const mockedContent = content.split('\n').map(line => {
        const trimmed = line.trim();
        // Ignore lines that don't look like variable definitions
        if (!trimmed || trimmed.startsWith('#')) return line;
        
        // Handle "KEY=VALUE", "KEY=", "KEY" situations
        const splitIdx = trimmed.indexOf('=');
        // If no '=', it might just be listed in the example without a value
        if (splitIdx === -1) {
             const key = trimmed;
             let val = 'gitrunbykaru_dummy_key_12345';
             if (key.toUpperCase().includes('URL') || key.toUpperCase().includes('URI') || key.toUpperCase().includes('ENDPOINT')) {
               val = 'http://localhost:9999';
             }
             return `${key}=${val}`;
        }
        
        const key = trimmed.slice(0, splitIdx).trim();
        let val = trimmed.slice(splitIdx + 1).trim();
        
        // Check for common indicator that it's empty / needs filling
        if (!val || val === '""' || val === "''" || val === '<your-key-here>' || val.includes('<') || val.includes('[')) {
          if (key.toUpperCase().includes('URL') || key.toUpperCase().includes('URI') || key.toUpperCase().includes('ENDPOINT')) {
             val = 'http://localhost:9999';
          } else {
             val = 'gitrunbykaru_dummy_key_12345';
          }
        }
        return `${key}=${val}`;
      }).join('\n');
      
      writeFileSync(envPath, mockedContent);
    }
  }

  log.step(`Starting  ${runCmd}`);
  log.dim('─'.repeat(48));

  return new Promise((resolve, reject) => {
    // Check if the command is a package manager we need to run via npx
    let fullCommand = runCmd;
    if (runCmd.startsWith('yarn ') && !checkCommand('yarn')) fullCommand = `npx ${runCmd}`;
    if (runCmd.startsWith('pnpm ') && !checkCommand('pnpm')) fullCommand = `npx ${runCmd}`;
    if (runCmd.startsWith('bun ') && !checkCommand('bun')) fullCommand = `npx ${runCmd}`;

    // Split command into binary + args (handles quoted paths)
    const [bin, ...args] = parseCommand(fullCommand);

    const child = spawn(bin, args, {
      cwd: dir,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: process.platform === 'win32', // Windows needs shell for npx etc.
      env: {
        ...process.env,
        // Disable color stripping — let the app output naturally
        FORCE_COLOR: '1',
        // Some frameworks respect this for port
        PORT: String(detection.port),
      },
    });

    let portFound = false;
    let portTimer = null;

    const checkForPort = (line) => {
      if (portFound) return;
      // Strip ANSI color codes from the terminal output before matching
      const cleanLine = line.replace(/\x1b\[[0-9;]*[mGK]/g, '');
      const match = cleanLine.match(portPattern);
      if (match) {
        const port = match[1] || match[2] || match[3] || match[4];
        if (port) {
          portFound = true;
          clearTimeout(portTimer);
          const url = `http://localhost:${port}`;
          printSuccess(url);
          if (options.open !== false) {
            // Verify the HTTP server is responsive before opening browser
            verifyHttpServerReady(parseInt(port, 10))
              .then(() => {
                openBrowser(url).catch(() => {});
              });
          }
        }
      }
    };

    const killChild = () => {
      if (process.platform === 'win32') {
        try {
          spawnSync('taskkill', ['/pid', String(child.pid), '/f', '/t'], { stdio: 'ignore' });
        } catch {
          // ignore if process already exited
        }
      } else {
        try {
          child.kill('SIGINT');
        } catch {
          // ignore
        }
      }
    };

    const rlStdout = readline.createInterface({ input: child.stdout, terminal: false });
    rlStdout.on('line', checkForPort);

    const rlStderr = readline.createInterface({ input: child.stderr, terminal: false });
    rlStderr.on('line', checkForPort);

    let sigintHandler = null;
    let sigtermHandler = null;

    const cleanupResources = () => {
      clearTimeout(portTimer);
      rlStdout.close();
      rlStderr.close();
      if (sigintHandler) {
        process.off('SIGINT', sigintHandler);
      }
      if (sigtermHandler) {
        process.off('SIGTERM', sigtermHandler);
      }
    };

    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    child.on('error', (err) => {
      cleanupResources();
      if (err.code === 'ENOENT') {
        reject(new Error(`Command not found: "${bin}"\nMake sure it's installed and in your PATH.`));
      } else {
        reject(err);
      }
    });

    child.on('close', (code) => {
      cleanupResources();
      if (code !== 0 && code !== null) {
        log.dim('─'.repeat(48));
        printError(`Process exited with code ${code}`);
        printWarning('The project crashed. Check the output above for errors.');
      }
      resolve();
    });

    // If no port detected in time, show a helpful hint
    portTimer = setTimeout(() => {
      if (!portFound) {
        printWarning(`No port detected after ${PORT_TIMEOUT_MS / 1000}s.`);
        printWarning(`Try opening http://localhost:${detection.port} manually.`);
      }
    }, PORT_TIMEOUT_MS);

    // Forward SIGINT and SIGTERM to child so it can clean up
    sigintHandler = () => {
      killChild();
    };
    sigtermHandler = () => {
      killChild();
    };
    process.on('SIGINT', sigintHandler);
    process.on('SIGTERM', sigtermHandler);
  });
}

/**
 * Naive command parser: splits on spaces but respects double-quoted segments.
 * Handles paths like: "C:\Program Files\Python\python" run app.py
 */
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

function verifyHttpServerReady(port, host = 'localhost', timeout = 5000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const check = () => {
      if (Date.now() - start > timeout) {
        resolve(false);
        return;
      }
      const req = http.request({
        method: 'GET',
        host,
        port,
        path: '/',
        timeout: 500,
      }, (res) => {
        res.resume(); // consume response stream
        resolve(true);
      });
      req.once('error', () => {
        setTimeout(check, 100);
      });
      req.once('timeout', () => {
        req.destroy();
        setTimeout(check, 100);
      });
      req.end();
    };
    check();
  });
}