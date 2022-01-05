<template>
	<div id="byl-swipe-pall">
		<byl-swipe></byl-swipe>
	</div>
</template>
<script lang="ts">
	import { defineComponent, defineAsyncComponent } from 'vue';
	export default defineComponent({
		components: {
			// BylPullRefresh: defineAsyncComponent(() => import('@/base/BylPullRefresh.vue')),
			// BylPall: defineAsyncComponent(() => import('./BylPall.vue')),
			BylSwipe: defineAsyncComponent(() => import('./BylSwipe.vue')),
		},
		setup() {
			return {};
		},
	});
</script>

<style scoped></style>
