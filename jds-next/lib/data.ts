import { Member, Game, Score, Anecdote } from './types';

export const members: Member[] = [
  {
    id: 'coco',
    name: 'Coco',
    role: 'Règles Master',
    badge: 'Règles Master',
    photo: '/img/B6CA6EE4-2593-452B-B77C-6B938639A852.jpg',
    description: 'Elle adore lire les règles que personne ne comprend, c\'est une experte en analyse de plateau qui peut passer 20 minutes à réfléchir à son coup... pour finalement jouer exactement ce qu\'on lui avait suggéré au début ! 🤔 Détient le record du "Ah mais si j\'avais su..." le plus utilisé en une soirée.',
    stats: {
      favoriteGame: 'Cortex',
      specialMove: 'A déjà gagné une partie sans comprendre les règles'
    }
  },
  {
    id: 'stacy',
    name: 'Stacy',
    role: 'Reine des jeux de bluff',
    badge: 'Bluff Queen',
    photo: '/img/577D625C-95F0-4619-AE0F-6EE7900B4353.jpg',
    description: 'Reine incontestée du bluff, capable de faire croire qu\'elle a une mauvaise main même quand elle gagne ! 🃏 Son rire contagieux peut déconcentrer les adversaires - technique secrète ?',
    stats: {
      favoriteGame: 'Memory',
      specialMove: 'Se souvient de toutes les cartes sauf quand c\'est son tour'
    }
  },
  {
    id: 'fab',
    name: 'Fab le kebab',
    role: 'Champion des jeux d\'adresse',
    badge: 'Adresse Pro',
    photo: '/img/F5B12578-B2BD-463D-947D-6F0A5167B8FA.jpg',
    description: 'Le joueur qui arrive toujours avec des snacks et pizzas pour amadouer les autres. 🌯 Maître dans l\'art de négocier des alliances... qu\'il trahit systématiquement !',
    stats: {
      favoriteGame: '6 qui prend',
      specialMove: 'N\'a jamais joué un seul tour sans dire "Ah mais c\'est pas ce que je voulais faire ça !"'
    }
  },
  {
    id: 'chris',
    name: 'Chris',
    nickname: 'Moutt',
    role: 'Pro de l\'escroquerie',
    badge: 'Saboteur',
    photo: '/img/webResult.jpg',
    description: 'Le stratège silencieux qui ne dit rien pendant toute la partie... pour finalement révéler qu\'il était le saboteur depuis le début ! 🕵️ Expert en analyse de ses adversaires, mais ne gagne jamais',
    stats: {
      favoriteGame: 'Saboteur',
      specialMove: 'Capable de mélanger les cartes pendant 10 minutes pour "être sûr que c\'est bien mélangé"'
    }
  }
];

export const games: Game[] = [
  { id: 'pioupiou', name: 'Pioupiou', icon: '🪶', champion: 'Coco(rico)' },
  { id: 'memory', name: 'Memory', icon: '🧠', champion: 'Stacy' },
  { id: 'cortex', name: 'Cortex', icon: '🧩', record: '8 cerveaux de Fabrice' },
  { id: 'saboteur', name: 'Saboteur', icon: '🕵️', champion: 'Chris' },
  { id: 'lama', name: 'Lama', icon: '🦙', champion: 'Stacy', record: 'score 0' },
  { id: 'ko', name: 'KO', icon: '👊', champion: 'Fabrice' },
  { id: 'skyjo', name: 'Skyjo', icon: '⭐', champion: 'Coco' },
  { id: 'once-upon', name: 'Once upon a draft', icon: '📖', champion: 'Fabrice' },
  { id: '6-qui-prend', name: '6 qui prend', icon: '🔢', record: 'Fabrice 27' },
  { id: 'love-letter', name: 'Love Letter', icon: '💌', record: 'Fabrice 2 pions' },
  { id: 'chips', name: 'Chips', icon: '🍪', record: 'Fabrice et Chris 5 pions' },
  { id: '5-alive', name: '5 alive', icon: '✋', record: 'tout le monde a gagné une fois' },
];

