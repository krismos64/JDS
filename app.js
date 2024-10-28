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

// Classe pour gérer l'état du jeu
class GameState {
  constructor() {
    this.isAdmin = false;
    this.currentGames = new Set([
      "Pioupiou",
      "Memory",
      "Cortex",
      "Saboteur",
      "6 qui prend",
    ]);
    this.scores = [];
    this.anecdotes = [];
  }

  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
    document.body.classList.toggle("admin-mode");
  }

  addScore(gameData) {
    this.scores.push(gameData);
    this.updateScoresDisplay();
  }

  addAnecdote(anecdoteData) {
    this.anecdotes.push(anecdoteData);
    this.updateAnecdotesDisplay();
  }
}

// Instance globale de l'état du jeu
const gameState = new GameState();

// Gestionnaire de modal
class ModalManager {
  constructor() {
    this.playerModal = document.getElementById("playerModal");
    this.formModal = document.getElementById("formModal");

    // Fermeture des modals en cliquant en dehors
    window.onclick = (event) => {
      if (event.target === this.playerModal) this.closePlayerModal();
      if (event.target === this.formModal) this.closeFormModal();
    };
  }

  showPlayerModal(playerDetails) {
    this.playerModal.style.display = "flex";
    gsap.from(".modal-content", {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      ease: "back.out",
    });
  }

  closePlayerModal() {
    gsap.to(".modal-content", {
      scale: 0.5,
      opacity: 0,
      duration: 0.3,
      ease: "back.in",
      onComplete: () => {
        this.playerModal.style.display = "none";
        gsap.set(".modal-content", { scale: 1, opacity: 1 });
      },
    });
  }

  showFormModal() {
    this.formModal.style.display = "flex";
  }

  closeFormModal() {
    this.formModal.style.display = "none";
  }
}

const modalManager = new ModalManager();

// Gestionnaire de dates
class DateManager {
  constructor() {
    this.startOliviaQuotes();
  }

  // Nouvelle méthode pour définir la date manuellement
  setNextGameDate(date) {
    const nextGameElement = document.getElementById("nextGameDate");
    if (!nextGameElement) return;

    try {
      const gameDate = new Date(date);
      const options = { weekday: "long", day: "numeric", month: "long" };
      nextGameElement.textContent = gameDate.toLocaleDateString(
        "fr-FR",
        options
      );
    } catch (error) {
      console.error("Format de date invalide:", error);
      nextGameElement.textContent = "Date à définir";
    }
  }

  startOliviaQuotes() {
    this.updateOliviaQuote();
    setInterval(() => this.updateOliviaQuote(), 5000);
  }

  updateOliviaQuote() {
    const quote = oliviaQuotes[Math.floor(Math.random() * oliviaQuotes.length)];
    const oliviaElement = document.getElementById("oliviaComment");
    if (oliviaElement) {
      oliviaElement.textContent = `"${quote}"`;
    }
  }
}

// Gestionnaire de formulaires
class FormManager {
  showAddGameForm() {
    const formContent = document.getElementById("formContent");
    formContent.innerHTML = `
            <h3>Ajouter une nouvelle partie</h3>
            <form onsubmit="handleGameSubmit(event)">
                <div class="form-group">
                    <label>Jeu</label>
                    <select name="game" required>
                        ${Array.from(gameState.currentGames)
                          .map(
                            (game) =>
                              `<option value="${game.toLowerCase()}">${game}</option>`
                          )
                          .join("")}
                    </select>
                </div>
                <div class="form-group">
                    <label>Scores</label>
                    <input type="number" name="score-coco" placeholder="Score Coco" required>
                    <input type="number" name="score-stacy" placeholder="Score Stacy" required>
                    <input type="number" name="score-fab" placeholder="Score Fab" required>
                    <input type="number" name="score-moutt" placeholder="Score Moutt" required>
                </div>
                <button type="submit" class="add-button">Enregistrer</button>
            </form>
        `;
    modalManager.showFormModal();
  }

  showAddAnecdoteForm() {
    const formContent = document.getElementById("formContent");
    formContent.innerHTML = `
            <h3>Ajouter une anecdote</h3>
            <form onsubmit="handleAnecdoteSubmit(event)">
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" name="date" required>
                </div>
                <div class="form-group">
                    <label>Anecdote</label>
                    <textarea name="content" required rows="4"></textarea>
                </div>
                <button type="submit" class="add-button">Enregistrer</button>
            </form>
        `;
    modalManager.showFormModal();
  }

  showAddPhotoForm() {
    const formContent = document.getElementById("formContent");
    formContent.innerHTML = `
            <h3>Ajouter des photos</h3>
            <form onsubmit="handlePhotoSubmit(event)">
                <div class="form-group">
                    <label>Soirée</label>
                    <input type="date" name="date" required>
                </div>
                <div class="form-group">
                    <label>Photo</label>
                    <input type="file" name="photo" accept="image/*" required>
                </div>
                <div class="form-group">
                    <label>Légende</label>
                    <input type="text" name="caption" required>
                </div>
                <button type="submit" class="add-button">Enregistrer</button>
            </form>
        `;
    modalManager.showFormModal();
  }
}

const formManager = new FormManager();

// Gestionnaire d'événements
function showPlayerDetails(playerId) {
  const player = playerDetails[playerId];
  const playerDetailsElement = document.getElementById("playerDetails");

  playerDetailsElement.innerHTML = `
        <h2>${player.name}</h2>
        <p style="margin: 1rem 0">${player.description}</p>
        <p><strong>Jeu préféré:</strong> ${player.favoriteGame}</p>
        <p><strong>Fun fact:</strong> ${player.funFact}</p>
    `;

  modalManager.showPlayerModal();
}

