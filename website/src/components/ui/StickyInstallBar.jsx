import React from 'react';
import { CopyButton } from './CopyButton';
import { AlertTriangle } from 'lucide-react';
import './StickyInstallBar.css';

export function StickyInstallBar({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="sticky-install-bar" role="banner">
      <div className="container sticky-container">
        <div className="sticky-left">
          <span className="sticky-brand">gitrunbykaru</span>
          <span className="sticky-text text-secondary">— run conventional repos in seconds</span>
        </div>
        <div className="sticky-right">
          <CopyButton text="npm install -g gitrunbykaru" className="sticky-copy-btn" />
          <div className="security-tooltip-wrapper">
            <AlertTriangle size={15} className="security-icon text-tertiary" />
            <div className="security-tooltip">
              ⚠ Executes code locally. Only run repositories you trust.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
