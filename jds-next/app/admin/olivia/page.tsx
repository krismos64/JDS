'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, MessageSquare, Heart, Star } from 'lucide-react';

export default function OliviaQuotesAdmin() {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newQuote, setNewQuote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <MessageSquare className="h-10 w-10 mr-4 text-pink-400" />
            Citations d'Olivia
          </h1>
          <p className="text-white">Gérez les petites phrases cultes d'Olivia</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingIndex(null);
            setNewQuote('');
          }}
          className="flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle citation
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total citations</p>
              <p className="text-3xl font-bold text-white">{quotes.length}</p>
            </div>
            <MessageSquare className="h-12 w-12 text-pink-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Plus longue</p>
              <p className="text-3xl font-bold text-white">
                {Math.max(...quotes.map(q => q.length), 0)}
              </p>
            </div>
            <Star className="h-12 w-12 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Moyenne mots</p>
              <p className="text-3xl font-bold text-white">
                {quotes.length > 0 ? Math.round(quotes.reduce((acc, q) => acc + q.split(' ').length, 0) / quotes.length) : 0}
              </p>
            </div>
            <Heart className="h-12 w-12 text-red-400" />
          </div>
        </div>
      </div>

      {/* Recherche */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Rechercher dans les citations..."
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-300">
          {filteredQuotes.length} citation{filteredQuotes.length > 1 ? 's' : ''} 
          {searchTerm && ` trouvée${filteredQuotes.length > 1 ? 's' : ''} pour "${searchTerm}"`}
        </div>
      </div>

      {/* Formulaire d'ajout/édition */}
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            {editingIndex !== null ? 'Modifier la citation' : 'Ajouter une citation'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Citation</label>
              <textarea
                value={newQuote}
                onChange={(e) => setNewQuote(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 h-24"
                placeholder="Qu'est-ce qu'Olivia a dit de mignon ?"
                required
              />
              <div className="text-right text-sm text-gray-300 mt-1">
                {newQuote.length} caractères
              </div>
            </div>

            {/* Suggestions rapides */}
            {editingIndex === null && (
              <div>
                <label className="block text-white mb-2">Suggestions populaires</label>
                <div className="flex flex-wrap gap-2">
                  {popularQuotes.filter(q => !quotes.includes(q)).map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setNewQuote(suggestion)}
                      className="px-3 py-1 bg-pink-600/20 hover:bg-pink-600/30 text-pink-200 rounded-lg text-sm transition-colors"
                    >
                      "{suggestion}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                {editingIndex !== null ? 'Mettre à jour' : 'Enregistrer'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingIndex(null);
                  setNewQuote('');
                }}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des citations */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Toutes les citations ({filteredQuotes.length})
        </h2>
        
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">
              {searchTerm ? 'Aucune citation trouvée' : 'Aucune citation enregistrée'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
              >
                Ajouter la première citation
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuotes.map((quote, index) => {
              const originalIndex = quotes.indexOf(quote);
              return (
                <div
                  key={originalIndex}
                  className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg p-4 hover:from-pink-500/15 hover:to-purple-500/15 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-pink-200 text-sm">#{originalIndex + 1}</div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(originalIndex)}
                        className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded transition-colors"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(originalIndex)}
                        className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-white italic leading-relaxed">
                    "{quote}"
                  </p>
                  
                  <div className="text-xs text-gray-300 mt-3 flex justify-between">
                    <span>{quote.length} caractères</span>
                    <span>{quote.split(' ').length} mots</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}