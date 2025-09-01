import { NextRequest, NextResponse } from 'next/server';
import { getMembers, loadData, saveData } from '@/lib/dataLoader';
import { Member } from '@/lib/types';

export async function GET() {
  try {
    const members = getMembers();
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du chargement des membres' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newMember: Member = await request.json();
    const data = loadData<{ members: Member[] }>('members.json');
    
    // Vérifier si l'ID existe déjà
    const existingMember = data.members.find(m => m.id === newMember.id);
    if (existingMember) {
      return NextResponse.json(
        { error: 'Un membre avec cet ID existe déjà' },
        { status: 400 }
      );
    }
    
    data.members.push(newMember);
    saveData('members.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout du membre' },
      { status: 500 }
    );
  }
}