import { defineConfig, ConfigEnv, UserConfigExport, loadEnv } from 'vite';
const fs = require('fs');
const path = require('path');
const { resolve } = require('path'); //必须要引入resolve
import { tconversionFn } from './build/utile';
import pkg from './package.json';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import vue from '@vitejs/plugin-vue';
import Banner from 'vite-plugin-banner';
const pxtorem = require('postcss-pxtorem');
export default ({ mode }: ConfigEnv): UserConfigExport => {
	const root = process.cwd();
	const env = loadEnv(mode, root);
	const { VITE_SEVER_PORT, VITE_PUBLIC_PATH, VITE_PUBLIC_DIR, VITE_PUBLIC_ENV_PREFIX } = tconversionFn(env);
	return defineConfig({
		root,
		base: VITE_PUBLIC_PATH, //开发或生产环境服务的公共基础路径
		publicDir: VITE_PUBLIC_DIR,
		envPrefix: VITE_PUBLIC_ENV_PREFIX, //以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
		//mode:"",
		define: {
			LL: true,
			IDB: null,
			appPromptEvent: null,
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'), //把src改为@
				'@t': resolve(__dirname, 'types'), //把ypes改为#
				'@a': resolve(__dirname, './src/assets'), //把assets改为@a
				'@c': resolve(__dirname, './src/components'), //把components改为@c
				'@crb': resolve(__dirname, './css_reset_base'), //把css_reset_base改为@u
				'@d': resolve(__dirname, './dom'), //把dom改为@d
				'@p': resolve(__dirname, 'plugins'), //把plugins改为@p
				'@r': resolve(__dirname, 'router'), //把router改为@r
				'@s': resolve(__dirname, 'store'), //把store改为@s
				'@u': resolve(__dirname, 'utiles'), //把utiles改为@u
				'@v': resolve(__dirname, 'vant'), //把vant改为@v
				'@sv': resolve(__dirname, './src/views'), //把views改为@sv
			},
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
		},
		css: {
			postcss: {
				plugins: [
					require('autoprefixer'),
					pxtorem({
						rootValue: 37.5, // 根元素的大小html font-size
						unitPrecision: 5, //保留rem小数点多少位  (Number)
						propList: ['*'], //设置为['*']全部转化rem，假设需要仅对边框进行设置，可以写['*', '!border*']  (Array)
						//selectorBlackList: [], // 指定不需要转换的属性  (Array)
						minPixelValue: 12, // //px小于12的不会被转换  (Number)
						mediaQuery: false, // 允许在媒体查询中转换  (Boolean)
						//exclude: /node_modules/i, //要忽略并保留为px 的文件路径 (String, Regexp, Function)
						//replace: true, // (Boolean)
					}),
				],
			},
		},
		server: {
			host: '0.0.0.0',
			port: VITE_SEVER_PORT,
			open: true,
			strictPort: false,
			https: {
				// 主要是下面两行的配置文件，不要忘记引入 fs 和 path 两个对象
				cert: fs.readFileSync(path.join(__dirname, 'ssl/cert.crt')),
				key: fs.readFileSync(path.join(__dirname, 'ssl/cert.key')),
			},
			proxy: {
				'/api': {
					target: 'http://47.93.3.40:3000/',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
				},
			},
		},
		plugins: [
			vue(),
			styleImport({
				resolves: [VantResolve()],
			}),
			Banner(
				`/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
			),
		],
	});
};
