import React, { useState, useEffect } from 'react';
import { GithubIcon } from './ui/GithubIcon';
import { NpmIcon } from './ui/NpmIcon';
import { ArrowUpRight, Bot } from 'lucide-react';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'demo', label: 'Demo', href: '#demo' },
  { id: 'pipeline', label: 'Pipeline', href: '#pipeline' },
  { id: 'engine', label: 'Engine', href: '#engine' },
  { id: 'journey', label: 'Journey', href: '#journey' }
];

export function Navbar({ onNavigateAi, onNavigateHome }) {
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
    const sectionIds = ['demo', 'pipeline', 'engine', 'journey'];
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
        <button className="nav-logo-btn" onClick={onNavigateHome} aria-label="gitrunbykaru homepage">
          <span className="logo-prompt">$</span>
          <span className="logo-brand">gitrunbykaru</span>
        </button>

        {/* CLI Control Panel Nav Links */}
        <nav className="nav-links" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={onNavigateHome}
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

        {/* Prominent Action Buttons for AI, npm & GitHub */}
        <div className="nav-actions">
          <button
            onClick={onNavigateAi}
            className="nav-btn nav-btn-ai"
            title="Connect GitRunByKaru to Cursor, Claude & VS Code AI Agents"
            aria-label="Connect to AI Agents"
          >
            <Bot size={16} className="btn-ai-icon" />
            <span className="btn-label">Use with AI</span>
          </button>

          <a
            href="https://www.npmjs.com/package/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="nav-btn nav-btn-npm"
            title="View package on npm registry"
            aria-label="View package on npm registry"
          >
            <NpmIcon size={18} className="btn-npm-icon" />
            <span className="btn-label">npm</span>
            <ArrowUpRight size={14} className="btn-arrow" />
          </a>

          <a
            href="https://github.com/Karthikeyadusi/gitrunbykaru"
            target="_blank"
            rel="noreferrer"
            className="nav-btn nav-btn-github"
            title="View repository on GitHub"
            aria-label="View repository on GitHub"
          >
            <GithubIcon size={18} className="btn-github-icon" />
            <span className="btn-label">GitHub</span>
            <ArrowUpRight size={14} className="btn-arrow" />
          </a>
        </div>

      </div>
    </header>
  );
}
