// =====================================================================
// data_extra_v230g.js — v2.30 : compléments finaux pour atteindre
// ≥ 120 questions dans chaque domaine (générateurs déterministes).
// =====================================================================

const { D, mk, packify, F } = require('./data_extra_v230b.js');
const { IA_NAME, BTP_NAME } = require('./data_extra_v230f.js');

const out = [];
const pk = (dom, theme, titre, arr) => out.push(...packify(dom, theme, titre, arr));

// ---------- HISTOIRE DE LA PENSÉE (+68) ------------------------------
const AUTEURS = [
 ['Adam Smith','La Richesse des nations','classique','XVIIIᵉ siècle','la main invisible'],
 ['David Ricardo','Des principes de l\'économie politique et de l\'impôt','classique','XIXᵉ siècle','l\'avantage comparatif'],
 ['Karl Marx','Le Capital','marxiste','XIXᵉ siècle','la plus-value'],
 ['John Maynard Keynes','La Théorie générale de l\'emploi, de l\'intérêt et de la monnaie','keynésienne','XXᵉ siècle','la demande effective'],
 ['Milton Friedman','Capitalisme et liberté','monétariste (école de Chicago)','XXᵉ siècle','la règle de croissance monétaire'],
 ['Joseph Schumpeter','Capitalisme, socialisme et démocratie','évolutionniste autrichienne','XXᵉ siècle','la destruction créatrice'],
 ['Léon Walras','Éléments d\'économie politique pure','néoclassique (école de Lausanne)','XIXᵉ siècle','l\'équilibre général'],
 ['Alfred Marshall','Principes d\'économie politique','néoclassique (école de Cambridge)','XIXᵉ siècle','l\'équilibre partiel offre-demande'],
 ['Thomas Malthus','Essai sur le principe de population','classique','XIXᵉ siècle','le piège démographique'],
 ['Friedrich Hayek','La Route de la servitude','autrichienne néolibérale','XXᵉ siècle','l\'ordre spontané du marché'],
 ['Amartya Sen','Un nouveau modèle économique (Development as Freedom)','économie du développement et du bien-être','XXᵉ siècle','les capabilités'],
 ['Esther Duflo','Repenser la pauvreté','économie du développement expérimentale','XXIᵉ siècle','les essais randomisés contre la pauvreté'],
];
const hpe2 = [];
AUTEURS.forEach(([nom, oeuvre, ecole, siecle, concept], i) => {
  const alt = AUTEURS.filter((_, j) => j !== i);
  hpe2.push(mk(`Qui est l'auteur de l'ouvrage « ${oeuvre} » ?`, nom, alt[(i+1)%alt.length][0], alt[(i+3)%alt.length][0], alt[(i+5)%alt.length][0],
    `« ${oeuvre} » est l'œuvre majeure de ${nom} (${siecle}), figure de l'école ${ecole}.`,
    'https://fr.wikipedia.org/wiki/Histoire_de_la_pens%C3%A9e_%C3%A9conomique'));
  hpe2.push(mk(`À quel courant rattache-t-on principalement ${nom} ?`, `L'école ${ecole}`, `L'école ${alt[(i+2)%alt.length][2]}`, `L'école ${alt[(i+4)%alt.length][2]}`, `L'école ${alt[(i+6)%alt.length][2]}`,
    `${nom} appartient à l'école ${ecole} ; son concept phare est ${concept}.`,
    'https://fr.wikipedia.org/wiki/Histoire_de_la_pens%C3%A9e_%C3%A9conomique'));
  hpe2.push(mk(`À quel auteur doit-on le concept de « ${concept.replace(/^l[ae'’]s? ?/i,'')} » ?`, nom, alt[(i+2)%alt.length][0], alt[(i+5)%alt.length][0], alt[(i+7)%alt.length][0],
    `${concept.charAt(0).toUpperCase()+concept.slice(1)} est au cœur de l'apport de ${nom} (${siecle}).`,
    'https://fr.wikipedia.org/wiki/Histoire_de_la_pens%C3%A9e_%C3%A9conomique'));
  hpe2.push(mk(`À quel siècle ${nom} a-t-il principalement produit son œuvre ?`, `Au ${siecle}`, `Au ${siecle==='XIXᵉ siècle'?'XVIᵉ siècle':'XIXᵉ siècle'}`, `Au ${siecle==='XXᵉ siècle'?'XVIIᵉ siècle':'XXᵉ siècle'}`, `Au XVᵉ siècle`,
    `${nom} a écrit « ${oeuvre} » au ${siecle}.`,
    'https://fr.wikipedia.org/wiki/Histoire_de_la_pens%C3%A9e_%C3%A9conomique'));
});
pk(D.HPE, 'Auteurs et doctrines', 'Pensée économique — compléments', hpe2.slice(0, 68));

// ---------- MARCHÉS FINANCIERS (+44) ---------------------------------
const mf2 = [];
[[2000,5000000,10],[1500,2000000,3],[8000,10000000,80],[500,40000000,20],[3000,15000000,45],[1200,25000000,30],[600,50000000,30],[10000,3000000,30],[4000,20000000,80],[750,80000000,60],[2500,6000000,15],[900,10000000,9]]
.forEach(([cours, n, capMd]) => mf2.push(mk(
  `Une société cotée à ${F(cours)} FCFA compte ${F(n)} actions. Sa capitalisation boursière est de :`,
  `${capMd} milliard${capMd>1?'s':''} FCFA`, `${capMd*2} milliards FCFA`, `${Math.max(1,Math.round(capMd/2))} milliard(s) FCFA`, `${F(cours)} millions FCFA`,
  `Capitalisation = cours × nombre d'actions = ${F(cours)} × ${F(n)} = ${capMd} milliard(s) FCFA.`,
  'https://fr.wikipedia.org/wiki/Capitalisation_boursi%C3%A8re')));
