import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Bot, Cpu, CheckCircle2 } from 'lucide-react';
import './RuntimeEngine.css';

export function RuntimeEngine() {
  return (
    <section className="section engine-section" id="engine">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="type-h2">One Runtime. Multiple Interfaces.</h2>
          <p className="type-body text-secondary engine-subtitle">
            The same execution engine powers developers using the CLI, automation through JSON mode, and compatible AI coding agents through MCP.
          </p>
        </div>

        <div className="engine-diagram-container">
          
          {/* Top Layer: Interfaces */}
          <div className="interfaces-grid">
            <motion.div
              className="interface-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="interface-icon icon-cli">
                <Terminal size={18} />
              </div>
              <h3 className="type-h3 interface-title">Human CLI</h3>
              <p className="type-body-sm text-tertiary">
                Terminal command for fast 1-line repo previews.
              </p>

            </motion.div>

            <motion.div
              className="interface-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="interface-icon icon-json">
                <Code size={18} />
              </div>
              <h3 className="type-h3 interface-title">JSON Mode</h3>
              <p className="type-body-sm text-tertiary">
                Machine-readable output for scripts and CI/CD.
              </p>

            </motion.div>

            <motion.div
              className="interface-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="interface-icon icon-mcp">
                <Bot size={18} />
              </div>
              <h3 className="type-h3 interface-title">AI MCP Server</h3>
              <p className="type-body-sm text-tertiary">
                Native Model Context Protocol for Cursor & Claude.
              </p>

            </motion.div>
          </div>

          {/* Convergence Arrows */}
          <div className="convergence-flow">
            <div className="flow-line left-line"></div>
            <div className="flow-line center-line"></div>
            <div className="flow-line right-line"></div>
          </div>

          {/* Center Engine Core */}
          <motion.div
            className="engine-core-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="core-badge">
              <Cpu size={20} className="text-magenta" />
              <span className="type-h3">Runtime Engine Core</span>
            </div>
            <p className="type-body-sm text-secondary core-desc">
              Detects framework ➔ Auto-mocks .env ➔ Heals lockfiles ➔ Spawns process ➔ Probes TCP GET sockets
            </p>
          </motion.div>

          {/* Flow to Output */}
          <div className="output-arrow-down">↓</div>

          {/* Bottom Output */}
          <motion.div
            className="engine-output-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CheckCircle2 size={18} className="text-green" />
            <span className="type-body-sm text-primary">Running Development App (localhost)</span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
