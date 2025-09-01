import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/dataLoader';
import { Game } from '@/lib/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedGame: Game = await request.json();
    const data = loadData<{ games: Game[] }>('games.json');
    
    const index = data.games.findIndex(g => g.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Jeu non trouvé' }, { status: 404 });
    }
    
    data.games[index] = updatedGame;
    saveData('games.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du jeu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = loadData<{ games: Game[] }>('games.json');
    
    const index = data.games.findIndex(g => g.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Jeu non trouvé' }, { status: 404 });
    }
    
    data.games.splice(index, 1);
    saveData('games.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du jeu' },
      { status: 500 }
    );
  }
}