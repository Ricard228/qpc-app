// =====================================================================
// data_extra_v230f.js — v2.30 : DEUX NOUVEAUX DOMAINES INTÉGRÉS
//   1. « IA, LLM et Agents intelligents » (120 q)
//   2. « Topographie, génie civil et architecture » (120 q)
// =====================================================================

const { mk, F } = require('./data_extra_v230b.js');

const IA_NAME  = 'IA, LLM et Agents intelligents';
const BTP_NAME = 'Topographie, génie civil et architecture';

// ---------------- IA / LLM / AGENTS (120) ----------------------------
const ia = [];
[
 mk('Que signifie le sigle LLM ?','Large Language Model (grand modèle de langage)','Local Learning Machine','Linear Logic Module','Long Life Memory',
   'Les LLM (GPT, Claude, Gemini, Llama…) sont des réseaux de neurones entraînés sur d\'immenses corpus de texte pour prédire la suite d\'une séquence.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('L\'architecture qui fonde les LLM modernes est…','Le Transformer (2017, « Attention is All You Need »)','Le perceptron simple','L\'arbre de décision','La machine de Turing physique',
   'Le Transformer remplace la récurrence par le mécanisme d\'attention, permettant parallélisation massive et longues dépendances.',
   'https://fr.wikipedia.org/wiki/Transformeur'),
 mk('Le mécanisme d\'attention permet au modèle de…','Pondérer l\'importance de chaque token du contexte pour produire le suivant','Lire plus vite les fichiers','Compresser les images','Chiffrer les données',
   'Chaque position calcule des scores (requête·clé) vers toutes les autres : le modèle « regarde » les mots pertinents où qu\'ils soient.',
   'https://fr.wikipedia.org/wiki/M%C3%A9canisme_d%27attention'),
 mk('Un « token » dans un LLM est…','Une unité de texte (mot, sous-mot ou caractère) traitée par le modèle','Une pièce de monnaie électronique','Un mot de passe','Un pixel',
   'Le tokenizer découpe le texte (ex. BPE) ; les limites de contexte et la facturation des API se comptent en tokens.',
   'https://fr.wikipedia.org/wiki/Analyse_lexicale'),
 mk('Le pré-entraînement d\'un LLM consiste à…','Prédire le token suivant sur d\'immenses corpus non annotés','Répondre à des questionnaires','Copier une base de données','Trier des images',
   'Cet apprentissage auto-supervisé donne au modèle grammaire, faits et capacités émergentes ; l\'alignement vient ensuite.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('Le RLHF désigne…','L\'apprentissage par renforcement à partir de préférences humaines','Un protocole réseau','Une carte graphique','Un format de fichier',
   'Reinforcement Learning from Human Feedback : des juges humains classent des réponses ; un modèle de récompense guide l\'alignement du LLM (utile, honnête, inoffensif).',
   'https://fr.wikipedia.org/wiki/Apprentissage_par_renforcement_%C3%A0_partir_de_r%C3%A9troaction_humaine'),
 mk('Une « hallucination » d\'un LLM est…','Une affirmation plausible mais factuellement fausse','Un bug d\'affichage','Une panne de serveur','Une image floue',
   'Le modèle optimise la vraisemblance du texte, pas la vérité : d\'où l\'importance des sources, du RAG et de la vérification humaine.',
   'https://fr.wikipedia.org/wiki/Hallucination_(intelligence_artificielle)'),
 mk('Le RAG (Retrieval-Augmented Generation) consiste à…','Fournir au LLM des documents récupérés d\'une base pour ancrer ses réponses','Accélérer le GPU','Compresser le modèle','Traduire les prompts',
   'Recherche (vecteurs, mots-clés) + génération : le modèle cite des sources à jour et réduit les hallucinations sans ré-entraînement.',
   'https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9ration_augment%C3%A9e_de_r%C3%A9cup%C3%A9ration'),
 mk('Le « prompt engineering » désigne…','L\'art de formuler les instructions pour obtenir de meilleures réponses','La réparation des serveurs','Le câblage électrique','La conception de claviers',
   'Rôle, contexte, exemples (few-shot), contraintes de format, raisonnement pas à pas : la qualité du prompt conditionne la sortie.',
   'https://fr.wikipedia.org/wiki/Ing%C3%A9nierie_de_prompt'),
 mk('La « fenêtre de contexte » d\'un LLM est…','La quantité maximale de tokens que le modèle peut traiter en une fois','La taille de l\'écran','La durée d\'abonnement','La vitesse de frappe',
   'Elle limite la mémoire de travail (documents, historique) ; les modèles récents atteignent des centaines de milliers de tokens.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('Le « fine-tuning » d\'un modèle consiste à…','Poursuivre son entraînement sur des données spécifiques à une tâche ou un domaine','Nettoyer son disque dur','Changer son interface','Le traduire en français',
   'À partir des poids pré-entraînés, on spécialise (support client, droit, médecine) avec peu de données ; variantes efficaces : LoRA, adaptateurs.',
   'https://fr.wikipedia.org/wiki/Apprentissage_par_transfert'),
 mk('La température d\'un LLM contrôle…','Le degré d\'aléa de la génération (créativité vs déterminisme)','La chaleur du processeur','La vitesse d\'internet','La langue de sortie',
   'T basse (~0) : réponses stables et factuelles ; T haute : diversité et créativité, avec plus de risques d\'erreurs.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('Un agent IA se distingue d\'un simple chatbot par…','Sa capacité à utiliser des outils et enchaîner des actions vers un objectif','Sa couleur','Son prix uniquement','Sa vitesse de frappe',
   'Boucle perception → raisonnement → action : appels d\'API, navigation, exécution de code, avec planification et mémoire.',
   'https://fr.wikipedia.org/wiki/Agent_intelligent'),
 mk('Le « function calling » (appel d\'outils) permet au LLM de…','Produire des appels structurés vers des fonctions/API externes','Téléphoner','Imprimer des documents','Chiffrer le disque',
   'Le modèle renvoie un JSON conforme au schéma de l\'outil (météo, base de données, calcul) ; l\'orchestrateur exécute et renvoie le résultat.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('Le patron « ReAct » pour agents combine…','Raisonnement (chain-of-thought) et actions outillées en alternance','Lecture et écriture disque','Compression et chiffrement','Tri et fusion',
   'Penser → agir → observer, en boucle : l\'agent justifie chaque action et s\'ajuste selon les observations.',
   'https://fr.wikipedia.org/wiki/Agent_intelligent'),
 mk('Un système multi-agents est utile pour…','Répartir des rôles spécialisés (chercheur, critique, rédacteur) qui coopèrent','Remplacer le Wi-Fi','Refroidir les serveurs','Éviter les mises à jour',
   'Des agents aux prompts/outils distincts se coordonnent (débat, vérification croisée, division du travail) sur des tâches complexes.',
   'https://fr.wikipedia.org/wiki/Syst%C3%A8me_multi-agents'),
 mk('Les « embeddings » (plongements) représentent un texte par…','Un vecteur numérique capturant sa sémantique','Une image PNG','Un code-barres','Un hash aléatoire',
   'Des textes proches en sens ont des vecteurs proches : base de la recherche sémantique, du clustering et du RAG.',
   'https://fr.wikipedia.org/wiki/Plongement_lexical'),
 mk('Une base de données vectorielle sert à…','Stocker des embeddings et retrouver les plus similaires à une requête','Stocker des vidéos','Remplacer Excel','Créer des mots de passe',
   'Recherche par similarité (cosinus) à grande échelle (FAISS, pgvector…) : cœur des pipelines RAG et de la mémoire des agents.',
   'https://fr.wikipedia.org/wiki/Base_de_donn%C3%A9es_vectorielle'),
 mk('Le « chain-of-thought » (chaîne de pensée) améliore les LLM en…','Les faisant raisonner étape par étape avant de conclure','Accélérant le réseau','Réduisant la mémoire','Traduisant les réponses',
   'Décomposer le raisonnement améliore nettement les tâches de logique et de calcul ; les modèles « de raisonnement » systématisent cette approche.',
   'https://fr.wikipedia.org/wiki/Ing%C3%A9nierie_de_prompt'),
 mk('L\'IA générative peut produire…','Texte, images, audio, vidéo et code','Uniquement des tableurs','Seulement des e-mails','Des objets physiques directement',
   'Modèles de diffusion pour l\'image (Stable Diffusion, Midjourney), LLM pour texte/code, modèles audio et vidéo : la création assistée explose.',
   'https://fr.wikipedia.org/wiki/Intelligence_artificielle_g%C3%A9n%C3%A9rative'),
 mk('Le test de Turing évalue…','La capacité d\'une machine à se faire passer pour un humain dans une conversation','La vitesse d\'un processeur','La taille d\'un disque','La qualité d\'un écran',
   'Proposé par Alan Turing (1950) comme critère opérationnel d\'« intelligence » ; il reste discuté comme mesure réelle de compréhension.',
   'https://fr.wikipedia.org/wiki/Test_de_Turing'),
 mk('Le deep learning se distingue du machine learning classique par…','L\'apprentissage automatique de représentations via des réseaux profonds','L\'absence de données','Des règles écrites à la main','L\'usage exclusif de tableurs',
   'Les couches successives extraient des caractéristiques de plus en plus abstraites, supprimant l\'ingénierie manuelle des features.',
   'https://fr.wikipedia.org/wiki/Apprentissage_profond'),
 mk('Les GPU sont essentiels à l\'IA car…','Ils parallélisent massivement les calculs matriciels','Ils stockent les données','Ils remplacent la RAM','Ils refroidissent les serveurs',
   'Entraînement et inférence des réseaux = multiplications de matrices géantes : les GPU/TPU les exécutent en parallèle.',
   'https://fr.wikipedia.org/wiki/Processeur_graphique'),
 mk('Un modèle « open weights » comme Llama signifie que…','Ses poids sont téléchargeables et exécutables localement','Il est gratuit en API illimitée','Il n\'a pas de licence','Il est sans entraînement',
   'On peut l\'auto-héberger, le finetuner et l\'auditer, sous conditions de licence ; distinct du full open source (données+code).',
   'https://fr.wikipedia.org/wiki/Llama_(mod%C3%A8le_de_langage)'),
 mk('Le biais algorithmique provient souvent…','De données d\'entraînement non représentatives ou historiquement biaisées','Du hasard pur','De la météo','Des câbles',
   'Recrutement, crédit, justice : les modèles reproduisent les biais des données ; audits, données équilibrées et supervision humaine s\'imposent.',
   'https://fr.wikipedia.org/wiki/Biais_algorithmique'),
 mk('Un deepfake est…','Un contenu audio/vidéo synthétique imitant une personne réelle','Un virus informatique','Un jeu vidéo','Un format d\'image',
   'Généré par IA, il pose des risques de désinformation et d\'usurpation ; détection, filigranes et éducation aux médias sont les parades.',
   'https://fr.wikipedia.org/wiki/Deepfake'),
 mk('L\'AI Act européen (2024) classe les systèmes d\'IA…','Par niveaux de risque (inacceptable, haut risque, risque limité, minimal)','Par prix','Par pays d\'origine','Par langue',
   'Premier cadre global : interdictions (notation sociale), obligations fortes pour le haut risque, transparence pour les IA génératives.',
   'https://fr.wikipedia.org/wiki/L%C3%A9gislation_sur_l%27intelligence_artificielle'),
 mk('L\'IA « étroite » (narrow AI) se caractérise par…','Une compétence limitée à des tâches spécifiques','Une conscience générale','Des émotions réelles','Une autonomie totale',
   'Tous les systèmes actuels (vision, traduction, LLM) restent spécialisés ; l\'AGI (intelligence générale) demeure hypothétique.',
   'https://fr.wikipedia.org/wiki/Intelligence_artificielle_g%C3%A9n%C3%A9rale'),
 mk('En agriculture, l\'IA permet notamment…','La détection de maladies des cultures par vision et la prévision des rendements','De remplacer la pluie','De supprimer les sols','De créer des semences physiques par ordinateur',
   'Images satellite/drones + ML : alerte précoce (chenille légionnaire), irrigation de précision, conseil personnalisé par SMS aux producteurs.',
   'https://fr.wikipedia.org/wiki/Agriculture_num%C3%A9rique'),
 mk('Dans la santé, les modèles d\'IA aident à…','Détecter des anomalies sur les images médicales et prioriser les cas','Remplacer totalement les médecins','Fabriquer des médicaments physiques instantanément','Éviter les diagnostics',
   'Radiologie, dermatologie, dépistage (rétinopathie) : l\'IA assiste le clinicien, qui garde la décision ; validation clinique indispensable.',
   'https://fr.wikipedia.org/wiki/Intelligence_artificielle_en_sant%C3%A9'),
 mk('Le « scoring » de crédit par IA en microfinance mobile utilise…','Des données alternatives (usage mobile, transactions) pour estimer le risque','Uniquement les garanties foncières','La couleur du téléphone','Le hasard',
   'En Afrique de l\'Ouest, les fintechs scorent des clients sans historique bancaire ; enjeux : transparence, biais et protection des données.',
   'https://fr.wikipedia.org/wiki/%C3%89valuation_du_cr%C3%A9dit'),
 mk('Un chatbot de service public (état civil, impôts) apporte…','Une disponibilité 24 h/24 et des réponses standardisées aux démarches','La suppression des lois','Des paiements en espèces','Une connexion gratuite',
   'Guichets virtuels multilingues (y compris langues locales via ASR/TTS) : désengorgement des services et inclusion numérique.',
   'https://fr.wikipedia.org/wiki/Agent_conversationnel'),
 mk('La confidentialité des données envoyées à un LLM en ligne exige de…','Éviter d\'y saisir des données personnelles ou sensibles non nécessaires','Tout envoyer sans réfléchir','Partager les mots de passe','Désactiver l\'antivirus',
   'Minimisation, anonymisation, contrats de traitement (RGPD/lois locales), ou modèles auto-hébergés pour les données critiques.',
   'https://fr.wikipedia.org/wiki/Protection_des_donn%C3%A9es_personnelles'),
 mk('L\'« inférence » d\'un modèle désigne…','La phase d\'utilisation où le modèle produit des prédictions','Son entraînement initial','Sa suppression','Sa compression',
   'Après l\'entraînement (coûteux, ponctuel), l\'inférence sert les requêtes en production ; latence et coût par requête deviennent les métriques clés.',
   'https://fr.wikipedia.org/wiki/Apprentissage_automatique'),
 mk('La « distillation » de modèle consiste à…','Entraîner un petit modèle à imiter un grand pour réduire coûts et latence','Nettoyer les données','Chiffrer les poids','Doubler les paramètres',
   'Le « student » apprend des sorties du « teacher » : performances proches, empreinte bien moindre — clé pour le déploiement mobile/edge.',
   'https://fr.wikipedia.org/wiki/Distillation_des_connaissances'),
 mk('Le watermarking des contenus générés par IA vise à…','Rendre détectable l\'origine synthétique d\'un texte ou d\'une image','Améliorer la grammaire','Accélérer la génération','Réduire la mémoire',
   'Signatures statistiques ou métadonnées (C2PA) : traçabilité contre la désinformation, exigée par plusieurs régulations.',
   'https://fr.wikipedia.org/wiki/Tatouage_num%C3%A9rique'),
 mk('Pour un mémoire universitaire, l\'usage éthique d\'un LLM consiste à…','L\'utiliser comme assistant (plan, reformulation) en citant et vérifiant, sans plagier','Lui faire écrire tout le mémoire à sa place','Cacher son usage au jury','Copier sans citer',
   'Les politiques académiques exigent transparence et intégrité : l\'IA aide à apprendre, la production intellectuelle reste celle de l\'étudiant.',
   'https://fr.wikipedia.org/wiki/Plagiat'),
 mk('Le MCP (Model Context Protocol) et les standards d\'outils visent à…','Connecter les modèles aux données et applications de façon interopérable','Remplacer Internet','Chiffrer les e-mails','Vendre des GPU',
   'Des protocoles ouverts standardisent l\'accès des assistants IA aux fichiers, bases et services — moins d\'intégrations ad hoc.',
   'https://fr.wikipedia.org/wiki/Interop%C3%A9rabilit%C3%A9'),
 mk('La sobriété énergétique des modèles d\'IA passe par…','Des modèles plus petits, la quantification et des data centers efficients','Toujours plus de paramètres','L\'abandon des mesures','Le refroidissement à ciel ouvert',
   'Quantification (8/4 bits), distillation, mutualisation et énergies renouvelables réduisent l\'empreinte carbone croissante de l\'IA.',
   'https://fr.wikipedia.org/wiki/Impact_environnemental_du_num%C3%A9rique'),
 mk('Un « system prompt » est…','L\'instruction cadre qui définit le rôle et les règles de l\'assistant','Le mot de passe administrateur','Le nom du serveur','Un langage de programmation',
   'Invisible pour l\'utilisateur final, il fixe persona, style, limites et consignes de sécurité de l\'assistant.',
   'https://fr.wikipedia.org/wiki/Ing%C3%A9nierie_de_prompt'),
 mk('L\'injection de prompt est une attaque où…','Un contenu malveillant tente de détourner les instructions de l\'assistant','On vole le GPU','On coupe le réseau','On sature le disque',
   'Un texte (page web, e-mail) ordonne à l\'agent d\'ignorer ses consignes ; défenses : séparation des sources, validation, moindre privilège.',
   'https://fr.wikipedia.org/wiki/Injection_de_prompt'),
 mk('L\'« alignement » d\'un modèle d\'IA désigne…','Sa conformité aux intentions et valeurs humaines (utile, honnête, sans nuisance)','Sa mise en page','Son classement commercial','Sa vitesse',
   'RLHF, IA constitutionnelle, garde-fous : réduire les comportements indésirables tout en conservant l\'utilité.',
   'https://fr.wikipedia.org/wiki/Alignement_de_l%27intelligence_artificielle'),
 mk('AlphaGo (DeepMind) est célèbre pour…','Avoir battu les meilleurs joueurs de go grâce au renforcement et aux réseaux profonds','Traduire 100 langues','Conduire des camions','Écrire des romans',
   'Sa victoire sur Lee Sedol (2016) a marqué l\'histoire de l\'IA ; AlphaZero a généralisé l\'auto-apprentissage sans données humaines.',
   'https://fr.wikipedia.org/wiki/AlphaGo'),
 mk('La reconnaissance vocale (ASR) convertit…','La parole en texte','Le texte en image','L\'image en musique','Les gestes en code',
   'Whisper et modèles similaires transcrivent ; couplés aux LLM et à la synthèse (TTS), ils créent des assistants vocaux, y compris en langues africaines.',
   'https://fr.wikipedia.org/wiki/Reconnaissance_automatique_de_la_parole'),
 mk('Le « few-shot learning » via prompt consiste à…','Donner quelques exemples dans le prompt pour guider la tâche','Ré-entraîner tout le modèle','Réduire la mémoire GPU','Copier un site web',
   'Sans modifier les poids, 2-5 exemples bien choisis suffisent souvent à cadrer format et style de sortie.',
   'https://fr.wikipedia.org/wiki/Apprentissage_%C3%A0_partir_de_peu_d%27exemples'),
 mk('L\'évaluation des LLM utilise notamment…','Des benchmarks (MMLU, HumanEval) et des juges humains ou automatisés','Le poids du serveur','La couleur de l\'interface','Le nombre d\'utilisateurs seulement',
   'Compréhension, code, raisonnement, sécurité : les scores orientent le choix des modèles ; attention à la contamination des jeux de test.',
   'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage'),
 mk('Une « boucle humaine » (human-in-the-loop) garantit que…','Un humain valide les décisions sensibles de l\'IA','La machine décide seule','Personne ne vérifie rien','Les logs sont effacés',
   'Pour le crédit, la santé, la justice : l\'IA propose, l\'humain dispose — exigence de nombreuses régulations.',
   'https://fr.wikipedia.org/wiki/Human_in_the_loop'),
 mk('Le coût d\'usage d\'une API de LLM se facture généralement…','Aux tokens d\'entrée et de sortie','Au nombre de lettres majuscules','À la couleur des prompts','Au poids du fichier Word',
   'Tarifs par million de tokens, différents pour entrée/sortie ; optimiser le contexte réduit la facture.',
   'https://fr.wikipedia.org/wiki/Interface_de_programmation'),
] .forEach(x => ia.push(x));
// Paramétriques IA : tokens et coûts (12)
[[500000,2,1],[1000000,2,2],[250000,4,1],[2000000,3,6],[1500000,2,3],[750000,4,3],[3000000,1,3],[500000,6,3],[1250000,4,5],[2500000,2,5],[400000,5,2],[1000000,8,8]]
.forEach(([tok, prix, tot]) => ia.push(mk(
  `Une API de LLM facture ${prix} $ par million de tokens. Traiter ${F(tok)} tokens coûte :`,
  `${tot} $`, `${tot*2} $`, `${Math.max(1,Math.round(tot/2))} $`, `${prix} $ fixes`,
  `Coût = ${F(tok)} ÷ 1 000 000 × ${prix} $ = ${tot} $.`,
  'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage')));
