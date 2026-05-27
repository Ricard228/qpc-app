// =====================================================================
// data_extra_mf.js — Marchés financiers UEMOA / BRVM
// 5 packs Manche 1 · 1 duel Manche 2 · 1 finale Manche 3
// Toutes les questions ont ≥ 4 propositions (QCM) avec réponses
// soigneusement documentées (e = explication, ref = source).
// Sources principales : BRVM (brvm.org), CREPMF (crepmf.org), BCEAO,
// AMF France pour les définitions universelles, manuels d'analyse
// financière (Vernimmen, Damodaran, Murphy, Bodie-Kane-Marcus).
// =====================================================================

const MF_NAME = 'Marchés financiers UEMOA / BRVM';

function q(id, qText, choices, correctIndices, r, e, ref, pts) {
  const ci = Array.isArray(correctIndices) ? correctIndices : [correctIndices];
  return { id, q: qText, choices, correctIndices: ci, r, e, ref, pts: pts || 1 };
}

// ---------------------------------------------------------------------
// MANCHE 1 — séries de 4 questions à 1 pt (40 s pour les 4)
// ---------------------------------------------------------------------
const m1Packs = [
  // ============ Pack 1 : Histoire et organisation de la BRVM =========
  {
    titre: 'Fondamentaux de la BRVM',
    theme: 'Bourse régionale',
    domain: MF_NAME,
    questions: [
      q('q1', 'En quelle année la BRVM a-t-elle démarré ses activités effectives ?',
        ['1998', '1996', '2000', '1994'], [0],
        '1998',
        'Créée par convention le 18 décembre 1996, la Bourse Régionale des Valeurs Mobilières a démarré ses activités effectives le 16 septembre 1998. Elle a remplacé la Bourse des Valeurs d\'Abidjan (BVA) qui existait depuis 1976 et a permis l\'intégration des 8 marchés nationaux de l\'UEMOA en une bourse régionale unique.',
        'BRVM, "Historique" — brvm.org/fr/brvm/historique'),
      q('q2', 'Où se trouve le siège de la BRVM ?',
        ['Abidjan, Côte d\'Ivoire', 'Dakar, Sénégal', 'Cotonou, Bénin', 'Ouagadougou, Burkina Faso'], [0],
        'Abidjan',
        'Le siège de la BRVM est situé à Abidjan, Côte d\'Ivoire (Plateau, immeuble BRVM-DC/BR). Chaque État membre de l\'UEMOA dispose d\'une Antenne Nationale de Bourse (ANB) qui relaie les opérations dans son pays.',
        'BRVM, "Contact et antennes nationales" — brvm.org'),
      q('q3', 'Combien d\'États membres de l\'UEMOA participent à la BRVM ?',
        ['8', '7', '14', '6'], [0],
        '8',
        'Les 8 pays de l\'UEMOA participent à la BRVM : Bénin, Burkina Faso, Côte d\'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal, Togo. Tous utilisent le franc CFA (XOF) comme monnaie commune émise par la BCEAO.',
        'UEMOA / BCEAO, traité du 10 janvier 1994.'),
      q('q4', 'Quel organisme régule le marché financier régional de l\'UEMOA ?',
        ['CREPMF', 'BCEAO', 'AMF UEMOA', 'CIMA'], [0],
        'CREPMF',
        'Le Conseil Régional de l\'Épargne Publique et des Marchés Financiers (CREPMF) a été créé par décision du Conseil des Ministres de l\'UEMOA du 3 juillet 1996. Il a pour mission d\'organiser et de contrôler l\'appel public à l\'épargne et d\'habiliter les structures de gestion du marché (BRVM, DC/BR, SGI, OPCVM). Son siège est à Abidjan.',
        'CREPMF — crepmf.org, "Présentation et missions".')
    ]
  },
  // ============ Pack 2 : Acteurs et intervenants ====================
  {
    titre: 'Acteurs du marché financier régional',
    theme: 'Intervenants du marché',
    domain: MF_NAME,
    questions: [
      q('q1', 'Que désigne l\'acronyme SGI dans l\'espace UEMOA ?',
        ['Société de Gestion et d\'Intermédiation', 'Société Générale d\'Investissement', 'Service de Garantie des Investisseurs', 'Système de Gestion Informatique'], [0],
        'Société de Gestion et d\'Intermédiation',
        'Les SGI sont les seules entités habilitées par le CREPMF à exercer les métiers d\'intermédiation, de courtage et de négociation des valeurs mobilières sur la BRVM. Elles servent d\'interface obligatoire entre les investisseurs et le marché. En 2024, l\'UEMOA comptait ~30 SGI agréées (BICI Bourse, CGF Bourse, Hudson & Cie, Africaine de Bourse, SGI Mali, etc.).',
        'CREPMF, "Liste des SGI agréées" — crepmf.org/intermediaires.'),
      q('q2', 'Quelle structure assure la conservation centralisée des titres et le règlement-livraison à la BRVM ?',
        ['Le DC/BR', 'La BCEAO', 'Le CREPMF', 'L\'UEMOA'], [0],
        'DC/BR (Dépositaire Central / Banque de Règlement)',
        'Le Dépositaire Central / Banque de Règlement (DC/BR) assure trois fonctions : (1) conservation centralisée des titres dématérialisés, (2) règlement-livraison des transactions (T+3 historiquement, T+2 depuis 2018), (3) gestion des opérations sur titres (OST : dividendes, coupons, augmentations de capital). Il est filiale de la BRVM.',
        'DC/BR — dcbr.org ; BRVM, organisation du marché.'),
      q('q3', 'Que désigne le sigle OPCVM ?',
        ['Organisme de Placement Collectif en Valeurs Mobilières', 'Organisme Public de Contrôle des Valeurs Mobilières', 'Office Permanent de Cotation des Valeurs Mobilières', 'Organisme Privé de Conservation des Valeurs Mobilières'], [0],
        'Organisme de Placement Collectif en Valeurs Mobilières',
        'Un OPCVM est un véhicule d\'investissement collectif qui mutualise l\'épargne pour la placer en valeurs mobilières (actions, obligations). Dans l\'UEMOA, deux formes juridiques existent : la SICAV (Société d\'Investissement à Capital Variable, capital fluctuant selon les souscriptions/rachats) et le FCP (Fonds Commun de Placement, copropriété de titres sans personnalité morale).',
        'CREPMF, Règlement général 1997 ; instruction OPCVM 04/2019.'),
      q('q4', 'Que signifie "SICAV" ?',
        ['Société d\'Investissement à Capital Variable', 'Société Internationale de Crédit et d\'Aide aux Valeurs', 'Système Intégré de Cotation et d\'Animation des Valeurs', 'Société Ivoirienne de Capital-Action'], [0],
        'Société d\'Investissement à Capital Variable',
        'Une SICAV est une société anonyme cotée dont le capital varie automatiquement avec les souscriptions et les rachats des actionnaires (= porteurs de parts). Sa valeur liquidative (VL ou NAV) est calculée périodiquement à partir de l\'inventaire des actifs. La SICAV est gérée par une société de gestion d\'OPCVM agréée par le CREPMF.',
        'CREPMF, instruction relative aux OPCVM ; AMF France pour le cadre comparable.')
    ]
  },
  // ============ Pack 3 : Indices et indicateurs BRVM ================
  {
    titre: 'Indices et indicateurs de la BRVM',
    theme: 'Mesures de marché',
    domain: MF_NAME,
    questions: [
      q('q1', 'Quel indice phare regroupe l\'ensemble des actions cotées à la BRVM ?',
        ['BRVM Composite', 'BRVM 10', 'BRVM Industrie', 'BRVM Prestige'], [0],
        'BRVM Composite',
        'L\'indice BRVM Composite, lancé en 1998 avec une base 100 au 15/09/1998, intègre la quasi-totalité des actions cotées (~45-50 sociétés en 2024). Sa valeur reflète la performance globale du marché actions de l\'UEMOA. Il est diffusé en temps réel via le système électronique de cotation.',
        'BRVM, "Méthodologie des indices BRVM" — brvm.org/fr/indices.'),
      q('q2', 'Que représente l\'indice BRVM 10 ?',
        ['Les 10 sociétés les plus liquides et capitalisées de la BRVM', 'Les 10 sociétés les plus anciennes cotées', 'Les 10 plus petites capitalisations', 'Les 10 sociétés du secteur bancaire'], [0],
        'Les 10 valeurs les plus actives et capitalisées',
        'Le BRVM 10 est révisé trimestriellement et regroupe les 10 actions ayant les critères les plus favorables de liquidité (montant moyen quotidien des transactions) et de capitalisation flottante. Composition récente incluant Sonatel, Orange CI, SGB CI, ETI, Coris Bank, etc. Base 100 = 15/09/1998.',
        'BRVM, "Indices — BRVM 10" ; révision trimestrielle.'),
      q('q3', 'Quel indice de la BRVM a été lancé en 2022 pour étendre la base à 30 valeurs ?',
        ['BRVM 30', 'BRVM Performance', 'BRVM Élite', 'BRVM Plus'], [0],
        'BRVM 30',
        'L\'indice BRVM 30 a été lancé le 10 janvier 2022 avec une base 100 au 31/12/2021. Il offre une mesure plus large que le BRVM 10 (qui reste l\'indice de référence des valeurs les plus liquides) tout en restant plus sélectif que le Composite. Idéal pour la création de produits dérivés (ETF, etc.).',
        'BRVM, "Lancement de l\'indice BRVM 30", communiqué janvier 2022.'),
      q('q4', 'Comment se définit la capitalisation boursière d\'une société cotée ?',
        ['Cours de l\'action × nombre total d\'actions en circulation', 'Capital social inscrit dans les statuts', 'Total du bilan comptable', 'Chiffre d\'affaires annuel'], [0],
        'Cours × nombre d\'actions',
        'La capitalisation boursière (market cap) est la valeur de marché de la société : prix unitaire de l\'action multiplié par le nombre total d\'actions émises. À la BRVM, on distingue la capitalisation totale (toutes actions) et la capitalisation flottante (actions effectivement disponibles à la négociation, hors blocs de contrôle). En 2024, la capitalisation BRVM dépassait 8 000 milliards FCFA.',
        'Vernimmen, "Finance d\'entreprise", chap. valorisation ; BRVM statistiques mensuelles.')
    ]
  },
  // ============ Pack 4 : Analyse fondamentale ========================
  {
    titre: 'Analyse fondamentale',
    theme: 'Évaluation des actions',
    domain: MF_NAME,
    questions: [
      q('q1', 'Que mesure le PER (Price Earning Ratio) ?',
        ['Cours / bénéfice par action (BPA)', 'Cours / capital social', 'Cours / chiffre d\'affaires', 'Cours / actif net comptable'], [0],
        'Cours / BPA',
        'Le PER (ou multiple de capitalisation des bénéfices) indique combien de fois le bénéfice par action est intégré dans le cours. Un PER de 15 signifie qu\'il faut 15 années de bénéfices au niveau actuel pour rentabiliser le prix payé. Un PER faible peut signaler une décote (opportunité) ou un risque (croissance ralentie) ; un PER élevé suppose de fortes anticipations de croissance.',
        'Damodaran, "Investment Valuation", chap. 17 ; Vernimmen chap. 21.'),
      q('q2', 'Que représente le ratio "rendement du dividende" (dividend yield) ?',
        ['Dividende par action / cours de l\'action', 'Dividende par action / bénéfice par action', 'Dividende net / cours d\'achat historique', 'Dividende brut / capital social'], [0],
        'Dividende / cours',
        'Le dividend yield exprime le rendement courant du placement en pourcentage : si une action vaut 10 000 FCFA et verse un dividende annuel de 600 FCFA, le rendement est de 6 %. Les valeurs BRVM offrent traditionnellement des rendements élevés (8-12 % moyenne historique sur le BRVM 10) du fait d\'une politique de distribution généreuse et de cours souvent décotés vs émergents.',
        'BRVM annuaires statistiques ; Bodie, Kane, Marcus, "Investments".'),
      q('q3', 'Que mesure le ratio P/B (Price-to-Book ratio) ?',
        ['Capitalisation boursière / capitaux propres comptables', 'Cours / dividende', 'Prix / coût de production', 'Capitalisation / chiffre d\'affaires'], [0],
        'Capitalisation / capitaux propres',
        'Le Price-to-Book = capitalisation boursière / actif net comptable (ou cours / valeur comptable par action). Un P/B < 1 indique une décote par rapport à la valeur comptable ; > 1 traduit une survalorisation par rapport au bilan, justifiée par des actifs immatériels, des marges élevées ou une croissance attendue. Particulièrement pertinent pour les banques (suivi du ROE).',
        'Vernimmen, chap. 22 ; Damodaran, "Valuation".'),
      q('q4', 'Que signifie le ROE (Return on Equity) ?',
        ['Résultat net / capitaux propres', 'Résultat net / total actif', 'EBITDA / chiffre d\'affaires', 'Dividende / cours'], [0],
        'Résultat net / capitaux propres',
        'Le ROE (rentabilité financière) mesure le rendement comptable pour les actionnaires. Décomposition de DuPont : ROE = marge nette × rotation des actifs × levier financier. Un ROE durablement supérieur au coût des capitaux propres crée de la valeur ; en dessous, l\'entreprise détruit de la valeur. Les banques BRVM affichent souvent des ROE de 15-25 %.',
        'DuPont, années 1920 ; CFA Institute Curriculum, Equity Investments.')
    ]
  },
  // ============ Pack 5 : Analyse technique ===========================
  {
    titre: 'Analyse technique',
    theme: 'Analyse graphique',
    domain: MF_NAME,
    questions: [
      q('q1', 'Que désigne une "moyenne mobile" en analyse technique ?',
        ['La moyenne des cours sur les N dernières séances, recalculée à chaque nouvelle séance', 'Un indicateur de volume échangé', 'Le ratio entre cours et bénéfice', 'La capitalisation moyenne du secteur'], [0],
        'Moyenne des N derniers cours',
        'La moyenne mobile (MA pour Moving Average) lisse les fluctuations de cours. La MM20 (20 jours) est utilisée pour le court terme, MM50 pour le moyen terme, MM200 pour le long terme. Le croisement haussier MM20 au-dessus de MM50 (golden cross) est interprété comme un signal d\'achat ; à l\'inverse le death cross (MM20 sous MM50) comme un signal de vente.',
        'Murphy, "Technical Analysis of the Financial Markets", chap. 9.'),
      q('q2', 'Que mesure le RSI (Relative Strength Index) ?',
        ['La force d\'une tendance par comparaison des gains et pertes moyens (échelle 0-100)', 'Le rendement annuel du titre', 'La sensibilité du cours au marché', 'Le volume cumulé sur N séances'], [0],
        'Force relative gains/pertes',
        'Le RSI développé par J. Welles Wilder en 1978 oscille entre 0 et 100. Un RSI > 70 indique généralement une situation de surachat (correction probable) ; < 30 une situation de survente (rebond probable). Période classique : 14 séances. Les divergences entre cours et RSI sont des signaux importants pour les analystes.',
        'Wilder, "New Concepts in Technical Trading Systems", 1978.'),
      q('q3', 'Que désigne le MACD ?',
        ['Moving Average Convergence Divergence', 'Multi-Asset Correlation Detector', 'Market Average Cumulative Drift', 'Mean Absolute Change in Demand'], [0],
        'Moving Average Convergence Divergence',
        'Indicateur créé par Gerald Appel en 1979. Calcul : MACD = MM exponentielle 12 jours − MM exp. 26 jours. Une "ligne de signal" (MM exp. 9 jours du MACD) sert au déclenchement : croisement haussier MACD au-dessus de la ligne de signal = signal d\'achat. L\'histogramme MACD visualise l\'écart entre les deux.',
        'Appel, "Technical Analysis: Power Tools for Active Investors", 2005.'),
      q('q4', 'En analyse technique, qu\'appelle-t-on un "niveau de résistance" ?',
        ['Un cours plafond où la pression vendeuse stoppe généralement la hausse', 'Un seuil de liquidation forcée par le broker', 'Le plus bas historique du titre', 'Le niveau d\'achat de l\'investisseur de référence'], [0],
        'Cours plafond où la hausse butte',
        'La résistance est un niveau de prix où l\'offre s\'intensifie au point d\'arrêter la progression. Symétrique : le "support" est un plancher où la demande l\'emporte. Lorsqu\'une résistance est franchie de manière convaincante (volume soutenu, clôture au-dessus), elle se transforme classiquement en support. Concepts à la base du chartisme.',
        'Edwards, Magee, Bassetti, "Technical Analysis of Stock Trends", 11e éd.')
    ]
  }
];

