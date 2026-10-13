// public/sw.js
const CACHE_NAME = 'progresa-offline-v5';

// Archivos críticos y rutas de la app que se guardarán de golpe en la primera visita con internet
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. Instalación: Guardamos la estructura base inmediatamente
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Activación: Limpiamos versiones de caché antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Interceptar peticiones con estrategia Cache-First absoluto
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si está en caché, lo devuelve al instante (aunque no haya internet ni red)
      if (cachedResponse) {
        // En segundo plano intenta actualizar si hay red (silencioso)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Si no está en caché, intenta ir a la red
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // Si todo falla y es una petición de navegación de página, devolvemos el index.html principal
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
    })
  );
});