const CACHE_NAME = 'nima-site-v2';
const BASE = '';
const APP_SHELL = [BASE + '/', BASE + '/manifest.webmanifest', BASE + '/favicon.ico', BASE + '/offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const reqUrl = new URL(event.request.url);
  if (!reqUrl.pathname.startsWith(BASE)) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const cloned = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
        return res;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match(BASE + '/offline.html'))
      )
  );
});
