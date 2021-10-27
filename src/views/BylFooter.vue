<script setup lang="ts">
	import { ref } from 'vue';
	let active = ref(0);
</script>
<script lang="ts"></script>
<template>
	<van-tabbar v-model="active">
		<van-tabbar-item icon="home-o">发现</van-tabbar-item>
		<van-tabbar-item icon="search">博客</van-tabbar-item>
		<van-tabbar-item icon="friends-o">我的</van-tabbar-item>
		<van-tabbar-item icon="setting-o">关注</van-tabbar-item>
		<van-tabbar-item icon="setting-o">云村</van-tabbar-item>
	</van-tabbar>
</template>
<style scoped></style>
