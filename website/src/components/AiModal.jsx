import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, ExternalLink, Bot, Terminal, Code } from 'lucide-react';
import './AiModal.css';

const AI_CLIENTS = [
  {
    id: 'cursor',
    name: 'Cursor',
    badge: 'mcp.json',
    color: '#38bdf8',
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
      'Open Cursor Settings (Gear Icon) ➔ Features ➔ MCP Servers.',
      'Click Add Custom MCP (opens mcp.json).',
      'Paste the JSON block below and save.'
    ],
    prompt: 'Use gitrunbykaru to run the local project in .'
  },
  {
    id: 'claude_desktop',
    name: 'Claude Desktop',
    badge: 'claude_desktop_config.json',
    color: '#d97706',
    configPath: '%APPDATA%\\Claude\\claude_desktop_config.json',
    configJson: `{
  "mcpServers": {
    "gitrunbykaru": {
      "command": "npx",
      "args": ["-y", "gitrunbykaru-mcp"]
    }
  }
}`,
    steps: [
      'Open your Claude Desktop configuration file.',
      'Add the gitrunbykaru server configuration under mcpServers.',
      'Restart Claude Desktop.'
    ],
    prompt: 'Launch https://github.com/expressjs/express using gitrunbykaru'
  },
  {
    id: 'claude_code',
    name: 'Claude Code CLI',
    badge: 'claude mcp add',
    color: '#a855f7',
    configPath: 'Terminal Command',
    configJson: `claude mcp add gitrunbykaru -- npx -y gitrunbykaru-mcp`,
    steps: [
      'Open your terminal.',
      'Run the command above to register GitRunByKaru with Claude Code.',
      'Start a new Claude session.'
    ],
    prompt: 'Use gitrunbykaru to test this repo locally'
  },
  {
    id: 'vscode',
    name: 'VS Code (Cline/Roo)',
    badge: 'cline_mcp_settings.json',
    color: '#4ade80',
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
      'Open VS Code and launch your AI Extension (Cline / Roo Code / Continue).',
      'Click the MCP Servers icon ➔ Configure MCP Servers.',
      'Paste the JSON configuration block and save.'
    ],
    prompt: 'Use gitrunbykaru to spin up this project'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    badge: 'mcp_config.json',
    color: '#ec4899',
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
      'Add the gitrunbykaru server configuration.',
      'Restart Windsurf.'
    ],
    prompt: 'Run the project in . using gitrunbykaru'
  }
];

export function AiModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('cursor');
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const currentClient = AI_CLIENTS.find(c => c.id === activeTab) || AI_CLIENTS[0];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="ai-modal-overlay" onClick={onClose}>
        <motion.div
          className="ai-modal-card"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
        >
          {/* Modal Header */}
          <div className="ai-modal-header">
            <div className="ai-header-title">
              <Bot size={20} className="text-magenta" />
              <h2 className="type-h3">Connect GitRunByKaru with AI Agents</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          <p className="type-body-sm text-secondary ai-modal-sub">
            Configure GitRunByKaru as a native Model Context Protocol (MCP) server for your favorite AI Agent.
          </p>

          {/* Client Navigation Tabs */}
          <div className="ai-client-tabs">
            {AI_CLIENTS.map(client => (
              <button
                key={client.id}
                className={`client-tab-btn ${activeTab === client.id ? 'active' : ''}`}
                onClick={() => setActiveTab(client.id)}
              >
                <span>{client.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div className="ai-tab-body">
            
            <div className="client-info-row">
              <span className="client-badge" style={{ borderColor: currentClient.color, color: currentClient.color }}>
                {currentClient.badge}
              </span>
              <span className="config-path text-tertiary">📍 {currentClient.configPath}</span>
            </div>

            {/* Steps Walkthrough */}
            <div className="ai-steps-list">
              {currentClient.steps.map((step, idx) => (
                <div key={idx} className="ai-step-item">
                  <span className="step-num">{idx + 1}</span>
                  <span className="type-body-sm text-secondary">{step}</span>
                </div>
              ))}
            </div>

            {/* Code Block Container */}
            <div className="ai-code-wrapper">
              <div className="code-header">
                <span className="code-lang">JSON CONFIG</span>
                <button
                  className="copy-code-btn"
                  onClick={() => handleCopy(currentClient.configJson, 'config')}
                >
                  {copiedId === 'config' ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                  <span>{copiedId === 'config' ? 'Copied!' : 'Copy Config'}</span>
                </button>
              </div>
              <pre className="ai-code-block">
                <code>{currentClient.configJson}</code>
              </pre>
            </div>

            {/* Copyable Prompt Example */}
            <div className="ai-prompt-box">
              <div className="prompt-label text-tertiary">💬 Copyable AI Prompt:</div>
              <div className="prompt-content">
                <code className="prompt-text">"{currentClient.prompt}"</code>
                <button
                  className="copy-prompt-btn"
                  onClick={() => handleCopy(currentClient.prompt, 'prompt')}
                >
                  {copiedId === 'prompt' ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="ai-modal-footer">
            <a
              href="https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/docs/MCP_GUIDE.md"
              target="_blank"
              rel="noreferrer"
              className="full-doc-link"
            >
              <span>View Full MCP Setup Guide</span>
              <ExternalLink size={14} />
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
