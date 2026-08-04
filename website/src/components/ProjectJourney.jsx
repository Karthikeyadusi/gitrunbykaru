import React from 'react';
import { motion } from 'framer-motion';
import { TimelineNode } from './ui/TimelineNode';
import { JOURNEY_MILESTONES } from '../data/siteData';
import './ProjectJourney.css';

export function ProjectJourney() {
  return (
    <section className="section journey-section" id="journey">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="type-h2">Built in the open. Improving every release.</h2>
          <p className="type-body text-secondary">
            Over 4 months of active development, 6 releases, and growing community adoption.
          </p>
        </div>

        <div className="journey-timeline-wrapper">
          {JOURNEY_MILESTONES.map((ms, idx) => (
            <motion.div
              key={ms.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <TimelineNode
                milestone={ms}
                isLast={idx === JOURNEY_MILESTONES.length - 1}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
