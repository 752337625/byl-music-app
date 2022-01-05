<script setup lang="ts"></script>
<template>
	<byl-prompt></byl-prompt>
	<byl-header></byl-header>
	<byl-main></byl-main>
	<byl-footer></byl-footer>
</template>
<script lang="ts">
	import { Notify } from 'vant';
	import { defineAsyncComponent, defineComponent } from 'vue';
	export default defineComponent({
		components: {
			BylHeader: defineAsyncComponent(() => import('@v/BylHeader.vue')),
			BylMain: defineAsyncComponent(() => import('@v/BylMain.vue')),
			BylFooter: defineAsyncComponent(() => import('@v/BylFooter.vue')),
			BylPrompt: defineAsyncComponent(() => import('@v/BylPrompt.vue')),
		},
		async mounted() {
			if ('serviceWorker' in navigator) {
				this.urlReload();
				let sw = await this.initSW();
				this.waitingFn(sw);
				this.updatefound(sw);
			}
		},
		methods: {
			initSW() {
				return navigator.serviceWorker.register('/sw.js', { scope: '/' });
			},
			updatefound(sw: ServiceWorkerRegistration) {
				const newWorker = sw.installing as ServiceWorker;
				if (!newWorker) return;
				newWorker.addEventListener('statechange', () => {
					if (newWorker.state === 'installed') {
						setTimeout(() => {
							if (newWorker.state === 'installed') {
								Notify({
									type: 'primary',
									message: '页面已更新，请点击此处进行更新',
									duration: 100000,
									background: 'rgba(60,144,175,0.95)',
									onClick: () => {
										let a = sw.waiting as ServiceWorker;
										a.postMessage('skipWaiting');
									},
								});
							}
						}, 200);
					}
				});
			},
			waitingFn(sw: ServiceWorkerRegistration) {
				if (sw.waiting) {
					Notify({
						type: 'primary',
						message: '页面已更新，请点击此处进行更新',
						duration: 100000,
						background: 'rgba(60,144,175,0.95)',
						onClick: () => {
							let a = sw.waiting as ServiceWorker;
							a.postMessage('skipWaiting');
						},
					});
				}
			},
			urlReload() {
				navigator.serviceWorker.addEventListener('controllerchange', () => {
					Notify({
						type: 'success',
						message: '页面更新完毕，即将刷新页面',
						duration: 2000,
						background: 'rgba(111,179,124,0.95)',
						onClose: () => {
							location.reload();
						},
					});
				});
			},
		},
	});
</script>
