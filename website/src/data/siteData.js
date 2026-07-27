export const DEMO_SCRIPTS = {
  nextjs: {
    id: 'nextjs',
    label: 'Next.js / Node',
    command: 'gitrunbykaru https://github.com/user/next-portfolio',
    lines: [
      { type: 'banner', title: 'gitrunbykaru', subtitle: '— run any GitHub repo in seconds' },
      { type: 'step', text: 'Cloning  https://github.com/user/next-portfolio', delay: 400 },
      { type: 'success', text: 'Cloned   https://github.com/user/next-portfolio', delay: 1400 },
      { type: 'step', text: 'Detecting project type...', delay: 1800 },
      { type: 'info', text: 'Detected  Next.js (npm run dev) via npm', delay: 2400 },
      { type: 'progress', label: 'Installing dependencies', duration: 3600, targetPct: 85, elapsed: '54s', delay: 3000 },
      { type: 'success', text: 'Installed dependencies ready (67.3s)', delay: 6800 },
      { type: 'step', text: 'Starting  npm run dev', delay: 7300 },
      { type: 'divider', delay: 7400 },
      { type: 'ready', url: 'http://localhost:3000', delay: 8200 },
      { type: 'dim', text: 'Press Ctrl+C to exit & clean up workspace', delay: 8600 },
      { type: 'sigint', text: '^C', delay: 10500 },
      { type: 'step', text: 'Received SIGINT — terminating process tree...', delay: 11000 },
      { type: 'success', text: 'Cleaned up /tmp/gitrunbykaru-next-portfolio-8a391f', delay: 11800 },
      { type: 'highlight', text: '✨ Temporary workspace removed cleanly. Zero clutter on your drive.', delay: 12400 }
    ]
  },
  python: {
    id: 'python',
    label: 'Python / Flask',
    command: 'gitrunbykaru https://github.com/user/flask-api',
    lines: [
      { type: 'banner', title: 'gitrunbykaru', subtitle: '— run any GitHub repo in seconds' },
      { type: 'step', text: 'Cloning  https://github.com/user/flask-api', delay: 400 },
      { type: 'success', text: 'Cloned   https://github.com/user/flask-api', delay: 1400 },
      { type: 'step', text: 'Detecting project type...', delay: 1800 },
      { type: 'info', text: 'Detected  Python/Flask app', delay: 2300 },
      { type: 'step', text: 'Creating isolated virtualenv (.gitrunbykaru-venv)...', delay: 2800 },
      { type: 'progress', label: 'Installing Python packages', duration: 3200, targetPct: 91, elapsed: '18s', delay: 3400 },
      { type: 'success', text: 'Installed Python packages ready (22.1s)', delay: 6800 },
      { type: 'step', text: 'Starting  python app.py', delay: 7300 },
      { type: 'divider', delay: 7400 },
      { type: 'ready', url: 'http://localhost:5000', delay: 8100 },
      { type: 'dim', text: 'Press Ctrl+C to exit & clean up workspace', delay: 8500 },
      { type: 'sigint', text: '^C', delay: 10500 },
      { type: 'step', text: 'Received SIGINT — stopping virtual environment...', delay: 11000 },
      { type: 'success', text: 'Cleaned up /tmp/gitrunbykaru-flask-api-91b4c', delay: 11800 },
      { type: 'highlight', text: '✨ Temporary venv & workspace deleted cleanly.', delay: 12400 }
    ]
  },
  static: {
    id: 'static',
    label: 'Static HTML',
    command: 'gitrunbykaru https://github.com/user/html5-landing',
    lines: [
      { type: 'banner', title: 'gitrunbykaru', subtitle: '— run any GitHub repo in seconds' },
      { type: 'step', text: 'Cloning  https://github.com/user/html5-landing', delay: 400 },
      { type: 'success', text: 'Cloned   https://github.com/user/html5-landing', delay: 1300 },
      { type: 'step', text: 'Detecting project type...', delay: 1700 },
      { type: 'info', text: 'Detected  Static HTML site', delay: 2100 },
      { type: 'dim', text: 'Static site — no dependencies to install.', delay: 2500 },
      { type: 'step', text: 'Starting  npx serve . -p 8080', delay: 3000 },
      { type: 'divider', delay: 3100 },
      { type: 'ready', url: 'http://localhost:8080', delay: 3800 },
      { type: 'dim', text: 'Press Ctrl+C to exit & clean up workspace', delay: 4200 },
      { type: 'sigint', text: '^C', delay: 6500 },
      { type: 'step', text: 'Received SIGINT — stopping static server...', delay: 7000 },
      { type: 'success', text: 'Cleaned up /tmp/gitrunbykaru-html5-landing-3f1a9', delay: 7700 },
      { type: 'highlight', text: '✨ Workspace deleted cleanly.', delay: 8200 }
    ]
  }
};

