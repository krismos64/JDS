import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/dataLoader';
import { Member } from '@/lib/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedMember: Member = await request.json();
    const data = loadData<{ members: Member[] }>('members.json');
    
    const index = data.members.findIndex(m => m.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Membre non trouvé' }, { status: 404 });
    }
    
    data.members[index] = updatedMember;
    saveData('members.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du membre' },
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
    const data = loadData<{ members: Member[] }>('members.json');
    
    const index = data.members.findIndex(m => m.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Membre non trouvé' }, { status: 404 });
    }
    
    data.members.splice(index, 1);
    saveData('members.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du membre' },
      { status: 500 }
    );
  }
}