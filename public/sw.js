// Service Worker for caching static assets - Optimized Version
const CACHE_NAME = 'madebest-v4';
const RUNTIME_CACHE = 'madebest-runtime-v4';
const IMAGE_CACHE = 'madebest-images-v4';
const API_CACHE = 'madebest-api-v4';

// Cache duration (in milliseconds)
const CACHE_DURATION = {
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 days
  IMAGE: 30 * 24 * 60 * 60 * 1000, // 30 days
  API: 5 * 60 * 1000, // 5 minutes
};

// Assets to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  '/icon.svg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .catch(err => {
        // Silent fail - don't block installation
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin && !url.href.includes('i.ibb.co')) {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
  } else if (url.pathname.startsWith('/api/') || url.href.includes('madebestresturent.vercel.app')) {
    event.respondWith(networkFirstStrategy(request, API_CACHE, API_CACHE));
  } else if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'worker' ||
    request.destination === 'document' ||
    request.mode === 'navigate'
  ) {
    // Always try network first for critical application files
    event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE, CACHE_NAME));
  } else if (request.destination === 'font') {
    event.respondWith(cacheFirstStrategy(request, RUNTIME_CACHE));
  } else {
    event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE, RUNTIME_CACHE));
  }
});

// Cache-first strategy for static assets
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return cached version even if stale
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Network-first strategy for dynamic content
async function networkFirstStrategy(request, runtimeCache, fallbackCache) {
  const runtime = await caches.open(runtimeCache);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      runtime.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await runtime.match(request) || 
                          await caches.open(fallbackCache).then(c => c.match(request));
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, API_CACHE].includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Background sync for offline actions (optional enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic if needed
}
