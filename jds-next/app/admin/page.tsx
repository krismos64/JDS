'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Dice1, BookOpen, TrendingUp, Calendar, BarChart, Zap, Activity, Sparkles } from 'lucide-react';
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

  useEffect(() => {
    // Charger les statistiques depuis les fichiers JSON
    fetchStats();
  }, []);

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
      description: 'Équipe JDS'
    },
    {
      title: 'Jeux',
      value: stats.totalGames,
      icon: Dice1,
      color: 'from-cyan-400 to-blue-500',
      glowColor: 'from-cyan-400/30 to-blue-500/30',
      link: '/admin/games',
      description: 'Collection'
    },
    {
      title: 'Parties jouées',
      value: stats.totalScores,
      icon: Trophy,
      color: 'from-emerald-400 to-teal-500',
      glowColor: 'from-emerald-400/30 to-teal-500/30',
      link: '/admin/scores',
      description: 'Scores enregistrés'
    },
    {
      title: 'Anecdotes',
      value: stats.totalAnecdotes,
      icon: BookOpen,
      color: 'from-orange-400 to-red-500',
      glowColor: 'from-orange-400/30 to-red-500/30',
      link: '/admin/anecdotes',
      description: 'Moments mémorables'
    },
    {
      title: 'Citations Olivia',
      value: stats.totalOliviaQuotes,
      icon: BarChart,
      color: 'from-pink-400 to-rose-500',
      glowColor: 'from-pink-400/30 to-rose-500/30',
      link: '/admin/olivia',
      description: 'Phrases cultes'
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-400/50">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Control Panel
            </h1>
            <p className="text-cyan-400 text-base lg:text-lg flex items-center font-medium">
              <Activity className="h-4 w-4 mr-2 animate-pulse text-emerald-400" />
              Système JDS opérationnel
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <FuturisticCard
                glowColor={card.glowColor}
                className="h-full"
              >
                <Link href={card.link} className="block h-full">
                  <div className="p-6 h-full flex flex-col">
                    {/* Icon and Value */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <motion.span 
                        className="text-4xl font-bold text-white"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      >
                        {card.value}
                      </motion.span>
                    </div>
                    
                    {/* Title and Description */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">{card.title}</h3>
                      <p className="text-white text-sm">{card.description}</p>
                    </div>
                    
                    {/* Progress Bar Animation */}
                    <div className="mt-4">
                      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${card.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(card.value * 10, 100)}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </FuturisticCard>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <FuturisticCard glowColor="from-cyan-400/30 to-purple-500/30">
          <div className="p-4 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Actions Rapides</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admin/scores" className="block">
                  <FuturisticButton variant="primary" className="w-full h-12 lg:h-16 text-sm lg:text-base">
                    <Trophy className="h-4 w-4 lg:h-5 lg:w-5" />
                    Ajouter Score
                  </FuturisticButton>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admin/anecdotes" className="block">
                  <FuturisticButton variant="secondary" className="w-full h-12 lg:h-16 text-sm lg:text-base">
                    <BookOpen className="h-4 w-4 lg:h-5 lg:w-5" />
                    Nouvelle Anecdote
                  </FuturisticButton>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admin/games" className="block">
                  <FuturisticButton variant="success" className="w-full h-12 lg:h-16 text-sm lg:text-base">
                    <Dice1 className="h-4 w-4 lg:h-5 lg:w-5" />
                    Ajouter Jeu
                  </FuturisticButton>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admin/olivia" className="block">
                  <FuturisticButton variant="warning" className="w-full h-12 lg:h-16 text-sm lg:text-base">
                    <BarChart className="h-4 w-4 lg:h-5 lg:w-5" />
                    Citations Olivia
                  </FuturisticButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </FuturisticCard>
      </motion.div>

      {/* System Information */}
      {stats.lastGameDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <FuturisticCard glowColor="from-emerald-400/30 to-cyan-500/30">
            <div className="p-4 lg:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Activity className="h-6 w-6 text-emerald-400" />
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Informations Système</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                  <Calendar className="h-8 w-8 text-cyan-400" />
                  <div>
                    <p className="text-cyan-300 text-sm">Dernière Partie</p>
                    <p className="text-white text-lg font-semibold">{stats.lastGameDate}</p>
                  </div>
                </div>
                
                {stats.topPlayer && (
                  <div className="flex items-center space-x-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 shadow-lg shadow-yellow-500/10">
                    <TrendingUp className="h-8 w-8 text-yellow-400" />
                    <div>
                      <p className="text-yellow-300 text-sm">Champion Actuel</p>
                      <p className="text-white text-lg font-semibold">{stats.topPlayer}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FuturisticCard>
        </motion.div>
      )}
    </div>
  );
}