[[200,210,5],[150,144,-4],[300,330,10],[250,245,-2],[180,198,10],[120,126,5],[400,380,-5],[220,231,5],[160,152,-5],[280,308,10],[100,97,-3],[350,364,4]]
.forEach(([i0, i1, v]) => mf2.push(mk(
  `L'indice BRVM Composite passe de ${i0} à ${i1} points sur la période. Sa variation est de :`,
  `${v>0?'+':''}${v} %`, `${v>0?'+':''}${v*2} %`, `${v>0?'-':'+'}${Math.abs(v)} %`, `${i1-i0} points de %`,
  `Variation = (${i1} − ${i0}) ÷ ${i0} = ${v>0?'+':''}${v} %.`,
  'https://fr.wikipedia.org/wiki/Indice_boursier')));
[[1000000,6,5,300000],[500000,8,10,400000],[2000000,5,7,700000],[1500000,10,3,450000],[800000,7,5,280000],[1200000,5,4,240000],[600000,9,10,540000],[2500000,6,5,750000],[400000,8,5,160000],[3000000,4,10,1200000]]
.forEach(([nom, tx, n, tot]) => mf2.push(mk(
  `Une obligation de ${F(nom)} FCFA au taux nominal de ${tx} % détenue ${n} ans rapporte au total (coupons cumulés) :`,
  `${F(tot)} FCFA`, `${F(tot*2)} FCFA`, `${F(Math.round(tot/2))} FCFA`, `${F(nom)} FCFA`,
  `Coupons cumulés = ${tx} % × ${F(nom)} × ${n} ans = ${F(tot)} FCFA (hors remboursement du principal).`,
  'https://fr.wikipedia.org/wiki/Coupon_(finance)')));
[[5000,250,5750,20],[8000,400,8400,10],[2000,100,2900,45],[10000,500,10500,10],[4000,200,4600,15],[6000,300,7500,30],[2500,125,2875,15],[12000,600,13800,20],[3000,150,3900,35],[1500,75,1725,15]]
.forEach(([achat, div, vente, tx]) => mf2.push(mk(
  `Action achetée ${F(achat)} FCFA, dividende perçu ${F(div)} FCFA, revendue ${F(vente)} FCFA. Rendement total sur l'opération :`,
  `${tx} %`, `${tx*2} %`, `${Math.max(1,Math.round(tx/2))} %`, `${100-tx} %`,
  `Rendement = (dividende + plus-value) ÷ prix d'achat = (${F(div)} + ${F(vente-achat)}) ÷ ${F(achat)} = ${tx} %.`,
  'https://fr.wikipedia.org/wiki/Rendement_(finance)')));
pk(D.MF, 'Bourse régionale', 'BRVM — calculs d\'investisseur', mf2.slice(0, 44));

// ---------- SUIVI-ÉVALUATION (+44) -----------------------------------
const se2 = [];
[[8,10,80],[15,20,75],[12,12,100],[18,24,75],[9,12,75],[30,40,75],[16,20,80],[21,28,75],[11,20,55],[27,30,90],[14,16,87.5],[6,8,75]]
.forEach(([f, p, tx]) => se2.push(mk(
  `Sur ${p} activités planifiées au trimestre, ${f} ont été réalisées. Le taux de réalisation physique est de :`,
  `${String(tx).replace('.', ',')} %`, `${Math.min(100,tx+15)} %`, `${Math.max(5,tx-25)} %`, `${p-f} %`,
  `Taux = réalisées ÷ planifiées = ${f} ÷ ${p} = ${String(tx).replace('.', ',')} %.`,
  'https://fr.wikipedia.org/wiki/Suivi_et_%C3%A9valuation')));
[[500,450,-10],[300,330,10],[800,720,-10],[250,275,10],[600,540,-10],[400,500,25],[900,810,-10],[150,180,20],[700,630,-10],[350,420,20]]
.forEach(([prevu, reel, ec]) => se2.push(mk(
  `Dépense prévue : ${F(prevu)} millions FCFA ; dépense réelle : ${F(reel)} millions. L'écart budgétaire relatif est de :`,
  `${ec>0?'+':''}${ec} % (${ec>0?'dépassement':'sous-consommation'})`, `${ec>0?'-':'+'}${Math.abs(ec)} %`, `${ec*2>0?'+':''}${ec*2} %`, `${F(Math.abs(prevu-reel))} %`,
  `Écart = (réel − prévu) ÷ prévu = (${F(reel)} − ${F(prevu)}) ÷ ${F(prevu)} = ${ec>0?'+':''}${ec} %.`,
  'https://fr.wikipedia.org/wiki/Contr%C3%B4le_budg%C3%A9taire')));
[[4500,6000,75],[1200,1500,80],[900,1200,75],[15000,20000,75],[3600,4000,90],[770,1100,70],[2400,3000,80],[5100,6000,85],[640,800,80],[10500,15000,70],[1980,2200,90],[450,600,75]]
.forEach(([ben, cible, tx]) => se2.push(mk(
  `Un projet visait ${F(cible)} bénéficiaires ; ${F(ben)} ont été effectivement touchés. Le taux de couverture est de :`,
  `${tx} %`, `${Math.min(100,tx+18)} %`, `${Math.max(5,tx-22)} %`, `${100-tx} %`,
  `Couverture = bénéficiaires atteints ÷ cible = ${F(ben)} ÷ ${F(cible)} = ${tx} %.`,
  'https://fr.wikipedia.org/wiki/Indicateur')));
