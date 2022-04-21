import { App } from 'vue';
import './lib-flexible';
import { Button, Lazyload } from 'vant';
export default function setupVant(app: App) {
	app.use(Button);
	app.use(Lazyload);
	// 注册时可以配置额外的选项
	app.use(Lazyload, {
		lazyComponent: true,
		loading: './img/default.png',
		error: './img/default.png',
	});
}

export { setupVant };
