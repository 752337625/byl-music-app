<template>
	<van-pull-refresh
		v-model="isLoading"
		pulling-text="下拉即可刷新..."
		loosing-text="释放即可刷新..."
		loading-text="加载中..."
		style="min-height: 100%"
		@refresh="onRefresh">
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
		<ul class="byl-pall">
			<li v-for="item in ball" :key="item.id">
				<p><img v-lazy="item.iconUrl" :src="item.iconUrl" /></p>
				<span>{{ item.name }}</span>
			</li>
		</ul>
		<p class="van-hairline--bottom" style="color: #9e9e9e"></p>
	</van-pull-refresh>
</template>
<script lang="ts">
	import { shallowRef, onMounted, ref, defineComponent } from 'vue';
	import { SwipeInterFace, BallInterFace } from './find';
	export default defineComponent({
		setup() {
			let swipe = shallowRef<SwipeInterFace[]>([]);
			let ball = shallowRef<BallInterFace[]>([]);
			let isLoading = ref<boolean>(false);
			onMounted(() => {
				getSwipe();
				getBall();
			});
			function getBall() {
				fetch('/api/homepage/dragon/ball')
					.then(res => {
						return res.json();
					})
					.then(res => {
						let { data } = res;
						ball.value = data;
					});
			}
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
			return { isLoading, onRefresh, swipe, ball };
		},
	});
</script>

<style scoped>
	.byl-swipe {
		height: 138px;
		margin: var(--byl-padding_10);
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
	ul.byl-pall {
		margin: 20px 0 15px var(--byl-padding_10);
		display: flex;
		white-space: nowrap;
		overflow: hidden;
	}
	ul.byl-pall li {
		text-align: center;
		padding-right: 18px;
	}
	ul.byl-pall li p {
		font-size: 0;
		border-radius: 50%;
		background: #f74f4e;
	}
	ul.byl-pall li span {
		font-size: 12px;
		color: #7b7b7b;
	}
	ul.byl-pall img {
		width: 50px;
	}
	[class*='van-hairline']::after {
		border-color: #e7eaed;
	}
</style>
