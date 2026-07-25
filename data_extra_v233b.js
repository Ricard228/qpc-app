// =====================================================================
// data_extra_v233b.js — v2.33 : +20 questions minimum sur les 16 autres
// domaines intégrés, avec renfort appuyé sur l'économie
// (micro, macro, monnaie/finance, commerce & développement).
// =====================================================================

const { D, mk, packify, F } = require('./data_extra_v230b.js');
const { BTP_NAME } = require('./data_extra_v230f.js');

const out = [];
const pk = (dom, theme, titre, arr) => out.push(...packify(dom, theme, titre, arr));

// ---------------- MICROÉCONOMIE (+24) --------------------------------
const micro = [];
[
 mk('La courbe d\'Engel représente la relation entre…','Le revenu et la quantité consommée d\'un bien','Le prix et la quantité offerte','Le taux d\'intérêt et l\'investissement','Le salaire et l\'emploi',
   'Sa pente révèle la nature du bien : croissante pour un bien normal, décroissante pour un bien inférieur ; la loi d\'Engel note que la part alimentaire baisse quand le revenu augmente.',
   'https://fr.wikipedia.org/wiki/Courbe_d%27Engel'),
 mk('L\'effet de substitution isolé par la décomposition de Hicks maintient constant…','Le niveau d\'utilité','Le revenu nominal','Le prix des deux biens','La quantité totale consommée',
   'Hicks compense le revenu pour rester sur la même courbe d\'indifférence ; Slutsky compense pour garder accessible le panier initial.',
   'https://fr.wikipedia.org/wiki/Effet_de_substitution'),
 mk('En situation d\'aléa moral, l\'asymétrie d\'information porte sur…','Le comportement inobservable après la signature du contrat','La qualité du bien avant l\'échange','Le prix affiché en vitrine','Le nombre de vendeurs',
   'L\'antisélection précède le contrat (qualité cachée, marché des « lemons » d\'Akerlof) ; l\'aléa moral le suit (effort caché) — d\'où franchises et incitations.',
   'https://fr.wikipedia.org/wiki/Al%C3%A9a_moral'),
 mk('La discrimination par les prix du troisième degré consiste à…','Facturer des prix différents à des segments identifiables de clientèle','Offrir le même prix à tous','Vendre à perte systématiquement','Fixer un prix unique mondial',
   'Tarifs étudiants, heures creuses, zones géographiques : le monopoleur segmente selon l\'élasticité, à condition d\'empêcher la revente entre segments.',
   'https://fr.wikipedia.org/wiki/Discrimination_par_les_prix'),
 mk('Le théorème de Coase énonce que, sans coûts de transaction…','Les agents peuvent négocier une solution efficace aux externalités','L\'État doit toujours intervenir','Les externalités disparaissent d\'elles-mêmes','Le marché est nécessairement inefficace',
   'L\'allocation initiale des droits de propriété détermine la répartition des gains, non l\'efficacité. Les coûts de transaction réels limitent la portée pratique du résultat.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9or%C3%A8me_de_Coase'),
 mk('La tragédie des communs décrit la surexploitation…','D\'une ressource rivale mais non excluable','D\'un bien public pur','D\'un monopole naturel','D\'un bien de club payant',
   'Pâturages, pêcheries, nappes : chacun capte le bénéfice privé et socialise le coût. Elinor Ostrom a montré que des institutions locales peuvent l\'éviter.',
   'https://fr.wikipedia.org/wiki/Tragédie_des_biens_communs'),
 mk('Un monopole naturel se caractérise par…','Des coûts moyens décroissants sur toute la plage de demande','Une multitude de petits producteurs','Une demande nulle','L\'absence de coûts fixes',
   'Réseaux d\'eau, d\'électricité, de rail : la duplication serait coûteuse. D\'où la régulation tarifaire (prix au coût marginal avec subvention, ou price cap).',
   'https://fr.wikipedia.org/wiki/Monopole_naturel'),
 mk('Dans le duopole de Cournot, les entreprises se concurrencent par…','Les quantités produites','Les prix affichés','La publicité uniquement','Les délais de livraison',
   'Chaque firme choisit sa quantité en anticipant celle de sa rivale ; l\'équilibre se situe entre monopole et concurrence parfaite. Bertrand raisonne, lui, en prix.',
   'https://fr.wikipedia.org/wiki/Duopole_de_Cournot'),
 mk('L\'indice de Lerner mesure…','Le pouvoir de marché : (P − Cm)/P','La part de marché du leader','L\'élasticité de l\'offre','Le taux de profit comptable',
   'Il vaut 0 en concurrence parfaite (P = Cm) et croît avec le pouvoir de marché ; il est l\'inverse de l\'élasticité-prix de la demande à l\'optimum du monopoleur.',
   'https://fr.wikipedia.org/wiki/Indice_de_Lerner'),
 mk('L\'indice de Herfindahl-Hirschman (HHI) sert à évaluer…','La concentration d\'un marché','Le niveau des prix','Le taux de chômage','L\'inflation sous-jacente',
   'Somme des carrés des parts de marché : au-delà de 2 500 (échelle 0-10 000), le marché est jugé très concentré par les autorités de concurrence.',
   'https://fr.wikipedia.org/wiki/Indice_de_Herfindahl'),
 mk('Un contrat à paiement conditionnel aux résultats répond principalement à…','Un problème d\'agence (aligner l\'agent sur le principal)','Une contrainte de trésorerie','Une obligation fiscale','Une norme comptable',
   'Le principal ne peut observer l\'effort : il rémunère un signal corrélé (résultat), au prix d\'un transfert de risque vers l\'agent.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9orie_de_l%27agence'),
 mk('Le signal au sens de Spence (diplôme) fonctionne parce que…','Son coût est plus faible pour les individus productifs','Il est gratuit pour tous','Il est distribué au hasard','Il est interdit aux entreprises',
   'La condition de séparation exige une corrélation négative entre coût du signal et productivité, ce qui rend l\'imitation non rentable pour les moins productifs.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9orie_du_signal'),
] .forEach(x => micro.push(x));
[[8000,5000,300,900000],[12000,9000,250,750000],[6000,3500,400,1000000],[15000,11000,200,800000],
 [9000,6000,350,1050000],[10000,7500,320,800000],[7000,4000,500,1500000],[20000,16000,150,600000],
 [11000,8000,275,825000],[13000,9500,180,630000],[5000,3000,600,1200000],[16000,12000,220,880000]]
.forEach(([p, cvu, q, marge]) => micro.push(mk(
  `Prix de vente unitaire ${F(p)} FCFA, coût variable unitaire ${F(cvu)} FCFA, ${F(q)} unités vendues. Marge sur coût variable totale :`,
  `${F(marge)} FCFA`, `${F(marge*2)} FCFA`, `${F(p*q)} FCFA`, `${F(Math.round(marge/2))} FCFA`,
  `MCV unitaire = ${F(p)} − ${F(cvu)} = ${F(p-cvu)} FCFA ; × ${F(q)} unités = ${F(marge)} FCFA, montant disponible pour couvrir les charges fixes.`,
  'https://fr.wikipedia.org/wiki/Marge_sur_co%C3%BBt_variable')));
pk(D.MICRO, 'Analyse microéconomique', 'Microéconomie — approfondissement', micro);

// ---------------- MACROÉCONOMIE (+24) --------------------------------
const macro = [];
[
 mk('La règle de Taylor relie le taux directeur…','À l\'écart d\'inflation et à l\'écart de production','Au seul taux de change','Au déficit commercial uniquement','À la masse salariale publique',
   'i = r* + π + a(π − π*) + b(écart de PIB) : elle formalise une réaction systématique de la banque centrale, référence descriptive des politiques monétaires.',
   'https://fr.wikipedia.org/wiki/R%C3%A8gle_de_Taylor'),
 mk('Le triangle d\'incompatibilité de Mundell affirme qu\'un pays ne peut avoir simultanément…','Change fixe, libre circulation des capitaux et politique monétaire autonome','Croissance, emploi et exportations','Impôts, dépenses et dette','Épargne, investissement et consommation',
   'La zone franc illustre le choix : change fixe et convertibilité, donc autonomie monétaire limitée pour la BCEAO.',
   'https://fr.wikipedia.org/wiki/Triangle_d%27incompatibilit%C3%A9'),
 mk('La parité des pouvoirs d\'achat (PPA) postule qu\'à long terme…','Le taux de change égalise le prix d\'un même panier entre pays','Les taux d\'intérêt sont identiques partout','Les salaires convergent immédiatement','Les balances commerciales s\'annulent',
   'Elle fonde les comparaisons de PIB en dollars PPA ; à court terme, elle est démentie par les biens non échangeables et les coûts de transport.',
   'https://fr.wikipedia.org/wiki/Parit%C3%A9_de_pouvoir_d%27achat'),
 mk('Le modèle de croissance de Solow prédit qu\'à long terme la croissance par tête dépend…','Du progrès technique','Du seul taux d\'épargne','De la population uniquement','Du déficit budgétaire',
   'Avec rendements décroissants du capital, l\'économie converge vers un état stationnaire ; seul le progrès technique exogène soutient la croissance par tête.',
   'https://fr.wikipedia.org/wiki/Mod%C3%A8le_de_Solow'),
 mk('La croissance endogène (Romer, Lucas) explique la croissance de long terme par…','L\'accumulation de connaissances et de capital humain à rendements non décroissants','Le hasard des chocs externes','La seule démographie','La dépréciation du capital',
   'R&D, éducation, externalités de connaissance et infrastructures rendent la croissance auto-entretenue et justifient des politiques publiques ciblées.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9orie_de_la_croissance_endog%C3%A8ne'),
 mk('L\'équivalence ricardienne suggère qu\'une baisse d\'impôts financée par la dette…','Peut être neutralisée par une hausse de l\'épargne des ménages','Augmente toujours la consommation','Réduit mécaniquement l\'inflation','Supprime le déficit',
   'Les ménages anticipent les impôts futurs et épargnent le supplément de revenu. En pratique, contraintes de liquidité et myopie en limitent la portée.',
   'https://fr.wikipedia.org/wiki/%C3%89quivalence_ricardienne'),
 mk('Les stabilisateurs automatiques désignent…','Les mécanismes budgétaires qui amortissent le cycle sans décision nouvelle','Les taux directeurs fixés chaque mois','Les subventions exceptionnelles votées en urgence','Le contrôle des prix',
   'En récession, les recettes fiscales baissent et les transferts augmentent : le déficit se creuse automatiquement et soutient la demande.',
   'https://fr.wikipedia.org/wiki/Stabilisateur_automatique'),
 mk('La loi d\'Okun relie…','La variation du chômage à l\'écart de croissance','L\'inflation à la masse monétaire','L\'épargne à l\'investissement','Le déficit à la dette',
   'Empiriquement, une croissance supérieure au potentiel fait reculer le chômage ; le coefficient varie selon la flexibilité du marché du travail.',
   'https://fr.wikipedia.org/wiki/Loi_d%27Okun'),
 mk('Le taux de change réel se distingue du taux nominal car il intègre…','Le différentiel de prix entre les deux économies','Les frais bancaires','La durée du transport','Les droits de douane uniquement',
   'TCR = TCN × P*/P. Une appréciation réelle dégrade la compétitivité-prix même à taux nominal fixe (cas de la zone franc face à l\'inflation intérieure).',
   'https://fr.wikipedia.org/wiki/Taux_de_change_r%C3%A9el'),
 mk('L\'output gap (écart de production) mesure…','L\'écart entre PIB effectif et PIB potentiel','La différence entre exportations et importations','Le solde budgétaire structurel','La dette rapportée au PIB',
   'Positif, il signale des tensions inflationnistes ; négatif, des capacités inemployées. Son estimation, incertaine, conditionne pourtant les règles budgétaires.',
   'https://fr.wikipedia.org/wiki/%C3%89cart_de_production'),
 mk('La dominance budgétaire survient lorsque…','La politique monétaire est contrainte de financer les déficits','La banque centrale est totalement indépendante','Le budget est excédentaire','L\'inflation est nulle',
   'Elle mène à la monétisation de la dette et à l\'inflation ; les traités de l\'UEMOA interdisent les avances directes de la BCEAO aux Trésors nationaux.',
   'https://fr.wikipedia.org/wiki/Politique_mon%C3%A9taire'),
 mk('Le seigneuriage inflationniste est parfois qualifié d\'« impôt d\'inflation » car il…','Réduit la valeur réelle des encaisses détenues par les agents','Augmente les recettes de TVA','Taxe uniquement les exportateurs','Diminue la dette extérieure en devises',
   'L\'émission monétaire finance l\'État en érodant le pouvoir d\'achat de la monnaie détenue : un prélèvement régressif frappant surtout les non-bancarisés.',
   'https://fr.wikipedia.org/wiki/Taxe_d%27inflation'),
] .forEach(x => macro.push(x));
[[3.5,2.0,1.5],[6.0,4.5,1.5],[8.0,3.0,5.0],[4.0,6.0,-2.0],[5.5,2.5,3.0],[7.0,7.0,0.0],
 [2.5,4.0,-1.5],[9.0,3.5,5.5],[6.5,2.0,4.5],[3.0,5.0,-2.0],[10.0,4.0,6.0],[4.5,1.5,3.0]]
