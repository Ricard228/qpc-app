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
const MATCHES_PATH   = path.join(DATA, 'matches.json');
const CUSTOM_PATH    = path.join(DATA, 'custom-packs.json');
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

const DEFAULT_TIMINGS = { manche1: 40, manche2: 25, manche3: 15 };

function loadAuth() {
  const data = readJson(AUTH_PATH, null);
  if (data) {
    // Migration : ajouter settings si absent
    if (!data.settings) data.settings = {};
    if (data.settings.reviewEnabled == null) data.settings.reviewEnabled = true;
    if (data.settings.qcmMode == null) data.settings.qcmMode = 'user-choice';
    if (data.settings.liveScoreboardMode == null) data.settings.liveScoreboardMode = 'user-choice';
    if (data.settings.helpEnabledForUsers == null) data.settings.helpEnabledForUsers = true;
    if (data.settings.selfRegistrationEnabled == null) data.settings.selfRegistrationEnabled = true;
    if (!data.settings.timings) data.settings.timings = { ...DEFAULT_TIMINGS };
    if (!data.accounts) data.accounts = {};
    if (!data.codes) data.codes = {};
    return data;
  }
  const init = {
    codes: {}, accounts: {},
    settings: {
      reviewEnabled: true, qcmMode: 'user-choice',
      liveScoreboardMode: 'user-choice', helpEnabledForUsers: true,
      selfRegistrationEnabled: true,
      timings: { ...DEFAULT_TIMINGS }
    },
    createdAt: new Date().toISOString()
  };
  writeJson(AUTH_PATH, init);
  return init;
}

// ---------- Hash de mot de passe (scrypt) ---------------------------
function hashPassword(plain) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(plain, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}
function verifyPassword(plain, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  try {
    const test = crypto.scryptSync(plain, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(test, 'hex'));
  } catch { return false; }
}

// Normalisation email + validation simple
function normEmail(e) { return String(e || '').trim().toLowerCase(); }
function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function saveAuth(auth) {
  writeJson(AUTH_PATH, auth);
  scheduleGhSync('data/auth.json');
}

function loadGames() { return readJson(GAMES_PATH, { games: [] }); }
function saveGames(g) {
  writeJson(GAMES_PATH, g);
  scheduleGhSync('data/games.json');
}

function loadMatches() { return readJson(MATCHES_PATH, { matches: [] }); }
function saveMatches(m) {
  writeJson(MATCHES_PATH, m);
  scheduleGhSync('data/matches.json');
}

function loadCustomDomains() { return readJson(CUSTOM_PATH, { domains: [] }); }
function saveCustomDomains(d) {
  writeJson(CUSTOM_PATH, d);
  scheduleGhSync('data/custom-packs.json');
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
  for (const remotePath of ['data/auth.json', 'data/games.json', 'data/matches.json', 'data/custom-packs.json']) {
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

// =====================================================================
// Domaines personnalisés (import admin de .txt ou .json)
// =====================================================================

// Convertit un pack importé en pack QPC normalisé (id, type, etc.)
function normalizeImportedPack(rawPack, domainName, indexInDomain) {
  const manche = ['manche1', 'manche2', 'manche3'].includes(rawPack.manche) ? rawPack.manche
                 : (rawPack.type && ['manche1','manche2','manche3'].includes(rawPack.type) ? rawPack.type : 'manche1');
  const packId = `custom-${domainName.replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 24)}-${manche}-${indexInDomain + 1}`;
  const title = String(rawPack.title || rawPack.titre || `Pack ${indexInDomain + 1}`).slice(0, 120);
  const theme = rawPack.theme || rawPack.thème || null;
  const questions = (rawPack.questions || []).map((rq, qi) => {
    const q = String(rq.q || rq.question || '').trim();
    const r = String(rq.r || rq.answer || rq.réponse || '').trim();
    const choices = Array.isArray(rq.choices) ? rq.choices.map(c => String(c).trim()).filter(Boolean) : [];
    const correctIndices = Array.isArray(rq.correctIndices) && rq.correctIndices.length
                             ? rq.correctIndices.map(Number).filter(n => Number.isFinite(n))
                             : (choices.length && r ? choices.reduce((acc, c, i) => {
                                 if (c.toLowerCase().trim() === r.toLowerCase().trim()) acc.push(i);
                                 return acc;
                               }, []) : []);
    return {
      id: `${packId}-q${qi + 1}`,
      q, r,
      choices: choices.length >= 2 ? choices : undefined,
      correctIndices: choices.length >= 2 && correctIndices.length ? correctIndices : undefined,
      e: rq.e || rq.explanation || rq.explication || '',
      ref: rq.ref || rq.source || rq.s || '',
      pts: Number(rq.pts) || 1
    };
  }).filter(q => q.q && q.r);
  return {
    id: packId,
    type: manche,
    titre: title,
    theme,
    domain: domainName,
    timing: manche === 'manche2' ? '25 s / question' :
            manche === 'manche3' ? 'Buzz libre — 1 min 30 — 9 points gagnants' : null,
    questions,
    isCustom: true
  };
}

// Parser TXT structuré (format documenté côté admin).
//
// Grammaire :
//   DOMAINE: <nom>
//   DESCRIPTION: <texte> (optionnel)
//   PACK: <titre>
//   MANCHE: 1|2|3 (défaut 1)
//   THEME: <texte> (optionnel)
//   Q: <question>
//   R: <réponse>           (texte attendu)
//   * <choix correct>      (au moins 1 si QCM)
//   - <choix distracteur>
//   E: <explication>       (optionnel)
//   S: <url ou source>     (optionnel)
//   PTS: <1..6>            (manche 2)
//   # <commentaire>        (ignoré)
function parseCustomTxt(text) {
  const lines = String(text || '').split(/\r?\n/);
  let domain = null, description = '';
  const packs = [];
  let curPack = null, curQ = null, curManche = 'manche1';

  function pushCurrent() {
    if (curQ && curPack) curPack.questions.push(curQ);
    curQ = null;
  }
  function finishPack() {
    pushCurrent();
    if (curPack) packs.push(curPack);
    curPack = null;
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;

    // Choix QCM : * ou -
    if ((line.startsWith('*') || line.startsWith('-')) && curQ) {
      const isCorrect = line.startsWith('*');
      const choiceText = line.slice(1).trim();
      if (!choiceText) continue;
      curQ.choices = curQ.choices || [];
      curQ.correctIndices = curQ.correctIndices || [];
      curQ.choices.push(choiceText);
      if (isCorrect) curQ.correctIndices.push(curQ.choices.length - 1);
      continue;
    }

    // Clé: valeur
    const m = line.match(/^([A-Za-zÉÈÊ]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toUpperCase()
      .replace('É', 'E').replace('È', 'E').replace('Ê', 'E');
    const val = m[2].trim();

    switch (key) {
      case 'DOMAINE': case 'DOMAIN':
        domain = val; break;
      case 'DESCRIPTION':
        description = val; break;
      case 'PACK':
        finishPack();
        curPack = { title: val, manche: curManche, theme: null, questions: [] };
        break;
      case 'MANCHE':
        curManche = 'manche' + (parseInt(val, 10) || 1);
        if (curPack) curPack.manche = curManche;
        break;
      case 'THEME':
        if (curPack) curPack.theme = val;
        break;
      case 'Q':
        pushCurrent();
        curQ = { q: val };
        break;
      case 'R': case 'A':
        if (curQ) curQ.r = val;
        break;
      case 'E':
        if (curQ) curQ.e = val;
        break;
      case 'S': case 'REF': case 'SOURCE':
        if (curQ) curQ.ref = val;
        break;
      case 'PTS':
        if (curQ) curQ.pts = parseInt(val, 10) || 1;
        break;
    }
  }
  finishPack();

  // Validation : si choices présents mais r vide, prendre le 1er choix correct
  for (const p of packs) {
    for (const q of p.questions) {
      if (!q.r && q.choices && q.correctIndices && q.correctIndices.length) {
        q.r = q.choices[q.correctIndices[0]];
      }
    }
  }
  return { domain, description, packs };
}

// =====================================================================
// PARSER LANGAGE NATUREL (v2.24)
// =====================================================================
// Format ultra-simple pour les admins non-techniques. Exemple :
//
//   Titre de l'évaluation
//   Q1 : Quelle est la capitale du Togo ?
//      R1 : Lomé
//   Q2 : En quelle année la BCEAO a-t-elle été créée ?
//      R2 : 1962
//
// Variantes acceptées : "Q1.", "Q1)", "1.", "1)", "Question 1:", "Q :",
// "R1.", "R:", "A:", "Réponse 1:", "Réponse :"…
// Indentation libre, lignes vides tolérées.
function parseNaturalQA(text) {
  const lines = String(text || '').split(/\r?\n/);
  const out = { title: '', pairs: [] };
  // Regex robustes : capture le marqueur Q/R éventuellement suivi d'un n°
  const qRe = /^\s*(?:q(?:uestion)?\s*\d*\s*[:\-.)]|\d+\s*[:\-.)])\s*(.*)$/i;
  const rRe = /^\s*(?:r(?:[ée]ponse)?\s*\d*\s*[:\-.)]|a\s*\d*\s*[:\-.)])\s*(.*)$/i;
  let curQ = null;
  let curR = null;
  let titleFound = false;

  function flush() {
    if (curQ && curR) {
      out.pairs.push({ q: curQ.trim(), r: curR.trim() });
    }
    curQ = curR = null;
  }

  for (let raw of lines) {
    const line = raw.replace(/\t/g, '  ');
    if (!line.trim()) continue;
    const mQ = line.match(qRe);
    const mR = line.match(rRe);
    if (mQ) {
      flush();
      curQ = mQ[1] || '';
      continue;
    }
    if (mR) {
      curR = mR[1] || '';
      continue;
    }
    // Première ligne sans marqueur → titre
    if (!titleFound && !curQ && !curR) {
      out.title = line.trim();
      titleFound = true;
      continue;
    }
    // Continuation : on l'ajoute à la dernière partie ouverte (Q ou R)
    if (curR != null) curR = (curR + ' ' + line.trim()).trim();
    else if (curQ != null) curQ = (curQ + ' ' + line.trim()).trim();
  }
  flush();
  return out;
}

