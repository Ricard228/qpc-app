// =====================================================================
// data_extra_v235b.js — v2.35 (2/2) : 9 domaines restants
//   HPE, ML, BRVM, Micro, Macro, Stats, IA, Économie agricole, S&E.
// Même structure : 2 packs M2 (PTS 1→6) + 2 packs M3 (buzz) par domaine
// + compléments M1 jusqu'à ≥ 200 questions par domaine.
// =====================================================================

const { F, D } = require('./data_extra_v230b.js');
const { IA_NAME } = require('./data_extra_v230f.js');
const { mkq, defQs, defQsInv, chunkM1, packM2, packM3, dedupePacks } = require('./data_extra_v235a.js');

const M1 = [], M2 = [], M3 = [];
function buildDomain(domain, theme, ref, bank, m1Numeric, m1DefCount) {
  M3.push(packM3(domain, theme, `${domain.split(' ')[0]} — Finale v35 A`, defQs(bank, ref, 0, 9)));
  M3.push(packM3(domain, theme, `${domain.split(' ')[0]} — Finale v35 B`, defQs(bank, ref, 9, 9)));
  M2.push(packM2(domain, theme, `${domain.split(' ')[0]} — Face-à-face v35 A`, defQs(bank, ref, 18, 6)));
  M2.push(packM2(domain, theme, `${domain.split(' ')[0]} — Face-à-face v35 B`, defQs(bank, ref, 24, 6)));
  const flat = [...m1Numeric, ...defQsInv(bank, ref, 30, m1DefCount)];
  M1.push(...chunkM1(domain, theme, `${theme} — Consolidation v35`, flat));
}

// =====================================================================
// 10. HISTOIRE DE LA PENSÉE ÉCONOMIQUE  (143 → +58 = 201)
// =====================================================================
const HPE_BANK = [
 ['Le laissez-faire', 'la doctrine prônant la non-intervention de l\'État dans l\'économie'],
 ['La valeur-travail', 'la théorie fondant la valeur des biens sur le travail incorporé'],
 ['L\'utilité marginale', 'la satisfaction procurée par la dernière unité consommée'],
 ['La rente différentielle', 'le revenu tiré des terres plus fertiles que la terre marginale'],
 ['L\'état stationnaire', 'la situation où l\'accumulation cesse et l\'économie se reproduit à l\'identique'],
 ['La demande effective', 'le niveau de demande anticipée qui détermine production et emploi chez Keynes'],
 ['La préférence pour la liquidité', 'la propension à détenir la richesse sous forme de monnaie'],
 ['L\'animal spirits', 'l\'élan spontané des entrepreneurs guidant l\'investissement chez Keynes'],
 ['L\'épargne forcée', 'la réduction de consommation imposée par l\'inflation ou la contrainte'],
 ['Le taux naturel de chômage', 'le chômage d\'équilibre vers lequel l\'économie revient à long terme'],
 ['Les anticipations adaptatives', 'la formation des prévisions par correction progressive des erreurs passées'],
 ['Les anticipations rationnelles', 'la formation des prévisions utilisant toute l\'information disponible'],
 ['La critique de Lucas', 'l\'idée que les paramètres des modèles changent avec les politiques menées'],
 ['L\'incohérence temporelle', 'la tentation de renier ex post une politique annoncée ex ante'],
 ['La crédibilité monétaire', 'la confiance des agents dans l\'engagement anti-inflationniste de la banque centrale'],
 ['Le cycle réel', 'la théorie attribuant les fluctuations aux chocs de productivité'],
 ['La rigidité nominale', 'la lenteur d\'ajustement des prix et salaires qui rend la monnaie non neutre'],
 ['Le salaire d\'efficience', 'le salaire supérieur au marché versé pour stimuler la productivité'],
 ['La théorie des contrats implicites', 'l\'explication de la stabilité des salaires par une assurance informelle employeur-salarié'],
 ['L\'hystérèse', 'la persistance d\'un choc temporaire dans les variables réelles comme le chômage'],
 ['Le capital patient', 'le financement de long terme accepté par des investisseurs peu pressés'],
 ['L\'accélérateur', 'le mécanisme reliant l\'investissement aux variations de la demande'],
 ['La stagnation séculaire', 'l\'hypothèse d\'une croissance durablement faible par insuffisance de demande'],
 ['La financiarisation', 'la place croissante de la finance dans l\'économie et les entreprises'],
 ['L\'école de la régulation', 'l\'analyse des configurations institutionnelles qui stabilisent l\'accumulation'],
 ['Le fordisme', 'le régime associant production de masse, gains de productivité et hausse des salaires'],
 ['L\'économie des conventions', 'l\'analyse des règles partagées qui coordonnent les comportements'],
 ['Le marché contestable', 'le marché discipliné par la seule menace d\'entrée de concurrents'],
 ['La concurrence monopolistique', 'la structure où de nombreux offreurs vendent des produits différenciés'],
 ['L\'économie du développement', 'la branche étudiant la sortie de la pauvreté des nations'],
 ['Le big push', 'la théorie de l\'impulsion coordonnée d\'investissements pour amorcer le développement'],
 ['Les étapes de la croissance', 'le schéma de Rostow décrivant le décollage des économies'],
 ['Le dualisme économique', 'la coexistence d\'un secteur moderne et d\'un secteur traditionnel'],
 ['L\'échange inégal', 'la thèse d\'un transfert de valeur des périphéries vers le centre'],
];
const HPE_REF = 'https://fr.wikipedia.org/wiki/Histoire_de_la_pens%C3%A9e_%C3%A9conomique';
const hpeNum = [];
[['La Richesse des nations',1776,'Adam Smith'],['le Tableau économique',1758,'François Quesnay'],
 ['Des principes de l\'économie politique et de l\'impôt',1817,'David Ricardo'],['Le Capital (livre I)',1867,'Karl Marx'],
 ['la Théorie générale',1936,'John Maynard Keynes'],['Capitalisme, socialisme et démocratie',1942,'Joseph Schumpeter'],
 ['La Grande Transformation',1944,'Karl Polanyi'],['la Route de la servitude',1944,'Friedrich Hayek'],
 ['Capitalisme et liberté',1962,'Milton Friedman'],['la Théorie de la justice',1971,'John Rawls'],
 ['Development as Freedom',1999,'Amartya Sen'],['Repenser la pauvreté',2011,'Esther Duflo et Abhijit Banerjee']]
