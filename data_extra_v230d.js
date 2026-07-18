// =====================================================================
// data_extra_v230d.js — v2.30 : ML/DL (+92), Suivi-évaluation (+92),
// Histoire/travail/santé/éducation (+100).
// =====================================================================

const { mk, F } = require('./data_extra_v230b.js');

// ---------------- MACHINE LEARNING & DEEP LEARNING (+92) -------------
const ml = [];
[
 mk('L\'apprentissage supervisé se caractérise par…','Des données d\'entraînement étiquetées (X, y)','L\'absence totale de données','Des récompenses différées','Des données sans étiquettes',
   'Le modèle apprend une fonction X → y à partir d\'exemples annotés (régression, classification) ; le non-supervisé découvre des structures sans étiquettes.',
   'https://fr.wikipedia.org/wiki/Apprentissage_supervis%C3%A9'),
 mk('Le surapprentissage (overfitting) survient quand le modèle…','Colle trop aux données d\'entraînement et généralise mal','Est trop simple','N\'apprend rien','Manque de paramètres',
   'Symptôme : erreur d\'entraînement faible mais erreur de test élevée. Remèdes : régularisation, plus de données, validation croisée, arrêt précoce.',
   'https://fr.wikipedia.org/wiki/Surapprentissage'),
 mk('La validation croisée k-fold consiste à…','Diviser les données en k blocs et entraîner k fois en changeant le bloc de test','Tester sur les données d\'entraînement','Supprimer les variables','Multiplier les époques',
   'Chaque bloc sert une fois de test : la moyenne des k scores estime la performance de généralisation de façon plus robuste qu\'un seul découpage.',
   'https://fr.wikipedia.org/wiki/Validation_crois%C3%A9e'),
 mk('La descente de gradient met à jour les paramètres…','Dans la direction opposée au gradient de la fonction de coût','Au hasard','Dans la direction du gradient','Une seule fois',
   'θ ← θ − η∇J(θ) : le taux d\'apprentissage η contrôle la taille des pas ; trop grand il diverge, trop petit il est lent.',
   'https://fr.wikipedia.org/wiki/Algorithme_du_gradient'),
 mk('La fonction d\'activation ReLU vaut…','max(0, x)','1/(1+e⁻ˣ)','tanh(x)','x²',
   'ReLU (Rectified Linear Unit) est simple, rapide et atténue le problème du gradient qui s\'évanouit ; variante : Leaky ReLU pour éviter les neurones « morts ».',
   'https://fr.wikipedia.org/wiki/Fonction_d%27activation'),
 mk('Un réseau de neurones convolutif (CNN) est particulièrement adapté…','Aux images (extraction de motifs locaux par convolution)','Aux nombres premiers','Aux fichiers audio uniquement','Aux bases SQL',
   'Les couches de convolution partagent leurs poids et détectent des motifs hiérarchiques (bords → textures → objets) ; pooling réduit la dimension.',
   'https://fr.wikipedia.org/wiki/R%C3%A9seau_neuronal_convolutif'),
 mk('Les réseaux récurrents (RNN/LSTM) traitent…','Des séquences (texte, séries temporelles)','Des images fixes seulement','Des graphes uniquement','Des tableaux Excel',
   'La récurrence propage un état d\'un pas de temps au suivant ; les LSTM/GRU gèrent les dépendances longues grâce à leurs portes.',
   'https://fr.wikipedia.org/wiki/R%C3%A9seau_de_neurones_r%C3%A9currents'),
 mk('La matrice de confusion d\'un classifieur binaire croise…','Prédictions et vraies classes (VP, FP, VN, FN)','Deux jeux de features','Les époques et les batchs','Les couches du réseau',
   'Elle fonde précision (VP/(VP+FP)), rappel (VP/(VP+FN)), F1-score et exactitude, à choisir selon le coût des erreurs.',
   'https://fr.wikipedia.org/wiki/Matrice_de_confusion'),
 mk('La précision (precision) d\'un classifieur mesure…','La part de prédictions positives qui sont correctes','La part de positifs réels retrouvés','Le temps de calcul','La taille du modèle',
   'Precision = VP/(VP+FP) ; le rappel = VP/(VP+FN). Un filtre anti-spam privilégie la précision, un dépistage médical le rappel.',
   'https://fr.wikipedia.org/wiki/Pr%C3%A9cision_et_rappel'),
 mk('Le F1-score est…','La moyenne harmonique de la précision et du rappel','La somme des erreurs','Le taux d\'apprentissage','Le nombre de couches',
   'F1 = 2·P·R/(P+R) : utile quand les classes sont déséquilibrées et qu\'un compromis précision/rappel est recherché.',
   'https://fr.wikipedia.org/wiki/F-mesure'),
 mk('K-means est un algorithme…','De clustering non supervisé en k groupes','De régression linéaire','De classification supervisée','De réduction supervisée',
   'Il alterne affectation des points au centroïde le plus proche et recalcul des centroïdes ; sensible à l\'initialisation et au choix de k (méthode du coude).',
   'https://fr.wikipedia.org/wiki/K-moyennes'),
 mk('L\'ACP (analyse en composantes principales) sert à…','Réduire la dimension en conservant le maximum de variance','Étiqueter les données','Créer des règles métier','Augmenter le bruit',
   'Les composantes principales sont des combinaisons linéaires orthogonales des variables initiales, ordonnées par variance expliquée.',
   'https://fr.wikipedia.org/wiki/Analyse_en_composantes_principales'),
 mk('Une forêt aléatoire (random forest) combine…','De nombreux arbres de décision entraînés sur des échantillons bootstrap','Un seul arbre profond','Des réseaux de neurones','Des SVM linéaires',
   'Bagging + sélection aléatoire de variables à chaque nœud : la moyenne/vote des arbres réduit la variance et le surapprentissage.',
   'https://fr.wikipedia.org/wiki/For%C3%AAt_d%27arbres_d%C3%A9cisionnels'),
 mk('Le gradient boosting (XGBoost, LightGBM) construit…','Des arbres séquentiels corrigeant les erreurs des précédents','Des arbres indépendants en parallèle','Un réseau convolutif','Une régression unique',
   'Chaque nouvel arbre ajuste le gradient de la perte résiduelle ; ces méthodes dominent souvent sur données tabulaires.',
   'https://fr.wikipedia.org/wiki/Gradient_boosting'),
 mk('Le compromis biais-variance exprime que…','Un modèle trop simple sous-apprend, un modèle trop complexe sur-apprend','Le biais est toujours nul','La variance doit être maximale','Les deux augmentent ensemble indéfiniment',
   'L\'erreur de généralisation ≈ biais² + variance + bruit ; la régularisation et la taille du modèle arbitrent ce compromis.',
   'https://fr.wikipedia.org/wiki/Dilemme_biais-variance'),
 mk('La régularisation L2 (ridge) pénalise…','La somme des carrés des coefficients','Le nombre d\'observations','La moyenne des cibles','Le temps d\'entraînement',
   'Ajouter λΣθ² au coût rétrécit les coefficients et stabilise le modèle ; L1 (lasso) pousse certains coefficients exactement à zéro (sélection).',
   'https://fr.wikipedia.org/wiki/R%C3%A9gularisation_(math%C3%A9matiques)'),
 mk('Le dropout en deep learning consiste à…','Désactiver aléatoirement des neurones à l\'entraînement pour régulariser','Supprimer les données aberrantes','Réduire le taux d\'apprentissage','Fusionner deux couches',
   'En éteignant une fraction p des neurones à chaque batch, on empêche la co-adaptation et on approxime un ensemble de sous-réseaux.',
   'https://fr.wikipedia.org/wiki/Dropout_(r%C3%A9seaux_neuronaux)'),
 mk('Une époque (epoch) d\'entraînement correspond à…','Un passage complet sur l\'ensemble des données d\'entraînement','Une seule observation','Une mise à jour d\'un poids','Un test final',
   'Les données sont parcourues par mini-batchs ; plusieurs époques sont nécessaires, avec suivi de la perte de validation (early stopping).',
   'https://fr.wikipedia.org/wiki/Apprentissage_profond'),
 mk('La normalisation des features (standardisation) est utile car…','Elle met les variables à la même échelle et accélère la convergence','Elle supprime les étiquettes','Elle crée des données','Elle est interdite en pratique',
   'Centrer-réduire (z = (x−μ)/σ) évite qu\'une variable domine les distances et le gradient ; indispensable pour SVM, k-means, réseaux.',
   'https://fr.wikipedia.org/wiki/Score_standard'),
 mk('L\'AUC-ROC mesure…','La capacité d\'un classifieur à discriminer les classes à tous les seuils','Le temps d\'entraînement','La taille des données','La profondeur d\'un arbre',
   'La courbe ROC trace le taux de vrais positifs contre le taux de faux positifs ; une AUC de 0,5 = hasard, 1 = discrimination parfaite.',
   'https://fr.wikipedia.org/wiki/Courbe_ROC'),
 mk('Le déséquilibre de classes se traite notamment par…','Rééchantillonnage (SMOTE, sous-échantillonnage) ou pondération des classes','Suppression de la classe rare','Augmentation du taux d\'apprentissage','Toujours plus d\'époques',
   'Avec 1 % de positifs, l\'exactitude est trompeuse : on ajuste l\'échantillonnage, les poids de la perte, et on suit rappel/F1/AUC-PR.',
   'https://fr.wikipedia.org/wiki/Apprentissage_automatique'),
 mk('Les données de test doivent…','Rester totalement isolées jusqu\'à l\'évaluation finale','Servir à régler les hyperparamètres','Être vues à chaque époque','Être identiques au train',
   'Toute fuite (data leakage) du test vers l\'entraînement surestime la performance ; les hyperparamètres se règlent sur un jeu de validation.',
   'https://fr.wikipedia.org/wiki/Fuite_de_donn%C3%A9es_(apprentissage_automatique)'),
 mk('Un hyperparamètre est…','Un réglage fixé avant l\'entraînement (taux d\'apprentissage, profondeur…)','Un poids appris','Une donnée d\'entrée','Une prédiction',
   'Contrairement aux paramètres appris (poids), les hyperparamètres se choisissent par recherche en grille, aléatoire ou bayésienne sur la validation.',
   'https://fr.wikipedia.org/wiki/Hyperparam%C3%A8tre'),
 mk('Le transfert d\'apprentissage (transfer learning) consiste à…','Réutiliser un modèle pré-entraîné et l\'adapter à une nouvelle tâche','Copier les données de test','Traduire les étiquettes','Fusionner deux jeux de données',
   'On gèle tout ou partie des couches d\'un modèle pré-entraîné (ImageNet, BERT) puis on affine (fine-tuning) sur la tâche cible, économisant données et calcul.',
   'https://fr.wikipedia.org/wiki/Apprentissage_par_transfert'),
 mk('L\'apprentissage par renforcement optimise…','Une politique qui maximise une récompense cumulée','Une erreur quadratique supervisée','Un clustering','Une ACP',
   'Un agent interagit avec un environnement (états, actions, récompenses) ; Q-learning et policy gradients ont produit AlphaGo et les agents de jeu.',
   'https://fr.wikipedia.org/wiki/Apprentissage_par_renforcement'),
 mk('La rétropropagation (backpropagation) calcule…','Les gradients de la perte par rapport à chaque poids, couche par couche','Les étiquettes manquantes','La matrice de confusion','Le nombre d\'époques',
   'Application de la dérivation en chaîne du dernier vers le premier étage du réseau ; c\'est le cœur de l\'entraînement des réseaux profonds.',
   'https://fr.wikipedia.org/wiki/R%C3%A9tropropagation_du_gradient'),
 mk('Le fléau de la dimension (curse of dimensionality) signifie que…','En haute dimension, les données deviennent éparses et les distances peu informatives','Plus de variables aide toujours','Les calculs deviennent gratuits','Les modèles sont plus stables',
   'Le volume croît exponentiellement avec la dimension : il faut plus de données, ou réduire la dimension (ACP, sélection de variables).',
   'https://fr.wikipedia.org/wiki/Fl%C3%A9au_de_la_dimension'),
 mk('Un SVM (machine à vecteurs de support) cherche…','L\'hyperplan séparateur de marge maximale','Le plus court chemin','Les centroïdes de classes','La moyenne des données',
   'Les vecteurs de support déterminent la frontière ; le « kernel trick » (RBF, polynomial) traite les cas non linéairement séparables.',
   'https://fr.wikipedia.org/wiki/Machine_%C3%A0_vecteurs_de_support'),
 mk('MLOps désigne…','Les pratiques d\'industrialisation des modèles (déploiement, suivi, versionnage)','Un algorithme de clustering','Un type de GPU','Une fonction de perte',
   'Inspiré du DevOps : CI/CD des modèles, monitoring de la dérive des données, reproductibilité, gouvernance — pour passer du notebook à la production.',
   'https://fr.wikipedia.org/wiki/MLOps'),
 mk('La dérive des données (data drift) en production désigne…','Le changement de distribution des données par rapport à l\'entraînement','Un bug de code','Une panne de GPU','Une hausse du F1',
   'Quand la réalité change (comportements, saisons, crises), les performances chutent : il faut surveiller, alerter et ré-entraîner.',
   'https://fr.wikipedia.org/wiki/D%C3%A9rive_conceptuelle'),
] .forEach(x => ml.push(x));
// Paramétrique : exactitude (accuracy) (8)
[[90,10,90],[80,20,80],[45,5,90],[190,10,95],[75,25,75],[60,40,60],[170,30,85],[38,2,95]]
.forEach(([ok, ko, acc]) => ml.push(mk(
  `Un classifieur produit ${ok} prédictions correctes et ${ko} erreurs. Son exactitude (accuracy) est de :`,
  `${acc} %`, `${Math.max(1,acc-15)} %`, `${Math.min(99,acc+5)} %`, `${100-acc} %`,
  `Accuracy = correctes ÷ total = ${ok} ÷ ${ok+ko} = ${acc} %.`,
  'https://fr.wikipedia.org/wiki/Exactitude_et_pr%C3%A9cision')));
