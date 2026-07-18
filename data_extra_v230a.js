// =====================================================================
// data_extra_v230a.js — v2.30 : renforcement Fiscalité (Togo) +104,
// Marchés publics (Togo) +104, Comptabilité +100. Packs manche1 (4 q).
// Générateurs paramétriques déterministes + questions rédigées.
// =====================================================================

const FISC = 'Fiscalité (Togo)';
const MP   = 'Marchés publics et passation (Togo)';
const CPT  = 'Comptabilité générale et analytique';

const F = (n) => n.toLocaleString('fr-FR').replace(/ | /g, ' ');

function mk(q, r, w1, w2, w3, e, ref) {
  return { q, r, choices: [r, w1, w2, w3], correctIndices: [0], e, ref };
}

function packify(domain, theme, titre, flat) {
  const packs = [];
  for (let i = 0; i + 4 <= flat.length; i += 4) {
    packs.push({
      titre: `${titre} — Série ${packs.length + 1}`,
      theme, domain,
      questions: flat.slice(i, i + 4).map((x, j) => ({ id: `q${j + 1}`, pts: 1, ...x }))
    });
  }
  return packs;
}

// =====================================================================
// FISCALITÉ (TOGO) — 104 questions
// =====================================================================
const fisc = [];

// --- TVA 18 % : HT → TTC (8) ---
[[100000,118000],[250000,295000],[500000,590000],[750000,885000],[1200000,1416000],[2000000,2360000],[3500000,4130000],[80000,94400]]
.forEach(([ht, ttc]) => fisc.push(mk(
  `Avec la TVA togolaise au taux standard de 18 %, un bien facturé ${F(ht)} FCFA HT coûte TTC :`,
  `${F(ttc)} FCFA`, `${F(Math.round(ht*1.1))} FCFA`, `${F(Math.round(ht*1.25))} FCFA`, `${F(Math.round(ht*1.08))} FCFA`,
  `TTC = HT × 1,18 = ${F(ht)} × 1,18 = ${F(ttc)} FCFA.`,
  'CGI Togo, TVA taux standard 18 % → https://fr.wikipedia.org/wiki/Fiscalit%C3%A9_au_Togo')));

// --- TVA 18 % : TTC → HT (8) ---
[[590000,500000],[1180000,1000000],[236000,200000],[2950000,2500000],[472000,400000],[3540000,3000000],[708000,600000],[1416000,1200000]]
.forEach(([ttc, ht]) => fisc.push(mk(
  `Un prix TTC de ${F(ttc)} FCFA (TVA 18 %) correspond à un montant hors taxes de :`,
  `${F(ht)} FCFA`, `${F(Math.round(ttc*0.82))} FCFA`, `${F(Math.round(ttc*0.9))} FCFA`, `${F(Math.round(ttc*0.78))} FCFA`,
  `HT = TTC ÷ 1,18 = ${F(ttc)} ÷ 1,18 = ${F(ht)} FCFA (retrancher 18 % du TTC est une erreur classique).`,
  'CGI Togo, mécanique de la TVA → https://fr.wikipedia.org/wiki/Taxe_sur_la_valeur_ajout%C3%A9e')));

// --- TVA nette à reverser (6) ---
[[900000,600000],[1500000,800000],[2400000,1900000],[750000,300000],[5000000,3200000],[1180000,590000]]
.forEach(([coll, ded]) => fisc.push(mk(
  `Une entreprise a collecté ${F(coll)} FCFA de TVA et payé ${F(ded)} FCFA de TVA déductible. TVA nette à reverser à l'OTR :`,
  `${F(coll-ded)} FCFA`, `${F(coll+ded)} FCFA`, `${F(Math.round((coll-ded)*1.18))} FCFA`, `${F(ded)} FCFA`,
  `TVA due = TVA collectée − TVA déductible = ${F(coll)} − ${F(ded)} = ${F(coll-ded)} FCFA.`,
  'Mécanisme de la TVA → https://fr.wikipedia.org/wiki/Taxe_sur_la_valeur_ajout%C3%A9e')));

// --- IS 27 % (6) ---
[[10000000,2700000],[20000000,5400000],[50000000,13500000],[8000000,2160000],[120000000,32400000],[35000000,9450000]]
.forEach(([ben, is]) => fisc.push(mk(
  `Au taux d'impôt sur les sociétés togolais de 27 %, une société dont le bénéfice imposable est de ${F(ben)} FCFA doit un IS de :`,
  `${F(is)} FCFA`, `${F(Math.round(ben*0.3))} FCFA`, `${F(Math.round(ben*0.25))} FCFA`, `${F(Math.round(ben*0.18))} FCFA`,
  `IS = 27 % × ${F(ben)} = ${F(is)} FCFA. Le taux normal togolais est de 27 % depuis la loi de finances 2019.`,
  'CGI Togo, IS 27 % → https://fr.wikipedia.org/wiki/Fiscalit%C3%A9_au_Togo')));