// =====================================================================
// GÉNÉRATEUR DE DISTRACTEURS (v2.24)
// =====================================================================
// Produit des distracteurs réalistes pour une bonne réponse donnée.
// Stratégie par catégorie :
//   - Pourcentage (12%, 12 %)        → ± 2, ± 5, ± 10 points
//   - Année (1962, 2010…)            → ± 1, ± 3, ± 8 ans
//   - Nombre simple (42, 1500)       → variations ± 10% / ± 50% / *2
//   - Montant FCFA / €               → variations multiplicatives
//   - Date complète                  → décalage mois/année
//   - Mot unique (économie)          → dictionnaire de concepts proches
//   - Phrase                         → paraphrases avec négations / quantifieurs
// Toujours au moins `count` distracteurs uniques, chacun ≥ longueur de la
// bonne réponse (conformément à la politique v2.8). Si on n'en a pas assez,
// on rallonge avec des préfixes neutres ("environ ", "approximativement ",
// "soit environ ", etc.).
const ECON_FILLER = [
  'la déflation', 'la stagflation', 'la désinflation', 'l\'hyperinflation',
  'le déficit commercial', 'l\'excédent budgétaire', 'le PIB nominal', 'le PIB réel',
  'la politique monétaire restrictive', 'la politique budgétaire expansionniste',
  'la balance courante', 'la balance des paiements', 'la dette extérieure',
  'le solde primaire', 'le multiplicateur keynésien', 'l\'effet d\'éviction',
  'l\'effet de richesse', 'la courbe de Phillips', 'la trappe à liquidité',
  'l\'équilibre walrasien', 'l\'optimum de Pareto', 'le surplus du consommateur',
  'le coefficient de Gini', 'l\'indice de développement humain', 'la productivité globale des facteurs',
  'la BCEAO', 'la BOAD', 'l\'UEMOA', 'la CEDEAO', 'le FMI', 'la Banque mondiale',
  'la BRVM', 'le CREPMF', 'l\'éco', 'le pacte de convergence',
  'l\'asymétrie d\'information', 'l\'aléa moral', 'le risque systémique',
  'la prime de risque', 'le ratio cours/bénéfice', 'le taux directeur'
];

function detectAnswerType(answer) {
  const a = String(answer).trim();
  if (/^[+-]?\d{4}$/.test(a) && Number(a) >= 1500 && Number(a) <= 2200) return 'year';
  if (/^[+-]?\d+([.,]\d+)?\s*%$/.test(a)) return 'percent';
  if (/^[+-]?\d+([.,]\d+)?\s*(fcfa|cfa|€|eur|\$|usd|dollars?|euros?)$/i.test(a)) return 'money';
  if (/^[+-]?\d{1,3}(?:[\s.,]\d{3})*([.,]\d+)?\s*(fcfa|cfa|€|eur|\$|usd|millions?|milliards?)?/i.test(a) && /\d{4,}/.test(a)) return 'money';
  if (/^[+-]?\d+([.,]\d+)?$/.test(a)) return 'number';
  if (/^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}$/.test(a)) return 'date';
  if (/^[A-ZÀ-Ý][a-zà-ÿ' -]+$/.test(a) && a.split(' ').length <= 3) return 'short';
  return 'phrase';
}

function pickNumber(str) {
  const m = String(str).match(/[+-]?\d+([.,]\d+)?/);
  return m ? parseFloat(m[0].replace(',', '.')) : null;
}

function ensureMinLength(text, minLen) {
  if (String(text).length >= minLen) return String(text);
  const fillers = ['environ ', 'approximativement ', 'autour de ', 'à peu près ', 'soit environ ', 'plutôt '];
  for (const f of fillers) {
    const candidate = f + text;
    if (candidate.length >= minLen) return candidate;
  }
  // Rallonge brutale si vraiment trop court
  return text + ' (estimation)';
}

function generateDistractors(question, answer, count = 3) {
  const ans = String(answer).trim();
  const minLen = ans.length;
  const type = detectAnswerType(ans);
  const out = new Set();

  function tryAdd(d) {
    if (!d) return;
    const s = ensureMinLength(String(d).trim(), minLen);
    if (s && s.toLowerCase() !== ans.toLowerCase()) out.add(s);
  }

  if (type === 'year') {
    const y = parseInt(ans, 10);
    [-12, -7, -3, -1, +1, +3, +5, +8].forEach(d => tryAdd(String(y + d)));
  } else if (type === 'percent') {
    const v = pickNumber(ans);
    const unit = ans.includes(' %') ? ' %' : '%';
    if (v != null) {
      [-15, -10, -5, -2, +2, +5, +10, +15].forEach(d => {
        const val = Math.max(0, +(v + d).toFixed(2));
        tryAdd(`${val}${unit}`);
      });
    }
  } else if (type === 'money' || type === 'number') {
    const v = pickNumber(ans);
    const suffix = ans.replace(/^[+-]?\d+([.,]\d+)?\s*/, '').trim();
    if (v != null && v !== 0) {
      const variants = [v * 0.5, v * 0.8, v * 1.2, v * 1.5, v * 2, v + 10, Math.max(0, v - 10)];
      variants.forEach(x => {
        const rounded = Math.abs(x) >= 100 ? Math.round(x) : +x.toFixed(2);
        tryAdd(`${rounded}${suffix ? ' ' + suffix : ''}`);
      });
    } else if (v === 0) {
      [1, 5, 10, 25, 100].forEach(x => tryAdd(`${x}${suffix ? ' ' + suffix : ''}`));
    }
  } else if (type === 'date') {
    const parts = ans.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})/);
    if (parts) {
      const [_, d, m, y] = parts;
      const yy = parseInt(y, 10);
      const mm = parseInt(m, 10);
      const dd = parseInt(d, 10);
      const fmt = (D, M, Y) => `${String(D).padStart(2, '0')}/${String(M).padStart(2, '0')}/${Y}`;
      tryAdd(fmt(dd, ((mm % 12) + 1), yy));
      tryAdd(fmt(dd, ((mm + 5) % 12) + 1, yy));
      tryAdd(fmt(dd, mm, yy - 1));
      tryAdd(fmt(dd, mm, yy + 1));
      tryAdd(fmt(((dd % 28) + 1), mm, yy));
    }
  } else if (type === 'short') {
    // Mot unique ou très courte expression → on pioche dans le dico éco
    const shuf = ECON_FILLER.slice().sort(() => Math.random() - 0.5);
    for (const w of shuf) tryAdd(w);
  } else {
    // Phrase complète → on construit des variantes plausibles
    const ans2 = ans;
    // Inversions logiques
    if (/\baugmente\b/i.test(ans2)) tryAdd(ans2.replace(/\baugmente\b/gi, 'diminue'));
    if (/\bdiminue\b/i.test(ans2)) tryAdd(ans2.replace(/\bdiminue\b/gi, 'augmente'));
    if (/\bcroît\b/i.test(ans2))   tryAdd(ans2.replace(/\bcroît\b/gi, 'décroît'));
    if (/\bpositif\b/i.test(ans2)) tryAdd(ans2.replace(/\bpositif\b/gi, 'négatif'));
    if (/\bnégatif\b/i.test(ans2)) tryAdd(ans2.replace(/\bnégatif\b/gi, 'positif'));
    // Quantifieurs
    if (/\bla majorité\b/i.test(ans2)) tryAdd(ans2.replace(/\bla majorité\b/gi, 'une minorité'));
    if (/\btoujours\b/i.test(ans2))    tryAdd(ans2.replace(/\btoujours\b/gi, 'jamais'));
    if (/\baucun\b/i.test(ans2))       tryAdd(ans2.replace(/\baucun\b/gi, 'plusieurs'));
    // Dérivations économiques
    tryAdd(`L'effet inverse de "${ans2.slice(0, 40)}…"`);
    tryAdd(`Une stricte conséquence de l'inflation sous-jacente`);
    tryAdd(`Un mécanisme d'ajustement de la balance des paiements`);
    tryAdd(`Une politique monétaire conjoncturelle de la BCEAO`);
    tryAdd(`Le résultat attendu d'une politique budgétaire restrictive`);
  }

  // Si toujours pas assez : compléter par le dictionnaire générique
  if (out.size < count) {
    const shuf = ECON_FILLER.slice().sort(() => Math.random() - 0.5);
    for (const w of shuf) {
      if (out.size >= count + 1) break;
      tryAdd(w);
    }
  }

  // Retourner les `count` premiers (mélangés)
  return Array.from(out).slice(0, count);
}

