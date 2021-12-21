import { getIDBObjectStoreInfo } from '@p/Dexie/objectStore';
/**
 * IDBIndex 对象
 * IDBIndex 对象代表数据库的索引，通过这个对象可以获取数据库里面的记录。
 * 数据记录的主键默认就是带有索引，IDBIndex 对象主要用于通过除主键以外的其他键，建立索引获取对象。
 * IDBIndex 是持久性的键值对存储。只要插入、更新或删除数据记录，引用的对象库中的记录，索引就会自动更新。
 */
/**
 *
 * @param name 表名
 * @param indexName 索引图
 * @param mode 模式
 * @returns IDBIndex
 */
export function getIDBIndex(name: string, indexName: string, mode?: IDBTransactionMode): IDBIndex {
	return getIDBObjectStoreInfo(name, mode).index(indexName);
}
export function count(name: string, indexName: string, mode?: IDBTransactionMode): Promise<number> {
	return new Promise((r, j) => {
		const request = getIDBIndex(name, indexName, mode).count();
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}

export function get<T>(
	name: string,
	indexName: string,
	key: IDBValidKey | IDBKeyRange,
	mode?: IDBTransactionMode,
): Promise<T> {
	return new Promise((r, j) => {
		const request = getIDBIndex(name, indexName, mode).get(key);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
export function getKey(
	name: string,
	indexName: string,
	key: IDBValidKey | IDBKeyRange,
	mode?: IDBTransactionMode,
): Promise<IDBValidKey | undefined> {
	return new Promise((r, j) => {
		const request = getIDBIndex(name, indexName, mode).getKey(key);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
export function getAll<T>(
	name: string,
	indexName: string,
	mode?: IDBTransactionMode,
	query?: IDBValidKey | IDBKeyRange | null,
	count?: number,
): Promise<T[]> {
	return new Promise((r, j) => {
		const request = getIDBIndex(name, indexName, mode).getAll(query, count);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
export function getAllKeys(
	name: string,
	indexName: string,
	mode?: IDBTransactionMode,
	query?: IDBValidKey | IDBKeyRange | null,
	count?: number,
): Promise<IDBValidKey[]> {
	return new Promise((r, j) => {
		const request = getIDBIndex(name, indexName, mode).getAllKeys(query, count);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
