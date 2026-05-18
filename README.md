# Questions pour un Champion — Édition Économie & Sciences sociales

Application web qui transforme le recueil de **516 questions** en jeu interactif, format inspiré de l'émission *Questions pour un Champion* (TV5 Monde).

**Version 2.0** — authentification par codes d'accès générés par un super-administrateur, tableau de bord centralisé des scores.

---

## 🎯 Architecture

- **Backend** : Node.js + Express (server.js)
- **Frontend** : SPA Vanilla JS (dossier `public/`)
- **Stockage** : fichiers JSON (`data/auth.json` et `data/games.json`)
- **Auth** : tokens HMAC signés, codes utilisateurs aléatoires `QPC-XXXXXXXX`

---

## 🚀 Déployer sur Render.com (gratuit, permanent)

### Étape 1 — Créer un compte GitHub (si pas déjà fait)

1. Ouvrir https://github.com/signup
2. Créer un compte (email + mot de passe)
3. Vérifier l'email

### Étape 2 — Pousser le code sur GitHub

Depuis le dossier `qpc-app/qpc-app/` :

```bash
git init
git add .
git commit -m "QPC v2 — auth + dashboard admin"
git branch -M main

# Créer un repo vide sur https://github.com/new (nom : qpc-app, privé OK)
# Puis :
git remote add origin https://github.com/VOTRE-USER/qpc-app.git
git push -u origin main
```

### Étape 3 — Créer un compte Render

1. Ouvrir https://render.com
2. *Sign up with GitHub* (l'option la plus simple)
3. Autoriser Render à lire vos repos

### Étape 4 — Créer le Web Service

1. Dashboard Render → **New → Web Service**
2. *Connect a repository* → choisir `qpc-app`
3. Render détecte automatiquement le `render.yaml` et propose la configuration. Sinon, remplir à la main :
   - **Name** : `qpc-champion`
   - **Region** : Frankfurt
   - **Branch** : `main`
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`
   - **Plan** : **Free**

### Étape 5 — Définir les variables d'environnement

Dans le panneau du service, onglet **Environment** :

| Clé | Valeur | Remarque |
|-----|--------|----------|
| `ADMIN_PASSWORD` | *(votre choix, 12+ caractères)* | Mot de passe super-admin |
| `TOKEN_SECRET` | *(généré aléatoirement)* | Render le génère automatiquement si render.yaml est utilisé |
| `NODE_VERSION` | `20` | Version de Node |

Cliquer **Save Changes** — Render redéploie automatiquement.

### Étape 6 — Obtenir le lien public

Une fois le déploiement terminé (1-2 minutes), Render donne une URL :
`https://qpc-champion.onrender.com` *(ou un autre sous-domaine si pris)*.

**C'est le lien à partager avec vos étudiants** une fois que vous leur aurez généré leurs codes d'accès depuis le panneau admin.

> ⚠️ **Free tier** : le service s'endort après 15 minutes sans visite, et met ~30 secondes à se réveiller au premier visiteur. Les fichiers `data/*.json` peuvent être effacés à un redémarrage majeur du conteneur — **exportez régulièrement** depuis le panneau admin.

---

## 🔐 Première connexion

1. Ouvrir l'URL Render → page de connexion
2. Cliquer sur **« Accès super-administrateur → »**
3. Entrer le mot de passe défini dans `ADMIN_PASSWORD`
4. Sur le panneau admin :
   - Cliquer **« + Générer un nouveau code »** (avec un nom optionnel)
   - Copier le code `QPC-XXXXXXXX`
   - Le partager avec l'utilisateur concerné
5. L'utilisateur ouvre l'URL et entre son code → il peut jouer

---

## 🎮 Fonctionnalités

### Pour les utilisateurs

- **Trois manches** chronométrées (40 s / 25 s / 15 s)
- **Révision libre** : parcourir les 516 questions sans timer
- **Pause / reprise** d'une partie
- **Historique personnel** (parties terminées remontées depuis le serveur)
- **Comparaison souple** des réponses (accents, articles, casse ignorés)

### Pour le super-admin

- **Génération de codes** d'accès (avec nom optionnel)
- **Révocation** instantanée d'un code
- **Tableau de bord** : codes actifs, parties jouées, taux de bonnes réponses
- **Classement** des utilisateurs par score
- **Liste des parties récentes** (50 dernières)
- **Export / import** de la base (sauvegarde manuelle JSON)

---

## 🔄 Sauvegarde

Render free tier n'a pas de disque persistant. Pour éviter de perdre les codes et les scores :

1. Dans le panneau admin → **Sauvegarde de la base → Exporter (.json)**
2. Garder le fichier en lieu sûr
3. Si redémarrage du conteneur efface tout : **Importer un export** restaure l'état complet

Pour zéro perte garantie, migrer vers **Render Postgres** (gratuit 90 jours) ou un plan payant avec disque persistant.

---

## 💻 Lancer en local

Prérequis : **Node.js 18+**.

```bash
cd qpc-app/qpc-app
npm install
# Optionnel : définir le mot de passe admin
export ADMIN_PASSWORD="mon-mdp-prive"   # PowerShell : $env:ADMIN_PASSWORD="..."
npm start
```

Ouvrir http://localhost:3000.

Sans `ADMIN_PASSWORD` défini, le mot de passe par défaut affiché au démarrage est `qpc-admin-2026`.

---

## 📦 Arborescence

```
qpc-app/
├── server.js              # serveur Express + API auth
├── package.json
├── render.yaml            # config Render
├── .gitignore             # exclut data/*.json (privées) et node_modules
├── .nvmrc                 # version Node
├── build-data.js          # reconstruire questions.json
├── data/
│   └── questions.json     # 516 questions
├── public/                # frontend statique
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── data/
│       └── questions.json # copie servie (legacy, non utilisée maintenant)
└── README.md
```

---

## 📡 API REST (référence)

Toutes les routes hors `/api/auth/*` requièrent un header `Authorization: Bearer <token>`.

| Verbe | Chemin | Auth | Description |
|-------|--------|------|-------------|
| POST | `/api/auth/login` | – | Login utilisateur avec un code |
| POST | `/api/auth/admin` | – | Login admin avec le mot de passe |
| GET | `/api/meta` | user | Méta-données + domaines |
| GET | `/api/packs/:manche` | user | Packs filtrés d'une manche |
| POST | `/api/me/game` | user | Archive une partie terminée |
| GET | `/api/me/games` | user | Historique personnel |
| GET | `/api/admin/codes` | admin | Liste des codes |
| POST | `/api/admin/codes` | admin | Génère un nouveau code |
| DELETE | `/api/admin/codes/:code` | admin | Révoque un code |
| GET | `/api/admin/dashboard` | admin | Stats globales + classement |
| GET | `/api/admin/game/:id` | admin | Détail d'une partie |
| GET | `/api/admin/export` | admin | Export complet (auth + games) |
| POST | `/api/admin/import` | admin | Restaure un export |

---

## 📝 Crédits

Conçu par **Kossi Nevame AGBENU** — NEVAME Data House & École Supérieure d'Agronomie, Université de Lomé.

Contenu pédagogique : recueil *Questions pour un Champion — Édition Économie & Sciences sociales*, 516 questions sur 10 domaines.
