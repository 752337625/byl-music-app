import { defineConfig, ConfigEnv, UserConfigExport, loadEnv } from 'vite';
const { resolve } = require('path'); //必须要引入resolve
import { tconversionFn } from './build/utile';
import createdPluginsFn from './build/plugins';
export default ({ mode }: ConfigEnv): UserConfigExport => {
	const root = process.cwd();
	const env = loadEnv(mode, root);
	const { VITE_SEVER_PORT, VITE_PUBLIC_PATH, VITE_PUBLIC_DIR } = tconversionFn(env);
	return defineConfig({
		root,
		base: VITE_PUBLIC_PATH,
		publicDir: VITE_PUBLIC_DIR,
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
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
		},
		css: {
			postcss: { plugins: [require('autoprefixer')] },
		},
		server: {
			host: '0.0.0.0',
			port: VITE_SEVER_PORT,
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
		plugins: createdPluginsFn(),
	});
};
