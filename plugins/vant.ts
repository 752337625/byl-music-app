import { Button } from 'vant';
import { App } from 'vue';
function vantHandler(app: App) {
	app.use(Button);
}
export default vantHandler;
