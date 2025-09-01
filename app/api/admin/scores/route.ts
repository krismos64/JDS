import { NextRequest, NextResponse } from 'next/server';
import { getScores, loadData, saveData } from '@/lib/dataLoader';
import { Score } from '@/lib/types';

export async function GET() {
  try {
    const scores = getScores();
    return NextResponse.json(scores);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du chargement des scores' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newScore: Score = await request.json();
    const data = loadData<{ scores: Score[] }>('scores.json');
    
    data.scores.push(newScore);
    
    // Trier par date décroissante
    data.scores.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
    
    saveData('scores.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout du score' },
      { status: 500 }
    );
  }
}