// =====================================================================
// server.js — Application QPC : serveur Express
// v2.1 — persistance permanente via branche `data` du repo GitHub,
//        export Excel, settings admin (toggle Révision libre)
// =====================================================================

const express = require('express');
const fs      = require('fs');
const path    = require('path');
const crypto  = require('crypto');
const XLSX    = require('xlsx');

const PORT           = process.env.PORT || 3000;
const ROOT           = __dirname;
const DATA           = path.join(ROOT, 'data');
const AUTH_PATH      = path.join(DATA, 'auth.json');
const GAMES_PATH     = path.join(DATA, 'games.json');
const QUESTIONS_PATH = path.join(DATA, 'questions.json');

// Mot de passe super-admin par défaut. À surcharger via ADMIN_PASSWORD.
const DEFAULT_ADMIN_PASSWORD = 'qpc-admin-2026';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

// Secret pour les tokens. Pour conserver les sessions entre redémarrages,
// définir TOKEN_SECRET en env. Sinon, sessions invalidées au redémarrage.
const TOKEN_SECRET = process.env.TOKEN_SECRET || crypto.randomBytes(32).toString('hex');

// Synchro GitHub : la branche `data` du repo contient auth.json + games.json.
// Au démarrage : on télécharge. À chaque écriture : on re-pousse (debounced).
// Si GH_TOKEN absent, on tombe en mode local seulement.
const GH_TOKEN  = process.env.GH_TOKEN;
const GH_REPO   = process.env.GH_REPO || 'Ricard228/qpc-app';
const GH_BRANCH = process.env.GH_BRANCH || 'data';

// ---------- Initialisation -------------------------------------------
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
  if (data) {
    // Migration : ajouter settings si absent
    if (!data.settings) data.settings = { reviewEnabled: true };
    return data;
  }
  const init = { codes: {}, settings: { reviewEnabled: true }, createdAt: new Date().toISOString() };
  writeJson(AUTH_PATH, init);
  return init;
}
function saveAuth(auth) {
  writeJson(AUTH_PATH, auth);
  scheduleGhSync('data/auth.json');
}

function loadGames() { return readJson(GAMES_PATH, { games: [] }); }
function saveGames(g) {
  writeJson(GAMES_PATH, g);
  scheduleGhSync('data/games.json');
}

// ---------- Synchronisation GitHub ------------------------------------
const ghShas = {};
const ghPending = {};

async function ghGetFile(remotePath) {
  if (!GH_TOKEN) return null;
  const url = `https://api.github.com/repos/${GH_REPO}/contents/${remotePath}?ref=${GH_BRANCH}`;
  const res = await fetch(url, { headers: { Authorization: `token ${GH_TOKEN}`, 'Accept': 'application/vnd.github+json' }});
  if (!res.ok) return null;
  const j = await res.json();
  ghShas[remotePath] = j.sha;
  return Buffer.from(j.content, 'base64').toString('utf8');
}

async function ghPutFile(remotePath, content, retry = 1) {
  if (!GH_TOKEN) return;
  const url = `https://api.github.com/repos/${GH_REPO}/contents/${remotePath}`;
  // Récupérer le SHA actuel si on ne l'a pas
  if (!ghShas[remotePath]) await ghGetFile(remotePath);
  const body = {
    message: `auto-sync: ${remotePath} ${new Date().toISOString()}`,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: GH_BRANCH
  };
  if (ghShas[remotePath]) body.sha = ghShas[remotePath];
  const res = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `token ${GH_TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github+json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const txt = await res.text();
    // Conflit de SHA : on re-fetch et on re-essaye une fois
    if ((res.status === 409 || res.status === 422) && retry > 0) {
      delete ghShas[remotePath];
      await ghGetFile(remotePath);   // récupère le bon SHA
      return ghPutFile(remotePath, content, retry - 1);
    }
    console.error(`⚠️  GitHub sync échec pour ${remotePath} : ${res.status} ${txt.slice(0, 200)}`);
    return;
  }
  const j = await res.json();
  ghShas[remotePath] = j.content.sha;
}

// Debounce : 4s de calme avant push
function scheduleGhSync(remotePath) {
  if (!GH_TOKEN) return;
  if (ghPending[remotePath]) clearTimeout(ghPending[remotePath]);
  ghPending[remotePath] = setTimeout(() => {
    ghPending[remotePath] = null;
    const localPath = path.join(ROOT, remotePath);
    if (!fs.existsSync(localPath)) return;
    const content = fs.readFileSync(localPath, 'utf8');
    ghPutFile(remotePath, content).catch(e => console.error('sync error:', e));
  }, 4000);
}

async function ghPullInitial() {
  if (!GH_TOKEN) {
    console.log('ℹ️  GH_TOKEN absent : mode local (les données ne survivent pas aux redémarrages Render).');
    return;
  }
  console.log(`🔁 Téléchargement initial depuis ${GH_REPO}#${GH_BRANCH}...`);
  for (const remotePath of ['data/auth.json', 'data/games.json']) {
    try {
      const content = await ghGetFile(remotePath);
      if (content) {
        fs.writeFileSync(path.join(ROOT, remotePath), content, 'utf8');
        console.log(`   ✓ ${remotePath} récupéré (${content.length} octets)`);
      } else {
        console.log(`   - ${remotePath} introuvable sur la branche (sera créé au premier write)`);
      }
    } catch (e) {
      console.error(`   ✗ ${remotePath} : ${e.message}`);
    }
  }
}

