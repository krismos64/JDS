import { NextResponse } from 'next/server';
import { getMembers, getGames, getScores, getAnecdotes, getOliviaQuotes } from '@/lib/dataLoader';

export async function GET() {
  try {
    const members = getMembers();
    const games = getGames();
    const scores = getScores();
    const anecdotes = getAnecdotes();
    const oliviaQuotes = getOliviaQuotes();

    // Calculer le joueur avec le plus de victoires
    const winCounts: Record<string, number> = {};
    scores.forEach(score => {
      const winner = Object.entries(score.scores).reduce((prev, curr) => {
        // Pour certains jeux, le score le plus bas gagne
        const lowScoreWins = ['6 qui prend', 'Lama', 'Skyjo'];
        if (lowScoreWins.includes(score.game)) {
          return (curr[1] as number) < (prev[1] as number) ? curr : prev;
        }
        return (curr[1] as number) > (prev[1] as number) ? curr : prev;
      });
      winCounts[winner[0]] = (winCounts[winner[0]] || 0) + 1;
    });

    const topPlayer = Object.entries(winCounts).reduce((prev, curr) => 
      curr[1] > prev[1] ? curr : prev, ['', 0]
    );

    const stats = {
      totalMembers: members.length,
      totalGames: games.length,
      totalScores: scores.length,
      totalAnecdotes: anecdotes.length,
      totalOliviaQuotes: oliviaQuotes.length,
      lastGameDate: scores[scores.length - 1]?.date || '',
      topPlayer: members.find(m => m.id === topPlayer[0])?.name || '',
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du chargement des statistiques' },
      { status: 500 }
    );
  }
}