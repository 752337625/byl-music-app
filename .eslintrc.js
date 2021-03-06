module.exports = {
	root: true,
	parser: 'vue-eslint-parser', //vue-eslint-parser
	parserOptions: {
		parser: '@typescript-eslint/parser' /* 解析ts语法 */,
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			globalReturn: false,
			impliedStrict: false,
			jsx: true,
			tsx: true,
		},
	},
	globals: {
		IDB: 'writable',
		appPromptEvent: 'writable',
		BeforeInstallPromptEvent: 'readonly',
	},
	env: {
		browser: true,
		node: true,
		commonjs: true,
	},
	/**
	 * prettier->eslint-plugin-prettier
	 * @typescript-eslint->@typescript-eslint/eslint-plugin
	 * vue->eslint-plugin-vue
	 * import->eslint-plugin-import
	 */
	plugins: ['vue', '@typescript-eslint', 'import', 'prettier'],
	/**
	 * eslint:recommendede 启动eslint默认规则
	 * prettier->eslintF-config-prettier 避免与eslint规则冲突，提高prettier规则权重
	 * plugin:vue/vue3-recommended->eslint-plugin-vue
	 * plugin:@typescript-eslint/recommended->@typescript-eslint/eslint-plugin
	 */
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	rules: {
		/**
		 * eslint:recommended
		 */
		'prettier/prettier': 'error',
		'no-var': 'error', //禁止使用var
		eqeqeq: 'error', //要求使用 === 和 !==
		'no-irregular-whitespace': 'error', //这禁止掉 空格报错检查
		/**
		 * vue
		 */
		'vue/script-setup-uses-vars': 'error', // 解决 注意该script非ts表示<script setup>中定义变量在<template>使用no-unused-vars问题
		'vue/valid-template-root': 'error', //<template> </template>在没有子元素下不异常
		'vue/no-mutating-props': 'off', //eslint不建议子元素通过v-model修改父元素传的props值
		/**
		 * @typescript-eslint
		 */
		'@typescript-eslint/no-unused-vars': ['off'], //解决<script setup lang="ts"> <script lang="ts">中定义变量在<template>使用no-unused-vars问题
		'@typescript-eslint/no-var-requires': ['off'], //解决requires异常
		'@typescript-eslint/no-explicit-any': ['off'], //解决ts 无法使用any异常
	},
};
