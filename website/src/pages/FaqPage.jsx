import React from 'react';
import { ChevronDown, Check, X, ExternalLink, GitBranch, Terminal, Bot, Shield, Database, Layers, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import './FaqPage.css';

const FAQ_CATEGORIES = [
  {
    id: 'general',
    title: 'General',
    icon: Terminal,
    questions: [
      {
        q: 'Does gitrunbykaru work with private repositories?',
        a: 'No. gitrunbykaru only supports public GitHub repositories. It cannot authenticate with GitHub to access private repos. For private repos, clone manually and use <code>grbk .</code> on the local directory.'
      },
      {
        q: 'What frameworks does gitrunbykaru support?',
        a: '<strong>Stable:</strong> Node.js (Next.js, Vite, React, Express, Fastify, Vue, Svelte, Angular, Astro, Remix), Python (Flask, Django, FastAPI with virtualenv isolation), Static HTML.<br/><strong>Experimental:</strong> Go (Gin, Fiber, Echo, Chi, standard net/http), Rust (Axum, Actix-web, Rocket, Cargo).'
      },
      {
        q: 'Can I run gitrunbykaru on a local project directory?',
        a: 'Yes. Run <code>grbk .</code> or <code>gitrunbykaru .</code> from any local project directory. It detects the framework, prepares .env, installs dependencies, and launches the dev server in-place without deleting files on exit.'
      },
      {
        q: 'What package managers does gitrunbykaru support?',
        a: 'Node.js: npm, yarn, pnpm, bun (detected via lockfiles). Python: pip, pipenv. Go: go mod. Rust: cargo. It auto-detects from lockfiles.'
      },
      {
        q: 'What Node.js version is required?',
        a: 'Node.js 18+ is required. The tool uses modern ES modules and native fetch.'
      },
    ]
  },
  {
    id: 'limitations',
    title: 'Limitations',
    icon: Shield,
    questions: [
      {
        q: 'Does gitrunbykaru set up databases like PostgreSQL or Redis?',
        a: 'No. gitrunbykaru does not provision databases or external services. If a project requires PostgreSQL, MySQL, Redis, or other services, you must run them locally and configure the project\'s .env to point to them.'
      },
      {
        q: 'Does gitrunbykaru work with monorepos?',
        a: 'No. gitrunbykaru does not support monorepos that require running multiple concurrent services (e.g., separate frontend + backend servers, or Turborepo/Nx workspaces). It launches a single dev server process.'
      },
      {
        q: 'Can gitrunbykaru build and deploy my application?',
        a: 'No. gitrunbykaru only launches development servers (e.g., <code>npm run dev</code>, <code>python manage.py runserver</code>). It does not run production builds or handle deployments.'
      },
      {
        q: 'Does gitrunbykaru work on Windows?',
        a: 'Yes, fully supported on Windows, macOS, and Linux. On Windows it uses <code>taskkill /f /t</code> for process tree cleanup and handles path resolution for tools like Vite.'
      },
      {
        q: 'What happens if the port is already in use?',
        a: 'The tool detects the port from the dev server output. If the detected port is busy, the underlying dev server (Vite, Next.js, etc.) will typically error. You can specify a preferred port with <code>--port <n></code>, but the framework\'s dev server must respect it.'
      },
    ]
  },
  {
    id: 'env',
    title: 'Environment & Config',
    icon: Database,
    questions: [
      {
        q: 'How does gitrunbykaru handle missing environment variables?',
        a: 'It detects <code>.env.example</code>, <code>.env.local.example</code>, <code>.env.sample</code>, <code>.env.template</code>, or <code>env.example</code> files and auto-generates a <code>.env</code> file with placeholder values: <code>gitrunbykaru_dummy_key_12345</code> for generic keys, <code>http://localhost:9999</code> for URLs/endpoints. This prevents boot-time crashes from missing keys.'
      },
      {
        q: 'Can I override the auto-generated .env values?',
        a: 'Yes. Create a <code>.env</code> file manually before running gitrunbykaru, or use <code>--keep</code> to preserve the temp directory, edit the .env, then re-run with <code>grbk .</code> on that directory.'
      },
      {
        q: 'Does gitrunbykaru modify my original repo files?',
        a: 'No. For remote repos, it clones to a temp directory (<code>/tmp/gitrunbykaru-*</code>) and deletes it on exit (unless <code>--keep</code>). For local workspaces (<code>grbk .</code>), it runs in-place and never deletes your files.'
      },
    ]
  },
  {
    id: 'mcp',
    title: 'MCP / AI Agents',
    icon: Bot,
    questions: [
      {
        q: 'Is there an MCP server for AI agents?',
        a: 'Yes. The MCP server package is <code>@gitrunbykaru/mcp-server</code> on npm. Configure in your AI client:',
        code: `{ "mcpServers": { "gitrunbykaru": { "command": "npx", "args": ["-y", "@gitrunbykaru/mcp-server"] } } }`
      },
      {
        q: 'Which AI clients are supported?',
        a: 'Cursor, Claude Desktop, Claude Code, VS Code (Cline, Roo, Continue.dev), Windsurf, and any MCP-compatible client.'
      },
      {
        q: 'What MCP tools are exposed?',
        a: '<code>gitrun_remote({ repoUrl, preferredPort? })</code> — clones & runs remote repo.<br/><code>gitrun_local({ workspacePath, preferredPort? })</code> — runs local workspace in-place.<br/><code>gitrun_stop({ sessionId })</code> — stops process tree and cleans up.'
      },
      {
        q: 'Can the MCP server run private repos?',
        a: 'No. The MCP server inherits the same limitation: only public GitHub repositories.'
      },
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: X,
    questions: [
      {
        q: 'The tool says "Repository not found" but the URL is correct.',
        a: 'Ensure the repository is <strong>public</strong>. Private repos are not supported. Also check for typos in the owner/repo name.'
      },
      {
        q: 'Installation fails with "npm ci failed".',
        a: 'gitrunbykaru automatically falls back to <code>npm install</code> if <code>npm ci</code> fails (e.g., lockfile out of sync). If it still fails, check Node.js version compatibility or try <code>--keep</code> to inspect the temp directory.'
      },
      {
        q: 'The dev server starts but browser shows "Cannot connect".',
        a: 'The tool verifies HTTP readiness before opening the browser. If it opens but fails, the server may have crashed after the readiness check. Check the terminal output for errors. Try <code>--no-open</code> and open manually.'
      },
      {
        q: 'Process stays running after Ctrl+C.',
        a: 'On Windows, gitrunbykaru uses <code>taskkill /f /t</code> to kill the process tree. On Unix, it sends SIGINT. If a process survives, it may have detached. Check for orphaned node/python processes and kill manually.'
      },
      {
        q: 'Go/Rust projects fail to run.',
        a: 'Go and Rust support is <strong>experimental</strong>. Ensure <code>go</code> or <code>cargo</code> is in PATH. For Go, the tool tries <code>go run .</code>; for Rust, <code>cargo run</code>. Some project structures may not be detected correctly.'
      },
    ]
  },
];

export function FaqPage() {
  const [openIndex, setOpenIndex] = React.useState(null);
  const [activeCategory, setActiveCategory] = React.useState('general');

  return (
    <div className="faq-page">
      <div className="container">
        <motion.div className="faq-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about gitrunbykaru — capabilities, limits, and troubleshooting.</p>
        </motion.div>

        <div className="faq-category-tabs">
          {FAQ_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <cat.icon size={16} />
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        <div className="faq-content">
          {FAQ_CATEGORIES.find(c => c.id === activeCategory)?.questions.map((item, idx) => (
            <motion.div
              key={`${activeCategory}-${idx}`}
              className="faq-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{item.q}</span>
                <ChevronDown size={18} className={openIndex === idx ? 'open' : ''} />
              </button>
              <motion.div
                className="faq-answer"
                initial={false}
                animate={{ height: openIndex === idx ? 'auto' : 0, opacity: openIndex === idx ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div dangerouslySetInnerHTML={{ __html: item.a }} />
                {item.code && <pre className="faq-code"><code>{item.code}</code></pre>}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div className="faq-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p>Didn't find your answer?</p>
          <div className="cta-buttons">
            <a href="https://github.com/Karthikeyadusi/gitrunbykaru/issues/new/choose" target="_blank" rel="noreferrer" className="btn-primary">
              <GitBranch size={16} /> Open GitHub Issue
            </a>
            <a href="https://github.com/Karthikeyadusi/gitrunbykaru/discussions" target="_blank" rel="noreferrer" className="btn-secondary">
              <Globe size={16} /> Start Discussion
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FaqPage;