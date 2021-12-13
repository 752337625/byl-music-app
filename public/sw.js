// 用于标注创建的缓存，也可以根据它来建立版本规范
const CACHE_NAME = 'lzwme_cache_v1.0.1';
// 列举要默认缓存的静态资源，一般用于离线使用
const urlsToCache = ['./robots.txt'];

// self 为当前 scope 内的上下文
self.addEventListener('install', event => {
	self.skipWaiting();
});
self.addEventListener('activate', function (event) {
	console.log(1);
});
