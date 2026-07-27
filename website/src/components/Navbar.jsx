import React, { useState, useEffect } from 'react';
import { GithubIcon } from './ui/GithubIcon';
import { NpmIcon } from './ui/NpmIcon';
import { ArrowUpRight } from 'lucide-react';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'demo', label: 'Demo', href: '#demo' },
  { id: 'pipeline', label: 'Pipeline', href: '#pipeline' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'community', label: 'Community', href: '#community' }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('demo');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer for scroll spy active navigation
  useEffect(() => {
    const sectionIds = ['demo', 'pipeline', 'journey', 'community'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        
        {/* Clean Terminal Shell Logo */}
        <a href="#" className="nav-logo" aria-label="gitrunbykaru homepage">
          <span className="logo-prompt">$</span>
          <span className="logo-brand">gitrunbykaru</span>
        </a>

        {/* CLI Control Panel Nav Links */}
        <nav className="nav-links" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && <span className="active-indicator">❯</span>}
                <span>{item.label}</span>
              </a>
            );
          })}
          <a
            href="https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
            className="nav-link external-link"
          >
            <span>Changelog</span>
          </a>
        </nav>

        {/* Action Pills for npm & GitHub */}
        <div className="nav-actions">
          <a
            href="https://www.npmjs.com/package/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="nav-action-pill"
            title="View package on npm registry"
            aria-label="View package on npm registry"
          >
            <NpmIcon size={14} className="action-npm-icon" />
            <ArrowUpRight size={13} className="action-arrow" />
          </a>

          <a
            href="https://github.com/Karthikeyadusi/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="nav-action-pill"
            title="View repository on GitHub"
            aria-label="View repository on GitHub"
          >
            <GithubIcon size={16} className="action-github-icon" />
            <ArrowUpRight size={13} className="action-arrow" />
          </a>
        </div>

      </div>
    </header>
  );
}
