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
 * @param indexName 索引键，非值
 * @param mode 模式 默认readonly
 * @returns IDBIndex
 */
export function getIDBIndex(name: string, indexName: string, mode?: IDBTransactionMode): IDBIndex {
	return getIDBObjectStoreInfo(name, mode).index(indexName);
}
/**
 *
 * @param name 表名
 * @param indexName 索引键，非值
 * @param mode 模式 默认readonly
 * @description ：用来获取记录的数量。它可以接受主键或 IDBKeyRange 对象作为参数，这时只返回符合主键的记录数量，否则返回所有记录的数量。
 * @returns Promise<number>
 */
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
/**
 *
 * @param name 表名
 * @param indexName 索引键，非值
 * @param key 索引键值，非键
 * @param mode 模式 默认readonly
 * @description 用来获取符合指定主键的数据记录。
 * @returns Promise<T>
 */
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
/**
 * @param name 表名
 * @param indexName 索引键，非值
 * @param key 索引键值，非键
 * @param mode 模式 默认readonly
 * @description 用来获取指定的主键值。
 * @returns Promise<IDBValidKey | undefined>
 */
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
/**
 *
 * @param name 表名
 * @param indexName 索引键，非值
 * @param mode 模式 默认readonly
 * @param query 索引键值，非键
 * @param count 数量
 * @description 用来获取所有的数据记录。它可以接受两个参数，都是可选的，第一个参数用来指定主键，第二个参数用来指定返回记录的数量。如果省略这两个参数，则返回所有记录。由于获取成功时，浏览器必须生成所有对象，所以对性能有影响。如果数据集比较大，建议使用 IDBCursor 对象。
 * @returns  Promise<T[]>
 */
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
/**
 *
 * @param name 表名
 * @param indexName 索引键，非值
 * @param mode 模式 默认readonly
 * @param query 索引键值，非键
 * @param count 数量
 * @description 该方法与IDBIndex.getAll()方法相似，区别是获取所有主键。
 * @returns   Promise<IDBValidKey[]>
 */
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
