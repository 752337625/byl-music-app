import { Button, Tabbar, TabbarItem, PullRefresh, Field, Icon, Swipe, SwipeItem, Empty, Lazyload, Overlay } from 'vant';
import { App } from 'vue';
function vantHandler(app: App) {
	app.use(Button);
	app.use(Tabbar);
	app.use(TabbarItem);
	app.use(Field);
	app.use(PullRefresh);
	app.use(Icon);
	app.use(Swipe);
	app.use(SwipeItem);
	app.use(Empty);
	app.use(Lazyload);
	app.use(Overlay);
	// 注册时可以配置额外的选项
	app.use(Lazyload, {
		lazyComponent: true,
		loading: '../src/assets/img/default.png',
		error: '../src/assets/img/default.png',
	});
}
export default vantHandler;
