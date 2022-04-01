export default {
	path: '/main',
	name: 'main',
	component: () => import('@v/main/index.vue'),
	meta: {},
	props: false,
	beforeEnter: (to: any, from: any) => {
		console.log(to, from);
	},
};