// Précision & rappel (12)
[[40,10,80],[30,20,60],[45,5,90],[60,40,60],[70,30,70],[90,10,90]]
.forEach(([vp, fp, p]) => ml.push(mk(
  `Avec ${vp} vrais positifs et ${fp} faux positifs, la précision d'un classifieur est de :`,
  `${p} %`, `${Math.max(1,p-20)} %`, `${Math.min(99,p+9)} %`, `${100-p} %`,
  `Précision = VP ÷ (VP+FP) = ${vp} ÷ ${vp+fp} = ${p} %.`,
  'https://fr.wikipedia.org/wiki/Pr%C3%A9cision_et_rappel')));
[[40,10,80],[30,30,50],[45,15,75],[60,20,75],[70,30,70],[90,30,75]]
.forEach(([vp, fn, r]) => ml.push(mk(
  `Avec ${vp} vrais positifs et ${fn} faux négatifs, le rappel (recall) d'un classifieur est de :`,
  `${r} %`, `${Math.max(1,r-20)} %`, `${Math.min(99,r+9)} %`, `${100-r} %`,
  `Rappel = VP ÷ (VP+FN) = ${vp} ÷ ${vp+fn} = ${r} %.`,
  'https://fr.wikipedia.org/wiki/Pr%C3%A9cision_et_rappel')));
