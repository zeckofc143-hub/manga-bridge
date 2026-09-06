const VERSION = 'pa-wiki-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './ant-wiki-icon.svg'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => cache.addAll(SHELL))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith('pa-wiki-') && key !== VERSION)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(VERSION).then(cache => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  if (['script', 'style', 'image', 'font'].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fresh = fetch(request)
          .then(response => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(VERSION).then(cache => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => cached);
        return cached || fresh;
      })
    );
  }
});
