import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Terminal, ArrowRight, GitBranch, ExternalLink, Download, Zap } from 'lucide-react';
import './InstallPage.css';

const STEPS = [
  {
    number: 1,
    title: 'Install Node.js 18+',
    description: 'gitrunbykaru requires Node.js 18 or higher. Check your version with <code>node --version</code>.',
    command: null,
    links: [
      { label: 'Download Node.js', href: 'https://nodejs.org/', icon: ExternalLink },
    ],
  },
  {
    number: 2,
    title: 'Install gitrunbykaru globally',
    description: 'Use npm to install the CLI globally. This makes the <code>grbk</code> and <code>gitrunbykaru</code> commands available everywhere.',
    command: 'npm install -g gitrunbykaru',
    links: [
      { label: 'View on npm', href: 'https://www.npmjs.com/package/gitrunbykaru', icon: ExternalLink },
    ],
  },
  {
    number: 3,
    title: 'Verify installation',
    description: 'Confirm the CLI is installed correctly and see available commands.',
    command: 'grbk --help',
    links: [],
  },
  {
    number: 4,
    title: 'Run your first repository',
    description: 'Point gitrunbykaru at any public GitHub repository. It will clone, detect, install, and launch automatically.',
    command: 'grbk https://github.com/facebook/react',
    links: [
      { label: 'Try with our repo', href: 'https://github.com/Karthikeyadusi/gitrunbykaru', icon: Github },
    ],
  },
];

const FLAGS = [
  { flag: '--no-open', desc: 'Skip auto-opening the browser after launch' },
  { flag: '--keep', desc: 'Keep the temporary cloned directory after exit (for debugging)' },
  { flag: '--json', desc: 'Output machine-readable RuntimeSession JSON payload' },
  { flag: '--port <n>', desc: 'Preferred port (tool still detects from app output)' },
  { flag: '--mcp', desc: 'Show MCP server setup guide for AI agents' },
];

const LOCAL_USAGE = [
  { cmd: 'grbk .', desc: 'Run current directory as a local workspace' },
  { cmd: 'grbk ./my-project', desc: 'Run a specific local directory' },
  { cmd: 'grbk . --no-open --json', desc: 'Local run with JSON output, no browser' },
];

export function InstallPage() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="install-page">
      <div className="container">
        <motion.div className="install-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div className="hero-badge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Zap size={16} className="text-magenta" />
            <span>Get running in 30 seconds</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Install & Run <span className="text-magenta">Any GitHub Repo</span> in One Command
          </motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <code>npm install -g gitrunbykaru</code> → <code>grbk https://github.com/user/repo</code> → <strong>Done.</strong>
          </motion.p>
        </motion.div>

        {/* Prerequisites */}
        <motion.section className="section prerequisites" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2>Prerequisites</h2>
          <div className="prereq-grid">
            <div className="prereq-card">
              <div className="prereq-icon"><Terminal size={24} /></div>
              <h3>Node.js 18+</h3>
              <p>Required for ES modules and native fetch. <a href="https://nodejs.org/" target="_blank" rel="noreferrer">Download</a></p>
            </div>
            <div className="prereq-card">
              <div className="prereq-icon"><Download size={24} /></div>
              <h3>npm</h3>
              <p>Comes with Node.js. Used to install gitrunbykaru globally.</p>
            </div>
            <div className="prereq-card">
              <div className="prereq-icon"><Zap size={24} /></div>
              <h3>git</h3>
              <p>Required for cloning repositories. <a href="https://git-scm.com/" target="_blank" rel="noreferrer">Install</a></p>
            </div>
          </div>
        </motion.section>

        {/* Main Install Steps */}
        <motion.section className="section steps" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2>Installation Steps</h2>
          <div className="steps-timeline">
            {STEPS.map((step, idx) => (
              <motion.div key={step.number} className="step" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + idx * 0.1 }}>
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: step.description }} />
                  {step.command && (
                    <div className="step-command">
                      <code>{step.command}</code>
                      <button
                        className="copy-btn"
                        onClick={() => handleCopy(step.command, `step-${step.number}`)}
                        aria-label="Copy command"
                      >
                        {copied === `step-${step.number}` ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                        <span>{copied === `step-${step.number}` ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                  {step.links.length > 0 && (
                    <div className="step-links">
                      {step.links.map((link, li) => (
                        <a key={li} href={link.href} target="_blank" rel="noreferrer" className="step-link">
                          <link.icon size={14} /> {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Flags Reference */}
        <motion.section className="section flags" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2>Useful Flags</h2>
          <div className="flags-table">
            {FLAGS.map(f => (
              <div key={f.flag} className="flag-row">
                <code>{f.flag}</code>
                <span>{f.desc}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Local Usage */}
        <motion.section className="section local-usage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2>Local Workspace Usage</h2>
          <p className="section-lead">Run existing local projects in-place without cloning or cleanup.</p>
          <div className="usage-cards">
            {LOCAL_USAGE.map((u, idx) => (
              <motion.div key={idx} className="usage-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + idx * 0.1 }}>
                <div className="usage-command">
                  <code>{u.cmd}</code>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(u.cmd, `local-${idx}`)}
                    aria-label="Copy command"
                  >
                    {copied === `local-${idx}` ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                    <span>{copied === `local-${idx}` ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p>{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* MCP Setup */}
        <motion.section className="section mcp-setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2>MCP Server for AI Agents</h2>
          <p className="section-lead">Connect gitrunbykaru to Cursor, Claude, VS Code, Windsurf, and other AI agents.</p>
          <div className="mcp-config">
            <div className="config-header">
              <span className="config-badge">@gitrunbykaru/mcp-server</span>
              <button className="copy-btn" onClick={() => handleCopy(MCP_CONFIG, 'mcp-config')}>
                {copied === 'mcp-config' ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                <span>{copied === 'mcp-config' ? 'Copied!' : 'Copy Config'}</span>
              </button>
            </div>
            <pre><code>{MCP_CONFIG}</code></pre>
          </div>
          <div className="mcp-clients">
            <span>Supported:</span>
            <span className="client-badge cursor">Cursor</span>
            <span className="client-badge claude">Claude Desktop</span>
            <span className="client-badge vscode">VS Code</span>
            <span className="client-badge windsurf">Windsurf</span>
            <span className="client-badge claude-code">Claude Code</span>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section className="section cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <div className="cta-card">
            <motion.div className="cta-icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.8 }}>
              <ArrowRight size={32} />
            </motion.div>
            <h2>Ready to run your first repo?</h2>
            <p>Try it on our own repository to see it in action.</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => handleCopy('grbk https://github.com/Karthikeyadusi/gitrunbykaru', 'try-us')}>
                <Copy size={16} /> Copy: grbk https://github.com/Karthikeyadusi/gitrunbykaru
              </button>
              <a href="https://github.com/Karthikeyadusi/gitrunbykaru" target="_blank" rel="noreferrer" className="btn-secondary">
                <Github size={16} /> View on GitHub
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

const MCP_CONFIG = `{ "mcpServers": { "gitrunbykaru": { "command": "npx", "args": ["-y", "@gitrunbykaru/mcp-server"] } } }`;

export default InstallPage;