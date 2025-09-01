'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, MessageSquare, Heart, Star, Quote, Sparkles, Search, BarChart, Mic, Crown, Target, Zap } from 'lucide-react';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';

const oliviaEmojis = ['💬', '😂', '👶', '💕', '⭐', '🎭', '👑', '✨', '💫', '🌟', '🎪', '🎨', '😊', '💖', '🎯'];

export default function OliviaQuotesAdmin() {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newQuote, setNewQuote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % oliviaEmojis.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [mounted]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/olivia-quotes');
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des citations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newQuote.trim()) return;

    try {
      const url = editingIndex !== null ? `/api/admin/olivia-quotes/${editingIndex}` : '/api/admin/olivia-quotes';
      const method = editingIndex !== null ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote: newQuote.trim() }),
      });

      if (response.ok) {
        await fetchData();
        setShowAddForm(false);
        setEditingIndex(null);
        setNewQuote('');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewQuote(quotes[index]);
    setShowAddForm(true);
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette citation ?')) return;

    try {
      const response = await fetch(`/api/admin/olivia-quotes/${index}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const filteredQuotes = quotes.filter(quote => 
    quote.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularQuotes = [
    "C'est à mon tour !",
    "Je veux être la première !",
    "On peut jouer encore une fois ?",
    "Pourquoi tu as gagné ?",
    "C'est pas juste !",
    "Je sais jouer !",
    "C'est moi qui distribue !",
    "Encore !",
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Background Gaming Effects */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl sm:text-3xl opacity-10"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: -50
              }}
              animate={{ 
                y: '120%',
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 18 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear"
              }}
            >
              {oliviaEmojis[i]}
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
        <FuturisticCard glowColor="from-pink-400/30 to-rose-500/30">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-3 mb-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/50">
                      <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {mounted && (
                      <div className="absolute -top-1 -right-1 text-lg animate-bounce">
                        {oliviaEmojis[currentEmoji]}
                      </div>
                    )}
                  </motion.div>
                  
                  <div>
                    <h1 className="relative">
                      <span className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent blur-sm animate-pulse">
                        OLIVIA QUOTES
                      </span>
                      <span className="relative text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
                        OLIVIA QUOTES
                      </span>
                    </h1>
                  </div>
                </div>
                
                <motion.p 
                  className="text-pink-300 text-sm sm:text-base font-medium flex items-center justify-center sm:justify-start gap-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target className="h-4 w-4 animate-pulse" />
                  Archive des perles d'Olivia
                  <span className="text-xs bg-pink-500/20 px-2 py-1 rounded-full">
                    {quotes.length} QUOTES
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
                    setEditingIndex(null);
                    setNewQuote('');
                  }}
                  className="w-full sm:w-auto text-sm sm:text-base font-bold uppercase tracking-wider group"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform" />
                  <span className="hidden sm:inline">Nouvelle Quote</span>
                  <span className="sm:hidden">Quote</span>
                </FuturisticButton>
              </motion.div>
            </div>
          </div>
        </FuturisticCard>
      </motion.div>

      {/* Statistiques Gaming */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
      >
        <motion.div whileHover={{ scale: 1.02 }} className="h-full">
          <FuturisticCard glowColor="from-pink-400/20 to-purple-500/20">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-300 text-sm font-bold uppercase tracking-wider">Total Quotes</p>
                  <p className="text-2xl sm:text-3xl font-black text-white">{quotes.length}</p>
                  <p className="text-xs text-pink-400 mt-1">Phrases cultes</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 text-pink-400" />
                </motion.div>
              </div>
            </div>
          </FuturisticCard>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} className="h-full">
          <FuturisticCard glowColor="from-yellow-400/20 to-orange-500/20">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-bold uppercase tracking-wider">Record</p>
                  <p className="text-2xl sm:text-3xl font-black text-white">
                    {Math.max(...quotes.map(q => q.length), 0)}
                  </p>
                  <p className="text-xs text-yellow-400 mt-1">Caractères max</p>
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Star className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400" />
                </motion.div>
              </div>
            </div>
          </FuturisticCard>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} className="h-full">
          <FuturisticCard glowColor="from-red-400/20 to-pink-500/20">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-300 text-sm font-bold uppercase tracking-wider">Moyenne</p>
                  <p className="text-2xl sm:text-3xl font-black text-white">
                    {quotes.length > 0 ? Math.round(quotes.reduce((acc, q) => acc + q.split(' ').length, 0) / quotes.length) : 0}
                  </p>
                  <p className="text-xs text-red-400 mt-1">Mots/citation</p>
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-red-400" />
                </motion.div>
              </div>
            </div>
          </FuturisticCard>
        </motion.div>
      </motion.div>

      {/* Recherche Gaming */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <FuturisticCard glowColor="from-cyan-400/20 to-purple-500/20">
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-cyan-300 uppercase tracking-wider">Scanner Archives</h3>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-gray-900/70 transition-all"
                  placeholder="Scanner les citations d'Olivia..."
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-300 font-medium">
                {filteredQuotes.length} citation{filteredQuotes.length > 1 ? 's' : ''} détectée{filteredQuotes.length > 1 ? 's' : ''}
              </span>
              {searchTerm && (
                <span className="text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full text-xs">
                  Filtre: "{searchTerm}"
                </span>
              )}
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
            <FuturisticCard glowColor="from-purple-400/30 to-pink-500/30">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-6 w-6 text-purple-400" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wider">
                      {editingIndex !== null ? 'MODIFIER QUOTE' : 'NOUVELLE QUOTE'}
                    </h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <label className="block text-pink-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      Citation d'Olivia
                    </label>
                    <textarea
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border-2 border-pink-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:bg-gray-900/70 transition-all h-24 sm:h-28 resize-none"
                      placeholder="Qu'est-ce qu'Olivia a dit de mignon ?"
                      required
                    />
                    <div className="flex justify-between text-xs">
                      <span className="text-pink-400 font-medium">
                        {newQuote.length} caractères
                      </span>
                      <span className="text-purple-400 font-medium">
                        {newQuote.split(' ').filter(w => w.length > 0).length} mots
                      </span>
                    </div>
                  </div>

                  {/* Suggestions Gaming */}
                  {editingIndex === null && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-yellow-300" />
                        <label className="text-yellow-300 text-sm font-bold uppercase tracking-wider">
                          Phrases Classiques
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {popularQuotes.filter(q => !quotes.includes(q)).slice(0, 8).map((suggestion, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            onClick={() => setNewQuote(suggestion)}
                            className="px-3 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 hover:from-pink-500/30 hover:to-purple-500/30 text-pink-200 rounded-lg text-sm transition-all group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Quote className="h-3 w-3 inline mr-1 group-hover:text-pink-300" />
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <FuturisticButton
                        type="submit"
                        variant="success"
                        className="w-full font-bold uppercase tracking-wider"
                      >
                        <Quote className="h-5 w-5" />
                        {editingIndex !== null ? 'METTRE À JOUR' : 'ARCHIVER'}
                      </FuturisticButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <FuturisticButton
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingIndex(null);
                          setNewQuote('');
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

      {/* Archives Gaming */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <FuturisticCard glowColor="from-purple-400/20 to-pink-500/20">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart className="h-6 w-6 text-purple-400" />
                <h2 className="text-xl sm:text-2xl font-black text-purple-300 uppercase tracking-wider">
                  Archives ({filteredQuotes.length})
                </h2>
              </div>
              {searchTerm && (
                <motion.button
                  onClick={() => setSearchTerm('')}
                  className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Effacer filtre
                </motion.button>
              )}
            </div>
            
            {filteredQuotes.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-6xl sm:text-8xl mb-6"
                >
                  💬
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase tracking-wider">
                  {searchTerm ? 'AUCUNE QUOTE TROUVÉE' : 'ARCHIVES VIDES'}
                </h3>
                <p className="text-gray-400 mb-8 text-sm sm:text-base">
                  {searchTerm ? 
                    'Affinez votre recherche ou supprimez le filtre' : 
                    'Les premières perles d\'Olivia attendent d\'être archivées !'
                  }
                </p>
                {!searchTerm && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FuturisticButton
                      variant="primary"
                      onClick={() => setShowAddForm(true)}
                      className="font-bold uppercase tracking-wider"
                    >
                      <Plus className="h-5 w-5" />
                      PREMIÈRE QUOTE
                    </FuturisticButton>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuotes.map((quote, index) => {
                  const originalIndex = quotes.indexOf(quote);
                  return (
                    <motion.div
                      key={originalIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg p-4 hover:from-pink-500/20 hover:to-purple-500/20 hover:border-pink-400/40 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">#{originalIndex + 1}</span>
                          </div>
                          <span className="text-pink-300 text-xs font-medium">QUOTE</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            onClick={() => handleEdit(originalIndex)}
                            className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit2 className="h-3 w-3" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(originalIndex)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <Quote className="h-4 w-4 text-pink-400 mb-2" />
                        <p className="text-pink-100 italic leading-relaxed text-sm sm:text-base">
                          {quote}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-pink-500/20">
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-pink-400 font-medium">
                            {quote.length}c
                          </span>
                          <span className="text-purple-400 font-medium">
                            {quote.split(' ').length}m
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-pink-400 font-medium">- OLIVIA</span>
                        </div>
                      </div>
                      
                      {/* Barre de progression décorative */}
                      <div className="mt-2 h-0.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((quote.length / 100) * 100, 100)}%` }}
                          transition={{ delay: index * 0.05 + 0.5, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </FuturisticCard>
      </motion.div>
    </div>
  );
}