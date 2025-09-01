'use client';

import React, { useState, useEffect } from 'react';

export default function SwipeIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['team', 'next-game', 'games', 'leaderboard', 'stories', 'video'];
  
  useEffect(() => {
    // Masquer après 5 secondes
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    
    // Détection du swipe
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeDistance = touchStartY - touchEndY;
      const threshold = 50;
      
      if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0 && currentSection < sections.length - 1) {
          // Swipe vers le haut - section suivante
          navigateToSection(currentSection + 1);
        } else if (swipeDistance < 0 && currentSection > 0) {
          // Swipe vers le bas - section précédente
          navigateToSection(currentSection - 1);
        }
      }
    };
    
    const navigateToSection = (index: number) => {
      if (index >= 0 && index < sections.length) {
        setCurrentSection(index);
        const element = document.getElementById(sections[index]);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    // Détecter la section actuelle lors du scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition <= offsetTop + offsetHeight) {
            setCurrentSection(index);
          }
        }
      });
    };
    
    // Uniquement sur mobile
    if (window.innerWidth < 768) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);
  
  // Uniquement visible sur mobile
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null;
  }
  
  return (
    <>
      {/* Indicateur de swipe */}
      {isVisible && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 md:hidden animate-bounce">
          <div className="bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <svg 
              className="w-5 h-5 text-white animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 11l5-5m0 0l5 5m-5-5v12" 
              />
            </svg>
            <span className="text-white text-xs font-mono">Swipe pour naviguer</span>
          </div>
        </div>
      )}
      
      {/* Points de navigation */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 md:hidden">
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => {
                const element = document.getElementById(section);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-primary scale-125 shadow-lg shadow-primary/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Naviguer vers ${section}`}
            />
          ))}
        </div>
      </div>
      
      {/* Indicateur de section actuelle */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30 md:hidden">
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white/80 text-xs font-mono">
            {currentSection + 1} / {sections.length}
          </span>
        </div>
      </div>
    </>
  );
}