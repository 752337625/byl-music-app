<template>
	<van-swipe class="byl-swipe" :autoplay="3000">
		<van-swipe-item v-for="item in swipe" :key="item.bannerId">
			<img :src="item.pic" />
		</van-swipe-item>
	</van-swipe>
</template>
<script lang="ts" setup>
	import { ref, onMounted } from 'vue';
	import { SwipeInterFace } from './swipe';
	let swipe = ref<SwipeInterFace[]>([]);
	onMounted(() => {
		getSwipe();
	});
	function getSwipe() {
		fetch('/api/banner?type=2')
			.then(res => {
				return res.json();
			})
			.then(res => {
				let { banners } = res;
				swipe.value = banners;
			});
	}
</script>
<style scoped>
	.byl-swipe {
		height: 145px;
		border-radius: var(--byl-border-radius);
	}
	.byl-swipe img {
		height: 100%;
		width: 100%;
	}
</style>
