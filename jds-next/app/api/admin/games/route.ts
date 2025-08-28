import { NextRequest, NextResponse } from 'next/server';
import { getGames, loadData, saveData } from '@/lib/dataLoader';
import { Game } from '@/lib/types';

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

export async function POST(request: NextRequest) {
  try {
    const newGame: Game = await request.json();
    const data = loadData<{ games: Game[] }>('games.json');
    
    // Vérifier si l'ID existe déjà
    const existingGame = data.games.find(g => g.id === newGame.id);
    if (existingGame) {
      return NextResponse.json(
        { error: 'Un jeu avec cet ID existe déjà' },
        { status: 400 }
      );
    }
    
    data.games.push(newGame);
    saveData('games.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout du jeu' },
      { status: 500 }
    );
  }
}