// Hoverline service worker: lets the game load and run offline after the first visit.
// Bump VERSION whenever the list of precached files changes.
const VERSION = 'hoverline-v1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const put = (req, res) => {
  if (res && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(VERSION).then((c) => c.put(req, copy));
  }
  return res;
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The page itself: network first so updates arrive, cached copy when offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => put('./index.html', res))
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // three.js and font files never change at a given URL: cache first.
  if (url.hostname === 'cdnjs.cloudflare.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => put(req, res))));
    return;
  }

  // Everything else we serve (icons, manifest, the Google Fonts stylesheet):
  // answer from cache at once and refresh it in the background.
  if (url.origin === self.location.origin || url.hostname === 'fonts.googleapis.com') {
    e.respondWith(
      caches.match(req).then((hit) => {
        const net = fetch(req).then((res) => put(req, res)).catch(() => hit);
        return hit || net;
      })
    );
  }
});
