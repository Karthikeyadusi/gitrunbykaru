import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TimelineNode } from './ui/TimelineNode';
import { JOURNEY_MILESTONES } from '../data/siteData';
import { fetchLiveStats } from '../utils/fetchStats';
import './ProjectJourney.css';

export function ProjectJourney() {
  const [stats, setStats] = useState({
    downloads: 860,
    formattedDownloads: '860+',
    releases: 4,
    latestVersion: 'v2.0.3',
    isLive: false
  });

  useEffect(() => {
    fetchLiveStats().then((data) => {
      if (data) setStats(data);
    });
  }, []);

  return (
    <section className="section journey-section" id="journey">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="type-h2">Built in the open. Improving every release.</h2>
          <p className="type-body text-secondary">
            Over 4 months of active development, {stats.releases} releases, and growing community adoption.
          </p>
        </div>

        <div className="journey-timeline-wrapper">
          {JOURNEY_MILESTONES.map((ms, idx) => {
            // Dynamic stats binding for timeline nodes so they remain 100% in sync with header stats
            const milestone = { ...ms };
            if (ms.id === 'downloads') {
              milestone.title = `${stats.formattedDownloads || `${stats.downloads}+`} Downloads`;
            } else if (ms.id === 'future') {
              milestone.subdesc = `${stats.releases} releases and counting.`;
            } else if (ms.id === 'v203') {
              milestone.title = `${stats.latestVersion || 'v2.0.3'} — Latest`;
            }

            return (
              <motion.div
                key={ms.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <TimelineNode
                  milestone={milestone}
                  isLast={idx === JOURNEY_MILESTONES.length - 1}
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
