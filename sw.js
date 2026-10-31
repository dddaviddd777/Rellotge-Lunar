// Guarda l'app al dispositiu perquè funcioni sense connexió.
// Quan canviïs qualsevol fitxer, puja aquest número de versió.
const VERSIO = 'rellotge-lunar-v3';
const FITXERS = ['./', 'index.html', 'manifest.webmanifest', 'icona-180.png', 'icona-192.png', 'icona-512.png', 'icona-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIO).then(c => c.addAll(FITXERS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSIO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Tipografies de Google: es desen la primera vegada i després es fan servir sense connexió
  if (url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(
      caches.open(VERSIO).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        c.put(e.request, res.clone());
        return res;
      })))
    );
    return;
  }

  // Fitxers de l'app: primer la xarxa (per tenir la darrera versió) i, si no n'hi ha, la còpia desada
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(VERSIO).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request).then(hit => hit || caches.match('index.html')))
    );
  }
});
