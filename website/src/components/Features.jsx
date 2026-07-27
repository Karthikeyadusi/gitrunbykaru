import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCard } from './ui/FeatureCard';
import { FEATURE_CARDS } from '../data/siteData';
import './Features.css';

export function Features() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="type-h2">Handles the details you'd rather not.</h2>
          <p className="type-body text-secondary">
            Built from real developer pain points. Designed to work cleanly on every project.
          </p>
        </div>

        <div className="features-grid">
          {FEATURE_CARDS.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <FeatureCard
                icon={feat.icon}
                title={feat.title}
                desc={feat.desc}
                featured={feat.featured}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
