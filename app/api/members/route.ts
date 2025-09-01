import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Member } from '@/lib/types';

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'members.json');
    
    if (!fs.existsSync(filePath)) {
      // Si le fichier n'existe pas, retourner les données par défaut
      const defaultMembers = [
        {
          id: 'coco',
          name: 'Coco',
          role: 'Règles Master',
          badge: 'Règles Master',
          photo: '/img/B6CA6EE4-2593-452B-B77C-6B938639A852.jpg',
          description: 'Elle adore lire les règles que personne ne comprend.',
          stats: { favoriteGame: 'Cortex', specialMove: 'A déjà gagné une partie sans comprendre les règles' }
        }
      ];
      return NextResponse.json(defaultMembers);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.members || data);
  } catch (error) {
    console.error('Erreur lors de la lecture des membres:', error);
    return NextResponse.json([]);
  }
}