// --- Rédigées : institutions et principes (76 rédigées ci-dessous ? non, 104-28=76) ---
[
 mk('Quel est le taux réduit de TVA applicable au Togo à l\'hôtellerie et la restauration ?','10 %','5,5 %','12 %','15 %',
   'La loi de finances 2017 a introduit un taux réduit de 10 % pour l\'hébergement et la restauration ; le taux standard reste 18 %.',
   'CGI Togo → https://fr.wikipedia.org/wiki/Fiscalit%C3%A9_au_Togo'),
 mk('Quel organisme collecte les impôts ET les droits de douane au Togo depuis 2014 ?','L\'Office Togolais des Recettes (OTR)','La Direction Générale des Impôts seule','Le Trésor public exclusivement','La BCEAO',
   'L\'OTR, créé par la loi 2012-016 et opérationnel en 2014, fusionne impôts et douanes sur le modèle des « revenue authorities ».',
   'Loi 2012-016 → https://fr.wikipedia.org/wiki/Office_togolais_des_recettes'),
 mk('L\'IRPP togolais est un impôt…','Progressif par tranches sur le revenu des personnes physiques','Proportionnel à taux unique de 15 %','Forfaitaire par tête d\'habitant','Uniquement communal',
   'L\'impôt sur le revenu des personnes physiques togolais applique un barème progressif par tranches : le taux marginal augmente avec le revenu.',
   'https://fr.wikipedia.org/wiki/Imp%C3%B4t_progressif'),
 mk('La retenue à la source sur salaires au Togo est opérée par…','L\'employeur, qui la reverse à l\'OTR','Le salarié lui-même chaque mois','La CNSS','La commune du domicile',
   'L\'employeur précompte l\'IRPP salarial et le reverse : c\'est le mécanisme de la retenue à la source.',
   'https://fr.wikipedia.org/wiki/Retenue_%C3%A0_la_source'),
 mk('Que finance principalement la Taxe sur les Véhicules à Moteur (TVM) au Togo ?','Le budget de l\'État (fiscalité annuelle sur les véhicules)','Uniquement les péages routiers','Les assurances privées','La SAFER',
   'La TVM est une taxe annuelle due par les propriétaires de véhicules, recouvrée par l\'OTR au profit du budget de l\'État.',
   'CGI Togo → https://fr.wikipedia.org/wiki/Fiscalit%C3%A9_au_Togo'),
 mk('La patente (contribution des patentes) est due par…','Les personnes exerçant une activité commerciale, industrielle ou professionnelle','Les seuls salariés','Les associations sans but lucratif uniquement','Les ménages pour leur logement',
   'La patente est un impôt professionnel local dû par tout exploitant d\'activité économique ; elle comporte un droit fixe et un droit proportionnel.',
   'https://fr.wikipedia.org/wiki/Patente'),
 mk('En fiscalité, l\'assiette désigne…','La base sur laquelle l\'impôt est calculé','La date limite de paiement','Le taux appliqué','L\'administration qui recouvre',
   'L\'assiette est la grandeur économique (revenu, bénéfice, valeur) à laquelle on applique le taux pour liquider l\'impôt.',
   'https://fr.wikipedia.org/wiki/Assiette_fiscale'),
 mk('Le fait générateur de la TVA sur une vente de bien est en principe…','La livraison du bien','La signature du devis','La commande','L\'encaissement d\'un acompte publicitaire',
   'Pour les livraisons de biens, le fait générateur et l\'exigibilité interviennent à la livraison ; pour les services, à l\'encaissement.',
   'https://fr.wikipedia.org/wiki/Taxe_sur_la_valeur_ajout%C3%A9e'),
 mk('Un impôt direct est un impôt…','Supporté et payé par la même personne (ex. IRPP, IS)','Toujours inclus dans les prix','Payé uniquement par les entreprises','Réservé aux importations',
   'Impôt direct : le contribuable légal est aussi le contribuable économique (IRPP, IS, patente). Impôt indirect : répercuté sur autrui (TVA, accises).',
   'https://fr.wikipedia.org/wiki/Imp%C3%B4t_direct'),
 mk('La TVA est économiquement supportée par…','Le consommateur final','Le grossiste','L\'État','Le premier producteur uniquement',
   'Chaque assujetti déduit la TVA d\'amont : la charge se déplace jusqu\'au consommateur final, qui ne déduit rien.',
   'https://fr.wikipedia.org/wiki/Taxe_sur_la_valeur_ajout%C3%A9e'),
 mk('Le numéro d\'identification fiscale unique au Togo s\'appelle…','Le NIF','Le RCCM','Le SIRET','Le code OHADA',
   'Le NIF (numéro d\'identification fiscale) identifie chaque contribuable auprès de l\'OTR ; le RCCM est l\'immatriculation au registre du commerce.',
   'https://fr.wikipedia.org/wiki/Num%C3%A9ro_d%27identification_fiscale'),
 mk('Les droits d\'accises frappent typiquement…','Tabacs, alcools, produits pétroliers','Tous les services bancaires','Les salaires','Les loyers d\'habitation',
   'Les accises sont des taxes spécifiques sur certains produits (tabac, boissons, carburants), souvent pour raisons de santé publique et de recettes.',
   'https://fr.wikipedia.org/wiki/Accise'),
 mk('La Taxe Professionnelle Unique (TPU) togolaise vise…','Les petites entreprises relevant du régime simplifié/forfaitaire','Les multinationales','Les seuls importateurs','Les fonctionnaires',
   'La TPU regroupe en un paiement unique plusieurs impôts pour les contribuables de petite taille, simplifiant leurs obligations.',
   'CGI Togo → https://fr.wikipedia.org/wiki/Fiscalit%C3%A9_au_Togo'),
 mk('Quel principe interdit d\'imposer deux fois le même revenu entre deux États ?','La convention fiscale de non double imposition','Le principe de territorialité stricte','La règle de minimis','Le secret bancaire',
   'Les conventions fiscales bilatérales répartissent le droit d\'imposer et prévoient crédits d\'impôt ou exemptions pour éviter la double imposition.',
   'https://fr.wikipedia.org/wiki/Double_imposition'),
 mk('La CFE (Contribution Foncière des Entreprises) togolaise porte sur…','Les propriétés bâties et non bâties utilisées par l\'entreprise','Le chiffre d\'affaires export','Les dividendes','Les stocks',
   'La contribution foncière est assise sur la valeur des propriétés ; pour les entreprises, elle frappe les immeubles affectés à l\'exploitation.',
   'https://fr.wikipedia.org/wiki/Imp%C3%B4t_foncier'),
 mk('Une exonération fiscale est…','Une dispense légale totale ou partielle d\'impôt','Un retard de paiement toléré','Une amende réduite','Un impôt remboursé avec intérêts',
   'L\'exonération soustrait légalement certaines opérations ou personnes à l\'impôt (ex. exportations exonérées de TVA avec droit à déduction).',
   'https://fr.wikipedia.org/wiki/Exon%C3%A9ration_fiscale'),
 mk('Les exportations sont en principe soumises à la TVA au taux…','0 % (exonération avec droit à déduction)','18 %','10 %','5 %',
   'Le taux zéro évite d\'exporter des taxes : l\'exportateur ne facture pas de TVA mais déduit la TVA d\'amont, préservant sa compétitivité.',
   'https://fr.wikipedia.org/wiki/Taxe_sur_la_valeur_ajout%C3%A9e'),
 mk('Le régime réel d\'imposition impose l\'entreprise sur…','Son bénéfice effectivement réalisé (comptabilité complète)','Un forfait indépendant du résultat','Son seul chiffre d\'affaires','Ses effectifs',
   'Au régime réel, le bénéfice imposable découle de la comptabilité (produits − charges déductibles), contrairement au forfait.',
   'https://fr.wikipedia.org/wiki/B%C3%A9n%C3%A9fice_imposable'),
 mk('La CNSS togolaise gère principalement…','Les prestations de sécurité sociale des travailleurs (pensions, prestations familiales, risques professionnels)','La TVA','Les marchés publics','Le change du FCFA',
   'La Caisse Nationale de Sécurité Sociale couvre pensions, prestations familiales et risques professionnels des salariés du privé.',
   'https://fr.wikipedia.org/wiki/S%C3%A9curit%C3%A9_sociale'),
 mk('L\'INAM au Togo est l\'institut chargé de…','L\'assurance maladie (couverture santé)','Des impôts locaux','De la métrologie','Des douanes',
   'L\'Institut National d\'Assurance Maladie gère la couverture maladie, étendue dans le cadre de l\'assurance maladie universelle.',
   'https://fr.wikipedia.org/wiki/Couverture_sanitaire_universelle'),
 mk('Le droit de douane est perçu…','À l\'importation des marchandises, selon le Tarif Extérieur Commun de la CEDEAO','Sur les ventes intérieures','Sur les salaires','Sur les loyers',
   'Le Togo applique le TEC-CEDEAO à 5 bandes (0, 5, 10, 20, 35 %) sur les importations hors zone.',
   'https://fr.wikipedia.org/wiki/Tarif_ext%C3%A9rieur_commun'),
 mk('Combien de bandes tarifaires compte le TEC-CEDEAO appliqué par le Togo ?','5 bandes : 0, 5, 10, 20 et 35 %','3 bandes : 0, 10, 20 %','4 bandes : 5, 10, 15, 20 %','6 bandes jusqu\'à 50 %',
   'Le Tarif Extérieur Commun CEDEAO (2015) comporte 5 catégories, la 5ᵉ (35 %) protégeant des biens spécifiques de développement.',
   'https://fr.wikipedia.org/wiki/Tarif_ext%C3%A9rieur_commun'),
 mk('Le précompte (acompte) d\'impôt sur marchés publics consiste à…','Retenir une fraction de l\'impôt dû lors du paiement du titulaire','Payer le marché en avance','Exonérer le titulaire','Doubler la TVA',
   'De nombreux États d\'Afrique de l\'Ouest prélèvent un acompte d\'IS/IRPP à la source sur les paiements publics, imputable ensuite par l\'entreprise.',
   'https://fr.wikipedia.org/wiki/Retenue_%C3%A0_la_source'),
 mk('Une amende fiscale sanctionne…','Le manquement aux obligations fiscales (retard, minoration, absence de déclaration)','Un simple changement d\'adresse','La baisse du chiffre d\'affaires','Le recrutement de salariés',
   'Les pénalités (intérêts de retard, majorations, amendes) sanctionnent défauts et retards de déclaration ou de paiement.',
   'https://fr.wikipedia.org/wiki/Sanction_fiscale'),
 mk('Le contentieux fiscal togolais commence en principe par…','Un recours préalable devant l\'administration fiscale (OTR)','Une plainte pénale directe','La saisine de la CEDEAO','Un arbitrage international',
   'Le contribuable conteste d\'abord auprès de l\'administration (réclamation) avant, le cas échéant, la phase juridictionnelle.',
   'https://fr.wikipedia.org/wiki/Contentieux_fiscal'),
 mk('La progressivité de l\'impôt signifie que…','Le taux moyen d\'imposition augmente avec le revenu','Tout le monde paie le même montant','Le taux baisse quand le revenu monte','Seuls les riches déclarent',
   'Dans un barème progressif, les tranches supérieures sont taxées à des taux plus élevés : le taux moyen croît avec la base.',
   'https://fr.wikipedia.org/wiki/Imp%C3%B4t_progressif'),
 mk('Le quotient « pression fiscale » d\'un pays se mesure par…','Recettes fiscales / PIB','Impôts / population active','TVA / importations','Dépenses publiques / recettes',
   'La pression fiscale rapporte l\'ensemble des prélèvements obligatoires au PIB ; l\'UEMOA vise un taux ≥ 20 %.',
   'https://fr.wikipedia.org/wiki/Pr%C3%A9l%C3%A8vements_obligatoires'),
 mk('Quel critère UEMOA fixe un plancher de pression fiscale aux États membres ?','Taux de pression fiscale ≥ 20 % du PIB','Dette ≤ 35 % du PIB','Inflation ≥ 5 %','Masse salariale ≥ 50 % des recettes',
   'Le pacte de convergence UEMOA fixe notamment : déficit ≤ 3 % du PIB, inflation ≤ 3 %, dette ≤ 70 % du PIB et pression fiscale ≥ 20 %.',
   'https://fr.wikipedia.org/wiki/Union_%C3%A9conomique_et_mon%C3%A9taire_ouest-africaine'),
 mk('La télédéclaration fiscale au Togo s\'effectue via…','Les plateformes en ligne de l\'OTR (e-services)','Uniquement au guichet physique','Par la BCEAO','Par les mairies',
   'L\'OTR a déployé des téléservices (déclaration et paiement en ligne, mobile money) pour simplifier le civisme fiscal.',
   'https://fr.wikipedia.org/wiki/Administration_fiscale'),
 mk('En cas de vérification de comptabilité, l\'administration…','Contrôle sur place les documents comptables de l\'entreprise','Ferme automatiquement l\'entreprise','Fixe librement un nouvel impôt sans procédure','Saisit d\'office les stocks',
   'La vérification de comptabilité est un contrôle sur place encadré par des garanties procédurales (avis, débat contradictoire, voies de recours).',
   'https://fr.wikipedia.org/wiki/Contr%C3%B4le_fiscal'),
 mk('L\'impôt minimum forfaitaire (IMF) assure que…','Toute société paie un minimum d\'impôt même en cas de déficit','Les déficits sont remboursés','Les PME sont exonérées','Le taux d\'IS varie chaque mois',
   'L\'IMF, assis généralement sur le chiffre d\'affaires, garantit une contribution minimale des sociétés déficitaires.',
   'https://fr.wikipedia.org/wiki/Imp%C3%B4t_sur_les_soci%C3%A9t%C3%A9s'),
 mk('Les droits d\'enregistrement frappent notamment…','Les mutations immobilières et certains actes juridiques','Les ventes de pain','Les salaires','Les dépôts bancaires',
   'L\'enregistrement taxe des actes (ventes d\'immeubles, baux, cessions de fonds) et leur donne date certaine.',
   'https://fr.wikipedia.org/wiki/Droit_d%27enregistrement'),
 mk('La fiscalité incitative des zones franches vise à…','Attirer les investissements exportateurs par des avantages fiscaux','Augmenter la TVA locale','Interdire les exportations','Nationaliser les entreprises',
   'La zone franche togolaise (loi de 1989, réformée) accorde des allègements aux entreprises majoritairement exportatrices, en contrepartie d\'emplois.',
   'https://fr.wikipedia.org/wiki/Zone_franche'),
 mk('Le civisme fiscal désigne…','L\'accomplissement volontaire de ses obligations fiscales','Le refus légitime de payer','Un impôt sur les civils','Une amnistie permanente',
   'Le consentement à l\'impôt et la déclaration spontanée réduisent les coûts de recouvrement et financent les services publics.',
   'https://fr.wikipedia.org/wiki/Consentement_%C3%A0_l%27imp%C3%B4t'),
 mk('Une niche fiscale est…','Un dispositif dérogatoire réduisant l\'impôt de certains contribuables','Un local de l\'administration','Un impôt sur les animaux','Un compte bancaire offshore illégal par nature',
   'Les dépenses fiscales (exonérations, crédits, abattements) réduisent les recettes et doivent être évaluées régulièrement.',
   'https://fr.wikipedia.org/wiki/Niche_fiscale'),
 mk('La taxe d\'habitation togolaise est due par…','L\'occupant d\'un local d\'habitation au 1ᵉʳ janvier','Le seul propriétaire bailleur','Les touristes','Les ambassades étrangères',
   'La taxe d\'habitation est un impôt local dû par l\'occupant ; les diplomates bénéficient d\'exemptions conventionnelles.',
   'https://fr.wikipedia.org/wiki/Taxe_d%27habitation'),
 mk('Quel document fiscal certifie qu\'une entreprise est à jour de ses obligations ?','L\'attestation de régularité fiscale (quitus)','Le RCCM','La facture normalisée','Le relevé bancaire',
   'L\'attestation de régularité (quitus fiscal) est exigée pour soumissionner aux marchés publics ou obtenir certains agréments.',
   'https://fr.wikipedia.org/wiki/Administration_fiscale'),
 mk('La facture normalisée instituée par l\'OTR sert à…','Sécuriser la TVA en traçant les ventes avec des mentions obligatoires','Remplacer les contrats','Payer les douanes','Fixer les prix',
   'La facture normalisée (avec identifiants et souches contrôlées) lutte contre la fraude à la TVA et la sous-déclaration.',
   'https://fr.wikipedia.org/wiki/Facture_(comptabilit%C3%A9)'),
 mk('L\'abattement fiscal est…','Une réduction de la base imposable','Une hausse du taux','Un paiement anticipé','Un impôt local',
   'L\'abattement retranche un montant ou un pourcentage de la base avant application du barème (ex. frais professionnels).',
   'https://fr.wikipedia.org/wiki/Abattement_fiscal'),
 mk('Le Togo est membre de l\'OHADA depuis…','1995 (traité de Port-Louis, 1993, entré en vigueur en 1995)','2010','1980','2005',
   'Le traité OHADA signé à Port-Louis en 1993 est entré en vigueur en 1995 ; le Togo est membre fondateur.',
   'https://fr.wikipedia.org/wiki/OHADA'),
] .forEach(x => fisc.push(x));

