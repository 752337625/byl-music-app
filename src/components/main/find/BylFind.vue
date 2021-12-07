<template>
	<!-- <byl-pull-refresh @RefreshHandler="RefreshHandler">
		<template #content> -->
	<div id="byl-swipe-pall">
		<byl-swipe></byl-swipe>
		<byl-pall></byl-pall>
	</div>
	<!-- </template>
	</byl-pull-refresh> -->
</template>
<script lang="ts">
	import { defineComponent, defineAsyncComponent } from 'vue';
	export default defineComponent({
		components: {
			// BylPullRefresh: defineAsyncComponent(() => import('@/base/BylPullRefresh.vue')),
			BylPall: defineAsyncComponent(() => import('./BylPall.vue')),
			BylSwipe: defineAsyncComponent(() => import('./BylSwipe.vue')),
		},
		setup() {
			return {};
		},
	});
</script>

<style scoped>
	.byl-swipe-pall {
		padding-bottom: 1px;
	}
</style>
