// =====================================================================
// data_extra_v233a.js — v2.33 : renfort MAJEUR
//   • Suivi-évaluation, planification de projets, évaluation d'impact
//     (modèles économétriques causaux + applications STATA 18 / 19)
//   • IA / LLM / Agents — questions techniques avancées
// =====================================================================

const { D, mk, packify, F } = require('./data_extra_v230b.js');
const { IA_NAME } = require('./data_extra_v230f.js');

// =====================================================================
// SUIVI-ÉVALUATION, PLANIFICATION & ÉVALUATION D'IMPACT (+72)
// =====================================================================
const se = [];

// --- Planification de projets de développement (16) ---
[
 mk('Dans la gestion du cycle de projet, l\'étape qui suit l\'identification est…','L\'instruction (formulation détaillée du projet)','La clôture financière définitive','L\'évaluation ex post finale','La liquidation des marchés',
   'Cycle CE/CAD : programmation → identification → instruction/formulation → financement → mise en œuvre → évaluation. Chaque étape conditionne la suivante par une décision formelle.',
   'https://fr.wikipedia.org/wiki/Gestion_du_cycle_de_projet'),
 mk('L\'arbre à problèmes sert, en planification, à…','Hiérarchiser causes et effets d\'un problème central','Répartir le budget entre les lignes','Choisir les fournisseurs du projet','Recruter l\'équipe de terrain',
   'Il est ensuite retourné en arbre à objectifs : les causes deviennent des moyens et les effets des finalités, base du cadre logique.',
   'https://fr.wikipedia.org/wiki/Arbre_%C3%A0_probl%C3%A8mes'),
 mk('Dans la matrice du cadre logique, les « hypothèses » désignent…','Les conditions externes nécessaires au passage d\'un niveau au suivant','Les erreurs de saisie des données','Les taux d\'intérêt du prêt','Les salaires de l\'équipe projet',
   'La logique verticale se lit : si les activités sont réalisées ET si les hypothèses se vérifient, alors les extrants sont produits.',
   'https://fr.wikipedia.org/wiki/Cadre_logique'),
 mk('Le diagramme de Gantt d\'un projet représente…','L\'ordonnancement des tâches dans le temps','La structure hiérarchique du personnel','Le flux de trésorerie actualisé','La carte des bénéficiaires',
   'Barres horizontales par tâche : durées, jalons et chevauchements ; complété par le PERT/CPM pour le chemin critique.',
   'https://fr.wikipedia.org/wiki/Diagramme_de_Gantt'),
 mk('Le chemin critique d\'un projet est…','La séquence de tâches dont tout retard décale la fin du projet','Le trajet le plus court entre deux sites','La liste des risques majeurs','Le circuit de validation des factures',
   'Les tâches critiques ont une marge nulle : la méthode CPM/PERT les identifie pour concentrer le pilotage et les ressources.',
   'https://fr.wikipedia.org/wiki/Chemin_critique'),
 mk('La structure de découpage du projet (WBS/OTP) décompose…','Le projet en lots de travaux et livrables élémentaires','Le budget en lignes comptables uniquement','L\'équipe en syndicats','Les bénéficiaires par village',
   'La Work Breakdown Structure garantit l\'exhaustivité du périmètre : chaque lot est estimable, planifiable et attribuable.',
   'https://fr.wikipedia.org/wiki/Organigramme_des_t%C3%A2ches_du_projet'),
 mk('La valeur actuelle nette (VAN) d\'un projet est positive lorsque…','Les flux actualisés dépassent l\'investissement initial','Le projet dure plus de cinq ans','Le budget est entièrement consommé','Le nombre de bénéficiaires est élevé',
   'VAN = Σ flux_t/(1+r)^t − I₀. Une VAN > 0 signifie que le projet crée de la valeur au taux d\'actualisation retenu.',
   'https://fr.wikipedia.org/wiki/Valeur_actuelle_nette'),
 mk('Le taux de rentabilité interne (TRI) est le taux qui…','Annule la valeur actuelle nette du projet','Maximise le budget disponible','Égalise recettes et dépenses courantes','Fixe le prix de vente optimal',
   'On compare le TRI au coût du capital : TRI > r ⇒ projet acceptable. Attention aux flux non conventionnels (TRI multiples).',
   'https://fr.wikipedia.org/wiki/Taux_de_rentabilit%C3%A9_interne'),
 mk('L\'analyse coût-bénéfice se distingue de l\'analyse coût-efficacité car elle…','Monétise aussi les bénéfices','Ignore totalement les coûts','Ne compare jamais deux options','Se limite au budget annuel',
   'Coût-efficacité : coût par unité d\'effet (ex. FCFA par enfant scolarisé). Coût-bénéfice : tout est converti en monnaie, d\'où un ratio B/C.',
   'https://fr.wikipedia.org/wiki/Analyse_co%C3%BBt-b%C3%A9n%C3%A9fice'),
 mk('Le prix de référence (shadow price) sert, en évaluation économique, à…','Corriger les prix de marché des distorsions','Fixer le prix de vente au public','Calculer la TVA due','Indexer les salaires',
   'Taxes, subventions, chômage ou change administré faussent les prix : on utilise des prix économiques pour mesurer la valeur sociale réelle.',
   'https://fr.wikipedia.org/wiki/Prix_fictif'),
 mk('La matrice RACI d\'un projet précise pour chaque tâche…','Qui réalise, approuve, est consulté et informé','Le montant des salaires','Le taux d\'actualisation retenu','Le nombre de véhicules',
   'Responsible, Accountable, Consulted, Informed : elle lève les ambiguïtés de rôle, source fréquente de retards.',
   'https://fr.wikipedia.org/wiki/RACI'),
 mk('Le registre des risques d\'un projet croise…','Probabilité et impact, avec des mesures d\'atténuation','Recettes et dépenses','Effectifs et salaires','Fournisseurs et clients',
   'Chaque risque est coté, affecté à un responsable et suivi ; la criticité (P × I) hiérarchise les réponses (éviter, réduire, transférer, accepter).',
   'https://fr.wikipedia.org/wiki/Gestion_des_risques'),
 mk('Une analyse des parties prenantes vise à…','Identifier intérêts, influence et attentes des acteurs','Sélectionner les entreprises soumissionnaires','Fixer le calendrier de décaissement','Auditer les comptes',
   'La cartographie pouvoir/intérêt oriente la stratégie de communication et d\'implication, condition d\'appropriation du projet.',
   'https://fr.wikipedia.org/wiki/Partie_prenante'),
 mk('Le budget-programme, contrairement au budget de moyens, est structuré par…','Programmes et résultats attendus','Nature de dépense uniquement','Ministères sans objectifs','Ordre alphabétique',
   'Les États de l\'UEMOA sont passés au budget-programme (directives 2009) : crédits alloués à des objectifs mesurés par des indicateurs.',
   'https://fr.wikipedia.org/wiki/Budget_par_programme'),
 mk('Le plan de travail et budget annuel (PTBA) d\'un projet sert à…','Détailler activités, calendrier et coûts de l\'année','Remplacer le cadre logique','Fixer les salaires des ministres','Auditer les marchés passés',
   'Validé par le comité de pilotage, il traduit le document de projet en programmation opérationnelle annuelle, base du suivi trimestriel.',
   'https://fr.wikipedia.org/wiki/Gestion_de_projet'),
 mk('La durabilité d\'un projet, au sens du CAD-OCDE, désigne…','La persistance des bénéfices après la fin du financement','La durée totale des travaux','La solidité du béton utilisé','Le nombre d\'années de garantie',
   'Elle dépend de l\'appropriation nationale, du financement récurrent, des capacités locales et de l\'adéquation technique.',
   'https://fr.wikipedia.org/wiki/%C3%89valuation_de_programme'),
] .forEach(x => se.push(x));

