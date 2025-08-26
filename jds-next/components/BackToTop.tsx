"use client";

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 gaming-card p-4 hover:scale-110 transition-all animate-cyber-glow z-50"
      aria-label="Retour en haut"
    >
      <ChevronUp size={24} className="text-secondary animate-neon-pulse" />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 animate-data-stream"></div>
    </button>
  );
}