'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Save, Sparkles, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';
import { NextGame } from '@/lib/types';

export default function NextGameAdmin() {
  const [data, setData] = useState<NextGame>({
    date: '',
    displayDate: '',
    highlight: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/next-game');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/next-game', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFeedback({ type: 'success', message: 'Prochaine partie mise à jour !' });
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', message: err.error || 'Erreur lors de la sauvegarde' });
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'Erreur réseau' });
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const computeDaysLeft = (): number | null => {
    if (!data.date) return null;
    const target = new Date(data.date);
    if (isNaN(target.getTime())) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysLeft = computeDaysLeft();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="h-12 w-12 text-cyan-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FuturisticCard glowColor="from-cyan-400/30 to-blue-500/30">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50"
                >
                  <Calendar className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h1 className="relative">
                    <span className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent blur-sm animate-pulse">
                      NEXT GAME
                    </span>
                    <span className="relative text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">
                      NEXT GAME
                    </span>
                  </h1>
                  <p className="text-cyan-300 text-sm font-medium">Prochaine soirée JDS</p>
                </div>
              </div>

              {daysLeft !== null && data.isActive && (
                <div className="text-center sm:text-right">
                  <div className="text-xs uppercase text-cyan-300 font-bold tracking-wider">
                    {daysLeft > 0 ? 'Dans' : daysLeft === 0 ? 'Aujourd\'hui !' : 'Passée depuis'}
                  </div>
                  {daysLeft !== 0 && (
                    <div className="text-3xl sm:text-4xl font-black text-white">
                      {Math.abs(daysLeft)} <span className="text-base text-cyan-300">jour{Math.abs(daysLeft) > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </FuturisticCard>
      </motion.div>

      {/* Feedback */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
            feedback.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span className="font-medium">{feedback.message}</span>
        </motion.div>
      )}

      {/* Formulaire */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FuturisticCard glowColor="from-purple-400/30 to-pink-500/30">
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date ISO */}
              <div className="space-y-2">
                <label className="block text-cyan-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date de la prochaine partie
                </label>
                <input
                  type="date"
                  value={data.date}
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:bg-gray-900/70 transition-all"
                  required
                />
                <p className="text-xs text-gray-400">
                  Utilisée pour calculer le compte à rebours (jours restants)
                </p>
              </div>

              {/* Affichage texte */}
              <div className="space-y-2">
                <label className="block text-purple-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Texte affiché en gros
                </label>
                <input
                  type="text"
                  value={data.displayDate}
                  onChange={(e) => setData({ ...data, displayDate: e.target.value })}
                  placeholder="ex: MAI 2026"
                  className="w-full px-4 py-3 bg-gray-900/50 border-2 border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-gray-900/70 transition-all uppercase font-bold tracking-wider"
                  required
                />
                <p className="text-xs text-gray-400">
                  Affiché en énorme sur le site (ex: "MAI 2026", "FÉV 2025")
                </p>
              </div>

              {/* Highlight */}
              <div className="space-y-2">
                <label className="block text-pink-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Phrase d'accroche
                </label>
                <input
                  type="text"
                  value={data.highlight}
                  onChange={(e) => setData({ ...data, highlight: e.target.value })}
                  placeholder="ex: OLIVIA SERA PRÉSENTE!"
                  className="w-full px-4 py-3 bg-gray-900/50 border-2 border-pink-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:bg-gray-900/70 transition-all"
                  maxLength={80}
                />
                <p className="text-xs text-gray-400">
                  Texte en dessous de la date ({data.highlight.length}/80) — laisser vide pour masquer
                </p>
              </div>

              {/* Toggle actif */}
              <div className="space-y-2">
                <label className="block text-yellow-300 text-sm font-bold uppercase tracking-wider">
                  Visibilité
                </label>
                <button
                  type="button"
                  onClick={() => setData({ ...data, isActive: !data.isActive })}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 w-full transition-all ${
                    data.isActive
                      ? 'bg-green-500/10 border-green-500/30 text-green-300'
                      : 'bg-gray-500/10 border-gray-500/30 text-gray-400'
                  }`}
                >
                  {data.isActive ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  <span className="font-bold uppercase tracking-wider text-sm">
                    {data.isActive ? 'Section visible sur le site' : 'Section masquée'}
                  </span>
                </button>
              </div>

              {/* Bouton */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <FuturisticButton
                  type="submit"
                  variant="success"
                  disabled={saving}
                  className="w-full font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Save className="h-5 w-5" />
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </FuturisticButton>
              </motion.div>
            </form>
          </div>
        </FuturisticCard>
      </motion.div>

      {/* Aperçu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <FuturisticCard glowColor="from-emerald-400/30 to-teal-500/30">
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-emerald-400" />
              <h3 className="text-emerald-300 font-bold uppercase tracking-wider text-sm">Aperçu sur le site</h3>
            </div>

            {data.isActive ? (
              <div className="text-center py-8 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 rounded-lg border border-cyan-500/20">
                <div className="text-5xl sm:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  {data.displayDate || '—'}
                </div>
                {daysLeft !== null && daysLeft > 0 && (
                  <div className="text-cyan-300 text-sm font-mono mb-4">
                    Dans {daysLeft} jour{daysLeft > 1 ? 's' : ''}
                  </div>
                )}
                {data.highlight && (
                  <div className="text-xl text-pink-300 font-bold">
                    👶 {data.highlight}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 italic">
                Section masquée — n'apparaîtra pas sur le site public
              </div>
            )}
          </div>
        </FuturisticCard>
      </motion.div>
    </div>
  );
}
