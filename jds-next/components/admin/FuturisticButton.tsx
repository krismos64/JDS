'use client';

import { ReactNode } from 'react';

interface FuturisticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export default function FuturisticButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = ''
}: FuturisticButtonProps) {

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-purple-600 hover:bg-purple-700',
    danger: 'bg-red-600 hover:bg-red-700',
    success: 'bg-green-600 hover:bg-green-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
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
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}