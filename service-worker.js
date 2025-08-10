self.addEventListener('install', event => {
  // すぐに新しいService Workerを有効化
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // 古いキャッシュを削除 & すぐにクライアントを制御
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
