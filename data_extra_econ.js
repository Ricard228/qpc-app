// =====================================================================
// data_extra_econ.js — Renforcement microéconomie + macroéconomie
// v2.5 : porter chaque domaine à ≥ 60 questions
// Microéconomie : +20 questions (5 packs M1)
// Macroéconomie : +40 questions (7 packs M1 + 2 packs M2)
// Sources : Mankiw, Varian, Romer, Blanchard, Krugman, Mishkin, Stiglitz
// =====================================================================

const MICRO_NAME = 'Microéconomie et théorie';
const MACRO_NAME = 'Macroéconomie et politiques';

function q(id, qText, choices, correctIndices, r, e, ref, pts) {
  const ci = Array.isArray(correctIndices) ? correctIndices : [correctIndices];
  return { id, q: qText, choices, correctIndices: ci, r, e, ref, pts: pts || 1 };
}

// ---------------------------------------------------------------------
// MANCHE 1 — séries de 4 questions à 1 pt (40 s pour les 4)
// ---------------------------------------------------------------------
const m1Packs = [
  // ================= MICROÉCONOMIE — 5 packs ========================
  {
    titre: 'Théorie du consommateur',
    theme: 'Choix du consommateur',
    domain: MICRO_NAME,
    questions: [
      q('q1', 'Que représente la courbe d\'indifférence en théorie du consommateur ?',
        ['L\'ensemble des paniers procurant le même niveau d\'utilité', 'L\'ensemble des paniers de même prix', 'L\'ensemble des paniers de même quantité totale', 'Le budget disponible du consommateur'], [0],
        'Paniers de même utilité',
        'Introduite par Edgeworth (1881) et formalisée par Pareto. Pente = TMS (Taux Marginal de Substitution) qui mesure la disposition à échanger un bien contre un autre tout en maintenant l\'utilité constante. Convexité = préférence pour la diversification.',
        'Varian, "Intermediate Microeconomics", chap. 3 ; Mankiw, chap. 21.'),
      q('q2', 'Qu\'est-ce que la contrainte budgétaire ?',
        ['L\'ensemble des paniers que le consommateur peut acheter avec son revenu', 'Le minimum vital requis', 'La somme des dépenses passées', 'Le revenu disponible après impôt'], [0],
        'Paniers accessibles avec le revenu',
        'Équation : p₁·x₁ + p₂·x₂ ≤ R où p sont les prix et R le revenu. Représentée par une droite (en 2D) dont la pente est −p₁/p₂. L\'optimum du consommateur se situe à la tangence entre cette droite et la plus haute courbe d\'indifférence accessible : TMS = p₁/p₂.',
        'Varian chap. 2 ; Mas-Colell, Whinston, Green, "Microeconomic Theory".'),
      q('q3', 'L\'effet revenu et l\'effet substitution décomposent…',
        ['L\'effet total d\'une variation de prix sur la consommation', 'L\'élasticité offre-prix', 'Le surplus du producteur', 'Le coût marginal'], [0],
        'Effet total d\'une variation de prix',
        'Équation de Slutsky : ΔX = effet de substitution (réallocation à utilité constante) + effet revenu (variation du pouvoir d\'achat). Pour un bien normal, les deux effets vont dans le même sens. Pour un bien inférieur, ils s\'opposent ; un bien de Giffen est tel que l\'effet revenu domine et inverse l\'effet total.',
        'Slutsky, 1915 ; Hicks, "Value and Capital", 1939.'),
      q('q4', 'Que désigne l\'élasticité-prix de la demande ?',
        ['Variation en % de la quantité demandée pour 1 % de variation du prix', 'La pente de la fonction de demande', 'Le ratio prix d\'équilibre / quantité d\'équilibre', 'La sensibilité de l\'offre au prix'], [0],
        'Variation en % de Q pour 1 % de variation de P',
        'ε = (ΔQ/Q)/(ΔP/P). En valeur absolue, |ε| > 1 = demande élastique ; |ε| < 1 = demande inélastique ; |ε| = 1 = élasticité unitaire. Liée à la stratégie tarifaire : si demande inélastique, hausse de prix → hausse du revenu total (cas typique des biens essentiels).',
        'Marshall, "Principles of Economics", 1890 ; Varian chap. 15.')
    ]
  },
  {
    titre: 'Théorie du producteur',
    theme: 'Production et coûts',
    domain: MICRO_NAME,
    questions: [
      q('q1', 'Qu\'est-ce que la productivité marginale d\'un facteur ?',
        ['La variation de production résultant d\'une unité supplémentaire de facteur', 'La production moyenne par travailleur', 'Le coût d\'une unité supplémentaire', 'Le bénéfice maximal possible'], [0],
        'Variation de production pour 1 unité de facteur en +',
        'PM(L) = ∂Q/∂L. La loi des rendements marginaux décroissants (énoncée par Turgot puis Ricardo) postule qu\'au-delà d\'un certain seuil, l\'apport additionnel d\'un facteur (à autres facteurs constants) génère un gain de production de plus en plus faible. À long terme, on peut varier tous les facteurs.',
        'Mankiw chap. 13 ; Varian chap. 19.'),
      q('q2', 'Que représente une isoquante ?',
        ['L\'ensemble des combinaisons de facteurs produisant la même quantité', 'L\'ensemble des combinaisons de même coût', 'Les facteurs au prix moyen du marché', 'Le seuil de rentabilité'], [0],
        'Combinaisons de facteurs à production constante',
        'Analogue de la courbe d\'indifférence côté producteur : Q(K, L) = constante. Sa pente (TMST = Taux Marginal de Substitution Technique) mesure la quantité de capital qu\'il faut substituer à une unité de travail pour maintenir la production. Optimum : tangence avec l\'isocoût (TMST = w/r).',
        'Varian chap. 19 ; Henderson & Quandt, "Microeconomic Theory".'),
      q('q3', 'Que désigne le coût marginal (CM) ?',
        ['Le coût d\'une unité supplémentaire produite', 'Le coût moyen par unité', 'Les coûts fixes amortis', 'L\'écart entre coût total et chiffre d\'affaires'], [0],
        'Coût d\'une unité supplémentaire',
        'CM = ∂CT/∂Q. Décision de production en CPP : produire jusqu\'à CM = P (prix). En monopole : CM = Rm (recette marginale). La courbe CM passe par le minimum des courbes CMU (coût moyen unitaire) et CVMU (coût variable moyen).',
        'Mankiw chap. 14 ; Pindyck & Rubinfeld.'),
      q('q4', 'Que sont les rendements d\'échelle ?',
        ['L\'évolution de la production quand tous les facteurs varient dans la même proportion', 'Le gain de productivité dans le temps', 'L\'effet d\'apprentissage', 'La part de marché atteinte'], [0],
        'Variation de Q quand tous les facteurs varient en λ',
        'Si Q(λK, λL) = λ^a Q(K, L) : a > 1 = rendements croissants (économies d\'échelle, ex. réseaux), a = 1 = constants (fonction homogène de degré 1 type Cobb-Douglas avec α + β = 1), a < 1 = décroissants. Distinct de la productivité marginale (court terme, 1 facteur).',
        'Cobb & Douglas, 1928 ; Varian chap. 18.')
    ]
  },
  {
    titre: 'Structures de marché',
    theme: 'Concurrence et monopole',
    domain: MICRO_NAME,
    questions: [
      q('q1', 'En concurrence pure et parfaite, quel est le profit économique de long terme ?',
        ['Nul (profit normal seulement)', 'Maximal', 'Égal au prix', 'Toujours négatif'], [0],
        'Nul à long terme',
        'Les 5 conditions de la CPP (atomicité, homogénéité, libre entrée/sortie, transparence, mobilité des facteurs) impliquent que tout profit positif attire de nouveaux entrants jusqu\'à élimination du surprofit. À long terme : P = CM = CMU min. Une firme couvre ses coûts d\'opportunité (profit comptable existe, profit économique = 0).',
        'Marshall, 1890 ; Varian chap. 23.'),
      q('q2', 'Le monopole maximise son profit lorsque…',
        ['Recette marginale = coût marginal', 'Prix = coût marginal', 'Prix = coût moyen', 'Recette totale est maximale'], [0],
        'Rm = CM',
        'Condition d\'optimum universelle des firmes en présence de pouvoir de marché. Le prix est ensuite tiré de la courbe de demande au-dessus du point Rm = CM. Marge prix-coût = indice de Lerner = (P − CM)/P = −1/ε (lié à l\'élasticité de la demande).',
        'Cournot, 1838 ; Lerner, 1934.'),
      q('q3', 'Qu\'est-ce que la concurrence monopolistique ?',
        ['Marché avec produits différenciés et libre entrée', 'Marché à un seul vendeur', 'Marché à quelques vendeurs en concurrence en prix', 'Marché bilatéral exclusif'], [0],
        'Produits différenciés + libre entrée',
        'Modèle de Chamberlin (1933) et Robinson (1933). Chaque firme a un pouvoir de monopole limité grâce à la différenciation (marque, design, localisation), mais la libre entrée annule les surprofits à long terme. P > CM mais profit = 0. Exemple : restaurants, parfumerie, librairies.',
        'Chamberlin, "The Theory of Monopolistic Competition", 1933.'),
      q('q4', 'Dans l\'oligopole de Cournot, les firmes choisissent…',
        ['Leurs quantités simultanément en anticipant celles des concurrents', 'Leurs prix simultanément', 'Leurs prix en séquence', 'Leur entrée ou sortie du marché'], [0],
        'Quantités simultanées (équilibre de Nash en quantités)',
        'Cournot (1838) : chaque firme maximise son profit en supposant que la quantité de l\'autre est donnée. Solution par fonctions de réaction. À 2 firmes symétriques, chacune produit 1/3 de la quantité concurrentielle (vs 1/2 en monopole). Plus le nombre de firmes augmente, plus on tend vers la CPP.',
        'Cournot, "Recherches sur les principes mathématiques de la théorie des richesses", 1838.')
    ]
  },
  {
    titre: 'Bien-être et équilibre',
    theme: 'Économie du bien-être',
    domain: MICRO_NAME,
    questions: [
      q('q1', 'Qu\'est-ce qu\'un optimum de Pareto ?',
        ['Une situation où on ne peut améliorer le sort d\'un agent sans détériorer celui d\'un autre', 'Une situation d\'égalité parfaite', 'Le maximum de production possible', 'Le minimum de chômage'], [0],
        'Aucune amélioration sans détérioration',
        'Critère introduit par Vilfredo Pareto (1906). Allocation efficace au sens de Pareto si tout changement amenant un gain pour quelqu\'un en cause une perte pour un autre. Un état Pareto-optimal n\'est pas nécessairement équitable. Premier théorème du bien-être : tout équilibre concurrentiel est un optimum de Pareto.',
        'Pareto, "Manuel d\'économie politique", 1906 ; Arrow & Debreu, 1954.'),
      q('q2', 'Que désigne le surplus du consommateur ?',
        ['La différence entre la disposition à payer et le prix effectivement payé', 'Le revenu disponible après dépenses', 'Le gain en quantité par rapport à la concurrence', 'L\'excédent commercial'], [0],
        'Disposition à payer − prix payé',
        'Mesure le bénéfice net retiré de l\'achat. Représenté graphiquement par l\'aire sous la courbe de demande au-dessus du prix. Symétriquement, le surplus du producteur = prix − coût marginal. La somme des deux est le surplus total, maximisé à l\'équilibre concurrentiel.',
        'Dupuit, 1844 ; Marshall, 1890.'),
      q('q3', 'Une externalité négative…',
        ['Génère un coût pour des agents non parties à la transaction', 'Augmente la production des biens publics', 'Améliore l\'équilibre walrasien', 'Concerne uniquement le commerce international'], [0],
        'Coût imposé à des tiers',
        'Ex. : pollution industrielle, tabagisme passif. Le coût social privé < coût social total → surproduction à l\'équilibre de marché. Théorème de Coase (1960) : si les coûts de transaction sont nuls et les droits de propriété définis, les agents peuvent négocier une solution efficace. Sinon, intervention publique requise (taxe pigouvienne, normes, marchés de droits).',
        'Pigou, 1920 ; Coase, 1960.'),
      q('q4', 'Qu\'est-ce qu\'un bien public au sens économique ?',
        ['Un bien à la fois non rival et non excluable', 'Un bien produit par l\'État', 'Un bien gratuit', 'Un bien accessible aux retraités'], [0],
        'Non rival ET non excluable',
        'Non rival : la consommation par un n\'empêche pas celle par un autre (≠ pomme). Non excluable : impossible (ou très coûteux) d\'empêcher la consommation (≠ péage). Exemples : défense nationale, éclairage public, savoir scientifique. Le marché tend à les sous-fournir (passager clandestin) → intervention publique nécessaire.',
        'Samuelson, "The Pure Theory of Public Expenditure", 1954.')
    ]
  },
  {
    titre: 'Théorie des jeux',
    theme: 'Interactions stratégiques',
    domain: MICRO_NAME,
    questions: [
      q('q1', 'Qu\'est-ce qu\'un équilibre de Nash ?',
        ['Une combinaison de stratégies où aucun joueur n\'a intérêt à dévier unilatéralement', 'Une issue qui maximise le profit total', 'Une stratégie aléatoire optimale', 'Un accord de coopération'], [0],
        'Aucune déviation profitable unilatérale',
        'Concept central défini par John Nash (1950, Nobel 1994). Chaque joueur joue sa meilleure réponse à la stratégie de l\'autre. Un jeu peut avoir 0, 1 ou plusieurs équilibres de Nash en stratégies pures. Le théorème de Nash garantit l\'existence d\'au moins un équilibre en stratégies mixtes pour tout jeu fini.',
        'Nash, "Equilibrium Points in N-Person Games", 1950.'),
      q('q2', 'Que désigne le « dilemme du prisonnier » ?',
        ['Un jeu où l\'équilibre de Nash est sous-optimal (Pareto-dominé)', 'Un problème d\'asymétrie d\'information', 'Une coalition dominante stable', 'Un jeu à somme nulle'], [0],
        'Équilibre Nash Pareto-dominé',
        'Formulé par Tucker (1950). Chaque joueur a intérêt à trahir, conduisant à un équilibre (T,T) où les deux trahissent ; or (C,C) coopèrent serait préférable à tous. Application classique : duopole sans accord = guerre des prix, course aux armements, exploitation des ressources communes (« tragédie des communs », Hardin 1968).',
        'Tucker, 1950 ; Axelrod, "Evolution of Cooperation", 1984.'),
      q('q3', 'Une stratégie est-elle dite « dominante » si…',
        ['Elle donne un payoff au moins aussi élevé quelle que soit la stratégie adverse', 'Elle maximise le profit moyen', 'Elle est utilisée par la majorité', 'Elle minimise les pertes'], [0],
        'Meilleure quelle que soit la stratégie adverse',
        'Une stratégie strictement dominante donne strictement plus dans tous les cas. Si chaque joueur a une stratégie dominante, leur intersection définit immédiatement l\'équilibre. C\'est le cas dans le dilemme du prisonnier (trahir est dominant pour les deux).',
        'Mas-Colell, Whinston, Green, chap. 7.'),
      q('q4', 'Le concept d\'équilibre parfait en sous-jeux concerne…',
        ['Les jeux séquentiels avec engagements crédibles', 'Les jeux à information imparfaite uniquement', 'Les jeux à somme nulle', 'Les jeux coopératifs avec transfert'], [0],
        'Jeux séquentiels + crédibilité',
        'Concept de Selten (1965, Nobel 1994). Affinement de Nash pour jeux dynamiques : l\'équilibre doit être un équilibre de Nash dans chaque sous-jeu. Élimine les menaces non crédibles. Résolution par induction à rebours (backward induction).',
        'Selten, "Spieltheoretische Behandlung eines Oligopolmodells", 1965.')
    ]
  },

  // ================= MACROÉCONOMIE — 7 packs M1 ======================
  {
    titre: 'Comptabilité nationale',
    theme: 'Agrégats macroéconomiques',
    domain: MACRO_NAME,
    questions: [
      q('q1', 'Comment se calcule le PIB par l\'approche dépenses ?',
        ['C + I + G + (X − M)', 'C + S + T', 'Salaires + Profits + Impôts indirects + Amortissements', 'Somme des valeurs ajoutées'], [0],
        'C + I + G + (X − M)',
        'Identité macroéconomique de Keynes : Consommation des ménages + Investissement brut + Dépenses publiques + Exportations nettes (X − M). Trois approches équivalentes du PIB : dépenses, production (ΣVA), revenus (salaires + EBE + impôts nets sur la production).',
        'Keynes, 1936 ; Mankiw, "Macroeconomics", chap. 2.'),
      q('q2', 'Qu\'est-ce que le PIB nominal vs réel ?',
        ['Nominal aux prix courants, réel aux prix d\'une année de base (corrigé de l\'inflation)', 'Nominal pour l\'État, réel pour les ménages', 'Nominal hors taxes, réel TTC', 'Nominal par habitant, réel total'], [0],
        'Aux prix courants vs constants',
        'PIB nominal = PIB en monnaie courante. PIB réel = PIB calculé aux prix d\'une année de référence, neutralisant l\'effet de l\'inflation. Déflateur du PIB = PIB nominal / PIB réel × 100. Le PIB réel est plus pertinent pour mesurer la croissance économique « vraie ».',
        'Mankiw chap. 2 ; Blanchard "Macroeconomics", chap. 2.'),
      q('q3', 'Que mesure le RNB (Revenu National Brut) ?',
        ['Le PIB + revenus reçus du reste du monde − revenus versés au reste du monde', 'Le total des salaires versés', 'Le PIB par habitant', 'L\'épargne nationale'], [0],
        'PIB + revenus nets de l\'extérieur',
        'Ex-PNB (Produit National Brut). Mesure ce qui revient aux résidents nationaux indépendamment du lieu de production. Pour les économies très ouvertes ou avec d\'importantes recettes pétrolières / diaspora, l\'écart RNB-PIB peut être significatif.',
        'SCN 2008 (Système de Comptabilité Nationale, ONU).'),
      q('q4', 'Que désigne la balance des paiements ?',
        ['Le relevé exhaustif des transactions économiques avec le reste du monde', 'Le solde des comptes publics', 'L\'écart entre épargne et investissement', 'Le déficit commercial'], [0],
        'Transactions avec le reste du monde',
        'Composée de : compte courant (biens, services, revenus, transferts) + compte de capital (transferts en capital) + compte financier (IDE, investissements de portefeuille, autres). L\'identité comptable impose la somme = 0 (sous réserve d\'écarts statistiques).',
        'BPM6 — FMI, "Balance of Payments and IIP Manual", 6e éd.')
    ]
  },
  {
    titre: 'Modèle IS-LM keynésien',
    theme: 'Équilibre biens-monnaie',
    domain: MACRO_NAME,
    questions: [
      q('q1', 'Que représente la courbe IS dans le modèle IS-LM ?',
        ['Les combinaisons (Y, i) pour lesquelles le marché des biens est en équilibre', 'Les combinaisons offre/demande de monnaie', 'Le marché du travail', 'La courbe d\'inflation'], [0],
        'Équilibre du marché des biens',
        'Investment-Saving : pour chaque taux d\'intérêt i, le niveau Y qui équilibre I(i) = S(Y). Pente négative : i baisse → I augmente → Y augmente via le multiplicateur. Modèle introduit par Hicks (1937) pour formaliser Keynes.',
        'Hicks, "Mr. Keynes and the Classics", 1937.'),
      q('q2', 'Que représente la courbe LM dans le modèle IS-LM ?',
        ['Les combinaisons (Y, i) où le marché de la monnaie est en équilibre', 'L\'évolution des prix', 'L\'élasticité de la consommation', 'Le multiplicateur d\'investissement'], [0],
        'Équilibre du marché de la monnaie',
        'Liquidity-Money : pour chaque revenu Y, le taux d\'intérêt i qui équilibre la demande de monnaie L(Y, i) avec l\'offre M/P. Pente positive : Y augmente → demande de monnaie augmente → i augmente pour rétablir l\'équilibre. Intersection IS-LM = équilibre macroéconomique de court terme.',
        'Hicks, 1937 ; Mankiw chap. 11.'),
      q('q3', 'Qu\'est-ce que le multiplicateur keynésien ?',
        ['L\'amplification d\'une dépense initiale par le circuit du revenu', 'Le rapport prix/salaire', 'Le coefficient capital/production', 'L\'effet de levier financier'], [0],
        'Amplification d\'une dépense initiale',
        'k = 1/(1 − c) où c est la propension marginale à consommer (PMC). Si c = 0.8, multiplicateur = 5 : une dépense initiale de 100 génère un revenu cumulé de 500. Si la PMC dans les importations augmente, le multiplicateur s\'affaiblit (multiplicateur de l\'économie ouverte = 1/(1 − c + m)).',
        'Kahn, 1931 ; Keynes, "Théorie générale", 1936, chap. 10.'),
      q('q4', 'Une politique budgétaire expansionniste dans IS-LM…',
        ['Déplace IS vers la droite, augmente Y et i (effet d\'éviction partiel)', 'Déplace LM vers la droite', 'N\'a aucun effet sur Y à long terme', 'Réduit toujours i'], [0],
        'IS vers la droite, Y et i augmentent',
        'Hausse de G ou baisse de T → IS vers la droite. Y augmente, i augmente (demande de monnaie en hausse, mais offre constante). L\'effet d\'éviction (crowding-out) limite l\'effet sur Y : l\'investissement privé recule face à la hausse de i.',
        'Mankiw chap. 12 ; Blanchard chap. 5.')
    ]
  },
  {
    titre: 'Offre globale / Demande globale',
    theme: 'Modèle AS-AD',
    domain: MACRO_NAME,
    questions: [
      q('q1', 'Que représente la courbe AD (demande globale) ?',
        ['La relation décroissante entre niveau général des prix et Y demandé', 'L\'offre des firmes', 'Le marché du travail', 'L\'épargne globale'], [0],
        'Y demandé en fonction du niveau des prix P',
        'Aggregate Demand : pente négative car (1) effet Pigou/encaisses réelles, (2) effet Keynes (P en baisse → M/P en hausse → i en baisse → I en hausse), (3) effet Mundell-Fleming (P en baisse → exportations en hausse). Dérivée du modèle IS-LM.',
        'Mankiw chap. 9 ; Blanchard chap. 6.'),
      q('q2', 'En courte période, la courbe AS (offre globale) est-elle…',
        ['Croissante (pente positive)', 'Verticale (rigide)', 'Décroissante', 'Horizontale toujours'], [0],
        'Croissante à court terme',
        'À court terme, salaires nominaux rigides → une hausse de P augmente le profit unitaire et incite les firmes à produire davantage. À long terme, salaires s\'ajustent → AS verticale au niveau de production potentielle Y*. Économistes néoclassiques voient AS verticale même à court terme (anticipations rationnelles).',
        'Phelps, 1968 ; Lucas, 1972.'),
      q('q3', 'Un choc d\'offre négatif (ex. hausse du prix du pétrole) provoque…',
        ['Une stagflation : baisse de Y et hausse de P', 'Une déflation et une récession', 'Une expansion non inflationniste', 'Aucun effet'], [0],
        'Stagflation (Y baisse, P augmente)',
        'AS se déplace vers la gauche/haut : à chaque niveau de Y, P augmente. Y diminue, P augmente. Phénomène emblématique des années 1970 (chocs pétroliers 1973, 1979). Difficulté pour les politiques : relancer Y aggrave P, lutter contre P aggrave la récession.',
        'Blinder, "Economic Policy and the Great Stagflation", 1979.'),
      q('q4', 'À long terme, le niveau de production est déterminé par…',
        ['Les facteurs structurels (capital, travail, technologie)', 'La masse monétaire', 'La politique budgétaire', 'Les anticipations'], [0],
        'Facteurs réels structurels',
        'Principe de la neutralité de la monnaie à long terme : la croissance est fonction des facteurs de production et de la productivité (Y*). Les politiques monétaire/budgétaire n\'affectent que les fluctuations autour de Y*. À long terme, la courbe AS est verticale → seuls les chocs d\'offre déplacent Y.',
        'Friedman, "The Role of Monetary Policy", AER 1968.')
    ]
  },
  {
    titre: 'Politique monétaire',
    theme: 'Banque centrale',
    domain: MACRO_NAME,
    questions: [
      q('q1', 'Quel est le mandat principal de la BCEAO ?',
        ['Stabilité des prix dans la zone UMOA', 'Croissance économique maximale', 'Plein emploi', 'Promotion des exportations'], [0],
        'Stabilité des prix',
        'Mandat principal défini par les statuts révisés en 2010 : maintenir la stabilité monétaire et financière, en particulier un objectif de cible d\'inflation. La parité fixe XOF / EUR (1 EUR = 655,957 FCFA) impose une ancre nominale stricte. Mandats secondaires : soutenir les politiques économiques de l\'UEMOA.',
        'BCEAO, Statuts ; Accord de coopération monétaire France-UMOA.'),
      q('q2', 'Que désigne le taux directeur d\'une banque centrale ?',
        ['Le taux auquel elle prête aux banques commerciales', 'Le taux des dépôts ménages', 'Le taux d\'inflation visé', 'Le taux d\'imposition optimal'], [0],
        'Taux auquel la BC prête aux banques',
        'Outil central de la politique monétaire. À la BCE : taux des opérations principales de refinancement. À la BCEAO : taux des appels d\'offres. Hausse du taux directeur → resserrement (limite la création monétaire, freine l\'activité, contient l\'inflation). Transmission via canal du taux d\'intérêt, du crédit, des prix d\'actifs, du change.',
        'Mishkin, "The Economics of Money, Banking, and Financial Markets".'),
      q('q3', 'Que sont les opérations d\'open-market ?',
        ['Achats/ventes de titres par la BC sur les marchés pour réguler la liquidité', 'Les opérations de change spéculatives', 'Les prêts directs au Trésor', 'Les nationalisations de banques'], [0],
        'Achats/ventes de titres par la BC',
        'Outil principal des banques centrales modernes. Achat de titres = injection de liquidité (expansion) ; vente = retrait (resserrement). À grande échelle = Quantitative Easing (QE) utilisé depuis 2008 par Fed, BCE, BoJ pour faire baisser les taux longs lorsque les taux courts sont à zéro.',
        'Bernanke, "The Federal Reserve and the Financial Crisis", 2013.'),
      q('q4', 'Que désigne la « trappe à liquidité » ?',
        ['Situation où la politique monétaire devient inefficace (i ≈ 0, agents préfèrent liquidité)', 'Inflation galopante', 'Excès d\'épargne des ménages', 'Restriction du crédit'], [0],
        'Politique monétaire inefficace au taux zéro',
        'Concept keynésien : à des taux d\'intérêt très bas (zéro lower bound), la BC ne peut plus baisser les taux et les agents préfèrent détenir des liquidités plutôt qu\'investir. Situation observée au Japon (« décennie perdue ») et après la crise de 2008 dans les économies développées → politiques non conventionnelles (QE, forward guidance, taux négatifs).',
        'Keynes, 1936 ; Krugman, "It\'s Baaack!", BPEA 1998.')
    ]
  },
  {
    titre: 'Politique budgétaire',
    theme: 'Finances publiques',
    domain: MACRO_NAME,
    questions: [
      q('q1', 'Que désigne le solde primaire budgétaire ?',
        ['Solde budgétaire hors charges d\'intérêts de la dette', 'Le revenu net des ménages', 'Le solde de la balance commerciale', 'Le déficit cumulé sur 10 ans'], [0],
        'Solde hors intérêts de la dette',
        'Solde primaire = Recettes − Dépenses (hors intérêts). Indicateur clé de soutenabilité : un solde primaire positif permet de stabiliser le ratio dette/PIB. Équation de Domar : la dette explose si le taux d\'intérêt réel sur la dette > taux de croissance du PIB ET si le solde primaire est négatif.',
        'Domar, 1944 ; FMI, "Fiscal Monitor".'),
      q('q2', 'Que dit le théorème de l\'équivalence ricardienne (Barro 1974) ?',
        ['Un financement par dette équivaut à un financement par impôt si les ménages anticipent les hausses futures', 'Le commerce extérieur compense toujours le déficit budgétaire', 'Les multiplicateurs budgétaires sont constants', 'La dette publique est toujours inflationniste'], [0],
        'Dette ≈ impôt avec anticipations rationnelles',
        'Sous hypothèses fortes (anticipations rationnelles, ménages altruistes intergénérationnellement, marchés parfaits), un déficit budgétaire est compensé par une hausse de l\'épargne privée ; la consommation et donc l\'activité ne s\'en trouvent pas modifiées. Empiriquement, l\'équivalence n\'est pas vérifiée intégralement.',
        'Barro, "Are Government Bonds Net Wealth?", JPE 1974.'),
      q('q3', 'Quelles sont les règles budgétaires de convergence en UEMOA ?',
        ['Déficit ≤ 3 % du PIB, dette ≤ 70 % du PIB, taux d\'inflation ≤ 3 %', 'Déficit ≤ 5 %, dette ≤ 100 %', 'Aucune règle de convergence', 'Identiques à celles de Maastricht'], [0],
        'Pacte de Convergence UEMOA',
        'Pacte de Convergence, de Stabilité, de Croissance et de Solidarité (PCSCS), adopté en 1999, révisé en 2015. 4 critères de 1er rang : déficit ≤ 3 % PIB, dette ≤ 70 % PIB, inflation ≤ 3 %, financement BC du déficit interdit. Sanctions possibles en cas de non-respect.',
        'UEMOA, "Pacte de Convergence" 1999/2015.'),
      q('q4', 'Le multiplicateur budgétaire est généralement plus élevé…',
        ['Lorsque l\'économie est en récession et que les taux sont à zéro', 'En haute conjoncture', 'En économie très ouverte', 'En période de forte inflation'], [0],
        'En récession et au taux zéro',
        'Études du FMI et de la BCE post-2010 : multiplicateur ≈ 0.5 en haute conjoncture, jusqu\'à 1.5-2 en récession profonde avec contrainte de taux zéro. Raisons : (1) capacités inutilisées, (2) absence d\'effet d\'éviction monétaire, (3) ménages contraints liquidités. Plaidoyer pour relance budgétaire en bas de cycle.',
        'Blanchard & Leigh, "Growth Forecast Errors and Fiscal Multipliers", IMF WP 2013/1.')
    ]
  },
  {
    titre: 'Croissance économique',
    theme: 'Modèles de croissance',
    domain: MACRO_NAME,
    questions: [
      q('q1', 'Que dit le modèle de Solow sur la croissance de long terme ?',
        ['Sans progrès technique, la croissance par tête tend vers zéro à l\'état stationnaire', 'La croissance est exponentielle indéfiniment', 'Le capital ne joue aucun rôle', 'L\'épargne maximise toujours la croissance'], [0],
        'État stationnaire sans progrès technique',
        'Modèle de Solow (1956, Nobel 1987) : fonction de production néoclassique Y = F(K, L), épargne s, dépréciation δ, taux de croissance démographique n. Convergence vers k* tel que sf(k*) = (n + δ)k*. À l\'état stationnaire, seul le progrès technique (exogène, paramètre A) génère une croissance soutenue de Y/L.',
        'Solow, "A Contribution to the Theory of Economic Growth", QJE 1956.'),
      q('q2', 'Qu\'est-ce que la « convergence conditionnelle » ?',
        ['Les pays similaires convergent vers le même état stationnaire', 'Les pays riches rattrapent toujours les pays pauvres', 'La convergence est garantie en libre-échange', 'Les économies convergent vers une même monnaie'], [0],
        'Convergence pour pays similaires',
        'Robert Barro & Sala-i-Martin : les pays convergent au sein de groupes partageant les mêmes paramètres structurels (taux d\'épargne, démographie, institutions). Convergence absolue (entre tous pays) non vérifiée empiriquement, mais convergence conditionnelle largement observée. Vitesse ≈ 2 % par an.',
        'Barro & Sala-i-Martin, "Economic Growth", 2e éd. 2003.'),
      q('q3', 'Que postule la croissance endogène (Romer, Lucas, Aghion-Howitt) ?',
        ['Le progrès technique est expliqué par des choix économiques (R&D, capital humain, innovation)', 'La croissance est aléatoire', 'L\'État ne peut influer sur la croissance', 'La croissance dépend uniquement du commerce'], [0],
        'Progrès technique endogène',
        'Réponse aux limites du modèle de Solow où le progrès technique reste exogène. Romer (1990, Nobel 2018) : R&D produit des idées non rivales → rendements croissants. Lucas (1988) : capital humain via éducation. Aghion-Howitt (1992) : destruction créatrice schumpétérienne. Justifient des politiques actives (subventions R&D, éducation, brevets).',
        'Romer, "Endogenous Technological Change", JPE 1990.'),
      q('q4', 'Que désigne le « piège du revenu intermédiaire » ?',
        ['Difficulté pour les pays émergents à dépasser le statut de revenu intermédiaire', 'Trappe d\'extrême pauvreté', 'Stagflation prolongée', 'Inégalités explosives'], [0],
        'Pays émergents bloqués au revenu intermédiaire',
        'Concept popularisé par la Banque mondiale (Gill & Kharas 2007). Phénomène où des économies, après une phase de rattrapage industriel, peinent à passer du modèle de croissance par accumulation de facteurs à un modèle par innovation et productivité. Politiques recommandées : investir en capital humain, R&D, institutions, structures de marché.',
        'Gill & Kharas, "An East Asian Renaissance", Banque mondiale 2007.')
    ]
  },
  {
    titre: 'Inflation et chômage',
    theme: 'Phillips, anticipations',
    domain: MACRO_NAME,
    questions: [
      q('q1', 'Que décrit la courbe de Phillips originale (1958) ?',
        ['Relation inverse entre inflation des salaires et taux de chômage', 'Relation entre PIB et investissement', 'Lien entre offre de monnaie et prix', 'Effet du taux d\'intérêt sur le change'], [0],
        'Inflation salariale inverse du chômage',
        'A. W. Phillips a observé empiriquement (UK 1861-1957) une relation décroissante entre taux de variation des salaires nominaux et taux de chômage. Samuelson-Solow 1960 ont transposé sur l\'inflation des prix → arbitrage chômage-inflation. Apparemment exploité dans les années 1960 par les politiques expansionnistes.',
        'Phillips, "The Relation Between Unemployment and the Rate of Change of Money Wage Rates", Economica 1958.'),
      q('q2', 'Que dit la critique de Friedman-Phelps sur la courbe de Phillips ?',
        ['L\'arbitrage n\'existe qu\'à court terme ; à long terme, le chômage tend vers le NAIRU quelle que soit l\'inflation', 'L\'arbitrage est permanent et stable', 'L\'inflation cause toujours le chômage', 'Phillips était empiriquement erroné'], [0],
        'Arbitrage seulement à court terme',
        'Friedman (1968) et Phelps (1967) : les agents finissent par anticiper l\'inflation et ajustent les salaires nominaux. À long terme, courbe de Phillips verticale au taux de chômage naturel (NAIRU = Non-Accelerating Inflation Rate of Unemployment). Toute tentative de réduire u en dessous du NAIRU génère seulement de l\'inflation accélérée. Confirmé par la stagflation des années 1970.',
        'Friedman, AER 1968 ; Phelps, "Phillips Curves, Expectations of Inflation and Optimal Employment", Economica 1967.'),
      q('q3', 'Que désignent les anticipations rationnelles (Muth, Lucas) ?',
        ['Les agents utilisent toute l\'information disponible et ne se trompent pas systématiquement', 'Les agents anticipent toujours correctement', 'Les agents se basent sur le passé uniquement', 'Les agents ignorent les politiques publiques'], [0],
        'Information complète, erreurs non systématiques',
        'Hypothèse Muth (1961), généralisée par Lucas (Nobel 1995). Les anticipations sont en moyenne correctes (espérance mathématique). Conséquence forte : seules les politiques inattendues affectent l\'activité réelle ; les politiques anticipées sont neutralisées. Base de la critique de Lucas (1976) : les modèles macroéconométriques ne peuvent simuler des changements de politique.',
        'Muth, 1961 ; Lucas, "Econometric Policy Evaluation: A Critique", 1976.'),
      q('q4', 'Que représente l\'indice IPC (Indice des Prix à la Consommation) ?',
        ['Une moyenne pondérée des prix d\'un panier représentatif de biens consommés', 'Le prix moyen des biens produits dans le pays', 'Les prix de gros', 'Les prix à l\'exportation'], [0],
        'Moyenne pondérée d\'un panier représentatif',
        'Calcul de type Laspeyres : Σ(p_t × q_0) / Σ(p_0 × q_0). Pondérations issues d\'enquêtes de consommation. Limites : biais de substitution (les ménages adaptent leur panier), biais de qualité (amélioration mal mesurée), biais d\'introduction de nouveaux biens. Le déflateur du PIB (Paasche) est complémentaire pour l\'inflation des biens produits localement.',
        'BCEAO Statistiques ; ILO, Consumer Price Index Manual, 2004.')
    ]
  }
];