[[45000000,1500,30000],[120000000,4000,30000],[60000000,2400,25000],[90000000,3000,30000],[36000000,1200,30000],[150000000,5000,30000],[24000000,800,30000],[75000000,2500,30000],[54000000,1800,30000],[100000000,2500,40000]]
.forEach(([cout, ben, cpb]) => se2.push(mk(
  `Un programme de ${F(cout)} FCFA a touché ${F(ben)} bénéficiaires. Le coût unitaire par bénéficiaire est de :`,
  `${F(cpb)} FCFA`, `${F(cpb*2)} FCFA`, `${F(Math.round(cpb/2))} FCFA`, `${F(ben)} FCFA`,
  `Coût par bénéficiaire = ${F(cout)} ÷ ${F(ben)} = ${F(cpb)} FCFA — indicateur d'efficience à comparer aux références sectorielles.`,
  'https://fr.wikipedia.org/wiki/Analyse_co%C3%BBt-efficacit%C3%A9')));
pk(D.SE, 'Méthodes de S&E', 'Suivi-évaluation — calculs de pilotage', se2.slice(0, 44));

// ---------- HISTOIRE / TRAVAIL / SANTÉ / ÉDUCATION (+44) --------------
const hist2 = [];
[[40,12,28],[35,10,25],[45,15,30],[30,8,22],[38,9,29],[42,14,28],[36,11,25],[48,18,30],[33,10,23],[44,12,32],[29,9,20],[37,13,24]]
.forEach(([nat, mort, acc]) => hist2.push(mk(
  `Taux de natalité : ${nat} ‰ ; taux de mortalité : ${mort} ‰. Le taux d'accroissement naturel est de :`,
  `${acc} ‰`, `${nat+mort} ‰`, `${Math.round(acc/2)} ‰`, `${acc*2} ‰`,
  `Accroissement naturel = natalité − mortalité = ${nat} − ${mort} = ${acc} ‰ (hors migrations).`,
  'https://fr.wikipedia.org/wiki/Accroissement_naturel')));
[[8000000,56600,141],[1500000,10000,150],[6000000,50000,120],[2400000,12000,200],[9000000,60000,150],[3600000,24000,150],[4800000,40000,120],[1200000,6000,200],[7500000,50000,150],[2000000,25000,80]]
.forEach(([pop, sup, d]) => hist2.push(mk(
  `Un territoire de ${F(sup)} km² compte ${F(pop)} habitants. Sa densité de population est d'environ :`,
  `${d} hab/km²`, `${d*2} hab/km²`, `${Math.max(5,Math.round(d/2))} hab/km²`, `${F(sup)} hab/km²`,
  `Densité = population ÷ superficie = ${F(pop)} ÷ ${F(sup)} ≈ ${d} hab/km².`,
  'https://fr.wikipedia.org/wiki/Densit%C3%A9_de_population')));
[[3200000,8000000,40],[2100000,7000000,30],[4500000,9000000,50],[1800000,6000000,30],[2800000,7000000,40],[5400000,9000000,60],[1500000,5000000,30],[3600000,8000000,45],[2500000,5000000,50],[4200000,7000000,60]]
.forEach(([urb, pop, tx]) => hist2.push(mk(
  `Sur ${F(pop)} habitants, ${F(urb)} vivent en ville. Le taux d'urbanisation est de :`,
  `${tx} %`, `${Math.min(95,tx+20)} %`, `${Math.max(5,tx-15)} %`, `${100-tx} %`,
  `Urbanisation = population urbaine ÷ population totale = ${F(urb)} ÷ ${F(pop)} = ${tx} %.`,
  'https://fr.wikipedia.org/wiki/Urbanisation')));
[[130,100,130],[110,100,110],[95,100,95],[144,120,120],[126,90,140],[105,140,75],[121,110,110],[90,120,75],[132,120,110],[108,90,120],[100,125,80],[117,90,130]]
.forEach(([insc, popAge, tbs]) => hist2.push(mk(
  `${F(insc)} élèves (tous âges) sont inscrits au primaire pour ${F(popAge)} enfants d'âge officiel. Le taux BRUT de scolarisation est de :`,
  `${tbs} %`, `${Math.max(10,tbs-30)} %`, `${tbs+15} %`, `${Math.abs(insc-popAge)} %`,
  `TBS = inscrits (tous âges) ÷ population d'âge officiel = ${F(insc)} ÷ ${F(popAge)} = ${tbs} % ; il peut dépasser 100 % (redoublants, hors-âge).`,
  'https://fr.wikipedia.org/wiki/Taux_de_scolarisation')));
pk(D.HIST, 'Société et développement', 'Démographie et social — calculs', hist2.slice(0, 44));

// ---------- CULTURE GÉNÉRALE & ENVIRONNEMENT (+44) --------------------
const cult2 = [];
[['la conférence de Stockholm sur l\'environnement','1972'],['le protocole de Montréal sur la couche d\'ozone','1987'],['le sommet de la Terre de Rio','1992'],['le protocole de Kyoto sur le climat','1997'],['l\'accord de Paris sur le climat','2015'],['le sommet Rio+20','2012'],['la création du GIEC','1988'],['l\'adoption des ODD (Agenda 2030)','2015']]
.forEach(([evt, an]) => cult2.push(mk(
  `En quelle année a eu lieu ${evt} ?`, an, String(+an-5), String(+an+3), String(+an-11),
  `${evt.charAt(0).toUpperCase()+evt.slice(1)} date de ${an}.`,
  'https://fr.wikipedia.org/wiki/Chronologie_de_l%27%C3%A9cologie')));