// Paramètres d'une couche dense (6)
[[10,5,55],[20,10,210],[8,4,36],[100,10,1010],[50,20,1020],[30,15,465]]
.forEach(([nin, nout, p]) => ml.push(mk(
  `Une couche dense reliant ${nin} entrées à ${nout} neurones (avec biais) contient combien de paramètres ?`,
  `${F(p)}`, `${F(nin*nout)}`, `${F(p*2)}`, `${F(nin+nout)}`,
  `Paramètres = poids + biais = ${nin}×${nout} + ${nout} = ${F(p)}.`,
  'https://fr.wikipedia.org/wiki/Perceptron_multicouche')));
// Étude de cas rapides (12 rédigées orientées applications)
[
 mk('Pour prédire le rendement agricole à partir de données météo et sol, on utilise typiquement…','Une régression (supervisée, cible continue)','Un clustering','Une base SQL seule','Un tri alphabétique',
   'La cible (t/ha) est continue : régression linéaire, forêts ou boosting ; les features incluent pluie, température, NDVI, intrants.',
   'https://fr.wikipedia.org/wiki/R%C3%A9gression_(statistiques)'),
 mk('Détecter des transactions bancaires frauduleuses est un problème…','De classification très déséquilibrée','De régression simple','De tri','Sans données',
   'Fraudes ≈ <1 % : pondération des classes, AUC-PR, seuils ajustés au coût métier, et vigilance sur la dérive des fraudeurs.',
   'https://fr.wikipedia.org/wiki/D%C3%A9tection_de_fraude'),
 mk('Segmenter la clientèle d\'une banque sans étiquettes préalables relève…','Du clustering (k-means, CAH)','De la classification supervisée','Du renforcement','De la régression logistique',
   'Sans classes prédéfinies, on découvre des groupes homogènes (RFM, comportements) pour cibler les offres.',
   'https://fr.wikipedia.org/wiki/Partitionnement_de_donn%C3%A9es'),
 mk('Prévoir la demande d\'électricité heure par heure est un problème…','De séries temporelles (saisonnalités multiples)','D\'images','De graphe social','De tri de texte',
   'Modèles : SARIMA, Prophet, LSTM/Transformers temporels ; features calendaires et météo ; validation chronologique (pas de mélange du futur).',
   'https://fr.wikipedia.org/wiki/S%C3%A9rie_temporelle'),
] .forEach(x => ml.push(x));