// ---------------------------------------------------------------------
// MANCHE 2 — duel de 6 questions (1 à 6 pts), 25 s par question
// ---------------------------------------------------------------------
const m2Packs = [
  {
    titre: 'Marchés financiers UEMOA — duel',
    theme: 'BRVM et finance régionale',
    domain: MF_NAME,
    questions: [
      q('q1', 'Quel est le délai standard de règlement-livraison à la BRVM depuis 2018 ?',
        ['T+2 (deux jours ouvrés après la transaction)', 'T+3', 'T+0 (instantané)', 'T+5'], [0],
        'T+2',
        'Depuis le 26 février 2018, la BRVM applique le cycle de règlement-livraison T+2 (alignement sur les standards internationaux, après la généralisation européenne d\'octobre 2014). Auparavant le cycle était T+3. Concrètement, l\'investisseur reçoit ses titres / son cash 2 jours ouvrés après l\'exécution de l\'ordre en bourse.',
        'BRVM/DC-BR, communiqué de migration T+2 du 26 février 2018.', 1),
      q('q2', 'Comment s\'appelle le système électronique de cotation utilisé par la BRVM ?',
        ['NSC V900 (puis V3, Optiq depuis 2022)', 'GMS Trader', 'CATS', 'NASDAQ Workstation'], [0],
        'NSC, puis Optiq',
        'La BRVM a utilisé pendant de nombreuses années le système NSC (Nouveau Système de Cotation) puis Optiq, technologie Euronext, déployée à partir de 2022 dans le cadre du contrat de coopération technologique avec Euronext. Cotation en continu sur les valeurs les plus liquides, par fixings sur les autres.',
        'BRVM, "Système de cotation Optiq" — communiqués 2022.', 2),
      q('q3', 'Combien de compartiments principaux la BRVM possède-t-elle pour les actions ?',
        ['3 compartiments (Premier, Second et Croissance/PME)', '2 compartiments', '1 seul', '5 compartiments'], [0],
        '3 compartiments',
        'Réforme de la cote 2021 : Premier compartiment (capitalisation ≥ 500 Mds FCFA, ≥ 3 ans bénéficiaires, dispersion ≥ 20 %), Second compartiment (capitalisation ≥ 200 Mds, ≥ 2 ans bénéficiaires), Compartiment Croissance/PME (PME en développement, exigences allégées). Le compartiment Obligataire est séparé.',
        'BRVM, Règlement général de la cote, juin 2021.', 3),
      q('q4', 'Qu\'est-ce qu\'une OST (opération sur titres) ?',
        ['Tout événement qui modifie les caractéristiques d\'un titre détenu (dividende, division, augmentation de capital, OPA…)', 'Une commission de courtage', 'Une transaction de blocs', 'Un ordre stop avec touche limite'], [0],
        'Événement modifiant un titre',
        'Une Opération Sur Titres (OST) est tout événement initié par l\'émetteur affectant les droits attachés à un titre détenu : versement de dividende, paiement de coupon obligataire, division (split) du nominal, regroupement, augmentation de capital (numéraire, gratuite, mixte), offre publique (OPA / OPE), etc. Le DC/BR gère le traitement administratif des OST.',
        'DC/BR, manuel des opérations sur titres ; Vernimmen chap. 25.', 4),
      q('q5', 'En 2019, quelle société sénégalaise s\'est introduite à la BRVM par la plus importante IPO de l\'histoire de la bourse régionale ?',
        ['Orange Côte d\'Ivoire (OCI)', 'Total Sénégal', 'Sonatel', 'Air Sénégal'], [0],
        'Orange Côte d\'Ivoire (OCI)',
        'L\'introduction en bourse d\'Orange Côte d\'Ivoire en décembre 2019 a permis de lever environ 142 milliards FCFA (≈ 240 M$), faisant de cette opération la plus importante IPO de la BRVM à cette date. Elle a porté la capitalisation totale de la BRVM au-dessus de 7 000 Mds FCFA. Sonatel reste cependant la plus grosse capitalisation cotée historiquement.',
        'BRVM, communiqué d\'IPO Orange CI, 5 décembre 2019.', 5),
      q('q6', 'En analyse fondamentale, que représente le "free cash flow to equity" (FCFE) ?',
        ['Le cash flow disponible pour les actionnaires après investissements et variation de la dette nette', 'Le résultat net comptable', 'Le résultat d\'exploitation avant impôt', 'Le cash flow d\'exploitation brut'], [0],
        'Cash flow disponible pour les actionnaires',
        'Le FCFE = Résultat net + Amortissements − Investissements (CAPEX) − Variation du BFR + Variation de la dette nette. Il représente le flux théoriquement distribuable aux actionnaires sans compromettre la pérennité opérationnelle ni la structure financière. Sa version actualisée au coût des fonds propres (CMPC pour FCFF) sert au DCF, méthode reine de valorisation.',
        'Damodaran, "Investment Valuation", 3e éd. chap. 14 ; Vernimmen chap. 31.', 6)
    ]
  }
];