.forEach(([nom, infl, reel]) => macro.push(mk(
  `La croissance nominale du PIB atteint ${String(nom).replace('.', ',')} % avec une inflation de ${String(infl).replace('.', ',')} %. La croissance réelle approchée est de :`,
  `${String(reel).replace('.', ',')} %`, `${String(nom + infl).replace('.', ',')} %`, `${String(infl - nom).replace('.', ',')} %`, `${String(nom).replace('.', ',')} %`,
  `Croissance réelle ≈ croissance nominale − inflation = ${String(nom).replace('.', ',')} − ${String(infl).replace('.', ',')} = ${String(reel).replace('.', ',')} %${reel < 0 ? ' (recul du PIB réel)' : ''}.`,
  'https://fr.wikipedia.org/wiki/Produit_int%C3%A9rieur_brut')));
pk(D.MACRO, 'Analyse macroéconomique', 'Macroéconomie — approfondissement', macro);

// ---------------- MONNAIE, FINANCE & BUDGET (+20) --------------------
const mon = [];
[
 mk('Le ratio de solvabilité bancaire de Bâle III rapporte…','Les fonds propres aux actifs pondérés par les risques','Les dépôts aux crédits','Les bénéfices au capital social','Les agences au nombre de clients',
   'Le ratio CET1 minimal (4,5 %) est complété par des coussins de conservation et contracycliques ; l\'UMOA a transposé Bâle II/III depuis 2018.',
   'https://fr.wikipedia.org/wiki/Accords_de_B%C3%A2le'),
 mk('Le ratio de liquidité à court terme (LCR) impose aux banques de détenir…','Des actifs liquides couvrant 30 jours de sorties de trésorerie stressées','Uniquement des obligations d\'État','Des espèces égales aux dépôts','Un immeuble par agence',
   'Introduit après 2008, il complète la solvabilité par une exigence de liquidité ; le NSFR traite, lui, le financement stable à un an.',
   'https://fr.wikipedia.org/wiki/Ratio_de_liquidit%C3%A9'),
 mk('Les réserves obligatoires imposées par la BCEAO aux banques servent à…','Réguler la liquidité bancaire et la création monétaire','Payer les impôts des banques','Garantir les salaires du personnel','Financer les infrastructures routières',
   'Un coefficient appliqué aux dépôts est immobilisé auprès de la banque centrale ; sa variation resserre ou desserre la capacité de crédit.',
   'https://fr.wikipedia.org/wiki/R%C3%A9serves_obligatoires'),
 mk('Le taux du marché monétaire interbancaire de l\'UEMOA reflète…','Le coût des échanges de liquidité entre banques de la zone','Le taux d\'inflation annuel','Le rendement des actions cotées','Le prix du coton',
   'Il évolue dans le corridor formé par les guichets de la BCEAO (taux minimum des appels d\'offres et taux du guichet de prêt marginal).',
   'https://fr.wikipedia.org/wiki/March%C3%A9_mon%C3%A9taire'),
 mk('Une émission de bons du Trésor par adjudication sert à financer…','Les besoins de trésorerie de l\'État à court terme','Le capital des banques privées','Les dividendes des entreprises','Les cotisations sociales',
   'Sur le marché régional des titres publics (UMOA-Titres), bons (≤ 2 ans) et obligations (≥ 3 ans) sont adjugés aux SVT et investisseurs.',
   'https://fr.wikipedia.org/wiki/Bon_du_Tr%C3%A9sor'),
 mk('La microfinance se distingue de la banque classique par…','Des prêts de faible montant à des populations peu bancarisées, souvent sans garantie formelle','Des taux toujours nuls','L\'absence de tout remboursement','Un monopole d\'État',
   'Caution solidaire, épargne préalable et proximité remplacent les sûretés réelles. Au Togo, les SFD sont supervisés par le ministère des Finances et la BCEAO.',
   'https://fr.wikipedia.org/wiki/Microfinance'),
 mk('Le risque de crédit d\'une banque correspond à…','La probabilité de défaut de l\'emprunteur','La variation des taux de change','Une panne informatique','Un vol en agence',
   'Distinct des risques de marché, de liquidité et opérationnel ; il se provisionne selon la dégradation du portefeuille (créances en souffrance).',
   'https://fr.wikipedia.org/wiki/Risque_de_cr%C3%A9dit'),
 mk('L\'inclusion financière se mesure notamment par…','La part d\'adultes disposant d\'un compte (bancaire ou mobile)','Le nombre de billets en circulation','Le taux directeur','Le nombre de banques étrangères',
   'Le mobile money a fait bondir cet indicateur en Afrique de l\'Ouest ; les usages (épargne, crédit, assurance) comptent autant que la détention.',
   'https://fr.wikipedia.org/wiki/Inclusion_financi%C3%A8re'),
 mk('Le budget de l\'État en mode LOLF/directives UEMOA distingue autorisations d\'engagement et…','Crédits de paiement','Recettes fiscales et non fiscales','Dépenses de personnel uniquement','Dons et prêts',
   'Les AE couvrent l\'engagement pluriannuel, les CP les décaissements annuels : essentiel pour les investissements s\'étalant sur plusieurs exercices.',
   'https://fr.wikipedia.org/wiki/Loi_de_finances'),
 mk('Le solde budgétaire primaire exclut du solde global…','La charge d\'intérêts de la dette','Les salaires des fonctionnaires','Les recettes de TVA','Les dépenses d\'investissement',
   'Il mesure l\'effort budgétaire courant hors héritage de la dette ; un excédent primaire est nécessaire pour stabiliser le ratio dette/PIB.',
   'https://fr.wikipedia.org/wiki/Solde_primaire'),
] .forEach(x => mon.push(x));
[[500000,10,3,665500],[1000000,5,4,1215506],[250000,8,5,367332],[2000000,6,3,2382032],
 [750000,12,2,940800],[300000,7,6,450288],[1500000,9,3,1942559],[400000,4,10,592098],
 [600000,10,5,966306],[900000,6,7,1353186]]
