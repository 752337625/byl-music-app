/**
 * 创建数据库第二个参数是整数，表示数据库的版本。
 * 新建第一版数据库会触发onupgradeneeded事件
 * onsuccess事件会一直触发
 * 升级数据库版本会触发onupgradeneeded事件
 * 升级数据库必须大于当前版本，小于会报错。当前版本大于0
 */
const version = 2;
const IDBDatabaseName = 'byl-indexedDB';
const objectStoreNames: Array<DatabaseStore> = [
	{
		name: 'banner',
		options: { keyPath: 'bannerId' },
	},
	{
		name: 'test',
		options: { keyPath: 'bannerId' },
	},
	{
		name: 'name',
		options: { keyPath: 'bannerId' },
	},
];
const request: IDBOpenDBRequest = indexedDB.open(IDBDatabaseName, version);
request.onerror = function (event) {
	console.log(event);
};
request.onsuccess = function () {
	window.IDB = request.result;
};
request.onupgradeneeded = function (event) {
	console.log(event);
	const newVersion = event.newVersion as number;
	const oldVersion = event.oldVersion;
	const target = event.target as IDBOpenDBRequest;
	const db: IDBDatabase = target.result;
	if (oldVersion && newVersion > oldVersion) {
		objectStoreNames.forEach(i => {
			db.deleteObjectStore(i.name);
		});
	}
	objectStoreNames.forEach(i => {
		if (!db.objectStoreNames.contains(i.name)) {
			db.createObjectStore(i.name, i.options);
		}
	});
};

/**
 * 删除数据库
 */
function deleteRequest(deleteDatabasename: string) {
	const request: IDBOpenDBRequest = indexedDB.deleteDatabase(deleteDatabasename);
	request.onerror = function (event) {
		console.log('数据库删除异常 ');
		console.log('Error');
	};
	request.onsuccess = function (event) {
		console.log('数据可以删除成功');
	};
}
