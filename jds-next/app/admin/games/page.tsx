'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Trophy, Target } from 'lucide-react';
import { Game } from '@/lib/types';

export default function GamesAdmin() {
  const [games, setGames] = useState<Game[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [newGame, setNewGame] = useState<Partial<Game>>({
    id: '',
    name: '',
    icon: '',
    champion: '',
    record: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/games');
      if (response.ok) {
        const data = await response.json();
        setGames(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des jeux:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Générer l'ID automatiquement si nouveau jeu
    const gameToSave = {
      ...newGame,
      id: editingGame?.id || newGame.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || '',
    };

    try {
      const url = editingGame ? `/api/admin/games/${editingGame.id}` : '/api/admin/games';
      const method = editingGame ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameToSave),
      });

      if (response.ok) {
        await fetchData();
        setShowAddForm(false);
        setEditingGame(null);
        setNewGame({
          id: '',
          name: '',
          icon: '',
          champion: '',
          record: ''
        });
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleEdit = (game: Game) => {
    setEditingGame(game);
    setNewGame(game);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) return;

    try {
      const response = await fetch(`/api/admin/games/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const commonEmojis = ['🎲', '🃏', '🎯', '🎪', '🎨', '🧩', '🎭', '🎪', '🎳', '🎮', '🏆', '⭐', '💎', '🔥', '⚡', '🌟'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Gestion des jeux</h1>
          <p className="text-gray-300">Gérez la collection de jeux JDS</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingGame(null);
            setNewGame({
              id: '',
              name: '',
              icon: '',
              champion: '',
              record: ''
            });
          }}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau jeu
        </button>
      </div>

      {/* Formulaire d'ajout/édition */}
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            {editingGame ? 'Modifier le jeu' : 'Ajouter un jeu'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Nom du jeu</label>
                <input
                  type="text"
                  value={newGame.name}
                  onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nom du jeu"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Icône (emoji)</label>
                <input
                  type="text"
                  value={newGame.icon}
                  onChange={(e) => setNewGame({ ...newGame, icon: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="🎲"
                  required
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonEmojis.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewGame({ ...newGame, icon: emoji })}
                      className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded transition-colors text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Champion actuel</label>
                <input
                  type="text"
                  value={newGame.champion}
                  onChange={(e) => setNewGame({ ...newGame, champion: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nom du champion"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Record à battre</label>
                <input
                  type="text"
                  value={newGame.record}
                  onChange={(e) => setNewGame({ ...newGame, record: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Description du record"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                {editingGame ? 'Mettre à jour' : 'Enregistrer'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingGame(null);
                }}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des jeux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{game.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                  <p className="text-sm text-gray-400">ID: {game.id}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(game)}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {game.champion && (
              <div className="flex items-center text-yellow-300 mb-2">
                <Trophy className="h-4 w-4 mr-2" />
                <span className="text-sm">Champion: {game.champion}</span>
              </div>
            )}
            
            {game.record && (
              <div className="flex items-center text-purple-300">
                <Target className="h-4 w-4 mr-2" />
                <span className="text-sm">Record: {game.record}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {games.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎲</div>
          <h3 className="text-xl font-bold text-white mb-2">Aucun jeu enregistré</h3>
          <p className="text-gray-400 mb-4">Ajoutez votre premier jeu pour commencer</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Ajouter un jeu
          </button>
        </div>
      )}
    </div>
  );
}