.forEach(([c, t, n, va]) => mon.push(mk(
  `Un capital de ${F(c)} FCFA placé à ${t} % en intérêts composés pendant ${n} ans atteint environ :`,
  `${F(va)} FCFA`, `${F(c + c*t*n/100)} FCFA`, `${F(Math.round(va*1.5))} FCFA`, `${F(c)} FCFA`,
  `VA = C(1+i)ⁿ = ${F(c)} × (1 + ${t} %)^${n} ≈ ${F(va)} FCFA ; l'intérêt simple ne donnerait que ${F(c + c*t*n/100)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Int%C3%A9r%C3%AAts_compos%C3%A9s')));
pk(D.MON, 'Monnaie et finance', 'Monnaie, banque et budget — approfondissement', mon);

// ---------------- COMMERCE & DÉVELOPPEMENT (+20) ---------------------
const com = [];
[
 mk('Le modèle HOS (Heckscher-Ohlin-Samuelson) explique la spécialisation par…','Les dotations relatives en facteurs de production','Les différences de technologie uniquement','Le hasard historique','La taille de la population',
   'Un pays exporte le bien intensif dans le facteur dont il est relativement bien doté ; le théorème de Stolper-Samuelson en tire les effets distributifs.',
   'https://fr.wikipedia.org/wiki/Mod%C3%A8le_Heckscher-Ohlin'),
 mk('La nouvelle théorie du commerce (Krugman) explique les échanges intra-branche par…','Les économies d\'échelle et la différenciation des produits','Les seules dotations factorielles','L\'absence de transport','Les barrières douanières',
   'Deux pays similaires échangent des variétés différentes du même bien : les consommateurs gagnent en diversité, les firmes en taille de marché.',
   'https://fr.wikipedia.org/wiki/Nouvelle_th%C3%A9orie_du_commerce_international'),
 mk('L\'argument de l\'industrie naissante justifie une protection…','Temporaire, le temps que le secteur atteigne sa compétitivité','Permanente et illimitée','Uniquement pour l\'agriculture','Réservée aux importations de luxe',
   'Formulé par List et Hamilton, il suppose des apprentissages et des économies d\'échelle. Son risque : la capture par des rentes durables.',
   'https://fr.wikipedia.org/wiki/Protection_de_l%27industrie_naissante'),
 mk('Le détournement de trafic dans une union douanière survient quand…','Un producteur efficace hors zone est évincé par un partenaire moins efficace mais exonéré','Les échanges augmentent avec tous les pays','Les prix baissent partout','Les droits de douane disparaissent mondialement',
   'Viner distingue création de trafic (gain) et détournement (perte) : l\'effet net d\'une intégration régionale dépend de leur balance.',
   'https://fr.wikipedia.org/wiki/Union_douani%C3%A8re'),
 mk('Les chaînes de valeur mondiales impliquent que la compétitivité se joue…','Sur des tâches et segments plutôt que sur des produits entiers','Uniquement sur le prix final','Sur le seul taux de change','Sur la taille du territoire',
   'La « courbe du sourire » situe la valeur ajoutée aux extrémités (R&D, marque, distribution), l\'assemblage étant le maillon le moins rémunéré.',
   'https://fr.wikipedia.org/wiki/Cha%C3%AEne_de_valeur_mondiale'),
 mk('Les règles d\'origine dans un accord commercial servent à…','Déterminer si un produit bénéficie du régime préférentiel','Fixer les prix de vente','Interdire les exportations','Calculer l\'impôt sur les sociétés',
   'Un enjeu majeur de la ZLECAf : sans règles claires, les préférences sont inexploitables ou détournées par simple transbordement.',
   'https://fr.wikipedia.org/wiki/R%C3%A8gles_d%27origine'),
 mk('Le corridor Lomé-Ouagadougou illustre l\'importance…','Du commerce de transit vers les pays enclavés','Du transport maritime intercontinental','De l\'exportation de services financiers','Du tourisme balnéaire',
   'Le port de Lomé, en eau profonde, dessert le Burkina, le Mali et le Niger : les délais et coûts logistiques du corridor sont déterminants pour leur compétitivité.',
   'https://fr.wikipedia.org/wiki/Port_autonome_de_Lom%C3%A9'),
 mk('L\'indice de facilitation des échanges mesure surtout…','Les délais, coûts et formalités du passage en douane','Le PIB par habitant','Le taux de change réel','Le niveau des salaires',
   'L\'accord de l\'OMC sur la facilitation des échanges (2017) vise guichet unique, dédouanement anticipé et transparence : gains souvent supérieurs aux baisses tarifaires.',
   'https://fr.wikipedia.org/wiki/Facilitation_des_%C3%A9changes'),
 mk('La malédiction des ressources naturelles désigne le fait que…','Des pays riches en ressources connaissent parfois une croissance plus faible','Les ressources s\'épuisent en dix ans','Les prix miniers sont toujours stables','L\'agriculture disparaît partout',
   'Canaux : syndrome hollandais, volatilité des recettes, faiblesse institutionnelle et rentes. Fonds souverains et règles budgétaires atténuent le risque.',
   'https://fr.wikipedia.org/wiki/Mal%C3%A9diction_des_ressources_naturelles'),
 mk('Le syndrome hollandais décrit…','L\'appréciation réelle de la monnaie qui pénalise les autres secteurs exportateurs','Une épidémie agricole','Une réforme du droit du travail','Une politique de change fixe',
   'Un boom d\'exportation (pétrole, minerai, aide) fait affluer les devises, apprécie le change réel et désindustrialise les secteurs concurrencés.',
   'https://fr.wikipedia.org/wiki/Syndrome_hollandais'),
] .forEach(x => com.push(x));
[[45,30,15,150],[60,40,20,150],[80,50,30,160],[25,20,5,125],[90,45,45,200],
 [120,80,40,150],[36,24,12,150],[75,60,15,125],[100,40,60,250],[54,45,9,120]]
.forEach(([x, m, solde, tc]) => com.push(mk(
  `Exportations : ${F(x)} milliards ; importations : ${F(m)} milliards. Taux de couverture et solde commercial :`,
  `${tc} % — excédent de ${F(solde)} milliards`, `${tc} % — déficit de ${F(solde)} milliards`, `${Math.round(m/x*100)} % — excédent de ${F(solde)} milliards`, `${tc*2} % — excédent de ${F(solde)} milliards`,
  `Taux de couverture = X/M = ${F(x)}/${F(m)} = ${tc} % ; solde = ${F(x)} − ${F(m)} = ${F(solde)} milliards (excédentaire car X > M).`,
  'https://fr.wikipedia.org/wiki/Taux_de_couverture')));
pk(D.COM, 'Échanges et développement', 'Commerce international — approfondissement', com);

// ---------------- 12 AUTRES DOMAINES (+20 chacun) --------------------
// Chaque bloc : 8 questions rédigées + 12 questions paramétriques.

// STATISTIQUES & ÉCONOMÉTRIE
const stat = [];
[
 mk('Un test de Student apparié s\'utilise quand…','Les deux séries proviennent des mêmes individus (avant/après)','Les groupes sont totalement indépendants','Les données sont qualitatives','L\'échantillon dépasse 10 000',
   'On teste la moyenne des différences individuelles, ce qui neutralise la variabilité entre sujets et augmente la puissance.',
   'https://fr.wikipedia.org/wiki/Test_de_Student'),
 mk('Le test du khi-deux d\'indépendance porte sur…','Deux variables qualitatives croisées dans un tableau de contingence','Deux moyennes','Une variance unique','Une corrélation linéaire',
   'Il compare effectifs observés et théoriques sous indépendance ; il exige des effectifs théoriques suffisants (≥ 5 en général).',
   'https://fr.wikipedia.org/wiki/Test_du_%CF%87%C2%B2'),
 mk('Une erreur de type I consiste à…','Rejeter H₀ alors qu\'elle est vraie','Accepter H₀ alors qu\'elle est fausse','Se tromper de logiciel','Mal saisir les données',
   'Sa probabilité est le seuil α (souvent 5 %). L\'erreur de type II (β) est de ne pas détecter un effet réel ; la puissance vaut 1 − β.',
   'https://fr.wikipedia.org/wiki/Erreur_de_premi%C3%A8re_esp%C3%A8ce'),
 mk('Dans un modèle logit, les coefficients s\'interprètent directement en…','Log-odds (rapport de cotes en logarithme)','Points de pourcentage','Unités de la variable dépendante','Écarts types',
   'On préfère présenter les odds ratios (exp β) ou les effets marginaux moyens, plus lisibles pour un lecteur non spécialiste.',
   'https://fr.wikipedia.org/wiki/R%C3%A9gression_logistique'),
 mk('Un panel à effets fixes contrôle…','Toute l\'hétérogénéité inobservée constante dans le temps','Les erreurs de mesure aléatoires','Les variables omises variables dans le temps','La multicolinéarité parfaite',
   'Le prix à payer est l\'impossibilité d\'estimer l\'effet des variables invariantes (sexe, région fixe) ; le test de Hausman arbitre avec les effets aléatoires.',
   'https://fr.wikipedia.org/wiki/Donn%C3%A9es_de_panel'),
 mk('Une série temporelle est stationnaire lorsque…','Moyenne, variance et autocovariances sont stables dans le temps','Elle est toujours croissante','Elle ne comporte aucun bruit','Elle est mesurée chaque jour',
   'La non-stationnarité produit des régressions fallacieuses ; on teste par ADF/KPSS puis on différencie ou l\'on recherche une cointégration.',
   'https://fr.wikipedia.org/wiki/Stationnarit%C3%A9_(statistiques)'),
 mk('La cointégration entre deux séries non stationnaires signifie…','Qu\'une combinaison linéaire des deux est stationnaire','Qu\'elles sont identiques','Qu\'elles sont indépendantes','Que l\'une cause l\'autre mécaniquement',
   'Engle-Granger et Johansen la testent ; elle autorise un modèle à correction d\'erreur reliant dynamique de court terme et équilibre de long terme.',
   'https://fr.wikipedia.org/wiki/Cointégration'),
 mk('Le bootstrap consiste à…','Rééchantillonner avec remise pour estimer la distribution d\'un estimateur','Supprimer les valeurs extrêmes','Ajouter des observations fictives','Arrondir les résultats',
   'Utile quand la loi asymptotique est douteuse (petits échantillons, statistiques complexes) ; le wild bootstrap traite les cas à peu de clusters.',
   'https://fr.wikipedia.org/wiki/Bootstrap_(statistiques)'),
] .forEach(x => stat.push(x));
[[25,5],[100,10],[64,8],[144,12],[49,7],[81,9],[400,20],[900,30],[36,6],[121,11],[169,13],[256,16]]
.forEach(([n, racine]) => stat.push(mk(
  `Pour un échantillon de ${n} observations d'écart type 20, l'erreur type de la moyenne (σ/√n) vaut :`,
  `${(20/racine).toFixed(2).replace('.', ',')}`, `${(20/n).toFixed(2).replace('.', ',')}`, `${(20*racine).toFixed(0)}`, `${racine}`,
  `Erreur type = σ/√n = 20/√${n} = 20/${racine} = ${(20/racine).toFixed(2).replace('.', ',')} : elle décroît en racine carrée de la taille d'échantillon.`,
  'https://fr.wikipedia.org/wiki/Erreur_type')));
pk(D.STAT, 'Méthodes quantitatives', 'Statistiques et économétrie — approfondissement', stat);

