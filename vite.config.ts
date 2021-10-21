import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path'); //必须要引入resolve
import styleImport from 'vite-plugin-style-import';
export default defineConfig({
	base: '/byl/',
	publicDir: 'public',
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'), //把src改为@
			'@p': resolve(__dirname, 'plugins'), //把plugins改为@p
			'@t': resolve(__dirname, 'typings'), //把typings改为@t
			'@u': resolve(__dirname, 'utiles'), //把utiles改为@u
			'@a': resolve(__dirname, './src/assets'), //把assets改为@a
			'@c': resolve(__dirname, './src/components'), //把components改为@c
		},
	},
	server: {
		host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
		port: 3000, // 服务器端口号
		open: true, // boolean | string 启动项目时自动在浏览器打开应用程序；如果为string，比如"/index.html"，会打开http://localhost:3000/index.html
		// 自定义代理规则
		proxy: {
			'/api': {
				target: 'http://jsonplaceholder.typicode.com',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
	plugins: [
		vue(),
		styleImport({
			libs: [
				{
					libraryName: 'vant',
					esModule: true,
					resolveStyle: name => `vant/es/${name}/style`,
				},
			],
		}),
	],
});
