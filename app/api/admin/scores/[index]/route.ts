import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/dataLoader';
import { Score } from '@/lib/types';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ index: string }> }
) {
  try {
    const { index } = await params;
    const data = loadData<{ scores: Score[] }>('scores.json');
    
    data.scores.splice(Number(index), 1);
    saveData('scores.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du score' },
      { status: 500 }
    );
  }
}