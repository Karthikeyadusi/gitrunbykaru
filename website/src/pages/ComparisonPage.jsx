import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, GitBranch, ExternalLink, Zap, Shield, Layers, Database, Terminal, Zap as ZapIcon } from 'lucide-react';
import './ComparisonPage.css';

const COMPARISON_DATA = [
  {
    category: 'Core Capability',
    items: [
      { feature: 'Run GitHub repo from URL', grbk: true, codespaces: true, docker: false, devcontainers: true },
      { feature: 'Run local workspace in-place', grbk: true, codespaces: false, docker: true, devcontainers: true },
      { feature: 'Auto-detect framework & commands', grbk: true, codespaces: true, docker: false, devcontainers: false },
      { feature: 'Auto-mock .env from templates', grbk: true, codespaces: false, docker: false, devcontainers: false },
      { feature: 'Zero-config for conventional repos', grbk: true, codespaces: true, docker: false, devcontainers: false },
    ]
  },
  {
    category: 'Execution',
    items: [
      { feature: 'Ephemeral temp workspaces', grbk: true, codespaces: true, docker: true, devcontainers: false },
      { feature: 'Auto cleanup on exit (Ctrl+C)', grbk: true, codespaces: true, docker: false, devcontainers: false },
      { feature: 'HTTP readiness verification', grbk: true, codespaces: true, docker: false, devcontainers: false },
      { feature: 'Auto-open browser on ready', grbk: true, codespaces: true, docker: false, devcontainers: false },
      { feature: 'Process tree isolation & cleanup', grbk: true, codespaces: true, docker: true, devcontainers: true },
    ]
  },
  {
    category: 'Environment',
    items: [
      { feature: 'Auto .env mocking with placeholders', grbk: true, codespaces: false, docker: false, devcontainers: false },
      { feature: 'Supports .env.example, .env.sample, etc.', grbk: true, codespaces: false, docker: false, devcontainers: false },
      { feature: 'Virtualenv isolation for Python', grbk: true, codespaces: true, docker: true, devcontainers: true },
      { feature: 'Node version auto-detection', grbk: true, codespaces: true, docker: false, devcontainers: true },
    ]
  },
  {
    category: 'Frameworks',
    items: [
      { feature: 'Node.js (Next.js, Vite, React, Express, etc.)', grbk: true, codespaces: true, docker: true, devcontainers: true },
      { feature: 'Python (Flask, Django, FastAPI)', grbk: true, codespaces: true, docker: true, devcontainers: true },
      { feature: 'Static HTML', grbk: true, codespaces: true, docker: true, devcontainers: true },
      { feature: 'Go (Gin, Fiber, Echo, Chi) — Experimental', grbk: true, codespaces: true, docker: true, devcontainers: true },
      { feature: 'Rust (Axum, Actix, Rocket) — Experimental', grbk: true, codespaces: true, docker: true, devcontainers: true },
    ]
  },
  {
    category: 'AI Integration',
    items: [
      { feature: 'MCP Server for AI agents', grbk: true, codespaces: false, docker: false, devcontainers: false },
      { feature: 'Works with Cursor, Claude, VS Code, Windsurf', grbk: true, codespaces: false, docker: false, devcontainers: false },
      { feature: 'Structured JSON outputs for AI consumption', grbk: true, codespaces: false, docker: false, devcontainers: false },
    ]
  },
  {
    category: 'Limitations',
    items: [
      { feature: 'Private repositories', grbk: false, codespaces: true, docker: true, devcontainers: true },
      { feature: 'Database provisioning (Postgres, Redis, etc.)', grbk: false, codespaces: false, docker: true, devcontainers: true },
      { feature: 'Monorepo / multi-service orchestration', grbk: false, codespaces: true, docker: true, devcontainers: true },
      { feature: 'Production deployment / builds', grbk: false, codespaces: false, docker: true, devcontainers: false },
      { feature: 'Windows GUI apps', grbk: false, codespaces: false, docker: false, devcontainers: false },
    ]
  },
  {
    category: 'Setup & UX',
    items: [
      { feature: 'Install time', grbk: '< 10 sec (npm i -g)', codespaces: 'Account + config', docker: 'Image build/pull', devcontainers: 'Config + build' },
      { feature: 'Launch time (cold)', grbk: '30-90 sec', codespaces: '60-180 sec', docker: '30-120 sec', devcontainers: '60-180 sec' },
      { feature: 'Disk footprint', grbk: 'Minimal (temp only)', codespaces: 'Cloud', docker: 'Images + containers', devcontainers: 'Images + containers' },
      { feature: 'Offline capable', grbk: 'After install + cache', codespaces: false, docker: 'After pull', devcontainers: 'After build' },
      { feature: 'Learning curve', grbk: 'Zero (1 command)', codespaces: 'Low', docker: 'Medium', devcontainers: 'Medium' },
    ]
  },
];

const TOOLS = [
  { id: 'grbk', name: 'gitrunbykaru', short: 'grbk', color: '#8250df', icon: ZapIcon },
  { id: 'codespaces', name: 'GitHub Codespaces', short: 'Codespaces', color: '#0969da', icon: Github },
  { id: 'docker', name: 'Docker / Docker Compose', short: 'Docker', color: '#0db7ed', icon: Database },
  { id: 'devcontainers', name: 'VS Code Dev Containers', short: 'Dev Containers', color: '#4ade80', icon: Layers },
];

