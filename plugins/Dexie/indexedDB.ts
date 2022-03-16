import overlayfn from '@d/overlay';
import { version, IDBDatabaseName, objectStoreNames } from '@p/Dexie/store';
/**
 * 创建数据库第二个参数是整数，表示数据库的版本。
 * 新建第一版数据库会触发onupgradeneeded事件
 * onsuccess事件会一直触发
 * 升级数据库版本会触发onupgradeneeded事件
 * 升级数据库必须大于当前版本，小于会报错。当前版本大于0
 */
const request: IDBOpenDBRequest = indexedDB.open(IDBDatabaseName, version);
request.onerror = function () {
	const error = request.error as DOMException;
	overlayfn(error);
};
request.onsuccess = function () {
	IDB = request.result;
	IDB.onclose = function () {
		console.log('数据库手动关闭或者意外关闭');
	};
	IDB.onabort = function () {
		console.log('数据库事务意外中止和手动中止');
	};
	IDB.onerror = function () {
		console.log('数据库访问异常');
	};
	IDB.onversionchange = function () {
		console.log('数据库版本修改触发该事件，这时候可以在这里进行表的增删改查，事务，索引等');
	};
};
request.onupgradeneeded = function (event) {
	const newVersion = event.newVersion as number;
	const oldVersion = event.oldVersion;
	const target = event.target as IDBOpenDBRequest;
	const db: IDBDatabase = target.result;
	if (oldVersion && newVersion > oldVersion) {
		objectStoreNames.forEach(i => {
			if (i.isDelete) {
				db.deleteObjectStore(i.name);
			}
		});
	}
	objectStoreNames.forEach(i => {
		if (!db.objectStoreNames.contains(i.name)) {
			const store: IDBObjectStore = db.createObjectStore(i.name, i.options);
			const storeIndex = i.storeIndex as Array<StoreParameters>;
			storeIndex.forEach(s => {
				store.createIndex(s.indexName, s.keyPath, s.objectParameters);
			});
		} else {
			// const store: IDBObjectStore = db.transaction(i.name, 'readwrite').objectStore(i.name);
			// const deleteIndex = i.deleteIndex as Array<string>;
			// deleteIndex.forEach(o => {
			// 	store.deleteIndex(o);
			// });
		}
	});
};

/**
 * 删除数据库
 */
function deleteRequest(deleteDatabasename: string) {
	const request: IDBOpenDBRequest = indexedDB.deleteDatabase(deleteDatabasename);
	request.onerror = function (error) {
		overlayfn(error);
	};
	request.onsuccess = function (event) {
		console.log('数据可以删除成功');
	};
}
