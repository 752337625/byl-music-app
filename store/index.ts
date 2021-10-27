import { createStore } from 'vuex';
import header from './module/header';
export default createStore({
	state: {
		headerComponent: 'byl-seacher',
		mainComponent: 'byl-find', //mian：包含发现（默认），博客，我的，云村，关注
	},
	mutations: {},
	actions: {},
	modules: {
		header,
	},
});