.forEach(([oeuvre, an, aut], i) => hpeNum.push(mkq(
  `En quelle année a été publié « ${oeuvre.charAt(0).toUpperCase()+oeuvre.slice(1)} » ?`,
  String(an), String(an-13), String(an+9), String(an-27),
  `« ${oeuvre} » (${aut}) est paru en ${an}.`,
  HPE_REF)));
buildDomain(D.HPE, 'Auteurs et doctrines', HPE_REF, HPE_BANK, hpeNum, 16);

// =====================================================================
// 11. MACHINE LEARNING  (143 → +58 = 201)
// =====================================================================
const ML_BANK = [
 ['Le jeu de validation', 'le sous-ensemble servant à régler les hyperparamètres sans toucher au test'],
 ['La stratification', 'le découpage qui préserve la proportion des classes dans chaque sous-ensemble'],
 ['L\'augmentation de données', 'la création d\'exemples supplémentaires par transformations des données existantes'],
 ['L\'encodage one-hot', 'la représentation d\'une catégorie par un vecteur binaire à une seule position active'],
 ['La fuite de cible', 'l\'utilisation involontaire d\'informations issues de la variable à prédire'],
 ['Le grid search', 'l\'exploration systématique d\'une grille d\'hyperparamètres'],
 ['La recherche bayésienne', 'l\'optimisation des hyperparamètres guidée par un modèle probabiliste'],
 ['Le learning rate', 'le pas d\'apprentissage qui règle l\'amplitude des mises à jour du gradient'],
 ['Le warmup', 'la montée progressive du taux d\'apprentissage en début d\'entraînement'],
 ['Le gradient clipping', 'l\'écrêtage des gradients pour éviter leur explosion'],
 ['Le checkpoint', 'la sauvegarde intermédiaire des poids pendant l\'entraînement'],
 ['L\'inférence par lots', 'le traitement groupé des prédictions pour optimiser le débit'],
 ['La latence', 'le délai entre la requête et la réponse d\'un modèle en production'],
 ['Le débit', 'le nombre de prédictions servies par unité de temps'],
 ['Le A/B test', 'la comparaison en production de deux versions sur des utilisateurs réels'],
 ['Le shadow deployment', 'l\'exécution en parallèle d\'un nouveau modèle sans exposer ses sorties'],
 ['Le feature store', 'le référentiel centralisé des variables prêtes pour l\'entraînement et l\'inférence'],
 ['Le versionnage de modèle', 'la traçabilité des versions successives d\'un modèle et de leurs données'],
 ['La reproductibilité', 'la capacité à reproduire exactement un résultat d\'entraînement'],
 ['La courbe d\'apprentissage', 'le graphique des performances selon la taille du jeu d\'entraînement'],
 ['Le sous-apprentissage', 'l\'incapacité d\'un modèle trop simple à capter la structure des données'],
 ['La malédiction des étiquettes bruitées', 'la dégradation causée par des annotations erronées'],
 ['L\'annotation', 'l\'étiquetage manuel des données pour l\'apprentissage supervisé'],
 ['L\'accord inter-annotateurs', 'la mesure de cohérence entre plusieurs étiqueteurs'],
 ['L\'apprentissage semi-supervisé', 'l\'entraînement combinant peu d\'exemples étiquetés et beaucoup de non étiquetés'],
 ['L\'apprentissage auto-supervisé', 'l\'apprentissage de représentations à partir de tâches prétextes sans étiquettes'],
 ['L\'apprentissage actif', 'la sélection intelligente des exemples à annoter en priorité'],
 ['L\'apprentissage fédéré', 'l\'entraînement distribué sans centraliser les données brutes'],
 ['La confidentialité différentielle', 'la garantie mathématique limitant la fuite d\'informations individuelles'],
 ['L\'équité algorithmique', 'l\'exigence de performances comparables entre groupes protégés'],
 ['La carte de saillance', 'la visualisation des zones d\'une entrée qui influencent la prédiction'],
 ['L\'ablation', 'l\'étude mesurant l\'apport de chaque composant en le retirant'],
 ['La calibration', 'l\'accord entre probabilités prédites et fréquences réellement observées'],
 ['Le score de Brier', 'la mesure de qualité des probabilités prédites'],
];
const ML_REF = 'https://fr.wikipedia.org/wiki/Apprentissage_automatique';
const mlNum = [];
[[10000,64,157],[50000,128,391],[20000,32,625],[8000,16,500],[60000,256,235],[12000,64,188],[32000,128,250],[24000,32,750]]
.forEach(([n, b, it]) => mlNum.push(mkq(
  `Un jeu de ${F(n)} exemples est entraîné par mini-lots de ${b}. Nombre d'itérations par époque (arrondi) :`,
  `${F(it)}`, `${F(it*2)}`, `${F(b)}`, `${F(Math.round(it/2))}`,
  `Itérations = n ÷ batch = ${F(n)} ÷ ${b} ≈ ${F(it)} mises à jour par époque.`,
  'https://fr.wikipedia.org/wiki/Descente_de_gradient_stochastique')));