[[12000,60000,20],[4500,30000,15],[9000,45000,20],[3000,15000,20],[18000,90000,20],[6000,60000,10],[15000,50000,30],[2500,25000,10]]
.forEach(([prot, tot, tx]) => cult2.push(mk(
  `Un pays protège ${F(prot)} km² sur ${F(tot)} km². La part d'aires protégées est de :`,
  `${tx} %`, `${tx*2} %`, `${Math.max(2,Math.round(tx/2))} %`, `${100-tx} %`,
  `Part = protégé ÷ total = ${F(prot)} ÷ ${F(tot)} = ${tx} % (cible mondiale : 30 % en 2030).`,
  'https://fr.wikipedia.org/wiki/Aire_prot%C3%A9g%C3%A9e')));
[[0.5,730,365],[0.8,365,292],[1.2,500,600],[0.6,600,360],[2,250,500],[1.5,400,600],[0.4,900,360],[0.9,800,720]]
.forEach(([kgj, jours, tot]) => cult2.push(mk(
  `Un citadin produit ${String(kgj).replace('.', ',')} kg de déchets par jour. Sur ${jours} jours, cela représente :`,
  `${F(tot)} kg`, `${F(tot*2)} kg`, `${F(Math.round(tot/2))} kg`, `${F(jours)} kg`,
  `Production = ${String(kgj).replace('.', ',')} × ${jours} = ${F(tot)} kg — d'où l'enjeu du tri et de la valorisation.`,
  'https://fr.wikipedia.org/wiki/Gestion_des_d%C3%A9chets')));
[[120,15000,1800],[95,20000,1900],[150,10000,1500],[110,30000,3300],[130,25000,3250],[100,18000,1800],[140,5000,700],[90,40000,3600]]
.forEach(([gkm, km, kg]) => cult2.push(mk(
  `Une voiture émet ${gkm} g de CO₂/km. Sur ${F(km)} km par an, ses émissions atteignent :`,
  `${F(kg)} kg de CO₂`, `${F(kg*2)} kg de CO₂`, `${F(Math.round(kg/2))} kg de CO₂`, `${F(gkm)} kg de CO₂`,
  `Émissions = ${gkm} g × ${F(km)} km = ${F(gkm*km)} g = ${F(kg)} kg de CO₂ par an.`,
  'https://fr.wikipedia.org/wiki/Empreinte_carbone')));
[[60,0.25,15],[100,0.3,30],[80,0.25,20],[120,0.5,60],[40,0.75,30],[200,0.2,40],[150,0.4,60],[90,0.5,45],[70,0.3,21],[110,0.2,22],[50,0.9,45],[240,0.25,60]]
.forEach(([l, prix, cout]) => cult2.push(mk(
  `Un ménage consomme ${l} m³ d'eau par an à ${String(prix).replace('.', ',')} millier de FCFA le m³. Dépense annuelle en eau :`,
  `${F(cout)} milliers de FCFA`, `${F(cout*2)} milliers de FCFA`, `${F(Math.round(cout/2))} milliers de FCFA`, `${F(l)} milliers de FCFA`,
  `Dépense = ${l} × ${String(prix).replace('.', ',')} = ${F(cout)} milliers de FCFA — l'accès à l'eau potable est la cible ODD 6.`,
  'https://fr.wikipedia.org/wiki/Acc%C3%A8s_%C3%A0_l%27eau_potable')));
pk(D.CULT, 'Repères généraux', 'Environnement — dates et calculs', cult2.slice(0, 44));

// ---------- IA / LLM (+48) -------------------------------------------
const ia2 = [];
[[50,1000,20],[100,1000,10],[25,500,20],[200,3000,15],[40,2000,50],[80,4000,50],[125,1000,8],[60,3000,50],[150,3000,20],[75,1500,20],[30,600,20],[90,2700,30]]
.forEach(([tps, tok, s]) => ia2.push(mk(
  `Un modèle génère ${tps} tokens par seconde. Produire une réponse de ${F(tok)} tokens prend environ :`,
  `${s} secondes`, `${s*2} secondes`, `${Math.max(1,Math.round(s/2))} secondes`, `${tps} secondes`,
  `Temps = ${F(tok)} ÷ ${tps} = ${s} s — la latence de génération est un critère clé en production.`,
  'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage')));
[[7,2,14],[7,1,7],[13,2,26],[70,2,140],[8,4,32],[13,1,13],[34,2,68],[70,1,70],[8,2,16],[34,1,34],[13,4,52],[7,4,28]]
.forEach(([mdParams, octets, go]) => ia2.push(mk(
  `Un modèle de ${mdParams} milliards de paramètres stocké en ${octets===1?'8 bits (1 octet)':octets+' octets'} par paramètre occupe environ :`,
  `${go} Go`, `${go*2} Go`, `${Math.max(1,Math.round(go/2))} Go`, `${mdParams} Go`,
  `Mémoire ≈ ${mdParams} Md × ${octets} octet(s) = ${go} Go — la quantification (8/4 bits) réduit l'empreinte pour l'inférence locale.`,
  'https://fr.wikipedia.org/wiki/Quantification_(apprentissage_automatique)')));
[[128000,20000,108000],[200000,50000,150000],[32000,8000,24000],[128000,100000,28000],[1000000,250000,750000],[200000,120000,80000],[32000,30000,2000],[128000,64000,64000],[400000,150000,250000],[100000,45000,55000],[8000,6000,2000],[64000,16000,48000]]
.forEach(([fen, occ, rest]) => ia2.push(mk(
  `Un modèle a une fenêtre de contexte de ${F(fen)} tokens ; la conversation en occupe déjà ${F(occ)}. Il reste :`,
  `${F(rest)} tokens`, `${F(fen)} tokens`, `${F(Math.round(rest/2))} tokens`, `${F(occ)} tokens`,
  `Reste = ${F(fen)} − ${F(occ)} = ${F(rest)} tokens disponibles pour la suite (prompt + réponse).`,
  'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage')));
