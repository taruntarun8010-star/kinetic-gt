import React from 'react';

export function BrandEmblem({ brand, className = 'w-6 h-6' }: { brand: string; className?: string }) {
  const b = brand.toLowerCase();

  if (b.includes('bugatti')) {
    return (
      <svg viewBox="0 0 100 60" className={className} fill="currentColor">
        <ellipse cx="50" cy="30" rx="46" ry="26" fill="none" stroke="currentColor" strokeWidth="4" />
        <text x="50" y="38" textAnchor="middle" fontSize="24" fontFamily="serif" fontWeight="bold">EB</text>
      </svg>
    );
  }
  if (b.includes('koenigsegg')) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path d="M50 8 L85 28 L85 72 L50 92 L15 72 L15 28 Z" fill="none" stroke="currentColor" strokeWidth="5" />
        <path d="M30 40 L50 25 L70 40 L50 75 Z" fill="currentColor" opacity="0.6" />
      </svg>
    );
  }
  if (b.includes('pagani')) {
    return (
      <svg viewBox="0 0 100 40" className={className} fill="currentColor">
        <ellipse cx="50" cy="20" rx="44" ry="16" fill="none" stroke="currentColor" strokeWidth="3" />
        <text x="50" y="26" textAnchor="middle" fontSize="16" letterSpacing="4" fontWeight="900">PAGANI</text>
      </svg>
    );
  }
  if (b.includes('ferrari')) {
    return (
      <svg viewBox="0 0 60 90" className={className} fill="currentColor">
        <rect x="5" y="5" width="50" height="80" rx="10" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M22 68 C 24 50, 36 35, 34 22 C 30 28, 20 30, 22 45 C 16 38, 25 18, 38 15 C 38 32, 45 42, 38 68 Z" fill="currentColor" />
      </svg>
    );
  }
  if (b.includes('porsche')) {
    return (
      <svg viewBox="0 0 70 90" className={className} fill="currentColor">
        <path d="M10 10 L60 10 L55 60 L35 85 L15 60 Z" fill="none" stroke="currentColor" strokeWidth="4" />
        <text x="35" y="26" textAnchor="middle" fontSize="9" fontWeight="900" letterSpacing="1">PORSCHE</text>
        <path d="M28 42 L42 42 L35 62 Z" fill="currentColor" />
      </svg>
    );
  }
  if (b.includes('lamborghini')) {
    return (
      <svg viewBox="0 0 70 85" className={className} fill="currentColor">
        <polygon points="35,5 65,22 55,75 35,82 15,75 5,22" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M25 45 C 30 35, 45 35, 45 52 C 40 50, 35 55, 30 50 Z" fill="currentColor" />
      </svg>
    );
  }
  if (b.includes('red bull')) {
    return (
      <svg viewBox="0 0 100 60" className={className} fill="currentColor">
        <circle cx="50" cy="30" r="18" fill="currentColor" opacity="0.3" />
        <path d="M15 35 Q 35 15 50 32 Q 65 15 85 35 Q 65 28 50 42 Q 35 28 15 35 Z" fill="currentColor" />
      </svg>
    );
  }
  if (b.includes('rolls-royce') || b.includes('rolls')) {
    return (
      <svg viewBox="0 0 60 80" className={className} fill="currentColor">
        <rect x="6" y="6" width="48" height="68" rx="6" fill="none" stroke="currentColor" strokeWidth="4" />
        <text x="30" y="38" textAnchor="middle" fontSize="22" fontWeight="bold">R</text>
        <text x="34" y="58" textAnchor="middle" fontSize="22" fontWeight="bold">R</text>
      </svg>
    );
  }
  if (b.includes('rimac')) {
    return (
      <svg viewBox="0 0 90 60" className={className} fill="currentColor">
        <polygon points="15,45 30,15 45,45" fill="none" stroke="currentColor" strokeWidth="4" />
        <polygon points="45,45 60,15 75,45" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="45" cy="30" r="4" fill="currentColor" />
      </svg>
    );
  }
  if (b.includes('boeing')) {
    return (
      <svg viewBox="0 0 100 50" className={className} fill="currentColor">
        <circle cx="50" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M20 25 C 40 10, 60 10, 80 25 C 60 40, 40 40, 20 25 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <polygon points="45,15 62,25 45,35" fill="currentColor" />
      </svg>
    );
  }
  if (b.includes('airbus')) {
    return (
      <svg viewBox="0 0 100 45" className={className} fill="currentColor">
        <path d="M10 22 C 30 10, 70 10, 90 22 C 70 34, 30 34, 10 22 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <text x="50" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" letterSpacing="2">AIRBUS</text>
      </svg>
    );
  }
  if (b.includes('concorde') || b.includes('aérospatiale')) {
    return (
      <svg viewBox="0 0 80 80" className={className} fill="currentColor">
        <polygon points="40,10 65,65 40,55 15,65" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="40" y1="10" x2="40" y2="55" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }
  if (b.includes('lockheed') || b.includes('skunk')) {
    return (
      <svg viewBox="0 0 90 90" className={className} fill="currentColor">
        <polygon points="45,10 80,45 45,80 10,45" fill="none" stroke="currentColor" strokeWidth="4" />
        <polygon points="45,25 65,45 45,65 25,45" fill="currentColor" opacity="0.4" />
        <circle cx="45" cy="45" r="5" fill="currentColor" />
      </svg>
    );
  }
  if (b.includes('northrop')) {
    return (
      <svg viewBox="0 0 100 50" className={className} fill="currentColor">
        <polygon points="50,10 90,40 70,35 50,42 30,35 10,40" fill="none" stroke="currentColor" strokeWidth="3.5" />
      </svg>
    );
  }

  // Generic Aerospace / GT emblem fallback
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor">
      <circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" strokeWidth="4" />
      <polygon points="40,20 55,55 40,48 25,55" fill="currentColor" />
    </svg>
  );
}
