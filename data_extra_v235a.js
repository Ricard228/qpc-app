// =====================================================================
// data_extra_v235a.js — v2.35 (1/2) : toutes les manches dans tous les
// domaines + ≥ 200 questions par domaine.
// Infrastructure commune + 9 premiers domaines :
//   BTP, Monnaie, Commerce, Sciences sociales, Histoire/travail/santé,
//   Culture/environnement, Comptabilité, Fiscalité, Marchés publics.
// Chaque domaine reçoit : 2 packs Manche 2 (6 q, PTS 1→6),
// 2 packs Manche 3 (9 q, format buzz) et des packs Manche 1 (4 q).
// =====================================================================

const { F } = require('./data_extra_v230b.js');

function mkq(q, r, w1, w2, w3, e, ref) {
  return { q, r, choices: [r, w1, w2, w3], correctIndices: [0], e, ref };
}

// Question « définition → terme » : les distracteurs sont d'autres
// termes de la même banque (offsets premiers entre eux → distincts).
function defQs(bank, ref, from, count) {
  const n = bank.length;
  const out = [];
  for (let k = 0; k < count; k++) {
    const i = (from + k) % n;
    const [terme, def] = bank[i];
    const w = [bank[(i + 1) % n][0], bank[(i + 3) % n][0], bank[(i + 7) % n][0]];
    out.push(mkq(
      `Comment appelle-t-on : ${def} ?`,
      terme, w[0], w[1], w[2],
      `${terme} : ${def}.`,
      ref));
  }
  return out;
}

// Variante inversée « terme → définition » : utilisée pour les
// compléments Manche 1 afin de ne jamais dupliquer un énoncé des
// manches 2/3 même quand la banque reboucle. Les distracteurs sont
// les définitions d'autres termes de la banque.
function defQsInv(bank, ref, from, count) {
  const n = bank.length;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const out = [];
  for (let k = 0; k < count; k++) {
    const i = (from + k) % n;
    const [terme, def] = bank[i];
    const w = [bank[(i + 2) % n][1], bank[(i + 5) % n][1], bank[(i + 11) % n][1]];
    out.push(mkq(
      `Que désigne « ${terme.charAt(0).toLowerCase() + terme.slice(1)} » ?`,
      cap(def), cap(w[0]), cap(w[1]), cap(w[2]),
      `${terme} : ${def}.`,
      ref));
  }
  return out;
}

function chunkM1(domain, theme, titre, flat) {
  const packs = [];
  for (let i = 0; i + 4 <= flat.length; i += 4) {
    packs.push({
      titre: `${titre} — Série ${packs.length + 1}`, theme, domain,
      questions: flat.slice(i, i + 4).map((x, j) => ({ id: `q${j + 1}`, pts: 1, ...x }))
    });
  }
  return packs;
}
function packM2(domain, theme, titre, six) {
  return {
    titre, theme, domain,
    questions: six.map((x, j) => ({ id: `q${j + 1}`, ...x, pts: j + 1 }))
  };
}
function packM3(domain, theme, titre, nine) {
  return {
    titre, theme, domain,
    questions: nine.map((x, j) => ({ id: `q${j + 1}`, pts: 1, ...x }))
  };
}

const M1 = [], M2 = [], M3 = [];
// Assemble un domaine : bank (≥26 paires), ref, numériques M1.
// M3 = 2×9 defQ (paires 0..17) ; M2 = 2 packs de 6 defQ (paires 18..29 —
// la banque boucle si < 30) ; M1 = numériques + defQ complémentaires.
function buildDomain(domain, theme, ref, bank, m1Numeric, m1DefCount) {
  M3.push(packM3(domain, theme, `${domain.split(' ')[0]} — Finale v35 A`, defQs(bank, ref, 0, 9)));
  M3.push(packM3(domain, theme, `${domain.split(' ')[0]} — Finale v35 B`, defQs(bank, ref, 9, 9)));
  M2.push(packM2(domain, theme, `${domain.split(' ')[0]} — Face-à-face v35 A`, defQs(bank, ref, 18, 6)));
  M2.push(packM2(domain, theme, `${domain.split(' ')[0]} — Face-à-face v35 B`, defQs(bank, ref, 24, 6)));
  const flat = [...m1Numeric, ...defQsInv(bank, ref, 30, m1DefCount)];
  M1.push(...chunkM1(domain, theme, `${theme} — Consolidation v35`, flat));
}

// =====================================================================
// 1. TOPOGRAPHIE / GÉNIE CIVIL / ARCHITECTURE  (140 → +62 = 202)
// =====================================================================
const BTP_BANK = [
 ['Le théodolite', 'l\'instrument qui mesure les angles horizontaux et verticaux en topographie'],
 ['La mire', 'la règle graduée tenue verticalement sur laquelle on effectue les lectures de nivellement'],
 ['Le nivellement', 'l\'ensemble des opérations déterminant les altitudes des points'],
 ['La polygonale', 'le cheminement de stations successives servant d\'ossature à un levé'],
 ['L\'implantation', 'le report sur le terrain des points d\'un projet à partir des plans'],
 ['Le chaînage', 'la ceinture en béton armé qui solidarise les murs d\'un bâtiment'],
 ['Le coffrage', 'le moule provisoire qui donne sa forme au béton frais'],
 ['L\'étaiement', 'le dispositif provisoire qui soutient une structure pendant l\'exécution'],
 ['La laitance', 'la pellicule fragile riche en ciment qui remonte à la surface d\'un béton trop mouillé'],
 ['La cure du béton', 'le maintien de l\'humidité du béton jeune pour garantir sa résistance'],
 ['Le ferraillage', 'l\'ensemble des armatures en acier disposées dans le béton'],
 ['La semelle isolée', 'la fondation superficielle placée sous un poteau'],
 ['Le radier', 'la fondation formant une dalle générale sous tout le bâtiment'],
 ['Le pieu', 'la fondation profonde qui transmet les charges aux couches résistantes'],
 ['La longrine', 'la poutre de liaison reposant sur les fondations et portant les murs'],
 ['Le voile', 'le mur porteur en béton armé de faible épaisseur'],
 ['La poutre', 'l\'élément horizontal qui porte les charges vers les appuis'],
 ['Le poteau', 'l\'élément vertical qui transmet les charges aux fondations'],
 ['Le hourdis', 'le corps creux posé entre poutrelles dans un plancher'],
 ['La prédalle', 'la dalle mince préfabriquée servant de coffrage collaborant'],
 ['Le fruit d\'un mur', 'l\'inclinaison volontaire donnée à la face d\'un mur'],
 ['Le drainage', 'l\'évacuation des eaux du sol pour protéger les ouvrages'],
 ['Le remblai', 'l\'apport de terres pour rehausser ou combler un terrain'],
 ['Le déblai', 'l\'excavation de terres au-dessous du terrain naturel'],
 ['La plus-value de terrassement', 'le surcoût lié aux difficultés imprévues d\'excavation'],
 ['L\'avant-métré', 'le calcul détaillé des quantités d\'ouvrages à partir des plans'],
 ['Le décompte général définitif', 'le document qui arrête le montant final des travaux exécutés'],
 ['La réception définitive', 'l\'acte qui clôt la période de garantie et libère les retenues'],
 ['Le maître d\'ouvrage délégué', 'la structure mandatée pour conduire l\'opération au nom du client'],
 ['Le géotechnicien', 'le spécialiste qui étudie les sols pour fonder les ouvrages'],
 ['Le levé d\'état des lieux', 'le relevé complet de l\'existant avant travaux'],
 ['La note de calcul', 'le document justifiant le dimensionnement d\'une structure'],
 ['Le plan de récolement', 'le plan conforme à l\'exécution réelle remis en fin de chantier'],
 ['Le contreventement', 'le dispositif qui assure la stabilité horizontale d\'une structure'],
];
const BTP_REF = 'https://fr.wikipedia.org/wiki/G%C3%A9nie_civil';
const btpNum = [];
[[100,120,1.2],[80,100,1.25],[150,180,1.2],[200,250,1.25],[60,75,1.25],[90,108,1.2],[250,300,1.2],[120,150,1.25]]
.forEach(([v, f, coef]) => btpNum.push(mkq(
  `Un volume de déblais en place de ${F(v)} m³ foisonne avec un coefficient de ${String(coef).replace('.', ',')}. Volume à transporter :`,
  `${F(f)} m³`, `${F(v)} m³`, `${F(Math.round(f*2))} m³`, `${F(Math.round(v*0.8))} m³`,
  `Volume foisonné = ${F(v)} × ${String(coef).replace('.', ',')} = ${F(f)} m³ : le foisonnement augmente le volume à évacuer.`,
  'https://fr.wikipedia.org/wiki/Foisonnement')));
