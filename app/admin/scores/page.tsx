'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Trophy, Crown, Calendar, Users, Gamepad2 } from 'lucide-react';
import { Score, Game, Member } from '@/lib/types';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function ScoresAdmin() {
  const [scores, setScores] = useState<Score[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingScore, setEditingScore] = useState<Score | null>(null);
  const [newScore, setNewScore] = useState<Partial<Score>>({
    date: new Date().toLocaleDateString('fr-FR'),
    game: '',
    scores: {}
  });

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="space-y-6">
      <AdminPageHeader
        title="Scores"
        subtitle="Hall of Fame"
        icon={Trophy}
        iconGradient="from-yellow-500 to-orange-500"
        count={scores.length}
        countLabel={scores.length > 1 ? 'parties' : 'partie'}
        action={
          <FuturisticButton
            variant="primary"
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingScore(null);
              setNewScore({
                date: new Date().toLocaleDateString('fr-FR'),
                game: '',
                scores: {},
              });
            }}
            icon={Plus}
            className="w-full sm:w-auto"
          >
            Nouveau score
          </FuturisticButton>
        }
      />

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <FuturisticCard>
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-white mb-5">
                  {editingScore ? 'Modifier la partie' : 'Nouvelle partie'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-slate-300 text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-cyan-400" />
                        Date de la partie
                      </label>
                      <input
                        type="date"
                        value={newScore.date ? new Date(newScore.date.split('/').reverse().join('-')).toISOString().split('T')[0] : ''}
                        onChange={(e) => setNewScore({ ...newScore, date: new Date(e.target.value).toLocaleDateString('fr-FR') })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-slate-300 text-sm font-medium flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4 text-purple-400" />
                        Jeu
                      </label>
                      <select
                        value={newScore.game}
                        onChange={(e) => setNewScore({ ...newScore, game: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 transition-colors"
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

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-300" />
                      <label className="text-slate-300 text-sm font-medium">
                        Scores des joueurs
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {members.map(member => (
                        <div key={member.id} className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shrink-0">
                              <span className="text-white text-xs font-semibold">{member.name[0]}</span>
                            </div>
                            <span className="text-white text-sm font-medium">{member.name}</span>
                            {member.nickname && (
                              <span className="text-slate-400 text-xs">[{member.nickname}]</span>
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
                            className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 transition-colors text-sm"
                            placeholder="Score"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <FuturisticButton
                      type="submit"
                      variant="success"
                      icon={Trophy}
                      className="flex-1"
                    >
                      {editingScore ? 'Mettre à jour' : 'Enregistrer'}
                    </FuturisticButton>
                    <FuturisticButton
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingScore(null);
                      }}
                      className="flex-1"
                    >
                      Annuler
                    </FuturisticButton>
                  </div>
                </form>
              </div>
            </FuturisticCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {scores.map((score, index) => {
          const winner = getWinner(score.scores);
          const winnerMember = winner ? members.find(m => m.id === winner[0]) : null;
          const game = games.find(g => g.name === score.game);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
            >
              <FuturisticCard className="h-full hover:border-slate-600 transition-colors">
                <div className="p-4 sm:p-5 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-2xl">{game?.icon || '🎮'}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {score.game}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{score.date}</span>
                        </div>
                        {winnerMember && (
                          <div className="flex items-center gap-1 mt-1">
                            <Crown className="h-3.5 w-3.5 text-yellow-400" />
                            <span className="text-yellow-300 text-sm font-medium truncate">
                              {winnerMember.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleEdit(score, index)}
                        className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        aria-label="Modifier"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
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
                            className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                              isWinner
                                ? 'bg-yellow-500/10 border border-yellow-500/30'
                                : 'bg-slate-800/40'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isWinner && <Crown className="h-4 w-4 text-yellow-400 shrink-0" />}
                              <span className={`text-sm font-medium truncate ${isWinner ? 'text-yellow-300' : 'text-white'}`}>
                                {member?.name || playerId}
                              </span>
                              {member?.nickname && (
                                <span className="text-slate-400 text-xs shrink-0">[{member.nickname}]</span>
                              )}
                            </div>
                            <div className={`font-semibold shrink-0 ${isWinner ? 'text-yellow-300 text-lg' : 'text-slate-300'}`}>
                              {playerScore}
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </FuturisticCard>
            </motion.div>
          );
        })}
      </div>

      {scores.length === 0 && (
        <FuturisticCard className="text-center py-12 max-w-md mx-auto">
          <div className="p-8">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucune partie
            </h3>
            <p className="text-slate-300 mb-6 text-sm">
              Enregistre la première partie pour commencer le Hall of Fame.
            </p>
            <FuturisticButton
              variant="primary"
              onClick={() => setShowAddForm(true)}
              icon={Plus}
            >
              Ajouter une partie
            </FuturisticButton>
          </div>
        </FuturisticCard>
      )}
    </div>
  );
}