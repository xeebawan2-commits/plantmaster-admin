/* PlantMaster Control Center service worker — v1.6.0
   NETWORK-FIRST for code. The previous versions were cache-first, which meant
   a stale admin.js could survive uploads and keep serving dead buttons. */
const C='plantmaster-control-center-v1.6.0';
const SHELL=['./','./index.html','./config.js','./manifest.webmanifest',
  './icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(C)
    .then(c=>Promise.all(SHELL.map(f=>c.add(f).catch(()=>null))))
    .then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  // delete EVERY previous cache, not just mismatched names
  e.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

// allow the page to force a full purge
self.addEventListener('message',e=>{
  if(e.data==='PM_PURGE'){
    caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k))))
      .then(()=>self.registration.unregister())
      .then(()=>self.clients.matchAll().then(cs=>cs.forEach(c=>c.navigate(c.url))));
  }
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.hostname.endsWith('.supabase.co'))return;          // never touch API calls
  if(url.origin!==self.location.origin)return;              // never touch CDNs

  const isCode=/\.(js|css|html|webmanifest)$/.test(url.pathname)||req.mode==='navigate';

  if(isCode){
    // NETWORK FIRST: always try the server, fall back to cache only when offline
    e.respondWith(
      fetch(req,{cache:'no-store'})
        .then(res=>{
          if(res&&res.ok)caches.open(C).then(c=>c.put(req,res.clone()));
          return res;
        })
        .catch(()=>caches.match(req).then(r=>r||caches.match('./index.html')))
    );
    return;
  }

  // images and other static assets: cache first is fine
  e.respondWith(caches.match(req).then(r=>r||fetch(req).then(x=>{
    if(x&&x.ok)caches.open(C).then(c=>c.put(req,x.clone()));
    return x;
  })));
});
