/**
 * 创建数据库第二个参数是整数，表示数据库的版本。
 * 新建第一版数据库会触发onupgradeneeded事件
 * onsuccess事件会一直触发
 * 升级数据库版本会触发onupgradeneeded事件
 * 升级数据库必须大于当前版本，小于会报错。当前版本大于0
 */
const request: IDBOpenDBRequest = indexedDB.open('byl-indexedDB', 1);
request.onerror = function (event) {
	console.log('数据库打开报错');
};
let db: IDBDatabase;
request.onsuccess = function () {
	db = request.result;
	console.log(db);
	console.log('数据库打开成功');
};
request.onupgradeneeded = function (event) {
	// let target = event.targe;
	console.log(event.targe);
	// console.log(event.target.result);
	// let objectStore = db.createObjectStore('person', { keyPath: 'id' });
	// console.log(objectStore);
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
