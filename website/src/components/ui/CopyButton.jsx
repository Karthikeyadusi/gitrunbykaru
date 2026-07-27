import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './CopyButton.css';

export function CopyButton({ text = 'npm install -g gitrunbykaru', label, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      type="button"
      className={`copy-button ${copied ? 'copied' : ''} ${className}`}
      onClick={handleCopy}
      aria-label={`Copy command: ${text}`}
      title="Click to copy or press Cmd/Ctrl+K"
    >
      <span className="copy-text">{label || text}</span>
      <span className="copy-icon">
        {copied ? <Check size={15} className="text-green" /> : <Copy size={15} />}
      </span>
      {copied && <span className="copy-tooltip">Copied!</span>}
    </button>
  );
}
