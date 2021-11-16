<template>
	<div class="byl-pall">
		<ul class="byl-pall-ul">
			<li v-for="item in ball" :key="item.id">
				<p><img v-lazy="item.iconUrl" :src="item.iconUrl" /></p>
				<span>{{ item.name }}</span>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
	import { shallowRef, onMounted, defineComponent, nextTick } from 'vue';
	import { BallInterFace } from './find';
	export default defineComponent({
		setup(prorps, context) {
			let ball = shallowRef<BallInterFace[]>([]);
			onMounted(() => {
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

			return { ball };
		},
	});
</script>

<style scoped>
	.byl-pall {
		padding: 20px 0 15px var(--byl-padding_10);
		background-color: var(--bly-body-fff);
		overflow: hidden;
	}
	ul.byl-pall-ul {
		display: flex;
	}
	ul.byl-pall-ul li {
		text-align: center;
		margin-right: 18px;
	}
	ul.byl-pall-ul li p {
		font-size: 0;
		border-radius: 50%;
		background: #f74f4e;
	}
	ul.byl-pall-ul li span {
		font-size: 12px;
		color: #7b7b7b;
		margin-top: 10px;
	}
	ul.byl-pall-ul img {
		width: 50px;
	}
</style>
