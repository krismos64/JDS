"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Member } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article
        onClick={() => setShowModal(true)}
        className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
            {member.badge}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold text-dark mb-2">{member.name}</h3>
          <p className="text-gray-600">{member.description}</p>
        </div>
      </article>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 transform animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              </div>
              
              <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
              {member.nickname && <p className="text-lg text-gray-600 mb-2">alias "{member.nickname}"</p>}
              <p className="text-xl text-primary font-semibold mb-4">{member.role}</p>
              
              {member.stats && (
                <div className="mt-6 space-y-2 text-left bg-gray-50 rounded-lg p-4">
                  {member.stats.favoriteGame && (
                    <p><strong>Jeu favori:</strong> {member.stats.favoriteGame}</p>
                  )}
                  {member.stats.specialMove && (
                    <p><strong>Coup spécial:</strong> {member.stats.specialMove}</p>
                  )}
                  {member.stats.gamesWon !== undefined && (
                    <p><strong>Victoires:</strong> {member.stats.gamesWon}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}