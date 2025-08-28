import { NextRequest, NextResponse } from 'next/server';
import { getAnecdotes, getOliviaQuotes, loadData, saveData } from '@/lib/dataLoader';
import { Anecdote } from '@/lib/types';

export async function GET() {
  try {
    const anecdotes = getAnecdotes();
    const oliviaQuotes = getOliviaQuotes();
    
    return NextResponse.json({ anecdotes, oliviaQuotes });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du chargement des anecdotes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newAnecdote: Anecdote = await request.json();
    const data = loadData<{ anecdotes: Anecdote[], oliviaQuotes: string[] }>('anecdotes.json');
    
    // Ajouter au début de la liste
    data.anecdotes.unshift(newAnecdote);
    
    saveData('anecdotes.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout de l\'anecdote' },
      { status: 500 }
    );
  }
}