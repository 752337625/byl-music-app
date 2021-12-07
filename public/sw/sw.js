// 用于标注创建的缓存，也可以根据它来建立版本规范
const CACHE_NAME = 'lzwme_cache_v1.0.0';
// 列举要默认缓存的静态资源，一般用于离线使用
const urlsToCache = ['/index.html', '/favicon.ico'];

// self 为当前 scope 内的上下文
self.addEventListener('install', event => {
	console.log();
});
