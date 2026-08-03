// =====================================================================
// mooc-data3.js — MOOC QPC (v2.40) — partie 3/3
// =====================================================================
window.MOOC_DATA = Object.assign(window.MOOC_DATA || {}, {

"IA, LLM et Agents intelligents": {
  icon: "🤖",
  tagline: "Des transformers aux agents outillés : comprendre, utiliser et encadrer l'IA générative.",
  duree: "≈ 2 h 30",
  objectifs: [
    "Situer IA, machine learning et IA générative",
    "Comprendre le transformer : tokens, embeddings, attention",
    "Maîtriser le cycle de vie d'un LLM : pré-entraînement, SFT, RLHF",
    "Pratiquer prompting, RAG et fine-tuning à bon escient",
    "Concevoir des agents (outils, planification) et gérer risques et gouvernance"
  ],
  lecons: [
    { titre: "Panorama : de l'IA aux LLM", duree: "18 min",
      blocs: [
        { t: "c", titre: "Emboîtements", tx: "IA (systèmes exécutant des tâches « intelligentes ») ⊃ machine learning (apprendre depuis les données plutôt que des règles codées) ⊃ deep learning (réseaux de neurones profonds) ⊃ IA générative (produire texte, image, audio) dont les LLM (grands modèles de langage). Un LLM apprend une tâche d'apparence banale — prédire le token suivant — dont émergent, à grande échelle, des capacités de raisonnement, de synthèse et de code." },
        { t: "c", titre: "Tokens et embeddings", tx: "Le texte est découpé en tokens (sous-mots, ≈ 3-4 caractères en moyenne en anglais, souvent plus coûteux pour les langues moins dotées) ; chaque token devient un vecteur (embedding) qui capture des proximités sémantiques. La fenêtre de contexte — le nombre de tokens que le modèle « voit » à la fois — borne la mémoire de travail d'une conversation." },
        { t: "e", titre: "Cas d'usage au Togo", tx: "Rédaction administrative assistée, résumé de rapports, traduction éwé/kabiyè-français (qualité variable selon les corpus), appui à l'analyse de données d'enquêtes, tutorat éducatif, pré-diagnostic agricole par photo. La contrainte n'est plus l'accès au modèle mais la qualité des données locales et la vérification humaine." },
        { t: "p", titre: "Le LLM ne « sait » pas", tx: "Il génère la suite la plus plausible statistiquement : sans vérification, il peut produire des affirmations fausses avec aplomb (hallucinations) — références inventées, chiffres plausibles mais faux. Réflexe : demander les sources, recouper, et fournir les documents de référence (RAG) pour ancrer les réponses." }
      ],
      retenir: [
        "IA ⊃ ML ⊃ DL ⊃ IA générative ⊃ LLM",
        "Prédiction du token suivant + échelle ⇒ capacités émergentes",
        "Fenêtre de contexte = mémoire de travail bornée",
        "Hallucination : plausible ≠ vrai — toujours vérifier"
      ],
      refs: ["Russell S. & Norvig P., Artificial Intelligence: A Modern Approach, Pearson", "Vaswani et al., « Attention Is All You Need », NeurIPS 2017 (arxiv.org/abs/1706.03762)"] },
    { titre: "Sous le capot : le transformer", duree: "20 min",
      blocs: [
        { t: "c", titre: "L'attention", tx: "Le mécanisme d'attention calcule, pour chaque token, des poids de pertinence vers les autres tokens du contexte (requêtes Q, clés K, valeurs V ; softmax(QKᵀ/√d)·V). L'attention multi-têtes apprend plusieurs types de relations en parallèle (syntaxe, coréférence, thème). Empilés en couches avec des réseaux feed-forward et des connexions résiduelles, ces blocs forment le transformer (Vaswani et al., 2017)." },
        { t: "c", titre: "Générer, régler, décoder", tx: "En inférence, le modèle produit une distribution de probabilité sur le vocabulaire, token par token (auto-régressif). Les réglages de décodage arbitrent créativité/fiabilité : température (aplatie ou aiguise la distribution), top-p (échantillonner dans le noyau de probabilité cumulée), pénalités de répétition. Température basse pour l'extraction factuelle, plus haute pour l'idéation." },
        { t: "f", titre: "Lois d'échelle", tx: "Les performances croissent régulièrement avec paramètres, données et calcul (scaling laws de Kaplan 2020) ; Chinchilla (Hoffmann 2022) montre qu'à budget de calcul fixé, il faut équilibrer taille du modèle ET volume de données (≈ 20 tokens par paramètre) — beaucoup de modèles étaient sous-entraînés en données." },
        { t: "p", titre: "Contexte long ≠ compréhension garantie", tx: "Même avec de très longues fenêtres, l'information « perdue au milieu » du contexte est moins bien exploitée (effet lost-in-the-middle) : placer les éléments critiques au début ou à la fin du prompt, et structurer les documents fournis." }
      ],
      retenir: [
        "Attention : softmax(QKᵀ/√d)·V ; multi-têtes = relations multiples",
        "Décodage : température, top-p — régler selon la tâche",
        "Chinchilla : équilibrer paramètres et tokens d'entraînement",
        "Structurer les prompts longs (début/fin > milieu)"
      ],
      refs: ["Vaswani et al., 2017 (arxiv.org/abs/1706.03762)", "Hoffmann et al., « Training Compute-Optimal LLMs » (Chinchilla), 2022 (arxiv.org/abs/2203.15556)", "Jurafsky D. & Martin J., Speech and Language Processing, 3e éd. (web.stanford.edu/~jurafsky/slp3)"] },
    { titre: "Du texte brut à l'assistant : entraîner et spécialiser", duree: "22 min",
      blocs: [
        { t: "c", titre: "Trois étages", tx: "(1) Pré-entraînement : prédire le token suivant sur d'immenses corpus — le modèle de base « complète » mais ne « converse » pas. (2) Fine-tuning supervisé (SFT) : exemples instruction→réponse pour apprendre le format assistant. (3) Alignement par préférences : RLHF (récompense apprise des préférences humaines + optimisation type PPO) ou DPO, plus simple et direct sur les paires préférées/rejetées. S'y ajoutent les approches type IA constitutionnelle (règles explicites guidant l'auto-critique)." },
        { t: "m", titre: "Spécialiser à moindre coût", tx: "Fine-tuning complet = coûteux ; LoRA/QLoRA n'entraînent que de petites matrices adaptatrices (souvent <1 % des paramètres) sur un modèle quantifié — spécialisation possible sur une seule carte GPU. La quantification (16→8→4 bits) réduit mémoire et coût d'inférence avec une perte de qualité maîtrisée." },
        { t: "m", titre: "Prompting et RAG avant tout", tx: "Ordre économique des solutions : (1) meilleur prompt (rôle, contraintes, exemples few-shot, format de sortie) ; (2) RAG — indexer ses documents (embeddings + base vectorielle), récupérer les passages pertinents et les fournir au modèle : réponses SOURCÉES et à jour sans réentraînement ; (3) fine-tuning seulement pour styliser/formater ou distiller une tâche récurrente. Le RAG n'apprend rien au modèle : il l'ANCRE." },
        { t: "e", titre: "Assistant fiscal togolais", tx: "Indexer CGI, LPF et circulaires OTR ; à chaque question, récupérer les articles pertinents et exiger la citation des passages. Le même modèle sans RAG risque de citer des articles inexistants ; avec RAG + vérification humaine, il devient un accélérateur de recherche documentaire fiable." }
      ],
      retenir: [
        "Base → SFT → RLHF/DPO : compléter → obéir → préférer",
        "LoRA/QLoRA + quantification : spécialisation frugale",
        "Escalade : prompt → RAG → fine-tuning (dans cet ordre)",
        "RAG = ancrage documentaire, pas apprentissage"
      ],
      refs: ["Ouyang et al., « Training LMs to Follow Instructions » (InstructGPT), 2022", "Rafailov et al., « Direct Preference Optimization », 2023 (arxiv.org)", "Lewis et al., « Retrieval-Augmented Generation », 2020 (arxiv.org/abs/2005.11401)", "Hu et al., « LoRA », 2021 (arxiv.org/abs/2106.09685)"] },
    { titre: "Agents, évaluation et gouvernance", duree: "22 min",
      blocs: [
        { t: "c", titre: "Qu'est-ce qu'un agent ?", tx: "Un LLM + des OUTILS (recherche, code, API, bases) + une BOUCLE (percevoir → raisonner → agir → observer) + une mémoire de travail. Patrons : ReAct (alterner raisonnement et actions), function calling (le modèle émet des appels structurés JSON), planification puis exécution, multi-agents spécialisés (rédacteur/critique/vérificateur). Le protocole MCP standardise la connexion des outils et sources de données aux modèles." },
        { t: "m", titre: "Évaluer sérieusement", tx: "Benchmarks généraux (MMLU, HumanEval pour le code…) utiles mais saturables et contaminables : rien ne remplace une évaluation SUR SA TÂCHE — jeu de tests métier, grille de notation, LLM-juge recoupé par des humains, tests adversariaux (injections de prompt). Mesurer aussi coût, latence et taux d'hallucination, pas seulement la « qualité moyenne »." },
        { t: "c", titre: "Risques et cadre", tx: "Risques : hallucinations, biais des corpus, fuite de données confidentielles (prompts envoyés à des tiers), injection de prompt via contenus externes, dépendance et déqualification. Gouvernance : classification des cas d'usage par risque (esprit de l'AI Act européen), supervision humaine des décisions sensibles, journalisation, minimisation des données personnelles, souveraineté (modèles ouverts hébergés localement quand la confidentialité l'exige)." },
        { t: "e", titre: "Agent d'appui au S&E", tx: "Un agent outillé : lit les rapports d'activités (RAG), interroge la base des indicateurs (SQL), calcule les taux d'exécution (code), rédige le brouillon du rapport trimestriel avec citations — et s'arrête là : la validation reste humaine. Gain : des heures de compilation ; garde-fou : traçabilité de chaque chiffre." },
        { t: "p", titre: "L'autonomie se mérite", tx: "Donner à un agent des droits d'écriture (envoyer, payer, supprimer) sans validation humaine ni sandbox est prématuré dans la plupart des contextes : commencer en lecture seule, élargir avec les preuves de fiabilité (journaux, taux d'erreur)." }
      ],
      retenir: [
        "Agent = LLM + outils + boucle + mémoire ; MCP standardise les outils",
        "Évaluer sur SA tâche : jeu de tests, adversarial, coût/latence",
        "Approche par risques : supervision humaine des cas sensibles",
        "Droits d'action progressifs, journalisés, sandboxés"
      ],
      refs: ["Yao et al., « ReAct », 2022 (arxiv.org/abs/2210.03629)", "Règlement européen sur l'IA (AI Act) — texte final (eur-lex.europa.eu)", "Anthropic — Model Context Protocol (modelcontextprotocol.io)", "NIST AI Risk Management Framework (nist.gov)"] }
  ],
  refsGlobales: [
    "Jurafsky & Martin, Speech and Language Processing, 3e éd. en ligne (gratuit)",
    "Cours CS324 (Stanford) et CS25 Transformers — pages publiques",
    "arxiv.org — les papiers cités (1706.03762, 2005.11401, 2106.09685…)",
    "Hugging Face — cours et documentation (huggingface.co/learn)"
  ]
},

"Machine learning et deep learning": {
  icon: "🧠",
  tagline: "Régression, arbres, réseaux : entraîner des modèles qui généralisent — et savoir les évaluer.",
  duree: "≈ 2 h 30",
  objectifs: [
    "Formuler un problème ML : supervisé/non supervisé, features, cible",
    "Maîtriser le compromis biais-variance et la validation croisée",
    "Choisir et lire les métriques (précision, rappel, F1, AUC, RMSE)",
    "Comprendre les modèles clés : linéaires, arbres, forêts, boosting, réseaux",
    "Éviter les pièges : fuite de données, déséquilibre, dérive, surapprentissage"
  ],
  lecons: [
    { titre: "Poser le problème et préparer les données", duree: "20 min",
      blocs: [
        { t: "c", titre: "Supervisé ou non", tx: "Supervisé : une cible à prédire — régression (valeur continue : rendement, prix) ou classification (catégorie : défaut/remboursement). Non supervisé : structurer sans cible — clustering (k-means : segmenter des exploitations), réduction de dimension (ACP). Le choix découle de la QUESTION métier et de la disponibilité d'étiquettes fiables." },
        { t: "m", titre: "Préparation : 80 % du travail", tx: "Nettoyage (doublons, valeurs aberrantes), traitement des manquants (imputation raisonnée, jamais silencieuse), encodage des catégorielles (one-hot, ordinal), normalisation pour les modèles sensibles à l'échelle (k-NN, SVM, réseaux), création de variables métier (ratios, saisonnalité). Documenter chaque transformation : la reproductibilité est une exigence scientifique ET réglementaire." },
        { t: "e", titre: "Scoring de crédit d'un SFD togolais", tx: "Cible : défaut à 12 mois (1/0). Features : historique de remboursement, régularité mobile money, secteur, saison, zone. Piège immédiat : n'utiliser QUE l'information disponible AU MOMENT de la décision — inclure le comportement postérieur au prêt serait une fuite de données (leakage) qui gonfle artificiellement la performance." },
        { t: "p", titre: "Garbage in, garbage out", tx: "Aucun algorithme ne rattrape des étiquettes fausses ou une cible mal définie (défaut = 30 ou 90 jours de retard ?). Passer plus de temps sur la définition de la cible et la qualité des données que sur le choix du modèle : c'est contre-intuitif et systématiquement gagnant." }
      ],
      retenir: [
        "Régression vs classification vs clustering : partir de la question",
        "Fuite de données = performance illusoire : n'utiliser que l'info disponible à la décision",
        "Normaliser pour les modèles à distance ; encoder proprement",
        "La qualité de la cible prime sur l'algorithme"
      ],
      refs: ["Géron A., Hands-On Machine Learning, O'Reilly (3e éd.)", "scikit-learn — guide utilisateur (scikit-learn.org)"] },
    { titre: "Généraliser : biais-variance et validation", duree: "20 min",
      blocs: [
        { t: "c", titre: "Le compromis central", tx: "Erreur = biais² + variance + bruit. Modèle trop simple : biais élevé (sous-apprentissage, mauvais partout). Trop complexe : variance élevée (surapprentissage : parfait sur l'entraînement, mauvais en production). Signature du surapprentissage : écart large entre performance train et test. Remèdes : plus de données, régularisation, features plus simples, arrêt précoce." },
        { t: "m", titre: "Découper proprement", tx: "Train (apprendre) / validation (régler les hyperparamètres) / test (verdict FINAL, touché une seule fois). Validation croisée k-fold : k rotations pour une estimation robuste sur petits jeux. Données temporelles : découpage CHRONOLOGIQUE obligatoire (entraîner sur le passé, tester sur le futur) — mélanger les dates est une fuite temporelle." },
        { t: "f", titre: "Régularisation", tx: "Pénaliser la complexité : Ridge (L2, rétrécit les coefficients), Lasso (L1, en annule — sélection de variables), elastic net (mixte). Dans les réseaux : dropout, weight decay, augmentation de données. Le paramètre de pénalité se règle sur la VALIDATION, jamais sur le test." },
        { t: "p", titre: "Le test n'est pas un terrain d'essai", tx: "Régler le modèle en regardant le test à répétition revient à surapprendre le test : la performance annoncée ne tiendra pas en production. Discipline : le test reste sous scellés jusqu'au choix final." }
      ],
      retenir: [
        "Sous-appr. = biais ; sur-appr. = variance (écart train/test)",
        "Train/val/test + k-fold ; chronologique pour les séries",
        "L1 (Lasso) sélectionne ; L2 (Ridge) rétrécit",
        "Le test ne sert qu'UNE fois"
      ],
      refs: ["Hastie T., Tibshirani R. & Friedman J., The Elements of Statistical Learning (gratuit : hastie.su.domains/ElemStatLearn)", "James G. et al., An Introduction to Statistical Learning (statlearning.com, gratuit)"] },
    { titre: "Évaluer : les bonnes métriques", duree: "20 min",
      blocs: [
        { t: "f", titre: "Classification", tx: "Matrice de confusion → exactitude (trompeuse si classes déséquilibrées), précision = VP/(VP+FP) (fiabilité des alertes), rappel = VP/(VP+FN) (couverture des vrais cas), F1 = moyenne harmonique. Courbe ROC et AUC : capacité à ordonner les cas ; courbe précision-rappel préférable en fort déséquilibre. Le SEUIL de décision se choisit selon les coûts métier des erreurs." },
        { t: "f", titre: "Régression", tx: "MAE (erreur absolue moyenne, robuste, lisible dans l'unité), RMSE (pénalise les grosses erreurs), R² (part de variance expliquée — peut être négatif hors échantillon !), MAPE (pourcentage, instable près de zéro). Comparer TOUJOURS à une base naïve (moyenne, persistance) : un modèle qui ne la bat pas n'apporte rien." },
        { t: "e", titre: "Dépistage de la mosaïque du manioc", tx: "Prévalence 5 % : un classifieur « tout sain » atteint 95 % d'exactitude et rate TOUS les cas. Ce qui compte : rappel élevé (ne pas rater de plants malades) au prix de fausses alertes acceptables — seuil abaissé, métrique pilote = rappel puis précision, jamais l'exactitude brute." },
        { t: "p", titre: "Métrique unique = vision borgne", tx: "Optimiser une seule métrique déforme le système (loi de Goodhart). Suivre un tableau : performance globale, par sous-groupes (équité régionale, genre), calibration des probabilités, et coût réel des erreurs." }
      ],
      retenir: [
        "Déséquilibre ⇒ précision/rappel/F1 et PR-curve, pas l'exactitude",
        "Seuil = décision métier (coût des FP vs FN)",
        "Régression : MAE/RMSE + base naïve obligatoire",
        "Évaluer aussi par sous-groupes (équité) et en calibration"
      ],
      refs: ["scikit-learn — model evaluation (scikit-learn.org/stable/modules/model_evaluation.html)", "Provost F. & Fawcett T., Data Science for Business, O'Reilly"] },
    { titre: "Des arbres aux réseaux profonds", duree: "25 min",
      blocs: [
        { t: "c", titre: "Modèles d'ensemble", tx: "Arbre de décision : lisible mais instable. Forêt aléatoire (bagging + features aléatoires) : robuste, peu de réglages, excellente base de départ. Gradient boosting (XGBoost, LightGBM, CatBoost) : arbres séquentiels corrigeant les erreurs — l'état de l'art sur données TABULAIRES, souvent devant le deep learning à coût bien moindre." },
        { t: "c", titre: "Réseaux de neurones", tx: "Neurone = combinaison linéaire + activation non linéaire (ReLU) ; l'empilement approxime des fonctions arbitraires ; apprentissage par rétropropagation du gradient (Adam, mini-batchs). Architectures par nature de données : CNN pour les images, RNN/LSTM historiques pour les séquences — largement supplantés par les transformers ; le transfert d'apprentissage (modèle pré-entraîné affiné) rend l'image et le texte accessibles avec peu de données." },
        { t: "e", titre: "Choisir selon les données", tx: "Tabulaire (crédit, rendements, churn) : boosting d'abord. Images (maladies foliaires, imagerie satellitaire des cultures) : CNN pré-entraîné affiné. Texte (plaintes, rapports) : transformer pré-entraîné. Peu d'étiquettes : transfert, augmentation, ou méthodes plus simples — le deep from scratch exige volume et calcul." },
        { t: "p", titre: "Explicabilité et production", tx: "Un score de crédit doit être explicable (SHAP, importance des variables) pour être audité et contesté. Et le déploiement n'est pas la fin : surveiller la DÉRIVE des données (les distributions changent — saison, crise), versionner données/modèles, prévoir le réentraînement. Un modèle non surveillé se dégrade en silence." }
      ],
      retenir: [
        "Tabulaire : gradient boosting = référence ; forêt = base solide",
        "Images/texte : transfert d'apprentissage avant tout",
        "SHAP/importances : explicabilité exigible (crédit, public)",
        "Production : surveiller dérive, versionner, réentraîner"
      ],
      refs: ["Géron A., Hands-On Machine Learning, O'Reilly", "Chen T. & Guestrin C., « XGBoost », KDD 2016", "Lundberg S. & Lee S.-I., « SHAP », NeurIPS 2017", "Goodfellow I., Bengio Y. & Courville A., Deep Learning, MIT Press (deeplearningbook.org, gratuit)"] }
  ],
  refsGlobales: [
    "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning — statlearning.com (PDF gratuit)",
    "Géron A., Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow, O'Reilly",
    "Goodfellow, Bengio & Courville, Deep Learning — deeplearningbook.org (gratuit)",
    "scikit-learn.org et kaggle.com/learn pour pratiquer"
  ]
},

"Topographie, génie civil et architecture": {
  icon: "📐",
  tagline: "Mesurer la terre, dimensionner les structures, concevoir les bâtiments : les fondamentaux du BTP.",
  duree: "≈ 2 h 30",
  objectifs: [
    "Maîtriser les mesures topographiques : nivellement, angles, distances, GNSS",
    "Lire et produire plans et dessins techniques (échelles, coupes, DAO)",
    "Comprendre la RDM : efforts, contraintes, flexion, dimensionnement",
    "Connaître béton, aciers et dosages normalisés",
    "Situer le foncier togolais et le cycle d'un projet de construction"
  ],
  lecons: [
    { titre: "Topographie : mesurer et représenter le terrain", duree: "22 min",
      blocs: [
        { t: "c", titre: "Les mesures de base", tx: "Nivellement direct : différence d'altitude = lecture arrière − lecture avant, cheminement fermé contrôlé par la tolérance de fermeture. Angles horizontaux/verticaux au théodolite ; distances au ruban, stadimétrie ou distancemètre électronique (station totale). Le GNSS différentiel (RTK) donne le centimètre en planimétrie — indispensable pour les grands levés et le cadastre." },
        { t: "f", titre: "Calculs usuels", tx: "Pente (%) = 100·Δh/D horizontale. Gisement d'une direction : angle depuis le nord, sens horaire (0-400 grades ou 0-360°). Surface d'un polygone par coordonnées (formule de Gauss/du lacet) : S = ½|Σ(xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|. Coordonnées rattachées à la projection UTM (le Togo : zone 31 N, ellipsoïde WGS84)." },
        { t: "e", titre: "Lever une parcelle à Tsévié", tx: "Polygonale fermée autour de la parcelle (station totale), calcul des coordonnées, fermeture angulaire et linéaire dans les tolérances, surface par Gauss, plan à l'échelle 1/500 avec bornes. Le plan alimente le dossier de titre foncier — la précision du levé conditionne la sécurité juridique." },
        { t: "p", titre: "Précision ≠ exactitude", tx: "Des mesures répétées très groupées (précises) peuvent être toutes fausses (biais d'étalonnage, mauvais point de référence). Contrôler : fermer les cheminements, mesurer en double, rattacher à des repères connus (bornes géodésiques)." }
      ],
      retenir: [
        "Nivellement : Δh = arrière − avant ; contrôler la fermeture",
        "Surface de Gauss : S = ½|Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|",
        "Togo : UTM zone 31 N / WGS84 ; RTK pour le centimètre",
        "Toujours fermer, doubler, rattacher"
      ],
      refs: ["Milles S. & Lagofun J., Topographie et topométrie modernes, Eyrolles", "Duquenne F. et al., GPS : localisation et navigation par satellites, Hermès"] },
    { titre: "Dessin technique et conception architecturale", duree: "20 min",
      blocs: [
        { t: "c", titre: "Le langage du plan", tx: "Échelles courantes : 1/50 (plans d'exécution), 1/100 (permis), 1/200-1/500 (masse et situation). Vues normalisées : plan (coupe horizontale à ~1 m), coupes verticales, façades, détails. Conventions : traits forts (vu/coupé), fins (arêtes vues), interrompus (caché), cotation en millimètres dans le bâtiment, niveaux en mètres (±0,00 au rez)." },
        { t: "c", titre: "De la planche au BIM", tx: "DAO 2D (AutoCAD et équivalents) pour les plans ; modélisation 3D paramétrique BIM (Revit, ArchiCAD) : une maquette numérique unique porte géométrie, matériaux, quantitatifs et se coordonne entre corps d'état — les collisions (gaine contre poutre) se détectent AVANT le chantier. Les quantitatifs extraits alimentent devis et marchés." },
        { t: "e", titre: "Concevoir pour le climat tropical", tx: "À Lomé : orienter pour limiter l'ensoleillement est-ouest direct, ventilation traversante, débords de toiture et brise-soleil, inertie modérée, protection contre les pluies battantes et remontées d'humidité (soubassements). La conception bioclimatique réduit la climatisation — premier poste de consommation des bâtiments tertiaires." },
        { t: "p", titre: "Le beau plan qui ne se construit pas", tx: "Un plan sans cotes complètes, sans coupes cohérentes ou ignorant les trames de structure engendre improvisations de chantier et surcoûts. La règle : chaque élément dessiné doit pouvoir être localisé, coté et exécuté sans deviner." }
      ],
      retenir: [
        "Échelles : 1/50 exécution, 1/100 permis, 1/500 masse",
        "Cotes en mm ; niveaux en m ; conventions de traits",
        "BIM : maquette unique, détection de collisions, quantitatifs",
        "Bioclimatique tropical : orientation, ventilation, protections solaires"
      ],
      refs: ["Neufert E., Les éléments des projets de construction, Dunod (la « bible »)", "Norme NF EN ISO 128 (dessin technique) — afnor.org", "Liébard A. & De Herde A., Traité d'architecture et d'urbanisme bioclimatiques, Le Moniteur"] },
    { titre: "Résistance des matériaux : dimensionner", duree: "25 min",
      blocs: [
        { t: "f", titre: "Contraintes et sollicitations", tx: "Contrainte normale σ = N/A (traction/compression) ; cisaillement τ = V/A. Flexion simple : σ = M·y/I — la contrainte croît avec le moment M et la distance y à la fibre neutre, décroît avec l'inertie I (rectangle : I = bh³/12 — doubler la HAUTEUR multiplie l'inertie par 8). Flèche d'une poutre sur deux appuis, charge répartie : f = 5qL⁴/(384EI) — la portée à la puissance 4 !" },
        { t: "f", titre: "Diagrammes N, V, M", tx: "Isoler la structure, calculer les réactions d'appui (ΣF = 0, ΣM = 0), tracer effort normal, tranchant et moment fléchissant. Poutre biappuyée, charge répartie q : réactions qL/2, moment maxi qL²/8 à mi-portée, tranchant maxi qL/2 aux appuis. Ces trois diagrammes guident TOUT le ferraillage : aciers longitudinaux où M est grand, cadres où V est grand." },
        { t: "e", titre: "Poutre de véranda", tx: "Portée 4 m, charge 10 kN/m : M = 10×16/8 = 20 kN·m aux alentours de mi-portée, V = 20 kN aux appuis. En béton armé : aciers tendus en fibre INFÉRIEURE à mi-travée (le béton ne reprend pas la traction), cadres resserrés près des appuis. Sur appui continu, le moment s'inverse : aciers en fibre supérieure — l'oubli classique qui fissure les linteaux." },
        { t: "p", titre: "Le flambement des poteaux", tx: "Un poteau élancé cède par instabilité AVANT d'atteindre la résistance du matériau : charge critique d'Euler Pcr = π²EI/L² (à conditions d'appuis près). Réduire l'élancement (section, longueur de flambement, contreventement) — un poteau « assez résistant » peut flamber quand même." }
      ],
      retenir: [
        "σ = N/A ; flexion σ = My/I ; I rectangle = bh³/12",
        "Biappuyée + q : Mmax = qL²/8 ; Vmax = qL/2 ; flèche ∝ L⁴",
        "Aciers côté TENDU : bas en travée, haut sur appui",
        "Flambement d'Euler : Pcr = π²EI/L²"
      ],
      refs: ["Mott R. / ouvrages RDM niveau BTS-Licence (Dunod)", "Eurocode 2 (EN 1992) — calcul des structures en béton", "Renaud H., Ouvrages en béton armé, Foucher"] },
    { titre: "Béton, chantier et foncier togolais", duree: "22 min",
      blocs: [
        { t: "m", titre: "Béton : composition et dosages", tx: "Béton = ciment + sable + gravier + eau (+ adjuvants). Dosages usuels : 150 kg/m³ (propreté), 250 (fondations légères), 300-350 kg/m³ (béton armé courant : poteaux, poutres, dalles). Rapport eau/ciment ≈ 0,45-0,5 : TROP d'eau = résistance effondrée et fissuration. Résistance visée fc28 (à 28 jours) ; essais d'affaissement (ouvrabilité) et écrasement d'éprouvettes contrôlent la qualité. Cure humide indispensable sous climat chaud." },
        { t: "c", titre: "Aciers et mise en œuvre", tx: "Aciers haute adhérence (fe E400/500) : section calculée, enrobage (2,5-3 cm courant, plus en milieu agressif/littoral) contre la corrosion, longueurs de recouvrement respectées. Vibrer le béton (chasser l'air), coffrages étanches et étayés, décoffrage aux délais. La malfaçon type : béton « maigre » + enrobage insuffisant + absence de cure — triple peine de durabilité." },
        { t: "e", titre: "Le foncier au Togo", tx: "Code foncier et domanial (loi de 2018) : immatriculation et titre foncier (inattaquable), procédures d'accès, domaine public/privé de l'État, reconnaissance encadrée des droits coutumiers. Chaîne sécurisée : levé topographique → bornage contradictoire → immatriculation → titre — puis permis de construire avant travaux. Les litiges fonciers encombrent les juridictions : la formalisation est un enjeu économique majeur (garantie de crédit, investissement)." },
        { t: "p", titre: "L'économie du projet", tx: "Le coût d'un ouvrage se joue en CONCEPTION (études géotechniques, optimisation structurale, choix des matériaux) : modifier un plan coûte des heures d'étude, modifier un chantier coûte des millions. Études insuffisantes → avenants, retards, contentieux — le lien direct avec la leçon marchés publics." }
      ],
      retenir: [
        "BA courant : 300-350 kg/m³ ; E/C ≈ 0,45-0,5 ; cure humide",
        "Enrobage + recouvrements + vibration = durabilité",
        "Togo : loi foncière 2018 — titre foncier après immatriculation",
        "Investir dans les études : le chantier n'est pas le lieu des choix"
      ],
      refs: ["Dreux G. & Festa J., Nouveau guide du béton et de ses constituants, Eyrolles", "Code foncier et domanial du Togo (loi n° 2018-005)", "CEB-FIP / Eurocodes — normes de calcul"] }
  ],
  refsGlobales: [
    "Neufert, Les éléments des projets de construction, Dunod",
    "Dreux & Festa, Nouveau guide du béton, Eyrolles",
    "Milles & Lagofun, Topographie et topométrie modernes, Eyrolles",
    "Eurocodes (afnor.org) ; Code foncier togolais 2018 ; OTR/DGID pour la fiscalité foncière"
  ]
},

"Sciences sociales et politiques": {
  icon: "🗳️",
  tagline: "Sociologie, science politique et institutions : comprendre les sociétés pour agir dessus.",
  duree: "≈ 2 h",
  objectifs: [
    "Maîtriser les fondateurs et concepts : Durkheim, Weber, Bourdieu",
    "Analyser socialisation, stratification et mobilité",
    "Comprendre État, démocratie, décentralisation et politiques publiques",
    "Connaître les institutions togolaises et régionales",
    "Lire une enquête sociale : méthodes quanti/quali et leurs limites"
  ],
  lecons: [
    { titre: "Les fondateurs et leurs outils", duree: "20 min",
      blocs: [
        { t: "c", titre: "Durkheim : le fait social", tx: "Étudier les faits sociaux « comme des choses » : extérieurs aux individus, contraignants, généraux. Le Suicide (1897) : les taux varient avec l'intégration et la régulation sociales (anomie) — démonstration fondatrice que le plus intime est socialement structuré. Solidarité mécanique (similitude) → organique (division du travail)." },
        { t: "c", titre: "Weber : comprendre l'action", tx: "Sociologie compréhensive : saisir le SENS visé par les acteurs. Idéaltypes ; légitimités traditionnelle, charismatique, légale-rationnelle (la bureaucratie moderne) ; L'Éthique protestante : les idées religieuses comme affinités électives avec l'esprit du capitalisme. L'État : monopole de la violence physique légitime sur un territoire." },
        { t: "c", titre: "Bourdieu : capitaux et reproduction", tx: "Capital économique, culturel, social (+ symbolique) ; habitus (dispositions incorporées) ; champs (espaces de lutte à règles propres). L'école, loin d'être neutre, convertit l'héritage culturel en mérite scolaire : la reproduction des positions se pare de légitimité. Outils précieux pour lire les inégalités d'accès (éducation, administration, marchés)." },
        { t: "e", titre: "Appliquer au Togo", tx: "Tontines : solidarités et contrôle social (Durkheim) ; chefferie traditionnelle et État moderne : pluralité des légitimités (Weber) ; réussite scolaire selon le capital culturel familial et la langue parlée à la maison : Bourdieu opérationnalisé par les enquêtes MICS/EHCVM." }
      ],
      retenir: [
        "Durkheim : fait social, intégration/régulation, anomie",
        "Weber : sens, idéaltypes, 3 légitimités, État = violence légitime",
        "Bourdieu : capitaux, habitus, reproduction scolaire",
        "Croiser les trois regards sur un même objet"
      ],
      refs: ["Durkheim É., Les règles de la méthode sociologique ; Le Suicide", "Weber M., Économie et société ; Le savant et le politique", "Bourdieu P. & Passeron J.-C., La Reproduction, Minuit"] },
    { titre: "Socialisation, stratification, mobilité", duree: "18 min",
      blocs: [
        { t: "c", titre: "Devenir social", tx: "Socialisation primaire (famille) et secondaire (école, pairs, travail, médias, religion) ; différenciée selon le genre et le milieu. Elle n'est pas un formatage : marges d'écart, resocialisations (migration, conversion, formation professionnelle) — mais les dispositions précoces pèsent durablement." },
        { t: "c", titre: "Stratification et mobilité", tx: "Classes (Marx : rapport à la production), strates multidimensionnelles (Weber : classe, statut, parti), catégories statistiques (CSP). Mobilité sociale : intergénérationnelle (par rapport aux parents) mesurée par les tables de mobilité — distinguer mobilité STRUCTURELLE (l'économie change la place des emplois) et nette (fluidité réelle). L'école et l'urbanisation sont les grands ascenseurs — quand ils fonctionnent." },
        { t: "e", titre: "Informalité et statuts au Togo", tx: "La majorité de l'emploi est informel : les CSP classiques saisissent mal apprentis, aides familiaux, pluriactifs. Les enquêtes (ERI-ESI) adaptent les nomenclatures — leçon de méthode : les catégories sont des CONSTRUITS à interroger avant de commenter les chiffres." },
        { t: "p", titre: "Méritocratie à interroger", tx: "Attribuer les positions au seul mérite individuel occulte les inégalités de départ (capital culturel, réseaux, genre). L'égalité des CHANCES se mesure : probabilité d'accès aux positions selon l'origine — pas au discours." }
      ],
      retenir: [
        "Socialisations primaire/secondaire, différenciées",
        "Mobilité : lire les tables, séparer structurel et net",
        "Catégories statistiques = constructions à expliciter",
        "Égalité des chances : un indicateur, pas un slogan"
      ],
      refs: ["Lahire B., Dans les plis singuliers du social, La Découverte", "Merllié D. & Prévot J., La mobilité sociale, La Découverte", "INSEED — enquêtes emploi/conditions de vie (inseed.tg)"] },
    { titre: "État, démocratie et institutions togolaises", duree: "20 min",
      blocs: [
        { t: "c", titre: "L'État et ses formes", tx: "État : territoire + population + autorité souveraine ; État de droit : soumission de la puissance publique au droit, juge indépendant, hiérarchie des normes. Régimes : présidentiel (séparation rigide), parlementaire (gouvernement responsable devant l'assemblée), semi-présidentiel. La démocratie ne se réduit pas aux élections : libertés, contre-pouvoirs, alternance possible, redevabilité." },
        { t: "e", titre: "Institutions togolaises", tx: "La révision constitutionnelle de 2024 fait passer le Togo à un régime de type parlementaire : le président de la République (rôle essentiellement représentatif) est élu par le Parlement ; l'exécutif est dirigé par le président du Conseil des ministres, chef de la majorité parlementaire. Assemblée nationale et Sénat (bicamérisme), Cour constitutionnelle, Cour suprême, Cour des comptes, HAAC pour l'audiovisuel ; décentralisation relancée : communes dirigées par des maires élus (élections locales de 2019)." },
        { t: "c", titre: "Politiques publiques", tx: "Cycle : mise à l'agenda → formulation → décision → mise en œuvre → évaluation (boucle avec le S&E !). Acteurs : administrations, élus, bailleurs, société civile, secteur privé. Concepts : fenêtre d'opportunité (Kingdon), coalitions de cause, dépendance au sentier — pourquoi les réformes réussies épousent le contexte au lieu de copier des modèles." },
        { t: "p", titre: "Institutions formelles ≠ règles réelles", tx: "Entre le texte et la pratique s'intercalent normes sociales, arrangements et capacités administratives. Analyser un secteur exige les DEUX niveaux : le droit ET les pratiques (North : institutions formelles et informelles)." }
      ],
      retenir: [
        "État de droit : normes hiérarchisées + juge indépendant",
        "Togo 2024 : régime parlementaire, bicamérisme, décentralisation communale",
        "Cycle des politiques publiques : agenda → évaluation",
        "Toujours croiser règles formelles et pratiques"
      ],
      refs: ["Constitution togolaise révisée (2024) — journal officiel", "Braud P., Sociologie politique, LGDJ", "Kingdon J., Agendas, Alternatives and Public Policies, Longman"] },
    { titre: "Enquêter : méthodes et esprit critique", duree: "18 min",
      blocs: [
        { t: "m", titre: "Quanti et quali", tx: "Questionnaire sur échantillon (représentativité, marges d'erreur — cf. domaine statistiques) pour MESURER ; entretiens semi-directifs, focus groups, observation (participante ou non) pour COMPRENDRE les logiques d'acteurs ; méthodes mixtes pour trianguler. Le choix suit la question : « combien ? » vs « comment/pourquoi ? »." },
        { t: "m", titre: "Qualité d'une enquête", tx: "Vigilances : formulation neutre des questions (pas de double négation, pas d'induction), ordre des questions, effet enquêteur (langue, genre, statut), désirabilité sociale (sur-déclaration du « bien »), taux et biais de non-réponse. Éthique : consentement éclairé, anonymisation, restitution aux enquêtés." },
        { t: "e", titre: "Sondage d'opinion à Lomé", tx: "Interroger 300 passants du centre-ville ne représente ni Lomé ni le Togo (biais de sélection urbain, horaire, langue). Un échantillonnage probabiliste stratifié (zones de dénombrement, grappes, pondérations) coûte plus cher — c'est le prix de la validité. Se méfier des « sondages » en ligne autosélectionnés." },
        { t: "p", titre: "Le chiffre ne parle pas seul", tx: "Un taux de chômage « bas » avec un sous-emploi massif, une « hausse de la criminalité » qui reflète une hausse des DÉPÔTS DE PLAINTE : derrière chaque indicateur, une convention de mesure. Toujours demander : qui a compté, quoi, comment ?" }
      ],
      retenir: [
        "Quanti mesure, quali explique, mixte triangule",
        "Biais : formulation, enquêteur, désirabilité, non-réponse",
        "Représentativité = échantillonnage probabiliste + pondération",
        "Interroger la convention derrière chaque chiffre"
      ],
      refs: ["Quivy R. & Van Campenhoudt L., Manuel de recherche en sciences sociales, Dunod", "Singly F. (de), Le questionnaire, A. Colin", "Beaud S. & Weber F., Guide de l'enquête de terrain, La Découverte"] }
  ],
  refsGlobales: [
    "Quivy & Van Campenhoudt, Manuel de recherche en sciences sociales, Dunod",
    "Braud P., Sociologie politique, LGDJ",
    "Textes fondamentaux togolais (constitution révisée, lois de décentralisation)",
    "Afrobarometer (afrobarometer.org) — données d'opinion comparées africaines"
  ]
},

"Histoire, travail, santé et éducation": {
  icon: "🏥",
  tagline: "Le capital humain dans l'histoire : marché du travail, systèmes de santé et d'éducation.",
  duree: "≈ 2 h",
  objectifs: [
    "Relier grandes phases historiques et transformations économiques",
    "Analyser le marché du travail : emploi, chômage, informalité, salaire",
    "Comprendre l'économie de la santé : financement, CSU, externalités",
    "Maîtriser l'économie de l'éducation : rendements, qualité, arbitrages",
    "Situer les politiques togolaises : School Assur, CSU, filets sociaux"
  ],
  lecons: [
    { titre: "Repères d'histoire économique", duree: "18 min",
      blocs: [
        { t: "c", titre: "Révolutions industrielles", tx: "1re (vapeur, textile, ~1780-1850), 2e (électricité, chimie, moteur, ~1870-1914), 3e (électronique, informatique, ~1970-), 4e en débat (numérique ubiquitaire, IA). Chaque vague redistribue emplois et puissances — la croissance moderne (>1 %/an soutenu) est une anomalie historique récente (Maddison) : des siècles de quasi-stagnation l'ont précédée." },
        { t: "c", titre: "Mondialisations et Afrique", tx: "Première mondialisation (1870-1914) : commerce, migrations, capitaux — et colonisation : économies africaines orientées vers l'extraction (cultures de rente, chemins de fer côte-intérieur). Indépendances (1960) : États développeurs, puis ajustement structurel (années 1980 : stabilisation, libéralisation, privatisations — bilan social contesté), puis stratégies de réduction de la pauvreté et émergence (années 2000+)." },
        { t: "e", titre: "Trajectoire togolaise", tx: "Économie coloniale : phosphates, café-cacao, port ; après 1960 : investissements publics, période d'ajustement et crise sociopolitique des années 1990 (suspension de coopérations), reprise institutionnelle et d'investissement dans les années 2010-2020 (port, logistique, agropoles, feuille de route gouvernementale). Lire le présent exige cette profondeur : les structures héritées contraignent les choix." },
        { t: "p", titre: "Éviter l'anachronisme", tx: "Juger les politiques d'hier avec les données et valeurs d'aujourd'hui mène au contresens : replacer chaque choix dans son contexte informationnel et institutionnel — ce qui n'interdit pas le bilan critique (l'ajustement structurel a été RÉVISÉ par ses promoteurs mêmes)." }
      ],
      retenir: [
        "Croissance soutenue = phénomène récent (Maddison)",
        "Extraversion coloniale → dépendances structurelles durables",
        "Ajustement 1980s : stabilisation réussie, coûts sociaux élevés",
        "Contextualiser avant de juger"
      ],
      refs: ["Maddison A., L'économie mondiale : une perspective millénaire, OCDE", "Cooper F., L'Afrique depuis 1940, Payot", "Banque mondiale, L'ajustement en Afrique (bilans revisités)"] },
    { titre: "Le marché du travail, entre normes et informalité", duree: "20 min",
      blocs: [
        { t: "c", titre: "Catégories BIT", tx: "Actifs = occupés + chômeurs (sans emploi, disponibles, en recherche). Hors main-d'œuvre : étudiants, découragés (halo). Sous-emploi : temps partiel subi, surqualification. Dans les pays à forte informalité, le chômage OUVERT est bas (on ne peut pas se permettre de chômer) : les bons thermomètres sont le sous-emploi et la qualité de l'emploi." },
        { t: "c", titre: "Salaires et segmentation", tx: "Théories : capital humain (Becker — salaire lié à la productivité acquise), signal (Spence — le diplôme trie), segmentation (marchés primaire protégé / secondaire précaire), salaire d'efficience (payer plus pour motiver et retenir). SMIG, conventions collectives et cotisations structurent le segment formel ; l'informel s'ajuste par les revenus." },
        { t: "e", titre: "Politiques d'emploi togolaises", tx: "Dispositifs d'insertion des jeunes (volontariat national, appuis à l'entrepreneuriat, formation duale type apprentissage rénové), mécanismes de garantie pour l'accès au crédit des jeunes et femmes. L'évaluation (cf. S&E) départage : l'aide à l'entrepreneuriat + formation + suivi fait mieux que la formation seule dans la plupart des études africaines." },
        { t: "p", titre: "Formaliser par décret ne marche pas", tx: "L'informalité répond aux coûts/bénéfices de la formalisation (impôts, cotisations vs protection, marchés publics, crédit). La bascule vient d'un PAQUET incitatif (simplification type TPU, protection sociale portable, accès aux marchés) — pas des sanctions seules." }
      ],
      retenir: [
        "Chômage bas ≠ marché sain : regarder sous-emploi et informalité",
        "Capital humain vs signal : deux lectures du diplôme",
        "Évaluations : accompagnement intégré > formation isolée",
        "Formalisation = équation coûts/bénéfices du micro-entrepreneur"
      ],
      refs: ["Becker G., Human Capital, Chicago UP", "BIT — Indicateurs clés du marché du travail (ilo.org)", "Blattman C. & Ralston L., revue des programmes emploi/entrepreneuriat (documents de travail)"] },
    { titre: "Économie de la santé et couverture universelle", duree: "20 min",
      blocs: [
        { t: "c", titre: "Pourquoi la santé n'est pas un marché ordinaire", tx: "Asymétrie d'information radicale (le soignant sait, le patient non — demande induite possible), incertitude (on ne choisit pas de tomber malade), externalités (vaccination, maladies transmissibles), aléa moral et antisélection en assurance. Conclusion d'Arrow (1963) : l'intervention publique et l'assurance obligatoire ne sont pas des anomalies mais des réponses à la nature du bien." },
        { t: "c", titre: "Financer : les trois dimensions de la CSU", tx: "Couverture sanitaire universelle = population couverte × panier de services × protection financière (cube OMS). Sources : impôt, cotisations, paiements directs — ces derniers étant les plus régressifs (dépenses catastrophiques, renoncement aux soins). Objectif : réduire le paiement direct sous ~20 % des dépenses de santé, mutualiser le reste." },
        { t: "e", titre: "Le Togo vers la CSU", tx: "School Assur (assurance des élèves du public), INAM (agents publics), puis loi d'assurance maladie universelle (2021) déployée par phases avec la CNSS/INAM : immatriculation, panier de soins, contributions différenciées (secteur formel cotisant, subventions pour les vulnérables). Défis classiques : identifier les vulnérables (registres sociaux), qualité de l'offre, viabilité financière." },
        { t: "p", titre: "Couvrir ≠ soigner", tx: "Une carte d'assurance sans médicaments, personnels ni plateaux techniques ne protège pas : la CSU exige d'investir SIMULTANÉMENT dans l'offre (RH santé, chaîne d'approvisionnement, qualité) et la demande (assurance). L'un sans l'autre échoue." }
      ],
      retenir: [
        "Arrow 1963 : information + incertitude ⇒ assurance et régulation",
        "CSU : population × services × protection financière",
        "Paiement direct = source la plus régressive à réduire",
        "Assurance ET offre de soins : les deux jambes"
      ],
      refs: ["Arrow K., « Uncertainty and the Welfare Economics of Medical Care », AER, 1963", "OMS, Rapport sur la santé dans le monde 2010 (who.int)", "Loi togolaise sur l'assurance maladie universelle (2021) — textes officiels"] },
    { titre: "Économie de l'éducation : investir dans les personnes", duree: "18 min",
      blocs: [
        { t: "f", titre: "Rendements de l'éducation", tx: "Équation de Mincer : ln(salaire) = α + β·années d'études + expérience… — β ≈ 8-10 %/année en moyenne mondiale, souvent plus élevé pour le primaire dans les pays pauvres et pour les filles. Rendements privés (salaires) ET sociaux (santé des enfants, fécondité choisie, civisme, croissance) : l'éducation des filles est l'un des investissements au rendement social le plus documenté." },
        { t: "c", titre: "De l'accès aux apprentissages", tx: "Les scolarisations ont explosé ; la crise est désormais celle de la QUALITÉ : « pauvreté des apprentissages » (Banque mondiale : forte proportion d'enfants de 10 ans ne lisant pas un texte simple). Leviers probants (évaluations rigoureuses) : enseigner au NIVEAU RÉEL de l'enfant (remédiation ciblée, TaRL), pédagogies structurées avec guides, temps d'instruction effectif, implication des parents — les intrants seuls (bâtiments, manuels non utilisés) déçoivent." },
        { t: "e", titre: "PASEC et politiques togolaises", tx: "Les évaluations PASEC (CONFEMEN) mesurent lecture/maths en début et fin de primaire dans les pays francophones : elles situent le Togo et guident les réformes (formation continue des maîtres, cantines scolaires — assiduité —, gratuité et School Assur — barrières financières). La donnée d'apprentissage devient l'instrument central de pilotage." },
        { t: "p", titre: "Années d'école ≠ apprentissages", tx: "Compter les années scolarisées surestime le capital humain si la qualité est faible : les « années d'école ajustées des apprentissages » (LAYS) corrigent — et changent les classements. Piloter sur les acquis, pas seulement sur les effectifs." }
      ],
      retenir: [
        "Mincer : ~8-10 %/année ; rendements sociaux majeurs (filles !)",
        "Crise des apprentissages : enseigner au niveau de l'enfant (TaRL)",
        "PASEC : la mesure francophone de référence",
        "LAYS : ajuster les années par la qualité"
      ],
      refs: ["Psacharopoulos G. & Patrinos H., « Returns to Investment in Education », World Bank", "Banque mondiale, World Development Report 2018 — Learning", "PASEC/CONFEMEN — pasec.confemen.org", "Banerjee & Duflo, Repenser la pauvreté, Seuil (chap. éducation)"] }
  ],
  refsGlobales: [
    "Banque mondiale, WDR 2018 (éducation) et rapports CSU (worldbank.org)",
    "BIT (ilo.org) — travail ; OMS (who.int) — santé ; PASEC (pasec.confemen.org)",
    "Cooper F., L'Afrique depuis 1940, Payot",
    "INSEED et ministères sectoriels togolais — annuaires statistiques"
  ]
},

"Culture générale et environnement": {
  icon: "🌍",
  tagline: "Climat, biodiversité, ODD, énergie : l'économie de l'environnement pour citoyens éclairés.",
  duree: "≈ 2 h",
  objectifs: [
    "Maîtriser les concepts : externalités, biens communs, soutenabilité",
    "Comprendre le changement climatique : mécanismes, GIEC, accords",
    "Analyser les instruments : taxe carbone, marchés de quotas, normes",
    "Situer les enjeux togolais : érosion côtière, énergie, déchets, forêts",
    "Connaître ODD, financements climat et adaptation"
  ],
  lecons: [
    { titre: "L'économie de l'environnement : concepts fondateurs", duree: "18 min",
      blocs: [
        { t: "c", titre: "Externalités et communs", tx: "La pollution est une externalité négative : coût social > coût privé, le marché produit « trop ». Les ressources communes (pêcheries, nappes, pâturages) : rivales mais difficiles à clôturer — « tragédie des communs » (Hardin) SI aucune règle ; Ostrom montre que des communautés gèrent durablement leurs communs par des règles auto-organisées (frontières claires, sanctions graduées, contrôle mutuel)." },
        { t: "c", titre: "Soutenabilité faible ou forte", tx: "Faible : les capitaux (naturel, physique, humain) sont substituables — épuiser du naturel se compense en machines et savoirs. Forte : un capital naturel CRITIQUE (climat stable, biodiversité, cycles de l'eau) n'a pas de substitut — d'où seuils et limites planétaires (Rockström). Le débat commande les politiques : compenser ou préserver." },
        { t: "e", titre: "La côte togolaise", tx: "L'érosion côtière (renforcée par la montée des eaux et les infrastructures portuaires régionales) grignote plusieurs mètres de littoral par an par endroits : routes, maisons, sites économiques menacés. Programme régional WACA (Banque mondiale) : ouvrages de protection, rechargements, planification côtière — un cas d'école d'adaptation et de coopération transfrontalière (Togo-Bénin)." },
        { t: "p", titre: "PIB vert ou PIB aveugle", tx: "Le PIB compte la reconstruction après catastrophe comme production mais ignore la perte du capital naturel : un pays peut « croître » en s'appauvrissant écologiquement. Compléments : épargne nette ajustée, comptabilité du capital naturel (WAVES), indicateurs de bien-être." }
      ],
      retenir: [
        "Externalité : coût social ≠ privé ⇒ marché défaillant",
        "Ostrom : les communs se gouvernent (règles, sanctions, contrôle)",
        "Soutenabilité forte : capital naturel critique non substituable",
        "Compléter le PIB : épargne nette ajustée, capital naturel"
      ],
      refs: ["Ostrom E., Governing the Commons, Cambridge UP", "Hardin G., « The Tragedy of the Commons », Science, 1968", "Banque mondiale — programme WACA (worldbank.org)"] },
    { titre: "Climat : science, négociations, trajectoires", duree: "20 min",
      blocs: [
        { t: "c", titre: "Ce que dit le GIEC", tx: "Réchauffement sans équivoque d'origine humaine (GES : CO2, méthane, N2O) ; +1,1-1,3 °C déjà atteints vs préindustriel ; chaque dixième compte (extrêmes, rendements, niveau marin). Budgets carbone : pour limiter à 1,5-2 °C, les émissions mondiales doivent culminer puis décroître rapidement vers le net-zéro (~2050 pour 1,5 °C)." },
        { t: "c", titre: "L'architecture de Paris (2015)", tx: "Accord de Paris : limiter « bien en dessous de 2 °C », poursuivre 1,5 °C ; contributions déterminées au niveau national (CDN) révisées à la hausse par cycles ; transparence ; financement des pays développés vers les pays en développement (objectif 100 Md$/an, renégocié à la hausse) ; fonds pertes et préjudices (COP27/28). Principe : responsabilités communes mais différenciées." },
        { t: "e", titre: "Le Togo dans la négociation", tx: "Émissions togolaises par habitant très faibles (fraction de tonne de CO2 énergétique) mais forte VULNÉRABILITÉ (côte, agriculture pluviale, chaleur). La CDN togolaise combine atténuation conditionnelle (électrification solaire, foyers améliorés, reboisement — objectif de couverture forestière) et adaptation prioritaire — financée en partie par les fonds climat (FVC, FEM, Fonds d'adaptation)." },
        { t: "p", titre: "Atténuation ET adaptation", tx: "Pour les pays à faibles émissions, l'adaptation (protéger les vies et les actifs) prime sans dispenser de saisir les opportunités d'atténuation (solaire moins cher que le thermique, économies de carburant). Opposer les deux est un faux débat budgétaire : beaucoup d'actions servent les deux (agroforesterie)." }
      ],
      retenir: [
        "GIEC : origine humaine sans équivoque ; budgets carbone",
        "Paris : CDN nationales + transparence + finance climat",
        "Togo : émetteur marginal, très vulnérable ⇒ adaptation prioritaire",
        "Chercher les co-bénéfices atténuation/adaptation"
      ],
      refs: ["GIEC, 6e rapport d'évaluation — résumés pour décideurs (ipcc.ch)", "CCNUCC — Accord de Paris (unfccc.int)", "CDN du Togo — registre CCNUCC"] },
    { titre: "Instruments : prix du carbone, normes, paiements", duree: "20 min",
      blocs: [
        { t: "m", titre: "Donner un prix au carbone", tx: "Taxe carbone (prix fixé, quantité incertaine) vs marché de quotas plafonné (quantité fixée, prix variable — SEQE européen) : les deux internalisent l'externalité au moindre coût global en égalisant les coûts marginaux de réduction. Acceptabilité : redistribuer les recettes (chèques, baisse d'autres taxes) — la leçon des expériences contestées." },
        { t: "m", titre: "Normes, subventions, PSE", tx: "Normes (efficacité énergétique, interdictions) : simples, moins coût-efficaces mais sûres ; subventions vertes (solaire, foyers améliorés) : attention aux effets d'aubaine ; paiements pour services environnementaux (rémunérer la forêt sur pied, REDD+) : conditionnalité et mesure (télédétection) décisives ; mécanismes d'ajustement carbone aux frontières (CBAM européen) : impact sur les exportateurs africains à anticiper." },
        { t: "e", titre: "Panier togolais réaliste", tx: "Tarifs et taxes sur carburants (signal-prix implicite), normes d'importation des véhicules et équipements, électrification solaire (CIZO, centrales type Blitta), gestion des déchets de Lomé, reboisement avec sécurisation foncière, protection côtière. L'économie politique (qui gagne, qui perd, quand) décide du succès autant que le design technique." },
        { t: "p", titre: "La double contrainte énergie-développement", tx: "Accès universel à une énergie fiable (ODD 7) ET trajectoire sobre : le solaire décentralisé + réseaux renforcés répondent aux deux au meilleur coût actuel — mais exigent financement initial et maintenance. Sous-investir dans l'énergie coûte plus cher que tout instrument climatique." }
      ],
      retenir: [
        "Taxe (prix sûr) vs quotas (quantité sûre) : même logique d'internalisation",
        "Recycler les recettes = clé d'acceptabilité",
        "PSE/REDD+ : payer la conservation, mesurer par satellite",
        "CBAM : anticiper pour les filières exportatrices"
      ],
      refs: ["Nordhaus W. (Nobel 2018), The Climate Casino, Yale UP", "Banque mondiale, State and Trends of Carbon Pricing (annuel)", "Union européenne — règlement CBAM (eur-lex.europa.eu)"] },
    { titre: "ODD, biodiversité et culture du développement durable", duree: "18 min",
      blocs: [
        { t: "c", titre: "L'agenda 2030", tx: "17 ODD, 169 cibles, adoptés en 2015 : pauvreté, faim, santé, éducation, genre, eau, énergie, travail, infrastructures, inégalités, villes, consommation, climat, océans, terres, paix/institutions, partenariats. Universels (tous pays), intégrés (synergies ET arbitrages : nourrir sans déboiser), suivis par indicateurs — le S&E à l'échelle planétaire, décliné dans les plans nationaux (feuille de route Togo)." },
        { t: "c", titre: "Biodiversité : l'autre urgence", tx: "Effondrement documenté (IPBES) : usage des terres, surexploitation, climat, pollutions, espèces invasives. Cadre mondial Kunming-Montréal (2022) : protéger 30 % terres/mers d'ici 2030, restaurer, réformer les subventions néfastes. En Afrique de l'Ouest : forêts sacrées, aires protégées (Fazao-Malfakassa, Togodo), mangroves — capital écologique ET touristique." },
        { t: "e", titre: "Économie circulaire à Lomé", tx: "Déchets : collecte, tri, valorisation (compost pour le maraîchage périurbain, plastiques recyclés en pavés), assainissement du lac Bè… L'économie circulaire crée des emplois locaux tout en réduisant pollutions et importations de matières — quand les filières aval (débouchés du compost, normes des pavés) sont organisées." },
        { t: "p", titre: "Greenwashing et esprit critique", tx: "« Neutre en carbone », « 100 % naturel » : vérifier périmètre (scopes 1-2-3), additionnalité des compensations, certifications indépendantes. La culture générale environnementale, c'est d'abord savoir poser ces trois questions." }
      ],
      retenir: [
        "ODD : universels, intégrés, mesurés — arbitrages à expliciter",
        "Kunming-Montréal : 30×30, restauration, subventions réformées",
        "Circulaire : déchets = gisement d'emplois et d'intrants",
        "Greenwashing : périmètre, additionnalité, certification"
      ],
      refs: ["Nations unies — sdgs.un.org (ODD et indicateurs)", "IPBES, Évaluation mondiale de la biodiversité (ipbes.net)", "CDB — cadre Kunming-Montréal (cbd.int)", "PNUE — rapports économie circulaire (unep.org)"] }
  ],
  refsGlobales: [
    "GIEC (ipcc.ch) et IPBES (ipbes.net) — les synthèses scientifiques de référence",
    "Nordhaus W., The Climate Casino ; Ostrom E., Governing the Commons",
    "Nations unies — sdgs.un.org ; CCNUCC — unfccc.int",
    "Ministère togolais de l'environnement — CDN, stratégies nationales"
  ]
}

});
