'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Trophy, Target, Gamepad2, Crown, Star, Zap, Sparkles, Joystick } from 'lucide-react';
import { Game } from '@/lib/types';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';

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
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-6">
      {/* Background animé gaming */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-cyan-900/30"></div>
        {/* Grille cyberpunk */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        {/* Particules flottantes */}
        {gameEmojis.map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-10"
            initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 50 }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
              rotate: [0, 360]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Header mobile first avec animations gaming */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-8"
      >
        <div className="relative mb-4">
          <span className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent blur-sm animate-pulse">
            GAMES ARENA
          </span>
          <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
            GAMES ARENA
          </h1>
        </div>
        
        <motion.div
          className="flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm md:text-base text-cyan-300 mb-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Gamepad2 className="h-4 w-4" />
          <span className="font-bold tracking-wider">COLLECTION MANAGEMENT</span>
          <Joystick className="h-4 w-4" />
          <span className="hidden sm:inline font-bold tracking-wider">SYSTEM</span>
          <Crown className="h-4 w-4" />
        </motion.div>

        <FuturisticButton
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
          variant={showAddForm ? "secondary" : "primary"}
          icon={Plus}
          className="w-full sm:w-auto"
        >
          {showAddForm ? 'FERMER CONSOLE' : 'NOUVEAU GAME'}
        </FuturisticButton>
      </motion.div>

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
              <div className="text-center mb-6">
                <div className="relative">
                  <span className="absolute inset-0 text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent blur-sm animate-pulse">
                    {editingGame ? 'MODIFIER GAME' : 'CRÉER NOUVEAU GAME'}
                  </span>
                  <h2 className="relative text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    {editingGame ? 'MODIFIER GAME' : 'CRÉER NOUVEAU GAME'}
                  </h2>
                </div>
                
                <div className="flex justify-center items-center gap-2 mt-2 text-xs sm:text-sm text-cyan-300">
                  <Sparkles className="h-3 w-3" />
                  <span className="font-bold tracking-wider">CONSOLE ACTIVE</span>
                  <Sparkles className="h-3 w-3" />
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cyan-300 mb-2 text-sm font-bold tracking-wider flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4" />
                      NOM DU GAME
                    </label>
                    <input
                      type="text"
                      value={newGame.name}
                      onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder-gray-400"
                      placeholder="Entrez le nom du jeu..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cyan-300 mb-2 text-sm font-bold tracking-wider flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      ICÔNE GAME
                    </label>
                    <input
                      type="text"
                      value={newGame.icon}
                      onChange={(e) => setNewGame({ ...newGame, icon: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder-gray-400 text-center text-2xl"
                      placeholder="🎮"
                      required
                    />
                  </div>
                </div>
                
                {/* Sélecteur d'emojis gaming */}
                <div className="bg-slate-900/30 rounded-lg p-4">
                  <div className="text-cyan-300 mb-3 text-sm font-bold tracking-wider flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    ICÔNES GAMING
                  </div>
                  <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                    {gameEmojis.map(emoji => (
                      <motion.button
                        key={emoji}
                        type="button"
                        onClick={() => setNewGame({ ...newGame, icon: emoji })}
                        className="w-10 h-10 flex items-center justify-center bg-slate-800/50 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400 rounded-lg transition-all text-xl hover:scale-110"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cyan-300 mb-2 text-sm font-bold tracking-wider flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      CHAMPION ACTUEL
                    </label>
                    <input
                      type="text"
                      value={newGame.champion}
                      onChange={(e) => setNewGame({ ...newGame, champion: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder-gray-400"
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
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder-gray-400"
                      placeholder="Description du record..."
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <FuturisticButton
                    type="submit"
                    variant="primary"
                    icon={editingGame ? Edit2 : Plus}
                    className="flex-1"
                  >
                    {editingGame ? 'METTRE À JOUR' : 'SAUVEGARDER'}
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
                    ANNULER
                  </FuturisticButton>
                </div>
              </form>
            </FuturisticCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grille des jeux gaming */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence>
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FuturisticCard className="h-full hover:scale-105 transition-transform duration-300">
                {/* Header avec icône et actions */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="text-4xl sm:text-5xl"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {game.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white truncate mb-1">
                        {game.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-cyan-300">
                        <Gamepad2 className="h-3 w-3" />
                        <span className="font-mono truncate">ID: {game.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <motion.button
                      onClick={() => handleEdit(game)}
                      className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        if (confirm('🎮 Supprimer ce jeu de l\'arène ?')) {
                          handleDelete(game.id);
                        }
                      }}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Informations champion et record */}
                <div className="space-y-3">
                  {game.champion && (
                    <motion.div
                      className="flex items-center gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
                      animate={{ 
                        boxShadow: [
                          '0 0 5px rgba(234, 179, 8, 0.3)',
                          '0 0 20px rgba(234, 179, 8, 0.5)',
                          '0 0 5px rgba(234, 179, 8, 0.3)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="h-4 w-4 text-yellow-400" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-yellow-300 font-bold tracking-wider">CHAMPION</div>
                        <div className="text-sm text-white font-bold truncate">{game.champion}</div>
                      </div>
                    </motion.div>
                  )}
                  
                  {game.record && (
                    <motion.div
                      className="flex items-center gap-2 p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg"
                      animate={{ 
                        borderColor: [
                          'rgba(168, 85, 247, 0.2)',
                          'rgba(168, 85, 247, 0.4)',
                          'rgba(168, 85, 247, 0.2)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Target className="h-4 w-4 text-purple-400" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-purple-300 font-bold tracking-wider">RECORD À BATTRE</div>
                        <div className="text-sm text-white truncate">{game.record}</div>
                      </div>
                    </motion.div>
                  )}
                  
                  {!game.champion && !game.record && (
                    <div className="text-center py-4 text-gray-400">
                      <Sparkles className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-xs font-bold tracking-wider">EN ATTENTE DE CHAMPIONS</div>
                    </div>
                  )}
                </div>
              </FuturisticCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {games.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center py-12"
        >
          <FuturisticCard className="max-w-md mx-auto">
            <motion.div
              className="text-6xl sm:text-7xl md:text-8xl mb-6"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🎮
            </motion.div>
            
            <div className="relative mb-4">
              <span className="absolute inset-0 text-xl sm:text-2xl font-black bg-gradient-to-r from-red-300 to-yellow-300 bg-clip-text text-transparent blur-sm animate-pulse">
                ARÈNE VIDE
              </span>
              <h3 className="relative text-xl sm:text-2xl font-black bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                ARÈNE VIDE
              </h3>
            </div>
            
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              L'arène gaming attend ses premiers défis...
            </p>
            
            <div className="flex justify-center items-center gap-2 text-xs text-cyan-300 mb-6">
              <Zap className="h-3 w-3" />
              <span className="font-bold tracking-wider">PRÊT POUR L'ACTION</span>
              <Zap className="h-3 w-3" />
            </div>
            
            <FuturisticButton
              onClick={() => setShowAddForm(true)}
              variant="primary"
              icon={Plus}
              className="w-full sm:w-auto"
            >
              CRÉER PREMIER GAME
            </FuturisticButton>
          </FuturisticCard>
        </motion.div>
      )}
    </div>
  );
}