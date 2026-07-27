import React, { useRef, useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BeforeAfter } from './components/BeforeAfter';
import { TerminalDemo } from './components/TerminalDemo';
import { Pipeline } from './components/Pipeline';
import { Features } from './components/Features';
import { ProjectJourney } from './components/ProjectJourney';
import { OpenSource } from './components/OpenSource';
import { Footer } from './components/Footer';
import { StickyInstallBar } from './components/ui/StickyInstallBar';
import { SectionConnector } from './components/ui/SectionConnector';
import './App.css';

export function App() {
  const heroRef = useRef(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // IntersectionObserver for Hero install command -> Sticky bar trigger
  useEffect(() => {
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when Hero is NOT intersecting (scrolled past)
        setIsStickyVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

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
      <Navbar />
      <main>
        <Hero heroRef={heroRef} />
        
        <SectionConnector label="evaluate_friction" />
        <BeforeAfter />

        <SectionConnector label="execute_live_demo" />
        <TerminalDemo />

        <SectionConnector label="inspect_pipeline" />
        <Pipeline />

        <SectionConnector label="edge_cases_handled" />
        <Features />

        <SectionConnector label="project_momentum" />
        <ProjectJourney />

        <SectionConnector label="open_source_community" />
        <OpenSource />
      </main>
      <Footer />
      <StickyInstallBar isVisible={isStickyVisible} />

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
