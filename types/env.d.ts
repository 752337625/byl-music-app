//TypeScript 的智能提示

/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_PUBLIC_PATH: string;
	readonly VITE_PUBLIC_ENV_PREFIX: string;
	readonly VITE_SEVER_PROXY: string;
	readonly VITE_PUBLIC_DIR: string;
	readonly VITE_SEVER_PORT: string;
	// 更多环境变量...
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
