import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MemberCard from '@/components/MemberCard';
import GameCard from '@/components/GameCard';
import ScoreTable from '@/components/ScoreTable';
import AnecdoteCard from '@/components/AnecdoteCard';
import ClientWrapper from '@/components/ClientWrapper';
import BackToTop from '@/components/BackToTop';
import { members, games, scores, anecdotes } from '@/lib/data';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ClientWrapper />
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 space-y-20">
        {/* Section Vidéo Générique Manga */}
        <section id="manga-intro" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
              🎬 Le Générique de l&apos;Équipe
            </h2>
            <p className="text-xl text-gray-600">Découvrez notre générique de manga personnalisé !</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/3PHmbisIdCE"
                className="w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🎲</span>
              <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>⚔️</span>
              <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>🏆</span>
            </div>
          </div>
        </section>

        {/* Section Vidéo de présentation */}
        <section id="video-presentation" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
              Découvrez nos soirées JDS !
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plongez dans l'ambiance de nos soirées jeux de société ! Entre rires, stratégies et petites embrouilles, 
              découvrez comment nous passons nos soirées entre amis autour de nos jeux préférés.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/5rMIRtOtW50"
                className="w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Prochaine Soirée */}
        <section id="prochaine-soiree" className="scroll-mt-20">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl shadow-2xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Prochaine Soirée</h2>
            <div className="text-6xl font-bold mb-6 animate-pulse">Février 2025</div>
            <div className="text-2xl">
              👶 Olivia sera présente !
              <span className="block mt-2 italic">"C'est à mon tour !"</span>
            </div>
            <p className="text-xl mt-8 animate-wiggle">"On boit du coca comme des oufs !"</p>
          </div>
        </section>

        {/* Section Membres */}
        <section id="membres" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Notre Dream Team</h2>
          </div>
          
          {/* Photo de groupe */}
          <div className="mb-12">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/img/Embrouille JDS.JPG"
                alt="Photo de groupe Embrouille JDS"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="text-center text-gray-600 mt-4 italic">
              L'équipe au complet lors d'une soirée mémorable !
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Section Jeux */}
        <section id="jeux" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Nos Jeux Préférés</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Section Scores */}
        <section id="scores" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Tableau des Scores</h2>
            <div className="text-6xl my-8">🏆</div>
          </div>
          
          <ScoreTable scores={scores} />
        </section>

        {/* Section Anecdotes */}
        <section id="anecdotes" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Les Anecdotes de nos Soirées</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {anecdotes.map(anecdote => (
              <AnecdoteCard key={anecdote.id} anecdote={anecdote} />
            ))}
          </div>
        </section>
      </main>

      {/* Bouton retour en haut */}
      <BackToTop />
    </div>
  );
}
