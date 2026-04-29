'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Target, Gamepad2, Crown } from 'lucide-react';
import { Game } from '@/lib/types';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const gameEmojis = ['🎮', '🎲', '🃏', '🎯', '🎪', '🎨', '🧩', '🎭', '🎳', '🏆', '⭐', '💎', '🔥', '⚡', '🌟'];

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


  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Jeux"
        subtitle="Collection JDS"
        icon={Gamepad2}
        iconGradient="from-blue-500 to-cyan-500"
        count={games.length}
        countLabel={games.length > 1 ? 'jeux' : 'jeu'}
        action={
          <FuturisticButton
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingGame(null);
              setNewGame({ id: '', name: '', icon: '', champion: '', record: '' });
            }}
            variant={showAddForm ? 'secondary' : 'primary'}
            icon={Plus}
            className="w-full sm:w-auto"
          >
            {showAddForm ? 'Fermer' : 'Nouveau jeu'}
          </FuturisticButton>
        }
      />

      {/* Console de création/édition */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <FuturisticCard className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-white mb-5">
                {editingGame ? 'Modifier le jeu' : 'Nouveau jeu'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4 text-cyan-400" />
                      Nom du jeu
                    </label>
                    <input
                      type="text"
                      value={newGame.name}
                      onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder-slate-400"
                      placeholder="Entrez le nom du jeu..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium flex items-center gap-2">
                      Icône
                    </label>
                    <input
                      type="text"
                      value={newGame.icon}
                      onChange={(e) => setNewGame({ ...newGame, icon: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-colors placeholder-slate-400 text-center text-2xl"
                      placeholder="🎮"
                      required
                    />
                  </div>
                </div>

                <div className="bg-slate-900/40 rounded-lg p-4">
                  <div className="text-slate-300 mb-3 text-sm font-medium">
                    Choix rapide d&apos;icône
                  </div>
                  <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                    {gameEmojis.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setNewGame({ ...newGame, icon: emoji })}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl transition-colors ${
                          newGame.icon === emoji
                            ? 'bg-cyan-500/30 border border-cyan-400'
                            : 'bg-slate-800/60 hover:bg-slate-700 border border-slate-700'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium flex items-center gap-2">
                      <Crown className="h-4 w-4 text-yellow-400" />
                      Champion actuel
                    </label>
                    <input
                      type="text"
                      value={newGame.champion}
                      onChange={(e) => setNewGame({ ...newGame, champion: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder-slate-400"
                      placeholder="Nom du champion actuel..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cyan-300 mb-2 text-sm font-bold tracking-wider flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      RECORD À BATTRE
                    </label>
                    <input
                      type="text"
                      value={newGame.record}
                      onChange={(e) => setNewGame({ ...newGame, record: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder-slate-400"
                      placeholder="Description du record..."
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <FuturisticButton
                    type="submit"
                    variant="primary"
                    icon={editingGame ? Edit2 : Plus}
                    className="flex-1"
                  >
                    {editingGame ? 'Mettre à jour' : 'Enregistrer'}
                  </FuturisticButton>
                  <FuturisticButton
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingGame(null);
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    Annuler
                  </FuturisticButton>
                </div>
              </form>
            </FuturisticCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
            >
              <FuturisticCard className="h-full p-4 sm:p-5 hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl sm:text-5xl">{game.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {game.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono truncate">{game.id}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(game)}
                      className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
                      aria-label="Modifier"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Supprimer ce jeu ?')) {
                          handleDelete(game.id);
                        }
                      }}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {game.champion && (
                    <div className="flex items-center gap-2 p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <Crown className="h-4 w-4 text-yellow-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-yellow-300 font-medium uppercase tracking-wide">Champion</div>
                        <div className="text-sm text-white truncate">{game.champion}</div>
                      </div>
                    </div>
                  )}

                  {game.record && (
                    <div className="flex items-center gap-2 p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <Target className="h-4 w-4 text-purple-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-purple-300 font-medium uppercase tracking-wide">Record</div>
                        <div className="text-sm text-white truncate">{game.record}</div>
                      </div>
                    </div>
                  )}

                  {!game.champion && !game.record && (
                    <div className="text-center py-3 text-slate-400 text-sm">
                      Pas encore de champion
                    </div>
                  )}
                </div>
              </FuturisticCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {games.length === 0 && (
        <FuturisticCard className="max-w-md mx-auto text-center p-8">
          <div className="text-5xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Aucun jeu
          </h3>
          <p className="text-slate-300 mb-6 text-sm">
            Ajoute le premier jeu de la collection.
          </p>
          <FuturisticButton
            onClick={() => setShowAddForm(true)}
            variant="primary"
            icon={Plus}
          >
            Ajouter un jeu
          </FuturisticButton>
        </FuturisticCard>
      )}
    </div>
  );
}