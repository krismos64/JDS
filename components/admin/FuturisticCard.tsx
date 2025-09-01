'use client';

import { ReactNode } from 'react';

interface FuturisticCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function FuturisticCard({
  children,
  className = '',
  onClick
}: FuturisticCardProps) {
  return (
    <div
      className={`
        bg-slate-800 
        rounded-lg 
        border border-slate-700
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}