'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Anecdote } from '@/lib/types';

interface StoriesSectionProps {
  anecdotes: Anecdote[];
}

export default function StoriesSection({ anecdotes }: StoriesSectionProps) {
  const [activeStory, setActiveStory] = useState<Anecdote | null>(null);

  return (
    <section
      id="stories"
      className="relative py-12 sm:py-16 md:py-24"
      aria-labelledby="stories-title"
    >
      <div className="container mx-auto px-4">
        {/* Titre */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            id="stories-title"
            className="text-4xl sm:text-5xl md:text-7xl font-black mb-4"
          >
            <span className="hologram-text animate-glitch">STORIES</span>
          </h2>
          <p className="text-base md:text-xl text-light/70 font-mono">
            Moments légendaires
          </p>
        </div>

        {/* Mobile: cartes empilées avec image en hero */}
        <div className="md:hidden space-y-5 max-w-md mx-auto">
          {anecdotes.map((a) => (
            <article
              key={a.id}
              className="gaming-card overflow-hidden active:scale-[0.98] transition-transform"
            >
              {a.photos?.[0] && (
                <button
                  type="button"
                  onClick={() => setActiveStory(a)}
                  aria-label="Agrandir la photo"
                  className="block w-full aspect-square relative cursor-zoom-in"
                >
                  <img
                    src={a.photos[0].url}
                    alt={a.photos[0].caption || 'Souvenir JDS'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold rounded-full">
                      {a.badge}
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] font-mono rounded-full flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {a.date}
                    </span>
                  </div>
                </button>
              )}
              <div className="p-4">
                {!a.photos?.[0] && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-primary/20 text-primary text-[11px] font-bold rounded-full">
                      {a.badge}
                    </span>
                    <span className="text-[11px] font-mono text-light/50 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {a.date}
                    </span>
                  </div>
                )}
                <p className="text-sm text-light/85 leading-relaxed">
                  {a.content}
                </p>
                {a.video && (
                  <div className="mt-3 aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={a.video.url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={a.video.caption}
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: grille 2 colonnes */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {anecdotes.map((a, index) => (
            <article
              key={a.id}
              className="gaming-card p-6 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-white text-xs font-bold rounded-full border border-primary/30">
                  {a.badge}
                </span>
                <span className="text-sm font-mono text-light/60 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {a.date}
                </span>
              </div>
              <p className="text-light/80 mb-4 leading-relaxed">{a.content}</p>
              {a.photos?.[0] && (
                <button
                  type="button"
                  onClick={() => setActiveStory(a)}
                  aria-label="Agrandir la photo"
                  className="block relative h-56 lg:h-64 w-full rounded-lg overflow-hidden group cursor-zoom-in"
                >
                  <img
                    src={a.photos[0].url}
                    alt={a.photos[0].caption || 'Souvenir JDS'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {a.photos[0].caption && (
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs bg-black/60 backdrop-blur-sm rounded p-2">
                      {a.photos[0].caption}
                    </div>
                  )}
                </button>
              )}
              {a.video && (
                <div className="mt-4 aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={a.video.url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={a.video.caption}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Modal photo plein écran */}
      {activeStory?.photos?.[0] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setActiveStory(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo agrandie"
        >
          <button
            type="button"
            onClick={() => setActiveStory(null)}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 z-10"
          >
            <span className="text-white text-2xl">✕</span>
          </button>
          <img
            src={activeStory.photos[0].url}
            alt={activeStory.photos[0].caption || 'Souvenir JDS'}
            className="max-w-full max-h-full object-contain"
          />
          {activeStory.photos[0].caption && (
            <div className="absolute bottom-8 left-4 right-4 text-center">
              <p className="inline-block text-white text-sm bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                {activeStory.photos[0].caption}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
