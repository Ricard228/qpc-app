# Questions pour un Champion — Édition Économie & Sciences sociales

Application web qui transforme le recueil de **516 questions** en jeu interactif, format inspiré de l'émission *Questions pour un Champion* (TV5 Monde).

**Version 2.4** — codes d'accès permanents, dashboard centralisé, **persistance permanente** via branche `data` du repo GitHub, **export Excel**, **toggle Révision libre**, **duels utilisateur-à-utilisateur** et **confrontations admin** (2+ joueurs), **648 questions sur 13 domaines** (Statistique/Économétrie étendue, **Machine learning & Deep learning**, **Suivi-évaluation des projets et politiques**, **Marchés financiers UEMOA / BRVM**), **mode QCM** avec 1 ou plusieurs bonnes réponses.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Ricard228/qpc-app)

---

## 🎯 Architecture

- **Backend** : Node.js + Express (server.js)
- **Frontend** : SPA Vanilla JS (dossier `public/`)
- **Stockage** : fichiers JSON (`data/auth.json` et `data/games.json`) **synchronisés en permanence** sur la branche `data` du repo GitHub
- **Auth** : tokens HMAC signés ; codes utilisateurs aléatoires `QPC-XXXXXXXX` permanents jusqu'à révocation par le super-admin
- **Export** : JSON (complet) ou Excel `.xlsx` (3 feuilles : Codes, Parties, Détail réponses)

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
| `GH_TOKEN` | *(token GitHub avec scope `repo`)* | **Indispensable** pour la persistance permanente des données |
| `GH_REPO` | `Ricard228/qpc-app` | Repo cible pour la sync (déjà défini dans render.yaml) |
| `GH_BRANCH` | `data` | Branche où sont stockées les données (déjà défini) |
| `TOKEN_SECRET` | *(généré aléatoirement)* | Render le génère automatiquement |
| `NODE_VERSION` | `20` | Version de Node |

> **Comment obtenir un `GH_TOKEN` ?** Aller sur https://github.com/settings/tokens/new → cocher `repo` (accès complet aux repos privés/publics) → générer → copier le token (commence par `ghp_...`) → coller dans la variable `GH_TOKEN` sur Render.

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
- **Mode QCM ou saisie libre** : choisi au début de la partie (sauf si l'admin l'a forcé)
- **Révision libre** : parcourir les 613 questions sans timer
- **Mes duels** : défier un autre joueur via son code d'accès. Les deux joueurs reçoivent les **mêmes questions dans le même ordre** pour une comparaison équitable. L'adversaire peut accepter ou refuser.
- **Pause / reprise** d'une partie
- **Historique personnel** (parties terminées remontées depuis le serveur)
- **Comparaison souple** des réponses (accents, articles, casse ignorés)
- **Blocage automatique de la Révision libre** quand un duel est en cours

### Pour le super-admin

- **Génération de codes** d'accès (permanents jusqu'à révocation, avec nom optionnel)
- **Révocation** instantanée d'un code
- **Organiser une confrontation** : sélectionner 2 participants (duel) ou plus (tournoi), même configuration pour tous, **acceptation forcée** (les participants sont convoqués)
- **Liste de toutes les confrontations** : actives, terminées, avec vainqueur et scores
- **Tableau de bord** : codes actifs, parties jouées, taux de bonnes réponses
- **Classement** des utilisateurs par score
- **Liste des parties récentes** (50 dernières)
- **Toggle « Révision libre »** : activer/désactiver le mode pour tous les utilisateurs (utile pour les sessions d'examen)
- **Mode QCM global** : `user-choice` (joueur choisit) · `force-text` (saisie libre obligatoire) · `force-qcm` (QCM obligatoire)
- **Export Excel** (`.xlsx`) : 3 feuilles — Codes, Parties, Détail des réponses
- **Export / import JSON** complet
- **Suppression totale** de la base (zone dangereuse, double confirmation)

---

## 🔄 Persistance permanente — branche `data`

Pour pallier l'absence de disque persistant sur le free tier Render, les fichiers `data/auth.json` et `data/games.json` sont **automatiquement synchronisés** vers la branche `data` du repo GitHub :

- **Au démarrage** : le serveur télécharge les fichiers de la branche `data` (rétablit l'état)
- **À chaque écriture** : le serveur pousse la nouvelle version (debounced 4 secondes)

**La branche `data` est la vraie source de vérité** — elle survit aux redémarrages, mises à jour, et même au crash complet du conteneur Render. Tant que ton repo GitHub existe, tes données existent.

Si `GH_TOKEN` n'est pas défini, le serveur tombe en mode local-seul (les données ne survivent pas aux redémarrages). C'est utile en développement.

Pour des exports manuels :
- **Excel** : panneau admin → *Exporter en Excel (.xlsx)*
- **JSON** : panneau admin → *Exporter en JSON*
- **Restauration** : *Importer un JSON*

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
| GET | `/api/meta` | user | Méta-données + domaines + settings |
| GET | `/api/packs/:manche` | user | Packs filtrés d'une manche |
| POST | `/api/me/game` | user | Archive une partie terminée |
| GET | `/api/me/games` | user | Historique personnel |
| GET | `/api/admin/codes` | admin | Liste des codes |
| POST | `/api/admin/codes` | admin | Génère un nouveau code |
| DELETE | `/api/admin/codes/:code` | admin | Révoque un code |
| GET | `/api/admin/settings` | admin | Réglages courants |
| PUT | `/api/admin/settings` | admin | Modifier réglages (reviewEnabled) |
| GET | `/api/admin/dashboard` | admin | Stats globales + classement |
| GET | `/api/admin/game/:id` | admin | Détail d'une partie |
| GET | `/api/admin/export` | admin | Export complet (JSON) |
| GET | `/api/admin/export-excel` | admin | Export Excel `.xlsx` (3 feuilles) |
| POST | `/api/admin/import` | admin | Restaure un export JSON |
| DELETE | `/api/admin/all-data` | admin | Purge totale (corps `{confirm:"OUI-SUPPRIMER-TOUT"}`) |
| GET | `/api/me/duels` | user | Liste de mes duels (invitations, actifs, terminés) |
| POST | `/api/me/duels` | user | Défier un autre joueur `{opponentCode, config}` |
| POST | `/api/me/duels/:id/accept` | user | Accepter une invitation |
| POST | `/api/me/duels/:id/decline` | user | Refuser une invitation |
| GET | `/api/me/duels/:id` | user | Détails d'un duel (packs visibles si accepté) |
| POST | `/api/me/duels/:id/game` | user | Soumettre son résultat |
| GET | `/api/admin/duels` | admin | Liste de tous les duels |
| POST | `/api/admin/duels` | admin | Convoquer une confrontation `{participants[], config}` |
| DELETE | `/api/admin/duels/:id` | admin | Supprimer une confrontation |

---

## 📝 Crédits

Conçu par **Kossi Nevame AGBENU** — NEVAME Data House & École Supérieure d'Agronomie, Université de Lomé.

Contenu pédagogique : recueil *Questions pour un Champion — Édition Économie & Sciences sociales*, 516 questions sur 10 domaines.
