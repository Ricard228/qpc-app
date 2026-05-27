// =====================================================================
// add-choices-to-old.js — ajoute des QCM aux anciennes questions
//
// Pour chaque question sans `choices` :
//   - choisit 3 distracteurs parmi les bonnes réponses d'autres questions
//   - priorité : même domaine > même manche > toutes
//   - équilibre les longueurs : distracteurs de longueur proche (±35 %)
//     de la vraie réponse
//   - mélange l'ordre et met à jour `correctIndices`
//
// Idempotent : ne touche pas aux questions déjà QCM.
// =====================================================================

const fs   = require('fs');
const path = require('path');
const QPATH = path.join(__dirname, 'data', 'questions.json');
const Q = JSON.parse(fs.readFileSync(QPATH, 'utf8'));

// Outils de normalisation (pour détecter les doublons)
function norm(s) {
  return (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[''‛`´]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function isSimilar(a, b) {
  const na = norm(a), nb = norm(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  // sous-chaîne pour réponses moyennes/longues
  if (na.length >= 5 && (na.includes(nb) || nb.includes(na))) return true;
  return false;
}

// Construire le pool global de toutes les réponses avec métadonnées
const allAnswers = [];
for (const m of ['manche1', 'manche2', 'manche3']) {
  for (const pack of Q[m]) {
    for (const q of pack.questions) {
      if (!q.r) continue;
      allAnswers.push({
        r: q.r,
        len: q.r.length,
        manche: m,
        domain: pack.domain,
        qid: q.id
      });
    }
  }
}

// Mélange (Fisher-Yates)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Sélection de distracteurs pour une question donnée
function pickDistractors(q, packDomain, packManche, n = 3) {
  const targetR = q.r;
  const targetLen = targetR.length;
  // tolérance plus large pour réponses très courtes
  const tol = targetLen <= 8 ? 0.6 : 0.4;
  const minLen = Math.max(2, Math.floor(targetLen * (1 - tol)));
  const maxLen = Math.ceil(targetLen * (1 + tol));

  const lenOK = (a) => a.len >= minLen && a.len <= maxLen;
  const notDup = (a) => !isSimilar(a.r, targetR);

  // Tier 1 : même domaine, longueur OK
  let pool = allAnswers.filter(a => a.domain === packDomain && lenOK(a) && notDup(a) && a.qid !== q.id);
  // Dédupliquer par texte normalisé
  const seen = new Set();
  pool = pool.filter(a => {
    const key = norm(a.r);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  let chosen = shuffle(pool).slice(0, n);

  // Tier 2 : élargir à même manche si pas assez
  if (chosen.length < n) {
    const need = n - chosen.length;
    const seen2 = new Set(chosen.map(c => norm(c.r)).concat([norm(targetR)]));
    const extra = allAnswers
      .filter(a => a.manche === packManche && lenOK(a) && notDup(a) && a.qid !== q.id)
      .filter(a => !seen2.has(norm(a.r)));
    chosen = chosen.concat(shuffle(extra).slice(0, need));
  }
  // Tier 3 : tout le pool, longueur OK
  if (chosen.length < n) {
    const need = n - chosen.length;
    const seen3 = new Set(chosen.map(c => norm(c.r)).concat([norm(targetR)]));
    const extra = allAnswers
      .filter(a => lenOK(a) && notDup(a) && a.qid !== q.id)
      .filter(a => !seen3.has(norm(a.r)));
    chosen = chosen.concat(shuffle(extra).slice(0, need));
  }
  // Tier 4 : abandon contrainte de longueur
  if (chosen.length < n) {
    const need = n - chosen.length;
    const seen4 = new Set(chosen.map(c => norm(c.r)).concat([norm(targetR)]));
    const extra = allAnswers
      .filter(a => notDup(a) && a.qid !== q.id)
      .filter(a => !seen4.has(norm(a.r)));
    chosen = chosen.concat(shuffle(extra).slice(0, need));
  }
  return chosen.map(c => c.r);
}

// Parcours et enrichissement
let enriched = 0, skipped = 0;
for (const m of ['manche1', 'manche2', 'manche3']) {
  for (const pack of Q[m]) {
    for (const q of pack.questions) {
      if (Array.isArray(q.choices) && q.choices.length >= 2) {
        skipped++;
        continue;
      }
      const distractors = pickDistractors(q, pack.domain, m, 3);
      if (distractors.length < 3) {
        console.warn(`⚠ Question ${q.id} : seulement ${distractors.length} distracteurs trouvés`);
      }
      // Construire les choices avec la bonne réponse + distracteurs
      const choices = [q.r, ...distractors];
      // Mélanger l'ordre initial (la randomisation runtime fera le reste)
      const order = shuffle(choices.map((_, i) => i));
      const shuffledChoices = order.map(i => choices[i]);
      const newCorrectIdx = order.indexOf(0);  // position de la bonne réponse
      q.choices = shuffledChoices;
      q.correctIndices = [newCorrectIdx];
      enriched++;
    }
  }
}

// Mise à jour meta
Q.meta.generatedAt = new Date().toISOString();

fs.writeFileSync(QPATH, JSON.stringify(Q, null, 2), 'utf8');

console.log('✅ Enrichissement QCM terminé');
console.log(`  Questions QCM ajoutées : ${enriched}`);
console.log(`  Questions QCM déjà présentes (ignorées) : ${skipped}`);
console.log(`  Total : ${enriched + skipped}`);

// Statistiques de longueur (qualité des distracteurs)
let allLen = [], avgRatio = 0, count = 0;
for (const m of ['manche1', 'manche2', 'manche3']) {
  for (const pack of Q[m]) {
    for (const q of pack.questions) {
      if (!q.choices || q.choices.length < 2) continue;
      const refLen = q.r.length;
      for (const c of q.choices) {
        if (norm(c) === norm(q.r)) continue;
        avgRatio += Math.abs(c.length - refLen) / Math.max(1, refLen);
        count++;
      }
    }
  }
}
console.log(`  Écart-longueur moyen distracteurs : ${(100*avgRatio/count).toFixed(1)} %`);
