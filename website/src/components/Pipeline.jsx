import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { PIPELINE_STEPS, TECH_STACKS } from '../data/siteData';
import './Pipeline.css';

export function Pipeline() {
  return (
    <section className="section pipeline-section" id="pipeline">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="type-h2">What happens under the hood.</h2>
          <p className="type-body text-secondary">
            A linear execution pipeline built for speed, safety, and zero local clutter.
          </p>
        </div>

        {/* 5-Step Pipeline Stepper */}
        <div className="pipeline-stepper">
          {PIPELINE_STEPS.map((step, idx) => {
            const IconComp = Icons[step.icon] || Icons.Code;
            const isLast = idx === PIPELINE_STEPS.length - 1;

            return (
              <React.Fragment key={step.id}>
                <motion.div
                  className="pipeline-node"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="pipeline-icon-box">
                    <IconComp size={20} className="text-magenta" />
                  </div>
                  <h3 className="type-h3 pipeline-title">{step.title}</h3>
                  <p className="type-body-sm text-secondary pipeline-desc">{step.desc}</p>
                </motion.div>

                {!isLast && (
                  <div className="pipeline-connector">
                    <span className="connector-dot"></span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Tech Stack Grid */}
        <div className="tech-stack-wrapper">
          <span className="tech-stack-label text-tertiary">Works out of the box with</span>
          <div className="tech-stack-grid">
            {TECH_STACKS.map((tech, idx) => (
              <div key={idx} className="tech-badge">
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
