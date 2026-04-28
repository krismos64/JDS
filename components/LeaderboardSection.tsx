'use client';

import { useMemo, useState } from 'react';
import { Crown, Trophy } from 'lucide-react';
import { Score } from '@/lib/types';
import PodiumAnimation from './PodiumAnimation';

interface LeaderboardSectionProps {
  scores: Score[];
}

const PLAYERS = [
  { key: 'coco', label: 'Coco', color: 'text-tertiary', bg: 'bg-tertiary/20' },
  { key: 'stacy', label: 'Stacy', color: 'text-accent', bg: 'bg-accent/20' },
  { key: 'fab', label: 'Fab', color: 'text-neon-green', bg: 'bg-neon-green/20' },
  { key: 'chris', label: 'Chris', color: 'text-neon-magenta', bg: 'bg-neon-magenta/20' },
] as const;

type PlayerKey = (typeof PLAYERS)[number]['key'];

function toNumber(v: number | string): number {
  return typeof v === 'number' ? v : parseFloat(String(v).split(' ')[0]) || 0;
}

export default function LeaderboardSection({ scores }: LeaderboardSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // Champion global = celui qui a le plus de victoires (score le plus bas)
  const globalRanking = useMemo(() => {
    const wins: Record<PlayerKey, number> = { coco: 0, stacy: 0, fab: 0, chris: 0 };
    scores.forEach((s) => {
      const values = PLAYERS.map((p) => toNumber(s.scores[p.key]));
      const best = Math.min(...values);
      PLAYERS.forEach((p, i) => {
        if (values[i] === best) wins[p.key]++;
      });
    });
    return PLAYERS.map((p) => ({ ...p, wins: wins[p.key] })).sort((a, b) => b.wins - a.wins);
  }, [scores]);

  const displayed = showAll ? scores : scores.slice(0, 6);

  return (
    <section
      id="leaderboard"
      className="relative py-12 sm:py-16 md:py-24"
      aria-labelledby="leaderboard-title"
    >
      <div className="container mx-auto px-4">
        {/* Titre */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            id="leaderboard-title"
            className="text-4xl sm:text-5xl md:text-7xl font-black mb-4"
          >
            <span className="hologram-text animate-hologram">LEADERBOARD</span>
          </h2>
          <p className="text-base md:text-xl text-light/70 font-mono">
            L'histoire des embrouilles
          </p>
        </div>

        {/* Podium global */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="gaming-card p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-yellow-400" />
              <h3 className="font-mono text-sm uppercase tracking-wider text-yellow-300">
                Classement général
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {globalRanking.map((player, i) => (
                <div
                  key={player.key}
                  className={`relative rounded-xl p-3 sm:p-4 border ${
                    i === 0
                      ? 'border-yellow-400/50 bg-yellow-400/10'
                      : 'border-light/10 bg-white/5'
                  }`}
                >
                  {i === 0 && (
                    <div className="absolute -top-2 -right-2 text-2xl">👑</div>
                  )}
                  <div className="text-xs font-mono text-light/50 mb-1">
                    #{i + 1}
                  </div>
                  <div className={`text-base sm:text-lg font-bold ${player.color}`}>
                    {player.label}
                  </div>
                  <div className="text-xs text-light/60 font-mono">
                    {player.wins} 🏆
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 hidden sm:block">
            <PodiumAnimation />
          </div>
        </div>

        {/* Mobile: cartes verticales */}
        <div className="md:hidden space-y-3 max-w-2xl mx-auto">
          {displayed.map((score, index) => {
            const values = PLAYERS.map((p) => toNumber(score.scores[p.key]));
            const best = Math.min(...values);
            const worst = Math.max(...values);

            return (
              <div key={index} className="gaming-card p-4">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-light/10">
                  <div>
                    <div className="text-xs font-mono text-light/50 uppercase tracking-wider">
                      {score.date}
                    </div>
                    <div className="text-base font-bold">{score.game}</div>
                  </div>
                  <Trophy className="w-5 h-5 text-yellow-400/60" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {PLAYERS.map((p, i) => {
                    const v = values[i];
                    const isBest = v === best;
                    const isWorst = v === worst && best !== worst;
                    return (
                      <div
                        key={p.key}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                          isBest
                            ? 'bg-green-500/20 border border-green-400/40'
                            : isWorst
                            ? 'bg-red-500/10 border border-red-400/20'
                            : 'bg-white/5 border border-white/10'
                        }`}
                      >
                        <span className={`text-xs font-bold ${p.color}`}>
                          {p.label}
                        </span>
                        <span
                          className={`text-sm font-mono tabular-nums ${
                            isBest
                              ? 'text-green-300 font-black'
                              : isWorst
                              ? 'text-red-400'
                              : 'text-light/80'
                          }`}
                        >
                          {score.scores[p.key]}
                          {isBest && ' 👑'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: tableau */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="gaming-card p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary/30">
                  <th className="text-left p-3 font-mono text-primary text-sm">DATE</th>
                  <th className="text-left p-3 font-mono text-secondary text-sm">JEU</th>
                  {PLAYERS.map((p) => (
                    <th
                      key={p.key}
                      className={`text-center p-3 font-mono ${p.color} text-sm`}
                    >
                      {p.label.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((score, index) => {
                  const values = PLAYERS.map((p) => toNumber(score.scores[p.key]));
                  const best = Math.min(...values);
                  const worst = Math.max(...values);
                  return (
                    <tr
                      key={index}
                      className="border-b border-light/10 hover:bg-light/5 transition-colors"
                    >
                      <td className="p-3 font-mono text-sm text-light/70">
                        {score.date}
                      </td>
                      <td className="p-3 font-bold">{score.game}</td>
                      {PLAYERS.map((p, i) => {
                        const v = values[i];
                        const isBest = v === best;
                        const isWorst = v === worst && best !== worst;
                        return (
                          <td
                            key={p.key}
                            className={`p-3 text-center font-mono tabular-nums ${
                              isBest
                                ? 'text-green-400 font-bold'
                                : isWorst
                                ? 'text-red-400'
                                : ''
                            }`}
                          >
                            {score.scores[p.key]}
                            {isBest && ' 👑'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bouton voir plus */}
        {scores.length > 6 && (
          <div className="text-center mt-6 md:mt-8">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 text-sm font-mono uppercase tracking-wider hover:scale-105 transition-transform"
            >
              {showAll ? '↑ Réduire' : `↓ Voir tout (${scores.length} parties)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
