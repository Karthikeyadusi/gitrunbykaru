import React from 'react';

export function NpmIcon({ size = 16, width, height, className = '' }) {
  const w = width || size * 2.2;
  const h = height || size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 780 250"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,250h210V0H0V250z M70,50h70v150H70V50z"/>
    </svg>
  );
}
