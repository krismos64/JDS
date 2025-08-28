import { NextResponse } from 'next/server';
import { getGames } from '@/lib/dataLoader';

export async function GET() {
  try {
    const games = getGames();
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du chargement des jeux' },
      { status: 500 }
    );
  }
}