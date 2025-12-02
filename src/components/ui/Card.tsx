'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className = '', hover = false, glow = false }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur transition-all ${
        hover ? 'hover:scale-[1.02] hover:border-slate-700' : ''
      } ${glow ? 'shadow-[0_22px_60px_rgba(15,23,42,0.9)]' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

