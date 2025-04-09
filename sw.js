//self.addEventListener('install', (event) => {
  //console.log('🛠️ Service Worker installerad');
  //self.skipWaiting();  // Gör att SW aktiveras direkt efter installation
//});

//self.addEventListener('activate', (event) => {
  //console.log('🔁 Service Worker aktiverad');
//});

//self.addEventListener('fetch', (event) => {
  //event.respondWith(fetch(event.request));
//});




self.addEventListener('install', (event) => {
  console.log('🛠️ Service Worker installerad');
  self.skipWaiting();  // Gör att SW aktiveras direkt efter installation
});

self.addEventListener('activate', (event) => {
  console.log('🔁 Service Worker aktiverad');
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: 'icon.png',
    badge: 'icon.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
