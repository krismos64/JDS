// Configuration des joueurs
const playerDetails = {
  coco: {
    name: "Coco",
    description:
      "Elle adore lire les règles que personne ne comprend, c'est une experte en analyse de plateau qui peut passer 20 minutes à réfléchir à son coup... pour finalement jouer exactement ce qu'on lui avait suggéré au début ! 🤔 Détient le record du 'Ah mais si j'avais su...' le plus utilisé en une soirée.",
    favoriteGame: "Cortex",
    funFact: "A déjà gagné une partie sans comprendre les règles",
  },
  stacy: {
    name: "Stacy",
    description:
      "Reine incontestée du bluff, capable de faire croire qu'elle a une mauvaise main même quand elle gagne ! 🃏 Son rire contagieux peut déconcentrer les adversaires - technique secrète ?",
    favoriteGame: "Memory",
    funFact: "Se souvient de toutes les cartes sauf quand c'est son tour",
  },
  fab: {
    name: "Fab le kebab",
    description:
      "Le joueur qui arrive toujours avec des snacks et pizzas pour amadouer les autres. 🌯 Maître dans l'art de négocier des alliances... qu'il trahit systématiquement !",
    favoriteGame: "6 qui prend",
    funFact:
      "N'a jamais joué un seul tour sans dire 'Ah mais c'est pas ce que je voulais faire ça !'",
  },
  moutt: {
    name: "Moutt",
    description:
      "Le stratège silencieux qui ne dit rien pendant toute la partie... pour finalement révéler qu'il était le saboteur depuis le début ! 🕵️ Expert en analyse de ses adversaires, mais ne gagne jamais",
    favoriteGame: "Saboteur",
    funFact:
      "Capable de mélanger les cartes pendant 10 minutes pour 'être sûr que c'est bien mélangé'",
  },
};

// Citations d'Olivia
const oliviaQuotes = [
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

class ScoreTable {
  constructor() {
    this.initializeScoreTable();
  }

  initializeScoreTable() {
    const scoreTable = document.querySelector(".score-table");
    if (!scoreTable) return;

    // Trouver toutes les lignes du tableau sauf l'en-tête
    const rows = Array.from(scoreTable.querySelectorAll("tbody tr"));

    rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("td"));

      // Ignorer la date et le nom du jeu (les deux premières colonnes)
      const scoreCells = cells.slice(2);

      // Trouver le meilleur score de la ligne
      const numericScores = scoreCells
        .map((cell) => {
          const text = cell.textContent.trim();
          // Ignorer les médailles et convertir en nombre
          if (
            text.includes("🥇") ||
            text.includes("🥈") ||
            text.includes("🥉")
          ) {
            return -1;
          }
          return parseFloat(text) || -1;
        })
        .filter((score) => score >= 0);

      if (numericScores.length > 0) {
        const maxScore = Math.max(...numericScores);

        // Mettre en évidence les meilleurs scores
        scoreCells.forEach((cell) => {
          const score = parseFloat(cell.textContent);
          if (score === maxScore) {
            cell.classList.add("high-score");
          }
        });
      }

      // Ajouter des classes pour les médailles
      scoreCells.forEach((cell) => {
        const text = cell.textContent.trim();
        if (text.includes("🥇")) cell.classList.add("medal-gold");
        if (text.includes("🥈")) cell.classList.add("medal-silver");
        if (text.includes("🥉")) cell.classList.add("medal-bronze");
      });
    });
  }
}

class App {
  constructor() {
    this.modal = null;
    this.scoreTable = null;
    this.initializeEventListeners();
    this.startOliviaQuotes();
  }

  initializeEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      // Initialisation de la modale
      this.modal = document.getElementById("playerModal");

      // Initialisation du tableau des scores
      this.scoreTable = new ScoreTable();

      // Initialisation des cartes joueurs
      this.initializePlayerCards();

      // Initialisation des animations de scroll
      this.initScrollAnimations();

      // Fermeture de la modale en cliquant à l'extérieur
      window.onclick = (event) => {
        if (event.target === this.modal) {
          this.closeModal();
        }
      };

      // Gestion du bouton de fermeture de la modale
      const closeButton = document.querySelector(".close-modal");
      if (closeButton) {
        closeButton.addEventListener("click", () => this.closeModal());
      }

      // Gestion de la touche Echap pour fermer la modale
      document.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          this.modal &&
          this.modal.style.display === "flex"
        ) {
          this.closeModal();
        }
      });
    });
  }

  initializePlayerCards() {
    const memberPhotos = document.querySelectorAll(".member-photo");

    memberPhotos.forEach((photo) => {
      const img = photo.querySelector("img");
      if (!img) return;

      const altText = img.alt;
      const playerId = altText.replace("Photo de ", "").toLowerCase();

      // Trouver la carte parente
      const parentCard = photo.closest(".member-card") || photo.parentElement;
      if (parentCard) {
        // Ajouter l'événement sur toute la carte
        parentCard.addEventListener("click", (e) => {
          e.preventDefault();
          this.showPlayerDetails(playerId);
        });

        // Ajouter la classe pour les animations
        parentCard.classList.add("animated-card");
      }
    });
  }

  startOliviaQuotes() {
    this.updateOliviaQuote();
    setInterval(() => this.updateOliviaQuote(), 5000);
  }

  updateOliviaQuote() {
    const quoteElement = document.getElementById("oliviaComment");
    if (!quoteElement) return;

    const randomIndex = Math.floor(Math.random() * oliviaQuotes.length);
    const quote = oliviaQuotes[randomIndex];

    // Animation de transition
    quoteElement.style.opacity = "0";
    setTimeout(() => {
      quoteElement.textContent = `"${quote}"`;
      quoteElement.style.opacity = "1";
    }, 300);
  }

  showPlayerDetails(playerId) {
    const player = playerDetails[playerId];
    if (!player || !this.modal) return;

    const playerDetailsElement = document.getElementById("playerDetails");
    if (playerDetailsElement) {
      playerDetailsElement.innerHTML = `
        <h2 class="player-name">${player.name}</h2>
        <p class="player-description">${player.description}</p>
        <div class="player-info">
          <p><strong>Jeu préféré :</strong> ${player.favoriteGame}</p>
          <p><strong>Fun fact :</strong> ${player.funFact}</p>
        </div>
      `;
    }

    // Afficher et animer la modale
    this.modal.style.display = "flex";
    requestAnimationFrame(() => {
      this.modal.classList.add("active");
    });

    // Désactiver le scroll du body
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    if (!this.modal) return;

    this.modal.classList.remove("active");

    // Attendre la fin de l'animation avant de cacher
    setTimeout(() => {
      this.modal.style.display = "none";
      // Réactiver le scroll
      document.body.style.overflow = "";
    }, 300);
  }

  initScrollAnimations() {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observer les éléments qui doivent être animés
    document
      .querySelectorAll(".member-card, .game-card, .anecdote-card")
      .forEach((element) => observer.observe(element));
  }
}

// Création de l'instance unique
const app = new App();

// Export des fonctions globales nécessaires
window.showPlayerDetails = (playerId) => app.showPlayerDetails(playerId);
window.closeModal = () => app.closeModal();
