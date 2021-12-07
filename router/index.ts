import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [];
const router = createRouter({
	history: createWebHistory(),
	routes,
});
//全局前置守卫
router.beforeEach((to, from) => {
	console.log();
	return false;
});
//全局解析守卫
router.beforeResolve((to, from) => {
	console.log();
});
//全局后置钩子
router.afterEach((to, from) => {
	console.log();
});
export default router;