// ---------------- SUIVI-ÉVALUATION (+92) -----------------------------
const se = [];
[
 mk('Le cadre logique d\'un projet articule…','Activités → extrants → effets → impact, avec indicateurs et hypothèses','Uniquement le budget','Les salaires de l\'équipe','La communication seule',
   'La matrice du cadre logique relie la chaîne de résultats aux indicateurs objectivement vérifiables, sources de vérification et hypothèses critiques.',
   'https://fr.wikipedia.org/wiki/Cadre_logique'),
 mk('Un indicateur SMART est…','Spécifique, Mesurable, Atteignable, Réaliste/pertinent, Temporellement défini','Secret, Massif, Aléatoire, Rapide, Total','Toujours qualitatif','Fixé après le projet',
   'La qualité des indicateurs conditionne le suivi : définition claire, source, base de référence (baseline) et cible datée.',
   'https://fr.wikipedia.org/wiki/Objectifs_et_indicateurs_SMART'),
 mk('La différence entre suivi et évaluation est que…','Le suivi est continu (pilotage), l\'évaluation est périodique et porte un jugement','Le suivi vient après l\'évaluation','L\'évaluation est quotidienne','Ils sont identiques',
   'Le suivi renseigne l\'avancement (activités, extrants) ; l\'évaluation apprécie pertinence, efficacité, efficience, impact et durabilité.',
   'https://fr.wikipedia.org/wiki/%C3%89valuation_de_programme'),
 mk('Les critères d\'évaluation du CAD-OCDE (2019) sont…','Pertinence, cohérence, efficacité, efficience, impact, durabilité','Prix, délai, qualité','Entrées, sorties','Forces et faiblesses',
   'Six critères guident les évaluations de l\'aide et des politiques publiques ; la « cohérence » a été ajoutée en 2019.',
   'https://fr.wikipedia.org/wiki/Comit%C3%A9_d%27aide_au_d%C3%A9veloppement'),
 mk('La théorie du changement explicite…','Les mécanismes causaux reliant les interventions aux impacts attendus','Le seul chronogramme','La liste du personnel','Les procédures d\'achat',
   'Elle rend visibles hypothèses et conditions de succès, guide le choix des indicateurs et prépare l\'évaluation d\'impact.',
   'https://fr.wikipedia.org/wiki/Th%C3%A9orie_du_changement'),
 mk('Une baseline (situation de référence) sert à…','Mesurer la situation initiale pour apprécier les changements','Clore le projet','Payer les fournisseurs','Éviter les indicateurs',
   'Sans point de départ documenté, impossible d\'attribuer des progrès ; l\'enquête de base précède le démarrage des activités.',
   'https://fr.wikipedia.org/wiki/%C3%89tude_de_r%C3%A9f%C3%A9rence'),
 mk('L\'évaluation d\'impact cherche à mesurer…','L\'effet causal attribuable à l\'intervention (contrefactuel)','La satisfaction du bailleur','Le taux de décaissement','Le nombre de réunions',
   'Comparer les bénéficiaires à un contrefactuel crédible (ce qui se serait passé sans le projet) : randomisation, différence de différences, appariement…',
   'https://fr.wikipedia.org/wiki/%C3%89valuation_d%27impact'),
 mk('L\'essai contrôlé randomisé (RCT) attribue l\'intervention…','Par tirage au sort entre groupe traité et groupe témoin','Aux plus motivés','Aux zones urbaines seulement','Aux volontaires payés',
   'La randomisation égalise en espérance les caractéristiques observables et inobservables, isolant l\'effet du programme (Banerjee, Duflo, Kremer, Nobel 2019).',
   'https://fr.wikipedia.org/wiki/Essai_randomis%C3%A9_contr%C3%B4l%C3%A9'),
 mk('La méthode des doubles différences (DID) compare…','L\'évolution avant/après des traités à celle des non-traités','Deux moyennes un même jour','Deux enquêteurs','Deux bailleurs',
   'DID = (Après−Avant)traités − (Après−Avant)témoins : élimine les différences fixes et les chocs communs, sous l\'hypothèse de tendances parallèles.',
   'https://fr.wikipedia.org/wiki/Doubles_diff%C3%A9rences'),
 mk('L\'appariement par score de propension (PSM) consiste à…','Comparer des traités et non-traités semblables selon leur probabilité estimée d\'être traités','Trier par ordre alphabétique','Exclure les femmes','Interroger les chefs seulement',
   'Le score de propension résume les covariables ; l\'appariement réduit le biais de sélection observable (mais pas l\'inobservable).',
   'https://fr.wikipedia.org/wiki/Appariement_par_score_de_propension'),
 mk('Le biais de sélection survient quand…','Les bénéficiaires diffèrent systématiquement des non-bénéficiaires','L\'échantillon est aléatoire','Les données sont anonymisées','Le budget est dépassé',
   'Si les plus dynamiques adhèrent au programme, comparer naïvement traités et non-traités surestime l\'effet : d\'où les contrefactuels rigoureux.',
   'https://fr.wikipedia.org/wiki/Biais_de_s%C3%A9lection'),
 mk('Un extrant (output) se distingue d\'un effet (outcome) car…','L\'extrant est le produit direct des activités, l\'effet est le changement chez les bénéficiaires','L\'extrant vient après l\'effet','Ils sont synonymes','L\'effet est budgétaire',
   'Ex. : salles construites (extrant) → scolarisation accrue (effet) → capital humain amélioré (impact).',
   'https://fr.wikipedia.org/wiki/Gestion_ax%C3%A9e_sur_les_r%C3%A9sultats'),
 mk('La gestion axée sur les résultats (GAR) met l\'accent sur…','L\'atteinte de résultats mesurables plutôt que la seule exécution d\'activités','Les procédures uniquement','Les réunions','La communication politique',
   'La GAR aligne planification, budgétisation et suivi sur la chaîne de résultats, avec redevabilité sur les changements obtenus.',
   'https://fr.wikipedia.org/wiki/Gestion_ax%C3%A9e_sur_les_r%C3%A9sultats'),
 mk('Un plan de S&E (suivi-évaluation) précise notamment…','Indicateurs, sources, fréquences, responsables et budget du S&E','Le menu des ateliers','Les slogans','La couleur du logo',
   'Le plan opérationnalise le cadre de résultats : qui collecte quoi, quand, comment, avec quels contrôles qualité et quels produits (tableaux de bord, rapports).',
   'https://fr.wikipedia.org/wiki/Suivi_et_%C3%A9valuation'),
 mk('La collecte par enquête ménage exige…','Un échantillonnage représentatif et des questionnaires testés','Des données inventées','Uniquement des interviews de responsables','Zéro contrôle qualité',
   'Base de sondage, tirage probabiliste, formation des enquêteurs, pré-test et double saisie/contrôles automatiques garantissent la fiabilité.',
   'https://fr.wikipedia.org/wiki/Enqu%C3%AAte_statistique'),
 mk('Le taux d\'exécution budgétaire mesure…','Dépenses réalisées ÷ budget prévu','Le nombre d\'activités','La satisfaction','Les effectifs',
   'Indicateur d\'efficience du pilotage financier ; un taux très faible ou très tardif signale des goulots (passation, trésorerie).',
   'https://fr.wikipedia.org/wiki/Ex%C3%A9cution_budg%C3%A9taire'),
 mk('La désagrégation des indicateurs par sexe, âge ou région sert à…','Révéler les inégalités et cibler les correctifs','Compliquer les rapports','Cacher les écarts','Réduire l\'échantillon',
   'Un taux moyen peut masquer des écarts majeurs ; les ODD exigent des données désagrégées (« ne laisser personne de côté »).',
   'https://fr.wikipedia.org/wiki/Donn%C3%A9es_d%C3%A9sagr%C3%A9g%C3%A9es_par_sexe'),
 mk('L\'évaluation à mi-parcours sert principalement à…','Ajuster la mise en œuvre pendant qu\'il est encore temps','Clôturer les comptes','Licencier l\'équipe','Choisir le logo',
   'Elle vérifie pertinence et premiers effets, identifie les blocages et recommande des réorientations réalistes.',
   'https://fr.wikipedia.org/wiki/%C3%89valuation_de_programme'),
 mk('Le rapport d\'achèvement (fin de projet) documente…','Résultats atteints, leçons apprises et durabilité','Les seules dépenses','Les CV de l\'équipe','Les brouillons',
   'Il capitalise pour les opérations futures : ce qui a marché, pourquoi, à quel coût, et ce qui doit changer.',
   'https://fr.wikipedia.org/wiki/Gestion_de_projet'),
 mk('Les données administratives de routine (registres santé, école) ont pour atout…','Leur disponibilité continue à faible coût','Leur perfection absolue','Leur représentativité garantie','Leur secret',
   'Elles alimentent le suivi en continu mais exigent des contrôles de complétude et de qualité (SNIS, EMIS).',
   'https://fr.wikipedia.org/wiki/Syst%C3%A8me_d%27information_sanitaire'),
] .forEach(x => se.push(x));
// Paramétriques S&E : taux d'atteinte de cible (12)
[[80,100,80],[45,60,75],[120,100,120],[30,40,75],[90,120,75],[150,120,125],[60,80,75],[70,50,140],[55,110,50],[36,48,75],[210,140,150],[18,24,75]]
.forEach(([real, cible, tx]) => se.push(mk(
  `La cible annuelle d'un indicateur est de ${F(cible)} ; la valeur réalisée est de ${F(real)}. Le taux d'atteinte est de :`,
  `${tx} %`, `${Math.max(5,tx-25)} %`, `${tx+20} %`, `${Math.round(cible/real*100)} %`,
  `Taux d'atteinte = réalisé ÷ cible = ${F(real)} ÷ ${F(cible)} = ${tx} %${tx>100?' (cible dépassée)':''}.`,
  'https://fr.wikipedia.org/wiki/Indicateur')));
