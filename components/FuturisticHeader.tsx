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
    <header className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Hero banner - responsive: desktop (paysage) / mobile (portrait) */}
      <picture className="absolute inset-0 block animate-slow-zoom">
        <source
          media="(min-width: 768px)"
          srcSet="/img/5A8EF660-E611-43BD-850C-D6C39E923B09_1_102_o.jpeg"
        />
        <img
          src="/img/102920EF-C9F9-4741-AED2-A395D12C444B_1_102_o.jpeg"
          alt="Team JDS - Embrouille JDS, groupe de jeux de société à Pau et alentours"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </picture>

      {/* Overlays cyberpunk */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-pink-900/10 animate-pulse" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-scan-vertical" />
        </div>
      </div>

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

      {/* SEO h1 caché - le titre est déjà dans l'image */}
      <h1 className="sr-only">Embrouille JDS - Team JDS, groupe de jeux de société à Pau</h1>

      {/* Main content - positionné en bas pour ne pas masquer la photo de l'équipe */}
      <div className="relative z-10 w-full px-4 pb-10 md:pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Gaming stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 animate-slide-up"
               style={{animationDelay: '0.9s'}}>
            {[
              { label: 'JOUEURS', value: '4', color: 'text-primary' },
              { label: 'JEUX', value: '12+', color: 'text-secondary' },
              { label: 'PARTIES', value: '100+', color: 'text-tertiary' },
              { label: 'LEVEL', value: 'PRO', color: 'text-accent' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-3 md:p-4 text-center backdrop-blur-md">
                <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-light/70 font-mono tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center animate-slide-up" style={{animationDelay: '1.1s'}}>
            <button className="gaming-card px-8 py-4 font-bold text-lg hover:scale-105 transition-all duration-300 backdrop-blur-md">
              <span className="hologram-text">ENTER GAME</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lottie animation - badge décoratif coin haut droit (desktop only) */}
      <div className="hidden lg:block absolute top-24 right-8 z-10 animate-slide-up" style={{animationDelay: '0.7s'}}>
        <div className="relative w-32 h-32 xl:w-40 xl:h-40">
          <div className="absolute inset-0 gaming-card animate-cyber-glow backdrop-blur-md">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                className="w-full h-full p-2"
              />
            )}
          </div>
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-secondary"></div>
          <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-secondary"></div>
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-secondary"></div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-secondary"></div>
        </div>
      </div>

      {/* Data stream effects */}
      <div className="absolute bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent animate-data-stream"></div>
    </header>
  );
}