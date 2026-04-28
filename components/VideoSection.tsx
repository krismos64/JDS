'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoItem {
  id: string;
  url: string;
  title: string;
  badge: string;
  thumbnail?: string;
  tags: string[];
}

const videos: VideoItem[] = [
  {
    id: 'team-intro',
    url: 'https://www.youtube.com/embed/3PHmbisIdCE',
    title: '🎬 Générique manga de l\'équipe',
    badge: 'TEAM INTRO',
    thumbnail: 'https://img.youtube.com/vi/3PHmbisIdCE/hqdefault.jpg',
    tags: ['🎲 Epic', '⚔️ Action', '🏆 Gaming'],
  },
  {
    id: 'gameplay',
    url: 'https://www.youtube.com/embed/5rMIRtOtW50',
    title: '🎮 Soirée gaming intense',
    badge: 'GAMEPLAY',
    thumbnail: 'https://img.youtube.com/vi/5rMIRtOtW50/hqdefault.jpg',
    tags: ['🍕 Pizza', '😂 Fou rires', '🎉 Fun'],
  },
];

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0]);

  return (
    <section
      id="video"
      className="relative py-12 sm:py-16 md:py-24"
      aria-labelledby="video-title"
    >
      <div className="container mx-auto px-4">
        {/* Titre */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            id="video-title"
            className="text-4xl sm:text-5xl md:text-7xl font-black mb-4"
          >
            <span className="hologram-text animate-cyber-glow">VIDEO</span>
          </h2>
          <p className="text-base md:text-xl text-light/70 font-mono">
            Les meilleurs moments en vidéo
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Lecteur principal */}
          <div className="gaming-card p-2 mb-4 md:mb-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                key={activeVideo.id}
                src={activeVideo.url}
                className="w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={activeVideo.title}
              />
            </div>
            <div className="p-3 md:p-4">
              <div className="font-mono text-secondary text-xs md:text-sm mb-1">
                {activeVideo.badge}
              </div>
              <div className="text-light/90 text-base md:text-lg font-bold mb-2">
                {activeVideo.title}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeVideo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/5 border border-white/10 text-[11px] md:text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Playlist thumbnails */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {videos.map((video) => {
              const isActive = video.id === activeVideo.id;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className={`relative gaming-card p-2 text-left transition-all ${
                    isActive ? 'ring-2 ring-primary scale-[1.02]' : 'opacity-70 hover:opacity-100'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div className="aspect-video rounded overflow-hidden relative">
                    {video.thumbnail && (
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'bg-black/70 text-white/80'
                        }`}
                      >
                        <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="px-1 pt-2 pb-1">
                    <div className="text-[10px] md:text-xs font-mono text-secondary mb-0.5">
                      {video.badge}
                    </div>
                    <div className="text-xs md:text-sm font-bold line-clamp-1">
                      {video.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
