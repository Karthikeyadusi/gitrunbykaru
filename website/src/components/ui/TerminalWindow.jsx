import React from 'react';
import { RotateCw } from 'lucide-react';
import './TerminalWindow.css';

export function TerminalWindow({ title = '~/terminal', children, onReplay, isPlaying }) {
  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title">{title}</div>
        <div className="terminal-actions">
          {onReplay && (
            <button
              type="button"
              className={`replay-btn ${isPlaying ? 'spinning' : ''}`}
              onClick={onReplay}
              title="Replay sequence"
              aria-label="Replay terminal animation"
            >
              <RotateCw size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}
