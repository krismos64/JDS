'use client';

import React, { useState } from 'react';

export default function TeamPhoto() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="hologram-text animate-text-glow">DREAM TEAM</span>
          </h2>
          <p className="text-xl text-light/80 font-mono">L'équipe au complet 🎮</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            className="relative group cursor-zoom-in gaming-card p-2 overflow-hidden"
            onClick={() => setIsZoomed(true)}
          >
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src="/img/Embrouille JDS.JPG" 
                alt="Photo de groupe Embrouille JDS"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                <p className="text-lg font-bold mb-2 text-white">Soirée JDS Légendaire</p>
                <p className="text-sm text-light/80">L'équipe au complet lors d'une soirée mémorable !</p>
                <div className="flex justify-center gap-2 mt-3">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">🎲 Jeux</span>
                  <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full">🍕 Pizza</span>
                  <span className="px-2 py-1 bg-tertiary/20 text-tertiary text-xs rounded-full">😂 Fou rires</span>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">🏆 Compétition</span>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="glass-card p-4 text-center animate-slide-in-bottom" style={{animationDelay: '100ms'}}>
              <div className="text-3xl mb-2">🎮</div>
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-xs font-mono text-light/60">JOUEURS</div>
            </div>
            <div className="glass-card p-4 text-center animate-slide-in-bottom" style={{animationDelay: '200ms'}}>
              <div className="text-3xl mb-2">🎲</div>
              <div className="text-2xl font-bold text-secondary">12+</div>
              <div className="text-xs font-mono text-light/60">JEUX</div>
            </div>
            <div className="glass-card p-4 text-center animate-slide-in-bottom" style={{animationDelay: '300ms'}}>
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-tertiary">100+</div>
              <div className="text-xs font-mono text-light/60">PARTIES</div>
            </div>
            <div className="glass-card p-4 text-center animate-slide-in-bottom" style={{animationDelay: '400ms'}}>
              <div className="text-3xl mb-2">😂</div>
              <div className="text-2xl font-bold text-accent">∞</div>
              <div className="text-xs font-mono text-light/60">FOU RIRES</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Zoom */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img 
            src="/img/Embrouille JDS.JPG" 
            alt="Photo de groupe Embrouille JDS"
            className="max-w-full max-h-full object-contain animate-bounce-in"
          />
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white text-sm font-mono bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              Cliquez pour fermer
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .cursor-zoom-in {
          cursor: zoom-in;
        }
        
        .cursor-zoom-out {
          cursor: zoom-out;
        }
      `}</style>
    </section>
  );
}