const cachePrefix = 'tocochan'
const version = '0.0.1'
const cacheName = `${cachePrefix}-${version}`

var urlsToCache = [
  '/',
  '/static/img/favicon.ico',
  '/static/css/bootstrap.min.css',
  '/static/css/flickity.org.css',
  '/static/js/jquery-3.1.0.min.js',
  '/static/js/flickity.pkgd.min.js',
  '/static/js/tether.min.js',
  '/static/img/logo.png',
  '/static/js/async_set_circuit.js',
  '/static/js/jquery.countdown.min.js',
  '/static/js/superagent.js'
]

self.addEventListener('install', event => {
  console.log('install')
  event.waitUntil(
    // open cache
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', event => {
  console.log('fetch')
  event.respondWith(
    // リクエストを見て Service Worker が生成したキャッシュの中に該当するものがあるか探す。
    caches.match(event.request, {
      ignoreSearch:true
    })
      .then(response => {
        return response || fetch(event.request)
      }
    )
  )
})

self.addEventListener('activate', event => {
  console.log('activate')
  event.waitUntil(self.clients.claim());
})
