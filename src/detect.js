import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { log } from './logger.js';

/**
 * Scans a directory and returns a detection result:
 * { type, label, runCommand, installCommand, port }
 */
export async function detectProject(dir) {
  const files = readdirSync(dir);
  const has = (f) => existsSync(join(dir, f));

  log.step('Detecting project type...');

  // ── Node.js ──────────────────────────────────────────────────────────────
  if (has('package.json')) {
    let pkg = {};
    try {
      pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
    } catch { /* malformed package.json — still treat as Node */ }

    const scripts = pkg.scripts || {};
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    // Detect package manager
    let pm = 'npm';
    let installCommand = 'npm install';
    if (has('yarn.lock')) {
      pm = 'yarn';
      installCommand = 'yarn install';
    } else if (has('pnpm-lock.yaml')) {
      pm = 'pnpm';
      installCommand = 'pnpm install';
    } else if (has('bun.lockb') || has('bun.lock')) {
      pm = 'bun';
      installCommand = 'bun install';
    } else if (has('package-lock.json') || has('npm-shrinkwrap.json')) {
      installCommand = 'npm ci --prefer-offline';
    }

    // Pick best run command in priority order
    let runCommand = null;
    let label = 'Node.js';
    const runPrefix = pm === 'npm' ? 'npm run ' : `${pm} `;

    if (scripts.dev)   { runCommand = `${runPrefix}dev`;   }
    else if (scripts.start) { runCommand = pm === 'npm' ? 'npm start' : `${pm} start`; }
    else if (scripts.serve) { runCommand = `${runPrefix}serve`; }
    else if (scripts.build && scripts.preview) { runCommand = `${runPrefix}build && ${runPrefix}preview`; } // For Vite/Svelte sometimes
    else { return null; } // Give up and fall through to manual prompt instead of crashing on 'node index.js'

    // Fix for package managers via npx
    if (runCommand.startsWith('yarn') || runCommand.startsWith('pnpm') || runCommand.startsWith('bun')) {
       runCommand = `npx ${runCommand}`;
    }

    // Detect framework for a nicer label
    if (deps?.next)         label = `Next.js (${runCommand})`;
    else if (deps?.nuxt)    label = `Nuxt.js (${runCommand})`;
    else if (deps?.vite)    label = `Vite app (${runCommand})`;
    else if (deps?.react)   label = 'React app';
    else if (deps?.express) label = 'Express.js server';
    else if (deps?.fastify) label = 'Fastify server';
    else                    label = `Node.js (${runCommand})`;

    return {
      type: 'node',
      label: `${label} via ${pm}`,
      runCommand,
      installCommand,
      port: detectPortFromEnv(dir) || 3000,
    };
  }

  // ── Python ───────────────────────────────────────────────────────────────
  if (has('requirements.txt') || has('pyproject.toml') || has('setup.py') || has('Pipfile')) {
    let runCommand = 'python main.py';
    let label = 'Python app';

    if (has('manage.py')) {
      runCommand = 'python manage.py runserver';
      label = 'Django app';
    } else if (has('app.py')) {
      runCommand = 'python app.py';
      label = 'Python/Flask app';
    } else if (has('main.py')) {
      runCommand = 'python main.py';
      label = 'Python app (main.py)';
    } else if (has('run.py')) {
      runCommand = 'python run.py';
      label = 'Python app (run.py)';
    } else if (has('server.py')) {
      runCommand = 'python server.py';
      label = 'Python server (server.py)';
    }

    // Check pyproject.toml for scripts
    if (has('pyproject.toml')) {
      try {
        const content = readFileSync(join(dir, 'pyproject.toml'), 'utf8');
        if (content.includes('fastapi')) { label = 'FastAPI app'; }
        if (content.includes('flask'))   { label = 'Flask app'; }
      } catch { /* ignore */ }
    }

    let installCommand = 'pip install -r requirements.txt';
    if (!has('requirements.txt') && has('pyproject.toml')) {
      installCommand = 'pip install -e .';
    } else if (has('Pipfile')) {
      installCommand = 'pipenv install';
    }

    return {
      type: 'python',
      label,
      runCommand,
      installCommand,
      port: detectPortFromEnv(dir) || 8000,
    };
  }

  // ── Static HTML ──────────────────────────────────────────────────────────
  if (has('index.html') || files.some(f => f.endsWith('.html'))) {
    return {
      type: 'static',
      label: 'Static HTML site',
      runCommand: null, // handled by static strategy
      installCommand: null,
      port: 8080,
    };
  }

  // ── Unknown ──────────────────────────────────────────────────────────────
  log.dim(`Files found: ${files.slice(0, 10).join(', ')}`);
  return null;
}

/** Try to read a .env file for a PORT hint */
function detectPortFromEnv(dir) {
  try {
    const envPath = join(dir, '.env.example') || join(dir, '.env');
    if (existsSync(envPath)) {
      const content = readFileSync(envPath, 'utf8');
      const match = content.match(/^PORT\s*=\s*(\d+)/m);
      if (match) return parseInt(match[1], 10);
    }
  } catch { /* ignore */ }
  return null;
}