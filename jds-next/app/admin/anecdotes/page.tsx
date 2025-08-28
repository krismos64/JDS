'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Calendar, Image, Video, MessageSquare } from 'lucide-react';
import { Anecdote } from '@/lib/types';

export default function AnecdotesAdmin() {
  const [anecdotes, setAnecdotes] = useState<Anecdote[]>([]);
  const [oliviaQuotes, setOliviaQuotes] = useState<string[]>([]);
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
        setOliviaQuotes(data.oliviaQuotes || []);
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Gestion des anecdotes</h1>
          <p className="text-gray-300">Gérez les anecdotes et moments marquants</p>
        </div>
        <button
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
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle anecdote
        </button>
      </div>

      {/* Formulaire d'ajout/édition */}
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            {editingAnecdote ? 'Modifier l\'anecdote' : 'Ajouter une anecdote'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Date</label>
                <input
                  type="text"
                  value={newAnecdote.date}
                  onChange={(e) => setNewAnecdote({ ...newAnecdote, date: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="JJ mois AAAA"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Badge</label>
                <select
                  value={newAnecdote.badge}
                  onChange={(e) => setNewAnecdote({ ...newAnecdote, badge: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Sélectionner un badge</option>
                  {badges.map(badge => (
                    <option key={badge} value={badge}>{badge}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Contenu</label>
              <textarea
                value={newAnecdote.content}
                onChange={(e) => setNewAnecdote({ ...newAnecdote, content: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                placeholder="Racontez l'anecdote..."
                required
              />
            </div>

            {/* Photos */}
            <div>
              <label className="block text-gray-300 mb-2">Photos</label>
              {newAnecdote.photos?.map((photo, index) => (
                <div key={index} className="flex gap-3 mb-3 p-3 bg-white/5 rounded-lg">
                  <input
                    type="url"
                    value={photo.url}
                    onChange={(e) => updatePhoto(index, 'url', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="URL de l'image (/img/...)"
                  />
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => updatePhoto(index, 'caption', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Légende"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPhoto}
                className="flex items-center px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors"
              >
                <Image className="h-4 w-4 mr-2" />
                Ajouter une photo
              </button>
            </div>

            {/* Vidéo */}
            <div>
              <label className="block text-gray-300 mb-2">Vidéo YouTube (optionnel)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  className="px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Légende de la vidéo"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                {editingAnecdote ? 'Mettre à jour' : 'Enregistrer'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingAnecdote(null);
                }}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des anecdotes */}
      <div className="space-y-4">
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  {anecdote.date}
                </div>
                <span className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm">
                  {anecdote.badge}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(anecdote)}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(anecdote.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-300 mb-3">{anecdote.content}</p>
            
            <div className="flex gap-4 text-sm text-gray-400">
              {anecdote.photos && anecdote.photos.length > 0 && (
                <div className="flex items-center">
                  <Image className="h-4 w-4 mr-1" />
                  {anecdote.photos.length} photo{anecdote.photos.length > 1 ? 's' : ''}
                </div>
              )}
              {anecdote.video && (
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-1" />
                  Vidéo
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Citations d'Olivia */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <MessageSquare className="h-6 w-6 mr-3" />
          Citations d'Olivia ({oliviaQuotes.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {oliviaQuotes.map((quote, index) => (
            <div key={index} className="p-3 bg-white/5 rounded-lg">
              <p className="text-gray-300 italic">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}