// Taux d'exécution budgétaire (8)
[[450,600,75],[300,500,60],[720,800,90],[210,300,70],[880,1100,80],[350,700,50],[540,600,90],[125,250,50]]
.forEach(([dep, bud, tx]) => se.push(mk(
  `Budget annuel : ${F(bud)} millions FCFA ; dépenses exécutées : ${F(dep)} millions. Taux d'exécution budgétaire :`,
  `${tx} %`, `${Math.max(5,tx-20)} %`, `${Math.min(140,tx+15)} %`, `${100-tx} %`,
  `Taux = dépenses ÷ budget = ${F(dep)} ÷ ${F(bud)} = ${tx} %.`,
  'https://fr.wikipedia.org/wiki/Ex%C3%A9cution_budg%C3%A9taire')));
// DID simple (8)
[[60,50,45,40,5],[75,60,58,50,7],[90,70,80,65,5],[55,40,42,30,3],[100,80,85,70,5],[68,50,52,40,6],[82,60,66,50,6],[95,70,78,60,7]]
.forEach(([ta, tb, ca, cb, eff]) => se.push(mk(
  `Traités : ${tb} avant, ${ta} après ; témoins : ${cb} avant, ${ca} après. L'effet estimé par doubles différences est de :`,
  `${eff} points`, `${ta-tb} points`, `${ca-cb} points`, `${eff*2} points`,
  `DID = (${ta}−${tb}) − (${ca}−${cb}) = ${ta-tb} − ${ca-cb} = ${eff} points.`,
  'https://fr.wikipedia.org/wiki/Doubles_diff%C3%A9rences')));