[[2000,15,30000],[500,40,20000],[1200,25,30000],[3000,10,30000],[800,50,40000],[1500,20,30000],[2500,12,30000],[600,30,18000],[4000,5,20000],[1000,45,45000],[750,40,30000],[1800,25,45000]]
.forEach(([req, cfa, tot]) => ia2.push(mk(
  `Un service traite ${F(req)} requêtes IA par mois à ${cfa} FCFA la requête en moyenne. Coût mensuel :`,
  `${F(tot)} FCFA`, `${F(tot*2)} FCFA`, `${F(Math.round(tot/2))} FCFA`, `${F(req)} FCFA`,
  `Coût = ${F(req)} × ${cfa} = ${F(tot)} FCFA/mois — à optimiser par cache, distillation ou modèles plus petits.`,
  'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage')));
pk(IA_NAME, 'Intelligence artificielle', 'IA — ordres de grandeur', ia2.slice(0, 48));

// ---------- SCIENCES SOCIALES (+52) ----------------------------------
const soc2 = [];
[[100,10],[400,5],[2500,2],[10000,1],[1600,2.5],[625,4]]
.forEach(([n, moe]) => soc2.push(mk(
  `Pour un sondage aléatoire simple de ${F(n)} personnes, la marge d'erreur approximative (1/√n) est de :`,
  `± ${String(moe).replace('.', ',')} %`, `± ${String(moe*2).replace('.', ',')} %`, `± ${String(Math.max(0.5,moe/2)).replace('.', ',')} %`, `± ${n} %`,
  `Marge ≈ 1/√${F(n)} = ${String(moe).replace('.', ',')} % (au niveau de confiance ~95 %) : quadrupler n divise la marge par 2.`,
  'https://fr.wikipedia.org/wiki/Marge_d%27erreur')));
[[500000,4500000,10],[300000,2700000,10],[240000,1360000,15],[150000,850000,15],[600000,3400000,15],[450000,4050000,10],[200000,800000,20],[350000,1400000,20],[100000,900000,10],[275000,825000,25],[180000,720000,20],[90000,510000,15]]
.forEach(([cho, occ, tx]) => soc2.push(mk(
  `Une économie compte ${F(occ)} actifs occupés et ${F(cho)} chômeurs. Le taux de chômage est de :`,
  `${tx} %`, `${tx*2} %`, `${Math.max(1,Math.round(tx/2))} %`, `${100-tx} %`,
  `Taux = chômeurs ÷ population active = ${F(cho)} ÷ ${F(cho+occ)} = ${tx} %.`,
  'https://fr.wikipedia.org/wiki/Taux_de_ch%C3%B4mage')));
[[91,7],[92,8],[95,5],[88,12],[90,10],[85,15],[96,4],[93,7],[89,11],[94,6]]
.forEach(([f, s]) => soc2.push(mk(
  `Une assemblée de 100 sièges compte ${100-f>0?100-f:s} femmes élues${''}. Le taux de féminisation est de :`,
  `${100-f} %`, `${f} %`, `${Math.min(60,(100-f)*2)} %`, `${100-f+20} %`,
  `Taux = femmes ÷ sièges = ${100-f} ÷ 100 = ${100-f} % — le suivi de la parité en politique est un indicateur ODD 5.`,
  'https://fr.wikipedia.org/wiki/Parit%C3%A9_(sociologie)')));
[[5200000,800000,6000000],[3000000,500000,3500000],[2400000,600000,3000000],[7000000,1000000,8000000],[4400000,600000,5000000],[1800000,200000,2000000],[5600000,400000,6000000],[2700000,300000,3000000],[6300000,700000,7000000],[3600000,400000,4000000]]
.forEach(([occ, cho, act]) => soc2.push(mk(
  `${F(occ)} personnes occupent un emploi et ${F(cho)} sont au chômage. La population active s'élève à :`,
  `${F(act)}`, `${F(occ)}`, `${F(act-cho*2)}`, `${F(Math.round(act/2))}`,
  `Population active = occupés + chômeurs = ${F(occ)} + ${F(cho)} = ${F(act)} (les inactifs n'en font pas partie).`,
  'https://fr.wikipedia.org/wiki/Population_active')));
[[52,48,520,480],[60,40,300,200],[55,45,110,90],[48,52,240,260],[50,50,150,150],[65,35,130,70],[45,55,180,220],[58,42,290,210],[62,38,310,190],[53,47,530,470],[51,49,102,98],[70,30,140,60]]
.forEach(([pf, ph, nf, nh]) => soc2.push(mk(
  `Pour un échantillon par quotas de ${F(nf+nh)} personnes reflétant ${pf} % de femmes, il faut interroger :`,
  `${F(nf)} femmes et ${F(nh)} hommes`, `${F(nh)} femmes et ${F(nf)} hommes`, `${F(nf+nh)} femmes uniquement`, `${F(Math.round((nf+nh)/2))} de chaque sans distinction`,
  `Quota femmes = ${pf} % × ${F(nf+nh)} = ${F(nf)} ; hommes = ${F(nh)} — la structure de l'échantillon reproduit celle de la population.`,
  'https://fr.wikipedia.org/wiki/M%C3%A9thode_des_quotas')));
pk(D.SOC, 'Concepts fondamentaux', 'Sciences sociales — méthodes et calculs', soc2.slice(0, 52));

