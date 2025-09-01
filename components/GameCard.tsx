import { Game } from '@/lib/types';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <article className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-primary">
      <div className="text-5xl mb-4 text-center">{game.icon}</div>
      <h3 className="text-xl font-bold text-center text-dark mb-2">{game.name}</h3>
      {game.champion && (
        <p className="text-sm text-gray-600 text-center">
          <span className="font-semibold">Champion:</span> {game.champion}
        </p>
      )}
      {game.record && (
        <p className="text-sm text-gray-600 text-center">
          <span className="font-semibold">Record:</span> {game.record}
        </p>
      )}
    </article>
  );
}