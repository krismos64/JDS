'use client';

import { useState, useEffect } from 'react';
import { Users, Trophy, Dice1, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalMembers: number;
  totalGames: number;
  totalScores: number;
  totalAnecdotes: number;
  lastGameDate: string;
  topPlayer: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    totalGames: 0,
    totalScores: 0,
    totalAnecdotes: 0,
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
      color: 'from-purple-500 to-pink-500',
      link: '/admin/members',
    },
    {
      title: 'Jeux',
      value: stats.totalGames,
      icon: Dice1,
      color: 'from-blue-500 to-cyan-500',
      link: '/admin/games',
    },
    {
      title: 'Parties jouées',
      value: stats.totalScores,
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      link: '/admin/scores',
    },
    {
      title: 'Anecdotes',
      value: stats.totalAnecdotes,
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
      link: '/admin/anecdotes',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Tableau de bord</h1>
        <p className="text-gray-300">Gérez votre site JDS depuis cet espace</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.link}
              className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-white/80" />
                  <span className="text-3xl font-bold text-white">{card.value}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-200">{card.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Actions rapides */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/scores/new"
            className="flex items-center p-4 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors"
          >
            <Trophy className="h-6 w-6 text-purple-300 mr-3" />
            <span className="text-white">Ajouter un score</span>
          </Link>
          <Link
            href="/admin/anecdotes/new"
            className="flex items-center p-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
          >
            <BookOpen className="h-6 w-6 text-blue-300 mr-3" />
            <span className="text-white">Nouvelle anecdote</span>
          </Link>
          <Link
            href="/admin/games/new"
            className="flex items-center p-4 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-colors"
          >
            <Dice1 className="h-6 w-6 text-green-300 mr-3" />
            <span className="text-white">Ajouter un jeu</span>
          </Link>
        </div>
      </div>

      {/* Informations supplémentaires */}
      {stats.lastGameDate && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Informations</h2>
          <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <Calendar className="h-5 w-5 mr-3" />
              <span>Dernière partie : {stats.lastGameDate}</span>
            </div>
            {stats.topPlayer && (
              <div className="flex items-center text-gray-300">
                <TrendingUp className="h-5 w-5 mr-3" />
                <span>Joueur avec le plus de victoires : {stats.topPlayer}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}