const CACHE_PREFIX = 'portfolio-'
const SHELL_CACHE = `${CACHE_PREFIX}shell-v2`
const ASSET_CACHE = `${CACHE_PREFIX}assets-v2`
const MEDIA_CACHE = `${CACHE_PREFIX}media-v2`
const SHELL_URLS = ['/', '/index.html', '/offline.html']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_URLS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX))
            .filter((key) => ![SHELL_CACHE, ASSET_CACHE, MEDIA_CACHE].includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

const isCacheableAsset = (request) =>
  ['style', 'script', 'font', 'image', 'worker'].includes(request.destination)

const isSameOrigin = (request) => new URL(request.url).origin === self.location.origin

const cacheAsset = async (request) => {
  const cacheName = isSameOrigin(request) ? ASSET_CACHE : MEDIA_CACHE
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) return cachedResponse

  try {
    const networkResponse = await fetch(request)
    const canStore = networkResponse.ok || networkResponse.type === 'opaque'

    if (canStore) {
      await cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch {
    return Response.error()
  }
}

const handleNavigation = async (request) => {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const shellCache = await caches.open(SHELL_CACHE)
      await shellCache.put('/index.html', networkResponse.clone())
    }

    return networkResponse
  } catch {
    const cachedShell = await caches.match('/index.html')
    return cachedShell || caches.match('/offline.html')
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request))
    return
  }

  if (isCacheableAsset(request)) {
    event.respondWith(cacheAsset(request))
  }
})
