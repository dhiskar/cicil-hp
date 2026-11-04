/* ============================================================
   Service worker Cicilan HP
   Tujuan: setelah dibuka sekali online, aplikasi tetap bisa
   dibuka tanpa internet (GitHub Pages / https).
   Data TIDAK pernah dikirim ke GitHub — tetap di HP.
   ============================================================ */
'use strict';

var CACHE = 'cicilan-hp-v1.4-1';
var BASE = new URL('./', self.location.href);
function u(p) { return new URL(p, BASE).href; }
var SHELL = [
  u('./'),
  u('index.html'),
  u('manifest.webmanifest'),
  u('icon-180.png'),
  u('icon-192.png'),
  u('icon-512.png'),
  u('icon-512-maskable.png')
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE && k.indexOf('cicilan-hp-') === 0) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Halaman: coba internet dulu supaya update langsung terlihat,
     kalau offline pakai salinan terakhir. */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(u('index.html'), copy); });
        return res;
      }).catch(function () {
        return caches.match(u('index.html')).then(function (r) {
          return r || caches.match(u('./'));
        });
      })
    );
    return;
  }

  /* File pendukung (ikon/manifest): pakai cache dulu, lalu simpan yang baru. */
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    }).catch(function () {
      return caches.match(u('index.html'));
    })
  );
});
