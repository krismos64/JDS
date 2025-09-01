import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/dataLoader';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ index: string }> }
) {
  try {
    const { index } = await params;
    const { quote } = await request.json();
    
    if (!quote || typeof quote !== 'string' || !quote.trim()) {
      return NextResponse.json(
        { error: 'Citation invalide' },
        { status: 400 }
      );
    }

    const data = loadData<{ anecdotes: any[], oliviaQuotes: string[] }>('anecdotes.json');
    const quoteIndex = Number(index);
    
    if (quoteIndex < 0 || quoteIndex >= data.oliviaQuotes.length) {
      return NextResponse.json({ error: 'Citation non trouvée' }, { status: 404 });
    }
    
    // Vérifier si la nouvelle citation existe déjà (sauf si c'est la même)
    const trimmedQuote = quote.trim();
    const existingIndex = data.oliviaQuotes.indexOf(trimmedQuote);
    if (existingIndex !== -1 && existingIndex !== quoteIndex) {
      return NextResponse.json(
        { error: 'Cette citation existe déjà' },
        { status: 400 }
      );
    }
    
    data.oliviaQuotes[quoteIndex] = trimmedQuote;
    saveData('anecdotes.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la citation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ index: string }> }
) {
  try {
    const { index } = await params;
    const data = loadData<{ anecdotes: any[], oliviaQuotes: string[] }>('anecdotes.json');
    const quoteIndex = Number(index);
    
    if (quoteIndex < 0 || quoteIndex >= data.oliviaQuotes.length) {
      return NextResponse.json({ error: 'Citation non trouvée' }, { status: 404 });
    }
    
    data.oliviaQuotes.splice(quoteIndex, 1);
    saveData('anecdotes.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la citation' },
      { status: 500 }
    );
  }
}