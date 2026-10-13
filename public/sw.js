// public/sw.js
const CACHE_NAME = 'progresa-v6';

// 1. Instalación limpia sin bloqueos de red
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 2. Activación e inmediatamente tomar control de las pestañas
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

// 3. Estrategia: Red primero, si falla va a la Caché (y si es navegación, siempre sirve la raíz guardada)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Si hay internet, guardamos una copia fresca en caché
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // SI NO HAY INTERNET: Buscamos en caché
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Si es una petición de navegación (entrar/recargar la página) y no hay red, devolvemos el index guardado
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});