// Learn Without Limits CIC — Service Worker
// ------------------------------------------------------------
// Bump this when you deploy to force a refresh of caches:
const CACHE_VERSION = 'v4';
const STATIC_CACHE = `lwl-static-${CACHE_VERSION}`;
const PAGE_CACHE   = `lwl-pages-${CACHE_VERSION}`;

// Files to pre-cache for fast first paint & offline fallback
const APP_SHELL = [
  '/',                    // root (redirects to index.en.html)
  '/index.en.html',
  '/index.cy.html',
  '/offline.html',
  '/assets/css/styles.css',
  '/assets/js/site.js',
  '/assets/js/latest-resources.js',
  '/assets/img/favicon.ico',
  '/app/icons/icon-192.png',
  '/app/icons/icon-512.png',
];

// ------------------------------------------------------------
// Install: pre-cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![STATIC_CACHE, PAGE_CACHE].includes(k))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ------------------------------------------------------------
// Fetch strategy:
// • HTML navigations: network-first (fresh content), fallback to cache, then offline.
// • Static assets (style/script/image/font): cache-first (fast), update cache in bg.
// • downloads/resources.json: always network (bypass cache) so lists stay current.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Always bypass cache for the dynamic resources list
  if (url.pathname === '/downloads/resources.json') {
    event.respondWith(fetch(req));
    return;
  }

  // Treat HTML navigations with network-first
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(networkFirst(req));
    return;
  }

  // For static assets, prefer cache-first
  const dest = req.destination;
  if (['style', 'script', 'image', 'font'].includes(dest)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // Default pass-through
  // (e.g., fetches not covered above)
  return;
});

// ------------------------------------------------------------
// Helpers

async function networkFirst(request) {
  try {
    const fresh = await fetch(request);
    const copy = fresh.clone();
    const cache = await caches.open(PAGE_CACHE);
    cache.put(request, copy);
    return fresh;
  } catch (err) {
    const cacheHit = await caches.match(request);
    if (cacheHit) return cacheHit;
    // Last resort: offline page
    const offline = await caches.match('/offline.html');
    return offline || new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    // Update in background (stale-while-revalidate style)
    fetch(request)
      .then((res) => caches.open(STATIC_CACHE).then((c) => c.put(request, res)))
      .catch(() => {});
    return cached;
  }
  const fresh = await fetch(request);
  const copy = fresh.clone();
  const cache = await caches.open(STATIC_CACHE);
  cache.put(request, copy);
  return fresh;
}

