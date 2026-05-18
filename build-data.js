// =====================================================================
// build-data.js — Consolide les 8 data_*.js en un seul data/questions.json
// Exécution : node build-data.js
// =====================================================================

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'qpc');
const OUT = path.join(__dirname, 'data', 'questions.json');

// Chargement des sources QPC ------------------------------------------
const manche1A    = require(path.join(SRC, 'data_manche1_partA.js'));
const manche1B    = require(path.join(SRC, 'data_manche1_partB.js'));
const manche1Agro = require(path.join(SRC, 'data_manche1_agro.js'));
const manche2A    = require(path.join(SRC, 'data_manche2_partA.js'));
const manche2B    = require(path.join(SRC, 'data_manche2_partB.js'));
const manche2Agro = require(path.join(SRC, 'data_manche2_agro.js'));
const manche3Base = require(path.join(SRC, 'data_manche3.js'));
const manche3Agro = require(path.join(SRC, 'data_manche3_agro.js'));

const manche1 = [...manche1A, ...manche1B, ...manche1Agro];
const manche2 = [...manche2A, ...manche2B, ...manche2Agro];
const manche3 = [...manche3Base, ...manche3Agro];

// Regroupement des thèmes en domaines transversaux -------------------
// Les `theme` de chaque série/duel/finale sont normalisés en domaines
// stables que l'utilisateur peut activer/désactiver dans l'app.
function toDomain(theme) {
  const t = (theme || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/agric|agro|rural|alimentair|filiere|cooperati|fonci|hydraul|elevage|cultur|nutrition|climate|irrigation|togo|paysan|animal/.test(t))
    return 'Économie agricole et agribusiness';
  if (/monnai|monetair|banque|financ|inflation|fiscal|budgetair|public|canaux|monetarisme/.test(t))
    return 'Monnaie, finance et budget';
  if (/macroeconomi|croissance|politique economique|economie ouverte|redistribution|etat social/.test(t))
    return 'Macroéconomie et politiques';
  if (/microeconomi|jeux|industrielle|comportementale|theorie economique|economie generale|mesure et modelisation/.test(t))
    return 'Microéconomie et théorie';
  if (/commerce|international|geograph|developpement|africaine|afrique|ouest/.test(t))
    return 'Commerce, développement et Afrique';
  if (/econometri|statisti|probabili|inferen/.test(t))
    return 'Statistiques et économétrie';
  if (/pensee|histoire de la pensee|courants|institutions|institutionnel|choix publics/.test(t))
    return 'Histoire de la pensée économique';
  if (/sociolog|sciences sociales|critique|anthropolog|pensee critique|politique/.test(t))
    return 'Sciences sociales et politiques';
  if (/histoire|sant|education|sociale|travail/.test(t))
    return 'Histoire, travail, santé et éducation';
  if (/environnement|culture generale|art|geograph/.test(t))
    return 'Culture générale et environnement';
  return 'Autres';
}

function buildPacks(source, type) {
  return source.map((s, idx) => ({
    id: `${type}-${idx + 1}`,
    type,                       // 'manche1' | 'manche2' | 'manche3'
    titre: s.titre,
    theme: s.theme,
    domain: toDomain(s.theme),
    timing: s.timing || null,
    questions: s.questions.map((q, qi) => ({
      id: `${type}-${idx + 1}-q${qi + 1}`,
      q: q.q,
      r: q.r,
      e: q.e || '',
      ref: q.ref || '',
      pts: q.pts || 1
    }))
  }));
}

const data = {
  manche1: buildPacks(manche1, 'manche1'),
  manche2: buildPacks(manche2, 'manche2'),
  manche3: buildPacks(manche3, 'manche3')
};

// Liste des domaines (avec compte)
const domainCount = {};
['manche1', 'manche2', 'manche3'].forEach(m => {
  data[m].forEach(pack => {
    domainCount[pack.domain] = (domainCount[pack.domain] || 0)
      + pack.questions.length;
  });
});
data.domains = Object.entries(domainCount)
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => ({ name, count }));

// Stats
const nbQ1 = data.manche1.reduce((s, x) => s + x.questions.length, 0);
const nbQ2 = data.manche2.reduce((s, x) => s + x.questions.length, 0);
const nbQ3 = data.manche3.reduce((s, x) => s + x.questions.length, 0);
data.meta = {
  generatedAt: new Date().toISOString(),
  manche1Count: data.manche1.length,
  manche2Count: data.manche2.length,
  manche3Count: data.manche3.length,
  questionsM1: nbQ1,
  questionsM2: nbQ2,
  questionsM3: nbQ3,
  questionsTotal: nbQ1 + nbQ2 + nbQ3
};

fs.writeFileSync(OUT, JSON.stringify(data, null, 2), 'utf8');
console.log(`✅ ${OUT}`);
console.log(`   Manche 1 : ${data.manche1.length} séries / ${nbQ1} questions`);
console.log(`   Manche 2 : ${data.manche2.length} duels / ${nbQ2} questions`);
console.log(`   Manche 3 : ${data.manche3.length} finales / ${nbQ3} questions`);
console.log(`   TOTAL    : ${nbQ1 + nbQ2 + nbQ3} questions`);
console.log(`   Domaines : ${data.domains.length}`);
data.domains.forEach(d => console.log(`     - ${d.name.padEnd(50)} ${d.count}`));
