<script setup lang="ts">
	import { ref } from 'vue';
	let seacher = ref('');
	let placeholder = ref('&#xe84e; 搜索音乐、视频、歌词、电台');
</script>
<script lang="ts"></script>
<template>
	<div class="byl-header-seacher">
		<van-icon class-prefix="icon" name="navicon" class="iconfont" badge="99+" />
		<van-field v-model="seacher" label="" :placeholder="placeholder" />
		<van-icon class-prefix="icon" name="maikefeng-shi" class="iconfont" />
	</div>
</template>
<style scoped>
	.byl-header-seacher {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--byl-header--seacher-padding);
		background-color: var(--byl-header-seacher-background);
	}
	.van-cell {
		width: 80%;
		border-radius: 25px;
		padding: 5px 20px;
		background-color: var(--byl-header-seacher-cell-background);
	}
	.van-cell::after {
		border-bottom: 0;
	}
	.iconfont {
		font-size: 25px;
	}
</style>
