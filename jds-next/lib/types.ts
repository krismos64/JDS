export interface Member {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  badge: string;
  photo: string;
  description: string;
  stats?: {
    gamesWon?: number;
    favoriteGame?: string;
    specialMove?: string;
  };
}

export interface Game {
  id: string;
  name: string;
  icon: string;
  champion?: string;
  record?: string;
  description?: string;
}

export interface Score {
  date: string;
  game: string;
  scores: {
    coco: number | string;
    stacy: number | string;
    fab: number | string;
    chris: number | string;
  };
}

export interface Anecdote {
  id: string;
  date: string;
  badge: string;
  content: string;
  photos?: {
    url: string;
    caption: string;
  }[];
  video?: {
    url: string;
    caption: string;
  };
}