// ---------- COMMERCE / AFRIQUE (+32) ---------------------------------
const com2 = [];
[[400,500,80],[600,500,120],[300,400,75],[750,500,150],[450,600,75],[900,600,150],[240,300,80],[540,450,120],[350,700,50],[660,600,110],[280,400,70],[810,540,150]]
.forEach(([x, m, tc]) => com2.push(mk(
  `Exportations : ${F(x)} milliards ; importations : ${F(m)} milliards. Le taux de couverture est de :`,
  `${tc} %`, `${Math.round(m/x*100)} %`, `${tc*2} %`, `${Math.max(5,Math.round(tc/2))} %`,
  `Taux de couverture = X ÷ M = ${F(x)} ÷ ${F(m)} = ${tc} % ${tc>=100?'(excédent commercial)':'(déficit commercial)'}.`,
  'https://fr.wikipedia.org/wiki/Taux_de_couverture')));
[[120,400,30],[90,300,30],[150,500,30],[80,400,20],[200,500,40],[60,300,20],[175,700,25],[240,600,40],[45,300,15],[300,750,40]]
.forEach(([prod, tot, part]) => com2.push(mk(
  `Le coton représente ${F(prod)} milliards sur ${F(tot)} milliards d'exportations totales. Sa part est de :`,
  `${part} %`, `${part*2} %`, `${Math.max(2,Math.round(part/2))} %`, `${100-part} %`,
  `Part = produit ÷ total = ${F(prod)} ÷ ${F(tot)} = ${part} % — une forte concentration accroît la vulnérabilité aux chocs de prix.`,
  'https://fr.wikipedia.org/wiki/Concentration_des_exportations')));
[[500,700,2000,60],[300,500,1600,50],[600,900,3000,50],[400,400,2000,40],[800,1200,4000,50],[250,350,1500,40],[700,700,2800,50],[450,550,2500,40],[900,1100,5000,40],[350,450,1600,50]]
.forEach(([x, m, pib, deg]) => com2.push(mk(
  `X = ${F(x)}, M = ${F(m)}, PIB = ${F(pib)} milliards. Le degré d'ouverture [(X+M)/PIB] est de :`,
  `${deg} %`, `${deg*2} %`, `${Math.max(5,Math.round(deg/2))} %`, `${100-deg} %`,
  `Ouverture = (X + M) ÷ PIB = ${F(x+m)} ÷ ${F(pib)} = ${deg} % — les petites économies sont structurellement plus ouvertes.`,
  'https://fr.wikipedia.org/wiki/Degr%C3%A9_d%27ouverture')));
pk(D.COM, 'Échanges et développement', 'Commerce extérieur — indicateurs', com2.slice(0, 32));

// ---------- MACHINE LEARNING (+32) -----------------------------------
const ml2 = [];
[[75,75,75],[90,90,90],[60,30,40],[100,25,40],[80,20,32],[50,50,50],[40,40,40],[100,100,100]]
.forEach(([p, r, f1]) => ml2.push(mk(
  `Précision = ${p} % et rappel = ${r} %. Le F1-score (moyenne harmonique) vaut :`,
  `${f1} %`, `${Math.round((p+r)/2)===f1?f1+10:Math.round((p+r)/2)} %`, `${Math.min(99,f1+15)} %`, `${Math.max(5,f1-20)} %`,
  `F1 = 2 × P × R ÷ (P + R) = 2×${p}×${r} ÷ ${p+r} = ${f1} % (la moyenne arithmétique serait ${Math.round((p+r)/2)} %).`,
  'https://fr.wikipedia.org/wiki/F-mesure')));
[[1000,80,800,200],[5000,70,3500,1500],[2000,75,1500,500],[10000,90,9000,1000],[4000,80,3200,800],[600,50,300,300],[8000,75,6000,2000],[1500,60,900,600],[2500,80,2000,500],[12000,90,10800,1200],[3000,70,2100,900],[700,80,560,140]]
.forEach(([n, pct, tr, te]) => ml2.push(mk(
  `Un jeu de ${F(n)} observations est séparé en ${pct} % entraînement / ${100-pct} % test. Le jeu de test compte :`,
  `${F(te)} observations`, `${F(tr)} observations`, `${F(te*2)} observations`, `${F(n)} observations`,
  `Test = ${100-pct} % × ${F(n)} = ${F(te)} ; entraînement = ${F(tr)}.`,
  'https://fr.wikipedia.org/wiki/Ensembles_d%27entra%C3%AEnement,_de_validation_et_de_test')));
[[1000,50,20,400],[5000,100,10,500],[2000,40,25,1250],[10000,200,5,250],[800,32,30,750],[6000,60,15,1500],[1600,64,50,1250],[4000,80,8,400],[3200,32,10,1000],[900,30,40,1200],[7500,150,20,1000],[2400,48,12,600]]
.forEach(([n, b, ep, it]) => ml2.push(mk(
  `Jeu de ${F(n)} exemples, batchs de ${b}, ${ep} époques. Nombre total d'itérations (mises à jour) :`,
  `${F(it)}`, `${F(it*2)}`, `${F(Math.round(it/2))}`, `${F(n)}`,
  `Itérations = (n ÷ batch) × époques = (${F(n)} ÷ ${b}) × ${ep} = ${F(it)}.`,
  'https://fr.wikipedia.org/wiki/Descente_de_gradient_stochastique')));
pk(D.ML, 'Apprentissage automatique', 'Machine learning — calculs d\'entraînement', ml2.slice(0, 32));