// Compléter à 104 questions avec des cas de calcul de pénalités et divers (paramétrique)
[[1000000,10,100000],[2500000,10,250000],[600000,5,30000],[1800000,5,90000],[4000000,10,400000],[900000,5,45000],[3000000,10,300000],[1200000,5,60000]]
.forEach(([imp, tx, pen]) => fisc.push(mk(
  `Une majoration de ${tx} % s'applique à un impôt de ${F(imp)} FCFA payé en retard. Montant de la pénalité :`,
  `${F(pen)} FCFA`, `${F(pen*2)} FCFA`, `${F(Math.round(pen/2))} FCFA`, `${F(imp)} FCFA`,
  `Pénalité = ${tx} % × ${F(imp)} = ${F(pen)} FCFA (le principal reste dû en sus).`,
  'https://fr.wikipedia.org/wiki/Sanction_fiscale')));

// Douane TEC (8 paramétriques)
[[5,2000000,100000],[10,2000000,200000],[20,1500000,300000],[35,1000000,350000],[10,4500000,450000],[20,3000000,600000],[5,8000000,400000],[35,2000000,700000]]
.forEach(([tx, val, dd]) => fisc.push(mk(
  `Une marchandise importée d'une valeur en douane de ${F(val)} FCFA est classée dans la bande TEC-CEDEAO à ${tx} %. Droit de douane dû :`,
  `${F(dd)} FCFA`, `${F(Math.round(val*(tx+5)/100))} FCFA`, `${F(Math.round(val*tx/200))} FCFA`, `${F(Math.round(val*0.18))} FCFA`,
  `Droit = ${tx} % × ${F(val)} = ${F(dd)} FCFA (la TVA de porte se calcule ensuite sur valeur + droits).`,
  'https://fr.wikipedia.org/wiki/Tarif_ext%C3%A9rieur_commun')));

// TVA taux réduit 10 % (hôtellerie/restauration) : HT → TTC (8)
[[100000,110000],[250000,275000],[400000,440000],[80000,88000],[600000,660000],[1200000,1320000],[300000,330000],[900000,990000]]
.forEach(([ht, ttc]) => fisc.push(mk(
  `Une nuitée d'hôtel facturée ${F(ht)} FCFA HT relève du taux réduit togolais de 10 %. Prix TTC :`,
  `${F(ttc)} FCFA`, `${F(Math.round(ht*1.18))} FCFA`, `${F(Math.round(ht*1.05))} FCFA`, `${F(Math.round(ht*1.2))} FCFA`,
  `TTC = HT × 1,10 = ${F(ht)} × 1,10 = ${F(ttc)} FCFA (l'hôtellerie-restauration bénéficie du taux réduit de 10 %).`,
  'CGI Togo → https://fr.wikipedia.org/wiki/Fiscalit%C3%A9_au_Togo')));

// Retenue IRPP au taux moyen donné (6)
[[450000,12,54000],[800000,15,120000],[350000,10,35000],[1200000,20,240000],[600000,12,72000],[950000,18,171000]]
.forEach(([sal, tx, ret]) => fisc.push(mk(
  `Le taux moyen d'IRPP d'un salarié est de ${tx} % pour un salaire imposable mensuel de ${F(sal)} FCFA. Retenue mensuelle opérée par l'employeur :`,
  `${F(ret)} FCFA`, `${F(Math.round(ret*1.5))} FCFA`, `${F(Math.round(ret/2))} FCFA`, `${F(Math.round(sal*0.27))} FCFA`,
  `Retenue = ${tx} % × ${F(sal)} = ${F(ret)} FCFA, reversée à l'OTR par l'employeur.`,
  'https://fr.wikipedia.org/wiki/Retenue_%C3%A0_la_source')));

