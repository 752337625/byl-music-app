<template>
	<div class="byl-swipe-top">
		<van-swipe class="byl-swipe" :autoplay="6000" lazy-render>
			<van-swipe-item v-for="item in swipe" :key="item.bannerId">
				<div>
					<img :src="item.pic" />
					<p
						>{{ item.typeTitle === '广告' ? '了解更多' : '' }}&nbsp;<span
							:style="{
								background: item.typeTitle === '新歌首发' || item.typeTitle === '博客' ? '#ff0000' : '#44A5EF',
							}"
							>{{ item.typeTitle }}</span
						></p
					>
				</div>
			</van-swipe-item>
		</van-swipe>
	</div>
</template>
<script lang="ts">
	import { shallowRef, ref, onMounted, defineComponent } from 'vue';
	import { SwipeInterFace } from './find';
	export default defineComponent({
		setup() {
			let swipe = shallowRef<SwipeInterFace[]>([]);
			let isLoading = ref<boolean>(false);
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
			function onRefresh() {
				setTimeout(() => {
					isLoading.value = false;
				}, 3000);
			}
			return { isLoading, onRefresh, swipe };
		},
	});
</script>

<style scoped>
	.byl-swipe-top {
		background-color: var(--bly-body-fff);
	}
	.byl-swipe {
		height: 138px;
		margin: var(--byl-padding_10) var(--byl-padding_10) 0 var(--byl-padding_10);
		border-radius: var(--byl-border-radius_10);
	}
	.byl-swipe > div img {
		height: 100%;
		width: 100%;
	}
	.byl-swipe > div p {
		color: #fff;
		font-size: 12px;
		text-align: center;
		position: absolute;
		bottom: 0;
		right: 0;
	}
	.byl-swipe > div p span {
		display: inline-block;
		padding: 3px 10px;
		border-radius: var(--byl-border-radius_10) 0 0 0;
	}
</style>
