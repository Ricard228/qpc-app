// =====================================================================
// build-help-doc.js — génère le guide utilisateur QPC en .docx
// =====================================================================
// Usage : node build-help-doc.js
// Sortie : Guide-utilisation-QPC.docx (dans ce dossier)
// =====================================================================

const globalNodeModules = require('child_process')
  .execSync('npm root -g').toString().trim();
const fs   = require('fs');
const path = require('path');

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  ExternalHyperlink, InternalHyperlink, Bookmark,
  TabStopType, TabStopPosition, TableOfContents, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign,
  PageNumber, PageBreak
} = require(path.join(globalNodeModules, 'docx'));

// ---------- Helpers ---------------------------------------------------
const QPC_BLUE      = '1F3864';
const QPC_BLUE_DARK = '142346';
const QPC_RED       = 'C00000';
const QPC_GREEN     = '2E7D32';
const QPC_GOLD      = 'B8860B';

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 100 },
    ...opts,
    children: opts.children ||
      [new TextRun({ text, font: 'Arial', size: 22, ...opts.run })],
  });
}
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text, font: 'Arial', size: 32, bold: true, color: QPC_BLUE })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, font: 'Arial', size: 26, bold: true, color: QPC_BLUE })],
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: 'Arial', size: 22, bold: true, color: QPC_BLUE_DARK })],
  });
}
function bullet(text, level = 0, formatted) {
  return new Paragraph({
    numbering: { reference: 'bullets', level },
    spacing: { after: 80 },
    children: formatted || [new TextRun({ text, font: 'Arial', size: 22 })],
  });
}
function num(text, formatted) {
  return new Paragraph({
    numbering: { reference: 'numbers', level: 0 },
    spacing: { after: 80 },
    children: formatted || [new TextRun({ text, font: 'Arial', size: 22 })],
  });
}
function code(text) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    shading: { fill: 'F2F2F2', type: ShadingType.CLEAR, color: 'auto' },
    children: text.split('\n').flatMap((line, i, arr) => {
      const runs = [ new TextRun({ text: line, font: 'Consolas', size: 18, color: QPC_BLUE_DARK }) ];
      if (i < arr.length - 1) runs.push(new TextRun({ break: 1 }));
      return runs;
    }),
  });
}
function notice(text, color = QPC_RED) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    shading: { fill: 'FFF2F2', type: ShadingType.CLEAR, color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 24, color, space: 8 } },
    children: [new TextRun({ text, font: 'Arial', size: 22, italics: true, color: '7A0000' })],
  });
}
function info(text, color = QPC_BLUE) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    shading: { fill: 'E8F0FE', type: ShadingType.CLEAR, color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 24, color, space: 8 } },
    children: [new TextRun({ text, font: 'Arial', size: 22, color: QPC_BLUE_DARK })],
  });
}
function tip(text) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    shading: { fill: 'E2EFDA', type: ShadingType.CLEAR, color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 24, color: QPC_GREEN, space: 8 } },
    children: [new TextRun({ text, font: 'Arial', size: 22, color: '1A5519' })],
  });
}
function link(label, url) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text: label, style: 'Hyperlink', font: 'Arial', size: 22, color: QPC_BLUE, underline: { type: 'single' } })],
  });
}
function spacer() { return new Paragraph({ children: [new TextRun({ text: '' })], spacing: { before: 80, after: 80 } }); }

const CELL_BORDER = { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' };
const CELL_BORDERS = { top: CELL_BORDER, bottom: CELL_BORDER, left: CELL_BORDER, right: CELL_BORDER };
function tableCell(text, w, opts = {}) {
  return new TableCell({
    borders: CELL_BORDERS,
    width: { size: w, type: WidthType.DXA },
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      children: [new TextRun({
        text,
        font: 'Arial',
        size: opts.size || 20,
        bold: opts.bold,
        color: opts.color
      })]
    })],
  });
}
function table(headers, rows, columnWidths) {
  const total = columnWidths.reduce((s, w) => s + w, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) =>
          tableCell(h, columnWidths[i], { shading: QPC_BLUE, color: 'FFFFFF', bold: true, size: 20 })
        )
      }),
      ...rows.map(r =>
        new TableRow({
          children: r.map((c, i) => tableCell(c, columnWidths[i]))
        })
      )
    ]
  });
}

// ---------- Bookmark helper -----------------------------------------
let bookmarkCounter = 100;
function bookmarkH1(text, anchorId) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new Bookmark({
      id: anchorId,
      children: [new TextRun({ text, font: 'Arial', size: 32, bold: true, color: QPC_BLUE })],
    })],
  });
}
function bookmarkH2(text, anchorId) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new Bookmark({
      id: anchorId,
      children: [new TextRun({ text, font: 'Arial', size: 26, bold: true, color: QPC_BLUE })],
    })],
  });
}

// =====================================================================
// CONTENU DU DOCUMENT
// =====================================================================

const children = [];