// ---------- App ------------------------------------------------------
const app = express();
app.use(express.json({ limit: '4mb' }));
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || req.path === '/' ||
      req.path.endsWith('.js') || req.path.endsWith('.css')) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});
app.use(express.static(path.join(ROOT, 'public')));

const QUESTIONS = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));

// ---------- Tokens ---------------------------------------------------
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

// ---------- Génération de codes --------------------------------------
function genCode() {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let out = 'QPC-';
  for (let i = 0; i < 8; i++) {
    out += alphabet[crypto.randomInt(0, alphabet.length)];
  }
  return out;
}

// ---------- Auth utilisateur -----------------------------------------
app.post('/api/auth/login', (req, res) => {
  const code = String(req.body.code || '').trim().toUpperCase();
  if (!code) return res.status(400).json({ error: 'Code requis' });
  const auth = loadAuth();
  const entry = auth.codes[code];
  if (!entry) return res.status(401).json({ error: 'Code invalide ou révoqué' });
  entry.lastUsed = new Date().toISOString();
  saveAuth(auth);
  // Token utilisateur : effectivement permanent (10 ans)
  const token = signToken({ role: 'user', code, exp: Date.now() + 10 * 365 * 24 * 3600 * 1000 });
  res.json({ token, name: entry.name || null, code });
});

app.post('/api/auth/admin', (req, res) => {
  const password = String(req.body.password || '');
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe admin invalide' });
  }
  // Token admin : 7 jours (sensibilité plus haute, ré-auth fréquente)
  const token = signToken({ role: 'admin', exp: Date.now() + 7 * 24 * 3600 * 1000 });
  res.json({ token });
});

// ---------- Questions ------------------------------------------------
app.get('/api/meta', requireUser, (req, res) => {
  const auth = loadAuth();
  res.json({
    ...QUESTIONS.meta,
    domains: QUESTIONS.domains,
    settings: auth.settings || { reviewEnabled: true }
  });
});

app.get('/api/packs/:manche', requireUser, (req, res) => {
  const { manche } = req.params;
  if (!['manche1', 'manche2', 'manche3'].includes(manche))
    return res.status(400).json({ error: 'manche invalide' });
  // Si la révision libre est désactivée, on peut quand même servir les packs pour le jeu
  const domains = (req.query.domains || '').split(',').filter(Boolean);
  let packs = QUESTIONS[manche];
  if (domains.length) packs = packs.filter(p => domains.includes(p.domain));
  res.json(packs);
});

// ---------- Parties ---------------------------------------------------
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

