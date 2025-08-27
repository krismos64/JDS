'use client';

import React, { useEffect } from 'react';
import { Member } from '@/lib/types';

interface PlayerModalProps {
  player: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

const playerDetails = {
  coco: {
    fullDescription: "Elle adore lire les règles que personne ne comprend, c'est une experte en analyse de plateau qui peut passer 20 minutes à réfléchir à son coup... pour finalement jouer exactement ce qu'on lui avait suggéré au début ! 🤔 Détient le record du 'Ah mais si j'avais su...' le plus utilisé en une soirée.",
    favoriteGame: "Cortex",
    funFact: "A déjà gagné une partie sans comprendre les règles",
    stats: {
      victoires: 42,
      defaites: 38,
      parties: 80,
      winRate: "52.5%"
    },
    achievements: ["🏆 Reine du Cortex", "📖 Lectrice de règles", "🎯 Stratège improvisée"]
  },
  stacy: {
    fullDescription: "Reine incontestée du bluff, capable de faire croire qu'elle a une mauvaise main même quand elle gagne ! 🃏 Son rire contagieux peut déconcentrer les adversaires - technique secrète ?",
    favoriteGame: "Memory",
    funFact: "Se souvient de toutes les cartes sauf quand c'est son tour",
    stats: {
      victoires: 48,
      defaites: 32,
      parties: 80,
      winRate: "60%"
    },
    achievements: ["👑 Reine du Bluff", "🧠 Mémoire d'éléphant", "😂 Rire tactique"]
  },
  fab: {
    fullDescription: "Le joueur qui arrive toujours avec des snacks et pizzas pour amadouer les autres. 🌯 Maître dans l'art de négocier des alliances... qu'il trahit systématiquement !",
    favoriteGame: "6 qui prend",
    funFact: "N'a jamais joué un seul tour sans dire 'Ah mais c'est pas ce que je voulais faire ça !'",
    stats: {
      victoires: 55,
      defaites: 25,
      parties: 80,
      winRate: "68.75%"
    },
    achievements: ["🍕 Fournisseur officiel", "🤝 Traître professionnel", "🎲 Champion d'adresse"]
  },
  chris: {
    fullDescription: "Le stratège silencieux qui ne dit rien pendant toute la partie... pour finalement révéler qu'il était le saboteur depuis le début ! 🕵️ Expert en analyse de ses adversaires, mais ne gagne jamais",
    favoriteGame: "Saboteur",
    funFact: "Capable de mélanger les cartes pendant 10 minutes pour 'être sûr que c'est bien mélangé'",
    stats: {
      victoires: 35,
      defaites: 45,
      parties: 80,
      winRate: "43.75%"
    },
    achievements: ["🕵️ Maître saboteur", "🃏 Mélangeur pro", "📊 Analyste en chef"]
  }
};

export default function PlayerModal({ player, isOpen, onClose }: PlayerModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !player) return null;

  const details = playerDetails[player.id as keyof typeof playerDetails];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div 
        className="relative max-w-2xl w-full gaming-card p-8 animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 text-red-500 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary animate-pulse-glow">
              <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-black mb-2 hologram-text animate-text-glow">{player.name}</h2>
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-full mb-4">
              {player.badge}
            </div>
            
            <p className="text-light/80 mb-6 leading-relaxed">{details?.fullDescription}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-card p-4">
                <div className="text-xs text-secondary font-mono mb-1">JEU FAVORI</div>
                <div className="font-bold text-lg">{details?.favoriteGame}</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-primary font-mono mb-1">WIN RATE</div>
                <div className="font-bold text-lg text-green-400">{details?.stats.winRate}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs text-accent font-mono mb-2">STATISTIQUES</div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>{details?.stats.victoires} victoires</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">✗</span>
                  <span>{details?.stats.defaites} défaites</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">🎮</span>
                  <span>{details?.stats.parties} parties</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs text-tertiary font-mono mb-2">ACHIEVEMENTS</div>
              <div className="flex flex-wrap gap-2">
                {details?.achievements.map((achievement, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-black/30 rounded-full text-sm border border-tertiary/30 animate-slide-in-bottom"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>

            {details?.funFact && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/30">
                <div className="text-xs text-purple-400 font-mono mb-1">FUN FACT</div>
                <p className="text-sm italic">{details.funFact}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}