// --- Évaluation d'impact : modèles causaux (28) ---
[
 mk('Le « problème fondamental de l\'inférence causale » énonce que…','On n\'observe jamais le même individu traité et non traité au même moment','Les données sont toujours fausses','Les échantillons sont trop petits','La corrélation implique la causalité',
   'Formulé par Holland (1986) sur le modèle de Rubin : l\'effet individuel Y(1)−Y(0) est inobservable ; on estime donc des effets moyens.',
   'https://fr.wikipedia.org/wiki/Inf%C3%A9rence_causale'),
 mk('L\'ATE (Average Treatment Effect) mesure…','L\'effet moyen du traitement sur toute la population','L\'effet sur les seuls non-traités','Le coût moyen du programme','La variance des résultats',
   'ATE = E[Y(1) − Y(0)]. L\'ATT porte sur les traités, l\'ATU sur les non-traités ; la randomisation identifie directement l\'ATE.',
   'https://fr.wikipedia.org/wiki/Effet_moyen_du_traitement'),
 mk('L\'ATT (effet moyen sur les traités) est le paramètre privilégié quand…','On veut évaluer l\'effet du programme sur ceux qui y ont participé','On ignore qui a été traité','Le programme est universel','Les données sont agrégées',
   'ATT = E[Y(1) − Y(0) | T = 1]. C\'est le paramètre estimé par l\'appariement et par la différence de différences.',
   'https://fr.wikipedia.org/wiki/Effet_moyen_du_traitement'),
 mk('L\'hypothèse SUTVA suppose que…','Le traitement d\'un individu n\'affecte pas le résultat des autres','Tous les individus sont identiques','Le traitement est gratuit','L\'échantillon est exhaustif',
   'Stable Unit Treatment Value Assumption : pas d\'interférence (spillovers) et une seule version du traitement. Les effets de diffusion la violent.',
   'https://fr.wikipedia.org/wiki/Inf%C3%A9rence_causale'),
 mk('L\'hypothèse d\'indépendance conditionnelle (CIA) postule que…','Conditionnellement aux covariables observées, le traitement est comme aléatoire','Les variables sont indépendantes entre elles','Le traitement n\'a aucun effet','Les erreurs sont normales',
   'Aussi appelée « selection on observables » : elle fonde l\'appariement et la régression, mais reste intestable — d\'où les analyses de sensibilité.',
   'https://fr.wikipedia.org/wiki/Appariement_par_score_de_propension'),
 mk('L\'hypothèse clé de la différence de différences (DID) est…','Les tendances parallèles en l\'absence de traitement','L\'égalité des niveaux avant traitement','L\'absence totale de covariables','Un échantillon de plus de 10 000 individus',
   'Les niveaux peuvent différer ; c\'est l\'évolution qui doit être commune. On la teste par des event studies et des tendances pré-traitement.',
   'https://fr.wikipedia.org/wiki/Doubles_diff%C3%A9rences'),
 mk('Le DID généralisé avec adoption échelonnée (staggered) pose problème car…','Les estimations TWFE peuvent être biaisées par des poids négatifs','Il exige des données mensuelles','Il interdit les effets fixes','Il ne gère pas plus de deux périodes',
   'Goodman-Bacon (2021), de Chaisemartin & d\'Haultfœuille, Callaway & Sant\'Anna proposent des estimateurs robustes à l\'hétérogénéité temporelle des effets.',
   'https://fr.wikipedia.org/wiki/Doubles_diff%C3%A9rences'),
 mk('La régression sur discontinuité (RDD) exploite…','Un seuil d\'éligibilité qui détermine l\'accès au programme','Un tirage au sort intégral','Une variable instrumentale externe','Une double différence temporelle',
   'Autour du seuil, les individus juste au-dessus et juste en dessous sont comparables : l\'effet est identifié localement (LATE au seuil).',
   'https://fr.wikipedia.org/wiki/R%C3%A9gression_sur_discontinuit%C3%A9'),
 mk('Le test de McCrary dans une RDD sert à…','Détecter une manipulation de la variable de forçage autour du seuil','Mesurer la taille de l\'effet','Choisir le nombre de covariables','Tester la normalité des erreurs',
   'Un saut de densité au seuil signale que les agents manipulent leur score (tri sélectif), invalidant l\'identification.',
   'https://fr.wikipedia.org/wiki/R%C3%A9gression_sur_discontinuit%C3%A9'),
 mk('Dans une RDD, la RDD « floue » (fuzzy) se distingue de la RDD nette car…','Le franchissement du seuil modifie la probabilité de traitement sans l\'imposer','Les données sont manquantes','Le seuil est inconnu','L\'effet est nul par construction',
   'On l\'estime alors par variables instrumentales, le seuil servant d\'instrument du traitement effectif.',
   'https://fr.wikipedia.org/wiki/R%C3%A9gression_sur_discontinuit%C3%A9'),
 mk('Une variable instrumentale valide doit être…','Corrélée au traitement et sans effet direct sur le résultat','Corrélée au terme d\'erreur','Constante dans l\'échantillon','Mesurée après le traitement',
   'Pertinence (corrélation forte, F > 10) et exclusion (l\'instrument n\'agit que via le traitement) : la seconde est intestable et doit être argumentée.',
   'https://fr.wikipedia.org/wiki/Variable_instrumentale'),
 mk('Un instrument faible provoque…','Des estimations 2SLS biaisées et des écarts types peu fiables','Une hausse mécanique du R²','Une disparition du biais','Un échantillon plus grand',
   'La règle de Stock-Yogo (F de première étape > 10) et les intervalles d\'Anderson-Rubin traitent ce problème fréquent.',
   'https://fr.wikipedia.org/wiki/Variable_instrumentale'),
 mk('Le LATE (Local Average Treatment Effect) d\'Imbens-Angrist correspond à l\'effet sur…','Les « compliers », ceux dont le traitement change avec l\'instrument','Toute la population sans exception','Les seuls « always-takers »','Les individus exclus de l\'étude',
   'La monotonicité exclut les « defiers » ; le LATE peut donc différer de l\'ATE si les compliers ne sont pas représentatifs.',
   'https://fr.wikipedia.org/wiki/Variable_instrumentale'),
 mk('Le modèle de sélection de Heckman corrige…','Le biais de sélection dans un échantillon non aléatoirement observé','L\'hétéroscédasticité des erreurs','La multicolinéarité des régresseurs','Les valeurs manquantes aléatoires',
   'Étape 1 : probit de participation → inverse de Mills ; étape 2 : régression corrigée. L\'identification est plus crédible avec une restriction d\'exclusion.',
   'https://fr.wikipedia.org/wiki/Mod%C3%A8le_de_s%C3%A9lection_de_Heckman'),
 mk('La méthode du contrôle synthétique construit…','Un contre-factuel par combinaison pondérée d\'unités non traitées','Un échantillon fictif tiré au hasard','Une simulation Monte-Carlo des erreurs','Un modèle sans données réelles',
   'Abadie, Diamond & Hainmueller : idéale pour une seule unité traitée (un pays, une région) suivie longtemps ; validée par des tests placebo.',
   'https://fr.wikipedia.org/wiki/Contr%C3%B4le_synth%C3%A9tique'),
 mk('L\'appariement par score de propension exige la condition de support commun, c\'est-à-dire…','Un recouvrement des scores entre traités et non-traités','Des échantillons de taille identique','Une randomisation préalable','Des variables toutes binaires',
   'Sans chevauchement, aucun contrefactuel comparable n\'existe : on impose un « common support » et on vérifie l\'équilibre des covariables après appariement.',
   'https://fr.wikipedia.org/wiki/Appariement_par_score_de_propension'),
 mk('Le biais standardisé après appariement doit idéalement rester…','Inférieur à 5 % pour chaque covariable','Supérieur à 50 %','Exactement égal à 1','Négatif pour toutes les variables',
   'Rosenbaum & Rubin : un biais standardisé résiduel < 5 % (parfois 10 %) atteste d\'un bon équilibre entre traités et témoins appariés.',
   'https://fr.wikipedia.org/wiki/Appariement_par_score_de_propension'),
 mk('L\'estimateur doublement robuste (AIPW) est convergent si…','Le modèle de participation OU le modèle de résultat est bien spécifié','Les deux modèles sont faux','Aucun modèle n\'est estimé','L\'échantillon est exhaustif',
   'Augmented Inverse Probability Weighting combine pondération et régression : deux chances d\'obtenir un estimateur non biaisé.',
   'https://fr.wikipedia.org/wiki/Inf%C3%A9rence_causale'),
 mk('Le Double/Debiased Machine Learning (Chernozhukov et al.) sert à…','Estimer un effet causal avec beaucoup de covariables via ML et cross-fitting','Remplacer la théorie économique','Générer des données synthétiques','Accélérer les régressions simples',
   'Le ML modélise les nuisances (propension, résultat), la moment-condition de Neyman et le cross-fitting préservent l\'inférence valide sur le paramètre causal.',
   'https://fr.wikipedia.org/wiki/Apprentissage_automatique'),
 mk('Les causal forests (Athey & Wager) servent surtout à estimer…','Des effets hétérogènes (CATE) selon les caractéristiques','La moyenne globale uniquement','Le coût du programme','Le taux de non-réponse',
   'Elles identifient pour qui le programme fonctionne le mieux, avec des intervalles de confiance valides (honest splitting).',
   'https://fr.wikipedia.org/wiki/For%C3%AAt_d%27arbres_d%C3%A9cisionnels'),
 mk('Un essai randomisé en grappes (cluster RCT) randomise…','Des groupes entiers (villages, écoles) plutôt que des individus','Uniquement les enquêteurs','Les dates de collecte','Les questions du questionnaire',
   'Adapté aux interventions collectives et aux spillovers ; il faut corriger l\'inférence par le coefficient de corrélation intra-grappe (ICC) et clusteriser les écarts types.',
   'https://fr.wikipedia.org/wiki/Essai_randomis%C3%A9_contr%C3%B4l%C3%A9'),
 mk('Le calcul de puissance statistique avant une évaluation détermine…','La taille d\'échantillon nécessaire pour détecter un effet donné','Le budget de communication','Le nombre d\'enquêteurs à former','La durée du projet',
   'Puissance (souvent 0,8), seuil α (0,05), effet minimal détectable (MDE) et ICC en grappes : sous-dimensionner l\'échantillon condamne l\'évaluation.',
   'https://fr.wikipedia.org/wiki/Puissance_statistique'),
 mk('L\'attrition différentielle dans une évaluation panel désigne…','Une sortie d\'échantillon plus forte dans un groupe que dans l\'autre','Une hausse du budget','Un changement de questionnaire','Une erreur de saisie',
   'Elle recrée un biais de sélection ; on la teste (comparaison des perdus de vue) et on borne les résultats (bornes de Lee).',
   'https://fr.wikipedia.org/wiki/Biais_de_s%C3%A9lection'),
 mk('L\'analyse en intention de traiter (ITT) compare…','Les groupes tels qu\'assignés, indépendamment de la participation effective','Seulement ceux qui ont participé','Les seuls abandons','Les groupes après exclusion des non-conformes',
   'L\'ITT préserve la randomisation ; le TOT/LATE s\'obtient en divisant l\'ITT par le taux de conformité (estimation par IV).',
   'https://fr.wikipedia.org/wiki/Analyse_en_intention_de_traiter'),
 mk('Un pré-enregistrement (pre-analysis plan) d\'évaluation vise à…','Fixer à l\'avance hypothèses et analyses pour éviter le p-hacking','Réserver le budget','Sélectionner les bénéficiaires','Publier plus vite',
   'Déposé avant la collecte (AEA RCT Registry), il distingue analyses confirmatoires et exploratoires et renforce la crédibilité des résultats.',
   'https://fr.wikipedia.org/wiki/Pr%C3%A9enregistrement_(science)'),
 mk('La correction pour tests multiples (Bonferroni, Romano-Wolf) est nécessaire quand…','On teste de nombreux résultats ou sous-groupes','On a une seule hypothèse','L\'échantillon est petit','Les données sont qualitatives',
   'Sans correction, tester 20 issues produit en moyenne un « effet significatif » par pur hasard à 5 % ; on regroupe aussi en indices agrégés.',
   'https://fr.wikipedia.org/wiki/Comparaisons_multiples'),
 mk('Les effets de diffusion (spillovers) d\'un programme…','Peuvent contaminer le groupe témoin et biaiser l\'effet estimé','Sont toujours nuls par construction','Augmentent la puissance statistique','Concernent seulement les RCT',
   'On les mesure par des designs à saturation randomisée (proportion traitée variable par grappe) plutôt que de les ignorer.',
   'https://fr.wikipedia.org/wiki/Externalit%C3%A9'),
 mk('La validité externe d\'une évaluation renvoie à…','La transposabilité des résultats à d\'autres contextes','L\'absence d\'erreurs de calcul','La taille du budget','La qualité du rapport écrit',
   'Un RCT bien mené a une forte validité interne, mais sa généralisation dépend du contexte, de l\'échelle et des mécanismes sous-jacents.',
   'https://fr.wikipedia.org/wiki/Validit%C3%A9_externe'),
] .forEach(x => se.push(x));

