import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'games.json');
    
    if (!fs.existsSync(filePath)) {
      // Si le fichier n'existe pas, retourner les données par défaut
      const defaultGames = [
        { id: 'memory', name: 'Memory', icon: '🧠', champion: 'Stacy' },
        { id: 'cortex', name: 'Cortex', icon: '🧩', record: '8 cerveaux' }
      ];
      return NextResponse.json(defaultGames);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.games || data);
  } catch (error) {
    console.error('Erreur lors de la lecture des jeux:', error);
    return NextResponse.json([]);
  }
}