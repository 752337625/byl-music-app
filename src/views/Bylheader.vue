<script setup lang="ts"></script>
<script lang="ts">
	import { mapState } from 'vuex';
	import { defineAsyncComponent, defineComponent } from 'vue';
	export default defineComponent({
		components: {
			BylSeacher: defineAsyncComponent(() => import('@c/header/BylSeacher.vue')),
		},
		computed: {
			...mapState({
				headerComponent: 'headerComponent',
			}),
		},
	});
</script>
<template>
	<header class="byl-header">
		<component :is="headerComponent"></component>
	</header>
</template>
<style scoped>
	.byl-header {
		height: 50px;
	}
</style>
