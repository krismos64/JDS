'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, User, Users, Crown } from 'lucide-react';
import { Member } from '@/lib/types';
import FuturisticCard from '@/components/admin/FuturisticCard';
import FuturisticButton from '@/components/admin/FuturisticButton';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function MembersAdmin() {
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
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
    fetchData();
  }, []);

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
    <div className="space-y-6">
      <AdminPageHeader
        title="Membres"
        subtitle="Gérez l'équipe JDS"
        icon={Users}
        iconGradient="from-purple-500 to-pink-600"
        count={members.length}
        countLabel={members.length > 1 ? 'membres' : 'membre'}
        action={
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
                stats: { favoriteGame: '', specialMove: '' },
              });
            }}
            icon={Plus}
            className="w-full sm:w-auto"
          >
            Nouveau membre
          </FuturisticButton>
        }
      />

      {/* Formulaire d'ajout/édition - mobile first */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <FuturisticCard>
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-white mb-5">
                  {editingMember ? 'Modifier le membre' : 'Nouveau membre'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Grille responsive des champs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-slate-300 text-sm font-medium">
                        Nom du joueur
                      </label>
                      <input
                        type="text"
                        value={newMember.name || ''}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
                        placeholder="Nom du membre"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-slate-300 text-sm font-medium">
                        Gamertag (optionnel)
                      </label>
                      <input
                        type="text"
                        value={newMember.nickname || ''}
                        onChange={(e) => setNewMember({ ...newMember, nickname: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
                        placeholder="Surnom gaming"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-slate-300 text-sm font-medium">
                        Classe/Rôle
                      </label>
                      <input
                        type="text"
                        value={newMember.role || ''}
                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 transition-colors"
                        placeholder="Stratège, Bluffeur, Tank..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-slate-300 text-sm font-medium">
                        Badge/Titre
                      </label>
                      <input
                        type="text"
                        value={newMember.badge || ''}
                        onChange={(e) => setNewMember({ ...newMember, badge: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                        placeholder="Badge spécial"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-300 text-sm font-medium">
                      Avatar/Photo
                    </label>
                    <input
                      type="text"
                      value={newMember.photo || ''}
                      onChange={(e) => setNewMember({ ...newMember, photo: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors"
                      placeholder="/img/avatar.jpg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-300 text-sm font-medium">
                      Bio/Description
                    </label>
                    <textarea
                      value={newMember.description || ''}
                      onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 transition-colors h-24 sm:h-32 resize-none"
                      placeholder="Description gaming du membre..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-slate-300 text-sm font-medium">
                        Jeu Main
                      </label>
                      <input
                        type="text"
                        value={newMember.stats?.favoriteGame || ''}
                        onChange={(e) => setNewMember({
                          ...newMember,
                          stats: { ...newMember.stats, favoriteGame: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                        placeholder="Jeu de prédilection"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-slate-300 text-sm font-medium">
                        Technique Ultime
                      </label>
                      <input
                        type="text"
                        value={newMember.stats?.specialMove || ''}
                        onChange={(e) => setNewMember({
                          ...newMember,
                          stats: { ...newMember.stats, specialMove: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition-colors"
                        placeholder="Compétence signature"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <FuturisticButton
                      type="submit"
                      variant="success"
                      icon={Crown}
                      className="flex-1"
                    >
                      {editingMember ? 'Mettre à jour' : 'Enregistrer'}
                    </FuturisticButton>
                    <FuturisticButton
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingMember(null);
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
          >
            <FuturisticCard className="h-full hover:border-slate-600 transition-colors">
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
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
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
                <p className="text-slate-200 text-sm mb-4 line-clamp-2">{member.description}</p>
                
                <div className="space-y-1.5">
                  {member.stats?.favoriteGame && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                      <span className="text-slate-300 font-medium">Main :</span>
                      <span className="text-white">{member.stats.favoriteGame}</span>
                    </div>
                  )}
                  {member.stats?.specialMove && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      <span className="text-slate-300 font-medium">Ultimate :</span>
                      <span className="text-white">{member.stats.specialMove}</span>
                    </div>
                  )}
                </div>
              </div>
            </FuturisticCard>
          </motion.div>
        ))}
      </div>

      {members.length === 0 && (
        <FuturisticCard className="text-center py-12">
          <div className="p-8">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucun membre
            </h3>
            <p className="text-slate-300 mb-6 text-sm">
              L&apos;équipe JDS attend ses premiers joueurs.
            </p>
            <FuturisticButton
              variant="primary"
              onClick={() => setShowAddForm(true)}
              icon={Plus}
            >
              Ajouter un membre
            </FuturisticButton>
          </div>
        </FuturisticCard>
      )}
    </div>
  );
}