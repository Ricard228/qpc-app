// =====================================================================
// app.js — QPC SPA frontend (auth + backend)
// =====================================================================

// ---------- Session ---------------------------------------------------
// Le token utilisateur est conservé dans localStorage pour persister
// entre rechargements. L'admin a son propre token séparé.
const LS_TOK   = 'qpc.token';
const LS_NAME  = 'qpc.name';
const LS_CODE  = 'qpc.code';
const LS_ADMIN = 'qpc.admin_token';
const LS_GAME  = 'qpc.savedGame';   // partie sauvegardée localement (par code)

const Session = {
  token:  localStorage.getItem(LS_TOK)   || null,
  name:   localStorage.getItem(LS_NAME)  || null,
  code:   localStorage.getItem(LS_CODE)  || null,
  admin:  localStorage.getItem(LS_ADMIN) || null,
  set(t, c, n) {
    this.token = t; this.code = c; this.name = n;
    localStorage.setItem(LS_TOK,  t);
    localStorage.setItem(LS_CODE, c);
    if (n) localStorage.setItem(LS_NAME, n); else localStorage.removeItem(LS_NAME);
  },
  setAdmin(t) {
    this.admin = t;
    if (t) localStorage.setItem(LS_ADMIN, t); else localStorage.removeItem(LS_ADMIN);
  },
  clearUser() {
    this.token = this.name = this.code = null;
    localStorage.removeItem(LS_TOK);
    localStorage.removeItem(LS_NAME);
    localStorage.removeItem(LS_CODE);
  },
  clearAdmin() { this.setAdmin(null); }
};

// ---------- Helpers API ------------------------------------------------
async function apiFetch(url, opts = {}, useAdmin = false) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  const tok = useAdmin ? Session.admin : Session.token;
  if (tok) headers['Authorization'] = `Bearer ${tok}`;
  const res = await fetch(url, { ...opts, headers });
  if (res.status === 401) {
    if (useAdmin) Session.clearAdmin(); else Session.clearUser();
    // Redirige vers login
    route('login');
    throw new Error('non authentifié');
  }
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { const j = await res.json(); if (j.error) msg = j.error; } catch {}
    throw new Error(msg);
  }
  return res.json();
}

const api = {
  loginUser:  (code)     => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ code }) }),
  loginAdmin: (password) => apiFetch('/api/auth/admin', { method: 'POST', body: JSON.stringify({ password }) }),
  meta:       ()         => apiFetch('/api/meta'),
  packs:      (m, doms)  => apiFetch(`/api/packs/${m}?domains=${encodeURIComponent((doms||[]).join(','))}`),
  myGames:    ()         => apiFetch('/api/me/games'),
  archiveGame:(summary)  => apiFetch('/api/me/game',     { method: 'POST', body: JSON.stringify(summary) }),
  adminCodes: ()         => apiFetch('/api/admin/codes', {}, true),
  adminCreateCode: (name) => apiFetch('/api/admin/codes', { method: 'POST', body: JSON.stringify({ name }) }, true),
  adminDeleteCode: (code) => apiFetch(`/api/admin/codes/${encodeURIComponent(code)}`, { method: 'DELETE' }, true),
  adminDashboard:  ()     => apiFetch('/api/admin/dashboard', {}, true),
  adminGame:       (id)   => apiFetch(`/api/admin/game/${encodeURIComponent(id)}`, {}, true),
  adminExport:     ()     => apiFetch('/api/admin/export', {}, true),
  adminImport:     (data) => apiFetch('/api/admin/import', { method: 'POST', body: JSON.stringify(data) }, true),
  adminGetSettings: ()    => apiFetch('/api/admin/settings', {}, true),
  adminSetSettings: (s)   => apiFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(s) }, true),
  adminPurgeAll:    ()    => apiFetch('/api/admin/all-data', { method: 'DELETE', body: JSON.stringify({ confirm: 'OUI-SUPPRIMER-TOUT' }) }, true),
  // Duels — utilisateur
  myDuels:        ()         => apiFetch('/api/me/duels'),
  myDuelGet:      (id)       => apiFetch(`/api/me/duels/${id}`),
  createDuel:     (body)     => apiFetch('/api/me/duels',                  { method: 'POST', body: JSON.stringify(body) }),
  acceptDuel:     (id)       => apiFetch(`/api/me/duels/${id}/accept`,     { method: 'POST', body: '{}' }),
  declineDuel:    (id)       => apiFetch(`/api/me/duels/${id}/decline`,    { method: 'POST', body: '{}' }),
  submitDuelGame: (id, body) => apiFetch(`/api/me/duels/${id}/game`,       { method: 'POST', body: JSON.stringify(body) }),
  // Duels — admin
  adminDuels:        ()      => apiFetch('/api/admin/duels', {}, true),
  adminCreateDuel:   (body)  => apiFetch('/api/admin/duels', { method: 'POST', body: JSON.stringify(body) }, true),
  adminDeleteDuel:   (id)    => apiFetch(`/api/admin/duels/${id}`, { method: 'DELETE' }, true)
};

// Téléchargement direct (binaire) avec auth admin pour l'Excel
async function downloadAdminExcel() {
  const res = await fetch('/api/admin/export-excel', {
    headers: { Authorization: `Bearer ${Session.admin}` }
  });
  if (!res.ok) { alert('Erreur lors du téléchargement Excel'); return; }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `qpc-export-${new Date().toISOString().slice(0,10)}.xlsx`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

// ---------- Helpers DOM ------------------------------------------------
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
};
const mount = (tplId) => {
  const tpl = $(`#${tplId}`).content.cloneNode(true);
  const app = $('#app');
  app.innerHTML = '';
  app.appendChild(tpl);
};
const fmtDate = (iso) => iso ? new Date(iso).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '—';

