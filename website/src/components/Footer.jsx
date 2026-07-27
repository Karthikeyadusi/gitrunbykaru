import React from 'react';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        
        <div className="footer-left">
          <span className="footer-brand">gitrunbykaru</span>
          <span className="footer-license text-tertiary">· MIT License</span>
        </div>

        <div className="footer-links">
          <a href="https://github.com/Karthikeyadusi/gitrunbykaru" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
          <a href="https://www.npmjs.com/package/gitrunbykaru" target="_blank" rel="noreferrer" className="footer-link">npm</a>
          <a href="https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer" className="footer-link">Changelog</a>
          <a href="https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/docs/ARCHITECTURE.md" target="_blank" rel="noreferrer" className="footer-link">Architecture</a>
        </div>

        <div className="footer-right text-tertiary">
          Built by <a href="https://github.com/Karthikeyadusi" target="_blank" rel="noreferrer" className="author-link">Karthikeya Dusi</a>
        </div>

      </div>
    </footer>
  );
}
