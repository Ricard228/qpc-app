// =====================================================================
// data_extra_togo.js — Comptabilité, Fiscalité (Togo), Marchés publics (Togo)
// v2.6 : ajout de 3 domaines complémentaires avec contexte togolais
//
// Sources :
//   - SYSCOHADA révisé / AUDCIF (Acte Uniforme OHADA 2017, en vigueur 2018)
//   - Plan Comptable OHADA — 9 classes
//   - Code Général des Impôts (CGI) du Togo + Loi de finances 2024
//   - OTR — Office Togolais des Recettes (loi 2012-016 du 14/12/2012)
//   - Décret n° 2009-277/PR du 11/11/2009 — Code des marchés publics du Togo,
//     modifié notamment par décret 2017-097/PR
//   - Loi n° 2021-034 du 29/12/2021 sur les PPP au Togo
//   - ARMP / DNCMP (Autorité de Régulation et Direction Nationale de Contrôle
//     des Marchés Publics)
// =====================================================================

const COMPTA_NAME = 'Comptabilité générale et analytique';
const FISC_NAME   = 'Fiscalité (Togo)';
const MP_NAME     = 'Marchés publics et passation (Togo)';

function q(id, qText, choices, correctIndices, r, e, ref, pts) {
  const ci = Array.isArray(correctIndices) ? correctIndices : [correctIndices];
  return { id, q: qText, choices, correctIndices: ci, r, e, ref, pts: pts || 1 };
}