// MARCHÉS FINANCIERS
const mf = [];
[
 mk('Le MEDAF (CAPM) exprime la rentabilité attendue d\'un actif par…','r = rf + β(rm − rf)','r = rf × β','r = rm ÷ β','r = β + rm',
   'La prime de risque de marché (rm − rf) est pondérée par le bêta, mesure du risque systématique non diversifiable de l\'actif.',
   'https://fr.wikipedia.org/wiki/Mod%C3%A8le_d%27%C3%A9valuation_des_actifs_financiers'),
 mk('Un bêta supérieur à 1 signifie que le titre…','Amplifie les mouvements du marché','Est sans risque','Est décorrélé du marché','Rapporte toujours plus',
   'β = 1,5 : une hausse de 10 % du marché s\'accompagne en moyenne d\'une hausse de 15 % du titre — et symétriquement à la baisse.',
   'https://fr.wikipedia.org/wiki/Coefficient_b%C3%AAta'),
 mk('La duration d\'une obligation mesure…','La sensibilité de son prix à une variation des taux','Sa date d\'émission','Le montant du coupon','La note de l\'émetteur',
   'Duration de Macaulay (échéance moyenne pondérée) et duration modifiée (élasticité au taux) : plus elle est élevée, plus le titre est sensible.',
   'https://fr.wikipedia.org/wiki/Duration'),
 mk('Le prix d\'une obligation à taux fixe évolue…','En sens inverse des taux d\'intérêt du marché','Dans le même sens que les taux','Indépendamment des taux','Uniquement avec l\'inflation',
   'Si les taux montent, les anciennes obligations moins rémunératrices se déprécient pour offrir un rendement équivalent aux nouvelles émissions.',
   'https://fr.wikipedia.org/wiki/Obligation_(finance)'),
 mk('L\'hypothèse d\'efficience des marchés (Fama) au sens semi-fort implique que…','Toute l\'information publique est déjà intégrée dans les cours','Les cours sont toujours justes à long terme seulement','L\'analyse technique est infaillible','Les délits d\'initié sont inutiles',
   'Elle rend vaine l\'analyse fondamentale sur information publique ; la finance comportementale en conteste la portée (bulles, sur-réactions).',
   'https://fr.wikipedia.org/wiki/Hypoth%C3%A8se_d%27efficience_des_march%C3%A9s'),
 mk('Le compartiment des titres publics de l\'UEMOA est animé par…','UMOA-Titres, agence régionale d\'appui aux émissions souveraines','La BRVM exclusivement','Le FMI','Les chambres de commerce',
   'Créée en 2013, elle organise les adjudications et développe le marché secondaire des bons et obligations du Trésor des huit États.',
   'https://fr.wikipedia.org/wiki/UMOA-Titres'),
 mk('Un OPCVM permet à l\'épargnant…','De mutualiser son placement dans un portefeuille diversifié géré professionnellement','D\'acheter directement une entreprise','D\'éviter tout risque','De garantir un rendement fixe',
   'Les organismes de placement collectif (SICAV, FCP) abaissent le ticket d\'entrée et diversifient ; ils sont agréés par le CREPMF dans l\'UMOA.',
   'https://fr.wikipedia.org/wiki/Organisme_de_placement_collectif_en_valeurs_mobili%C3%A8res'),
 mk('L\'introduction en bourse (IPO) d\'une société vise principalement à…','Lever des capitaux propres et assurer la liquidité du titre','Réduire son chiffre d\'affaires','Éviter la publication de comptes','Supprimer ses dettes automatiquement',
   'Elle impose en contrepartie transparence, information périodique et gouvernance renforcée sous le contrôle du régulateur.',
   'https://fr.wikipedia.org/wiki/Introduction_en_bourse'),
] .forEach(x => mf.push(x));
[[1.5,10,4,13],[0.8,10,4,8.8],[2.0,12,5,19],[1.2,9,3,10.2],[0.5,8,2,5],[1.8,11,4,16.6],
 [1.0,10,5,10],[2.5,9,3,18],[0.6,12,4,8.8],[1.4,10,2,13.2],[1.1,7,3,7.4],[1.6,14,6,18.8]]
.forEach(([beta, rm, rf, r]) => mf.push(mk(
  `Selon le MEDAF, avec un taux sans risque de ${rf} %, une rentabilité de marché de ${rm} % et un bêta de ${String(beta).replace('.', ',')}, la rentabilité attendue est de :`,
  `${String(r).replace('.', ',')} %`, `${String(rm).replace('.', ',')} %`, `${String(+(rf + rm).toFixed(1)).replace('.', ',')} %`, `${String(+(r + 3).toFixed(1)).replace('.', ',')} %`,
  `r = rf + β(rm − rf) = ${rf} + ${String(beta).replace('.', ',')} × (${rm} − ${rf}) = ${String(r).replace('.', ',')} %.`,
  'https://fr.wikipedia.org/wiki/Mod%C3%A8le_d%27%C3%A9valuation_des_actifs_financiers')));
pk(D.MF, 'Marchés de capitaux', 'BRVM et finance de marché — approfondissement', mf);

// COMPTABILITÉ
const cpt = [];
[
 mk('Le principe de séparation des exercices (indépendance) impose de rattacher…','Charges et produits à l\'exercice qu\'ils concernent','Toutes les opérations à leur date de paiement','Les achats à l\'exercice suivant','Les ventes au trimestre le plus favorable',
   'D\'où les écritures de régularisation : charges à payer, produits à recevoir, charges et produits constatés d\'avance.',
   'https://fr.wikipedia.org/wiki/Principes_comptables'),
 mk('Une immobilisation incorporelle est, par exemple…','Un logiciel acquis ou un brevet','Un véhicule de livraison','Un stock de marchandises','Une créance client',
   'Classe 21 du SYSCOHADA : elle est amortissable si sa durée d\'utilité est déterminable, sinon soumise à test de dépréciation.',
   'https://fr.wikipedia.org/wiki/Immobilisation_incorporelle'),
 mk('Le crédit-bail (leasing) est retraité en consolidation comme…','Une acquisition financée par emprunt','Une simple charge de loyer','Un apport en capital','Une subvention reçue',
   'Le retraitement inscrit le bien à l\'actif et la dette au passif, révélant l\'endettement réel — logique reprise par IFRS 16.',
   'https://fr.wikipedia.org/wiki/Cr%C3%A9dit-bail'),
 mk('Le compte de résultat en liste du SYSCOHADA fait apparaître des soldes intermédiaires dont…','La marge commerciale, la valeur ajoutée et l\'EBE','Le seul bénéfice net','Uniquement le chiffre d\'affaires','Les dividendes versés',
   'Cette cascade permet d\'analyser la formation du résultat étape par étape et de comparer les entreprises d\'un même secteur.',
   'https://fr.wikipedia.org/wiki/Solde_interm%C3%A9diaire_de_gestion'),
 mk('Une provision pour dépréciation de créances est constatée lorsque…','Le recouvrement d\'une créance devient incertain','Le client a payé comptant','Les stocks augmentent','Le capital est libéré',
   'La créance douteuse est transférée au compte 416 et dépréciée du montant HT jugé irrécouvrable ; la TVA n\'est régularisée qu\'en cas de perte définitive.',
   'https://fr.wikipedia.org/wiki/Cr%C3%A9ance_douteuse'),
 mk('La comptabilité analytique se distingue de la comptabilité générale car elle est…','Orientée vers la décision interne et non normalisée','Obligatoire et publiée','Réservée à l\'administration fiscale','Limitée à la trésorerie',
   'Coûts par produit, par activité ou par centre : elle éclaire les prix, la rentabilité des lignes et les arbitrages faire ou faire-faire.',
   'https://fr.wikipedia.org/wiki/Comptabilit%C3%A9_analytique'),
 mk('Le coût marginal en comptabilité de gestion désigne…','Le coût de la dernière unité produite','Le coût moyen total','Le coût fixe unitaire','Le prix de vente',
   'Il éclaire les décisions d\'acceptation d\'une commande supplémentaire : tant que le prix couvre le coût marginal, la marge s\'accroît.',
   'https://fr.wikipedia.org/wiki/Co%C3%BBt_marginal'),
 mk('L\'audit légal des comptes est réalisé par…','Le commissaire aux comptes','Le chef comptable de l\'entreprise','Le fournisseur principal','Le service commercial',
   'Indépendant, il certifie la régularité et la sincérité des états financiers ; l\'OHADA fixe les seuils rendant sa nomination obligatoire.',
   'https://fr.wikipedia.org/wiki/Commissaire_aux_comptes'),
] .forEach(x => cpt.push(x));
[[100000,60000,40000],[250000,175000,75000],[80000,52000,28000],[400000,240000,160000],
 [150000,105000,45000],[320000,208000,112000],[90000,45000,45000],[600000,420000,180000],
 [45000,27000,18000],[210000,126000,84000],[75000,60000,15000],[180000,99000,81000]]
.forEach(([ca, cout, marge]) => cpt.push(mk(
  `Chiffre d'affaires ${F(ca)} FCFA, coût d'achat des marchandises vendues ${F(cout)} FCFA. Taux de marge commerciale :`,
  `${Math.round(marge/ca*100)} %`, `${Math.round(cout/ca*100)} %`, `${Math.round(marge/cout*100)} %`, `${Math.round(marge/ca*200)} %`,
  `Marge = ${F(ca)} − ${F(cout)} = ${F(marge)} FCFA ; taux de marge = marge/CA = ${Math.round(marge/ca*100)} % (à distinguer du taux de marque sur coût d'achat).`,
  'https://fr.wikipedia.org/wiki/Marge_commerciale')));
pk(D.CPT === undefined ? 'Comptabilité générale et analytique' : D.CPT, 'Comptabilité analytique et audit', 'Comptabilité — approfondissement v2.33', cpt);

