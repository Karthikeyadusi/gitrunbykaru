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

// ── Banner ─────────────────────────────────────────────────────────────────
export function printBanner() {
  console.log('');
  console.log(
    chalk.bold.magenta('  gitrunbykarubykaru') +
    chalk.gray(' by karu') +
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