[[8000,2000,10000],[120000,8000,128000],[4000,4000,8000],[30000,2000,32000],[100000,28000,128000],[16000,16000,32000],[60000,4000,64000],[190000,10000,200000]]
.forEach(([ctx, out, tot]) => ia.push(mk(
  `Un prompt occupe ${F(ctx)} tokens et la réponse ${F(out)} tokens. Le total traité par le modèle est de :`,
  `${F(tot)} tokens`, `${F(ctx)} tokens`, `${F(Math.abs(ctx-out))} tokens`, `${F(tot*2)} tokens`,
  `Total = entrée + sortie = ${F(ctx)} + ${F(out)} = ${F(tot)} tokens — à comparer à la fenêtre de contexte du modèle.`,
  'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage')));
// Ratio de compression/distillation (6)
[[70,7,10],[180,18,10],[70,35,2],[8,2,4],[400,80,5],[32,8,4]]
.forEach(([g, p, r]) => ia.push(mk(
  `Un modèle « teacher » de ${g} milliards de paramètres est distillé en un « student » de ${p} milliards. Le facteur de réduction est de :`,
  `×${r}`, `×${r*2}`, `×${Math.max(1,Math.round(r/2))}`, `×${g}`,
  `Réduction = ${g} ÷ ${p} = ×${r} : latence et coût d'inférence chutent d'autant, avec une perte de qualité limitée.`,
  'https://fr.wikipedia.org/wiki/Distillation_des_connaissances')));

