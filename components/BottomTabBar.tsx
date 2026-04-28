'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Calendar, Trophy, BookOpen, Lock } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  isAdmin?: boolean;
}

const tabs: TabItem[] = [
  { id: 'next-game', label: 'Next', icon: Calendar, color: 'text-secondary' },
  { id: 'team', label: 'Team', icon: Users, color: 'text-primary' },
  { id: 'leaderboard', label: 'Score', icon: Trophy, color: 'text-accent' },
  { id: 'stories', label: 'Stories', icon: BookOpen, color: 'text-neon-green' },
  { id: 'admin', label: 'Admin', icon: Lock, color: 'text-neon-magenta', isAdmin: true },
];

export default function BottomTabBar() {
  const [activeSection, setActiveSection] = useState<string>('next-game');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const tab of tabs) {
        if (tab.isAdmin) continue;
        const section = document.getElementById(tab.id);
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(tab.id);
            return;
          }
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto max-w-2xl px-2 pb-2 md:pb-4">
        <div className="relative backdrop-blur-xl bg-black/70 border border-white/10 rounded-2xl shadow-2xl shadow-primary/20">
          {/* Glow décoratif */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 pointer-events-none" />

          <ul className="relative flex items-stretch justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = !tab.isAdmin && activeSection === tab.id;

              const content = (
                <div className="flex flex-col items-center justify-center gap-0.5 px-2 py-2.5 md:py-3 relative">
                  {isActive && (
                    <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
                  )}
                  <Icon
                    className={`w-5 h-5 md:w-6 md:h-6 transition-all ${
                      isActive
                        ? `${tab.color} drop-shadow-[0_0_6px_currentColor] scale-110`
                        : tab.isAdmin
                        ? `${tab.color}`
                        : 'text-light/60'
                    }`}
                  />
                  <span
                    className={`text-[10px] md:text-xs font-mono tracking-wider uppercase transition-colors ${
                      isActive ? tab.color : tab.isAdmin ? tab.color : 'text-light/60'
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
              );

              return (
                <li key={tab.id} className="flex-1">
                  {tab.isAdmin ? (
                    <Link
                      href="/admin"
                      aria-label="Accéder à la zone admin"
                      className="block w-full active:scale-95 transition-transform"
                    >
                      {content}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollToSection(tab.id)}
                      aria-label={`Aller à ${tab.label}`}
                      aria-current={isActive ? 'true' : undefined}
                      className="w-full active:scale-95 transition-transform"
                    >
                      {content}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
