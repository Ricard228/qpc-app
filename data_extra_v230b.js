// =====================================================================
// data_extra_v230b.js — v2.30 : complète les domaines intégrés à ≥120 q.
// Générateurs paramétriques (quantitatif) + questions rédigées (qualitatif).
// Chaque question : QCM 4 choix, bonne réponse en index 0, e + ref.
// =====================================================================

const D = {
  MICRO: 'Microéconomie et théorie',
  MACRO: 'Macroéconomie et politiques',
  STAT:  'Statistiques et économétrie',
  MON:   'Monnaie, finance et budget',
  MF:    'Marchés financiers UEMOA / BRVM',
  COM:   'Commerce, développement et Afrique',
  HPE:   'Histoire de la pensée économique',
  ML:    'Machine learning et deep learning',
  SE:    'Suivi-évaluation des projets et politiques',
  HIST:  'Histoire, travail, santé et éducation',
  SOC:   'Sciences sociales et politiques',
  CULT:  'Culture générale et environnement'
};

const F = (n) => Number(n).toLocaleString('fr-FR');
function mk(q, r, w1, w2, w3, e, ref) {
  return { q, r, choices: [r, w1, w2, w3], correctIndices: [0], e, ref };
}
function packify(domain, theme, titre, flat) {
  const packs = [];
  for (let i = 0; i + 4 <= flat.length; i += 4) {
    packs.push({
      titre: `${titre} — Série ${packs.length + 1}`, theme, domain,
      questions: flat.slice(i, i + 4).map((x, j) => ({ id: `q${j + 1}`, pts: 1, ...x }))
    });
  }
  return packs;
}

// =====================================================================
// STATISTIQUES & ÉCONOMÉTRIE (+32 → paramétrique, 40)
// =====================================================================
const stat = [];
// Moyenne de 5 valeurs
[[[10,20,30,40,50],30],[[2,4,6,8,10],6],[[12,15,18,21,24],18],[[5,10,15,20,25],15],[[100,200,300,400,500],300],[[3,6,9,12,15],9],[[7,14,21,28,35],21],[[8,16,24,32,40],24]]
.forEach(([arr, m]) => stat.push(mk(
  `Quelle est la moyenne arithmétique de la série ${arr.join(', ')} ?`,
  `${m}`, `${m+2}`, `${m-3}`, `${arr[2]+1}`,
  `Moyenne = somme ÷ effectif = ${arr.reduce((a,b)=>a+b,0)} ÷ ${arr.length} = ${m}.`,
  'https://fr.wikipedia.org/wiki/Moyenne_arithm%C3%A9tique')));
// Médiane série impaire
[[[3,7,9,12,20],9],[[1,4,4,8,10],4],[[5,6,7,15,22],7],[[2,3,10,11,30],10],[[8,9,14,18,25],14],[[4,6,6,9,40],6]]
.forEach(([arr, med]) => stat.push(mk(
  `Quelle est la médiane de la série ordonnée ${arr.join(', ')} ?`,
  `${med}`, `${arr.reduce((a,b)=>a+b,0)/arr.length}`, `${arr[arr.length-1]}`, `${arr[0]}`,
  `La médiane d'une série de ${arr.length} valeurs ordonnées est la valeur centrale (3ᵉ), soit ${med}. Elle partage l'effectif en deux moitiés.`,
  'https://fr.wikipedia.org/wiki/M%C3%A9diane_(statistiques)')));
// Écart-type simple : variance donnée
[[4,2],[9,3],[16,4],[25,5],[36,6],[49,7]]
.forEach(([v, s]) => stat.push(mk(
  `La variance d'une distribution vaut ${v}. Quel est son écart-type ?`,
  `${s}`, `${v}`, `${v*2}`, `${(s+1)}`,
  `L'écart-type est la racine carrée de la variance : √${v} = ${s}. Il s'exprime dans l'unité des données.`,
  'https://fr.wikipedia.org/wiki/%C3%89cart_type')));