// -------- TOPOGRAPHIE / GÉNIE CIVIL / ARCHITECTURE (120) --------------
const btp = [];
[
 mk('La topographie a pour objet…','La mesure et la représentation des formes et détails du terrain','La météo','La botanique','Le commerce des terrains',
   'Levés planimétriques et altimétriques produisent plans et cartes ; instruments : théodolite, niveau, station totale, GNSS.',
   'https://fr.wikipedia.org/wiki/Topographie'),
 mk('Une station totale mesure…','Angles horizontaux/verticaux et distances (électronique)','Uniquement la température','La pression atmosphérique','Le pH du sol',
   'Théodolite + distancemètre EDM : elle calcule coordonnées et altitudes des points visés ; les données alimentent AutoCAD/Covadis.',
   'https://fr.wikipedia.org/wiki/Station_totale'),
 mk('Le nivellement direct détermine…','Les différences d\'altitude entre points à l\'aide d\'un niveau et d\'une mire','Les angles horizontaux','Les surfaces cadastrales','La nature du sol',
   'Visées arrière/avant sur mire : dénivelée = lecture arrière − lecture avant ; cheminements fermés pour contrôler les erreurs.',
   'https://fr.wikipedia.org/wiki/Nivellement_(topographie)'),
 mk('Le GNSS (GPS) différentiel améliore la précision par…','Des corrections issues d\'une station de référence','Une meilleure batterie','Un écran plus grand','La 5G',
   'RTK/DGNSS : corrections en temps réel ramènent l\'erreur au centimètre — indispensable pour le bornage et les levés précis.',
   'https://fr.wikipedia.org/wiki/Positionnement_par_satellites'),
 mk('Une courbe de niveau relie…','Les points de même altitude','Les points de même pente','Les routes','Les parcelles',
   'Plus les courbes sont serrées, plus la pente est forte ; l\'équidistance est l\'écart d\'altitude constant entre courbes.',
   'https://fr.wikipedia.org/wiki/Courbe_de_niveau'),
 mk('Au Togo, le système géodésique/projection couramment utilisé pour les levés est…','L\'UTM zone 31 N (ellipsoïde WGS 84)','Lambert 93','La projection polaire','Mercator direct sans zone',
   'Le Togo s\'inscrit dans la zone UTM 31 N : coordonnées Est/Nord en mètres, base des plans cadastraux et SIG nationaux.',
   'https://fr.wikipedia.org/wiki/Transverse_universelle_de_Mercator'),
 mk('Le bornage contradictoire d\'une parcelle consiste à…','Fixer les limites en présence des riverains et matérialiser des bornes','Vendre la parcelle','Peindre la clôture','Planter des arbres',
   'Réalisé par un géomètre, il prévient les litiges fonciers ; le procès-verbal signé fait foi (au Togo : géomètres agréés, cadastre, ANDF pour le foncier).',
   'https://fr.wikipedia.org/wiki/Bornage'),
 mk('Le Titre Foncier au Togo garantit…','La propriété définitive et inattaquable de l\'immeuble immatriculé','Une location de 3 ans','Un simple droit de passage','Un permis de construire',
   'Issu de l\'immatriculation au livre foncier (code foncier togolais de 2018), il est définitif et opposable à tous.',
   'https://fr.wikipedia.org/wiki/Titre_foncier'),
 mk('Le dessin technique normalisé utilise pour les arêtes vues…','Un trait continu fort','Un trait interrompu fin','Un trait mixte fin','Un trait ondulé',
   'Conventions (ISO 128) : continu fort = contours vus ; interrompu fin = arêtes cachées ; mixte fin = axes de symétrie.',
   'https://fr.wikipedia.org/wiki/Dessin_technique'),
 mk('L\'échelle 1/50 signifie que…','1 cm sur le plan représente 50 cm dans la réalité','Le plan est 50 fois plus grand','1 m = 50 km','L\'objet est réduit 5 fois',
   'Échelle = dimension dessinée ÷ dimension réelle ; 1/50 est courant pour les plans d\'exécution de bâtiments.',
   'https://fr.wikipedia.org/wiki/%C3%89chelle_(proportion)'),
 mk('AutoCAD est un logiciel de…','Dessin assisté par ordinateur (DAO) 2D/3D','Comptabilité','Retouche photo','Messagerie',
   'Référence du DAO pour plans d\'architecture et de génie civil ; formats DWG/DXF ; concurrents : DraftSight, BricsCAD.',
   'https://fr.wikipedia.org/wiki/AutoCAD'),
 mk('ArchiCAD et Revit relèvent de la démarche…','BIM (maquette numérique du bâtiment)','SIG uniquement','Tableur','Jeux vidéo',
   'Le Building Information Modeling porte la géométrie ET les données (matériaux, coûts, phases) ; format d\'échange : IFC.',
   'https://fr.wikipedia.org/wiki/Building_information_modeling'),
 mk('Covadis (sur AutoCAD) est spécialisé en…','Topographie et conception de projets VRD/routes','Paie du personnel','Dessin de mode','Cartographie marine',
   'Traitement des levés, MNT, cubatures, profils en long/travers, giratoires : outil phare des géomètres et bureaux d\'études VRD francophones.',
   'https://fr.wikipedia.org/wiki/Logiciel_de_topographie'),
 mk('Robot Structural Analysis / SAP2000 / ETABS servent à…','Calculer et dimensionner les structures (efforts, ferraillage)','Gérer la trésorerie','Retoucher les façades','Imprimer les contrats',
   'Modélisation aux éléments finis : descentes de charges, sollicitations sismiques/vent, vérifications aux Eurocodes/BAEL.',
   'https://fr.wikipedia.org/wiki/Calcul_de_structure'),
 mk('QGIS est…','Un logiciel SIG libre et gratuit','Un antivirus','Un traitement de texte','Une base de données comptable',
   'Système d\'information géographique open source : cartes thématiques, analyses spatiales, gestion du cadastre et des réseaux.',
   'https://fr.wikipedia.org/wiki/QGIS'),
 mk('La résistance des matériaux (RDM) étudie…','Le comportement des solides sous charges (contraintes, déformations)','Le prix des matériaux','La couleur des murs','Le climat',
   'Traction, compression, flexion, cisaillement, torsion : la RDM dimensionne poutres, poteaux et dalles en sécurité.',
   'https://fr.wikipedia.org/wiki/R%C3%A9sistance_des_mat%C3%A9riaux'),
 mk('La contrainte normale σ dans une section se calcule par…','σ = N / S (effort normal divisé par l\'aire)','σ = N × S','σ = S / N','σ = N + S',
   'En traction/compression simple, la contrainte (Pa, MPa) est l\'effort réparti sur la section ; on la compare à la résistance admissible.',
   'https://fr.wikipedia.org/wiki/Contrainte_(m%C3%A9canique)'),
 mk('La loi de Hooke exprime que…','La contrainte est proportionnelle à la déformation dans le domaine élastique (σ = E·ε)','Tout matériau casse à 100 N','La déformation est toujours plastique','Le béton ne se déforme jamais',
   'E est le module de Young (≈ 200 000 MPa acier ; ≈ 30 000 MPa béton) ; au-delà de la limite élastique, déformations permanentes.',
   'https://fr.wikipedia.org/wiki/Loi_de_Hooke'),
 mk('Dans une poutre en flexion simple, le moment fléchissant maximal d\'une charge répartie q sur travée L (appuis simples) vaut…','q·L²/8','q·L/2','q·L²/2','q·L³/8',
   'M(max, mi-travée) = qL²/8 ; l\'effort tranchant max aux appuis = qL/2 — formules de base du dimensionnement.',
   'https://fr.wikipedia.org/wiki/Flexion_(mat%C3%A9riau)'),
 mk('Le béton résiste bien…','En compression, mais mal en traction (d\'où les armatures acier)','En traction seulement','Ni l\'un ni l\'autre','Uniquement au feu',
   'Le béton armé associe béton (compression) et acier (traction) ; l\'enrobage protège les aciers de la corrosion.',
   'https://fr.wikipedia.org/wiki/B%C3%A9ton_arm%C3%A9'),
 mk('Le dosage courant d\'un béton de structure est…','350 kg de ciment par m³ de béton','50 kg/m³','1 000 kg/m³','10 kg/m³',
   'Béton « 350 » : ~350 kg de ciment, granulats et ~175 L d\'eau par m³ (E/C ≈ 0,5) ; béton de propreté ~150 kg/m³, ouvrages massifs 300-400.',
   'https://fr.wikipedia.org/wiki/B%C3%A9ton'),
 mk('Le rapport eau/ciment (E/C) influence surtout…','La résistance et la durabilité du béton','La couleur du béton','Le prix du transport','Le bruit du chantier',
   'Un E/C bas (≈0,45-0,5) donne un béton résistant et durable ; trop d\'eau = porosité, retrait et chute de résistance.',
   'https://fr.wikipedia.org/wiki/B%C3%A9ton'),
 mk('L\'essai d\'affaissement au cône d\'Abrams mesure…','La consistance (ouvrabilité) du béton frais','La résistance à 28 jours','La couleur','Le pH',
   'Slump test : affaissement en cm classe le béton de ferme à fluide ; contrôle simple de la régularité des gâchées sur chantier.',
   'https://fr.wikipedia.org/wiki/C%C3%B4ne_d%27Abrams'),
 mk('La résistance caractéristique du béton se mesure à…','28 jours (fc28)','24 heures','7 ans','1 heure',
   'Éprouvettes cylindriques écrasées à 28 jours : référence du dimensionnement (ex. C25/30) ; contrôles intermédiaires à 7 jours.',
   'https://fr.wikipedia.org/wiki/B%C3%A9ton'),
 mk('Une fondation superficielle type « semelle filante » convient…','Sous les murs porteurs sur sol de bonne portance à faible profondeur','Sous les gratte-ciel sur vase','Uniquement en mer','Pour les tentes',
   'Semelles isolées/filantes, radiers : fondations superficielles ; pieux et puits quand le bon sol est profond — d\'où l\'étude géotechnique.',
   'https://fr.wikipedia.org/wiki/Fondation_(construction)'),
 mk('L\'étude géotechnique préalable sert à…','Connaître la portance et la nature du sol pour choisir les fondations','Choisir la peinture','Fixer le loyer','Planter le jardin',
   'Sondages, essais pressiométriques/pénétromètres : elle prévient tassements et sinistres ; exigée pour les ouvrages importants.',
   'https://fr.wikipedia.org/wiki/G%C3%A9otechnique'),
 mk('Le ferraillage minimal d\'un poteau vise à…','Reprendre les tractions imprévues et confiner le béton','Décorer le coffrage','Alourdir la structure','Remplacer le ciment',
   'Armatures longitudinales + cadres/étriers : règles de pourcentage minimal, espacement et recouvrement (BAEL/Eurocode 2).',
   'https://fr.wikipedia.org/wiki/B%C3%A9ton_arm%C3%A9'),
 mk('Un permis de construire est exigé pour…','Édifier ou modifier substantiellement un bâtiment, conformément à l\'urbanisme','Repeindre une chambre','Changer une ampoule','Planter du maïs',
   'Délivré par l\'autorité d\'urbanisme (mairie/ministère) sur dossier (plans, titre foncier) ; construire sans permis expose à démolition.',
   'https://fr.wikipedia.org/wiki/Permis_de_construire'),
 mk('La maîtrise d\'œuvre (MOE) désigne…','L\'entité qui conçoit et dirige l\'exécution des travaux pour le maître d\'ouvrage','Le propriétaire du terrain','Le fournisseur de ciment','La banque',
   'Architecte/bureau d\'études : conception, plans, suivi de chantier, réception ; le maître d\'ouvrage (MOA) est le client décideur.',
   'https://fr.wikipedia.org/wiki/Ma%C3%AEtrise_d%27%C5%93uvre'),
 mk('L\'architecte est légalement chargé…','De la conception architecturale et du respect des règles d\'urbanisme','De la plomberie uniquement','Du gardiennage','De la vente des parcelles',
   'Inscrit à l\'ordre (au Togo : ONAT), il signe les projets soumis à permis au-delà des seuils ; il coordonne souvent la MOE.',
   'https://fr.wikipedia.org/wiki/Architecte'),
 mk('Un plan de masse représente…','L\'implantation du bâtiment sur la parcelle avec accès et réseaux','Le détail d\'une poutre','La façade seule','Le mobilier intérieur',
   'Vu de dessus à petite échelle (1/200-1/500), il situe l\'ouvrage par rapport aux limites, voiries et servitudes.',
   'https://fr.wikipedia.org/wiki/Plan_de_masse'),
 mk('La coupe verticale d\'un bâtiment montre…','Les niveaux, hauteurs et épaisseurs coupés par un plan vertical','La toiture vue du ciel','Les couleurs des murs','Le jardin',
   'Coupe AA, BB… : fondations, planchers, hauteurs sous plafond, escaliers — complément indispensable des plans de niveau.',
   'https://fr.wikipedia.org/wiki/Coupe_(architecture)'),
 mk('Les VRD en aménagement désignent…','Voiries et Réseaux Divers (routes, eau, assainissement, électricité)','Vente Rapide de Détail','Villas Résidentielles de Luxe','Vérification des Relevés de Dépenses',
   'Terrassements, chaussées, adduction d\'eau, drainage, éclairage : les VRD viabilisent les lotissements et zones industrielles.',
   'https://fr.wikipedia.org/wiki/Voirie_et_r%C3%A9seaux_divers'),
 mk('Le compactage des remblais routiers vise à…','Augmenter la densité et la portance du sol support','Colorer la route','Réduire la largeur','Éviter les panneaux',
   'Compacteurs et contrôle (Proctor, densité en place) préviennent les tassements ; couche par couche selon le CCTP.',
   'https://fr.wikipedia.org/wiki/Compactage'),
 mk('L\'essai Proctor détermine…','La teneur en eau optimale pour la densité sèche maximale d\'un sol','La dureté du ciment','Le débit d\'un fleuve','La hauteur d\'un bâtiment',
   'Référence du compactage : on exige souvent ≥ 95 % de l\'optimum Proctor modifié pour les couches de chaussée.',
   'https://fr.wikipedia.org/wiki/Essai_Proctor'),
 mk('Une pente de 2 % sur une terrasse sert à…','Évacuer les eaux pluviales vers les exutoires','Faire joli','Économiser le carrelage','Bloquer l\'eau',
   'Pentes minimales (1-2 %) et étanchéité évitent stagnations et infiltrations — pathologies majeures du bâtiment tropical.',
   'https://fr.wikipedia.org/wiki/%C3%89tanch%C3%A9it%C3%A9_(construction)'),
 mk('Le chaînage (haut et bas) dans la maçonnerie chaînée sert à…','Solidariser les murs et reprendre les efforts horizontaux','Suspendre les lustres','Décorer les angles','Aérer les murs',
   'Ceintures en béton armé aux niveaux des planchers et fondations : indispensable contre fissurations et séismes/vents.',
   'https://fr.wikipedia.org/wiki/Cha%C3%AEnage_(construction)'),
 mk('Un agglos (parpaing) creux standard au Togo mesure typiquement…','15 × 20 × 40 cm (épaisseur × hauteur × longueur)','5 × 5 × 10 cm','50 × 50 × 100 cm','2 × 20 × 40 cm',
   'Blocs de 10/15/20 d\'épaisseur ; les murs porteurs utilisent le 15 ou le 20, les cloisons le 10.',
   'https://fr.wikipedia.org/wiki/Parpaing'),
 mk('Le métré d\'un ouvrage consiste à…','Quantifier précisément les travaux (volumes, surfaces) pour chiffrer','Mesurer la température','Compter les ouvriers','Chronométrer le chantier',
   'Avant-métré (sur plans) puis attachements (sur chantier) alimentent devis, DQE et décomptes — cœur de l\'économie de la construction.',
   'https://fr.wikipedia.org/wiki/M%C3%A9tr%C3%A9'),
 mk('La garantie décennale couvre pendant 10 ans…','Les dommages compromettant la solidité de l\'ouvrage ou le rendant impropre à sa destination','Les ampoules grillées','La peinture décorative','Le mobilier',
   'Issue du droit civil (inspiration Code Napoléon, reprise en droit OHADA/togolais), elle engage constructeurs et architectes.',
   'https://fr.wikipedia.org/wiki/Garantie_d%C3%A9cennale'),
] .forEach(x => btp.push(x));
// Paramétriques BTP : contraintes σ = N/S (10)
[[100,50,2],[200,40,5],[150,30,5],[300,60,5],[120,40,3],[250,25,10],[90,30,3],[400,50,8],[180,60,3],[280,70,4]]
.forEach(([kn, cm2, mpa]) => btp.push(mk(
  `Un poteau reçoit un effort normal de ${kn} kN sur une section de ${cm2} cm². La contrainte moyenne est de :`,
  `${mpa} MPa`, `${mpa*10} MPa`, `${Math.max(1,Math.round(mpa/2))} MPa`, `${kn} MPa`,
  `σ = N/S = ${kn}×10³ N ÷ ${cm2}×10² mm² = ${mpa} N/mm² = ${mpa} MPa.`,
  'https://fr.wikipedia.org/wiki/Contrainte_(m%C3%A9canique)')));
