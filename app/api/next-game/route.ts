import { NextResponse } from 'next/server';
import { getNextGame } from '@/lib/dataLoader';

export async function GET() {
  try {
    const nextGame = getNextGame();
    return NextResponse.json(nextGame);
  } catch (error) {
    console.error('Erreur lors de la lecture de next-game:', error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement de la prochaine partie' },
      { status: 500 }
    );
  }
}
