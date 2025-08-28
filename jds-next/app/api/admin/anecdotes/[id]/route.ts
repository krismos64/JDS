import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/dataLoader';
import { Anecdote } from '@/lib/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedAnecdote: Anecdote = await request.json();
    const data = loadData<{ anecdotes: Anecdote[], oliviaQuotes: string[] }>('anecdotes.json');
    
    const index = data.anecdotes.findIndex(a => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Anecdote non trouvée' }, { status: 404 });
    }
    
    data.anecdotes[index] = updatedAnecdote;
    saveData('anecdotes.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'anecdote' },
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
    const data = loadData<{ anecdotes: Anecdote[], oliviaQuotes: string[] }>('anecdotes.json');
    
    const index = data.anecdotes.findIndex(a => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Anecdote non trouvée' }, { status: 404 });
    }
    
    data.anecdotes.splice(index, 1);
    saveData('anecdotes.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'anecdote' },
      { status: 500 }
    );
  }
}