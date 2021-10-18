/* 
  <type>(<scope>): <subject>
空一行
<body>
空一行
<foot></foot>
 */

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2, //代表必须输入
			'always',
			[
				'feat', //  新增feature
				'fix', // 修复bug
				'refactor', // 代码重构，没有加新功能或者修复bug
				'docs', // 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
				'chore', //  改变构建流程、或者增加依赖库、工具等
				'merge', // 仅进行分支合并.
				'perf', // 优化相关，比如提升性能、体验
				'improvement', // 用于对当前实现进行改进而没有添加新功能或修复错误的提交.
				'revert', // 回滚到上一个版本
				'style', //  仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
				'test', //  测试用例，包括单元测试、集成测试等
				'ci', //主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
				'cli', //项目构建
				'build', //主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
			],
		],
		'header-max-length': [0, 'always', 2], //header 最长72
	},
};
