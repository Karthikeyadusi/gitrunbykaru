import React from 'react';
import { motion } from 'framer-motion';
import './BeforeAfter.css';

const BEFORE_STEPS = [
  'Clone the repository',
  'Read the README',
  'Figure out the package manager',
  'Install dependencies',
  'Configure environment variables',
  'Find the correct run command',
  'Debug setup errors',
  'Open localhost in browser'
];

export function BeforeAfter() {
  return (
    <section className="section before-after-section" id="comparison">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="type-h2">The 8-step ritual nobody talks about.</h2>
          <p className="type-body text-secondary">
            Until now, exploring an open-source project meant doing all of this manually.
          </p>
        </div>

        <div className="comparison-grid">
          
          {/* Left Column: Without GitRunByKaru */}
          <motion.div
            className="comparison-card card-before"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-header">
              <span className="card-label label-before">without gitrunbykaru</span>
              <span className="step-count">8 steps</span>
            </div>

            <ol className="before-steps">
              {BEFORE_STEPS.map((step, idx) => (
                <li key={idx} className="before-step">
                  <span className="step-num">{idx + 1}</span>
                  <span className="step-text text-secondary">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Right Column: With GitRunByKaru */}
          <motion.div
            className="comparison-card card-after"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card-header">
              <span className="card-label label-after">with gitrunbykaru</span>
              <span className="step-count text-green">1 command</span>
            </div>

            <div className="after-content">
              <div className="after-command-block">
                <span className="prompt-sym">$</span>
                <span className="command-text text-magenta">gitrunbykaru &lt;github-url&gt;</span>
              </div>

              <div className="after-result">
                <span className="text-green font-bold">✔  Ready</span>
                <span className="text-cyan underline">http://localhost:3000</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