// Taxe foncière au taux donné (6)
[[15,2400000,360000],[15,4000000,600000],[10,1800000,180000],[10,3600000,360000],[15,6000000,900000],[10,2500000,250000]]
.forEach(([tx, vl, tf]) => fisc.push(mk(
  `Une propriété a une valeur locative annuelle de ${F(vl)} FCFA, taxée au taux foncier de ${tx} %. Impôt foncier dû :`,
  `${F(tf)} FCFA`, `${F(Math.round(tf*2))} FCFA`, `${F(Math.round(tf/2))} FCFA`, `${F(Math.round(vl*0.18))} FCFA`,
  `Impôt = ${tx} % × ${F(vl)} = ${F(tf)} FCFA (l'assiette foncière est la valeur locative).`,
  'https://fr.wikipedia.org/wiki/Imp%C3%B4t_foncier')));

// =====================================================================
// MARCHÉS PUBLICS (TOGO) — 104 questions
// =====================================================================
const mp = [];

[
 mk('Quel principe fondamental garantit l\'accès égal des candidats à la commande publique ?','L\'égalité de traitement des candidats','Le favoritisme régional','La préférence familiale','Le tirage au sort obligatoire',
   'Liberté d\'accès, égalité de traitement et transparence des procédures sont les trois principes cardinaux de la commande publique.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('L\'appel d\'offres ouvert se caractérise par…','La possibilité pour tout candidat qualifié de soumissionner','Une invitation limitée à 3 entreprises choisies','L\'absence de publicité','Une négociation directe',
   'L\'AOO est la procédure de droit commun : publicité large, mise en concurrence de tous les candidats remplissant les conditions.',
   'https://fr.wikipedia.org/wiki/Appel_d%27offres'),
 mk('Le marché de gré à gré (entente directe) n\'est admis que…','Dans des cas limitativement prévus (urgence impérieuse, exclusivité, défense…) avec autorisation','Librement pour tout achat','Quand le fournisseur est un parent','Pour éviter la publicité',
   'L\'entente directe est dérogatoire : elle exige une justification (exclusivité technique, urgence…) et l\'autorisation de l\'organe de contrôle.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('Au Togo, quel organe contrôle a priori les procédures de passation des marchés importants ?','La DNCMP (Direction Nationale de Contrôle des Marchés Publics)','La BCEAO','La Cour suprême seule','Le port de Lomé',
   'La DNCMP exerce le contrôle a priori (revue des dossiers, avis de non-objection) ; la régulation et les recours relèvent de l\'autorité de régulation.',
   'Décret 2009-277/PR → https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('L\'autorité de régulation des marchés publics togolaise (ARMP, devenue autorité de régulation de la commande publique) est chargée de…','La régulation, des audits et du règlement des différends','Payer les entreprises','Exécuter les travaux','Fixer le taux de TVA',
   'La régulation (définition des politiques, audits indépendants, traitement des recours) est séparée du contrôle a priori (DNCMP) et de la passation.',
   'https://fr.wikipedia.org/wiki/Autorit%C3%A9_de_r%C3%A9gulation'),
 mk('La caution (garantie) de soumission a pour but…','D\'assurer le sérieux de l\'offre du candidat','De payer le personnel du candidat','De financer la publicité','De remplacer l\'assurance décennale',
   'La garantie de soumission (1 à 3 % du montant estimé en pratique UEMOA) est perdue si le soumissionnaire retire son offre ou refuse de signer.',
   'https://fr.wikipedia.org/wiki/Caution_(finance)'),
 mk('La garantie de bonne exécution protège…','L\'autorité contractante contre la défaillance du titulaire pendant l\'exécution','Le titulaire contre l\'État','Les sous-traitants entre eux','Les banques contre l\'inflation',
   'Constituée après attribution (souvent ≤ 5 % du marché dans les textes UEMOA), elle couvre l\'inexécution ou la mauvaise exécution.',
   'https://fr.wikipedia.org/wiki/Garantie_de_bonne_ex%C3%A9cution'),
 mk('La retenue de garantie sur les décomptes sert à…','Couvrir la période de garantie jusqu\'à la réception définitive','Payer les impôts du titulaire','Rémunérer la banque','Financer l\'ARMP',
   'Un pourcentage est retenu sur chaque paiement puis restitué à la réception définitive, garantissant la levée des réserves.',
   'https://fr.wikipedia.org/wiki/Retenue_de_garantie'),
 mk('Qu\'est-ce qu\'un DAO ?','Le Dossier d\'Appel d\'Offres remis aux candidats','Un logiciel de dessin','Le décompte final','Une caution bancaire',
   'Le DAO contient règlement de la consultation, cahiers des charges (CCAG/CCAP/CCTP), cadre de bordereau des prix et modèles de soumission.',
   'https://fr.wikipedia.org/wiki/Appel_d%27offres'),
 mk('Le CCAG dans un marché public est…','Le Cahier des Clauses Administratives Générales','Un comité de gestion','Un impôt douanier','Le certificat de conformité',
   'Le CCAG fixe les stipulations administratives types (délais, pénalités, résiliation) ; le CCAP les particularise pour le marché.',
   'https://fr.wikipedia.org/wiki/Cahier_des_clauses_administratives_g%C3%A9n%C3%A9rales'),
 mk('L\'offre économiquement la plus avantageuse est déterminée par…','Les critères annoncés dans le DAO (prix, qualité, délais…)','Le hasard','La nationalité du candidat','L\'ordre d\'arrivée des plis',
   'L\'évaluation suit exclusivement les critères et pondérations publiés : toute modification a posteriori vicie la procédure.',
   'https://fr.wikipedia.org/wiki/Appel_d%27offres'),
 mk('Une offre anormalement basse doit être…','Vérifiée : demande de justifications avant tout rejet','Automatiquement retenue','Rejetée sans examen','Transmise à la police',
   'Le candidat est invité à justifier ses prix (méthodes, conditions exceptionnelles) ; rejet motivé si les justifications sont insuffisantes.',
   'https://fr.wikipedia.org/wiki/Offre_anormalement_basse'),
 mk('L\'avenant à un marché public…','Modifie le marché initial sans en bouleverser l\'économie','Annule toujours le marché','Est interdit','Double automatiquement le prix',
   'L\'avenant formalise des modifications limitées (des plafonds en % sont fixés par les textes) ; au-delà, nouvelle mise en concurrence.',
   'https://fr.wikipedia.org/wiki/Avenant'),
 mk('La réception provisoire d\'un ouvrage marque…','La prise de possession avec réserves éventuelles, ouvrant la période de garantie','La fin de toute obligation du titulaire','Le début des études','L\'annulation des pénalités',
   'Entre réception provisoire et définitive, le titulaire lève les réserves et assume la garantie de parfait achèvement.',
   'https://fr.wikipedia.org/wiki/R%C3%A9ception_des_travaux'),
 mk('Les pénalités de retard dans un marché public sont…','Prévues au contrat et calculées par jour de retard','Illégales','Fixées après coup librement','À la charge de l\'État',
   'Le CCAP fixe la formule (souvent une fraction du montant par jour calendaire, avec plafond) ; elles s\'appliquent sans mise en demeure préalable si le contrat le prévoit.',
   'https://fr.wikipedia.org/wiki/P%C3%A9nalit%C3%A9_de_retard'),
 mk('Le nantissement d\'un marché public permet au titulaire de…','Donner le marché en garantie à sa banque pour se financer','Vendre le marché à un tiers sans accord','Éviter les impôts','Modifier les prix',
   'Le nantissement (exemplaire unique) permet de mobiliser les créances du marché auprès d\'un établissement de crédit.',
   'https://fr.wikipedia.org/wiki/Nantissement'),
 mk('La sous-traitance dans les marchés publics…','Est possible avec déclaration et acceptation, le titulaire restant responsable','Transfère la responsabilité au sous-traitant','Est toujours interdite','Dispense de garanties',
   'Le titulaire demeure personnellement responsable de l\'exécution ; le sous-traitant déclaré peut bénéficier du paiement direct selon les textes.',
   'https://fr.wikipedia.org/wiki/Sous-traitance'),
 mk('Un PPP (partenariat public-privé) se distingue d\'un marché classique par…','Le financement et l\'exploitation portés par le privé sur la durée, rémunérés par l\'usage ou des loyers','Un simple achat de fournitures','L\'absence totale de contrat','Une durée de 3 mois maximum',
   'La loi togolaise 2021-034 encadre les PPP : partage des risques, longue durée, rémunération liée à la disponibilité ou aux usagers.',
   'https://fr.wikipedia.org/wiki/Partenariat_public-priv%C3%A9'),
 mk('Le recours devant l\'organe de règlement des différends doit être exercé…','Dans les délais courts prévus (recours gracieux puis recours devant le régulateur)','Sans limite de temps','Uniquement après paiement','Après la fin des travaux seulement',
   'Les textes prévoient des délais brefs pour contester (spécifications, attribution) afin de ne pas bloquer la commande publique.',
   'https://fr.wikipedia.org/wiki/Recours_administratif'),
 mk('La déclaration d\'infructuosité intervient quand…','Aucune offre conforme ou recevable n\'a été reçue','Le marché est trop rentable','Le titulaire est payé','La publicité a réussi',
   'L\'autorité peut alors relancer, modifier le DAO ou recourir à une procédure adaptée conformément aux textes.',
   'https://fr.wikipedia.org/wiki/Appel_d%27offres'),
 mk('Le fractionnement artificiel d\'un besoin pour éviter les seuils est…','Interdit et sanctionné','Encouragé pour aller vite','Neutre','Obligatoire pour les PME',
   'Scinder un besoin pour passer sous les seuils de publicité/contrôle constitue une violation des règles de la commande publique.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('La marge de préférence communautaire UEMOA permet…','D\'avantager, dans la limite fixée, les entreprises communautaires lors de l\'évaluation','D\'exclure les étrangers','De doubler les prix','D\'éviter la publicité',
   'Une préférence (plafonnée, ex. 15 % travaux) peut être appliquée aux offres des entreprises communautaires si le DAO le prévoit.',
   'https://fr.wikipedia.org/wiki/Union_%C3%A9conomique_et_mon%C3%A9taire_ouest-africaine'),
 mk('Le plan de passation des marchés (PPM) est…','La programmation annuelle prévisionnelle des marchés d\'une autorité contractante','Une facture','Un manuel de chantier','Un compte bancaire',
   'Le PPM, publié et mis à jour, conditionne le lancement des procédures et permet le contrôle de cohérence budgétaire.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('Une personne responsable des marchés publics (PRMP) est…','L\'autorité habilitée à conduire la procédure et signer le marché','Un juge','Le banquier du titulaire','Un fournisseur',
   'La PRMP (ou autorité contractante déléguée) pilote la passation ; les commissions d\'ouverture et d\'évaluation l\'assistent.',
   'https://fr.wikipedia.org/wiki/March%C3%A9_public'),
 mk('L\'ouverture des plis en séance publique garantit…','La transparence : les offres sont enregistrées devant les candidats','Le secret des prix','La rapidité des travaux','Le paiement anticipé',
   'La lecture publique des principaux éléments (prix, délais, garanties) prévient les manipulations après dépôt.',
   'https://fr.wikipedia.org/wiki/Appel_d%27offres'),
 mk('Le délai de validité des offres correspond à…','La période pendant laquelle le soumissionnaire reste engagé par son offre','La durée des travaux','La garantie décennale','Le délai de paiement',
   'Fixé par le DAO (souvent 90 jours), il peut être prorogé avec l\'accord des candidats ; la garantie de soumission suit ce délai.',
   'https://fr.wikipedia.org/wiki/Appel_d%27offres'),
 mk('Les marchés de prestations intellectuelles (études, maîtrise d\'œuvre) sont typiquement attribués via…','Une demande de propositions avec liste restreinte et évaluation qualité/coût','Une vente aux enchères','Un tirage au sort','Un simple bon de commande verbal',
   'La sélection fondée sur la qualité (SFQC/QCBS) pondère l\'offre technique et financière après constitution d\'une liste restreinte.',
   'https://fr.wikipedia.org/wiki/Ma%C3%AEtrise_d%27%C5%93uvre'),
 mk('Le contrôle a posteriori (audits) des marchés publics vise à…','Vérifier après coup la régularité et la performance des procédures','Bloquer tous les paiements','Choisir les titulaires','Rédiger les offres',
   'Les audits indépendants commandités par le régulateur détectent irrégularités et mauvaises pratiques, alimentant sanctions et réformes.',
   'https://fr.wikipedia.org/wiki/Audit'),
 mk('La corruption dans la passation est sanctionnée notamment par…','L\'exclusion (inéligibilité) des entreprises fautives et des poursuites pénales','Un simple avertissement oral','Une prime','La renégociation du prix',
   'Les textes prévoient l\'exclusion temporaire ou définitive de la commande publique, outre les sanctions pénales des personnes.',
   'https://fr.wikipedia.org/wiki/Corruption'),
 mk('Le bordereau des prix unitaires (BPU) sert à…','Détailler les prix unitaires appliqués aux quantités du marché','Lister le personnel','Prouver la nationalité','Remplacer le contrat',
   'Avec le détail quantitatif et estimatif (DQE), le BPU permet l\'évaluation des offres et le règlement des décomptes.',
   'https://fr.wikipedia.org/wiki/Bordereau_des_prix_unitaires'),
 mk('Un marché à prix révisables prévoit…','L\'ajustement des prix selon une formule d\'indexation contractuelle','Des prix modifiables librement par le titulaire','Un paiement en nature','Des prix secrets',
   'La formule de révision (indices officiels, coefficients) protège les parties contre l\'évolution des coûts sur les marchés longs.',
   'https://fr.wikipedia.org/wiki/R%C3%A9vision_de_prix'),
 mk('L\'attestation de non-faillite exigée des candidats prouve…','Qu\'ils ne sont pas en liquidation ou redressement les excluant','Leur richesse','Leur ancienneté','Leur adresse',
   'Les situations d\'exclusion (faillite, condamnations, dettes fiscales/sociales) sont vérifiées via des pièces administratives datées.',
   'https://fr.wikipedia.org/wiki/Faillite'),
] .forEach(x => mp.push(x));

