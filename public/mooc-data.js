// =====================================================================
// mooc-data.js — MOOC QPC (v2.40) — partie 1/3
// Cours en ligne par domaine : leçons progressives, blocs typés
// (c = concept, m = méthode, e = exemple appliqué, p = piège, f = formule),
// « À retenir » et références vérifiées pour approfondissement.
// Le quiz de fin de leçon et l'évaluation finale utilisent les vraies
// questions du domaine (API /api/packs).
// =====================================================================
window.MOOC_DATA = Object.assign(window.MOOC_DATA || {}, {

"Microéconomie et théorie": {
  icon: "📈",
  tagline: "Comprendre les choix des consommateurs, des producteurs et les mécanismes de marché.",
  duree: "≈ 2 h 15",
  objectifs: [
    "Maîtriser l'arbitrage du consommateur (utilité, contrainte budgétaire, TMS)",
    "Analyser l'offre du producteur à partir des coûts (CM, Cm) et du profit",
    "Calculer et interpréter les élasticités (prix, revenu, croisée)",
    "Comparer les structures de marché : concurrence, monopole, oligopole",
    "Diagnostiquer les défaillances de marché (externalités, biens publics, asymétries)"
  ],
  lecons: [
    { titre: "Le consommateur : préférences, utilité et demande", duree: "20 min",
      blocs: [
        { t: "c", titre: "Rationalité et utilité", tx: "Le consommateur choisit le panier qui maximise sa satisfaction (utilité) compte tenu de son revenu et des prix. L'utilité marginale — le supplément d'utilité procuré par la dernière unité consommée — est décroissante : la première bouteille d'eau vaut plus que la dixième. Les courbes d'indifférence représentent les paniers procurant la même satisfaction ; leur pente (en valeur absolue) est le taux marginal de substitution (TMS)." },
        { t: "f", titre: "Équilibre du consommateur", tx: "À l'optimum, le rapport des utilités marginales égale le rapport des prix : Um_x/Um_y = Px/Py, autrement dit le TMS égale le rapport des prix. Si Um_x/Px > Um_y/Py, il faut réallouer une partie du budget vers le bien x : chaque franc CFA dépensé en x rapporte plus d'utilité." },
        { t: "e", titre: "Application UEMOA", tx: "Un ménage de Lomé alloue 60 000 FCFA entre maïs et riz. Quand le prix du riz importé augmente (choc mondial), la droite de budget pivote : l'effet de substitution pousse vers le maïs local, l'effet de revenu réduit la consommation totale. La demande de maïs, bien normal ici, augmente sur les marchés d'Agoè ou d'Adawlato." },
        { t: "p", titre: "Ne pas confondre", tx: "Un déplacement LE LONG de la courbe de demande (variation du prix propre) n'est pas un DÉPLACEMENT de la courbe (variation du revenu, des goûts, du prix des autres biens). Dire « le prix baisse donc la demande augmente » est ambigu : c'est la quantité demandée qui augmente." }
      ],
      retenir: [
        "Optimum du consommateur : TMS = rapport des prix (Um_x/Px = Um_y/Py)",
        "Utilité marginale décroissante ⇒ courbes d'indifférence convexes",
        "Effet prix = effet de substitution + effet de revenu (décomposition de Slutsky)",
        "Bien normal : demande ↑ avec le revenu ; bien inférieur : demande ↓"
      ],
      refs: ["Varian H., Introduction à la microéconomie, De Boeck (9e éd.)", "Pindyck R. & Rubinfeld D., Microéconomie, Pearson"] },
    { titre: "Le producteur : coûts, offre et profit", duree: "20 min",
      blocs: [
        { t: "c", titre: "De la production aux coûts", tx: "La fonction de production relie les facteurs (travail L, capital K) au produit. À court terme, le capital est fixe : la productivité marginale du travail finit par décroître (loi des rendements décroissants). Les coûts se décomposent en coûts fixes (loyer, machines) et variables (matières, main-d'œuvre) ; le coût moyen (CM) est en U, traversé au minimum par le coût marginal (Cm)." },
        { t: "f", titre: "Règle d'offre concurrentielle", tx: "En concurrence parfaite, l'entreprise est preneuse de prix et produit tant que P ≥ Cm, jusqu'à P = Cm. Elle reste à court terme si P couvre le coût variable moyen (seuil de fermeture) ; elle est rentable si P dépasse le CM (seuil de rentabilité). Sa courbe d'offre est la partie croissante du Cm au-dessus du CVM." },
        { t: "e", titre: "Exemple togolais", tx: "Une unité de transformation d'ananas à Kpalimé : four et bâtiments = coûts fixes ; fruits, énergie, saisonniers = coûts variables. Si le prix export du jus baisse sous le coût variable moyen, mieux vaut suspendre la production ; entre CVM et CM, on produit à perte comptable mais on amortit les coûts fixes." },
        { t: "p", titre: "Coût comptable ≠ coût économique", tx: "Le coût économique inclut le coût d'opportunité : le salaire auquel l'entrepreneur renonce, la location fictive de son propre local. Un « profit comptable » positif peut cacher un profit économique nul — c'est justement la situation d'équilibre de long terme en concurrence." }
      ],
      retenir: [
        "Cm coupe CM et CVM en leurs minimums",
        "Offre concurrentielle : P = Cm (au-dessus du min du CVM)",
        "Long terme concurrentiel : profit économique nul, P = min CM",
        "Rendements d'échelle : comparer f(λK, λL) à λ·f(K, L)"
      ],
      refs: ["Varian H., Introduction à la microéconomie, De Boeck", "Carlton D. & Perloff J., Économie industrielle, De Boeck"] },
    { titre: "Élasticités et surplus : mesurer les réactions du marché", duree: "18 min",
      blocs: [
        { t: "f", titre: "Les trois élasticités", tx: "Élasticité-prix de la demande : e = (ΔQ/Q)/(ΔP/P) — demande élastique si |e| > 1, inélastique si |e| < 1. Élasticité-revenu : positive (bien normal), supérieure à 1 (bien supérieur), négative (bien inférieur). Élasticité croisée : positive entre substituts (maïs/riz), négative entre compléments (moto/essence)." },
        { t: "m", titre: "Élasticité et recette totale", tx: "Si la demande est inélastique, une hausse de prix AUGMENTE la recette totale (les quantités baissent peu) ; si elle est élastique, la hausse de prix la RÉDUIT. C'est le test décisif pour une politique tarifaire : taxer un bien inélastique (carburant, tabac) rapporte ; taxer un bien élastique fait fuir la demande." },
        { t: "c", titre: "Surplus et efficacité", tx: "Le surplus du consommateur est l'écart entre la disposition à payer et le prix ; celui du producteur, l'écart entre le prix et le coût marginal. L'équilibre concurrentiel maximise le surplus total. Taxes, prix plafonds et quotas créent une perte sèche : des échanges mutuellement avantageux ne se réalisent plus." },
        { t: "e", titre: "Prix plafond du ciment", tx: "Un plafonnement du prix du ciment sous l'équilibre crée une pénurie : quantité demandée > quantité offerte, files d'attente et marché parallèle. Le surplus se redistribue mais la perte sèche mesure les sacs non produits qui auraient valu plus que leur coût." }
      ],
      retenir: [
        "|e| > 1 : baisse de prix ⇒ recette ↑ ; |e| < 1 : hausse de prix ⇒ recette ↑",
        "Perte sèche = triangles d'échanges perdus (taxe, plafond, monopole)",
        "L'incidence d'une taxe pèse sur le côté le moins élastique du marché"
      ],
      refs: ["Mankiw G., Principes de l'économie, Economica", "Stiglitz J. & Walsh C., Principes d'économie moderne, De Boeck"] },
    { titre: "Structures de marché et défaillances", duree: "22 min",
      blocs: [
        { t: "c", titre: "Du monopole à l'oligopole", tx: "Le monopole égalise recette marginale et coût marginal (Rm = Cm) puis fixe le prix sur la demande : prix > Cm, quantités réduites, perte sèche. L'oligopole introduit l'interdépendance stratégique : en Cournot on choisit les quantités, en Bertrand les prix, et le cartel — instable — reproduit le monopole. La concurrence monopolistique (différenciation) laisse un profit nul à long terme malgré un pouvoir de marché local." },
        { t: "c", titre: "Défaillances de marché", tx: "Externalités (pollution, vaccination), biens publics (non-rivaux et non-excluables : éclairage public, défense), asymétries d'information (antisélection d'Akerlof, aléa moral) : dans ces cas l'équilibre de marché n'est plus efficace. Corrections : taxe pigouvienne, subvention, marchés de droits, réglementation, signalisation et incitations." },
        { t: "e", titre: "Mototaxis et assurance", tx: "L'assurance des zémidjans illustre les deux asymétries : l'antisélection (les conducteurs les plus risqués s'assurent davantage) pousse les primes à la hausse ; l'aléa moral (une fois assuré, on prend plus de risques) exige franchises et bonus-malus." },
        { t: "p", titre: "Monopole ≠ toujours illégitime", tx: "Le monopole naturel (coûts fixes massifs, CM décroissant : eau, électricité) justifie un opérateur unique régulé plutôt qu'une concurrence coûteuse. Le problème n'est pas l'existence du monopole mais l'absence de régulation de son prix." }
      ],
      retenir: [
        "Monopole : Rm = Cm puis prix lu sur la demande ; indice de Lerner (P−Cm)/P = 1/|e|",
        "Bien public : non-rivalité + non-exclusion ⇒ passager clandestin ⇒ financement public",
        "Externalité : taxe/subvention pigouvienne ramène au coût social",
        "Akerlof (1970) : l'asymétrie d'information peut faire disparaître le marché"
      ],
      refs: ["Akerlof G., « The Market for Lemons », QJE, 1970", "Tirole J., Économie du bien commun, PUF", "Varian H., Introduction à la microéconomie, De Boeck"] }
  ],
  refsGlobales: [
    "Varian H., Introduction à la microéconomie, De Boeck — le manuel de référence du niveau licence/master",
    "Pindyck R. & Rubinfeld D., Microéconomie, Pearson — nombreuses applications chiffrées",
    "Tirole J. (prix Nobel 2014), Économie du bien commun, PUF — mise en perspective accessible",
    "Cours en ligne : MIT OpenCourseWare 14.01 (ocw.mit.edu), Khan Academy (fr.khanacademy.org)"
  ]
},

"Macroéconomie et politiques": {
  icon: "🌐",
  tagline: "PIB, inflation, chômage, politiques budgétaire et monétaire : le tableau de bord d'une économie.",
  duree: "≈ 2 h 15",
  objectifs: [
    "Mesurer l'activité : PIB (3 approches), PIB réel/nominal, limites",
    "Relier consommation, investissement et multiplicateur keynésien",
    "Analyser IS-LM et le policy-mix budgétaire/monétaire",
    "Comprendre inflation, chômage et courbe de Phillips",
    "Situer les politiques dans le cadre UEMOA (critères de convergence)"
  ],
  lecons: [
    { titre: "Mesurer l'économie : le PIB et ses limites", duree: "18 min",
      blocs: [
        { t: "c", titre: "Trois approches, un même PIB", tx: "Le PIB se calcule par la production (somme des valeurs ajoutées + impôts nets sur produits), par la demande (C + I + G + X − M) et par les revenus (rémunérations + EBE + impôts nets). Les trois donnent le même total : toute production génère un revenu et trouve un emploi. Le PIB réel corrige l'effet des prix ; le déflateur du PIB = PIB nominal / PIB réel × 100." },
        { t: "m", titre: "Taux de croissance", tx: "g = (PIB_t − PIB_t−1)/PIB_t−1 × 100. Pour comparer les niveaux de vie : PIB par habitant en parité de pouvoir d'achat (PPA). Règle des 70 : un pays qui croît à x % double son PIB en ≈ 70/x années — à 7 %, doublement en 10 ans." },
        { t: "e", titre: "Le PIB togolais", tx: "L'INSEED calcule le PIB du Togo (base récente rénovée) ; l'agriculture pèse environ un cinquième, les services près de la moitié. Une part importante de l'activité est informelle : les comptables nationaux l'estiment par enquêtes (ERI-ESI), sinon le PIB serait fortement sous-évalué." },
        { t: "p", titre: "Ce que le PIB ne mesure pas", tx: "Travail domestique, bénévolat, économie souterraine non estimée, dégradation de l'environnement, inégalités : croître n'est pas nécessairement se développer. D'où les compléments : IDH (PNUD), PIB vert, indicateurs de pauvreté multidimensionnelle." }
      ],
      retenir: [
        "PIB = ΣVA + impôts nets = C + I + G + (X − M) = Σ revenus",
        "Réel vs nominal : toujours préciser ; déflateur = nominal/réel × 100",
        "PIB/habitant PPA pour comparer ; IDH pour le développement",
        "Règle des 70 pour le temps de doublement"
      ],
      refs: ["Blanchard O. & Cohen D., Macroéconomie, Pearson", "INSEED Togo — comptes nationaux (inseed.tg)", "PNUD, Rapport sur le développement humain (hdr.undp.org)"] },
    { titre: "Demande globale et multiplicateur keynésien", duree: "20 min",
      blocs: [
        { t: "c", titre: "La fonction de consommation", tx: "Keynes : C = c0 + c·Yd, avec c la propension marginale à consommer (0 < c < 1) et Yd le revenu disponible. L'épargne est le résidu. L'investissement dépend du taux d'intérêt et des anticipations de débouchés (« esprits animaux »). À l'équilibre de sous-emploi possible, Y = C + I + G : la demande fait le niveau d'activité." },
        { t: "f", titre: "Le multiplicateur", tx: "k = 1/(1 − c) en économie fermée sans impôt ; avec taux d'imposition t et propension à importer m : k = 1/(1 − c(1 − t) + m). Une relance de ΔG accroît le revenu de k·ΔG : la dépense initiale devient revenus, dont une fraction est reconsommée, etc. Plus l'économie importe, plus le multiplicateur fuit vers l'extérieur." },
        { t: "e", titre: "Relance dans une petite économie ouverte", tx: "Au Togo, une hausse des dépenses publiques d'infrastructure a un multiplicateur modéré : une partie des équipements est importée (fuite m élevée) et l'offre locale peut être contrainte. L'efficacité passe par le contenu local des marchés (matériaux, main-d'œuvre) — un argument des stratégies de développement type feuille de route gouvernementale." },
        { t: "p", titre: "Multiplicateur ≠ magie", tx: "Le multiplicateur suppose des capacités inutilisées. Près du plein emploi, la relance nourrit l'inflation et le déficit extérieur plutôt que la production. Et le financement compte : impôts futurs (équivalence ricardienne partielle) ou éviction par les taux d'intérêt." }
      ],
      retenir: [
        "C = c0 + cYd ; multiplicateur simple k = 1/(1−c)",
        "Économie ouverte : k = 1/(1 − c(1−t) + m) — les importations sont une fuite",
        "La relance est efficace si capacités inutilisées et faible fuite à l'import"
      ],
      refs: ["Keynes J.M., Théorie générale de l'emploi, de l'intérêt et de la monnaie, 1936 (Payot)", "Blanchard O., Macroéconomie, Pearson"] },
    { titre: "IS-LM et le policy-mix", duree: "22 min",
      blocs: [
        { t: "c", titre: "Deux marchés, un équilibre", tx: "IS décrit l'équilibre biens et services (Y = C + I(i) + G) : elle est décroissante dans le plan (Y, i). LM décrit l'équilibre monétaire (M/P = L(Y, i)) : elle est croissante. L'intersection donne le couple (Y*, i*). Politique budgétaire : IS se déplace ; politique monétaire : LM se déplace." },
        { t: "m", titre: "Lire un policy-mix", tx: "Relance budgétaire seule : Y ↑ mais i ↑ (éviction partielle de l'investissement privé). Expansion monétaire seule : i ↓, Y ↑. Combinées (accommodement monétaire), la relance est maximale sans hausse de taux. À l'inverse, une consolidation budgétaire avec détente monétaire limite le coût récessif." },
        { t: "e", titre: "UEMOA : politique monétaire commune", tx: "Dans l'union, la BCEAO fixe une politique monétaire unique (taux directeurs, appels d'offres) pour huit États ; chaque État garde sa politique budgétaire sous surveillance communautaire (critères de convergence : déficit ≤ 3 % du PIB, dette ≤ 70 %, inflation ≤ 3 %). Le policy-mix national se joue donc surtout côté budget." },
        { t: "p", titre: "Change fixe et triangle d'incompatibilité", tx: "Le franc CFA est arrimé à l'euro à parité fixe garantie : avec mobilité (même imparfaite) des capitaux, l'autonomie monétaire est limitée (triangle de Mundell). C'est un choix de stabilité nominale contre flexibilité conjoncturelle." }
      ],
      retenir: [
        "IS : biens (décroissante) ; LM : monnaie (croissante) ; équilibre (Y*, i*)",
        "Éviction : la relance budgétaire élève i et freine I privé",
        "UEMOA : monnaie commune BCEAO + budgets nationaux encadrés (3 %, 70 %, 3 %)",
        "Mundell : change fixe + capitaux mobiles ⇒ politique monétaire contrainte"
      ],
      refs: ["Hicks J., « Mr. Keynes and the Classics », Econometrica, 1937", "BCEAO — bceao.int (politique monétaire)", "Commission de l'UEMOA — uemoa.int (pacte de convergence)"] },
    { titre: "Inflation, chômage et arbitrages", duree: "20 min",
      blocs: [
        { t: "c", titre: "Mesurer l'inflation et le chômage", tx: "L'inflation est la hausse durable du niveau général des prix, mesurée par l'IPC (panier pondéré, pour l'UEMOA l'IHPC harmonisé). Le chômage BIT compte les personnes sans emploi, disponibles et en recherche active — au Togo, le sous-emploi et l'informalité sont plus massifs que le chômage ouvert, ce qui change le diagnostic de politique publique." },
        { t: "c", titre: "Phillips et anticipations", tx: "La courbe de Phillips originelle (1958) lie négativement chômage et inflation salariale. Friedman et Phelps montrent qu'à long terme elle est verticale au taux de chômage naturel : les anticipations d'inflation s'ajustent, l'arbitrage disparaît. D'où la crédibilité des banques centrales et le ciblage d'inflation." },
        { t: "e", titre: "Chocs d'offre importés", tx: "Flambée du pétrole ou du fret : inflation importée dans l'UEMOA (énergie, transport, riz). La banque centrale resserre pour ancrer les anticipations, l'État peut lisser (subventions ciblées à la pompe) — au prix budgétaire d'autant plus lourd que le choc dure." },
        { t: "p", titre: "Inflation ≠ cherté", tx: "Un niveau de prix élevé n'est pas une inflation élevée : l'inflation est une VITESSE (variation), pas un niveau. Une inflation qui « ralentit » (désinflation) ne signifie pas que les prix baissent (déflation)." }
      ],
      retenir: [
        "IHPC : mesure harmonisée UEMOA ; cible communautaire ≤ 3 %",
        "Phillips long terme verticale : pas d'arbitrage durable inflation/chômage",
        "Choc d'offre : inflation + activité en berne (dilemme de politique)",
        "Désinflation ≠ déflation"
      ],
      refs: ["Friedman M., « The Role of Monetary Policy », AER, 1968", "Blanchard O., Macroéconomie, Pearson", "BCEAO, rapports sur la politique monétaire (bceao.int)"] }
  ],
  refsGlobales: [
    "Blanchard O. & Cohen D., Macroéconomie, Pearson — la référence francophone",
    "Mankiw G., Macroéconomie, De Boeck",
    "BCEAO (bceao.int) et Commission UEMOA (uemoa.int) — textes et statistiques régionales",
    "FMI, Perspectives de l'économie mondiale (imf.org) ; Banque mondiale (banquemondiale.org)"
  ]
},

"Statistiques et économétrie": {
  icon: "📊",
  tagline: "Des données à la décision : décrire, estimer, tester et modéliser.",
  duree: "≈ 2 h 30",
  objectifs: [
    "Choisir les bons indicateurs descriptifs (tendance, dispersion, forme)",
    "Manier probabilités, lois usuelles et théorème central limite",
    "Construire tests d'hypothèses et intervalles de confiance",
    "Estimer et diagnostiquer une régression linéaire (MCO)",
    "Reconnaître endogénéité, hétéroscédasticité et autocorrélation"
  ],
  lecons: [
    { titre: "Statistique descriptive : résumer sans trahir", duree: "18 min",
      blocs: [
        { t: "c", titre: "Tendance centrale et dispersion", tx: "Moyenne (sensible aux valeurs extrêmes), médiane (robuste, coupe la distribution en deux), mode (valeur la plus fréquente). Dispersion : variance et écart-type (même unité que la variable), intervalle interquartile. Le coefficient de variation CV = σ/x̄ compare des dispersions entre variables d'échelles différentes." },
        { t: "m", titre: "Choisir le bon résumé", tx: "Revenus, dépenses, superficies : distributions asymétriques à droite ⇒ préférer la médiane et l'IIQ. Notes d'examen à peu près symétriques ⇒ moyenne et écart-type. Toujours regarder l'histogramme ou le boxplot AVANT de résumer : Anscombe l'a montré, quatre nuages très différents peuvent partager les mêmes statistiques." },
        { t: "e", titre: "EHCVM au Togo", tx: "Dans les enquêtes harmonisées sur les conditions de vie des ménages (EHCVM, UEMOA/Banque mondiale), la consommation par tête est asymétrique : la moyenne dépasse la médiane. Les indicateurs de pauvreté (incidence, profondeur, sévérité — famille FGT) se calculent sur la distribution complète, pas sur la seule moyenne." },
        { t: "p", titre: "Corrélation ≠ causalité", tx: "Une corrélation de 0,8 entre possession de téléphone et consommation ne dit pas que le téléphone enrichit : facteurs confondants (urbanité, éducation), causalité inverse, hasard. L'économétrie d'évaluation (leçon 4 du domaine S&E) existe précisément pour dépasser ce piège." }
      ],
      retenir: [
        "Asymétrie ⇒ médiane + IIQ ; symétrie ⇒ moyenne + écart-type",
        "CV = σ/x̄ pour comparer des dispersions",
        "FGT (P0, P1, P2) : incidence, profondeur, sévérité de la pauvreté",
        "Toujours visualiser avant de résumer"
      ],
      refs: ["Wonnacott T. & R., Statistique, Economica", "INSEED / EHCVM — inseed.tg", "Banque mondiale, microdata.worldbank.org"] },
    { titre: "Probabilités et lois usuelles", duree: "20 min",
      blocs: [
        { t: "c", titre: "Variables aléatoires", tx: "Une variable aléatoire associe un nombre à chaque issue. Espérance = valeur moyenne pondérée par les probabilités ; variance = dispersion attendue. Lois discrètes usuelles : Bernoulli (succès/échec), binomiale (nombre de succès sur n essais), Poisson (événements rares par unité de temps). Lois continues : uniforme, exponentielle (durées), normale." },
        { t: "f", titre: "La loi normale et le TCL", tx: "N(μ, σ²) : symétrique, ≈ 68 % des observations à ±1σ, 95 % à ±1,96σ. Théorème central limite : la moyenne de n observations indépendantes tend vers une normale quand n grandit, quelle que soit la loi de départ — c'est le fondement des intervalles de confiance et des tests sur grands échantillons." },
        { t: "e", titre: "Sondage électoral ou enquête ménages", tx: "Pour estimer une proportion p avec une marge d'erreur de ±3 points à 95 %, il faut n ≈ (1,96² × 0,25)/0,03² ≈ 1 067 personnes — indépendamment de la taille du pays. C'est pour cela que les enquêtes nationales calibrent leurs strates et grappes, avec pondérations à l'analyse." },
        { t: "p", titre: "Indépendance requise", tx: "Le TCL suppose des tirages indépendants. Dans les sondages en grappes (villages entiers), les observations se ressemblent : l'effet de plan (design effect) gonfle la variance réelle — ignorer les grappes conduit à des intervalles trop optimistes." }
      ],
      retenir: [
        "E(aX+b) = aE(X)+b ; V(aX+b) = a²V(X)",
        "Binomiale : np, np(1−p) ; Poisson : espérance = variance = λ",
        "TCL : x̄ ≈ N(μ, σ²/n) pour n grand",
        "n ≈ 1 067 pour ±3 pts à 95 % (proportion, cas le plus défavorable)"
      ],
      refs: ["Lecoutre J.-P., Statistique et probabilités, Dunod", "Wooldridge J., Introductory Econometrics, annexes probabilistes"] },
    { titre: "Estimation et tests d'hypothèses", duree: "22 min",
      blocs: [
        { t: "m", titre: "Intervalle de confiance", tx: "IC 95 % pour une moyenne : x̄ ± 1,96·σ/√n (σ connu) ou x̄ ± t·s/√n (petit échantillon, loi de Student). Interprétation fréquentiste : si on répétait l'échantillonnage, 95 % des intervalles ainsi construits contiendraient la vraie valeur — et non « il y a 95 % de chances que μ soit dedans »." },
        { t: "m", titre: "Logique du test", tx: "H0 (statu quo) contre H1. On calcule une statistique de test et sa p-value : la probabilité, SI H0 est vraie, d'observer un écart au moins aussi grand. p < α (souvent 5 %) ⇒ rejet de H0. Erreur de type I : rejeter H0 vraie (α) ; type II : ne pas rejeter H0 fausse (β) ; puissance = 1 − β." },
        { t: "e", titre: "Comparer deux régions", tx: "Rendements de maïs Plateaux vs Savanes : test de comparaison de moyennes (t de Student, ou Welch si variances inégales). Avec p = 0,03 : au seuil de 5 %, l'écart est statistiquement significatif. Reste à juger s'il est AGRONOMIQUEMENT significatif — 20 kg/ha d'écart peuvent être significatifs et négligeables." },
        { t: "p", titre: "La p-value n'est pas", tx: "…la probabilité que H0 soit vraie, ni la taille de l'effet, ni la probabilité de réplication. Significativité statistique ≠ importance pratique ; avec n très grand, tout devient « significatif ». Rapporter TOUJOURS l'effet estimé et son intervalle." }
      ],
      retenir: [
        "IC 95 % moyenne : x̄ ± 1,96 σ/√n",
        "p-value = P(données au moins aussi extrêmes | H0 vraie)",
        "α = risque de faux positif ; puissance = 1 − β",
        "Toujours accompagner la p-value de l'effet et de son IC"
      ],
      refs: ["Wasserstein R. & Lazar N., « The ASA Statement on p-Values », The American Statistician, 2016", "Wonnacott & Wonnacott, Statistique, Economica"] },
    { titre: "La régression linéaire : estimer, lire, diagnostiquer", duree: "25 min",
      blocs: [
        { t: "f", titre: "MCO et lecture des coefficients", tx: "y = β0 + β1x1 + … + βk xk + u, estimé en minimisant la somme des carrés des résidus. β1 : variation attendue de y quand x1 augmente d'une unité, TOUTES CHOSES ÉGALES PAR AILLEURS (les autres x constants). En log-log, les coefficients sont des élasticités ; en semi-log (log y), 100·β ≈ effet en %." },
        { t: "m", titre: "Hypothèses de Gauss-Markov", tx: "Linéarité, exogénéité E(u|X) = 0, homoscédasticité, absence d'autocorrélation, pas de colinéarité parfaite ⇒ MCO est BLUE (meilleur estimateur linéaire sans biais). Hétéroscédasticité (fréquente en coupe transversale) : garder MCO mais utiliser des écarts-types robustes (White/HC). Autocorrélation (séries temporelles) : Newey-West, ou modéliser la dynamique." },
        { t: "p", titre: "Endogénéité, le péché capital", tx: "Variable omise corrélée aux régresseurs, causalité inverse, erreur de mesure : E(u|X) ≠ 0 et les MCO sont biaisés MÊME à l'infini. Régresser salaire sur éducation sans contrôler l'aptitude surestime le rendement de l'école. Remèdes : variables de contrôle crédibles, instruments (2SLS), panels à effets fixes, designs d'évaluation (DID, RDD…)." },
        { t: "e", titre: "Sous STATA", tx: "reg lnconso educ age i.region, robust — puis estat hettest (hétéroscédasticité), vif (colinéarité), et lecture : R² (part de variance expliquée) n'est PAS un gage de causalité. Un R² de 0,15 avec un design causal propre vaut mieux qu'un R² de 0,9 endogène." }
      ],
      retenir: [
        "Coefficient = effet ceteris paribus ; log-log = élasticité",
        "Hétéroscédasticité ⇒ écarts-types robustes (option robust)",
        "Endogénéité ⇒ biais irréparable par la taille d'échantillon : penser design",
        "R² élevé ≠ causalité ; significativité ≠ importance"
      ],
      refs: ["Wooldridge J., Introductory Econometrics: A Modern Approach, Cengage", "Gujarati D., Économétrie, De Boeck", "Angrist J. & Pischke J.-S., Mostly Harmless Econometrics, Princeton UP"] }
  ],
  refsGlobales: [
    "Wooldridge J., Introductory Econometrics, Cengage — le manuel pivot",
    "Angrist & Pischke, Mostly Harmless Econometrics — l'approche design/causalité",
    "Documentation STATA (stata.com) et manuels [R] regress, [R] test",
    "INSEED (inseed.tg) et microdata.worldbank.org pour pratiquer sur données réelles"
  ]
},

"Suivi-évaluation des projets et politiques": {
  icon: "🎯",
  tagline: "Cadres logiques, indicateurs, et méthodes d'évaluation d'impact causales — jusqu'aux commandes STATA.",
  duree: "≈ 2 h 45",
  objectifs: [
    "Construire une chaîne de résultats et un cadre logique complets",
    "Définir des indicateurs SMART et un plan de S&E budgétisé",
    "Poser le problème causal : contrefactuel, biais de sélection",
    "Choisir la méthode d'impact adaptée : randomisation, DID, PSM, IV, RDD",
    "Mettre en œuvre et lire les résultats sous STATA 18/19"
  ],
  lecons: [
    { titre: "Chaîne de résultats et cadre logique", duree: "20 min",
      blocs: [
        { t: "c", titre: "De l'intrant à l'impact", tx: "Intrants → Activités → Produits (extrants) → Effets (outcomes) → Impact. Le suivi surveille l'exécution (intrants→produits, en continu) ; l'évaluation juge les changements attribuables (effets→impact, ponctuelle). Le cadre logique croise cette chaîne avec indicateurs, sources de vérification et hypothèses/risques à chaque niveau." },
        { t: "m", titre: "Indicateurs SMART et cibles", tx: "Spécifique, Mesurable, Atteignable, Réaliste/Pertinent, Temporellement défini. Chaque indicateur exige : une définition opératoire, une valeur de référence (baseline), une cible datée, une source, une fréquence, un responsable, une désagrégation (sexe, région, quintile). Sans baseline, pas de progrès mesurable." },
        { t: "e", titre: "Projet d'appui aux maraîchers", tx: "Produit : « 2 000 producteurs formés (dont 50 % de femmes) d'ici déc. 2026 » — source : registres de formation. Effet : « rendement moyen de tomate +25 % à 18 mois » — source : enquête parcelles. Impact : « revenu agricole net +15 % » — source : enquête ménages avec groupe de comparaison. Les hypothèses (pluies normales, prix stables) figurent en colonne 4." },
        { t: "p", titre: "Produits ≠ effets", tx: "« 500 forages réalisés » est un produit ; « taux d'accès à l'eau potable passé de 45 % à 62 % » est un effet. Les rapports qui n'affichent que des produits ne disent rien du changement pour les populations — c'est l'erreur la plus fréquente des cadres de S&E." }
      ],
      retenir: [
        "Chaîne : intrants → activités → produits → effets → impact",
        "Suivi = continu, exécution ; évaluation = ponctuelle, attribution",
        "Indicateur complet = définition + baseline + cible + source + fréquence + responsable",
        "Théorie du changement : expliciter hypothèses et risques"
      ],
      refs: ["Commission européenne, Aid Delivery Methods — Project Cycle Management Guidelines", "PNUD, Handbook on Planning, Monitoring and Evaluating for Development Results", "Gertler et al., L'évaluation d'impact en pratique, Banque mondiale (2e éd.)"] },
    { titre: "Le problème causal : contrefactuel et biais de sélection", duree: "20 min",
      blocs: [
        { t: "c", titre: "L'impact est une différence", tx: "Impact = résultat AVEC programme − résultat SANS programme pour les MÊMES unités au même moment. Le second terme, le contrefactuel, est inobservable : toute méthode d'évaluation d'impact est une stratégie pour l'estimer de façon crédible. Comparer bénéficiaires et non-bénéficiaires bruts confond l'effet du programme avec les différences préexistantes : c'est le biais de sélection." },
        { t: "f", titre: "Formaliser (Rubin)", tx: "Résultats potentiels Y(1), Y(0) ; effet individuel τ = Y(1)−Y(0), jamais observé pour la même unité. ATE = E[Y(1)−Y(0)] ; ATT = effet moyen sur les traités. Différence naïve = ATT + biais de sélection (E[Y(0)|T=1] − E[Y(0)|T=0]). La randomisation annule ce biais en espérance." },
        { t: "e", titre: "Avant/après trompeur", tx: "Un programme d'appui aux PME lancé en 2023 ; en 2025 les ventes des bénéficiaires ont doublé. Impact ? Pas forcément : reprise générale post-choc, inflation, sélection des PME les plus dynamiques dans le programme. L'avant/après attribue au projet tout ce qui a changé par ailleurs." },
        { t: "p", titre: "Volontariat = sélection", tx: "Quand on s'inscrit volontairement (formation, crédit), les participants diffèrent systématiquement (motivation, réseau, capital). Contrôler par quelques variables observables ne suffit pas si la sélection porte sur de l'inobservable — d'où les designs expérimentaux et quasi expérimentaux." }
      ],
      retenir: [
        "Impact = observé − contrefactuel ; le contrefactuel est à construire",
        "Différence naïve = effet + biais de sélection",
        "ATE (population) ≠ ATT (traités) ≠ LATE (compliers, cas IV)",
        "Avant/après ≠ impact : le temps agit aussi"
      ],
      refs: ["Gertler P. et al., L'évaluation d'impact en pratique, Banque mondiale", "Imbens G. & Rubin D., Causal Inference, Cambridge UP", "Duflo E., Banerjee A. — travaux J-PAL (povertyactionlab.org)"] },
    { titre: "Randomisation, DID, PSM : le trio de base", duree: "25 min",
      blocs: [
        { t: "m", titre: "L'essai randomisé (RCT)", tx: "Assignation aléatoire (loterie publique, tirage par grappes) ⇒ groupes comparables en espérance sur l'observable ET l'inobservable. Analyse : différence simple de moyennes, ou régression avec contrôles pour la précision. Sous STATA : randtreat pour l'assignation stratifiée, puis reg y treat, robust (ou intention de traiter si non-conformité, et IV par l'assignation pour l'effet sur les compliers)." },
        { t: "m", titre: "Différence de différences (DID)", tx: "Deux groupes, deux périodes : DID = (T_après − T_avant) − (C_après − C_avant). Hypothèse clé : tendances parallèles en l'absence du programme (à défendre graphiquement sur le pré-programme). STATA : reg y i.treat##i.post, cluster(id) — le coefficient de l'interaction est l'effet ; en panel, xtdid ou didregress (STATA 17+), et l'estimateur de Callaway-Sant'Anna (csdid) si adoption échelonnée." },
        { t: "m", titre: "Appariement (PSM)", tx: "Sous sélection sur observables uniquement : estimer P(T=1|X) (logit/probit), apparier traités et témoins sur ce score, vérifier le support commun et l'équilibrage. STATA : teffects psmatch (ATT), pstest pour l'équilibrage. Fragile si des inobservables pilotent la participation — tester la sensibilité (rbounds)." },
        { t: "e", titre: "Choisir selon le contexte", tx: "Extension progressive d'un programme de cantines : randomiser l'ordre d'entrée des écoles (RCT d'implémentation). Réforme fiscale nationale déjà appliquée : DID avec secteurs/pays de comparaison. Base administrative riche sans randomisation possible : PSM en s'appuyant sur les déterminants documentés de la participation." }
      ],
      retenir: [
        "RCT : référence — sélection annulée par tirage",
        "DID : exige tendances parallèles ; cluster les écarts-types",
        "PSM : sélection sur observables + support commun + équilibrage",
        "STATA : randtreat, didregress/csdid, teffects psmatch, pstest"
      ],
      refs: ["Gertler et al., L'évaluation d'impact en pratique, Banque mondiale", "Callaway B. & Sant'Anna P., « DID with Multiple Time Periods », J. of Econometrics, 2021", "Documentation STATA : didregress, teffects (stata.com)"] },
    { titre: "IV, RDD, contrôle synthétique — et lire STATA", duree: "25 min",
      blocs: [
        { t: "m", titre: "Variables instrumentales (IV/2SLS)", tx: "Un instrument Z affecte le traitement (pertinence, F de 1re étape > 10) sans toucher directement le résultat (exclusion, non testable — à argumenter). Estime un LATE : l'effet sur les unités dont le traitement bascule avec Z. STATA : ivregress 2sls y (treat = z) x1 x2, robust ; estat firststage ; weakivtest." },
        { t: "m", titre: "Régression sur discontinuité (RDD)", tx: "Un seuil d'éligibilité (score, âge, superficie) crée une quasi-expérience locale : autour du seuil, les unités sont comparables. Effet = saut de la fonction de résultat au seuil. STATA : rdrobust y running, c(seuil) (bande passante optimale, inférence robuste) ; rddensity pour tester la manipulation du score." },
        { t: "m", titre: "Contrôle synthétique", tx: "Pour UNE unité traitée (un pays, une région) : construire un « jumeau synthétique », combinaison pondérée d'unités non traitées qui reproduit la trajectoire pré-traitement. STATA : synth / synth2 ; inférence par tests placebo (permutation). Standard pour les politiques uniques (zone franche, réforme régionale)." },
        { t: "p", titre: "Lire un output proprement", tx: "Vérifier dans l'ordre : (1) N et clusters ; (2) effet estimé, unité et signe ; (3) écart-type robuste/clusterisé et IC ; (4) tests de validité du design (parallélisme, F de 1re étape, densité au seuil, équilibrage) ; (5) robustesse (spécifications, placebo). Un coefficient sans son design ne prouve rien." }
      ],
      retenir: [
        "IV : pertinence testable, exclusion argumentée ; estime un LATE",
        "RDD : effet local au seuil ; rdrobust + rddensity",
        "Contrôle synthétique : une unité traitée, inférence par placebos",
        "Toujours relier coefficient ↔ hypothèses du design"
      ],
      refs: ["Angrist & Pischke, Mostly Harmless Econometrics, Princeton UP", "Abadie A. et al., « Synthetic Control Methods », JASA, 2010", "Cattaneo, Idrobo & Titiunik, A Practical Introduction to RDD, Cambridge UP", "Manuel STATA 18/19 — ivregress, rdrobust (stata.com)"] }
  ],
  refsGlobales: [
    "Gertler P. et al., L'évaluation d'impact en pratique, 2e éd., Banque mondiale — téléchargeable gratuitement (openknowledge.worldbank.org)",
    "Angrist & Pischke, Mostly Harmless Econometrics, Princeton UP",
    "J-PAL (povertyactionlab.org) et 3ie (3ieimpact.org) — bibliothèques d'évaluations",
    "Documentation STATA 18/19 (stata.com/manuals) — treatment effects, DID, RDD"
  ]
},

"Monnaie, finance et budget": {
  icon: "💰",
  tagline: "Création monétaire, BCEAO, banques, finances publiques : le circuit financier de l'UEMOA.",
  duree: "≈ 2 h 15",
  objectifs: [
    "Expliquer les fonctions de la monnaie et la création monétaire",
    "Décrire la BCEAO, ses instruments et la transmission monétaire",
    "Analyser le budget de l'État : recettes, dépenses, solde, dette",
    "Comprendre l'intermédiation bancaire et ses risques",
    "Situer l'inclusion financière et la monnaie électronique"
  ],
  lecons: [
    { titre: "La monnaie et sa création", duree: "18 min",
      blocs: [
        { t: "c", titre: "Fonctions et formes", tx: "Unité de compte, intermédiaire des échanges, réserve de valeur. Formes : fiduciaire (billets, pièces) et scripturale (dépôts) — aujourd'hui complétées par la monnaie électronique (porte-monnaie mobile money, adossé à des comptes de cantonnement). Agrégats : M1 (circulation + dépôts à vue), M2 (+ dépôts à terme et d'épargne)." },
        { t: "c", titre: "Les crédits font les dépôts", tx: "Quand une banque accorde un crédit, elle crée un dépôt : la masse monétaire augmente. La création est limitée par la demande de crédit solvable, les fuites (billets, réserves obligatoires, devises) et la régulation prudentielle. Le multiplicateur/diviseur de crédit formalise ces fuites." },
        { t: "e", titre: "Mobile money dans l'UEMOA", tx: "Les établissements de monnaie électronique (EME) agréés par la BCEAO émettent des unités contre dépôt d'espèces, cantonnées dans des banques. Le mobile money a fait bondir l'inclusion financière (paiements, transferts, micro-épargne) — au Togo, une part majeure des adultes utilise un compte de monnaie électronique." },
        { t: "p", titre: "Monnaie ≠ richesse", tx: "Imprimer de la monnaie n'enrichit pas une économie : sans production en face, l'excès de monnaie se traduit en inflation et en déficit extérieur. La contrainte réelle (capacités, productivité) demeure." }
      ],
      retenir: [
        "3 fonctions ; agrégats M1 ⊂ M2",
        "Crédit ⇒ dépôt : la banque commerciale crée la monnaie scripturale",
        "Fuites : billets, réserves obligatoires, devises",
        "Monnaie électronique : émise par des EME agréés BCEAO, fonds cantonnés"
      ],
      refs: ["Mishkin F., Monnaie, banque et marchés financiers, Pearson", "BCEAO — instruction relative aux EME (bceao.int)"] },
    { titre: "La BCEAO et la politique monétaire", duree: "20 min",
      blocs: [
        { t: "c", titre: "Cadre institutionnel", tx: "La BCEAO est la banque centrale commune des 8 États de l'UMOA ; l'objectif principal est la stabilité des prix (cible communautaire d'inflation ≤ 3 %), avec l'arrimage fixe du FCFA à l'euro. Le Comité de politique monétaire fixe les taux directeurs : taux d'intérêt minimum de soumission (appels d'offres) et taux du guichet de prêt marginal, plus les réserves obligatoires." },
        { t: "m", titre: "Canaux de transmission", tx: "Taux directeurs → coût de refinancement des banques → taux débiteurs → crédit → demande → prix. Autres canaux : bilan (valeur des garanties), anticipations, change (limité en régime fixe). La transmission est ralentie par la surliquidité bancaire, l'informalité et la faible bancarisation." },
        { t: "e", titre: "Resserrement anti-inflation", tx: "Face à l'inflation importée de 2022, la BCEAO a relevé graduellement ses taux directeurs et ajusté ses adjudications : renchérir le refinancement freine le crédit et ancre les anticipations, pendant que les États ciblaient des subventions temporaires (carburants, intrants)." },
        { t: "p", titre: "Financement monétaire encadré", tx: "Les avances directes de la banque centrale aux Trésors nationaux sont prohibées/encadrées : les États se financent par adjudications de bons et obligations du Trésor sur le marché régional (via UMOA-Titres). C'est un garde-fou de crédibilité monétaire." }
      ],
      retenir: [
        "Objectif : stabilité des prix (≤ 3 %) ; change fixe FCFA/euro",
        "Instruments : appels d'offres, guichets, réserves obligatoires",
        "Transmission affaiblie par surliquidité et informalité",
        "États financés par le marché des titres publics (UMOA-Titres)"
      ],
      refs: ["Statuts de la BCEAO (bceao.int)", "UMOA-Titres — umoatitres.org", "Rapports annuels BCEAO"] },
    { titre: "Le budget de l'État : recettes, dépenses, solde", duree: "20 min",
      blocs: [
        { t: "c", titre: "Architecture budgétaire", tx: "Le budget de l'État (loi de finances) prévoit recettes (fiscales : impôts directs et indirects ; non fiscales ; dons) et dépenses (courantes : personnel, biens et services, intérêts, transferts ; d'investissement). Les directives UEMOA imposent la budgétisation par programmes avec objectifs et indicateurs de performance — le lien direct avec le S&E." },
        { t: "f", titre: "Soldes et financement", tx: "Solde global = recettes (dons compris) − dépenses totales. Solde primaire = solde global hors intérêts : il mesure l'effort budgétaire propre. Un déficit se finance par emprunt (titres régionaux, concessionnel extérieur) : d'où la dynamique de dette — la dette croît si le solde primaire ne compense pas l'écart (r − g) appliqué au stock." },
        { t: "e", titre: "Critères UEMOA", tx: "Pacte de convergence : déficit global ≤ 3 % du PIB, dette publique ≤ 70 % du PIB, inflation ≤ 3 % (plus des critères de second rang : masse salariale ≤ 35 % des recettes fiscales, pression fiscale ≥ 20 %). Ils disciplinent les lois de finances nationales, avec des suspensions temporaires lors des grands chocs (pandémie)." },
        { t: "p", titre: "Investissement ≠ dépense vertueuse par nature", tx: "Classer une dépense en « investissement » ne garantit ni rentabilité socio-économique ni bonne exécution : études de faisabilité, sélection par analyse coûts-avantages et suivi d'exécution (taux d'exécution physique ET financier) font la différence." }
      ],
      retenir: [
        "Solde primaire = global + intérêts ; clé de la dynamique de dette",
        "Dette : Δb ≈ (r − g)·b − solde primaire (en % du PIB)",
        "Convergence UEMOA : 3 % / 70 % / 3 % + critères de second rang",
        "Budget-programmes : objectifs, indicateurs, responsables de programme"
      ],
      refs: ["Directives UEMOA sur les finances publiques (uemoa.int)", "FMI, Manuel de statistiques de finances publiques (imf.org)", "Lois de finances du Togo — budget.gouv.tg"] },
    { titre: "Banques, risques et inclusion financière", duree: "18 min",
      blocs: [
        { t: "c", titre: "L'intermédiation et ses risques", tx: "Les banques transforment des dépôts courts en crédits longs : risque de liquidité (retraits massifs), de crédit (défauts), de taux et opérationnel. La régulation prudentielle (dispositif de Bâle transposé par la Commission bancaire de l'UMOA) impose fonds propres minimaux, ratios de liquidité et division des risques." },
        { t: "c", titre: "Microfinance et finance digitale", tx: "Les systèmes financiers décentralisés (SFD) servent les ménages et TPE hors banque : épargne, microcrédit, tontines améliorées. La finance digitale réduit les coûts de transaction et étend la portée — avec de nouveaux risques (fraude, surendettement, protection des données) que la régulation suit." },
        { t: "e", titre: "Financer une TPE à Lomé", tx: "Une couturière sans garantie formelle : microcrédit progressif d'un SFD, historique de mobile money comme signal, puis passage au crédit bancaire adossé à une garantie partielle (fonds de garantie). L'inclusion est un continuum, pas un guichet unique." },
        { t: "p", titre: "Taux d'intérêt élevés ≠ usure systématique", tx: "Les taux de la microfinance intègrent des coûts unitaires élevés (petits montants, suivi de proximité, risque). L'usure est encadrée par la loi ; la vraie comparaison se fait sur le coût TOTAL du crédit (TEG) et les services associés." }
      ],
      retenir: [
        "Risques bancaires : liquidité, crédit, taux, opérationnel",
        "Supervision : Commission bancaire UMOA, normes type Bâle",
        "SFD + mobile money = moteurs de l'inclusion financière",
        "Comparer les crédits au TEG, pas au taux nominal affiché"
      ],
      refs: ["Mishkin F., Monnaie, banque et marchés financiers, Pearson", "Commission bancaire de l'UMOA — rapports annuels", "BCEAO, rapports sur l'inclusion financière (bceao.int)"] }
  ],
  refsGlobales: [
    "Mishkin F., Monnaie, banque et marchés financiers, Pearson",
    "BCEAO (bceao.int) : statuts, rapports, statistiques monétaires",
    "Commission de l'UEMOA (uemoa.int) : pacte de convergence, directives finances publiques",
    "FMI (imf.org) : rapports Article IV Togo/UEMOA"
  ]
},

"Histoire de la pensée économique": {
  icon: "📜",
  tagline: "Des mercantilistes aux économistes du développement : les idées qui structurent les débats d'aujourd'hui.",
  duree: "≈ 2 h",
  objectifs: [
    "Relier chaque école à son contexte, ses auteurs et ses concepts clés",
    "Suivre le fil classiques → marginalistes → Keynes → synthèses modernes",
    "Comprendre les critiques (Marx, institutionnalistes, développement)",
    "Mobiliser les auteurs à bon escient dans un débat de politique publique"
  ],
  lecons: [
    { titre: "Mercantilistes, physiocrates et classiques", duree: "20 min",
      blocs: [
        { t: "c", titre: "Avant la science économique", tx: "Les mercantilistes (XVIe-XVIIIe) assimilent richesse et métaux précieux : excédent commercial et intervention de l'État (Colbert). Les physiocrates (Quesnay, Tableau économique, 1758) répliquent : seule la terre est productive, « laissez faire, laissez passer ». Deux legs durables : la balance commerciale comme obsession, et le circuit économique comme représentation." },
        { t: "c", titre: "Smith, Ricardo, Malthus, Say", tx: "Smith (1776) : division du travail, main invisible, valeur travail. Ricardo (1817) : avantages comparatifs (le Portugal et le drap anglais), rente différentielle, répartition. Malthus : population et subsistances. Say : « les produits s'échangent contre des produits » — l'offre crée ses débouchés, nié plus tard par Keynes. Mill synthétise et ouvre aux questions sociales." },
        { t: "e", titre: "Ricardo au port de Lomé", tx: "L'avantage comparatif ne dit pas « produire ce qu'on fait le mieux dans l'absolu » mais « ce qu'on fait relativement le moins mal » : même moins productif en tout, un pays gagne à se spécialiser et échanger. C'est l'argument de fond des zones de libre-échange — à nuancer par les termes de l'échange et la montée en gamme." },
        { t: "p", titre: "Valeur travail ≠ prix observé", tx: "Chez les classiques, la valeur d'échange gravite autour du travail incorporé ; les marginalistes déplaceront l'explication vers l'utilité marginale et la rareté. Confondre les deux cadres fait rater les questions d'examen les plus classiques." }
      ],
      retenir: [
        "Mercantilisme : excédent + État ; physiocratie : produit net agricole",
        "Smith 1776 : division du travail, main invisible",
        "Ricardo : avantages COMPARATIFS (pas absolus), rente",
        "Loi de Say : l'offre crée ses débouchés (cible future de Keynes)"
      ],
      refs: ["Smith A., Recherches sur la nature et les causes de la richesse des nations, 1776", "Ricardo D., Des principes de l'économie politique et de l'impôt, 1817", "Boncœur J. & Thouément H., Histoire des idées économiques, A. Colin"] },
    { titre: "Marx et la critique de l'économie politique", duree: "16 min",
      blocs: [
        { t: "c", titre: "Le Capital (1867)", tx: "Marx part de la valeur travail et la radicalise : la force de travail, payée à sa valeur de reproduction, produit PLUS que sa valeur — la plus-value, source du profit. Accumulation, concentration du capital, armée industrielle de réserve, baisse tendancielle du taux de profit et crises : le capitalisme est traversé de contradictions internes." },
        { t: "c", titre: "Matérialisme historique", tx: "Les rapports de production (infrastructure) conditionnent institutions et idées (superstructure) ; l'histoire avance par luttes de classes. L'analyse a durablement marqué la sociologie, l'histoire économique et les théories de la dépendance appliquées à l'Afrique (Samir Amin, échange inégal)." },
        { t: "e", titre: "Lire les filières mondiales", tx: "Les débats contemporains sur la répartition de la valeur dans les chaînes mondiales (cacao, coton, phosphates) réactivent des questions marxiennes : qui capte le surplus ? Les producteurs primaires reçoivent une fraction minime du prix final — matière des politiques de transformation locale." },
        { t: "p", titre: "Prédictions ≠ analyse", tx: "On peut mobiliser les concepts analytiques de Marx (plus-value, concentration) sans endosser ses prédictions (paupérisation absolue, effondrement) — largement démenties au XXe siècle par la hausse des niveaux de vie et l'État social." }
      ],
      retenir: [
        "Plus-value = valeur produite − valeur de la force de travail",
        "Accumulation, concentration, crises : dynamique conflictuelle",
        "Postérité : théories de la dépendance, économie politique critique",
        "Distinguer outillage conceptuel et prophéties historiques"
      ],
      refs: ["Marx K., Le Capital, Livre I, 1867", "Amin S., L'échange inégal et la loi de la valeur", "Boncœur & Thouément, Histoire des idées économiques, A. Colin"] },
    { titre: "Marginalistes, néoclassiques et Keynes", duree: "22 min",
      blocs: [
        { t: "c", titre: "La révolution marginaliste (1870s)", tx: "Jevons, Menger, Walras — indépendamment — fondent la valeur sur l'utilité marginale. Walras construit l'équilibre général (tous les marchés simultanément, le « commissaire-priseur ») ; Marshall l'équilibre partiel (offre/demande, court/long terme, surplus) ; Pareto l'optimum (aucune amélioration sans perdant). L'économie devient science des choix sous rareté." },
        { t: "c", titre: "Keynes (1936) contre la loi de Say", tx: "La Théorie générale : la demande effective détermine l'emploi ; l'équilibre de sous-emploi est possible et durable ; l'épargne n'est pas automatiquement investie (préférence pour la liquidité, taux d'intérêt monétaire). Politique : relance budgétaire, action monétaire, stabilisation — l'État devient acteur macroéconomique légitime." },
        { t: "c", titre: "Synthèses et contre-révolutions", tx: "Synthèse néoclassique (Hicks IS-LM, Samuelson) ; monétarisme de Friedman (inflation = phénomène monétaire, taux de chômage naturel, règles) ; nouvelle économie classique (Lucas, anticipations rationnelles, critique des politiques systématiques) ; nouveaux keynésiens (rigidités micro-fondées) ; puis économie comportementale (Kahneman, Thaler) et théorie des jeux (Nash) qui irriguent tout." },
        { t: "e", titre: "Un débat toujours actuel", tx: "Face à un choc (pandémie, crise énergétique) : relancer (lecture keynésienne des capacités inutilisées) ou assainir (lecture classique de la contrainte d'offre et de la crédibilité) ? Les plans de relance de 2020-2021 puis le resserrement de 2022-2023 rejouent exactement cette dialectique." }
      ],
      retenir: [
        "1870s : valeur = utilité marginale ; Walras (général), Marshall (partiel), Pareto (optimum)",
        "Keynes : demande effective, sous-emploi durable, rôle de l'État",
        "Friedman : monnaie et anticipations ; Lucas : critique des politiques",
        "Aujourd'hui : micro-fondations + comportemental + jeux"
      ],
      refs: ["Keynes J.M., Théorie générale, 1936 (Payot)", "Friedman M., « The Role of Monetary Policy », AER, 1968", "Beaud M. & Dostaler G., La pensée économique depuis Keynes, Seuil"] },
    { titre: "Développement, institutions et prix Nobel récents", duree: "18 min",
      blocs: [
        { t: "c", titre: "Économie du développement", tx: "Pionniers : Rosenstein-Rodan (big push), Lewis (dualisme, offre illimitée de travail), Hirschman (effets d'entraînement), Rostow (étapes). Puis : capital humain (Schultz, Becker), Sen (capabilités — le développement comme liberté), et la révolution expérimentale (Banerjee, Duflo, Kremer, Nobel 2019) qui teste les politiques à petite échelle." },
        { t: "c", titre: "Institutions et croissance", tx: "North : les institutions (règles du jeu) déterminent les incitations ; Acemoglu, Johnson & Robinson (Nobel 2024) : institutions inclusives vs extractives, héritages coloniaux et prospérité. Ostrom (Nobel 2009) : la gestion des communs par les communautés, ni État ni marché purs." },
        { t: "e", titre: "Politiques togolaises au prisme des idées", tx: "Transferts monétaires (type programme de filets sociaux) : évaluation expérimentale à la Duflo. Réformes du climat des affaires et du foncier : lecture institutionnaliste. Zones industrielles et transformation locale : héritages de Hirschman et des stratégies de contenu local." },
        { t: "p", titre: "Pas d'école « toute-terrain »", tx: "Chaque cadre éclaire un pan : les RCT mesurent finement des dispositifs, mais pas les grandes transformations structurelles ; l'institutionnalisme explique le long terme, mais guide peu le réglage conjoncturel. La compétence, c'est choisir l'outil adapté à la question." }
      ],
      retenir: [
        "Lewis : dualisme ; Sen : capabilités ; Duflo-Banerjee-Kremer : expérimentation",
        "AJR (Nobel 2024) : institutions inclusives vs extractives",
        "Ostrom : gouvernance des communs",
        "Adapter l'école à la question posée"
      ],
      refs: ["Sen A., Development as Freedom, Oxford UP", "Acemoglu D. & Robinson J., Why Nations Fail, Crown", "Banerjee A. & Duflo E., Repenser la pauvreté, Seuil", "nobelprize.org — economic sciences"] }
  ],
  refsGlobales: [
    "Boncœur J. & Thouément H., Histoire des idées économiques (2 tomes), Armand Colin",
    "Beaud M. & Dostaler G., La pensée économique depuis Keynes, Seuil",
    "Blaug M., La pensée économique, Economica",
    "nobelprize.org (notices des lauréats) ; History of Economic Thought website (hetwebsite.net)"
  ]
}

});
