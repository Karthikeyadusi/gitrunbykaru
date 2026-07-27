import { exec } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

// ── Symbols ────────────────────────────────────────────────────────────────
const SYM = {
  info:    chalk.cyan('◆'),
  success: chalk.green('✔'),
  warn:    chalk.yellow('⚠'),
  error:   chalk.red('✖'),
  step:    chalk.magenta('→'),
  dim:     chalk.gray('·'),
};

// ── Core log functions ─────────────────────────────────────────────────────
export const log = {
  info:    (msg) => console.log(`  ${SYM.info}  ${chalk.cyan(msg)}`),
  step:    (msg) => console.log(`  ${SYM.step}  ${chalk.white(msg)}`),
  success: (msg) => console.log(`  ${SYM.success}  ${chalk.green(msg)}`),
  warn:    (msg) => console.log(`  ${SYM.warn}  ${chalk.yellow(msg)}`),
  error:   (msg) => console.log(`  ${SYM.error}  ${chalk.red(msg)}`),
  dim:     (msg) => console.log(`     ${chalk.gray(msg)}`),
};

// ── Spinner ────────────────────────────────────────────────────────────────
export function createSpinner(text) {
  return ora({
    text: `  ${text}`,
    spinner: 'dots',
    color: 'magenta',
    prefixText: ' ',
  });
}

// ── Progress Bar Execution ─────────────────────────────────────────────────
export function runInstallWithProgress(cmd, options, label = 'Installing dependencies...') {
  return new Promise((resolve, reject) => {
    const spinner = createSpinner(label);
    spinner.start();

    const startTime = Date.now();
    let currentPct = 0;
    let lastTickTime = Date.now();

    const interval = setInterval(() => {
      const elapsedSec = (Date.now() - startTime) / 1000;
      const now = Date.now();

      if (currentPct < 85) {
        // Curve tuned for an ~80-second average installation lifecycle
        const targetPct = Math.min(85, Math.floor(95 * (1 - Math.exp(-elapsedSec / 40))));
        if (currentPct < targetPct) {
          currentPct += 1;
        }
      } else if (currentPct < 99) {
        // Continuous micro-tick every 2.5s past 85% for long installs so it never stalls
        if (now - lastTickTime >= 2500) {
          currentPct += 1;
          lastTickTime = now;
        }
      }

      const filled = Math.round((currentPct / 100) * 20);
      const empty = 20 - filled;
      const bar = chalk.magenta('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));

      spinner.text = `${label}  [${bar}] ${chalk.cyan(`${currentPct}%`)} ${chalk.gray(`(${Math.floor(elapsedSec)}s)`)}`;
    }, 80);

    exec(cmd, {
      cwd: options.cwd,
      timeout: options.timeout || 600000,
      maxBuffer: 20 * 1024 * 1024,
    }, (error, stdout, stderr) => {
      clearInterval(interval);
      if (error) {
        spinner.fail(`${label} failed`);
        const errObj = new Error(`Dependency install failed (Exit code: ${error.code || 1}):\n${(stderr || stdout || error.message).slice(0, 1500)}`);
        errObj.status = error.code || 1;
        errObj.stderr = stderr || stdout || error.message;
        reject(errObj);
      } else {
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
        spinner.succeed(`Installed dependencies ready ${chalk.gray(`(${totalTime}s)`)}`);
        resolve({ stdout, stderr });
      }
    });
  });
}

// ── Banner ─────────────────────────────────────────────────────────────────
export function printBanner() {
  console.log('');
  console.log(
    chalk.bold.magenta('  gitrunbykaru') +
    chalk.dim('  —  run any GitHub repo in seconds')
  );
  console.log(chalk.gray('  ' + '─'.repeat(46)));
  console.log('');
}

// ── Success (the big moment) ───────────────────────────────────────────────
export function printSuccess(url) {
  console.log('');
  console.log(chalk.gray('  ' + '─'.repeat(46)));
  console.log('');
  console.log(
    `  ${chalk.bold.green('✔  Ready')}   ${chalk.bold.underline.cyan(url)}`
  );
  console.log('');
  console.log(chalk.gray('  Press Ctrl+C to stop'));
  console.log('');
}

// ── Error ──────────────────────────────────────────────────────────────────
export function printError(msg) {
  console.log('');
  console.log(`  ${chalk.bold.red('✖  Error')}   ${chalk.red(msg)}`);
  console.log('');
}

// ── Warning ───────────────────────────────────────────────────────────────
export function printWarning(msg) {
  console.log(`  ${chalk.bold.yellow('⚠')}  ${chalk.yellow(msg)}`);
}