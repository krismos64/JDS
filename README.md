Embrouille JDS - Site Web du Club de Jeux de Société 🎲
Description
Site web vitrine pour un club de 4 joueurs de jeux de société qui se réunissent régulièrement pour des soirées jeux. Le site est conçu pour être responsive, interactif et amusant, reflétant l'esprit convivial du groupe.
Fonctionnalités 🎮
Affichage Principal

Bannière animée avec le titre du club
Date de la prochaine soirée jeux
Citations aléatoires d'Olivia (la maîtresse du jeu de 2 ans)
Profils des joueurs avec photos et descriptions humoristiques

Section Joueurs

Coco: Experte en analyse de plateau
Stacy: Reine du bluff
Fab le kebab: Maître des alliances (et des trahisons)
Moutt: Le stratège silencieux

Section Jeux

Liste des jeux préférés
Records et statistiques par jeu
Derniers scores
Anecdotes des parties

Fonctionnalités Admin

Gestion des dates de soirées
Ajout de nouveaux scores
Publication d'anecdotes
Upload de photos
Gestion du contenu du site

Technologies Utilisées 💻

HTML5
CSS3 (avec variables CSS pour le thème)
JavaScript (ES6)
GSAP pour les animations
Design Responsive

Structure des Fichiers 📁
Copyembrouille-jds/
├── index.html # Structure principale du site
├── styles.css # Styles et mise en page
├── app.js # Logique JavaScript
├── img/ # Dossier des images
│ ├── profiles/ # Photos des joueurs
│ └── events/ # Photos des soirées
└── README.md # Documentation
Installation 🚀

Clonez le repository

bashCopygit clone https://github.com/votre-username/embrouille-jds.git

Ouvrez le dossier

bashCopycd embrouille-jds

Lancez un serveur local (par exemple avec Python)

bashCopypython -m http.server 8000

Ouvrez votre navigateur et accédez à

Copyhttp://localhost:8000
Mode Admin 👑
Pour accéder au mode administrateur :

Connectez-vous (fonctionnalité à implémenter)
Accédez aux fonctionnalités supplémentaires :

Gestion des dates
Ajout de scores
Publication d'anecdotes
Upload de photos

Personnalisation 🎨
Couleurs
Les couleurs du site sont définies dans les variables CSS :
cssCopy:root {
--primary: #ff6b6b; // Rouge-rose
--secondary: #4ecdc4; // Turquoise
--accent: #ffe66d; // Jaune
--dark: #2c3e50; // Bleu foncé
--light: #f7f9f9; // Blanc cassé
}
Ajout de Contenu

Les photos des joueurs doivent être au format jpg/png et de préférence carrées
Les anecdotes peuvent inclure des emojis
Les scores peuvent inclure des emojis pour les podiums (🥇, 🥈, 🥉)

Fonctionnalités à Venir 🚧

Système d'authentification pour le mode admin
Base de données pour stocker les scores et anecdotes
Statistiques avancées par joueur
Système de commentaires sur les parties
Calendrier interactif des soirées
Intégration avec un système de notifications

Développeur initial : [Mostefaoui Christophe]
Testeurs : Coco, Stacy, Fab le kebab, Moutt
