// Собрано scripts/offline.ts — не править руками.
const ID = "khmb-5e"
const VERSION = "b7b398ddf16d"
const FILES = ["app-icons/icon-192.png","app-icons/icon-512.png","assets/AbilityPicker-KDpmADm_.js","assets/AbilityPicker.vue_vue_type_script_setup_true_lang-YDt4nkUg.js","assets/AttackBuilder-qZdyYdj4.js","assets/BackupDialog-CsaM7iqE.js","assets/FeatureEditor-CV5t1hlC.js","assets/FeatureEditor.vue_vue_type_script_setup_true_lang-_XZZRlUF.js","assets/FeedbackDialog-CRE7ZbdU.js","assets/FilterBar.vue_vue_type_script_setup_true_lang-BpfX_bTZ.js","assets/MarkdownImport-wmEEg4GT.js","assets/MultiattackEditor-BXhBnFTE.js","assets/MyTemplates-5Cbda-Wd.js","assets/NewMonsterDialog-B3H6Sg_F.js","assets/SavedMonsters-DVtKC4Xg.js","assets/SourcesDialog-DqPa_mC3.js","assets/SpellListEditor-ipHkgt-x.js","assets/TranslationsDialog-DYRwlNsb.js","assets/en-CNxiA9v-.js","assets/en-CxSJZLSg.js","assets/featureEdit--UGmk5Xm.js","assets/index-CR2O6Hwi.js","assets/index-CYZnPH7n.js","assets/index-DwvPnURa.css","assets/parse.worker-BNzfdk19.js","assets/ru-AFRcbk98.js","assets/ru-fq3eHpoX.js","assets/spectral-cyrillic-400-italic-C6o5RXh-.woff2","assets/spectral-cyrillic-400-normal-Bx9Tn3WZ.woff2","assets/spectral-cyrillic-600-italic-DfNbJtH6.woff2","assets/spectral-cyrillic-600-normal-Dl75bDKp.woff2","assets/spectral-cyrillic-ext-400-italic-CZOVIkJA.woff2","assets/spectral-cyrillic-ext-400-normal-B4-YHs9i.woff2","assets/spectral-cyrillic-ext-600-italic-BlFp-EzC.woff2","assets/spectral-cyrillic-ext-600-normal-CvRHnPuy.woff2","assets/spectral-latin-400-italic-CDO25mTW.woff2","assets/spectral-latin-400-normal-CTVgUekv.woff2","assets/spectral-latin-600-italic-BQTRqdlx.woff2","assets/spectral-latin-600-normal-DE3OxvnQ.woff2","assets/spectral-latin-ext-400-italic-BgTM1Mst.woff2","assets/spectral-latin-ext-400-normal-XDLFwhqg.woff2","assets/spectral-latin-ext-600-italic-6mcybWBm.woff2","assets/spectral-latin-ext-600-normal-DKlDBbgb.woff2","assets/spectral-sc-cyrillic-500-normal-B9a3aygX.woff2","assets/spectral-sc-cyrillic-600-normal-6YATBT3n.woff2","assets/spectral-sc-cyrillic-ext-500-normal-DDqdkx5w.woff2","assets/spectral-sc-cyrillic-ext-600-normal-BkdNduNo.woff2","assets/spectral-sc-latin-500-normal-n_hpP58H.woff2","assets/spectral-sc-latin-600-normal-C1ATqKKY.woff2","assets/spectral-sc-latin-ext-500-normal-yZF7wNpv.woff2","assets/spectral-sc-latin-ext-600-normal-CZYgRBBr.woff2","assets/spectral-sc-vietnamese-500-normal-Cd790y9G.woff2","assets/spectral-sc-vietnamese-600-normal-D7qou1Wm.woff2","assets/spectral-vietnamese-400-italic-DO3bsfcj.woff2","assets/spectral-vietnamese-400-normal-C7CRHYqk.woff2","assets/spectral-vietnamese-600-italic-LkrugzOn.woff2","assets/spectral-vietnamese-600-normal-ZNiwCzjU.woff2","assets/toolsTemplates-C5GDn3OI.js","assets/vendor--t8q13Ly.js","brand/khmb-icon-16.png","brand/khmb-icon-180.png","brand/khmb-icon-192.png","brand/khmb-icon-32.png","brand/khmb-icon-48.png","brand/khmb-icon-512.png","brand/khmb-icon-source.png","brand/khmb-wordmark.png","data/lang/ru-srd51.json","data/lang/ru-srd52.json","data/srd51-spells.json","data/srd51.json","data/srd52-spells.json","data/srd52.json","favicon.ico","index.html","manifest.webmanifest"]
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
