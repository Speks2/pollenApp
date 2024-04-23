//Service Worker Registered
if ('service worker' in navigator) {
 navigator.serviceWorker.register('./sw.js')
 .then(reg => console-log('service worker registered'))
 .catch(err => console.log('service worker not registered', err));
}
//Service Worker Installation
self.addEventListener('install', event => {
    console.log('Service Worker: Installed')
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activated')
});

self.addEventListener('fetch', event => {
    console.log(event);
});