[[12,0.15,25,45],[20,0.15,25,75],[16,0.2,25,80],[24,0.15,25,90],[30,0.2,25,150],[18,0.15,25,67.5],[40,0.15,25,150],[26,0.2,25,130]]
.forEach(([s, ep, kg, tot]) => btpNum.push(mkq(
  `Une dalle de ${s} m² et ${String(ep).replace('.', ',')} m d'épaisseur est ferraillée à ${kg} kg d'acier par m³. Masse d'acier nécessaire :`,
  `${String(tot).replace('.', ',')} kg`, `${String(tot*2).replace('.', ',')} kg`, `${F(s*kg)} kg`, `${String(Math.round(tot/2)).replace('.', ',')} kg`,
  `Volume = ${s} × ${String(ep).replace('.', ',')} = ${(s*ep).toFixed(1).replace('.', ',')} m³ ; acier = volume × ${kg} = ${String(tot).replace('.', ',')} kg.`,
  'https://fr.wikipedia.org/wiki/B%C3%A9ton_arm%C3%A9')));
buildDomain('Topographie, génie civil et architecture', 'BTP et topographie', BTP_REF, BTP_BANK, btpNum, 16);

// =====================================================================
// 2. MONNAIE, FINANCE & BUDGET  (141 → +62 = 203)
// =====================================================================
const MON_BANK = [
 ['La liquidité', 'la facilité avec laquelle un actif se convertit en monnaie sans perte de valeur'],
 ['Le taux directeur', 'le taux fixé par la banque centrale qui guide le coût du refinancement bancaire'],
 ['L\'open market', 'les interventions de la banque centrale par achats et ventes de titres'],
 ['Le refinancement', 'l\'opération par laquelle les banques obtiennent de la liquidité auprès de la banque centrale'],
 ['La monnaie fiduciaire', 'les billets et pièces dont la valeur repose sur la confiance'],
 ['La monnaie scripturale', 'la monnaie inscrite en compte, circulant par virements et chèques'],
 ['La vitesse de circulation', 'le nombre moyen de fois qu\'une unité monétaire change de mains par période'],
 ['La désinflation', 'le ralentissement du rythme de hausse des prix'],
 ['L\'hyperinflation', 'l\'emballement extrême et auto-entretenu de la hausse des prix'],
 ['La dollarisation', 'l\'usage d\'une devise étrangère à la place de la monnaie nationale'],
 ['Le contrôle des changes', 'la réglementation limitant les mouvements de devises'],
 ['La position extérieure', 'le bilan des avoirs et engagements d\'un pays vis-à-vis du reste du monde'],
 ['Le service de la dette', 'les paiements d\'intérêts et d\'amortissements dus sur la dette'],
 ['La soutenabilité de la dette', 'la capacité d\'un État à honorer sa dette sans ajustement irréaliste'],
 ['Le rééchelonnement', 'la renégociation du calendrier de remboursement d\'une dette'],
 ['La titrisation', 'la transformation de créances en titres négociables'],
 ['Le collatéral', 'l\'actif remis en garantie d\'un financement'],
 ['La prime de terme', 'le supplément de rendement exigé pour prêter à long terme'],
 ['La courbe des taux', 'la relation entre les rendements et les maturités des titres'],
 ['L\'inversion de la courbe', 'la situation où les taux courts dépassent les taux longs'],
 ['Le prêteur en dernier ressort', 'la banque centrale qui refinance les banques en crise de liquidité'],
 ['Le risque systémique', 'le risque qu\'une défaillance se propage à tout le système financier'],
 ['La supervision bancaire', 'le contrôle prudentiel des établissements de crédit'],
 ['Le fonds de garantie des dépôts', 'le mécanisme qui indemnise les déposants en cas de faillite bancaire'],
 ['Le budget citoyen', 'la version simplifiée du budget de l\'État destinée au grand public'],
 ['Le collectif budgétaire', 'la loi de finances rectificative modifiant le budget en cours d\'année'],
 ['La régulation budgétaire', 'le gel ou dégel de crédits pour tenir la trajectoire des finances publiques'],
 ['Le compte unique du Trésor', 'la centralisation des ressources publiques sur un compte à la banque centrale'],
 ['La cour des comptes', 'la juridiction qui contrôle la régularité des comptes publics'],
 ['L\'encours de la dette', 'le stock total de dette restant dû à une date donnée'],
 ['La maturité moyenne', 'la durée moyenne restant à courir sur le portefeuille de dette'],
 ['Le taux d\'endettement', 'le rapport entre la dette publique et le PIB'],
 ['La notation souveraine', 'l\'évaluation par une agence de la qualité de crédit d\'un État'],
 ['Le marché primaire des titres', 'le compartiment où les titres publics sont émis pour la première fois'],
];
const MON_REF = 'https://fr.wikipedia.org/wiki/Politique_mon%C3%A9taire';
const monNum = [];
[[5000,3.5,175],[8000,4,320],[12000,3,360],[6000,5,300],[15000,3.5,525],[9000,4.5,405],[20000,3,600],[7500,4,300]]
.forEach(([md, tx, int]) => monNum.push(mkq(
  `Un État emprunte ${F(md)} milliards FCFA à ${String(tx).replace('.', ',')} % l'an. Charge d'intérêts annuelle :`,
  `${F(int)} milliards FCFA`, `${F(int*2)} milliards FCFA`, `${F(Math.round(int/2))} milliards FCFA`, `${F(md)} milliards FCFA`,
  `Intérêts = ${F(md)} × ${String(tx).replace('.', ',')} % = ${F(int)} milliards FCFA par an : c'est le service de la dette hors principal.`,
  'https://fr.wikipedia.org/wiki/Dette_publique')));