// Échelles de plan (10)
[[100,2,2],[50,4,2],[200,3,6],[100,5,5],[500,2,10],[50,8,4],[200,5,10],[100,3.5,3.5],[1000,2,20],[500,4,20]]
.forEach(([e, cm, m]) => btp.push(mk(
  `Sur un plan à l'échelle 1/${e}, une longueur mesurée de ${String(cm).replace('.', ',')} cm représente en réalité :`,
  `${String(m).replace('.', ',')} m`, `${String(m*2).replace('.', ',')} m`, `${String(cm).replace('.', ',')} m`, `${String(Math.max(0.1,m/2)).replace('.', ',')} m`,
  `Réel = mesure × échelle = ${String(cm).replace('.', ',')} cm × ${e} = ${F(cm*e)} cm = ${String(m).replace('.', ',')} m.`,
  'https://fr.wikipedia.org/wiki/%C3%89chelle_(proportion)')));
// Pentes (8)
[[2,100,2],[5,200,10],[1.5,400,6],[3,150,4.5],[8,50,4],[2.5,240,6],[4,125,5],[10,80,8]]
.forEach(([p, l, h]) => btp.push(mk(
  `Une canalisation posée avec une pente de ${String(p).replace('.', ',')} % sur ${F(l)} m descend au total de :`,
  `${String(h).replace('.', ',')} m`, `${String(h*2).replace('.', ',')} m`, `${String(p).replace('.', ',')} m`, `${String(Math.max(0.1,+(h/2).toFixed(2))).replace('.', ',')} m`,
  `Dénivelée = pente × longueur = ${String(p).replace('.', ',')} % × ${F(l)} m = ${String(h).replace('.', ',')} m.`,
  'https://fr.wikipedia.org/wiki/Pente_(topographie)')));
