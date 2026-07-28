import React from 'react';

export function TechIcon({ name, size = 16, className = '' }) {
  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: `tech-icon-svg ${className}`
  };

  switch (name) {
    case 'Node.js':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.608l-10.4 6v12l10.4 6 10.4-6v-12l-10.4-6zm-1.2 16.32v-5.28l4.4 2.64v5.28l-4.4-2.64zm6.8-4.08l-4.4-2.64 4.4-2.64 4.4 2.64-4.4 2.64zm-11.2 0l-4.4-2.64 4.4-2.64 4.4 2.64-4.4 2.64zm5.6-3.36l-4.4-2.64 4.4-2.64 4.4 2.64-4.4 2.64z" />
        </svg>
      );

    case 'Next.js':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm4.872 17.82l-7.05-9.336V16.8H8.352V7.2h1.68l6.816 9.072V7.2h1.44v10.62h-1.416z" />
        </svg>
      );

    case 'Vite':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.16 3.12l-10.3 18.57a1 1 0 01-1.72 0L.84 3.12a.6.6 0 01.76-.84l9.9 4.14a.6.6 0 00.46 0l9.9-4.14a.6.6 0 01.8 1.02z" />
        </svg>
      );

    case 'React':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm0-7C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <circle cx="12" cy="12" r="2.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(150 12 12)" />
        </svg>
      );

    case 'Express':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12h16M4 6h16M4 18h10" />
        </svg>
      );

    case 'Python':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.91 0c-5.4 0-5.06 2.34-5.06 2.34l.01 2.43h5.12v.73H4.85S1.5 5.12 1.5 10.59c0 5.48 2.92 5.28 2.92 5.28l1.74-.01v-2.48s-.09-2.92 2.87-2.92h4.94s2.76.04 2.76-2.67V5.12s.37-5.12-4.82-5.12zm-2.6 1.48a.9.9 0 110 1.8.9.9 0 010-1.8zm2.7 21.04c5.4 0 5.06-2.34 5.06-2.34l-.01-2.43h-5.12v-.73h7.13s3.35.38 3.35-5.09c0-5.48-2.92-5.28-2.92-5.28l-1.74.01v2.48s.09 2.92-2.87 2.92h-4.94s-2.76-.04-2.76 2.67v2.67s-.37 5.12 4.82 5.12zm2.6-1.48a.9.9 0 110-1.8.9.9 0 010 1.8z" />
        </svg>
      );

    case 'Django':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.23 0v16.14c-1.39.46-2.78.69-4.17.69-4.22 0-6.19-2.3-6.19-5.74 0-3.69 2.45-6.04 6.13-6.04 1.47 0 2.8.31 4.23.95V0h4.16v23.47h-4.16v-2.73c-1.43.9-3 1.35-4.7 1.35C2.19 22.09 0 18.57 0 11.09 0 3.73 2.71 0 7.82 0h3.41z" />
        </svg>
      );

    case 'Flask':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 3h6M10 3v5l-6 10.5A2 2 0 005.7 21.5h12.6a2 2 0 001.7-3L14 8V3" />
        </svg>
      );

    case 'FastAPI':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm1 18l-5-7h4V6l5 7h-4v5z" />
        </svg>
      );

    case 'HTML5':
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.58-2.438L1.5 0zm15.75 6.94H6.84l.26 2.92h9.91l-.64 7.19-4.4 1.22-4.4-1.22-.29-3.23h2.89l.15 1.63 1.65.45 1.65-.45.18-1.95H6.28l-.75-8.43h11.99l-.27 2.92z" />
        </svg>
      );

    default:
      return null;
  }
}
