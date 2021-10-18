module.exports = {
	root: true,
	parser: 'vue-eslint-parser', //eslint-plugin-vue
	parserOptions: {
		parser: '@typescript-eslint/parser' /* 解析ts语法 */,
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			tsx: true,
		},
	},
	env: {
		browser: true,
		node: true,
	},
	/**
	 * eslint:recommendede 启动eslint默认规则
	 * plugin:prettier/recommended->eslintF-config-prettier 避免与eslint规则冲突，提高prettier规则权重
	 * plugin:vue/vue3-recommended->eslint-plugin-vue
	 * plugin:@typescript-eslint/recommended->@typescript-eslint/eslint-plugin
	 */

	globals: {},
	/**
	 *prettier->eslint-plugin-prettier
	 *@typescript-eslint->@typescript-eslint/eslint-plugin
	 *vue->eslint-plugin-vue
	 *import->eslint-plugin-import
	 */
	plugins: ['vue', '@typescript-eslint', 'import', 'prettier'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'prettier/prettier': 'error',
		'no-irregular-whitespace': 'off',
		'no-var': 'error', //禁止使用var
		eqeqeq: 'error', //要求使用 === 和 !==
		'vue/script-setup-uses-vars': 'error', // 解决 注意该script非ts表示<script setup>中定义变量在<template>使用no-unused-vars问题
		'@typescript-eslint/no-unused-vars': ['off'], //解决<script setup lang="ts">中定义变量在<template>使用no-unused-vars问题
	},
};
