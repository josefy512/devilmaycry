// public/sw.js
const CACHE_NAME = 'progresa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Interceptar peticiones cuando no hay red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si está en caché lo devuelve, si no, intenta ir a la red
      return cachedResponse || fetch(event.request).catch(() => {
        return caches.match('/');
      });
    })
  );
});