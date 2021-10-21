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
			'@a': resolve(__dirname, './src/assets'), //把assets改为@a
			'@c': resolve(__dirname, './src/components'), //把components改为@c
			'@crb': resolve(__dirname, 'css_reset_base'), //把css_reset_base改为@u
			'@p': resolve(__dirname, 'plugins'), //把plugins改为@p
			'@r': resolve(__dirname, 'router'), //把router改为@r
			'@s': resolve(__dirname, 'store'), //把store改为@s
			'@u': resolve(__dirname, 'utiles'), //把utiles改为@u
			'@v': resolve(__dirname, './src/views'), //把views改为@v
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
