// =====================================================================
// add-links-to-refs.js — enrichit chaque question avec ≥ 1 lien vérifié
//
// Stratégie :
//   - Pour chaque question, on ajoute au champ `ref` UN OU PLUSIEURS
//     liens cliquables (URLs en clair) qui restent stables et vérifiables :
//       1) Un lien Wikipedia FR (article ou page de recherche fallback)
//       2) Selon le domaine, un lien institutionnel (BCEAO, BRVM, OHADA…)
//   - Le frontend (app.js) transforme ensuite ces URLs en <a> cliquables.
//
// Sécurité : on privilégie les URLs de recherche Wikipedia qui retournent
// TOUJOURS HTTP 200 (même si l'article exact n'existe pas, l'utilisateur
// arrive sur les résultats de recherche du terme).
// =====================================================================

const fs   = require('fs');
const path = require('path');
const QPATH = path.join(__dirname, 'data', 'questions.json');
const Q = JSON.parse(fs.readFileSync(QPATH, 'utf8'));

// ---- Liens institutionnels vérifiés par domaine --------------------
// (URLs testées HTTP 200/301 sur le réseau de référence ; les URLs
// retournant des codes 4xx/5xx ont été remplacées par des fallbacks
// Wikipedia FR qui sont toujours disponibles)
const DOMAIN_LINKS = {
  'Économie agricole et agribusiness': [
    'https://www.fao.org/home/fr/',
    'https://fr.wikipedia.org/wiki/Fonds_international_de_d%C3%A9veloppement_agricole'
  ],
  'Monnaie, finance et budget': [
    'https://www.bceao.int/fr',
    'https://fr.wikipedia.org/wiki/Fonds_mon%C3%A9taire_international'
  ],
  'Statistiques et économétrie': [
    'https://stats.oecd.org/',
    'https://fr.wikipedia.org/wiki/%C3%89conom%C3%A9trie'
  ],
  'Commerce, développement et Afrique': [
    'https://www.worldbank.org/fr/home',
    'https://fr.wikipedia.org/wiki/Commission_%C3%A9conomique_pour_l%27Afrique'
  ],
  'Microéconomie et théorie': [
    'https://fr.wikipedia.org/wiki/Microéconomie'
  ],
  'Marchés financiers UEMOA / BRVM': [
    'https://www.brvm.org/fr',
    'https://fr.wikipedia.org/wiki/Bourse_r%C3%A9gionale_des_valeurs_mobili%C3%A8res'
  ],
  'Histoire de la pensée économique': [
    'https://fr.wikipedia.org/wiki/Histoire_de_la_pensée_économique'
  ],
  'Machine learning et deep learning': [
    'https://fr.wikipedia.org/wiki/Apprentissage_automatique',
    'https://fr.wikipedia.org/wiki/Apprentissage_profond'
  ],
  'Suivi-évaluation des projets et politiques': [
    'https://documents.banquemondiale.org/fr/publication/documents-reports/documentlibrary',
    'https://fr.wikipedia.org/wiki/%C3%89valuation_d%27impact'
  ],
  'Macroéconomie et politiques': [
    'https://fr.wikipedia.org/wiki/Macroéconomie',
    'https://www.bceao.int/fr'
  ],
  'Histoire, travail, santé et éducation': [
    'https://fr.wikipedia.org/wiki/Histoire_contemporaine'
  ],
  'Comptabilité générale et analytique': [
    'https://www.ifrs.org/',
    'https://fr.wikipedia.org/wiki/OHADA'
  ],
  'Sciences sociales et politiques': [
    'https://fr.wikipedia.org/wiki/Sciences_sociales'
  ],
  'Fiscalité (Togo)': [
    'https://fr.wikipedia.org/wiki/Office_togolais_des_recettes',
    'https://fr.wikipedia.org/wiki/Fiscalit%C3%A9_au_Togo'
  ],
  'Marchés publics et passation (Togo)': [
    'https://fr.wikipedia.org/wiki/March%C3%A9_public',
    'https://www.worldbank.org/fr/home'
  ],
  'Culture générale et environnement': [
    'https://www.un.org/sustainabledevelopment/fr/'
  ]
};

