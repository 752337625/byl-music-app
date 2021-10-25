import { Plugin } from 'vite';
import pkg from '../package.json';
import styleImport from 'vite-plugin-style-import';
import vue from '@vitejs/plugin-vue';
import Banner from 'vite-plugin-banner';
import viteImagemin from 'vite-plugin-imagemin';
function createdPluginsFn(): (Plugin | Plugin[])[] {
	return [
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
		//windiCSS(),
		Banner(
			`/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
		),
		viteImagemin({
			gifsicle: {
				optimizationLevel: 7,
				interlaced: false,
			},
			optipng: {
				optimizationLevel: 7,
			},
			mozjpeg: {
				quality: 20,
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4,
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox',
					},
					{
						name: 'removeEmptyAttrs',
						active: false,
					},
				],
			},
		}),
	];
}
export default createdPluginsFn;

export { createdPluginsFn };
