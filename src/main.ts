import { createApp } from 'vue';
import App from './App.vue';
import importPlugins from '@p/index'; //plugins：vant、lib-flexble、router、vuex
import '@crb/index'; //css
const app = createApp(App);
importPlugins(app); //插件引入在挂载DOM前面，否则引入失败
app.mount('#app');