// Paramétriques MP : cautions/garanties/retenues/pénalités/avances (72 restants)
[[2,50000000,1000000],[2,120000000,2400000],[3,80000000,2400000],[1,60000000,600000],[2,250000000,5000000],[3,40000000,1200000],[1,150000000,1500000],[2,90000000,1800000]]
.forEach(([tx, m, g]) => mp.push(mk(
  `Le DAO fixe la garantie de soumission à ${tx} % du montant prévisionnel de ${F(m)} FCFA. Montant de la garantie :`,
  `${F(g)} FCFA`, `${F(g*10)} FCFA`, `${F(Math.round(g/2))} FCFA`, `${F(Math.round(m*0.05))} FCFA`,
  `Garantie = ${tx} % × ${F(m)} = ${F(g)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Caution_(finance)')));

[[5,80000000,4000000],[5,200000000,10000000],[3,150000000,4500000],[5,60000000,3000000],[3,90000000,2700000],[5,340000000,17000000],[3,240000000,7200000],[5,120000000,6000000]]
.forEach(([tx, m, g]) => mp.push(mk(
  `La garantie de bonne exécution est fixée à ${tx} % d'un marché de ${F(m)} FCFA. Elle s'élève à :`,
  `${F(g)} FCFA`, `${F(Math.round(m*0.1))} FCFA`, `${F(Math.round(g/3))} FCFA`, `${F(Math.round(m*0.18))} FCFA`,
  `Garantie = ${tx} % × ${F(m)} = ${F(g)} FCFA, constituée avant le premier paiement.`,
  'https://fr.wikipedia.org/wiki/Garantie_de_bonne_ex%C3%A9cution')));

[[10,45000000,4500000],[5,120000000,6000000],[10,80000000,8000000],[5,64000000,3200000],[10,150000000,15000000],[5,220000000,11000000],[10,36000000,3600000],[5,90000000,4500000]]
.forEach(([tx, m, r]) => mp.push(mk(
  `Une retenue de garantie de ${tx} % est appliquée sur un décompte de ${F(m)} FCFA. Montant retenu :`,
  `${F(r)} FCFA`, `${F(r*2)} FCFA`, `${F(Math.round(r/2))} FCFA`, `${F(Math.round(m*0.15))} FCFA`,
  `Retenue = ${tx} % × ${F(m)} = ${F(r)} FCFA, restituée à la réception définitive.`,
  'https://fr.wikipedia.org/wiki/Retenue_de_garantie')));

// Pénalités par jour : 1/1000, 1/2000, 1/2500 du montant par jour
[[1000,60000000,15,900000],[2000,120000000,20,1200000],[1000,90000000,8,720000],[2500,100000000,25,1000000],[2000,80000000,30,1200000],[1000,45000000,12,540000],[2500,150000000,10,600000],[2000,200000000,18,1800000]]
.forEach(([den, m, j, p]) => mp.push(mk(
  `Un CCAP prévoit une pénalité de 1/${F(den)} du montant du marché (${F(m)} FCFA) par jour de retard. Après ${j} jours de retard, les pénalités atteignent :`,
  `${F(p)} FCFA`, `${F(p*2)} FCFA`, `${F(Math.round(p/2))} FCFA`, `${F(Math.round(m*0.05))} FCFA`,
  `Pénalité journalière = ${F(m)} ÷ ${F(den)} = ${F(m/den)} FCFA ; × ${j} jours = ${F(p)} FCFA.`,
  'https://fr.wikipedia.org/wiki/P%C3%A9nalit%C3%A9_de_retard')));

// Avances de démarrage : 20 % / 30 %
[[20,150000000,30000000],[20,80000000,16000000],[30,60000000,18000000],[20,240000000,48000000],[30,90000000,27000000],[20,55000000,11000000],[30,120000000,36000000],[20,320000000,64000000]]
.forEach(([tx, m, a]) => mp.push(mk(
  `Le marché autorise une avance de démarrage de ${tx} % sur ${F(m)} FCFA, contre garantie bancaire équivalente. Montant de l'avance :`,
  `${F(a)} FCFA`, `${F(Math.round(a*1.5))} FCFA`, `${F(Math.round(a/2))} FCFA`, `${F(Math.round(m*0.5))} FCFA`,
  `Avance = ${tx} % × ${F(m)} = ${F(a)} FCFA, récupérée par précompte sur les décomptes.`,
  'https://fr.wikipedia.org/wiki/Avance_(finance)')));