// Proba simple
[[1,6,'1/6'],[2,6,'1/3'],[3,6,'1/2'],[1,2,'1/2'],[13,52,'1/4'],[4,52,'1/13']]
.forEach(([fav, tot, p]) => stat.push(mk(
  `Quelle est la probabilité d'un événement comptant ${fav} cas favorables sur ${tot} cas également possibles ?`,
  `${p}`, `${fav}/${tot+1}`, `${tot}/${fav}`, `${fav*2}/${tot}`,
  `Probabilité (Laplace) = cas favorables ÷ cas possibles = ${fav}/${tot} = ${p}.`,
  'https://fr.wikipedia.org/wiki/Probabilit%C3%A9')));
// Concepts rédigés
[
 mk('Le coefficient de corrélation de Pearson varie toujours entre…','−1 et +1','0 et 1','−100 et +100','0 et l\'infini',
   'r mesure l\'intensité et le sens d\'une liaison linéaire : +1 corrélation positive parfaite, −1 négative parfaite, 0 absence de liaison linéaire.',
   'https://fr.wikipedia.org/wiki/Corr%C3%A9lation_(statistiques)'),
 mk('Dans un modèle de régression linéaire, le R² représente…','La part de variance de Y expliquée par le modèle','La pente de la droite','L\'erreur type','Le nombre d\'observations',
   'R² ∈ [0,1] : proche de 1, le modèle explique bien la variabilité de la variable dépendante ; proche de 0, il explique peu.',
   'https://fr.wikipedia.org/wiki/Coefficient_de_d%C3%A9termination'),
 mk('Une p-value inférieure au seuil (ex. 0,05) conduit à…','Rejeter l\'hypothèse nulle','Accepter l\'hypothèse nulle','Ignorer le test','Doubler l\'échantillon',
   'Si p < α, le résultat est jugé statistiquement significatif : on rejette H₀. La p-value est la probabilité d\'observer un effet au moins aussi extrême si H₀ est vraie.',
   'https://fr.wikipedia.org/wiki/Valeur_p'),
 mk('L\'estimateur des MCO (moindres carrés ordinaires) minimise…','La somme des carrés des résidus','La somme des résidus','Le nombre de variables','La moyenne de Y',
   'Les MCO choisissent les coefficients qui rendent minimale Σ(Yᵢ − Ŷᵢ)² ; sous les hypothèses de Gauss-Markov, l\'estimateur est BLUE.',
   'https://fr.wikipedia.org/wiki/M%C3%A9thode_des_moindres_carr%C3%A9s'),
 mk('L\'hétéroscédasticité désigne…','Une variance des erreurs non constante','Une moyenne nulle des erreurs','Une corrélation parfaite','Un échantillon biaisé par construction',
   'Quand la variance des résidus dépend des observations, les écarts types des MCO sont biaisés ; on corrige par des erreurs robustes (White) ou les MCG.',
   'https://fr.wikipedia.org/wiki/H%C3%A9t%C3%A9rosc%C3%A9dasticit%C3%A9'),
 mk('La multicolinéarité entre variables explicatives…','Rend les coefficients instables et difficilement interprétables','Améliore toujours le modèle','Supprime les résidus','Est mesurée par le R²',
   'De fortes corrélations entre régresseurs gonflent les variances (VIF élevé) : les estimations deviennent imprécises même si le R² reste bon.',
   'https://fr.wikipedia.org/wiki/Multicolin%C3%A9arit%C3%A9'),
 mk('Le théorème central limite affirme que…','La moyenne d\'un grand échantillon suit approximativement une loi normale','Toute variable est normale','La médiane égale la moyenne','La variance est nulle à l\'infini',
   'Quel que soit (sous conditions) la loi de départ, la distribution des moyennes d\'échantillons tend vers une loi normale quand n augmente.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9or%C3%A8me_central_limite'),
 mk('Un intervalle de confiance à 95 % signifie que…','Sur de nombreux échantillons, 95 % des intervalles contiennent le vrai paramètre','Le paramètre a 95 % de chance d\'être exact','L\'échantillon est fiable à 95 %','L\'erreur est de 5 unités',
   'L\'interprétation est fréquentiste : c\'est la procédure qui, répétée, capture le paramètre 95 fois sur 100.',
   'https://fr.wikipedia.org/wiki/Intervalle_de_confiance'),
 mk('Le mode d\'une série statistique est…','La valeur la plus fréquente','La valeur centrale','La moyenne','L\'étendue',
   'Le mode maximise l\'effectif ; une série peut être unimodale, bimodale ou plurimodale.',
   'https://fr.wikipedia.org/wiki/Mode_(statistiques)'),
 mk('Un échantillon aléatoire simple garantit que…','Chaque individu de la population a la même probabilité d\'être tiré','Les plus riches sont surreprésentés','L\'ordre alphabétique est respecté','Seuls les volontaires participent',
   'L\'équiprobabilité des tirages fonde l\'inférence statistique ; les échantillons non probabilistes exposent aux biais de sélection.',
   'https://fr.wikipedia.org/wiki/%C3%89chantillonnage_(statistiques)'),
] .forEach(x => stat.push(x));

