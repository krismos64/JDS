'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Lock, 
  User, 
  AlertCircle, 
  Gamepad2, 
  Sparkles, 
  Trophy,
  Shield,
  Zap,
  Eye,
  EyeOff,
  Home,
  ArrowLeft,
  Joystick
} from 'lucide-react';

const gameIcons = ['🎮', '🎲', '🃏', '🎯', '👾', '🕹️', '🏆', '⚡'];
const floatingIcons = ['🎰', '🎪', '🎨', '🎭', '🎬', '🎤', '🎧', '🎸'];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const router = useRouter();

  // Animation des icônes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % gameIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Particules aléatoires
  useEffect(() => {
    const generateParticle = () => {
      const particle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100
      };
      setParticles(prev => [...prev.slice(-10), particle]);
    };

    const interval = setInterval(generateParticle, 2000);
    return () => clearInterval(interval);
  }, []);

  // Effet de glitch au focus
  const handleFieldFocus = (field: string) => {
    setFocusedField(field);
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Animation de chargement
    const loadingSteps = ['🎮 Connexion', '🎲 Vérification', '🏆 Accès'];
    let stepIndex = 0;
    const loadingInterval = setInterval(() => {
      stepIndex = (stepIndex + 1) % loadingSteps.length;
    }, 500);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        clearInterval(loadingInterval);
        // Animation de succès
        setGlitchEffect(true);
        setTimeout(() => {
          router.push('/admin');
        }, 500);
      } else {
        setError(data.error || 'Erreur de connexion');
        // Vibration d\'erreur si supporté
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      clearInterval(loadingInterval);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background animé avec gradient gaming */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-cyan-900/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
        
        {/* Grille cyberpunk */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,0,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 10s linear infinite'
        }}></div>
        
        {/* Particules flottantes */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute text-4xl animate-float opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`
            }}
          >
            {floatingIcons[Math.floor(Math.random() * floatingIcons.length)]}
          </div>
        ))}
      </div>

      {/* Bouton retour accueil */}
      <Link href="/" className="fixed top-4 left-4 z-20 group">
        <div className="relative">
          {/* Effet de glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          
          {/* Bouton principal */}
          <div className="relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            {/* Icône animée */}
            <div className="relative">
              <Home className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
            
            {/* Texte avec effet gaming */}
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-200 transition-all">
              BACK TO GAME
            </span>
            
            {/* Icône de jeu qui tourne */}
            <span className="text-lg group-hover:animate-spin">🎮</span>
          </div>
          
          {/* Particules au hover */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-1"></div>
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-2"></div>
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-3"></div>
          </div>
        </div>
        
        {/* Tooltip au hover */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/90 text-cyan-400 text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-cyan-500/30">
          <ArrowLeft className="inline w-3 h-3 mr-1" />
          Retour à l'accueil
        </div>
      </Link>

      {/* Container principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo animé */}
        <div className="mb-8 relative">
          <div className="relative">
            {/* Cercle lumineux pulsant */}
            <div className="absolute inset-0 -m-8">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 blur-xl animate-pulse"></div>
            </div>
            
            {/* Icône principale */}
            <div className={`text-8xl mb-4 transform transition-all duration-500 ${glitchEffect ? 'animate-glitch' : ''}`}>
              <div className="relative">
                <span className="absolute inset-0 text-cyan-400 blur-sm animate-pulse">{gameIcons[currentIcon]}</span>
                <span className="relative">{gameIcons[currentIcon]}</span>
              </div>
            </div>
            
            {/* Badges flottants autour */}
            <div className="absolute -top-4 -right-4 text-2xl animate-bounce">🏆</div>
            <div className="absolute -bottom-4 -left-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>⚡</div>
          </div>
        </div>

        {/* Carte de connexion */}
        <div className="w-full max-w-md">
          <div className="relative">
            {/* Effet de bordure néon */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
            
            {/* Carte principale */}
            <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  {/* Effet de fond lumineux */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-lg blur-md opacity-60 animate-pulse"></div>
                  <h1 className="relative text-4xl font-black px-6 py-2 bg-gradient-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text text-transparent animate-neon-blink">
                    ADMIN ZONE
                  </h1>
                </div>
                <p className="mt-4 text-sm text-gray-400 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Accès Restreint
                  <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                </p>
              </div>

              {/* Message d\'erreur */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Champ Username */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className={`w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'username' ? 'text-purple-400' : 'text-gray-500'
                      }`} />
                    </div>
                    <input
                      id="username"
                      type="text"
                      required
                      className={`
                        w-full pl-12 pr-4 py-4 
                        bg-gray-900/50 backdrop-blur-sm
                        border-2 ${focusedField === 'username' ? 'border-purple-500' : 'border-gray-700'}
                        rounded-lg
                        text-white placeholder-gray-500
                        focus:outline-none focus:border-purple-400 focus:bg-gray-900/70
                        transition-all duration-300
                        ${focusedField === 'username' ? 'transform scale-[1.02]' : ''}
                      `}
                      placeholder="Nom d\'utilisateur"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => handleFieldFocus('username')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {/* Label flottant */}
                    {focusedField === 'username' && (
                      <div className="absolute -top-6 left-2 text-xs text-purple-400 animate-slide-up">
                        Player Name
                      </div>
                    )}
                  </div>
                </div>

                {/* Champ Password */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'password' ? 'text-pink-400' : 'text-gray-500'
                      }`} />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className={`
                        w-full pl-12 pr-12 py-4
                        bg-gray-900/50 backdrop-blur-sm
                        border-2 ${focusedField === 'password' ? 'border-pink-500' : 'border-gray-700'}
                        rounded-lg
                        text-white placeholder-gray-500
                        focus:outline-none focus:border-pink-400 focus:bg-gray-900/70
                        transition-all duration-300
                        ${focusedField === 'password' ? 'transform scale-[1.02]' : ''}
                      `}
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => handleFieldFocus('password')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {/* Bouton afficher/masquer */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-500 hover:text-pink-400 transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500 hover:text-pink-400 transition-colors" />
                      )}
                    </button>
                    {/* Label flottant */}
                    {focusedField === 'password' && (
                      <div className="absolute -top-6 left-2 text-xs text-pink-400 animate-slide-up">
                        Secret Code
                      </div>
                    )}
                  </div>
                </div>

                {/* Bouton de connexion */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    relative w-full
                    py-4 px-6
                    bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600
                    rounded-lg
                    text-white font-bold text-lg
                    transform transition-all duration-300
                    hover:scale-105 hover:shadow-2xl
                    active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed
                    overflow-hidden
                    group
                  `}
                >
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Contenu du bouton */}
                  <div className="relative flex items-center justify-center gap-3">
                    <Gamepad2 className={`w-6 h-6 ${loading ? 'animate-spin' : 'group-hover:rotate-12'} transition-transform`} />
                    <span>{loading ? 'LOADING...' : 'START GAME'}</span>
                    <Trophy className={`w-6 h-6 ${loading ? 'animate-bounce' : 'group-hover:-rotate-12'} transition-transform`} />
                  </div>

                  {/* Particules au hover */}
                  {!loading && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <Sparkles
                          key={i}
                          className="absolute w-4 h-4 text-yellow-300 animate-ping"
                          style={{
                            left: `${15 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                            animationDelay: `${i * 100}ms`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              </form>

              {/* Indice */}
              <div className="mt-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg backdrop-blur-sm">
                <div className="text-center space-y-1">
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                    <span className="text-yellow-400">💡</span>
                    Codes d\'accès par défaut
                    <span className="text-yellow-400">💡</span>
                  </p>
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-purple-400" />
                      <span className="text-purple-300">admin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-pink-400" />
                      <span className="text-pink-300">jds2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer gaming */}
              <div className="mt-6 flex justify-center gap-2">
                {gameIcons.slice(0, 5).map((icon, i) => (
                  <span
                    key={i}
                    className="text-2xl opacity-50 hover:opacity-100 transition-opacity cursor-pointer hover:scale-125 transform"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Score/Stats décoratifs */}
        <div className="mt-8 flex gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⭐</span>
            <span>High Score: 999999</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">🎯</span>
            <span>Level: Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">⚡</span>
            <span>Power: MAX</span>
          </div>
        </div>
      </div>

      {/* Styles personnalisés */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes neon-blink {
          0%, 100% {
            opacity: 1;
            filter: brightness(1.2) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8));
          }
          50% {
            opacity: 0.8;
            filter: brightness(1.5) drop-shadow(0 0 30px rgba(255, 255, 255, 1));
          }
          25%, 75% {
            opacity: 0.95;
            filter: brightness(1.3) drop-shadow(0 0 25px rgba(255, 0, 255, 0.6));
          }
        }
        
        @keyframes particle-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-30px, -30px) scale(0); opacity: 0; }
        }
        
        @keyframes particle-2 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(30px, -30px) scale(0); opacity: 0; }
        }
        
        @keyframes particle-3 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(0, -40px) scale(0); opacity: 0; }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-glitch {
          animation: glitch 0.3s ease-in-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-neon-blink {
          animation: neon-blink 2s ease-in-out infinite;
        }
        
        .animate-particle-1 {
          animation: particle-1 1s ease-out forwards;
        }
        
        .animate-particle-2 {
          animation: particle-2 1s ease-out forwards;
        }
        
        .animate-particle-3 {
          animation: particle-3 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}