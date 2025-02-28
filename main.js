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
    this.scoreTable = document.querySelector(".score-table");
    this.sortDirection = {};
    this.initializeScoreTable();
    this.setupSorting();
    this.setupFilters();
  }

  initializeScoreTable() {
    if (!this.scoreTable) return;

    // Trouver toutes les lignes du tableau sauf l'en-tête
    const rows = Array.from(this.scoreTable.querySelectorAll("tbody tr"));

    rows.forEach((row, index) => {
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
        const minScore = Math.min(...numericScores);

        // Mettre en évidence les meilleurs scores
        scoreCells.forEach((cell) => {
          const score = parseFloat(cell.textContent);
          if (score === maxScore) {
            cell.classList.add("high-score");

            // Ajouter une couronne au meilleur score
            const crown = document.createElement("span");
            crown.className = "score-crown";
            crown.innerHTML = "👑";
            crown.style.fontSize = "0.8rem";
            crown.style.marginLeft = "5px";
            crown.style.opacity = "0";
            crown.style.transition = "all 0.5s ease";
            cell.appendChild(crown);

            // Animation de la couronne après un délai
            setTimeout(() => {
              crown.style.opacity = "1";
              crown.style.transform = "translateY(0) rotate(0deg)";
            }, 500 + index * 100);
          }

          // Ajouter une classe pour le score le plus bas
          if (score === minScore && numericScores.length > 1) {
            cell.classList.add("low-score");
          }
        });
      }

      // Ajouter des classes pour les médailles
      scoreCells.forEach((cell) => {
        const text = cell.textContent.trim();
        if (text.includes("🥇")) {
          cell.classList.add("medal-gold");
          this.addMedalAnimation(cell, "gold");
        }
        if (text.includes("🥈")) {
          cell.classList.add("medal-silver");
          this.addMedalAnimation(cell, "silver");
        }
        if (text.includes("🥉")) {
          cell.classList.add("medal-bronze");
          this.addMedalAnimation(cell, "bronze");
        }
      });

      // Ajouter un effet d'apparition progressive
      row.style.animationDelay = `${0.1 + index * 0.05}s`;
    });

    // Ajouter un effet de survol pour les lignes
    rows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        this.highlightRow(row);
      });

      row.addEventListener("mouseleave", () => {
        this.resetRowHighlight(row);
      });
    });
  }

  addMedalAnimation(cell, type) {
    // Créer un élément pour l'effet de brillance
    const shine = document.createElement("div");
    shine.className = `medal-shine medal-${type}-shine`;
    cell.appendChild(shine);

    // Animation de brillance aléatoire
    setInterval(() => {
      if (Math.random() > 0.7) {
        shine.style.opacity = "0.7";
        setTimeout(() => {
          shine.style.opacity = "0";
        }, 300);
      }
    }, 2000);
  }

  highlightRow(row) {
    // Mettre en évidence la ligne survolée
    const cells = Array.from(row.querySelectorAll("td"));

    cells.forEach((cell, index) => {
      // Animation différente pour chaque cellule
      cell.style.transform = "translateY(-3px)";
      cell.style.transitionDelay = `${index * 0.03}s`;
    });

    // Mettre en évidence les colonnes correspondantes dans l'en-tête
    const headers = Array.from(this.scoreTable.querySelectorAll("th"));
    headers.forEach((header, index) => {
      if (index < cells.length) {
        header.classList.add("column-highlight");
        header.style.transitionDelay = `${index * 0.03}s`;
      }
    });
  }

  resetRowHighlight(row) {
    // Réinitialiser les styles de la ligne
    const cells = Array.from(row.querySelectorAll("td"));

    cells.forEach((cell) => {
      cell.style.transform = "";
      cell.style.transitionDelay = "";
    });

    // Réinitialiser les styles de l'en-tête
    const headers = Array.from(this.scoreTable.querySelectorAll("th"));
    headers.forEach((header) => {
      header.classList.remove("column-highlight");
      header.style.transitionDelay = "";
    });
  }

  setupSorting() {
    if (!this.scoreTable) return;

    // Ajouter des icônes de tri aux en-têtes
    const headers = Array.from(this.scoreTable.querySelectorAll("th"));

    headers.forEach((header, index) => {
      // Initialiser la direction de tri
      this.sortDirection[index] = "none";

      // Ajouter une icône de tri
      const sortIcon = document.createElement("span");
      sortIcon.className = "sort-icon";
      sortIcon.innerHTML = "⇅";
      sortIcon.style.marginLeft = "5px";
      sortIcon.style.fontSize = "0.8rem";
      sortIcon.style.opacity = "0.5";
      header.appendChild(sortIcon);

      // Ajouter un événement de clic pour le tri
      header.addEventListener("click", () => {
        this.sortTable(index);
      });
    });
  }

  sortTable(columnIndex) {
    if (!this.scoreTable) return;

    const tbody = this.scoreTable.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    // Mettre à jour la direction de tri
    if (
      this.sortDirection[columnIndex] === "none" ||
      this.sortDirection[columnIndex] === "desc"
    ) {
      this.sortDirection[columnIndex] = "asc";
    } else {
      this.sortDirection[columnIndex] = "desc";
    }

    // Réinitialiser les autres directions de tri
    Object.keys(this.sortDirection).forEach((key) => {
      if (parseInt(key) !== columnIndex) {
        this.sortDirection[key] = "none";
      }
    });

    // Mettre à jour les icônes de tri
    const headers = Array.from(this.scoreTable.querySelectorAll("th"));
    headers.forEach((header, index) => {
      const sortIcon = header.querySelector(".sort-icon");
      if (index === columnIndex) {
        sortIcon.innerHTML =
          this.sortDirection[columnIndex] === "asc" ? "↑" : "↓";
        sortIcon.style.opacity = "1";
      } else {
        sortIcon.innerHTML = "⇅";
        sortIcon.style.opacity = "0.5";
      }
    });

    // Trier les lignes
    rows.sort((a, b) => {
      let aValue = a.querySelectorAll("td")[columnIndex].textContent.trim();
      let bValue = b.querySelectorAll("td")[columnIndex].textContent.trim();

      // Convertir en nombres si possible
      if (!isNaN(parseFloat(aValue))) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      // Gérer les médailles pour le tri
      if (typeof aValue === "string") {
        if (aValue.includes("🥇")) aValue = "999999";
        if (aValue.includes("🥈")) aValue = "999998";
        if (aValue.includes("🥉")) aValue = "999997";
      }

      if (typeof bValue === "string") {
        if (bValue.includes("🥇")) bValue = "999999";
        if (bValue.includes("🥈")) bValue = "999998";
        if (bValue.includes("🥉")) bValue = "999997";
      }

      // Comparer les valeurs
      if (aValue < bValue) {
        return this.sortDirection[columnIndex] === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection[columnIndex] === "asc" ? 1 : -1;
      }
      return 0;
    });

    // Réorganiser les lignes dans le tableau
    rows.forEach((row) => {
      tbody.appendChild(row);
    });

    // Animer les lignes après le tri
    rows.forEach((row, index) => {
      row.style.opacity = "0";
      row.style.transform = "translateY(-10px)";

      setTimeout(() => {
        row.style.transition = "all 0.3s ease";
        row.style.opacity = "1";
        row.style.transform = "translateY(0)";
      }, 50 * index);
    });
  }

  setupFilters() {
    if (!this.scoreTable) return;

    // Créer un conteneur pour les filtres
    const filterContainer = document.createElement("div");
    filterContainer.className = "score-filters";
    filterContainer.style.margin = "1rem 0";
    filterContainer.style.display = "flex";
    filterContainer.style.flexWrap = "wrap";
    filterContainer.style.gap = "0.5rem";

    // Ajouter un titre pour les filtres
    const filterTitle = document.createElement("div");
    filterTitle.textContent = "Filtrer par jeu:";
    filterTitle.style.marginRight = "1rem";
    filterTitle.style.fontWeight = "600";
    filterContainer.appendChild(filterTitle);

    // Collecter tous les noms de jeux uniques
    const gameNames = new Set();
    const rows = Array.from(this.scoreTable.querySelectorAll("tbody tr"));

    rows.forEach((row) => {
      const gameName = row.querySelectorAll("td")[1].textContent.trim();
      gameNames.add(gameName);
    });

    // Ajouter un bouton pour "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.className = "filter-button active";
    allButton.style.padding = "0.3rem 0.8rem";
    allButton.style.borderRadius = "20px";
    allButton.style.border = "none";
    allButton.style.background = "var(--primary)";
    allButton.style.color = "white";
    allButton.style.cursor = "pointer";
    allButton.style.transition = "all 0.3s ease";

    allButton.addEventListener("click", () => {
      // Réinitialiser tous les filtres
      const filterButtons = filterContainer.querySelectorAll(".filter-button");
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      allButton.classList.add("active");

      // Afficher toutes les lignes
      rows.forEach((row) => {
        row.style.display = "";

        // Animation de réapparition
        row.style.opacity = "0";
        row.style.transform = "translateX(-10px)";

        setTimeout(() => {
          row.style.opacity = "1";
          row.style.transform = "translateX(0)";
        }, 50);
      });
    });

    filterContainer.appendChild(allButton);

    // Ajouter un bouton pour chaque jeu
    gameNames.forEach((game) => {
      const button = document.createElement("button");
      button.textContent = game;
      button.className = "filter-button";
      button.style.padding = "0.3rem 0.8rem";
      button.style.borderRadius = "20px";
      button.style.border = "none";
      button.style.background = "rgba(255, 255, 255, 0.1)";
      button.style.color = "white";
      button.style.cursor = "pointer";
      button.style.transition = "all 0.3s ease";

      button.addEventListener("mouseenter", () => {
        if (!button.classList.contains("active")) {
          button.style.background = "rgba(255, 255, 255, 0.2)";
        }
      });

      button.addEventListener("mouseleave", () => {
        if (!button.classList.contains("active")) {
          button.style.background = "rgba(255, 255, 255, 0.1)";
        }
      });

      button.addEventListener("click", () => {
        // Mettre à jour les boutons actifs
        const filterButtons =
          filterContainer.querySelectorAll(".filter-button");
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        button.style.background = "var(--primary)";

        // Filtrer les lignes
        rows.forEach((row) => {
          const gameName = row.querySelectorAll("td")[1].textContent.trim();

          if (gameName === game) {
            row.style.display = "";

            // Animation d'apparition
            row.style.opacity = "0";
            row.style.transform = "translateX(-10px)";

            setTimeout(() => {
              row.style.opacity = "1";
              row.style.transform = "translateX(0)";
            }, 50);
          } else {
            row.style.display = "none";
          }
        });
      });

      filterContainer.appendChild(button);
    });

    // Insérer le conteneur de filtres avant le tableau
    const tableWrapper = this.scoreTable.closest(".score-table-wrapper");
    if (tableWrapper) {
      tableWrapper.parentNode.insertBefore(filterContainer, tableWrapper);
    }
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
    this.notification = document.getElementById("audio-notification");
    this.isPlaying = false;
    this.initializeAudio();
  }

  initializeAudio() {
    if (!this.audio || !this.toggleButton) return;

    // Ajouter un événement pour démarrer la musique automatiquement
    // lorsque l'utilisateur interagit avec la page
    const startAudioOnInteraction = () => {
      // Jouer la musique automatiquement
      this.playAudio();

      // Masquer la notification
      this.hideNotification();

      // Supprimer les écouteurs d'événements une fois la musique démarrée
      document.removeEventListener("click", startAudioOnInteraction);
      document.removeEventListener("touchstart", startAudioOnInteraction);
      document.removeEventListener("keydown", startAudioOnInteraction);
      document.removeEventListener("scroll", startAudioOnInteraction);
    };

    // Ajouter des écouteurs pour diverses interactions utilisateur
    document.addEventListener("click", startAudioOnInteraction, { once: true });
    document.addEventListener("touchstart", startAudioOnInteraction, {
      once: true,
    });
    document.addEventListener("keydown", startAudioOnInteraction, {
      once: true,
    });
    document.addEventListener("scroll", startAudioOnInteraction, {
      once: true,
    });

    // Ajouter l'événement de clic sur le bouton pour basculer l'audio
    this.toggleButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Empêcher la propagation pour éviter de déclencher startAudioOnInteraction
      this.toggleAudio();
      this.hideNotification();
    });

    // Gérer les erreurs de lecture audio
    this.audio.addEventListener("error", (e) => {
      console.error("Erreur de lecture audio:", e);
      this.isPlaying = false;
      this.updateButtonState();
    });
  }

  hideNotification() {
    if (this.notification) {
      this.notification.classList.add("hide");
      // Supprimer complètement après l'animation
      setTimeout(() => {
        if (this.notification && this.notification.parentNode) {
          this.notification.parentNode.removeChild(this.notification);
        }
      }, 500);
    }
  }

  playAudio() {
    // Vérifier si l'audio peut être joué
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Lecture démarrée avec succès
          this.isPlaying = true;
          this.updateButtonState();
          console.log("Musique démarrée automatiquement");
        })
        .catch((error) => {
          // La lecture automatique a été empêchée
          console.warn(
            "Lecture audio automatique bloquée par le navigateur:",
            error
          );
          this.isPlaying = false;
          this.updateButtonState();
        });
    }
  }

  toggleAudio() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
          })
          .catch((error) => {
            console.warn("Erreur lors de la lecture audio:", error);
            this.isPlaying = false;
          });
      }
    }

    this.updateButtonState();
  }

  updateButtonState() {
    if (this.isPlaying) {
      this.toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      this.toggleButton.classList.add("playing");
      this.toggleButton.setAttribute("title", "Couper le son");
    } else {
      this.toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
      this.toggleButton.classList.remove("playing");
      this.toggleButton.setAttribute("title", "Activer le son");
    }
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
