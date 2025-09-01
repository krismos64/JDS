import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'anecdotes.json');
    
    if (!fs.existsSync(filePath)) {
      // Si le fichier n'existe pas, retourner les données par défaut
      const defaultAnecdotes = [
        {
          id: '1',
          date: '19 janvier 2025',
          badge: 'Nouvelle',
          content: 'Soirée JDS Olivia se gère toute seule ! 😂 !',
          photos: []
        }
      ];
      return NextResponse.json(defaultAnecdotes);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.anecdotes || data);
  } catch (error) {
    console.error('Erreur lors de la lecture des anecdotes:', error);
    return NextResponse.json([]);
  }
}