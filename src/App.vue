<script setup lang="ts"></script>
<template>
	<byl-prompt></byl-prompt>
	<byl-header></byl-header>
	<byl-main></byl-main>
	<byl-footer></byl-footer>
</template>
<script lang="ts">
	import { defineAsyncComponent, defineComponent } from 'vue';
	export default defineComponent({
		components: {
			BylHeader: defineAsyncComponent(() => import('@v/BylHeader.vue')),
			BylMain: defineAsyncComponent(() => import('@v/BylMain.vue')),
			BylFooter: defineAsyncComponent(() => import('@v/BylFooter.vue')),
			BylPrompt: defineAsyncComponent(() => import('@v/BylPrompt.vue')),
		},
	});
</script>
<style scoped></style>
