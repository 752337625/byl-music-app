module.exports = {
	plugins: {
		'postcss-pxtorem': {
			rootValue: 37.5, // 根元素的大小html font-size
			unitPrecision: 5, //保留rem小数点多少位  (Number)
			propList: ['*'], //设置为['*']全部转化rem，假设需要仅对边框进行设置，可以写['*', '!border*']  (Array)
			//selectorBlackList: [], // 指定不需要转换的属性  (Array)
			minPixelValue: 12, // //px小于12的不会被转换  (Number)
			mediaQuery: false, // 允许在媒体查询中转换  (Boolean)
			//exclude: /node_modules/i, //要忽略并保留为px 的文件路径 (String, Regexp, Function)
			//replace: true, // (Boolean)
		},
	},
};
