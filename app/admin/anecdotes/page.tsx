'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Calendar, Image, Video, MessageSquare, BookOpen, Sparkles, Camera, Film, Star, Target, Quote } from 'lucide-react';
import { Anecdote } from '@/lib/types';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';

const anecdoteEmojis = ['📚', '😂', '🎭', '🎪', '🎨', '✨', '💫', '🎯', '🔥', '⚡', '🌟', '🎬', '📷', '🎪', '🎨'];

export default function AnecdotesAdmin() {
  const [anecdotes, setAnecdotes] = useState<Anecdote[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAnecdote, setEditingAnecdote] = useState<Anecdote | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [newAnecdote, setNewAnecdote] = useState<Partial<Anecdote>>({
    date: new Date().toLocaleDateString('fr-FR'),
    badge: '',
    content: '',
    photos: [],
    video: undefined
  });

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % anecdoteEmojis.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mounted]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/anecdotes');
      if (response.ok) {
        const data = await response.json();
        setAnecdotes(data.anecdotes || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des anecdotes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const anecdoteToSave = {
      ...newAnecdote,
      id: editingAnecdote?.id || Date.now().toString(),
    };

    try {
      const url = editingAnecdote ? `/api/admin/anecdotes/${editingAnecdote.id}` : '/api/admin/anecdotes';
      const method = editingAnecdote ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdoteToSave),
      });

      if (response.ok) {
        await fetchData();
        setShowAddForm(false);
        setEditingAnecdote(null);
        setNewAnecdote({
          date: new Date().toLocaleDateString('fr-FR'),
          badge: '',
          content: '',
          photos: [],
          video: undefined
        });
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleEdit = (anecdote: Anecdote) => {
    setEditingAnecdote(anecdote);
    setNewAnecdote(anecdote);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette anecdote ?')) return;

    try {
      const response = await fetch(`/api/admin/anecdotes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const addPhoto = () => {
    const photos = newAnecdote.photos || [];
    setNewAnecdote({
      ...newAnecdote,
      photos: [...photos, { url: '', caption: '' }]
    });
  };

  const updatePhoto = (index: number, field: 'url' | 'caption', value: string) => {
    const photos = [...(newAnecdote.photos || [])];
    photos[index] = { ...photos[index], [field]: value };
    setNewAnecdote({ ...newAnecdote, photos });
  };

  const removePhoto = (index: number) => {
    const photos = [...(newAnecdote.photos || [])];
    photos.splice(index, 1);
    setNewAnecdote({ ...newAnecdote, photos });
  };

  const badges = ['Nouvelle', 'Drôle', 'Épique', 'Olivia', 'Vidéo', 'Épiphanie'];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Background Gaming Effects */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl sm:text-3xl opacity-10"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: -50
              }}
              animate={{ 
                y: '120%',
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                delay: i * 2.5,
                ease: "linear"
              }}
            >
              {anecdoteEmojis[i]}
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
        <FuturisticCard glowColor="from-indigo-400/30 to-purple-500/30">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-3 mb-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {mounted && (
                      <div className="absolute -top-1 -right-1 text-lg animate-bounce">
                        {anecdoteEmojis[currentEmoji]}
                      </div>
                    )}
                  </motion.div>
                  
                  <div>
                    <h1 className="relative">
                      <span className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent blur-sm animate-pulse">
                        STORY VAULT
                      </span>
                      <span className="relative text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wider">
                        STORY VAULT
                      </span>
                    </h1>
                  </div>
                </div>
                
                <motion.p 
                  className="text-indigo-300 text-sm sm:text-base font-medium flex items-center justify-center sm:justify-start gap-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target className="h-4 w-4 animate-pulse" />
                  Archivez les moments épiques
                  <span className="text-xs bg-indigo-500/20 px-2 py-1 rounded-full">
                    {anecdotes.length} HISTOIRES
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
                    setEditingAnecdote(null);
                    setNewAnecdote({
                      date: new Date().toLocaleDateString('fr-FR'),
                      badge: '',
                      content: '',
                      photos: [],
                      video: undefined
                    });
                  }}
                  className="w-full sm:w-auto text-sm sm:text-base font-bold uppercase tracking-wider group"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform" />
                  <span className="hidden sm:inline">Nouvelle Anecdote</span>
                  <span className="sm:hidden">Anecdote</span>
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
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-6 w-6 text-purple-400" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
                      {editingAnecdote ? 'MODIFIER STORY' : 'NOUVELLE STORY'}
                    </h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-cyan-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date de l'épisode
                      </label>
                      <input
                        type="date"
                        value={newAnecdote.date ? new Date(newAnecdote.date.split('/').reverse().join('-')).toISOString().split('T')[0] : ''}
                        onChange={(e) => setNewAnecdote({ ...newAnecdote, date: new Date(e.target.value).toLocaleDateString('fr-FR') })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:bg-gray-900/70 transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-purple-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Type d'épisode
                      </label>
                      <select
                        value={newAnecdote.badge}
                        onChange={(e) => setNewAnecdote({ ...newAnecdote, badge: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:bg-gray-900/70 transition-all"
                        required
                      >
                        <option value="">Sélectionner un type</option>
                        {badges.map(badge => (
                          <option key={badge} value={badge}>{badge}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-green-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                      <Quote className="h-4 w-4" />
                      Histoire/Anecdote
                    </label>
                    <textarea
                      value={newAnecdote.content}
                      onChange={(e) => setNewAnecdote({ ...newAnecdote, content: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border-2 border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900/70 transition-all h-32 sm:h-36 resize-none"
                      placeholder="Racontez l'épisode mémorable..."
                      required
                    />
                  </div>

                  {/* Section Médias */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-blue-300" />
                      <label className="text-blue-300 text-sm font-bold uppercase tracking-wider">
                        Galerie Photos
                      </label>
                    </div>
                    
                    {newAnecdote.photos?.map((photo, index) => (
                      <motion.div 
                        key={index} 
                        className="flex flex-col sm:flex-row gap-3 p-3 bg-gray-800/30 rounded-lg border border-blue-500/20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <input
                          type="url"
                          value={photo.url}
                          onChange={(e) => updatePhoto(index, 'url', e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all"
                          placeholder="URL de l'image (/img/...)"
                        />
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => updatePhoto(index, 'caption', e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all"
                          placeholder="Légende de la photo"
                        />
                        <motion.button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <FuturisticButton
                        type="button"
                        variant="secondary"
                        onClick={addPhoto}
                        className="w-full sm:w-auto font-medium"
                      >
                        <Camera className="h-4 w-4" />
                        AJOUTER PHOTO
                      </FuturisticButton>
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Film className="h-5 w-5 text-pink-300" />
                      <label className="text-pink-300 text-sm font-bold uppercase tracking-wider">
                        Vidéo Optionnelle
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="url"
                        value={newAnecdote.video?.url || ''}
                        onChange={(e) => setNewAnecdote({
                          ...newAnecdote,
                          video: e.target.value ? { 
                            url: e.target.value, 
                            caption: newAnecdote.video?.caption || '' 
                          } : undefined
                        })}
                        className="px-4 py-3 bg-gray-900/50 border-2 border-pink-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:bg-gray-900/70 transition-all"
                        placeholder="URL embed YouTube"
                      />
                      <input
                        type="text"
                        value={newAnecdote.video?.caption || ''}
                        onChange={(e) => setNewAnecdote({
                          ...newAnecdote,
                          video: newAnecdote.video?.url ? { 
                            url: newAnecdote.video.url, 
                            caption: e.target.value 
                          } : undefined
                        })}
                        className="px-4 py-3 bg-gray-900/50 border-2 border-pink-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:bg-gray-900/70 transition-all"
                        placeholder="Légende de la vidéo"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <FuturisticButton
                        type="submit"
                        variant="success"
                        className="w-full font-bold uppercase tracking-wider"
                      >
                        <BookOpen className="h-5 w-5" />
                        {editingAnecdote ? 'METTRE À JOUR' : 'ARCHIVER'}
                      </FuturisticButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <FuturisticButton
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingAnecdote(null);
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

      {/* Liste des anecdotes - Style gaming */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 gap-4 sm:gap-6"
      >
        {anecdotes.map((anecdote, index) => {
          const getBadgeStyle = (badge: string) => {
            const styles = {
              'Nouvelle': 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300',
              'Drôle': 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-300',
              'Épique': 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300',
              'Olivia': 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300',
              'Vidéo': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300',
              'Épiphanie': 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-300'
            };
            return styles[badge as keyof typeof styles] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300';
          };

          return (
            <motion.div
              key={anecdote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <FuturisticCard glowColor="from-indigo-400/20 to-purple-500/20" className="h-full group">
                <div className="p-4 sm:p-6 h-full">
                  {/* Header avec date et badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center gap-2 text-cyan-300">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">{anecdote.date}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r border ${getBadgeStyle(anecdote.badge)}`}>
                        {anecdote.badge}
                      </div>
                    </div>

                    <div className="flex gap-1 sm:gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(anecdote)}
                        className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all"
                      >
                        <Edit2 className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(anecdote.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="mb-4">
                    <p className="text-gray-200 leading-relaxed">{anecdote.content}</p>
                  </div>
                  
                  {/* Médias info */}
                  <div className="flex gap-4 text-sm">
                    {anecdote.photos && anecdote.photos.length > 0 && (
                      <motion.div 
                        className="flex items-center gap-1 text-blue-300"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Camera className="h-4 w-4" />
                        <span className="font-medium">{anecdote.photos.length} photo{anecdote.photos.length > 1 ? 's' : ''}</span>
                      </motion.div>
                    )}
                    {anecdote.video && (
                      <motion.div 
                        className="flex items-center gap-1 text-pink-300"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      >
                        <Film className="h-4 w-4" />
                        <span className="font-medium">Vidéo</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Barre de progression décorative */}
                  <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
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
      {anecdotes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 sm:py-16"
        >
          <FuturisticCard glowColor="from-gray-400/20 to-indigo-500/20">
            <div className="p-8 sm:p-12">
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-6xl sm:text-8xl mb-6"
              >
                📚
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase tracking-wider">
                ARCHIVES VIDES
              </h3>
              <p className="text-gray-400 mb-8 text-sm sm:text-base">
                Les premières histoires épiques attendent d'être archivées !
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <FuturisticButton
                  variant="primary"
                  onClick={() => setShowAddForm(true)}
                  className="font-bold uppercase tracking-wider"
                >
                  <Plus className="h-5 w-5" />
                  CRÉER PREMIÈRE STORY
                </FuturisticButton>
              </motion.div>
            </div>
          </FuturisticCard>
        </motion.div>
      )}

    </div>
  );
}