// Décomptes cumulés : montant exécuté − déjà payé
[[75000000,45000000,30000000],[120000000,80000000,40000000],[64000000,25000000,39000000],[200000000,140000000,60000000],[90000000,30000000,60000000],[150000000,95000000,55000000],[48000000,12000000,36000000],[110000000,70000000,40000000]]
.forEach(([ex, paye, du]) => mp.push(mk(
  `Travaux exécutés cumulés : ${F(ex)} FCFA ; décomptes déjà réglés : ${F(paye)} FCFA. Montant du présent décompte (hors retenues) :`,
  `${F(du)} FCFA`, `${F(ex)} FCFA`, `${F(Math.round(du/2))} FCFA`, `${F(ex+paye)} FCFA`,
  `Décompte = exécuté cumulé − déjà payé = ${F(ex)} − ${F(paye)} = ${F(du)} FCFA.`,
  'https://fr.wikipedia.org/wiki/D%C3%A9compte_g%C3%A9n%C3%A9ral'),));

// Avenants en % du marché initial
[[15000000,100000000,15],[24000000,120000000,20],[8000000,80000000,10],[27000000,90000000,30],[12000000,240000000,5],[30000000,150000000,20],[9000000,60000000,15],[44000000,220000000,20]]
.forEach(([av, m, pct]) => mp.push(mk(
  `Un avenant de ${F(av)} FCFA est envisagé sur un marché initial de ${F(m)} FCFA. Il représente :`,
  `${pct} % du marché initial`, `${pct*2} % du marché initial`, `${Math.max(1,Math.round(pct/2))} % du marché initial`, `${pct+8} % du marché initial`,
  `${F(av)} ÷ ${F(m)} = ${pct} %. Comparer ce taux au plafond réglementaire avant de conclure l'avenant.`,
  'https://fr.wikipedia.org/wiki/Avenant')));

// Marché HT → TTC (TVA 18 %) (8)
[[50000000,59000000],[120000000,141600000],[85000000,100300000],[60000000,70800000],[200000000,236000000],[45000000,53100000],[150000000,177000000],[95000000,112100000]]
.forEach(([ht, ttc]) => mp.push(mk(
  `Un marché de travaux est conclu pour ${F(ht)} FCFA HT. Avec la TVA à 18 %, son montant TTC est :`,
  `${F(ttc)} FCFA`, `${F(Math.round(ht*1.1))} FCFA`, `${F(Math.round(ht*1.25))} FCFA`, `${F(ht+18000000)} FCFA`,
  `TTC = ${F(ht)} × 1,18 = ${F(ttc)} FCFA — base des engagements budgétaires.`,
  'https://fr.wikipedia.org/wiki/Taxe_sur_la_valeur_ajout%C3%A9e')));

// Part d'un lot dans un allotissement (8)
[[30000000,120000000,25],[45000000,150000000,30],[20000000,80000000,25],[60000000,300000000,20],[36000000,90000000,40],[24000000,240000000,10],[75000000,150000000,50],[27000000,180000000,15]]
.forEach(([lot, tot, pct]) => mp.push(mk(
  `Dans un appel d'offres alloti de ${F(tot)} FCFA au total, le lot n°1 pèse ${F(lot)} FCFA, soit :`,
  `${pct} % du total`, `${pct*2} % du total`, `${Math.max(1,Math.round(pct/2))} % du total`, `${pct+15} % du total`,
  `${F(lot)} ÷ ${F(tot)} = ${pct} %. L'allotissement favorise l'accès des PME à la commande publique.`,
  'https://fr.wikipedia.org/wiki/Allotissement')));

// =====================================================================
// COMPTABILITÉ — 100 questions
// =====================================================================
const cpt = [];

