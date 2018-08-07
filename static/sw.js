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
    caches.match(event.request)
      .then(function(response) {
        // キャッシュがあったのでそのレスポンスを返す
        if (response) {
          console.log('Cache exists !')
          return response
        }
        var fetchRequest = event.request.clone()

        return fetch(fetchRequest).then(
          function(response) {
            // レスポンスが正しいかをチェック
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            var responseToCache = response.clone()

            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache)
              })

            return response
          }
        )
      }
    )
  )
})

self.addEventListener('activate', event => {
  console.log('activate')
  clients.claim()
})
