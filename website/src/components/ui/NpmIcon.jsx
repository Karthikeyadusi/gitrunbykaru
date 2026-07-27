import React from 'react';

export function NpmIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 7.334v8h6.666v-8H0zm2.667 5.333H1.333V8.667h1.334v4zm2.666 0H4V8.667h1.333v4zM8 7.334v8h6.667v-8H8zm2.667 5.333H9.333V8.667h1.334v4zm2.666 0h-1.333V8.667h1.333v4zm2.667-5.333v8H24v-8h-8zm2.667 5.333h-1.334V8.667h1.334v4zm2.666 0h-1.333V8.667h1.333v4z"/>
    </svg>
  );
}
