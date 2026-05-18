# 🚀 Guide de déploiement Render

À suivre une seule fois pour mettre l'app en ligne avec un lien permanent.

---

## ✅ Étape 1 — Configurer Git localement

Ouvrir **PowerShell** dans le dossier `qpc-app/qpc-app/` et exécuter :

```powershell
# Remplacer par votre vrai nom et email
git config user.name  "Kossi Nevame AGBENU"
git config user.email "votre-email@example.com"

# Premier commit
git add .
git commit -m "QPC v2 — auth + dashboard admin"
git branch -M main
```

---

## ✅ Étape 2 — Créer un compte GitHub (~2 min)

1. Ouvrir https://github.com/signup
2. Email + nom d'utilisateur + mot de passe
3. Vérifier l'email reçu

---

## ✅ Étape 3 — Créer un nouveau repo GitHub

1. https://github.com/new
2. Repository name : `qpc-app`
3. Visibilité : **Private** (recommandé, ou Public si vous voulez partager le code)
4. **NE PAS** cocher "Add a README" / "Add .gitignore" — on a déjà tout
5. Cliquer **Create repository**

GitHub affiche alors une page avec deux URLs. Notez celle qui commence par `https://github.com/...`.

---

## ✅ Étape 4 — Pousser le code

Dans PowerShell, dans `qpc-app/qpc-app/` :

```powershell
git remote add origin https://github.com/VOTRE-USER/qpc-app.git
git push -u origin main
```

GitHub demande un authentification :
- **Username** : votre nom GitHub
- **Password** : **PAS** votre mot de passe ! Créer un **Personal Access Token** :
  - https://github.com/settings/tokens/new
  - Note : `qpc-deploy`
  - Expiration : 90 jours
  - Cocher `repo` (accès complet aux repos)
  - **Generate token** → copier le token (commence par `ghp_...`)
  - Coller ce token comme mot de passe

Le push devrait réussir : tous les fichiers sont sur GitHub.

---

## ✅ Étape 5 — Créer un compte Render

1. https://render.com → **Get Started**
2. **Sign up with GitHub** (le plus rapide)
3. Autoriser Render à voir vos repos

---

## ✅ Étape 6 — Déployer

1. Dashboard Render → **New → Web Service**
2. *Connect a repository* → choisir `qpc-app`
3. Render lit le `render.yaml` et pré-remplit tout. Vérifier :
   - **Name** : `qpc-champion` (ou autre, ce sera le sous-domaine)
   - **Region** : Frankfurt
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`
   - **Plan** : **Free**
4. **Important** : descendre à *Environment Variables* et définir :
   - `ADMIN_PASSWORD` = *votre choix, mot de passe fort 12+ caractères*
5. **Create Web Service**

Render lance le build puis le service. Au bout de ~2 minutes, l'URL s'affiche en haut de la page : `https://qpc-champion.onrender.com` (ou similaire).

---

## ✅ Étape 7 — Première utilisation

1. Ouvrir l'URL → page de **Connexion**
2. **Accès super-administrateur →** → entrer le mot de passe défini à l'étape 6
3. Cliquer **+ Générer un nouveau code** pour chaque utilisateur (nom optionnel)
4. Copier chaque code, l'envoyer à l'utilisateur concerné (par mail/SMS/WhatsApp)
5. L'utilisateur ouvre l'URL, entre son code → il joue

---

## 🔁 Mises à jour

Pour mettre à jour le code après modification :

```powershell
git add .
git commit -m "Description du changement"
git push
```

Render détecte automatiquement le push et redéploie en ~1 minute.

---

## 💾 Sauvegarde des données

Le free tier Render n'a **pas de disque persistant**. Pour éviter de perdre codes + scores :

1. Panneau admin → **Sauvegarde de la base → Exporter (.json)**
2. Garder le fichier
3. Si redémarrage du conteneur efface tout : panneau admin → **Importer un export**

À faire chaque semaine, ou avant une période d'inactivité importante.

---

## 🐛 Problèmes courants

**Le déploiement échoue avec "Module not found"** : Render a peut-être pris une mauvaise version de Node. Vérifier que `NODE_VERSION=20` est bien dans Environment.

**Le service répond "Application failed to respond"** : Render endort le service après 15 min d'inactivité. Le premier visiteur attend ~30 s. C'est normal.

**Le mot de passe admin ne marche pas** : vérifier la valeur exacte de `ADMIN_PASSWORD` dans Render → Environment. Sans cette variable, le mot de passe par défaut est `qpc-admin-2026`.

**"Push rejected"** : exécuter `git pull --rebase` puis `git push` à nouveau.