[[4200,6000,70],[3500,5000,70],[5400,9000,60],[2800,4000,70],[6300,9000,70],[4800,8000,60],[3900,6000,65],[5200,8000,65]]
.forEach(([d, pib, r]) => monNum.push(mkq(
  `Dette publique : ${F(d)} milliards ; PIB : ${F(pib)} milliards. Le taux d'endettement est de :`,
  `${r} %`, `${Math.min(150,r+25)} %`, `${Math.max(10,r-25)} %`, `${100-r} %`,
  `Endettement = dette ÷ PIB = ${F(d)} ÷ ${F(pib)} = ${r} % — la norme UEMOA plafonne ce ratio à 70 % du PIB.`,
  'https://fr.wikipedia.org/wiki/Dette_publique')));
buildDomain('Monnaie, finance et budget', 'Monnaie et budget', MON_REF, MON_BANK, monNum, 16);

// =====================================================================
// 3. COMMERCE, DÉVELOPPEMENT & AFRIQUE  (141 → +62 = 203)
// =====================================================================
const COM_BANK = [
 ['Le dumping', 'la vente à l\'export à un prix inférieur à celui du marché intérieur'],
 ['Le droit antidumping', 'la taxe qui corrige un prix d\'importation artificiellement bas'],
 ['Le contingent', 'la limite quantitative imposée aux importations d\'un produit'],
 ['La clause de la nation la plus favorisée', 'l\'obligation d\'étendre à tous les membres tout avantage commercial accordé à l\'un'],
 ['Le traitement national', 'l\'obligation de traiter les produits importés comme les produits locaux une fois entrés'],
 ['La balance des services', 'le solde des échanges internationaux de services'],
 ['Les envois de fonds', 'les transferts d\'argent des migrants vers leur pays d\'origine'],
 ['Le guichet unique', 'le point d\'entrée unique qui regroupe les formalités du commerce extérieur'],
 ['Le transit', 'le passage de marchandises par un pays sans y être dédouanées'],
 ['L\'entrepôt sous douane', 'le lieu où les marchandises sont stockées en suspension de droits'],
 ['Le certificat d\'origine', 'le document qui atteste le pays de fabrication d\'un produit'],
 ['La valeur en douane', 'la base de calcul des droits, fondée sur la valeur transactionnelle'],
 ['L\'inspection avant embarquement', 'le contrôle des marchandises réalisé dans le pays d\'exportation'],
 ['La zone économique spéciale', 'l\'espace offrant un régime fiscal et douanier dérogatoire aux investisseurs'],
 ['Le contenu local', 'l\'exigence d\'incorporer des intrants ou de la main-d\'œuvre du pays hôte'],
 ['Le commerce équitable', 'le commerce garantissant un prix rémunérateur et des normes sociales aux producteurs'],
 ['La certification biologique', 'l\'attestation qu\'un produit respecte un cahier des charges sans intrants chimiques de synthèse'],
 ['La traçabilité', 'la capacité de suivre un produit à toutes les étapes de la chaîne'],
 ['Les mesures sanitaires et phytosanitaires', 'les normes protégeant la santé humaine, animale et végétale dans les échanges'],
 ['Les obstacles techniques au commerce', 'les normes et règlements techniques qui restreignent les échanges'],
 ['L\'intégration verticale', 'le contrôle par une firme de plusieurs étapes successives de sa filière'],
 ['La diversification des exportations', 'l\'élargissement de la gamme de produits et de marchés d\'exportation'],
 ['La transformation structurelle', 'le déplacement de l\'activité des secteurs à faible productivité vers les plus productifs'],
 ['L\'industrialisation par substitution', 'la stratégie remplaçant les importations par une production nationale protégée'],
 ['La promotion des exportations', 'la stratégie orientant l\'appareil productif vers les marchés extérieurs'],
 ['Le corridor logistique', 'l\'axe de transport multimodal reliant un port aux pays de l\'hinterland'],
 ['Le poste frontière juxtaposé', 'l\'infrastructure où les contrôles des deux pays sont réalisés en un lieu unique'],
 ['Le tarif préférentiel', 'le droit de douane réduit accordé dans le cadre d\'un accord'],
 ['L\'érosion des préférences', 'la perte d\'avantage relatif quand les tarifs généraux baissent'],
 ['Le taux de change effectif réel', 'l\'indice de compétitivité-prix vis-à-vis des partenaires, corrigé des prix relatifs'],
 ['La facilité africaine de soutien juridique', 'l\'appui aux États pour négocier des contrats complexes équilibrés'],
 ['Le passeport CEDEAO', 'le document de voyage commun facilitant la libre circulation régionale'],
 ['Le schéma de libéralisation des échanges', 'le mécanisme CEDEAO d\'exonération des produits originaires'],
 ['L\'agenda 2063', 'la vision de long terme de l\'Union africaine pour la transformation du continent'],
];
const COM_REF = 'https://fr.wikipedia.org/wiki/Commerce_international';
const comNum = [];
[[85,60,25,41.7],[120,90,30,33.3],[95,70,25,35.7],[150,100,50,50],[200,160,40,25],[75,50,25,50],[110,88,22,25],[64,48,16,33.3]]
.forEach(([apres, avant, delta, pct]) => comNum.push(mkq(
  `Les exportations passent de ${F(avant)} à ${F(apres)} milliards FCFA. Leur progression est de :`,
  `${String(pct).replace('.', ',')} %`, `${String(+(pct*2).toFixed(1)).replace('.', ',')} %`, `${F(delta)} %`, `${String(Math.max(2,+(pct/2).toFixed(1))).replace('.', ',')} %`,
  `Progression = (${F(apres)} − ${F(avant)}) ÷ ${F(avant)} = ${String(pct).replace('.', ',')} %.`,
  'https://fr.wikipedia.org/wiki/Exportation')));
