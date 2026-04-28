'use client';

import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { Member } from '@/lib/types';

interface TeamSectionProps {
  members: Member[];
  onPlayerClick: (member: Member) => void;
}

export default function TeamSection({ members, onPlayerClick }: TeamSectionProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section
      id="team"
      className="relative py-12 sm:py-16 md:py-24"
      aria-labelledby="team-title"
    >
      <div className="container mx-auto px-4">
        {/* Titre */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            id="team-title"
            className="text-4xl sm:text-5xl md:text-7xl font-black mb-4"
          >
            <span className="hologram-text animate-hologram">DREAM TEAM</span>
          </h2>
          <p className="text-base md:text-xl text-light/70 font-mono">
            4 joueurs · 1 passion · ∞ embrouilles
          </p>
        </div>

        {/* Photo de groupe en intro */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-16">
          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            aria-label="Agrandir la photo de groupe"
            className="block w-full gaming-card p-2 group cursor-zoom-in overflow-hidden"
          >
            <div className="aspect-video rounded-lg overflow-hidden relative">
              <img
                src="/img/Embrouille JDS.JPG"
                alt="Photo de groupe Embrouille JDS"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-center gap-2">
                <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] sm:text-xs rounded-full">
                  🎲 Soirée légendaire
                </span>
                <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] sm:text-xs rounded-full">
                  😂 Fou rires garantis
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5 text-white" />
              </div>
            </div>
          </button>
        </div>

        {/* Mobile: carrousel snap horizontal */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
            {members.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => onPlayerClick(member)}
                className="snap-center shrink-0 w-[80%] gaming-card p-5 text-left active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-primary/50 shrink-0">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold hologram-text truncate">
                      {member.name}
                    </h3>
                    <div className="text-xs text-secondary font-mono truncate">
                      {member.badge}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-light/70 line-clamp-3 mb-3">
                  {member.description}
                </p>
                <div className="text-xs text-primary font-mono">
                  Voir le profil →
                </div>
              </button>
            ))}
          </div>
          {/* Indicateur de swipe */}
          <div className="flex justify-center gap-1.5 mt-2">
            {members.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-light/30"
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-center text-xs font-mono text-light/40 mt-3">
            ← Glisser pour découvrir l'équipe →
          </p>
        </div>

        {/* Desktop: grille */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <button
              key={member.id}
              type="button"
              onClick={() => onPlayerClick(member)}
              className="gaming-card p-6 text-center hover:scale-105 hover:border-primary transition-all duration-300 hover-lift cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden animate-cyber-glow">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 hologram-text">
                {member.name}
              </h3>
              <div className="text-sm text-secondary mb-3 font-mono">
                {member.badge}
              </div>
              <p className="text-xs text-light/60 line-clamp-3">
                {member.description.substring(0, 100)}...
              </p>
              <div className="mt-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full inline-block">
                Voir profil →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal zoom photo */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo de groupe agrandie"
        >
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <span className="text-white text-2xl">✕</span>
          </button>
          <img
            src="/img/Embrouille JDS.JPG"
            alt="Photo de groupe Embrouille JDS"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </section>
  );
}
