const CACHE_NAME = "v1_cache_vue_gradient_generator";
const cachedUrls = [
	"./",
	"./pages/fallback.html",
	"./pages/css/styles.css",
	"./?umt_source=web_app_manifest",
	"./img/favicon.png",
	"./img/gradient_32.png",
	"./img/gradient_64.png",
	"./img/gradient_128.png",
	"./img/maskable_icon.png",
	"./img/gradient_256.png",
	"./img/gradient_512.png",
	"./img/gradient_1024.png",
	"./js/app.js",
	"./css/styles.css",
	"https://unpkg.com/vue@next",
	"./manifest.json",
	"https://fonts.googleapis.com/css2?family=Roboto&display=swap"
];

const installServiceWorker = () => {
	self.addEventListener("install", (event) => {
		event.waitUntil(
			caches.open(CACHE_NAME).then((cache) =>
				cache
					.addAll(cachedUrls)
					.then(() => self.skipWaiting())
					.catch((error) => console.log(error))
			)
		);
	});
};

const activate = () => {
	self.addEventListener("activate", (event) => {
		const cacheWhiteList = [CACHE_NAME];
		event.waitUntil(
            caches.keys()
            .then( cacheNames => {
                return Promise.all(
                    cacheNames.map((name) => {
                        if (cacheWhiteList.indexOf(name) === -1) {
                            return caches.delete(name);
                        }
                    })
                );
            })
            .then( () => self.clients.claim() )
            .catch((error) => console.log(error))
        );
	});
};

const fetchServiceWorker = () => {
	self.addEventListener("fetch", (event) => {
		event.respondWith(
			caches
				.match(event.request)
				.then((res) => {
					if (res) return res;
					return fetch(event.request);
				})
				.catch(() => caches.match("./pages/fallback.html"))
		);
	});
};

installServiceWorker();
activate();
fetchServiceWorker();
