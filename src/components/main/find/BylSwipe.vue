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
	import { shallowRef, defineComponent } from 'vue';
	import { SwipeInterFace } from './find';
	import { count, getAll, add } from '@p/Dexie/objectStore';
	export default defineComponent({
		setup() {
			let swipe = shallowRef<SwipeInterFace[]>([]);
			return { swipe };
		},
		mounted() {
			this.cachesSwipefn();
		},
		methods: {
			async cachesSwipefn() {
				let res = (await count('banner')) as number;
				if (!res) {
					this.getSwipe();
				} else {
					let res = (await getAll<Array<SwipeInterFace>>('banner')) as Array<SwipeInterFace>;
					this.swipe = res;
				}
			},
			getSwipe() {
				fetch('/api/banner?type=2')
					.then(res => {
						return res.json();
					})
					.then(res => {
						let { banners } = res;
						banners.forEach((element: SwipeInterFace) => {
							add<SwipeInterFace>('banner', element);
						});
						this.swipe = banners;
					});
			},
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
