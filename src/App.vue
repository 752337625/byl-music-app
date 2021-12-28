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
		mounted() {
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', () => {
					initSW();
					navigator.serviceWorker.addEventListener('controllerchange', () => {
						Notify({
							type: 'success',
							message: '页面更新完毕，即将刷新页面',
							duration: 2000,
							background: 'rgba(111,179,124,0.95)',
							className: 'byl-Notify-primary',
							onClose: () => {
								window.location.reload();
							},
						});
					});
				});
			}
			async function initSW() {
				let registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
				if (registration.waiting) {
					Notify({
						type: 'primary',
						message: '页面已更新，请点击此处进行更新',
						duration: 100000,
						background: 'rgba(60,144,175,0.95)',
						className: 'byl-Notify-primary',
						onClick: () => {
							let a = registration.waiting as ServiceWorker;
							a.postMessage('skipWaiting');
						},
					});
				}
				registration.addEventListener('updatefound', () => {
					const newWorker = registration.installing as ServiceWorker;
					newWorker.addEventListener('statechange', () => {
						if (newWorker.state === 'installed') {
							setTimeout(() => {
								if (newWorker.state === 'installed') {
									Notify({
										type: 'primary',
										message: '页面已更新，请点击此处进行更新',
										duration: 100000,
										background: 'rgba(60,144,175,0.95)',
										className: 'byl-Notify-primary',
										onClick: () => {
											let a = registration.waiting as ServiceWorker;
											a.postMessage('skipWaiting');
										},
									});
								}
							}, 200);
						}
					});
				});
			}
		},
	});
</script>
<style scoped></style>
