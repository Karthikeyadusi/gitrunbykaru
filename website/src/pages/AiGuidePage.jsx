import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Check, Copy, ExternalLink, Terminal, Code2, Sparkles, Layers } from 'lucide-react';
import './AiGuidePage.css';

const AI_CLIENTS = [
  {
    id: 'cursor',
    name: 'Cursor',
    badge: 'mcp.json',
    color: '#38bdf8',
    icon: 'Bot',
    configPath: 'Cursor Settings ➔ Features ➔ MCP Servers ➔ Add Custom MCP',
    configJson: `{
  "mcpServers": {
    "gitrunbykaru": {
      "command": "npx",
      "args": ["-y", "gitrunbykaru-mcp"]
    }
  }
}`,
    steps: [
      'Open Cursor Settings (Gear icon in top right or Ctrl+,).',
      'Navigate to Features ➔ MCP Servers.',
      'Click Add Custom MCP (this opens your mcp.json file).',
      'Paste the JSON configuration block below and save.'
    ],
    prompt: 'Use gitrunbykaru to launch the local project in .'
  },
  {
    id: 'claude_desktop',
    name: 'Claude Desktop',
    badge: 'claude_desktop_config.json',
    color: '#d97706',
    icon: 'Sparkles',
    configPath: 'Windows: %APPDATA%\\Claude\\claude_desktop_config.json | macOS: ~/Library/Application Support/Claude/claude_desktop_config.json',
    configJson: `{
  "mcpServers": {
    "gitrunbykaru": {
      "command": "npx",
      "args": ["-y", "gitrunbykaru-mcp"]
    }
  }
}`,
    steps: [
      'Locate your Claude Desktop configuration file for your operating system.',
      'Add the gitrunbykaru server configuration block inside mcpServers.',
      'Restart Claude Desktop.'
    ],
    prompt: 'Launch https://github.com/expressjs/express using gitrunbykaru'
  },
  {
    id: 'claude_code',
    name: 'Claude Code CLI',
    badge: 'claude mcp add',
    color: '#a855f7',
    icon: 'Terminal',
    configPath: 'Terminal Command',
    configJson: `claude mcp add gitrunbykaru -- npx -y gitrunbykaru-mcp`,
    steps: [
      'Open your system terminal.',
      'Run the single command above to register GitRunByKaru with Claude Code.',
      'Start a new Claude Code CLI session.'
    ],
    prompt: 'Use gitrunbykaru to test this repo locally'
  },
  {
    id: 'vscode',
    name: 'VS Code (Cline / Roo / Copilot)',
    badge: 'cline_mcp_settings.json',
    color: '#4ade80',
    icon: 'Code2',
    configPath: 'VS Code AI Extension ➔ Configure MCP Servers',
    configJson: `{
  "mcpServers": {
    "gitrunbykaru": {
      "command": "npx",
      "args": ["-y", "gitrunbykaru-mcp"]
    }
  }
}`,
    steps: [
      'Open VS Code and launch your AI Extension (Cline / Roo Code / Continue.dev).',
      'Click the MCP Servers icon near the top of the extension panel.',
      'Click Configure MCP Servers, paste the JSON configuration, and save.'
    ],
    prompt: 'Use gitrunbykaru to spin up this project'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    badge: 'mcp_config.json',
    color: '#ec4899',
    icon: 'Layers',
    configPath: '~/.codeium/windsurf/mcp_config.json',
    configJson: `{
  "mcpServers": {
    "gitrunbykaru": {
      "command": "npx",
      "args": ["-y", "gitrunbykaru-mcp"]
    }
  }
}`,
    steps: [
      'Open your Windsurf MCP configuration file.',
      'Paste the gitrunbykaru server configuration under mcpServers.',
      'Restart Windsurf.'
    ],
    prompt: 'Run the project in . using gitrunbykaru'
  }
];

