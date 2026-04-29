'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Image, Video, BookOpen } from 'lucide-react';
import { Anecdote } from '@/lib/types';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function AnecdotesAdmin() {
  const [anecdotes, setAnecdotes] = useState<Anecdote[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAnecdote, setEditingAnecdote] = useState<Anecdote | null>(null);
  const [newAnecdote, setNewAnecdote] = useState<Partial<Anecdote>>({
    date: new Date().toLocaleDateString('fr-FR'),
    badge: '',
    content: '',
    photos: [],
    video: undefined
  });

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="space-y-6">
      <AdminPageHeader
        title="Anecdotes"
        subtitle="Moments mémorables"
        icon={BookOpen}
        iconGradient="from-indigo-500 to-purple-600"
        count={anecdotes.length}
        countLabel={anecdotes.length > 1 ? 'anecdotes' : 'anecdote'}
        action={
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
                video: undefined,
              });
            }}
            icon={Plus}
            className="w-full sm:w-auto"
          >
            Nouvelle anecdote
          </FuturisticButton>
        }
      />

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
                <h2 className="text-lg font-semibold text-white mb-5">
                  {editingAnecdote ? 'Modifier l&apos;anecdote' : 'Nouvelle anecdote'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-slate-300 text-sm font-medium">
                        Date
                      </label>
                      <input
                        type="date"
                        value={newAnecdote.date ? new Date(newAnecdote.date.split('/').reverse().join('-')).toISOString().split('T')[0] : ''}
                        onChange={(e) => setNewAnecdote({ ...newAnecdote, date: new Date(e.target.value).toLocaleDateString('fr-FR') })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-slate-300 text-sm font-medium">
                        Type
                      </label>
                      <select
                        value={newAnecdote.badge}
                        onChange={(e) => setNewAnecdote({ ...newAnecdote, badge: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 transition-colors"
                        required
                      >
                        <option value="">Sélectionner un type</option>
                        {badges.map(badge => (
                          <option key={badge} value={badge}>{badge}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-300 text-sm font-medium">
                      Anecdote
                    </label>
                    <textarea
                      value={newAnecdote.content}
                      onChange={(e) => setNewAnecdote({ ...newAnecdote, content: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 transition-colors h-32 resize-none"
                      placeholder="Raconte le moment mémorable..."
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Image className="h-4 w-4 text-slate-300" />
                      <label className="text-slate-300 text-sm font-medium">
                        Photos
                      </label>
                    </div>

                    {newAnecdote.photos?.map((photo, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-2 p-3 bg-slate-900/40 rounded-lg border border-slate-700/60"
                      >
                        <input
                          type="url"
                          value={photo.url}
                          onChange={(e) => updatePhoto(index, 'url', e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-colors text-sm"
                          placeholder="URL de l'image"
                        />
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => updatePhoto(index, 'caption', e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-colors text-sm"
                          placeholder="Légende"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          aria-label="Supprimer la photo"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    <FuturisticButton
                      type="button"
                      variant="secondary"
                      onClick={addPhoto}
                      icon={Image}
                      className="w-full sm:w-auto"
                    >
                      Ajouter une photo
                    </FuturisticButton>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-slate-300" />
                      <label className="text-slate-300 text-sm font-medium">
                        Vidéo (optionnelle)
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors text-sm"
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
                        className="px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors text-sm"
                        placeholder="Légende"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <FuturisticButton
                      type="submit"
                      variant="success"
                      icon={BookOpen}
                      className="flex-1"
                    >
                      {editingAnecdote ? 'Mettre à jour' : 'Enregistrer'}
                    </FuturisticButton>
                    <FuturisticButton
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingAnecdote(null);
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

      <div className="grid grid-cols-1 gap-4">
        {anecdotes.map((anecdote, index) => {
          const getBadgeStyle = (badge: string) => {
            const styles = {
              'Nouvelle': 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
              'Drôle': 'bg-yellow-500/15 border-yellow-500/30 text-yellow-300',
              'Épique': 'bg-purple-500/15 border-purple-500/30 text-purple-300',
              'Olivia': 'bg-pink-500/15 border-pink-500/30 text-pink-300',
              'Vidéo': 'bg-blue-500/15 border-blue-500/30 text-blue-300',
              'Épiphanie': 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
            };
            return styles[badge as keyof typeof styles] || 'bg-slate-500/15 border-slate-500/30 text-slate-300';
          };

          return (
            <motion.div
              key={anecdote.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
            >
              <FuturisticCard className="h-full hover:border-slate-600 transition-colors">
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-medium text-slate-300">{anecdote.date}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(anecdote.badge)}`}>
                        {anecdote.badge}
                      </span>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleEdit(anecdote)}
                        className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        aria-label="Modifier"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(anecdote.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-200 leading-relaxed mb-3">{anecdote.content}</p>

                  <div className="flex gap-4 text-sm text-slate-300">
                    {anecdote.photos && anecdote.photos.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Image className="h-4 w-4" />
                        <span>{anecdote.photos.length} photo{anecdote.photos.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {anecdote.video && (
                      <div className="flex items-center gap-1.5">
                        <Video className="h-4 w-4" />
                        <span>Vidéo</span>
                      </div>
                    )}
                  </div>
                </div>
              </FuturisticCard>
            </motion.div>
          );
        })}
      </div>

      {anecdotes.length === 0 && (
        <FuturisticCard className="text-center py-12 max-w-md mx-auto">
          <div className="p-8">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucune anecdote
            </h3>
            <p className="text-slate-300 mb-6 text-sm">
              Archive le premier moment mémorable.
            </p>
            <FuturisticButton
              variant="primary"
              onClick={() => setShowAddForm(true)}
              icon={Plus}
            >
              Ajouter une anecdote
            </FuturisticButton>
          </div>
        </FuturisticCard>
      )}

    </div>
  );
}