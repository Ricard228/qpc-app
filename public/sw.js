// =====================================================================
// sw.js — Service Worker QPC
// Stratégie :
//   - Statiques (HTML/CSS/JS/icônes) : stale-while-revalidate
//   - Routes API (/api/*)            : network-first avec fallback cache court
//   - questions.json (gros fichier)  : cache-first après le 1er chargement
// =====================================================================

const VERSION = 'qpc-v2.22-1';
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css?v=2',
  './app.js?v=2.22',
  './Guide-utilisation-QPC.docx',
  './icons/economy-book.svg',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

// ---------- Installation : pré-cache des statiques ------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS).catch(() => null))
      .then(() => self.skipWaiting())
  );
});

// ---------- Activation : nettoyage des anciens caches ---------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => !k.startsWith(VERSION))
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ---------- Fetch handler -------------------------------------------
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Pas de cache pour les requêtes non-GET
  if (req.method !== 'GET') return;

  // Pas de cache pour les requêtes vers d'autres domaines
  if (url.origin !== self.location.origin) return;

  // Routes API : stratégie network-first (toujours essayer le réseau d'abord)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(req));
    return;
  }

  // Statiques : stratégie stale-while-revalidate (sert le cache immédiatement
  // puis met à jour en arrière-plan)
  event.respondWith(staleWhileRevalidate(req));
});

async function networkFirst(req) {
  try {
    const fresh = await fetch(req);
    // On ne met PAS en cache les réponses API : elles dépendent du token et
    // peuvent changer. Le mode hors-ligne sur API n'est pas l'objectif.
    return fresh;
  } catch (e) {
    // En cas d'échec réseau, renvoyer une 503 explicite
    return new Response(JSON.stringify({ error: 'Hors-ligne. Connectez-vous à Internet pour continuer.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req).then((res) => {
    if (res && res.status === 200 && res.type === 'basic') {
      cache.put(req, res.clone()).catch(() => {});
    }
    return res;
  }).catch(() => cached);

  return cached || fetchPromise;
}
