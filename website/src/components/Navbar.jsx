import React, { useState, useEffect } from 'react';
import { CopyButton } from './ui/CopyButton';
import { GithubIcon } from './ui/GithubIcon';
import './Navbar.css';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="nav-logo">
          <span className="logo-brand">gitrunbykaru</span>
        </a>

        <nav className="nav-links">
          <a href="#demo" className="nav-link">Demo</a>
          <a href="#pipeline" className="nav-link">Pipeline</a>
          <a href="#journey" className="nav-link">Journey</a>
          <a href="https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer" className="nav-link">Changelog</a>
        </nav>

        <div className="nav-actions">
          <a
            href="https://github.com/Karthikeyadusi/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="nav-icon-link"
            aria-label="View on GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <CopyButton text="npm install -g gitrunbykaru" label="npm i -g gitrunbykaru" className="nav-install-btn" />
        </div>
      </div>
    </header>
  );
}
