// =====================================================================
// mooc-data2.js — MOOC QPC (v2.40) — partie 2/3
// =====================================================================
window.MOOC_DATA = Object.assign(window.MOOC_DATA || {}, {

"Commerce, développement et Afrique": {
  icon: "🚢",
  tagline: "Du théorème HOS à la ZLECAf : commerce international et trajectoires africaines de développement.",
  duree: "≈ 2 h 15",
  objectifs: [
    "Maîtriser les fondements : avantages comparatifs, HOS, économies d'échelle",
    "Analyser protectionnisme, termes de l'échange et politique commerciale",
    "Connaître l'architecture OMC / accords régionaux / ZLECAf",
    "Relier commerce, industrialisation et transformation structurelle en Afrique",
    "Discuter IDE, chaînes de valeur mondiales et contenu local"
  ],
  lecons: [
    { titre: "Pourquoi échanger ? Les fondements", duree: "20 min",
      blocs: [
        { t: "c", titre: "Des avantages comparatifs aux modèles modernes", tx: "Ricardo : la spécialisation selon le coût d'opportunité le plus faible profite à tous, même au pays moins productif partout. HOS (Heckscher-Ohlin-Samuelson) : on exporte les biens intensifs dans le facteur abondant (le Togo : travail et terre ; l'Europe : capital). Krugman ajoute les économies d'échelle et l'amour de la variété : le commerce INTRA-branche entre pays similaires — la majeure partie du commerce mondial." },
        { t: "f", titre: "Termes de l'échange", tx: "TE = indice des prix à l'export / indice des prix à l'import × 100. Une dégradation (thèse Prebisch-Singer pour les produits primaires) signifie qu'il faut exporter plus de coton pour importer la même machine. C'est l'argument historique de l'industrialisation et de la transformation locale." },
        { t: "e", titre: "Le Togo dans le commerce mondial", tx: "Exportations : phosphates, coton, produits agro-transformés, ciment/clinker vers la sous-région, et une part croissante de réexportations via le Port autonome de Lomé — hub de transbordement majeur du golfe de Guinée. Importations : biens d'équipement, énergie, riz. Le solde des BIENS est déficitaire, partiellement compensé par les services portuaires et logistiques." },
        { t: "p", titre: "Gains à l'échange ≠ gains pour tous", tx: "Le libre-échange accroît le surplus TOTAL mais fait des perdants (secteurs concurrencés) : sans accompagnement (formation, reconversion, filets), l'ouverture est politiquement fragile. Stolper-Samuelson : le facteur rare perd relativement." }
      ],
      retenir: [
        "Ricardo : coût d'opportunité ; HOS : dotations factorielles ; Krugman : échelle + variété",
        "TE = Px/Pm × 100 ; Prebisch-Singer : dégradation tendancielle pour le primaire",
        "Commerce intra-branche dominant entre économies similaires",
        "Compenser les perdants pour rendre l'ouverture soutenable"
      ],
      refs: ["Krugman P., Obstfeld M. & Melitz M., Économie internationale, Pearson", "CNUCED, Rapport sur le commerce et le développement (unctad.org)"] },
    { titre: "Politique commerciale : instruments et effets", duree: "20 min",
      blocs: [
        { t: "c", titre: "Tarifs, quotas, subventions", tx: "Un droit de douane élève le prix intérieur : producteurs gagnants, consommateurs perdants, recettes pour l'État, et deux triangles de perte sèche (production inefficace + consommation découragée). Le quota a des effets voisins mais la rente va aux détenteurs de licences. Les barrières non tarifaires (normes, procédures) sont aujourd'hui les plus contraignantes." },
        { t: "m", titre: "Protection effective", tx: "Le taux de protection effective mesure la protection de la VALEUR AJOUTÉE : un tarif faible sur le produit fini mais élevé sur les intrants peut DÉPROTÉGER une industrie. Toujours raisonner sur la chaîne complète des tarifs, pas sur le seul taux nominal du produit." },
        { t: "e", titre: "TEC de l'UEMOA/CEDEAO", tx: "Le tarif extérieur commun à 5 bandes (0, 5, 10, 20, 35 %) structure la protection régionale : intrants et biens d'équipement peu taxés, biens de consommation finale davantage, la bande de 35 % ciblant des filières stratégiques (agroalimentaire). Les échanges intra-communautaires de produits originaires sont en franchise." },
        { t: "p", titre: "Protection = pari sur l'apprentissage", tx: "L'argument de l'industrie naissante (List, Hamilton) n'est valide que si la protection est TEMPORAIRE, dégressive et conditionnée à des gains de productivité. Une protection permanente sans discipline crée des rentes durables et des produits chers." }
      ],
      retenir: [
        "Droit de douane : 2 triangles de perte sèche ; quota : rente aux licences",
        "Protection effective : raisonner en valeur ajoutée",
        "TEC CEDEAO : 5 bandes (0-35 %) ; franchise intra-zone (règles d'origine)",
        "Industrie naissante : protection temporaire + conditionnalité"
      ],
      refs: ["Krugman, Obstfeld & Melitz, Économie internationale, Pearson", "Commission de l'UEMOA (uemoa.int) — union douanière", "OMC, Examens de politique commerciale (wto.org)"] },
    { titre: "OMC, intégration régionale et ZLECAf", duree: "20 min",
      blocs: [
        { t: "c", titre: "Le système commercial multilatéral", tx: "L'OMC (1995, succédant au GATT 1947) repose sur la non-discrimination : clause de la nation la plus favorisée (un avantage accordé à l'un s'étend à tous) et traitement national (pas de discrimination interne après dédouanement), avec un organe de règlement des différends. Les accords régionaux sont l'exception admise (article XXIV)." },
        { t: "c", titre: "Étapes de l'intégration", tx: "Zone de libre-échange (tarifs internes nuls) → union douanière (+ TEC) → marché commun (+ libre circulation des facteurs) → union économique et monétaire (+ politiques communes, monnaie). L'UEMOA est une UEM régionale ; la CEDEAO une union douanière en approfondissement ; la ZLECAf (opérationnelle depuis 2021) une ZLE continentale : ~1,4 milliard d'habitants, réduction progressive de 90 % des lignes tarifaires." },
        { t: "e", titre: "Ce que la ZLECAf peut changer", tx: "Le commerce intra-africain (~15 % des échanges du continent, contre ~60 % intra-UE) est surtout composé de produits manufacturés : l'élargir favorise l'industrialisation. Conditions : règles d'origine praticables, corridors logistiques (Lomé-Ouaga, Abidjan-Lagos), paiements (PAPSS), et réduction des barrières non tarifaires." },
        { t: "p", titre: "Signer ≠ intégrer", tx: "L'intégration réelle se mesure aux échanges effectifs et à la convergence des normes, pas aux traités : chevauchement des communautés (« bol de spaghetti »), obstacles routiers et administratifs pèsent plus que les tarifs restants." }
      ],
      retenir: [
        "OMC : NPF + traitement national + règlement des différends",
        "ZLE → UD → marché commun → UEM : l'UEMOA est déjà une UEM",
        "ZLECAf : ZLE continentale, potentiel surtout manufacturier",
        "Barrières non tarifaires et logistique = les vrais chantiers"
      ],
      refs: ["OMC — wto.org (textes fondateurs)", "Secrétariat de la ZLECAf / Union africaine (au-afcfta.org)", "CEA, Rapports sur l'intégration régionale (uneca.org)"] },
    { titre: "Développement : transformation structurelle et CVM", duree: "22 min",
      blocs: [
        { t: "c", titre: "Transformation structurelle", tx: "Le développement déplace emploi et valeur ajoutée de l'agriculture vers l'industrie et les services à productivité croissante (Lewis, Kuznets). Beaucoup d'économies africaines connaissent une « désindustrialisation précoce » (Rodrik) : les services absorbent l'emploi avant que l'industrie n'ait décollé — enjeu : productivité des services et agro-industrie." },
        { t: "c", titre: "Chaînes de valeur mondiales", tx: "La production se fragmente : concevoir ici, assembler là. S'insérer dans une CVM ne suffit pas ; il faut MONTER en gamme (upgrading de produit, de procédé, fonctionnel). La « courbe du sourire » : la valeur se concentre en amont (R&D, intrants) et en aval (marque, distribution) — l'assemblage capte peu." },
        { t: "e", titre: "Stratégies togolaises", tx: "Plateforme industrielle d'Adétikopé (PIA) : transformer coton et soja localement plutôt qu'exporter brut ; hub logistique portuaire ; agropoles. Logique de contenu local et de montée en gamme dans des filières où la région a la matière première et un corridor d'exportation." },
        { t: "p", titre: "IDE : quantité ≠ qualité", tx: "Un IDE d'enclave (extraction, faible lien local) transforme peu ; les retombées dépendent des liens amont/aval, de la formation et des transferts de technologie. Les codes d'investissement performants conditionnent les avantages à ces retombées." }
      ],
      retenir: [
        "Transformation structurelle : réallouer vers la productivité",
        "Rodrik : désindustrialisation précoce — risque africain",
        "CVM : monter en gamme (courbe du sourire)",
        "IDE utile = liens locaux + compétences + technologie"
      ],
      refs: ["Rodrik D., « Premature Deindustrialization », J. of Economic Growth, 2016", "Banque mondiale, World Development Report 2020 — CVM", "CNUCED, Rapport sur l'investissement dans le monde (unctad.org)"] }
  ],
  refsGlobales: [
    "Krugman P., Obstfeld M. & Melitz M., Économie internationale, Pearson",
    "CNUCED (unctad.org), OMC (wto.org), CEA (uneca.org) — rapports annuels",
    "Rodrik D., Straight Talk on Trade, Princeton UP",
    "Union africaine — textes ZLECAf (au-afcfta.org)"
  ]
},

"Économie agricole et agribusiness": {
  icon: "🌾",
  tagline: "Du champ au marché mondial : production, gestion d'exploitation, business models, projets, chaînes de valeur, contrats et export.",
  duree: "≈ 4 h 30",
  objectifs: [
    "Analyser la production agricole : facteurs, rendements, adoption technique",
    "Comprendre l'économie du ménage agricole et ses arbitrages",
    "Cartographier une filière (acteurs, marges, gouvernance) et l'agribusiness",
    "Gérer les risques agricoles : prix, climat, assurance, warrantage",
    "Évaluer les politiques : subventions d'intrants, conseil, foncier, PNIASAN",
    "Tenir le compte d'exploitation et piloter la gestion d'une entreprise agricole",
    "Concevoir un business model et monter un projet d'agrobusiness bancable",
    "Organiser chaînes de valeur intégrées et agriculture contractuelle",
    "Maîtriser le commerce international des produits agricoles (Incoterms, SPS, certifications)"
  ],
  lecons: [
    { titre: "Produire : facteurs, rendements et adoption", duree: "20 min",
      blocs: [
        { t: "c", titre: "La fonction de production agricole", tx: "Terre, travail, capital, intrants (semences, engrais), eau — plus le facteur invisible : le savoir-faire. Les rendements céréaliers ouest-africains restent bas (souvent ~1-1,5 t/ha de maïs contre >5 potentiels) : le « yield gap » tient aux intrants sous-utilisés, à la variabilité pluviométrique, à la dégradation des sols et à l'accès limité au conseil." },
        { t: "c", titre: "Pourquoi la sous-adoption ?", tx: "Un paquet rentable (semence améliorée + engrais) peut rester peu adopté : contrainte de liquidité au moment du semis, aversion au risque (la variance compte autant que la moyenne), défaut d'assurance, incertitude sur la qualité des intrants, apprentissage social insuffisant. Duflo, Kremer & Robinson : de PETITS coups de pouce bien datés (livraison précoce à petite remise) élèvent fortement l'adoption d'engrais." },
        { t: "e", titre: "Maïs et coton au Togo", tx: "Le coton : filière organisée (semences, crédit intrants, prix d'achat annoncés) — l'encadrement lève plusieurs contraintes d'un coup. Le maïs vivrier : marchés d'intrants plus fragmentés, rendements plus dispersés. La comparaison illustre le rôle de la COORDINATION de filière dans l'adoption." },
        { t: "p", titre: "Rendement ≠ revenu", tx: "Maximiser le rendement n'est pas maximiser le profit ni l'utilité : les prix des intrants/produits, la pénibilité, le risque comptent. Le paysan « conservateur » est souvent un optimiseur rationnel sous contraintes (Schultz : « pauvres mais efficients »)." }
      ],
      retenir: [
        "Yield gap : intrants, eau, sols, savoir — pas la paresse",
        "Sous-adoption = liquidité + risque + information + timing",
        "Coordination de filière (type coton) = adoption facilitée",
        "Schultz : rationalité paysanne sous contraintes"
      ],
      refs: ["Schultz T., Transforming Traditional Agriculture, 1964", "Duflo E., Kremer M. & Robinson J., « Nudging Farmers to Use Fertilizer », AER, 2011", "FAO — fao.org (statistiques FAOSTAT)"] },
    { titre: "Le ménage agricole : un agent multi-objectifs", duree: "18 min",
      blocs: [
        { t: "c", titre: "Produire ET consommer", tx: "Le ménage agricole est à la fois entreprise et consommateur : quand les marchés fonctionnent, ses décisions de production se séparent de ses préférences (théorème de séparabilité). Quand des marchés MANQUENT (travail, crédit, assurance), tout se mélange : la taille de la famille détermine la surface cultivée, l'autoconsommation prime, la réponse aux prix devient atypique." },
        { t: "c", titre: "Diversification et pluriactivité", tx: "Cultures multiples, élevage, petit commerce, transferts des migrants : la diversification lisse le revenu face aux chocs. Elle a un coût d'efficacité (renoncer à la spécialisation) — c'est une assurance implicite quand l'assurance formelle manque." },
        { t: "e", titre: "Genre et productivité", tx: "Les parcelles gérées par les femmes affichent souvent des rendements inférieurs — non par moindre compétence, mais par accès inégal aux intrants, au crédit, à la main-d'œuvre et à la sécurité foncière. Égaliser l'accès est un des gisements de productivité agricole les mieux documentés (FAO)." },
        { t: "p", titre: "Ne pas lire l'autoconsommation comme archaïsme", tx: "Autoconsommer, c'est s'assurer contre les prix et les défaillances de marché. La « commercialisation » progresse quand les marchés deviennent fiables (prix, transport, stockage), pas par exhortation." }
      ],
      retenir: [
        "Séparabilité si marchés complets ; sinon production ↔ consommation liées",
        "Diversification = assurance implicite coûteuse en efficacité",
        "Écart de genre = écart d'ACCÈS aux ressources",
        "Commercialisation suit la fiabilité des marchés"
      ],
      refs: ["Singh I., Squire L. & Strauss J., Agricultural Household Models, Johns Hopkins UP", "FAO, La situation mondiale de l'alimentation et de l'agriculture (fao.org)", "de Janvry A. & Sadoulet E., Development Economics, Routledge"] },
    { titre: "Filières et agribusiness : du producteur au consommateur", duree: "20 min",
      blocs: [
        { t: "m", titre: "Analyser une filière", tx: "Cartographier acteurs et flux (producteurs → collecteurs → transformateurs → grossistes → détaillants), calculer les comptes par maillon (coûts, marges), identifier la gouvernance (qui fixe les règles : acheteur dominant, interprofession, État). Les marges brutes élevées du négoce cachent souvent transport, pertes et coût du capital — comparer les marges NETTES." },
        { t: "c", titre: "Contrats et intégration", tx: "L'agriculture contractuelle (intrants et prix garantis contre livraison) résout crédit et débouché mais pose le risque de vente parallèle (side-selling) et de dépendance. L'intégration verticale (l'agro-industriel produit lui-même) et les coopératives sont d'autres réponses aux coûts de transaction (Williamson)." },
        { t: "e", titre: "Transformation locale", tx: "Soja togolais : exporter la graine brute ou triturer localement (huile + tourteaux pour l'aviculture) ? La trituration ajoute de la valeur, crée des emplois et fournit l'élevage — si l'approvisionnement est régulier et l'énergie compétitive. C'est l'équation type de l'agribusiness (PIA, agropoles)." },
        { t: "p", titre: "« Trop d'intermédiaires » : diagnostic paresseux", tx: "Supprimer des intermédiaires ne baisse les prix que si leurs FONCTIONS (collecte, transport, financement, prise de risque) sont assurées autrement à moindre coût. Sinon, la fonction se reconstitue — plus chère." }
      ],
      retenir: [
        "Filière : acteurs + comptes par maillon + gouvernance",
        "Contrats : lever crédit/débouché, gérer le side-selling",
        "Transformer localement si approvisionnement + énergie + marché suivent",
        "Juger les intermédiaires sur leurs fonctions et marges nettes"
      ],
      refs: ["Williamson O., The Economic Institutions of Capitalism, Free Press", "Banque mondiale, Agriculture for Development (WDR 2008)", "CIRAD/AFD — guides d'analyse de filières (agritrop.cirad.fr)"] },
    { titre: "Risques, financement et politiques agricoles", duree: "22 min",
      blocs: [
        { t: "c", titre: "Le triptyque des risques", tx: "Risque de production (pluies, ravageurs — corrélé entre voisins, donc difficile à mutualiser localement), risque de prix (volatilité mondiale et saisonnière), risque institutionnel (foncier, politiques). Réponses : variétés tolérantes, irrigation, assurance indicielle (indemnisation sur un indice pluie/rendement de zone — attention au risque de base), stockage et warrantage (crédit gagé sur récolte stockée pour vendre à la soudure)." },
        { t: "c", titre: "Financer l'agriculture", tx: "Le crédit agricole bute sur saisonnalité, garanties et risque covariant. Solutions : crédit de campagne adossé aux filières, warrantage, fonds de garantie (partage du risque avec les banques), financements mixtes (blended), et mobile money pour les paiements et l'épargne de précaution." },
        { t: "e", titre: "Politiques togolaises et régionales", tx: "PNIASAN (plan national d'investissement agricole et de sécurité alimentaire et nutritionnelle) dans le cadre ECOWAP/PDDAA ; engagement de Maputo/Malabo : ~10 % du budget public à l'agriculture. Instruments : subventions ciblées d'intrants (e-vouchers), aménagements (ZAAP), mécanisation, conseil agricole rénové." },
        { t: "p", titre: "Subventionner sans étouffer", tx: "Les subventions universelles d'engrais absorbent des budgets énormes, fuient vers les non-ciblés et peuvent écraser la distribution privée. Le ciblage (coupons électroniques, registres), la dégressivité et l'évaluation d'impact conditionnent leur utilité." }
      ],
      retenir: [
        "Risque covariant ⇒ assurance locale difficile ; indicielle = risque de base",
        "Warrantage : stocker + crédit + vendre à la soudure",
        "Maputo/Malabo : ~10 % du budget vers l'agriculture",
        "Subventions : cibler, rendre dégressif, évaluer"
      ],
      refs: ["Banque mondiale, Managing Agricultural Risk (worldbank.org)", "CEDEAO — ECOWAP ; Union africaine — Malabo (au.int)", "MAEP Togo / PNIASAN — agriculture.gouv.tg"] },
    { titre: "Compte d'exploitation et gestion de l'entreprise agricole", duree: "25 min",
      blocs: [
        { t: "f", titre: "Du produit brut au revenu : la cascade de gestion", tx: "Produit brut d'un atelier = ventes + autoconsommation valorisée + variation de stocks. Marge brute = produit brut − charges opérationnelles (semences, engrais, produits, saisonniers) : c'est l'outil de comparaison des ateliers, car les charges de structure (amortissements, fermage, salariés permanents) sont communes. EBE = Σ marges brutes − charges de structure hors amortissements : le cash annuel qui doit couvrir annuités, prélèvements familiaux et autofinancement. Résultat = EBE − amortissements − frais financiers." },
        { t: "m", titre: "Les réflexes du gestionnaire", tx: "Tenir le carnet technico-économique (opérations, quantités, coûts, temps de travaux) ; calculer le coût de production par kg et le comparer au prix ; établir le plan de trésorerie de campagne (les dépenses précèdent les recettes de plusieurs mois — dimensionner le crédit de campagne) ; séparer strictement caisse de l'exploitation et caisse du ménage ; se comparer à des fermes de référence (benchmarking) pour cibler les marges de progrès." },
        { t: "e", titre: "Atelier avicole à Tsévié", tx: "1 000 poulets : prix de vente 3 500 FCFA, coût variable 2 600 (poussin, aliment ~70 % du coût, vaccins), charges fixes 700 000 FCFA/bande. Marge sur coût variable : 900 FCFA/sujet → seuil de rentabilité : 700 000/900 ≈ 778 poulets vendus. La mortalité et l'indice de consommation décident donc de tout : 2 points de mortalité en moins valent mieux qu'un prix de vente supérieur." },
        { t: "p", titre: "Annuités contre EBE", tx: "Une règle prudentielle simple : si les annuités d'emprunt dépassent 50-60 % de l'EBE moyen, l'exploitation est en zone de danger — la moindre mauvaise campagne fait basculer en impayé. Investir « parce que le crédit est disponible » sans projeter l'EBE est la première cause de surendettement des exploitations en croissance." }
      ],
      retenir: [
        "Marge brute = produit brut − charges opérationnelles (comparaison d'ateliers)",
        "EBE = Σ MB − structure (hors amort.) : il paie annuités + famille + autofinancement",
        "Seuil de rentabilité (volume) = charges fixes / MCV unitaire",
        "Caisse exploitation ≠ caisse ménage ; carnet de bord = base de tout",
        "Annuités ≤ 50-60 % de l'EBE : règle de sécurité"
      ],
      refs: ["Chombart de Lauwe J. et al., Nouvelle gestion des exploitations agricoles, Dunod", "FAO, Farm Business Analysis (fao.org)", "Réseaux de gestion type CER France — méthodologie marges brutes"] },
    { titre: "Business models et montage de projets d'agrobusiness", duree: "25 min",
      blocs: [
        { t: "c", titre: "Le Business Model Canvas version agro", tx: "Neuf blocs : proposition de valeur (jus 100 % ananas togolais traçable, poulet local aux normes), segments de clients (ménages urbains, hôtels, export), canaux, relations clients, ressources clés (verger, chaîne du froid, agréments), activités clés, partenaires clés (producteurs agrégés, transporteurs frigorifiques, distributeurs), structure de coûts et flux de revenus. Spécificité agro : les coproduits font souvent la rentabilité (tourteau de l'huilerie, son de la rizerie, fumier de l'élevage) — et la saisonnalité impose de penser le canvas sur l'année complète." },
        { t: "c", titre: "Modèles éprouvés en agribusiness", tx: "Nucleus estate + outgrowers (plantation-usine centrale + planteurs satellites sous contrat) ; agrégateur (fédérer des centaines de petits producteurs autour d'intrants, conseil et débouché) ; intégration coopérative (les producteurs possèdent l'outil de transformation) ; modèle de service (prestation mécanisée, froid, séchage à la demande) ; différenciation par la qualité (bio, équitable, indication géographique). Chaque modèle répartit différemment risques, financement et pouvoir de négociation." },
        { t: "m", titre: "Monter un projet bancable", tx: "Séquence : idée → étude de faisabilité (marché d'abord ! puis technique, organisation, finances, environnement/social) → plan d'affaires chiffré → plan de financement (fonds propres + crédit + éventuelles subventions ; emplois durables financés par ressources durables) → exécution suivie (physique ET financier). Outils financiers : VAN et TRI sur la durée de vie (attention aux cultures pérennes : flux négatifs jusqu'à l'entrée en production), délai de récupération, et surtout analyse de sensibilité (rendement −20 %, prix −15 % : la VAN tient-elle ?). Ne JAMAIS sous-estimer le besoin en fonds de roulement initial." },
        { t: "e", titre: "Mini-cas : unité de transformation de soja", tx: "Investissement 60 M FCFA (presse, chaudière, bâtiment) + BFR 25 M (stock de graines de 4 mois — la trituration tourne toute l'année mais la récolte est concentrée). Revenus : huile brute + tourteau (55 % du chiffre d'affaires !) + prestation. Sensibilité clé : le différentiel prix graine/prix tourteau et le taux d'utilisation de la capacité (en dessous de 60 %, les charges fixes étouffent). Le contrat d'approvisionnement avec les coopératives (leçon suivante) est la vraie garantie du projet." },
        { t: "p", titre: "Le piège du « projet équipement »", tx: "Acheter le matériel d'abord et chercher le marché ensuite : l'erreur classique. Un séchoir sans contrats d'écoulement, une chambre froide sans volume régulier tournent à 20 % de capacité et ruinent leur promoteur. Le débouché se sécurise AVANT l'investissement — lettres d'intention, contrats cadres, tests de marché." }
      ],
      retenir: [
        "Canvas agro : penser coproduits, saisonnalité et partenaires d'agrégation",
        "Modèles : nucleus-outgrowers, agrégateur, coopérative, service, différenciation",
        "Faisabilité : marché → technique → organisation → finances → E&S",
        "VAN/TRI sur la durée de vie + analyse de sensibilité systématique",
        "BFR sous-estimé = asphyxie ; débouché sécurisé AVANT l'équipement"
      ],
      refs: ["Osterwalder A. & Pigneur Y., Business Model Nouvelle Génération, Pearson", "FAO, Agribusiness Handbooks (fao.org)", "Gittinger J.P., Analyse économique des projets agricoles, Banque mondiale/Economica"] },
    { titre: "Chaînes de valeur intégrées et agriculture contractuelle", duree: "25 min",
      blocs: [
        { t: "c", titre: "De la filière à la chaîne de valeur intégrée", tx: "La chaîne de valeur ajoute à l'analyse de filière la question de la VALEUR (où se crée-t-elle, qui la capte) et de la GOUVERNANCE (qui fixe les standards). Une chaîne intégrée coordonne les maillons par contrats, standards de qualité, traçabilité (lots, registres, géolocalisation des parcelles) et financement de chaîne : la banque prête au producteur parce qu'un acheteur fiable s'est engagé (montage tripartite avec domiciliation des paiements — le flux commercial remplace l'hypothèque). Les agropoles (PIA d'Adétikopé) concentrent transformation, logistique et services pour abaisser les coûts de l'aval." },
        { t: "c", titre: "L'agriculture contractuelle : typologie FAO", tx: "Cinq modèles : centralisé (un acheteur, contrôle qualité fort — coton, canne), nucleus estate (plantation propre + satellites), multipartite (entreprise + producteurs + banque/État/ONG), intermédiaire (via collecteurs agréés), informel (accords saisonniers). Le contrat spécifie quantité, qualité, calendrier, mode de fixation du prix (fixe, indexé, plancher + partage de hausse) et les services liés : intrants à crédit remboursés à la livraison, itinéraire technique, conseil." },
        { t: "m", titre: "Faire tenir un contrat dans la durée", tx: "Le talon d'Achille : le side-selling (vendre au plus offrant en trahissant le contrat quand le prix spot monte) — symétriquement, l'acheteur qui rejette abusivement des lots « pour qualité » quand les cours baissent. Remèdes éprouvés : prix indexés partageant les hausses, relation répétée et transparente (barème de qualité public, pesée contradictoire), services réellement utiles (le producteur perd plus qu'un écart de prix en quittant le dispositif), caution solidaire des groupements, et arbitrage rapide des litiges. Un contrat n'est durable que si CHACUN y gagne par rapport au marché spot." },
        { t: "e", titre: "Le coton togolais, chaîne contractuelle type", tx: "La société cotonnière fournit semences et intrants à crédit, encadre l'itinéraire technique via les groupements, annonce un prix d'achat avant les semis, collecte et égrène ; le remboursement des intrants est déduit à la pesée. La caution solidaire des groupements limite les défauts individuels. Forces : accès aux intrants sans banque, débouché certain ; débats récurrents : niveau du prix, délais de paiement, gouvernance de l'interprofession — l'équilibre du partage de la valeur est le vrai baromètre de santé de la chaîne." },
        { t: "p", titre: "Intégrer n'est pas tout posséder", tx: "L'intégration verticale complète (l'usine possède plantations, camions, magasins) ne se justifie que si les coûts de transaction du marché sont prohibitifs (Williamson : actifs spécifiques, opportunisme). Sinon, la coordination CONTRACTUELLE est plus flexible et partage mieux les risques. Beaucoup d'échecs d'agro-industries viennent d'avoir immobilisé du capital dans des plantations propres au lieu de fiabiliser un réseau de producteurs contractuels." }
      ],
      retenir: [
        "Chaîne intégrée = contrats + standards + traçabilité + financement de chaîne",
        "Montage tripartite : domiciliation des paiements = garantie sans hypothèque",
        "FAO : centralisé, nucleus, multipartite, intermédiaire, informel",
        "Side-selling : prix indexés, services liés, caution solidaire, arbitrage rapide",
        "Contrat durable = gagnant-gagnant vs marché spot ; intégration totale = dernier recours"
      ],
      refs: ["FAO, L'agriculture contractuelle — partenariats pour la croissance (fao.org)", "Eaton C. & Shepherd A., Contract Farming, FAO Bulletin 145", "Williamson O., The Economic Institutions of Capitalism, Free Press", "Miller C. & Jones L., Agricultural Value Chain Finance, FAO/Practical Action"] },
    { titre: "Le commerce international des produits agricoles", duree: "25 min",
      blocs: [
        { t: "c", titre: "Prix mondiaux, Incoterms et couverture", tx: "Les produits de base (cacao, café, coton, soja) se cotent sur des marchés internationaux (ICE, Euronext) : les pays exportateurs sont preneurs de prix, convertis en FCFA. Tout prix international se lit avec son Incoterm : FOB Lomé (le vendeur charge à bord, dédouané export) vs CIF port de destination (le vendeur paie en plus fret et assurance). Les exportateurs se couvrent contre la baisse des cours par des ventes à terme (futures) : la perte sur le physique est compensée par le gain sur le contrat." },
        { t: "c", titre: "La vraie barrière : normes et certifications", tx: "L'accès aux marchés riches se joue moins sur les droits de douane (préférences TSA/EBA de l'UE pour les PMA, AGOA américain, franchise ZLECAf sous règles d'origine) que sur les NORMES : mesures SPS (limites de résidus de pesticides, aflatoxines, certificats phytosanitaires délivrés par la protection des végétaux), traçabilité, et certifications privées quasi obligatoires — GlobalG.A.P. pour la grande distribution, bio (règlement UE), Fairtrade (prix minimum + prime), Rainforest, et désormais les exigences « zéro déforestation » (règlement RDUE : géolocalisation des parcelles de cacao/café). Un dépassement de LMR = lot refoulé ou détruit (alertes RASFF)." },
        { t: "m", titre: "Réussir une opération d'export", tx: "Chaîne opérationnelle : produit conforme dès le champ (traitements homologués, délais avant récolte) → agréage et conditionnement (calibre, emballage) → chaîne du froid ininterrompue pour le frais (conteneur reefer, pré-refroidissement) → documents (facture, certificat phytosanitaire, certificat d'origine pour les préférences, connaissement) → dédouanement export → paiement sécurisé (lettre de crédit irrévocable confirmée pour un nouveau client, à défaut acompte + solde documentaire). Calculer son prix de revient export par Incoterm AVANT de coter." },
        { t: "e", titre: "Positionnements togolais", tx: "Soja (leader régional du soja bio vers l'Europe — prime de prix substantielle contre certification et traçabilité), ananas pain de sucre (frais par bateau et transformation en jus/séché), karité, cajou, café-cacao, et la contre-saison maraîchère. Le port de Lomé (eau profonde, hub régional) est l'atout logistique ; les défis : volumes réguliers, respect des LMR, coût de la certification pour les petits producteurs — mutualisable par les coopératives et l'agrégation (boucle avec la leçon précédente)." },
        { t: "p", titre: "L'escalade tarifaire et la montée en gamme", tx: "Beaucoup de marchés taxent peu le brut et davantage le transformé (escalade tarifaire) : elle freine la transformation à l'origine. La riposte : jouer les préférences (TSA/ZLECAf), viser les niches où la transformation locale reste compétitive (jus, beurre de karité cosmétique, cacao certifié d'origine), et négocier collectivement (interprofessions, normes régionales). Exporter brut n'est pas une fatalité, mais transformer exige de gagner la bataille des normes ET des coûts logistiques." }
      ],
      retenir: [
        "Toujours préciser l'Incoterm : CIF = FOB + fret + assurance",
        "Couverture : vente à terme contre la baisse des cours",
        "SPS/LMR + GlobalG.A.P./bio/Fairtrade/RDUE : la vraie barrière d'accès",
        "Paiement sécurisé : lettre de crédit pour les nouveaux clients",
        "Escalade tarifaire : viser préférences, niches et action collective"
      ],
      refs: ["Krugman, Obstfeld & Melitz, Économie internationale, Pearson", "Accord SPS de l'OMC (wto.org) ; règlement UE « déforestation » (RDUE)", "ITC (intracen.org) — guides export par produit", "CCI/ICC — Incoterms 2020 (iccwbo.org)"] }
  ],
  refsGlobales: [
    "de Janvry A. & Sadoulet E., Development Economics: Theory and Practice, Routledge",
    "Banque mondiale, WDR 2008 Agriculture for Development",
    "FAO (fao.org) : Contract Farming Resource Centre, Agricultural Value Chain Finance, FAOSTAT",
    "Gittinger J.P., Analyse économique des projets agricoles, Banque mondiale",
    "Osterwalder & Pigneur, Business Model Nouvelle Génération, Pearson",
    "ITC (intracen.org) et ICC — Incoterms 2020 ; MAEP Togo — politiques agricoles"
  ]
},

"Marchés financiers UEMOA / BRVM": {
  icon: "📉",
  tagline: "BRVM, marché des titres publics, actions et obligations : la finance de marché régionale.",
  duree: "≈ 2 h",
  objectifs: [
    "Décrire l'architecture du marché financier régional (BRVM, DC/BR, AMF-UMOA)",
    "Évaluer actions et obligations (dividendes, rendement, duration simplifiée)",
    "Comprendre le marché des titres publics (UMOA-Titres, adjudications)",
    "Lire les indices (BRVM Composite, BRVM 30) et la capitalisation",
    "Connaître les principes de gestion de portefeuille et de régulation"
  ],
  lecons: [
    { titre: "L'architecture du marché régional", duree: "18 min",
      blocs: [
        { t: "c", titre: "Un marché, huit pays", tx: "La BRVM (Bourse régionale des valeurs mobilières, siège à Abidjan, antennes nationales) est commune aux 8 États de l'UEMOA. Le DC/BR (Dépositaire central/Banque de règlement) assure conservation et dénouement. Le régulateur est l'AMF-UMOA (ex-CREPMF) : agréments, visas d'émission, sanction des abus. Les intervenants : SGI (sociétés de gestion et d'intermédiation), SGO, teneurs de compte." },
        { t: "c", titre: "Compartiments", tx: "Actions (sociétés cotées régionales : banques, télécoms, agro-industrie, distribution), obligations (États et entreprises), et le troisième compartiment dédié aux PME. Les indices phares : BRVM Composite (toutes les actions) et BRVM 30 (les 30 plus liquides) ; la capitalisation boursière se compte en dizaines de milliers de milliards FCFA." },
        { t: "e", titre: "Pourquoi une bourse régionale ?", tx: "Mutualiser la liquidité de huit marchés étroits : un émetteur togolais accède à l'épargne de toute l'union ; un investisseur béninois diversifie sur des valeurs ivoiriennes ou sénégalaises. La contrepartie : une cotation et une réglementation uniques, quel que soit le pays du siège." },
        { t: "p", titre: "Coté ≠ liquide", tx: "Une action peut être cotée et s'échanger rarement : le flottant (part réellement en circulation) et les volumes quotidiens conditionnent la sortie d'un investisseur. Toujours vérifier la liquidité avant la performance affichée." }
      ],
      retenir: [
        "BRVM + DC/BR + AMF-UMOA : bourse, dépositaire, régulateur",
        "SGI = passage obligé des ordres",
        "Indices : BRVM Composite, BRVM 30",
        "Flottant et volumes = liquidité réelle"
      ],
      refs: ["BRVM — brvm.org", "AMF-UMOA — textes et décisions (amf-umoa.org)", "DC/BR — dcbr.ci"] },
    { titre: "Actions : évaluation et décisions", duree: "20 min",
      blocs: [
        { t: "f", titre: "Valoriser une action", tx: "Modèle de Gordon-Shapiro : P = D1/(k − g) — le prix actualise les dividendes futurs croissant au taux g, avec k le rendement exigé. Ratios usuels : PER = cours/bénéfice par action (combien d'années de profit on paie), rendement du dividende = D/P. Une décote peut signaler un risque… ou une opportunité : comparer au secteur." },
        { t: "c", titre: "Rentabilité et risque", tx: "Rentabilité totale = (P1 − P0 + D)/P0. Le risque se mesure par la volatilité ; la diversification élimine le risque SPÉCIFIQUE, pas le risque de marché (bêta). Le MEDAF/CAPM relie rendement exigé et bêta : k = rf + β(E(Rm) − rf)." },
        { t: "e", titre: "Lire la cote BRVM", tx: "Une banque cotée verse 500 FCFA de dividende pour un cours de 6 000 : rendement 8,3 %. Son PER de 7 contre 12 pour le secteur peut refléter une gouvernance perçue plus risquée, une liquidité moindre — ou une sous-évaluation. L'analyse fondamentale (bilans, NPL, ROE) départage." },
        { t: "p", titre: "Dividende élevé ≠ cadeau", tx: "Un rendement du dividende très élevé peut annoncer un cours déprimé pour de bonnes raisons (résultats en berne) ou un dividende non soutenable. Vérifier le taux de distribution (payout) et la régularité." }
      ],
      retenir: [
        "Gordon : P = D1/(k−g) ; PER et rendement à comparer AU SECTEUR",
        "Diversification : tue le spécifique, pas le systématique (bêta)",
        "CAPM : k = rf + β·prime de marché",
        "Analyser la soutenabilité du dividende"
      ],
      refs: ["Bodie Z., Kane A. & Marcus A., Investments, McGraw-Hill", "Vernimmen P., Finance d'entreprise, Dalloz (vernimmen.net)"] },
    { titre: "Obligations et titres publics", duree: "20 min",
      blocs: [
        { t: "f", titre: "Prix et taux : la bascule", tx: "Une obligation promet coupons + remboursement ; son prix est la valeur actualisée de ces flux. Prix et taux varient EN SENS INVERSE : si les taux montent, les anciennes obligations (coupons plus faibles) valent moins. La sensibilité croît avec la maturité (duration) ; le rendement à l'échéance (YTM) égalise prix et flux actualisés." },
        { t: "c", titre: "Le marché des titres publics", tx: "Deux voies pour les États UEMOA : adjudications (bons du Trésor ≤ 2 ans, obligations assimilables du Trésor) organisées via UMOA-Titres avec les banques, et syndication (appel public à l'épargne, visa AMF-UMOA, cotation BRVM possible). Les taux servis reflètent la maturité, la liquidité et la signature de l'État." },
        { t: "e", titre: "Financer le budget togolais", tx: "Le Trésor togolais lève régulièrement des BAT/OAT sur le marché régional : un calendrier d'émissions publié, des taux de sortie suivis par les analystes. Une tension régionale (resserrement BCEAO, forte demande de financements) se lit immédiatement dans les taux moyens pondérés des adjudications." },
        { t: "p", titre: "« Sans risque » à nuancer", tx: "Les titres d'État régionaux sont l'actif de référence, mais ni le risque de taux (revente avant l'échéance), ni le risque de liquidité, ni les épisodes de tension souveraine ne disparaissent. La prime entre États de l'union en témoigne." }
      ],
      retenir: [
        "Prix ↔ taux en sens inverse ; duration = sensibilité",
        "Adjudication (UMOA-Titres) vs syndication (AMF-UMOA, BRVM)",
        "BAT courts, OAT longues ; taux = maturité + signature + liquidité",
        "Référence ≠ absence totale de risque"
      ],
      refs: ["UMOA-Titres — umoatitres.org (calendriers, résultats d'adjudications)", "Bodie, Kane & Marcus, Investments, McGraw-Hill", "AMF-UMOA — amf-umoa.org"] },
    { titre: "Portefeuille, information et intégrité du marché", duree: "18 min",
      blocs: [
        { t: "m", titre: "Construire un portefeuille", tx: "Définir horizon, objectifs, tolérance au risque ; répartir entre classes (actions, obligations, monétaire) ; diversifier par secteurs et pays de l'union ; rééquilibrer périodiquement. Les OPCVM (FCP, SICAV) gérés par des SGO offrent la diversification aux petits porteurs — comparer les frais." },
        { t: "c", titre: "Efficience et information", tx: "Un marché est efficient si les prix intègrent l'information disponible : battre durablement le marché est difficile (Fama), surtout après frais. Les anomalies comportementales (excès de confiance, moutonnier) existent — Shiller — mais s'exploiter difficilement. Conséquence pratique : régularité des versements, coûts bas, diversification battent le « trading » impulsif." },
        { t: "e", titre: "Abus de marché", tx: "Délit d'initié (utiliser une information privilégiée), manipulation de cours, diffusion de fausses informations : sanctionnés par l'AMF-UMOA. La transparence (publications périodiques des émetteurs, franchissements de seuils) protège l'épargnant et la formation des prix." },
        { t: "p", titre: "Promesses de rendements garantis", tx: "Des « placements » à 15 % par mois relèvent de la pyramide (Ponzi), pas de la finance : rendement et risque vont ensemble. Vérifier l'agrément AMF-UMOA/SGI avant tout placement — la liste officielle est publique." }
      ],
      retenir: [
        "Allocation d'actifs > sélection de titres pour l'épargnant",
        "OPCVM : diversification accessible — surveiller les frais",
        "Efficience : coûts bas + régularité gagnent à long terme",
        "Agrément AMF-UMOA = premier réflexe anti-arnaque"
      ],
      refs: ["Fama E., « Efficient Capital Markets », J. of Finance, 1970", "Shiller R., Irrational Exuberance, Princeton UP", "AMF-UMOA — liste des intervenants agréés (amf-umoa.org)"] }
  ],
  refsGlobales: [
    "Bodie Z., Kane A. & Marcus A., Investments, McGraw-Hill",
    "Vernimmen P., Finance d'entreprise, Dalloz — vernimmen.net (lexique gratuit)",
    "BRVM (brvm.org), UMOA-Titres (umoatitres.org), AMF-UMOA (amf-umoa.org)",
    "BCEAO — statistiques du marché financier régional (bceao.int)"
  ]
},

"Comptabilité générale et analytique": {
  icon: "🧾",
  tagline: "Du journal aux coûts complets : produire et lire l'information financière en normes SYSCOHADA.",
  duree: "≈ 2 h 15",
  objectifs: [
    "Maîtriser le mécanisme de la partie double et le plan SYSCOHADA",
    "Établir et lire bilan, compte de résultat et soldes de gestion",
    "Passer les écritures d'inventaire : amortissements, provisions, régularisations",
    "Calculer coûts complets et coûts partiels (analytique)",
    "Utiliser seuil de rentabilité et coûts pour décider"
  ],
  lecons: [
    { titre: "La partie double et le cadre SYSCOHADA", duree: "18 min",
      blocs: [
        { t: "c", titre: "Le principe fondateur", tx: "Chaque opération affecte au moins deux comptes : un débit et un crédit de même montant. Emplois (ce que devient l'argent) au débit, ressources (d'où il vient) au crédit. Le plan comptable OHADA (SYSCOHADA révisé, AUDCIF) organise les comptes en 9 classes : 1 à 5 pour le bilan (capitaux, immobilisations, stocks, tiers, trésorerie), 6-7 pour les charges et produits, 8 autres, 9 analytique/engagements." },
        { t: "m", titre: "Du journal aux états", tx: "Chronologie : pièce justificative → journal (écritures datées) → grand livre (par compte) → balance (contrôle débits = crédits) → états financiers (bilan, compte de résultat, tableau des flux, notes annexes). Le système normal OHADA impose ces quatre états ; le SMT (système minimal) allège pour les très petites entités." },
        { t: "e", titre: "Vente à crédit chez un grossiste de Lomé", tx: "Facture de 1 180 000 FCFA TTC (TVA 18 %) : débit 411 Clients 1 180 000 ; crédit 701 Ventes 1 000 000 et 4431 TVA facturée 180 000. À l'encaissement : débit 521 Banque, crédit 411. La TVA n'est jamais un produit : l'entreprise la collecte pour l'État." },
        { t: "p", titre: "Trésorerie ≠ résultat", tx: "Une vente à crédit crée un produit sans encaissement ; un emprunt encaisse sans produit. Confondre solde bancaire et bénéfice est l'erreur de gestion la plus répandue chez les TPE — d'où l'importance du tableau des flux de trésorerie." }
      ],
      retenir: [
        "Débit = emplois ; crédit = ressources ; totaux toujours égaux",
        "Classes 1-5 : bilan ; 6-7 : gestion ; balance = contrôle",
        "TVA collectée = dette envers l'État, pas un produit",
        "Résultat comptable ≠ trésorerie"
      ],
      refs: ["Acte uniforme OHADA relatif au droit comptable (AUDCIF) — ohada.org", "Guide d'application SYSCOHADA révisé, éd. FFA/Experts-comptables"] },
    { titre: "Bilan, compte de résultat et soldes de gestion", duree: "20 min",
      blocs: [
        { t: "c", titre: "Lire les deux états", tx: "Le bilan photographie le patrimoine : actif (immobilisé, circulant, trésorerie-actif) = passif (capitaux propres, dettes financières, passif circulant). Le compte de résultat filme l'exercice : produits − charges = résultat. Les capitaux propres relient les deux : ils absorbent le résultat de chaque exercice." },
        { t: "f", titre: "Les soldes intermédiaires (SIG)", tx: "Marge commerciale (ventes − coût d'achat des marchandises vendues) → valeur ajoutée (production − consommations externes) → EBE (VA − charges de personnel − impôts et taxes) → résultat d'exploitation → résultat financier → résultat des activités ordinaires → résultat net. L'EBE est le cash potentiel de l'exploitation, favori des analystes." },
        { t: "e", titre: "Diagnostiquer une entreprise togolaise", tx: "VA en hausse mais EBE en baisse : les frais de personnel dérivent. EBE correct mais résultat net négatif : le poids des amortissements (surinvestissement ?) ou des frais financiers (endettement cher). Chaque étage des SIG isole une explication." },
        { t: "p", titre: "Amortissement : charge sans décaissement", tx: "L'amortissement constate l'usure/consommation d'avantages économiques : il réduit le résultat sans sortie de caisse l'année de la dotation. L'oublier fausse les comparaisons — c'est pour cela que l'EBE (avant dotations) sert de référence de performance opérationnelle." }
      ],
      retenir: [
        "Bilan = stock (photo) ; résultat = flux (film)",
        "Cascade SIG : MC → VA → EBE → REX → RN",
        "EBE : performance d'exploitation avant politique d'investissement/financement",
        "Dotation = charge calculée, non décaissée"
      ],
      refs: ["AUDCIF — états financiers du système normal (ohada.org)", "Grandguillot B. & F., Comptabilité générale, Gualino"] },
    { titre: "Travaux d'inventaire : fiabiliser les comptes", duree: "20 min",
      blocs: [
        { t: "m", titre: "Amortissements et dépréciations", tx: "Amortissement linéaire : base amortissable / durée d'utilité, prorata temporis la première année. SYSCOHADA privilégie l'approche par composants (un camion : châssis, moteur, pneus à durées distinctes). Dépréciation : quand la valeur actuelle devient inférieure à la valeur nette comptable (test), on constate la perte — réversible si la valeur remonte." },
        { t: "m", titre: "Provisions et régularisations", tx: "Provisions pour risques et charges : obligation probable dont le montant est estimable (litige, garantie). Régularisations : charges constatées d'avance (paiement couvrant l'exercice suivant → actif), produits constatés d'avance, charges à payer, produits à recevoir — pour rattacher chaque flux à SON exercice (principe d'indépendance des exercices)." },
        { t: "e", titre: "Clôture au 31 décembre", tx: "Machine acquise 12 000 000 FCFA le 1er avril, durée 5 ans : dotation année 1 = 12 000 000/5 × 9/12 = 1 800 000. Litige prud'homal estimé à 2 500 000 probable : provision. Prime d'assurance annuelle payée le 1er octobre : 9/12 en charges constatées d'avance." },
        { t: "p", titre: "Provision ≠ réserve de trésorerie", tx: "Provisionner n'immobilise aucun argent : c'est une écriture qui anticipe une charge probable. Croire qu'une provision « met de l'argent de côté » confond comptabilité et gestion de trésorerie." }
      ],
      retenir: [
        "Linéaire + prorata ; composants à durées propres",
        "Dépréciation si valeur actuelle < VNC (réversible)",
        "Régularisations : rattacher les flux à leur exercice",
        "Provision = anticipation comptable, pas cagnotte"
      ],
      refs: ["AUDCIF, chapitres amortissements et provisions (ohada.org)", "Grandguillot, Les opérations d'inventaire, Gualino"] },
    { titre: "Comptabilité analytique : coûts et décisions", duree: "22 min",
      blocs: [
        { t: "m", titre: "Coûts complets (centres d'analyse)", tx: "Charges directes affectées au produit ; charges indirectes réparties via les centres d'analyse et leurs unités d'œuvre (heure-machine, heure de MOD, 100 FCFA d'achat). Cascade : coût d'achat → coût de production → coût de revient = production + distribution + administration. Résultat analytique = prix de vente − coût de revient." },
        { t: "m", titre: "Coûts partiels et seuil de rentabilité", tx: "Direct costing : ne retenir que les charges variables ; marge sur coût variable (MCV) = CA − CV. Seuil de rentabilité : SR = charges fixes / taux de MCV — le CA qui couvre juste les fixes. Point mort = date où le SR est atteint. Pour un produit : contribution = MCV unitaire ; on abandonne un produit si sa MCV est négative, PAS si son « résultat complet » est négatif." },
        { t: "e", titre: "Atelier de jus d'ananas", tx: "PV 1 000 FCFA/bouteille, CV 600, fixes 6 000 000/an : taux de MCV 40 %, SR = 15 000 000 FCFA soit 15 000 bouteilles. Une commande spéciale à 700 FCFA (au-dessus du CV de 600) est acceptable À COURT TERME si la capacité est excédentaire : elle contribue 100 FCFA/bouteille aux fixes." },
        { t: "p", titre: "Le coût complet peut mal orienter", tx: "Les clés de répartition arbitraires « chargent » les produits différemment : un produit rentable en contribution peut paraître déficitaire en coût complet. Pour les décisions de court terme (accepter/refuser, garder/abandonner), raisonner en coûts PERTINENTS (variables, évitables, d'opportunité) — les coûts irrécupérables sont hors débat." }
      ],
      retenir: [
        "Coût de revient = production + hors production ; unités d'œuvre pour l'indirect",
        "SR = CF / taux de MCV ; point mort = date du SR",
        "Décision court terme : contribution (MCV), coûts évitables",
        "Coûts irrécupérables (sunk) : à ignorer dans la décision"
      ],
      refs: ["Dubrulle L. & Jourdain D., Comptabilité analytique de gestion, Dunod", "Horngren C. et al., Cost Accounting, Pearson"] }
  ],
  refsGlobales: [
    "Acte uniforme OHADA (AUDCIF) et Guide SYSCOHADA révisé — ohada.org",
    "Grandguillot B. & F., Comptabilité générale, Gualino (mise à jour annuelle)",
    "Dubrulle & Jourdain, Comptabilité analytique de gestion, Dunod",
    "ONECCA Togo / experts-comptables — doctrine locale"
  ]
},

"Fiscalité (Togo)": {
  icon: "🏛️",
  tagline: "IRPP, IS, TVA, droits et procédures : le système fiscal togolais tel qu'il s'applique.",
  duree: "≈ 2 h",
  objectifs: [
    "Cartographier les impôts togolais et leurs textes (CGI, LPF)",
    "Calculer l'IRPP (barème progressif) et l'IS (taux, minimum forfaitaire)",
    "Maîtriser la mécanique TVA : collectée, déductible, crédit",
    "Connaître les régimes (réel, synthétique/TPU) et obligations déclaratives",
    "Comprendre contrôle, contentieux et incitations (code des investissements)"
  ],
  lecons: [
    { titre: "Le paysage fiscal togolais", duree: "18 min",
      blocs: [
        { t: "c", titre: "Impôts directs et indirects", tx: "Directs : IRPP (personnes physiques, barème progressif), IS (sociétés), patente, taxes foncières, IRCM sur les capitaux mobiliers. Indirects : TVA (taux normal 18 %), droits d'accises (boissons, tabacs…), droits d'enregistrement et de timbre, droits de douane à l'import (TEC). Les textes : Code général des impôts et Livre des procédures fiscales, actualisés par les lois de finances annuelles ; l'OTR (Office togolais des recettes) administre impôts ET douanes." },
        { t: "c", titre: "Qui paie quoi ?", tx: "Salarié : IRPP retenu à la source par l'employeur. Entreprise individuelle/petite activité : régime synthétique (taxe professionnelle unique) sous seuils de chiffre d'affaires. Société : IS + obligations TVA si assujettie + retenues à la source diverses. Propriétaire : taxe foncière ; consommateur : TVA et accises dans les prix." },
        { t: "e", titre: "Pression fiscale et civisme", tx: "La pression fiscale togolaise (recettes/PIB) progresse mais reste sous la cible UEMOA de 20 % : informalité, exonérations et assiettes étroites. La digitalisation OTR (télédéclaration, paiement mobile) réduit les coûts de conformité — condition première de l'élargissement de l'assiette." },
        { t: "p", titre: "Impôt légal ≠ impôt économique", tx: "Celui qui VERSE l'impôt n'est pas forcément celui qui le SUPPORTE : la TVA est versée par l'entreprise mais pèse sur le consommateur ; une hausse d'IS peut se répercuter sur prix ou salaires. C'est l'incidence fiscale (leçon de micro : côté le moins élastique)." }
      ],
      retenir: [
        "CGI + LPF + lois de finances ; OTR = administration unifiée",
        "TVA 18 % (taux normal) ; IRPP progressif ; IS proportionnel",
        "Cible UEMOA : pression fiscale ≥ 20 % du PIB",
        "Incidence ≠ redevable légal"
      ],
      refs: ["Code général des impôts du Togo (otr.tg)", "Lois de finances — budget.gouv.tg", "UEMOA, critères de convergence (uemoa.int)"] },
    { titre: "Imposer les revenus : IRPP et IS", duree: "20 min",
      blocs: [
        { t: "m", titre: "IRPP : la progressivité", tx: "Revenu imposable = revenu brut − charges admises (frais professionnels plafonnés, cotisations sociales). Barème progressif PAR TRANCHES : chaque tranche est taxée à SON taux — le taux marginal ne s'applique qu'au-delà du seuil, d'où un taux moyen toujours inférieur au marginal. Retenue mensuelle à la source pour les salariés, régularisation annuelle." },
        { t: "m", titre: "IS : assiette et minimum", tx: "Résultat fiscal = résultat comptable + réintégrations (charges non déductibles : amendes, libéralités excessives, fraction excessive de certains frais) − déductions (produits non imposables, reports déficitaires admis). IS = taux légal × résultat fiscal, avec un MINIMUM forfaitaire de perception assis sur le chiffre d'affaires : même déficitaire, une société paie le minimum. Acomptes en cours d'année, solde à la liquidation." },
        { t: "e", titre: "Passage comptable → fiscal", tx: "Bénéfice comptable 10 000 000 ; amende OTR 500 000 (réintégrée), provision non déductible 1 000 000 (réintégrée), reprise déjà imposée 400 000 (déduite) : résultat fiscal 11 100 000. L'IS se calcule dessus — puis on compare au minimum forfaitaire sur CA et on retient le plus élevé." },
        { t: "p", titre: "« Changer de tranche » ne ruine personne", tx: "Croire qu'une augmentation qui fait « sauter de tranche » réduit le net est faux : seul l'EXCÉDENT est taxé au taux supérieur. Le net augmente toujours avec le brut dans un barème par tranches." }
      ],
      retenir: [
        "IRPP : barème PAR TRANCHES ; taux moyen < taux marginal",
        "Résultat fiscal = comptable + réintégrations − déductions",
        "IS : max(taux × résultat fiscal ; minimum forfaitaire sur CA)",
        "Salariés : retenue à la source mensuelle"
      ],
      refs: ["CGI Togo — titres IRPP et IS (otr.tg)", "Notes circulaires OTR d'application des lois de finances"] },
    { titre: "La TVA : neutralité et mécanique", duree: "20 min",
      blocs: [
        { t: "f", titre: "Collectée − déductible", tx: "TVA due = TVA collectée sur les ventes taxables − TVA déductible sur les achats affectés à l'exploitation (avec exclusions légales). Si déductible > collectée : crédit de TVA, reportable ou remboursable sous conditions (exportateurs prioritaires). La TVA est NEUTRE pour l'entreprise assujettie : elle taxe la consommation finale." },
        { t: "c", titre: "Champ, exonérations, territorialité", tx: "Assujettis : livraisons de biens et prestations à titre onéreux par des professionnels. Exonérations classiques : santé, enseignement, produits de première nécessité listés, opérations bancaires soumises à la TAF. Exportations : taxées au taux zéro (détaxées, droit à déduction conservé) — à distinguer de l'exonération simple qui PERD la déduction amont." },
        { t: "e", titre: "Déclaration mensuelle type", tx: "Ventes locales 20 000 000 HT → collectée 3 600 000. Achats déductibles 12 000 000 HT → déductible 2 160 000. TVA à décaisser : 1 440 000, télédéclarée et payée dans le délai légal du mois suivant. Une facture d'achat sans NIF fournisseur valide = déduction refusée en contrôle." },
        { t: "p", titre: "Taux zéro ≠ exonération", tx: "L'exportateur au taux zéro déduit sa TVA amont (et accumule des crédits remboursables). L'exonéré simple ne facture pas de TVA mais NE DÉDUIT PAS : la TVA amont devient un coût. Confondre les deux fausse tout calcul de rentabilité." }
      ],
      retenir: [
        "Due = collectée − déductible ; crédit reportable/remboursable",
        "Export = taux zéro (déduction conservée) ; exonéré = déduction perdue",
        "Facture conforme (NIF) = condition de déduction",
        "La TVA pèse sur le consommateur final"
      ],
      refs: ["CGI Togo — titre TVA (otr.tg)", "Directives TVA de l'UEMOA (uemoa.int)"] },
    { titre: "Régimes, procédures et incitations", duree: "18 min",
      blocs: [
        { t: "c", titre: "Régimes d'imposition", tx: "Selon le chiffre d'affaires : régime réel (comptabilité complète, TVA, IS/IRPP réel) et régime synthétique — taxe professionnelle unique (TPU) pour les petites activités : un pourcentage du CA tenant lieu de plusieurs impôts, obligations allégées. Le franchissement des seuils fait basculer de régime — anticiper la transition comptable." },
        { t: "m", titre: "Déclarer, contrôler, contester", tx: "Obligations : immatriculation (NIF), déclarations périodiques, facturation conforme (facture normalisée/certifiée selon les réformes en vigueur), conservation des pièces. Contrôle : sur pièces ou vérification sur place ; garanties du contribuable (avis préalable, débat contradictoire, assistance d'un conseil). Contentieux : réclamation administrative préalable PUIS juge ; la réclamation ne suspend pas le paiement sauf sursis." },
        { t: "e", titre: "Incitations à l'investissement", tx: "Code des investissements et régime de la zone franche/plateformes industrielles : exonérations ou réductions temporaires (IS, droits de douane) contre engagements (investissement minimal, emplois, export). L'analyse coût-bénéfice publique de ces dépenses fiscales figure en annexe des lois de finances — l'évaluation (cf. S&E) s'applique aussi à l'impôt." },
        { t: "p", titre: "Optimisation ≠ fraude", tx: "Choisir le régime légal le plus favorable, imputer correctement ses charges : licite. Dissimuler des recettes, fausses factures, minorations : fraude sanctionnée (redressements, pénalités, poursuites). La frontière est la SINCÉRITÉ des déclarations." }
      ],
      retenir: [
        "TPU (synthétique) sous seuils ; réel au-delà",
        "Contrôle : garanties procédurales ; contentieux : réclamation préalable",
        "Incitations = dépenses fiscales à évaluer",
        "Optimisation licite / fraude sanctionnée : question de sincérité"
      ],
      refs: ["Livre des procédures fiscales du Togo (otr.tg)", "Code des investissements du Togo — API-ZF (investintogo.tg)", "Rapports annuels OTR"] }
  ],
  refsGlobales: [
    "Code général des impôts et Livre des procédures fiscales du Togo — otr.tg",
    "Lois de finances annuelles — budget.gouv.tg",
    "Directives fiscales UEMOA (TVA, accises) — uemoa.int",
    "OTR (otr.tg) : circulaires, guides du contribuable, télédéclaration"
  ]
},

"Marchés publics et passation (Togo)": {
  icon: "📑",
  tagline: "De la planification à l'exécution : passer des marchés publics réguliers, efficaces et intègres.",
  duree: "≈ 2 h",
  objectifs: [
    "Connaître le cadre juridique et institutionnel togolais (ARCOP, DNCMP, PRMP)",
    "Dérouler le cycle : planification, publicité, sélection, attribution",
    "Distinguer les procédures (AOO, restreint, demande de cotation, entente directe)",
    "Évaluer les offres (conformité, prix évalué, mieux-disant) et gérer les recours",
    "Suivre l'exécution : garanties, avenants, réception, paiements"
  ],
  lecons: [
    { titre: "Cadre, acteurs et principes", duree: "18 min",
      blocs: [
        { t: "c", titre: "Principes cardinaux", tx: "Liberté d'accès à la commande publique, égalité de traitement des candidats, transparence des procédures — plus efficacité de la dépense et économie. Le cadre togolais (code des marchés publics et textes d'application, aligné sur les directives UEMOA) s'applique à l'État, aux collectivités, aux établissements et sociétés publics, au-dessus de seuils fixés par voie réglementaire." },
        { t: "c", titre: "Les acteurs", tx: "PRMP (personne responsable des marchés publics) : conduit la procédure côté autorité contractante ; commissions (ouverture des plis, évaluation) ; contrôle a priori par la structure nationale de contrôle (DNCMP) au-delà des seuils ; régulation, formation et recours par l'autorité de régulation (ARCOP) ; audit externe périodique des marchés." },
        { t: "e", titre: "Pourquoi tant de formalisme ?", tx: "La commande publique pèse un poids macroéconomique majeur (souvent 15-20 % du PIB dans la région) : chaque point d'efficacité gagné libère des ressources budgétaires. Le formalisme n'est pas une fin : il est le prix de la mise en concurrence crédible." },
        { t: "p", titre: "Fractionnement interdit", tx: "Découper artificiellement un besoin pour passer sous les seuils (et éviter l'appel d'offres) est une irrégularité classique, détectée par les audits via l'agrégation des achats similaires sur l'exercice. La planification (PPM) prévient ce risque." }
      ],
      retenir: [
        "Principes : accès, égalité, transparence + efficacité",
        "PRMP conduit ; DNCMP contrôle a priori ; ARCOP régule et traite les recours",
        "Seuils réglementaires par nature de marché",
        "Fractionnement = irrégularité majeure"
      ],
      refs: ["Code des marchés publics du Togo et décrets d'application", "Directives UEMOA n° 04 et 05/2005 sur les marchés publics (uemoa.int)", "ARCOP Togo — armp-togo.com / arcop.tg"] },
    { titre: "Préparer et lancer : du besoin au dossier", duree: "20 min",
      blocs: [
        { t: "m", titre: "Planifier (PPM) et spécifier", tx: "Le plan de passation des marchés (PPM), tiré du budget, liste les marchés de l'année (objet, procédure, calendrier) et se publie. Le dossier d'appel d'offres (DAO) contient : avis, règlement de la consultation, cahiers des clauses administratives et techniques, critères d'évaluation ET leur pondération, modèles de garanties. Des spécifications neutres (pas de marque imposée) préservent la concurrence." },
        { t: "c", titre: "Choisir la procédure", tx: "Appel d'offres ouvert = règle de principe. Exceptions motivées : appel d'offres restreint (candidats présélectionnés, marchés complexes), demande de cotation/renseignement de prix (petits montants sous seuils), entente directe/gré à gré (urgence impérieuse, exclusivité technique, défense) — strictement encadrée et soumise à autorisation préalable du contrôle." },
        { t: "e", titre: "Publicité et délais", tx: "Avis publié (journal des marchés publics, presse, portail électronique) avec un délai suffisant de préparation des offres (délais minimaux réglementaires selon la procédure et l'origine du financement — les bailleurs comme la Banque mondiale ou la BAD appliquent leurs propres directives sur leurs financements)." },
        { t: "p", titre: "Critères découverts après coup", tx: "Tout critère d'évaluation non annoncé dans le DAO est inopposable : évaluer sur des éléments non publiés est un motif de recours gagnant. La règle : on n'évalue QUE ce qui a été annoncé, avec la pondération annoncée." }
      ],
      retenir: [
        "PPM publié = colonne vertébrale annuelle",
        "AOO par défaut ; gré à gré = exception motivée + autorisation",
        "DAO : spécifications neutres + critères ET pondérations publiés",
        "Jamais de critère non annoncé"
      ],
      refs: ["Code des marchés publics du Togo — procédures", "Dossiers types d'appel d'offres (UEMOA / bailleurs)", "Banque mondiale, Procurement Regulations (worldbank.org)"] },
    { titre: "Ouvrir, évaluer, attribuer", duree: "20 min",
      blocs: [
        { t: "m", titre: "Ouverture et conformité", tx: "Ouverture publique des plis (séance unique, PV signé, prix lus à haute voix) : transparence immédiate. Évaluation en deux temps : conformité administrative et technique (pièces exigées, qualifications, spécifications essentielles) PUIS comparaison financière des seules offres conformes. Une offre substantiellement non conforme est écartée — pas « repêchée » en négociant." },
        { t: "f", titre: "Prix évalué et mieux-disant", tx: "Offre évaluée la moins-disante : prix corrigé des erreurs arithmétiques (le prix unitaire en lettres prime), ajusté des rabais et, si le DAO le prévoit, de critères monétisables (délais, coût d'exploitation). Pour les prestations intellectuelles : sélection qualité-coût (pondération type 80/20) ou qualité seule — le « mieux-disant » n'est PAS un blanc-seing subjectif : tout est barémé." },
        { t: "e", titre: "Offre anormalement basse", tx: "Un soumissionnaire 40 % sous l'estimation : demander par écrit la justification des prix (méthodes, approvisionnements) avant tout rejet. Rejeter sans procédure contradictoire expose au recours ; accepter sans analyse expose à l'abandon de chantier — les deux erreurs coûtent cher." },
        { t: "p", titre: "Conflits d'intérêts", tx: "Un évaluateur lié à un soumissionnaire (parenté, intérêts) doit se déporter ; un consultant ayant préparé le DAO ne peut soumissionner. Les déclarations d'absence de conflit et la traçabilité des PV protègent la procédure ET les évaluateurs." }
      ],
      retenir: [
        "Ouverture publique + PV ; conformité d'abord, prix ensuite",
        "Prix évalué : corrections arithmétiques (lettres priment), critères barémés",
        "Offre anormalement basse : procédure contradictoire écrite",
        "Conflit d'intérêts : déport systématique"
      ],
      refs: ["Code des marchés publics — évaluation et attribution", "Dossiers types et guides d'évaluation ARCOP/DNCMP", "OCDE, Principes pour l'intégrité dans les marchés publics (oecd.org)"] },
    { titre: "Recours, exécution et clôture", duree: "18 min",
      blocs: [
        { t: "c", titre: "Information et recours", tx: "Attribution provisoire publiée et notifiée aux non-retenus (avec les motifs) ; délai de standstill avant signature pour permettre les recours. Voies : recours gracieux devant l'autorité contractante puis recours devant le comité de règlement des différends de l'ARCOP (délais courts, décisions exécutoires) — enfin le juge. Le recours suspend en principe la signature, pas l'exécution déjà engagée." },
        { t: "m", titre: "Garanties et exécution", tx: "Garantie de soumission (sérieux de l'offre), garantie de bonne exécution (pourcentage du marché), retenue de garantie libérée à la réception définitive ; avance de démarrage cautionnée. Avenants : encadrés (plafond en % du marché initial, pas de bouleversement de l'objet) ; ordres de service écrits ; pénalités de retard automatiques sauf force majeure justifiée." },
        { t: "e", titre: "Réceptions et paiements", tx: "Réception provisoire (constat contradictoire, réserves éventuelles) → période de garantie → réception définitive. Paiements sur décomptes/factures certifiés dans les délais réglementaires, intérêts moratoires au-delà. Le suivi physico-financier (taux d'exécution physique vs décaissements) alimente le S&E budgétaire." },
        { t: "p", titre: "L'avenant, zone à risque", tx: "La chaîne « offre basse pour gagner → avenants pour se rattraper » est le schéma de contournement le plus documenté par les audits. Des études préalables solides et un contrôle strict des avenants (justification technique, prix de référence) ferment cette porte." }
      ],
      retenir: [
        "Standstill + CRD ARCOP : recours rapides et exécutoires",
        "Garanties : soumission, bonne exécution, retenue de garantie",
        "Avenants plafonnés et motivés ; pénalités automatiques",
        "Suivre exécution physique ET financière"
      ],
      refs: ["Code des marchés publics — exécution et règlement des différends", "ARCOP — décisions du comité de règlement des différends", "Rapports d'audit des marchés publics (ARCOP/Cour des comptes)"] }
  ],
  refsGlobales: [
    "Code des marchés publics du Togo et textes d'application (arcop.tg)",
    "Directives UEMOA 04 & 05/2005 et guides régionaux (uemoa.int)",
    "Banque mondiale, Procurement Regulations for IPF Borrowers (worldbank.org)",
    "OCDE — intégrité de la commande publique (oecd.org)"
  ]
}

});