// --- STATA 18 / 19 appliqué à l'évaluation d'impact (16) ---
[
 mk('Quelle commande STATA estime une différence de différences avec effets fixes bidirectionnels ?','reghdfe y i.traite##i.post, absorb(id periode) cluster(id)','summarize y if traite==1','tabulate y post','graph bar y, over(traite)',
   'reghdfe absorbe les effets fixes haute dimension ; l\'interaction traite×post donne l\'estimateur DID et cluster(id) corrige l\'inférence.',
   'https://www.stata.com/'),
 mk('Quelle commande officielle de STATA 18 estime des DID robustes à l\'adoption échelonnée ?','hdidregress / xtdidregress','regress uniquement','ttest','tabstat',
   'STATA 18 a introduit didregress, xtdidregress et hdidregress avec diagnostics de tendances parallèles (estat trendplots, estat ptrends).',
   'https://www.stata.com/new-in-stata/difference-in-differences/'),
 mk('Dans STATA, quelle commande produit le graphique des tendances pré-traitement après xtdidregress ?','estat trendplots','graph twoway scatter','predict resid','margins, dydx(*)',
   'estat trendplots trace les moyennes observées et contrefactuelles ; estat ptrends teste formellement l\'hypothèse de tendances parallèles.',
   'https://www.stata.com/'),
 mk('Quelle commande STATA réalise un appariement par score de propension avec estimation de l\'ATT ?','teffects psmatch (y) (traite x1 x2), atet','regress y traite','tabulate traite','pwcorr y traite',
   'teffects couvre psmatch, nnmatch, ipw, ra, ipwra et aipw ; l\'option atet cible l\'effet sur les traités.',
   'https://www.stata.com/features/treatment-effects/'),
 mk('Quelle commande STATA fournit l\'estimateur doublement robuste AIPW ?','teffects aipw (y x1 x2) (traite z1 z2)','ivregress 2sls y (traite=z)','xtreg y traite, fe','logit traite x1',
   'aipw combine modèle de résultat et modèle de participation : il reste convergent si l\'un des deux est bien spécifié.',
   'https://www.stata.com/features/treatment-effects/'),
 mk('Après teffects psmatch, quelle commande vérifie l\'équilibre des covariables ?','tebalance summarize','estat vif','hettest','predict xb',
   'tebalance summarize/density/box compare les moments et distributions avant/après appariement (biais standardisés, ratios de variance).',
   'https://www.stata.com/'),
 mk('Quelle commande STATA estime une régression par variables instrumentales en double moindres carrés ?','ivregress 2sls y x1 (traite = z), first','regress y traite x1','probit traite z','areg y traite, absorb(id)',
   'L\'option first affiche la première étape ; estat firststage donne le F de Cragg-Donald et les seuils de Stock-Yogo pour les instruments faibles.',
   'https://www.stata.com/'),
 mk('Après ivregress, quelle commande teste la force des instruments ?','estat firststage','estat summarize','estat ic','estat classification',
   'Elle rapporte le F de première étape et les valeurs critiques de Stock-Yogo ; estat overid teste la suridentification (Sargan-Hansen).',
   'https://www.stata.com/'),
 mk('Quel package communautaire STATA estime une régression sur discontinuité avec bande passante optimale ?','rdrobust','outreg2','estout','ssc install tabout',
   'Calonico-Cattaneo-Titiunik : rdrobust (estimation et inférence robuste au biais), rdbwselect (bande passante), rdplot (graphique), rddensity (test de manipulation).',
   'https://rdpackages.github.io/'),
 mk('Quelle commande STATA met en œuvre la méthode du contrôle synthétique ?','synth (ou synth_runner / sdid)','xtline','tsset','rolling',
   'synth construit le donneur pondéré ; synth_runner automatise les placebos et p-values ; sdid implémente le synthetic DID d\'Arkhangelsky et al.',
   'https://www.stata.com/'),
 mk('Quelle commande STATA 18 estime des effets de traitement hétérogènes par machine learning causal ?','Les estimateurs de la suite causal ML / lasso (telasso, dsregress)','summarize, detail','recode','encode',
   'STATA 18-19 propose telasso (effets de traitement avec sélection lasso) et dsregress/poregress/xporegress pour l\'inférence après sélection.',
   'https://www.stata.com/new-in-stata/'),
 mk('Dans STATA, comment corrige-t-on l\'inférence pour une randomisation en grappes ?','En ajoutant vce(cluster village)','En augmentant le nombre d\'observations','En supprimant les effets fixes','En utilisant robust seul',
   'Les écarts types clusterisés au niveau de randomisation évitent de sous-estimer la variance ; avec peu de clusters, recourir au wild bootstrap (boottest).',
   'https://www.stata.com/'),
 mk('Quelle commande STATA calcule la taille d\'échantillon nécessaire pour détecter un effet ?','power twomeans','ttest','pwcorr','tabstat',
   'power twomeans/twoproportions gère aussi les designs en grappes (option cluster) : elle relie MDE, puissance, α et ICC.',
   'https://www.stata.com/features/power-and-sample-size/'),
 mk('Quelle commande STATA corrige les p-values pour tests multiples selon Romano-Wolf ?','rwolf (ou wyoung)','correlate','xi:','tabi',
   'Ces packages contrôlent le family-wise error rate par bootstrap, indispensables quand on teste de nombreuses issues ou sous-groupes.',
   'https://www.stata.com/'),
 mk('Quelle nouveauté majeure de STATA 19 facilite l\'analyse d\'enquêtes complexes et de données manquantes ?','L\'intégration renforcée des méthodes bayésiennes et d\'imputation multiple','La suppression des do-files','L\'abandon du format .dta','L\'interdiction des macros',
   'STATA 19 (2025) étend notamment le bayésien (bayesmh, bayes:), les modèles à variables latentes et les outils de reproductibilité.',
   'https://www.stata.com/new-in-stata/'),
 mk('Pour rendre une analyse STATA reproductible, la bonne pratique consiste à…','Écrire un do-file versionné avec version, set seed et chemins relatifs','Travailler uniquement en ligne de commande interactive','Renommer les variables à la main à chaque session','Copier les résultats dans un tableur',
   'version 18 fige le comportement des commandes, set seed rend l\'aléatoire reproductible, et un do-file maître orchestre nettoyage → analyse → sorties.',
   'https://www.stata.com/'),
] .forEach(x => se.push(x));

