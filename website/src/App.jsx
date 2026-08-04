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
        <BeforeAfter />
        <TerminalDemo />
        <Pipeline />
        <RuntimeEngine />
        <Features />
        <ProjectJourney />
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