export const scores: Score[] = [
  {
    date: '30/10/2024',
    game: '6 qui prend',
    scores: { coco: 86, stacy: 46, fab: 27, chris: 37 }
  },
  {
    date: '30/10/2024',
    game: 'Lama',
    scores: { coco: 58, stacy: 0, fab: 13, chris: 35 }
  },
  {
    date: '01/12/2024',
    game: 'KO',
    scores: { coco: 0, stacy: 1, fab: 2, chris: 1 }
  },
  {
    date: '20/12/2024',
    game: 'Once upon a draft',
    scores: { coco: 45.5, stacy: 52, fab: 59.5, chris: 56.5 }
  },
  {
    date: '20/12/2024',
    game: 'Skyjo',
    scores: { coco: 58, stacy: 66, fab: 100, chris: 108 }
  },
  {
    date: '05/01/2025',
    game: 'Saboteur',
    scores: { coco: 5, stacy: 5, fab: 6, chris: 6 }
  },
  {
    date: '05/01/2025',
    game: 'Love Letter',
    scores: { coco: 1, stacy: 1, fab: 2, chris: 1 }
  },
  {
    date: '05/01/2025',
    game: 'Once upon a draft',
    scores: { coco: 13.5, stacy: 13.5, fab: 17.5, chris: 9 }
  },
  {
    date: '19/01/2025',
    game: 'Chips',
    scores: { coco: '2 2', stacy: '2 4', fab: '4 5', chris: '5 1' }
  },
  {
    date: '19/01/2025',
    game: '6 qui prend',
    scores: { coco: 41, stacy: 33, fab: 55, chris: 72 }
  },
  {
    date: '16/02/2025',
    game: '5 alive',
    scores: { coco: 1, stacy: 1, fab: 1, chris: 1 }
  },
];

export const anecdotes: Anecdote[] = [
  {
    id: '1',
    date: '19 janvier 2025',
    badge: 'Nouvelle',
    content: 'Soirée JDS Olivia se gère toute seule ! 😂 !',
    photos: [{
      url: '/img/IMG_2185.JPG',
      caption: 'Elle étudie tous nos faits et gestes et se prépare à intégrer la team ! 😂'
    }]
  },
  {
    id: '2',
    date: '05 janvier 2025',
    badge: 'Épiphanie',
    content: 'Soirée JDS pour l\'épiphanie, avec une galette des rois sans fêve 😂 !! Première soirée de l\'année 2025 Bonne année !!',
    photos: [{
      url: '/img/Epiphanie.jpg',
      caption: 'Olivia se prépare à intégrer la team ! 😂'
    }]
  },
  {
    id: '3',
    date: '30 Octobre 2024',
    badge: 'Vidéo',
    content: 'Chris a eu un nouveau jeu pour son anniv surprise ! et un gateau basque ! vidéo souvenir !',
    video: {
      url: 'https://www.youtube.com/embed/5rMIRtOtW50',
      caption: 'Vidéo et musique de ouff 😂'
    }
  },
  {
    id: '4',
    date: '15 Octobre 2024',
    badge: 'Drôle',
    content: 'Coco a passé 15 minutes à expliquer une stratégie complexe au Saboteur... avant de réaliser qu\'elle était elle-même le saboteur ! 🤦‍♂️',
    photos: [{
      url: '/img/IMG_1607.JPG',
      caption: 'La tête de Coco quand elle a réalisé 😂'
    }]
  },
  {
    id: '5',
    date: '1 Octobre 2024',
    badge: 'Olivia',
    content: 'Olivia a décidé de "réorganiser" les cartes du Memory pendant qu\'on avait le dos tourné. Une nouvelle variante est née : le "Memory Surprise" ! 🎲',
    photos: [{
      url: '/img/C63C18B6-BF5B-43F5-9378-68921594D3A6.jpg',
      caption: 'Nos réactions'
    }]
  }
];

export const oliviaQuotes = [
  "C'est à mon tour !",
  "Je veux la carte avec le papillon !",
  "On peut jouer encore une fois ?",
  "C'est moi qui mélange !",
  "Je veux être la première !",
  "Pourquoi tu as gagné ?",
  "Encore une partie !",
  "C'est quoi cette carte ?",
  "Je peux t'aider ?",
];