// The old site (before November 2026) registered a caching service worker at /sw.js.
// Browsers that still have it will fetch this file on their next update check. It replaces the old
// worker, deletes its caches, unregisters itself and reloads open tabs once, so returning visitors
// get the current static site straight from the server. The new site registers no service worker.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key)
    await self.registration.unregister()
    const tabs = await self.clients.matchAll({ type: 'window' })
    for (const tab of tabs) tab.navigate(tab.url)
  })())
})
