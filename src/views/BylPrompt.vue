<script setup lang="ts">
	import { ref, onBeforeMount } from 'vue';
	let isShowprompt = ref<boolean>(false);
	onBeforeMount(() => {
		window.appPromptEvent = null;
		window.addEventListener('beforeinstallprompt', event => {
			isShowprompt.value = true;
			appPromptEvent = event;
			event.preventDefault();
			return false;
		});
		//安装由未安装->安装完毕才会触发这个函数,其余安装完成后不会再触发该函数
		window.addEventListener('appinstalled', () => {
			isShowprompt.value = false;
		});
	});
	function installBtn() {
		if (!appPromptEvent) return;
		appPromptEvent.prompt();
		appPromptEvent = null;
	}
</script>
<template>
	<div v-if="isShowprompt" class="byl-prompt">
		<i @click="isShowprompt = false">x</i>
		<img src="/logo/android-chrome-48x48.png" />
		<h6>鲸落云音乐</h6>
		<button id="installBtn" @click="installBtn">安装APP</button>
	</div>
</template>
<script lang="ts"></script>
<style scoped>
	.byl-prompt {
		width: 100%;
		height: 60px;
		padding: 10px;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-bottom: 1px solid#ccc;
	}
	.byl-prompt i {
		font-size: 15px;
		color: red;
		font-style: initial;
		position: absolute;
		right: 6px;
		top: 4px;
	}
	.byl-prompt h6 {
		font-size: 20px;
	}
	.byl-prompt img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		margin-right: 10px;
	}
	.byl-prompt button {
		flex: 1;
		border: 0;
		font-size: 16px;
		text-align: right;
		padding-right: 20px;
		text-decoration: underline;
		color: blue;
		background-color: rgba(1, 1, 1, 0);
		cursor: pointer;
	}
</style>