export const PIPELINE_STEPS = [
  {
    id: 'clone',
    title: 'Clone',
    icon: 'GitBranch',
    desc: 'Shallow clone into an isolated temp directory',
    inspection: {
      action: 'execFileSync("git", ["clone", "--depth", "1", url, tmpDir])',
      details: [
        'Uses --depth 1 to fetch only the latest commit (10x faster cloning)',
        'Creates OS-specific temp paths via mkdtempSync()',
        'Resolves physical canonical names via realpathSync.native() to fix Windows 8.3 short paths'
      ]
    }
  },
  {
    id: 'detect',
    title: 'Detect',
    icon: 'Search',
    desc: 'Reads lockfiles and manifests automatically',
    inspection: {
      action: 'detectProject(dir)',
      details: [
        'Node.js: package.json + lockfiles (package-lock, yarn.lock, pnpm-lock, bun.lock)',
        'Python: requirements.txt, pyproject.toml, Pipfile, manage.py, app.py',
        'Static: index.html or standalone HTML files'
      ]
    }
  },
  {
    id: 'install',
    title: 'Install',
    icon: 'Package',
    desc: 'npm · yarn · pnpm · bun · pip',
    inspection: {
      action: 'runInstallWithProgress(installCmd, options)',
      details: [
        'Executes package manager asynchronously with real-time percentage ticker',
        'Tuned progress curve for ~80s average dependency installation lifecycle',
        'Automatic fallback safety: if npm ci fails due to desynced lockfiles, falls back to npm install'
      ]
    }
  },
  {
    id: 'launch',
    title: 'Launch',
    icon: 'Play',
    desc: 'Starts server, verifies HTTP, opens browser',
    inspection: {
      action: 'spawnProject(dir, detection, strategy)',
      details: [
        'Parses stdout/stderr line-buffered via Node readline module',
        'Extracts active port using strategy-specific regex patterns',
        'Issues GET readiness probes via http.request() before launching default browser'
      ]
    }
  },
  {
    id: 'cleanup',
    title: 'Cleanup',
    icon: 'Trash2',
    desc: 'Deletes everything on exit',
    inspection: {
      action: 'process.on("SIGINT", cleanup)',
      details: [
        'Traps SIGINT and SIGTERM OS signal events',
        'Terminates child process trees safely (using taskkill /pid /t on Windows)',
        'Recursively deletes temp directory via rmSync(tmpDir, { recursive: true, force: true })'
      ]
    }
  }
];

export const TECH_STACKS = [
  { name: 'Node.js', icon: 'Hexagon' },
  { name: 'Next.js', icon: 'Layers' },
  { name: 'Vite', icon: 'Zap' },
  { name: 'React', icon: 'Code2' },
  { name: 'Express', icon: 'Server' },
  { name: 'Python', icon: 'Terminal' },
  { name: 'Django', icon: 'Boxes' },
  { name: 'Flask', icon: 'Cpu' },
  { name: 'FastAPI', icon: 'Activity' },
  { name: 'HTML5', icon: 'FileCode' }
];

export const FEATURE_CARDS = [
  {
    id: 'detect',
    icon: 'Wand2',
    title: 'Zero config detection',
    desc: 'Identifies framework, package manager, and run command from project files automatically.',
    featured: false
  },
  {
    id: 'env',
    icon: 'KeyRound',
    title: 'Auto .env generation',
    desc: 'Creates working environment files from .env.example templates with placeholder keys so apps don\'t crash.',
    featured: true
  },
  {
    id: 'progress',
    icon: 'BarChart3',
    title: 'Visual install progress',
    desc: 'Animated progress bar with percentage and elapsed time. You always know what\'s happening.',
    featured: false
  },
  {
    id: 'cleanup',
    icon: 'Sparkles',
    title: 'Automatic cleanup',
    desc: 'Cloned repos live in OS temp directories and are deleted when you Ctrl+C. Your machine stays clean.',
    featured: false
  }
];

export const JOURNEY_MILESTONES = [
  {
    id: 'idea',
    title: 'Weekend Idea',
    desc: '"Spent 25 minutes setting up a repo I closed in 2."',
    subdesc: 'The frustration that started it all.'
  },
  {
    id: 'v1',
    title: 'First npm Release (v1.0.0)',
    desc: 'Core pipeline: clone → detect → install → launch.',
    subdesc: 'A working proof of concept.'
  },
  {
    id: 'v2',
    title: 'Production Hardening (v2.0.0)',
    desc: 'Cross-platform fixes, process safety, architecture docs.',
    subdesc: 'First stable production release.'
  },
  {
    id: 'downloads',
    title: '700+ Downloads',
    desc: 'Growing adoption across developer communities.',
    subdesc: 'Proving real-world demand.'
  },
  {
    id: 'v202',
    title: 'v2.0.2 — Latest',
    desc: '✨ Animated progress bar · Cleaner CLI · UX polish',
    subdesc: 'Calibrated 80s installation lifecycle.',
    isLatest: true
  },
  {
    id: 'future',
    title: 'Still Improving',
    desc: 'Active maintenance and continuous refinement.',
    subdesc: '5 releases and counting.',
    isFuture: true
  }
];

export const RESOURCE_CARDS = [
  {
    title: 'Architecture Docs',
    desc: 'Execution pipeline, strategy pattern, process lifecycle.',
    link: 'https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/docs/ARCHITECTURE.md',
    icon: 'BookOpen'
  },
  {
    title: 'Contributing Guide',
    desc: 'Local setup, strategy interface, PR expectations.',
    link: 'https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/CONTRIBUTING.md',
    icon: 'GitPullRequest'
  },
  {
    title: 'Changelog',
    desc: 'Full release history and version tracking.',
    link: 'https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/CHANGELOG.md',
    icon: 'FileText'
  },
  {
    title: 'Release Notes',
    desc: 'Detailed notes and highlights for v2.0.2.',
    link: 'https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/docs/RELEASE_NOTES_v2.0.2.md',
    icon: 'Tag'
  }
];
