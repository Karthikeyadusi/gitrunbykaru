import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

export function ProgressBar({ label, duration = 3000, targetPct = 85, elapsed = '45s' }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTime;
      const current = Math.min(targetPct, Math.floor((elapsedMs / duration) * targetPct));
      setPct(current);
      if (elapsedMs >= duration) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [duration, targetPct]);

  const filledCount = Math.round((pct / 100) * 16);
  const emptyCount = 16 - filledCount;

  return (
    <div className="terminal-progress-line">
      <span className="step-sym">→</span>
      <span className="progress-label">{label}</span>
      <span className="bar-wrapper">
        <span className="bar-bracket">[</span>
        <span className="bar-filled">{'█'.repeat(filledCount)}</span>
        <span className="bar-empty">{'░'.repeat(emptyCount)}</span>
        <span className="bar-bracket">]</span>
      </span>
      <span className="progress-pct">{pct}%</span>
      <span className="progress-time">({elapsed})</span>
    </div>
  );
}