[[95,90,5],[88,80,8],[97,85,12],[92,88,4],[99,93,6],[85,70,15],[91,84,7],[96,90,6]]
.forEach(([train, test, gap]) => mlNum.push(mkq(
  `Exactitude : ${train} % en entraînement, ${test} % en test. L'écart de généralisation est de :`,
  `${gap} points`, `${gap*2} points`, `${train} points`, `${Math.max(1,Math.round(gap/2))} points`,
  `Écart = ${train} − ${test} = ${gap} points ; un écart important signale un surapprentissage à corriger (régularisation, données).`,
  'https://fr.wikipedia.org/wiki/Surapprentissage')));
buildDomain(D.ML, 'Apprentissage automatique', ML_REF, ML_BANK, mlNum, 12);

// =====================================================================
// 12. MARCHÉS FINANCIERS BRVM  (143 → +58 = 201)
// =====================================================================
const MF_BANK = [
 ['Le carnet d\'ordres', 'le registre électronique confrontant les ordres d\'achat et de vente'],
 ['Le fixing', 'la cotation par confrontation périodique des ordres à heure fixe'],
 ['La cotation en continu', 'l\'exécution des ordres au fil de leur arrivée pendant la séance'],
 ['L\'ordre à cours limité', 'l\'ordre fixant un prix maximal d\'achat ou minimal de vente'],
 ['L\'ordre au marché', 'l\'ordre exécuté immédiatement au meilleur prix disponible'],
 ['La fourchette de cotation', 'l\'écart entre le meilleur prix acheteur et le meilleur prix vendeur'],
 ['La profondeur du marché', 'le volume d\'ordres disponible aux différents niveaux de prix'],
 ['La volatilité', 'l\'ampleur des variations de prix d\'un actif'],
 ['Le flottant', 'la part du capital réellement disponible aux échanges en bourse'],
 ['Le fractionnement d\'actions', 'la division du nominal qui multiplie le nombre de titres'],
 ['Le dividende exceptionnel', 'la distribution ponctuelle hors politique habituelle'],
 ['Le détachement du dividende', 'la date à partir de laquelle l\'action se négocie sans le dividende'],
 ['L\'augmentation de capital', 'l\'émission d\'actions nouvelles pour lever des fonds propres'],
 ['Le droit préférentiel de souscription', 'le droit des anciens actionnaires de souscrire en priorité'],
 ['Le placement privé', 'la levée de fonds auprès d\'investisseurs qualifiés sans appel public'],
 ['La note d\'information', 'le document visé par le régulateur présentant une émission au public'],
 ['Le prospectus', 'le document détaillé exigé pour l\'appel public à l\'épargne'],
 ['Le teneur de marché', 'l\'intermédiaire qui affiche en permanence des prix acheteur et vendeur'],
 ['Le règlement-livraison', 'le dénouement simultané du paiement et du transfert des titres'],
 ['Le délai de dénouement', 'le nombre de jours entre la négociation et le règlement effectif'],
 ['La conservation des titres', 'la garde comptable des valeurs mobilières pour les clients'],
 ['Le compte-titres', 'le compte enregistrant les valeurs mobilières d\'un investisseur'],
 ['Le délit d\'initié', 'l\'utilisation d\'une information privilégiée pour intervenir sur un titre'],
 ['La manipulation de cours', 'l\'intervention destinée à fausser artificiellement les prix'],
 ['La suspension de cotation', 'l\'arrêt temporaire des échanges dans l\'attente d\'une information'],
 ['L\'obligation verte', 'le titre de dette finançant exclusivement des projets environnementaux'],
 ['Le sukuk', 'le titre financier conforme aux principes de la finance islamique'],
 ['L\'emprunt obligataire par appel public', 'la levée de dette ouverte à tous les épargnants de la zone'],
 ['La courbe des rendements souverains', 'la structure des taux des titres publics selon leur maturité'],
 ['La décote', 'l\'écart négatif entre le prix de marché et la valeur théorique d\'un titre'],
 ['La surcote', 'l\'écart positif entre le prix payé et la valeur nominale d\'une obligation'],
 ['Le rendement à l\'échéance', 'le taux actuariel égalisant prix d\'achat et flux futurs d\'une obligation'],
 ['Le risque de réinvestissement', 'l\'incertitude sur le taux auquel les coupons seront replacés'],
 ['La capitalisation flottante', 'la capitalisation calculée sur le seul flottant des sociétés'],
];
const MF_REF = 'https://fr.wikipedia.org/wiki/Bourse_r%C3%A9gionale_des_valeurs_mobili%C3%A8res';
const mfNum = [];
[[10000,9500,-5],[4500,4950,10],[7200,7920,10],[12000,11400,-5],[3000,3450,15],[8000,7200,-10],[5500,6050,10],[15000,13500,-10]]
.forEach(([a, b, v]) => mfNum.push(mkq(
  `Une action ouvre à ${F(a)} FCFA et clôture à ${F(b)} FCFA. Sa variation en séance est de :`,
  `${v>0?'+':''}${v} %`, `${v>0?'-':'+'}${Math.abs(v)} %`, `${v>0?'+':''}${v*2} %`, `${F(Math.abs(a-b))} points de base`,
  `Variation = (${F(b)} − ${F(a)}) ÷ ${F(a)} = ${v>0?'+':''}${v} %.`,
  MF_REF)));
[[500,10000,5],[300,7500,4],[450,9000,5],[600,8000,7.5],[250,12500,2],[400,5000,8],[350,14000,2.5],[750,15000,5]]
.forEach(([div, cours, rdt]) => mfNum.push(mkq(
  `Dividende annuel de ${F(div)} FCFA pour un cours de ${F(cours)} FCFA. Le taux de rendement de l'action est de :`,
  `${String(rdt).replace('.', ',')} %`, `${String(rdt*2).replace('.', ',')} %`, `${String(Math.max(0.5,rdt/2)).replace('.', ',')} %`, `${F(div)} %`,
  `Rendement = ${F(div)} ÷ ${F(cours)} = ${String(rdt).replace('.', ',')} % — à comparer au rendement des titres publics régionaux.`,
  MF_REF)));