[
 mk('Dans quel compte SYSCOHADA enregistre-t-on les achats de marchandises ?','601 — Achats de marchandises','701 — Ventes de marchandises','401 — Fournisseurs','311 — Marchandises',
   'Classe 6 = charges : le compte 601 reçoit les achats destinés à la revente ; 311 est le compte de stock, mouvementé à l\'inventaire.',
   'Plan OHADA → https://fr.wikipedia.org/wiki/Syst%C3%A8me_comptable_OHADA'),
 mk('La vente de marchandises à crédit s\'enregistre par…','Débit 411 Clients / Crédit 701 Ventes','Débit 701 / Crédit 411','Débit 521 / Crédit 601','Débit 401 / Crédit 411',
   'La créance naît au débit de 411 ; le produit au crédit de 701 (et 443 TVA facturée le cas échéant).',
   'https://fr.wikipedia.org/wiki/Comptabilit%C3%A9_en_partie_double'),
 mk('L\'encaissement d\'un client par banque s\'écrit…','Débit 521 Banques / Crédit 411 Clients','Débit 411 / Crédit 521','Débit 571 Caisse / Crédit 701','Débit 521 / Crédit 701',
   'Le règlement éteint la créance : la banque (actif) augmente au débit, le compte client est soldé au crédit.',
   'https://fr.wikipedia.org/wiki/Comptabilit%C3%A9_en_partie_double'),
 mk('Le paiement des salaires nets se comptabilise…','Débit 422 (ou 661 lors de la charge) / Crédit 521 Banques','Débit 521 / Crédit 661','Débit 601 / Crédit 422','Débit 101 / Crédit 521',
   'La charge (661) est constatée à l\'échéance avec les dettes (422 personnel, 43 organismes) ; le paiement solde 422 par 521.',
   'https://fr.wikipedia.org/wiki/Paie'),
 mk('Un apport en numéraire à la constitution s\'enregistre…','Débit 521 Banques / Crédit 101 Capital social','Débit 101 / Crédit 521','Débit 521 / Crédit 701','Débit 244 / Crédit 401',
   'Les fonds reçus (actif) ont pour contrepartie le capital (passif — ressources durables, classe 1).',
   'https://fr.wikipedia.org/wiki/Capital_social'),
 mk('L\'acquisition d\'un matériel payé par banque s\'écrit…','Débit 24 Matériel / Crédit 521 Banques','Débit 601 / Crédit 521','Débit 521 / Crédit 24','Débit 24 / Crédit 701',
   'Une immobilisation (classe 2) s\'active au débit ; le règlement crédite la banque. La TVA déductible (445) s\'ajoute au débit le cas échéant.',
   'https://fr.wikipedia.org/wiki/Immobilisation_(comptabilit%C3%A9)'),
 mk('La TVA facturée (collectée) se crédite au compte…','443 — État, TVA facturée','445 — État, TVA récupérable','441 — État, impôt sur les bénéfices','521 — Banques',
   'Le 443 enregistre la TVA due sur les ventes ; le 445 la TVA récupérable sur achats ; le solde net va au 444 (État, TVA due).',
   'https://fr.wikipedia.org/wiki/Syst%C3%A8me_comptable_OHADA'),
 mk('La dotation annuelle aux amortissements s\'écrit…','Débit 681 Dotations / Crédit 28 Amortissements','Débit 28 / Crédit 681','Débit 24 / Crédit 681','Débit 681 / Crédit 521',
   'La charge calculée (681) a pour contrepartie l\'amortissement cumulé (28), compte d\'actif soustractif — aucune sortie de trésorerie.',
   'https://fr.wikipedia.org/wiki/Amortissement_comptable'),
 mk('La valeur nette comptable (VNC) d\'une immobilisation est…','Coût d\'entrée − amortissements cumulés (− dépréciations)','Prix de revente espéré','Coût d\'entrée + amortissements','Valeur à neuf',
   'VNC = valeur brute − amortissements/dépréciations : c\'est la valeur au bilan, non la valeur de marché.',
   'https://fr.wikipedia.org/wiki/Valeur_nette_comptable'),
 mk('Le principe de prudence impose…','De comptabiliser les pertes probables dès qu\'elles sont connues, mais pas les gains latents','D\'anticiper tous les profits','De lisser le résultat','D\'ignorer les risques',
   'Dissymétrie volontaire : provisions pour risques et dépréciations dès qu\'ils sont probables ; les plus-values latentes attendent leur réalisation.',
   'https://fr.wikipedia.org/wiki/Principe_de_prudence'),
 mk('Une provision pour risques est…','Un passif d\'un montant ou d\'une échéance incertains, comptabilisé quand l\'obligation est probable','Une réserve de trésorerie','Un don','Un amortissement d\'immobilisation',
   'La provision (classe 19/49/59 selon l\'objet, via 691…) traduit une sortie probable de ressources estimable de façon fiable.',
   'https://fr.wikipedia.org/wiki/Provision_(comptabilit%C3%A9)'),
 mk('Le rapprochement bancaire consiste à…','Expliquer les écarts entre le compte 521 et le relevé de banque','Fusionner deux banques','Payer les fournisseurs','Clôturer l\'exercice',
   'Chèques non débités, virements non crédités, frais non enregistrés : l\'état de rapprochement justifie l\'écart des soldes à une date donnée.',
   'https://fr.wikipedia.org/wiki/Rapprochement_bancaire'),
 mk('La balance générale est équilibrée quand…','Total des débits = total des crédits','L\'actif dépasse le passif','Le résultat est positif','La caisse est pleine',
   'Conséquence de la partie double : la somme des mouvements (et des soldes) débiteurs égale celle des crédits — contrôle arithmétique.',
   'https://fr.wikipedia.org/wiki/Balance_comptable'),
 mk('Le grand-livre regroupe…','L\'ensemble des comptes avec leurs mouvements','Uniquement les factures','Les contrats de travail','Les statuts',
   'Le journal enregistre chronologiquement ; le grand-livre reclasse par compte ; la balance synthétise les soldes.',
   'https://fr.wikipedia.org/wiki/Grand_livre'),
 mk('En comptabilité analytique, un coût complet comprend…','Charges directes + quote-part de charges indirectes imputées','Seulement les achats','Uniquement la main-d\'œuvre','Les impôts seuls',
   'Le coût complet incorpore les charges indirectes via des centres d\'analyse et des unités d\'œuvre (ou méthode ABC).',
   'https://fr.wikipedia.org/wiki/Co%C3%BBt_complet'),
 mk('La méthode ABC (Activity Based Costing) répartit les charges indirectes selon…','Les activités et leurs inducteurs de coûts','Le chiffre d\'affaires uniquement','L\'ancienneté du personnel','Le hasard contrôlé',
   'ABC identifie les activités consommatrices de ressources et impute aux produits via des inducteurs (lots, commandes, heures machine…).',
   'https://fr.wikipedia.org/wiki/Comptabilit%C3%A9_par_activit%C3%A9s'),
 mk('La marge sur coût variable (MCV) est…','Chiffre d\'affaires − charges variables','CA − charges fixes','Résultat net','CA − impôts',
   'MCV couvre les charges fixes ; quand MCV = CF, on atteint le seuil de rentabilité ; au-delà, chaque unité dégage du résultat.',
   'https://fr.wikipedia.org/wiki/Marge_sur_co%C3%BBt_variable'),
 mk('Le seuil de rentabilité en valeur se calcule par…','Charges fixes ÷ taux de marge sur coût variable','CF × taux de MCV','CA − CV','CF + CV',
   'SR = CF / (MCV/CA). Au SR, le résultat est nul ; le point mort en donne la date dans l\'exercice.',
   'https://fr.wikipedia.org/wiki/Seuil_de_rentabilit%C3%A9'),
 mk('L\'EBE (excédent brut d\'exploitation) mesure…','La performance économique avant amortissements, provisions et éléments financiers','Le résultat net','La trésorerie en caisse','Les dividendes versés',
   'EBE = VA + subventions d\'exploitation − impôts et taxes − charges de personnel : indicateur clé de la rentabilité opérationnelle.',
   'https://fr.wikipedia.org/wiki/Exc%C3%A9dent_brut_d%27exploitation'),
 mk('La CAF (capacité d\'autofinancement) représente…','Les ressources internes dégagées par l\'activité (résultat + charges calculées − produits calculés)','Le découvert autorisé','Les apports des associés','Les subventions reçues',
   'CAF ≈ résultat net + dotations − reprises − plus-values de cession + valeurs comptables cédées : potentiel de financement propre.',
   'https://fr.wikipedia.org/wiki/Capacit%C3%A9_d%27autofinancement'),
 mk('Le BFR (besoin en fonds de roulement) naît…','Du décalage entre décaissements (stocks, clients) et encaissements (fournisseurs)','Des seuls emprunts','Du capital social','Des amortissements',
   'BFR = stocks + créances − dettes d\'exploitation : il augmente avec l\'activité et doit être financé par le FR ou la trésorerie.',
   'https://fr.wikipedia.org/wiki/Besoin_en_fonds_de_roulement'),
 mk('Le fonds de roulement net global (FRNG) est…','Ressources stables − actifs immobilisés','Caisse + banque','CA − charges','Capital − dettes',
   'FRNG finance le cycle d\'exploitation : Trésorerie nette = FRNG − BFR.',
   'https://fr.wikipedia.org/wiki/Fonds_de_roulement'),
 mk('Un inventaire physique des stocks sert à…','Constater les existants réels et corriger les écarts comptables','Payer la TVA','Licencier','Évaluer le capital social',
   'Obligatoire au moins une fois par exercice : les écarts (démarque, casse) ajustent les comptes de stocks et le résultat.',
   'https://fr.wikipedia.org/wiki/Inventaire'),
 mk('La méthode PEPS (FIFO) valorise les sorties de stock…','Au coût des lots les plus anciens d\'abord','Au coût des lots les plus récents','Au prix de vente','À la moyenne des ventes',
   'FIFO (premier entré, premier sorti) et CMP (coût moyen pondéré) sont admises par le SYSCOHADA ; LIFO ne l\'est pas.',
   'https://fr.wikipedia.org/wiki/First_in,_first_out'),
 mk('Le CMP après chaque entrée se calcule par…','(Valeur du stock existant + valeur de l\'entrée) ÷ quantités totales','Prix de la dernière entrée','Prix de vente moyen','Somme des prix ÷ nombre de factures',
   'Le coût moyen pondéré lisse les variations de prix d\'achat ; il peut être calculé après chaque entrée ou en fin de période.',
   'https://fr.wikipedia.org/wiki/Co%C3%BBt_moyen_pond%C3%A9r%C3%A9'),
 mk('Les charges HAO (hors activités ordinaires) du SYSCOHADA correspondent…','Aux opérations inhabituelles (classe 8) distinctes de l\'exploitation courante','Aux salaires','Aux achats de marchandises','À la TVA',
   'La classe 8 isole les événements extraordinaires (cessions exceptionnelles, subventions d\'équilibre…) pour préserver la lisibilité du résultat ordinaire.',
   'https://fr.wikipedia.org/wiki/Syst%C3%A8me_comptable_OHADA'),
 mk('Le résultat net de l\'exercice apparaît…','Au compte de résultat et dans les capitaux propres du bilan','Uniquement en trésorerie','Dans le compte 411','Dans les stocks',
   'Le résultat (produit net des charges) boucle bilan et compte de résultat : bénéfice au crédit des capitaux propres (compte 13).',
   'https://fr.wikipedia.org/wiki/R%C3%A9sultat_net'),
 mk('L\'affectation du résultat en réserves traduit…','La décision de conserver des bénéfices dans l\'entreprise','Une perte définitive','Un remboursement de TVA','Un don aux salariés',
   'L\'assemblée décide la répartition : réserve légale (OHADA : 10 % du bénéfice jusqu\'à 20 % du capital), autres réserves, dividendes, report.',
   'https://fr.wikipedia.org/wiki/R%C3%A9serve_(comptabilit%C3%A9)'),
] .forEach(x => cpt.push(x));

