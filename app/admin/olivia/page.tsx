'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, MessageSquare, Heart, Star, Quote, Search } from 'lucide-react';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

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
    <div className="space-y-6">
      <AdminPageHeader
        title="Citations Olivia"
        subtitle="Phrases cultes"
        icon={Quote}
        iconGradient="from-pink-500 to-rose-600"
        count={quotes.length}
        countLabel={quotes.length > 1 ? 'citations' : 'citation'}
        action={
          <FuturisticButton
            variant="primary"
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingIndex(null);
              setNewQuote('');
            }}
            icon={Plus}
            className="w-full sm:w-auto"
          >
            Nouvelle citation
          </FuturisticButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FuturisticCard className="p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-300 text-xs uppercase tracking-wider">Total</p>
            <p className="text-2xl font-bold text-white">{quotes.length}</p>
          </div>
          <MessageSquare className="h-8 w-8 text-pink-400/70" />
        </FuturisticCard>

        <FuturisticCard className="p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-300 text-xs uppercase tracking-wider">Plus longue</p>
            <p className="text-2xl font-bold text-white">
              {Math.max(...quotes.map(q => q.length), 0)}
              <span className="text-sm text-slate-300 ml-1">car.</span>
            </p>
          </div>
          <Star className="h-8 w-8 text-yellow-400/70" />
        </FuturisticCard>

        <FuturisticCard className="p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-300 text-xs uppercase tracking-wider">Moyenne</p>
            <p className="text-2xl font-bold text-white">
              {quotes.length > 0 ? Math.round(quotes.reduce((acc, q) => acc + q.split(' ').length, 0) / quotes.length) : 0}
              <span className="text-sm text-slate-300 ml-1">mots</span>
            </p>
          </div>
          <Heart className="h-8 w-8 text-red-400/70" />
        </FuturisticCard>
      </div>

      <FuturisticCard className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
            placeholder="Rechercher une citation..."
          />
        </div>
        {searchTerm && (
          <p className="mt-2 text-xs text-slate-300">
            {filteredQuotes.length} résultat{filteredQuotes.length > 1 ? 's' : ''}
          </p>
        )}
      </FuturisticCard>

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
                  {editingIndex !== null ? 'Modifier la citation' : 'Nouvelle citation'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-slate-300 text-sm font-medium">
                      Citation d&apos;Olivia
                    </label>
                    <textarea
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors h-24 resize-none"
                      placeholder="Qu'a-t-elle dit ?"
                      required
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{newQuote.length} caractères</span>
                      <span>{newQuote.split(' ').filter(w => w.length > 0).length} mots</span>
                    </div>
                  </div>

                  {editingIndex === null && (
                    <div className="space-y-2">
                      <label className="text-slate-300 text-xs font-medium uppercase tracking-wider">
                        Suggestions
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {popularQuotes.filter(q => !quotes.includes(q)).slice(0, 8).map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setNewQuote(suggestion)}
                            className="px-3 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700 text-slate-300 rounded-lg text-sm transition-colors text-left"
                          >
                            <Quote className="h-3 w-3 inline mr-1.5 text-pink-400" />
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <FuturisticButton
                      type="submit"
                      variant="success"
                      icon={Quote}
                      className="flex-1"
                    >
                      {editingIndex !== null ? 'Mettre à jour' : 'Enregistrer'}
                    </FuturisticButton>
                    <FuturisticButton
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingIndex(null);
                        setNewQuote('');
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

      <FuturisticCard>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">
              Citations ({filteredQuotes.length})
            </h2>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-3 py-1 bg-slate-700/60 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition-colors"
              >
                Effacer
              </button>
            )}
          </div>

          {filteredQuotes.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm ? 'Aucun résultat' : 'Aucune citation'}
              </h3>
              <p className="text-slate-300 mb-6 text-sm">
                {searchTerm
                  ? 'Affine ta recherche ou efface le filtre.'
                  : 'Archive la première perle d’Olivia.'}
              </p>
              {!searchTerm && (
                <FuturisticButton
                  variant="primary"
                  onClick={() => setShowAddForm(true)}
                  icon={Plus}
                >
                  Ajouter une citation
                </FuturisticButton>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredQuotes.map((quote, index) => {
                const originalIndex = quotes.indexOf(quote);
                return (
                  <motion.div
                    key={originalIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.25 }}
                    className="bg-pink-500/5 border border-pink-500/20 rounded-lg p-4 hover:bg-pink-500/10 hover:border-pink-500/40 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs text-pink-400 font-medium">#{originalIndex + 1}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(originalIndex)}
                          className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded transition-colors"
                          aria-label="Modifier"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(originalIndex)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-2">
                      <Quote className="h-4 w-4 text-pink-400 shrink-0 mt-1" />
                      <p className="text-slate-100 italic leading-relaxed text-sm">
                        {quote}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-pink-500/20 text-xs text-slate-400">
                      <div className="flex gap-3">
                        <span>{quote.length} car.</span>
                        <span>{quote.split(' ').length} mots</span>
                      </div>
                      <span className="text-pink-400">— Olivia</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </FuturisticCard>
    </div>
  );
}