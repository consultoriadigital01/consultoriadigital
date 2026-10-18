/* BYD Parvi · service worker mínimo: permite avisos no celular (Android e iPhone instalado na Tela de Início) */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=(e.notification.data&&e.notification.data.url)||self.registration.scope;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){ if(c.url.startsWith(self.registration.scope)&&'focus' in c) return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
