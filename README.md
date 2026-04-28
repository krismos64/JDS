# 🎲 Embrouille JDS - Gaming Experience 2.0

Site web futuriste mobile-first pour le club de jeux de société "Embrouille JDS", repensé avec une approche carrousel-tab-bar et une identité visuelle gaming/cyberpunk.

🔗 **Site en production** : [https://embrouille-jds.netlify.app](https://embrouille-jds.netlify.app)
👨‍💻 **Développeur** : [Christophe - Freelance Full Stack](https://christophe-dev-freelance.fr)
📦 **Repository** : [GitHub - krismos64/JDS](https://github.com/krismos64/JDS)
🚀 **Hébergement** : Netlify (déploiement continu depuis GitHub)

## 🚀 Technologies

### Frontend
- **Next.js 15.5.15** - App Router (patch sécurité CVE-2025-55182)
- **React 19.1** - Dernière version stable
- **TypeScript 5** - Typage statique strict
- **Tailwind CSS 4** - Framework CSS moderne (avec `@tailwindcss/postcss`)
- **Lottie React** - Animations vectorielles (Lottie chargé en dynamic import pour éviter SSR)
- **Framer Motion** - Animations React déclaratives (admin)
- **GSAP** - Animations JavaScript avancées
- **Lucide React** - Icônes

### Authentification & Sécurité
- **bcryptjs** - Hash des mots de passe admin
- **jose** - JWT signés en cookies httpOnly
- **Middleware Next.js** - Protection des routes `/admin/*` et `/api/admin/*`

### Optimisation
- **PWA Ready** - `next-pwa` configuré
- **SEO Maximal** - Métadonnées + sitemap dynamique
- **Performance** - First Load 122 kB
- **Mobile-first** - Tab bar fixe, particules désactivées sur mobile
- **Accessibility** - WCAG 2.1 AA, support `prefers-reduced-motion`
- **SSR Compatible** - Vérifications `typeof window !== 'undefined'`

## 🎮 Fonctionnalités Gaming

### 🎨 **Design System Futuriste**
- **Palette néon** : Cyan, Magenta, Vert électrique, Jaune néon
- **Effets visuels** : Hologrammes, glitch, cyber-glow, scan lines
- **Glass morphism** : Cartes translucides avec backdrop-blur
- **Typographie gaming** : Police mono, textes holographiques

### 📱 **Mobile-First Experience**
- **BottomTabBar fixe** : 5 onglets (Next / Team / Score / Stories / Admin)
- **Détection automatique** de la section active au scroll
- **Carrousel snap horizontal** pour la section Team
- **Cartes verticales** au lieu de tableau scrollable pour le Leaderboard
- **Modal photo plein écran** sur les Stories
- **Safe area** support pour iPhone X+

### 🎬 **Animations & Effets**
- **Particules canvas** dynamiques (desktop uniquement, désactivées si `prefers-reduced-motion`)
- **Lottie animations** : Fight, Coca-Cola, Podium
- **CSS animations** : Neon pulse, cyber glow, hologram, glitch
- **Countdown live** : la prochaine partie se met à jour chaque seconde (JJ:HH:MM:SS)

### ⚡ **Performance & SEO**
- **122 kB First Load** sur la page d'accueil
- **Static generation** : 10 pages statiques pré-générées
- **API routes dynamiques** : 21 routes server-side
- **PWA installable** mobile

## 🗂️ Sections de la page principale

L'ordre est pensé pour que les membres trouvent l'info la plus utile en premier :

1. **Hero** - Bannière "Team JDS" responsive (paysage desktop / portrait mobile via `<picture>`)
2. **Next Game** - Date de la prochaine soirée + countdown live JJ:HH:MM:SS
3. **Team** - Carrousel des 4 joueurs (mobile) / grille (desktop) + photo de groupe
4. **Leaderboard** - Cartes mobile-first + classement général en podium
5. **Games** - Ludothèque filtrable (Tous / Champions / Records)
6. **Stories** - Souvenirs des soirées avec photos et vidéos YouTube intégrées
7. **Video** - Lecteur unique avec playlist YouTube sélectionnable

## 🛠️ Installation

### Prérequis
- Node.js 20 LTS (version spécifiée dans `.nvmrc`)
- npm 9+ ou yarn
- Git

### Installation locale

```bash
# Cloner le projet
git clone https://github.com/krismos64/JDS.git
cd JDS

# Utiliser la bonne version de Node (si vous avez nvm)
nvm use

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
# Note: démarre sur le port 3001 si 3000 est occupé

# Build pour production
npm run build
npm run start

# Linter
npm run lint
```

### Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# Configuration locale
NEXT_PUBLIC_SITE_URL=http://localhost:3001
JWT_SECRET=your-local-secret-key

# Optionnel
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=
```

⚠️ **Important** : Ne jamais commiter le fichier `.env.local`

## 📁 Structure du projet

```
JDS/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout racine + SEO
│   ├── page.tsx                  # Page d'accueil (orchestre les sections)
│   ├── sitemap.ts                # Sitemap dynamique
│   ├── globals.css               # Styles globaux + utilitaires (.scrollbar-hide, safe-area)
│   ├── admin/                    # Interface admin (protégée)
│   │   ├── layout.tsx            # Sidebar + nav mobile
│   │   ├── page.tsx              # Dashboard
│   │   ├── login/                # Login JWT
│   │   ├── next-game/            # Édition prochaine soirée
│   │   ├── members/              # CRUD membres
│   │   ├── games/                # CRUD jeux
│   │   ├── scores/               # CRUD parties
│   │   ├── anecdotes/            # CRUD anecdotes
│   │   └── olivia/               # Citations Olivia
│   └── api/                      # Routes API
│       ├── admin/                # API admin protégées (CRUD)
│       │   ├── next-game/        # GET/PUT prochaine partie
│       │   ├── members/, games/, scores/, anecdotes/, olivia-quotes/
│       │   └── stats/            # Statistiques dashboard
│       ├── auth/                 # login/logout/session JWT
│       ├── next-game/            # API publique (lue par le site)
│       └── members/, games/, scores/, anecdotes/, olivia-quotes/
├── components/                   # Composants React
│   ├── FuturisticHeader.tsx      # Hero avec bannière responsive
│   ├── BottomTabBar.tsx          # Nav fixe mobile-first 5 onglets
│   ├── NextGameSection.tsx       # Countdown live (JJ:HH:MM:SS)
│   ├── TeamSection.tsx           # Carrousel + grille membres
│   ├── LeaderboardSection.tsx    # Cartes mobile / tableau desktop
│   ├── GamesSection.tsx          # Ludothèque avec filtres
│   ├── StoriesSection.tsx        # Souvenirs immersifs
│   ├── VideoSection.tsx          # Lecteur YouTube + playlist
│   ├── ParticleBackground.tsx    # Canvas (désactivé mobile + reduced-motion)
│   ├── AudioPlayerAdvanced.tsx   # Lecteur audio bottom-left
│   ├── BackToTop.tsx             # Bouton retour haut
│   ├── PlayerModal.tsx           # Modal profil joueur
│   ├── PodiumAnimation.tsx       # Lottie podium
│   ├── CocaAnimation.tsx         # Lottie Coca-Cola
│   └── admin/                    # Composants admin (FuturisticCard, Button, Background)
├── lib/                          # Logique métier
│   ├── types.ts                  # Types TypeScript (Member, Game, Score, Anecdote, NextGame)
│   ├── staticData.ts             # Données statiques côté client
│   ├── dataLoader.ts             # Lecture/écriture JSON côté server
│   ├── auth.ts                   # JWT + bcrypt
│   └── utils.ts                  # Helpers
├── data/                         # Données JSON éditables via admin
│   ├── members.json              # Membres du club
│   ├── games.json                # Liste des jeux
│   ├── scores.json               # Historique scores
│   ├── anecdotes.json            # Anecdotes + citations Olivia
│   └── nextGame.json             # Prochaine soirée (date, displayDate, highlight, isActive)
├── public/                       # Assets statiques
│   ├── img/                      # Images (bannière Team JDS desktop+mobile, photos)
│   ├── audio/                    # Embrouille-JDS.mp3
│   ├── animations/               # Lottie JSON (fight, coca, podium)
│   └── favicon/                  # Favicons multi-plateformes
├── middleware.ts                 # Protection routes /admin/* et /api/admin/*
├── netlify.toml                  # Configuration Netlify
└── tailwind.config.ts            # Config Tailwind CSS
```

## 🔐 Zone Admin

Accès : `/admin` (authentification requise via `/admin/login`)

### Fonctionnalités

| Section | Route | Description |
|---------|-------|-------------|
| 📊 Dashboard | `/admin` | Vue d'ensemble + stats temps réel |
| 📅 Next Game | `/admin/next-game` | Date, texte affiché, highlight, toggle visibilité |
| 👥 Membres | `/admin/members` | CRUD profils des 4 joueurs |
| 🎲 Jeux | `/admin/games` | CRUD catalogue de jeux |
| 🏆 Scores | `/admin/scores` | CRUD historique des parties |
| 📖 Anecdotes | `/admin/anecdotes` | CRUD souvenirs avec photos/vidéos |
| 💬 Olivia | `/admin/olivia` | CRUD citations cultes |

### Section Next Game éditable

L'admin peut modifier en temps réel :
- 📅 Date de la prochaine partie (alimente le countdown live)
- ✨ Texte affiché en gros (ex: "MAI 2026")
- 💬 Phrase d'accroche (ex: "OLIVIA SERA PRÉSENTE!")
- 👁️ Toggle visibilité (masque la section sur le site public)

## 🎨 Personnalisation

### Theme Gaming (tailwind.config.ts)

#### Couleurs principales
- `neon-cyan`: #00ffff
- `neon-magenta`: #ff00ff
- `neon-green`: #39ff14
- `neon-yellow`: #ffff00
- `dark-bg`: #0a0a0a
- `glass`: rgba(255,255,255,0.1)

#### Effets visuels
- **Neon Glow** : Box-shadow personnalisés
- **Glass Morphism** : Backdrop-filter blur
- **Hologram** : Gradient multi-couleurs animé
- **Cyber Glow** : Lueur pulsante autour des cartes

## 🚀 Déploiement

### Netlify (Production) ✅

#### Configuration automatique
- **Déploiement continu** : push sur `main` → build automatique
- **Preview deployments** : chaque PR génère un environnement
- **Plugin** : `@netlify/plugin-nextjs` 5.12+
- **Configuration** : `netlify.toml`

#### Variables d'environnement Netlify
```env
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_SITE_URL=https://embrouille-jds.netlify.app
```

#### Build settings
- **Build command** : `npm run build`
- **Publish directory** : `.next`
- **Node version** : 20

#### Résolution des problèmes courants

##### "window is not defined" (SSR)
✅ **Résolu** : `typeof window !== 'undefined'` + `useEffect` pour les APIs navigateur

##### Cache `.next` corrompu après refonte
Symptôme : `Cannot find module './XXX.js'` en dev.
Solution :
```bash
rm -rf .next
npm run dev
```

##### Build bloqué par Netlify (CVE)
Si Netlify bloque le déploiement avec un message CVE Next.js, mettre à jour :
```bash
npm install next@latest  # ou next@15.5.15 pour rester sur Next 15
```

## 📈 Performances

### Build Metrics
- **Total Pages** : 31 (10 statiques, 21 API routes)
- **First Load JS** : 102 kB (partagé)
- **Page d'accueil** : 122 kB
- **Largest Route** : 151 kB (admin dashboard)
- **Build Time** : ~2 secondes

### Optimisations appliquées
- ✅ Particules désactivées sur mobile + `prefers-reduced-motion`
- ✅ Images en `loading="lazy"` (sauf hero `fetchPriority="high"`)
- ✅ `<picture>` responsive desktop/mobile sur la bannière hero
- ✅ Code splitting automatique
- ✅ Compression Gzip/Brotli (Netlify)
- ✅ CDN pour les assets statiques

## 🔄 Historique de la refonte

### Big Bang Mobile-First (avril 2026)
- 🎯 BottomTabBar unique remplace MobileMenu + SwipeIndicator + GamingNav
- 📱 Carrousel snap pour la section Team
- 🏆 Leaderboard repensé en cartes verticales mobile
- 🎲 Section Games avec filtres (Tous/Champions/Records)
- ⚡ Countdown live JJ:HH:MM:SS sur Next Game
- 🎬 Video en playlist unifiée avec thumbnails
- 🗑️ 4 composants redondants supprimés

### Phases précédentes
- ✅ Migration Next.js 15 avec App Router
- ✅ Interface admin complète (CRUD sur toutes les données)
- ✅ Section Next Game éditable avec API REST
- ✅ Hero responsive avec bannières "Team JDS" desktop/mobile
- ✅ Authentification JWT + middleware
- ✅ Déploiement Netlify avec CI/CD
- ✅ Patch sécurité CVE-2025-55182 (Next 15.5.0 → 15.5.15)

## 🤝 Contribution

### Workflow
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Développer et tester localement (`npm run dev`)
4. Vérifier le build (`npm run build`)
5. Commit (`git commit -m 'Add AmazingFeature'`)
6. Push (`git push origin feature/AmazingFeature`)
7. Ouvrir une Pull Request

### Checklist avant push
- [ ] Le build passe sans erreur (`npm run build`)
- [ ] Pas d'erreur "window is not defined" en SSR
- [ ] Les composants navigateur utilisent `'use client'`
- [ ] Pas de variables d'environnement dans le code committé
- [ ] Cache `.next` purgé si gros changements de structure

## 📝 Licence

Projet privé - Embrouille JDS © 2026
Tous droits réservés

## 👥 Équipe

**Développement** : [Christophe](https://christophe-dev-freelance.fr) - Full Stack Next.js / TypeScript
**Design** : Concept gaming cyberpunk avec effets néon
**Client** : Club Embrouille JDS

## 📞 Contact

- **Email** : contact@embrouille-jds.fr
- **GitHub** : [@krismos64](https://github.com/krismos64)
- **Site pro** : [christophe-dev-freelance.fr](https://christophe-dev-freelance.fr)

---

<div align="center">
  <p>Développé avec ❤️ et ☕ pour l'équipe Embrouille JDS</p>
  <p>🎲 <strong>"Que le meilleur gagne !"</strong> 🎮</p>
</div>
