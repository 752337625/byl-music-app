import vantHandler from './vant';
import { App } from 'vue';
import './lib-flexible';
function importPlugins(app: App): void {
	vantHandler(app);
}
export default importPlugins;
