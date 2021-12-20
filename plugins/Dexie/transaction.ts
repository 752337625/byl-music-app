// IDBTransaction 对象用来异步操作数据库事务，所有的读写操作都要通过这个对象进行。
// 事务的执行顺序是按照创建的顺序，而不是发出请求的顺序。
/**
 * @param name 表名
 * @param mode 模式
 * @returns  数据库事务对象
 * @list IDBTransaction.db：返回当前事务所在的数据库对象 IDBDatabase。
 * @list IDBTransaction.error：返回当前事务的错误。如果事务没有结束，或者事务成功结束，或者被手动终止，该方法返回null。
 * @list IDBTransaction.mode：返回当前事务的模式，默认是readonly（只读），另一个值是readwrite。
 * @list IDBTransaction.objectStoreNames：返回一个类似数组的对象 DOMStringList，成员是当前事务涉及的对象仓库的名字。
 * @list IDBTransaction.onabort：指定abort事件（事务中断）的监听函数。
 * @list IDBTransaction.oncomplete：指定complete事件（事务成功）的监听函数。
 * @list IDBTransaction.onerror：指定error事件（事务失败）的监听函数。
 */
export function getIDBTransaction(name: string | string[], mode?: IDBTransactionMode) {
	const transaction: IDBTransaction = IDB.transaction(name, mode);
	//指定error事件（事务失败）的监听函数。
	transaction.onerror = () => {
		console.log(transaction.error);
	};
	//指定abort事件（事务中断）的监听函数。
	transaction.onabort = event => {
		console.log('我被手动中断了！！！', event);
	};
	//指定complete事件（事务成功）的监听函数。
	transaction.oncomplete = event => {
		//console.log('当前事务执行成功', event);
	};
	return transaction;
}
/**
 * @description 终止当前事务，回滚所有已经进行的变更。
 */
export function abort(transaction: IDBTransaction) {
	transaction.abort();
}