// Transforme un texte contenant des URLs en éléments DOM avec liens cliquables
// (target=_blank, rel=noopener noreferrer pour sécurité). Utilisé pour le
// champ `ref` des questions qui contient typiquement un texte + une ou deux URLs.
function linkify(text) {
  const frag = document.createDocumentFragment();
  if (!text) return frag;
  const urlRe = /(https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match;
  while ((match = urlRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    const url = match[0];
    // Raccourcir l'URL affichée pour ne pas casser la lecture
    let label = url;
    try {
      const u = new URL(url);
      label = u.hostname.replace(/^www\./, '') + (u.pathname && u.pathname !== '/' ? u.pathname : '');
      if (label.length > 50) label = label.slice(0, 47) + '…';
    } catch {}
    const a = document.createElement('a');
    a.href = url;
    a.textContent = label;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'ref-link';
    frag.appendChild(a);
    lastIndex = match.index + url.length;
  }
  if (lastIndex < text.length) {
    frag.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
  return frag;
}

// ---------- État global -----------------------------------------------
const State = {
  meta: null,
  game: null,   // partie en cours
  qcmMode: false  // mode QCM actif pour la partie en cours
};

// ---------- Save game local par code ----------------------------------
function lsGameKey() { return Session.code ? `${LS_GAME}.${Session.code}` : null; }
function loadSavedGame() {
  const k = lsGameKey();
  if (!k) return null;
  try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; }
}
function persistSavedGame(state) {
  const k = lsGameKey();
  if (!k) return;
  if (state) localStorage.setItem(k, JSON.stringify({ ...state, savedAt: new Date().toISOString() }));
  else localStorage.removeItem(k);
}

// ---------- Normalisation des réponses --------------------------------
function normalize(str) {
  return (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[‘’‛`´]/g, "'")
    .replace(/\b(l|d|j|n|m|s|t|c|qu)'/g, '')   // l', d', j', n', m', s', t', c', qu'
    .replace(/\b(le|la|les|un|une|du|de|des|au|aux|en|et|ou|a)\s+/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function checkAnswer(userInput, expected) {
  if (!userInput) return false;
  const u = normalize(userInput);
  const variants = [];
  const re = /^(.+?)\s*\((.+?)\)\s*(.*)$/;
  const m = expected.match(re);
  if (m) {
    variants.push((m[1] + ' ' + m[3]).trim());
    variants.push((m[2] + ' ' + m[3]).trim());
  }
  variants.push(expected);
  variants.forEach(v => {
    v.split(/\s+(?:\/|ou|et)\s+/i).forEach(p => variants.push(p));
  });
  return variants.some(v => {
    const n = normalize(v);
    if (!n) return false;
    if (u === n) return true;
    if (n.length >= 4 && (u.includes(n) || n.includes(u))) return true;
    return false;
  });
}

// ---------- Routeur ---------------------------------------------------
async function route(view, params = {}) {
  switch (view) {
    case 'login':    return renderLogin();
    case 'home':     return renderHome();
    case 'setup':    return renderSetup();
    case 'play':     return renderPlay();
    case 'result':   return renderResult(params.archived);
    case 'history':  return renderHistory();
    case 'review':   return renderReview();
    case 'duels':    return renderDuels();
    case 'duel-result': return renderDuelResult(params.duelId);
    case 'admin':    return renderAdmin();
    default:         return Session.token ? renderHome() : renderLogin();
  }
}

// ---------- Vue : login -----------------------------------------------
function renderLogin() {
  Session.clearUser();
  refreshWho();
  mount('tpl-login');

  // Form user
  $('#form-user-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = $('#login-code').value.trim().toUpperCase();
    const err = $('#login-error');
    err.hidden = true;
    try {
      const r = await api.loginUser(code);
      Session.set(r.token, r.code, r.name);
      // Charger meta puis aller à l'accueil
      State.meta = await api.meta();
      $('#footer-meta').textContent =
        `${State.meta.questionsTotal} questions · ${State.meta.manche1Count} séries · ${State.meta.manche2Count} duels · ${State.meta.manche3Count} finales · ${State.meta.domains.length} domaines`;
      route('home');
    } catch (e) {
      err.textContent = e.message || 'Code invalide';
      err.hidden = false;
    }
  });

  $('#show-admin-login').addEventListener('click', (e) => {
    e.preventDefault();
    const form = $('#form-admin-login');
    form.hidden = !form.hidden;
    if (!form.hidden) $('#admin-password').focus();
  });

  $('#form-admin-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pwd = $('#admin-password').value;
    const err = $('#login-error');
    err.hidden = true;
    try {
      const r = await api.loginAdmin(pwd);
      Session.setAdmin(r.token);
      route('admin');
    } catch (e) {
      err.textContent = e.message || 'Mot de passe invalide';
      err.hidden = false;
    }
  });

  setupInstallButtons();
}

// ---------- PWA install buttons (sur la page de garde) ---------------
// L'événement beforeinstallprompt est mémorisé globalement par init() ;
// on l'utilise ici pour brancher le bouton "Installer (rapide)".
function setupInstallButtons() {
  const btnInstall = $('#btn-install-pwa');
  const btnApk     = $('#btn-download-apk');
  const btnHelp    = $('#btn-install-help');
  const iosHelp    = $('#install-ios-help');
  const hint       = $('#install-hint');
  if (!btnInstall) return;

  const ua = navigator.userAgent || '';
  const isIOS     = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                    || window.navigator.standalone === true;

  // URL Render à utiliser pour PWABuilder et le download APK Releases
  const PWA_URL = 'https://qpc-champion-58rn.onrender.com';
  // PWABuilder accepte une URL + génère APK / iOS / Windows directement
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(PWA_URL)}`;

  // Lien APK : pointe vers les releases GitHub où le workflow va publier l'APK
  // (en attendant la première release, on redirige vers PWABuilder)
  btnApk.href = 'https://github.com/Ricard228/qpc-app/releases/latest';
  btnHelp.href = pwaBuilderUrl;

  // Cas : déjà installée
  if (isStandalone) {
    hint.textContent = '✓ Application déjà installée — vous y accédez actuellement.';
    btnInstall.disabled = true;
    btnInstall.textContent = '✓ Déjà installée';
    return;
  }

  // Cas iOS Safari : pas de prompt natif, on affiche les instructions
  if (isIOS) {
    iosHelp.hidden = false;
    btnInstall.textContent = '📱 Voir les instructions';
    btnInstall.onclick = (e) => {
      e.preventDefault();
      iosHelp.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    return;
  }

  // Cas Android / desktop Chrome avec prompt natif disponible
  if (window._deferredInstallPrompt) {
    btnInstall.onclick = async () => {
      const prompt = window._deferredInstallPrompt;
      window._deferredInstallPrompt = null;
      try {
        await prompt.prompt();
        const result = await prompt.userChoice;
        if (result.outcome === 'accepted') {
          hint.textContent = '✓ Installation acceptée !';
          btnInstall.disabled = true;
          btnInstall.textContent = '✓ Installée';
        }
      } catch (e) { console.warn('install prompt error:', e); }
    };
  } else {
    // Prompt non encore disponible : on remplace par un bouton vers PWABuilder
    btnInstall.textContent = '🛠 Générer un APK signé';
    btnInstall.onclick = (e) => {
      e.preventDefault();
      window.open(pwaBuilderUrl, '_blank', 'noopener,noreferrer');
    };
    hint.innerHTML = 'Sur <strong>Android Chrome</strong> : menu ⋮ → « Installer l\'application ». ' +
                     'Sinon, générez un APK signé via PWABuilder (Microsoft, gratuit) en cliquant ci-dessous.';
  }
}

// ---------- Vue : accueil ---------------------------------------------
async function renderHome() {
  if (!Session.token) return route('login');
  refreshWho();
  mount('tpl-home');

  // Bandeau partie sauvegardée
  const saved = loadSavedGame();
  if (saved) {
    $('#resume-banner').hidden = false;
    $('#resume-when').textContent = fmtDate(saved.savedAt);
    $('#resume-where').textContent =
      saved.cursor && saved.plan ? `${labelManche(saved.plan[saved.cursor.planIdx]?.manche)} (${saved.cursor.planIdx + 1}/${saved.plan.length})`
                                 : '—';
    $('#btn-resume').onclick = () => {
      State.game = saved;
      route('play');
    };
    $('#btn-discard').onclick = () => {
      if (!confirm('Abandonner cette partie ? Le score en cours sera perdu.')) return;
      persistSavedGame(null);
      renderHome();
    };
  }

  $('#card-new-game').onclick = () => route('setup');
  $('#card-review').onclick   = () => route('review');
  $('#card-duels').onclick    = () => route('duels');
  $('#card-history').onclick  = () => route('history');

  // Mettre à jour le nombre de questions affiché sur la carte Révision
  const reviewCount = $('#card-review-count');
  if (reviewCount && State.meta && State.meta.questionsTotal) {
    reviewCount.textContent = State.meta.questionsTotal;
  }
  $('#card-switch').onclick   = () => {
    Session.clearUser();
    route('login');
  };

  // Cacher la carte "Révision libre" si le super-admin l'a désactivée
  // OU si l'utilisateur a un duel actif en cours
  const reviewEnabled = (State.meta && State.meta.settings && State.meta.settings.reviewEnabled !== false);
  const hasActiveDuel = !!(State.meta && State.meta.hasActiveDuel);
  if (!reviewEnabled || hasActiveDuel) {
    $('#card-review').hidden = true;
    if (hasActiveDuel) {
      const note = el('div', { class: 'banner banner-warn', style: 'margin-top:0;' },
        el('div', {}, el('strong', {}, '⚔️ Duel en cours.'), ' La révision libre est désactivée tant que vous n\'avez pas terminé vos duels actifs.'));
      $('#card-duels').closest('.grid').parentElement.insertBefore(note, $('#card-duels').closest('.grid'));
    }
  }

  // Badge invitations / duels en attente
  api.myDuels().then(list => {
    const pending = list.filter(d => d.yourStatus === 'pending' && d.status === 'pending').length;
    const activeToPlay = list.filter(d => d.yourStatus === 'accepted' && (d.status === 'active' || d.status === 'pending') && !d.youHavePlayed).length;
    const total = pending + activeToPlay;
    const badge = $('#duels-badge');
    if (badge && total > 0) {
      badge.textContent = String(total);
      badge.hidden = false;
    }
  }).catch(() => {});

  // Cacher les outils d'export/import des profils — plus pertinents
  const exportSection = $('#card-switch')?.closest('.grid')?.nextElementSibling;
  if (exportSection && exportSection.classList.contains('card')) exportSection.hidden = true;
}

function labelManche(m) {
  return { manche1: 'Manche 1 — Les 4 à la suite',
           manche2: 'Manche 2 — Face-à-face',
           manche3: 'Manche 3 — Finale 9 points' }[m] || m;
}

// ---------- Vue : configuration de la partie --------------------------
async function renderSetup() {
  if (!Session.token) return route('login');
  mount('tpl-setup');

  const grid = $('#domains-grid');
  for (const d of State.meta.domains) {
    grid.appendChild(el('label', { class: 'check' },
      el('input', { type: 'checkbox', value: d.name, checked: 'checked' }),
      el('span', {}, d.name),
      el('span', { class: 'badge' }, `${d.count}`)
    ));
  }
  $('#btn-domains-all').onclick  = (e) => { e.preventDefault(); $$('#domains-grid input').forEach(c => c.checked = true); };
  $('#btn-domains-none').onclick = (e) => { e.preventDefault(); $$('#domains-grid input').forEach(c => c.checked = false); };
  $('#btn-back-home').onclick    = () => route('home');

  // Gestion du mode QCM selon les settings admin
  const qcmMode = (State.meta && State.meta.settings && State.meta.settings.qcmMode) || 'user-choice';
  const qcmCard = $('#setup-qcm-card');
  if (qcmMode === 'force-text') {
    qcmCard.innerHTML = '<h2 class="card-title">Mode de réponse</h2><p class="muted">L\'administrateur a forcé le <strong>mode saisie libre</strong> pour cette partie.</p>';
  } else if (qcmMode === 'force-qcm') {
    qcmCard.innerHTML = '<h2 class="card-title">Mode de réponse</h2><p class="muted">L\'administrateur a forcé le <strong>mode QCM</strong> pour cette partie.</p>';
  } // sinon user-choice : on garde la radio par défaut

  $('#btn-start').onclick = async () => {
    const manches = $$('#manches-row input:checked').map(c => c.value);
    if (manches.length === 0) { alert('Sélectionnez au moins une manche.'); return; }
    const domains = $$('#domains-grid input:checked').map(c => c.value);
    const counts = {
      manche1: parseInt($('#n-m1').value, 10) || 1,
      manche2: parseInt($('#n-m2').value, 10) || 1,
      manche3: parseInt($('#n-m3').value, 10) || 1
    };
    // Déterminer le mode QCM effectif
    let useQcm = false;
    if (qcmMode === 'force-qcm') useQcm = true;
    else if (qcmMode === 'force-text') useQcm = false;
    else {
      const pick = $$('#setup-qcm-row input[name=qcm-mode]:checked')[0];
      useQcm = pick && pick.value === 'qcm';
    }
    State.qcmMode = useQcm;

    const plan = [];
    for (const m of manches) {
      let packs = await api.packs(m, domains);
      if (packs.length === 0) { alert(`Aucun pack disponible pour ${labelManche(m)} avec ces domaines.`); return; }
      packs = shuffle(packs).slice(0, Math.min(counts[m], packs.length));
      packs.forEach(p => plan.push({ manche: m, pack: p }));
    }
    State.game = {
      plan,
      cursor: { planIdx: 0, qIdx: 0, m2RemainingPts: null, m3StartedAt: null },
      score: { total: 0, byManche: { manche1: 0, manche2: 0, manche3: 0 } },
      log: [],
      qcmMode: useQcm
    };
    persistSavedGame(State.game);
    route('play');
  };
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- Vue : jeu --------------------------------------------------
let _timerId = null;

function clearTimer() {
  if (_timerId) { clearInterval(_timerId); _timerId = null; }
}

// Construit un formulaire de réponse pour une question donnée.
// Si State.qcmMode + q.choices : rend des radios/checkboxes selon
// nombre de bonnes réponses ; sinon, input texte classique.
// Retourne { node, getValue } où getValue() renvoie la string de réponse
// (compatible avec checkAnswer).
function buildAnswerForm(q, onSubmit, submitLabel) {
  const useQcm = (State.qcmMode || (State.game && State.game.qcmMode)) && Array.isArray(q.choices) && q.choices.length >= 2;
  if (useQcm) {
    const multi = Array.isArray(q.correctIndices) && q.correctIndices.length > 1;
    const form = el('form', { class: 'play-answer-form qcm-form' });
    const list = el('div', { class: 'qcm-list' });

    // Randomisation runtime : on mélange l'ordre d'affichage des choix
    // à chaque rendu. La valeur stockée sur l'input reste l'index ORIGINAL,
    // donc evalAnswer/getQcmValue n'ont pas besoin d'être modifiés.
    const n = q.choices.length;
    const order = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    order.forEach(originalIdx => {
      const inp = el('input', {
        type: multi ? 'checkbox' : 'radio',
        name: 'qcm-ans',
        value: String(originalIdx)
      });
      list.appendChild(el('label', { class: 'qcm-choice' }, inp, el('span', {}, q.choices[originalIdx])));
    });
    form.appendChild(list);
    if (multi) form.appendChild(el('div', { class: 'muted', style: 'font-size:13px; margin-top:6px;' }, '⚠ Plusieurs bonnes réponses possibles : cochez toutes celles qui s\'appliquent.'));
    form.appendChild(el('button', { class: 'btn btn-primary', type: 'submit' }, submitLabel || 'Valider'));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      onSubmit(getQcmValue(form));
    });
    return form;
  }
  // Saisie libre
  const form = el('form', { class: 'play-answer-form' });
  const input = el('input', { class: 'play-answer-input', type: 'text', placeholder: 'Votre réponse…', autocomplete: 'off' });
  form.appendChild(input);
  form.appendChild(el('button', { class: 'btn btn-primary', type: 'submit' }, submitLabel || 'Valider'));
  setTimeout(() => input.focus(), 50);
  form.addEventListener('submit', (e) => { e.preventDefault(); onSubmit(input.value); });
  return form;
}

function getQcmValue(form) {
  // Retourne une string représentant la sélection : indices triés joints par |
  // ou la valeur texte du seul choix sélectionné (utile pour fallback).
  const inputs = [...form.querySelectorAll('input[name=qcm-ans]:checked')];
  if (inputs.length === 0) return '';
  const indices = inputs.map(i => parseInt(i.value, 10)).sort((a, b) => a - b);
  // Marqueur spécial pour identifier le mode QCM dans checkAnswer
  return `__QCM__${indices.join('|')}`;
}

// Vérifie une réponse en tenant compte du QCM si présent
function evalAnswer(userInput, q) {
  // Si réponse QCM : comparer aux correctIndices
  if (typeof userInput === 'string' && userInput.startsWith('__QCM__') && Array.isArray(q.correctIndices)) {
    const picked = userInput.slice(7).split('|').filter(x => x !== '').map(Number).sort((a, b) => a - b);
    const correct = q.correctIndices.slice().sort((a, b) => a - b);
    // Multi-réponses : toutes les bonnes ET seulement les bonnes
    if (picked.length !== correct.length) return false;
    for (let i = 0; i < correct.length; i++) if (picked[i] !== correct[i]) return false;
    return true;
  }
  // Sinon : comparaison souple texte
  return checkAnswer(userInput, q.r);
}

// Pour l'affichage user-friendly de la réponse donnée
function displayGiven(userInput, q) {
  if (typeof userInput === 'string' && userInput.startsWith('__QCM__') && q && Array.isArray(q.choices)) {
    const picked = userInput.slice(7).split('|').filter(x => x !== '').map(Number);
    if (picked.length === 0) return '(passée)';
    return picked.map(i => q.choices[i]).join(' + ');
  }
  return userInput || '(passée)';
}
function startTimer(seconds, onTick, onEnd) {
  clearTimer();
  let remaining = seconds;
  onTick(remaining);
  _timerId = setInterval(() => {
    remaining -= 1;
    onTick(remaining);
    if (remaining <= 0) { clearTimer(); onEnd && onEnd(); }
  }, 1000);
}

function persistGame() { persistSavedGame(State.game); }

function renderPlay() {
  if (!Session.token || !State.game) return route('home');
  mount('tpl-play');
  const g = State.game;
  const step = g.plan[g.cursor.planIdx];
  if (!step) return finishGame();
  $('#play-tag').textContent = labelManche(step.manche);
  $('#play-pack-title').textContent = step.pack.titre;
  $('#play-pack-sub').textContent = `${step.pack.theme || ''} · Domaine : ${step.pack.domain}`;
  $('#play-score').textContent = g.score.total;
  if (step.manche === 'manche1') return renderManche1();
  if (step.manche === 'manche2') return renderManche2();
  if (step.manche === 'manche3') return renderManche3();
}

function renderManche1() {
  const g = State.game, step = g.plan[g.cursor.planIdx], pack = step.pack;
  const qIdx = g.cursor.qIdx, q = pack.questions[qIdx];
  if (g.cursor.m1Remaining == null) g.cursor.m1Remaining = 40;
  if (qIdx >= pack.questions.length) return;

  const card = $('#play-card'); card.innerHTML = '';
  card.appendChild(el('div', { class: 'play-question' },
    el('span', { class: 'qnum' }, String(qIdx + 1)),
    document.createTextNode(q.q)));
  card.appendChild(buildAnswerForm(q, (val) => answerM1(val)));

  const actions = $('#play-actions'); actions.innerHTML = '';
  actions.appendChild(el('button', { class: 'btn btn-ghost left', onclick: pauseAndExit }, 'Mettre en pause'));
  actions.appendChild(el('button', { class: 'btn btn-ghost', onclick: () => answerM1('') }, 'Passer'));

  startTimer(g.cursor.m1Remaining,
    (r) => {
      g.cursor.m1Remaining = r;
      const t = $('#play-timer');
      t.textContent = `${r}s`;
      t.classList.remove('warn', 'danger');
      if (r <= 10) t.classList.add('danger');
      else if (r <= 20) t.classList.add('warn');
    },
    () => revealM1AndContinue());
}

function answerM1(userInput) {
  clearTimer();
  const g = State.game, step = g.plan[g.cursor.planIdx], pack = step.pack;
  const qIdx = g.cursor.qIdx, q = pack.questions[qIdx];
  const correct = evalAnswer(userInput, q);
  const awarded = correct ? 1 : 0;
  g.score.total += awarded; g.score.byManche.manche1 += awarded;
  g.log.push({ manche: 'manche1', packId: pack.id, packTitle: pack.titre, qid: q.id,
    q: q.q, expected: q.r, given: displayGiven(userInput, q), correct, pts: 1, awarded,
    explain: q.e, ref: q.ref });
  $('#play-score').textContent = g.score.total;
  showReveal(correct, q, userInput);
  setTimeout(() => {
    g.cursor.qIdx += 1; persistGame();
    if (g.cursor.qIdx >= pack.questions.length || g.cursor.m1Remaining <= 0) {
      g.cursor.m1Remaining = null; g.cursor.qIdx = 0; g.cursor.planIdx += 1;
      persistGame(); renderPlay();
    } else renderManche1();
  }, 1600);
}

function revealM1AndContinue() {
  const g = State.game, step = g.plan[g.cursor.planIdx], pack = step.pack;
  while (g.cursor.qIdx < pack.questions.length) {
    const q = pack.questions[g.cursor.qIdx];
    g.log.push({ manche: 'manche1', packId: pack.id, packTitle: pack.titre, qid: q.id,
      q: q.q, expected: q.r, given: '(temps écoulé)', correct: false, pts: 1, awarded: 0,
      explain: q.e, ref: q.ref });
    g.cursor.qIdx += 1;
  }
  g.cursor.m1Remaining = null; g.cursor.qIdx = 0; g.cursor.planIdx += 1;
  persistGame(); renderPlay();
}

function showReveal(correct, q, given) {
  const card = $('#play-card');
  $$('.play-answer-input, .play-answer-form button', card).forEach(elx => elx.disabled = true);
  const div = el('div', { class: 'play-reveal ' + (correct ? 'correct' : 'wrong') },
    el('div', { class: 'reveal-label' }, correct ? '✓ Bonne réponse' : '✗ Mauvaise / passée'),
    el('div', { class: 'reveal-answer' }, 'Réponse : ', el('strong', {}, q.r)),
    q.e ? el('div', { class: 'reveal-explain' }, q.e) : null,
    q.ref ? el('div', { class: 'reveal-ref' }, linkify(q.ref)) : null);
  card.appendChild(div);
}

function renderManche2() {
  const g = State.game, step = g.plan[g.cursor.planIdx], pack = step.pack;
  if (!g.cursor.m2RemainingPts || !g.cursor.m2RemainingPts.length) {
    g.cursor.m2RemainingPts = pack.questions.map(q => q.pts).sort((a, b) => a - b);
  }
  if (g.cursor.m2RemainingPts.length === 0) {
    g.cursor.m2RemainingPts = null; g.cursor.planIdx += 1; persistGame(); renderPlay(); return;
  }
  if (g.cursor.m2Picked == null) renderM2Picker(pack);
  else renderM2Question(pack, g.cursor.m2Picked);
}

function renderM2Picker(pack) {
  const g = State.game, card = $('#play-card'); card.innerHTML = '';
  card.appendChild(el('div', { class: 'play-question' },
    'Choisissez la valeur de votre prochaine question. ',
    el('span', { class: 'muted', html: 'Plus la valeur est élevée, plus la question est difficile.' })));
  const grid = el('div', { class: 'points-grid' });
  pack.questions.forEach(q => {
    const used = !g.cursor.m2RemainingPts.includes(q.pts);
    grid.appendChild(el('button', {
      class: 'points-btn' + (used ? ' used' : ''),
      onclick: () => { if (used) return; g.cursor.m2Picked = q.pts; persistGame(); renderPlay(); }
    }, el('span', { class: 'points-pts' }, `${q.pts}`),
       document.createTextNode(used ? 'utilisée' : 'point' + (q.pts > 1 ? 's' : ''))));
  });
  card.appendChild(grid);
  const actions = $('#play-actions'); actions.innerHTML = '';
  actions.appendChild(el('button', { class: 'btn btn-ghost left', onclick: pauseAndExit }, 'Mettre en pause'));
  $('#play-timer').textContent = '—'; $('#play-timer').classList.remove('warn', 'danger');
  clearTimer();
}

function renderM2Question(pack, pts) {
  const g = State.game;
  const q = pack.questions.find(qq => qq.pts === pts);
  if (!q) { g.cursor.m2Picked = null; return renderPlay(); }
  const card = $('#play-card'); card.innerHTML = '';
  card.appendChild(el('div', { class: 'play-question' },
    el('span', { class: 'qnum' }, `${pts}`), document.createTextNode(q.q)));
  card.appendChild(buildAnswerForm(q, (val) => answerM2(val), `Valider (${pts} pt${pts > 1 ? 's' : ''})`));
  const actions = $('#play-actions'); actions.innerHTML = '';
  actions.appendChild(el('button', { class: 'btn btn-ghost left', onclick: pauseAndExit }, 'Mettre en pause'));
  actions.appendChild(el('button', { class: 'btn btn-ghost', onclick: () => answerM2('') }, 'Passer'));
  startTimer(25,
    (r) => {
      const t = $('#play-timer'); t.textContent = `${r}s`; t.classList.remove('warn', 'danger');
      if (r <= 5) t.classList.add('danger');
      else if (r <= 10) t.classList.add('warn');
    }, () => answerM2(''));
}

function answerM2(userInput) {
  clearTimer();
  const g = State.game, step = g.plan[g.cursor.planIdx], pack = step.pack;
  const pts = g.cursor.m2Picked;
  const q = pack.questions.find(qq => qq.pts === pts);
  const correct = evalAnswer(userInput, q);
  const awarded = correct ? pts : 0;
  g.score.total += awarded; g.score.byManche.manche2 += awarded;
  g.log.push({ manche: 'manche2', packId: pack.id, packTitle: pack.titre, qid: q.id,
    q: q.q, expected: q.r, given: displayGiven(userInput, q), correct, pts, awarded,
    explain: q.e, ref: q.ref });
  $('#play-score').textContent = g.score.total;
  showReveal(correct, q, userInput);
  g.cursor.m2RemainingPts = g.cursor.m2RemainingPts.filter(v => v !== pts);
  g.cursor.m2Picked = null;
  setTimeout(() => {
    persistGame();
    if (g.cursor.m2RemainingPts.length === 0) {
      g.cursor.m2RemainingPts = null; g.cursor.planIdx += 1; persistGame(); renderPlay();
    } else renderManche2();
  }, 1700);
}

function renderManche3() {
  const g = State.game, step = g.plan[g.cursor.planIdx], pack = step.pack;
  if (g.cursor.qIdx == null) g.cursor.qIdx = 0;
  if (g.cursor.m3Score == null) g.cursor.m3Score = 0;
  if (g.cursor.m3Score >= 9 || g.cursor.qIdx >= pack.questions.length) {
    g.cursor.qIdx = 0; g.cursor.m3Score = null; g.cursor.planIdx += 1;
    persistGame(); renderPlay(); return;
  }
  const q = pack.questions[g.cursor.qIdx];
  const card = $('#play-card'); card.innerHTML = '';
  card.appendChild(el('div', { class: 'play-question' },
    el('span', { class: 'qnum' }, `${g.cursor.qIdx + 1}`), document.createTextNode(q.q)));
  card.appendChild(el('div', { class: 'muted', html: `Finale en cours : <strong>${g.cursor.m3Score}</strong>/9 points.` }));
  const wrap = el('div', { style: 'margin-top:14px;' });
  wrap.appendChild(buildAnswerForm(q, (val) => answerM3(val)));
  card.appendChild(wrap);
  const actions = $('#play-actions'); actions.innerHTML = '';
  actions.appendChild(el('button', { class: 'btn btn-ghost left', onclick: pauseAndExit }, 'Mettre en pause'));
  actions.appendChild(el('button', { class: 'btn btn-ghost', onclick: () => answerM3('') }, 'Passer'));
  startTimer(15,
    (r) => {
      const t = $('#play-timer'); t.textContent = `${r}s`; t.classList.remove('warn', 'danger');
      if (r <= 4) t.classList.add('danger');
      else if (r <= 8) t.classList.add('warn');
    }, () => answerM3(''));
}

function answerM3(userInput) {
  clearTimer();
  const g = State.game, step = g.plan[g.cursor.planIdx], pack = step.pack;
  const q = pack.questions[g.cursor.qIdx];
  const correct = evalAnswer(userInput, q);
  const awarded = correct ? 1 : 0;
  g.score.total += awarded; g.score.byManche.manche3 += awarded;
  if (correct) g.cursor.m3Score = (g.cursor.m3Score || 0) + 1;
  g.log.push({ manche: 'manche3', packId: pack.id, packTitle: pack.titre, qid: q.id,
    q: q.q, expected: q.r, given: displayGiven(userInput, q), correct, pts: 1, awarded,
    explain: q.e, ref: q.ref });
  $('#play-score').textContent = g.score.total;
  showReveal(correct, q, userInput);
  setTimeout(() => { g.cursor.qIdx += 1; persistGame(); renderManche3(); }, 1500);
}

async function pauseAndExit() {
  clearTimer();
  persistGame();
  alert("Partie mise en pause. Vous pourrez la reprendre depuis l'accueil.");
  route('home');
}

async function finishGame() {
  clearTimer();
  const g = State.game;
  const summary = {
    finishedAt: new Date().toISOString(),
    totalScore: g.score.total, byManche: g.score.byManche,
    nbQuestions: g.log.length,
    nbCorrect: g.log.filter(l => l.correct).length,
    nbWrong:   g.log.filter(l => !l.correct).length,
    log: g.log,
    config: { manches: [...new Set(g.plan.map(s => s.manche))], packsCount: g.plan.length }
  };
  // Si on joue un DUEL, on uploade au endpoint spécifique
  if (g.duelId) {
    try { await api.submitDuelGame(g.duelId, summary); }
    catch (e) { console.warn('upload duel échoué :', e); alert('Erreur upload duel : ' + e.message); }
    window._lastResult = summary;
    // Aller directement à la vue résultat du duel
    return route('duel-result', { duelId: g.duelId });
  }
  try { await api.archiveGame(summary); } catch (e) { console.warn('upload échoué :', e); }
  persistSavedGame(null);
  window._lastResult = summary;
  route('result', { archived: summary });
}

// ---------- Vue : résultat --------------------------------------------
function renderResult() {
  const r = window._lastResult;
  if (!r) return route('home');
  mount('tpl-result');
  $('#res-total').textContent = r.totalScore;
  const bd = $('#res-breakdown'); bd.innerHTML = '';
  [['Manche 1', r.byManche.manche1 || 0], ['Manche 2', r.byManche.manche2 || 0], ['Manche 3', r.byManche.manche3 || 0],
   ['Questions', r.nbQuestions], ['Bonnes réponses', r.nbCorrect], ['Mauvaises ou passées', r.nbWrong]]
   .forEach(([label, val]) => {
    bd.appendChild(el('div', { class: 'result-cell' },
      el('div', { class: 'label' }, label),
      el('div', { class: 'value' }, String(val))));
  });
  const lst = $('#res-list'); lst.innerHTML = '';
  let counter = 0;
  for (const l of r.log) {
    counter++;
    lst.appendChild(el('div', { class: 'result-line ' + (l.correct ? 'correct' : 'wrong') },
      el('div', { class: 'verdict ' + (l.correct ? 'ok' : 'ko') }, l.correct ? '✓' : '✗'),
      el('div', { style: 'flex:1; min-width:0;' },
        el('div', { class: 'rl-q' }, `${counter}. ${l.q}`),
        el('div', { class: 'rl-a' }, `Attendu : ${l.expected} · Donné : ${l.given}`)),
      el('div', { class: 'rl-pts' }, `+${l.awarded}/${l.pts}`)));
  }
  $('#btn-result-home').onclick    = () => route('home');
  $('#btn-result-history').onclick = () => route('history');
}

// ---------- Vue : historique du profil --------------------------------
async function renderHistory() {
  if (!Session.token) return route('login');
  mount('tpl-history');

  let h = [];
  try { h = await api.myGames(); } catch (e) { console.warn(e); }
  const stats = $('#stats-block');
  const totalGames = h.length;
  const totalScore = h.reduce((s, g) => s + (g.totalScore || 0), 0);
  const totalQs    = h.reduce((s, g) => s + (g.nbQuestions || 0), 0);
  const totalCorr  = h.reduce((s, g) => s + (g.nbCorrect || 0), 0);
  const best       = h.reduce((b, g) => Math.max(b, g.totalScore || 0), 0);
  const accuracy   = totalQs ? Math.round(100 * totalCorr / totalQs) : 0;
  stats.innerHTML = '';
  [['Parties jouées', totalGames], ['Score cumulé', totalScore], ['Meilleur score', best],
   ['Questions répondues', totalQs], ['Bonnes réponses', `${totalCorr} (${accuracy}%)`]].forEach(([l, v]) => {
    stats.appendChild(el('div', { class: 'stat-cell' },
      el('div', { class: 'stat-value' }, String(v)),
      el('div', { class: 'stat-label' }, l)));
  });
  const list = $('#history-list'); list.innerHTML = '';
  if (h.length === 0) {
    list.appendChild(el('div', { class: 'muted' }, 'Aucune partie pour le moment.'));
  } else {
    h.slice().reverse().forEach(g => {
      list.appendChild(el('div', { class: 'history-row' },
        el('div', { class: 'history-when' },
          fmtDate(g.finishedAt),
          el('span', { class: 'small' }, `${g.nbCorrect}/${g.nbQuestions} bonnes réponses · ${g.config?.packsCount || '?'} packs joués`)),
        el('div', { class: 'history-score' }, `${g.totalScore} pts`)));
    });
  }
  $('#btn-history-home').onclick = () => route('home');
}

// ---------- Vue : révision libre --------------------------------------
let _reviewState = null;

function buildReviewPool(manches, domains, allPacks) {
  const pool = [];
  for (const m of manches) {
    const packs = (allPacks[m] || []).filter(p => !domains.length || domains.includes(p.domain));
    for (const pack of packs) {
      for (const q of pack.questions) {
        pool.push({ manche: m, packId: pack.id, packTitle: pack.titre,
          domain: pack.domain, theme: pack.theme,
          q: q.q, r: q.r, e: q.e, ref: q.ref, pts: q.pts });
      }
    }
  }
  return pool;
}

async function renderReview() {
  if (!Session.token) return route('login');
  // Vérifier si la révision libre est encore autorisée
  try {
    const fresh = await api.meta();
    if (fresh.settings && fresh.settings.reviewEnabled === false) {
      alert('Le mode Révision libre est actuellement désactivé par l\'administrateur.');
      return route('home');
    }
    if (fresh.hasActiveDuel) {
      alert('Vous avez un duel en cours. Terminez-le d\'abord avant d\'accéder à la révision libre.');
      return route('duels');
    }
    State.meta = fresh;
  } catch (e) {}
  mount('tpl-review');

  // Afficher dynamiquement le nombre total de questions dans le lead
  const revTotal = $('#rev-total-count');
  if (revTotal && State.meta && State.meta.questionsTotal) {
    revTotal.textContent = State.meta.questionsTotal;
  }

  // Charger TOUS les packs (3 manches) en parallèle — server-side filtrage par manche
  const allPacks = {
    manche1: await api.packs('manche1', []),
    manche2: await api.packs('manche2', []),
    manche3: await api.packs('manche3', [])
  };

  if (!_reviewState) {
    _reviewState = {
      manches: ['manche1', 'manche2', 'manche3'],
      domains: State.meta.domains.map(d => d.name),
      pool: [], idx: 0, shuffled: false, showAnswer: false
    };
  }

  const grid = $('#rev-domains');
  for (const d of State.meta.domains) {
    grid.appendChild(el('label', { class: 'check' },
      el('input', { type: 'checkbox', value: d.name, checked: _reviewState.domains.includes(d.name) ? 'checked' : false }),
      el('span', {}, d.name),
      el('span', { class: 'badge' }, `${d.count}`)));
  }
  $$('#rev-manches input').forEach(c => { c.checked = _reviewState.manches.includes(c.value); });

  $('#btn-rev-all').onclick  = (e) => { e.preventDefault(); $$('#rev-domains input').forEach(c => c.checked = true); };
  $('#btn-rev-none').onclick = (e) => { e.preventDefault(); $$('#rev-domains input').forEach(c => c.checked = false); };
  $('#btn-rev-home').onclick = () => route('home');

  $('#btn-rev-apply').onclick = () => {
    const ms = $$('#rev-manches input:checked').map(c => c.value);
    const ds = $$('#rev-domains input:checked').map(c => c.value);
    if (ms.length === 0) { alert('Sélectionnez au moins une manche.'); return; }
    _reviewState.manches = ms; _reviewState.domains = ds;
    _reviewState.pool = buildReviewPool(ms, ds, allPacks);
    _reviewState.idx = 0; _reviewState.showAnswer = false;
    if (_reviewState.shuffled) _reviewState.pool = shuffle(_reviewState.pool);
    renderReviewCard();
  };
  $('#btn-rev-shuffle').onclick = () => {
    _reviewState.shuffled = !_reviewState.shuffled;
    if (_reviewState.shuffled) _reviewState.pool = shuffle(_reviewState.pool);
    else _reviewState.pool = buildReviewPool(_reviewState.manches, _reviewState.domains, allPacks);
    _reviewState.idx = 0; _reviewState.showAnswer = false;
    renderReviewCard();
    $('#btn-rev-shuffle').textContent = _reviewState.shuffled ? '↺ Ordre original' : '🔀 Mélanger';
  };

  $('#btn-rev-prev').onclick = () => { if (_reviewState.idx > 0) { _reviewState.idx--; _reviewState.showAnswer = false; renderReviewCard(); } };
  $('#btn-rev-next').onclick = () => { if (_reviewState.idx < _reviewState.pool.length - 1) { _reviewState.idx++; _reviewState.showAnswer = false; renderReviewCard(); } };
  $('#btn-rev-toggle').onclick = () => { _reviewState.showAnswer = !_reviewState.showAnswer; renderReviewCard(); };

  if (_reviewState.pool.length === 0)
    _reviewState.pool = buildReviewPool(_reviewState.manches, _reviewState.domains, allPacks);
  renderReviewCard();

  if (!window._reviewKeyHandler) {
    window._reviewKeyHandler = (e) => {
      if (!_reviewState || !$('#rev-question')) return;
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft')  { $('#btn-rev-prev').click(); e.preventDefault(); }
      if (e.key === 'ArrowRight') { $('#btn-rev-next').click(); e.preventDefault(); }
      if (e.key === ' ')          { $('#btn-rev-toggle').click(); e.preventDefault(); }
    };
    document.addEventListener('keydown', window._reviewKeyHandler);
  }
}

function renderReviewCard() {
  if (!_reviewState || _reviewState.pool.length === 0) {
    $('#rev-question').textContent = 'Aucune question pour ces filtres.';
    $('#rev-counter').textContent = '0 / 0';
    $('#rev-pack-info').textContent = '';
    $('#rev-reveal').hidden = true; return;
  }
  const item = _reviewState.pool[_reviewState.idx];
  $('#rev-counter').textContent = `${_reviewState.idx + 1} / ${_reviewState.pool.length}`;
  $('#rev-pack-info').textContent = `${labelManche(item.manche)} · ${item.packTitle} · ${item.domain}`;
  $('#rev-question').textContent = item.q;
  const reveal = $('#rev-reveal');
  if (_reviewState.showAnswer) {
    reveal.hidden = false;
    reveal.className = 'play-reveal correct';
    reveal.innerHTML = '';
    reveal.appendChild(el('div', { class: 'reveal-label' }, 'Réponse'));
    reveal.appendChild(el('div', { class: 'reveal-answer' }, el('strong', {}, item.r)));
    if (item.e) reveal.appendChild(el('div', { class: 'reveal-explain' }, item.e));
    if (item.ref) reveal.appendChild(el('div', { class: 'reveal-ref' }, linkify(item.ref)));
    $('#btn-rev-toggle').textContent = 'Masquer la réponse';
  } else {
    reveal.hidden = true;
    $('#btn-rev-toggle').textContent = 'Afficher la réponse';
  }
  $('#btn-rev-prev').disabled = (_reviewState.idx === 0);
  $('#btn-rev-next').disabled = (_reviewState.idx >= _reviewState.pool.length - 1);
}

// ---------- Vue : mes duels -------------------------------------------
function statusLabel(d) {
  if (d.status === 'cancelled') return { txt: 'Annulé', cls: 'lbl-mut' };
  if (d.status === 'completed') return { txt: 'Terminé', cls: 'lbl-ok' };
  if (d.yourStatus === 'pending') return { txt: 'Invitation reçue', cls: 'lbl-warn' };
  if (d.yourStatus === 'declined') return { txt: 'Refusé', cls: 'lbl-mut' };
  if (d.youHavePlayed) return { txt: 'Attente adversaire(s)', cls: 'lbl-info' };
  return { txt: 'À jouer', cls: 'lbl-active' };
}

function renderDuelCard(d, ctx) {
  const youCode = Session.code;
  const opps = d.participants.filter(p => p.code !== youCode);
  const lbl = statusLabel(d);
  const lines = [];
  lines.push(el('div', {},
    el('strong', {}, d.createdBy === 'admin' ? '🛡️ Convocation admin · ' : ''),
    el('span', {}, d.type === 'tournament' ? `Tournoi ${d.participants.length} joueurs` : 'Duel'),
    ' · ',
    el('span', { class: `duel-lbl ${lbl.cls}` }, lbl.txt)
  ));
  // Adversaires
  const oppText = opps.map(p => `${p.name || p.code}${p.hasPlayed ? ` (✓ ${p.score} pts)` : ''}`).join(' · ');
  lines.push(el('div', { class: 'duel-meta' }, 'Contre : ', oppText || '—'));
  lines.push(el('div', { class: 'duel-meta' }, `Manches : ${(d.config.manches || []).join(', ')} · ${d.config.packsCount} pack(s) · créé le ${fmtDate(d.createdAt)}`));
  if (d.status === 'completed' && d.results) {
    const myr = d.results[youCode];
    const yourScore = myr ? myr.totalScore : '—';
    lines.push(el('div', {},
      el('strong', { style: 'color: var(--primary)' }, `Vous : ${yourScore} pts · `),
      el('span', { style: d.winner === youCode ? 'color:#2E7D32;font-weight:700;' : 'color:var(--muted);' },
        d.winner === youCode ? '🏆 Vainqueur' : (d.winner ? `Vainqueur : ${nameOrCode(d, d.winner)}` : 'Égalité'))
    ));
  }
  const actions = el('div', { class: 'duel-actions' });
  if (d.status === 'pending' && d.yourStatus === 'pending') {
    actions.appendChild(el('button', { class: 'btn btn-primary', onclick: async () => {
      try { await api.acceptDuel(d.id); route('duels'); } catch (e) { alert('Erreur : ' + e.message); }
    }}, '✓ Accepter'));
    actions.appendChild(el('button', { class: 'btn btn-danger', onclick: async () => {
      if (!confirm('Refuser ce duel ?')) return;
      try { await api.declineDuel(d.id); route('duels'); } catch (e) { alert('Erreur : ' + e.message); }
    }}, '✗ Refuser'));
  }
  if ((d.status === 'active' || d.status === 'pending') && d.yourStatus === 'accepted' && !d.youHavePlayed) {
    actions.appendChild(el('button', { class: 'btn btn-primary', onclick: () => startDuelGame(d.id) }, '▶ Jouer maintenant'));
  }
  if (d.status === 'completed') {
    actions.appendChild(el('button', { class: 'btn', onclick: () => route('duel-result', { duelId: d.id }) }, 'Voir les détails'));
  }
  return el('div', { class: 'duel-row' },
    el('div', { class: 'duel-info' }, ...lines),
    actions
  );
}

function nameOrCode(d, code) {
  const p = d.participants.find(x => x.code === code);
  return p ? (p.name || p.code) : code;
}

async function renderDuels() {
  if (!Session.token) return route('login');
  // Refresh meta (pour hasActiveDuel)
  try { State.meta = await api.meta(); } catch {}
  mount('tpl-duels');

  // Remplir les domaines
  const grid = $('#duel-domains');
  for (const d of State.meta.domains) {
    grid.appendChild(el('label', { class: 'check' },
      el('input', { type: 'checkbox', value: d.name }),
      el('span', {}, d.name),
      el('span', { class: 'badge' }, `${d.count}`)));
  }

  $('#btn-duels-home').onclick = () => route('home');

  $('#form-new-duel').addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('#new-duel-error'); err.hidden = true;
    const opponent = $('#duel-opponent').value.trim().toUpperCase();
    const manches = $$('input[name=duel-manche]:checked').map(c => c.value);
    const domains = $$('#duel-domains input:checked').map(c => c.value);
    if (!opponent) { err.textContent = 'Code adversaire requis'; err.hidden = false; return; }
    if (manches.length === 0) { err.textContent = 'Sélectionnez au moins une manche'; err.hidden = false; return; }
    try {
      await api.createDuel({
        opponentCode: opponent,
        config: { manches, domains, counts: { manche1: 1, manche2: 1, manche3: 1 } }
      });
      $('#duel-opponent').value = '';
      alert('Invitation envoyée à ' + opponent);
      renderDuels();
    } catch (e) {
      err.textContent = e.message;
      err.hidden = false;
    }
  });

  let list = [];
  try { list = await api.myDuels(); } catch (e) { console.warn(e); }
  const pending = list.filter(d => d.status === 'pending' && d.yourStatus === 'pending');
  const active  = list.filter(d => (d.status === 'active' || d.status === 'pending') && d.yourStatus === 'accepted' && !d.youHavePlayed);
  const waitingOthers = list.filter(d => d.status === 'active' && d.yourStatus === 'accepted' && d.youHavePlayed);
  const completed = list.filter(d => d.status === 'completed' || d.status === 'cancelled');

  const fill = (box, items, emptyTxt) => {
    if (items.length === 0) { box.appendChild(el('div', { class: 'muted' }, emptyTxt)); return; }
    items.forEach(d => box.appendChild(renderDuelCard(d)));
  };
  fill($('#duels-pending'), pending, 'Aucune invitation en attente.');
  fill($('#duels-active'), [...active, ...waitingOthers], 'Aucun duel actif.');
  fill($('#duels-completed'), completed.slice(0, 30), 'Aucun duel terminé.');
}

async function renderDuelResult(duelId) {
  if (!Session.token) return route('login');
  mount('tpl-duel-result');
  let d;
  try { d = await api.myDuelGet(duelId); }
  catch (e) { alert('Erreur : ' + e.message); return route('duels'); }
  const winner = d.winner;
  $('#duel-result-title').textContent =
    winner === Session.code ? '🏆 Vous avez gagné !' :
    (winner ? `Vainqueur : ${nameOrCode(d, winner)}` :
    (d.status === 'completed' ? 'Égalité' : 'En cours'));
  const summary = $('#duel-result-summary');
  summary.innerHTML = '';
  d.participants.forEach(p => {
    const r = d.results && d.results[p.code];
    summary.appendChild(el('div', { class: 'result-cell' + (p.code === winner ? ' winner' : '') },
      el('div', { class: 'label' }, p.name || p.code),
      el('div', { class: 'value' }, r && r.totalScore != null ? `${r.totalScore} pts` : '—')));
  });

  const table = $('#duel-result-table');
  table.innerHTML = '';
  if (d.results) {
    d.participants.forEach(p => {
      const r = d.results[p.code];
      if (!r) return;
      table.appendChild(el('div', { class: 'history-row' },
        el('div', { class: 'history-when' },
          el('div', {}, el('strong', {}, p.name || p.code), p.code === winner ? ' 🏆' : ''),
          el('span', { class: 'small' }, `${r.nbCorrect}/${r.nbQuestions} bonnes réponses · M1: ${r.byManche.manche1||0} · M2: ${r.byManche.manche2||0} · M3: ${r.byManche.manche3||0}`)),
        el('div', { class: 'history-score' }, `${r.totalScore} pts`)));
    });
  } else {
    table.appendChild(el('div', { class: 'muted' }, 'Tous les participants n\'ont pas encore joué.'));
  }

  $('#btn-dr-duels').onclick = () => route('duels');
  $('#btn-dr-home').onclick = () => route('home');
}

// Démarrer une partie de DUEL : les packs sont déjà fixés côté serveur
async function startDuelGame(duelId) {
  let d;
  try { d = await api.myDuelGet(duelId); }
  catch (e) { alert('Erreur : ' + e.message); return; }
  if (!d.config.packs) {
    alert('Erreur : packs non disponibles. Vérifiez votre acceptation.');
    return;
  }
  // Déterminer le mode QCM selon les settings admin
  const qcmMode = (State.meta && State.meta.settings && State.meta.settings.qcmMode) || 'user-choice';
  let useQcm = false;
  if (qcmMode === 'force-qcm') useQcm = true;
  else if (qcmMode === 'force-text') useQcm = false;
  else {
    // Demander à l'utilisateur
    useQcm = confirm('Mode QCM (choix multiples) ? Annuler pour saisie libre.');
  }
  State.qcmMode = useQcm;
  // Construire le State.game avec les packs fixés
  State.game = {
    duelId: d.id,
    plan: d.config.packs.map(x => ({ manche: x.manche, pack: x.pack })),
    cursor: { planIdx: 0, qIdx: 0 },
    score: { total: 0, byManche: { manche1: 0, manche2: 0, manche3: 0 } },
    log: [],
    qcmMode: useQcm
  };
  // Pas de persistance localStorage pour les duels (on joue d'une traite)
  route('play');
}

// ---------- Vue : panneau admin ---------------------------------------
async function renderAdmin() {
  if (!Session.admin) return route('login');
  // En mode admin on n'affiche pas le contexte utilisateur dans le header
  refreshWho();
  mount('tpl-admin');

  async function refresh() {
    let dash;
    try { dash = await api.adminDashboard(); }
    catch (e) { alert('Erreur : ' + e.message); return; }
    const codes = await api.adminCodes();

    // Résumé
    const s = $('#admin-summary'); s.innerHTML = '';
    [['Codes actifs', dash.summary.totalCodes],
     ['Parties jouées', dash.summary.totalGames],
     ['Questions répondues', dash.summary.totalQuestions],
     ['Bonnes réponses', `${dash.summary.totalCorrect} (${dash.summary.accuracy}%)`]
    ].forEach(([l, v]) => {
      s.appendChild(el('div', { class: 'stat-cell' },
        el('div', { class: 'stat-value' }, String(v)),
        el('div', { class: 'stat-label' }, l)));
    });

    // Codes
    const list = $('#admin-codes-list'); list.innerHTML = '';
    if (codes.length === 0) list.appendChild(el('div', { class: 'muted' }, 'Aucun code généré pour le moment.'));
    for (const c of codes) {
      list.appendChild(el('div', { class: 'code-row' },
        el('div', { class: 'code-info' },
          el('div', {},
            el('span', { class: 'code-mono', onclick: () => { navigator.clipboard.writeText(c.code); flash(this); } }, c.code),
            c.name ? el('span', { class: 'code-name' }, ' — ' + c.name) : null),
          el('div', { class: 'code-meta' },
            `${c.gamesPlayed} partie(s) · ${c.totalScore} pts cumulés · `,
            c.lastUsed ? `dernière connexion ${fmtDate(c.lastUsed)}` : 'jamais utilisé',
            ` · créé le ${fmtDate(c.createdAt)}`)),
        el('div', { class: 'code-actions' },
          el('button', { class: 'btn btn-ghost', onclick: () => {
            navigator.clipboard.writeText(c.code).then(() => alert('Code copié : ' + c.code));
          }}, '📋 Copier'),
          el('button', { class: 'btn btn-danger', onclick: async () => {
            if (!confirm(`Révoquer le code ${c.code} ? Les parties déjà enregistrées seront conservées.`)) return;
            await api.adminDeleteCode(c.code);
            refresh();
          }}, '✕ Révoquer'))));
    }

    // Classement
    const lb = $('#admin-leaderboard'); lb.innerHTML = '';
    if (dash.byCode.length === 0) lb.appendChild(el('div', { class: 'muted' }, 'Aucune partie enregistrée.'));
    dash.byCode.forEach((b, i) => {
      const acc = b.totalQuestions ? Math.round(100 * b.totalCorrect / b.totalQuestions) : 0;
      lb.appendChild(el('div', { class: 'lb-row' },
        el('div', { class: 'lb-rank' }, `#${i + 1}`),
        el('div', { style: 'flex:1; min-width:0;' },
          el('div', {}, el('span', { class: 'code-mono' }, b.code), b.name ? ' — ' + b.name : ''),
          el('div', { class: 'code-meta' }, `${b.games} partie(s) · ${b.totalCorrect}/${b.totalQuestions} bonnes (${acc}%)`)),
        el('div', { class: 'lb-score' }, `${b.totalScore} pts`)));
    });

    // Parties récentes
    const rec = $('#admin-recent'); rec.innerHTML = '';
    if (dash.recent.length === 0) rec.appendChild(el('div', { class: 'muted' }, 'Aucune partie récente.'));
    dash.recent.forEach(r => {
      rec.appendChild(el('div', { class: 'history-row' },
        el('div', { class: 'history-when' },
          el('div', {}, fmtDate(r.finishedAt), ' · ', el('span', { class: 'code-mono' }, r.code), r.name ? ' — ' + r.name : ''),
          el('span', { class: 'small' }, `${r.nbCorrect}/${r.nbQuestions} bonnes réponses`)),
        el('div', { class: 'history-score' }, `${r.totalScore} pts`)));
    });
  }

  $('#form-new-code').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#new-code-name').value.trim();
    try {
      const r = await api.adminCreateCode(name);
      $('#new-code-name').value = '';
      navigator.clipboard.writeText(r.code).catch(() => {});
      alert(`Nouveau code : ${r.code}\n(copié dans le presse-papiers)`);
      refresh();
    } catch (e) { alert('Erreur : ' + e.message); }
  });

  $('#btn-admin-export').onclick = async () => {
    try {
      const data = await api.adminExport();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `qpc-backup-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    } catch (e) { alert('Erreur : ' + e.message); }
  };
  $('#btn-admin-export-excel').onclick = async () => {
    try { await downloadAdminExcel(); }
    catch (e) { alert('Erreur Excel : ' + e.message); }
  };

  // Toggle révision libre + mode QCM
  const toggle = $('#toggle-review');
  try {
    const s = await api.adminGetSettings();
    toggle.checked = (s.reviewEnabled !== false);
    const qm = s.qcmMode || 'user-choice';
    const radio = document.querySelector(`#admin-qcm-row input[name=admin-qcm][value="${qm}"]`);
    if (radio) radio.checked = true;
  } catch (e) {}
  toggle.addEventListener('change', async () => {
    try {
      const s = await api.adminSetSettings({ reviewEnabled: toggle.checked });
      toggle.parentElement.style.opacity = '0.6';
      setTimeout(() => { toggle.parentElement.style.opacity = '1'; }, 300);
    } catch (e) {
      alert('Erreur : ' + e.message);
      toggle.checked = !toggle.checked;
    }
  });
  $$('#admin-qcm-row input[name=admin-qcm]').forEach(r => {
    r.addEventListener('change', async () => {
      if (!r.checked) return;
      try {
        await api.adminSetSettings({ qcmMode: r.value });
        r.parentElement.style.opacity = '0.6';
        setTimeout(() => { r.parentElement.style.opacity = '1'; }, 300);
      } catch (e) { alert('Erreur : ' + e.message); }
    });
  });

  // ---- Organiser une confrontation ----
  async function refreshAdminConf() {
    const codes = await api.adminCodes();
    const container = $('#admin-conf-participants');
    container.innerHTML = '';
    if (codes.length === 0) {
      container.appendChild(el('div', { class: 'muted' }, 'Aucun code disponible. Générez d\'abord des codes.'));
    } else {
      codes.forEach(c => {
        const lab = el('label', { class: 'check' },
          el('input', { type: 'checkbox', value: c.code, 'data-code': c.code }),
          el('span', { class: 'code-mono', style: 'display:inline-block;' }, c.code),
          el('span', {}, c.name ? ` — ${c.name}` : ''));
        container.appendChild(lab);
      });
    }
    // Domaines
    const dg = $('#adm-conf-domains');
    dg.innerHTML = '';
    if (State.meta && State.meta.domains) {
      State.meta.domains.forEach(d => {
        dg.appendChild(el('label', { class: 'check' },
          el('input', { type: 'checkbox', value: d.name }),
          el('span', {}, d.name),
          el('span', { class: 'badge' }, `${d.count}`)));
      });
    }
    // Liste confrontations
    const lst = $('#admin-duels-list');
    lst.innerHTML = '';
    const all = await api.adminDuels();
    if (all.length === 0) { lst.appendChild(el('div', { class: 'muted' }, 'Aucune confrontation pour le moment.')); return; }
    all.slice(0, 30).forEach(d => {
      const status = d.status === 'completed' ? '✓ Terminé' :
                     d.status === 'cancelled' ? 'Annulé' :
                     d.status === 'active' ? '⚔️ Actif' : '⏳ En attente';
      const winner = d.winner ? ` · 🏆 ${d.results && d.results[d.winner] ? (d.participants.find(p => p.code === d.winner)?.name || d.winner) : d.winner}` : '';
      const parts = d.participants.map(p => {
        const sc = (d.results && d.results[p.code]) ? `${d.results[p.code].totalScore} pts` : (p.hasPlayed ? 'joué' : 'à jouer');
        return `${p.name || p.code} (${sc})`;
      }).join(' · ');
      lst.appendChild(el('div', { class: 'duel-row' },
        el('div', { class: 'duel-info' },
          el('div', {}, el('strong', {}, d.type === 'tournament' ? `Tournoi ${d.participants.length} joueurs` : 'Duel'),
            ` · ${status}`, winner),
          el('div', { class: 'duel-meta' }, parts),
          el('div', { class: 'duel-meta' }, `Créé par ${d.createdBy === 'admin' ? 'admin' : (d.creatorName || d.createdBy)} · ${fmtDate(d.createdAt)} · ${(d.config.manches||[]).join(',')} · ${d.config.packsCount} pack(s)`)),
        el('div', { class: 'duel-actions' },
          el('button', { class: 'btn btn-danger', onclick: async () => {
            if (!confirm(`Supprimer cette confrontation ?`)) return;
            await api.adminDeleteDuel(d.id);
            refreshAdminConf();
          }}, '✕ Supprimer'))));
    });
  }
  refreshAdminConf();

  $('#btn-admin-create-duel').onclick = async () => {
    const participants = $$('#admin-conf-participants input:checked').map(c => c.value);
    if (participants.length < 2) { alert('Sélectionnez au moins 2 participants.'); return; }
    const manches = $$('input[name=adm-conf-m]:checked').map(c => c.value);
    if (manches.length === 0) { alert('Sélectionnez au moins une manche.'); return; }
    const counts = {
      manche1: parseInt($('#adm-conf-n1').value, 10) || 0,
      manche2: parseInt($('#adm-conf-n2').value, 10) || 0,
      manche3: parseInt($('#adm-conf-n3').value, 10) || 0
    };
    const domains = $$('#adm-conf-domains input:checked').map(c => c.value);
    try {
      const r = await api.adminCreateDuel({ participants, config: { manches, counts, domains } });
      alert(`Confrontation lancée (id ${r.id}). ${participants.length} participant(s) convoqué(s).`);
      // décocher
      $$('#admin-conf-participants input').forEach(c => c.checked = false);
      refreshAdminConf();
    } catch (e) { alert('Erreur : ' + e.message); }
  };

  // Bouton purge
  $('#btn-admin-purge').onclick = async () => {
    const code1 = prompt('⚠️ Vous allez SUPPRIMER tous les codes et toutes les parties.\n\nTapez exactement "SUPPRIMER" pour continuer :');
    if (code1 !== 'SUPPRIMER') return;
    if (!confirm('Dernière confirmation : supprimer définitivement TOUTE la base ?')) return;
    try {
      await api.adminPurgeAll();
      alert('Base purgée.');
      refresh();
    } catch (e) { alert('Erreur : ' + e.message); }
  };
  $('#file-admin-import').onchange = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const text = await f.text();
      const data = JSON.parse(text);
      if (!confirm('Importer ce fichier remplacera tous les codes et toutes les parties enregistrées. Continuer ?')) return;
      await api.adminImport(data);
      alert('Base restaurée.');
      refresh();
    } catch (err) { alert('Fichier invalide : ' + err.message); }
    e.target.value = '';
  };

  $('#btn-admin-logout').onclick = () => {
    Session.clearAdmin();
    route('login');
  };

  refresh();
}

