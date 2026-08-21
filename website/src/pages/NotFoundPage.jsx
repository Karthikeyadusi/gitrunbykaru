import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, AlertTriangle } from 'lucide-react';
import './NotFoundPage.css';

export function NotFoundPage({ onBackToHome }) {
  useEffect(() => {
    document.title = '404 — Page Not Found | gitrunbykaru';
  }, []);

  return (
    <div className="not-found-page-wrapper">
      <div className="container not-found-container">
        
        <motion.div
          className="not-found-card"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="not-found-badge">
            <AlertTriangle size={14} className="text-magenta" />
            <span>HTTP 404 • Not Found</span>
          </div>

          <h1 className="type-h1 not-found-title">
            Page Not Found
          </h1>

          <p className="type-body text-secondary not-found-desc">
            The route you requested does not exist in this workspace.
          </p>

          <div className="not-found-terminal-box">
            <div className="not-found-line">
              <span className="prompt-sym">$</span>
              <span className="prompt-cmd">gitrunbykaru locate {window.location.pathname}</span>
            </div>
            <div className="not-found-line">
              <span className="sym-red">✖</span>
              <span className="text-tertiary">Error: Route '{window.location.pathname}' not found (Exit code 404)</span>
            </div>
          </div>

          <button className="return-home-btn" onClick={onBackToHome}>
            <ArrowLeft size={16} />
            <span>Return to Homepage</span>
          </button>
        </motion.div>

      </div>
    </div>
  );
}
