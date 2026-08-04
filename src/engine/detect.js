import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * Scans a directory and returns a detection result:
 * { type, label, runCommand, installCommand, port, framework }
 */
export async function detectProject(dir, logger) {
  const files = readdirSync(dir);
  const has = (f) => existsSync(join(dir, f));

  if (logger && typeof logger.step === 'function') {
    logger.step('Detecting project type...');
  }

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
    let rawFramework = 'Node.js';
    const runPrefix = pm === 'npm' ? 'npm run ' : `${pm} `;

    if (scripts.dev)   { runCommand = `${runPrefix}dev`;   }
    else if (scripts.start) { runCommand = pm === 'npm' ? 'npm start' : `${pm} start`; }
    else if (scripts.serve) { runCommand = `${runPrefix}serve`; }
    else if (scripts.build && scripts.preview) { runCommand = `${runPrefix}build && ${runPrefix}preview`; }
    else { return null; }

    if (runCommand.startsWith('yarn') || runCommand.startsWith('pnpm') || runCommand.startsWith('bun')) {
       runCommand = `npx ${runCommand}`;
    }

    if (deps?.next)         { label = `Next.js (${runCommand})`; rawFramework = 'Next.js'; }
    else if (deps?.nuxt)    { label = `Nuxt.js (${runCommand})`; rawFramework = 'Nuxt.js'; }
    else if (deps?.vite)    { label = `Vite app (${runCommand})`; rawFramework = 'Vite'; }
    else if (deps?.react)   { label = 'React app'; rawFramework = 'React'; }
    else if (deps?.express) { label = 'Express.js server'; rawFramework = 'Express'; }
    else if (deps?.fastify) { label = 'Fastify server'; rawFramework = 'Fastify'; }
    else                    { label = `Node.js (${runCommand})`; rawFramework = 'Node.js'; }

    return {
      type: 'node',
      label: `${label} via ${pm}`,
      framework: rawFramework,
      runCommand,
      installCommand,
      port: detectPortFromEnv(dir) || 3000,
    };
  }

  // ── Python ───────────────────────────────────────────────────────────────
  if (has('requirements.txt') || has('pyproject.toml') || has('setup.py') || has('Pipfile')) {
    let runCommand = 'python main.py';
    let label = 'Python app';
    let rawFramework = 'Python';

    if (has('manage.py')) {
      runCommand = 'python manage.py runserver';
      label = 'Django app';
      rawFramework = 'Django';
    } else if (has('app.py')) {
      runCommand = 'python app.py';
      label = 'Python/Flask app';
      rawFramework = 'Flask';
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

    if (has('pyproject.toml')) {
      try {
        const content = readFileSync(join(dir, 'pyproject.toml'), 'utf8');
        if (content.includes('fastapi')) { label = 'FastAPI app'; rawFramework = 'FastAPI'; }
        if (content.includes('flask'))   { label = 'Flask app'; rawFramework = 'Flask'; }
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
      framework: rawFramework,
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
      framework: 'Static HTML',
      runCommand: null,
      installCommand: null,
      port: 8080,
    };
  }

  if (logger && typeof logger.dim === 'function') {
    logger.dim(`Files found: ${files.slice(0, 10).join(', ')}`);
  }
  return null;
}

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
