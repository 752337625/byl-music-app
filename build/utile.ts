/**
 *
 * @param env
 * @returns 转化后的
 */
export function tconversionFn(envConf: Record<string, any>): ViteEnv {
	const ret: any = {};
	for (const envName of Object.keys(envConf)) {
		const realName = envConf[envName].replace(/\\n/g, '\n');
		console.log(typeof realName);
		//
		// realName = realName === 'true' ? true : realName === 'false' ? false : realName;
		// if (envName === 'VITE_SEVER_PORT') {
		// 	realName = Number(realName);
		// }
		// if (envName === 'VITE_SEVER_PROXY' && realName) {
		// 	try {
		// 		realName = JSON.parse(realName.replace(/'/g, '"'));
		// 	} catch (error) {
		// 		realName = '';
		// 	}
		// }
		// ret[envName] = realName;
		// if (typeof realName === 'string') {
		// 	process.env[envName] = realName;
		// } else if (typeof realName === 'object') {
		// 	process.env[envName] = JSON.stringify(realName);
		// }
	}
	return ret;
}