// Renvoie tous les packs (builtin + custom) pour une manche donnée
function getPacksForManche(manche) {
  const builtin = QUESTIONS[manche] || [];
  const customStore = loadCustomDomains();
  const customPacks = [];
  for (const d of customStore.domains) {
    for (const p of (d.packs || [])) {
      if (p.type === manche) customPacks.push(p);
    }
  }
  return [...builtin, ...customPacks];
}

// Renvoie tous les domaines (builtin + custom) avec leurs counts
function getAllDomainsWithCount() {
  const domains = QUESTIONS.domains.map(d => ({ ...d }));
  const customStore = loadCustomDomains();
  for (const d of customStore.domains) {
    const count = (d.packs || []).reduce((s, p) => s + (p.questions || []).length, 0);
    if (count > 0) domains.push({ name: d.name, count, isCustom: true });
  }
  return domains.sort((a, b) => b.count - a.count);
}

// Compute meta dynamiquement (en intégrant les domaines custom)
function computeMeta() {
  const customStore = loadCustomDomains();
  let extraM1 = 0, extraM2 = 0, extraM3 = 0, extraQ = 0;
  for (const d of customStore.domains) {
    for (const p of (d.packs || [])) {
      if (p.type === 'manche1') extraM1++;
      else if (p.type === 'manche2') extraM2++;
      else if (p.type === 'manche3') extraM3++;
      extraQ += (p.questions || []).length;
    }
  }
  return {
    ...QUESTIONS.meta,
    manche1Count: QUESTIONS.meta.manche1Count + extraM1,
    manche2Count: QUESTIONS.meta.manche2Count + extraM2,
    manche3Count: QUESTIONS.meta.manche3Count + extraM3,
    questionsTotal: QUESTIONS.meta.questionsTotal + extraQ,
    domains: getAllDomainsWithCount()
  };
}

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
  // Méthode C : session sur un code visiteur partagé (code + pseudo + sessionId)
  if (tok.code && tok.visitorName) {
    const entry = auth.codes[tok.code];
    if (!entry) return res.status(401).json({ error: 'Code révoqué' });
    if (!entry.visitor) return res.status(401).json({ error: 'Ce code n\'est plus en mode visiteur' });
    req.user = {
      code: tok.code,
      name: tok.visitorName,
      visitorName: tok.visitorName,
      sessionId: tok.sessionId || null,
      authType: 'visitor'
    };
    return next();
  }
  // Méthode A : code nominatif généré par l'admin
  if (tok.code) {
    const entry = auth.codes[tok.code];
    if (!entry) return res.status(401).json({ error: 'Code révoqué' });
    if (entry.visitor) return res.status(401).json({ error: 'Ce code est devenu un code visiteur — reconnectez-vous avec un pseudo' });
    req.user = { code: tok.code, name: entry.name || null, authType: 'code' };
    return next();
  }
  // Méthode B : compte auto-inscrit (email/pseudo + password)
  if (tok.accountId) {
    const acc = auth.accounts && auth.accounts[tok.accountId];
    if (!acc) return res.status(401).json({ error: 'Compte révoqué' });
    req.user = { accountId: tok.accountId, name: acc.pseudo || acc.email, email: acc.email, code: 'ACC-' + tok.accountId.slice(0, 8), authType: 'account', isAdmin: !!acc.isAdmin };
    return next();
  }
  return res.status(401).json({ error: 'Token invalide' });
}

// Garde-fou : les sessions visiteur ne peuvent ni créer ni accepter
// un duel (identité partagée → ambigu). À placer après requireUser sur
// les routes /api/me/duels.
function blockVisitors(req, res, next) {
  if (req.user && req.user.authType === 'visitor') {
    return res.status(403).json({ error: 'Les sessions visiteur ne peuvent pas participer aux duels. Demandez un code nominatif à l\'administrateur.' });
  }
  next();
}
function requireAdmin(req, res, next) {
  const tok = verifyToken(extractToken(req));
  if (!tok || tok.role !== 'admin') return res.status(401).json({ error: 'Authentification admin requise' });
  // Super-admin (mot de passe ADMIN_PASSWORD) ou admin nommé (compte promu)
  if (tok.superAdmin) {
    req.admin = { superAdmin: true };
    return next();
  }
  if (tok.accountId) {
    const auth = loadAuth();
    const acc = auth.accounts && auth.accounts[tok.accountId];
    if (!acc || !acc.isAdmin) return res.status(401).json({ error: 'Privilèges admin révoqués' });
    req.admin = { superAdmin: false, accountId: tok.accountId, name: acc.pseudo || acc.email };
    return next();
  }
  return res.status(401).json({ error: 'Token admin invalide' });
}
function requireSuperAdmin(req, res, next) {
  const tok = verifyToken(extractToken(req));
  if (!tok || tok.role !== 'admin' || !tok.superAdmin) {
    return res.status(403).json({ error: 'Réservé au super-administrateur' });
  }
  req.admin = { superAdmin: true };
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
  // Code visiteur (partagé) : on ne délivre PAS de token directement.
  // Le client doit fournir un pseudo de session via /api/auth/login-visitor.
  if (entry.visitor) {
    return res.json({
      visitor: true,
      code,
      label: entry.name || null
    });
  }
  entry.lastUsed = new Date().toISOString();
  saveAuth(auth);
  // Token utilisateur : effectivement permanent (10 ans)
  const token = signToken({ role: 'user', code, exp: Date.now() + 10 * 365 * 24 * 3600 * 1000 });
  res.json({ token, name: entry.name || null, code });
});

