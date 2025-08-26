"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function FuturisticHeader() {
  const [animationData, setAnimationData] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/animations/fight.json')
      .then(res => res.json())
      .then(data => setAnimationData(data));
  }, []);

  if (!mounted) return null;

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-neon-magenta rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-tertiary rounded-full animate-bounce"></div>
        <div className="absolute top-64 left-1/3 w-1 h-1 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-2 h-2 bg-neon-green rounded-full animate-ping"></div>
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Gaming logo with glitch effect */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-black mb-4">
            <span className="hologram-text animate-hologram">🎲</span>
            <br />
            <span className="hologram-text block animate-glitch" 
                  style={{animationDelay: '0.1s'}}>
              EMBROUILLE
            </span>
            <span className="hologram-text block text-secondary animate-neon-pulse"
                  style={{animationDelay: '0.2s'}}>
              JDS
            </span>
          </h1>
        </div>

        {/* Subtitle with typing effect */}
        <div className="mb-12 animate-slide-up" style={{animationDelay: '0.5s'}}>
          <p className="text-xl md:text-2xl text-light/80 font-mono">
            <span className="border-r-2 border-secondary animate-pulse">
              Où l'amitié se brise à chaque partie_
            </span>
          </p>
        </div>

        {/* Lottie animation with futuristic frame */}
        <div className="mb-12 animate-slide-up" style={{animationDelay: '0.7s'}}>
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
            <div className="absolute inset-0 gaming-card animate-cyber-glow">
              {animationData && (
                <Lottie 
                  animationData={animationData} 
                  loop={true}
                  className="w-full h-full p-4"
                />
              )}
            </div>
            
            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-secondary"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-secondary"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-secondary"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary"></div>
          </div>
        </div>

        {/* Gaming stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-slide-up" 
             style={{animationDelay: '0.9s'}}>
          {[
            { label: 'JOUEURS', value: '4', color: 'text-primary' },
            { label: 'JEUX', value: '12+', color: 'text-secondary' },
            { label: 'PARTIES', value: '100+', color: 'text-tertiary' },
            { label: 'LEVEL', value: 'PRO', color: 'text-accent' },
          ].map((stat, index) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-light/60 font-mono tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="animate-slide-up" style={{animationDelay: '1.1s'}}>
          <button className="gaming-card px-8 py-4 font-bold text-lg hover:scale-105 transition-all duration-300">
            <span className="hologram-text">ENTER GAME</span>
          </button>
        </div>
      </div>

      {/* Data stream effects */}
      <div className="absolute bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent animate-data-stream"></div>
    </header>
  );
}