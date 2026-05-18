// =====================================================================
// server.js — Application QPC : serveur Express
// - Authentification : codes utilisateurs (générés par l'admin) + mot
//   de passe super-admin
// - Stockage : data/auth.json (codes + admin) + data/games.json (parties
//   terminées pour le dashboard)
// - Frontend statique servi depuis ./public
// =====================================================================

const express = require('express');
const fs      = require('fs');
const path    = require('path');
const crypto  = require('crypto');

const PORT           = process.env.PORT || 3000;
const ROOT           = __dirname;
const DATA           = path.join(ROOT, 'data');
const AUTH_PATH      = path.join(DATA, 'auth.json');
const GAMES_PATH     = path.join(DATA, 'games.json');
const QUESTIONS_PATH = path.join(DATA, 'questions.json');

// Mot de passe super-admin par défaut. À surcharger via la variable d'env
// ADMIN_PASSWORD en production (Render → Environment).
const DEFAULT_ADMIN_PASSWORD = 'qpc-admin-2026';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

// Secret pour les tokens de session (HMAC). Régénéré au démarrage si non
// fourni — les sessions sont alors invalidées à chaque redémarrage.
const TOKEN_SECRET = process.env.TOKEN_SECRET || crypto.randomBytes(32).toString('hex');

// ---------- Initialisation des fichiers de données --------------------
if (!fs.existsSync(DATA)) fs.mkdirSync(DATA, { recursive: true });

if (!fs.existsSync(QUESTIONS_PATH)) {
  console.error("❌ data/questions.json absent. Exécuter : npm run build");
  process.exit(1);
}

function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return fallback; }
}
function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

function loadAuth() {
  const data = readJson(AUTH_PATH, null);
  if (data) return data;
  // initialiser
  const init = { codes: {}, createdAt: new Date().toISOString() };
  writeJson(AUTH_PATH, init);
  return init;
}
function saveAuth(auth) { writeJson(AUTH_PATH, auth); }

function loadGames() { return readJson(GAMES_PATH, { games: [] }); }
function saveGames(g) { writeJson(GAMES_PATH, g); }

// ---------- App ------------------------------------------------------
const app = express();
app.use(express.json({ limit: '4mb' }));
// Désactiver le cache HTTP pour les assets HTML/JS/CSS — évite que les
// utilisateurs gardent une vieille version après un déploiement.
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || req.path === '/' ||
      req.path.endsWith('.js') || req.path.endsWith('.css')) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});
app.use(express.static(path.join(ROOT, 'public')));

const QUESTIONS = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));

// ---------- Tokens (signature HMAC simple) ----------------------------
// Token format: base64(payload).base64(signature)
function signToken(payload) {
  const p = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const s = crypto.createHmac('sha256', TOKEN_SECRET).update(p).digest('base64url');
  return `${p}.${s}`;
}
function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const [p, s] = token.split('.');
  if (!p || !s) return null;
  const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(p).digest('base64url');
  if (s !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(p, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch { return null; }
}
function extractToken(req) {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  return req.query.token || null;
}

function requireUser(req, res, next) {
  const tok = verifyToken(extractToken(req));
  if (!tok || tok.role !== 'user') return res.status(401).json({ error: 'Authentification requise' });
  // Vérifier que le code existe toujours
  const auth = loadAuth();
  if (!auth.codes[tok.code]) return res.status(401).json({ error: 'Code révoqué' });
  req.user = { code: tok.code, name: auth.codes[tok.code].name || null };
  next();
}
function requireAdmin(req, res, next) {
  const tok = verifyToken(extractToken(req));
  if (!tok || tok.role !== 'admin') return res.status(401).json({ error: 'Authentification admin requise' });
  req.admin = true;
  next();
}

// ---------- Génération de codes ---------------------------------------
function genCode() {
  // Format QPC-XXXXXXXX, alphabet sans caractères ambigus (0/O, 1/I/L)
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let out = 'QPC-';
  for (let i = 0; i < 8; i++) {
    out += alphabet[crypto.randomInt(0, alphabet.length)];
  }
  return out;
}

// ---------- Routes : auth utilisateur ---------------------------------
app.post('/api/auth/login', (req, res) => {
  const code = String(req.body.code || '').trim().toUpperCase();
  if (!code) return res.status(400).json({ error: 'Code requis' });
  const auth = loadAuth();
  const entry = auth.codes[code];
  if (!entry) return res.status(401).json({ error: 'Code invalide ou révoqué' });
  // Mettre à jour lastUsed
  entry.lastUsed = new Date().toISOString();
  saveAuth(auth);
  const token = signToken({ role: 'user', code, exp: Date.now() + 30 * 24 * 3600 * 1000 });
  res.json({ token, name: entry.name || null, code });
});

app.post('/api/auth/admin', (req, res) => {
  const password = String(req.body.password || '');
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe admin invalide' });
  }
  const token = signToken({ role: 'admin', exp: Date.now() + 12 * 3600 * 1000 });
  res.json({ token });
});

