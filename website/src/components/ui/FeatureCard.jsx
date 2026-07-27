import React from 'react';
import * as Icons from 'lucide-react';
import './FeatureCard.css';

export function FeatureCard({ icon, title, desc, featured }) {
  const IconComponent = Icons[icon] || Icons.Sparkles;

  return (
    <div className={`feature-card ${featured ? 'featured' : ''}`}>
      <div className="feature-icon-wrapper">
        <IconComponent size={22} className={featured ? 'text-magenta' : 'text-cyan'} />
      </div>
      <h3 className="type-h3 feature-title">{title}</h3>
      <p className="type-body-sm text-secondary">{desc}</p>
    </div>
  );
}
