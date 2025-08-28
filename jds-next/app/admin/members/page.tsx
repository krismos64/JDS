'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, User, Award, Image } from 'lucide-react';
import { Member } from '@/lib/types';

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
    
    // Générer l'ID automatiquement si nouveau membre
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Gestion des membres</h1>
          <p className="text-gray-300">Gérez les membres de l'équipe JDS</p>
        </div>
        <button
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
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau membre
        </button>
      </div>

      {/* Formulaire d'ajout/édition */}
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            {editingMember ? 'Modifier le membre' : 'Ajouter un membre'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Nom</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nom du membre"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Surnom (optionnel)</label>
                <input
                  type="text"
                  value={newMember.nickname}
                  onChange={(e) => setNewMember({ ...newMember, nickname: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Surnom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Rôle</label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="ex: Stratège, Bluffeur, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Badge</label>
                <input
                  type="text"
                  value={newMember.badge}
                  onChange={(e) => setNewMember({ ...newMember, badge: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Badge spécial"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Photo</label>
              <input
                type="url"
                value={newMember.photo}
                onChange={(e) => setNewMember({ ...newMember, photo: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="/img/photo.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                value={newMember.description}
                onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                placeholder="Description amusante du membre..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Jeu préféré</label>
                <input
                  type="text"
                  value={newMember.stats?.favoriteGame}
                  onChange={(e) => setNewMember({
                    ...newMember,
                    stats: { ...newMember.stats, favoriteGame: e.target.value }
                  })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Jeu préféré"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Mouvement spécial</label>
                <input
                  type="text"
                  value={newMember.stats?.specialMove}
                  onChange={(e) => setNewMember({
                    ...newMember,
                    stats: { ...newMember.stats, specialMove: e.target.value }
                  })}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Technique signature"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                {editingMember ? 'Mettre à jour' : 'Enregistrer'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingMember(null);
                }}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des membres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-purple-300" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                    {member.nickname && (
                      <span className="text-gray-400 text-base ml-2">({member.nickname})</span>
                    )}
                  </h3>
                  <p className="text-purple-300">{member.role}</p>
                  <div className="flex items-center mt-1">
                    <Award className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-yellow-300 text-sm">{member.badge}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">{member.description}</p>
            
            <div className="space-y-2 text-sm">
              {member.stats?.favoriteGame && (
                <div className="text-green-300">
                  <strong>Jeu préféré:</strong> {member.stats.favoriteGame}
                </div>
              )}
              {member.stats?.specialMove && (
                <div className="text-blue-300">
                  <strong>Spécialité:</strong> {member.stats.specialMove}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-white mb-2">Aucun membre enregistré</h3>
          <p className="text-gray-400 mb-4">Ajoutez le premier membre de l'équipe</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Ajouter un membre
          </button>
        </div>
      )}
    </div>
  );
}