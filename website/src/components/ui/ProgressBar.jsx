import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

export function ProgressBar({ label, duration = 3000, targetPct = 85, elapsed = '45s' }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let start = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const current = Math.min(targetPct, Math.floor((progress / duration) * targetPct));
      setPct(current);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
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
