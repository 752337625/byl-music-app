import overlayfn from '@d/overlay';
import { getIDBTransaction } from '@p/Dexie/transaction';
/**
 *
 * @param name 表名
 * @returns  当前表信息IDBObjectStore对象
 * @list IDBObjectStore.autoIncrement：布尔值，表示主键是否会自动递增。
 * @list IDBObjectStore.keyPath：返回当前对象仓库的主键。
 * @list IDBObjectStore.indexNames：返回一个类似数组的对象（DOMStringList），包含了当前对象仓库的所有索引。
 * @list IDBObjectStore.name：返回当前对象仓库的名称。
 * @list IDBObjectStore.transaction：返回当前对象仓库所属的事务对象。
 * @list IDBTransaction.abort()：终止当前事务，回滚所有已经进行的变更。
 * @list IDBTransaction.objectStore(name)：返回指定名称的对象仓库 IDBObjectStore。
 */
export function getIDBObjectStoreInfo(name: string, mode?: IDBTransactionMode): IDBObjectStore {
	const objectStroe: IDBObjectStore = getIDBTransaction([name], mode).objectStore(name);
	return objectStroe;
}

/**
 * @param name 表名
 * @param item 泛型值
 * @param key 主键值（可选）
 * @description IDBObjectStore.add()用于向对象仓库添加数据，返回一个 IDBRequest 对象。该方法只用于添加数据，如果主键相同会报错，因此更新数据必须使用put()* 方法。该方法接受两个参数，第一个参数是键值，第二个参数是主键，该参数可选，如果省略默认为null。 如果data中包含keyPath值或者此值为自增值，那么可以略去此参* 数。
 */
export function add<T>(name: string, item: T, key?: IDBValidKey): Promise<IDBValidKey> {
	return new Promise((r, j) => {
		const request: IDBRequest = getIDBObjectStoreInfo(name, 'readwrite').add(item, key);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
/**
 * @param name 表名
 * @param item 泛型值
 * @param key 主键值（可选）
 * @returns Promise<string>
 * @description IDBObjectStore.put()方法用于更新某个主键对应的数据记录，如果对应的键值不存在，则插入一条新的记录。该方法返回一个IDBRequest 对象。该方法接受两个参数，第一个参数为新数据，第二个参数为主键，该参数可选，且只在自动递增时才有必要提供，因为那时主键不包含在数据值里面。
 */
export function put<T>(name: string, item: T, key?: IDBValidKey): Promise<IDBValidKey> {
	return new Promise((r, j) => {
		const request: IDBRequest = getIDBObjectStoreInfo(name, 'readwrite').put(item, key);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}

/**
 * @param name 表名
 * @description IDBObjectStore.clear()删除当前对象仓库的所有记录。该方法返回一个 IDBRequest 对象。该方法不需要参数。
 */
export function clear(name: string): void {
	const request = getIDBObjectStoreInfo(name, 'readwrite').clear();
	request.onsuccess = () => {
		console.log(request.result);
	};
	request.onerror = error => {
		overlayfn(error);
	};
}
/**
 *
 * @param name 表名
 * @param key 主键值
 * @description IDBObjectStore.delete()方法用于删除指定主键的记录。该方法返回一个 IDBRequest 对象。
 */
export function deletekey(name: string, key: IDBValidKey): void {
	const request = getIDBObjectStoreInfo(name, 'readwrite').delete(key);
	request.onsuccess = () => {
		console.log(request.result);
	};
	request.onerror = error => {
		overlayfn(error);
	};
}

/**
 * @param name 表名
 * @param key 主键值（可选）
 * @description IDBObjectStore.count()方法用于计算记录的数量。该方法返回一个 IDBRequest 对象。不带参数时，该方法返回当前对象仓库的所有记录数量。如果主键或 IDBKeyRange 对象作为参数，则返回对应的记录数量。
 * @returns Promise<number>
 */
export function count(name: string, key?: IDBValidKey): Promise<number> {
	return new Promise((r, j) => {
		const request: IDBRequest = getIDBObjectStoreInfo(name, 'readonly').count(key);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
/**
 * @param name 表名
 * @param key 主键值
 * @description IDBObjectStore.getKey()用于获取主键。该方法返回一个 IDBRequest 对象。该方法的参数可以是主键值或 IDBKeyRange 对象。
 * @returns Promise<不知道了>
 */
export function getKey(name: string, key: IDBValidKey | IDBKeyRange): Promise<IDBValidKey | IDBKeyRange> {
	return new Promise((r, j) => {
		const request: IDBRequest = getIDBObjectStoreInfo(name, 'readonly').getKey(key);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
/**
 *
 * @param name 表名
 * @param key 主键值
 * @description IDBObjectStore.get()用于获取主键对应的数据记录。该方法返回一个 IDBRequest 对象。
 * @returns  Promise<不知道了>
 */
export function get<T>(name: string, key: IDBValidKey | IDBKeyRange): Promise<T> {
	return new Promise((r, j) => {
		const request: IDBRequest = getIDBObjectStoreInfo(name, 'readonly').get(key);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}

/**
 * @param name 表名
 * @description DBObjectStore.getAll()用于获取对象仓库的记录。该方法返回一个 IDBRequest 对象。等待升级
 * @returns Promise<[]>
 * @error 等待升级
 */
export function getAll<T>(name: string, query?: IDBValidKey | IDBKeyRange | null, count?: number): Promise<T> {
	return new Promise((r, j) => {
		const request: IDBRequest = getIDBObjectStoreInfo(name, 'readonly').getAll();
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
/**
 *
 * @param name 表名
 * @param query
 * @param count
 * @description IDBObjectStore.getAllKeys()用于获取所有符合条件的主键。该方法返回一个 IDBRequest 对象。
 * @error 等待升级
 */
export function getAllKeys<T>(name: string, query: string, count: number): Promise<T> {
	return new Promise((r, j) => {
		const request: IDBRequest = getIDBObjectStoreInfo(name, 'readonly').getAllKeys();
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
/**
 *
 * @param name 表名
 * @param query
 * @param count
 * @description IDBObjectStore.getAllKeys()用于获取所有符合条件的主键。该方法返回一个 IDBRequest 对象。
 */
export function index(name: string) {
	// return new Promise((r, j) => {
	// 	const request: IDBRequest = IDB.transaction(name, 'readonly').objectStore(name).index(name);
	// 	request.onsuccess = () => {
	// 		r(request.result);
	// 	};
	// 	request.onerror = () => {
	// 		j(request.error);
	// 	};
	// });
}
