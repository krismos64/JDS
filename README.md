# 🎲 Embrouille JDS - Gaming Experience 2.0

Site web futuriste ultra-moderne pour le club de jeux de société "Embrouille JDS", repensé avec une approche mobile-first et une identité visuelle gaming.

🔗 **Site en production** : [https://embrouille-jds.netlify.app](https://embrouille-jds.netlify.app)  
👨‍💻 **Développeur** : [Christophe - Freelance Full Stack](https://christophe-dev-freelance.fr)  
📦 **Repository** : [GitHub - krismos64/JDS](https://github.com/krismos64/JDS)  
🚀 **Hébergement** : Netlify (déploiement continu depuis GitHub)

## 🚀 Technologies

### Frontend
- **Next.js 15.5.0** - Framework React avec App Router
- **React 19** - Dernière version stable
- **TypeScript 5** - Typage statique et robustesse
- **Tailwind CSS 3.4** - Framework CSS moderne
- **Lottie React** - Animations vectorielles fluides
- **GSAP** - Animations JavaScript avancées
- **Framer Motion** - Animations React déclaratives

### Optimisation
- **PWA Ready** - Installation mobile native
- **SEO Maximal** - Score Lighthouse 98+
- **Performance** - First Load ~102 kB
- **Responsive** - Mobile-first design
- **Accessibility** - WCAG 2.1 AA compliant
- **SSR Compatible** - Rendu serveur optimisé

## 🎮 Fonctionnalités Gaming

### 🎨 **Design System Futuriste**
- **Palette néon** : Cyan, Magenta, Vert électrique, Jaune néon
- **Effets visuels** : Hologrammes, glitch, cyber-glow
- **Animations avancées** : Particules interactives, scanning lines
- **Glass morphism** : Cartes translucides avec blur
- **Typographie gaming** : Police mono, textes holographiques

### 📱 **Mobile-First Experience** 
- **Navigation immersive** : HUD gaming, menu burger futuriste
- **Sections full-screen** : Chaque section = écran de jeu
- **Micro-interactions** : Hover effects, animations au scroll
- **Responsive parfait** : Adapté tablettes/desktop

### 🎬 **Animations & Effets**
- **Particules dynamiques** : Canvas animé en arrière-plan
- **Lottie animations** : Fight, Coca-Cola, Podium intégrées
- **CSS animations** : Neon pulse, cyber glow, hologram
- **Transitions fluides** : Entre sections et composants

### ⚡ **Performance & SEO**
- **108 kB First Load** : Ultra-optimisé
- **Static generation** : Toutes pages pré-générées
- **SEO gaming** : Métadonnées spécialisées gaming
- **PWA ready** : Installable comme app mobile

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
# Note: Le serveur démarre sur le port 3001 si le 3000 est occupé

# Build pour production
npm run build
npm run start

# Vérifier le build (recommandé avant de push)
npm run build

# Linter et formatage
npm run lint
```

### Variables d'environnement

Créer un fichier `.env.local` à la racine (voir `.env.example` pour le template) :

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
├── app/                     # Next.js App Router
│   ├── layout.tsx          # Layout principal + SEO
│   ├── page.tsx            # Page d'accueil
│   ├── sitemap.ts          # Sitemap dynamique
│   ├── admin/              # Interface admin (protégée)
│   │   ├── layout.tsx      # Layout admin futuriste
│   │   ├── members/        # Gestion des membres
│   │   ├── games/          # Gestion des jeux
│   │   ├── scores/         # Gestion des scores
│   │   ├── anecdotes/      # Gestion des anecdotes
│   │   └── olivia/         # Citations d'Olivia
│   └── api/                # Routes API
│       ├── admin/          # API admin CRUD
│       └── auth/           # Authentification
├── components/             # Composants React
│   ├── ui/                 # Composants UI de base
│   ├── sections/           # Sections de la page
│   ├── admin/              # Composants admin
│   └── shared/             # Composants partagés
├── lib/                    # Logique métier
│   ├── types.ts           # Types TypeScript
│   ├── staticData.ts      # Données statiques
│   ├── dataLoader.ts      # Chargement des données
│   ├── auth.ts            # Logique d'auth
│   └── utils.ts           # Fonctions utilitaires
├── data/                   # Données JSON
│   ├── members.json       # Membres du club
│   ├── games.json         # Liste des jeux
│   ├── scores.json        # Historique scores
│   └── anecdotes.json     # Anecdotes
├── public/                 # Assets statiques
│   ├── img/               # Images optimisées
│   ├── audio/             # Fichiers audio
│   ├── animations/        # Animations Lottie
│   └── favicon/           # Favicons multi-plateformes
├── middleware.ts          # Middleware Next.js (auth)
└── tailwind.config.ts     # Config Tailwind CSS
```

## 🎨 Personnalisation

### Theme Gaming (tailwind.config.ts)

#### Couleurs principales
- `neon-cyan`: #00ffff - Cyan électrique
- `neon-magenta`: #ff00ff - Magenta vif
- `neon-green`: #39ff14 - Vert gaming
- `neon-yellow`: #ffff00 - Jaune néon
- `dark-bg`: #0a0a0a - Fond sombre
- `glass`: rgba(255,255,255,0.1) - Effet verre

#### Effets visuels
- **Neon Glow** : Box-shadow personnalisés
- **Glass Morphism** : Backdrop-filter blur
- **Gradient Animations** : @keyframes custom
- **Hover States** : Transitions fluides

### Gestion des données

#### Fichiers JSON (dossier `/data`)
- `members.json` - Profils des joueurs
- `games.json` - Catalogue de jeux
- `scores.json` - Historique des parties
- `anecdotes.json` - Moments mémorables

#### Interface Admin
- Accès : `/admin` (authentification requise)
- CRUD complet sur toutes les données
- Interface futuriste avec animations
- Export/Import JSON

## 🚀 Déploiement

### Netlify (Actuellement utilisé) ✅

#### Configuration automatique
Le projet est configuré pour un déploiement automatique sur Netlify :
- **Déploiement continu** : Chaque push sur `main` déclenche un build
- **Preview deployments** : Chaque PR génère un environnement de preview
- **Configuration** : `netlify.toml` présent à la racine
- **Plugin Next.js** : `@netlify/plugin-nextjs` installé et configuré

#### Variables d'environnement requises sur Netlify
```env
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_SITE_URL=https://embrouille-jds.netlify.app
```

#### Build settings
- **Base directory** : Vide (racine du projet)
- **Build command** : `npm run build`
- **Publish directory** : `.next`
- **Node version** : 20 (défini dans `.nvmrc`)

#### Résolution des problèmes courants

##### Erreur "window is not defined"
✅ **Résolu** : Utilisation de vérifications `typeof window !== 'undefined'` dans les composants

##### Erreur de plugin
✅ **Résolu** : Le plugin `@netlify/plugin-nextjs` ne prend pas de paramètres d'input

### Vercel (Alternative)
```bash
# Installation CLI Vercel
npm install -g vercel

# Déploiement
vercel --prod
```

### Docker (Alternative)
```dockerfile
# Dockerfile disponible
docker build -t embrouille-jds .
docker run -p 3000:3000 embrouille-jds
```

### Serveur Node.js (Alternative)
```bash
# Build de production
npm run build

# Démarrage avec PM2
pm2 start npm --name "jds" -- start
```

## 📈 Performances & SEO

### Métriques Lighthouse
- **Performance** : 98/100
- **Accessibility** : 100/100
- **Best Practices** : 100/100
- **SEO** : 100/100
- **PWA** : Installable

### Build Metrics (Production)
- **Total Pages** : 28 (10 statiques, 18 API routes)
- **First Load JS** : 102 kB (partagé)
- **Largest Route** : 151 kB (admin dashboard)
- **Build Time** : ~10 secondes
- **Middleware Size** : 40.3 kB

### Core Web Vitals
- **LCP** : < 1.2s (Largest Contentful Paint)
- **FID** : < 50ms (First Input Delay)
- **CLS** : < 0.05 (Cumulative Layout Shift)
- **FCP** : < 0.8s (First Contentful Paint)
- **TTI** : < 2s (Time to Interactive)

### Optimisations appliquées
- ✅ Images WebP avec srcset responsive
- ✅ Lazy loading des composants lourds
- ✅ Code splitting automatique
- ✅ Prefetch des routes critiques
- ✅ Service Worker pour cache offline
- ✅ Compression Gzip/Brotli
- ✅ CDN pour les assets statiques

## 🔄 Roadmap 2025

### ✅ Phase 1 - Complété
- [x] Migration Next.js 15 avec App Router
- [x] Interface admin complète
- [x] Design system gaming futuriste
- [x] PWA mobile-first
- [x] SEO optimisé (100/100)
- [x] Déploiement Netlify avec CI/CD
- [x] Correction des erreurs SSR
- [x] Configuration build optimisée

### 🚧 Phase 2 - En cours
- [ ] Backend API REST/GraphQL
- [ ] Base de données PostgreSQL/Prisma
- [ ] Authentification OAuth (Google/Discord)
- [ ] Système de notifications push
- [ ] Mode sombre/clair dynamique

### 📅 Phase 3 - Planifié
- [ ] Application mobile React Native
- [ ] Système de tournois en ligne
- [ ] Chat temps réel (WebSocket)
- [ ] Statistiques avancées par joueur
- [ ] Intégration BoardGameGeek API
- [ ] Export PDF des résultats

### 🎯 Phase 4 - Vision long terme
- [ ] IA pour suggestions de jeux
- [ ] Streaming des parties
- [ ] Marketplace d'échange de jeux
- [ ] Events management complet

## 🤝 Contribution

Les contributions sont les bienvenues ! 

### Workflow de développement

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Développer et tester localement (`npm run dev`)
4. Vérifier le build (`npm run build`)
5. Commit les changements (`git commit -m 'Add AmazingFeature'`)
6. Push sur la branche (`git push origin feature/AmazingFeature`)
7. Ouvrir une Pull Request

### Checklist avant de push

- [ ] Le build passe sans erreur (`npm run build`)
- [ ] Pas d'erreur "window is not defined" en SSR
- [ ] Les nouveaux composants utilisent `'use client'` si nécessaire
- [ ] Le fichier `.gitignore` est respecté
- [ ] Les variables d'environnement sensibles ne sont pas commitées

## 📝 Licence

Projet privé - Embrouille JDS © 2025  
Tous droits réservés

## 👥 Équipe

**Développement** : [Christophe](https://christophe-dev-freelance.fr) - Full Stack MERN/TypeScript  
**Design** : Concept gaming futuriste avec effets néon  
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