// ---------------------------------------------------------------------
// MANCHE 1 — séries de 4 questions à 1 pt (40 s pour les 4)
// ---------------------------------------------------------------------
const m1Packs = [

  // ============== COMPTABILITÉ GÉNÉRALE ET ANALYTIQUE ===============
  {
    titre: 'Plan comptable OHADA',
    theme: 'Comptabilité générale',
    domain: COMPTA_NAME,
    questions: [
      q('q1', 'Quel référentiel comptable s\'applique au Togo en 2024 pour les entreprises ?',
        ['SYSCOHADA révisé / AUDCIF', 'IFRS uniquement', 'US GAAP', 'Plan Comptable Général français'], [0],
        'SYSCOHADA révisé / AUDCIF',
        'Le Togo, État membre de l\'OHADA depuis 1995, applique le Système Comptable OHADA révisé entré en vigueur le 1ᵉʳ janvier 2018 pour les comptes personnels et le 1ᵉʳ janvier 2019 pour les comptes consolidés. Cadre conceptuel défini par l\'Acte Uniforme relatif au Droit Comptable et à l\'Information Financière (AUDCIF). Les sociétés cotées et faisant appel public à l\'épargne appliquent en plus les IFRS (consolidation).',
        'OHADA, AUDCIF du 26/01/2017 — JO OHADA du 15/02/2017.'),
      q('q2', 'Combien de classes le plan comptable OHADA comporte-t-il ?',
        ['9 classes (1 à 9)', '7 classes', '8 classes', '10 classes'], [0],
        '9 classes',
        'Classe 1 : ressources durables (capitaux propres et dettes financières). Classe 2 : actif immobilisé. Classe 3 : stocks. Classe 4 : tiers (clients, fournisseurs, personnel, État, organismes sociaux). Classe 5 : trésorerie. Classe 6 : charges des activités ordinaires. Classe 7 : produits des activités ordinaires. Classe 8 : autres charges et produits HAO. Classe 9 : comptabilité analytique de gestion.',
        'OHADA AUDCIF, Liste des comptes — Norme révisée 2017.'),
      q('q3', 'Quels sont les états financiers obligatoires selon le SYSCOHADA pour le système normal ?',
        ['Bilan, Compte de résultat, Tableau des flux de trésorerie, Notes annexes', 'Uniquement le bilan et le compte de résultat', 'Bilan, CR et budget prévisionnel', 'Compte de résultat et trésorerie'], [0],
        'Bilan, CR, TFT, Notes annexes',
        'Pour le système normal (entreprises dépassant les seuils) : Bilan, Compte de résultat, Tableau des flux de trésorerie (TFT) et Notes annexes. Le système minimal de trésorerie (SMT) s\'applique aux très petites entreprises avec un chiffre d\'affaires < 60 millions FCFA pour les négociants ou < 30 millions FCFA pour les prestataires de services.',
        'OHADA AUDCIF, art. 11 et art. 25 ; système minimal art. 13.'),
      q('q4', 'Que représente la classe 4 dans le plan comptable OHADA ?',
        ['Les comptes de tiers (clients, fournisseurs, État, personnel)', 'Les immobilisations', 'Les capitaux propres', 'Les stocks'], [0],
        'Comptes de tiers',
        'Subdivisions principales : 40 (fournisseurs), 41 (clients), 42 (personnel), 43 (organismes sociaux), 44 (État et collectivités publiques), 45 (organismes internationaux), 46 (associés/groupe), 47 (débiteurs et créditeurs divers), 48 (créances et dettes hors activités ordinaires), 49 (dépréciations et provisions).',
        'OHADA AUDCIF, Liste des comptes.')
    ]
  },
  {
    titre: 'Opérations comptables courantes',
    theme: 'Comptabilité générale',
    domain: COMPTA_NAME,
    questions: [
      q('q1', 'En partie double, toute opération économique est enregistrée par…',
        ['Au moins un débit et un crédit d\'égal montant', 'Un seul mouvement comptable', 'Un débit uniquement', 'Un crédit uniquement'], [0],
        'Débit = Crédit',
        'Principe fondamental hérité de Luca Pacioli (1494). Chaque opération doit respecter l\'équilibre Actif = Passif + Capitaux propres. Tout débit a une contrepartie créditrice d\'un montant identique. Garantit l\'égalité du bilan et permet le contrôle arithmétique.',
        'Pacioli, "Summa de Arithmetica", 1494 ; OHADA AUDCIF.'),
      q('q2', 'L\'amortissement d\'une immobilisation reflète…',
        ['La constatation comptable de la perte de valeur due à l\'usage et au temps', 'Le remboursement du prêt qui l\'a financée', 'La revente prévue', 'Une provision pour litige'], [0],
        'Perte de valeur due à l\'usage et au temps',
        'L\'amortissement est une charge calculée (compte 68) qui répartit le coût d\'acquisition d\'une immobilisation amortissable sur sa durée d\'utilité économique. Modes : linéaire (le plus courant), dégressif, unités d\'œuvre. La contrepartie est un compte 28 (amortissements cumulés) qui vient en diminution de l\'actif.',
        'OHADA AUDCIF, art. 45 ; IAS 16.'),
      q('q3', 'Que sont les "produits constatés d\'avance" ?',
        ['Des produits encaissés mais relatifs à un exercice futur (au passif du bilan)', 'Des créances non encore facturées', 'Des stocks vendus', 'Des revenus financiers'], [0],
        'Produits encaissés à imputer à un exercice futur',
        'Régularisation de clôture (principe d\'indépendance des exercices) : par exemple loyer reçu le 1ᵉʳ déc. pour la période déc.-fév., les 2/3 perçus sont à reporter sur l\'exercice suivant. Comptablement : compte 477 au passif. Symétrique des "charges constatées d\'avance" à l\'actif (compte 476).',
        'OHADA AUDCIF, principe d\'indépendance des exercices, art. 59.'),
      q('q4', 'Quelles sont les composantes du bilan SYSCOHADA ?',
        ['Actif (immobilisé, circulant, trésorerie) + Passif (capitaux propres, dettes financières, passif circulant, trésorerie passif)', 'Actif et passif uniquement, sans subdivision', 'Capitaux propres seulement', 'Charges et produits'], [0],
        'Actif et Passif structurés',
        'Le bilan SYSCOHADA présente : à l\'actif (1) immobilisations (incorporelles, corporelles, financières), (2) actif circulant (stocks, créances), (3) trésorerie-actif (banques, caisses) ; au passif (1) capitaux propres, (2) dettes financières et provisions, (3) passif circulant (dettes fournisseurs, fiscales, sociales), (4) trésorerie-passif (concours bancaires).',
        'OHADA AUDCIF, modèle de bilan.')
    ]
  },
  {
    titre: 'Comptabilité analytique — méthodes',
    theme: 'Comptabilité de gestion',
    domain: COMPTA_NAME,
    questions: [
      q('q1', 'Que désigne la méthode des coûts complets ?',
        ['Méthode imputant à chaque produit tous les coûts (directs + indirects via clés de répartition)', 'Une méthode ne retenant que les coûts variables', 'Une méthode standardisée par produit', 'La méthode comptable légale obligatoire'], [0],
        'Tous les coûts (directs + indirects)',
        'Méthode traditionnelle française, dite des "sections homogènes" développée par le Colonel Rimailho (1928). Étapes : (1) charges directes affectées, (2) charges indirectes regroupées dans des centres d\'analyse, (3) imputation aux produits via une unité d\'œuvre. Permet de calculer un coût de revient unitaire complet et un résultat analytique.',
        'Rimailho, "Établissement des prix de revient", 1928 ; CNOF.'),
      q('q2', 'La méthode ABC (Activity-Based Costing) consiste à…',
        ['Imputer les charges indirectes via les activités qui les génèrent (inducteurs de coûts)', 'Classer les produits A, B, C selon leur rentabilité', 'Ne traiter que les coûts directs', 'Comparer trois budgets alternatifs'], [0],
        'Imputation par activités (inducteurs)',
        'Méthode développée par Cooper & Kaplan à Harvard dans les années 1980. Critique la méthode traditionnelle qui sous-évalue le coût des produits complexes en faible volume. Étapes : identifier activités, mesurer inducteurs (cost drivers), allouer les charges. Particulièrement adaptée aux entreprises industrielles et de service avec forte diversité de produits.',
        'Cooper & Kaplan, "Activity-Based Costing", HBR 1988.'),
      q('q3', 'Le "seuil de rentabilité" est atteint lorsque…',
        ['La marge sur coût variable couvre exactement les charges fixes (résultat = 0)', 'Le chiffre d\'affaires est maximum', 'Les ventes égalent le stock', 'Les dettes égalent les créances'], [0],
        'Marge sur coût variable = charges fixes',
        'Seuil de rentabilité (point mort) en valeur = CF / Taux de MCV ; en quantité = CF / MCV unitaire. Permet de calculer la marge de sécurité et l\'indice de sécurité. Concept central du contrôle de gestion pour évaluer la viabilité d\'une activité et son levier opérationnel (= MCV/Résultat).',
        'Lassègue, "Contrôle de gestion" ; Burlaud & Simon.'),
      q('q4', 'Que désigne un écart sur coût standard "favorable" ?',
        ['Coût réel < coût standard préétabli', 'Coût réel > coût standard', 'Coût réel = coût standard', 'Le standard a été réévalué'], [0],
        'Réel < Standard',
        'En contrôle budgétaire, on calcule des écarts entre standard préétabli et réalité, décomposés en écart sur quantité (efficacité) et écart sur prix (productivité). Un écart favorable indique une performance meilleure que prévue. Méthode initiée par Taylor (1911) et formalisée par Émile Rimailho et les méthodes de gestion budgétaire.',
        'Taylor, "Scientific Management", 1911 ; Anthony, "Management Control Systems".')
    ]
  },
  {
    titre: 'Analyse financière et ratios',
    theme: 'Diagnostic financier',
    domain: COMPTA_NAME,
    questions: [
      q('q1', 'Que mesure le ratio de liquidité générale (current ratio) ?',
        ['Actif circulant / Passif circulant', 'Capitaux propres / Total bilan', 'Résultat net / CA', 'Dettes / Capitaux propres'], [0],
        'Actif circulant / Passif circulant',
        'Mesure la capacité de l\'entreprise à honorer ses dettes à court terme avec ses actifs circulants. Ratio > 1 généralement attendu. La liquidité réduite (quick ratio) exclut les stocks : (Actif circulant − Stocks) / Passif circulant, plus prudente notamment pour les services.',
        'Vernimmen, "Finance d\'entreprise", chap. 17.'),
      q('q2', 'Que représente le BFR (Besoin en Fonds de Roulement) ?',
        ['Besoin de financement du cycle d\'exploitation = Stocks + Créances − Dettes d\'exploitation', 'Le résultat d\'exploitation', 'L\'investissement net annuel', 'Le chiffre d\'affaires moyen'], [0],
        'Stocks + Créances − Dettes d\'exploitation',
        'Le BFR représente le décalage de trésorerie entre encaissements et décaissements d\'exploitation. Si > 0, besoin à financer ; si < 0 (cas distribution, grande surface), excédent de trésorerie. Le FR (Fonds de Roulement) = Ressources stables − Emplois stables doit en principe couvrir le BFR ; la différence est la trésorerie nette.',
        'OHADA AUDCIF, états financiers ; Vernimmen chap. 17-18.'),
      q('q3', 'La rentabilité économique (ROCE) mesure…',
        ['Résultat d\'exploitation après impôt / Capitaux engagés (capitaux propres + dette financière nette)', 'Résultat net / CA', 'Dividende / Cours', 'Capitalisation / Bénéfice'], [0],
        'REX après IS / Capitaux engagés',
        'Return On Capital Employed mesure la performance de l\'outil économique avant prise en compte de la structure financière. Comparé au CMPC : si ROCE > CMPC, l\'entreprise crée de la valeur (EVA positive). Décomposition : ROCE = Marge × Rotation des capitaux.',
        'Vernimmen chap. 13 ; Stern Stewart, EVA, 1991.'),
      q('q4', 'Que désigne la CAF (Capacité d\'Autofinancement) ?',
        ['Flux potentiel de trésorerie généré par l\'activité = Résultat net + Dotations − Reprises − Plus-values', 'Le chiffre d\'affaires moyen', 'Le résultat d\'exploitation', 'L\'investissement programmé'], [0],
        'RN + Dotations − Reprises − Plus-values',
        'Indicateur clé : représente les ressources internes que l\'entreprise génère pour financer ses investissements, rembourser ses dettes ou distribuer des dividendes. À distinguer du cash-flow d\'exploitation (qui tient compte des variations de BFR). CAF / CA donne un indicateur de la capacité à dégager des ressources.',
        'Vernimmen chap. 4 ; PCG / SYSCOHADA, tableaux de flux.')
    ]
  },

  // ====================== FISCALITÉ (TOGO) =========================
  {
    titre: 'OTR et organisation fiscale du Togo',
    theme: 'Administration fiscale togolaise',
    domain: FISC_NAME,
    questions: [
      q('q1', 'Que signifie OTR au Togo ?',
        ['Office Togolais des Recettes', 'Organisation Togolaise des Régies', 'Office du Trésor et du Recouvrement', 'Organe Togolais de Régulation'], [0],
        'Office Togolais des Recettes',
        'L\'OTR est l\'administration fiscale et douanière togolaise, créé par la loi n° 2012-016 du 14 décembre 2012 et opérationnel depuis le 1ᵉʳ janvier 2014. Il a fusionné la Direction Générale des Impôts (DGI) et la Direction Générale des Douanes (DGD) sous un même organe. Statut d\'autorité administrative autonome avec personnalité juridique, sous la tutelle du ministère chargé des Finances.',
        'Loi n° 2012-016 du 14/12/2012 portant création de l\'OTR.'),
      q('q2', 'Quel texte constitue la base de la fiscalité directe et indirecte au Togo ?',
        ['Le Code Général des Impôts (CGI)', 'Le Code OHADA', 'Le Code du commerce', 'Le Code du travail'], [0],
        'CGI togolais',
        'Le CGI consolide l\'ensemble des dispositions relatives aux impôts directs (IRPP, IS, IMF) et indirects (TVA, droits d\'enregistrement, etc.). Il est mis à jour annuellement par la Loi de Finances. La version applicable aux opérations de 2024 intègre les évolutions de la LF 2024 votée par l\'Assemblée nationale.',
        'CGI Togo, édition annuelle OTR ; LF 2024.'),
      q('q3', 'Quel taux normal de TVA s\'applique au Togo ?',
        ['18 %', '15 %', '20 %', '10 %'], [0],
        '18 %',
        'Taux normal harmonisé au sein de l\'UEMOA (Directive n° 02/98/CM/UEMOA modifiée). Certains biens et services sont exonérés (produits de première nécessité, services médicaux, financiers, éducation), d\'autres en taux zéro (exportations). La TVA togolaise applique le mécanisme de la déduction en cascade. Seuil de franchise de TVA : CA annuel < 60 M FCFA (régime simplifié).',
        'CGI Togo, Livre II ; Directive UEMOA TVA.'),
      q('q4', 'Quel est l\'organe de recours administratif gracieux contre une imposition au Togo ?',
        ['La Commission Paritaire de Conciliation Fiscale', 'La Cour Suprême', 'L\'Assemblée nationale', 'Le Conseil d\'État français'], [0],
        'Commission Paritaire de Conciliation Fiscale',
        'En cas de contestation, le contribuable peut introduire un recours gracieux auprès du Commissaire Général de l\'OTR (délai 30 jours), puis saisir la Commission Paritaire de Conciliation Fiscale (CPCF) qui comprend des représentants de l\'administration et du secteur privé. En dernier recours : tribunaux administratifs / Cour Suprême.',
        'CGI Togo, Livre des Procédures Fiscales, art. relatifs aux recours.')
    ]
  },
  {
    titre: 'Impôts directs au Togo',
    theme: 'IS, IRPP, IMF',
    domain: FISC_NAME,
    questions: [
      q('q1', 'Quel est le taux normal de l\'Impôt sur les Sociétés (IS) au Togo en 2024 ?',
        ['27 %', '30 %', '25 %', '15 %'], [0],
        '27 %',
        'Le taux normal de l\'IS au Togo est fixé à 27 % (LF 2018-2019). Un taux réduit de 27 % uniforme s\'applique désormais (auparavant 29 % pour la généralité et 27 % pour les industries). Certaines activités spécifiques bénéficient d\'incitations (zone franche, code des investissements, agréments BCEAO).',
        'CGI Togo, art. 96 et suivants ; LF Togo 2019 et 2024.'),
      q('q2', 'Quel est l\'Impôt Minimum Forfaitaire (IMF) au Togo ?',
        ['Un impôt plancher de 1 % du chiffre d\'affaires hors taxes', 'Un impôt sur le bénéfice seul', 'Une taxe foncière', 'Un acompte sur la TVA'], [0],
        '1 % du CA hors taxes (plancher)',
        'L\'IMF est dû par les sociétés soumises à l\'IS lorsque l\'IS calculé est inférieur à ce minimum. Taux usuel de 1 % du CA HT (avec un minimum forfaitaire en valeur). L\'IMF est imputable sur l\'IS de l\'exercice et reportable. Vise à garantir un minimum de prélèvement sur les entreprises déficitaires ou faiblement bénéficiaires.',
        'CGI Togo, art. 122 et suivants.'),
      q('q3', 'Le barème de l\'Impôt sur le Revenu des Personnes Physiques (IRPP) au Togo est…',
        ['Progressif par tranches', 'Proportionnel à taux unique 20 %', 'Forfaitaire selon la catégorie professionnelle', 'Calculé en fonction du seul nombre d\'enfants'], [0],
        'Progressif par tranches',
        'Barème progressif appliqué au revenu net imposable. Tranches successives (LF récente) ex. : 0 % jusqu\'à un certain seuil, puis 5 %, 10 %, 15 %, 20 %, 25 %, 30 %, jusqu\'à 35 % au-delà d\'un plafond. Système de quotient familial limité. Les salariés bénéficient d\'un abattement forfaitaire (frais professionnels) sur le salaire brut.',
        'CGI Togo, Livre I, IRPP — barème en LF annuelle.'),
      q('q4', 'Que sont les impôts locaux togolais ?',
        ['Patente, contribution foncière, taxe d\'habitation et taxes communales diverses', 'IRPP et IS', 'TVA et droits de douane', 'Impôt sur le revenu uniquement'], [0],
        'Patente, foncier, taxe d\'habitation, taxes communales',
        'Impôts locaux : contribution des patentes (activité commerciale/industrielle), contribution foncière des propriétés bâties et non bâties, taxe d\'habitation, taxe sur les terrains non bâtis urbains, taxes sur les véhicules. Sont perçus par l\'État puis reversés en partie aux collectivités. Réforme de la fiscalité locale en cours dans le cadre de la décentralisation (élections locales 2019).',
        'CGI Togo, Livre IV ; loi sur la décentralisation 2007.')
    ]
  },
  {
    titre: 'TVA et obligations fiscales au Togo',
    theme: 'TVA et procédures',
    domain: FISC_NAME,
    questions: [
      q('q1', 'Quelles entreprises sont soumises à la TVA au Togo ?',
        ['Entreprises dont le CA annuel dépasse 60 millions FCFA (services) ou 100 M FCFA (négoce)', 'Toutes les entreprises sans seuil', 'Uniquement les sociétés cotées', 'Uniquement les exportateurs'], [0],
        'CA > seuils définis par catégorie',
        'Au Togo, le régime du réel normal (assujettissement TVA) s\'applique au-delà des seuils fixés par la LF. En dessous, l\'entreprise relève du régime simplifié ou de la Taxe Professionnelle Unique (TPU) selon son CA. Les exonérations subjectives concernent certaines activités (médecins, enseignants, banques pour les opérations spécifiques, etc.).',
        'CGI Togo, art. 295 et suivants ; LF annuelle pour les seuils.'),
      q('q2', 'Quelle est la périodicité normale de déclaration de TVA au Togo ?',
        ['Mensuelle (déclaration et paiement avant le 15 du mois suivant)', 'Trimestrielle', 'Annuelle', 'Bi-annuelle'], [0],
        'Mensuelle, au plus tard le 15',
        'La déclaration et le paiement de la TVA collectée nette (après imputation de la TVA déductible) doivent intervenir au plus tard le 15 du mois suivant la période imposable. Tout retard expose le redevable à des intérêts de retard (10 %) et des pénalités (40 % en cas de défaut, voire majoration en cas de mauvaise foi).',
        'CGI Togo, Livre des Procédures Fiscales, art. relatifs à la TVA.'),
      q('q3', 'Que désigne la TPU (Taxe Professionnelle Unique) au Togo ?',
        ['Impôt synthétique remplaçant plusieurs impôts pour les petits contribuables', 'Une taxe sur les véhicules', 'L\'impôt sur les loyers commerciaux', 'La contribution patente uniquement'], [0],
        'Impôt synthétique pour petits contribuables',
        'La TPU regroupe en un seul versement la patente, l\'IRPP-BIC et la TVA pour les contribuables réalisant un faible chiffre d\'affaires (généralement < 30 M FCFA / an pour les prestataires et < 60 M FCFA pour les négociants). Régime simplifié destiné aux petits commerçants, artisans et prestataires. Versement périodique simplifié.',
        'CGI Togo, dispositions sur le régime simplifié et la TPU.'),
      q('q4', 'Quel mécanisme caractérise principalement la TVA ?',
        ['Le mécanisme du paiement fractionné avec droit à déduction', 'Un impôt sur le bénéfice', 'Un impôt sur le patrimoine', 'Une taxe sur les exportations'], [0],
        'Paiement fractionné avec déduction',
        'La TVA est collectée par l\'assujetti à chaque stade du circuit économique. Il déduit la TVA qu\'il a lui-même supportée sur ses achats et investissements (TVA déductible) et reverse uniquement la différence (TVA nette à payer). Ce mécanisme assure neutralité du marché et porte la charge fiscale sur le consommateur final.',
        'Maurice Lauré, 1954 — inventeur français de la TVA ; Directive UEMOA TVA.')
    ]
  },

  // ============= MARCHÉS PUBLICS ET PASSATION (TOGO) =================
  {
    titre: 'Cadre juridique des marchés publics au Togo',
    theme: 'Réglementation et organes',
    domain: MP_NAME,
    questions: [
      q('q1', 'Quel texte principal régit les marchés publics au Togo ?',
        ['Décret n° 2009-277/PR du 11 novembre 2009 (Code des marchés publics)', 'Code OHADA des contrats', 'Loi de finances annuelle', 'Code civil'], [0],
        'Décret 2009-277/PR',
        'Le décret n° 2009-277/PR du 11 novembre 2009 porte Code des Marchés Publics et délégations de Service Public au Togo. Il a été modifié notamment par le décret n° 2017-097/PR du 25 août 2017 et complété par divers textes d\'application (manuel de procédures, dossiers types). La loi n° 2021-034 du 29 décembre 2021 traite spécifiquement des partenariats public-privé (PPP).',
        'Décret 2009-277/PR ; loi PPP 2021-034.'),
      q('q2', 'Quel organe assure la régulation des marchés publics au Togo ?',
        ['ARMP — Autorité de Régulation des Marchés Publics', 'OTR — Office Togolais des Recettes', 'Cour des Comptes', 'BCEAO'], [0],
        'ARMP',
        'L\'Autorité de Régulation des Marchés Publics (ARMP) est un organe indépendant créé par le code des marchés publics togolais. Missions : régulation, conseil, formation, audit des marchés a posteriori, traitement des recours non-juridictionnels. Composition tripartite : représentants de l\'administration, du secteur privé et de la société civile. Distincte de la DNCMP qui assure le contrôle a priori.',
        'Décret 2009-277/PR, Titre III ; statuts ARMP.'),
      q('q3', 'Quel organe assure le contrôle a priori des marchés publics au Togo ?',
        ['DNCMP — Direction Nationale du Contrôle des Marchés Publics', 'ARMP', 'OTR', 'Cour des Comptes'], [0],
        'DNCMP',
        'La Direction Nationale du Contrôle des Marchés Publics, sous tutelle du ministère chargé des Finances, intervient en amont (contrôle préalable) sur les dossiers d\'appel d\'offres et les marchés au-dessus de certains seuils. Elle vérifie la régularité avant publication et avant signature. Distincte de l\'ARMP qui agit en aval (régulation, audit).',
        'Décret 2009-277/PR, dispositions sur la DNCMP.'),
      q('q4', 'Qui est la PRMP au Togo dans une autorité contractante ?',
        ['La Personne Responsable des Marchés Publics — autorité de la procédure de passation', 'Le Premier ministre', 'Le Président de l\'ARMP', 'Le Procureur de la République'], [0],
        'Personne Responsable des Marchés Publics',
        'La PRMP représente l\'autorité contractante (ministère, agence, mairie, EPN) tout au long de la procédure : approbation du DAO, lancement, ouverture des plis, attribution. Pour les marchés importants, elle est assistée d\'une Commission de Passation des Marchés Publics (CPMP) et d\'une Commission de Contrôle des Marchés Publics (CCMP) internes à l\'institution.',
        'Décret 2009-277/PR, Titre II.')
    ]
  },
  {
    titre: 'Procédures de passation au Togo',
    theme: 'Types de procédures',
    domain: MP_NAME,
    questions: [
      q('q1', 'Quelle est la procédure de droit commun de passation au Togo ?',
        ['L\'Appel d\'Offres Ouvert (AOO)', 'Le gré à gré', 'La demande de cotation', 'L\'attribution directe'], [0],
        'Appel d\'Offres Ouvert (AOO)',
        'L\'AOO est la procédure de droit commun selon le décret 2009-277/PR (art. 50 et suivants). Elle implique une publication large (presse, BOMP, site ARMP), l\'ouverture à tous les candidats éligibles, l\'évaluation selon des critères annoncés au DAO, et l\'attribution au moins-disant techniquement qualifié. Les autres procédures (AOR, gré à gré, DRP) sont l\'exception, à motiver.',
        'Décret 2009-277/PR, art. 49 et suivants.'),
      q('q2', 'Quand peut-on recourir à l\'Appel d\'Offres Restreint (AOR) au Togo ?',
        ['Lorsque la nature très spécifique des prestations limite le nombre de candidats potentiels', 'À la discrétion du ministre', 'Toujours pour les marchés > 100 M FCFA', 'Pour les marchés de fournitures uniquement'], [0],
        'Spécificité technique limitant les candidats',
        'L\'AOR est justifié lorsque le nombre de fournisseurs/prestataires potentiels est intrinsèquement limité (haute technicité, monopole de fait, spécialisation). La présélection des candidats est encadrée et doit être motivée. La DNCMP donne son avis préalable. Toute restriction abusive de la concurrence expose à des recours et sanctions de l\'ARMP.',
        'Décret 2009-277/PR, art. 53.'),
      q('q3', 'Le gré à gré (entente directe) au Togo est admis…',
        ['À titre exceptionnel et après autorisation du ministre chargé des Marchés sur avis DNCMP/ARMP', 'À la discrétion de la PRMP', 'Pour tous les marchés < 50 M FCFA', 'Sans aucun encadrement'], [0],
        'Exception avec autorisation et avis préalables',
        'Le gré à gré (procédure non concurrentielle) est limitativement énuméré : urgence impérieuse, fournitures complémentaires, brevet exclusif, défense nationale, etc. Doit faire l\'objet d\'un avis motivé de la DNCMP/ARMP et d\'une autorisation expresse de l\'autorité de tutelle. Limité strictement pour préserver la concurrence et lutter contre la corruption.',
        'Décret 2009-277/PR, art. 73 et suivants.'),
      q('q4', 'Qu\'est-ce que la "demande de renseignements et de prix" (DRP) au Togo ?',
        ['Procédure simplifiée pour marchés de faible montant en dessous d\'un seuil défini', 'Une procédure d\'agrément des entreprises', 'Une étude de marché préalable au DAO', 'Une demande d\'avis fiscal'], [0],
        'Procédure simplifiée pour faibles montants',
        'La DRP est utilisée pour les marchés de fournitures, services courants ou travaux dont le montant est inférieur aux seuils de passation par appel d\'offres. Au moins 3 fournisseurs/prestataires sont consultés par écrit, les offres sont comparées et le moins-disant qualifié est retenu. Procédure rapide mais documentée. Les seuils sont fixés par arrêté du ministre des Finances.',
        'Décret 2009-277/PR, art. 64 et arrêtés sur les seuils.')
    ]
  },
  {
    titre: 'Exécution et recours dans les marchés publics du Togo',
    theme: 'Suivi des contrats',
    domain: MP_NAME,
    questions: [
      q('q1', 'Que désigne un "avenant" dans un marché public togolais ?',
        ['Un acte modifiant le marché initial après sa signature', 'La caution définitive', 'La garantie de soumission', 'L\'ordre de service initial'], [0],
        'Acte modifiant le marché signé',
        'L\'avenant porte modification du marché initial (quantité, délai, montant, prestations). Encadré : ne peut bouleverser l\'économie générale du marché, soumis à approbation des organes de contrôle (DNCMP), limité en montant cumulé (souvent < 25-30 % du marché initial). Tout dépassement systémique exposerait au constat de marché irrégulier.',
        'Décret 2009-277/PR, dispositions sur l\'exécution et art. relatif aux avenants.'),
      q('q2', 'Qu\'est-ce que la "garantie de bonne exécution" ?',
        ['Caution déposée par le titulaire pour garantir la bonne réalisation du marché', 'Un dépôt obligatoire à la BCEAO', 'Une provision fiscale', 'Une attestation de capacité financière'], [0],
        'Caution pour la bonne exécution',
        'Généralement 5 à 10 % du montant du marché, déposée à la signature par le titulaire (sous forme de caution bancaire ou retenue sur paiements). Restituée après réception définitive et règlement de toutes les obligations. Vise à protéger l\'autorité contractante contre les défauts d\'exécution. Distincte de la garantie de soumission (1-3 % du montant prévisionnel, déposée pour participer à l\'AO).',
        'Décret 2009-277/PR, art. sur les garanties.'),
      q('q3', 'Quel recours non-juridictionnel un soumissionnaire écarté peut-il exercer au Togo ?',
        ['Recours devant l\'ARMP (Comité de Règlement des Différends)', 'Saisine directe de la Cour Suprême', 'Recours auprès de la BCEAO', 'Plainte auprès de l\'UEMOA'], [0],
        'Comité de Règlement des Différends de l\'ARMP',
        'L\'ARMP dispose d\'un Comité de Règlement des Différends (CRD) qui examine les recours des soumissionnaires s\'estimant lésés. Procédure rapide (délai légal de réponse), gratuite, contradictoire. Les décisions sont contraignantes et peuvent annuler une attribution irrégulière. Voie juridictionnelle (tribunal administratif) reste ouverte si insatisfaction.',
        'Décret 2009-277/PR, art. relatifs aux recours ; règlement intérieur ARMP.'),
      q('q4', 'Que dit le principe de l\'allotissement dans les marchés publics togolais ?',
        ['L\'autorité contractante doit privilégier le découpage en lots pour favoriser la concurrence et les PME', 'Tous les marchés doivent être globaux', 'L\'allotissement est interdit', 'Seules les autorités locales peuvent allotir'], [0],
        'Privilégier le découpage en lots',
        'Principe favorisant l\'accès des PME aux commandes publiques. Le DAO doit motiver tout choix de marché global au-dessus d\'un seuil. L\'allotissement géographique, fonctionnel ou technique est encouragé. Vise aussi à éviter les ententes et à diversifier le tissu de fournisseurs. Principe également retenu dans les directives UEMOA et les bonnes pratiques internationales (Banque mondiale, OCDE).',
        'Décret 2009-277/PR ; Directive UEMOA n° 04/2005/CM/UEMOA.')
    ]
  }
];