// Login d'une SESSION sur un code visiteur partagé. Chaque appel crée
// une session distincte (sessionId aléatoire). Les parties enregistrées
// sont liées au code visiteur + au pseudo de session.
app.post('/api/auth/login-visitor', (req, res) => {
  const code = String(req.body.code || '').trim().toUpperCase();
  const visitorName = String(req.body.visitorName || req.body.pseudo || '').trim().slice(0, 60);
  if (!code) return res.status(400).json({ error: 'Code requis' });
  if (visitorName.length < 2) return res.status(400).json({ error: 'Pseudo trop court (minimum 2 caractères)' });
  const auth = loadAuth();
  const entry = auth.codes[code];
  if (!entry) return res.status(401).json({ error: 'Code invalide ou révoqué' });
  if (!entry.visitor) return res.status(400).json({ error: 'Ce code n\'est pas un code visiteur. Utilisez /api/auth/login.' });
  entry.lastUsed = new Date().toISOString();
  // Optionnel : suivre les noms uniques utilisés sur ce code visiteur
  entry.visitorSeen = Array.isArray(entry.visitorSeen) ? entry.visitorSeen : [];
  if (!entry.visitorSeen.includes(visitorName)) {
    entry.visitorSeen.push(visitorName);
    // Cap doux pour éviter une croissance illimitée
    if (entry.visitorSeen.length > 500) entry.visitorSeen = entry.visitorSeen.slice(-500);
  }
  saveAuth(auth);
  const sessionId = crypto.randomBytes(6).toString('hex');
  // Session courte : 24h, renouvelable
  const token = signToken({
    role: 'user',
    code,
    visitorName,
    sessionId,
    exp: Date.now() + 24 * 3600 * 1000
  });
  res.json({ token, code, visitorName, sessionId, name: visitorName });
});

app.post('/api/auth/admin', (req, res) => {
  const password = String(req.body.password || '');
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe admin invalide' });
  }
  // Super-admin (mot de passe global) : 7 jours
  const token = signToken({ role: 'admin', superAdmin: true, exp: Date.now() + 7 * 24 * 3600 * 1000 });
  res.json({ token, superAdmin: true });
});

// Endpoint public minimal : indique si l'inscription est ouverte
// (utilisé par la page de garde pour afficher/cacher l'onglet "Créer un compte").
app.get('/api/public/info', (req, res) => {
  const auth = loadAuth();
  res.json({
    selfRegistrationEnabled: auth.settings ? auth.settings.selfRegistrationEnabled !== false : true
  });
});

// ---------- Auth : inscription et login par compte ------------------
app.post('/api/auth/register', (req, res) => {
  const auth = loadAuth();
  if (!auth.settings || auth.settings.selfRegistrationEnabled === false) {
    return res.status(403).json({ error: 'L\'inscription est désactivée par l\'administrateur. Demandez un code d\'accès.' });
  }
  const email  = normEmail(req.body.email);
  const pseudo = String(req.body.pseudo || '').trim().slice(0, 60);
  const password = String(req.body.password || '');
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Adresse e-mail invalide' });
  if (pseudo.length < 2) return res.status(400).json({ error: 'Pseudo trop court (minimum 2 caractères)' });
  if (password.length < 6) return res.status(400).json({ error: 'Mot de passe trop court (minimum 6 caractères)' });
  // Vérifier l'unicité de l'email
  const accounts = auth.accounts || {};
  for (const id of Object.keys(accounts)) {
    if (accounts[id].email === email) {
      return res.status(409).json({ error: 'Un compte existe déjà avec cet e-mail' });
    }
  }
  const id = crypto.randomBytes(8).toString('hex');
  accounts[id] = {
    id, email, pseudo,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    lastUsed: null,
    isAdmin: false,
    gamesPlayed: 0
  };
  auth.accounts = accounts;
  saveAuth(auth);
  const token = signToken({ role: 'user', accountId: id, exp: Date.now() + 10 * 365 * 24 * 3600 * 1000 });
  res.json({ token, accountId: id, pseudo, email, isAdmin: false });
});

app.post('/api/auth/login-account', (req, res) => {
  const identifier = String(req.body.identifier || req.body.email || req.body.pseudo || '').trim();
  const password = String(req.body.password || '');
  if (!identifier || !password) return res.status(400).json({ error: 'E-mail/pseudo et mot de passe requis' });
  const auth = loadAuth();
  const accounts = auth.accounts || {};
  const idLower = identifier.toLowerCase();
  // Chercher par email d'abord, puis par pseudo (insensible casse)
  let found = null;
  for (const id of Object.keys(accounts)) {
    const a = accounts[id];
    if (a.email === idLower || (a.pseudo && a.pseudo.toLowerCase() === idLower)) {
      found = a; break;
    }
  }
  if (!found) return res.status(401).json({ error: 'Identifiants invalides' });
  if (!verifyPassword(password, found.passwordHash)) {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }
  found.lastUsed = new Date().toISOString();
  saveAuth(auth);
  // Si le compte est admin, on délivre AUSSI un token admin pour qu'il
  // puisse accéder au panneau ; sinon token user uniquement.
  const userToken = signToken({ role: 'user', accountId: found.id, exp: Date.now() + 10 * 365 * 24 * 3600 * 1000 });
  const out = { token: userToken, accountId: found.id, pseudo: found.pseudo, email: found.email, isAdmin: !!found.isAdmin };
  if (found.isAdmin) {
    out.adminToken = signToken({ role: 'admin', accountId: found.id, exp: Date.now() + 7 * 24 * 3600 * 1000 });
  }
  res.json(out);
});

// ---------- Questions ------------------------------------------------
app.get('/api/meta', requireUser, (req, res) => {
  const auth = loadAuth();
  res.json({
    ...computeMeta(),
    settings: auth.settings || { reviewEnabled: true, qcmMode: 'user-choice', liveScoreboardMode: 'user-choice' },
    authType: req.user.authType,                                  // 'code' | 'visitor' | 'account'
    visitorName: req.user.visitorName || null,
    // Les sessions visiteur n'ont pas accès aux duels — pas de check
    hasActiveDuel: req.user.authType === 'visitor' ? false : userHasActiveDuel(req.user.code)
  });
});

app.get('/api/packs/:manche', requireUser, (req, res) => {
  const { manche } = req.params;
  if (!['manche1', 'manche2', 'manche3'].includes(manche))
    return res.status(400).json({ error: 'manche invalide' });
  const domains = (req.query.domains || '').split(',').filter(Boolean);
  let packs = getPacksForManche(manche);
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
    code: req.user.code,            // pour comptes : "ACC-<8 chars>"
    accountId: req.user.accountId || null,
    visitorName: req.user.visitorName || null,   // null si non-visiteur
    sessionId:   req.user.sessionId   || null,
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
  if (req.user.authType === 'code' && auth.codes[req.user.code]) {
    auth.codes[req.user.code].gamesPlayed = (auth.codes[req.user.code].gamesPlayed || 0) + 1;
    auth.codes[req.user.code].lastUsed = new Date().toISOString();
    saveAuth(auth);
  } else if (req.user.authType === 'visitor' && auth.codes[req.user.code]) {
    // Compteur global du code visiteur (toutes sessions confondues)
    auth.codes[req.user.code].gamesPlayed = (auth.codes[req.user.code].gamesPlayed || 0) + 1;
    auth.codes[req.user.code].lastUsed = new Date().toISOString();
    saveAuth(auth);
  } else if (req.user.authType === 'account' && auth.accounts && auth.accounts[req.user.accountId]) {
    auth.accounts[req.user.accountId].gamesPlayed = (auth.accounts[req.user.accountId].gamesPlayed || 0) + 1;
    auth.accounts[req.user.accountId].lastUsed = new Date().toISOString();
    saveAuth(auth);
  }
  saveGames(games);
  res.json({ ok: true });
});

app.get('/api/me/games', requireUser, (req, res) => {
  const games = loadGames();
  let mine = (games.games || []).filter(g => g.code === req.user.code);
  // Pour une session visiteur, on isole l'historique au pseudo de session
  // (sinon tout le monde verrait tout l'historique du code partagé).
  if (req.user.authType === 'visitor') {
    mine = mine.filter(g => g.visitorName === req.user.visitorName);
  }
  res.json(mine);
});

// ---------- Admin : codes --------------------------------------------
app.get('/api/admin/codes', requireAdmin, (req, res) => {
  const auth = loadAuth();
  const games = loadGames();
  const list = Object.entries(auth.codes).map(([code, entry]) => {
    const gamesOf = (games.games || []).filter(g => g.code === code);
    const totalScore = gamesOf.reduce((s, g) => s + (g.totalScore || 0), 0);
    const distinctVisitors = entry.visitor
      ? new Set(gamesOf.map(g => g.visitorName).filter(Boolean)).size
      : 0;
    return {
      code, name: entry.name || null,
      createdAt: entry.createdAt,
      lastUsed:  entry.lastUsed || null,
      gamesPlayed: gamesOf.length,
      totalScore,
      visitor: !!entry.visitor,
      distinctVisitors
    };
  }).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  res.json(list);
});