buildDomain(D.MF, 'Bourse régionale', MF_REF, MF_BANK, mfNum, 12);

// =====================================================================
// 13. MICROÉCONOMIE  (144 → +58 = 202)
// =====================================================================
const MICRO_BANK = [
 ['La contrainte budgétaire', 'l\'ensemble des paniers accessibles avec un revenu et des prix donnés'],
 ['La courbe d\'indifférence', 'le lieu des paniers procurant le même niveau de satisfaction'],
 ['Le panier optimal', 'la combinaison de biens qui maximise l\'utilité sous contrainte de revenu'],
 ['Le bien normal', 'le bien dont la demande augmente avec le revenu'],
 ['Le bien de luxe', 'le bien dont la part dans le budget croît plus vite que le revenu'],
 ['Les biens substituables', 'les biens dont l\'un peut remplacer l\'autre dans la consommation'],
 ['Les biens complémentaires', 'les biens consommés conjointement, comme le véhicule et le carburant'],
 ['L\'élasticité croisée', 'la sensibilité de la demande d\'un bien au prix d\'un autre bien'],
 ['L\'élasticité-revenu', 'la sensibilité de la demande aux variations du revenu'],
 ['La demande inélastique', 'la demande qui varie proportionnellement moins que le prix'],
 ['La recette marginale', 'le supplément de recette procuré par la dernière unité vendue'],
 ['Le coût fixe', 'la charge indépendante du volume produit à court terme'],
 ['Le coût variable', 'la charge qui évolue avec les quantités produites'],
 ['Le coût irrécupérable', 'la dépense engagée définitivement qui ne doit plus influencer les décisions'],
 ['Le seuil de fermeture', 'le prix en dessous duquel l\'entreprise arrête de produire à court terme'],
 ['L\'économie d\'échelle', 'la baisse du coût moyen quand la production augmente'],
 ['La déséconomie d\'échelle', 'la hausse du coût moyen au-delà d\'une certaine taille'],
 ['L\'économie de gamme', 'l\'avantage de coût tiré de la production conjointe de plusieurs biens'],
 ['Le surplus du producteur', 'l\'écart entre le prix reçu et le prix minimal accepté'],
 ['La perte sèche', 'la perte de surplus total causée par une distorsion du marché'],
 ['Le prix plafond', 'le prix maximal légal, source de pénuries s\'il est sous l\'équilibre'],
 ['Le prix plancher', 'le prix minimal légal, source d\'excédents s\'il dépasse l\'équilibre'],
 ['La taxe pigouvienne', 'la taxe corrigeant une externalité négative à hauteur du dommage marginal'],
 ['Le marché de droits', 'l\'échange de permis qui met un prix sur une nuisance plafonnée'],
 ['Le passager clandestin', 'l\'agent qui profite d\'un bien collectif sans contribuer à son financement'],
 ['La tarification au coût marginal', 'la règle d\'efficacité fixant le prix au coût de la dernière unité'],
 ['Le tarif binôme', 'la tarification combinant un abonnement fixe et un prix à l\'unité'],
 ['La vente liée', 'la subordination de l\'achat d\'un bien à celui d\'un autre'],
 ['Le prix prédateur', 'le prix anormalement bas destiné à évincer les concurrents'],
 ['L\'entente', 'l\'accord entre concurrents pour limiter la concurrence'],
 ['L\'abus de position dominante', 'l\'exploitation anticoncurrentielle d\'un pouvoir de marché substantiel'],
 ['La barrière à l\'entrée', 'l\'obstacle qui empêche de nouveaux concurrents d\'entrer sur un marché'],
 ['Le capital réputationnel', 'la valeur de la confiance accumulée auprès des clients et partenaires'],
 ['L\'enchère au second prix', 'l\'enchère où le gagnant paie le montant de la deuxième meilleure offre'],
];
const MICRO_REF = 'https://fr.wikipedia.org/wiki/Micro%C3%A9conomie';
const microNum = [];
[[2000,1200,800,400,400],[3000,1800,1200,700,500],[1500,900,600,350,250],[4000,2600,1400,900,500],[2500,1500,1000,600,400],[1800,1000,800,300,500],[3500,2100,1400,800,600],[2200,1300,900,400,500]]
.forEach(([rt, cv, mcv, cf, prof]) => microNum.push(mkq(
  `Recette totale ${F(rt)} milliers FCFA, coûts variables ${F(cv)}, coûts fixes ${F(cf)}. Le profit est de :`,
  `${F(prof)} milliers FCFA`, `${F(mcv)} milliers FCFA`, `${F(prof*2)} milliers FCFA`, `${F(rt)} milliers FCFA`,
  `Profit = RT − CV − CF = ${F(rt)} − ${F(cv)} − ${F(cf)} = ${F(prof)} milliers FCFA (la MCV de ${F(mcv)} couvre d'abord les fixes).`,
  'https://fr.wikipedia.org/wiki/Profit_(%C3%A9conomie)')));
[[5,10,0.5],[8,4,2],[6,3,2],[10,5,2],[4,16,0.25],[12,6,2],[3,12,0.25],[9,3,3]]
.forEach(([dq, dp, e]) => microNum.push(mkq(
  `La demande d'un bien augmente de ${dq} % quand le prix d'un bien concurrent augmente de ${dp} %. L'élasticité croisée vaut :`,
  `+${String(e).replace('.', ',')}`, `−${String(e).replace('.', ',')}`, `+${String(e*2).replace('.', ',')}`, `${dq}`,
  `Élasticité croisée = ${dq} ÷ ${dp} = +${String(e).replace('.', ',')} : positive, les deux biens sont substituables.`,
  'https://fr.wikipedia.org/wiki/%C3%89lasticit%C3%A9_(%C3%A9conomie)')));
