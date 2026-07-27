import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CopyButton } from './ui/CopyButton';
import { ArrowRight, Terminal } from 'lucide-react';
import { fetchLiveStats } from '../utils/fetchStats';
import './Hero.css';

export function Hero({ heroRef }) {
  const [stats, setStats] = useState({ downloads: 700, releases: 5, latestVersion: 'v2.0.2', isLive: false });

  useEffect(() => {
    fetchLiveStats().then((data) => {
      if (data) setStats(data);
    });
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-glow"></div>
      <div className="container hero-container">
        
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Terminal size={14} className="text-magenta" />
          <span>{stats.latestVersion} is live</span>
          {stats.isLive && <span className="live-indicator-dot" title="Live npm/GitHub stats synced"></span>}
        </motion.div>

        <motion.h1
          className="type-h1 hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          From GitHub URL to localhost.<br />
          <span className="text-magenta">One command.</span>
        </motion.h1>

        <motion.p
          className="type-body hero-subtitle text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Clone, detect, install, launch — all automatic.<br className="hero-br" />
          Run conventional GitHub projects with zero config friction.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="hero-install-wrapper">
            <CopyButton text="npm install -g gitrunbykaru" className="hero-install-pill" />
            <span className="keyboard-hint">Press <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd> to copy</span>
          </div>

          <a
            href="https://github.com/Karthikeyadusi/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="hero-secondary-btn"
          >
            <span>View on GitHub</span>
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          className="hero-trust-strip text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="trust-item">
            <strong className="text-primary">{stats.downloads}+</strong> downloads
          </span>
          <span className="trust-dot">·</span>
          <span className="trust-item">
            <strong className="text-primary">{stats.releases}</strong> releases
          </span>
          <span className="trust-dot">·</span>
          <span className="trust-item">MIT License</span>
          <span className="trust-dot">·</span>
          <span className="trust-item">Open Source</span>
        </motion.div>

        <motion.p
          className="hero-origin-callout text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <em>— Built because I was tired of spending 20 minutes configuring repos I'd close in 2.</em>
        </motion.p>

      </div>
    </section>
  );
}
