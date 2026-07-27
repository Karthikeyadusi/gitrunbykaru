import React from 'react';
import { ProgressBar } from './ProgressBar';
import './TerminalLine.css';

export function TerminalLine({ line }) {
  if (!line) return null;

  switch (line.type) {
    case 'banner':
      return (
        <div className="terminal-line line-banner">
          <span className="banner-title">{line.title}</span>
          <span className="banner-subtitle">{line.subtitle}</span>
        </div>
      );

    case 'step':
      return (
        <div className="terminal-line line-step">
          <span className="sym-magenta">→</span>
          <span>{line.text}</span>
        </div>
      );

    case 'info':
      return (
        <div className="terminal-line line-info">
          <span className="sym-cyan">◆</span>
          <span className="text-cyan">{line.text}</span>
        </div>
      );

    case 'success':
      return (
        <div className="terminal-line line-success">
          <span className="sym-green">✔</span>
          <span className="text-green">{line.text}</span>
        </div>
      );

    case 'ready':
      return (
        <div className="terminal-line line-ready">
          <span className="sym-green-bold">✔ Ready</span>
          <a href={line.url} target="_blank" rel="noreferrer" className="ready-url">
            {line.url}
          </a>
        </div>
      );

    case 'progress':
      return (
        <ProgressBar
          label={line.label}
          duration={line.duration}
          targetPct={line.targetPct}
          elapsed={line.elapsed}
        />
      );

    case 'divider':
      return <div className="terminal-line line-divider">────────────────────────────────────────────────</div>;

    case 'dim':
      return (
        <div className="terminal-line line-dim">
          <span>{line.text}</span>
        </div>
      );

    default:
      return <div className="terminal-line">{line.text}</div>;
  }
}
