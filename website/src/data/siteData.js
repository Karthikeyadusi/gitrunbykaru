export const DEMO_SCRIPTS = {
  nextjs: {
    id: 'nextjs',
    command: 'gitrunbykaru https://github.com/user/next-portfolio',
    lines: [
      { type: 'banner', title: 'gitrunbykaru', subtitle: '— run any GitHub repo in seconds' },
      { type: 'step', text: 'Cloning  https://github.com/user/next-portfolio', delay: 400 },
      { type: 'success', text: 'Cloned   https://github.com/user/next-portfolio', delay: 1400 },
      { type: 'step', text: 'Detecting project type...', delay: 1800 },
      { type: 'info', text: 'Detected  Next.js (npm run dev) via npm', delay: 2400 },
      { type: 'progress', label: 'Installing dependencies', duration: 3800, targetPct: 82, elapsed: '54s', delay: 3000 },
      { type: 'success', text: 'Installed dependencies ready (67.3s)', delay: 7000 },
      { type: 'step', text: 'Starting  npm run dev', delay: 7500 },
      { type: 'divider', delay: 7600 },
      { type: 'ready', url: 'http://localhost:3000', delay: 8400 },
      { type: 'dim', text: 'Press Ctrl+C to stop', delay: 8800 }
    ]
  },
  python: {
    id: 'python',
    command: 'gitrunbykaru https://github.com/user/flask-api',
    lines: [
      { type: 'banner', title: 'gitrunbykaru', subtitle: '— run any GitHub repo in seconds' },
      { type: 'step', text: 'Cloning  https://github.com/user/flask-api', delay: 400 },
      { type: 'success', text: 'Cloned   https://github.com/user/flask-api', delay: 1400 },
      { type: 'step', text: 'Detecting project type...', delay: 1800 },
      { type: 'info', text: 'Detected  Python/Flask app', delay: 2300 },
      { type: 'progress', label: 'Installing Python packages', duration: 3200, targetPct: 91, elapsed: '18s', delay: 2800 },
      { type: 'success', text: 'Installed dependencies ready (22.1s)', delay: 6200 },
      { type: 'step', text: 'Starting  python app.py', delay: 6700 },
      { type: 'divider', delay: 6800 },
      { type: 'ready', url: 'http://localhost:5000', delay: 7500 },
      { type: 'dim', text: 'Press Ctrl+C to stop', delay: 7900 }
    ]
  }
};

export const PIPELINE_STEPS = [
  {
    id: 'clone',
    title: 'Clone',
    icon: 'GitBranch',
    desc: 'Shallow clone into an isolated temp directory'
  },
  {
    id: 'detect',
    title: 'Detect',
    icon: 'Search',
    desc: 'Reads lockfiles and manifests automatically'
  },
  {
    id: 'install',
    title: 'Install',
    icon: 'Package',
    desc: 'npm · yarn · pnpm · bun · pip'
  },
  {
    id: 'launch',
    title: 'Launch',
    icon: 'Play',
    desc: 'Starts server, verifies HTTP, opens browser'
  },
  {
    id: 'cleanup',
    title: 'Cleanup',
    icon: 'Trash2',
    desc: 'Deletes everything on exit'
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
