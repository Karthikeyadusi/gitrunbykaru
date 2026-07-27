import React from 'react';
import { motion } from 'framer-motion';
import { ResourceCard } from './ui/ResourceCard';
import { RESOURCE_CARDS } from '../data/siteData';
import { NpmIcon } from './ui/NpmIcon';
import { GithubIcon } from './ui/GithubIcon';
import './OpenSource.css';

export function OpenSource() {
  return (
    <section className="section open-source-section" id="community">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="type-h2">Open source & published on npm.</h2>
          <p className="type-body text-secondary max-w-xl">
            GitRunByKaru is MIT-licensed, published on npm, and built completely in the open. Every part of the codebase, architecture, and release process is fully documented.
          </p>
        </div>

        {/* 5 Resource Cards Grid */}
        <div className="resources-grid">
          {RESOURCE_CARDS.map((res, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <ResourceCard
                title={res.title}
                desc={res.desc}
                link={res.link}
                icon={res.icon}
              />
            </motion.div>
          ))}
        </div>

        {/* Community Actions CTAs */}
        <div className="community-ctas">
          <a
            href="https://www.npmjs.com/package/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="star-btn"
          >
            <NpmIcon size={16} className="text-magenta" />
            <span>View on npm →</span>
          </a>

          <a
            href="https://github.com/Karthikeyadusi/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="repo-btn text-secondary"
          >
            <GithubIcon size={16} />
            <span>View Repository →</span>
          </a>
        </div>

      </div>
    </section>
  );
}
