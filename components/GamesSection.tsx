'use client';

import { useMemo, useState } from 'react';
import { Crown, Star, Filter } from 'lucide-react';
import { Game } from '@/lib/types';

interface GamesSectionProps {
  games: Game[];
}

type FilterType = 'all' | 'champions' | 'records';

export default function GamesSection({ games }: GamesSectionProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = useMemo(() => {
    if (filter === 'champions') return games.filter((g) => g.champion);
    if (filter === 'records') return games.filter((g) => g.record);
    return games;
  }, [games, filter]);

  const filters: { id: FilterType; label: string; count: number }[] = [
    { id: 'all', label: 'Tous', count: games.length },
    { id: 'champions', label: '👑 Champions', count: games.filter((g) => g.champion).length },
    { id: 'records', label: '🏅 Records', count: games.filter((g) => g.record).length },
  ];

  return (
    <section
      id="games"
      className="relative py-12 sm:py-16 md:py-24"
      aria-labelledby="games-title"
    >
      <div className="container mx-auto px-4">
        {/* Titre */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            id="games-title"
            className="text-4xl sm:text-5xl md:text-7xl font-black mb-4"
          >
            <span className="hologram-text animate-cyber-glow">GAMES</span>
          </h2>
          <p className="text-base md:text-xl text-light/70 font-mono">
            Notre arsenal · {games.length} jeux
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-10">
          <Filter className="w-4 h-4 text-light/40 self-center hidden sm:block" />
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider border transition-all ${
                filter === f.id
                  ? 'bg-primary/20 border-primary text-primary scale-105'
                  : 'bg-white/5 border-white/10 text-light/60 hover:border-white/30'
              }`}
            >
              {f.label} <span className="opacity-60">({f.count})</span>
            </button>
          ))}
        </div>

        {/* Mobile: liste compacte */}
        <div className="sm:hidden space-y-2 max-w-md mx-auto">
          {filtered.map((game) => (
            <div
              key={game.id}
              className="gaming-card p-3 flex items-center gap-3"
            >
              <div className="text-3xl shrink-0 animate-float">{game.icon}</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base hologram-text truncate">
                  {game.name}
                </h3>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                  {game.champion && (
                    <span className="text-[11px] text-secondary font-mono flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      {game.champion}
                    </span>
                  )}
                  {game.record && (
                    <span className="text-[11px] text-accent font-mono flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {game.record}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grille */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((game, index) => (
            <div
              key={game.id}
              className="gaming-card p-5 md:p-6 text-center hover:scale-105 transition-all hover-glow animate-slide-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="text-4xl md:text-5xl mb-3 animate-float">
                {game.icon}
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2 hologram-text">
                {game.name}
              </h3>
              {game.champion && (
                <div className="text-xs text-secondary font-mono flex items-center justify-center gap-1 mb-1">
                  <Crown className="w-3 h-3" />
                  <span className="truncate">{game.champion}</span>
                </div>
              )}
              {game.record && (
                <div className="text-xs text-accent font-mono flex items-center justify-center gap-1">
                  <Star className="w-3 h-3" />
                  <span className="truncate">{game.record}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-light/50 font-mono">
            Aucun jeu dans cette catégorie
          </div>
        )}
      </div>
    </section>
  );
}