[[10,700,70],[20,450,90],[5,1200,60],[15,600,90],[10,850,85],[25,320,80],[8,750,60],[12,500,60]]
.forEach(([tx, val, dr] ) => comNum.push(mkq(
  `Marchandise d'une valeur en douane de ${F(val)} millions FCFA, droit de douane de ${tx} %. Montant du droit :`,
  `${F(dr)} millions FCFA`, `${F(dr*2)} millions FCFA`, `${F(Math.round(dr/2))} millions FCFA`, `${F(val)} millions FCFA`,
  `Droit = ${tx} % × ${F(val)} = ${F(dr)} millions FCFA, avant TVA de porte et taxes annexes.`,
  'https://fr.wikipedia.org/wiki/Droit_de_douane')));
buildDomain('Commerce, développement et Afrique', 'Échanges et développement', COM_REF, COM_BANK, comNum, 16);

// =====================================================================
// 4. SCIENCES SOCIALES & POLITIQUES  (142 → +58 = 200)
// =====================================================================
const SOC_BANK = [
 ['La socialisation secondaire', 'l\'intériorisation de normes nouvelles à l\'âge adulte, au travail ou dans les groupes'],
 ['Le groupe de référence', 'le groupe auquel l\'individu se compare et emprunte ses normes'],
 ['La déviance', 'la transgression des normes sociales en vigueur dans un groupe'],
 ['La stigmatisation', 'le marquage social négatif qui disqualifie une personne'],
 ['Le contrôle social', 'l\'ensemble des mécanismes qui assurent la conformité aux normes'],
 ['L\'assignation statutaire', 'l\'attribution d\'une position sociale indépendante du mérite individuel'],
 ['La méritocratie', 'le principe qui fonde les positions sociales sur le mérite'],
 ['La reproduction sociale', 'la transmission des positions sociales d\'une génération à l\'autre'],
 ['Le déclassement', 'la mobilité descendante par rapport à la position des parents'],
 ['La moyennisation', 'le rapprochement supposé des modes de vie autour des classes moyennes'],
 ['La ségrégation spatiale', 'la séparation résidentielle des groupes sociaux dans l\'espace urbain'],
 ['La gentrification', 'le remplacement des classes populaires par des classes aisées dans un quartier'],
 ['L\'exode rural', 'la migration durable des campagnes vers les villes'],
 ['La socialisation anticipatrice', 'l\'adoption des normes d\'un groupe que l\'on souhaite rejoindre'],
 ['Le lien social', 'l\'ensemble des relations qui unissent les membres d\'une société'],
 ['La solidarité mécanique', 'la cohésion fondée sur la similitude des individus dans les sociétés traditionnelles'],
 ['La solidarité organique', 'la cohésion fondée sur la complémentarité des fonctions dans les sociétés modernes'],
 ['Le fait majoritaire', 'la concordance entre majorité présidentielle et majorité parlementaire'],
 ['Le bipartisme', 'la structuration de la vie politique autour de deux grands partis'],
 ['Le scrutin proportionnel', 'le mode de scrutin qui répartit les sièges au prorata des voix'],
 ['Le scrutin majoritaire', 'le mode de scrutin qui attribue le siège au candidat arrivé en tête'],
 ['Le découpage électoral', 'la délimitation des circonscriptions pour les élections'],
 ['L\'abstention', 'le fait de ne pas participer à un vote alors qu\'on est inscrit'],
 ['Le vote censitaire', 'le droit de vote réservé aux contribuables payant un impôt minimal'],
 ['Le lobbying', 'l\'activité d\'influence des décideurs par des groupes d\'intérêt'],
 ['La société de surveillance', 'l\'extension du contrôle des comportements par les technologies'],
 ['Le quatrième pouvoir', 'le rôle de contre-pouvoir attribué aux médias'],
 ['L\'opinion publique', 'l\'ensemble des jugements partagés par une population sur les affaires communes'],
 ['L\'agenda politique', 'la hiérarchie des problèmes considérés comme prioritaires par les décideurs'],
 ['Le référendum d\'initiative populaire', 'la consultation déclenchée par une pétition citoyenne'],
 ['Le mandat impératif', 'l\'obligation pour un élu de suivre les instructions de ses électeurs'],
 ['L\'alternance politique', 'le remplacement pacifique d\'une majorité par une autre au pouvoir'],
 ['La cohabitation', 'la coexistence d\'un exécutif et d\'une majorité parlementaire opposés'],
 ['Le consensus', 'l\'accord général obtenu sans vote formel ni opposition marquée'],
];
const SOC_REF = 'https://fr.wikipedia.org/wiki/Sociologie';
const socNum = [];
[[500,100,20],[800,240,30],[1200,300,25],[600,90,15],[1000,350,35],[400,60,15],[1500,450,30],[900,180,20]]
.forEach(([n, x, p]) => socNum.push(mkq(
  `Dans un échantillon de ${F(n)} enquêtés, ${F(x)} déclarent participer à une association. Cette proportion est de :`,
  `${p} %`, `${p*2} %`, `${Math.max(2,Math.round(p/2))} %`, `${100-p} %`,
  `Proportion = ${F(x)} ÷ ${F(n)} = ${p} % — l'engagement associatif est un indicateur classique du capital social.`,
  'https://fr.wikipedia.org/wiki/Capital_social_(sociologie)')));
[[45,90,50],[60,80,75],[52,65,80],[38,95,40],[70,87.5,80],[44,55,80],[63,84,75],[48,96,50]]
.forEach(([f, tot, p]) => socNum.push(mkq(
  `Une commune compte ${tot} conseillers dont ${f} femmes. Le taux de féminisation du conseil est de :`,
  `${p} %`, `${Math.min(95,p+20)} %`, `${Math.max(5,p-20)} %`, `${100-p} %`,
  `Taux = ${f} ÷ ${tot} = ${p} % — le suivi de la parité dans les instances locales relève de l'ODD 5.`,
  'https://fr.wikipedia.org/wiki/Parit%C3%A9_(sociologie)')));
buildDomain('Sciences sociales et politiques', 'Concepts fondamentaux', SOC_REF, SOC_BANK, socNum, 12);

