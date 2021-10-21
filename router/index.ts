import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
	history: createWebHistory(),
	routes: [],
});
//全局前置守卫
router.beforeEach((to, from) => {
	console.log(to, from);
	return false;
});
//全局解析守卫
router.beforeResolve((to, from) => {
	console.log(to, from);
});
//全局后置钩子
router.afterEach((to, from) => {
	console.log(to, from);
});
export default router;