// Dosage béton : ciment pour volume (8)
[[350,2,700],[350,5,1750],[300,4,1200],[250,2,500],[350,10,3500],[400,3,1200],[300,6,1800],[150,4,600]]
.forEach(([dose, vol, kg]) => btp.push(mk(
  `Pour un béton dosé à ${dose} kg/m³, quelle masse de ciment faut-il pour ${vol} m³ ?`,
  `${F(kg)} kg`, `${F(kg*2)} kg`, `${F(Math.round(kg/2))} kg`, `${F(dose)} kg`,
  `Ciment = ${dose} × ${vol} = ${F(kg)} kg, soit ${Math.round(kg/50)} sacs de 50 kg.`,
  'https://fr.wikipedia.org/wiki/B%C3%A9ton')));
// Sacs de ciment (6)
[[700,14],[1750,35],[1200,24],[500,10],[3500,70],[900,18]]
.forEach(([kg, sacs]) => btp.push(mk(
  `${F(kg)} kg de ciment correspondent à combien de sacs de 50 kg ?`,
  `${sacs} sacs`, `${sacs*2} sacs`, `${Math.max(1,Math.round(sacs/2))} sacs`, `${kg} sacs`,
  `Nombre de sacs = ${F(kg)} ÷ 50 = ${sacs} sacs.`,
  'https://fr.wikipedia.org/wiki/Ciment')));
