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
  adminPurgeAll:    ()    => apiFetch('/api/admin/all-data', { method: 'DELETE', body: JSON.stringify({ confirm: 'OUI-SUPPRIMER-TOUT' }) }, true)
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

// ---------- État global -----------------------------------------------
const State = {
  meta: null,
  game: null   // partie en cours
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
  $('#card-history').onclick  = () => route('history');
  $('#card-switch').onclick   = () => {
    Session.clearUser();
    route('login');
  };

  // Cacher la carte "Révision libre" si le super-admin l'a désactivée
  const reviewEnabled = (State.meta && State.meta.settings && State.meta.settings.reviewEnabled !== false);
  if (!reviewEnabled) $('#card-review').hidden = true;

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

  $('#btn-start').onclick = async () => {
    const manches = $$('#manches-row input:checked').map(c => c.value);
    if (manches.length === 0) { alert('Sélectionnez au moins une manche.'); return; }
    const domains = $$('#domains-grid input:checked').map(c => c.value);
    const counts = {
      manche1: parseInt($('#n-m1').value, 10) || 1,
      manche2: parseInt($('#n-m2').value, 10) || 1,
      manche3: parseInt($('#n-m3').value, 10) || 1
    };
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
      log: []
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
  const form = el('form', { class: 'play-answer-form' });
  const input = el('input', { class: 'play-answer-input', type: 'text', placeholder: 'Votre réponse…', autocomplete: 'off' });
  form.appendChild(input);
  form.appendChild(el('button', { class: 'btn btn-primary', type: 'submit' }, 'Valider'));
  card.appendChild(form);

  const actions = $('#play-actions'); actions.innerHTML = '';
  actions.appendChild(el('button', { class: 'btn btn-ghost left', onclick: pauseAndExit }, 'Mettre en pause'));
  actions.appendChild(el('button', { class: 'btn btn-ghost', onclick: () => answerM1('') }, 'Passer'));
  setTimeout(() => input.focus(), 50);
  form.addEventListener('submit', (e) => { e.preventDefault(); answerM1(input.value); });

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
  const correct = checkAnswer(userInput, q.r);
  const awarded = correct ? 1 : 0;
  g.score.total += awarded; g.score.byManche.manche1 += awarded;
  g.log.push({ manche: 'manche1', packId: pack.id, packTitle: pack.titre, qid: q.id,
    q: q.q, expected: q.r, given: userInput || '(passée)', correct, pts: 1, awarded,
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
    q.ref ? el('div', { class: 'reveal-ref' }, q.ref) : null);
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
  const form = el('form', { class: 'play-answer-form' });
  const input = el('input', { class: 'play-answer-input', type: 'text', placeholder: 'Votre réponse…', autocomplete: 'off' });
  form.appendChild(input);
  form.appendChild(el('button', { class: 'btn btn-primary', type: 'submit' }, `Valider (${pts} pt${pts > 1 ? 's' : ''})`));
  card.appendChild(form);
  const actions = $('#play-actions'); actions.innerHTML = '';
  actions.appendChild(el('button', { class: 'btn btn-ghost left', onclick: pauseAndExit }, 'Mettre en pause'));
  actions.appendChild(el('button', { class: 'btn btn-ghost', onclick: () => answerM2('') }, 'Passer'));
  setTimeout(() => input.focus(), 50);
  form.addEventListener('submit', (e) => { e.preventDefault(); answerM2(input.value); });
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
  const correct = checkAnswer(userInput, q.r);
  const awarded = correct ? pts : 0;
  g.score.total += awarded; g.score.byManche.manche2 += awarded;
  g.log.push({ manche: 'manche2', packId: pack.id, packTitle: pack.titre, qid: q.id,
    q: q.q, expected: q.r, given: userInput || '(passée)', correct, pts, awarded,
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
  const form = el('form', { class: 'play-answer-form', style: 'margin-top:14px;' });
  const input = el('input', { class: 'play-answer-input', type: 'text', placeholder: 'Votre réponse…', autocomplete: 'off' });
  form.appendChild(input);
  form.appendChild(el('button', { class: 'btn btn-primary', type: 'submit' }, 'Valider'));
  card.appendChild(form);
  const actions = $('#play-actions'); actions.innerHTML = '';
  actions.appendChild(el('button', { class: 'btn btn-ghost left', onclick: pauseAndExit }, 'Mettre en pause'));
  actions.appendChild(el('button', { class: 'btn btn-ghost', onclick: () => answerM3('') }, 'Passer'));
  setTimeout(() => input.focus(), 50);
  form.addEventListener('submit', (e) => { e.preventDefault(); answerM3(input.value); });
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
  const correct = checkAnswer(userInput, q.r);
  const awarded = correct ? 1 : 0;
  g.score.total += awarded; g.score.byManche.manche3 += awarded;
  if (correct) g.cursor.m3Score = (g.cursor.m3Score || 0) + 1;
  g.log.push({ manche: 'manche3', packId: pack.id, packTitle: pack.titre, qid: q.id,
    q: q.q, expected: q.r, given: userInput || '(passée)', correct, pts: 1, awarded,
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
    State.meta = fresh;
  } catch (e) {}
  mount('tpl-review');

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
    if (item.ref) reveal.appendChild(el('div', { class: 'reveal-ref' }, item.ref));
    $('#btn-rev-toggle').textContent = 'Masquer la réponse';
  } else {
    reveal.hidden = true;
    $('#btn-rev-toggle').textContent = 'Afficher la réponse';
  }
  $('#btn-rev-prev').disabled = (_reviewState.idx === 0);
  $('#btn-rev-next').disabled = (_reviewState.idx >= _reviewState.pool.length - 1);
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

  // Toggle révision libre
  const toggle = $('#toggle-review');
  try {
    const s = await api.adminGetSettings();
    toggle.checked = (s.reviewEnabled !== false);
  } catch (e) {}
  toggle.addEventListener('change', async () => {
    try {
      const s = await api.adminSetSettings({ reviewEnabled: toggle.checked });
      // feedback visuel discret
      toggle.parentElement.style.opacity = '0.6';
      setTimeout(() => { toggle.parentElement.style.opacity = '1'; }, 300);
    } catch (e) {
      alert('Erreur : ' + e.message);
      toggle.checked = !toggle.checked;  // revenir en arrière
    }
  });

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
    // Sinon login
    $('#footer-meta').textContent = '516 questions · 10 domaines';
    route('login');
  } catch (e) {
    $('#app').innerHTML = `<div class="screen"><div class="card"><h2 class="card-title">Erreur de démarrage</h2><p>Impossible de joindre le serveur. Détail : <code>${e.message}</code></p></div></div>`;
    console.error(e);
  }
})();
