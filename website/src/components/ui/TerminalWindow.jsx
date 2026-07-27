import React from 'react';
import { RotateCw, Play, Pause } from 'lucide-react';
import './TerminalWindow.css';

export function TerminalWindow({
  title = '~/terminal',
  children,
  onReplay,
  isPlaying,
  activeScriptKey,
  onSelectScript,
  scripts = []
}) {
  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-left-group">
          <div className="terminal-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>

          {scripts.length > 0 && (
            <div className="terminal-tabs">
              {scripts.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`terminal-tab ${activeScriptKey === s.id ? 'active' : ''}`}
                  onClick={() => onSelectScript && onSelectScript(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
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
              {isPlaying ? <RotateCw size={14} /> : <Play size={14} />}
            </button>
          )}
        </div>
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}
