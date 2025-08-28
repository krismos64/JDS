import { NextResponse } from 'next/server';
import { getMembers } from '@/lib/dataLoader';

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