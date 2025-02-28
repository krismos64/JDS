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

class LottieAnimations {
  constructor() {
    this.animations = {};
    this.initializeAnimations();
  }

  initializeAnimations() {
    // Animation de combat
    this.animations.fight = lottie.loadAnimation({
      container: document.getElementById("fight-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "animations/fight.json",
    });

    // Animation de coca
    this.animations.coca = lottie.loadAnimation({
      container: document.getElementById("coca-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "animations/coca.json",
    });

    // Animation de podium
    this.animations.podium = lottie.loadAnimation({
      container: document.getElementById("podium-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "animations/podium.json",
    });

    // Animation de coca dans la navigation
    this.animations.navCoca = lottie.loadAnimation({
      container: document.getElementById("nav-coca-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "animations/coca.json",
    });

    // Ajuster la vitesse des animations
    this.animations.fight.setSpeed(0.8);
    this.animations.coca.setSpeed(0.9);
    this.animations.podium.setSpeed(0.7);
    this.animations.navCoca.setSpeed(0.7);
  }

  pauseAll() {
    Object.values(this.animations).forEach((animation) => animation.pause());
  }

  playAll() {
    Object.values(this.animations).forEach((animation) => animation.play());
  }
}

class AudioPlayer {
  constructor() {
    this.audio = document.getElementById("theme-song");
    this.toggleButton = document.getElementById("toggle-audio");
    this.isPlaying = false;
    this.initializeAudio();
  }

  initializeAudio() {
    if (!this.audio || !this.toggleButton) return;

    this.toggleButton.addEventListener("click", () => this.toggleAudio());
  }

  toggleAudio() {
    if (this.isPlaying) {
      this.audio.pause();
      this.toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
      this.toggleButton.classList.remove("playing");
    } else {
      this.audio.play();
      this.toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      this.toggleButton.classList.add("playing");
    }
    this.isPlaying = !this.isPlaying;
  }
}

class Navigation {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-link");
    this.sections = document.querySelectorAll(".section-container");
    this.backToTopButton = document.getElementById("back-to-top");
    this.burgerMenu = document.getElementById("burger-menu");
    this.mainNav = document.getElementById("main-nav");
    this.navOverlay = document.getElementById("nav-overlay");
    this.navCocaAnimation = document.getElementById("nav-coca-animation");
    this.initializeNavigation();
    this.initializeMobileMenu();
    this.setActiveNavLink();
  }

  // Méthode dédiée pour le défilement vers une section
  scrollToSection(targetSection, activeLink = null) {
    if (!targetSection) return;

    // Ajuster le décalage en fonction de la taille de l'écran
    const offset = window.innerWidth <= 768 ? 20 : 60;

    // Calculer la position de la section cible
    const targetPosition =
      targetSection.getBoundingClientRect().top + window.pageYOffset - offset;

    // Utiliser scrollTo pour un défilement fluide
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Mettre à jour la classe active si un lien est fourni
    if (activeLink) {
      this.navLinks.forEach((l) => l.classList.remove("active"));
      activeLink.classList.add("active");
    }
  }

  initializeNavigation() {
    // Gestion des liens de navigation
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");

        // S'assurer que le targetId est valide
        if (!targetId || targetId === "#") return;

        const targetSection = document.querySelector(targetId);

        // Log pour débogage
        console.log(
          `Clic sur lien: ${targetId}, Section trouvée: ${
            targetSection ? "Oui" : "Non"
          }`
        );

        if (targetSection) {
          // Vérifier si le menu mobile est ouvert
          const isMobileMenuOpen = this.mainNav.classList.contains("active");

          if (isMobileMenuOpen) {
            // Fermer le menu mobile d'abord
            this.closeMenu();

            // Attendre la fin de l'animation avant de défiler
            setTimeout(() => {
              this.scrollToSection(targetSection, link);
            }, 350);
          } else {
            // Défiler immédiatement si le menu n'est pas ouvert
            this.scrollToSection(targetSection, link);
          }
        }
      });
    });

