const CACHE_NAME = 'sv-record-v3';

self.addEventListener('install', event => {
  // 新しいSWをすぐ使う
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // 古いキャッシュ削除 & 即制御
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
