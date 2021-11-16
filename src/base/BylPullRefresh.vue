<template>
	<van-pull-refresh
		v-model="isLoading"
		:pulling-text="pullingText"
		:loosing-text="loosingText"
		:loading-text="loadingText"
		style="min-height: 100%"
		@refresh="onRefresh">
		<slot name="content"></slot>
	</van-pull-refresh>
</template>
<script lang="ts">
	import { ref, defineComponent } from 'vue';
	export default defineComponent({
		props: {
			pullingText: {
				type: String,
				default: '下拉即可刷新...',
			},
			loosingText: {
				type: String,
				default: '释放即可刷新...',
			},
			loadingText: {
				type: String,
				default: '加载中...',
			},
		},
		emits: ['RefreshHandler'],
		setup(props, context) {
			let isLoading = ref<boolean>(false);
			function onRefresh() {
				setTimeout(() => {
					isLoading.value = false;
					context.emit('RefreshHandler');
				}, 3000);
			}
			return { onRefresh, isLoading };
		},
	});
</script>

<style scoped>
	.byl-swipe-pall {
		padding-bottom: 1px;
	}
</style>