// Paramétriques compta — amortissement linéaire : annuité (10)
[[10000000,5,2000000],[24000000,8,3000000],[15000000,10,1500000],[36000000,6,6000000],[8000000,4,2000000],[50000000,5,10000000],[12000000,3,4000000],[45000000,9,5000000],[18000000,6,3000000],[28000000,7,4000000]]
.forEach(([c, d, a]) => cpt.push(mk(
  `Un matériel acquis ${F(c)} FCFA est amorti linéairement sur ${d} ans (valeur résiduelle nulle). Annuité d'amortissement :`,
  `${F(a)} FCFA`, `${F(a*2)} FCFA`, `${F(Math.round(a/2))} FCFA`, `${F(Math.round(c*0.27))} FCFA`,
  `Annuité = ${F(c)} ÷ ${d} = ${F(a)} FCFA par an.`,
  'https://fr.wikipedia.org/wiki/Amortissement_comptable')));

// Taux linéaire (6)
[[4,25],[5,20],[8,12.5],[10,10],[20,5],[25,4]]
.forEach(([d, t]) => cpt.push(mk(
  `Le taux d'amortissement linéaire d'un bien amorti sur ${d} ans est :`,
  `${String(t).replace('.', ',')} %`, `${String(d)} %`, `${String(t*2).replace('.', ',')} %`, `${String((100/(d+2)).toFixed(1)).replace('.', ',')} %`,
  `Taux = 100 ÷ ${d} = ${String(t).replace('.', ',')} % par an.`,
  'https://fr.wikipedia.org/wiki/Amortissement_comptable')));

// VNC après n années (8)
[[20000000,5,2,12000000],[30000000,10,4,18000000],[12000000,4,3,3000000],[40000000,8,5,15000000],[25000000,5,1,20000000],[18000000,6,2,12000000],[60000000,10,7,18000000],[16000000,8,6,4000000]]
.forEach(([c, d, n, v]) => cpt.push(mk(
  `Un bien de ${F(c)} FCFA amorti linéairement sur ${d} ans a une valeur nette comptable, après ${n} annuités, de :`,
  `${F(v)} FCFA`, `${F(Math.round(c*n/d))} FCFA`, `${F(c)} FCFA`, `${F(Math.max(0,v-2000000))} FCFA`,
  `Amortissements cumulés = ${n} × ${F(c/d)} = ${F(c*n/d)} ; VNC = ${F(c)} − ${F(c*n/d)} = ${F(v)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Valeur_nette_comptable')));

// Résultat = CA − charges (8)
[[45000000,38000000,7000000],[120000000,97000000,23000000],[80000000,86000000,-6000000],[60000000,52500000,7500000],[95000000,71000000,24000000],[38000000,41000000,-3000000],[150000000,118000000,32000000],[72000000,64000000,8000000]]
.forEach(([ca, ch, r]) => cpt.push(mk(
  `CA de l'exercice : ${F(ca)} FCFA ; total des charges : ${F(ch)} FCFA. Le résultat est :`,
  `${r<0?'Perte de '+F(-r):'Bénéfice de '+F(r)} FCFA`, `${r<0?'Bénéfice de '+F(-r):'Perte de '+F(r)} FCFA`, `${F(ca+ch)} FCFA de bénéfice`, `Résultat nul`,
  `Résultat = produits − charges = ${F(ca)} − ${F(ch)} = ${F(r)} FCFA ${r<0?'(perte)':'(bénéfice)'}.`,
  'https://fr.wikipedia.org/wiki/R%C3%A9sultat_net')));

// Marge commerciale (6)
[[75000000,52000000,23000000],[48000000,31000000,17000000],[90000000,66000000,24000000],[36000000,27000000,9000000],[110000000,79000000,31000000],[64000000,48000000,16000000]]
.forEach(([v, ca, m]) => cpt.push(mk(
  `Ventes de marchandises : ${F(v)} FCFA ; coût d'achat des marchandises vendues : ${F(ca)} FCFA. Marge commerciale :`,
  `${F(m)} FCFA`, `${F(v+ca)} FCFA`, `${F(Math.round(m/2))} FCFA`, `${F(Math.round(v*0.5))} FCFA`,
  `Marge commerciale = ventes − coût d'achat vendu = ${F(v)} − ${F(ca)} = ${F(m)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Marge_commerciale')));

// Seuil de rentabilité (6)
[[24000000,40,60000000],[18000000,30,60000000],[36000000,45,80000000],[15000000,25,60000000],[42000000,35,120000000],[27000000,45,60000000]]
.forEach(([cf, tx, sr]) => cpt.push(mk(
  `Charges fixes : ${F(cf)} FCFA ; taux de marge sur coût variable : ${tx} %. Seuil de rentabilité (CA critique) :`,
  `${F(sr)} FCFA`, `${F(Math.round(sr*1.5))} FCFA`, `${F(Math.round(sr/2))} FCFA`, `${F(cf)} FCFA`,
  `SR = CF ÷ taux de MCV = ${F(cf)} ÷ ${tx} % = ${F(sr)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Seuil_de_rentabilit%C3%A9')));

// BFR (6)
[[30000000,42000000,28000000,44000000],[25000000,30000000,35000000,20000000],[18000000,22000000,16000000,24000000],[40000000,55000000,38000000,57000000],[22000000,15000000,20000000,17000000],[35000000,48000000,50000000,33000000]]
.forEach(([s, c, f, bfr]) => cpt.push(mk(
  `Stocks : ${F(s)} FCFA ; créances clients : ${F(c)} FCFA ; dettes fournisseurs : ${F(f)} FCFA. BFR d'exploitation :`,
  `${F(bfr)} FCFA`, `${F(s+c+f)} FCFA`, `${F(Math.abs(f-c))} FCFA`, `${F(Math.round(bfr/2))} FCFA`,
  `BFR = stocks + créances − dettes = ${F(s)} + ${F(c)} − ${F(f)} = ${F(bfr)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Besoin_en_fonds_de_roulement')));

// CMP (6)
[[100,5000,50,6200,5400],[200,3000,100,3600,3200],[80,12000,40,13500,12500],[150,8000,50,8600,8150],[60,20000,60,22000,21000],[300,1500,100,1900,1600]]
.forEach(([q1, p1, q2, p2, cmp]) => cpt.push(mk(
  `Stock initial : ${q1} unités à ${F(p1)} FCFA ; entrée : ${q2} unités à ${F(p2)} FCFA. Coût moyen pondéré unitaire :`,
  `${F(cmp)} FCFA`, `${F(p2)} FCFA`, `${F(Math.round((p1+p2)/2))} FCFA`, `${F(p1)} FCFA`,
  `CMP = (${q1}×${F(p1)} + ${q2}×${F(p2)}) ÷ ${q1+q2} = ${F(cmp)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Co%C3%BBt_moyen_pond%C3%A9r%C3%A9')));

// Réserve légale OHADA : 10 % du bénéfice (8)
[[20000000,2000000],[35000000,3500000],[48000000,4800000],[12000000,1200000],[60000000,6000000],[27000000,2700000],[90000000,9000000],[54000000,5400000]]
.forEach(([b, r]) => cpt.push(mk(
  `Une SARL OHADA réalise un bénéfice de ${F(b)} FCFA. Dotation minimale à la réserve légale (10 %, plafond non atteint) :`,
  `${F(r)} FCFA`, `${F(r*2)} FCFA`, `${F(Math.round(r/2))} FCFA`, `${F(Math.round(b*0.27))} FCFA`,
  `Réserve légale = 10 % × ${F(b)} = ${F(r)} FCFA, jusqu'à ce qu'elle atteigne 20 % du capital (AUSCGIE).`,
  'https://fr.wikipedia.org/wiki/R%C3%A9serve_l%C3%A9gale')));

// Dividende par action (8)
[[50000000,10000,5000],[24000000,8000,3000],[90000000,30000,3000],[36000000,12000,3000],[120000000,20000,6000],[45000000,15000,3000],[80000000,16000,5000],[60000000,24000,2500]]
.forEach(([dist, n, dpa]) => cpt.push(mk(
  `Une société distribue ${F(dist)} FCFA de dividendes pour ${F(n)} actions. Dividende par action :`,
  `${F(dpa)} FCFA`, `${F(dpa*2)} FCFA`, `${F(Math.round(dpa/2))} FCFA`, `${F(dpa+1500)} FCFA`,
  `DPA = ${F(dist)} ÷ ${F(n)} = ${F(dpa)} FCFA par action.`,
  'https://fr.wikipedia.org/wiki/Dividende')));

// Assemblage
const m1Packs = [
  ...packify(FISC, 'Fiscalité togolaise', 'Fiscalité pratique', fisc),
  ...packify(MP,   'Commande publique',   'Marchés publics — approfondissement', mp),
  ...packify(CPT,  'Comptabilité OHADA',  'Comptabilité — approfondissement', cpt)
];

module.exports = { m1Packs, m2Packs: [], m3Packs: [] };
