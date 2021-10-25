<script setup lang="ts"></script>
<template>
	<byl-header></byl-header>
	<byl-aside></byl-aside>
	<byl-footer></byl-footer>
</template>
<script lang="ts">
	import { defineAsyncComponent, defineComponent } from 'vue';
	export default defineComponent({
		components: {
			BylHeader: defineAsyncComponent(() => import('@v/BylHeader.vue')),
			BylAside: defineAsyncComponent(() => import('@v/BylAside.vue')),
			BylFooter: defineAsyncComponent(() => import('@v/BylFooter.vue')),
		},
	});
</script>
<style scoped></style>
