"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Users, Trophy, Calendar, Gamepad2, MessageSquare, Play } from 'lucide-react';
import AdminLoginButton from './AdminLoginButton';

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

      {/* Desktop navigation - Caché car on utilise MobileMenu */}
      <nav className="hidden xl:block fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-card px-8 py-4">
          <div className="flex items-center space-x-8">
            {/* Bouton Admin à gauche */}
            <div className="pr-4 border-r border-light/20">
              <AdminLoginButton />
            </div>
            
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

      {/* Gaming HUD elements - Masqué sur mobile */}
      <div className="hidden xl:block fixed top-6 left-6 z-40 glass-card p-3 animate-slide-up">
        <div className="text-xs font-mono text-light/60">
          LVL: 99 | XP: ∞
        </div>
      </div>
    </>
  );
}