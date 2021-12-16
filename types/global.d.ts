declare global {
	interface Window {
		IDB: IDBDatabase | null;
	}
}

export {};