// ------- HISTOIRE, TRAVAIL, SANTÉ & ÉDUCATION (+100) ------------------
const hist = [];
[
 mk('En quelle année le Togo a-t-il accédé à l\'indépendance ?','1960 (le 27 avril)','1957','1975','1946',
   'Le Togo devient indépendant le 27 avril 1960, Sylvanus Olympio en devient le premier président.',
   'https://fr.wikipedia.org/wiki/Togo'),
 mk('Avant 1914, le Togo était une colonie…','Allemande (le « Togoland »)','Portugaise','Belge','Espagnole',
   'Protectorat allemand dès 1884, le Togoland est partagé après la Première Guerre mondiale entre mandats français et britannique.',
   'https://fr.wikipedia.org/wiki/Togoland'),
 mk('L\'Organisation Internationale du Travail (OIT) a été créée en…','1919 (traité de Versailles)','1945','1960','1889',
   'L\'OIT, tripartite (États, employeurs, travailleurs), fixe des normes internationales du travail ; elle rejoint l\'ONU en 1946.',
   'https://fr.wikipedia.org/wiki/Organisation_internationale_du_travail'),
 mk('Le travail décent selon l\'OIT combine…','Emploi productif, droits au travail, protection sociale et dialogue social','Salaire minimum seulement','Travail sans contrat','Heures illimitées',
   'L\'Agenda du travail décent (1999) structure aussi l\'ODD 8 : croissance inclusive et emplois de qualité.',
   'https://fr.wikipedia.org/wiki/Travail_d%C3%A9cent'),
 mk('Le secteur informel se caractérise par…','Des activités non enregistrées, sans protection sociale complète','Des multinationales','Des emplois publics','Des exportations high-tech',
   'Majoritaire dans l\'emploi ouest-africain, il échappe largement à l\'impôt et à la sécurité sociale ; la formalisation est un défi clé.',
   'https://fr.wikipedia.org/wiki/Secteur_informel'),
 mk('L\'OMS définit la santé comme…','Un état complet de bien-être physique, mental et social','La seule absence de maladie','La performance sportive','La richesse',
   'Préambule de la Constitution de l\'OMS (1946) : la santé dépasse l\'absence de maladie ou d\'infirmité.',
   'https://fr.wikipedia.org/wiki/Organisation_mondiale_de_la_sant%C3%A9'),
 mk('La couverture sanitaire universelle (CSU) vise…','L\'accès de tous à des services de santé de qualité sans difficultés financières','La gratuité des voitures','La privatisation totale','Les seuls fonctionnaires',
   'Cible 3.8 des ODD : services essentiels + protection contre les dépenses catastrophiques de santé (au Togo : programme WEZOU, INAM…).',
   'https://fr.wikipedia.org/wiki/Couverture_sanitaire_universelle'),
 mk('Le taux de mortalité infantile mesure les décès…','D\'enfants de moins d\'un an pour 1 000 naissances vivantes','Des moins de 18 ans','Des nouveau-nés seulement le 1ᵉʳ jour','Des mères',
   'Indicateur sensible du développement sanitaire ; la mortalité des moins de 5 ans (juvénilo-infantile) est aussi suivie par les ODD.',
   'https://fr.wikipedia.org/wiki/Mortalit%C3%A9_infantile'),
 mk('L\'espérance de vie à la naissance représente…','Le nombre moyen d\'années qu\'un nouveau-né vivrait aux conditions de mortalité actuelles','L\'âge maximal observé','L\'âge médian de décès garanti','La durée de retraite',
   'Indicateur synthétique de mortalité ; il entre dans le calcul de l\'IDH (dimension santé).',
   'https://fr.wikipedia.org/wiki/Esp%C3%A9rance_de_vie'),
 mk('Le taux net de scolarisation primaire rapporte…','Les enfants d\'âge scolaire inscrits au primaire à la population de cet âge','Tous les inscrits à la population totale','Les enseignants aux élèves','Les écoles aux villages',
   'Contrairement au taux brut (qui inclut les hors-âge), le taux net mesure l\'accès des enfants d\'âge officiel.',
   'https://fr.wikipedia.org/wiki/Taux_de_scolarisation'),
 mk('L\'alphabétisation des adultes désigne la capacité…','À lire, écrire et comprendre un texte simple de la vie courante','À utiliser un smartphone','À parler plusieurs langues','À compter jusqu\'à 100 seulement',
   'Suivie par l\'UNESCO (15 ans et +) ; l\'alphabétisation conditionne productivité, santé et participation citoyenne.',
   'https://fr.wikipedia.org/wiki/Alphab%C3%A9tisation'),
 mk('Le ratio élèves/enseignant est un indicateur…','Des conditions d\'encadrement pédagogique','Du salaire des enseignants','Du budget de l\'État','De la taille des classes physiques uniquement',
   'Un ratio élevé dégrade les apprentissages ; les normes nationales et l\'UNESCO guident les cibles de recrutement.',
   'https://fr.wikipedia.org/wiki/Rapport_%C3%A9l%C3%A8ves-enseignant'),
 mk('La transition démographique décrit le passage…','De forte natalité/mortalité à faible natalité/mortalité','De la ville à la campagne','Du franc au dollar','De l\'agriculture à la pêche',
   'La baisse de la mortalité précède celle de la fécondité, générant une phase de forte croissance démographique — enjeu du dividende démographique africain.',
   'https://fr.wikipedia.org/wiki/Transition_d%C3%A9mographique'),
 mk('Le dividende démographique est possible quand…','La part des actifs augmente relativement aux dépendants, avec emplois et capital humain','La population vieillit','La fécondité explose','Les jeunes émigrent tous',
   'La fenêtre s\'ouvre avec la baisse de la fécondité ; elle ne profite qu\'avec éducation, santé et création d\'emplois.',
   'https://fr.wikipedia.org/wiki/Dividende_d%C3%A9mographique'),
 mk('Le salaire minimum au Togo est appelé…','Le SMIG (salaire minimum interprofessionnel garanti)','Le SMIC','Le RSA','Le per diem',
   'Le SMIG togolais, révisé notamment en 2012 puis récemment, fixe le plancher légal des salaires du secteur formel.',
   'https://fr.wikipedia.org/wiki/Salaire_minimum'),
 mk('La protection sociale contributive repose sur…','Les cotisations des travailleurs et employeurs (assurances sociales)','Les seuls impôts','Les dons privés','Le microcrédit',
   'Pensions, maladie, risques professionnels : financés par cotisations (CNSS, INAM au Togo) ; les filets sociaux non contributifs complètent.',
   'https://fr.wikipedia.org/wiki/Protection_sociale'),
 mk('Le programme togolais de transferts monétaires déployé pendant la COVID-19 s\'appelait…','Novissi','Wezou','Agrisef','Ecobank+',
   'Novissi (2020) a versé des transferts mobiles aux travailleurs informels affectés, salué pour son ciblage numérique innovant.',
   'https://fr.wikipedia.org/wiki/Novissi'),
 mk('La pyramide des âges d\'un pays jeune a une forme…','De base large et de sommet étroit','De colonne régulière','Inversée','De losange parfait',
   'Une base large traduit une forte natalité ; la pyramide togolaise illustre la jeunesse de la population ouest-africaine.',
   'https://fr.wikipedia.org/wiki/Pyramide_des_%C3%A2ges'),
 mk('La traite négrière transatlantique a particulièrement marqué la côte du golfe du Bénin, surnommée…','La « Côte des Esclaves »','La Côte d\'Ivoire','La Côte d\'Or','La Côte des Épices',
   'Du XVIIᵉ au XIXᵉ siècle, les ports d\'Aného, Ouidah et Lagos furent des points d\'embarquement majeurs de la traite.',
   'https://fr.wikipedia.org/wiki/C%C3%B4te_des_Esclaves'),
 mk('Les indépendances africaines francophones ont majoritairement eu lieu en…','1960 (« année de l\'Afrique »)','1945','1975','1990',
   'Dix-sept États africains, dont le Togo, accèdent à l\'indépendance en 1960.',
   'https://fr.wikipedia.org/wiki/Ann%C3%A9e_de_l%27Afrique'),
] .forEach(x => hist.push(x));
// Paramétriques : taux démographiques (12)
[[40,1000,4],[25,1000,2.5],[30,1500,2],[60,2000,3],[45,1500,3],[80,2000,4],[35,700,5],[90,3000,3],[50,2500,2],[70,3500,2],[55,1100,5],[24,800,3]]
.forEach(([d, n, t]) => hist.push(mk(
  `Une localité enregistre ${d} décès pour ${F(n)} habitants dans l'année. Le taux brut de mortalité est de :`,
  `${String(t).replace('.', ',')} %`, `${String(t*2).replace('.', ',')} %`, `${String(t/2).replace('.', ',')} %`, `${d} pour 100`,
  `Taux = décès ÷ population = ${d} ÷ ${F(n)} = ${String(t).replace('.', ',')} % (soit ${t*10} ‰).`,
  'https://fr.wikipedia.org/wiki/Taux_de_mortalit%C3%A9')));
