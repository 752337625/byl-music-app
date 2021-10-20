import { createApp } from 'vue';
import App from './App.vue';
import '@p/index.js';
import '@a/css/index.css';
import { Button } from 'vant';
const app = createApp(App);
app.use(Button);
app.mount('#app');
