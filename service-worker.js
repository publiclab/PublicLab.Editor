importScripts('scripts/cache-polyfill.js');

var CACHE_VERSION = 'app-v1';
var CACHE_FILES = [
    '/',
    'scripts/global.js',
    'dist/PublicLab.Editor.css',
    'dist/PublicLab.Editor.js',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/woofmark/dist/woofmark.min.css',
    'node_modules/horsey/dist/horsey.min.css',
    'node_modules/bootstrap-tokenfield/dist/css/tokenfield-typeahead.min.css',
    'node_modules/bootstrap-tokenfield/dist/css/bootstrap-tokenfield.min.css',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/typeahead.js/dist/typeahead.jquery.js',
    'node_modules/typeahead.js/dist/bloodhound.js',
    'node_modules/bootstrap-tokenfield/dist/bootstrap-tokenfield.js',
    'node_modules/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
    'node_modules/blueimp-file-upload/js/jquery.iframe-transport.js',
    'node_modules/blueimp-file-upload/js/jquery.fileupload.js',
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/leaflet/dist/leaflet.js',
    'node_modules/leaflet-blurred-location/dist/Leaflet.BlurredLocation.css',
    'node_modules/leaflet-blurred-location/dist/Leaflet.BlurredLocation.js'
];


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(res){
            if(res){
                return res;
            }
            requestBackend(event);
        })
    )
});

function requestBackend(event){
    var url = event.request.clone();
    return fetch(url).then(function(res){
        //if not a valid response send the error
        if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
        }

        var response = res.clone();

        caches.open(CACHE_VERSION).then(function(cache){
            cache.put(event.request, response);
        });

        return res;
    })
}