    // Gestion du bouton retour en haut
    if (this.backToTopButton) {
      this.backToTopButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Afficher/masquer le bouton en fonction du scroll
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          this.backToTopButton.classList.add("visible");
        } else {
          this.backToTopButton.classList.remove("visible");
        }
      });
    }

    // Observer les sections pour mettre à jour la navigation
    this.setupSectionObserver();
  }

  initializeMobileMenu() {
    if (!this.burgerMenu || !this.mainNav || !this.navOverlay) return;

    // Afficher l'animation Coca dans la navigation sur mobile
    this.checkScreenSize();
    window.addEventListener("resize", () => this.checkScreenSize());

    // Gestion du menu burger
    this.burgerMenu.addEventListener("click", () => this.toggleMenu());

    // Fermer le menu en cliquant sur l'overlay
    this.navOverlay.addEventListener("click", () => this.closeMenu());

    // Ajouter des logs de débogage pour les clics sur les liens en mode mobile
    if (window.innerWidth <= 992) {
      console.log("Mode mobile détecté, ajout de logs de débogage");
      this.navLinks.forEach((link) => {
        link.addEventListener(
          "touchstart",
          () => {
            console.log(`Touchstart sur lien: ${link.getAttribute("href")}`);
          },
          { passive: true }
        );
      });
    }

    // Fermer le menu avec la touche Echap
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.mainNav.classList.contains("active")) {
        this.closeMenu();
      }
    });
  }

  setActiveNavLink() {
    // Définir le premier lien (Vidéo) comme actif par défaut
    if (this.navLinks && this.navLinks.length > 0) {
      this.navLinks.forEach((link) => link.classList.remove("active"));
      this.navLinks[0].classList.add("active");

      // Vérifier si l'URL contient un hash et activer le lien correspondant
      const hash = window.location.hash;
      if (hash) {
        const activeLink = Array.from(this.navLinks).find(
          (link) => link.getAttribute("href") === hash
        );

        if (activeLink) {
          this.navLinks.forEach((link) => link.classList.remove("active"));
          activeLink.classList.add("active");

          // Faire défiler vers la section après un court délai
          setTimeout(() => {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
              this.scrollToSection(targetSection, activeLink);
            }
          }, 300);
        }
      }
    }
  }

  checkScreenSize() {
    const isMobile = window.innerWidth <= 992;

    // Afficher ou masquer le bouton burger
    if (this.burgerMenu) {
      this.burgerMenu.style.display = isMobile ? "flex" : "none";
    }

    // Gérer l'animation Coca dans la navigation
    if (this.navCocaAnimation) {
      this.navCocaAnimation.style.display = isMobile ? "block" : "none";
    }

    // S'assurer que le menu est correctement affiché selon la taille d'écran
    if (!isMobile) {
      // Sur desktop, s'assurer que le menu est visible et réinitialiser les styles
      if (this.mainNav) {
        this.mainNav.classList.remove("active");
        this.mainNav.querySelector("ul").style.left = "";
      }

      if (this.navOverlay) {
        this.navOverlay.classList.remove("active");
      }

      // Réactiver le défilement
      document.body.style.overflow = "";
    } else {
      // Sur mobile, s'assurer que le menu est initialement caché
      if (this.mainNav && !this.mainNav.classList.contains("active")) {
        this.mainNav.querySelector("ul").style.left = "-100%";
      }
    }
  }

  toggleMenu() {
    if (this.mainNav.classList.contains("active")) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (!this.mainNav || !this.burgerMenu || !this.navOverlay) return;

    // Activer l'overlay d'abord pour une transition plus fluide
    this.navOverlay.classList.add("active");

    // Activer le menu et le bouton burger
    this.mainNav.classList.add("active");
    this.burgerMenu.classList.add("active");

    // Empêcher le défilement du body
    document.body.style.overflow = "hidden";

    // Animer l'entrée du menu
    const menuUl = this.mainNav.querySelector("ul");
    if (menuUl) {
      // Forcer un reflow pour que la transition s'applique
      void menuUl.offsetWidth;
      menuUl.style.left = "0";
    }
  }

  closeMenu() {
    if (!this.mainNav || !this.burgerMenu || !this.navOverlay) return;

    // Vérifier si le menu est déjà fermé
    if (!this.mainNav.classList.contains("active")) return;

    // Désactiver le bouton burger
    this.burgerMenu.classList.remove("active");

    // Animer la sortie du menu
    const menuUl = this.mainNav.querySelector("ul");
    if (menuUl) {
      menuUl.style.left = "-100%";
    }

    // Désactiver immédiatement les événements de clic sur le menu
    if (menuUl) {
      menuUl.style.pointerEvents = "none";
    }

    // Attendre la fin de l'animation avant de masquer l'overlay
    setTimeout(() => {
      this.mainNav.classList.remove("active");
      this.navOverlay.classList.remove("active");

      // Réactiver le défilement et les événements
      document.body.style.overflow = "";
      if (menuUl) {
        menuUl.style.pointerEvents = "";
      }
    }, 300); // Durée correspondant à la transition CSS
  }

  setupSectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        // Filtrer les sections visibles
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: entry.target.getAttribute("id"),
            ratio: entry.intersectionRatio,
            element: entry.target,
          }))
          .sort((a, b) => b.ratio - a.ratio);

        // Si au moins une section est visible
        if (visibleSections.length > 0) {
          // Prendre la section la plus visible (celle avec le plus grand ratio)
          const mostVisibleSection = visibleSections[0];

          // Mettre à jour les liens actifs sans déclencher d'événements
          this.navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${mostVisibleSection.id}`) {
              if (!link.classList.contains("active")) {
                link.classList.add("active");
              }
            } else {
              link.classList.remove("active");
            }
          });

          // Mettre à jour l'URL sans déclencher de défilement
          if (history.replaceState && mostVisibleSection.id) {
            history.replaceState(null, null, `#${mostVisibleSection.id}`);
          }
        }
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: "-80px 0px -20% 0px",
      }
    );

    this.sections.forEach((section) => observer.observe(section));
  }
}

