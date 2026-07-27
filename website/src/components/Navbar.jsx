import React, { useState, useEffect } from 'react';
import { CopyButton } from './ui/CopyButton';
import { GithubIcon } from './ui/GithubIcon';
import { fetchLiveStats } from '../utils/fetchStats';
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
  const [starsCount, setStarsCount] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch live stats for GitHub star count
  useEffect(() => {
    fetchLiveStats().then((data) => {
      if (data && data.stars) {
        setStarsCount(data.stars);
      }
    });
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
        
        {/* Terminal Shell Logo with Idle Blinking Cursor */}
        <a href="#" className="nav-logo" aria-label="gitrunbykaru homepage">
          <span className="logo-prompt">$</span>
          <span className="logo-brand">gitrunbykaru</span>
          <span className="logo-idle-cursor" aria-hidden="true">█</span>
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

        {/* Integrated GitHub & Primary Action */}
        <div className="nav-actions">
          <a
            href="https://github.com/Karthikeyadusi/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="nav-github-link"
            title="View source repository on GitHub"
            aria-label="View on GitHub"
          >
            <GithubIcon size={15} />
            <span className="github-label">
              {starsCount ? `★ ${starsCount}` : 'github'}
            </span>
          </a>

          <CopyButton
            text="npm install -g gitrunbykaru"
            label="npm i -g gitrunbykaru"
            className="nav-install-btn"
          />
        </div>

      </div>
    </header>
  );
}