// ---------------------------------------------------------------------
// MANCHE 3 — finale 9 questions à 1 pt (15 s par question)
// ---------------------------------------------------------------------
const m3Packs = [
  {
    titre: 'Finale Marchés financiers UEMOA / BRVM',
    theme: 'Synthèse marchés régionaux',
    domain: MF_NAME,
    questions: [
      q('q1', 'Quel pays abrite à la fois le siège de la BRVM et celui du CREPMF ?',
        ['Côte d\'Ivoire', 'Sénégal', 'Bénin', 'Mali'], [0],
        'Côte d\'Ivoire',
        'BRVM et CREPMF sont tous deux installés à Abidjan, capitale économique de la Côte d\'Ivoire, qui concentre une grande partie du système financier régional ouest-africain.',
        'BRVM, CREPMF — sites institutionnels.'),
      q('q2', 'Quel institut émet la monnaie commune utilisée à la BRVM (FCFA / XOF) ?',
        ['BCEAO', 'BEAC', 'Banque mondiale', 'CEDEAO'], [0],
        'BCEAO',
        'La Banque Centrale des États de l\'Afrique de l\'Ouest (BCEAO), créée en 1959, émet le franc CFA d\'Afrique de l\'Ouest (XOF) utilisé dans les 8 pays UEMOA. À ne pas confondre avec la BEAC (Banque des États d\'Afrique Centrale) qui émet le XAF utilisé dans la CEMAC.',
        'BCEAO — bceao.int ; Traité de l\'UMOA.'),
      q('q3', 'Que désigne l\'acronyme IPO ?',
        ['Initial Public Offering (introduction en bourse)', 'International Portfolio Operation', 'Interest Payment Obligation', 'Inflation Pricing Index'], [0],
        'Initial Public Offering',
        'L\'IPO est l\'opération par laquelle une société propose pour la première fois ses titres au public et obtient leur admission à la cotation sur un marché réglementé. Pour la BRVM, le processus est encadré par le CREPMF et exige notamment la publication d\'une note d\'information visée.',
        'CREPMF, instructions sur l\'appel public à l\'épargne.'),
      q('q4', 'En finance obligataire, qu\'appelle-t-on le "coupon" ?',
        ['L\'intérêt périodique versé par l\'émetteur au détenteur de l\'obligation', 'La commission du courtier', 'Le prix de remboursement', 'La pénalité de remboursement anticipé'], [0],
        'Intérêt périodique versé',
        'Le coupon est l\'intérêt nominal périodique (généralement annuel ou semestriel) versé par l\'émetteur de l\'obligation au détenteur. Il s\'exprime en pourcentage du nominal. Le taux de rendement effectif (yield to maturity, YTM) diffère du taux de coupon facial dès que l\'obligation se négocie au-dessus ou en dessous du pair.',
        'Bodie, Kane, Marcus, "Investments", chap. 14.'),
      q('q5', 'En analyse technique, que désignent les "chandeliers japonais" ?',
        ['Une représentation graphique des cours mettant en évidence ouverture, plus haut, plus bas et clôture sur chaque période', 'Une moyenne pondérée des cours par les volumes', 'Une stratégie d\'arbitrage entre devises', 'Un indicateur de momentum'], [0],
        'Représentation OHLC visuelle',
        'Les chandeliers (candlesticks) japonais ont été développés au XVIIIᵉ siècle par Munehisa Homma sur le marché du riz à Osaka. Chaque chandelier représente une période (jour, heure, etc.) avec un "corps" entre ouverture et clôture, et des "mèches" pour les extrêmes. Couleurs traditionnelles : vert/blanc (clôture > ouverture, hausse) ou rouge/noir (clôture < ouverture, baisse).',
        'Nison, "Japanese Candlestick Charting Techniques", 1991.'),
      q('q6', 'En analyse fondamentale, à quoi sert le DCF (Discounted Cash Flow) ?',
        ['Valoriser une entreprise en actualisant ses flux de trésorerie futurs au coût du capital', 'Calculer le rendement obligataire', 'Mesurer la liquidité d\'un titre', 'Comparer deux indices boursiers'], [0],
        'Valorisation par actualisation des flux',
        'La méthode des Discounted Cash Flows estime la valeur intrinsèque d\'une entreprise comme la somme actualisée de ses flux de trésorerie futurs (FCFF ou FCFE), plus une valeur terminale. Le taux d\'actualisation est le CMPC (WACC) pour FCFF ou le coût des fonds propres pour FCFE. Méthode "reine" mais sensible aux hypothèses de croissance et de marges.',
        'Damodaran, "Investment Valuation", 3e éd. ; Vernimmen chap. 31.'),
      q('q7', 'À la BRVM, quelle action a longtemps représenté la plus forte capitalisation et le plus gros volume échangé ?',
        ['Sonatel', 'Ecobank Transnational Inc (ETI)', 'Total Sénégal', 'BICI CI'], [0],
        'Sonatel',
        'Sonatel (Société Nationale des Télécommunications du Sénégal), filiale d\'Orange, est historiquement la première capitalisation et le titre le plus échangé de la BRVM. Capitalisation > 2 000 Mds FCFA en pointe. L\'action est cotée à Dakar via l\'Antenne Nationale de Bourse et payeuse de dividendes élevés (politique de distribution > 80 %).',
        'BRVM, statistiques mensuelles ; rapport annuel Sonatel.'),
      q('q8', 'Que désigne le sigle CGF dans l\'écosystème BRVM ?',
        ['CGF Bourse, SGI active à Dakar', 'Conseil des Gestionnaires Financiers', 'Centrale de Garantie Financière', 'Crédit Général Foncier'], [0],
        'CGF Bourse (SGI)',
        'CGF Bourse est l\'une des principales Sociétés de Gestion et d\'Intermédiation (SGI) actives sur la BRVM, dont le siège est à Dakar. Elle intervient comme intermédiaire pour le compte d\'investisseurs institutionnels et particuliers, et participe régulièrement aux opérations primaires (IPO, émissions obligataires) en qualité d\'arrangeur ou de co-chef de file.',
        'CREPMF, liste des SGI agréées ; CGF Bourse — cgfbourse.com.'),
      q('q9', 'En 2024, combien de compartiments obligataires distincts existent à la BRVM ?',
        ['Un compartiment obligataire unique', 'Deux (souverain et corporate)', 'Trois compartiments', 'Aucun, les obligations ne sont pas cotées'], [0],
        'Compartiment obligataire unique',
        'À la BRVM, les obligations (titres de créance) sont cotées sur un compartiment unique distinct des actions, qui accueille à la fois les emprunts d\'État (Trésor public via la BCEAO, Sukuks, BOAD) et les obligations corporate. Pour les opérations primaires, le marché des emprunts d\'État de l\'UEMOA est animé par la BCEAO (UMOA-Titres) avec les SVT (Spécialistes en Valeurs du Trésor).',
        'BRVM, Règlement général ; UMOA-Titres — umoatitres.org.')
    ]
  }
];

module.exports = { m1Packs, m2Packs, m3Packs, MF_NAME };
