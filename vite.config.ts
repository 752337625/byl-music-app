import { defineConfig, ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path'); //必须要引入resolve
import styleImport from 'vite-plugin-style-import';
import { tconversionFn } from '@b/utile';
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
	const root = process.cwd();
	let env = loadEnv(mode, root);
	env = tconversionFn(env);
	console.log(env);
	return defineConfig({
		root,
		base: '/byl/',
		publicDir: 'public',
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'), //把src改为@
				'@a': resolve(__dirname, './src/assets'), //把assets改为@a
				'@c': resolve(__dirname, './src/components'), //把components改为@c
				'@crb': resolve(__dirname, 'css_reset_base'), //把css_reset_base改为@u
				'@b': resolve(__dirname, 'build'), //把build改为@p
				'@p': resolve(__dirname, 'plugins'), //把plugins改为@p
				'@r': resolve(__dirname, 'router'), //把router改为@r
				'@s': resolve(__dirname, 'store'), //把store改为@s
				'@u': resolve(__dirname, 'utiles'), //把utiles改为@u
				'@v': resolve(__dirname, './src/views'), //把views改为@v
			},
		},
		css: {
			postcss: { plugins: [require('autoprefixer')] },
		},
		server: {
			host: '0.0.0.0',
			port: 9898,
			open: true,
			strictPort: false,
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
};