// ---------- En-tête : qui est connecté --------------------------------
function refreshWho() {
  const w = $('#who');
  w.innerHTML = '';
  // Si on est en mode admin (token admin présent), on affiche cela en priorité
  if (Session.admin) {
    w.appendChild(el('span', {}, '🛡️ Super-administrateur'));
    w.appendChild(el('span', { class: 'switch-link', onclick: () => {
      Session.clearAdmin(); route('login');
    }}, 'Déconnexion'));
    return;
  }
  if (Session.code) {
    w.appendChild(el('span', {}, 'Connecté : '));
    w.appendChild(el('strong', {}, Session.name || Session.code));
    w.appendChild(el('span', { class: 'switch-link', onclick: () => {
      Session.clearUser(); route('login');
    }}, 'Déconnexion'));
  }
}
$('#brand-home').addEventListener('click', () => {
  if (Session.admin) route('admin');
  else if (Session.token) route('home');
  else route('login');
});

// ---------- Service Worker (PWA) -------------------------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.warn('[PWA] Échec d\'enregistrement du service worker :', err.message);
    });
  });
}

// Capter l'événement d'installation PWA pour pouvoir le déclencher
// au clic du bouton « Installer » de la page de garde.
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window._deferredInstallPrompt = e;
  // Si la page de garde est déjà affichée, rebrancher le bouton maintenant
  const btn = document.getElementById('btn-install-pwa');
  if (btn && typeof setupInstallButtons === 'function') setupInstallButtons();
});