// =====================================================================
// 5. HISTOIRE, TRAVAIL, SANTÉ & ÉDUCATION  (142 → +58 = 200)
// =====================================================================
const HIST_BANK = [
 ['Le panafricanisme', 'le mouvement prônant l\'unité et la solidarité des peuples africains'],
 ['La décolonisation', 'le processus d\'accession des colonies à l\'indépendance'],
 ['L\'indirect rule', 'l\'administration coloniale britannique s\'appuyant sur les chefs locaux'],
 ['L\'assimilation', 'la politique coloniale française visant à étendre la culture métropolitaine'],
 ['Le syndicat', 'l\'organisation qui défend les intérêts professionnels des travailleurs'],
 ['La convention collective', 'l\'accord négocié fixant les conditions de travail d\'une branche'],
 ['Le dialogue social', 'la concertation entre État, employeurs et travailleurs'],
 ['Le sous-emploi', 'la situation des actifs travaillant moins qu\'ils ne le souhaitent ou sous leurs capacités'],
 ['Le chômage déguisé', 'l\'occupation apparente de personnes dont la productivité est quasi nulle'],
 ['La pluriactivité', 'le cumul de plusieurs activités rémunératrices par un même actif'],
 ['Le travail décent', 'l\'emploi productif assorti de droits, de protection sociale et de dialogue'],
 ['La pyramide sanitaire', 'l\'organisation des soins par niveaux, du poste de santé à l\'hôpital de référence'],
 ['Les soins de santé primaires', 'le socle de soins essentiels accessibles à tous, défini à Alma-Ata'],
 ['La transition épidémiologique', 'le passage des maladies infectieuses aux maladies chroniques comme causes majeures de décès'],
 ['La charge de morbidité', 'la mesure du poids total des maladies en années de vie perdues ou vécues avec incapacité'],
 ['La vaccination de routine', 'le calendrier vaccinal systématique administré aux enfants'],
 ['La santé communautaire', 'l\'approche associant les communautés à la promotion de leur propre santé'],
 ['L\'agent de santé communautaire', 'le relais local formé pour les soins et la sensibilisation de proximité'],
 ['Le taux de redoublement', 'la part des élèves qui reprennent la même classe l\'année suivante'],
 ['La déperdition scolaire', 'l\'abandon des études avant la fin d\'un cycle'],
 ['L\'éducation inclusive', 'la scolarisation de tous les enfants, y compris en situation de handicap, dans le système ordinaire'],
 ['La formation duale', 'l\'apprentissage alternant centre de formation et entreprise'],
 ['L\'analphabétisme fonctionnel', 'l\'incapacité d\'utiliser la lecture et l\'écriture dans la vie courante malgré une scolarisation'],
 ['La carte scolaire', 'la planification territoriale de l\'offre d\'éducation'],
 ['Les cantines scolaires', 'les programmes de repas qui soutiennent l\'assiduité et la nutrition des élèves'],
 ['Le ratio de dépendance', 'le rapport entre les personnes d\'âge inactif et celles d\'âge actif'],
 ['Le vieillissement démographique', 'l\'augmentation de la part des personnes âgées dans la population'],
 ['Le solde migratoire', 'la différence entre les entrées et les sorties de migrants d\'un territoire'],
 ['La diaspora', 'l\'ensemble des ressortissants d\'un pays établis durablement à l\'étranger'],
 ['L\'état civil', 'le système d\'enregistrement des naissances, mariages et décès'],
 ['Le recensement pilote', 'l\'opération d\'essai qui teste les outils avant un recensement général'],
 ['L\'espérance de scolarisation', 'le nombre d\'années d\'études qu\'un enfant peut espérer accomplir'],
 ['Le capital santé', 'le stock de santé d\'un individu, qui se déprécie et s\'entretient comme un capital'],
 ['La protection sociale non contributive', 'les prestations financées par l\'impôt sans condition de cotisation'],
];
const HIST_REF = 'https://fr.wikipedia.org/wiki/D%C3%A9veloppement_humain';
const histNum = [];
[[45,60,75],[36,48,75],[60,80,75],[27,36,75],[80,100,80],[42,70,60],[56,70,80],[33,55,60]]
.forEach(([r, t, p]) => histNum.push(mkq(
  `Sur ${t} enfants entrés en CP1, ${r} atteignent le CM2. Le taux de survie scolaire est de :`,
  `${p} %`, `${Math.min(100,p+15)} %`, `${Math.max(10,p-20)} %`, `${100-p} %`,
  `Survie = ${r} ÷ ${t} = ${p} % — le complément (${100-p} %) mesure la déperdition scolaire.`,
  'https://fr.wikipedia.org/wiki/Taux_de_scolarisation')));
[[640,800,80],[450,600,75],[720,900,80],[510,600,85],[840,1200,70],[390,600,65],[560,700,80],[675,900,75]]
.forEach(([v, n, p]) => histNum.push(mkq(
  `Dans un district, ${F(v)} enfants sur ${F(n)} ont reçu tous leurs vaccins de routine. La couverture vaccinale complète est de :`,
  `${p} %`, `${Math.min(99,p+15)} %`, `${Math.max(10,p-25)} %`, `${100-p} %`,
  `Couverture = ${F(v)} ÷ ${F(n)} = ${p} % — l'OMS recommande ≥ 90 % pour la protection collective.`,
  'https://fr.wikipedia.org/wiki/Couverture_vaccinale')));
buildDomain('Histoire, travail, santé et éducation', 'Société et développement', HIST_REF, HIST_BANK, histNum, 12);

// =====================================================================
// 6. CULTURE GÉNÉRALE & ENVIRONNEMENT  (142 → +58 = 200)
// =====================================================================
const CULT_BANK = [
 ['L\'érosion côtière', 'le recul du trait de côte sous l\'action des vagues et des activités humaines'],
 ['La mangrove', 'la forêt littorale de palétuviers, nurserie des poissons et rempart contre l\'érosion'],
 ['La saison des pluies', 'la période de l\'année concentrant l\'essentiel des précipitations'],
 ['L\'harmattan', 'le vent sec et poussiéreux soufflant du Sahara en saison sèche'],
 ['La nappe phréatique', 'la réserve d\'eau souterraine accessible par puits et forages'],
 ['Le bassin versant', 'le territoire dont toutes les eaux convergent vers un même cours d\'eau'],
 ['L\'étiage', 'le niveau le plus bas d\'un cours d\'eau dans l\'année'],
 ['La crue', 'la montée rapide du niveau d\'un cours d\'eau'],
 ['Le reboisement', 'la plantation d\'arbres sur des terres déboisées'],
 ['L\'agroforesterie', 'l\'association d\'arbres et de cultures sur une même parcelle'],
 ['Le compostage', 'la transformation des déchets organiques en amendement fertile'],
 ['La valorisation énergétique', 'la production d\'énergie à partir du traitement des déchets'],
 ['Le tri sélectif', 'la séparation des déchets par matériaux pour faciliter leur recyclage'],
 ['La décharge contrôlée', 'le site d\'enfouissement aménagé pour limiter les pollutions'],
 ['Le biogaz', 'le gaz combustible issu de la fermentation des matières organiques'],
 ['Le kilowattheure', 'l\'unité mesurant l\'énergie consommée ou produite'],
 ['Le mix énergétique', 'la répartition des sources d\'énergie dans la consommation d\'un pays'],
 ['L\'électrification rurale', 'l\'extension de l\'accès à l\'électricité dans les campagnes'],
 ['Le kit solaire domestique', 'le petit système photovoltaïque autonome pour un ménage'],
 ['L\'efficacité énergétique', 'la réduction de l\'énergie consommée pour un même service rendu'],
 ['Le patrimoine mondial', 'la liste UNESCO des biens culturels et naturels d\'une valeur universelle'],
 ['Le site Ramsar', 'la zone humide d\'importance internationale protégée par convention'],
 ['La réserve de biosphère', 'le territoire conciliant conservation et développement reconnu par l\'UNESCO'],
 ['Le braconnage', 'la chasse ou la pêche illégale d\'espèces protégées'],
 ['L\'espèce endémique', 'l\'espèce qui n\'existe naturellement que dans une zone donnée'],
 ['L\'espèce invasive', 'l\'espèce introduite qui prolifère au détriment des espèces locales'],
 ['Le corridor écologique', 'le passage qui relie des habitats et permet la circulation des espèces'],
 ['La pollution plastique', 'l\'accumulation de déchets plastiques dans les milieux naturels'],
 ['Le microplastique', 'la particule plastique de moins de cinq millimètres dispersée dans l\'environnement'],
 ['La qualité de l\'air', 'l\'état de l\'air mesuré par les concentrations de polluants'],
 ['L\'île de chaleur urbaine', 'la zone urbaine plus chaude que ses environs à cause du bâti'],
 ['La ville durable', 'la ville conçue pour réduire son empreinte et améliorer la qualité de vie'],
 ['La mobilité douce', 'les déplacements non motorisés comme la marche et le vélo'],
 ['La journée de la Terre', 'la mobilisation mondiale annuelle pour l\'environnement du 22 avril'],
];
const CULT_REF = 'https://fr.wikipedia.org/wiki/Environnement';
const cultNum = [];
[[3,90,270],[5,60,300],[2,150,300],[4,75,300],[6,45,270],[8,30,240],[10,24,240],[7,40,280]]
.forEach(([kw, jours, kwh]) => cultNum.push(mkq(
  `Un kit solaire produit ${kw} kWh par jour. Sur ${jours} jours, la production atteint :`,
  `${F(kwh)} kWh`, `${F(kwh*2)} kWh`, `${F(kw)} kWh`, `${F(Math.round(kwh/2))} kWh`,
  `Production = ${kw} × ${jours} = ${F(kwh)} kWh — de quoi alimenter éclairage, téléphones et petit électroménager.`,
  'https://fr.wikipedia.org/wiki/%C3%89nergie_solaire_photovolta%C3%AFque')));
