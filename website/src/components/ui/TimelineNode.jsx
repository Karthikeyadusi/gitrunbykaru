import React from 'react';
import './TimelineNode.css';

export function TimelineNode({ milestone, isLast }) {
  return (
    <div className={`timeline-node ${milestone.isLatest ? 'is-latest' : ''} ${milestone.isFuture ? 'is-future' : ''}`}>
      <div className="node-marker">
        <span className="node-dot"></span>
        {!isLast && <span className={`node-line ${milestone.isFuture ? 'dashed' : ''}`}></span>}
      </div>
      <div className="node-content">
        <div className="node-header">
          <h3 className="type-h3 node-title">{milestone.title}</h3>
          {milestone.isLatest && <span className="latest-badge">LATEST</span>}
        </div>
        <p className="type-body node-desc">{milestone.desc}</p>
        <p className="type-body-sm text-tertiary">{milestone.subdesc}</p>
      </div>
    </div>
  );
}
