# 🎲 Embrouille JDS - Next.js Edition

Site web moderne pour le club de jeux de société "Embrouille JDS", développé avec Next.js 15, TypeScript et Tailwind CSS.

## 🚀 Technologies

- **Next.js 15** avec App Router et Turbopack
- **TypeScript** pour la robustesse du code
- **Tailwind CSS** pour le styling moderne
- **Lottie React** pour les animations
- **GSAP** pour les animations avancées
- **PWA** pour l'installation mobile
- **SEO optimisé** avec métadonnées complètes

## 📋 Fonctionnalités

- ✅ **SEO complet** : Open Graph, Twitter Cards, données structurées JSON-LD
- ✅ **Images optimisées** avec next/image (WebP automatique)
- ✅ **Responsive design** mobile-first
- ✅ **Animations fluides** avec Lottie et GSAP
- ✅ **PWA installable** sur mobile
- ✅ **Performance maximale** avec code splitting et lazy loading
- ✅ **TypeScript** pour un code robuste et maintenable
- ✅ **Tableau des scores** interactif avec tri dynamique
- ✅ **Lecteur audio** avec autoplay intelligent
- ✅ **Navigation smooth scroll** avec indicateurs actifs

## 🛠️ Installation

```bash
# Cloner le projet
git clone https://github.com/krismos64/embrouille-jds.git
cd jds-next

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
npm run start
```

## 📁 Structure du projet

```
jds-next/
├── app/                  # Pages et layout Next.js
│   ├── layout.tsx       # Layout principal avec métadonnées SEO
│   ├── page.tsx         # Page d'accueil
│   └── sitemap.ts       # Sitemap automatique
├── components/          # Composants React réutilisables
│   ├── Header.tsx       # En-tête avec animation
│   ├── Navigation.tsx   # Menu responsive
│   ├── MemberCard.tsx   # Cartes membres avec modal
│   ├── GameCard.tsx     # Cartes jeux
│   ├── ScoreTable.tsx   # Tableau scores interactif
│   ├── AnecdoteCard.tsx # Cartes anecdotes
│   └── AudioPlayer.tsx  # Lecteur audio
├── lib/                 # Utilitaires et données
│   ├── types.ts        # Types TypeScript
│   ├── data.ts         # Données du site
│   └── utils.ts        # Fonctions utilitaires
├── public/             # Assets statiques
│   ├── img/            # Images
│   ├── audio/          # Fichiers audio
│   ├── animations/     # Animations Lottie
│   └── favicon/        # Favicons
└── tailwind.config.ts  # Configuration Tailwind
```

## 🎨 Personnalisation

### Couleurs (tailwind.config.ts)
- `primary`: #ff6b6b (rouge)
- `secondary`: #4ecdc4 (turquoise)
- `tertiary`: #45b7d1 (bleu)
- `dark`: #2c3e50
- `light`: #ecf0f1

### Données
Toutes les données sont centralisées dans `lib/data.ts` :
- Membres de l'équipe
- Liste des jeux
- Scores des parties
- Anecdotes

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Autres plateformes
```bash
npm run build
# Déployer le dossier .next
```

## 📈 Performances

- **Lighthouse Score** : 95+ sur toutes les métriques
- **First Contentful Paint** : < 1s
- **Time to Interactive** : < 2s
- **Images optimisées** : WebP avec lazy loading
- **Code splitting** : Chargement par route

## 🔄 Mises à jour futures

- [ ] Backend API pour scores dynamiques
- [ ] Base de données pour historique complet
- [ ] Interface admin pour gestion contenu
- [ ] Système de commentaires
- [ ] Galerie photos étendue
- [ ] Calendrier interactif des soirées

## 📝 Licence

Projet privé - Embrouille JDS © 2025

---

Développé avec ❤️ par Christophe pour l'équipe Embrouille JDS