[[40,200,20],[75,300,25],[90,450,20],[66,220,30],[120,400,30],[52,260,20],[135,540,25],[84,240,35]]
.forEach(([tri, tot, p]) => cultNum.push(mkq(
  `Sur ${F(tot)} kg de déchets ménagers, ${F(tri)} kg sont triés pour recyclage. Le taux de tri est de :`,
  `${p} %`, `${Math.min(90,p+20)} %`, `${Math.max(2,p-10)} %`, `${100-p} %`,
  `Taux = ${F(tri)} ÷ ${F(tot)} = ${p} % — le tri à la source conditionne toute l'économie circulaire.`,
  'https://fr.wikipedia.org/wiki/Recyclage')));
buildDomain('Culture générale et environnement', 'Repères généraux', CULT_REF, CULT_BANK, cultNum, 12);

// =====================================================================
// 7. COMPTABILITÉ  (142 → +58 = 200)
// =====================================================================
const CPT_BANK = [
 ['Le journal', 'le registre chronologique où toute opération est enregistrée en partie double'],
 ['Le lettrage', 'le rapprochement des factures et de leurs règlements dans un compte de tiers'],
 ['La contrepassation', 'l\'écriture inverse qui annule une écriture antérieure'],
 ['L\'extourne', 'l\'annulation au début d\'exercice des écritures de régularisation précédentes'],
 ['La balance âgée', 'l\'état des créances et dettes classées par ancienneté'],
 ['Le fonds de commerce', 'l\'ensemble des éléments incorporels et corporels affectés à une activité commerciale'],
 ['Le goodwill', 'l\'écart d\'acquisition payé au-delà de la juste valeur des actifs nets'],
 ['La juste valeur', 'le prix qui serait reçu pour vendre un actif lors d\'une transaction normale'],
 ['Le coût historique', 'la valeur d\'entrée d\'un bien fondée sur son prix d\'acquisition'],
 ['La subvention d\'investissement', 'l\'aide reçue pour financer des immobilisations, reprise au résultat par étalement'],
 ['Le compte de liaison', 'le compte utilisé pour les opérations entre siège et établissements'],
 ['L\'inventaire permanent', 'le suivi continu des stocks en quantité et en valeur'],
 ['L\'inventaire intermittent', 'la constatation des stocks uniquement en fin de période'],
 ['La démarque inconnue', 'l\'écart de stock inexpliqué dû aux vols, casses ou erreurs'],
 ['Le coût de production', 'le coût d\'achat des matières consommées majoré des charges de fabrication'],
 ['L\'en-cours de production', 'les biens dont la fabrication n\'est pas achevée à la clôture'],
 ['Le produit fini', 'le bien ayant achevé le cycle de production, prêt à la vente'],
 ['Le budget de trésorerie', 'la prévision mensuelle des encaissements et décaissements'],
 ['Le plan de financement', 'le tableau pluriannuel confrontant ressources et emplois durables'],
 ['L\'autofinancement', 'la part de la capacité d\'autofinancement conservée après dividendes'],
 ['L\'effet de levier', 'l\'amplification de la rentabilité des capitaux propres par l\'endettement'],
 ['La rentabilité économique', 'le résultat d\'exploitation rapporté aux capitaux investis'],
 ['La rentabilité financière', 'le résultat net rapporté aux capitaux propres'],
 ['Le tableau des flux de trésorerie', 'l\'état qui explique la variation de trésorerie par les activités, l\'investissement et le financement'],
 ['Les capitaux propres', 'les ressources appartenant aux associés : capital, réserves et résultat'],
 ['Le report à nouveau', 'la fraction du résultat dont l\'affectation est différée'],
 ['L\'acompte sur dividende', 'le versement anticipé d\'une partie du dividende avant l\'assemblée'],
 ['Le nantissement du fonds', 'la garantie prise sur le fonds de commerce au profit d\'un créancier'],
 ['La consolidation', 'l\'agrégation des comptes d\'un groupe comme s\'il formait une seule entité'],
 ['L\'intégration globale', 'la méthode de consolidation reprenant la totalité des comptes d\'une filiale contrôlée'],
 ['La mise en équivalence', 'la méthode valorisant une participation à la quote-part de ses capitaux propres'],
 ['Le périmètre de consolidation', 'l\'ensemble des sociétés retenues dans les comptes du groupe'],
 ['L\'annexe', 'l\'état financier qui explique et complète le bilan et le compte de résultat'],
 ['Le seuil de signification', 'le montant au-delà duquel une anomalie peut influencer les décisions des lecteurs'],
];
const CPT_REF = 'https://fr.wikipedia.org/wiki/Comptabilit%C3%A9_g%C3%A9n%C3%A9rale';
const cptNum = [];
[[900000,15,135000],[1200000,10,120000],[750000,20,150000],[2000000,12,240000],[600000,25,150000],[1500000,8,120000],[450000,30,135000],[1800000,15,270000]]
.forEach(([ca, tx, res]) => cptNum.push(mkq(
  `Chiffre d'affaires : ${F(ca)} FCFA ; taux de rentabilité nette : ${tx} %. Résultat net dégagé :`,
  `${F(res)} FCFA`, `${F(res*2)} FCFA`, `${F(Math.round(res/2))} FCFA`, `${F(ca)} FCFA`,
  `Résultat = ${tx} % × ${F(ca)} = ${F(res)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Rentabilit%C3%A9')));
[[2400000,800000,3],[3600000,900000,4],[1500000,500000,3],[4800000,1200000,4],[2000000,400000,5],[5400000,900000,6],[2800000,700000,4],[6000000,1500000,4]]
.forEach(([cp, rn, rf] ) => cptNum.push(mkq(
  `Capitaux propres : ${F(cp)} FCFA ; résultat net : ${F(rn)} FCFA. La rentabilité financière (ROE) ressort à environ :`,
  `${Math.round(rn/cp*100)} %`, `${Math.round(rn/cp*100)*2} %`, `${Math.max(1,Math.round(rn/cp*50))} %`, `${Math.round(cp/rn)} %`,
  `ROE = résultat net ÷ capitaux propres = ${F(rn)} ÷ ${F(cp)} ≈ ${Math.round(rn/cp*100)} %.`,
  'https://fr.wikipedia.org/wiki/Rentabilit%C3%A9_financi%C3%A8re')));
buildDomain('Comptabilité générale et analytique', 'Comptabilité OHADA', CPT_REF, CPT_BANK, cptNum, 12);

// =====================================================================
// 8. FISCALITÉ (TOGO)  (142 → +58 = 200)
// =====================================================================
const FISC_BANK = [
 ['Le contribuable', 'la personne physique ou morale au nom de laquelle l\'impôt est établi'],
 ['Le redevable', 'la personne tenue au paiement de l\'impôt, même supporté par un tiers'],
 ['Le fait générateur', 'l\'événement qui fait naître la dette fiscale'],
 ['L\'exigibilité', 'la date à partir de laquelle le Trésor peut réclamer l\'impôt'],
 ['La liquidation de l\'impôt', 'le calcul du montant dû par application du tarif à la base'],
 ['Le recouvrement', 'l\'ensemble des opérations de perception de l\'impôt'],
 ['L\'avis d\'imposition', 'le document qui notifie au contribuable la somme à payer'],
 ['La déclaration contrôlée', 'le régime où le contribuable déclare et l\'administration vérifie'],
 ['Le forfait', 'l\'imposition simplifiée établie sur une base évaluée globalement'],
 ['L\'acompte provisionnel', 'le versement anticipé imputé sur l\'impôt définitif'],
 ['Le trop-perçu', 'l\'excédent d\'impôt payé, restituable ou imputable'],
 ['Le dégrèvement', 'la réduction ou suppression d\'impôt accordée après réclamation'],
 ['La remise gracieuse', 'l\'abandon total ou partiel de l\'impôt accordé par bienveillance'],
 ['La prescription fiscale', 'le délai au-delà duquel l\'administration ne peut plus redresser'],
 ['Le droit de reprise', 'la faculté de l\'administration de corriger les impositions dans le délai légal'],
 ['La taxation d\'office', 'l\'imposition établie unilatéralement faute de déclaration'],
 ['La flagrance fiscale', 'la procédure d\'urgence face à une fraude en cours de constitution'],
 ['Le rescrit fiscal', 'la prise de position formelle de l\'administration qui l\'engage'],
 ['Le rulings des prix de transfert', 'l\'accord préalable sur la méthode de fixation des prix intragroupe'],
 ['La retenue libératoire', 'le prélèvement à la source qui éteint définitivement l\'impôt'],
 ['Le précompte', 'la retenue opérée sur les paiements comme avance d\'impôt'],
 ['Le crédit d\'impôt', 'la créance sur le Trésor imputable sur l\'impôt dû'],
 ['La territorialité de la TVA', 'les règles qui localisent une opération pour déterminer sa taxation'],
 ['L\'autoliquidation', 'le mécanisme où le client déclare lui-même la taxe à la place du fournisseur'],
 ['Le prorata de déduction', 'la fraction de TVA déductible pour un assujetti partiel'],
 ['La régularisation de TVA', 'la correction des déductions initiales lors d\'un changement d\'affectation'],
 ['Le régime suspensif', 'le report du paiement des droits pour certaines opérations économiques'],
 ['La valeur locative cadastrale', 'la base d\'imposition théorique des propriétés bâties'],
 ['La contribution foncière unique', 'l\'impôt qui regroupe les prélèvements sur la propriété immobilière'],
 ['Le timbre fiscal', 'le droit perçu sur certains actes et documents administratifs'],
 ['Le quitus fiscal', 'l\'attestation certifiant que le contribuable est à jour de ses obligations'],
 ['Le civisme fiscal', 'l\'accomplissement volontaire et sincère des obligations fiscales'],
 ['La parafiscalité', 'les prélèvements affectés à des organismes autres que l\'État'],
 ['La dépense fiscale', 'la perte de recettes résultant des exonérations et régimes de faveur'],
];
const FISC_REF = 'https://fr.wikipedia.org/wiki/Fiscalit%C3%A9_au_Togo';
const fiscNum = [];
[[850000,18,153000],[2300000,18,414000],[1450000,18,261000],[675000,18,121500],[3200000,18,576000],[540000,18,97200],[4100000,18,738000],[960000,18,172800]]
.forEach(([ht, tx, tva]) => fiscNum.push(mkq(
  `Facture de ${F(ht)} FCFA HT soumise à la TVA de ${tx} %. Montant de la TVA facturée :`,
  `${F(tva)} FCFA`, `${F(tva*2)} FCFA`, `${F(Math.round(tva/2))} FCFA`, `${F(ht)} FCFA`,
  `TVA = ${tx} % × ${F(ht)} = ${F(tva)} FCFA ; le TTC s'élève à ${F(ht+tva)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Taxe_sur_la_valeur_ajout%C3%A9e')));