// FISCALITÉ (TOGO)
const fisc = [];
[
 mk('Le principe de territorialité de l\'impôt sur les sociétés togolais retient…','Les bénéfices réalisés dans les entreprises exploitées au Togo','Tous les bénéfices mondiaux sans exception','Uniquement les exportations','Les seuls revenus fonciers',
   'Les conventions fiscales bilatérales et les règles de prix de transfert encadrent la répartition des bénéfices transfrontaliers.',
   'https://fr.wikipedia.org/wiki/Territorialit%C3%A9_de_l%27imp%C3%B4t'),
 mk('Les prix de transfert concernent les transactions…','Entre entreprises liées d\'un même groupe','Entre concurrents indépendants','Entre l\'État et les communes','Entre particuliers',
   'Le principe de pleine concurrence exige des prix comparables à ceux du marché ; la documentation est exigible lors des contrôles.',
   'https://fr.wikipedia.org/wiki/Prix_de_transfert'),
 mk('Le crédit de TVA apparaît lorsque…','La TVA déductible dépasse la TVA collectée sur la période','L\'entreprise ne facture aucune TVA','Le chiffre d\'affaires baisse','Les salaires augmentent',
   'Il est reportable sur les périodes suivantes, et remboursable dans certains cas (exportateurs, investissements) sur demande à l\'OTR.',
   'https://fr.wikipedia.org/wiki/Cr%C3%A9dit_de_TVA'),
 mk('L\'amortissement dégressif, lorsqu\'il est admis fiscalement, permet…','De déduire davantage les premières années','D\'étaler uniformément la charge','De ne rien déduire','De doubler la durée d\'usage',
   'Il rapproche la déduction du rythme réel de dépréciation des équipements et améliore la trésorerie de l\'entreprise investisseuse.',
   'https://fr.wikipedia.org/wiki/Amortissement_d%C3%A9gressif'),
 mk('Le report déficitaire permet à une société…','D\'imputer une perte antérieure sur les bénéfices futurs','De supprimer sa TVA','D\'échapper au contrôle fiscal','De ne jamais payer d\'impôt',
   'Le CGI encadre le délai de report (généralement quelques exercices) : il lisse l\'imposition sur le cycle d\'activité.',
   'https://fr.wikipedia.org/wiki/Report_d%C3%A9ficitaire'),
 mk('Une retenue à la source sur prestations de services rendues par un non-résident vise à…','Imposer au Togo un revenu de source togolaise versé à l\'étranger','Exonérer le prestataire étranger','Doubler la TVA','Financer les communes uniquement',
   'Le taux conventionnel peut réduire la retenue de droit interne si une convention fiscale lie les deux États.',
   'https://fr.wikipedia.org/wiki/Retenue_%C3%A0_la_source'),
 mk('L\'abus de droit fiscal sanctionne…','Un montage à but exclusivement ou principalement fiscal','Une erreur de calcul de bonne foi','Un retard de paiement isolé','Un changement d\'adresse',
   'L\'administration peut écarter les actes fictifs ou artificiels et appliquer des majorations, sous contrôle du juge.',
   'https://fr.wikipedia.org/wiki/Abus_de_droit_fiscal'),
 mk('L\'optimisation fiscale se distingue de la fraude car elle…','Utilise les possibilités offertes par la loi','Dissimule des recettes','Falsifie des factures','Ignore les déclarations',
   'La frontière passe par la légalité et la substance économique ; l\'évasion agressive se situe dans la zone grise et fait l\'objet de mesures anti-abus.',
   'https://fr.wikipedia.org/wiki/Optimisation_fiscale'),
] .forEach(x => fisc.push(x));
[[10000000,2700000],[25000000,6750000],[7500000,2025000],[40000000,10800000],
 [15000000,4050000],[60000000,16200000],[3000000,810000],[90000000,24300000],
 [22000000,5940000],[48000000,12960000],[5500000,1485000],[75000000,20250000]]
.forEach(([ben, is]) => fisc.push(mk(
  `Une société togolaise dégage un bénéfice imposable de ${F(ben)} FCFA. L'impôt sur les sociétés dû au taux de 27 % s'élève à :`,
  `${F(is)} FCFA`, `${F(Math.round(ben*0.18))} FCFA`, `${F(Math.round(ben*0.33))} FCFA`, `${F(Math.round(ben*0.135))} FCFA`,
  `IS = 27 % × ${F(ben)} = ${F(is)} FCFA. Un impôt minimum forfaitaire s'applique si l'IS calculé est inférieur à ce minimum.`,
  'https://fr.wikipedia.org/wiki/Imp%C3%B4t_sur_les_soci%C3%A9t%C3%A9s')));
pk(D.FISC === undefined ? 'Fiscalité (Togo)' : D.FISC, 'Fiscalité togolaise', 'Fiscalité — approfondissement', fisc);

// MARCHÉS PUBLICS (TOGO)
const mp = [];
[
 mk('La procédure d\'appel d\'offres restreint suppose…','Une présélection des candidats invités à soumissionner','Une publicité mondiale obligatoire','Aucune mise en concurrence','Le choix du moins-disant sans critère',
   'Justifiée par la complexité ou un nombre limité d\'opérateurs qualifiés, elle exige une préqualification transparente et motivée.',
   'https://fr.wikipedia.org/wiki/Appel_d%27offres'),
 mk('La préqualification des entreprises pour un marché de travaux complexes vise à…','Vérifier en amont les capacités techniques et financières','Fixer le prix du marché','Choisir le titulaire définitif','Éviter la publication de l\'avis',
   'Seuls les candidats préqualifiés remettent une offre : la procédure gagne en qualité technique et en sécurité d\'exécution.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('Un marché à commandes (ou à bons de commande) convient lorsque…','Les besoins sont récurrents mais les quantités incertaines','Le besoin est unique et parfaitement défini','Aucune livraison n\'est prévue','Le titulaire est imposé',
   'Il fixe prix unitaires, minimum et maximum, et se décline en bons de commande successifs pendant sa durée.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('Le délai de standstill (suspension avant signature) permet…','Aux candidats évincés d\'exercer un recours avant la signature du marché','De payer plus vite le titulaire','De modifier l\'offre retenue','D\'annuler la publicité',
   'Ce délai d\'attente rend le recours précontractuel effectif : signer avant son terme fragilise juridiquement le marché.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('La sous-traitance déclarée ouvre au sous-traitant la possibilité…','D\'obtenir le paiement direct par l\'autorité contractante','De remplacer le titulaire','De modifier le prix du marché','D\'échapper aux contrôles',
   'Le paiement direct sécurise le sous-traitant accepté et ses conditions de paiement agréées, sans dégager le titulaire de sa responsabilité.',
   'https://fr.wikipedia.org/wiki/Sous-traitance'),
 mk('Le groupement momentané d\'entreprises « conjoint » signifie que chaque membre…','N\'est engagé que sur la part de prestations qu\'il exécute','Répond de la totalité du marché','Cède ses droits au mandataire','Est exclu des paiements',
   'Dans un groupement solidaire, chacun répond de l\'ensemble : l\'autorité contractante y gagne en sécurité, les entreprises en risque.',
   'https://fr.wikipedia.org/wiki/Groupement_d%27entreprises'),
 mk('L\'ordre de service dans un marché de travaux sert à…','Notifier officiellement au titulaire une décision d\'exécution (démarrage, arrêt, reprise)','Payer les factures','Modifier le prix unilatéralement sans avenant','Résilier automatiquement le marché',
   'Il court les délais contractuels ; un ordre de service tardif ou contradictoire est une source classique de réclamations.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('La résiliation pour faute du titulaire entraîne généralement…','L\'exécution aux frais et risques du titulaire défaillant','Une prime de départ','Le maintien de tous ses droits à paiement','L\'annulation des garanties',
   'L\'autorité contractante peut faire achever les prestations par un tiers, la différence de coût étant supportée par le titulaire fautif.',
   'https://fr.wikipedia.org/wiki/R%C3%A9siliation'),
] .forEach(x => mp.push(x));
[[500000000,3,15000000],[250000000,2,5000000],[800000000,3,24000000],[120000000,1,1200000],
 [1000000000,2,20000000],[350000000,3,10500000],[600000000,1,6000000],[90000000,2,1800000],
 [450000000,3,13500000],[700000000,2,14000000],[200000000,1,2000000],[1500000000,3,45000000]]
.forEach(([m, tx, g]) => mp.push(mk(
  `Pour un marché estimé à ${F(m)} FCFA, une garantie de soumission fixée à ${tx} % représente :`,
  `${F(g)} FCFA`, `${F(g*3)} FCFA`, `${F(Math.round(m*0.10))} FCFA`, `${F(Math.round(g/2))} FCFA`,
  `Garantie = ${tx} % × ${F(m)} = ${F(g)} FCFA ; elle est restituée aux candidats non retenus après attribution.`,
  'https://fr.wikipedia.org/wiki/Caution_(finance)')));
pk(D.MP === undefined ? 'Marchés publics et passation (Togo)' : D.MP, 'Procédures et contentieux', 'Marchés publics — approfondissement v2.33', mp);

// ÉCONOMIE AGRICOLE
const agri = [];
[
 mk('Le rendement agricole s\'exprime généralement en…','Tonnes par hectare','Hectares par exploitation','FCFA par kilogramme','Heures par saison',
   'Il combine potentiel variétal, fertilité, itinéraire technique et climat ; c\'est l\'indicateur central de la productivité des terres.',
   'https://fr.wikipedia.org/wiki/Rendement_agricole'),
 mk('L\'agriculture contractuelle relie producteurs et acheteurs par…','Un contrat fixant volumes, qualité et souvent le prix à l\'avance','Un simple accord verbal ponctuel','Une vente aux enchères quotidienne','Une subvention publique directe',
   'Elle sécurise le débouché et l\'accès aux intrants, mais expose au risque de renégociation opportuniste (side-selling ou défaut de l\'acheteur).',
   'https://fr.wikipedia.org/wiki/Agriculture_contractuelle'),
 mk('Le warrantage (crédit-stockage) permet au producteur…','D\'emprunter en gageant sa récolte stockée pour vendre plus tard','De vendre immédiatement à bas prix','D\'éviter tout remboursement','D\'assurer sa récolte contre la sécheresse',
   'Il lisse le revenu en évitant la vente en pleine récolte, quand les prix sont au plus bas, tout en couvrant les besoins de trésorerie.',
   'https://fr.wikipedia.org/wiki/Warrantage'),
 mk('L\'assurance indicielle climatique indemnise sur la base…','D\'un indice météorologique objectif (pluviométrie, NDVI)','D\'une expertise individuelle de chaque parcelle','Du prix de vente obtenu','Du nombre d\'ouvriers employés',
   'Elle réduit drastiquement les coûts de vérification et l\'aléa moral, au prix d\'un risque de base (l\'indice ne reflète pas parfaitement la perte réelle).',
   'https://fr.wikipedia.org/wiki/Assurance_indicielle'),
 mk('La chaîne de valeur agricole englobe…','De la fourniture d\'intrants à la consommation finale, en passant par la transformation','Uniquement la production au champ','Seulement l\'exportation','La seule distribution urbaine',
   'L\'analyse identifie où se crée et se capte la valeur, et cible les goulots (stockage, transformation, normes) à lever.',
   'https://fr.wikipedia.org/wiki/Cha%C3%AEne_de_valeur'),
 mk('Les pertes post-récolte en Afrique subsaharienne s\'expliquent principalement par…','Le déficit de stockage, de transformation et de transport','La surproduction systématique','L\'excès de transformation industrielle','Le manque de terres cultivables',
   'Elles peuvent atteindre 20 à 40 % pour certaines denrées périssables : les réduire équivaut à produire davantage sans étendre les surfaces.',
   'https://fr.wikipedia.org/wiki/Pertes_post-r%C3%A9colte'),
 mk('La sécurité alimentaire, au sens de la FAO, repose sur quatre piliers dont…','La disponibilité, l\'accès, l\'utilisation et la stabilité','Le prix, la quantité, la couleur et le goût','L\'exportation, l\'importation, le stock et la taxe','La terre, l\'eau, l\'engrais et la semence',
   'L\'accès économique et physique compte autant que la disponibilité globale : une récolte abondante ne garantit pas la sécurité alimentaire des ménages pauvres.',
   'https://fr.wikipedia.org/wiki/S%C3%A9curit%C3%A9_alimentaire'),
 mk('L\'agroécologie vise notamment à…','Valoriser les processus écologiques pour réduire les intrants de synthèse','Maximiser les pesticides','Supprimer toute mécanisation','Interdire la vente des récoltes',
   'Rotations, associations, couverture des sols, agroforesterie et fumure organique : elle combine performance agronomique et résilience climatique.',
   'https://fr.wikipedia.org/wiki/Agro%C3%A9cologie'),
] .forEach(x => agri.push(x));
[[3,2.5,7.5],[5,1.8,9],[2,3.2,6.4],[10,1.5,15],[4,2.75,11],[8,2,16],
 [1.5,4,6],[6,2.5,15],[12,1.25,15],[2.5,3.6,9],[7,2.2,15.4],[9,1.6,14.4]]