// --- Calculs d'évaluation d'impact (12 paramétriques) ---
// Distracteurs choisis parmi des valeurs plausibles, sans collision
function pick3(correct, candidats) {
  const out = [];
  for (const c of candidats) {
    if (c !== correct && !out.includes(c)) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}
[[0.62,0.50,0.55,0.51,8],[0.70,0.55,0.60,0.56,11],[0.48,0.40,0.42,0.38,4],[0.80,0.60,0.65,0.55,10],
 [0.55,0.45,0.50,0.46,6],[0.66,0.50,0.58,0.50,8],[0.75,0.60,0.62,0.54,7],[0.58,0.42,0.44,0.36,8]]
.forEach(([ta, tb, ca, cb, eff]) => {
  const dT = Math.round((ta - tb) * 100), dC = Math.round((ca - cb) * 100);
  const [w1, w2, w3] = pick3(eff, [dT, dC, Math.round((ta - ca) * 100), eff * 2, eff + 3, eff + 5, eff + 7]);
  se.push(mk(
    `Taux de scolarisation — traités : ${Math.round(tb*100)} % avant, ${Math.round(ta*100)} % après ; témoins : ${Math.round(cb*100)} % avant, ${Math.round(ca*100)} % après. Effet DID :`,
    `+${eff} points de pourcentage`, `+${w1} points de pourcentage`, `+${w2} points de pourcentage`, `+${w3} points de pourcentage`,
    `DID = (${Math.round(ta*100)}−${Math.round(tb*100)}) − (${Math.round(ca*100)}−${Math.round(cb*100)}) = ${dT} − ${dC} = ${eff} points. La simple différence après traitement (${Math.round((ta-ca)*100)} pts) surestimerait l'effet.`,
    'https://fr.wikipedia.org/wiki/Doubles_diff%C3%A9rences'));
});
[[0.30,0.12,0.40],[0.25,0.05,0.20],[0.60,0.30,0.50],[0.45,0.09,0.20]]
.forEach(([itt, comp, late]) => se.push(mk(
  `Un programme obtient un effet ITT de ${comp} unité(s) avec un taux de conformité de ${Math.round(itt*100)} %. L'effet LATE (sur les compliers) vaut :`,
  `${late}`, `${comp}`, `${(comp*2).toFixed(2)}`, `${itt}`,
  `LATE = ITT ÷ taux de conformité = ${comp} ÷ ${itt} = ${late}. L'effet sur ceux qui participent réellement dépasse l'effet en intention de traiter.`,
  'https://fr.wikipedia.org/wiki/Analyse_en_intention_de_traiter')));

// =====================================================================
// IA / LLM / AGENTS — technique avancée (+48)
// =====================================================================
const ia = [];
[
 mk('Dans un Transformer, l\'attention est calculée par la formule…','softmax(QKᵀ/√d_k)·V','Q + K + V','max(Q, K)·V','tanh(QK)·softmax(V)',
   'Le produit scalaire requête-clé est normalisé par √d_k pour stabiliser les gradients, transformé en poids par softmax, puis appliqué aux valeurs V.',
   'https://fr.wikipedia.org/wiki/Transformeur'),
 mk('Le facteur √d_k au dénominateur de l\'attention sert à…','Éviter que les produits scalaires trop grands saturent le softmax','Accélérer le calcul matriciel','Réduire le nombre de têtes','Normaliser les images',
   'Sans cette mise à l\'échelle, la variance croît avec la dimension et le softmax devient quasi one-hot, annulant les gradients.',
   'https://fr.wikipedia.org/wiki/Transformeur'),
 mk('L\'attention multi-têtes permet…','D\'apprendre plusieurs types de relations dans des sous-espaces différents','De réduire le nombre de couches à une seule','D\'éviter tout entraînement','De supprimer les embeddings',
   'Chaque tête projette Q, K, V dans un sous-espace de dimension d_model/h : syntaxe, coréférence, position sont capturées en parallèle puis concaténées.',
   'https://fr.wikipedia.org/wiki/Transformeur'),
 mk('Le masque causal dans un décodeur Transformer empêche…','Un token d\'attendre les tokens futurs','L\'usage du GPU','La normalisation des couches','Le calcul du gradient',
   'Masque triangulaire supérieur à −∞ avant le softmax : indispensable pour un modèle auto-régressif qui prédit le token suivant.',
   'https://fr.wikipedia.org/wiki/Transformeur'),
 mk('Les embeddings positionnels rotatifs (RoPE) apportent…','Un encodage relatif de la position, extrapolable à de longs contextes','Une compression des poids','Un chiffrement des prompts','Une réduction du vocabulaire',
   'RoPE fait tourner les vecteurs Q et K selon la position : l\'attention ne dépend que des écarts relatifs, ce qui facilite l\'extension de la fenêtre de contexte.',
   'https://fr.wikipedia.org/wiki/Transformeur'),
 mk('La couche de normalisation « pre-LN » (avant l\'attention) est préférée en pratique car…','Elle stabilise l\'entraînement des réseaux très profonds','Elle supprime le besoin de données','Elle double la vitesse d\'inférence','Elle réduit le vocabulaire',
   'Le pre-LayerNorm évite l\'explosion des activations résiduelles et permet de se passer d\'un long warmup, contrairement au post-LN original.',
   'https://fr.wikipedia.org/wiki/Normalisation_par_lots'),
 mk('Le cache KV en inférence sert à…','Réutiliser les clés/valeurs déjà calculées pour ne pas recalculer tout le contexte','Stocker les poids du modèle sur disque','Chiffrer les conversations','Compresser les images',
   'Il rend la génération linéaire au lieu de quadratique par token, au prix d\'une mémoire proportionnelle à contexte × couches × têtes.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('Les attentions GQA (Grouped-Query Attention) et MQA visent surtout à…','Réduire la taille du cache KV et accélérer l\'inférence','Augmenter le nombre de paramètres','Supprimer le softmax','Remplacer la rétropropagation',
   'Plusieurs têtes de requêtes partagent les mêmes têtes clés/valeurs : mémoire et bande passante fortement réduites, qualité quasi préservée.',
   'https://fr.wikipedia.org/wiki/Transformeur'),
 mk('FlashAttention accélère l\'attention en…','Réorganisant les calculs par blocs pour limiter les accès à la mémoire','Supprimant des couches du réseau','Réduisant le vocabulaire de moitié','Ignorant certains tokens au hasard',
   'Algorithme IO-aware : le softmax est calculé en streaming dans la SRAM, sans matérialiser la matrice d\'attention n×n en mémoire haute latence.',
   'https://fr.wikipedia.org/wiki/Transformeur'),
 mk('Le tokenizer BPE (Byte Pair Encoding) construit son vocabulaire en…','Fusionnant itérativement les paires de symboles les plus fréquentes','Séparant chaque caractère définitivement','Traduisant le texte en anglais','Supprimant les mots rares',
   'Le vocabulaire de sous-mots gère les mots inconnus et les langues morphologiquement riches ; SentencePiece et WordPiece en sont des variantes.',
   'https://fr.wikipedia.org/wiki/Byte_pair_encoding'),
 mk('Un modèle « Mixture of Experts » (MoE) active, pour chaque token…','Seulement quelques experts sur l\'ensemble disponible','Tous les experts simultanément','Aucun expert','Un expert choisi une fois pour toutes',
   'Le routeur sélectionne top-k experts : le nombre de paramètres total est très grand mais le calcul par token reste modéré (paramètres actifs ≪ totaux).',
   'https://fr.wikipedia.org/wiki/Mixture_of_experts'),
 mk('LoRA (Low-Rank Adaptation) permet un fine-tuning efficace en…','N\'entraînant que des matrices de rang faible ajoutées aux poids gelés','Ré-entraînant tout le modèle','Supprimant des couches','Réduisant le jeu de données à 10 exemples',
   'ΔW = BA avec rang r ≪ d : quelques millions de paramètres suffisent, et les adaptateurs se combinent ou se retirent à volonté. QLoRA y ajoute la quantification 4 bits.',
   'https://fr.wikipedia.org/wiki/Apprentissage_par_transfert'),
 mk('La quantification en 4 bits (GPTQ, AWQ, GGUF) permet surtout de…','Faire tenir un grand modèle en mémoire réduite avec une perte de qualité limitée','Améliorer la précision au-delà du modèle original','Supprimer le besoin de GPU pour l\'entraînement','Augmenter la fenêtre de contexte',
   'Les poids passent de 16 à 4 bits (÷4 de mémoire) ; les schémas modernes préservent les canaux sensibles pour limiter la dégradation.',
   'https://fr.wikipedia.org/wiki/Quantification_(traitement_du_signal)'),
 mk('Le décodage « top-p » (nucleus sampling) consiste à…','Échantillonner dans le plus petit ensemble de tokens dont la probabilité cumulée atteint p','Prendre toujours le token le plus probable','Tirer uniformément dans tout le vocabulaire','Supprimer les tokens rares du vocabulaire',
   'Contrairement au top-k fixe, la taille du noyau s\'adapte à la distribution : diversité contrôlée sans laisser passer de tokens aberrants.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('Le décodage spéculatif accélère la génération en…','Faisant proposer plusieurs tokens par un petit modèle, vérifiés par le grand','Réduisant la taille du contexte','Supprimant le cache KV','Baissant la température à zéro',
   'Le modèle cible valide en un seul passage les tokens du brouillon : gain de latence sans changer la distribution de sortie.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('La perplexité d\'un modèle de langage correspond à…','L\'exponentielle de l\'entropie croisée moyenne par token','Le nombre de paramètres','La taille du vocabulaire','Le temps d\'entraînement',
   'PPL = exp(−1/N Σ log p(tokenᵢ)). Plus elle est basse, mieux le modèle prédit le texte ; elle n\'est comparable qu\'à tokenizer identique.',
   'https://fr.wikipedia.org/wiki/Perplexit%C3%A9'),
 mk('Les lois d\'échelle (scaling laws) de Chinchilla recommandent, à budget de calcul donné…','D\'augmenter conjointement paramètres et volume de données d\'entraînement','De maximiser uniquement le nombre de paramètres','De réduire les données de moitié','D\'entraîner sur une seule époque de 100 exemples',
   'Hoffmann et al. (2022) : les modèles antérieurs étaient sous-entraînés en données ; l\'optimum se situe autour d\'un ratio ≈ 20 tokens par paramètre.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('Le DPO (Direct Preference Optimization) se distingue du RLHF classique car il…','Optimise directement sur les préférences sans modèle de récompense séparé ni RL','Supprime toute supervision humaine','Nécessite dix fois plus de GPU','Remplace le pré-entraînement',
   'DPO reformule l\'objectif RLHF en perte de classification sur des paires (préférée, rejetée) : plus simple et plus stable que PPO.',
   'https://fr.wikipedia.org/wiki/Apprentissage_par_renforcement_%C3%A0_partir_de_r%C3%A9troaction_humaine'),
 mk('Dans un pipeline RAG, le « chunking » désigne…','Le découpage des documents en segments indexables','La compression du modèle','Le nettoyage des GPU','Le chiffrement des index',
   'Taille et recouvrement des chunks conditionnent la qualité du rappel : trop grands ils diluent le signal, trop petits ils perdent le contexte.',
   'https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9ration_augment%C3%A9e_de_r%C3%A9cup%C3%A9ration'),
 mk('La recherche hybride en RAG combine…','Recherche vectorielle dense et recherche lexicale BM25','Deux modèles de génération identiques','Deux GPU en parallèle','Deux fenêtres de contexte',
   'Le dense capte la sémantique, BM25 les termes rares et exacts (références, codes) ; la fusion (RRF) puis un reranker améliorent nettement la précision.',
   'https://fr.wikipedia.org/wiki/Okapi_BM25'),
 mk('Un « reranker » de type cross-encoder améliore le RAG car il…','Évalue conjointement requête et document pour un score de pertinence plus fin','Génère de nouveaux documents','Compresse la base vectorielle','Traduit automatiquement les requêtes',
   'Coûteux, il n\'est appliqué qu\'aux k premiers candidats retournés par la recherche vectorielle (bi-encodeur), améliorant fortement le top-3.',
   'https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9ration_augment%C3%A9e_de_r%C3%A9cup%C3%A9ration'),
 mk('L\'algorithme HNSW utilisé par les bases vectorielles est…','Un graphe hiérarchique de plus proches voisins approximatifs','Un tri alphabétique des documents','Un chiffrement asymétrique','Un protocole réseau',
   'Hierarchical Navigable Small World : recherche ANN en temps quasi-logarithmique ; les paramètres M et efSearch arbitrent rappel et latence.',
   'https://fr.wikipedia.org/wiki/Recherche_des_plus_proches_voisins'),
 mk('La similarité cosinus entre deux embeddings mesure…','L\'angle entre les vecteurs, indépendamment de leur norme','La distance de Hamming','Le nombre de mots communs','La longueur du texte',
   'cos(θ) = A·B/(‖A‖‖B‖) ∈ [−1, 1] ; sur des vecteurs normalisés, elle est équivalente au produit scalaire et à la distance euclidienne au carré.',
   'https://fr.wikipedia.org/wiki/Similarit%C3%A9_cosinus'),
 mk('Le « grounding » d\'une réponse d\'agent consiste à…','L\'appuyer sur des sources vérifiables citées','La raccourcir au maximum','La traduire en plusieurs langues','La générer à température élevée',
   'Citations traçables, extraits sources et refus en l\'absence de preuve : c\'est le principal rempart contre les hallucinations en usage professionnel.',
   'https://fr.wikipedia.org/wiki/Hallucination_(intelligence_artificielle)'),
 mk('Le principe du moindre privilège appliqué à un agent IA outillé impose de…','Ne lui donner que les permissions strictement nécessaires à sa tâche','Lui donner un accès administrateur complet','Désactiver toute journalisation','Supprimer la validation humaine',
   'Portées d\'API limitées, jetons révocables, bacs à sable et journalisation : indispensable face au risque d\'injection de prompt indirecte.',
   'https://fr.wikipedia.org/wiki/Principe_de_moindre_privil%C3%A8ge'),
 mk('Une injection de prompt indirecte se produit lorsque…','Un contenu externe consulté par l\'agent contient des instructions malveillantes','L\'utilisateur tape trop vite','Le GPU surchauffe','Le modèle est trop petit',
   'Page web, e-mail ou document piégé : l\'agent doit traiter ces contenus comme des données, jamais comme des ordres — d\'où la séparation stricte des canaux.',
   'https://fr.wikipedia.org/wiki/Injection_de_prompt'),
 mk('Le mode JSON strict / sortie structurée d\'une API LLM garantit…','Une réponse conforme au schéma déclaré, exploitable par un programme','Une réponse toujours exacte factuellement','Un coût nul','Une génération instantanée',
   'Le décodage contraint par grammaire élimine les erreurs de parsing ; il ne garantit pas la véracité du contenu, seulement sa forme.',
   'https://fr.wikipedia.org/wiki/JSON'),
 mk('L\'« embedding drift » en production désigne…','L\'écart croissant entre les données indexées et les requêtes réelles','Une panne du GPU','Une fuite de mémoire','Un changement de licence',
   'Nouveaux termes, nouveaux usages ou changement de modèle d\'embedding : il faut réindexer et surveiller le rappel dans le temps.',
   'https://fr.wikipedia.org/wiki/D%C3%A9rive_conceptuelle'),
 mk('La distillation par « chain-of-thought » consiste à…','Entraîner un petit modèle sur les raisonnements produits par un grand','Supprimer les étapes de raisonnement','Chiffrer les poids','Réduire le contexte à un token',
   'Le student apprend non seulement la réponse mais le cheminement, ce qui améliore nettement ses performances en raisonnement à taille égale.',
   'https://fr.wikipedia.org/wiki/Distillation_des_connaissances'),
 mk('Le « self-consistency » en prompting consiste à…','Échantillonner plusieurs raisonnements et retenir la réponse majoritaire','Poser toujours la même question','Fixer la température à 0','Réduire le nombre de tokens',
   'Wang et al. : le vote majoritaire sur plusieurs chaînes de pensée indépendantes améliore sensiblement la précision en arithmétique et logique.',
   'https://fr.wikipedia.org/wiki/Ing%C3%A9nierie_de_prompt'),
 mk('Le catastrophic forgetting lors d\'un fine-tuning désigne…','La perte de capacités générales acquises au pré-entraînement','Une panne de disque dur','L\'oubli du mot de passe','La suppression du dataset',
   'On l\'atténue par un taux d\'apprentissage faible, du replay de données générales, ou des méthodes à paramètres gelés comme LoRA.',
   'https://fr.wikipedia.org/wiki/Oubli_catastrophique'),
 mk('Une « garde-barrière » (guardrail) de sortie dans un système LLM sert à…','Filtrer ou bloquer les réponses non conformes avant affichage','Accélérer la génération','Compresser le modèle','Traduire les prompts',
   'Classificateurs de contenu, détection de données personnelles, vérification de schéma : la défense en profondeur complète l\'alignement du modèle.',
   'https://fr.wikipedia.org/wiki/Alignement_de_l%27intelligence_artificielle'),
] .forEach(x => ia.push(x));
// Paramétriques techniques (16)
[[32,128,4096],[16,64,1024],[8,256,2048],[64,64,4096],[12,128,1536],[40,128,5120],[16,256,4096],[24,128,3072]]
.forEach(([h, dk, dmodel]) => {
  const [w1, w2, w3] = pick3(dmodel, [dmodel * 2, dk, h, dmodel + h, Math.round(dmodel / 2)]);
  ia.push(mk(
    `Un Transformer a ${h} têtes d'attention et une dimension par tête d_k = ${dk}. Sa dimension de modèle d_model vaut :`,
    `${F(dmodel)}`, `${F(w1)}`, `${F(w2)}`, `${F(w3)}`,
    `d_model = nombre de têtes × d_k = ${h} × ${dk} = ${F(dmodel)} : les têtes se partagent la dimension totale.`,
    'https://fr.wikipedia.org/wiki/Transformeur'));
});
[[7,4,3.5],[13,4,6.5],[70,4,35],[7,8,7],[13,8,13],[34,4,17],[70,8,70],[8,4,4]]
.forEach(([params, bits, go]) => {
  const [w1, w2, w3] = pick3(go, [go * 2, go / 2, params, go * 4, go + 6]);
  const f = (n) => String(n).replace('.', ',');
  ia.push(mk(
    `Un modèle de ${params} milliards de paramètres quantifié en ${bits} bits occupe environ :`,
    `${f(go)} Go`, `${f(w1)} Go`, `${f(w2)} Go`, `${f(w3)} Go`,
    `Mémoire ≈ ${params} Md × ${bits}/8 octets = ${f(go)} Go (hors cache KV et activations, qui s'ajoutent à l'inférence).`,
    'https://fr.wikipedia.org/wiki/Quantification_(traitement_du_signal)'));
});

// ---------------- Assemblage ----------------------------------------
const m1Packs = [
  ...packify(D.SE,   'Évaluation d\'impact', 'Planification, S&E et évaluation d\'impact', se),
  ...packify(IA_NAME, 'IA technique',        'IA, LLM et agents — approfondissement technique', ia)
];

module.exports = { m1Packs, m2Packs: [], m3Packs: [] };
