import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CopyButton } from './ui/CopyButton';
import { NpmIcon } from './ui/NpmIcon';
import { Terminal, Tag, ShieldCheck, Code2 } from 'lucide-react';
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
        
        {/* Active Badge */}
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

        {/* Hero Title & Tagline */}
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

        {/* Hero Mini Live Terminal Preview */}
        <motion.div
          className="hero-terminal-anchor"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="mini-terminal-header">
            <span className="mini-dot mini-red"></span>
            <span className="mini-dot mini-yellow"></span>
            <span className="mini-dot mini-green"></span>
            <span className="mini-path">~/gitrun-workspace</span>
            <span className="mini-temp-tag">[tempdir: /tmp/gitrun-ephemeral]</span>
          </div>
          <div className="mini-terminal-body">
            <div className="mini-line">
              <span className="prompt-sym">$</span>
              <span className="prompt-cmd">gitrunbykaru github.com/vercel/next.js</span>
            </div>
            <div className="mini-line">
              <span className="sym-magenta">→</span>
              <span className="text-secondary">Detecting project...</span>
            </div>
            <div className="mini-line">
              <span className="sym-green-bold">✔ Ready</span>
              <span className="ready-url">http://localhost:3000</span>
              <span className="blinking-cursor">█</span>
            </div>
          </div>
        </motion.div>

        {/* Primary Install Command Action */}
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
        </motion.div>

        {/* Technical Trust Strip */}
        <motion.div
          className="hero-trust-strip text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://www.npmjs.com/package/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="trust-pill trust-link"
            title="View npm package downloads"
          >
            <NpmIcon size={13} className="text-magenta" />
            <span><strong className="text-primary">{stats.downloads}+</strong> npm downloads</span>
          </a>
          <span className="trust-dot">·</span>
          <div className="trust-pill">
            <Tag size={13} className="text-cyan" />
            <span><strong className="text-primary">{stats.releases}</strong> releases</span>
          </div>
          <span className="trust-dot">·</span>
          <div className="trust-pill">
            <ShieldCheck size={13} className="text-green" />
            <span>MIT License</span>
          </div>
          <span className="trust-dot">·</span>
          <div className="trust-pill">
            <Code2 size={13} className="text-magenta" />
            <span>Open Source</span>
          </div>
        </motion.div>

        {/* Developer Signature Card */}
        <motion.div
          className="hero-signature-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="signature-quote">
            "Built because I was tired of spending 20 minutes configuring repos I'd close in 2."
          </p>
          <span className="signature-author">— Karthikeya Dusi, Creator</span>
        </motion.div>

      </div>
    </section>
  );
}