[[1800000,3,54000],[2400000,5,120000],[3600000,3,108000],[1200000,10,120000],[4800000,5,240000],[900000,3,27000],[5400000,10,540000],[2100000,5,105000]]
.forEach(([base, tx, mnt]) => fiscNum.push(mkq(
  `Une retenue à la source de ${tx} % s'applique à une prestation de ${F(base)} FCFA. Montant retenu :`,
  `${F(mnt)} FCFA`, `${F(mnt*2)} FCFA`, `${F(Math.round(mnt/2))} FCFA`, `${F(base)} FCFA`,
  `Retenue = ${tx} % × ${F(base)} = ${F(mnt)} FCFA, reversée à l'OTR par la partie versante.`,
  'https://fr.wikipedia.org/wiki/Retenue_%C3%A0_la_source')));
buildDomain('Fiscalité (Togo)', 'Fiscalité togolaise', FISC_REF, FISC_BANK, fiscNum, 12);

// =====================================================================
// 9. MARCHÉS PUBLICS (TOGO)  (142 → +58 = 200)
// =====================================================================
const MP_BANK = [
 ['L\'autorité contractante', 'la personne publique qui passe le marché et en est responsable'],
 ['Le soumissionnaire', 'le candidat qui remet une offre en réponse à un appel d\'offres'],
 ['L\'attributaire', 'le candidat désigné pour obtenir le marché avant sa signature'],
 ['Le titulaire', 'l\'entreprise signataire du marché chargée de l\'exécuter'],
 ['La lettre de marché', 'le document contractuel notifiant l\'engagement des parties'],
 ['Le cahier des clauses techniques', 'le document décrivant les spécifications techniques des prestations'],
 ['Le règlement particulier d\'appel d\'offres', 'le document fixant les règles propres à une consultation'],
 ['La séance d\'ouverture des plis', 'la réunion publique où les offres reçues sont ouvertes et enregistrées'],
 ['La sous-commission d\'analyse', 'le groupe technique chargé d\'évaluer les offres'],
 ['Le rapport d\'évaluation', 'le document motivant le classement des offres et la proposition d\'attribution'],
 ['L\'avis d\'attribution', 'la publication informant du résultat de la procédure'],
 ['Le recours gracieux', 'la contestation adressée d\'abord à l\'autorité contractante elle-même'],
 ['Le référé précontractuel', 'le recours d\'urgence exercé avant la signature du marché'],
 ['La commission de règlement des différends', 'l\'organe qui tranche les litiges de passation'],
 ['Le délai d\'exécution', 'la durée contractuelle accordée pour réaliser les prestations'],
 ['La mise en demeure', 'l\'injonction formelle d\'exécuter avant sanctions contractuelles'],
 ['L\'ajournement des travaux', 'la suspension temporaire de l\'exécution ordonnée par l\'administration'],
 ['La réfaction', 'la réduction de prix acceptée pour des prestations non conformes mais conservées'],
 ['Le procès-verbal de réception', 'l\'acte constatant la conformité des prestations livrées'],
 ['Les réserves', 'les imperfections notées à la réception que le titulaire doit lever'],
 ['Le parfait achèvement', 'l\'obligation de réparer les désordres signalés pendant l\'année de garantie'],
 ['Le maître d\'œuvre de contrôle', 'l\'entité qui surveille la conformité de l\'exécution des travaux'],
 ['L\'ingénieur de suivi', 'le représentant technique de l\'administration sur le chantier'],
 ['L\'attachement contradictoire', 'le constat conjoint des quantités exécutées signé sur le chantier'],
 ['Le prix ferme', 'le prix non révisable pendant toute la durée du marché'],
 ['Le prix global et forfaitaire', 'le prix couvrant l\'ensemble des prestations indépendamment des quantités'],
 ['Le marché de clientèle', 'l\'accord fixant les conditions de commandes répétées sans quantités garanties'],
 ['La régie', 'l\'exécution directe de prestations par l\'administration avec ses moyens propres'],
 ['La délégation de service public', 'le contrat confiant la gestion d\'un service public à un opérateur rémunéré par les usagers'],
 ['L\'offre spontanée', 'la proposition de projet soumise par un opérateur sans sollicitation préalable'],
 ['Le dialogue compétitif', 'la procédure de discussion avec les candidats pour définir la solution'],
 ['La liste noire', 'le registre des entreprises exclues de la commande publique pour fautes graves'],
 ['Le pacte d\'intégrité', 'l\'engagement anticorruption signé par les parties à une procédure'],
 ['L\'archivage des marchés', 'la conservation organisée des dossiers pour les audits et contrôles'],
];
const MP_REF = 'https://fr.wikipedia.org/wiki/March%C3%A9_public';
const mpNum = [];
[[45,60,75],[120,150,80],[36,60,60],[90,120,75],[150,200,75],[66,88,75],[84,120,70],[105,140,75]]
.forEach(([ex, del, p]) => mpNum.push(mkq(
  `Un chantier de ${del} jours contractuels affiche ${ex} jours consommés pour 70 % d'avancement physique. Le taux de consommation du délai est de :`,
  `${p} %`, `${Math.min(100,p+15)} %`, `${Math.max(10,p-20)} %`, `70 %`,
  `Consommation du délai = ${ex} ÷ ${del} = ${p} % ; comparée à l'avancement physique (70 %), elle révèle ${p>70?'un retard':'une avance'} du chantier.`,
  'https://fr.wikipedia.org/wiki/Gestion_de_projet')));
