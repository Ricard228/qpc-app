// =====================================================================
// data_extra_v230.js — v2.30 : agrégateur des banques b/c/d/e en packs
// manche1. (a et f exportent déjà leurs propres m1Packs.)
// =====================================================================

const { D, packify, stat, mon, mf } = require('./data_extra_v230b.js');
const { micro, macro, com, hpe } = require('./data_extra_v230c.js');
const { ml, se, hist } = require('./data_extra_v230d.js');
const { soc, cult } = require('./data_extra_v230e.js');

const m1Packs = [
  ...packify(D.STAT,  'Statistiques appliquées',   'Statistiques — renforts',            stat),
  ...packify(D.MON,   'Monnaie et budget',         'Monnaie et finances — renforts',     mon),
  ...packify(D.MF,    'Bourse régionale',          'BRVM et marchés — renforts',         mf),
  ...packify(D.MICRO, 'Analyse microéconomique',   'Microéconomie — renforts',           micro),
  ...packify(D.MACRO, 'Analyse macroéconomique',   'Macroéconomie — renforts',           macro),
  ...packify(D.COM,   'Échanges et développement', 'Commerce et Afrique — renforts',     com),
  ...packify(D.HPE,   'Auteurs et doctrines',      'Pensée économique — renforts',       hpe),
  ...packify(D.ML,    'Apprentissage automatique', 'Machine learning — renforts',        ml),
  ...packify(D.SE,    'Méthodes de S&E',           'Suivi-évaluation — renforts',        se),
  ...packify(D.HIST,  'Société et développement',  'Histoire, travail, santé, éducation — renforts', hist),
  ...packify(D.SOC,   'Concepts fondamentaux',     'Sciences sociales — renforts',       soc),
  ...packify(D.CULT,  'Repères généraux',          'Culture générale et environnement — renforts', cult)
];

module.exports = { m1Packs, m2Packs: [], m3Packs: [] };