.forEach(([ha, rdt, prod]) => agri.push(mk(
  `Une exploitation cultive ${String(ha).replace('.', ',')} hectares de maïs avec un rendement de ${String(rdt).replace('.', ',')} t/ha. Production totale :`,
  `${String(prod).replace('.', ',')} tonnes`, `${String(+(prod*2).toFixed(2)).replace('.', ',')} tonnes`, `${String(ha).replace('.', ',')} tonnes`, `${String(+(prod/2).toFixed(2)).replace('.', ',')} tonnes`,
  `Production = surface × rendement = ${String(ha).replace('.', ',')} × ${String(rdt).replace('.', ',')} = ${String(prod).replace('.', ',')} tonnes.`,
  'https://fr.wikipedia.org/wiki/Rendement_agricole')));
pk(D.AGRI === undefined ? 'Économie agricole et agribusiness' : D.AGRI, 'Économie agricole', 'Agriculture et agribusiness — approfondissement', agri);

// MACHINE LEARNING
const ml = [];
[
 mk('La régularisation « early stopping » consiste à…','Arrêter l\'entraînement quand l\'erreur de validation cesse de diminuer','Supprimer des couches du réseau','Réduire la taille du jeu de test','Fixer le taux d\'apprentissage à zéro',
   'Simple et efficace, elle évite le surapprentissage en gardant les poids du meilleur point de validation (patience et restauration des meilleurs poids).',
   'https://fr.wikipedia.org/wiki/Surapprentissage'),
 mk('L\'optimiseur Adam combine…','Moment d\'ordre 1 et d\'ordre 2 adaptatifs','Deux réseaux distincts','Deux jeux de données','Un tri et une fusion',
   'Moyennes mobiles du gradient et de son carré, corrigées du biais : convergence rapide et robuste, d\'où son statut de choix par défaut.',
   'https://fr.wikipedia.org/wiki/Descente_de_gradient_stochastique'),
 mk('La normalisation par lots (batch normalization) agit en…','Normalisant les activations de chaque mini-lot pour stabiliser l\'entraînement','Supprimant les valeurs aberrantes du jeu de données','Réduisant le vocabulaire','Chiffrant les poids',
   'Elle réduit le décalage de covariables interne, permet des taux d\'apprentissage plus élevés et a un léger effet régularisant.',
   'https://fr.wikipedia.org/wiki/Normalisation_par_lots'),
 mk('Les valeurs SHAP servent à…','Attribuer à chaque variable sa contribution à une prédiction donnée','Accélérer l\'entraînement','Nettoyer les données manquantes','Choisir le nombre de couches',
   'Fondées sur la valeur de Shapley (théorie des jeux), elles offrent une explication locale additive et cohérente, très utilisée en crédit et en santé.',
   'https://fr.wikipedia.org/wiki/Valeur_de_Shapley'),
 mk('Le sur-échantillonnage SMOTE crée des exemples minoritaires…','Par interpolation entre voisins proches de la classe rare','En dupliquant à l\'identique','En supprimant la classe majoritaire','En inventant des étiquettes aléatoires',
   'Il évite la duplication pure mais peut générer du bruit près des frontières ; à appliquer uniquement sur le jeu d\'entraînement, après le découpage.',
   'https://fr.wikipedia.org/wiki/Apprentissage_automatique'),
 mk('La validation croisée temporelle (walk-forward) est nécessaire pour…','Les séries chronologiques, afin de ne jamais entraîner sur le futur','Les images fixes','Les données textuelles seules','Les bases relationnelles',
   'Un k-fold aléatoire fuiterait de l\'information future dans l\'entraînement, gonflant artificiellement la performance mesurée.',
   'https://fr.wikipedia.org/wiki/Validation_crois%C3%A9e'),
 mk('Un pipeline scikit-learn encapsule prétraitements et modèle afin de…','Éviter les fuites de données lors de la validation croisée','Réduire la taille des fichiers','Accélérer l\'affichage des graphiques','Chiffrer le jeu de données',
   'Imputation, standardisation et encodage sont réajustés sur chaque pli d\'entraînement seulement, ce qui donne une estimation honnête de la performance.',
   'https://fr.wikipedia.org/wiki/Scikit-learn'),
 mk('Le seuil de décision d\'un classifieur probabiliste doit être choisi…','En fonction du coût relatif des faux positifs et des faux négatifs','Toujours à 0,5 par principe','Au hasard','Après suppression des probabilités',
   'Dépistage médical : on abaisse le seuil pour maximiser le rappel ; filtre anti-spam : on l\'élève pour préserver la précision.',
   'https://fr.wikipedia.org/wiki/Courbe_ROC')
] .forEach(x => ml.push(x));
[[0.9,0.6,0.72],[0.8,0.4,0.53],[0.75,0.75,0.75],[0.6,0.9,0.72],[0.5,0.5,0.5],[0.95,0.7,0.81],
 [0.85,0.55,0.67],[0.7,0.35,0.47],[0.65,0.8,0.72],[0.4,0.6,0.48],[0.88,0.44,0.59],[0.55,0.9,0.68]]
.forEach(([p, r, f1]) => ml.push(mk(
  `Un modèle atteint une précision de ${Math.round(p*100)} % et un rappel de ${Math.round(r*100)} %. Son F1-score vaut environ :`,
  `${Math.round(f1*100)} %`, `${Math.round((p+r)/2*100)} %`, `${Math.round(p*100)} %`, `${Math.round(r*100)} %`,
  `F1 = 2PR/(P+R) = 2×${p.toFixed(2)}×${r.toFixed(2)}/(${p.toFixed(2)}+${r.toFixed(2)}) ≈ ${Math.round(f1*100)} % ; la moyenne harmonique pénalise le déséquilibre entre précision et rappel.`,
  'https://fr.wikipedia.org/wiki/F-mesure')));
pk(D.ML, 'Apprentissage automatique', 'Machine learning — approfondissement', ml);

// TOPOGRAPHIE / GÉNIE CIVIL
const btp = [];
[
 mk('Le tachéomètre électronique diffère du théodolite classique par…','La mesure électronique intégrée des distances','L\'absence de lunette','Sa taille réduite uniquement','L\'impossibilité de mesurer des angles',
   'La station totale enregistre angles et distances et calcule directement les coordonnées, exportables vers un logiciel de topographie.',
   'https://fr.wikipedia.org/wiki/Station_totale'),
 mk('La fermeture d\'un cheminement polygonal permet de…','Contrôler et répartir les erreurs de mesure','Fixer le prix des travaux','Choisir les matériaux','Calculer la TVA',
   'L\'écart de fermeture est comparé à la tolérance ; s\'il est acceptable, il est compensé proportionnellement sur les stations.',
   'https://fr.wikipedia.org/wiki/Cheminement_(topographie)'),
 mk('Un modèle numérique de terrain (MNT) représente…','L\'altitude du sol sous forme numérique maillée','Le cadastre juridique des parcelles','Le réseau électrique','Le plan des façades',
   'Issu de levés, de photogrammétrie ou de LiDAR, il sert aux profils, cubatures, études hydrauliques et modélisations d\'inondation.',
   'https://fr.wikipedia.org/wiki/Mod%C3%A8le_num%C3%A9rique_de_terrain'),
 mk('Le tassement d\'une fondation superficielle dépend surtout…','De la compressibilité du sol et de la charge appliquée','De la couleur du béton','Du nombre d\'ouvriers','De la saison de coulage',
   'Les essais œdométriques et pressiométriques permettent de l\'estimer ; le tassement différentiel est plus dommageable que le tassement absolu.',
   'https://fr.wikipedia.org/wiki/Tassement_(g%C3%A9otechnique)'),
 mk('Le moment fléchissant maximal d\'une poutre sur deux appuis avec charge concentrée P au milieu de portée L vaut…','PL/4','PL/8','PL²/8','P/L',
   'Pour une charge répartie q, le moment maximal est qL²/8. Ces formules de base guident le prédimensionnement avant calcul aux éléments finis.',
   'https://fr.wikipedia.org/wiki/Flexion_(mat%C3%A9riau)'),
 mk('Le flambement concerne principalement…','Les éléments élancés comprimés','Les dalles en traction','Les fondations profondes seulement','Les charpentes en tension',
   'La charge critique d\'Euler décroît avec le carré de la longueur de flambement : d\'où l\'importance des contreventements et des raidisseurs.',
   'https://fr.wikipedia.org/wiki/Flambage'),
 mk('L\'enrobage des armatures dans le béton armé garantit…','La protection des aciers contre la corrosion et le feu','Une meilleure couleur de surface','Un séchage plus rapide','Une économie d\'acier',
   'En zone côtière (embruns chlorurés comme à Lomé), l\'enrobage est augmenté : une corrosion des aciers fait éclater le béton.',
   'https://fr.wikipedia.org/wiki/B%C3%A9ton_arm%C3%A9'),
 mk('Le BIM en phase exploitation permet notamment…','De gérer la maintenance à partir de la maquette numérique enrichie','De supprimer les plans définitivement','D\'éviter la réception des travaux','De remplacer le permis de construire',
   'Le DOE numérique (dossier des ouvrages exécutés) alimente la GMAO : équipements, garanties, contrats et interventions sont liés aux objets 3D.',
   'https://fr.wikipedia.org/wiki/Building_information_modeling'),
] .forEach(x => btp.push(x));
[[20,15,0.20,60],[30,10,0.15,45],[25,12,0.18,54],[40,20,0.12,96],[15,8,0.25,30],
 [50,25,0.10,125],[18,14,0.20,50.4],[35,16,0.15,84],[22,18,0.22,87.12],[28,20,0.16,89.6],
 [45,12,0.20,108],[60,30,0.08,144]]
