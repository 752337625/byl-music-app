import vantHandler from './vant';
import router from '@r/index';
import store from '@s/index';
import { App } from 'vue';
import './lib-flexible';
function importPlugins(app: App): void {
	vantHandler(app);
	app.use(router);
	app.use(store);
}
export default importPlugins;
