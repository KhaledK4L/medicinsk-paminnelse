self.addEventListener('install', (event) => {
  console.log('🛠️ Service Worker installerad');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('🔁 Service Worker aktiverad');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
