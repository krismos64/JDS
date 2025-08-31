'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, User, Award, Image, Users, Crown, Star, Zap, Target, Sparkles } from 'lucide-react';
import { Member } from '@/lib/types';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';

const gameEmojis = ['👥', '🎮', '🏆', '⚡', '🎯', '👾', '🎲', '🃏'];

export default function MembersAdmin() {
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [newMember, setNewMember] = useState<Partial<Member>>({
    id: '',
    name: '',
    nickname: '',
    role: '',
    badge: '',
    photo: '',
    description: '',
    stats: {
      favoriteGame: '',
      specialMove: ''
    }
  });

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % gameEmojis.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mounted]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/members');
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des membres:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const memberToSave = {
      ...newMember,
      id: editingMember?.id || newMember.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || '',
      stats: newMember.stats || { favoriteGame: '', specialMove: '' }
    };

    try {
      const url = editingMember ? `/api/admin/members/${editingMember.id}` : '/api/admin/members';
      const method = editingMember ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberToSave),
      });

      if (response.ok) {
        await fetchData();
        setShowAddForm(false);
        setEditingMember(null);
        setNewMember({
          id: '',
          name: '',
          nickname: '',
          role: '',
          badge: '',
          photo: '',
          description: '',
          stats: {
            favoriteGame: '',
            specialMove: ''
          }
        });
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setNewMember(member);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return;

    try {
      const response = await fetch(`/api/admin/members/${id}`, {
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
    <div className="space-y-6 sm:space-y-8">
      {/* Header mobile first avec animations gaming */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Particules flottantes */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl sm:text-3xl opacity-20"
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: -50
                }}
                animate={{ 
                  y: '120%',
                  rotate: 360
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "linear"
                }}
              >
                {gameEmojis[i]}
              </motion.div>
            ))}
          </div>
        )}

        <FuturisticCard glowColor="from-purple-400/30 to-pink-500/30">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Titre avec logo gaming */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-3 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {mounted && (
                      <div className="absolute -top-1 -right-1 text-lg animate-bounce">
                        {gameEmojis[currentEmoji]}
                      </div>
                    )}
                  </motion.div>
                  
                  <div>
                    <h1 className="relative">
                      <span className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent blur-sm animate-pulse">
                        GESTION MEMBRES
                      </span>
                      <span className="relative text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-wider">
                        GESTION MEMBRES
                      </span>
                    </h1>
                  </div>
                </div>
                
                <motion.p 
                  className="text-purple-300 text-sm sm:text-base font-medium flex items-center justify-center sm:justify-start gap-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target className="h-4 w-4 animate-pulse" />
                  Gérez l'équipe JDS
                  <span className="text-xs bg-purple-500/20 px-2 py-1 rounded-full">
                    {members.length} PLAYERS
                  </span>
                </motion.p>
              </div>

              {/* Bouton d'ajout gaming */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FuturisticButton
                  variant="primary"
                  onClick={() => {
                    setShowAddForm(!showAddForm);
                    setEditingMember(null);
                    setNewMember({
                      id: '',
                      name: '',
                      nickname: '',
                      role: '',
                      badge: '',
                      photo: '',
                      description: '',
                      stats: {
                        favoriteGame: '',
                        specialMove: ''
                      }
                    });
                  }}
                  className="w-full sm:w-auto text-sm sm:text-base font-bold uppercase tracking-wider group"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform" />
                  <span className="hidden sm:inline">Nouveau Membre</span>
                  <span className="sm:hidden">Nouveau</span>
                </FuturisticButton>
              </motion.div>
            </div>
          </div>
        </FuturisticCard>
      </motion.div>

      {/* Formulaire d'ajout/édition - mobile first */}
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
                {/* Header du formulaire */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-6 w-6 text-yellow-400" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
                      {editingMember ? 'MODIFIER MEMBRE' : 'NOUVEAU MEMBRE'}
                    </h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Grille responsive des champs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-cyan-300 text-sm font-bold uppercase tracking-wider">
                        Nom du joueur
                      </label>
                      <input
                        type="text"
                        value={newMember.name || ''}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-gray-900/70 transition-all"
                        placeholder="Nom du membre"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-cyan-300 text-sm font-bold uppercase tracking-wider">
                        Gamertag (optionnel)
                      </label>
                      <input
                        type="text"
                        value={newMember.nickname || ''}
                        onChange={(e) => setNewMember({ ...newMember, nickname: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-gray-900/70 transition-all"
                        placeholder="Surnom gaming"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-purple-300 text-sm font-bold uppercase tracking-wider">
                        Classe/Rôle
                      </label>
                      <input
                        type="text"
                        value={newMember.role || ''}
                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-gray-900/70 transition-all"
                        placeholder="Stratège, Bluffeur, Tank..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-yellow-300 text-sm font-bold uppercase tracking-wider">
                        Badge/Titre
                      </label>
                      <input
                        type="text"
                        value={newMember.badge || ''}
                        onChange={(e) => setNewMember({ ...newMember, badge: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-gray-900/70 transition-all"
                        placeholder="Badge spécial"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-pink-300 text-sm font-bold uppercase tracking-wider">
                      Avatar/Photo
                    </label>
                    <input
                      type="text"
                      value={newMember.photo || ''}
                      onChange={(e) => setNewMember({ ...newMember, photo: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border-2 border-pink-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:bg-gray-900/70 transition-all"
                      placeholder="/img/avatar.jpg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-green-300 text-sm font-bold uppercase tracking-wider">
                      Bio/Description
                    </label>
                    <textarea
                      value={newMember.description || ''}
                      onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border-2 border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900/70 transition-all h-24 sm:h-32 resize-none"
                      placeholder="Description gaming du membre..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-blue-300 text-sm font-bold uppercase tracking-wider">
                        Jeu Main
                      </label>
                      <input
                        type="text"
                        value={newMember.stats?.favoriteGame || ''}
                        onChange={(e) => setNewMember({
                          ...newMember,
                          stats: { ...newMember.stats, favoriteGame: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-gray-900/70 transition-all"
                        placeholder="Jeu de prédilection"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-red-300 text-sm font-bold uppercase tracking-wider">
                        Technique Ultime
                      </label>
                      <input
                        type="text"
                        value={newMember.stats?.specialMove || ''}
                        onChange={(e) => setNewMember({
                          ...newMember,
                          stats: { ...newMember.stats, specialMove: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-gray-900/50 border-2 border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-400 focus:bg-gray-900/70 transition-all"
                        placeholder="Compétence signature"
                      />
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <FuturisticButton
                        type="submit"
                        variant="success"
                        className="w-full font-bold uppercase tracking-wider"
                      >
                        <Crown className="h-5 w-5" />
                        {editingMember ? 'METTRE À JOUR' : 'ENREGISTRER'}
                      </FuturisticButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <FuturisticButton
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingMember(null);
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

      {/* Liste des membres - grille responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
      >
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <FuturisticCard glowColor="from-purple-400/20 to-pink-500/20" className="h-full group">
              <div className="p-4 sm:p-6 h-full">
                {/* Header de la carte membre */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {/* Avatar avec effet gaming */}
                    <div className="relative">
                      {member.photo ? (
                        <div className="relative">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-purple-500/50"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-xl"></div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                          <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </div>
                      )}
                      {/* Badge de status */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                    </div>

                    {/* Info membre */}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        {member.name}
                        {member.nickname && (
                          <span className="text-cyan-400 text-sm sm:text-base font-medium">
                            [{member.nickname}]
                          </span>
                        )}
                      </h3>
                      <p className="text-purple-300 font-medium text-sm sm:text-base">{member.role}</p>
                      <div className="flex items-center mt-1 gap-1">
                        <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                        <span className="text-yellow-300 text-xs sm:text-sm font-medium">{member.badge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex gap-1 sm:gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(member)}
                      className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{member.description}</p>
                
                {/* Stats gaming */}
                <div className="space-y-2">
                  {member.stats?.favoriteGame && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-green-300 font-medium">Main:</span>
                      <span className="text-white">{member.stats.favoriteGame}</span>
                    </div>
                  )}
                  {member.stats?.specialMove && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                      <span className="text-blue-300 font-medium">Ultimate:</span>
                      <span className="text-white">{member.stats.specialMove}</span>
                    </div>
                  )}
                </div>

                {/* Barre de progression décorative */}
                <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  />
                </div>
              </div>
            </FuturisticCard>
          </motion.div>
        ))}
      </motion.div>

      {/* État vide avec style gaming */}
      {members.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 sm:py-16"
        >
          <FuturisticCard glowColor="from-gray-400/20 to-purple-500/20">
            <div className="p-8 sm:p-12">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl sm:text-8xl mb-6"
              >
                👥
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase tracking-wider">
                AUCUN MEMBRE TROUVÉ
              </h3>
              <p className="text-gray-400 mb-8 text-sm sm:text-base">
                L'équipe JDS attend ses premiers joueurs !
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <FuturisticButton
                  variant="primary"
                  onClick={() => setShowAddForm(true)}
                  className="font-bold uppercase tracking-wider"
                >
                  <Plus className="h-5 w-5" />
                  RECRUTER LE PREMIER MEMBRE
                </FuturisticButton>
              </motion.div>
            </div>
          </FuturisticCard>
        </motion.div>
      )}
    </div>
  );
}