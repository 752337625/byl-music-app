import { Button, Tabbar, TabbarItem, PullRefresh } from 'vant';
import { App } from 'vue';
function vantHandler(app: App) {
	app.use(Button);
	app.use(Tabbar);
	app.use(TabbarItem);
	app.use(PullRefresh);
}
export default vantHandler;
