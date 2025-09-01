'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Unlock, Gamepad2, Sparkles, KeyRound } from 'lucide-react';

const gameEffects = ['🎮', '🎲', '🃏', '🎯', '👾', '🕹️', '🏆', '⚡'];

export default function AdminLoginButton() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setCurrentIcon((prev) => (prev + 1) % gameEffects.length);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleClick = () => {
    setIsClicked(true);
    
    // Créer des particules d'explosion
    setParticles(Array.from({ length: 8 }, (_, i) => i));
    
    // Effet sonore simulé avec vibration (si supporté)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Redirection avec délai pour l'animation
    setTimeout(() => {
      router.push('/admin/login');
    }, 600);
  };

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative group
          px-6 py-3 md:px-8 md:py-4
          bg-gradient-to-r from-purple-600 via-pink-600 to-red-600
          hover:from-purple-700 hover:via-pink-700 hover:to-red-700
          text-white font-bold text-sm md:text-base
          rounded-full
          shadow-lg shadow-purple-500/50
          transform transition-all duration-300
          hover:scale-110 hover:rotate-3
          active:scale-95
          overflow-hidden
          ${isClicked ? 'animate-pulse scale-125' : ''}
        `}
        aria-label="Admin Login"
      >
        {/* Effet de brillance animé */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Effet de particules internes */}
        <div className="absolute inset-0">
          {isHovered && [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                left: `${20 + i * 30}%`,
                top: '50%',
                animationDelay: `${i * 200}ms`
              }}
            />
          ))}
        </div>

        {/* Contenu du bouton */}
        <div className="relative flex items-center gap-3">
          {/* Icône animée */}
          <div className="relative">
            <div className={`transition-all duration-300 ${isHovered ? 'rotate-180' : ''}`}>
              {isClicked ? (
                <Unlock className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
              ) : (
                <Lock className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </div>
            {/* Badge gaming */}
            <div className="absolute -top-2 -right-2 text-xs animate-bounce">
              {gameEffects[currentIcon]}
            </div>
          </div>

          {/* Texte */}
          <span className="relative">
            <span className={`block transition-all duration-300 ${isHovered ? 'translate-y-[-2px]' : ''}`}>
              ADMIN
            </span>
            {/* Effet de texte secondaire */}
            <span className="absolute -bottom-1 left-0 text-[8px] md:text-[10px] opacity-70 whitespace-nowrap">
              {isHovered ? 'ENTER THE GAME' : 'ZONE'}
            </span>
          </span>

          {/* Icône de jeu */}
          <Gamepad2 className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
            isHovered ? 'rotate-12 scale-110' : ''
          }`} />
        </div>

        {/* Effet de bordure animée */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
      </button>

      {/* Particules d'explosion au clic */}
      {particles.map((particle) => (
        <div
          key={particle}
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            animation: 'explode 0.8s ease-out forwards',
            transform: `rotate(${particle * 45}deg)`
          }}
        >
          <div className="text-2xl animate-spin">
            {gameEffects[particle]}
          </div>
        </div>
      ))}

      {/* Aura de fond au hover */}
      {isHovered && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-full blur-xl animate-pulse"></div>
        </div>
      )}

      {/* Effet de texte flottant */}
      {isHovered && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-black/90 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap animate-bounce backdrop-blur-xl border border-purple-500/50">
            <span className="flex items-center gap-1">
              <KeyRound className="w-3 h-3" />
              Access Control Panel
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes explode {
          0% {
            transform: translate(-50%, -50%) translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translateX(100px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}