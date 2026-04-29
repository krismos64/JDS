'use client';

import { ComponentType, ReactNode } from 'react';
import { LucideProps } from 'lucide-react';

interface FuturisticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  icon?: ComponentType<LucideProps>;
}

export default function FuturisticButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
  icon: Icon,
}: FuturisticButtonProps) {

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-slate-700 hover:bg-slate-600',
    danger: 'bg-red-600 hover:bg-red-700',
    success: 'bg-emerald-600 hover:bg-emerald-700',
    warning: 'bg-amber-600 hover:bg-amber-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        text-white
        rounded-lg
        font-medium
        inline-flex items-center justify-center gap-2
        transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}
