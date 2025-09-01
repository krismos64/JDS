import { NextRequest, NextResponse } from 'next/server';
import { getOliviaQuotes, loadData, saveData } from '@/lib/dataLoader';

export async function GET() {
  try {
    const quotes = getOliviaQuotes();
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du chargement des citations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { quote } = await request.json();
    
    if (!quote || typeof quote !== 'string' || !quote.trim()) {
      return NextResponse.json(
        { error: 'Citation invalide' },
        { status: 400 }
      );
    }

    const data = loadData<{ anecdotes: any[], oliviaQuotes: string[] }>('anecdotes.json');
    
    // Vérifier si la citation existe déjà
    if (data.oliviaQuotes.includes(quote.trim())) {
      return NextResponse.json(
        { error: 'Cette citation existe déjà' },
        { status: 400 }
      );
    }
    
    data.oliviaQuotes.push(quote.trim());
    saveData('anecdotes.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout de la citation' },
      { status: 500 }
    );
  }
}