app.post('/api/admin/codes', requireAdmin, (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 60) || null;
  const visitor = !!req.body.visitor;
  const auth = loadAuth();
  let code;
  do { code = genCode(); } while (auth.codes[code]);
  const entry = {
    name,
    createdAt: new Date().toISOString(),
    lastUsed: null,
    gamesPlayed: 0
  };
  if (visitor) {
    entry.visitor = true;
    entry.visitorSeen = [];
  }
  auth.codes[code] = entry;
  saveAuth(auth);
  res.json({ code, name, visitor });
});

app.delete('/api/admin/codes/:code', requireAdmin, (req, res) => {
  const code = String(req.params.code).toUpperCase();
  const auth = loadAuth();
  if (!auth.codes[code]) return res.status(404).json({ error: 'Code introuvable' });
  delete auth.codes[code];
  saveAuth(auth);
  res.json({ ok: true });
});

// Détail d'un code visiteur : liste des sessions par pseudo (parties +
// score cumulé pour chaque pseudo distinct).
app.get('/api/admin/codes/:code/visitors', requireAdmin, (req, res) => {
  const code = String(req.params.code).toUpperCase();
  const auth = loadAuth();
  const entry = auth.codes[code];
  if (!entry) return res.status(404).json({ error: 'Code introuvable' });
  if (!entry.visitor) return res.status(400).json({ error: 'Ce code n\'est pas un code visiteur' });
  const games = loadGames();
  const gamesOf = (games.games || []).filter(g => g.code === code);
  const byPseudo = {};
  for (const g of gamesOf) {
    const k = g.visitorName || '(anonyme)';
    if (!byPseudo[k]) byPseudo[k] = { pseudo: k, games: 0, totalScore: 0, nbCorrect: 0, nbQuestions: 0, lastFinishedAt: null };
    const b = byPseudo[k];
    b.games += 1;
    b.totalScore += g.totalScore || 0;
    b.nbCorrect += g.nbCorrect || 0;
    b.nbQuestions += g.nbQuestions || 0;
    if (!b.lastFinishedAt || g.finishedAt > b.lastFinishedAt) b.lastFinishedAt = g.finishedAt;
  }
  const list = Object.values(byPseudo).sort((a, b) => b.totalScore - a.totalScore);
  res.json({ code, label: entry.name || null, totalGames: gamesOf.length, totalDistinct: list.length, byPseudo: list });
});

// ---------- Admin : settings (toggle révision libre) -----------------
app.get('/api/admin/settings', requireAdmin, (req, res) => {
  const auth = loadAuth();
  res.json(auth.settings || { reviewEnabled: true, qcmMode: 'user-choice' });
});

app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const auth = loadAuth();
  auth.settings = auth.settings || {};
  if (typeof req.body.reviewEnabled === 'boolean') auth.settings.reviewEnabled = req.body.reviewEnabled;
  if (typeof req.body.qcmMode === 'string' && ['force-text', 'force-qcm', 'user-choice'].includes(req.body.qcmMode)) {
    auth.settings.qcmMode = req.body.qcmMode;
  }
  if (typeof req.body.liveScoreboardMode === 'string' && ['force-on', 'force-off', 'user-choice'].includes(req.body.liveScoreboardMode)) {
    auth.settings.liveScoreboardMode = req.body.liveScoreboardMode;
  }
  if (typeof req.body.helpEnabledForUsers === 'boolean') auth.settings.helpEnabledForUsers = req.body.helpEnabledForUsers;
  if (typeof req.body.selfRegistrationEnabled === 'boolean') auth.settings.selfRegistrationEnabled = req.body.selfRegistrationEnabled;
  if (req.body.timings && typeof req.body.timings === 'object') {
    auth.settings.timings = auth.settings.timings || { ...DEFAULT_TIMINGS };
    for (const k of ['manche1', 'manche2', 'manche3']) {
      const v = parseInt(req.body.timings[k], 10);
      if (Number.isFinite(v) && v >= 5 && v <= 600) auth.settings.timings[k] = v;
    }
  }
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

// ---------- Admin : gestion des comptes auto-inscrits ---------------
app.get('/api/admin/accounts', requireAdmin, (req, res) => {
  const auth = loadAuth();
  const games = loadGames();
  const list = Object.values(auth.accounts || {}).map(a => {
    const gOf = (games.games || []).filter(g => g.accountId === a.id);
    return {
      id: a.id, email: a.email, pseudo: a.pseudo,
      createdAt: a.createdAt, lastUsed: a.lastUsed || null,
      isAdmin: !!a.isAdmin,
      gamesPlayed: gOf.length,
      totalScore: gOf.reduce((s, g) => s + (g.totalScore || 0), 0)
    };
  }).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  res.json(list);
});

// Supprimer un compte — réservé super-admin
app.delete('/api/admin/accounts/:id', requireSuperAdmin, (req, res) => {
  const auth = loadAuth();
  if (!auth.accounts || !auth.accounts[req.params.id]) {
    return res.status(404).json({ error: 'Compte introuvable' });
  }
  delete auth.accounts[req.params.id];
  saveAuth(auth);
  res.json({ ok: true });
});

// Promouvoir un compte au statut d'admin nommé — réservé super-admin
app.post('/api/admin/accounts/:id/promote', requireSuperAdmin, (req, res) => {
  const auth = loadAuth();
  if (!auth.accounts || !auth.accounts[req.params.id]) {
    return res.status(404).json({ error: 'Compte introuvable' });
  }
  auth.accounts[req.params.id].isAdmin = true;
  saveAuth(auth);
  res.json({ ok: true, id: req.params.id, isAdmin: true });
});

// Révoquer le statut d'admin d'un compte — réservé super-admin
app.post('/api/admin/accounts/:id/demote', requireSuperAdmin, (req, res) => {
  const auth = loadAuth();
  if (!auth.accounts || !auth.accounts[req.params.id]) {
    return res.status(404).json({ error: 'Compte introuvable' });
  }
  auth.accounts[req.params.id].isAdmin = false;
  saveAuth(auth);
  res.json({ ok: true, id: req.params.id, isAdmin: false });
});

// Supprime une partie spécifique de l'historique (et décrémente le
// compteur gamesPlayed du code concerné). Utile pour effacer une partie
// erronée de la liste « Parties récentes » côté admin.
app.delete('/api/admin/game/:id', requireAdmin, (req, res) => {
  const games = loadGames();
  const idx = (games.games || []).findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Partie introuvable' });
  const removed = games.games.splice(idx, 1)[0];
  saveGames(games);
  // Décrémenter le compteur de parties sur le code (sans descendre sous 0)
  if (removed && removed.code) {
    const auth = loadAuth();
    if (auth.codes[removed.code]) {
      auth.codes[removed.code].gamesPlayed = Math.max(0, (auth.codes[removed.code].gamesPlayed || 1) - 1);
      saveAuth(auth);
    }
  }
  res.json({ ok: true, removedId: removed.id, code: removed.code });
});

