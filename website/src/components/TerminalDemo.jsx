import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalWindow } from './ui/TerminalWindow';
import { TerminalLine } from './ui/TerminalLine';
import { CopyButton } from './ui/CopyButton';
import { DEMO_SCRIPTS } from '../data/siteData';
import './TerminalDemo.css';

export function TerminalDemo() {
  const [activeScriptKey, setActiveScriptKey] = useState('nextjs');
  const [visibleLines, setVisibleLines] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const script = DEMO_SCRIPTS[activeScriptKey];

  useEffect(() => {
    setVisibleLines([]);
    setIsPlaying(true);

    const timeouts = script.lines.map((line) => {
      return setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay);
    });

    // Auto-loop to alternate script after 12 seconds
    const loopTimeout = setTimeout(() => {
      setIsPlaying(false);
      setActiveScriptKey((prev) => (prev === 'nextjs' ? 'python' : 'nextjs'));
    }, 12000);

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
      clearTimeout(loopTimeout);
    };
  }, [activeScriptKey]);

  const handleReplay = () => {
    setVisibleLines([]);
    setIsPlaying(true);
    // Re-trigger effect by toggling script key briefly or forcing re-render
    setActiveScriptKey((prev) => prev);
  };

  return (
    <section className="section terminal-demo-section" id="demo">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="type-h2">See it work live.</h2>
          <p className="type-body text-secondary">
            One command handles cloning, detection, dependency installation, environment setup, and browser launch.
          </p>
        </div>

        <motion.div
          className="demo-window-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TerminalWindow title="~/terminal" onReplay={handleReplay} isPlaying={isPlaying}>
            <div className="terminal-prompt-line">
              <span className="prompt-sym">$</span>
              <span className="prompt-cmd">{script.command}</span>
            </div>

            <div className="terminal-lines-body">
              {visibleLines.map((line, idx) => (
                <TerminalLine key={idx} line={line} />
              ))}
            </div>
          </TerminalWindow>

          {/* Trial Hint */}
          <div className="npx-trial-hint text-center">
            <span className="text-secondary">Try it right now without installing globally:</span>
            <code className="npx-code">npx gitrunbykaru https://github.com/Karthikeyadusi/gitrunbykaru</code>
          </div>

          {/* Install Bar CTA */}
          <div className="demo-cta-bar">
            <CopyButton text="npm install -g gitrunbykaru" className="demo-copy-btn" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
