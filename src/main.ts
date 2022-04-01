import { createApp } from 'vue';
import App from './App.vue';
import '@crb/index'; //css
//import importPlugins from '@p/index'; //plugins：vant、lib-flexble、router、vuex
import setupRouter from '@r/index';
import setupStore from '@s/index';
//插件引入在挂载DOM前面，否则引入失败
function bootStrap() {
	const app = createApp(App);
	setupRouter(app);
	setupStore(app);
	//importPlugins(app);
	app.mount('#app');
}
bootStrap();
