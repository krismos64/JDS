"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Users, Trophy, Calendar, Gamepad2, MessageSquare, Play } from 'lucide-react';

const navItems = [
  { id: 'team', label: 'TEAM', icon: Users, color: 'text-primary' },
  { id: 'next-game', label: 'NEXT', icon: Calendar, color: 'text-secondary' },
  { id: 'games', label: 'GAMES', icon: Gamepad2, color: 'text-tertiary' },
  { id: 'leaderboard', label: 'SCORES', icon: Trophy, color: 'text-accent' },
  { id: 'stories', label: 'STORIES', icon: MessageSquare, color: 'text-neon-green' },
  { id: 'video', label: 'VIDEO', icon: Play, color: 'text-neon-magenta' },
];

export default function GamingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        if (section && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 lg:hidden gaming-card p-3 animate-cyber-glow"
      >
        {isOpen ? (
          <X size={24} className="text-secondary" />
        ) : (
          <Menu size={24} className="text-secondary" />
        )}
      </button>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-dark/80 backdrop-blur-sm z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile navigation */}
      <nav className={`fixed top-0 right-0 h-full w-80 max-w-full bg-surface/95 backdrop-blur-lg border-l border-secondary/30 z-40 lg:hidden transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-8 pt-20">
          <div className="space-y-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full gaming-card p-4 text-left flex items-center space-x-4 transition-all hover:scale-105 ${
                    activeSection === item.id ? 'animate-neon-pulse' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon size={20} className={item.color} />
                  <span className="font-mono font-bold text-light">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Gaming decorations */}
          <div className="mt-8 space-y-2">
            <div className="h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
            <div className="text-center">
              <div className="text-xs text-light/40 font-mono">GAMING MODE: ON</div>
              <div className="flex justify-center space-x-1 mt-2">
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                <div className="w-1 h-1 bg-tertiary rounded-full animate-pulse" style={{animationDelay: '1s'}} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop navigation */}
      <nav className="hidden lg:block fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-card px-8 py-4">
          <div className="flex items-center space-x-8">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex flex-col items-center space-y-1 transition-all hover:scale-110 ${
                    activeSection === item.id ? 'scale-110' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon size={20} className={`${item.color} ${activeSection === item.id ? 'animate-neon-pulse' : ''}`} />
                  <span className="text-xs font-mono text-light/80">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Gaming HUD elements */}
      <div className="fixed top-6 left-6 z-40 glass-card p-3 animate-slide-up">
        <div className="text-xs font-mono text-light/60">
          LVL: 99 | XP: ∞
        </div>
      </div>
    </>
  );
}