export function AiGuidePage({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('cursor');
  const [copiedId, setCopiedId] = useState(null);

  const currentClient = AI_CLIENTS.find(c => c.id === activeTab) || AI_CLIENTS[0];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="ai-page-wrapper">
      <div className="container ai-page-container">
        
        {/* Page Top Header Bar */}
        <div className="ai-page-nav-bar">
          <button className="back-home-btn" onClick={onBackToHome}>
            <ArrowLeft size={16} />
            <span>Back to Main Page</span>
          </button>

          <span className="page-version-badge">v2.2.0 • MCP Integration</span>
        </div>

        {/* Hero Section */}
        <div className="ai-page-hero">
          <motion.div
            className="ai-hero-pill"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Bot size={16} className="text-magenta" />
            <span>AI Agent Integration Guide</span>
          </motion.div>

          <motion.h1
            className="type-h1 ai-page-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Connect GitRunByKaru with <span className="text-magenta">your AI Agent</span>
          </motion.h1>

          <motion.p
            className="type-body text-secondary ai-page-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Turn your AI coding assistant into a 1-click ephemeral runtime engine using the open Model Context Protocol (MCP).
          </motion.p>
        </div>

        {/* AI Client Selector Tabs */}
        <div className="ai-client-selector-bar">
          {AI_CLIENTS.map(client => (
            <button
              key={client.id}
              className={`selector-tab ${activeTab === client.id ? 'active' : ''}`}
              onClick={() => setActiveTab(client.id)}
            >
              <span className="tab-dot" style={{ backgroundColor: client.color }}></span>
              <span className="tab-name">{client.name}</span>
            </button>
          ))}
        </div>

        {/* Dedicated 2-Column Content Grid */}
        <div className="ai-content-grid">
          
          {/* Left Column: Walkthrough & Instructions */}
          <div className="grid-col-left">
            
            <div className="card-box path-card">
              <div className="card-header-label">CONFIG FILE LOCATION</div>
              <p className="config-file-path">{currentClient.configPath}</p>
            </div>

            <div className="card-box steps-card">
              <div className="card-header-label">SETUP WALKTHROUGH</div>
              <div className="steps-flow">
                {currentClient.steps.map((step, idx) => (
                  <div key={idx} className="step-row">
                    <span className="step-badge">{idx + 1}</span>
                    <span className="type-body text-secondary step-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-box prompt-card">
              <div className="card-header-label">COPYABLE AI PROMPT</div>
              <div className="prompt-row">
                <code className="prompt-code-text">"{currentClient.prompt}"</code>
                <button
                  className="copy-prompt-pill"
                  onClick={() => handleCopy(currentClient.prompt, 'prompt')}
                >
                  {copiedId === 'prompt' ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                  <span>{copiedId === 'prompt' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Copyable Configuration Card */}
          <div className="grid-col-right">
            <div className="card-box config-card">
              <div className="card-header-top">
                <div className="config-badge-label" style={{ color: currentClient.color }}>
                  {currentClient.badge}
                </div>
                <button
                  className="main-copy-btn"
                  onClick={() => handleCopy(currentClient.configJson, 'config')}
                >
                  {copiedId === 'config' ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                  <span>{copiedId === 'config' ? 'Copied to Clipboard!' : 'Copy Configuration'}</span>
                </button>
              </div>
              <pre className="json-code-view">
                <code>{currentClient.configJson}</code>
              </pre>
            </div>

            {/* Exposed MCP Tools Reference */}
            <div className="card-box tools-reference-card">
              <div className="card-header-label">EXPOSED MCP TOOLS REFERENCE</div>
              <div className="tools-list">
                <div className="tool-row">
                  <code className="tool-name">gitrun_remote</code>
                  <span className="type-body-sm text-tertiary">Clones & runs remote GitHub repo in OS /tmp</span>
                </div>
                <div className="tool-row">
                  <code className="tool-name">gitrun_local</code>
                  <span className="type-body-sm text-tertiary">Runs local workspace in-place (Zero file deletion)</span>
                </div>
                <div className="tool-row">
                  <code className="tool-name">gitrun_stop</code>
                  <span className="type-body-sm text-tertiary">Stops process tree by sessionId</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Documentation Footer Bar */}
        <div className="ai-page-footer">
          <a
            href="https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/docs/MCP_GUIDE.md"
            target="_blank"
            rel="noreferrer"
            className="docs-github-link"
          >
            <span>View Complete MCP Guide on GitHub</span>
            <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </div>
  );
}
