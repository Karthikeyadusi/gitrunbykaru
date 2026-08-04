import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Prepares the workspace environment files (.env) from template examples.
 * Automatically injects placeholder keys to prevent initial boot crashes.
 */
export function prepareEnvironment(dir, logger) {
  const envPath = join(dir, '.env');
  if (existsSync(envPath)) return false;

  const examples = ['.env.example', '.env.local.example', '.env.sample', '.env.template', 'env.example'];
  const foundExample = examples.find(ex => existsSync(join(dir, ex)));

  if (foundExample) {
    if (logger && typeof logger.dim === 'function') {
      logger.dim(`→ Auto-generating .env from ${foundExample}`);
    }
    const content = readFileSync(join(dir, foundExample), 'utf8');

    const mockedContent = content.split('\n').map(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return line;

      const splitIdx = trimmed.indexOf('=');
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
    return true;
  }
  return false;
}
