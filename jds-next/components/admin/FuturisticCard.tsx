'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FuturisticCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  animated?: boolean;
  onClick?: () => void;
}

export default function FuturisticCard({
  children,
  className = '',
  glowColor = 'from-cyan-500/20 to-purple-500/20',
  animated = true,
  onClick
}: FuturisticCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 20 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      whileHover={animated ? { scale: 1.02, y: -5 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        relative group cursor-pointer
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Glow Effect */}
      <div className={`
        absolute -inset-1 
        bg-gradient-to-r ${glowColor}
        rounded-xl blur-md opacity-40 
        group-hover:opacity-70 transition duration-300
        ${isHovered ? 'animate-pulse' : ''}
      `} />
      
      {/* Extra Neon Glow */}
      <div className={`
        absolute -inset-2
        bg-gradient-to-r ${glowColor}
        rounded-xl blur-lg opacity-20 
        group-hover:opacity-40 transition duration-500
        ${isHovered ? 'animate-pulse' : ''}
      `} />
      
      {/* Main Card */}
      <div className="
        relative
        bg-slate-900/90 backdrop-blur-xl
        rounded-xl border border-cyan-500/30
        overflow-hidden
        shadow-2xl shadow-purple-500/20
      ">
        {/* Animated Border */}
        <div className="
          absolute inset-0 
          bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent
          transform -translate-x-full
          group-hover:translate-x-full
          transition-transform duration-1000 ease-in-out
        " />
        
        {/* Holographic Pattern */}
        <div className="
          absolute inset-0 
          bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        " />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Corner Indicators */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-400"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-400"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400"
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}