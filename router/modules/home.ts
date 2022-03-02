export default {
	path: '/home',
	name: 'home',
	component: () => import('@v/home'),
	meta: {},
	props: false,
	beforeEnter: (to: any, from: any) => {
		console.log(to, from);
	},
};