// ---------- Routes : questions (utilisateur authentifié) --------------
app.get('/api/meta', requireUser, (req, res) => {
  res.json({ ...QUESTIONS.meta, domains: QUESTIONS.domains });
});

app.get('/api/packs/:manche', requireUser, (req, res) => {
  const { manche } = req.params;
  if (!['manche1', 'manche2', 'manche3'].includes(manche))
    return res.status(400).json({ error: 'manche invalide' });
  const domains = (req.query.domains || '').split(',').filter(Boolean);
  let packs = QUESTIONS[manche];
  if (domains.length) packs = packs.filter(p => domains.includes(p.domain));
  res.json(packs);
});

// ---------- Routes : parties terminées (uploadées par l'utilisateur) --
app.post('/api/me/game', requireUser, (req, res) => {
  const summary = req.body || {};
  const games = loadGames();
  games.games = games.games || [];
  games.games.push({
    id: crypto.randomBytes(6).toString('hex'),
    code: req.user.code,
    name: req.user.name,
    finishedAt: new Date().toISOString(),
    totalScore: summary.totalScore || 0,
    byManche:  summary.byManche  || {},
    nbQuestions: summary.nbQuestions || 0,
    nbCorrect:   summary.nbCorrect   || 0,
    nbWrong:     summary.nbWrong     || 0,
    config:      summary.config      || {},
    log:         Array.isArray(summary.log) ? summary.log : []
  });
  // Mettre à jour compteur sur le code
  const auth = loadAuth();
  if (auth.codes[req.user.code]) {
    auth.codes[req.user.code].gamesPlayed = (auth.codes[req.user.code].gamesPlayed || 0) + 1;
    auth.codes[req.user.code].lastUsed = new Date().toISOString();
    saveAuth(auth);
  }
  saveGames(games);
  res.json({ ok: true });
});

app.get('/api/me/games', requireUser, (req, res) => {
  const games = loadGames();
  const mine = (games.games || []).filter(g => g.code === req.user.code);
  res.json(mine);
});

// ---------- Routes : admin --------------------------------------------
app.get('/api/admin/codes', requireAdmin, (req, res) => {
  const auth = loadAuth();
  const games = loadGames();
  const list = Object.entries(auth.codes).map(([code, entry]) => {
    const gamesOf = (games.games || []).filter(g => g.code === code);
    const totalScore = gamesOf.reduce((s, g) => s + (g.totalScore || 0), 0);
    return {
      code,
      name: entry.name || null,
      createdAt: entry.createdAt,
      lastUsed:  entry.lastUsed || null,
      gamesPlayed: gamesOf.length,
      totalScore
    };
  }).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  res.json(list);
});

app.post('/api/admin/codes', requireAdmin, (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 60) || null;
  const auth = loadAuth();
  let code;
  do { code = genCode(); } while (auth.codes[code]);
  auth.codes[code] = {
    name,
    createdAt: new Date().toISOString(),
    lastUsed: null,
    gamesPlayed: 0
  };
  saveAuth(auth);
  res.json({ code, name });
});

