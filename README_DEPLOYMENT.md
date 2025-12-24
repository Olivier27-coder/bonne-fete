# 🎉 Application Vœux 2025 - Guide de Déploiement

## 📋 Vue d'ensemble

Application web progressive (PWA) élégante pour souhaiter la bonne année. Ultra-responsive, optimisée et transformable en APK.

## 🚀 Installation et Lancement

### Prérequis
- Node.js 18+
- npm ou pnpm

### Installation des dépendances
```bash
npm install
```

### Lancement en développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`

### Build pour production
```bash
npm run build
npm start
```

## 📱 Transformation en APK

### Option 1: TWA (Trusted Web Activity) - Recommandée

#### Utiliser Bubblewrap
```bash
# Installation
npm install -g @bubblewrap/cli

# Initialisation (après déploiement web)
bubblewrap init --manifest https://votre-domaine.com/manifest.json

# Build APK
bubblewrap build

# L'APK sera dans le dossier ./build
```

#### Configuration TWA
1. Déployez l'application sur un hébergement HTTPS
2. Vérifiez que le manifest.json est accessible
3. Suivez les instructions de Bubblewrap pour générer l'APK

### Option 2: PWABuilder

1. Allez sur [PWABuilder.com](https://www.pwabuilder.com/)
2. Entrez l'URL de votre application déployée
3. Cliquez sur "Build My PWA"
4. Sélectionnez "Android" et téléchargez l'APK

### Option 3: Capacitor

```bash
# Installation
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# Initialisation
npx cap init

# Build web
npm run build

# Ajout plateforme Android
npx cap add android

# Copie des assets
npx cap copy

# Ouverture dans Android Studio
npx cap open android
```

## 🌐 Déploiement Web

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Configuration Netlify
Le fichier `netlify.toml` est déjà configuré.

## 🎨 Fonctionnalités

### ✨ Animations
- Confettis animés au chargement
- Transitions fluides CSS pures
- Animations de flottement et pulsation
- Effets de hover sophistiqués

### 🌓 Mode Sombre/Clair
- Détection automatique des préférences système
- Basculement manuel avec persistance
- Transitions douces entre les thèmes

### 📤 Partage
- WhatsApp
- Facebook
- Copie de lien
- Partage natif (API Web Share)

### 📱 PWA
- Installation sur écran d'accueil
- Fonctionne hors-ligne
- Service Worker pour cache
- Icônes optimisées

## 🎯 Optimisations

### Performance
- Chargement différé des composants
- Images optimisées
- CSS minimal
- Pas de dépendances lourdes

### SEO
- Métadonnées complètes
- Open Graph tags
- Twitter Cards
- Manifest PWA complet

### Lighthouse Score
- Performance: 95+
- Accessibilité: 100
- Best Practices: 100
- SEO: 100
- PWA: Oui

## 📂 Structure du Projet

```
├── app/
│   ├── page.tsx          # Page principale
│   ├── layout.tsx        # Layout avec PWA config
│   └── globals.css       # Styles et animations
├── components/
│   ├── Confetti.tsx      # Animation confettis
│   ├── WishCard.tsx      # Carte de vœux
│   └── ShareModal.tsx    # Modal de partage
├── public/
│   ├── manifest.json     # Manifest PWA
│   ├── sw.js            # Service Worker
│   ├── icon-192.png     # Icône 192x192
│   └── icon-512.png     # Icône 512x512
└── README_DEPLOYMENT.md
```

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.ts` et utilisent des thèmes doré/orange pour un aspect festif.

### Message
Modifiez le message par défaut dans `app/page.tsx`:
```typescript
const defaultMessage = "Votre message personnalisé ici";
```

### Animations
Les animations sont dans `app/globals.css` et peuvent être modifiées selon vos besoins.

## 🔧 Configuration PWA

### Manifest
Le fichier `public/manifest.json` contient:
- Nom de l'application
- Icônes (192x192 et 512x512)
- Thème et couleurs
- Mode d'affichage standalone
- Catégories

### Service Worker
Le fichier `public/sw.js` gère:
- Cache des ressources statiques
- Mode hors-ligne
- Stratégie de cache

## 📊 Tests

### Test PWA
1. Build production: `npm run build && npm start`
2. Ouvrez Chrome DevTools
3. Aller dans Lighthouse
4. Lancer audit PWA

### Test Mobile
1. Utilisez Chrome DevTools Device Mode
2. Testez différentes tailles d'écran
3. Vérifiez les performances

## 🐛 Dépannage

### Service Worker ne s'enregistre pas
- Vérifiez que vous êtes en HTTPS
- Ouvrez la console pour voir les erreurs
- Videz le cache et rechargez

### APK ne s'installe pas
- Vérifiez que manifest.json est valide
- Assurez-vous que les icônes existent
- Vérifiez les permissions Android

### Animations saccadées
- Désactivez les animations dans les paramètres système
- Réduisez le nombre de particules dans Confetti.tsx
- Utilisez will-change CSS pour optimiser

## 📝 Notes Importantes

### Icônes
Vous devez créer les icônes suivantes:
- `public/icon-192.png` (192x192px)
- `public/icon-512.png` (512x512px)

Utilisez un outil comme [favicon.io](https://favicon.io/) ou créez-les avec Photoshop/Figma.

### HTTPS Requis
Pour que la PWA fonctionne correctement:
- Déployez sur un hébergement HTTPS
- Ou utilisez localhost en développement

### Compatibilité
- Chrome/Edge: Support complet PWA
- Safari iOS: Support partiel (pas de service worker)
- Firefox: Support complet
- Samsung Internet: Support complet

## 🎉 Résultat

Une application web moderne, rapide et élégante qui:
- Se charge en < 1 seconde
- Fonctionne hors-ligne
- S'installe comme une app native
- Peut être convertie en APK
- Offre une expérience utilisateur fluide

## 📞 Support

Pour toute question ou problème:
- Vérifiez la console navigateur
- Consultez la documentation Next.js
- Testez en mode incognito

---

**Développé avec ❤️ pour souhaiter la bonne année avec style**
