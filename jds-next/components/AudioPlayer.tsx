"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
          setIsPlaying(true);
        }
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <audio ref={audioRef} loop>
        <source src="/audio/Embrouille-JDS.mp3" type="audio/mp3" />
      </audio>
      
      <button
        onClick={toggleAudio}
        className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-110"
        title={isPlaying ? 'Couper le son' : 'Activer le son'}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      
      {!hasInteracted && (
        <div className="absolute top-full mt-2 left-0 bg-dark text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
          La musique démarrera après votre première interaction
        </div>
      )}
    </div>
  );
}