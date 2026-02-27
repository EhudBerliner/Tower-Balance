// Tower Balance - Service Worker
// Version is dynamically loaded from version.json

let APP_VERSION = '1.1.0'; // Fallback version
let CACHE_NAME = `tower-balance-${APP_VERSION}`;

// Fetch version from version.json
fetch('./version.json')
  .then(r => r.json())
  .then(data => {
    APP_VERSION = data.version;
    CACHE_NAME = `tower-balance-${APP_VERSION}`;
    console.log('[SW] Version loaded:', APP_VERSION);
  })
  .catch(e => console.warn('[SW] Could not load version.json, using fallback'));

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './i18n.js',
  './version.json',
  './logo.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/icon-152x152.png',
  './icons/icon-32x32.png',
  './icons/icon-16x16.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker v' + APP_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell');
        return cache.addAll(CORE_ASSETS).catch(e => {
          console.warn('[SW] Some assets failed to cache:', e);
          // Cache what we can
          return Promise.all(
            CORE_ASSETS.map(url => 
              cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url))
            )
          );
        });
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker v' + APP_VERSION);
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName.startsWith('tower-balance-')) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions and other non-http(s) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Network-first strategy for version.json to catch updates immediately
  if (event.request.url.includes('version.json')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Update cache with new version
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first strategy for other resources
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return cached response
        if (response) {
          // Update cache in background
          fetch(event.request).then(freshResponse => {
            if (freshResponse && freshResponse.status === 200) {
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, freshResponse));
            }
          }).catch(() => {});
          
          return response;
        }

        // Cache miss - fetch from network
        return fetch(event.request.clone())
          .then(response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response for future use
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.log('[SW] Fetch failed:', error);
            
            // Return cached index.html as fallback
            return caches.match('./index.html');
          });
      })
  );
});

// Background sync for saving game data
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-game-data') {
    event.waitUntil(syncGameData());
  }
});

// Function to sync game data
async function syncGameData() {
  console.log('[SW] Syncing game data...');
  // This would sync game data with a server if needed
  return Promise.resolve();
}

// Push notification handler
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from Tower Balance',
    icon: './logo.png',
    badge: './icons/icon-192x192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Tower Balance', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('./index.html')
  );
});

// Message handler for communication with the main app
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(event.data.urls);
      })
    );
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: APP_VERSION });
  }
});

console.log('[SW] Service Worker loaded');