[[250,50,20],[400,100,25],[180,45,25],[600,90,15],[320,80,25],[500,75,15],[240,72,30],[450,90,20]]
.forEach(([m, av, p]) => mpNum.push(mkq(
  `Marché de ${F(m)} millions FCFA avec une avance de démarrage de ${F(av)} millions. Le taux d'avance est de :`,
  `${p} %`, `${p*2} %`, `${Math.max(2,Math.round(p/2))} %`, `${100-p} %`,
  `Taux = ${F(av)} ÷ ${F(m)} = ${p} %, récupéré ensuite par précompte sur les décomptes.`,
  'https://fr.wikipedia.org/wiki/Avance_(finance)')));
buildDomain('Marchés publics et passation (Togo)', 'Commande publique', MP_REF, MP_BANK, mpNum, 12);

// Déduplication des choix (collisions résiduelles des générateurs)
function dedupePacks(packsList) {
  const numRe = /-?\d[\d  .,]*/;
  for (const packs of packsList) {
    for (const p of packs) {
      for (const q of p.questions) {
        if (!Array.isArray(q.choices)) continue;
        const seen = new Set([q.choices[q.correctIndices[0]]]);
        q.choices = q.choices.map((c, i) => {
          if (i === q.correctIndices[0]) return c;
          let v = c, guard = 0;
          while (seen.has(v) && guard < 10) {
            const m = String(v).match(numRe);
            if (!m) { v = `${v} (autre notion)`; break; }
            const n = parseFloat(m[0].replace(/[  ]/g, '').replace(',', '.'));
            const cand = [n + 3, n + 7, n * 2 + 1, n + 11, n + 13][guard % 5];
            const fmt = Number.isInteger(cand) ? cand.toLocaleString('fr-FR') : String(+cand.toFixed(1)).replace('.', ',');
            v = String(v).replace(m[0], fmt);
            guard++;
          }
          seen.add(v);
          return v;
        });
      }
    }
  }
}
dedupePacks([M1, M2, M3]);

module.exports = { m1Packs: M1, m2Packs: M2, m3Packs: M3, mkq, defQs, defQsInv, chunkM1, packM2, packM3, dedupePacks };
