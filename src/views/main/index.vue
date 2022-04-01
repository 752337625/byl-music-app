<template>
	<div>
		<button @click="add">直接修改</button>
		<button @click="addPatch">addPatch对象</button>
		<button @click="addPatchFn">addPatch函数</button>
		<button @click="reset">reset重置</button>
		<button @click="stop">停止监听</button>
		<div>{{ mainStore.count }}</div>
		<div>{{ countHandler }}我是直接从mainStore解构出来的。所以我不会改变</div>
	</div>
</template>
<script lang="ts" setup>
	import useMainStore from '@s/modules/mian';
	let mainStore = useMainStore();
	let { count: countHandler } = mainStore;
	let add = () => {
		mainStore.$patch(state => {
			state.count++;
			state.main++;
		});
	};
	let addPatchFn = () => {
		mainStore.$patch(state => {
			state.count++;
			state.main++;
		});
	};
	let addPatch = () => {
		mainStore.$patch({
			count: 50,
			main: 50,
		});
	};
	const reset = () => {
		mainStore.$reset(); //todo 直接将仓库中的数据重置
	};
	let subscribe = mainStore.$subscribe(
		(mutation, state) => {
			console.log(mutation, state);
		},
		{ detached: false },
	);
	let stop = () => {
		subscribe();
	};
</script>
<script lang="ts">
	export default {};
</script>

<style></style>