buildDomain(D.MICRO, 'Analyse microéconomique', MICRO_REF, MICRO_BANK, microNum, 12);

// =====================================================================
// 14. MACROÉCONOMIE  (144 → +58 = 202)
// =====================================================================
const MACRO_BANK = [
 ['Le PIB potentiel', 'le niveau de production soutenable sans tensions inflationnistes'],
 ['La croissance potentielle', 'le rythme de croissance permis par les facteurs de production et la productivité'],
 ['La demande globale', 'la somme des dépenses de consommation, d\'investissement, publiques et extérieures nettes'],
 ['L\'offre globale', 'la production totale que les entreprises souhaitent réaliser à chaque niveau de prix'],
 ['La consommation finale', 'la dépense des ménages en biens et services pour satisfaire leurs besoins'],
 ['La formation brute de capital fixe', 'l\'investissement en actifs durables des agents économiques'],
 ['La variation de stocks', 'l\'écart entre production et ventes qui ajuste l\'équilibre comptable'],
 ['Le déflateur du PIB', 'l\'indice de prix implicite couvrant l\'ensemble de la production'],
 ['Le PIB par habitant en parité de pouvoir d\'achat', 'le niveau de vie comparé en corrigeant les différences de prix'],
 ['Le revenu disponible brut', 'le revenu des ménages après impôts et prestations, disponible pour consommer et épargner'],
 ['La propension moyenne à consommer', 'la part du revenu disponible consacrée à la consommation'],
 ['Le taux d\'épargne', 'la part du revenu disponible qui n\'est pas consommée'],
 ['Le taux d\'investissement', 'la part de la FBCF dans le PIB'],
 ['Le taux d\'autofinancement', 'la part de l\'investissement des entreprises couverte par leur épargne'],
 ['Le policy mix', 'la combinaison des politiques budgétaire et monétaire'],
 ['La relance budgétaire', 'le soutien discrétionnaire de la demande par le budget'],
 ['La consolidation budgétaire', 'la réduction délibérée du déficit public'],
 ['L\'austérité', 'la politique de rigueur qui comprime les dépenses publiques et la demande'],
 ['Le multiplicateur budgétaire', 'l\'effet d\'une variation des dépenses publiques sur le PIB'],
 ['La cible d\'inflation', 'l\'objectif chiffré de hausse des prix annoncé par la banque centrale'],
 ['Le canal du crédit', 'la transmission de la politique monétaire par l\'offre de prêts bancaires'],
 ['Le canal du taux de change', 'la transmission de la politique monétaire par la valeur externe de la monnaie'],
 ['L\'assouplissement quantitatif', 'les achats massifs d\'actifs par la banque centrale pour détendre les taux longs'],
 ['Le resserrement monétaire', 'la hausse des taux destinée à freiner l\'inflation'],
 ['Le taux neutre', 'le taux d\'intérêt qui ne stimule ni ne freine l\'activité'],
 ['La boucle prix-salaires', 'l\'entretien mutuel de la hausse des salaires et des prix'],
 ['Les anticipations d\'inflation', 'les prévisions de hausse des prix qui influencent salaires et prix effectifs'],
 ['La désindexation', 'la suppression du lien automatique entre salaires et prix'],
 ['Le chômage conjoncturel', 'le chômage lié à l\'insuffisance temporaire de la demande'],
 ['Le chômage frictionnel', 'le chômage de transition entre deux emplois'],
 ['Le halo du chômage', 'les personnes sans emploi souhaitant travailler mais non comptées comme chômeurs'],
 ['Le taux d\'activité', 'la part des actifs dans la population en âge de travailler'],
 ['La population en âge de travailler', 'la population de quinze à soixante-quatre ans dans les conventions usuelles'],
 ['Le solde structurel', 'le solde public corrigé des effets de la conjoncture'],
];
const MACRO_REF = 'https://fr.wikipedia.org/wiki/Macro%C3%A9conomie';
const macroNum = [];
[[6000,4200,70],[8000,6000,75],[5000,3600,72],[9000,6300,70],[7000,5250,75],[4000,3200,80],[10000,7200,72],[5500,4400,80]]
.forEach(([rd, c, p]) => macroNum.push(mkq(
  `Revenu disponible : ${F(rd)} milliards ; consommation : ${F(c)} milliards. La propension moyenne à consommer est de :`,
  `${p} %`, `${100-p} %`, `${Math.min(99,p+15)} %`, `${Math.max(20,p-20)} %`,
  `PmC = C ÷ RD = ${F(c)} ÷ ${F(rd)} = ${p} % ; le taux d'épargne est donc de ${100-p} %.`,
  'https://fr.wikipedia.org/wiki/Propension_%C3%A0_consommer')));
[[2,300,600],[3,250,750],[2.5,400,1000],[4,150,600],[1.5,600,900],[2,450,900],[3,300,900],[5,120,600]]
.forEach(([k, dg, dy]) => macroNum.push(mkq(
  `Avec un multiplicateur budgétaire de ${String(k).replace('.', ',')}, une hausse de ${F(dg)} milliards des dépenses publiques accroît le PIB de :`,
  `${F(dy)} milliards`, `${F(dg)} milliards`, `${F(dy*2)} milliards`, `${F(Math.round(dy/2))} milliards`,
  `ΔPIB = k × ΔG = ${String(k).replace('.', ',')} × ${F(dg)} = ${F(dy)} milliards.`,
  'https://fr.wikipedia.org/wiki/Multiplicateur_keyn%C3%A9sien')));
buildDomain(D.MACRO, 'Analyse macroéconomique', MACRO_REF, MACRO_BANK, macroNum, 12);