// ---------------------------------------------------------------------
// MANCHE 2 — duels (6 questions valant 1 à 6 pts)
// ---------------------------------------------------------------------
const m2Packs = [
  {
    titre: 'Macroéconomie ouverte — duel',
    theme: 'Économie internationale',
    domain: MACRO_NAME,
    questions: [
      q('q1', 'Que désigne la PPA (Parité de Pouvoir d\'Achat) ?',
        ['Théorie selon laquelle les taux de change s\'ajustent pour égaliser le pouvoir d\'achat international', 'Pacte de Politique Africaine', 'Plan de Promotion Agricole', 'Préférence Politique pour l\'Activité'], [0],
        'Égalisation du pouvoir d\'achat',
        'PPA absolue : 1 unité de monnaie domestique achète le même panier qu\'à l\'étranger après conversion. PPA relative : les variations de taux de change compensent les écarts d\'inflation. Empirique : PPA non vérifiée à court terme (volatilité du change) mais bonne approximation à long terme.',
        'Cassel, 1918 ; Rogoff, "The Purchasing Power Parity Puzzle", JEL 1996.', 1),
      q('q2', 'Le modèle de Mundell-Fleming concerne…',
        ['Une économie ouverte en régime de change fixe ou flexible', 'Une économie fermée', 'Le marché du travail uniquement', 'La fiscalité optimale'], [0],
        'Économie ouverte (extension de IS-LM)',
        'Mundell (1963, Nobel 1999) & Fleming (1962) : extension d\'IS-LM au cas d\'une économie ouverte avec mobilité des capitaux. Conclusion clé : « triangle d\'incompatibilité » — un pays ne peut avoir simultanément (1) mobilité parfaite des capitaux, (2) change fixe, (3) autonomie de politique monétaire. Doit en choisir 2 sur 3.',
        'Mundell, JCEPS 1963 ; Fleming, IMF Staff Papers 1962.', 2),
      q('q3', 'Qu\'est-ce que le « péché originel » au sens d\'Eichengreen-Hausmann ?',
        ['Incapacité d\'un pays émergent à emprunter en sa propre monnaie sur les marchés internationaux', 'Premier déficit budgétaire', 'Sortie de la zone monétaire', 'Première dépréciation de la monnaie'], [0],
        'Emprunt en devises étrangères forcé',
        'Eichengreen & Hausmann (1999) : les pays émergents endettés en devises étrangères s\'exposent à un « currency mismatch » dévastateur en cas de dépréciation. Cas typique : crise asiatique 1997-98, crise argentine 2001-02. Plaidoyer pour développer les marchés locaux en monnaie nationale (objectif central de la BRVM et UMOA-Titres).',
        'Eichengreen, Hausmann, Panizza, "Currency Mismatches, Debt Intolerance and the Original Sin", NBER 2003.', 3),
      q('q4', 'Que désigne la « condition de Marshall-Lerner » ?',
        ['Une dépréciation améliore la balance commerciale si la somme des élasticités-prix des exportations et importations > 1', 'Les exportations sont toujours élastiques', 'Le déficit commercial s\'autocorrige', 'Le taux de change est fixe à long terme'], [0],
        'Σ élasticités > 1',
        'Condition mathématique pour qu\'une dépréciation produise l\'effet attendu (amélioration BC). Dans la pratique, la « courbe en J » montre que les effets sont initialement défavorables (volumes lents à s\'ajuster, prix d\'importation hausse immédiate) avant amélioration progressive.',
        'Marshall, 1923 ; Lerner, "The Economics of Control", 1944.', 4),
      q('q5', 'Quel régime de change l\'UEMOA pratique-t-elle ?',
        ['Change fixe avec parité fixe XOF/EUR (655,957 FCFA = 1 €)', 'Change flottant', 'Currency board avec USD', 'Système hybride à bande'], [0],
        'Change fixe XOF/EUR',
        'Le franc CFA d\'Afrique de l\'Ouest (XOF) est arrimé à l\'euro depuis 1999 (auparavant au franc français depuis 1948). Parité fixe 1 EUR = 655,957 XOF. Soutenu par une garantie de convertibilité du Trésor français. Régime offrant stabilité nominale mais limitant l\'autonomie monétaire (triangle d\'incompatibilité de Mundell).',
        'Accord de coopération monétaire France-UMOA 1973 ; Coopération monétaire 2019.', 5),
      q('q6', 'Que sont les IDE (Investissements Directs Étrangers) ?',
        ['Prises de participation ≥ 10 % du capital d\'une entreprise étrangère par un investisseur', 'Crédits bancaires internationaux', 'Achats d\'obligations souveraines', 'Réserves de change officielles'], [0],
        'Participation ≥ 10 % au capital étranger',
        'Définition statistique du FMI (BPM6) et de l\'OCDE : seuil de 10 % de droits de vote considéré comme intention de contrôle/influence durable. Distincts des investissements de portefeuille (titres < 10 %). Les IDE incluent : création de filiales (greenfield), fusions-acquisitions (brownfield), réinvestissement de bénéfices, prêts intra-groupe.',
        'OCDE, "Benchmark Definition of FDI", 4e éd. 2008 ; FMI BPM6.', 6)
    ]
  },
  {
    titre: 'Politiques macroéconomiques — duel',
    theme: 'Politique monétaire et budgétaire',
    domain: MACRO_NAME,
    questions: [
      q('q1', 'Que désigne la règle de Taylor ?',
        ['Une règle de fixation du taux directeur fonction de l\'écart d\'inflation et de l\'output gap', 'Une règle d\'augmentation de salaires', 'Une stratégie de dépenses publiques', 'Un quota d\'importation optimal'], [0],
        'Taux directeur = f(inflation, output gap)',
        'John B. Taylor (1993) : i = r* + π + α(π − π*) + β(y − y*) où typiquement α ≈ 1.5 et β ≈ 0.5. Règle simple permettant à la BC d\'ajuster sa politique au cycle. Devenue référence pour évaluer les décisions de la Fed et de la BCE.',
        'Taylor, "Discretion versus Policy Rules in Practice", 1993.', 1),
      q('q2', 'Que désigne le « zero lower bound » (ZLB) en politique monétaire ?',
        ['Limite inférieure des taux d\'intérêt nominaux à zéro (limite la politique conventionnelle)', 'Inflation à zéro', 'Croissance zéro', 'Déficit budgétaire nul'], [0],
        'Plancher des taux à 0',
        'Contrainte : un taux nominal négatif inciterait à thésauriser. Quand la BC atteint le ZLB, elle doit recourir à des outils non conventionnels (forward guidance, QE, taux de prêt négatifs aux banques, achats d\'actifs risqués). Phénomène observé au Japon dès 1995 et dans les économies développées après 2008-2009.',
        'Krugman, BPEA 1998 ; Bernanke, BPEA 2004.', 2),
      q('q3', 'Quelle est la principale source du seigneuriage monétaire pour un État ?',
        ['Revenus tirés de l\'émission de monnaie banque centrale', 'Recettes fiscales', 'Tarifs douaniers', 'Privatisations'], [0],
        'Émission monétaire',
        'Seigneuriage = base monétaire × taux d\'intérêt nominal (approximation). Dans les pays développés, source négligeable (1-2 % PIB max). Dans certains pays en crise, le recours à la création monétaire pour financer le déficit budgétaire devient inflationniste (Allemagne 1923, Zimbabwe 2008, Venezuela 2018).',
        'Cagan, "The Monetary Dynamics of Hyperinflation", 1956.', 3),
      q('q4', 'Que désigne la « politique de stop-and-go » ?',
        ['Alternance de phases de relance et de stabilisation pour gérer le cycle', 'Politique d\'ouverture commerciale graduelle', 'Politique antitrust segmentée', 'Politique de subventions sectorielles'], [0],
        'Alternance relance / stabilisation',
        'Politique conjoncturelle pratiquée notamment au Royaume-Uni dans les années 1950-60 : relance budgétaire en bas de cycle (« go ») / freinage anti-inflationniste en haut de cycle (« stop »). Critiquée pour amplifier les fluctuations et générer de l\'instabilité. Concept popularisé par les économistes britanniques R. Kahn, J. Robinson.',
        'Tinbergen, "On the Theory of Economic Policy", 1952.', 4),
      q('q5', 'Que désigne le « ratio sacrifice » (sacrifice ratio) ?',
        ['Coût en termes de PIB perdu nécessaire pour réduire l\'inflation d\'un point', 'Part du salaire imposée', 'Ratio dette / PIB', 'Coefficient capital / travail'], [0],
        'PIB perdu pour 1 pt d\'inflation en moins',
        'Mesure du coût d\'une politique désinflationniste : combien de points de PIB faut-il sacrifier pour réduire l\'inflation de 1 point ? Estimé à ~3-5 dans les économies avancées (avec persistance importante). Plus le ratio est faible, plus les anticipations sont rapidement ancrées. La crédibilité de la BC le réduit.',
        'Okun, 1978 ; Ball, "What Determines the Sacrifice Ratio?", NBER 1994.', 5),
      q('q6', 'Le « New Public Management » (NPM) recommande quoi en politique budgétaire ?',
        ['Gestion publique par résultats, contractualisation, indicateurs de performance', 'Nationalisation systématique', 'Centralisation administrative', 'Budgets en équilibre annuel obligatoire'], [0],
        'GAR + indicateurs de performance',
        'Né dans les années 1980 (Royaume-Uni de Thatcher, Nouvelle-Zélande). Inspire le LOLF en France (2001), les programmes Budget-Programme en UEMOA (transposition 2009-2012). Vise à passer d\'une logique de moyens à une logique de résultats : objectifs, indicateurs, redevabilité.',
        'Hood, "A Public Management for All Seasons?", PA 1991.', 6)
    ]
  }
];

const m3Packs = [];  // pas de pack M3 dans cette extension

module.exports = { m1Packs, m2Packs, m3Packs, MICRO_NAME, MACRO_NAME };