[[120,150,80],[90,120,75],[200,250,80],[60,100,60],[180,200,90],[75,125,60],[210,300,70],[135,150,90]]
.forEach(([insc, pop, tx]) => hist.push(mk(
  `Sur ${F(pop)} enfants d'âge scolaire, ${F(insc)} sont inscrits à l'école primaire. Le taux net de scolarisation est de :`,
  `${tx} %`, `${Math.max(5,tx-20)} %`, `${Math.min(100,tx+15)} %`, `${100-tx} %`,
  `Taux net = inscrits d'âge officiel ÷ population d'âge scolaire = ${F(insc)} ÷ ${F(pop)} = ${tx} %.`,
  'https://fr.wikipedia.org/wiki/Taux_de_scolarisation')));
[[30,1000,3],[45,1500,3],[60,1200,5],[25,500,5],[80,4000,2],[36,900,4],[100,2500,4],[63,2100,3]]
.forEach(([nais, pop, t]) => hist.push(mk(
  `Une région compte ${F(nais)} naissances vivantes pour ${F(pop)} habitants dans l'année. Taux brut de natalité :`,
  `${t} %`, `${t*2} %`, `${Math.max(1,t-2)} %`, `${nais} pour 100`,
  `Taux = naissances ÷ population = ${F(nais)} ÷ ${F(pop)} = ${t} % (soit ${t*10} ‰).`,
  'https://fr.wikipedia.org/wiki/Taux_de_natalit%C3%A9')));
// Ratio élèves/enseignant (8)
[[400,10,40],[350,7,50],[600,12,50],[280,8,35],[450,9,50],[330,11,30],[500,10,50],[240,6,40]]
.forEach(([el, en, r]) => hist.push(mk(
  `Une école compte ${F(el)} élèves pour ${en} enseignants. Le ratio élèves/enseignant est de :`,
  `${r}`, `${r*2}`, `${Math.round(r/2)}`, `${en}`,
  `Ratio = élèves ÷ enseignants = ${F(el)} ÷ ${en} = ${r} élèves par enseignant.`,
  'https://fr.wikipedia.org/wiki/Rapport_%C3%A9l%C3%A8ves-enseignant')));

module.exports = { ml, se, hist };
