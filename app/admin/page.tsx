'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Dice1, BookOpen, Calendar, BarChart, Gamepad2, Crown, Star } from 'lucide-react';
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
      title: 'Next Game',
      value: '📅',
      icon: Calendar,
      iconBg: 'bg-cyan-500',
      link: '/admin/next-game',
      description: 'Prochaine soirée',
    },
    {
      title: 'Membres',
      value: stats.totalMembers,
      icon: Users,
      iconBg: 'bg-purple-500',
      link: '/admin/members',
      description: 'Équipe JDS',
    },
    {
      title: 'Jeux',
      value: stats.totalGames,
      icon: Dice1,
      iconBg: 'bg-blue-500',
      link: '/admin/games',
      description: 'Collection',
    },
    {
      title: 'Parties jouées',
      value: stats.totalScores,
      icon: Trophy,
      iconBg: 'bg-emerald-500',
      link: '/admin/scores',
      description: 'Scores enregistrés',
    },
    {
      title: 'Anecdotes',
      value: stats.totalAnecdotes,
      icon: BookOpen,
      iconBg: 'bg-orange-500',
      link: '/admin/anecdotes',
      description: 'Moments mémorables',
    },
    {
      title: 'Citations Olivia',
      value: stats.totalOliviaQuotes,
      icon: BarChart,
      iconBg: 'bg-pink-500',
      link: '/admin/olivia',
      description: 'Phrases cultes',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
          <Gamepad2 className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-slate-300 text-sm">Vue d&apos;ensemble JDS</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link href={card.link} className="block h-full">
                <FuturisticCard className="h-full p-4 hover:border-slate-600 hover:bg-slate-800/80 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-bold text-white">
                      {card.value}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-0.5">
                    {card.title}
                  </h3>
                  <p className="text-slate-300 text-xs">{card.description}</p>
                </FuturisticCard>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <FuturisticCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Actions rapides</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Link href="/admin/scores">
              <FuturisticButton variant="primary" className="w-full flex items-center justify-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>Score</span>
              </FuturisticButton>
            </Link>
            <Link href="/admin/anecdotes">
              <FuturisticButton variant="secondary" className="w-full flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Anecdote</span>
              </FuturisticButton>
            </Link>
            <Link href="/admin/games">
              <FuturisticButton variant="success" className="w-full flex items-center justify-center gap-2">
                <Dice1 className="h-4 w-4" />
                <span>Jeu</span>
              </FuturisticButton>
            </Link>
            <Link href="/admin/olivia">
              <FuturisticButton variant="warning" className="w-full flex items-center justify-center gap-2">
                <Star className="h-4 w-4" />
                <span>Citation</span>
              </FuturisticButton>
            </Link>
          </div>
        </FuturisticCard>
      </motion.div>

      {stats.lastGameDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FuturisticCard className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center shrink-0">
              <Calendar className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-slate-300 text-xs uppercase tracking-wider">Dernière partie</p>
              <p className="text-white text-lg font-semibold">{stats.lastGameDate}</p>
            </div>
          </FuturisticCard>

          {stats.topPlayer && (
            <FuturisticCard className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center shrink-0">
                <Crown className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-300 text-xs uppercase tracking-wider">Champion actuel</p>
                <p className="text-white text-lg font-semibold">{stats.topPlayer}</p>
              </div>
            </FuturisticCard>
          )}
        </motion.div>
      )}
    </div>
  );
}
