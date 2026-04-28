import { NextRequest, NextResponse } from 'next/server';
import { getNextGame, saveData } from '@/lib/dataLoader';
import { NextGame } from '@/lib/types';

export async function GET() {
  try {
    const nextGame = getNextGame();
    return NextResponse.json(nextGame);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du chargement' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, displayDate, highlight, isActive } = body;

    if (typeof date !== 'string' || !date.trim()) {
      return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
    }
    if (typeof displayDate !== 'string' || !displayDate.trim()) {
      return NextResponse.json({ error: 'Affichage de date invalide' }, { status: 400 });
    }
    if (typeof highlight !== 'string') {
      return NextResponse.json({ error: 'Highlight invalide' }, { status: 400 });
    }
    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'isActive invalide' }, { status: 400 });
    }

    const nextGame: NextGame = {
      date: date.trim(),
      displayDate: displayDate.trim(),
      highlight: highlight.trim(),
      isActive,
    };

    saveData('nextGame.json', { nextGame });

    return NextResponse.json({ success: true, nextGame });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de next-game:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}
