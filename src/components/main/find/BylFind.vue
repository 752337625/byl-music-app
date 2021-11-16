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
	import { ref, defineComponent, defineAsyncComponent, nextTick } from 'vue';
	import BetterScroll from 'better-scroll';
	export default defineComponent({
		components: {
			// BylPullRefresh: defineAsyncComponent(() => import('@/base/BylPullRefresh.vue')),
			BylPall: defineAsyncComponent(() => import('./BylPall.vue')),
			BylSwipe: defineAsyncComponent(() => import('./BylSwipe.vue')),
		},
		setup() {
			nextTick(() => {
				new BetterScroll('.byl-swipe-top', {
					specifiedIndexAsContent: 1,
					probeType: 3,
				});
			});
			function RefreshHandler() {
				console.log(1);
			}
			return { RefreshHandler };
		},
	});
</script>

<style scoped>
	.byl-swipe-pall {
		padding-bottom: 1px;
	}
</style>
