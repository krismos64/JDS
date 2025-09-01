import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'scores.json');
    
    if (!fs.existsSync(filePath)) {
      // Si le fichier n'existe pas, retourner les données par défaut
      const defaultScores = [
        {
          date: '30/10/2024',
          game: '6 qui prend',
          scores: { coco: 86, stacy: 46, fab: 27, chris: 37 }
        }
      ];
      return NextResponse.json(defaultScores);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.scores || data);
  } catch (error) {
    console.error('Erreur lors de la lecture des scores:', error);
    return NextResponse.json([]);
  }
}