.forEach(([lg, la, ep, vol]) => btp.push(mk(
  `Une dalle de ${lg} m × ${la} m et ${String(ep).replace('.', ',')} m d'épaisseur nécessite un volume de béton de :`,
  `${String(+vol.toFixed(2)).replace('.', ',')} m³`, `${String(+(vol*2).toFixed(2)).replace('.', ',')} m³`, `${F(lg*la)} m³`, `${String(+(vol/2).toFixed(2)).replace('.', ',')} m³`,
  `Volume = ${lg} × ${la} × ${String(ep).replace('.', ',')} = ${String(+vol.toFixed(2)).replace('.', ',')} m³, soit environ ${Math.ceil(vol*350/50)} sacs de ciment à 350 kg/m³.`,
  'https://fr.wikipedia.org/wiki/B%C3%A9ton')));
pk(BTP_NAME, 'BTP et topographie', 'Génie civil — approfondissement', btp);

// HISTOIRE DE LA PENSÉE
const hpe = [];
[
 mk('Pour Thorstein Veblen, la « consommation ostentatoire » sert à…','Signaler le statut social','Maximiser l\'utilité marginale seule','Réduire les prix de marché','Épargner davantage',
   'Dans « Théorie de la classe de loisir » (1899), la dépense visible devient un marqueur de position, fondant l\'institutionnalisme américain.',
   'https://fr.wikipedia.org/wiki/Consommation_ostentatoire'),
 mk('Karl Polanyi soutient dans « La Grande Transformation » que le marché autorégulateur…','Est une construction politique, encastrée dans la société','Existe naturellement depuis toujours','Résout tous les problèmes sociaux','Est indépendant de l\'État',
   'Le « double mouvement » décrit l\'extension marchande suivie de réactions sociales protectrices (législation du travail, protection sociale).',
   'https://fr.wikipedia.org/wiki/Karl_Polanyi'),
 mk('Pour Gunnar Myrdal, la causalité circulaire cumulative explique…','L\'auto-renforcement des inégalités régionales','La convergence automatique des économies','La neutralité de la monnaie','L\'équilibre général walrasien',
   'Les régions avantagées attirent capitaux et talents, creusant l\'écart : cela justifie des politiques volontaristes d\'aménagement.',
   'https://fr.wikipedia.org/wiki/Gunnar_Myrdal'),
 mk('La théorie de la dépendance (Prebisch, Furtado) analyse…','La détérioration des termes de l\'échange entre centre et périphérie','L\'égalité des échanges internationaux','La supériorité du libre-échange intégral','Le rôle exclusif de la monnaie',
   'Elle a inspiré l\'industrialisation par substitution aux importations en Amérique latine, dont les limites ont été débattues.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9orie_de_la_d%C3%A9pendance'),
 mk('Arthur Lewis modélise le développement par…','Un transfert de main-d\'œuvre du secteur traditionnel vers le secteur moderne','La fermeture des frontières','La seule aide extérieure','La décroissance démographique',
   'Le « surplus illimité de main-d\'œuvre » permet une accumulation rapide tant que le point de retournement (tension salariale) n\'est pas atteint.',
   'https://fr.wikipedia.org/wiki/Mod%C3%A8le_de_Lewis'),
 mk('Pour Hyman Minsky, la stabilité financière prolongée…','Engendre elle-même l\'instabilité par la prise de risque croissante','Garantit l\'absence définitive de crise','Réduit l\'endettement automatiquement','Supprime la spéculation',
   'Financement prudent → spéculatif → Ponzi : l\'hypothèse d\'instabilité financière a été redécouverte après la crise de 2008.',
   'https://fr.wikipedia.org/wiki/Hyman_Minsky'),
 mk('Ronald Coase explique l\'existence de la firme par…','Les coûts de transaction du recours au marché','L\'absence de concurrence','La réglementation fiscale','Le hasard historique',
   '« The Nature of the Firm » (1937) : l\'entreprise internalise les transactions quand la coordination hiérarchique coûte moins cher que le marché.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9orie_des_co%C3%BBts_de_transaction'),
 mk('Douglass North attribue les divergences de développement de long terme…','Aux institutions et à leur dépendance au sentier','Au climat exclusivement','À la seule géographie physique','Au hasard pur',
   'Règles formelles et informelles structurent les incitations ; leur inertie explique la persistance des trajectoires nationales (Nobel 1993).',
   'https://fr.wikipedia.org/wiki/Douglass_North'),
] .forEach(x => hpe.push(x));
[['Nature of the Firm','Ronald Coase',1937],['La Grande Transformation','Karl Polanyi',1944],
 ['Théorie de la classe de loisir','Thorstein Veblen',1899],['La Richesse des nations','Adam Smith',1776],
 ['Le Capital','Karl Marx',1867],['Théorie générale','John Maynard Keynes',1936],
 ['Essai sur le principe de population','Thomas Malthus',1798],['La Route de la servitude','Friedrich Hayek',1944],
 ['Capitalisme et liberté','Milton Friedman',1962],['Éléments d\'économie politique pure','Léon Walras',1874],
 ['Principes d\'économie politique','Alfred Marshall',1890],['Development as Freedom','Amartya Sen',1999]]
.forEach(([oeuvre, auteur, an], i) => {
  const autres = ['Adam Smith','Karl Marx','John Maynard Keynes','Milton Friedman','Léon Walras','Ronald Coase'].filter(a => a !== auteur);
  hpe.push(mk(
    `Publié en ${an}, l'ouvrage « ${oeuvre} » est l'œuvre de :`,
    auteur, autres[i % autres.length], autres[(i + 2) % autres.length], autres[(i + 4) % autres.length],
    `« ${oeuvre} » (${an}) a été écrit par ${auteur}.`,
    'https://fr.wikipedia.org/wiki/Histoire_de_la_pens%C3%A9e_%C3%A9conomique'));
});
pk(D.HPE, 'Auteurs et courants', 'Pensée économique — approfondissement', hpe);

// SCIENCES SOCIALES
const soc = [];
[
 mk('L\'idéal-type wébérien est…','Une construction intellectuelle qui accentue certains traits pour analyser le réel','Un modèle moral à atteindre','Une moyenne statistique','Une utopie politique',
   'Bureaucratie, capitalisme rationnel : l\'idéal-type n\'existe nulle part à l\'état pur mais sert d\'étalon de comparaison.',
   'https://fr.wikipedia.org/wiki/Id%C3%A9al-type'),
 mk('L\'individualisme méthodologique (Boudon) explique les phénomènes sociaux par…','L\'agrégation d\'actions individuelles intentionnelles','Des forces collectives extérieures','La biologie des individus','Le hasard statistique',
   'Les effets pervers (résultats collectifs non voulus) illustrent que l\'agrégation ne reproduit pas les intentions individuelles.',
   'https://fr.wikipedia.org/wiki/Individualisme_m%C3%A9thodologique'),
 mk('La théorie de l\'acteur-réseau (Latour) propose de…','Suivre les associations entre humains et non-humains','Étudier les seules institutions officielles','Ignorer les techniques','Se limiter aux statistiques',
   'Objets, dispositifs et normes participent à l\'action collective : la sociologie des sciences et techniques en a fait un outil central.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9orie_de_l%27acteur-r%C3%A9seau'),
 mk('La saturation théorique, en recherche qualitative, est atteinte quand…','Les nouveaux entretiens n\'apportent plus d\'information nouvelle','On a interrogé 1 000 personnes','Le budget est épuisé','Le questionnaire est terminé',
   'Critère d\'arrêt de l\'échantillonnage théorique en théorie ancrée (Glaser & Strauss), à documenter explicitement.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9orisation_ancr%C3%A9e'),
 mk('La triangulation méthodologique consiste à…','Croiser plusieurs méthodes ou sources pour renforcer la validité','Interroger trois personnes','Utiliser trois logiciels','Publier trois articles',
   'Quantitatif et qualitatif se complètent : le premier mesure l\'ampleur, le second éclaire les mécanismes et le sens donné par les acteurs.',
   'https://fr.wikipedia.org/wiki/Triangulation_(sciences_sociales)'),
 mk('Le clientélisme politique désigne…','L\'échange de faveurs contre un soutien politique','Le service après-vente des entreprises','La fidélisation commerciale','Le vote obligatoire',
   'Il repose sur une relation asymétrique et personnalisée qui contourne les règles universelles de l\'action publique.',
   'https://fr.wikipedia.org/wiki/Client%C3%A9lisme'),
 mk('La redevabilité (accountability) des pouvoirs publics implique…','L\'obligation de rendre compte et de répondre de ses décisions','Le secret des délibérations','L\'immunité totale des dirigeants','La suppression des contrôles',
   'Redevabilité verticale (élections, société civile) et horizontale (cour des comptes, parlement) se renforcent mutuellement.',
   'https://fr.wikipedia.org/wiki/Responsabilit%C3%A9_(politique)'),
 mk('Le capital social « bridging » (pontant) désigne des liens…','Entre groupes sociaux différents','Uniquement au sein de la famille','Exclusivement professionnels','Entre États souverains',
   'Opposé au capital « bonding » (liant, intra-groupe), il favorise l\'accès à des ressources et informations nouvelles.',
   'https://fr.wikipedia.org/wiki/Capital_social_(sociologie)'),
] .forEach(x => soc.push(x));
[[1200,300,25],[800,200,25],[1500,600,40],[2000,500,25],[600,180,30],[900,270,30],
 [2500,750,30],[400,120,30],[1600,640,40],[3000,900,30],[750,300,40],[1000,350,35]]
.forEach(([n, oui, pct]) => soc.push(mk(
  `Dans une enquête auprès de ${F(n)} personnes, ${F(oui)} répondent « oui ». La proportion observée est de :`,
  `${pct} %`, `${100-pct} %`, `${Math.round(pct*1.5)} %`, `${Math.round(pct/2)} %`,
  `Proportion = ${F(oui)} ÷ ${F(n)} = ${pct} % ; la marge d'erreur approximative à 95 % est d'environ ± ${(100/Math.sqrt(n)).toFixed(1).replace('.', ',')} points.`,
  'https://fr.wikipedia.org/wiki/Sondage_(statistique)')));
pk(D.SOC, 'Théories et méthodes', 'Sciences sociales — approfondissement', soc);