// =====================================================================
// MONNAIE, FINANCE & BUDGET (+31 → 40)
// =====================================================================
const mon = [];
// Intérêts simples
[[100000,10,1,10000],[200000,5,2,20000],[500000,8,1,40000],[1000000,6,3,180000],[300000,10,2,60000],[750000,4,1,30000],[400000,12,1,48000],[600000,5,4,120000]]
.forEach(([c, t, n, i]) => mon.push(mk(
  `Un placement de ${F(c)} FCFA au taux d'intérêt simple de ${t} % par an rapporte, après ${n} an(s), un intérêt de :`,
  `${F(i)} FCFA`, `${F(i*2)} FCFA`, `${F(Math.round(i/2))} FCFA`, `${F(c)} FCFA`,
  `Intérêt simple = C × t × n = ${F(c)} × ${t}% × ${n} = ${F(i)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Int%C3%A9r%C3%AAt_simple')));
// Concepts rédigés
[
 mk('L\'institut d\'émission de la monnaie dans l\'UEMOA est…','La BCEAO','La BOAD','Le FMI','La Banque de France',
   'La Banque Centrale des États de l\'Afrique de l\'Ouest émet le franc CFA (XOF) et conduit la politique monétaire commune des 8 États de l\'UEMOA.',
   'https://fr.wikipedia.org/wiki/Banque_centrale_des_%C3%89tats_de_l%27Afrique_de_l%27Ouest'),
 mk('L\'inflation se définit comme…','Une hausse durable et généralisée du niveau des prix','Une baisse des prix','Une hausse du chômage','Une dévaluation monétaire',
   'Mesurée par l\'indice des prix à la consommation, l\'inflation érode le pouvoir d\'achat ; l\'UEMOA vise un taux ≤ 3 %.',
   'https://fr.wikipedia.org/wiki/Inflation'),
 mk('La politique monétaire restrictive consiste à…','Relever les taux directeurs pour freiner la demande et l\'inflation','Baisser les taux','Imprimer davantage de billets','Augmenter les dépenses publiques',
   'En augmentant le coût du crédit, la banque centrale ralentit la demande globale et contient les tensions inflationnistes.',
   'https://fr.wikipedia.org/wiki/Politique_mon%C3%A9taire'),
 mk('Le déficit budgétaire apparaît quand…','Les dépenses de l\'État dépassent ses recettes','Les recettes dépassent les dépenses','La dette est nulle','L\'inflation est négative',
   'Le déficit est financé par l\'emprunt, accroissant la dette publique ; l\'UEMOA plafonne le déficit à 3 % du PIB.',
   'https://fr.wikipedia.org/wiki/D%C3%A9ficit_public'),
 mk('Les agrégats monétaires (M1, M2, M3) classent la monnaie selon…','Son degré de liquidité','La nationalité des détenteurs','L\'âge des billets','Le taux d\'intérêt',
   'M1 = monnaie la plus liquide (pièces, billets, dépôts à vue) ; M2 ajoute l\'épargne à court terme ; M3 les placements moins liquides.',
   'https://fr.wikipedia.org/wiki/Agr%C3%A9gat_mon%C3%A9taire'),
 mk('Le taux de change fixe du FCFA est arrimé…','À l\'euro (parité fixe garantie par le Trésor français)','Au dollar américain','À l\'or','Au yuan',
   'Depuis 1999, 1 € = 655,957 FCFA ; la parité fixe assure la stabilité mais lie la zone à la politique monétaire européenne.',
   'https://fr.wikipedia.org/wiki/Franc_CFA'),
 mk('La création monétaire par les banques commerciales résulte…','De l\'octroi de crédits (« les crédits font les dépôts »)','De l\'impression de billets','Des impôts','Des exportations',
   'En accordant un prêt, la banque crédite un compte : elle crée de la monnaie scripturale, dans les limites de la réglementation prudentielle et de la banque centrale.',
   'https://fr.wikipedia.org/wiki/Cr%C3%A9ation_mon%C3%A9taire'),
 mk('Le seigneuriage désigne…','Le revenu que tire l\'émetteur de la création monétaire','Un impôt foncier','Le salaire des banquiers','Une taxe douanière',
   'Historiquement le gain du souverain frappant monnaie ; aujourd\'hui, la différence entre la valeur faciale et le coût de production/gestion de la monnaie.',
   'https://fr.wikipedia.org/wiki/Seigneuriage'),
 mk('Une obligation est…','Un titre de créance rémunéré par un coupon','Une part de propriété d\'une société','Un compte courant','Une assurance-vie',
   'L\'obligataire prête à l\'émetteur (État, entreprise) et perçoit des intérêts (coupons) ; à l\'échéance, le principal est remboursé.',
   'https://fr.wikipedia.org/wiki/Obligation_(finance)'),
 mk('Le rôle de prêteur en dernier ressort est assuré par…','La banque centrale','Le Trésor communal','Les assurances','La bourse',
   'En cas de crise de liquidité, la banque centrale refinance les banques solvables pour éviter la panique et la contagion systémique.',
   'https://fr.wikipedia.org/wiki/Pr%C3%AAteur_en_dernier_ressort'),
 mk('Le budget de l\'État est voté par…','Le Parlement (loi de finances)','La banque centrale','Le patronat','Les communes seules',
   'Le principe du consentement à l\'impôt confie au Parlement l\'autorisation annuelle des recettes et dépenses via la loi de finances.',
   'https://fr.wikipedia.org/wiki/Loi_de_finances'),
] .forEach(x => mon.push(x));

// =====================================================================
// MARCHÉS FINANCIERS UEMOA / BRVM (+85 → paramétrique + rédigé, 88)
// =====================================================================
const mf = [];
[
 mk('La BRVM est la bourse régionale commune de…','L\'UEMOA (8 pays d\'Afrique de l\'Ouest)','La seule Côte d\'Ivoire','La CEMAC','Toute l\'Afrique',
   'La Bourse Régionale des Valeurs Mobilières, basée à Abidjan et opérationnelle depuis 1998, sert les 8 États de l\'UEMOA.',
   'https://fr.wikipedia.org/wiki/Bourse_r%C3%A9gionale_des_valeurs_mobili%C3%A8res'),
 mk('Où est situé le siège de la BRVM ?','Abidjan (Côte d\'Ivoire)','Lomé','Dakar','Ouagadougou',
   'Le siège est à Abidjan ; des Antennes Nationales de Bourse existent dans chaque État membre pour relayer l\'activité.',
   'https://fr.wikipedia.org/wiki/Bourse_r%C3%A9gionale_des_valeurs_mobili%C3%A8res'),
 mk('Le régulateur du marché financier régional de l\'UEMOA est…','Le CREPMF','La BCEAO','La COSUMAF','L\'AMF française',
   'Le Conseil Régional de l\'Épargne Publique et des Marchés Financiers agrée les acteurs, protège l\'épargne et sanctionne les abus.',
   'https://fr.wikipedia.org/wiki/Conseil_r%C3%A9gional_de_l%27%C3%A9pargne_publique_et_des_march%C3%A9s_financiers'),
 mk('L\'indice phare des plus grandes capitalisations de la BRVM est…','Le BRVM 30','Le CAC 40','Le BEL 20','Le Nikkei',
   'Le BRVM 30 (ex-BRVM 10) regroupe les sociétés les plus liquides ; le BRVM Composite couvre toutes les valeurs cotées.',
   'https://fr.wikipedia.org/wiki/Bourse_r%C3%A9gionale_des_valeurs_mobili%C3%A8res'),
 mk('Une action confère à son détenteur…','Un droit de propriété et un droit au dividende','Une créance à taux fixe','Une garantie de capital','Un compte d\'épargne rémunéré',
   'L\'actionnaire est copropriétaire : il vote en assemblée et perçoit un dividende variable ; il supporte le risque en dernier rang.',
   'https://fr.wikipedia.org/wiki/Action_(finance)'),
 mk('La capitalisation boursière d\'une société se calcule par…','Cours de l\'action × nombre d\'actions','Cours × dividende','Bénéfice × 10','Actif − passif',
   'Elle mesure la valeur de marché des capitaux propres ; c\'est le critère de pondération des indices comme le BRVM 30.',
   'https://fr.wikipedia.org/wiki/Capitalisation_boursi%C3%A8re'),
 mk('Le marché primaire correspond…','À l\'émission de titres neufs (introduction, augmentation de capital)','À la revente entre investisseurs','Au marché des changes','Au crédit bancaire',
   'Sur le primaire, l\'émetteur lève des fonds ; le secondaire assure ensuite la liquidité par l\'échange des titres existants.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_primaire'),
 mk('Un SGI (Société de Gestion et d\'Intermédiation) sert à…','Exécuter les ordres de bourse pour le compte des investisseurs','Émettre la monnaie','Fixer les impôts','Contrôler les banques',
   'Les SGI sont les intermédiaires agréés (membres de la BRVM) qui reçoivent, transmettent et exécutent les ordres et conservent les titres.',
   'https://fr.wikipedia.org/wiki/Soci%C3%A9t%C3%A9_de_bourse'),
] .forEach(x => mf.push(x));
// PER = cours / BPA (paramétrique)
[[5000,500,10],[8000,400,20],[3000,200,15],[12000,1000,12],[6000,750,8],[9000,300,30],[4500,450,10],[15000,600,25]]
.forEach(([cours, bpa, per]) => mf.push(mk(
  `Une action cote ${F(cours)} FCFA et son bénéfice par action (BPA) est de ${F(bpa)} FCFA. Son PER (price earning ratio) vaut :`,
  `${per}`, `${per*2}`, `${Math.round(per/2)}`, `${per+5}`,
  `PER = cours ÷ BPA = ${F(cours)} ÷ ${F(bpa)} = ${per}. Un PER élevé traduit des anticipations de croissance ou une survalorisation.`,
  'https://fr.wikipedia.org/wiki/Price_earning_ratio')));
// Rendement dividende (paramétrique)
[[300,6000,5],[400,8000,5],[500,5000,10],[250,10000,2.5],[600,6000,10],[200,4000,5],[750,15000,5],[1000,20000,5]]
.forEach(([div, cours, rdt]) => mf.push(mk(
  `Une action distribue un dividende de ${F(div)} FCFA et cote ${F(cours)} FCFA. Son rendement (dividende / cours) est de :`,
  `${String(rdt).replace('.', ',')} %`, `${String(rdt*2).replace('.', ',')} %`, `${String(rdt/2).replace('.', ',')} %`, `${String(rdt+3).replace('.', ',')} %`,
  `Rendement = dividende ÷ cours = ${F(div)} ÷ ${F(cours)} = ${String(rdt).replace('.', ',')} %.`,
  'https://fr.wikipedia.org/wiki/Rendement_(finance)')));
// Plus-value (paramétrique)
[[5000,7000,40],[3000,3600,20],[8000,10000,25],[10000,9000,-10],[4000,5000,25],[6000,4800,-20],[2500,3000,20],[12000,15000,25]]
.forEach(([achat, vente, pct]) => mf.push(mk(
  `Un investisseur achète une action à ${F(achat)} FCFA et la revend à ${F(vente)} FCFA. Sa plus (ou moins) value relative est de :`,
  `${pct} %`, `${pct+10} %`, `${Math.round(pct/2)} %`, `${-pct} %`,
  `Variation = (${F(vente)} − ${F(achat)}) ÷ ${F(achat)} = ${pct} % ${pct<0?'(moins-value)':'(plus-value)'}.`,
  'https://fr.wikipedia.org/wiki/Plus-value')));
// Coupon obligataire (paramétrique)
[[1000000,6,60000],[500000,8,40000],[2000000,5,100000],[1500000,10,150000],[800000,7,56000],[1200000,5,60000],[3000000,6,180000],[600000,9,54000]]
.forEach(([nom, tx, cp]) => mf.push(mk(
  `Une obligation de valeur nominale ${F(nom)} FCFA porte un coupon annuel de ${tx} %. Montant du coupon versé chaque année :`,
  `${F(cp)} FCFA`, `${F(cp*2)} FCFA`, `${F(Math.round(cp/2))} FCFA`, `${F(nom)} FCFA`,
  `Coupon = taux nominal × valeur nominale = ${tx} % × ${F(nom)} = ${F(cp)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Coupon_(finance)')));
// Concepts rédigés supplémentaires
[
 mk('La diversification d\'un portefeuille permet…','De réduire le risque spécifique sans sacrifier le rendement attendu','D\'éliminer tout risque','De garantir un gain','D\'échapper aux impôts',
   '« Ne pas mettre tous ses œufs dans le même panier » : combiner des actifs peu corrélés réduit la variance globale (Markowitz).',
   'https://fr.wikipedia.org/wiki/Diversification_(finance)'),
 mk('Le risque systématique (de marché) est…','Non diversifiable, lié à l\'ensemble du marché','Propre à une seule entreprise','Toujours nul','Supprimé par la diversification',
   'Le bêta mesure la sensibilité d\'un titre au marché ; le risque systématique subsiste même dans un portefeuille bien diversifié.',
   'https://fr.wikipedia.org/wiki/Risque_de_march%C3%A9'),
 mk('Le compartiment obligataire de la BRVM accueille notamment…','Les emprunts obligataires des États et des entreprises','Uniquement des actions','Les devises','Les matières premières',
   'Les États de l\'UEMOA et les grandes entreprises y lèvent des ressources longues, complétant les émissions de titres publics par adjudication.',
   'https://fr.wikipedia.org/wiki/Obligation_(finance)'),
 mk('Le dépositaire central / banque de règlement (DC/BR) de la BRVM assure…','La conservation des titres et le règlement-livraison des transactions','La fixation des cours','La publicité des sociétés','Le paiement des salaires',
   'Le DC/BR garantit la bonne fin des opérations (livraison des titres contre paiement) et la tenue des comptes-titres.',
   'https://fr.wikipedia.org/wiki/D%C3%A9positaire_central'),
] .forEach(x => mf.push(x));

module.exports = { D, mk, packify, F, stat, mon, mf };
