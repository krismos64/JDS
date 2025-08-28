'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Trophy } from 'lucide-react';
import { Score, Game, Member } from '@/lib/types';

export default function ScoresAdmin() {
  const [scores, setScores] = useState<Score[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
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
      const response = await fetch('/api/admin/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newScore),
      });

      if (response.ok) {
        await fetchData();
        setShowAddForm(false);
        setNewScore({
          date: new Date().toLocaleDateString('fr-FR'),
          game: '',
          scores: {}
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du score:', error);
    }
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Gestion des scores</h1>
          <p className="text-white">Gérez les scores des parties</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau score
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Ajouter un score</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Date</label>
                <input
                  type="text"
                  value={newScore.date}
                  onChange={(e) => setNewScore({ ...newScore, date: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="JJ/MM/AAAA"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Jeu</label>
                <select
                  value={newScore.game}
                  onChange={(e) => setNewScore({ ...newScore, game: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Sélectionner un jeu</option>
                  {games.map(game => (
                    <option key={game.id} value={game.name}>{game.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-white mb-2">Scores des joueurs</label>
              {members.map(member => (
                <div key={member.id} className="flex items-center gap-3">
                  <span className="text-white w-24">{member.name}:</span>
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
                    className="flex-1 px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Score"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des scores */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-white">Date</th>
              <th className="px-6 py-3 text-left text-white">Jeu</th>
              <th className="px-6 py-3 text-left text-white">Scores</th>
              <th className="px-6 py-3 text-right text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index} className="border-t border-white/10">
                <td className="px-6 py-4 text-white">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {score.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-white">
                  {games.find(g => g.name === score.game)?.icon} {score.game}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 flex-wrap">
                    {Object.entries(score.scores).map(([playerId, playerScore]) => {
                      const member = members.find(m => m.id === playerId);
                      return (
                        <span key={playerId} className="text-white">
                          {member?.name}: <span className="text-white font-medium">{playerScore}</span>
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}