app.delete('/api/admin/codes/:code', requireAdmin, (req, res) => {
  const code = String(req.params.code).toUpperCase();
  const auth = loadAuth();
  if (!auth.codes[code]) return res.status(404).json({ error: 'Code introuvable' });
  delete auth.codes[code];
  saveAuth(auth);
  res.json({ ok: true });
});

app.get('/api/admin/dashboard', requireAdmin, (req, res) => {
  const auth = loadAuth();
  const games = loadGames();
  const all = games.games || [];
  const totalGames = all.length;
  const totalQs    = all.reduce((s, g) => s + (g.nbQuestions || 0), 0);
  const totalCorr  = all.reduce((s, g) => s + (g.nbCorrect   || 0), 0);
  const byCode = {};
  for (const g of all) {
    if (!byCode[g.code]) byCode[g.code] = { code: g.code, name: g.name, games: 0, totalScore: 0, totalCorrect: 0, totalQuestions: 0, lastFinishedAt: null };
    const b = byCode[g.code];
    b.games += 1;
    b.totalScore += g.totalScore || 0;
    b.totalCorrect += g.nbCorrect || 0;
    b.totalQuestions += g.nbQuestions || 0;
    if (!b.lastFinishedAt || g.finishedAt > b.lastFinishedAt) b.lastFinishedAt = g.finishedAt;
  }
  // Inclure aussi les codes sans aucune partie
  for (const [code, e] of Object.entries(auth.codes)) {
    if (!byCode[code]) {
      byCode[code] = { code, name: e.name, games: 0, totalScore: 0, totalCorrect: 0, totalQuestions: 0, lastFinishedAt: null };
    }
  }
  const accuracy = totalQs ? Math.round(1000 * totalCorr / totalQs) / 10 : 0;
  res.json({
    summary: {
      totalCodes: Object.keys(auth.codes).length,
      totalGames,
      totalQuestions: totalQs,
      totalCorrect:   totalCorr,
      accuracy
    },
    byCode: Object.values(byCode).sort((a, b) => b.totalScore - a.totalScore),
    recent: all.slice().sort((a, b) => (b.finishedAt || '').localeCompare(a.finishedAt || '')).slice(0, 50)
      .map(g => ({ id: g.id, code: g.code, name: g.name, finishedAt: g.finishedAt, totalScore: g.totalScore, nbCorrect: g.nbCorrect, nbQuestions: g.nbQuestions }))
  });
});

app.get('/api/admin/game/:id', requireAdmin, (req, res) => {
  const games = loadGames();
  const g = (games.games || []).find(x => x.id === req.params.id);
  if (!g) return res.status(404).json({ error: 'Partie introuvable' });
  res.json(g);
});

// ---------- Routes : export / import (backup admin) -------------------
app.get('/api/admin/export', requireAdmin, (req, res) => {
  const auth = loadAuth();
  const games = loadGames();
  res.json({
    version: 1,
    exportedAt: new Date().toISOString(),
    auth,
    games
  });
});

app.post('/api/admin/import', requireAdmin, (req, res) => {
  const data = req.body || {};
  if (!data.auth || !data.games) return res.status(400).json({ error: 'Fichier invalide' });
  saveAuth(data.auth);
  saveGames(data.games);
  res.json({ ok: true });
});

// ---------- Démarrage ------------------------------------------------
app.listen(PORT, () => {
  // S'assurer que data/auth.json existe
  loadAuth();
  if (!fs.existsSync(GAMES_PATH)) saveGames({ games: [] });
  console.log(`\n🎯  QPC Économie & Sciences sociales`);
  console.log(`    Serveur : http://localhost:${PORT}`);
  console.log(`    ${QUESTIONS.meta.questionsTotal} questions · ${QUESTIONS.domains.length} domaines`);
  if (ADMIN_PASSWORD === DEFAULT_ADMIN_PASSWORD) {
    console.log(`\n⚠️  Mot de passe admin par défaut : "${DEFAULT_ADMIN_PASSWORD}"`);
    console.log(`    Pour la production, définir la variable ADMIN_PASSWORD.\n`);
  } else {
    console.log(`    Mot de passe admin : défini via env ADMIN_PASSWORD ✓\n`);
  }
});
