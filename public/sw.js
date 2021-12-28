//Servere Worker 实战
const version = 'byl_jingluoyun_v1.0.1';
//第三方忽略
const ignoreCache = [];
/**
 * 页面中尚未安装 Service Worker。
 * Service Worker 已安装，并且从服务器获取的 sw.js 文件与本地版本存在差异。
 */
self.addEventListener('install', function (event) {
	event.waitUntil(caches.open(cacheKey('preCache')).then(cache => cache.addAll([])));
});
/**
 * @description self.skipWaiting 方法被调用。【新旧更替强制触发，不需要进行下面第三个描述进行是手动触发】
 * @description 安装完成后，不存在旧版本的 Service Worker 或无页面使用此版本【初次初始化Service 】。
 * @description 等待状态下正在运行旧版本 Service Worker 的页面被全部关闭（页面刷新或切换无法使 Service Worker 从等待进入状态，这是由于当页* 面刷新或切换时，浏览器需要等到新页面渲染完成之后才会销毁旧页面，即新旧两个页面存在共同的交叉时间）。
 */
self.addEventListener('activate', event => {
	let p = caches
		.keys()
		.then(cacheNamesList => cacheNamesList.filter(i => !i.startsWith(version)).map(i => caches.delete(i)))
		.then(() => self.clients.claim());
	event.waitUntil(p);
});
self.addEventListener('message', event => {
	if (event.data === 'skipWaiting') {
		self.skipWaiting();
	}
});
/**
 * fetch拦截到所有请求的接口
 */
self.addEventListener('fetch', function (event) {
	const request = event.request;
	//仅限网络: 仅从网络获取不需要缓存
	//仅限缓存: 仅从缓存获取
	//网络优先: 从网络获取, 失败或者超时再尝试从缓存读取
	//缓存优先: 从缓存获取, 缓存插叙不到再尝试从网络抓取，在上文中的代码块就是该种策略的实现。
	//最快: 同时查询缓存和网络, 返回最先拿到的
	if (onlyCacheCssOrJsfn(request)) {
		event.respondWith(
			caches.match(request).then(response => {
				//如果缓存中存在则返回，不存在复制保存下次直接请求缓存
				if (response) return response;
				// 因为event.request流已经在caches.match中使用过一次，
				// 那么该流是不能再次使用的。我们只能得到它的副本，拿去使用。
				const fetchRequest = event.request.clone();
				// fetch 的通过信方式，得到 Request 对象，然后发送请求
				return fetch(fetchRequest).then(function (response) {
					// 检查是否成功
					if (!response || response.status !== 200 || response.type !== 'basic') {
						return response;
					}
					// 如果成功，该response一是要拿给浏览器渲染，而是要进行缓存。
					// 不过需要记住，由于caches.put使用的是文件的响应流，一旦使用，
					// 那么返回的response就无法访问造成失败，所以，这里需要复制一份。
					const responseToCache = response.clone();
					caches.open(cacheKey('onlyCacheCssOrJs')).then(function (cache) {
						cache.put(event.request, responseToCache);
					});
					return response;
				});
			}),
		);
		return;
	} else if (preCachefn(request)) {
		event.respondWith(
			caches.match(request).then(response => {
				if (response) return response;
			}),
		);
	}
});
function cacheKey() {
	return [version, ...arguments].join('-');
}
function onlyCacheCssOrJsfn(request) {
	return [].some(regex => request.url.match(regex));
}
function preCachefn(request) {
	return [].some(regex => request.url.match(regex));
}
