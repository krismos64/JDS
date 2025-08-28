import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'anecdotes.json');
    
    if (!fs.existsSync(filePath)) {
      // Si le fichier n'existe pas, retourner les données par défaut
      const defaultQuotes = [
        "C'est à mon tour !",
        "Je veux la carte avec le papillon !",
        "On peut jouer encore une fois ?",
        "C'est moi qui mélange !"
      ];
      return NextResponse.json(defaultQuotes);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.oliviaQuotes || []);
  } catch (error) {
    console.error('Erreur lors de la lecture des citations d\'Olivia:', error);
    return NextResponse.json([]);
  }
}