// =====================================================================
// 15. STATISTIQUES & ÉCONOMÉTRIE  (144 → +58 = 202)
// =====================================================================
const STAT_BANK = [
 ['La population statistique', 'l\'ensemble complet des unités sur lesquelles porte l\'étude'],
 ['La base de sondage', 'la liste des unités dans laquelle l\'échantillon est tiré'],
 ['Le sondage stratifié', 'le tirage séparé dans des sous-groupes homogènes de la population'],
 ['Le sondage en grappes', 'le tirage de groupes entiers plutôt que d\'individus isolés'],
 ['Le sondage systématique', 'le tirage d\'une unité à intervalle régulier dans la liste'],
 ['La pondération', 'l\'ajustement des observations pour représenter correctement la population'],
 ['Le redressement', 'la correction de l\'échantillon sur des marges connues de la population'],
 ['La non-réponse', 'l\'absence de réponse d\'unités sélectionnées, source de biais potentiels'],
 ['L\'imputation', 'le remplacement des valeurs manquantes par des valeurs estimées'],
 ['La valeur aberrante', 'l\'observation anormalement éloignée du reste de la distribution'],
 ['L\'étendue', 'l\'écart entre la valeur maximale et la valeur minimale d\'une série'],
 ['L\'écart interquartile', 'la dispersion des cinquante pour cent centraux de la distribution'],
 ['Le coefficient de variation', 'l\'écart type rapporté à la moyenne pour comparer des dispersions'],
 ['L\'asymétrie', 'le degré de déformation d\'une distribution par rapport à la symétrie'],
 ['L\'aplatissement', 'l\'épaisseur des queues d\'une distribution comparée à la loi normale'],
 ['La covariance', 'la mesure de variation conjointe de deux variables'],
 ['Le nuage de points', 'la représentation graphique des couples d\'observations de deux variables'],
 ['La droite des moindres carrés', 'la droite qui minimise la somme des carrés des écarts verticaux'],
 ['Le résidu', 'l\'écart entre la valeur observée et la valeur prédite par le modèle'],
 ['La valeur ajustée', 'la prédiction du modèle pour une observation de l\'échantillon'],
 ['Le coefficient standardisé', 'l\'effet exprimé en écarts types pour comparer les variables'],
 ['La variable muette', 'la variable binaire codant l\'appartenance à une catégorie'],
 ['L\'interaction', 'le terme croisé qui fait dépendre un effet du niveau d\'une autre variable'],
 ['La forme fonctionnelle', 'la spécification mathématique de la relation estimée'],
 ['Le logarithme en économétrie', 'la transformation qui interprète les coefficients en pourcentages'],
 ['L\'autocorrélation', 'la corrélation des erreurs entre observations successives'],
 ['Le test de Durbin-Watson', 'le test classique de l\'autocorrélation d\'ordre un des résidus'],
 ['L\'erreur de mesure', 'l\'écart entre la valeur enregistrée et la vraie valeur de la variable'],
 ['Le biais d\'atténuation', 'la sous-estimation d\'un effet due aux erreurs de mesure sur la variable explicative'],
 ['La variable omise', 'le facteur pertinent absent du modèle qui biaise les coefficients'],
 ['La causalité de Granger', 'la capacité des valeurs passées d\'une série à prédire une autre série'],
 ['La saisonnalité', 'la composante périodique régulière d\'une série chronologique'],
 ['La désaisonnalisation', 'l\'élimination de la composante saisonnière pour lire la tendance'],
 ['La moyenne mobile', 'la moyenne glissante qui lisse les fluctuations d\'une série'],
];
const STAT_REF = 'https://fr.wikipedia.org/wiki/Statistique';
const statNum = [];
[[50,10,20],[80,16,20],[120,30,25],[40,6,15],[200,50,25],[60,9,15],[90,18,20],[150,45,30]]
.forEach(([m, s, cv]) => statNum.push(mkq(
  `Une série a une moyenne de ${m} et un écart type de ${s}. Le coefficient de variation est de :`,
  `${cv} %`, `${cv*2} %`, `${Math.max(2,Math.round(cv/2))} %`, `${s} %`,
  `CV = σ ÷ moyenne = ${s} ÷ ${m} = ${cv} % : il permet de comparer la dispersion de séries d'échelles différentes.`,
  'https://fr.wikipedia.org/wiki/Coefficient_de_variation')));
[[400,20,2],[100,10,4],[2500,50,0.8],[900,30,1.33],[1600,40,1],[625,25,1.6],[6400,80,0.5],[225,15,2.67]]
.forEach(([n, rac, et]) => statNum.push(mkq(
  `Avec un écart type de 40 et un échantillon de ${F(n)} observations, l'erreur type de la moyenne vaut :`,
  `${String(et).replace('.', ',')}`, `${String(+(et*2).toFixed(2)).replace('.', ',')}`, `40`, `${rac}`,
  `Erreur type = 40 ÷ √${F(n)} = 40 ÷ ${rac} = ${String(et).replace('.', ',')}.`,
  'https://fr.wikipedia.org/wiki/Erreur_type')));
buildDomain(D.STAT, 'Méthodes quantitatives', STAT_REF, STAT_BANK, statNum, 12);

