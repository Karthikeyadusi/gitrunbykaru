import React, { useRef, useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BeforeAfter } from './components/BeforeAfter';
import { TerminalDemo } from './components/TerminalDemo';
import { Pipeline } from './components/Pipeline';
import { RuntimeEngine } from './components/RuntimeEngine';
import { Features } from './components/Features';
import { ProjectJourney } from './components/ProjectJourney';
import { OpenSource } from './components/OpenSource';
import { Footer } from './components/Footer';
import { StickyInstallBar } from './components/ui/StickyInstallBar';
import { AiGuidePage } from './pages/AiGuidePage';
import { FaqPage } from './pages/FaqPage';
import { InstallPage } from './pages/InstallPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

function getRouteFromLocation() {
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '' || path === '/') return 'home';
  if (path === '/ai') return 'ai';
  if (path === '/faq') return 'faq';
  if (path === '/install') return 'install';
  if (path === '/compare') return 'compare';
  return '404';
}

export function App() {
  const heroRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(getRouteFromLocation);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync document title and URL when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const titles = {
      home: 'gitrunbykaru — Run GitHub repos locally with one command',
      ai: 'AI Agent Integration Guide (MCP) — gitrunbykaru',
      faq: 'FAQ — gitrunbykaru',
      install: 'Install & Run — gitrunbykaru',
      compare: 'gitrunbykaru vs Alternatives — gitrunbykaru',
    };
    document.title = titles[currentPage] || titles.home;
    const paths = {
      home: '/',
      ai: '/ai',
      faq: '/faq',
      install: '/install',
      compare: '/compare',
    };
    window.history.replaceState(null, '', paths[currentPage] || '/');
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getRouteFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // IntersectionObserver for Hero install command -> Sticky bar trigger
  useEffect(() => {
    if (currentPage !== 'home') return;
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [currentPage]);

  // Global Keyboard Shortcut: Cmd/Ctrl + K to copy install command
  useEffect(() => {
    const handleKeyDown = async (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText('npm install -g gitrunbykaru');
          setToastMessage('Copied: npm install -g gitrunbykaru');
          setTimeout(() => setToastMessage(null), 2500);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar onNavigateAi={() => setCurrentPage('ai')} onNavigateHome={() => setCurrentPage('home')} />
      
      {currentPage === 'ai' ? (
        <AiGuidePage onBackToHome={() => setCurrentPage('home')} />
      ) : currentPage === 'faq' ? (
        <FaqPage />
      ) : currentPage === 'install' ? (
        <InstallPage />
      ) : currentPage === 'compare' ? (
        <ComparisonPage />
      ) : currentPage === '404' ? (
        <NotFoundPage onBackToHome={() => setCurrentPage('home')} />
      ) : (
        <main>
          <Hero heroRef={heroRef} />
          <BeforeAfter />
          <TerminalDemo />
          <Pipeline />
          <RuntimeEngine />
          <Features />
          <ProjectJourney />
          <OpenSource />
        </main>
      )}

      <Footer />
      {currentPage === 'home' && <StickyInstallBar isVisible={isStickyVisible} />}

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="global-toast" role="status">
          <span className="toast-icon">✔</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;