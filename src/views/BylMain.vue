<template>
	<div class="byl-main">
		<component :is="mainComponent"></component>
	</div>
</template>
<script lang="ts">
	import { mapState } from 'vuex';
	import { defineComponent, defineAsyncComponent } from 'vue';
	export default defineComponent({
		components: {
			BylFind: defineAsyncComponent(() => import('@c/main/find/BylFind.vue')),
		},
		computed: {
			...mapState({
				mainComponent: 'mainComponent',
			}),
		},
	});
</script>
<script setup lang="ts"></script>