// ---------- MICRO (+20) ----------------------------------------------
const micro2 = [];
[[500,120,60000],[300,250,75000],[800,90,72000],[1200,50,60000],[450,200,90000],[600,150,90000],[250,320,80000],[900,80,72000],[700,110,77000],[400,175,70000]]
.forEach(([p, q, rt]) => micro2.push(mk(
  `Prix de vente : ${F(p)} FCFA ; quantité vendue : ${F(q)}. La recette totale est de :`,
  `${F(rt)} FCFA`, `${F(rt*2)} FCFA`, `${F(p+q)} FCFA`, `${F(Math.round(rt/2))} FCFA`,
  `RT = P × Q = ${F(p)} × ${F(q)} = ${F(rt)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Recette_(%C3%A9conomie)')));
[[60000,45000,15000],[75000,80000,-5000],[90000,72000,18000],[120000,95000,25000],[50000,50000,0],[80000,64000,16000],[70000,84000,-14000],[100000,76000,24000],[65000,52000,13000],[110000,88000,22000]]
.forEach(([rt, ct, pr]) => micro2.push(mk(
  `Recette totale : ${F(rt)} FCFA ; coût total : ${F(ct)} FCFA. Le profit est de :`,
  `${pr<0?'Perte de '+F(-pr):(pr===0?'Profit nul (0)':'Profit de '+F(pr))} FCFA`, `${pr<0?'Profit de '+F(-pr):'Perte de '+F(Math.abs(pr)+5000)} FCFA`, `${F(rt+ct)} FCFA`, `${F(Math.abs(Math.round(pr/2)))} FCFA`,
  `Profit = RT − CT = ${F(rt)} − ${F(ct)} = ${F(pr)} FCFA.`,
  'https://fr.wikipedia.org/wiki/Profit_(%C3%A9conomie)')));
pk(D.MICRO, 'Analyse microéconomique', 'Microéconomie — recettes et profits', micro2.slice(0, 20));

// ---------- MACRO (+20) ----------------------------------------------
const macro2 = [];
[['0,5',2],['0,6','2,5'],['0,75',4],['0,8',5],['0,9',10],['0,5',2],['0,75',4],['0,8',5]]
.forEach(([c, k], i) => macro2.push(mk(
  `${i<5?'La propension marginale à consommer est de':'Avec une PmC de'} ${c}. Le multiplicateur keynésien simple vaut :`,
  `${k}`, `${typeof k==='number'?k*2:5}`, `${c}`, `1`,
  `k = 1 ÷ (1 − c) = 1 ÷ (1 − ${c}) = ${k} : 100 FCFA de dépense publique accroissent le revenu de ${typeof k==='number'?k*100:'250'} FCFA.`,
  'https://fr.wikipedia.org/wiki/Multiplicateur_keyn%C3%A9sien')));
[[8000,8,1000],[9000,6,1500],[12000,8,1500],[6000,5,1200],[15000,10,1500],[7200,9,800],[10000,8,1250],[5400,6,900],[16000,8,2000],[9600,12,800],[4500,9,500],[14000,7,2000]]
.forEach(([pib, pop, ph]) => macro2.push(mk(
  `PIB : ${F(pib)} milliards FCFA ; population : ${pop} millions d'habitants. Le PIB par habitant est de :`,
  `${F(ph*1000)} FCFA`, `${F(ph*2000)} FCFA`, `${F(Math.round(ph*500))} FCFA`, `${F(pib)} FCFA`,
  `PIB/hab = ${F(pib)} Md ÷ ${pop} M = ${F(ph)} milliers de FCFA, soit ${F(ph*1000)} FCFA par habitant.`,
  'https://fr.wikipedia.org/wiki/PIB_par_habitant')));
pk(D.MACRO, 'Analyse macroéconomique', 'Macroéconomie — multiplicateur et PIB', macro2.slice(0, 20));

// ---------- MONNAIE (+16) --------------------------------------------
const mon2 = [];
[[100000,10,121000],[200000,5,220500],[500000,10,605000],[300000,5,330750],[400000,10,484000],[250000,20,360000],[150000,10,181500],[600000,5,661500]]
.forEach(([c, t, va]) => mon2.push(mk(
  `Un capital de ${F(c)} FCFA placé 2 ans à ${t} % en intérêts COMPOSÉS devient :`,
  `${F(va)} FCFA`, `${F(c + c*t/100*2)} FCFA`, `${F(Math.round(va*1.2))} FCFA`, `${F(c)} FCFA`,
  `VA = C × (1 + ${t}%)² = ${F(c)} × ${(1+t/100)*(1+t/100)} = ${F(va)} FCFA (l'intérêt simple donnerait ${F(c + c*t/100*2)}).`,
  'https://fr.wikipedia.org/wiki/Int%C3%A9r%C3%AAts_compos%C3%A9s')));
[[12000,13200,10],[8000,8400,5],[15000,16500,10],[20000,21000,5],[9000,9900,10],[25000,26250,5],[18000,19800,10],[30000,31500,5]]
.forEach(([m0, m1, tx]) => mon2.push(mk(
  `La masse monétaire M2 passe de ${F(m0)} à ${F(m1)} milliards FCFA. Sa progression est de :`,
  `${tx} %`, `${tx*2} %`, `${Math.max(1,Math.round(tx/2))} %`, `${F(m1-m0)} points`,
  `Progression = (${F(m1)} − ${F(m0)}) ÷ ${F(m0)} = ${tx} % — un rythme suivi de près par la BCEAO pour contenir l'inflation.`,
  'https://fr.wikipedia.org/wiki/Masse_mon%C3%A9taire')));
pk(D.MON, 'Monnaie et budget', 'Monnaie — intérêts et agrégats', mon2.slice(0, 16));

