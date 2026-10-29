const CACHE="uncodingfit-v2";
const ASSETS=["./","./index.html","./manifest.json","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const isPage = e.request.mode==="navigate" || e.request.destination==="document";
  if(isPage){
    // network-first: siempre intenta la última versión; si no hay red, usa caché
    e.respondWith(fetch(e.request).then(res=>{
      const copy=res.clone();caches.open(CACHE).then(c=>c.put("./index.html",copy)).catch(()=>{});return res;
    }).catch(()=>caches.match(e.request).then(h=>h||caches.match("./index.html"))));
    return;
  }
  // estáticos: cache-first
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
    const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return res;
  }).catch(()=>caches.match("./index.html"))));
});