// Surfaces & volumes (10)
[[12,8,96],[15,10,150],[20,12,240],[9,7,63],[25,16,400],[18,9,162],[30,20,600],[11,6,66],[14,12,168],[22,15,330]]
.forEach(([lg, la, s]) => btp.push(mk(
  `Une dalle rectangulaire mesure ${lg} m × ${la} m. Sa surface est de :`,
  `${F(s)} m²`, `${F(s*2)} m²`, `${F(2*(lg+la))} m²`, `${F(Math.round(s/2))} m²`,
  `Surface = longueur × largeur = ${lg} × ${la} = ${F(s)} m² (le périmètre serait ${2*(lg+la)} m).`,
  'https://fr.wikipedia.org/wiki/Aire_(g%C3%A9om%C3%A9trie)')));
[[96,0.15,14.4],[150,0.2,30],[240,0.12,28.8],[63,0.15,9.45],[400,0.18,72],[162,0.2,32.4]]
.forEach(([s, ep, v]) => btp.push(mk(
  `Une dalle de ${F(s)} m² a une épaisseur de ${String(ep).replace('.', ',')} m. Volume de béton nécessaire :`,
  `${String(v).replace('.', ',')} m³`, `${String(+(v*2).toFixed(2)).replace('.', ',')} m³`, `${F(s)} m³`, `${String(+(v/2).toFixed(2)).replace('.', ',')} m³`,
  `Volume = surface × épaisseur = ${F(s)} × ${String(ep).replace('.', ',')} = ${String(v).replace('.', ',')} m³ (prévoir ~5 % de pertes).`,
  'https://fr.wikipedia.org/wiki/Volume')));