// ---------- TOPO / GC (+16) ------------------------------------------
const btp2 = [];
[[20,10,0.5,100],[30,12,0.6,216],[15,8,0.4,48],[40,15,0.5,300],[25,10,0.8,200],[18,9,0.5,81],[50,20,0.6,600],[24,12,0.75,216]]
.forEach(([l, la, h, v]) => btp2.push(mk(
  `Une fouille de ${l} m × ${la} m sur ${String(h).replace('.', ',')} m de profondeur représente un volume de déblais de :`,
  `${F(v)} m³`, `${F(v*2)} m³`, `${F(l*la)} m³`, `${F(Math.round(v/2))} m³`,
  `Volume = L × l × h = ${l} × ${la} × ${String(h).replace('.', ',')} = ${F(v)} m³ (prévoir le foisonnement au transport).`,
  'https://fr.wikipedia.org/wiki/Terrassement')));
[[12.5,40,500],[12.5,60,750],[12.5,24,300],[12.5,80,1000],[12.5,36,450],[12.5,100,1250],[12.5,48,600],[12.5,72,900]]
.forEach(([ratio, s, n]) => btp2.push(mk(
  `À raison de 12,5 agglos par m² de mur, un mur de ${s} m² nécessite :`,
  `${F(n)} agglos`, `${F(n*2)} agglos`, `${F(Math.round(n/2))} agglos`, `${F(s)} agglos`,
  `Nombre = 12,5 × ${s} = ${F(n)} blocs (agglos 15×20×40 posés joints compris, casse non incluse).`,
  'https://fr.wikipedia.org/wiki/Parpaing')));
pk(BTP_NAME, 'BTP et topographie', 'BTP — métrés et quantités', btp2.slice(0, 16));

// ---------- HPE : dernier complément (+20) ----------------------------
const hpe3 = [];
AUTEURS.forEach(([nom, oeuvre], i) => {
  if (i >= 12) return;
  const alt = AUTEURS.filter((_, j) => j !== i);
  hpe3.push(mk(`Quelle œuvre majeure doit-on à ${nom} ?`,
    `« ${oeuvre} »`, `« ${alt[(i+2)%alt.length][1]} »`, `« ${alt[(i+5)%alt.length][1]} »`, `« ${alt[(i+8)%alt.length][1]} »`,
    `${nom} est l'auteur de « ${oeuvre} ».`,
    'https://fr.wikipedia.org/wiki/Histoire_de_la_pens%C3%A9e_%C3%A9conomique'));
});
[['Amartya Sen',1998,'l\'économie du bien-être et du développement'],['Milton Friedman',1976,'l\'analyse monétaire et de la consommation'],
 ['Esther Duflo, Abhijit Banerjee et Michael Kremer',2019,'l\'approche expérimentale de la lutte contre la pauvreté'],
 ['Daniel Kahneman',2002,'l\'intégration de la psychologie dans l\'économie'],
 ['Elinor Ostrom',2009,'la gouvernance des biens communs (première femme lauréate)'],
 ['John Nash',1994,'la théorie des jeux non coopératifs'],
 ['Paul Krugman',2008,'la nouvelle théorie du commerce international'],
 ['Joseph Stiglitz',2001,'l\'économie de l\'information (asymétries)']]
.forEach(([qui, an, motif], i) => hpe3.push(mk(
  `Qui a reçu le prix Nobel d'économie en ${an} pour ${motif} ?`,
  qui, ['Karl Marx','Adam Smith','David Ricardo','Léon Walras','Thomas Malthus','Jean-Baptiste Say','Friedrich Hayek','Alfred Marshall'][i],
  ['Vilfredo Pareto','John Maynard Keynes','François Quesnay','Joan Robinson','Karl Marx','Adam Smith','Léon Walras','David Ricardo'][i],
  ['Joseph Schumpeter','Thorstein Veblen','Rosa Luxemburg','Antoine Cournot','Frédéric Bastiat','Jean Bodin','William Petty','Richard Cantillon'][i],
  `Le prix ${an} a récompensé ${qui} pour ${motif}.`,
  'https://fr.wikipedia.org/wiki/Prix_de_la_Banque_de_Su%C3%A8de_en_sciences_%C3%A9conomiques')));
pk(D.HPE, 'Auteurs et doctrines', 'Pensée économique — œuvres et Nobel', hpe3.slice(0, 20));

// ---------- SOC : dernier complément (+4) -----------------------------
pk(D.SOC, 'Concepts fondamentaux', 'Sciences sociales — institutions', [
 mk('Le tripartisme de l\'OIT réunit…','Gouvernements, employeurs et travailleurs','Juges, avocats et notaires','Banques, assurances et bourses','Villes, régions et État',
   'Structure unique dans le système onusien : les normes du travail sont négociées par les trois mandants.',
   'https://fr.wikipedia.org/wiki/Organisation_internationale_du_travail'),
 mk('Un syndicat a pour vocation première de…','Défendre les intérêts professionnels de ses membres','Gérer les impôts','Nommer les ministres','Fixer les prix agricoles',
   'Liberté syndicale et négociation collective sont des droits fondamentaux au travail (conventions OIT 87 et 98).',
   'https://fr.wikipedia.org/wiki/Syndicat'),
 mk('Le recensement général de la population sert à…','Dénombrer et caractériser toute la population d\'un pays','Sonder un échantillon','Distribuer des primes','Choisir les élus',
   'Opération exhaustive décennale en principe (au Togo : RGPH-5 en 2022), base des politiques publiques et de la carte électorale.',
   'https://fr.wikipedia.org/wiki/Recensement'),
 mk('La CSP (catégorie socioprofessionnelle) classe les individus selon…','Leur profession et leur statut d\'emploi','Leur taille','Leur région uniquement','Leur âge uniquement',
   'Les nomenclatures socioprofessionnelles structurent l\'analyse des inégalités, des modes de vie et des votes.',
   'https://fr.wikipedia.org/wiki/Cat%C3%A9gorie_socioprofessionnelle')
]);

module.exports = { m1Packs: out, m2Packs: [], m3Packs: [] };
