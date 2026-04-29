'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Save, Sparkles, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
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
    <div className="space-y-6">
      <AdminPageHeader
        title="Next Game"
        subtitle="Prochaine soirée JDS"
        icon={Calendar}
        iconGradient="from-cyan-500 to-blue-600"
        action={
          daysLeft !== null && data.isActive ? (
            <div className="text-center sm:text-right">
              <div className="text-xs uppercase text-slate-300 font-medium tracking-wider">
                {daysLeft > 0 ? 'Dans' : daysLeft === 0 ? "Aujourd'hui !" : 'Passée depuis'}
              </div>
              {daysLeft !== 0 && (
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {Math.abs(daysLeft)}{' '}
                  <span className="text-sm text-slate-300">jour{Math.abs(daysLeft) > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          ) : undefined
        }
      />

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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <FuturisticCard>
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-slate-300 text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  Date de la prochaine partie
                </label>
                <input
                  type="date"
                  value={data.date}
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
                  required
                />
                <p className="text-xs text-slate-400">
                  Utilisée pour calculer le compte à rebours
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  Texte affiché en gros
                </label>
                <input
                  type="text"
                  value={data.displayDate}
                  onChange={(e) => setData({ ...data, displayDate: e.target.value })}
                  placeholder="ex: MAI 2026"
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 transition-colors uppercase font-semibold tracking-wider"
                  required
                />
                <p className="text-xs text-slate-300">
                  Affiché en énorme sur le site (ex: "MAI 2026", "FÉV 2025")
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-pink-400" />
                  Phrase d&apos;accroche
                </label>
                <input
                  type="text"
                  value={data.highlight}
                  onChange={(e) => setData({ ...data, highlight: e.target.value })}
                  placeholder="ex: OLIVIA SERA PRÉSENTE !"
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors"
                  maxLength={80}
                />
                <p className="text-xs text-slate-400">
                  ({data.highlight.length}/80) — laisser vide pour masquer
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 text-sm font-medium">
                  Visibilité
                </label>
                <button
                  type="button"
                  onClick={() => setData({ ...data, isActive: !data.isActive })}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border w-full transition-colors ${
                    data.isActive
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-700/30 border-slate-700 text-slate-300'
                  }`}
                >
                  {data.isActive ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  <span className="font-medium text-sm">
                    {data.isActive ? 'Section visible sur le site' : 'Section masquée'}
                  </span>
                </button>
              </div>

              <FuturisticButton
                type="submit"
                variant="success"
                disabled={saving}
                icon={Save}
                className="w-full"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </FuturisticButton>
            </form>
          </div>
        </FuturisticCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <FuturisticCard>
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-4 w-4 text-emerald-400" />
              <h3 className="text-slate-300 font-medium text-sm">Aperçu sur le site</h3>
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
              <div className="text-center py-8 text-slate-400 italic text-sm">
                Section masquée — n&apos;apparaîtra pas sur le site public
              </div>
            )}
          </div>
        </FuturisticCard>
      </motion.div>
    </div>
  );
}
