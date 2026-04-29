'use client';

import { ReactNode } from 'react';

interface FuturisticCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
}

export default function FuturisticCard({
  children,
  className = '',
  onClick,
}: FuturisticCardProps) {
  return (
    <div
      className={`
        bg-slate-800/60
        rounded-xl
        border border-slate-700/60
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