// ---------- Admin : codes --------------------------------------------
app.get('/api/admin/codes', requireAdmin, (req, res) => {
  const auth = loadAuth();
  const games = loadGames();
  const list = Object.entries(auth.codes).map(([code, entry]) => {
    const gamesOf = (games.games || []).filter(g => g.code === code);
    const totalScore = gamesOf.reduce((s, g) => s + (g.totalScore || 0), 0);
    return {
      code, name: entry.name || null,
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
  auth.codes[code] = { name, createdAt: new Date().toISOString(), lastUsed: null, gamesPlayed: 0 };
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

// ---------- Admin : settings (toggle révision libre) -----------------
app.get('/api/admin/settings', requireAdmin, (req, res) => {
  const auth = loadAuth();
  res.json(auth.settings || { reviewEnabled: true });
});

app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const auth = loadAuth();
  auth.settings = auth.settings || {};
  if (typeof req.body.reviewEnabled === 'boolean') auth.settings.reviewEnabled = req.body.reviewEnabled;
  saveAuth(auth);
  res.json(auth.settings);
});

// ---------- Admin : dashboard ----------------------------------------
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
  for (const [code, e] of Object.entries(auth.codes)) {
    if (!byCode[code]) byCode[code] = { code, name: e.name, games: 0, totalScore: 0, totalCorrect: 0, totalQuestions: 0, lastFinishedAt: null };
  }
  const accuracy = totalQs ? Math.round(1000 * totalCorr / totalQs) / 10 : 0;
  res.json({
    summary: {
      totalCodes: Object.keys(auth.codes).length,
      totalGames, totalQuestions: totalQs, totalCorrect: totalCorr, accuracy
    },
    byCode: Object.values(byCode).sort((a, b) => b.totalScore - a.totalScore),
    recent: all.slice().sort((a, b) => (b.finishedAt || '').localeCompare(a.finishedAt || '')).slice(0, 50)
      .map(g => ({ id: g.id, code: g.code, name: g.name, finishedAt: g.finishedAt, totalScore: g.totalScore, nbCorrect: g.nbCorrect, nbQuestions: g.nbQuestions })),
    settings: auth.settings || { reviewEnabled: true }
  });
});

app.get('/api/admin/game/:id', requireAdmin, (req, res) => {
  const games = loadGames();
  const g = (games.games || []).find(x => x.id === req.params.id);
  if (!g) return res.status(404).json({ error: 'Partie introuvable' });
  res.json(g);
});

// ---------- Admin : export JSON / Excel ------------------------------
app.get('/api/admin/export', requireAdmin, (req, res) => {
  const auth = loadAuth();
  const games = loadGames();
  res.json({ version: 1, exportedAt: new Date().toISOString(), auth, games });
});

app.post('/api/admin/import', requireAdmin, (req, res) => {
  const data = req.body || {};
  if (!data.auth || !data.games) return res.status(400).json({ error: 'Fichier invalide' });
  saveAuth(data.auth);
  saveGames(data.games);
  res.json({ ok: true });
});

// Export Excel : 3 feuilles (Codes, Parties, Détail des réponses)
app.get('/api/admin/export-excel', requireAdmin, (req, res) => {
  const auth = loadAuth();
  const games = loadGames();
  const all = games.games || [];

  // Feuille 1 : Codes
  const codesRows = Object.entries(auth.codes).map(([code, e]) => {
    const gOf = all.filter(g => g.code === code);
    return {
      'Code': code,
      'Nom': e.name || '',
      'Créé le': e.createdAt || '',
      'Dernière connexion': e.lastUsed || '',
      'Parties jouées': gOf.length,
      'Score cumulé': gOf.reduce((s, g) => s + (g.totalScore || 0), 0),
      'Questions répondues': gOf.reduce((s, g) => s + (g.nbQuestions || 0), 0),
      'Bonnes réponses': gOf.reduce((s, g) => s + (g.nbCorrect || 0), 0)
    };
  });

  // Feuille 2 : Parties
  const gamesRows = all.map(g => ({
    'ID partie': g.id,
    'Code utilisateur': g.code,
    'Nom': g.name || '',
    'Terminée le': g.finishedAt,
    'Score total': g.totalScore || 0,
    'Score Manche 1': (g.byManche && g.byManche.manche1) || 0,
    'Score Manche 2': (g.byManche && g.byManche.manche2) || 0,
    'Score Manche 3': (g.byManche && g.byManche.manche3) || 0,
    'Questions': g.nbQuestions || 0,
    'Bonnes': g.nbCorrect || 0,
    'Mauvaises/passées': g.nbWrong || 0,
    'Manches jouées': (g.config && g.config.manches || []).join(',')
  }));

  // Feuille 3 : Détail des réponses (toutes les questions de toutes les parties)
  const detailRows = [];
  for (const g of all) {
    for (const l of (g.log || [])) {
      detailRows.push({
        'ID partie': g.id,
        'Code': g.code,
        'Nom': g.name || '',
        'Terminée le': g.finishedAt,
        'Manche': l.manche,
        'Pack': l.packTitle || '',
        'Question': l.q || '',
        'Réponse attendue': l.expected || '',
        'Réponse donnée': l.given || '',
        'Correct': l.correct ? 'Oui' : 'Non',
        'Points': l.pts || 0,
        'Points gagnés': l.awarded || 0
      });
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(codesRows),  'Codes');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(gamesRows),  'Parties');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(detailRows), 'Détail réponses');

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  const datestamp = new Date().toISOString().slice(0, 10);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="qpc-export-${datestamp}.xlsx"`);
  res.send(buf);
});

// Admin : purge complète (suppression base de données)
app.delete('/api/admin/all-data', requireAdmin, (req, res) => {
  if (req.body.confirm !== 'OUI-SUPPRIMER-TOUT') {
    return res.status(400).json({ error: 'Confirmation requise : body.confirm = "OUI-SUPPRIMER-TOUT"' });
  }
  saveAuth({ codes: {}, settings: { reviewEnabled: true }, createdAt: new Date().toISOString() });
  saveGames({ games: [] });
  res.json({ ok: true });
});

// ---------- Démarrage ------------------------------------------------
(async () => {
  await ghPullInitial();
  // S'assurer que les fichiers existent
  loadAuth();
  if (!fs.existsSync(GAMES_PATH)) saveGames({ games: [] });

  app.listen(PORT, () => {
    console.log(`\n🎯  QPC Économie & Sciences sociales — v2.1`);
    console.log(`    Serveur : http://localhost:${PORT}`);
    console.log(`    ${QUESTIONS.meta.questionsTotal} questions · ${QUESTIONS.domains.length} domaines`);
    if (ADMIN_PASSWORD === DEFAULT_ADMIN_PASSWORD) {
      console.log(`\n⚠️  Mot de passe admin par défaut : "${DEFAULT_ADMIN_PASSWORD}"`);
      console.log(`    Pour la production, définir ADMIN_PASSWORD.\n`);
    } else {
      console.log(`    Mot de passe admin : défini via env ADMIN_PASSWORD ✓`);
    }
    if (GH_TOKEN) console.log(`    Persistance GitHub : ${GH_REPO}#${GH_BRANCH} ✓\n`);
    else console.log(`    Persistance GitHub : désactivée (GH_TOKEN non défini)\n`);
  });
})();
