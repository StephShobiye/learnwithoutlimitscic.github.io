// ALN Parent Guide - Service Worker
const CACHE_VERSION = 'v3';
const STATIC_CACHE = `aln-static-${CACHE_VERSION}`;
const APP_SHELL = [
  '/',                    // root
  '/index.en.html',
  '/index.cy.html',
  '/app.en.html',
  '/app.cy.html',
  '/offline.html',
  '/assets/css/styles.css',
  '/assets/img/favicon.ico',
  '/app/icons/icon-192.png',
  '/app/icons/icon-512.png',
  '/manifest.webmanifest'
];

// Install: pre-cache
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(STATIC_CACHE).then(c => c.addAll(APP_SHELL)));
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== STATIC_CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for navigation; cache-first for static
self.addEventListener('fetch', (e) => {
  const req = e.request;

  // HTML navigations → network first, offline fallback
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(STATIC_CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(async () => (await caches.match(req)) || caches.match('/offline.html'))
    );
    return;
  }

  // Static assets → cache first
  if (req.method === 'GET' && (req.destination === 'style' || req.destination === 'image' || req.destination === 'script')) {
    e.respondWith(
      caches.match(req).then(cached => cached ||
        fetch(req).then(res => {
          const copy = res.clone();
          caches.open(STATIC_CACHE).then(c => c.put(req, copy));
          return res;
        })
      )
    );
  }
});
