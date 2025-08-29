'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLoginButton from './AdminLoginButton';

const menuItems = [
  { id: 'team', label: 'TEAM', icon: '👥', color: 'from-purple-500 to-pink-500' },
  { id: 'next-game', label: 'NEXT GAME', icon: '📅', color: 'from-blue-500 to-cyan-500' },
  { id: 'games', label: 'GAMES', icon: '🎮', color: 'from-green-500 to-emerald-500' },
  { id: 'leaderboard', label: 'SCORES', icon: '🏆', color: 'from-yellow-500 to-orange-500' },
  { id: 'stories', label: 'STORIES', icon: '📖', color: 'from-red-500 to-pink-500' },
  { id: 'video', label: 'VIDEO', icon: '🎬', color: 'from-indigo-500 to-purple-500' },
];

const gameIcons = ['🎲', '🃏', '♟️', '🎯', '🧩', '🎪', '🎨', '🎭'];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [randomIcon, setRandomIcon] = useState('🎲');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Détection de la section active
      const sections = menuItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition <= offsetTop + offsetHeight) {
            setActiveSection(menuItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Animation des icônes
    const iconInterval = setInterval(() => {
      setRandomIcon(gameIcons[Math.floor(Math.random() * gameIcons.length)]);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(iconInterval);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const handleMenuClick = (id: string) => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Bouton Menu Burger Futuriste */}
      <button
        onClick={toggleMenu}
        className={`fixed top-4 right-4 z-[100] md:hidden transition-all duration-300 ${
          isScrolled ? 'scale-90' : 'scale-100'
        }`}
      >
        <div className="relative w-14 h-14">
          {/* Effet de pulse en arrière-plan */}
          <div className={`absolute inset-0 rounded-full ${
            isOpen ? 'bg-gradient-to-br from-red-600 to-pink-600' : 'bg-gradient-to-br from-purple-600 to-cyan-600'
          } animate-pulse opacity-50`}></div>
          
          {/* Cercle principal */}
          <div className={`absolute inset-0 rounded-full ${
            isOpen ? 'bg-gradient-to-br from-red-500 to-pink-500' : 'bg-gradient-to-br from-purple-500 to-cyan-500'
          } shadow-lg shadow-purple-500/50`}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Lignes du burger animées */}
              <div className="relative w-7 h-6">
                <span className={`absolute block h-0.5 w-full bg-white transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 top-2.5' : 'top-0'
                }`}></span>
                <span className={`absolute block h-0.5 w-full bg-white top-2.5 transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                <span className={`absolute block h-0.5 w-full bg-white transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 top-2.5' : 'top-5'
                }`}></span>
              </div>
              
              {/* Icône de jeu rotative */}
              <div className={`absolute text-2xl transition-all duration-500 ${
                isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
              }`} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {randomIcon}
              </div>
            </div>
          </div>
          
          {/* Badge de notification */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          )}
        </div>
      </button>

      {/* Menu Overlay Futuriste */}
      <div className={`fixed inset-0 z-[90] transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible'
      }`}>
        {/* Background avec effet de flou */}
        <div 
          className={`absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMenu}
        />
        
        {/* Container du menu */}
        <div className={`absolute inset-x-4 top-24 bottom-24 max-w-md mx-auto transition-all duration-700 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          {/* Titre animé */}
          <div className="text-center mb-8">
            <h2 className={`text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift transition-all duration-500 ${
              isOpen ? 'translate-y-0' : '-translate-y-10'
            }`}>
              MENU JDS
            </h2>
            <div className="flex justify-center gap-2 mt-2">
              {gameIcons.slice(0, 4).map((icon, index) => (
                <span 
                  key={index} 
                  className="text-2xl animate-bounce"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
          
          {/* Grille de navigation */}
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`relative group transform transition-all duration-500 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Carte de menu */}
                <div className={`
                  relative overflow-hidden rounded-2xl p-6
                  bg-gradient-to-br ${item.color} bg-opacity-10
                  border-2 border-white/20
                  hover:border-white/40 hover:scale-105
                  transition-all duration-300
                  ${activeSection === item.id ? 'ring-2 ring-white/50 scale-105' : ''}
                `}>
                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Icône principale */}
                  <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  {/* Label */}
                  <div className="text-white font-bold text-sm tracking-wider">
                    {item.label}
                  </div>
                  
                  {/* Indicateur actif */}
                  {activeSection === item.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </div>
                  )}
                  
                  {/* Particules flottantes */}
                  <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 animate-float">
                    {gameIcons[(index + 3) % gameIcons.length]}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Footer du menu avec bouton Admin */}
          <div className={`mt-8 transition-all duration-500 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            {/* Bouton Admin pour mobile */}
            <div className="flex justify-center mb-6">
              <AdminLoginButton />
            </div>
            
            <div className="text-center">
              <p className="text-white/60 text-sm font-mono">
                🎮 EMBROUILLE JDS 🎲
              </p>
              <div className="mt-2 flex justify-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Effets de particules en arrière-plan */}
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl opacity-20 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${10 + Math.random() * 10}s`
                }}
              >
                {gameIcons[i % gameIcons.length]}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Barre de navigation fixe pour tablette */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 transition-transform duration-300 hidden md:flex lg:hidden ${
        isScrolled ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="flex justify-around items-center py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`flex flex-col items-center p-2 transition-all duration-300 ${
                activeSection === item.id ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <span className={`text-2xl mb-1 ${
                activeSection === item.id ? 'animate-bounce' : ''
              }`}>
                {item.icon}
              </span>
              <span className={`text-xs font-bold ${
                activeSection === item.id 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                  : 'text-white/60'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}