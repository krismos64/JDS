'use client';

import { useEffect, useState } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { NextGame } from '@/lib/types';
import CocaAnimation from './CocaAnimation';

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isToday: boolean;
}

function getCountdown(targetIso: string): CountdownParts | null {
  const target = new Date(targetIso);
  if (isNaN(target.getTime())) return null;

  const startOfTargetDay = new Date(target);
  startOfTargetDay.setHours(20, 0, 0, 0); // soirée à 20h par défaut

  const now = new Date();
  const diff = startOfTargetDay.getTime() - now.getTime();

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);
  const targetMidnight = new Date(target);
  targetMidnight.setHours(0, 0, 0, 0);
  const isToday = todayMidnight.getTime() === targetMidnight.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: !isToday, isToday };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false, isToday };
}

interface NextGameSectionProps {
  nextGame: NextGame | null;
}

export default function NextGameSection({ nextGame }: NextGameSectionProps) {
  const [countdown, setCountdown] = useState<CountdownParts | null>(null);

  useEffect(() => {
    if (!nextGame?.date) return;
    const tick = () => setCountdown(getCountdown(nextGame.date));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [nextGame?.date]);

  if (!nextGame?.isActive) return null;

  return (
    <section
      id="next-game"
      className="relative py-12 sm:py-16 md:py-24"
      aria-labelledby="next-game-title"
    >
      <div className="container mx-auto px-4">
        {/* Titre */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 mb-4">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="text-xs font-mono uppercase tracking-widest text-secondary">
              Prochaine soirée
            </span>
          </div>
          <h2
            id="next-game-title"
            className="text-4xl sm:text-5xl md:text-7xl font-black"
          >
            <span className="hologram-text animate-neon-pulse">NEXT GAME</span>
          </h2>
        </div>

        {/* Carte countdown */}
        <div className="max-w-3xl mx-auto">
          <div className="gaming-card p-6 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Date display */}
            <div className="text-center mb-6 md:mb-8">
              <div className="text-5xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                {nextGame.displayDate}
              </div>
            </div>

            {/* Countdown */}
            {countdown && !countdown.isPast && !countdown.isToday && (
              <div
                className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 md:mb-8"
                aria-live="polite"
                aria-atomic="true"
              >
                {[
                  { value: countdown.days, label: 'Jours', color: 'from-primary to-secondary' },
                  { value: countdown.hours, label: 'Heures', color: 'from-secondary to-tertiary' },
                  { value: countdown.minutes, label: 'Min', color: 'from-tertiary to-accent' },
                  { value: countdown.seconds, label: 'Sec', color: 'from-accent to-primary' },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="glass-card py-3 sm:py-4 px-1 sm:px-3 text-center"
                  >
                    <div
                      className={`text-2xl sm:text-3xl md:text-5xl font-black font-mono bg-gradient-to-br ${unit.color} bg-clip-text text-transparent tabular-nums`}
                    >
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-light/60 mt-1">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {countdown?.isToday && (
              <div className="text-center text-2xl sm:text-3xl md:text-4xl font-black mb-6 animate-pulse">
                <span className="hologram-text">🎉 C'EST CE SOIR !</span>
              </div>
            )}

            {countdown?.isPast && (
              <div className="text-center text-light/60 font-mono text-sm mb-6">
                La soirée est passée — à très vite pour la prochaine !
              </div>
            )}

            {/* Highlight */}
            {nextGame.highlight && (
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 text-base sm:text-lg md:text-2xl font-bold">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-accent animate-pulse" />
                  <span className="hologram-text animate-hologram">
                    {nextGame.highlight}
                  </span>
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-accent animate-pulse" />
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <CocaAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
