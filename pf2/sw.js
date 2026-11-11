// Собрано scripts/offline.ts — не править руками.
const ID = "khmb-pf2"
const VERSION = "e1cb82dec090"
const FILES = ["app-icons/icon-192.png","app-icons/icon-512.png","assets/AbilityPicker-Ca6ajiAN.js","assets/FeedbackDialog-D3ryQ-Q0.js","assets/SavedMonsters-Cl8TUrTN.js","assets/TiersDialog-a2mllUsS.js","assets/Translations-BHdOkaIt.js","assets/en-BHUr7Ab0.js","assets/en-CjfzkJTs.js","assets/favicon-DV-K672-.ico","assets/fira-sans-condensed-cyrillic-400-normal-Do_zqP0R.woff2","assets/fira-sans-condensed-cyrillic-500-normal-CQSBA2k-.woff2","assets/fira-sans-condensed-cyrillic-600-normal-DJXvezZW.woff2","assets/fira-sans-condensed-cyrillic-700-normal-BQ1RFKz5.woff2","assets/fira-sans-condensed-cyrillic-ext-400-normal-BFYXjpeA.woff2","assets/fira-sans-condensed-cyrillic-ext-500-normal-DEzHnQ9V.woff2","assets/fira-sans-condensed-cyrillic-ext-600-normal-YCOkt-Ji.woff2","assets/fira-sans-condensed-cyrillic-ext-700-normal-CJQ5BKxn.woff2","assets/fira-sans-condensed-greek-400-normal-C9FVAY8X.woff2","assets/fira-sans-condensed-greek-500-normal-CHlSbbWF.woff2","assets/fira-sans-condensed-greek-600-normal-2tq2mucT.woff2","assets/fira-sans-condensed-greek-700-normal-Cp8-oVcY.woff2","assets/fira-sans-condensed-greek-ext-400-normal-DEwcosjT.woff2","assets/fira-sans-condensed-greek-ext-500-normal-BFqEudUk.woff2","assets/fira-sans-condensed-greek-ext-600-normal-Dk7ZUKMF.woff2","assets/fira-sans-condensed-greek-ext-700-normal-oeo_JnSN.woff2","assets/fira-sans-condensed-latin-400-normal-BmvZHCvU.woff2","assets/fira-sans-condensed-latin-500-normal-B1UMRPS4.woff2","assets/fira-sans-condensed-latin-600-normal-CdJSnjCb.woff2","assets/fira-sans-condensed-latin-700-normal-COwqi4SY.woff2","assets/fira-sans-condensed-latin-ext-400-normal-BHj09Mzt.woff2","assets/fira-sans-condensed-latin-ext-500-normal-CDI94yGp.woff2","assets/fira-sans-condensed-latin-ext-600-normal-10nHsj_O.woff2","assets/fira-sans-condensed-latin-ext-700-normal-B21CTVMN.woff2","assets/fira-sans-condensed-vietnamese-400-normal-D_tg8Y-m.woff2","assets/fira-sans-condensed-vietnamese-500-normal-C4TbivHO.woff2","assets/fira-sans-condensed-vietnamese-600-normal-C_Q9OTBL.woff2","assets/fira-sans-condensed-vietnamese-700-normal-B1xaExkN.woff2","assets/index-CR2O6Hwi.js","assets/index-DVS7LNVK.css","assets/index-DlBfbtRU.js","assets/ru-CSy-Aqj_.js","assets/ru-CXI8lAgX.js","assets/spectral-cyrillic-400-italic-C6o5RXh-.woff2","assets/spectral-cyrillic-400-normal-Bx9Tn3WZ.woff2","assets/spectral-cyrillic-600-normal-Dl75bDKp.woff2","assets/spectral-cyrillic-ext-400-italic-CZOVIkJA.woff2","assets/spectral-cyrillic-ext-400-normal-B4-YHs9i.woff2","assets/spectral-cyrillic-ext-600-normal-CvRHnPuy.woff2","assets/spectral-latin-400-italic-CDO25mTW.woff2","assets/spectral-latin-400-normal-CTVgUekv.woff2","assets/spectral-latin-600-normal-DE3OxvnQ.woff2","assets/spectral-latin-ext-400-italic-BgTM1Mst.woff2","assets/spectral-latin-ext-400-normal-XDLFwhqg.woff2","assets/spectral-latin-ext-600-normal-DKlDBbgb.woff2","assets/spectral-vietnamese-400-italic-DO3bsfcj.woff2","assets/spectral-vietnamese-400-normal-C7CRHYqk.woff2","assets/spectral-vietnamese-600-normal-ZNiwCzjU.woff2","assets/vendor-GX73G-N6.js","assets/wordmark--PgfnZOE.png","index.html","manifest.webmanifest"]
const CACHE = ID + '-' + VERSION
const SCOPE = new URL('./', self.location.href).href
const known = new Set(FILES)

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES.map((f) => new Request(SCOPE + f, { cache: 'no-cache' })))))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(ID + '-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting()
  if (event.data === 'version' && event.ports[0]) event.ports[0].postMessage(VERSION)
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET' || !request.url.startsWith(SCOPE)) return
  const path = new URL(request.url).pathname.slice(new URL(SCOPE).pathname.length)
  const file = path === '' && request.mode === 'navigate' ? 'index.html' : decodeURIComponent(path)
  if (!known.has(file)) return
  event.respondWith(
    caches.open(CACHE).then((cache) => cache.match(SCOPE + file)).then((hit) => hit || fetch(request)),
  )
})
