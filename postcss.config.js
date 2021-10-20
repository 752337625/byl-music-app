module.exports = {
	plugins: {
		 'postcss-pxtorem': {
		 	rootValue: 37.5, // //结果为：设计稿元素尺寸/rootValue，比如元素设计稿375/rootValue,最终页面会换算成 1rem=10px (Number | Function)
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