// ---------- PAGE DE COUVERTURE ---------------------------------------
children.push(
  new Paragraph({
    spacing: { before: 2400 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'QPC', font: 'Arial', size: 96, bold: true, color: QPC_BLUE })]
  }),
  new Paragraph({
    spacing: { after: 200 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Questions pour un Champion', font: 'Arial', size: 44, color: QPC_BLUE_DARK })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Édition Économie & Sciences sociales', font: 'Arial', size: 28, italics: true, color: QPC_BLUE_DARK })]
  }),
  new Paragraph({
    spacing: { before: 1200, after: 200 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'GUIDE D’UTILISATION', font: 'Arial', size: 40, bold: true, color: QPC_RED })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Manuel complet — joueurs, super-administrateurs, exploitation', font: 'Arial', size: 24, color: '6B7280' })]
  }),
  new Paragraph({
    spacing: { before: 1600 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: '770+ questions · 17 domaines · 16 langues d’affichage · PWA installable Android/iOS', font: 'Arial', size: 20, color: '6B7280' })]
  }),
  new Paragraph({
    spacing: { before: 200 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Conçu par Kossi Nevame AGBENU', font: 'Arial', size: 20, bold: true, color: QPC_BLUE })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'NEVAME Data House · ESA Université de Lomé', font: 'Arial', size: 20, color: '6B7280' })]
  }),
  new Paragraph({
    spacing: { before: 200 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Version 2.18 — mai 2026', font: 'Arial', size: 18, italics: true, color: '6B7280' })]
  }),
  new Paragraph({ children: [new PageBreak()] })
);

// ---------- TABLE DES MATIÈRES ---------------------------------------
children.push(
  h1('Table des matières'),
  p('', { children: [
    new TextRun({ text: 'Pour générer / actualiser le sommaire dans Word : F9 ou clic droit > Mettre à jour les champs.', font: 'Arial', size: 18, italics: true, color: '6B7280' })
  ]}),
  new TableOfContents('Sommaire', {
    hyperlink: true,
    headingStyleRange: '1-3',
  }),
  new Paragraph({ children: [new PageBreak()] })
);

// ---------- 1. PRÉSENTATION GÉNÉRALE --------------------------------
children.push(
  h1('1. Présentation générale'),

  h2('1.1 Qu’est-ce que QPC ?'),
  p('QPC (Questions pour un Champion) est une application web pédagogique inspirée de l’émission télévisée du même nom diffusée sur TV5 Monde. Elle transforme un recueil de plus de 770 questions documentées en jeu interactif chronométré, accessible depuis n’importe quel navigateur (ordinateur, tablette, smartphone) ou installable comme application native sur Android et iOS via la technologie PWA.'),
  p('L’application a été conçue dans un contexte académique ouest-africain (UEMOA, Togo) mais couvre l’économie générale, les sciences sociales et de nombreux domaines spécialisés utiles à toute formation supérieure en économie, gestion ou data science.'),

  h2('1.2 Caractéristiques principales'),
  bullet('770 questions documentées sur 17 domaines (économie agricole, monnaie/finance, BRVM/UEMOA, ML/DL, suivi-évaluation projets, fiscalité Togo, marchés publics Togo, etc.)'),
  bullet('3 manches chronométrées inspirées de l’émission TV5 : « Les 4 à la suite » (40 s), « Face-à-face » (25 s/question, 1 à 6 points), « La finale » (15 s/question, 9 points gagnants)'),
  bullet('Mode QCM ou saisie libre, paramétrable par l’administrateur ou choisi par le joueur'),
  bullet('Mode Révision libre pour parcourir toutes les questions sans timer ni score'),
  bullet('Duels utilisateur-à-utilisateur et confrontations multi-joueurs organisées par l’admin'),
  bullet('Scoreboard live en temps réel pendant les compétitions'),
  bullet('Authentification par codes d’accès permanents générés par le super-administrateur'),
  bullet('Dashboard centralisé : classement, parties récentes, statistiques globales'),
  bullet('Import de domaines personnalisés (.txt ou .json)'),
  bullet('Export Excel et JSON de toute la base'),
  bullet('Persistance permanente des données via branche GitHub'),
  bullet('Installable comme PWA sur Android et iOS (1 clic)'),
  bullet('Chaque réponse contient au moins une référence cliquable vers une source vérifiée (Wikipedia FR + sites officiels institutionnels)'),

  h2('1.3 Accès à l’application'),
  p('', { children: [
    new TextRun({ text: 'URL publique permanente : ', font: 'Arial', size: 22 }),
    link('https://qpc-champion-58rn.onrender.com', 'https://qpc-champion-58rn.onrender.com')
  ]}),
  p('', { children: [
    new TextRun({ text: 'Code source ouvert : ', font: 'Arial', size: 22 }),
    link('https://github.com/Ricard228/qpc-app', 'https://github.com/Ricard228/qpc-app')
  ]}),

  h2('1.4 Architecture'),
  table(
    ['Couche', 'Technologie'],
    [
      ['Backend', 'Node.js + Express, stockage JSON (auth/games/matches/custom-packs)'],
      ['Frontend', 'SPA Vanilla JS, CSS responsive, Service Worker pour PWA'],
      ['Persistance', 'Auto-sync vers la branche « data » du repo GitHub'],
      ['Hébergement', 'Render.com (Web Service free tier)'],
      ['Authentification', 'Tokens HMAC signés, codes utilisateurs aléatoires QPC-XXXXXXXX'],
      ['Export', 'XLSX (3 feuilles : Codes, Parties, Détail des réponses) + JSON complet'],
      ['Mobile', 'PWA installable (manifest + service worker offline)'],
    ],
    [3000, 6360]
  ),

  new Paragraph({ children: [new PageBreak()] })
);

// ---------- 2. PREMIER DÉMARRAGE -------------------------------------
children.push(
  h1('2. Premier démarrage'),

  h2('2.1 Accès depuis un navigateur'),
  num('Ouvrir l’URL https://qpc-champion-58rn.onrender.com dans Chrome, Firefox, Edge ou Safari.'),
  num('À la première visite après inactivité (15 minutes), Render réveille le serveur. Compter 30 secondes maximum avant le chargement complet.'),
  num('La page d’accueil affiche le formulaire de connexion et le bouton « Installer l’application QPC ».'),
  num('Saisir le code d’accès personnel (format QPC-XXXXXXXX) fourni par le super-administrateur, puis cliquer Entrer.'),
  info('Le code est permanent : tant qu’il n’est pas révoqué par le super-administrateur, il vous permet de vous connecter indéfiniment, même après des mois.'),

  h2('2.2 Installation comme application native'),
  h3('Android (Chrome, Edge, Samsung Internet)'),
  num('Ouvrir l’URL dans Chrome.'),
  num('Cliquer le bouton bleu « 📲 Installer l’application QPC » sur la page d’accueil, OU menu ⋮ > Installer l’application.'),
  num('Confirmer dans la fenêtre native.'),
  num('Une icône QPC apparaît sur l’écran d’accueil. L’app se lance désormais en plein écran, sans la barre du navigateur.'),

  h3('iOS / iPadOS (Safari)'),
  num('Ouvrir l’URL dans Safari (Chrome iOS ne permet pas l’installation PWA).'),
  num('Toucher le bouton Partager (carré avec flèche montante) en bas.'),
  num('Faire défiler vers le bas et toucher « Sur l’écran d’accueil ».'),
  num('Confirmer en haut à droite. L’icône QPC apparaît sur le springboard.'),

  h3('Desktop (Windows, macOS, Linux)'),
  num('Dans Chrome ou Edge, cliquer l’icône d’installation à droite de la barre d’adresse, OU menu ⋮ > Installer QPC.'),
  num('L’application s’ouvre dans sa propre fenêtre (mode standalone).'),
  num('Sur Windows, elle apparaît dans le menu Démarrer ; sur macOS, dans le Launchpad.'),

  tip('Avantages de l’installation : démarrage plus rapide, mode plein écran sans bandeau de navigation, fonctionnement partiellement hors-ligne (les fichiers statiques sont mis en cache).'),

  h2('2.3 Mises à jour automatiques'),
  p('L’application étant déployée sur un serveur central, vous bénéficiez automatiquement des dernières évolutions à chaque ouverture, sans installation ni mise à jour manuelle. Le service worker s’assure que la version la plus récente est chargée à chaque visite.'),

  new Paragraph({ children: [new PageBreak()] })
);

// ---------- 3. GUIDE JOUEUR ------------------------------------------
children.push(
  h1('3. Guide utilisateur (joueur)'),

  h2('3.1 Page de connexion'),
  p('La page d’accueil présente :'),
  bullet('Une illustration thématique (livre d’économie ouvert, nuage des 16 domaines, circuit économique, chaîne de valeur agricole)'),
  bullet('Un formulaire de connexion (champ « Code d’accès » + bouton Entrer)'),
  bullet('Un lien discret « Accès super-administrateur → » réservé à l’admin'),
  bullet('Un bloc « Installer l’application QPC » avec le bouton d’installation PWA'),

  h2('3.2 Tableau de bord personnel (après connexion)'),
  p('Une fois connecté, vous accédez à votre page « Que voulez-vous faire ? » qui propose quatre cartes :'),
  table(
    ['Carte', 'Action'],
    [
      ['▶ Nouvelle partie', 'Configurer une partie en solo : choix des manches, des domaines, du mode de réponse, et du volume.'],
      ['⚔️ Mes duels', 'Défier un autre joueur, accepter une invitation, ou rejoindre une confrontation organisée par l’admin.'],
      ['📖 Révision libre', 'Parcourir librement les 770 questions par domaine et par manche, sans timer ni score. Pour réviser.'],
      ['📊 Mes parties', 'Historique de toutes vos parties terminées : score total, taux de bonnes réponses, comparaison entre manches.'],
    ],
    [2800, 6560]
  ),
  notice('Si l’administrateur a désactivé la Révision libre, ou si vous avez un duel actif en cours, cette carte sera temporairement masquée et remplacée par un bandeau jaune explicatif.'),

  h2('3.3 Lancer une nouvelle partie solo'),
  num('Cliquer sur la carte « Nouvelle partie ».'),
  num('Cocher les manches souhaitées : Manche 1 (Les 4 à la suite), Manche 2 (Face-à-face), et/ou Manche 3 (La finale).'),
  num('Sélectionner les domaines à inclure dans la sélection aléatoire (tout coché par défaut). Le badge à droite indique le nombre de questions disponibles par domaine.'),
  num('Indiquer le volume : nombre de séries en Manche 1 (1 à 20), de duels en Manche 2 (1 à 10), de finales en Manche 3 (1 à 4).'),
  num('Choisir le mode de réponse : « Saisie libre » (tape la réponse) ou « QCM (choix multiples) ». Selon les paramètres administrateur, cette option peut être imposée.'),
  num('Cliquer Démarrer la partie. Le jeu se lance immédiatement.'),

  h2('3.4 Les trois manches en détail'),
  h3('Manche 1 — Les 4 à la suite'),
  p('Une série de 4 questions sur un même thème. Le compteur démarre à 40 secondes pour l’ensemble de la série (et non par question). Chaque bonne réponse vaut 1 point. Vous pouvez répondre rapidement pour gagner du temps sur les suivantes. Si le temps est épuisé, les questions restantes sont automatiquement marquées comme passées.'),

  h3('Manche 2 — Face-à-face'),
  p('Six questions de difficulté croissante valant respectivement 1, 2, 3, 4, 5 et 6 points. À chaque tour, vous choisissez vous-même la valeur que vous souhaitez tenter (cellules colorées). Une fois la valeur sélectionnée, vous disposez de 25 secondes pour répondre. En cas d’erreur ou de question passée, aucun point n’est attribué pour cette valeur.'),
  tip('Stratégie : commencez par les valeurs basses (1-2 pts) que vous maîtrisez sûrement, gardez les valeurs hautes pour les domaines forts.'),

  h3('Manche 3 — La finale'),
  p('Enchaînement rapide de questions sur un même thème, avec 15 secondes par question. Chaque bonne réponse vaut 1 point. La manche s’arrête lorsque vous atteignez 9 points (victoire) ou lorsque toutes les questions du pack ont été posées.'),

  h2('3.5 Pause et reprise'),
  p('À tout moment pendant une partie, vous pouvez cliquer sur « Mettre en pause » en bas à gauche de l’écran de jeu. Votre score, votre position dans le plan de partie et toutes vos réponses sont sauvegardés.'),
  p('À votre prochaine connexion, un bandeau orange en haut de l’accueil propose de « Reprendre » la partie ou de l’« Abandonner ».'),
  notice('La pause/reprise n’est pas disponible pour les duels (qui se jouent d’une traite) ni pour les confrontations admin.'),

  h2('3.6 Mode QCM et comparaison souple des réponses'),
  h3('Mode saisie libre'),
  p('Vous tapez votre réponse. Le système compare en ignorant les accents, la casse, la ponctuation, les articles français (« le », « la », « les », « l’ », « d’ », « un », « du »...) et les variantes entre parenthèses.'),
  p('Exemple : pour la réponse attendue « La BCE (Banque centrale européenne) », les saisies suivantes sont toutes acceptées : bce, Banque Centrale Européenne, banque centrale europeenne, BCE.'),

  h3('Mode QCM'),
  p('Quatre propositions s’affichent. La position des choix est randomisée à chaque rendu : la bonne réponse n’est jamais à la même position d’une partie à l’autre.'),
  bullet('Si la question accepte une seule bonne réponse, les choix sont affichés avec des boutons radio (sélection unique).'),
  bullet('Si la question accepte plusieurs bonnes réponses simultanées, les choix sont affichés avec des cases à cocher. Pour gagner les points, vous devez cocher TOUTES les bonnes réponses et SEULEMENT celles-là.'),
  info('Les distracteurs sont toujours conçus pour être de longueur supérieure ou égale à la bonne réponse, afin d’éviter qu’on identifie la bonne réponse par la longueur du texte.'),

  h2('3.7 Écran de résultats'),
  p('À la fin de chaque partie, l’écran de résultats affiche :'),
  bullet('Le score total en gros'),
  bullet('Le détail par manche'),
  bullet('Le nombre de questions répondues, bonnes et mauvaises'),
  bullet('La liste complète des questions avec : votre réponse, la réponse attendue, l’explication, et les liens cliquables vers les sources documentaires (Wikipedia FR, sites officiels)'),
  tip('Profitez de l’écran de résultats pour cliquer sur les liens des références : vous accédez directement à l’article Wikipedia ou au site institutionnel correspondant pour approfondir.'),

  h2('3.8 Mes duels'),
  h3('Créer un duel'),
  num('Cliquer sur la carte « Mes duels ».'),
  num('Dans le formulaire « Défier un joueur », saisir le code d’accès de l’adversaire (format QPC-XXXXXXXX).'),
  num('Cocher les manches à inclure (par défaut Manche 1 et 2).'),
  num('Optionnellement, filtrer les domaines via le menu déroulant.'),
  num('Cocher « 🏆 Afficher le scoreboard en direct pendant le duel » si vous souhaitez voir le score de votre adversaire en temps réel.'),
  num('Cliquer « ⚔️ Lancer le duel ». L’adversaire reçoit une invitation visible dans son propre onglet « Mes duels ».'),

  h3('Accepter ou refuser une invitation'),
  p('Toute invitation reçue apparaît dans la section « Invitations reçues » de votre page Mes duels avec deux boutons :'),
  bullet('✓ Accepter — le duel passe au statut actif, vous pouvez le jouer.'),
  bullet('✗ Refuser — le duel est annulé.'),

  h3('Jouer le duel'),
  p('Une fois accepté, le duel apparaît dans « Duels actifs » avec un bouton « ▶ Jouer maintenant ». Les questions sont identiques pour les deux joueurs (mêmes packs, même ordre) afin de garantir une comparaison équitable.'),
  notice('Pendant qu’un duel est en cours (accepté mais non terminé de votre côté), l’accès à la Révision libre est temporairement bloqué.'),

  h3('Scoreboard live'),
  p('Si le scoreboard live a été activé pour ce duel (par l’initiateur ou par l’administrateur), un widget fixe en haut à droite (ou en bas sur mobile) affiche en permanence :'),
  bullet('Le rang de chaque participant (#1, #2, …)'),
  bullet('Son nom (ou son code à défaut)'),
  bullet('Sa progression (par exemple « 3/12 questions »)'),
  bullet('Son score actuel en points'),
  p('Le widget se met à jour automatiquement toutes les 4 secondes. Votre propre ligne est surlignée en bleu. Les joueurs ayant terminé sont marqués ✓.'),

  h3('Résultats du duel'),
  p('Quand tous les participants ont terminé, le duel passe au statut « Terminé » et un écran de résultats comparatif s’affiche, indiquant le vainqueur (score le plus élevé) et le détail par participant.'),

  h2('3.9 Mes parties (historique)'),
  p('La carte « Mes parties » affiche en haut vos statistiques cumulées :'),
  bullet('Nombre total de parties jouées'),
  bullet('Score cumulé sur toutes les parties'),
  bullet('Meilleur score sur une seule partie'),
  bullet('Nombre total de questions répondues'),
  bullet('Pourcentage global de bonnes réponses'),
  p('En dessous, la liste de toutes vos parties terminées dans l’ordre chronologique inverse, avec date, score, et nombre de bonnes réponses.'),

  new Paragraph({ children: [new PageBreak()] })
);

// ---------- 4. GUIDE SUPER-ADMIN -------------------------------------
children.push(
  h1('4. Guide super-administrateur'),

  h2('4.1 Connexion en mode administrateur'),
  num('Sur la page d’accueil, cliquer sur le lien discret « Accès super-administrateur → » sous le bouton Entrer.'),
  num('Saisir le mot de passe administrateur (défini à la variable d’environnement ADMIN_PASSWORD du déploiement Render).'),
  num('Cliquer Entrer admin. Vous accédez au tableau de bord administrateur.'),
  notice('Le mot de passe administrateur doit être conservé strictement confidentiel. Il donne accès à toutes les fonctions sensibles : génération de codes, dashboard centralisé, suppression de données, paramètres globaux, import de domaines.'),

  h2('4.2 Vue d’ensemble du panneau admin'),
  p('Le tableau de bord est organisé en plusieurs sections, accessibles en faisant défiler la page :'),
  table(
    ['Section', 'Rôle'],
    [
      ['Résumé global', 'Statistiques clés : codes actifs, parties jouées, taux de bonnes réponses.'],
      ['Codes d’accès', 'Génération, copie et révocation des codes utilisateurs.'],
      ['Organiser une confrontation', 'Convocation forcée de 2+ joueurs à un tournoi avec configuration unique.'],
      ['Confrontations en cours et terminées', 'Liste des duels et tournois avec scores et vainqueurs.'],
      ['Classement par utilisateur', 'Leaderboard global, avec bouton ✕ pour effacer un utilisateur.'],
      ['Parties récentes', '50 dernières parties terminées, avec bouton ✕ pour supprimer une partie.'],
      ['Paramètres de l’application', 'Toggles globaux : Révision libre, mode QCM, scoreboard live.'],
      ['Exporter la base', 'Téléchargement Excel ou JSON, importer un export antérieur.'],
      ['Domaines personnalisés', 'Import de séries de questions externes en .txt ou .json.'],
      ['Zone dangereuse', 'Suppression totale de la base (codes + parties + matches).'],
    ],
    [3500, 5860]
  ),

  h2('4.3 Gérer les codes d’accès'),
  h3('Générer un nouveau code'),
  p('Dans la section « Codes d’accès », saisir optionnellement un nom (par exemple « Marie Dupont », « Promo 2026 — étudiant 1 ») puis cliquer « + Générer un nouveau code ». Un code aléatoire au format QPC-XXXXXXXX est créé immédiatement, copié dans le presse-papiers et affiché en alerte.'),
  p('Le code se compose d’un alphabet sans caractères ambigus : pas de 0/O, ni 1/I/L, pour faciliter la transmission orale ou par SMS.'),

  h3('Partager le code à un utilisateur'),
  p('Transmettre simplement le code (par e-mail, SMS, WhatsApp, papier) accompagné de l’URL de l’application : https://qpc-champion-58rn.onrender.com. L’utilisateur tape son code, clique Entrer, et joue.'),

  h3('Suivre l’activité d’un code'),
  p('Chaque code de la liste affiche en dessous : nombre de parties jouées, points cumulés, date de dernière connexion, date de création.'),

  h3('Copier ou révoquer'),
  bullet('📋 Copier — recopie le code dans le presse-papiers (utile pour le partager à nouveau).'),
  bullet('✕ Révoquer — supprime définitivement le code. L’utilisateur ne pourra plus se connecter avec ce code. Les parties déjà enregistrées sont conservées dans l’historique.'),
  tip('La révocation est immédiate. Pour réinitialiser le score d’un utilisateur sans supprimer son accès, utilisez plutôt le bouton ✕ dans le « Classement par utilisateur » (voir section 4.8).'),

  h2('4.4 Organiser une confrontation'),
  p('Une « confrontation » est un duel ou un tournoi (3 joueurs et plus) organisé directement par l’administrateur sans demander l’accord des participants. Idéal pour les examens, les concours, ou les compétitions amicales.'),
  num('Dans la section « Organiser une confrontation », cocher dans la liste les participants à convoquer (2 minimum).'),
  num('Sélectionner les manches à inclure (1, 2 et/ou 3).'),
  num('Indiquer le nombre de séries par manche : Nb. séries Manche 1, Duels M2, Finales M3.'),
  num('Optionnellement, filtrer par domaine via le menu déroulant.'),
  num('Cocher « 🏆 Afficher le scoreboard en direct pendant la confrontation » si souhaité.'),
  num('Cliquer « ⚔️ Lancer la confrontation ».'),
  info('Contrairement aux duels utilisateur-à-utilisateur, les participants à une confrontation admin sont automatiquement convoqués (statut accepté). Ils trouvent la partie directement dans « Mes duels > Duels actifs ».'),

  h2('4.5 Suivre les confrontations'),
  p('La section « Confrontations en cours et terminées » liste tous les duels et tournois avec :'),
  bullet('Type (Duel ou Tournoi N joueurs) et statut (En attente / Actif / Terminé / Annulé)'),
  bullet('Vainqueur (🏆) lorsque la partie est terminée'),
  bullet('Liste des participants avec leur score'),
  bullet('Date de création et nombre de packs'),
  bullet('Bouton ✕ pour supprimer une confrontation'),

  h2('4.6 Paramètres globaux de l’application'),
  h3('Toggle « Révision libre »'),
  p('Active ou désactive en un clic le mode Révision libre pour tous les utilisateurs. Particulièrement utile pendant une session d’examen où vous ne voulez pas que les candidats consultent les questions à l’avance. Désactivation immédiate.'),

  h3('Mode des questions (QCM)'),
  p('Trois options exclusives :'),
  bullet('Laisser le choix au joueur — chaque joueur décide au début de sa partie (mode par défaut).'),
  bullet('Forcer la saisie libre — désactive le QCM pour tous, plus difficile.'),
  bullet('Forcer QCM — impose les choix multiples pour tous, plus accessible.'),

  h3('Scoreboard en direct'),
  p('Trois options exclusives qui s’appliquent aux duels et confrontations :'),
  bullet('Laisser le choix au créateur — l’initiateur du duel décide au moment de la création (mode par défaut).'),
  bullet('Toujours activé — le scoreboard live est forcé sur tous les duels et confrontations.'),
  bullet('Toujours désactivé — interdit le scoreboard live, même si demandé.'),

  h2('4.7 Tableau de bord : classement'),
  p('Le « Classement par utilisateur » liste tous les utilisateurs ayant joué au moins une partie, triés par score total décroissant. Chaque ligne affiche :'),
  bullet('Rang (#1, #2, ...)'),
  bullet('Code et nom du joueur'),
  bullet('Nombre de parties, ratio bonnes/total avec pourcentage'),
  bullet('Score total en points'),
  bullet('Bouton ✕ : efface toutes les parties de cet utilisateur (réinitialisation du classement). Le code reste valide.'),
  notice('Le bouton ✕ du classement supprime TOUTES les parties de l’utilisateur ; à utiliser avec prudence ou pour repartir d’une base propre. L’opération est irréversible.'),

  h2('4.8 Parties récentes'),
  p('Liste des 50 dernières parties terminées (toutes confondues). Chaque ligne donne la date, le code joueur, le score et le ratio bonnes réponses.'),
  p('Le bouton ✕ à droite supprime UNE partie spécifique (par exemple une partie de test, ou une partie corrompue). Le compteur de parties du joueur concerné est automatiquement décrémenté.'),

  h2('4.9 Exporter la base de données'),
  h3('Export Excel'),
  p('Le bouton « 📊 Exporter en Excel (.xlsx) » télécharge un fichier organisé en trois feuilles :'),
  table(
    ['Feuille', 'Contenu'],
    [
      ['Codes', 'Tous les codes avec nom, date de création, dernière connexion, parties jouées, score cumulé, questions répondues, bonnes réponses.'],
      ['Parties', 'Toutes les parties avec ID, code utilisateur, date, score total, scores par manche, nb questions et bonnes réponses.'],
      ['Détail réponses', 'Question par question : énoncé, réponse attendue, réponse donnée, correct (Oui/Non), points obtenus.'],
    ],
    [2400, 6960]
  ),
  tip('Le fichier Excel peut être ouvert dans LibreOffice, OnlyOffice ou Google Sheets. Idéal pour produire des bulletins, analyser les questions difficiles, ou archiver les résultats d’une session.'),

  h3('Export / Import JSON'),
  p('« 📥 Exporter en JSON » télécharge un fichier complet contenant l’état exact de la base (auth + games). « 📤 Importer un JSON » restaure cet état (remplace toutes les données existantes).'),
  notice('L’import JSON est destructif : il écrase les codes et les parties existantes. À utiliser uniquement pour restaurer une sauvegarde ou migrer entre déploiements.'),

  h2('4.10 Domaines personnalisés (import .txt ou .json)'),
  p('Cette fonctionnalité permet d’ajouter vos propres séries de questions sans toucher au code source. Le domaine importé devient immédiatement disponible pour tous les joueurs dans la configuration de partie, la révision libre, les duels et les confrontations.'),

  h3('Importer un fichier'),
  num('Dans la carte « Domaines personnalisés », cliquer « 📥 Importer un fichier (.txt / .json) ».'),
  num('Sélectionner votre fichier (format détecté automatiquement à partir de l’extension).'),
  num('Une alerte confirme le succès avec le nombre de packs et questions importés.'),
  num('Le domaine apparaît dans la liste juste en dessous, avec son nom, sa description, son nombre de packs, et un bouton ✕ pour le supprimer ultérieurement.'),

  h3('Format .txt — recommandé, lisible humain'),
  p('Une ligne par directive. Les choix QCM commencent par * (correct) ou - (distracteur).'),
  code(`DOMAINE: Mon nouveau domaine
DESCRIPTION: Description optionnelle (1 ligne)

PACK: Titre du premier pack
MANCHE: 1
THEME: Sous-thème optionnel

Q: Quelle est la capitale du Togo ?
R: Lomé
* Lomé
- Sokodé
- Kara
- Atakpamé
E: Lomé est la capitale du Togo, sur le golfe de Guinée.
S: https://fr.wikipedia.org/wiki/Lom%C3%A9

Q: En quelle année le Togo est-il devenu indépendant ?
R: 1960
* Le 27 avril 1960
- 1958
- 1962
- 1956
E: Indépendance proclamée par Sylvanus Olympio.

# Lignes commençant par # = commentaires ignorés

PACK: Titre du deuxième pack
MANCHE: 2

Q: Question valant 1 point ?
R: Réponse
PTS: 1
* Réponse
- Mauvais
- Encore mauvais
- Distracteur`),

  h3('Format .json — technique'),
  code(`{
  "domain": "Mon nouveau domaine",
  "description": "Description optionnelle",
  "packs": [
    {
      "title": "Titre du pack",
      "manche": "manche1",
      "theme": "Sous-thème",
      "questions": [
        {
          "q": "Quelle est la capitale du Togo ?",
          "r": "Lomé",
          "choices": ["Lomé", "Sokodé", "Kara", "Atakpamé"],
          "correctIndices": [0],
          "e": "Lomé est la capitale du Togo.",
          "ref": "https://fr.wikipedia.org/wiki/Lom%C3%A9"
        }
      ]
    }
  ]
}`),

  h3('Règles à respecter'),
  bullet('DOMAINE: est obligatoire (max 80 caractères). Le nom doit être unique et ne pas collisionner avec un domaine intégré.'),
  bullet('MANCHE: doit être 1, 2 ou 3 (défaut : 1 si non précisé).'),
  bullet('Chaque Q: doit obligatoirement avoir un R: non vide.'),
  bullet('Pour activer le QCM sur une question, fournir au moins 2 choix (au moins 1 marqué *).'),
  bullet('E: explication facultative, S: source/URL facultative, PTS: points (manche 2 uniquement, 1 à 6).'),
  bullet('Réimporter un fichier avec le même nom de domaine remplace l’ancien.'),
  bullet('Boutons « ⤓ Modèle .txt » et « ⤓ Modèle .json » téléchargent un exemple pré-rempli prêt à modifier.'),

  h3('Supprimer un domaine personnalisé'),
  p('Cliquer le bouton ✕ rouge à droite du domaine dans la liste. Confirmer la suppression : le domaine est retiré et ses questions ne sont plus jouables.'),

  h2('4.11 Zone dangereuse'),
  p('Le bouton « 🗑️ Supprimer toute la base » purge complètement les codes, les parties et les confrontations. Pour confirmer, taper exactement « SUPPRIMER » dans la fenêtre de saisie puis confirmer une seconde fois.'),
  notice('OPÉRATION IRRÉVERSIBLE. Faire impérativement un export JSON avant si vous voulez pouvoir restaurer ultérieurement.'),

  new Paragraph({ children: [new PageBreak()] })
);

// ---------- 5. DOMAINES COUVERTS -------------------------------------
children.push(
  h1('5. Les 17 domaines couverts'),
  p('La base intégrée totalise 770 questions documentées (chiffre arrondi, peut évoluer avec les domaines personnalisés ajoutés par votre admin). Voici les domaines disponibles, triés par taille décroissante :'),
  table(
    ['Domaine', 'Questions', 'Thèmes principaux'],
    [
      ['Économie agricole et agribusiness', '160', 'PDDAA/CAADP, MIFA, filières café-cacao-coton, sécurité alimentaire, foncier rural, modèle de Nerlove, FAO, FIDA.'],
      ['Monnaie, finance et budget', '89', 'BCEAO, UMOA-Titres, agrégats monétaires, politique budgétaire, dette publique, microfinance, EONIA.'],
      ['Statistiques et économétrie', '88', 'AIC/BIC, ADF/KPSS, ARIMA/GARCH, Hausman, GMM, IV, panel, logit/probit, Tobit, Heckman, ridge/Lasso, bootstrap.'],
      ['Commerce, développement et Afrique', '65', 'ZLECAf, CEDEAO, UEMOA, OMC, IDE, balance des paiements, ODD, Banque mondiale.'],
      ['Microéconomie et théorie', '64', 'Préférences, courbes d’indifférence, Slutsky, Cournot, Nash, Pareto, externalités, biens publics.'],
      ['Macroéconomie et politiques', '64', 'IS-LM, AS-AD, Solow, Phillips, NAIRU, Mundell-Fleming, règle de Taylor, ZLB.'],
      ['Marchés financiers UEMOA / BRVM', '35', 'BRVM, CREPMF, SGI, DC/BR, indices BRVM 10/30, OPCVM, analyse fondamentale (PER, ROE, DCF) et technique.'],
      ['Histoire de la pensée économique', '31', 'Smith, Ricardo, Marx, Keynes, Hayek, Friedman, Schumpeter, Sen, Stiglitz, Duflo.'],
      ['Machine learning et deep learning', '31', 'k-NN, SVM, Random Forest, XGBoost, ReLU, dropout, CNN, RNN, Transformer, BERT, GPT, AUC-ROC.'],
      ['Suivi-évaluation des projets et politiques', '31', 'Cadre logique GAR, ToC, 6 critères CAD-OCDE, SYGRI FIDA, PNUD HPMEDR, RCT, DID, PSM, RDD.'],
      ['Histoire, travail, santé et éducation', '22', 'Westphalie, OIT, OMS, modèle de Becker, capital humain, espérance de vie.'],
      ['Comptabilité générale et analytique', '22', 'SYSCOHADA, plan comptable OHADA, partie double Pacioli, coûts complets, ABC, IFRS 15.'],
      ['Sciences sociales et politiques', '18', 'Foucault, Bourdieu, Weber, Granovetter, Putnam, hégémonie, biopouvoir.'],
      ['Fiscalité (Togo)', '18', 'OTR, CGI, IS 27 %, IMF 1 %, IRPP progressif, TVA 18 %, TPU, contrôle fiscal, zone franche SAZOF.'],
      ['Marchés publics et passation (Togo)', '18', 'Décret 2009-277/PR, ARMP, DNCMP, AOO, AOR, gré à gré, DRP, garanties, PPP.'],
      ['Culture générale et environnement', '10', 'Allégorie de la caverne (Platon), Accord de Paris, COP21, ODD, règle de Hotelling.'],
      ['Domaines personnalisés', '+', 'Importés par l’administrateur via .txt ou .json (voir section 4.10).'],
    ],
    [3000, 1200, 5160]
  ),

  h2('5.1 Référencement des réponses'),
  p('Chaque question dispose d’au moins une référence textuelle (auteur, date, ouvrage) et d’au moins une URL cliquable :'),
  bullet('Une URL Wikipedia FR (utilisée comme première référence universelle, page de recherche pour garantir un lien actif).'),
  bullet('Une URL institutionnelle pertinente selon le domaine : BCEAO, BRVM, IFRS, OHADA, FAO, Banque mondiale, OCDE, ONU, etc.'),
  p('Les liens s’ouvrent dans un nouvel onglet (target=_blank, rel=noopener) sans interrompre votre partie.'),

  new Paragraph({ children: [new PageBreak()] })
);

// ---------- 6. API REST (ANNEXE TECHNIQUE) ---------------------------
children.push(
  h1('6. Annexe technique : API REST'),
  p('Toutes les routes hors /api/auth/* exigent un header HTTP « Authorization: Bearer <token> ». Le token est obtenu via POST /api/auth/login (utilisateur) ou POST /api/auth/admin (super-admin). Token utilisateur valable 10 ans, token admin valable 7 jours.'),

  h2('6.1 Routes utilisateur'),
  table(
    ['Méthode', 'Chemin', 'Description'],
    [
      ['POST', '/api/auth/login', 'Login avec un code QPC-XXXXXXXX. Retourne un token.'],
      ['GET', '/api/meta', 'Méta-données : nb questions, domaines, settings, hasActiveDuel.'],
      ['GET', '/api/packs/:manche', 'Packs filtrés (manche1/2/3) avec ?domains=A,B,C.'],
      ['POST', '/api/me/game', 'Archive une partie solo terminée.'],
      ['GET', '/api/me/games', 'Historique personnel.'],
      ['GET', '/api/me/duels', 'Liste des duels (invitations, actifs, terminés).'],
      ['POST', '/api/me/duels', 'Créer un duel : { opponentCode, config }.'],
      ['POST', '/api/me/duels/:id/accept', 'Accepter une invitation.'],
      ['POST', '/api/me/duels/:id/decline', 'Refuser une invitation.'],
      ['GET', '/api/me/duels/:id', 'Détail d’un duel.'],
      ['POST', '/api/me/duels/:id/game', 'Soumettre son résultat de duel.'],
      ['POST', '/api/me/duels/:id/progress', 'Envoyer son score en cours (scoreboard live).'],
      ['GET', '/api/me/duels/:id/scoreboard', 'Récupérer le scoreboard live.'],
    ],
    [1200, 3600, 4560]
  ),

  h2('6.2 Routes administrateur'),
  table(
    ['Méthode', 'Chemin', 'Description'],
    [
      ['POST', '/api/auth/admin', 'Login admin avec le mot de passe.'],
      ['GET', '/api/admin/codes', 'Liste des codes avec stats.'],
      ['POST', '/api/admin/codes', 'Génère un nouveau code.'],
      ['DELETE', '/api/admin/codes/:code', 'Révoque un code.'],
      ['DELETE', '/api/admin/codes/:code/games', 'Vide le classement d’un utilisateur.'],
      ['GET', '/api/admin/settings', 'Récupère les réglages.'],
      ['PUT', '/api/admin/settings', 'Modifie les réglages (reviewEnabled, qcmMode, liveScoreboardMode).'],
      ['GET', '/api/admin/dashboard', 'Stats globales + classement + parties récentes.'],
      ['GET', '/api/admin/game/:id', 'Détail d’une partie.'],
      ['DELETE', '/api/admin/game/:id', 'Supprime une partie.'],
      ['GET', '/api/admin/duels', 'Liste de tous les duels.'],
      ['POST', '/api/admin/duels', 'Convoque une confrontation.'],
      ['DELETE', '/api/admin/duels/:id', 'Supprime une confrontation.'],
      ['GET', '/api/admin/export', 'Export complet en JSON.'],
      ['GET', '/api/admin/export-excel', 'Export Excel (3 feuilles).'],
      ['POST', '/api/admin/import', 'Restaure un export JSON.'],
      ['DELETE', '/api/admin/all-data', 'Purge totale (body {confirm:"OUI-SUPPRIMER-TOUT"}).'],
      ['GET', '/api/admin/custom-domains', 'Liste des domaines personnalisés.'],
      ['POST', '/api/admin/custom-domains', 'Importer un domaine ({format, content}).'],
      ['DELETE', '/api/admin/custom-domains/:name', 'Supprimer un domaine personnalisé.'],
    ],
    [1200, 3800, 4360]
  ),

  h2('6.3 Persistance et déploiement'),
  p('L’application est hébergée sur Render.com (free tier). Les fichiers de données (data/auth.json, data/games.json, data/matches.json, data/custom-packs.json) sont automatiquement synchronisés vers la branche « data » du repo GitHub Ricard228/qpc-app à chaque écriture (avec un délai de 4 secondes pour regrouper plusieurs modifications).'),
  p('Au démarrage, le serveur récupère ces fichiers depuis GitHub pour restaurer l’état exact, même après un redémarrage Render (puisque le free tier n’a pas de disque persistant).'),
  p('Cette architecture garantit : zéro perte de données, historique complet des modifications consultable sur GitHub, possibilité de restauration à tout point dans le temps.'),

  new Paragraph({ children: [new PageBreak()] })
);

// ---------- 7. FAQ et DÉPANNAGE --------------------------------------
children.push(
  h1('7. FAQ et dépannage'),

  h3('Q. La page met longtemps à se charger lors de la première visite.'),
  p('R. Le serveur Render free tier s’endort après 15 minutes d’inactivité. Le premier visiteur déclenche le réveil qui prend 30 à 45 secondes. Les visites suivantes sont instantanées tant que le service reste actif.'),

  h3('Q. J’ai oublié mon code d’accès.'),
  p('R. Contactez le super-administrateur de votre organisation. Il peut consulter la liste de tous les codes générés dans son panneau admin, le retrouver par nom, ou vous en générer un nouveau.'),

  h3('Q. Je suis sur iPhone et le bouton « Installer l’application QPC » ne fait rien.'),
  p('R. Sur iOS, l’installation PWA ne peut être déclenchée qu’au travers du menu Partager de Safari. Vous ne pouvez pas l’installer depuis Chrome ou autres navigateurs sur iOS. Reportez-vous à la section 2.2 « iOS / iPadOS (Safari) ».'),

  h3('Q. Ma partie a planté ou s’est interrompue (réseau, batterie, etc.).'),
  p('R. Si vous étiez en partie solo, votre progression a été sauvegardée à chaque réponse. À votre prochaine connexion, un bandeau orange propose de reprendre. Pour un duel, malheureusement la sauvegarde n’est pas activée — vous devrez recommencer.'),

  h3('Q. Le scoreboard live n’affiche rien.'),
  p('R. Plusieurs causes possibles : (1) l’option n’a pas été activée pour ce duel par son créateur ou par l’administrateur ; (2) l’adversaire n’a pas encore commencé ; (3) problème de connexion réseau (le polling est interrompu).'),

  h3('Q. J’ai créé un duel mais l’adversaire ne voit pas l’invitation.'),
  p('R. Demandez à l’adversaire de vérifier qu’il s’est bien connecté avec le code que vous avez utilisé pour le défi. L’invitation apparaît dans sa carte « Mes duels » > « Invitations reçues ». Il peut aussi faire un rafraîchissement de la page (F5 ou pull-to-refresh sur mobile).'),

  h3('Q. Une question semble mal corrigée — ma réponse correcte est marquée fausse.'),
  p('R. Vérifiez l’orthographe précise. Le système accepte plusieurs variantes (sans accents, sans articles, etc.) mais reste lié au texte de référence. Si votre formulation est synonyme mais clairement différente du texte attendu, elle peut être refusée. Signalez le cas à votre administrateur qui pourra ajuster.'),

  h3('Q. L’admin a importé un domaine personnalisé mais je ne le vois pas.'),
  p('R. Rafraîchissez la page (F5). Le menu des domaines est rechargé à chaque ouverture de la configuration de partie ou de la révision libre. Si l’admin l’a supprimé après import, le domaine n’apparaît évidemment plus.'),

  h3('Q. Comment exporter mes résultats personnels ?'),
  p('R. Les statistiques personnelles sont visibles dans « Mes parties ». Pour un export Excel détaillé, demandez à l’administrateur qui dispose du bouton « Exporter en Excel » couvrant tous les joueurs (3 feuilles avec détail des réponses).'),

  h3('Q. Je veux changer de profil sur le même appareil.'),
  p('R. Cliquez « Déconnexion » en haut à droite (ou « Changer de profil » sur l’accueil), puis saisissez l’autre code d’accès. Plusieurs personnes peuvent partager un même appareil sans interférer.'),

  h3('Q. L’application fonctionne-t-elle hors connexion ?'),
  p('R. Partiellement. Les fichiers statiques de l’app (HTML, CSS, JS, icônes) sont mis en cache par le service worker, donc l’app peut s’ouvrir hors-ligne. Mais le contenu (questions, codes, scores) nécessite une connexion réseau au serveur Render. En mode hors-ligne, une fenêtre d’erreur s’affiche.'),

  new Paragraph({ children: [new PageBreak()] })
);

// ---------- 8. CRÉDITS ET LICENCE ------------------------------------
children.push(
  h1('8. Crédits et licence'),

  h2('Conception et développement'),
  p('Kossi Nevame AGBENU'),
  p('NEVAME Data House et École Supérieure d’Agronomie, Université de Lomé'),

  h2('Contenu pédagogique'),
  p('Recueil « Questions pour un Champion — Édition Économie & Sciences sociales ». Format inspiré de l’émission éponyme de TV5 Monde.'),

  h2('Sources de référence consultées'),
  bullet('Adam Smith, La Richesse des nations (1776)'),
  bullet('Cournot, Recherches sur les principes mathématiques de la théorie des richesses (1838)'),
  bullet('Keynes, Théorie générale de l’emploi, de l’intérêt et de la monnaie (1936)'),
  bullet('Solow, A Contribution to the Theory of Economic Growth, QJE (1956)'),
  bullet('Vernimmen, Finance d’entreprise (édition récente)'),
  bullet('Mankiw, Macroeconomics ; Varian, Intermediate Microeconomics'),
  bullet('Damodaran, Investment Valuation'),
  bullet('OECD/DAC Glossary of Key Terms in Evaluation (2002, mise à jour 2019)'),
  bullet('PNUD Handbook on Planning, Monitoring and Evaluating for Development Results (2009)'),
  bullet('IFAD/FIDA RIMS (Results and Impact Management System / SYGRI)'),
  bullet('Code OHADA et SYSCOHADA révisé 2017 (AUDCIF)'),
  bullet('Code Général des Impôts (Togo), Loi de finances 2024'),
  bullet('Décret 2009-277/PR portant Code des Marchés Publics du Togo'),
  bullet('Documents BCEAO, BRVM, CREPMF, FAO, Banque mondiale'),
  bullet('Wikipédia FR pour les concepts généraux'),

  h2('Technologies utilisées'),
  table(
    ['Composant', 'Technologie / Bibliothèque'],
    [
      ['Backend HTTP', 'Express.js (Node.js 20)'],
      ['Authentification', 'HMAC-SHA256 (module crypto natif)'],
      ['Export Excel', 'SheetJS / xlsx'],
      ['Frontend', 'JavaScript Vanilla (aucun framework)'],
      ['PWA', 'manifest.json + service worker custom'],
      ['Icônes', 'SVG vectoriels + PNG générés via System.Drawing'],
      ['Hébergement', 'Render.com Web Service (free tier)'],
      ['Persistance', 'GitHub Contents API (branche data, sync auto)'],
      ['Version Node', '20 LTS (Temurin)'],
    ],
    [3000, 6360]
  ),

  h2('Licence'),
  p('ISC — Code source disponible sur https://github.com/Ricard228/qpc-app'),

  spacer(),
  p('', { children: [
    new TextRun({ text: 'Pour toute remarque ou suggestion d’évolution, ouvrir un ticket : ', font: 'Arial', size: 22 }),
    link('github.com/Ricard228/qpc-app/issues', 'https://github.com/Ricard228/qpc-app/issues')
  ]}),

  spacer(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 600 },
    children: [new TextRun({ text: '— Fin du guide —', font: 'Arial', size: 22, italics: true, color: '6B7280' })]
  }),
);

