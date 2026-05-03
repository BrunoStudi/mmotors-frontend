# M-Motors — Frontend

Frontend de l’application M-Motors, développé avec React (Vite).

Cette interface permet aux utilisateurs et administrateurs d’interagir avec l’API backend afin de gérer des véhicules, des dossiers clients et des documents.

---

## 1. Prérequis

Avant de lancer le projet, installer :

- Node.js (version récente recommandée)
- npm
- Git

---

## 2. Cloner le dépôt

Depuis votre terminal lancez ces commandes :

```bash
git clone https://github.com/BrunoStudi/mmotors-frontend.git  
cd mmotors-frontend
```

---

## 3. Installer les dépendances

Depuis votre terminal :

```bash
npm install
```

---

## 4. Configuration des variables d’environnement

Créer un fichier `.env` à la racine du projet :

En local :

```bash
VITE_API_URL=http://127.0.0.1:8000
```

En production (backend Heroku) :

```bash
VITE_API_URL=https://mmotors-backend-api-fa44eb2c40b9.herokuapp.com
```

Important : la variable doit commencer par `VITE_` pour être accessible dans l’application.

---

## 5. Lancer le frontend en local

Depuis votre terminal :

```bash
npm run dev
```

Application accessible sur :

http://localhost:5173

---

## 6. Build de production

Depuis votre terminal:

```bash
npm run build
```

Les fichiers générés sont disponibles dans le dossier :

dist/

---

## 7. Prévisualisation du build

Depuis votre terminal:

```bash
npm run preview
```

---

## 8. Communication avec le backend

Le frontend communique avec l’API FastAPI via Axios.

La base URL est définie via la variable d’environnement :

```bash
import.meta.env.VITE_API_URL
```

Il est important de ne jamais utiliser une URL en dur comme : 

http://127.0.0.1:8000

---

## 9. Parcours utilisateur

Un utilisateur peut :

- consulter les véhicules disponibles
- filtrer les véhicules (achat / location)
- consulter les détails d’un véhicule
- créer un compte
- se connecter
- déposer un dossier
- suivre l’état de ses dossiers
- ajouter des documents
- consulter les documents déposés

---

## 10. Parcours administrateur

Un administrateur peut :

- se connecter au back-office
- ajouter un véhicule
- modifier un véhicule
- supprimer un véhicule
- ajouter des images à un véhicule
- supprimer une image
- consulter les dossiers clients
- consulter les documents déposés
- modifier le statut des dossiers

Compte administrateur :

Email : admin@mmotors.fr  
Mot de passe : Admin1234

---

## 11. Déploiement

Le frontend est déployé sur Vercel.

Configuration :

- Framework : Vite
- Build command : npm run build
- Output directory : dist

Variable d’environnement à configurer sur Vercel :

```bash
VITE_API_URL=https://mmotors-backend-api-fa44eb2c40b9.herokuapp.com
```

---

## 12. CORS

Le backend doit autoriser l’URL du frontend.

Exemple côté backend :

```bash
allow_origins = [
    "http://localhost:5173",
    "https://mmotors-frontend-8st1.vercel.app"
]
```

---

## 13. Tests

Les tests front-end réalisés sont des tests fonctionnels manuels.

Parcours testés :

- affichage du catalogue
- filtres de recherche
- inscription
- connexion
- création de dossier
- upload de documents
- affichage des dossiers
- gestion des véhicules côté admin
- gestion des dossiers côté admin

Une amélioration possible serait l’ajout de tests automatisés avec Vitest ou React Testing Library.

---

## 14. Structure du projet

```text
mmotors-frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── package.json
├── vite.config.js
├── .env
└── README.md
```

---

## 15. Commandes utiles

Installer les dépendances :

```bash
npm install
```

Lancer le projet :

```bash
npm run dev
```

Créer un build :

```bash
npm run build
```

Prévisualiser le build :

```bash
npm run preview
```

---

## 16. Auteur

Projet réalisé dans le cadre de la formation CDA / Bachelor Développeur d’Application.

Auteur : Bruno