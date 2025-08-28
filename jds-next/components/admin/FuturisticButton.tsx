'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

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
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: {
      bg: 'from-cyan-500 to-blue-600',
      glow: 'shadow-cyan-500/50',
      border: 'border-cyan-400/50'
    },
    secondary: {
      bg: 'from-purple-500 to-pink-600',
      glow: 'shadow-purple-500/50',
      border: 'border-purple-400/50'
    },
    danger: {
      bg: 'from-red-500 to-pink-600',
      glow: 'shadow-red-500/50',
      border: 'border-red-400/50'
    },
    success: {
      bg: 'from-green-500 to-emerald-600',
      glow: 'shadow-green-500/50',
      border: 'border-green-400/50'
    },
    warning: {
      bg: 'from-yellow-500 to-orange-600',
      glow: 'shadow-yellow-500/50',
      border: 'border-yellow-400/50'
    }
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.1 }}
      className={`
        relative group
        ${currentSize}
        font-medium text-white
        rounded-lg
        transition-all duration-300
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:shadow-lg'
        }
        ${className}
      `}
    >
      {/* Background Gradient */}
      <div className={`
        absolute inset-0
        bg-gradient-to-r ${currentVariant.bg}
        rounded-lg
        transition-all duration-300
        ${disabled ? 'opacity-50' : 'group-hover:opacity-90'}
      `} />
      
      {/* Glow Effect */}
      <div className={`
        absolute -inset-1
        bg-gradient-to-r ${currentVariant.bg}
        rounded-lg
        blur-md
        opacity-0
        group-hover:opacity-70
        transition-opacity duration-300
        ${disabled ? 'hidden' : ''}
      `} />
      
      {/* Extra Neon Glow */}
      <div className={`
        absolute -inset-2
        bg-gradient-to-r ${currentVariant.bg}
        rounded-lg
        blur-lg
        opacity-0
        group-hover:opacity-40
        transition-opacity duration-500
        ${disabled ? 'hidden' : ''}
      `} />
      
      {/* Border */}
      <div className={`
        absolute inset-0
        border ${currentVariant.border}
        rounded-lg
        opacity-0
        group-hover:opacity-100
        transition-opacity duration-300
      `} />
      
      {/* Scanning Line Animation */}
      <div className={`
        absolute inset-0
        bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent
        transform -translate-x-full
        group-hover:translate-x-full
        transition-transform duration-700 ease-in-out
        rounded-lg
        ${disabled ? 'hidden' : ''}
      `} />
      
      {/* Press Effect */}
      {isPressed && !disabled && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          className="absolute inset-0 bg-white/20 rounded-lg"
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Corner Details */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />
    </motion.button>
  );
}