export function ComparisonPage() {
  const [expandedCategories, setExpandedCategories] = React.useState({});

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="comparison-page">
      <div className="container">
        <motion.div className="comparison-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div className="hero-badge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <ZapIcon size={16} className="text-magenta" />
            <span>Honest comparison</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            gitrunbykaru vs <span className="text-magenta">Alternatives</span>
          </motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            We built gitrunbykaru for a specific workflow: <strong>GitHub URL → localhost in seconds</strong>.
            Here's how it compares when that's <em>not</em> what you need.
          </motion.p>
        </motion.div>

        {/* Tool Legend */}
        <motion.div className="tool-legend" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {TOOLS.map(tool => (
            <div key={tool.id} className="tool-pill" style={{ borderColor: tool.color }}>
              <tool.icon size={16} style={{ color: tool.color }} />
              <span>{tool.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Comparison Tables */}
        <div className="comparison-tables">
          {COMPARISON_DATA.map((category, catIdx) => (
            <motion.section
              key={category.category}
              className="comparison-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + catIdx * 0.1 }}
            >
              <div className="category-header" onClick={() => toggleCategory(category.category)}>
                <h2>{category.category}</h2>
                <motion.span className={`expand-icon ${expandedCategories[category.category] ? 'open' : ''}`}>
                  ▼
                </motion.span>
              </div>

              <motion.div
                className="comparison-table"
                initial={false}
                animate={{ height: expandedCategories[category.category] ? 'auto' : 0, opacity: expandedCategories[category.category] ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="table-header">
                  <div className="col-feature">Feature</div>
                  {TOOLS.map(tool => (
                    <div key={tool.id} className="col-tool" style={{ borderColor: tool.color }}>
                      <tool.icon size={14} style={{ color: tool.color }} />
                      <span>{tool.short}</span>
                    </div>
                  ))}
                </div>
                <div className="table-body">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="table-row">
                      <div className="col-feature">
                        <span>{item.feature}</span>
                      </div>
                      {TOOLS.map(tool => {
                        const value = item[tool.id];
                        let cellContent;
                        let cellClass = 'cell';

                        if (typeof value === 'boolean') {
                          cellContent = value ? <Check size={16} className="yes" /> : <X size={16} className="no" />;
                          cellClass += value ? ' yes' : ' no';
                        } else {
                          cellContent = <span className="text-value">{value}</span>;
                          cellClass += ' text';
                        }

                        return (
                          <div key={tool.id} className={cellClass} style={{ borderColor: tool.color }}>
                            {cellContent}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.section>
          ))}
        </div>

        {/* When to choose what */}
        <motion.section className="when-to-choose" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h2>When to Choose What</h2>
          <div className="choose-grid">
            <div className="choose-card grbk">
              <div className="choose-icon"><ZapIcon size={28} style={{ color: '#8250df' }} /></div>
              <h3>Choose gitrunbykaru when...</h3>
              <ul>
                <li>You found a cool GitHub repo and want it running <strong>now</strong></li>
                <li>You want zero config for conventional projects</li>
                <li>You're exploring/learning and don't want setup friction</li>
                <li>You want AI agents (Cursor, Claude) to run repos for you</li>
                <li>You need quick local runs without cloud accounts or Docker</li>
              </ul>
            </div>
            <div className="choose-card codespaces">
              <div className="choose-icon"><Github size={28} style={{ color: '#0969da' }} /></div>
              <h3>Choose GitHub Codespaces when...</h3>
              <ul>
                <li>You need to work on <strong>private repos</strong></li>
                <li>You want a full cloud dev environment with VS Code in browser</li>
                <li>Your team uses GitHub for everything and wants consistency</li>
                <li>You need persistent, shareable dev environments</li>
              </ul>
            </div>
            <div className="choose-card docker">
              <div className="choose-icon"><Database size={28} style={{ color: '#0db7ed' }} /></div>
              <h3>Choose Docker when...</h3>
              <ul>
                <li>You need <strong>databases</strong> (Postgres, Redis, Mongo) provisioned automatically</li>
                <li>You're building production-ready containers</li>
                <li>You need multi-service orchestration (docker-compose)</li>
                <li>You need reproducible, versioned environments across team/CI</li>
              </ul>
            </div>
            <div className="choose-card devcontainers">
              <div className="choose-icon"><Layers size={28} style={{ color: '#4ade80' }} /></div>
              <h3>Choose Dev Containers when...</h3>
              <ul>
                <li>Your team standardizes on VS Code</li>
                <li>You want per-repo dev environment config checked into git</li>
                <li>You need consistent onboarding for new contributors</li>
                <li>You want the flexibility of Docker with VS Code integration</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section className="comparison-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <div className="cta-card">
            <h2>gitrunbykaru is free, open source, and runs locally.</h2>
            <p>No account, no cloud, no config. Just <code>npm i -g gitrunbykaru</code> and go.</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => navigator.clipboard.writeText('npm install -g gitrunbykaru')}>
                <Check size={16} /> Copy Install Command
              </button>
              <a href="https://github.com/Karthikeyadusi/gitrunbykaru" target="_blank" rel="noreferrer" className="btn-secondary">
                <Github size={16} /> Star on GitHub
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default ComparisonPage;