// Conversions grades/degrés (6)
[[100,90],[200,180],[50,45],[400,360],[300,270],[150,135]]
.forEach(([gr, deg]) => btp.push(mk(
  `Un angle de ${gr} grades (gon) équivaut à :`,
  `${deg}°`, `${gr}°`, `${deg*2}°`, `${Math.round(deg/2)}°`,
  `360° = 400 gon, donc ${gr} gon × 0,9 = ${deg}°. Les théodolites topographiques graduent souvent en grades.`,
  'https://fr.wikipedia.org/wiki/Grade_(angle)')));

// ---------------- Assemblage packs ----------------------------------
function packifyLocal(domain, theme, titre, flat) {
  const packs = [];
  for (let i = 0; i + 4 <= flat.length; i += 4) {
    packs.push({
      titre: `${titre} — Série ${packs.length + 1}`, theme, domain,
      questions: flat.slice(i, i + 4).map((x, j) => ({ id: `q${j + 1}`, pts: 1, ...x }))
    });
  }
  return packs;
}

const m1Packs = [
  ...packifyLocal(IA_NAME,  'Intelligence artificielle', 'IA, LLM et agents', ia),
  ...packifyLocal(BTP_NAME, 'BTP et topographie',        'Topographie, génie civil et architecture', btp)
];

module.exports = { m1Packs, m2Packs: [], m3Packs: [], IA_NAME, BTP_NAME };
