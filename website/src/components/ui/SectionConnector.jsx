import React from 'react';
import './SectionConnector.css';

export function SectionConnector({ label }) {
  return (
    <div className="section-connector" aria-hidden="true">
      <div className="connector-line-wrapper">
        <span className="connector-vertical-line"></span>
        <div className="connector-node-pill">
          <span className="connector-branch">├──</span>
          <span className="connector-label">{label}</span>
          <span className="connector-cursor">█</span>
        </div>
      </div>
    </div>
  );
}
