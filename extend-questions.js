// =====================================================================
// extend-questions.js — fusionne data_extra.js dans data/questions.json
// Usage : node extend-questions.js
// Idempotent : ne dédouble pas les packs déjà ajoutés (vérifie l'id).
// =====================================================================

const fs   = require('fs');
const path = require('path');
const extra     = require('./data_extra.js');
const extraMF   = require('./data_extra_mf.js');
const extraEcon = require('./data_extra_econ.js');
const extraTogo = require('./data_extra_togo.js');

const QPATH = path.join(__dirname, 'data', 'questions.json');
const Q = JSON.parse(fs.readFileSync(QPATH, 'utf8'));

function nextId(arr, prefix) {
  const used = new Set(arr.map(p => p.id));
  let i = 1;
  while (used.has(`${prefix}-${i}`)) i++;
  return i;
}

function appendPacks(targetArr, type, packs) {
  const startIdx = nextId(targetArr, type);
  let added = 0, skipped = 0;
  packs.forEach((p, idx) => {
    const packId = `${type}-${startIdx + added}`;
    // Empreinte pour idempotence : si un pack existant a même titre+theme+domain, on saute.
    const dupe = targetArr.find(x => x.titre === p.titre && x.theme === p.theme && x.domain === p.domain);
    if (dupe) { skipped++; return; }
    const pack = {
      id: packId,
      type,
      titre: p.titre,
      theme: p.theme,
      domain: p.domain,
      timing: p.timing || (type === 'manche2' ? '25 s / question' : type === 'manche3' ? 'Buzz libre — 1 min 30 — 1 point par bonne réponse — 9 points gagnants' : null),
      questions: p.questions.map(q => ({
        id: `${packId}-${q.id}`,
        q: q.q,
        r: q.r,
        choices: q.choices,
        correctIndices: q.correctIndices,
        e: q.e,
        ref: q.ref,
        pts: q.pts || 1
      }))
    };
    targetArr.push(pack);
    added++;
  });
  return { added, skipped };
}

const r1 = appendPacks(Q.manche1, 'manche1', extra.m1Packs);
const r2 = appendPacks(Q.manche2, 'manche2', extra.m2Packs);
const r3 = appendPacks(Q.manche3, 'manche3', extra.m3Packs);

// v2.4 — Marchés financiers UEMOA / BRVM
const r1mf = appendPacks(Q.manche1, 'manche1', extraMF.m1Packs);
const r2mf = appendPacks(Q.manche2, 'manche2', extraMF.m2Packs);
const r3mf = appendPacks(Q.manche3, 'manche3', extraMF.m3Packs);

// v2.5 — Renforcement micro/macro (≥ 60 questions chacun)
const r1e = appendPacks(Q.manche1, 'manche1', extraEcon.m1Packs);
const r2e = appendPacks(Q.manche2, 'manche2', extraEcon.m2Packs);
const r3e = appendPacks(Q.manche3, 'manche3', extraEcon.m3Packs);

// v2.6 — Compta + Fiscalité Togo + Marchés publics Togo
const r1t = appendPacks(Q.manche1, 'manche1', extraTogo.m1Packs);
const r2t = appendPacks(Q.manche2, 'manche2', extraTogo.m2Packs);
const r3t = appendPacks(Q.manche3, 'manche3', extraTogo.m3Packs);

// Recalculer meta + domains
const allQuestions = []
  .concat(...Q.manche1.map(p => p.questions))
  .concat(...Q.manche2.map(p => p.questions))
  .concat(...Q.manche3.map(p => p.questions));

Q.meta = {
  generatedAt: new Date().toISOString(),
  manche1Count: Q.manche1.length,
  manche2Count: Q.manche2.length,
  manche3Count: Q.manche3.length,
  questionsM1: Q.manche1.reduce((s, p) => s + p.questions.length, 0),
  questionsM2: Q.manche2.reduce((s, p) => s + p.questions.length, 0),
  questionsM3: Q.manche3.reduce((s, p) => s + p.questions.length, 0),
  questionsTotal: allQuestions.length
};

// Domaines : recalculer les comptes
const domainCounts = {};
allQuestions.forEach(q => {});
const allPacks = [...Q.manche1, ...Q.manche2, ...Q.manche3];
allPacks.forEach(pack => {
  domainCounts[pack.domain] = (domainCounts[pack.domain] || 0) + pack.questions.length;
});
Q.domains = Object.entries(domainCounts)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count);

fs.writeFileSync(QPATH, JSON.stringify(Q, null, 2), 'utf8');

console.log('✅ Fusion terminée');
console.log(`  Manche 1 : +${r1.added + r1mf.added + r1e.added + r1t.added} packs (extra=${r1.added}, mf=${r1mf.added}, econ=${r1e.added}, togo=${r1t.added})`);
console.log(`  Manche 2 : +${r2.added + r2mf.added + r2e.added + r2t.added} packs (extra=${r2.added}, mf=${r2mf.added}, econ=${r2e.added}, togo=${r2t.added})`);
console.log(`  Manche 3 : +${r3.added + r3mf.added + r3e.added + r3t.added} packs (extra=${r3.added}, mf=${r3mf.added}, econ=${r3e.added}, togo=${r3t.added})`);
console.log(`  Total packs : M1=${Q.meta.manche1Count} M2=${Q.meta.manche2Count} M3=${Q.meta.manche3Count}`);
console.log(`  Total questions : ${Q.meta.questionsTotal}`);
console.log(`  Domaines :`);
Q.domains.forEach(d => console.log(`    - ${d.name} : ${d.count} questions`));
