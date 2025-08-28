'use client';

import { useState } from 'react';
import FuturisticHeader from '@/components/FuturisticHeader';
import GamingNav from '@/components/GamingNav';
import MobileMenu from '@/components/MobileMenu';
import SwipeIndicator from '@/components/SwipeIndicator';
import ClientWrapper from '@/components/ClientWrapper';
import BackToTop from '@/components/BackToTop';
import ParticleBackground from '@/components/ParticleBackground';
import AudioPlayerAdvanced from '@/components/AudioPlayerAdvanced';
import PlayerModal from '@/components/PlayerModal';
import TeamPhoto from '@/components/TeamPhoto';
import CocaAnimation from '@/components/CocaAnimation';
import PodiumAnimation from '@/components/PodiumAnimation';
import { members, games, scores, anecdotes } from '@/lib/staticData';
import { Member } from '@/lib/types';

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayerClick = (member: Member) => {
    setSelectedPlayer(member);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen text-light relative">
      <ParticleBackground />
      <ClientWrapper />
      <AudioPlayerAdvanced />
      <MobileMenu />
      <SwipeIndicator />
      <FuturisticHeader />
      <GamingNav />
      <PlayerModal 
        player={selectedPlayer} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
      
      <main className="relative">
        {/* Section 1: Team Overview */}
        <section id="team" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-8xl font-black mb-6">
                <span className="hologram-text animate-hologram">TEAM</span>
              </h2>
              <p className="text-xl text-light/80 font-mono max-w-2xl mx-auto">
                4 joueurs, 1 passion, ∞ embrouilles
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
              {members.map((member, index) => (
                <div key={member.id} 
                     onClick={() => handlePlayerClick(member)}
                     className="gaming-card p-6 text-center animate-slide-up cursor-pointer hover:scale-105 hover:border-primary transition-all duration-300 hover-lift"
                     style={{animationDelay: `${index * 200}ms`}}>
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden animate-cyber-glow">
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 hologram-text">{member.name}</h3>
                  <div className="text-sm text-secondary mb-3 font-mono">{member.badge}</div>
                  <p className="text-xs text-light/60 line-clamp-3">{member.description.substring(0, 100)}...</p>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                    Voir profil →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Photo de groupe */}
        <TeamPhoto />

        {/* Section 2: Next Game */}
        <section id="next-game" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-6xl md:text-8xl font-black mb-12">
              <span className="hologram-text animate-neon-pulse">NEXT GAME</span>
            </h2>
            
            <div className="max-w-4xl mx-auto gaming-card p-12 mb-12">
              <div className="text-8xl font-black mb-8 animate-glitch">
                FÉV 2025
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-4">
                  <div className="text-3xl text-primary font-bold">4</div>
                  <div className="text-xs font-mono text-light/60">PLAYERS</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-3xl text-secondary font-bold">∞</div>
                  <div className="text-xs font-mono text-light/60">GAMES</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-3xl text-tertiary font-bold">1</div>
                  <div className="text-xs font-mono text-light/60">NIGHT</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-3xl text-accent font-bold">MAX</div>
                  <div className="text-xs font-mono text-light/60">FUN</div>
                </div>
              </div>

              <div className="text-2xl mb-8">
                👶 <span className="hologram-text animate-hologram">OLIVIA SERA PRÉSENTE!</span>
              </div>
              
              <CocaAnimation />
            </div>
          </div>
        </section>

        {/* Section 3: Games */}
        <section id="games" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-8xl font-black mb-6">
                <span className="hologram-text animate-cyber-glow">GAMES</span>
              </h2>
              <p className="text-xl text-light/80 font-mono">Arsenal gaming complet</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <div key={game.id} 
                     className="gaming-card p-6 text-center hover:scale-105 transition-all animate-slide-up hover-glow"
                     style={{animationDelay: `${index * 100}ms`}}>
                  <div className="text-5xl mb-4 animate-float">{game.icon}</div>
                  <h3 className="font-bold text-lg mb-2 hologram-text">{game.name}</h3>
                  {game.champion && (
                    <div className="text-xs text-secondary font-mono">CHAMPION: {game.champion}</div>
                  )}
                  {game.record && (
                    <div className="text-xs text-accent font-mono">RECORD: {game.record}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Leaderboard */}
        <section id="leaderboard" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-8xl font-black mb-6">
                <span className="hologram-text animate-hologram">LEADERBOARD</span>
              </h2>
              <PodiumAnimation />
            </div>
            
            <div className="gaming-card p-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary/30">
                    <th className="text-left p-4 font-mono text-primary">DATE</th>
                    <th className="text-left p-4 font-mono text-secondary">GAME</th>
                    <th className="text-center p-4 font-mono text-tertiary">COCO</th>
                    <th className="text-center p-4 font-mono text-accent">STACY</th>
                    <th className="text-center p-4 font-mono text-neon-green">FAB</th>
                    <th className="text-center p-4 font-mono text-neon-magenta">CHRIS</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.slice(0, 10).map((score, index) => {
                    const scoreValues = Object.values(score.scores).map(s => parseFloat(s.toString()) || 0);
                    const bestScore = Math.min(...scoreValues);
                    const worstScore = Math.max(...scoreValues);
                    
                    return (
                      <tr key={index} className="border-b border-light/10 hover:bg-light/5 transition-colors">
                        <td className="p-4 font-mono text-sm">{score.date}</td>
                        <td className="p-4 font-bold">{score.game}</td>
                        <td className={`p-4 text-center font-mono ${parseFloat(score.scores.coco.toString()) === bestScore ? 'text-green-400 font-bold animate-pulse-glow' : parseFloat(score.scores.coco.toString()) === worstScore ? 'text-red-400' : ''}`}>
                          {score.scores.coco}
                          {parseFloat(score.scores.coco.toString()) === bestScore && ' 👑'}
                        </td>
                        <td className={`p-4 text-center font-mono ${parseFloat(score.scores.stacy.toString()) === bestScore ? 'text-green-400 font-bold animate-pulse-glow' : parseFloat(score.scores.stacy.toString()) === worstScore ? 'text-red-400' : ''}`}>
                          {score.scores.stacy}
                          {parseFloat(score.scores.stacy.toString()) === bestScore && ' 👑'}
                        </td>
                        <td className={`p-4 text-center font-mono ${parseFloat(score.scores.fab.toString()) === bestScore ? 'text-green-400 font-bold animate-pulse-glow' : parseFloat(score.scores.fab.toString()) === worstScore ? 'text-red-400' : ''}`}>
                          {score.scores.fab}
                          {parseFloat(score.scores.fab.toString()) === bestScore && ' 👑'}
                        </td>
                        <td className={`p-4 text-center font-mono ${parseFloat(score.scores.chris.toString()) === bestScore ? 'text-green-400 font-bold animate-pulse-glow' : parseFloat(score.scores.chris.toString()) === worstScore ? 'text-red-400' : ''}`}>
                          {score.scores.chris}
                          {parseFloat(score.scores.chris.toString()) === bestScore && ' 👑'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: Stories */}
        <section id="stories" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-8xl font-black mb-6">
                <span className="hologram-text animate-glitch">STORIES</span>
              </h2>
              <p className="text-xl text-light/80 font-mono">Legendary gaming moments</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {anecdotes.slice(0, 4).map((anecdote, index) => (
                <div key={anecdote.id} 
                     className="gaming-card p-8 animate-slide-up hover-lift"
                     style={{animationDelay: `${index * 200}ms`}}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-mono text-light/60">{anecdote.date}</div>
                    <div className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-white text-xs font-bold rounded-full border border-primary/30">
                      {anecdote.badge}
                    </div>
                  </div>
                  <p className="text-light/80 mb-4 leading-relaxed">{anecdote.content}</p>
                  {anecdote.photos && anecdote.photos[0] && (
                    <div className="relative h-48 rounded-lg overflow-hidden group">
                      <img src={anecdote.photos[0].url} alt="story" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {anecdote.photos[0].caption && (
                        <div className="absolute bottom-2 left-2 right-2 text-white text-xs bg-black/70 backdrop-blur-sm rounded p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          {anecdote.photos[0].caption}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Video */}
        <section id="video" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-6xl md:text-8xl font-black mb-12">
              <span className="hologram-text animate-cyber-glow">VIDEO</span>
            </h2>
            
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="gaming-card p-2">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/3PHmbisIdCE"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <div className="font-mono text-secondary text-sm mb-2">TEAM INTRO</div>
                  <div className="text-light/80 text-lg font-bold">🎬 Générique manga de l'équipe</div>
                  <div className="flex justify-center gap-2 mt-3">
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">🎲 Epic</span>
                    <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full">⚔️ Action</span>
                    <span className="px-2 py-1 bg-tertiary/20 text-tertiary text-xs rounded-full">🏆 Gaming</span>
                  </div>
                </div>
              </div>
              
              <div className="gaming-card p-2">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/5rMIRtOtW50"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <div className="font-mono text-primary text-sm mb-2">GAMEPLAY</div>
                  <div className="text-light/80 text-lg font-bold">🎮 Soirée gaming intense</div>
                  <div className="flex justify-center gap-2 mt-3">
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">🍕 Pizza</span>
                    <span className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded-full">😂 Fou rires</span>
                    <span className="px-2 py-1 bg-neon-magenta/20 text-neon-magenta text-xs rounded-full">🎉 Fun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bouton retour en haut */}
      <BackToTop />
    </div>
  );
}