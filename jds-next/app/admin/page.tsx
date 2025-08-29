'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Dice1, BookOpen, TrendingUp, Calendar, BarChart, Zap, Activity, Sparkles, Gamepad2, Star, Flame, Crown, Swords, Target } from 'lucide-react';
import Link from 'next/link';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';

interface DashboardStats {
  totalMembers: number;
  totalGames: number;
  totalScores: number;
  totalAnecdotes: number;
  totalOliviaQuotes: number;
  lastGameDate: string;
  topPlayer: string;
}

const gameEmojis = ['🎮', '🎲', '🃏', '🎯', '👾', '🕹️', '🏆', '⚡', '🎰', '🎪', '🎨', '🎭'];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    totalGames: 0,
    totalScores: 0,
    totalAnecdotes: 0,
    totalOliviaQuotes: 0,
    lastGameDate: '',
    topPlayer: '',
  });
  const [mounted, setMounted] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % gameEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [mounted]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des stats:', error);
    }
  };

  const cards = [
    {
      title: 'Membres',
      value: stats.totalMembers,
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      glowColor: 'from-purple-400/30 to-pink-500/30',
      link: '/admin/members',
      description: 'Équipe JDS',
      emoji: '👥'
    },
    {
      title: 'Jeux',
      value: stats.totalGames,
      icon: Dice1,
      color: 'from-cyan-400 to-blue-500',
      glowColor: 'from-cyan-400/30 to-blue-500/30',
      link: '/admin/games',
      description: 'Collection',
      emoji: '🎲'
    },
    {
      title: 'Parties jouées',
      value: stats.totalScores,
      icon: Trophy,
      color: 'from-emerald-400 to-teal-500',
      glowColor: 'from-emerald-400/30 to-teal-500/30',
      link: '/admin/scores',
      description: 'Scores enregistrés',
      emoji: '🏆'
    },
    {
      title: 'Anecdotes',
      value: stats.totalAnecdotes,
      icon: BookOpen,
      color: 'from-orange-400 to-red-500',
      glowColor: 'from-orange-400/30 to-red-500/30',
      link: '/admin/anecdotes',
      description: 'Moments mémorables',
      emoji: '📖'
    },
    {
      title: 'Citations Olivia',
      value: stats.totalOliviaQuotes,
      icon: BarChart,
      color: 'from-pink-400 to-rose-500',
      glowColor: 'from-pink-400/30 to-rose-500/30',
      link: '/admin/olivia',
      description: 'Phrases cultes',
      emoji: '💬'
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section mobile first avec animations gaming */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Particules flottantes en arrière-plan - responsive */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl md:text-4xl opacity-20"
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: -50
                }}
                animate={{ 
                  y: '120%',
                  rotate: 360
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "linear"
                }}
              >
                {gameEmojis[i % gameEmojis.length]}
              </motion.div>
            ))}
          </div>
        )}

        {/* Header mobile first - centré */}
        <div className="text-center mb-6">
          {/* Logo animé responsive */}
          <motion.div 
            className="inline-block relative mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-400/50 mx-auto">
              <Gamepad2 className="h-6 w-6 sm:h-9 sm:w-9 md:h-11 md:w-11 text-white" />
              {mounted && (
                <div className="absolute -top-2 -right-2 text-lg sm:text-2xl animate-bounce">
                  {gameEmojis[currentEmoji]}
                </div>
              )}
            </div>
          </motion.div>

          {/* Titre principal responsive avec effet néon clignotant */}
          <div className="relative">
            <span className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent blur-sm animate-pulse">
              CONTROL PANEL
            </span>
            <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              CONTROL PANEL
            </h1>
          </div>
          
          {/* Sous-titre responsive avec effet de typing */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
            <motion.div 
              className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 text-base sm:text-lg md:text-xl font-bold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-400 animate-pulse" />
              SYSTÈME JDS OPÉRATIONNEL
            </motion.div>
            {mounted && (
              <div className="flex space-x-1">
                {['🟢', '🟢', '🟢'].map((dot, i) => (
                  <motion.span
                    key={i}
                    className="text-sm sm:text-base"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {dot}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Barre de progression animée responsive */}
        <div className="h-1 sm:h-2 bg-gray-800 rounded-full overflow-hidden mt-6">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ width: '50%' }}
          />
        </div>
      </motion.div>

      {/* Statistics Cards mobile first avec effets gaming */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20, rotateY: 180 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.2 }
              }}
            >
              <FuturisticCard
                glowColor={card.glowColor}
                className="h-full relative overflow-hidden group"
              >
                {/* Effet de scan au hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000"></div>
                
                <Link href={card.link} className="block h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col relative">
                    {/* Badge emoji flottant - responsive */}
                    {mounted && (
                      <motion.div 
                        className="absolute top-2 right-2 text-xl sm:text-2xl md:text-3xl opacity-30"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {card.emoji}
                      </motion.div>
                    )}

                    {/* Icon and Value - mobile first */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <motion.div 
                        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${card.color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg relative`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-lg sm:rounded-xl blur-md"></div>
                      </motion.div>
                      
                      <motion.span 
                        className="relative"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      >
                        <span className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white blur-sm opacity-50">
                          {card.value}
                        </span>
                        <span className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {card.value}
                        </span>
                      </motion.span>
                    </div>
                    
                    {/* Title and Description avec style gaming - responsive */}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-1 uppercase tracking-wider">
                        {card.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide">{card.description}</p>
                    </div>
                    
                    {/* Progress Bar Animation avec effet néon - responsive */}
                    <div className="mt-3 sm:mt-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                      <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${card.color} relative`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(card.value * 10, 100)}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FuturisticCard>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions avec style arcade */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <FuturisticCard glowColor="from-cyan-400/30 to-purple-500/30" className="relative overflow-hidden">
          {/* Grille cyberpunk en arrière-plan */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <div className="p-3 sm:p-4 lg:p-8 relative">
            {/* Titre mobile first centré */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-yellow-400" />
                </motion.div>
                <div className="relative">
                  <span className="absolute inset-0 text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent blur-sm">
                    ACTIONS RAPIDES
                  </span>
                  <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent uppercase tracking-wider">
                    ACTIONS RAPIDES
                  </h2>
                </div>
              </div>
              
              {/* Icônes animées */}
              {mounted && (
                <div className="flex justify-center space-x-2 text-lg sm:text-xl md:text-2xl">
                  {['⚡', '🎯', '🚀'].map((icon, i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.3 
                      }}
                    >
                      {icon}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Grille responsive mobile first */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/admin/scores" className="block">
                  <FuturisticButton variant="primary" className="w-full h-14 sm:h-16 lg:h-20 text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider group">
                    <Trophy className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 group-hover:rotate-12 transition-transform" />
                    <span className="relative">
                      <span className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Ajouter Score
                      </span>
                      <span className="hidden sm:inline">Ajouter Score</span>
                      <span className="sm:hidden">Score</span>
                    </span>
                  </FuturisticButton>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/admin/anecdotes" className="block">
                  <FuturisticButton variant="secondary" className="w-full h-14 sm:h-16 lg:h-20 text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider group">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 group-hover:rotate-12 transition-transform" />
                    <span className="relative">
                      <span className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Nouvelle Anecdote
                      </span>
                      <span className="hidden sm:inline">Nouvelle Anecdote</span>
                      <span className="sm:hidden">Anecdote</span>
                    </span>
                  </FuturisticButton>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/admin/games" className="block">
                  <FuturisticButton variant="success" className="w-full h-14 sm:h-16 lg:h-20 text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider group">
                    <Dice1 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="relative">
                      <span className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Ajouter Jeu
                      </span>
                      <span className="hidden sm:inline">Ajouter Jeu</span>
                      <span className="sm:hidden">Jeu</span>
                    </span>
                  </FuturisticButton>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/admin/olivia" className="block">
                  <FuturisticButton variant="warning" className="w-full h-14 sm:h-16 lg:h-20 text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider group">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="relative">
                      <span className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Citations Olivia
                      </span>
                      <span className="hidden sm:inline">Citations Olivia</span>
                      <span className="sm:hidden">Citations</span>
                    </span>
                  </FuturisticButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </FuturisticCard>
      </motion.div>

      {/* System Information avec style rétro-gaming */}
      {stats.lastGameDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <FuturisticCard glowColor="from-emerald-400/30 to-cyan-500/30" className="relative overflow-hidden">
            {/* Animation de lignes de scan */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                animate={{ y: ['-100%', '100vh'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="p-4 lg:p-8 relative">
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Target className="h-8 w-8 text-emerald-400" />
                </motion.div>
                <h2 className="relative">
                  <span className="absolute inset-0 text-3xl lg:text-4xl font-black bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent blur-sm animate-pulse">
                    INFORMATIONS SYSTÈME
                  </span>
                  <span className="relative text-3xl lg:text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-wider">
                    INFORMATIONS SYSTÈME
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative flex items-center space-x-4 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border-2 border-cyan-500/30 group-hover:border-cyan-400/50 transition-all">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Calendar className="h-10 w-10 text-cyan-400" />
                    </motion.div>
                    <div>
                      <p className="text-cyan-300 text-sm font-bold uppercase tracking-wider">Dernière Partie</p>
                      <p className="text-white text-2xl font-black">{stats.lastGameDate}</p>
                    </div>
                    {mounted && (
                      <div className="absolute top-2 right-2 text-2xl animate-pulse">
                        📅
                      </div>
                    )}
                  </div>
                </motion.div>
                
                {stats.topPlayer && (
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative flex items-center space-x-4 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border-2 border-yellow-500/30 group-hover:border-yellow-400/50 transition-all">
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Crown className="h-10 w-10 text-yellow-400" />
                      </motion.div>
                      <div>
                        <p className="text-yellow-300 text-sm font-bold uppercase tracking-wider">Champion Actuel</p>
                        <p className="text-white text-2xl font-black">{stats.topPlayer}</p>
                      </div>
                      {mounted && (
                        <div className="absolute top-2 right-2 text-2xl animate-bounce">
                          👑
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </FuturisticCard>
        </motion.div>
      )}

      {/* Styles personnalisés */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}