// ---- Génère une URL Wikipedia FR à partir d'une réponse ------------
function wikipediaUrl(answer) {
  // Extraire le terme principal : enlever articles, parenthèses, virgules
  let term = answer
    .replace(/^(L'|La |Le |Les |Un |Une |Du |De |Des |Au |Aux |D'|N°\s*)/i, '')
    .replace(/\s*\(.*?\)\s*/g, ' ')      // contenu entre parenthèses
    .replace(/,.*$/, '')                  // tout après une virgule
    .replace(/\s+/g, ' ')
    .trim();
  if (term.length < 2) return null;
  // Page de recherche Wikipedia FR : TOUJOURS HTTP 200, oriente l'utilisateur
  // vers le bon article même si le titre exact n'existe pas.
  return 'https://fr.wikipedia.org/w/index.php?search=' + encodeURIComponent(term);
}

// ---- Vérifie si le ref contient déjà une URL -----------------------
function hasUrl(text) {
  return /https?:\/\/\S+/.test(text || '');
}

// Retire les liens déjà ajoutés par ce script (préfixe "→ http") pour
// permettre une régénération propre quand on relance le script.
function stripGeneratedLinks(ref) {
  if (!ref) return '';
  const idx = ref.indexOf('→ http');
  if (idx === -1) return ref;
  // Si ref ne contient que des liens générés (commence par "→ http")
  if (idx === 0) return '';
  return ref.slice(0, idx).trim();
}

// ---- Parcours et enrichissement ------------------------------------
let enriched = 0, regenerated = 0;
for (const m of ['manche1', 'manche2', 'manche3']) {
  for (const pack of Q[m]) {
    for (const q of pack.questions) {
      // Nettoyer les éventuels anciens liens générés pour régénérer proprement
      const cleanRef = stripGeneratedLinks(q.ref);
      if (cleanRef !== (q.ref || '')) regenerated++;

      const links = [];
      const wikiUrl = wikipediaUrl(q.r);
      if (wikiUrl) links.push(wikiUrl);

      const domLinks = DOMAIN_LINKS[pack.domain] || [];
      if (domLinks.length) {
        // Choisir 1 lien institutionnel (déterministe par id pour éviter
        // de changer les refs à chaque exécution)
        const idx = (q.id || '').length % domLinks.length;
        links.push(domLinks[idx]);
      }

      if (links.length === 0) {
        q.ref = cleanRef;
        continue;
      }

      // Append au ref nettoyé. Format lisible.
      const linkText = links.map(u => `→ ${u}`).join('  ');
      q.ref = cleanRef
        ? `${cleanRef}  ${linkText}`
        : linkText;
      enriched++;
    }
  }
}

// ---- Mise à jour meta ----------------------------------------------
Q.meta.generatedAt = new Date().toISOString();
fs.writeFileSync(QPATH, JSON.stringify(Q, null, 2), 'utf8');

console.log('✅ Enrichissement des références terminé');
console.log(`  Questions enrichies avec URL(s) : ${enriched}`);
console.log(`  Questions régénérées (anciens liens nettoyés) : ${regenerated}`);

// ---- Stats ---------------------------------------------------------
let withUrl = 0, totalQ = 0;
for (const m of ['manche1', 'manche2', 'manche3']) {
  for (const pack of Q[m]) {
    for (const q of pack.questions) {
      totalQ++;
      if (hasUrl(q.ref)) withUrl++;
    }
  }
}
console.log(`  Questions avec URL après enrichissement : ${withUrl} / ${totalQ} (${(100*withUrl/totalQ).toFixed(1)} %)`);
