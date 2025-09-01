'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AudioPlayerAdvanced() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        audioRef.current.play();
        visualize();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const visualize = () => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#ff00ff');
      gradient.addColorStop(0.5, '#00ffff');
      gradient.addColorStop(1, '#ff00ff');

      const bars = 5;
      const barWidth = width / bars;
      
      for (let i = 0; i < bars; i++) {
        const barHeight = Math.random() * height * 0.7 + height * 0.1;
        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth + barWidth * 0.1, height - barHeight, barWidth * 0.8, barHeight);
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          <button
            onClick={toggleAudio}
            className="relative w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/50"
            disabled={!hasInteracted}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 animate-pulse opacity-50"></div>
            {isPlaying ? (
              <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Visualiseur */}
          {isPlaying && (
            <div className="absolute bottom-16 right-0 bg-black/90 rounded-lg p-2 backdrop-blur-sm">
              <canvas 
                ref={canvasRef}
                width={120}
                height={40}
                className="rounded"
              />
            </div>
          )}

          {/* Contrôle du volume */}
          <div 
            className="absolute bottom-0 right-16 bg-black/90 rounded-full px-4 py-2 backdrop-blur-sm flex items-center gap-2 transition-all duration-300"
            style={{ opacity: showVolumeControl ? 1 : 0, pointerEvents: showVolumeControl ? 'auto' : 'none' }}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-purple-600"
            />
            <span className="text-white text-xs font-mono">{Math.round(volume * 100)}%</span>
          </div>

          <button
            onClick={() => setShowVolumeControl(!showVolumeControl)}
            className="absolute bottom-0 left-16 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/90"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3z"/>
            </svg>
          </button>
        </div>

        {/* Notification */}
        {!hasInteracted && (
          <div className="absolute bottom-20 right-0 bg-black/90 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm animate-bounce-in">
            <p className="whitespace-nowrap">🎵 Cliquez pour activer la musique</p>
          </div>
        )}
      </div>

      <audio ref={audioRef} loop>
        <source src="/audio/Embrouille-JDS.mp3" type="audio/mp3" />
      </audio>
    </>
  );
}