// Supprime TOUTES les parties d'un utilisateur (réinitialise son
// classement) sans toucher au code d'accès lui-même. Le compteur
// gamesPlayed du code est remis à 0.
app.delete('/api/admin/codes/:code/games', requireAdmin, (req, res) => {
  const code = String(req.params.code).toUpperCase();
  const games = loadGames();
  const before = (games.games || []).length;
  games.games = (games.games || []).filter(g => g.code !== code);
  const removed = before - games.games.length;
  saveGames(games);
  // Remettre gamesPlayed à 0 pour ce code
  const auth = loadAuth();
  if (auth.codes[code]) {
    auth.codes[code].gamesPlayed = 0;
    saveAuth(auth);
  }
  res.json({ ok: true, removed, code });
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

// =====================================================================
// DOMAINES PERSONNALISÉS (import .txt ou .json par l'admin)
// =====================================================================

// Liste des domaines custom avec métadonnées
app.get('/api/admin/custom-domains', requireAdmin, (req, res) => {
  const store = loadCustomDomains();
  const list = (store.domains || []).map(d => ({
    name: d.name,
    description: d.description || '',
    createdAt: d.createdAt,
    packsCount: (d.packs || []).length,
    questionsCount: (d.packs || []).reduce((s, p) => s + (p.questions || []).length, 0),
    manches: [...new Set((d.packs || []).map(p => p.type))]
  }));
  res.json(list);
});

// Import : accepte body { format: 'txt'|'json', content: <string> }
// Crée un nouveau domaine ou écrase un domaine existant avec le même nom.
app.post('/api/admin/custom-domains', requireAdmin, (req, res) => {
  const format = String(req.body.format || 'txt').toLowerCase();
  const content = String(req.body.content || '');
  if (!content) return res.status(400).json({ error: 'Contenu vide' });

  let parsed;
  try {
    if (format === 'json') {
      const j = JSON.parse(content);
      parsed = {
        domain: j.domain || j.name,
        description: j.description || '',
        packs: Array.isArray(j.packs) ? j.packs : []
      };
    } else {
      // TXT par défaut
      parsed = parseCustomTxt(content);
    }
  } catch (e) {
    return res.status(400).json({ error: `Erreur de parsing : ${e.message}` });
  }

  if (!parsed.domain) return res.status(400).json({ error: 'Le fichier doit indiquer un nom de domaine (DOMAINE: …)' });
  const domainName = parsed.domain.trim().slice(0, 80);
  if (!domainName) return res.status(400).json({ error: 'Nom de domaine invalide' });
  if (!parsed.packs || parsed.packs.length === 0) {
    return res.status(400).json({ error: 'Aucun pack trouvé dans le fichier' });
  }

  // Normaliser les packs
  const normalizedPacks = parsed.packs
    .map((p, i) => normalizeImportedPack(p, domainName, i))
    .filter(p => p.questions && p.questions.length > 0);

  if (normalizedPacks.length === 0) {
    return res.status(400).json({ error: 'Aucun pack valide après parsing (vérifiez que chaque Q a une R)' });
  }

  // Empêcher la collision avec un nom de domaine builtin
  const builtinNames = (QUESTIONS.domains || []).map(d => d.name.toLowerCase());
  if (builtinNames.includes(domainName.toLowerCase())) {
    return res.status(400).json({ error: 'Ce nom de domaine existe déjà dans la base intégrée. Utilisez un autre nom.' });
  }

  const store = loadCustomDomains();
  store.domains = store.domains || [];
  // Remplacer s'il existe déjà un domaine custom avec ce nom
  const existing = store.domains.findIndex(d => d.name.toLowerCase() === domainName.toLowerCase());
  const entry = {
    name: domainName,
    description: parsed.description || '',
    createdAt: existing >= 0 ? store.domains[existing].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    packs: normalizedPacks
  };
  if (existing >= 0) store.domains[existing] = entry;
  else store.domains.push(entry);
  saveCustomDomains(store);

  const qCount = normalizedPacks.reduce((s, p) => s + p.questions.length, 0);
  res.json({
    ok: true,
    replaced: existing >= 0,
    domain: domainName,
    packsCount: normalizedPacks.length,
    questionsCount: qCount,
    manches: [...new Set(normalizedPacks.map(p => p.type))]
  });
});

// Import langage naturel (v2.24)
// Body : {
//   domain:       string  // ex. "Économie générale L2"
//   title:        string  // ex. "Évaluation du 12 juin"
//   manche:       'manche1' | 'manche2' | 'manche3'
//   theme:        string? // optionnel
//   numChoices:   number  // 3..6 (défaut 4)
//   naturalText:  string  // contenu brut Q1:.../R1:...
// }
// → Parse les paires Q/R en langage naturel, génère automatiquement
//   des distracteurs réalistes pour chaque question, et enregistre le
//   domaine dans le store (utilise normalizeImportedPack).
app.post('/api/admin/custom-domains/from-natural', requireAdmin, (req, res) => {
  const domainName = String(req.body.domain || '').trim().slice(0, 80);
  const title      = String(req.body.title  || '').trim().slice(0, 120);
  const manche     = ['manche1', 'manche2', 'manche3'].includes(req.body.manche) ? req.body.manche : 'manche1';
  const theme      = req.body.theme ? String(req.body.theme).trim().slice(0, 120) : null;
  const numChoices = Math.max(3, Math.min(6, parseInt(req.body.numChoices, 10) || 4));
  const naturalText = String(req.body.naturalText || '');

  if (!domainName) return res.status(400).json({ error: 'Nom de domaine obligatoire' });
  if (!naturalText.trim()) return res.status(400).json({ error: 'Le texte des questions est vide' });

  const parsed = parseNaturalQA(naturalText);
  if (!parsed.pairs || parsed.pairs.length === 0) {
    return res.status(400).json({
      error: 'Aucune paire question/réponse détectée. Format attendu : "Q1 : ..." sur une ligne puis "R1 : ..." sur la suivante.'
    });
  }

  const effectiveTitle = title || parsed.title || `Pack ${domainName}`;

  // Build raw pack avec distracteurs générés
  const rawPack = {
    titre: effectiveTitle,
    manche,
    theme,
    questions: parsed.pairs.map(p => {
      const distractors = generateDistractors(p.q, p.r, numChoices - 1);
      const choices = [p.r, ...distractors];
      return {
        q: p.q,
        r: p.r,
        choices,
        // correctIndices sera recalculé par normalizeImportedPack via le match
        e: '',
        ref: '',
        pts: manche === 'manche2' ? 2 : 1
      };
    })
  };

  // Empêcher la collision avec un nom builtin
  const builtinNames = (QUESTIONS.domains || []).map(d => d.name.toLowerCase());
  if (builtinNames.includes(domainName.toLowerCase())) {
    return res.status(400).json({ error: 'Ce nom de domaine existe déjà dans la base intégrée. Utilisez un autre nom.' });
  }

  const normalized = normalizeImportedPack(rawPack, domainName, 0);
  if (!normalized.questions || normalized.questions.length === 0) {
    return res.status(400).json({ error: 'Aucune question valide après normalisation' });
  }

  const store = loadCustomDomains();
  store.domains = store.domains || [];
  const existing = store.domains.findIndex(d => d.name.toLowerCase() === domainName.toLowerCase());
  const description = `Importé en langage naturel le ${new Date().toLocaleDateString('fr-FR')} (${normalized.questions.length} questions)`;

  if (existing >= 0) {
    // Domaine déjà créé → on AJOUTE ce pack (sans écraser)
    store.domains[existing].packs = store.domains[existing].packs || [];
    store.domains[existing].packs.push(normalized);
    store.domains[existing].updatedAt = new Date().toISOString();
  } else {
    store.domains.push({
      name: domainName,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      packs: [normalized]
    });
  }
  saveCustomDomains(store);

  res.json({
    ok: true,
    domain: domainName,
    appended: existing >= 0,
    title: effectiveTitle,
    manche,
    questionsCount: normalized.questions.length,
    sample: normalized.questions.slice(0, 2).map(q => ({
      q: q.q, r: q.r, choices: q.choices
    }))
  });
});

// Aperçu : parse + génère distracteurs SANS enregistrer (preview pour
// l'UI avant l'import définitif).
app.post('/api/admin/custom-domains/preview-natural', requireAdmin, (req, res) => {
  const naturalText = String(req.body.naturalText || '');
  const numChoices  = Math.max(3, Math.min(6, parseInt(req.body.numChoices, 10) || 4));
  if (!naturalText.trim()) return res.status(400).json({ error: 'Texte vide' });
  const parsed = parseNaturalQA(naturalText);
  if (!parsed.pairs.length) {
    return res.status(400).json({ error: 'Aucune paire Q/R détectée. Utilisez "Q1 : ..." puis "R1 : ..." sur la ligne suivante.' });
  }
  const items = parsed.pairs.map(p => ({
    q: p.q,
    r: p.r,
    distractors: generateDistractors(p.q, p.r, numChoices - 1)
  }));
  res.json({
    title: parsed.title || '',
    count: items.length,
    items
  });
});

// Suppression d'un domaine personnalisé
app.delete('/api/admin/custom-domains/:name', requireAdmin, (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const store = loadCustomDomains();
  const before = (store.domains || []).length;
  store.domains = (store.domains || []).filter(d => d.name.toLowerCase() !== name.toLowerCase());
  if (store.domains.length === before) return res.status(404).json({ error: 'Domaine introuvable' });
  saveCustomDomains(store);
  res.json({ ok: true, name });
});

// =====================================================================
// DUELS / CONFRONTATIONS
// =====================================================================
// Modèle d'un match :
// { id, type: "duel"|"tournament", createdAt, createdBy: <code|"admin">,
//   participants: [<code>, ...],
//   status: "pending"|"active"|"completed"|"cancelled",
//   config: { manches:[], counts:{}, domains:[], packs:[{manche,pack}] },
//   acceptances: { <code>: "pending"|"accepted"|"declined" },
//   results: { <code>: { startedAt, completedAt, totalScore, byManche, log } },
//   winner: <code>|null
// }

function shuffleArr(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildMatchPacks(config) {
  // Choisit les packs une fois pour tous les participants. Identiques pour tous.
  const plan = [];
  for (const m of (config.manches || [])) {
    let packs = getPacksForManche(m);
    if (config.domains && config.domains.length) {
      packs = packs.filter(p => config.domains.includes(p.domain));
    }
    if (packs.length === 0) continue;
    const n = Math.min(config.counts && config.counts[m] || 1, packs.length);
    const chosen = shuffleArr(packs).slice(0, n);
    chosen.forEach(p => plan.push({ manche: m, pack: p }));
  }
  return plan;
}

function nameOfCode(code) {
  const auth = loadAuth();
  return (auth.codes[code] && auth.codes[code].name) || null;
}

function publicMatchView(m, viewerCode) {
  // Vue allégée renvoyée au client. Cache `packs` aux participants qui
  // n'ont pas encore accepté (pour éviter de spoiler les questions).
  const accepted = (m.acceptances[viewerCode] === 'accepted');
  const isAdmin = viewerCode === '__admin__';
  return {
    id: m.id,
    type: m.type,
    createdAt: m.createdAt,
    createdBy: m.createdBy,
    creatorName: m.createdBy === 'admin' ? null : nameOfCode(m.createdBy),
    participants: m.participants.map(c => ({
      code: c, name: nameOfCode(c),
      status: m.acceptances[c] || 'pending',
      hasPlayed: !!(m.results && m.results[c] && m.results[c].completedAt),
      score: (m.results && m.results[c] && m.results[c].completedAt) ? m.results[c].totalScore : null
    })),
    status: m.status,
    config: {
      manches: m.config.manches,
      counts: m.config.counts,
      domains: m.config.domains,
      packsCount: m.config.packs.length,
      liveScoreboard: !!m.config.liveScoreboard,
      // packs disponibles uniquement si on a accepté ou si on est admin
      packs: (accepted || isAdmin) ? m.config.packs : null
    },
    winner: m.winner || null,
    youHavePlayed: !!(m.results && m.results[viewerCode] && m.results[viewerCode].completedAt),
    yourStatus: m.acceptances[viewerCode] || null,
    // résultats détaillés visibles si la partie est terminée pour tous
    results: m.status === 'completed' ? m.participants.reduce((acc, c) => {
      const r = m.results && m.results[c];
      acc[c] = r ? { totalScore: r.totalScore, byManche: r.byManche, nbCorrect: r.nbCorrect, nbQuestions: r.nbQuestions, completedAt: r.completedAt } : null;
      return acc;
    }, {}) : null
  };
}

// Décide si un match donné doit afficher le scoreboard live.
// Respecte d'abord le réglage admin (force-on/force-off),
// sinon respecte le choix du créateur du match (config.liveScoreboard).
function isLiveScoreboardEnabled(match) {
  const auth = loadAuth();
  const mode = (auth.settings && auth.settings.liveScoreboardMode) || 'user-choice';
  if (mode === 'force-on') return true;
  if (mode === 'force-off') return false;
  return !!(match.config && match.config.liveScoreboard);
}

function checkMatchCompletion(m) {
  // Marque "completed" si tous les acceptants ont joué.
  const accepted = m.participants.filter(c => m.acceptances[c] === 'accepted');
  if (accepted.length === 0) return;
  const allPlayed = accepted.every(c => m.results && m.results[c] && m.results[c].completedAt);
  if (allPlayed && m.status !== 'completed') {
    m.status = 'completed';
    // Calcul du vainqueur (le score le plus élevé parmi ceux qui ont joué)
    let best = null;
    for (const c of accepted) {
      const r = m.results[c];
      if (!best || r.totalScore > m.results[best].totalScore) best = c;
    }
    m.winner = best;
  }
}

function userHasActiveDuel(code) {
  const { matches } = loadMatches();
  return matches.some(m =>
    m.participants.includes(code) &&
    (m.status === 'pending' || m.status === 'active') &&
    m.acceptances[code] === 'accepted' &&
    !(m.results && m.results[code] && m.results[code].completedAt)
  );
}

// ---------- API : duels utilisateur ----------------------------------
app.get('/api/me/duels', requireUser, blockVisitors, (req, res) => {
  const { matches } = loadMatches();
  const mine = matches.filter(m => m.participants.includes(req.user.code))
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
    .map(m => publicMatchView(m, req.user.code));
  res.json(mine);
});

app.post('/api/me/duels', requireUser, blockVisitors, (req, res) => {
  const opponentCodeRaw = String(req.body.opponentCode || '').trim().toUpperCase();
  if (!opponentCodeRaw) return res.status(400).json({ error: 'Code de l\'adversaire requis' });
  if (opponentCodeRaw === req.user.code) return res.status(400).json({ error: 'Vous ne pouvez pas vous défier vous-même' });
  const auth = loadAuth();
  if (!auth.codes[opponentCodeRaw]) return res.status(404).json({ error: 'Code adversaire introuvable ou révoqué' });
  if (auth.codes[opponentCodeRaw].visitor) return res.status(400).json({ error: 'Vous ne pouvez pas défier un code visiteur partagé. Utilisez un code nominatif.' });

  const config = req.body.config || {};
  config.manches = Array.isArray(config.manches) && config.manches.length ? config.manches : ['manche1'];
  config.counts  = config.counts || { manche1: 1, manche2: 1, manche3: 1 };
  config.domains = Array.isArray(config.domains) ? config.domains : [];
  config.liveScoreboard = !!config.liveScoreboard;
  const packs = buildMatchPacks(config);
  if (packs.length === 0) return res.status(400).json({ error: 'Aucun pack disponible pour cette configuration' });

  const now = new Date().toISOString();
  const id = crypto.randomBytes(8).toString('hex');
  const match = {
    id, type: 'duel', createdAt: now, createdBy: req.user.code,
    participants: [req.user.code, opponentCodeRaw],
    status: 'pending',
    config: { ...config, packs },
    acceptances: { [req.user.code]: 'accepted', [opponentCodeRaw]: 'pending' },
    results: {}, winner: null
  };
  const store = loadMatches();
  store.matches.push(match);
  saveMatches(store);
  res.json(publicMatchView(match, req.user.code));
});

app.post('/api/me/duels/:id/accept', requireUser, blockVisitors, (req, res) => {
  const store = loadMatches();
  const m = store.matches.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Duel introuvable' });
  if (!m.participants.includes(req.user.code)) return res.status(403).json({ error: 'Vous n\'êtes pas dans ce duel' });
  if (m.acceptances[req.user.code] === 'accepted') return res.json(publicMatchView(m, req.user.code));
  m.acceptances[req.user.code] = 'accepted';
  // Si tous les participants ont accepté → status = active
  if (m.participants.every(c => m.acceptances[c] === 'accepted') && m.status === 'pending') {
    m.status = 'active';
  }
  saveMatches(store);
  res.json(publicMatchView(m, req.user.code));
});

app.post('/api/me/duels/:id/decline', requireUser, blockVisitors, (req, res) => {
  const store = loadMatches();
  const m = store.matches.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Duel introuvable' });
  if (!m.participants.includes(req.user.code)) return res.status(403).json({ error: 'Vous n\'êtes pas dans ce duel' });
  m.acceptances[req.user.code] = 'declined';
  // Si quelqu'un refuse, on annule le duel entier (cas duel 2 personnes)
  if (m.type === 'duel') m.status = 'cancelled';
  saveMatches(store);
  res.json({ ok: true });
});

app.get('/api/me/duels/:id', requireUser, blockVisitors, (req, res) => {
  const store = loadMatches();
  const m = store.matches.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Duel introuvable' });
  if (!m.participants.includes(req.user.code)) return res.status(403).json({ error: 'Vous n\'êtes pas dans ce duel' });
  res.json(publicMatchView(m, req.user.code));
});

app.post('/api/me/duels/:id/game', requireUser, blockVisitors, (req, res) => {
  const store = loadMatches();
  const m = store.matches.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Duel introuvable' });
  if (!m.participants.includes(req.user.code)) return res.status(403).json({ error: 'Vous n\'êtes pas dans ce duel' });
  if (m.acceptances[req.user.code] !== 'accepted') return res.status(400).json({ error: 'Vous devez accepter le duel avant de jouer' });
  if (m.status === 'cancelled') return res.status(400).json({ error: 'Duel annulé' });
  m.results = m.results || {};
  if (m.results[req.user.code] && m.results[req.user.code].completedAt) {
    return res.status(400).json({ error: 'Vous avez déjà joué ce duel' });
  }
  const s = req.body || {};
  m.results[req.user.code] = {
    startedAt: (m.results[req.user.code] && m.results[req.user.code].startedAt) || new Date().toISOString(),
    completedAt: new Date().toISOString(),
    totalScore: s.totalScore || 0,
    byManche: s.byManche || {},
    nbQuestions: s.nbQuestions || 0,
    nbCorrect: s.nbCorrect || 0,
    nbWrong: s.nbWrong || 0,
    log: Array.isArray(s.log) ? s.log : []
  };
  // Aussi enregistrer la partie dans l'historique global de l'utilisateur
  const games = loadGames();
  games.games = games.games || [];
  games.games.push({
    id: crypto.randomBytes(6).toString('hex'),
    code: req.user.code, name: req.user.name,
    finishedAt: m.results[req.user.code].completedAt,
    totalScore: m.results[req.user.code].totalScore,
    byManche: m.results[req.user.code].byManche,
    nbQuestions: m.results[req.user.code].nbQuestions,
    nbCorrect: m.results[req.user.code].nbCorrect,
    nbWrong: m.results[req.user.code].nbWrong,
    config: { manches: m.config.manches, packsCount: m.config.packs.length, duelId: m.id },
    log: m.results[req.user.code].log
  });
  saveGames(games);
  // Marquer le statut active si pas déjà
  if (m.status === 'pending') m.status = 'active';
  checkMatchCompletion(m);
  // Mettre à jour le compteur gamesPlayed du code
  const auth = loadAuth();
  if (auth.codes[req.user.code]) {
    auth.codes[req.user.code].gamesPlayed = (auth.codes[req.user.code].gamesPlayed || 0) + 1;
    auth.codes[req.user.code].lastUsed = new Date().toISOString();
    saveAuth(auth);
  }
  saveMatches(store);
  res.json(publicMatchView(m, req.user.code));
});

// Mise à jour du progrès en cours de partie (envoyé après chaque
// question répondue par le client si liveScoreboard est actif)
app.post('/api/me/duels/:id/progress', requireUser, blockVisitors, (req, res) => {
  const store = loadMatches();
  const m = store.matches.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Duel introuvable' });
  if (!m.participants.includes(req.user.code)) return res.status(403).json({ error: 'Vous n\'êtes pas dans ce duel' });
  if (m.acceptances[req.user.code] !== 'accepted') return res.status(400).json({ error: 'Vous devez accepter le duel avant de jouer' });
  m.results = m.results || {};
  if (!m.results[req.user.code]) {
    m.results[req.user.code] = { startedAt: new Date().toISOString() };
  }
  const r = m.results[req.user.code];
  if (r.completedAt) return res.status(400).json({ error: 'Partie déjà terminée' });
  const score = Number(req.body.score);
  const answered = Number(req.body.questionsAnswered);
  if (!Number.isNaN(score)) r.progressScore = score;
  if (!Number.isNaN(answered)) r.progressQ = answered;
  r.progressUpdatedAt = new Date().toISOString();
  saveMatches(store);
  res.json({ ok: true });
});

// Scoreboard live : renvoie les scores en cours de chaque participant.
// Visible UNIQUEMENT si liveScoreboard activé pour ce match (par l'admin
// global ou par le créateur du duel).
app.get('/api/me/duels/:id/scoreboard', requireUser, blockVisitors, (req, res) => {
  const store = loadMatches();
  const m = store.matches.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Duel introuvable' });
  if (!m.participants.includes(req.user.code)) return res.status(403).json({ error: 'Vous n\'êtes pas dans ce duel' });
  if (!isLiveScoreboardEnabled(m)) {
    return res.status(403).json({ error: 'Le scoreboard live n\'est pas activé pour ce duel' });
  }
  const totalQuestions = (m.config.packs || []).reduce((s, p) => s + (p.pack.questions || []).length, 0);
  const board = m.participants.map(c => {
    const r = (m.results && m.results[c]) || {};
    return {
      code: c,
      name: nameOfCode(c),
      score: r.completedAt ? (r.totalScore || 0) : (r.progressScore || 0),
      questionsAnswered: r.completedAt ? (r.nbQuestions || 0) : (r.progressQ || 0),
      totalQuestions,
      finished: !!r.completedAt,
      acceptance: m.acceptances[c] || 'pending'
    };
  });
  // Tri par score décroissant
  board.sort((a, b) => b.score - a.score);
  res.json({
    liveScoreboard: true,
    matchStatus: m.status,
    totalQuestions,
    participants: board
  });
});

// ---------- API : duels admin ----------------------------------------
app.get('/api/admin/duels', requireAdmin, (req, res) => {
  const { matches } = loadMatches();
  const list = matches.slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).map(m => publicMatchView(m, '__admin__'));
  res.json(list);
});

app.post('/api/admin/duels', requireAdmin, (req, res) => {
  const participants = Array.isArray(req.body.participants) ? req.body.participants.map(c => String(c).trim().toUpperCase()) : [];
  if (participants.length < 2) return res.status(400).json({ error: 'Au moins 2 participants requis' });
  const auth = loadAuth();
  for (const c of participants) {
    if (!auth.codes[c]) return res.status(400).json({ error: `Code ${c} introuvable ou révoqué` });
    if (auth.codes[c].visitor) return res.status(400).json({ error: `Code ${c} : un code visiteur partagé ne peut pas être convoqué dans une confrontation. Utilisez un code nominatif.` });
  }
  // Dédoublonner
  const unique = [...new Set(participants)];
  const config = req.body.config || {};
  config.manches = Array.isArray(config.manches) && config.manches.length ? config.manches : ['manche1'];
  config.counts  = config.counts || { manche1: 1, manche2: 1, manche3: 1 };
  config.domains = Array.isArray(config.domains) ? config.domains : [];
  config.liveScoreboard = !!config.liveScoreboard;
  const packs = buildMatchPacks(config);
  if (packs.length === 0) return res.status(400).json({ error: 'Aucun pack disponible pour cette configuration' });

  const acceptances = {};
  // Les confrontations créées par l'admin sont AUTO-ACCEPTÉES pour tous les
  // participants : la convocation est obligatoire. Les utilisateurs trouvent
  // directement le match dans "Mes duels" avec status active.
  unique.forEach(c => { acceptances[c] = 'accepted'; });

  const now = new Date().toISOString();
  const id = crypto.randomBytes(8).toString('hex');
  const match = {
    id, type: unique.length === 2 ? 'duel' : 'tournament',
    createdAt: now, createdBy: 'admin',
    participants: unique,
    status: 'active',
    config: { ...config, packs },
    acceptances, results: {}, winner: null
  };
  const store = loadMatches();
  store.matches.push(match);
  saveMatches(store);
  res.json(publicMatchView(match, '__admin__'));
});

app.delete('/api/admin/duels/:id', requireAdmin, (req, res) => {
  const store = loadMatches();
  const idx = store.matches.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Duel introuvable' });
  store.matches.splice(idx, 1);
  saveMatches(store);
  res.json({ ok: true });
});

// Admin : purge complète (suppression base de données)
app.delete('/api/admin/all-data', requireAdmin, (req, res) => {
  if (req.body.confirm !== 'OUI-SUPPRIMER-TOUT') {
    return res.status(400).json({ error: 'Confirmation requise : body.confirm = "OUI-SUPPRIMER-TOUT"' });
  }
  saveAuth({ codes: {}, settings: { reviewEnabled: true }, createdAt: new Date().toISOString() });
  saveGames({ games: [] });
  saveMatches({ matches: [] });
  res.json({ ok: true });
});

// ---------- Démarrage ------------------------------------------------
(async () => {
  await ghPullInitial();
  // S'assurer que les fichiers existent
  loadAuth();
  if (!fs.existsSync(GAMES_PATH)) saveGames({ games: [] });
  if (!fs.existsSync(MATCHES_PATH)) saveMatches({ matches: [] });
  if (!fs.existsSync(CUSTOM_PATH)) saveCustomDomains({ domains: [] });

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
