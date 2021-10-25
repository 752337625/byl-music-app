export function isDevFn(mode: string): boolean {
	return mode === 'development';
}

export function isProFn(mode: string): boolean {
	return mode === 'development';
}

/**
 *
 * @param env
 * @returns 转化后的 env
 */
export function tconversionFn(envConf: Record<string, any>): ViteEnv {
	const ret: any = {};
	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName].trim();
		realName = realName === 'true' ? true : realName === 'false' ? false : realName;
		if (envName === 'VITE_SEVER_PORT') {
			realName = Number(realName);
		}
		if (envName === 'VITE_SEVER_PROXY' && realName) {
			realName = JSON.parse(JSON.stringify(realName));
		}
		ret[envName] = realName;
	}
	return ret;
}
