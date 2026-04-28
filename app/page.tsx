'use client';

import { useEffect, useState } from 'react';
import FuturisticHeader from '@/components/FuturisticHeader';
import BottomTabBar from '@/components/BottomTabBar';
import BackToTop from '@/components/BackToTop';
import ParticleBackground from '@/components/ParticleBackground';
import AudioPlayerAdvanced from '@/components/AudioPlayerAdvanced';
import PlayerModal from '@/components/PlayerModal';
import NextGameSection from '@/components/NextGameSection';
import TeamSection from '@/components/TeamSection';
import LeaderboardSection from '@/components/LeaderboardSection';
import GamesSection from '@/components/GamesSection';
import StoriesSection from '@/components/StoriesSection';
import VideoSection from '@/components/VideoSection';
import { members, games, scores, anecdotes } from '@/lib/staticData';
import { Member, NextGame } from '@/lib/types';

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextGame, setNextGame] = useState<NextGame | null>(null);

  useEffect(() => {
    fetch('/api/next-game')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setNextGame(data))
      .catch(() => setNextGame(null));
  }, []);

  const handlePlayerClick = (member: Member) => {
    setSelectedPlayer(member);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen text-light relative">
      <ParticleBackground />
      <AudioPlayerAdvanced />

      <PlayerModal
        player={selectedPlayer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 1. Hero */}
      <FuturisticHeader />

      {/* Padding bottom global pour la BottomTabBar */}
      <main className="relative pb-28 md:pb-32">
        {/* 2. Next Game (countdown live) */}
        <NextGameSection nextGame={nextGame} />

        {/* 3. Team (carrousel + photo de groupe) */}
        <TeamSection members={members} onPlayerClick={handlePlayerClick} />

        {/* 4. Leaderboard (cartes mobile) */}
        <LeaderboardSection scores={scores} />

        {/* 5. Games (ludothèque) */}
        <GamesSection games={games} />

        {/* 6. Stories (souvenirs) */}
        <StoriesSection anecdotes={anecdotes} />

        {/* 7. Video (playlist) */}
        <VideoSection />
      </main>

      <BackToTop />
      <BottomTabBar />
    </div>
  );
}
