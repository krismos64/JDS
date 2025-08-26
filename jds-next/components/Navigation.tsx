"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Video, Calendar, Users, Dice6, Trophy, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#video-presentation', label: 'Vidéo', icon: Video },
  { href: '#prochaine-soiree', label: 'Prochaine Soirée', icon: Calendar },
  { href: '#membres', label: 'Membres', icon: Users },
  { href: '#jeux', label: 'Jeux', icon: Dice6 },
  { href: '#scores', label: 'Scores', icon: Trophy },
  { href: '#anecdotes', label: 'Anecdotes', icon: MessageCircle },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-primary text-white p-3 rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={cn(
        "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsOpen(false)} />

      <nav className={cn(
        "fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-40 transform transition-transform md:sticky md:top-20 md:w-full md:h-auto md:transform-none md:shadow-md",
        isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <ul className="flex flex-col md:flex-row md:justify-center p-6 md:p-4 space-y-4 md:space-y-0 md:space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 md:space-x-2 text-dark hover:text-primary transition-colors p-3 md:p-2 rounded-lg hover:bg-primary/10"
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}