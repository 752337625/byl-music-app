<script setup lang="ts">
	import { ref } from 'vue';
	let active = ref(0);
</script>
<script lang="ts"></script>
<template>
	<van-tabbar v-model="active">
		<van-tabbar-item icon="home-o">标签</van-tabbar-item>
		<van-tabbar-item icon="search">标签</van-tabbar-item>
		<van-tabbar-item icon="friends-o">标签</van-tabbar-item>
		<van-tabbar-item icon="setting-o">标签</van-tabbar-item>
	</van-tabbar>
</template>
<style scoped>
	.byl-footer {
		height: 50px;
		background: #fff;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 1500;
		color: #333;
		box-shadow: 0 0 5px #ddd;
	}
</style>
