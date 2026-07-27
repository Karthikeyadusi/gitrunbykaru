import React from 'react';
import * as Icons from 'lucide-react';
import './ResourceCard.css';

export function ResourceCard({ title, desc, link, icon }) {
  const IconComponent = Icons[icon] || Icons.FileText;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="resource-card"
    >
      <div className="resource-header">
        <IconComponent size={20} className="text-magenta" />
        <span className="resource-arrow">→</span>
      </div>
      <h3 className="type-h3 resource-title">{title}</h3>
      <p className="type-body-sm text-secondary">{desc}</p>
    </a>
  );
}
