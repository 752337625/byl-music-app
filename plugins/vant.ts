import { Button, Tabbar, TabbarItem, PullRefresh, Field, Icon, Swipe, SwipeItem } from 'vant';
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
}
export default vantHandler;
