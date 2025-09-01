'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Trophy, Medal, Star, Crown, Target, Zap, Flame, Award, Sparkles, Calendar, Users, Gamepad2 } from 'lucide-react';
import { Score, Game, Member } from '@/lib/types';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';

const scoreEmojis = ['🏆', '🥇', '🥈', '🥉', '⭐', '🔥', '💎', '👑', '⚡', '🎯', '🎖️', '🏅', '💫', '🌟', '⚽'];

export default function ScoresAdmin() {
  const [scores, setScores] = useState<Score[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingScore, setEditingScore] = useState<Score | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [newScore, setNewScore] = useState<Partial<Score>>({
    date: new Date().toLocaleDateString('fr-FR'),
    game: '',
    scores: {}
  });

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % scoreEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [mounted]);

  const fetchData = async () => {
    try {
      const [scoresRes, gamesRes, membersRes] = await Promise.all([
        fetch('/api/admin/scores'),
        fetch('/api/admin/games'),
        fetch('/api/admin/members')
      ]);

      if (scoresRes.ok && gamesRes.ok && membersRes.ok) {
        setScores(await scoresRes.json());
        setGames(await gamesRes.json());
        setMembers(await membersRes.json());
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingScore ? `/api/admin/scores/${editingScore.id || scores.indexOf(editingScore)}` : '/api/admin/scores';
      const method = editingScore ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newScore),
      });

      if (response.ok) {
        await fetchData();
        setShowAddForm(false);
        setEditingScore(null);
        setNewScore({
          date: new Date().toLocaleDateString('fr-FR'),
          game: '',
          scores: {}
        });
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleEdit = (score: Score, index: number) => {
    setEditingScore({ ...score, id: score.id || index });
    setNewScore(score);
    setShowAddForm(true);
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce score ?')) return;

    try {
      const response = await fetch(`/api/admin/scores/${index}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const getWinner = (scoreData: { [key: string]: any }) => {
    const entries = Object.entries(scoreData);
    if (entries.length === 0) return null;
    
    const winner = entries.reduce((prev, current) => {
      const prevScore = typeof prev[1] === 'number' ? prev[1] : parseInt(prev[1] as string) || 0;
      const currentScore = typeof current[1] === 'number' ? current[1] : parseInt(current[1] as string) || 0;
      return currentScore > prevScore ? current : prev;
    });
    
    return winner;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Background Gaming Effects */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl sm:text-4xl opacity-10"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: -50
              }}
              animate={{ 
                y: '120%',
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
            >
              {scoreEmojis[i]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Header Gaming Style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <FuturisticCard glowColor="from-yellow-400/30 to-orange-500/30">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-3 mb-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/50">
                      <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {mounted && (
                      <div className="absolute -top-1 -right-1 text-xl animate-bounce">
                        {scoreEmojis[currentEmoji]}
                      </div>
                    )}
                  </motion.div>
                  
                  <div>
                    <h1 className="relative">
                      <span className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent blur-sm animate-pulse">
                        HALL OF FAME
                      </span>
                      <span className="relative text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent uppercase tracking-wider">
                        HALL OF FAME
                      </span>
                    </h1>
                  </div>
                </div>
                
                <motion.p 
                  className="text-yellow-300 text-sm sm:text-base font-medium flex items-center justify-center sm:justify-start gap-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target className="h-4 w-4 animate-pulse" />
                  Gérez les scores et records
                  <span className="text-xs bg-yellow-500/20 px-2 py-1 rounded-full">
                    {scores.length} PARTIES
                  </span>
                </motion.p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FuturisticButton
                  variant="primary"
                  onClick={() => {
                    setShowAddForm(!showAddForm);
                    setEditingScore(null);
                    setNewScore({
                      date: new Date().toLocaleDateString('fr-FR'),
                      game: '',
                      scores: {}
                    });
                  }}
                  className="w-full sm:w-auto text-sm sm:text-base font-bold uppercase tracking-wider group"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform" />
                  <span className="hidden sm:inline">Nouveau Score</span>
                  <span className="sm:hidden">Score</span>
                </FuturisticButton>
              </motion.div>
            </div>
          </div>
        </FuturisticCard>
      </motion.div>

      {/* Formulaire Gaming */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <FuturisticCard glowColor="from-cyan-400/30 to-purple-500/30">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-6 w-6 text-yellow-400" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
                      {editingScore ? 'MODIFIER PARTIE' : 'NOUVELLE PARTIE'}
                    </h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-cyan-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date de la partie
                      </label>
                      <input
                        type="date"
                        value={newScore.date ? new Date(newScore.date.split('/').reverse().join('-')).toISOString().split('T')[0] : ''}
                        onChange={(e) => setNewScore({ ...newScore, date: new Date(e.target.value).toLocaleDateString('fr-FR') })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:bg-gray-900/70 transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-purple-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4" />
                        Jeu joué
                      </label>
                      <select
                        value={newScore.game}
                        onChange={(e) => setNewScore({ ...newScore, game: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:bg-gray-900/70 transition-all"
                        required
                      >
                        <option value="">Sélectionner un jeu</option>
                        {games.map(game => (
                          <option key={game.id} value={game.name}>
                            {game.icon} {game.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-yellow-300" />
                      <label className="text-yellow-300 text-sm font-bold uppercase tracking-wider">
                        Scores des joueurs
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {members.map(member => (
                        <div key={member.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm font-bold">{member.name[0]}</span>
                            </div>
                            <span className="text-white font-medium">{member.name}</span>
                            {member.nickname && (
                              <span className="text-cyan-400 text-sm">[{member.nickname}]</span>
                            )}
                          </div>
                          <input
                            type="text"
                            value={newScore.scores?.[member.id] || ''}
                            onChange={(e) => setNewScore({
                              ...newScore,
                              scores: {
                                ...newScore.scores,
                                [member.id]: isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value)
                              }
                            })}
                            className="w-full px-4 py-3 bg-gray-900/50 border-2 border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900/70 transition-all"
                            placeholder="Score du joueur"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <FuturisticButton
                        type="submit"
                        variant="success"
                        className="w-full font-bold uppercase tracking-wider"
                      >
                        <Trophy className="h-5 w-5" />
                        {editingScore ? 'METTRE À JOUR' : 'ENREGISTRER'}
                      </FuturisticButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <FuturisticButton
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingScore(null);
                        }}
                        className="w-full font-bold uppercase tracking-wider"
                      >
                        ANNULER
                      </FuturisticButton>
                    </motion.div>
                  </div>
                </form>
              </div>
            </FuturisticCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste des scores - Style gaming */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
      >
        {scores.map((score, index) => {
          const winner = getWinner(score.scores);
          const winnerMember = winner ? members.find(m => m.id === winner[0]) : null;
          const game = games.find(g => g.name === score.game);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <FuturisticCard glowColor="from-purple-400/20 to-pink-500/20" className="h-full group">
                <div className="p-4 sm:p-6 h-full">
                  {/* Header avec date et jeu */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                        <span className="text-2xl">{game?.icon || '🎮'}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                          {score.game}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-cyan-300">
                          <Calendar className="h-4 w-4" />
                          <span>{score.date}</span>
                        </div>
                        {winnerMember && (
                          <div className="flex items-center gap-1 mt-1">
                            <Crown className="h-4 w-4 text-yellow-400" />
                            <span className="text-yellow-300 text-sm font-medium">
                              {winnerMember.name} champion
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1 sm:gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(score, index)}
                        className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all"
                      >
                        <Edit2 className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(index)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Scores des joueurs */}
                  <div className="space-y-2">
                    {Object.entries(score.scores)
                      .sort(([,a], [,b]) => {
                        const scoreA = typeof a === 'number' ? a : parseInt(a as string) || 0;
                        const scoreB = typeof b === 'number' ? b : parseInt(b as string) || 0;
                        return scoreB - scoreA;
                      })
                      .map(([playerId, playerScore], scoreIndex) => {
                        const member = members.find(m => m.id === playerId);
                        const isWinner = scoreIndex === 0;
                        
                        return (
                          <div
                            key={playerId}
                            className={`
                              flex items-center justify-between p-2 rounded-lg transition-all
                              ${isWinner ? 
                                'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' : 
                                'bg-gray-800/30 hover:bg-gray-700/30'
                              }
                            `}
                          >
                            <div className="flex items-center gap-2">
                              {isWinner && <Crown className="h-4 w-4 text-yellow-400 animate-pulse" />}
                              <span className={`font-medium ${isWinner ? 'text-yellow-300' : 'text-white'}`}>
                                {member?.name || playerId}
                              </span>
                              {member?.nickname && (
                                <span className="text-cyan-400 text-sm">[{member.nickname}]</span>
                              )}
                            </div>
                            <div className={`font-bold ${isWinner ? 'text-yellow-300 text-lg' : 'text-gray-300'}`}>
                              {playerScore}
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>

                  {/* Barre de progression décorative */}
                  <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    />
                  </div>
                </div>
              </FuturisticCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* État vide gaming */}
      {scores.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 sm:py-16"
        >
          <FuturisticCard glowColor="from-gray-400/20 to-yellow-500/20">
            <div className="p-8 sm:p-12">
              <motion.div
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-6xl sm:text-8xl mb-6"
              >
                🏆
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase tracking-wider">
                HALL VIDE
              </h3>
              <p className="text-gray-400 mb-8 text-sm sm:text-base">
                Les premiers champions attendent leur couronnement !
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <FuturisticButton
                  variant="primary"
                  onClick={() => setShowAddForm(true)}
                  className="font-bold uppercase tracking-wider"
                >
                  <Plus className="h-5 w-5" />
                  CRÉER PREMIÈRE PARTIE
                </FuturisticButton>
              </motion.div>
            </div>
          </FuturisticCard>
        </motion.div>
      )}
    </div>
  );
}