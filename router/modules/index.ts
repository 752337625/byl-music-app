import { RouteRecordRaw } from 'vue-router';
const modules = import.meta.glob('./*.ts');
const routes: Array<RouteRecordRaw> = [];
for (const path in modules) {
	modules[path]().then(mod => {
		routes.push(mod.default);
	});
}
export default routes;
