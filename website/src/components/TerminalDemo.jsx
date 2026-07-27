import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalWindow } from './ui/TerminalWindow';
import { TerminalLine } from './ui/TerminalLine';
import { CopyButton } from './ui/CopyButton';
import { DEMO_SCRIPTS } from '../data/siteData';
import './TerminalDemo.css';

export function TerminalDemo() {
  const [activeScriptKey, setActiveScriptKey] = useState('nextjs');
  const [replayKey, setReplayKey] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const scriptList = Object.values(DEMO_SCRIPTS).map((s) => ({ id: s.id, label: s.label }));
  const currentScript = DEMO_SCRIPTS[activeScriptKey];

  useEffect(() => {
    setVisibleLines([]);
    setIsPlaying(true);

    const timeouts = currentScript.lines.map((line) => {
      return setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay);
    });

    const maxDelay = Math.max(...currentScript.lines.map((l) => l.delay));
    const totalDuration = maxDelay + 4000;

    const loopTimeout = setTimeout(() => {
      setIsPlaying(false);
      setActiveScriptKey((prev) => {
        if (prev === 'nextjs') return 'python';
        if (prev === 'python') return 'static';
        return 'nextjs';
      });
    }, totalDuration);

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
      clearTimeout(loopTimeout);
    };
  }, [activeScriptKey, replayKey]);

  const handleSelectScript = (key) => {
    if (key !== activeScriptKey) {
      setActiveScriptKey(key);
    }
  };

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <section className="section terminal-demo-section" id="demo">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="type-h2">See it work live.</h2>
          <p className="type-body text-secondary">
            One command clones, detects, installs, launches the app, and cleanly deletes the workspace on exit.
          </p>
        </div>

        <motion.div
          className="demo-window-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TerminalWindow
            title="~/terminal"
            onReplay={handleReplay}
            isPlaying={isPlaying}
            activeScriptKey={activeScriptKey}
            onSelectScript={handleSelectScript}
            scripts={scriptList}
          >
            <div className="terminal-prompt-line">
              <span className="prompt-sym">$</span>
              <span className="prompt-cmd">{currentScript.command}</span>
            </div>

            <div className="terminal-lines-body">
              {visibleLines.map((line, idx) => (
                <TerminalLine key={`${activeScriptKey}-${replayKey}-${idx}`} line={line} />
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