function handleGameSubmit(event) {
  event.preventDefault();
  // TODO: Implémenter la soumission du score
  modalManager.closeFormModal();
}

function handleAnecdoteSubmit(event) {
  event.preventDefault();
  // TODO: Implémenter la soumission de l'anecdote
  modalManager.closeFormModal();
}

function handlePhotoSubmit(event) {
  event.preventDefault();
  // TODO: Implémenter la soumission de la photo
  modalManager.closeFormModal();
}

// Gestionnaire de photos
class PhotoManager {
  constructor() {
    this.currentPhotoIndex = 0;
    this.photos = [];
    this.modal = document.getElementById("photoModal");
    this.modalImg = document.getElementById("modalPhoto");
    this.modalCaption = document.getElementById("modalCaption");

    // Gestion des touches clavier
    document.addEventListener("keydown", (e) => {
      if (this.modal.classList.contains("active")) {
        if (e.key === "Escape") this.closeModal();
        if (e.key === "ArrowLeft") this.navigate(-1);
        if (e.key === "ArrowRight") this.navigate(1);
      }
    });

    // Initialisation des photos
    this.initializePhotos();
  }

  initializePhotos() {
    // Collecte toutes les photos des anecdotes
    const photoElements = document.querySelectorAll(".anecdote-photo");
    photoElements.forEach((photo, index) => {
      const img = photo.querySelector("img");
      const caption = photo.querySelector(".photo-caption");

      this.photos.push({
        src: img.src,
        caption: caption ? caption.textContent : "",
      });

      // Ajoute le gestionnaire de clic
      photo.addEventListener("click", () => this.openModal(index));
    });
  }

  openModal(index) {
    this.currentPhotoIndex = index;
    this.updateModalContent();
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Empêche le scroll
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = ""; // Réactive le scroll
  }

  navigate(direction) {
    this.currentPhotoIndex =
      (this.currentPhotoIndex + direction + this.photos.length) %
      this.photos.length;
    this.updateModalContent();
  }

  updateModalContent() {
    const photo = this.photos[this.currentPhotoIndex];
    this.modalImg.src = photo.src;
    this.modalCaption.textContent = photo.caption;
  }
}

// Modification de la structure des anecdotes pour les photos
function createAnecdotePhotoElement(photo) {
  return `
      <div class="anecdote-photo">
          <img src="${photo.src}" alt="${photo.caption}">
          <div class="photo-caption">${photo.caption}</div>
      </div>
  `;
}

// Animation des citations d'Olivia avec fondu
function updateOliviaQuote() {
  const quoteElement = document.getElementById("oliviaComment");

  // Fade out
  quoteElement.style.opacity = "0";

  setTimeout(() => {
    // Change le texte
    const quote = oliviaQuotes[Math.floor(Math.random() * oliviaQuotes.length)];
    quoteElement.textContent = `"${quote}"`;

    // Fade in
    quoteElement.style.opacity = "1";
  }, 300);
}

// Animation au scroll
function initScrollAnimations() {
  const elements = document.querySelectorAll(".game-card, .anecdote-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.5s ease";
    observer.observe(element);
  });
}

// Animation des emojis dans les scores
function animateScoreEmojis() {
  const emojis = document.querySelectorAll(".score-table td:has(emoji)");

  emojis.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.style.transform = "scale(1.2) rotate(360deg)";
      setTimeout(() => {
        cell.style.transform = "scale(1) rotate(0deg)";
      }, 500);
    });
  });
}

// Animation du dé qui roule dans le titre
function animateDiceTitle() {
  const title = document.querySelector(".title");
  title.addEventListener("click", () => {
    title.style.animation = "none";
    requestAnimationFrame(() => {
      title.style.animation = "rollDice 1s ease-out";
    });
  });
}

// Animation des photos au hover avec effet parallax
function initPhotoParallax() {
  const photos = document.querySelectorAll(".anecdote-photo img");

  photos.forEach((photo) => {
    photo.parentElement.addEventListener("mousemove", (e) => {
      const rect = photo.parentElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      photo.style.transform = `
              scale(1.1)
              translateX(${x * 10}px)
              translateY(${y * 10}px)
          `;
    });

    photo.parentElement.addEventListener("mouseleave", () => {
      photo.style.transform = "scale(1) translateX(0) translateY(0)";
    });
  });
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  animateScoreEmojis();
  animateDiceTitle();
  initPhotoParallax();
});

// Initialisation du gestionnaire de photos
const photoManager = new PhotoManager();

// Export des fonctions pour l'utilisation globale
window.closePhotoModal = () => photoManager.closeModal();
window.navigatePhoto = (direction) => photoManager.navigate(direction);

// Initialisation
const dateManager = new DateManager();

// Export des fonctions pour l'utilisation globale
window.showPlayerDetails = showPlayerDetails;
window.showAddGameForm = () => formManager.showAddGameForm();
window.showAddAnecdoteForm = () => formManager.showAddAnecdoteForm();
window.showAddPhotoForm = () => formManager.showAddPhotoForm();
window.closeModal = () => modalManager.closePlayerModal();
window.closeFormModal = () => modalManager.closeFormModal();
window.handleGameSubmit = handleGameSubmit;
window.handleAnecdoteSubmit = handleAnecdoteSubmit;
window.handlePhotoSubmit = handlePhotoSubmit;