// =====================================================================
// CRÉATION DU DOCUMENT
// =====================================================================
const doc = new Document({
  creator: 'Kossi Nevame AGBENU',
  title: 'QPC — Guide d’utilisation',
  description: 'Manuel complet de l’application Questions pour un Champion',
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, color: QPC_BLUE, font: 'Arial' },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, color: QPC_BLUE, font: 'Arial' },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 22, bold: true, color: QPC_BLUE_DARK, font: 'Arial' },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: 'bullets',
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
        ] },
      { reference: 'numbers',
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        ] },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },  // A4
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: 'QPC — Guide d’utilisation', font: 'Arial', size: 18, color: '6B7280' })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Page ', font: 'Arial', size: 18, color: '6B7280' }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 18, color: '6B7280' }),
            new TextRun({ text: ' sur ', font: 'Arial', size: 18, color: '6B7280' }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Arial', size: 18, color: '6B7280' }),
            new TextRun({ text: '  ·  Conçu par Kossi Nevame AGBENU  ·  ', font: 'Arial', size: 18, color: '6B7280' }),
            new TextRun({ text: 'v2.18', font: 'Arial', size: 18, color: QPC_BLUE, bold: true }),
          ]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = path.join(__dirname, 'Guide-utilisation-QPC.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('✅ Guide créé :', outPath);
  console.log('   Taille :', (buffer.length / 1024).toFixed(1), 'Ko');
});