class App {
  constructor() {
    this.modal = null;
    this.scoreTable = null;
    this.lottieAnimations = null;
    this.audioPlayer = null;
    this.navigation = null;
    this.initializeEventListeners();
    this.startOliviaQuotes();
  }

  initializeEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      // Initialisation de la modale
      this.modal = document.getElementById("playerModal");

      // Initialisation du tableau des scores
      this.scoreTable = new ScoreTable();

      // Initialisation des animations Lottie
      this.lottieAnimations = new LottieAnimations();

      // Initialisation du lecteur audio
      this.audioPlayer = new AudioPlayer();

      // Initialisation de la navigation
      this.navigation = new Navigation();

      // Initialisation des cartes joueurs
      this.initializePlayerCards();

      // Initialisation des animations de scroll
      this.initScrollAnimations();

      // Amélioration de la vidéo YouTube
      this.enhanceYouTubeVideo();

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

  enhanceYouTubeVideo() {
    // Ajouter un effet de pulsation à la vidéo de présentation
    const featuredVideo = document.querySelector(".featured-video");
    if (featuredVideo) {
      // Ajouter une classe pour attirer l'attention
      setTimeout(() => {
        featuredVideo.classList.add("pulsing");

        // Arrêter l'animation après quelques secondes
        setTimeout(() => {
          featuredVideo.classList.remove("pulsing");
        }, 3000);
      }, 1000);
    }
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
      .querySelectorAll(
        ".member-card, .game-card, .anecdote-card, .section-container, .featured-video"
      )
      .forEach((element) => observer.observe(element));
  }
}

// Création de l'instance unique
const app = new App();

// Export des fonctions globales nécessaires
window.showPlayerDetails = (playerId) => app.showPlayerDetails(playerId);
window.closeModal = () => app.closeModal();
