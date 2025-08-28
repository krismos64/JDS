import fs from 'fs';
import path from 'path';
import { Member, Game, Score, Anecdote } from './types';

const dataDirectory = path.join(process.cwd(), 'data');

export function loadData<T>(fileName: string): T {
  const filePath = path.join(dataDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function saveData<T>(fileName: string, data: T): void {
  const filePath = path.join(dataDirectory, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getMembers(): Member[] {
  const data = loadData<{ members: Member[] }>('members.json');
  return data.members;
}

export function getGames(): Game[] {
  const data = loadData<{ games: Game[] }>('games.json');
  return data.games;
}

export function getScores(): Score[] {
  const data = loadData<{ scores: Score[] }>('scores.json');
  return data.scores;
}

export function getAnecdotes(): Anecdote[] {
  const data = loadData<{ anecdotes: Anecdote[] }>('anecdotes.json');
  return data.anecdotes;
}

export function getOliviaQuotes(): string[] {
  const data = loadData<{ oliviaQuotes: string[] }>('anecdotes.json');
  return data.oliviaQuotes;
}