// =====================================================================
// 16. IA / LLM  (168 → +34 = 202)
// =====================================================================
const IA_BANK = [
 ['Le pré-prompt système', 'l\'instruction cadre invisible qui fixe le rôle et les règles de l\'assistant'],
 ['La fenêtre glissante', 'la stratégie qui tronque le début de l\'historique quand le contexte déborde'],
 ['Le résumé de conversation', 'la compression de l\'historique en synthèse pour économiser des tokens'],
 ['La génération contrainte', 'le décodage limité par une grammaire ou un schéma imposé'],
 ['Le batching continu', 'le regroupement dynamique des requêtes pour maximiser l\'usage du GPU'],
 ['La parallélisation tensorielle', 'la découpe des matrices d\'un modèle entre plusieurs accélérateurs'],
 ['Le streaming de tokens', 'l\'envoi progressif de la réponse au fur et à mesure de sa génération'],
 ['Le fine-tuning d\'instructions', 'l\'entraînement d\'un modèle à suivre des consignes formulées en langage naturel'],
 ['Le jeu de préférences', 'les paires de réponses classées servant à l\'alignement du modèle'],
 ['Le red teaming', 'les tests offensifs cherchant à provoquer des sorties indésirables'],
 ['Le jailbreak', 'la tentative de contourner les garde-fous d\'un assistant'],
 ['La fuite de prompt', 'la divulgation involontaire des instructions systèmes au travers des réponses'],
 ['Le filtre de sortie', 'le contrôle automatique appliqué aux réponses avant leur affichage'],
 ['Le taux d\'hallucination', 'la fréquence des affirmations non fondées produites par un modèle'],
 ['L\'évaluation par juge', 'la notation automatique des réponses par un autre modèle'],
 ['Le benchmark contaminé', 'le test dont les données ont fuité dans le corpus d\'entraînement'],
 ['La distance d\'édition', 'le nombre minimal d\'opérations pour transformer un texte en un autre'],
 ['La recherche approximative', 'la recherche de voisins proches acceptant une légère perte d\'exactitude'],
 ['Le partitionnement d\'index', 'la découpe d\'une base vectorielle pour accélérer les requêtes'],
 ['La normalisation des vecteurs', 'la mise à norme unitaire des embeddings avant comparaison'],
 ['La température nulle', 'le décodage déterministe qui choisit toujours le token le plus probable'],
 ['La pénalité de répétition', 'le malus appliqué aux tokens déjà générés pour éviter les boucles'],
 ['Le contexte long', 'la capacité de traiter des documents de très grande taille en une requête'],
 ['La mémoire épisodique d\'agent', 'le stockage des événements passés réutilisables entre sessions'],
 ['L\'outillage sandboxé', 'l\'exécution des actions de l\'agent dans un environnement isolé'],
 ['La télémétrie de production', 'la collecte des métriques d\'usage et de qualité en exploitation'],
 ['Le coût par requête', 'la dépense moyenne engendrée par un appel au modèle'],
 ['Le cache de réponses', 'la réutilisation des réponses déjà calculées pour des requêtes identiques'],
 ['Le fallback de modèle', 'le basculement automatique vers un modèle de secours en cas d\'échec'],
 ['La limite de débit', 'le plafond de requêtes par période imposé par une API'],
 ['Le jeton de fin', 'le token spécial qui marque l\'arrêt de la génération'],
 ['Le vocabulaire du tokenizer', 'l\'ensemble des unités élémentaires connues du modèle'],
 ['La couche d\'embedding', 'la table qui convertit chaque token en vecteur dense'],
 ['La tête de sortie', 'la couche finale qui projette les représentations vers le vocabulaire'],
];
const IA_REF = 'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage';
const iaNum = [];
[[2,15,30],[3,40,120],[1.5,60,90],[5,12,60],[4,25,100],[2.5,48,120],[6,15,90],[8,10,80]]
.forEach(([cts, mreq, cout]) => iaNum.push(mkq(
  `Un assistant coûte ${String(cts).replace('.', ',')} FCFA par requête pour ${F(mreq)} milliers de requêtes mensuelles. Coût mensuel :`,
  `${F(cout)} milliers de FCFA`, `${F(cout*2)} milliers de FCFA`, `${F(mreq)} milliers de FCFA`, `${F(Math.round(cout/2))} milliers de FCFA`,
  `Coût = ${String(cts).replace('.', ',')} × ${F(mreq)} 000 = ${F(cout)} 000 FCFA — le cache et la distillation le réduisent.`,
  IA_REF)));
buildDomain(IA_NAME, 'Intelligence artificielle', IA_REF, IA_BANK, iaNum, 0);
// (0 defQ M1 supplémentaires : 8 numériques → 2 packs M1, total +8 ; 168+12+18+8 = 206 ✓)

// =====================================================================
// 17. ÉCONOMIE AGRICOLE  (180 → +30 = 210)
// =====================================================================
const AGRI_BANK = [
 ['La campagne agricole', 'le cycle annuel de production allant des semis à la commercialisation'],
 ['La soudure', 'la période difficile entre l\'épuisement des stocks et la nouvelle récolte'],
 ['Le calendrier cultural', 'la répartition des opérations agricoles au fil des saisons'],
 ['La jachère', 'le repos temporaire d\'une parcelle pour restaurer sa fertilité'],
 ['L\'assolement', 'la répartition des cultures entre les parcelles d\'une exploitation'],
 ['La rotation culturale', 'la succession organisée des cultures sur une même parcelle'],
 ['La culture attelée', 'le travail du sol utilisant la traction animale'],
 ['Le semis direct', 'l\'implantation de la culture sans labour préalable'],
 ['La densité de semis', 'le nombre de graines ou plants installés par unité de surface'],
 ['Le tallage', 'l\'émission de tiges secondaires par les céréales'],
 ['Le sarclage', 'l\'élimination mécanique des mauvaises herbes'],
 ['Le tuteurage', 'le soutien des plantes grimpantes par des supports'],
 ['La fumure organique', 'l\'apport de matières organiques pour fertiliser le sol'],
 ['L\'engrais de fond', 'la fertilisation apportée avant l\'installation de la culture'],
 ['Le pluviomètre', 'l\'instrument qui mesure les précipitations sur une parcelle'],
 ['Le stress hydrique', 'le manque d\'eau qui limite la croissance des plantes'],
 ['La variété améliorée', 'la semence sélectionnée pour son rendement ou sa résistance'],
 ['La semence certifiée', 'la semence contrôlée garantissant pureté et germination'],
 ['La lutte intégrée', 'la combinaison raisonnée des méthodes de protection des cultures'],
 ['Le seuil d\'intervention', 'le niveau d\'infestation à partir duquel un traitement se justifie'],
 ['La chambre froide', 'l\'équipement de conservation des produits périssables'],
 ['Le magasin de stockage', 'l\'infrastructure de conservation des récoltes en attente de vente'],
 ['Le groupement de producteurs', 'l\'organisation collective des exploitants pour produire ou vendre'],
 ['La coopérative agricole', 'l\'entreprise détenue par les producteurs pour mutualiser leurs opérations'],
 ['L\'interprofession', 'l\'organisation réunissant tous les maillons d\'une filière'],
 ['Le prix bord champ', 'le prix payé au producteur sur le lieu de récolte'],
 ['Le prix plancher garanti', 'le prix minimal assuré aux producteurs par les pouvoirs publics'],
 ['Le conseil agricole', 'l\'accompagnement technique des producteurs par des conseillers'],
 ['Le champ école paysan', 'la parcelle d\'apprentissage collectif par l\'expérimentation'],
 ['La mécanisation', 'l\'introduction de machines dans les opérations agricoles'],
 ['L\'irrigation goutte à goutte', 'l\'apport d\'eau localisé au pied des plantes'],
 ['Le bas-fond', 'la dépression humide valorisable pour le riz et le maraîchage'],
 ['Le périmètre irrigué', 'l\'aménagement hydroagricole desservi par un réseau d\'irrigation'],
 ['La sécurisation foncière', 'la garantie des droits des exploitants sur leurs terres'],
];
const AGRI_REF = 'https://fr.wikipedia.org/wiki/Agriculture';
buildDomain('Économie agricole et agribusiness', 'Économie agricole', AGRI_REF, AGRI_BANK, [], 0);
// +30 : 2 packs M2 (12) + 2 packs M3 (18) → 180 + 30 = 210 ✓

