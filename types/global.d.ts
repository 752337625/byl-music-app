declare global {
	interface Window {
		readonly IDB: IDBDatabase | null;
		appPromptEvent: BeforeInstallPromptEvent | null;
	}
}
export {};
