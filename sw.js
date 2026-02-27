// Tower Balance - Service Worker
// Version managed via version.json

const APP_VERSION = '1.0.0';
const CACHE_NAME  = `tower-balance-${APP_VERSION}`;

const CORE_ASSETS = [
  './balance-tower-game.html',
  './manifest.json',
  './i18n.js',
  './version.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
];

// ─── Install ─────────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing', APP_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ─── Activate ────────────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating', APP_VERSION);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_NAME)
        .map(k => { console.log('[SW] Deleting old cache:', k); return caches.delete(k); })
      )
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch (Cache-first, network fallback) ────────────────────────────────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http'))  return;

  // version.json: always network-first so we catch updates
  if (event.request.url.includes('version.json')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request.clone()).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('./balance-tower-game.html'));
    })
  );
});

// ─── Periodic update check message ───────────────────────────────────────────
self.addEventListener('message', event => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CHECK_UPDATE') {
    // Notify all clients so the main app can compare versions
    self.clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage({ type: 'SW_VERSION', version: APP_VERSION }));
    });
  }
});

console.log('[SW] Service Worker loaded – version', APP_VERSION);
