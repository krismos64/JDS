// Configuration des joueurs
const playerDetails = {
  coco: {
    name: "Coco",
    description:
      "Experte en analyse de plateau qui peut passer 20 minutes à réfléchir à son coup... pour finalement jouer exactement ce qu'on lui avait suggéré au début ! 🤔 Détient le record du 'Ah mais si j'avais su...' le plus utilisé en une soirée.",
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
      "Le joueur qui arrive toujours avec des snacks (devinez quoi ?) pour amadouer les autres. 🌯 Maître dans l'art de négocier des alliances... qu'il trahit systématiquement !",
    favoriteGame: "6 qui prend",
    funFact:
      "N'a jamais joué un seul tour sans dire 'Ah mais c'est pas ce que je voulais faire ça !'",
  },
  moutt: {
    name: "Moutt",
    description:
      "Le stratège silencieux qui ne dit rien pendant toute la partie... pour finalement révéler qu'il était le saboteur depuis le début ! 🕵️ Expert en poses de cartes dramatiques.",
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

class App {
  constructor() {
    this.initializeEventListeners();
    this.startOliviaQuotes();
  }

  initializeEventListeners() {
    // Gestion des modales
    this.modal = document.getElementById("playerModal");
    window.onclick = (event) => {
      if (event.target === this.modal) {
        this.closeModal();
      }
    };

    // Initialisation des cartes et animations
    document.addEventListener("DOMContentLoaded", () => {
      this.initializeCards();
      this.initScrollAnimations();
    });
  }

  startOliviaQuotes() {
    this.updateOliviaQuote();
    setInterval(() => this.updateOliviaQuote(), 5000);
  }

  updateOliviaQuote() {
    const quoteElement = document.getElementById("oliviaComment");
    if (!quoteElement) return;

    const quote = oliviaQuotes[Math.floor(Math.random() * oliviaQuotes.length)];

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
              <h2>${player.name}</h2>
              <p style="margin: 1rem 0">${player.description}</p>
              <p><strong>Jeu préféré:</strong> ${player.favoriteGame}</p>
              <p><strong>Fun fact:</strong> ${player.funFact}</p>
          `;
    }

    this.modal.style.display = "flex";

    if (window.gsap) {
      gsap.from(".modal-content", {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "back.out",
      });
    }
  }

  closeModal() {
    if (!this.modal) return;

    if (window.gsap) {
      gsap.to(".modal-content", {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: "back.in",
        onComplete: () => {
          this.modal.style.display = "none";
          gsap.set(".modal-content", { scale: 1, opacity: 1 });
        },
      });
    } else {
      this.modal.style.display = "none";
    }
  }

  initializeCards() {
    const cards = document.querySelectorAll(".member-card");

    cards.forEach((card) => {
      card.addEventListener("mouseover", () => {
        card.style.transform = "rotateY(10deg) scale(1.05)";
        card.style.boxShadow = "-10px 10px 20px rgba(0, 0, 0, 0.2)";
      });

      card.addEventListener("mouseout", () => {
        card.style.transform = "none";
        card.style.boxShadow = "none";
      });
    });
  }

  initScrollAnimations() {
    if (!window.gsap) return;

    const elements = document.querySelectorAll(
      ".game-card, .anecdote-card, .member-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(entry.target, {
              y: 50,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));
  }
}

// Création de l'instance unique
const app = new App();

// Export des fonctions globales
window.showPlayerDetails = (playerId) => app.showPlayerDetails(playerId);
window.closeModal = () => app.closeModal();