// ---------------------------------------------------------------------
// MANCHE 2 — duels de 6 questions (1 à 6 pts)
// ---------------------------------------------------------------------
const m2Packs = [
  // ============ Comptabilité — duel =================================
  {
    titre: 'Comptabilité OHADA — duel',
    theme: 'SYSCOHADA approfondi',
    domain: COMPTA_NAME,
    questions: [
      q('q1', 'Quel principe comptable impose de comptabiliser charges et produits dans l\'exercice où ils sont engagés ?',
        ['Principe d\'indépendance des exercices', 'Principe de prudence', 'Principe de continuité', 'Principe de coût historique'], [0],
        'Indépendance des exercices',
        'L\'un des 9 principes fondamentaux du SYSCOHADA (avec continuité, permanence des méthodes, intangibilité du bilan d\'ouverture, coût historique, prudence, importance significative, transparence, prééminence du fond sur la forme). Exige rattachement précis des opérations à l\'exercice concerné via les régularisations (CCA, PCA, FNP, AAR, etc.).',
        'OHADA AUDCIF, art. 6 et suivants.', 1),
      q('q2', 'Que sont les états financiers consolidés ?',
        ['Comptes présentant un groupe d\'entreprises comme une seule entité économique', 'États financiers prévisionnels', 'Comptes annexes obligatoires', 'États financiers en monnaie étrangère'], [0],
        'Groupe présenté comme une seule entité',
        'Application des méthodes : intégration globale (filiales contrôlées exclusivement), intégration proportionnelle (contrôle conjoint, supprimée en IFRS) ou mise en équivalence (influence notable, 20-50 %). Au sens OHADA, le périmètre est défini par le contrôle et l\'influence. Les comptes consolidés sont obligatoires au-delà d\'un seuil. Norme IFRS 10 pour la pratique internationale.',
        'OHADA AUDCIF Livre II ; IFRS 10/11/12.', 2),
      q('q3', 'Quelle méthode d\'évaluation des stocks consiste à valoriser en supposant que les premiers entrés sont les premiers sortis ?',
        ['FIFO (First-In, First-Out) / PEPS', 'LIFO (Last-In, First-Out)', 'CUMP (Coût Unitaire Moyen Pondéré)', 'Méthode du coût standard'], [0],
        'FIFO / PEPS',
        'Premier Entré, Premier Sorti : les sorties sont valorisées au coût des unités les plus anciennes ; les stocks au bilan sont valorisés au coût des dernières entrées (proche du coût actuel). Le SYSCOHADA admet FIFO et CUMP (moyenne pondérée). Le LIFO (dernier entré premier sorti) est interdit en OHADA et IFRS (autorisé en US GAAP).',
        'OHADA AUDCIF, art. relatif aux stocks ; IAS 2.', 3),
      q('q4', 'Que représente l\'EBE (Excédent Brut d\'Exploitation) ?',
        ['Production + Subventions − Achats consommés − Charges externes − Charges de personnel − Impôts et taxes', 'Le résultat net après impôt', 'Le chiffre d\'affaires', 'Le résultat financier'], [0],
        'Production − Consommations − Personnel − Impôts (hors IS)',
        'L\'EBE mesure la performance économique brute de l\'entreprise avant la politique d\'amortissement et de provisionnement, et avant la structure financière. Indicateur central des Soldes Intermédiaires de Gestion (SIG) en OHADA et PCG. Équivalent approximatif de l\'EBITDA international (différences sur certains traitements).',
        'OHADA AUDCIF, SIG ; Vernimmen chap. 9.', 4),
      q('q5', 'Que dit le principe de "prééminence de la réalité économique sur l\'apparence juridique" ?',
        ['Une opération doit être traduite selon sa substance économique, pas seulement sa forme juridique', 'Le droit l\'emporte toujours sur l\'économie', 'Les pertes sont anticipées, jamais les gains', 'Les méthodes doivent rester stables'], [0],
        'Substance over form',
        'Ce principe (substance over form), inscrit dans le SYSCOHADA révisé en 2017 (rapprochement avec les IFRS), impose par exemple de comptabiliser un bien acquis en crédit-bail à l\'actif du preneur (et la dette au passif) alors que juridiquement il appartient encore au bailleur. Évolution majeure par rapport au SYSCOA initial qui privilégiait la forme juridique.',
        'OHADA AUDCIF révisé 2017, art. 6 ; IAS 1.', 5),
      q('q6', 'Quelle norme IFRS spécifique régit le chiffre d\'affaires depuis 2018 ?',
        ['IFRS 15 (Produits des activités ordinaires tirés de contrats avec des clients)', 'IFRS 9', 'IAS 18 (en vigueur)', 'IFRS 16'], [0],
        'IFRS 15',
        'Entrée en vigueur le 1ᵉʳ janvier 2018 (remplace IAS 18 et IAS 11). Modèle en 5 étapes : (1) identifier le contrat, (2) identifier les obligations de prestation, (3) déterminer le prix de la transaction, (4) allouer le prix aux obligations, (5) reconnaître le revenu à mesure (ou à un moment précis) que les obligations sont satisfaites. Impact majeur en télécoms, BTP, logiciels.',
        'IASB, IFRS 15 (2014) ; FASB ASC 606.', 6)
    ]
  },
  // ============ Fiscalité Togo — duel ===============================
  {
    titre: 'Fiscalité du Togo — duel',
    theme: 'Approfondissement fiscal',
    domain: FISC_NAME,
    questions: [
      q('q1', 'Le Togo a-t-il signé des conventions fiscales internationales ?',
        ['Oui, notamment avec la France, l\'UEMOA et d\'autres partenaires', 'Non, aucune', 'Uniquement avec les pays de la CEDEAO', 'Uniquement avec la Chine'], [0],
        'Oui (France, UEMOA…)',
        'Le Togo a signé une convention fiscale bilatérale avec la France visant à éviter les doubles impositions (signée 1971, mises à jour). Au niveau régional, plusieurs directives UEMOA harmonisent la fiscalité indirecte (TVA, droits d\'accise) et certains aspects des impôts directs. Le Togo participe également à l\'Inclusive Framework BEPS de l\'OCDE/G20.',
        'MFOFIN Togo ; OCDE Forum mondial sur la transparence fiscale.', 1),
      q('q2', 'Quelle est la nature de la "retenue à la source" sur les paiements aux non-résidents au Togo ?',
        ['Prélèvement libératoire ou non, opéré sur certains paiements (intérêts, redevances, prestations) à destination de non-résidents', 'Un impôt sur les exportations', 'Une taxe douanière', 'Une cotisation sociale'], [0],
        'Prélèvement sur paiements aux non-résidents',
        'Mécanisme : le débiteur togolais retient l\'impôt et le reverse à l\'OTR. Taux variables (15-20 % selon nature du paiement et selon convention). Vise à imposer le revenu de source togolaise versé à l\'étranger. Les conventions fiscales bilatérales peuvent réduire ces taux.',
        'CGI Togo, art. sur les revenus de capitaux mobiliers et retenues à la source.', 2),
      q('q3', 'Que désigne le contrôle fiscal "sur pièces" ?',
        ['Contrôle effectué par l\'administration sur la base des déclarations et documents transmis, sans déplacement', 'Contrôle physique en entreprise', 'Audit comptable externe', 'Inspection des stocks'], [0],
        'Contrôle sur la base des déclarations',
        'Le contrôle sur pièces est mené depuis les bureaux de l\'OTR par recoupement des déclarations TVA, IS, IRPP et d\'éventuelles informations externes (banques, douanes, comptes sociaux). Distinct du contrôle sur place (vérification de comptabilité en entreprise) qui est plus poussé et formalisé. Garanties du contribuable encadrées par le Livre des Procédures Fiscales.',
        'CGI Togo, LPF, art. sur les contrôles.', 3),
      q('q4', 'Quel régime fiscal s\'applique aux entreprises agréées en zone franche au Togo ?',
        ['Exonération partielle ou totale d\'impôts pendant une durée déterminée (régime privilégié)', 'Taxation au taux maximal', 'Aucun avantage fiscal', 'Le même régime que les sociétés ordinaires'], [0],
        'Régime privilégié temporaire',
        'La loi sur la zone franche industrielle (créée 1989, plusieurs réformes) accorde des exonérations d\'IS, IMF, droits de douane, TVA sur les inputs et exportations pendant les premières années, avec retour progressif à la fiscalité de droit commun. Conditionnée à la création d\'emplois et au caractère exportateur. Géré par la SAZOF (Société d\'Administration de la Zone Franche).',
        'Loi 89-14 du 18/09/1989 et révisions ; SAZOF.', 4),
      q('q5', 'Quels sont les délais légaux de prescription en matière fiscale au Togo ?',
        ['En général 3 ans pour la prescription de droit commun, allongée en cas de fraude', '1 an', '10 ans systématiquement', 'Aucun délai'], [0],
        '3 ans (droit commun), allongée en cas de fraude',
        'L\'OTR dispose en général d\'un délai de reprise de 3 ans pour redresser les impôts (compté à partir de l\'année qui suit celle de la déclaration). Ce délai peut être prorogé en cas de fraude, défaut de déclaration, opérations transfrontalières ou activités occultes (porté à 5-10 ans). Le contribuable bénéficie de garanties procédurales (notifications, droits de la défense).',
        'CGI Togo, LPF, art. sur la prescription.', 5),
      q('q6', 'Quel impôt spécifique frappe l\'activité bancaire au Togo ?',
        ['Une taxe sur les activités financières (TAF / TOB selon les juridictions) en sus du droit commun', 'Une exonération totale', 'Le seul IS au taux normal', 'Aucun impôt particulier'], [0],
        'TAF/TOB en plus du droit commun',
        'Les opérations bancaires bénéficient d\'une exonération de TVA, compensée par des taxes spécifiques sur les opérations financières (TAF — Taxe sur les Activités Financières, ou équivalent), prélevées sur les commissions, intérêts et opérations de change. Vise à compenser la non-déductibilité de la TVA en amont. Taux et assiette précisés par la LF.',
        'CGI Togo, dispositions sur la TAF ; Directive UEMOA TAF.', 6)
    ]
  },
  // ============ Marchés publics Togo — duel =========================
  {
    titre: 'Marchés publics du Togo — duel',
    theme: 'Procédures et bonnes pratiques',
    domain: MP_NAME,
    questions: [
      q('q1', 'Quel principe interdit à un agent public d\'attribuer un marché à une entreprise dans laquelle il a un intérêt ?',
        ['Principe de prévention des conflits d\'intérêts', 'Principe d\'allotissement', 'Principe d\'avenant', 'Principe de continuité'], [0],
        'Prévention des conflits d\'intérêts',
        'Principe fondamental de la commande publique. L\'agent doit déclarer tout intérêt direct ou indirect dans une entreprise candidate et se déporter de la procédure. L\'ARMP et la DNCMP veillent au respect. Le non-respect est sanctionné disciplinairement et pénalement (corruption, prise illégale d\'intérêts).',
        'Décret 2009-277/PR ; Code pénal togolais.', 1),
      q('q2', 'Que désigne le "Plan de Passation des Marchés" (PPM) au Togo ?',
        ['Programme annuel prévisionnel des marchés que chaque autorité contractante prévoit de lancer', 'Le plan stratégique du ministère', 'Le calendrier budgétaire général', 'La planification financière nationale'], [0],
        'Programme annuel des marchés prévus',
        'Le PPM est élaboré par chaque autorité contractante à partir de son budget annuel, publié et transmis à la DNCMP/ARMP. Permet la transparence, l\'organisation des consultations, la planification des AO et la programmation budgétaire. Sa publication conditionne le lancement de toute procédure de passation.',
        'Décret 2009-277/PR, art. sur la planification.', 2),
      q('q3', 'Quel délai minimum de publication d\'un Appel d\'Offres Ouvert international au Togo ?',
        ['Au moins 45 jours entre publication et date limite de remise des offres', '15 jours', '7 jours', 'Pas de minimum'], [0],
        '45 jours minimum (AOO international)',
        'Pour un AO international, le délai minimum entre publication de l\'avis et date limite de remise des plis est de 45 jours. Pour un AO national (AON), le délai minimum est de 30 jours. Pour une DRP, généralement 7 à 15 jours. Ces délais visent à garantir une réelle mise en concurrence et la qualité des offres reçues.',
        'Décret 2009-277/PR, art. sur les délais de publicité.', 3),
      q('q4', 'Que sont les "critères de qualification" d\'un soumissionnaire ?',
        ['Critères vérifiant la capacité technique, financière et juridique du soumissionnaire (≠ critères d\'évaluation de l\'offre)', 'Le seul prix proposé', 'La nationalité', 'L\'ancienneté de l\'entreprise uniquement'], [0],
        'Capacité technique, financière et juridique',
        'Étape "pré-qualification" : vérification que le soumissionnaire est habilité à exécuter le marché (CA minimum, références similaires, attestations fiscales et sociales à jour, personnel, équipements). Distinct des critères d\'évaluation des offres (prix, valeur technique). Système typiquement "pass/fail" sur les critères de qualification.',
        'Décret 2009-277/PR, DAO type ARMP.', 4),
      q('q5', 'Que sont les "documents standards d\'appel d\'offres" (DAO type) au Togo ?',
        ['Modèles harmonisés validés par l\'ARMP et obligatoires pour tous les marchés', 'Documents facultatifs', 'Brochures publicitaires de l\'ARMP', 'Manuels internes des entreprises'], [0],
        'Modèles harmonisés obligatoires',
        'L\'ARMP a élaboré des DAO types pour chaque catégorie (fournitures, travaux, services, prestations intellectuelles) et chaque procédure (AOO national, AOO international, AOR, DRP). Leur utilisation est obligatoire et garantit la conformité aux directives UEMOA et aux bonnes pratiques internationales (notamment celles de la Banque mondiale et de la BAD).',
        'ARMP Togo, DAO types ; Directive UEMOA 04/2005/CM/UEMOA.', 5),
      q('q6', 'Que désigne un "contrat de partenariat public-privé" (PPP) au Togo ?',
        ['Contrat de longue durée par lequel une autorité confie à un partenaire privé tout ou partie de la conception, construction, financement et gestion d\'un ouvrage ou service public', 'Un simple marché de travaux', 'Une privatisation', 'Une délégation de service public uniquement'], [0],
        'Contrat global de longue durée',
        'La loi n° 2021-034 du 29/12/2021 a refondé le cadre des PPP au Togo. Englobe les contrats de concession, contrats de partenariat (à paiement public) et délégations de service public. Caractéristiques : durée longue (10-30 ans), partage des risques, financement privé, paiement par l\'usager (concession) ou par l\'autorité (PPP à paiement public). Procédures de passation spécifiques (dialogue compétitif possible).',
        'Loi 2021-034 du 29/12/2021 sur les PPP au Togo ; décret d\'application.', 6)
    ]
  }
];

const m3Packs = [];

module.exports = { m1Packs, m2Packs, m3Packs, COMPTA_NAME, FISC_NAME, MP_NAME };