// HISTOIRE / TRAVAIL / SANTÉ / ÉDUCATION
const hist = [];
[
 mk('La conférence de Berlin (1884-1885) a organisé…','Le partage de l\'Afrique entre puissances européennes','L\'indépendance des colonies','La création de l\'ONU','L\'abolition de l\'esclavage',
   'Elle fixe les règles de l\'occupation effective, à l\'origine de frontières tracées sans considération des réalités humaines locales.',
   'https://fr.wikipedia.org/wiki/Conf%C3%A9rence_de_Berlin_(1884-1885)'),
 mk('Le mandat de la Société des Nations sur le Togo après 1919 a confié le territoire…','À la France et au Royaume-Uni, séparément','À l\'Allemagne à nouveau','Aux États-Unis','À la Belgique',
   'Le Togoland allemand est partagé : le Togo britannique rejoindra le Ghana en 1957, le Togo français accédera à l\'indépendance en 1960.',
   'https://fr.wikipedia.org/wiki/Togoland'),
 mk('Le capital humain, au sens de Becker, désigne…','L\'ensemble des compétences et de la santé qui accroissent la productivité','Le nombre d\'employés d\'une firme','Le capital financier des ménages','Les machines de production',
   'L\'éducation et la santé sont analysées comme des investissements à rendement mesurable, fondement de l\'économie de l\'éducation.',
   'https://fr.wikipedia.org/wiki/Capital_humain'),
 mk('Le taux d\'achèvement du primaire mesure…','La part d\'une génération qui termine le cycle primaire','Le nombre d\'écoles construites','La durée des vacances scolaires','Le budget de l\'éducation',
   'Plus exigeant que le taux de scolarisation, il capte les abandons en cours de cycle et constitue un indicateur clé de l\'ODD 4.',
   'https://fr.wikipedia.org/wiki/Taux_de_scolarisation'),
 mk('La couverture vaccinale d\'une population conditionne…','L\'immunité collective contre une maladie transmissible','Le taux de natalité','Le PIB par habitant','Le taux de change',
   'Le seuil dépend de la contagiosité (R₀) : environ 95 % pour la rougeole. Sous ce seuil, des épidémies resurgissent.',
   'https://fr.wikipedia.org/wiki/Immunit%C3%A9_collective'),
 mk('Les dépenses catastrophiques de santé désignent…','Des dépenses de santé qui appauvrissent le ménage','Les dépenses hospitalières de l\'État','Le coût des catastrophes naturelles','Les frais d\'assurance des entreprises',
   'Seuil usuel : plus de 10 % de la consommation du ménage. Les réduire est l\'objectif central de la couverture sanitaire universelle.',
   'https://fr.wikipedia.org/wiki/Couverture_sanitaire_universelle'),
 mk('L\'espérance de vie en bonne santé se distingue de l\'espérance de vie car elle…','Retranche les années vécues avec incapacité','Ne concerne que les enfants','Est toujours plus élevée','Ignore la mortalité',
   'Elle éclaire le vieillissement en bonne santé et l\'organisation des systèmes de soins, au-delà de la seule durée de vie.',
   'https://fr.wikipedia.org/wiki/Esp%C3%A9rance_de_vie_en_bonne_sant%C3%A9'),
 mk('Le travail décent selon l\'OIT exclut notamment…','Le travail des enfants et le travail forcé','Le travail à temps partiel choisi','Le télétravail','L\'apprentissage encadré',
   'Les conventions 138 (âge minimum) et 182 (pires formes de travail des enfants) sont largement ratifiées, y compris par le Togo.',
   'https://fr.wikipedia.org/wiki/Travail_des_enfants'),
] .forEach(x => hist.push(x));
[[8000000,3.0,240000],[6000000,2.5,150000],[10000000,2.8,280000],[4500000,3.2,144000],
 [12000000,2.0,240000],[7500000,2.4,180000],[5000000,3.5,175000],[9000000,2.2,198000],
 [3000000,4.0,120000],[15000000,1.8,270000],[2500000,3.6,90000],[11000000,2.6,286000]]
.forEach(([pop, tx, nais]) => hist.push(mk(
  `Une population de ${F(pop)} habitants a un taux de natalité de ${String(tx).replace('.', ',')} %. Nombre annuel de naissances :`,
  `${F(nais)}`, `${F(nais*2)}`, `${F(Math.round(nais/2))}`, `${F(pop)}`,
  `Naissances = ${F(pop)} × ${String(tx).replace('.', ',')} % = ${F(nais)} par an, soit un taux de ${tx*10} ‰.`,
  'https://fr.wikipedia.org/wiki/Taux_de_natalit%C3%A9')));
pk(D.HIST, 'Société et développement', 'Histoire, travail, santé et éducation — approfondissement', hist);

// CULTURE GÉNÉRALE & ENVIRONNEMENT
const cult = [];
[
 mk('Le cycle de l\'eau comprend, dans l\'ordre, notamment…','Évaporation, condensation, précipitation, ruissellement','Combustion, fusion, gel, érosion','Photosynthèse, respiration, digestion','Sédimentation, tectonique, volcanisme',
   'L\'énergie solaire l\'entretient ; le changement climatique en intensifie les extrêmes (sécheresses et pluies violentes).',
   'https://fr.wikipedia.org/wiki/Cycle_de_l%27eau'),
 mk('Les services écosystémiques désignent…','Les bénéfices que les sociétés tirent du fonctionnement des écosystèmes','Les emplois du secteur public','Les services bancaires verts','Les transports en commun',
   'Approvisionnement (eau, nourriture), régulation (climat, pollinisation), culturels et de support : leur dégradation a un coût économique majeur.',
   'https://fr.wikipedia.org/wiki/Services_%C3%A9cosyst%C3%A9miques'),
 mk('Le mécanisme REDD+ vise à rémunérer les pays pour…','La réduction des émissions liées à la déforestation et à la dégradation des forêts','L\'exportation de bois tropical','La construction de barrages','L\'extraction minière propre',
   'Il combine paiement pour résultats, sauvegardes sociales et mesure/notification/vérification des stocks de carbone forestiers.',
   'https://fr.wikipedia.org/wiki/REDD%2B'),
 mk('L\'adaptation au changement climatique se distingue de l\'atténuation car elle…','Réduit la vulnérabilité aux impacts déjà inévitables','Diminue les émissions de gaz à effet de serre','Supprime le réchauffement','Concerne seulement l\'industrie',
   'Variétés résistantes, alerte précoce, protection côtière : le Sahel et les zones littorales d\'Afrique de l\'Ouest y consacrent une part croissante de leurs plans.',
   'https://fr.wikipedia.org/wiki/Adaptation_au_changement_climatique'),
 mk('La Grande Muraille Verte africaine est un programme visant à…','Restaurer les terres dégradées sur une bande sahélienne transcontinentale','Construire un mur de béton','Interdire l\'agriculture','Créer une autoroute',
   'Lancée par l\'Union africaine (2007), elle associe reforestation, agroforesterie et développement rural de Dakar à Djibouti.',
   'https://fr.wikipedia.org/wiki/Grande_Muraille_verte_(Afrique)'),
 mk('Le principe pollueur-payeur signifie que…','Le coût de la dépollution incombe à l\'auteur de la pollution','L\'État paie toujours la dépollution','La pollution est autorisée si l\'on paie une amende symbolique','Les consommateurs seuls sont responsables',
   'Il internalise l\'externalité négative via taxes, redevances ou responsabilité élargie du producteur.',
   'https://fr.wikipedia.org/wiki/Principe_pollueur-payeur'),
 mk('Le lac Togo, la lagune de Lomé et le fleuve Mono font partie…','Du réseau hydrographique du sud du Togo','Du bassin du Niger','Du système du lac Tchad','Du delta du Nil',
   'Ces milieux sensibles subissent pression foncière, pollution urbaine et remontées salines ; certains sont classés zones humides Ramsar.',
   'https://fr.wikipedia.org/wiki/Lac_Togo'),
 mk('Le photovoltaïque convertit directement…','Le rayonnement solaire en électricité','La chaleur en mouvement','Le vent en chaleur','L\'eau en hydrogène',
   'Le Togo a inauguré la centrale solaire de Blitta (Sheikh Mohamed bin Zayed), l\'une des plus grandes d\'Afrique de l\'Ouest.',
   'https://fr.wikipedia.org/wiki/%C3%89nergie_solaire_photovolta%C3%AFque'),
] .forEach(x => cult.push(x));
[[250,4,1000],[180,6,1080],[320,3,960],[150,8,1200],[400,2,800],[220,5,1100],
 [90,10,900],[500,3,1500],[275,4,1100],[130,7,910],[600,2,1200],[340,5,1700]]
.forEach(([kwc, h, kwh]) => cult.push(mk(
  `Une installation solaire de ${F(kwc)} kWc produit ${h} heures équivalent pleine puissance par jour. Production quotidienne :`,
  `${F(kwh)} kWh`, `${F(kwh*2)} kWh`, `${F(kwc)} kWh`, `${F(Math.round(kwh/2))} kWh`,
  `Production = puissance × heures équivalentes = ${F(kwc)} × ${h} = ${F(kwh)} kWh par jour, soit environ ${F(kwh*365)} kWh par an.`,
  'https://fr.wikipedia.org/wiki/%C3%89nergie_solaire_photovolta%C3%AFque')));
pk(D.CULT, 'Environnement et repères', 'Culture générale et environnement — approfondissement', cult);

// ---------------------------------------------------------------------
// Passe finale : quelques combinaisons numériques produisent un
// distracteur identique à la bonne réponse (ex. croissance nominale
// égale à l'inflation). On les écarte en décalant la valeur numérique,
// de façon à garder 4 propositions distinctes et plausibles.
// ---------------------------------------------------------------------
function dedupeLocal(packs) {
  const numRe = /-?\d[\d  .,]*/;
  let fixed = 0;
  for (const p of packs) {
    for (const q of p.questions) {
      if (!Array.isArray(q.choices)) continue;
      const seen = new Set([q.choices[q.correctIndices[0]]]);
      q.choices = q.choices.map((c, i) => {
        if (i === q.correctIndices[0]) return c;
        let v = c, guard = 0;
        while (seen.has(v) && guard < 10) {
          const m = String(v).match(numRe);
          if (!m) { v = `${v} (autre estimation)`; break; }
          const n = parseFloat(m[0].replace(/[  ]/g, '').replace(',', '.'));
          const cand = [n + 3, n + 7, n * 2 + 1, n + 11, n * 3 + 2][guard % 5];
          const fmt = Number.isInteger(cand) ? cand.toLocaleString('fr-FR')
                                             : String(+cand.toFixed(1)).replace('.', ',');
          v = String(v).replace(m[0], fmt);
          guard++;
        }
        if (v !== c) fixed++;
        seen.add(v);
        return v;
      });
    }
  }
  return fixed;
}
dedupeLocal(out);

module.exports = { m1Packs: out, m2Packs: [], m3Packs: [] };