// =====================================================================
// 18. SUIVI-ÉVALUATION  (195 → +30 = 225)
// =====================================================================
const SE_BANK = [
 ['La chaîne de résultats', 'l\'enchaînement des intrants aux impacts en passant par les produits et effets'],
 ['L\'intrant', 'la ressource mobilisée pour mettre en œuvre les activités d\'un projet'],
 ['La cible intermédiaire', 'le jalon chiffré fixé entre la référence et la cible finale'],
 ['La source de vérification', 'le document ou système où l\'indicateur peut être contrôlé'],
 ['La fiche d\'indicateur', 'la définition normalisée précisant calcul, source et fréquence d\'un indicateur'],
 ['Le tableau de bord', 'la synthèse visuelle des indicateurs clés pour le pilotage'],
 ['La revue trimestrielle', 'l\'examen périodique des progrès avec les parties prenantes'],
 ['La mission de supervision', 'la visite de terrain du bailleur pour apprécier l\'exécution'],
 ['L\'aide-mémoire', 'le document consignant constats et recommandations d\'une mission'],
 ['Le plan d\'action', 'la liste datée des mesures correctives à mettre en œuvre'],
 ['Le suivi post-mise en œuvre', 'l\'observation des acquis après la clôture du projet'],
 ['La pérennisation', 'l\'ancrage institutionnel et financier des acquis d\'un projet'],
 ['La stratégie de sortie', 'le plan de transfert des activités avant le retrait du financement'],
 ['La capitalisation', 'la transformation de l\'expérience d\'un projet en connaissances partageables'],
 ['La bonne pratique', 'l\'approche éprouvée méritant d\'être diffusée et répliquée'],
 ['La leçon apprise', 'l\'enseignement tiré des réussites et des échecs d\'une intervention'],
 ['L\'évaluabilité', 'la capacité d\'un programme à être évalué de façon crédible'],
 ['Les termes de référence', 'le cahier des charges qui cadre une mission d\'évaluation'],
 ['Le comité de pilotage', 'l\'instance de gouvernance qui oriente et supervise le projet'],
 ['La cellule d\'exécution', 'l\'équipe opérationnelle chargée de la mise en œuvre quotidienne'],
 ['Le rapport initial', 'le document de cadrage produit au démarrage d\'une mission'],
 ['La restitution', 'la présentation des résultats aux parties prenantes pour validation'],
 ['La réponse managériale', 'la position officielle de la direction sur chaque recommandation'],
 ['Le suivi des recommandations', 'le contrôle de la mise en œuvre effective des suites d\'évaluation'],
 ['L\'évaluation conjointe', 'l\'évaluation menée ensemble par plusieurs partenaires'],
 ['L\'évaluation décentralisée', 'l\'évaluation commanditée par les bureaux opérationnels'],
 ['La méta-évaluation', 'l\'évaluation de la qualité d\'autres évaluations'],
 ['La revue documentaire', 'l\'analyse systématique des documents existants d\'un programme'],
 ['Le groupe de discussion', 'l\'entretien collectif structuré autour de thèmes ciblés'],
 ['L\'étude de cas', 'l\'analyse approfondie d\'une unité pour comprendre les mécanismes'],
 ['Le contrefactuel', 'la situation hypothétique qui serait advenue sans l\'intervention'],
 ['La contribution', 'l\'analyse du rôle plausible d\'une intervention dans un changement observé'],
 ['Le protocole de collecte', 'les règles standardisées d\'administration des outils d\'enquête'],
 ['Le contrôle qualité des données', 'les vérifications garantissant fiabilité et complétude des données'],
];
const SE_REF = 'https://fr.wikipedia.org/wiki/Suivi_et_%C3%A9valuation';
buildDomain('Suivi-évaluation des projets et politiques', 'Méthodes de S&E', SE_REF, SE_BANK, [], 0);
// +30 : 195 + 30 = 225 ✓

dedupePacks([M1, M2, M3]);
module.exports = { m1Packs: M1, m2Packs: M2, m3Packs: M3 };
