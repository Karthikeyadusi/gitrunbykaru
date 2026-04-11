import { mkdtempSync, existsSync, realpathSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { execSync } from 'child_process';
import { log, createSpinner } from './logger.js';

export async function cloneRepo(url) {
  // Verify git is available
  try {
    execSync('git --version', { stdio: 'ignore' });
  } catch {
    throw new Error('git is not installed or not in PATH. Please install git first.');
  }

  // Extract repo name for a friendlier temp dir name
  const repoName = url.split('/').slice(-2).join('-').replace(/[^a-zA-Z0-9-_]/g, '');
  const tmpBase = tmpdir();
  // Create temp dir and immediately resolve it to its real absolute path (fixes Windows 8.3 short path bugs with Vite/React)
  let tmpDir = mkdtempSync(join(tmpBase, `gitrunbykaru-${repoName}-`));
  if (process.platform === 'win32') {
    tmpDir = realpathSync.native(tmpDir);
  } else {
    tmpDir = realpathSync(tmpDir);
  }

  const spinner = createSpinner(`Cloning  ${url}`);
  spinner.start();

  try {
    execSync(`git clone --depth 1 "${url}" "${tmpDir}"`, {
      stdio: 'pipe',
      timeout: 300000, // 5 minutes timeout for large repos or slower networks
    });
    spinner.succeed(`Cloned   ${url}`);
    return tmpDir;
  } catch (err) {
    spinner.fail('Clone failed');
    // Try to give a useful error
    const stderr = err.stderr?.toString() || err.message;
    if (stderr.includes('not found') || stderr.includes('does not exist')) {
      throw new Error(`Repository not found: ${url}\nCheck the URL is correct and the repo is public.`);
    }
    if (stderr.includes('Could not resolve host')) {
      throw new Error('No internet connection — could not reach GitHub.');
    }
    throw new Error(`git clone failed:\n${stderr}`);
  }
}