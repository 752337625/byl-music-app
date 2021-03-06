import { createApp } from 'vue';
import App from './App.vue';
import '@crb/index'; //css
import adapter from 'webrtc-adapter';
//import importPlugins from '@p/index'; //plugins：vant、lib-flexble、router、vuex
import setupRouter from '@r/index';
import setupStore from '@s/index';
import setupVant from '@v/index';
//插件引入在挂载DOM前面，否则引入失败
function bootStrap() {
	const app = createApp(App);
	setupRouter(app);
	setupStore(app);
	setupVant(app);
	//importPlugins(app);
	app.mount('#app');
}
bootStrap();