// Détecter l'installation réussie (Chrome Android, Edge…)
window.addEventListener('appinstalled', () => {
  window._deferredInstallPrompt = null;
  const hint = document.getElementById('install-hint');
  const btn = document.getElementById('btn-install-pwa');
  if (hint) hint.textContent = '✓ Application installée avec succès !';
  if (btn) { btn.disabled = true; btn.textContent = '✓ Installée'; }
});

// ---------- Démarrage -------------------------------------------------
(async function init() {
  try {
    // Si admin connecté en priorité → panneau admin
    if (Session.admin) {
      // Vérifier que le token admin est encore valide en faisant une requête
      try {
        await api.adminDashboard();
        return route('admin');
      } catch { Session.clearAdmin(); }
    }
    // Si user connecté
    if (Session.token) {
      try {
        State.meta = await api.meta();
        $('#footer-meta').textContent =
          `${State.meta.questionsTotal} questions · ${State.meta.manche1Count} séries · ${State.meta.manche2Count} duels · ${State.meta.manche3Count} finales · ${State.meta.domains.length} domaines`;
        return route('home');
      } catch {
        Session.clearUser();
      }
    }
    // Sinon login (le footer sera renseigné après authentification)
    $('#footer-meta').textContent = 'Connectez-vous pour accéder aux questions';
    route('login');
  } catch (e) {
    $('#app').innerHTML = `<div class="screen"><div class="card"><h2 class="card-title">Erreur de démarrage</h2><p>Impossible de joindre le serveur. Détail : <code>${e.message}</code></p></div></div>`;
    console.error(e);
  }
})();
