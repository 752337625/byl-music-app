import { getIDBObjectStoreInfo } from '@p/Dexie/objectStore';
import { getIDBIndex } from '@p/Dexie/index';
/**
 * IDBCursor 对象代表指针对象，用来遍历数据仓库（IDBObjectStore）或索引（IDBIndex）的记录。
 * @param name 表名
 * @param query 索引键，非值
 * @param direction 字符串，表示指针遍历的方向。共有四个可能的值：next（从头开始向后遍历）、nextunique（从头开始向后遍历，重复的值只遍历一次）、prev（从尾部开始向前遍历）、prevunique（从尾部开始向前遍历，重复的值只遍历一次）。该属性通过IDBObjectStore.openCursor()方法的第二个参数指定，一旦指定就不能改变了。
 * @param mode 模式 默认readonly
 * @description 用来获取一个 IDBCursor 对象，用来遍历IDBObjectStore里面的所有条目。
 * @list IDBCursor.source：返回正在遍历的对象仓库或索引。
 * @list IDBCursor.direction：字符串，表示指针遍历的方向。共有四个可能的值：next（从头开始向后遍历）、nextunique（从头开始向后遍历，重复的值只遍历一次）、* prev（从尾部开始向前遍历）、prevunique（从尾部开始向前遍历，重复的值只遍历一次）。该属性通过IDBObjectStore.openCursor()方法的第二个参数指定，一旦指定就*不能改变了。
 * @list IDBCursor.key：返回当前记录的主键。
 * @list IDBCursor.value：返回当前记录的数据值。
 * @list IDBCursor.primaryKey：返回当前记录的主键。对于数据仓库（objectStore）来说，这个属性等同于 IDBCursor.key；对于索引，IDBCursor.key 返回索引的位* 置值，该属性返回数据记录的主键。
 * @list IDBCursor 对象有如下方法。
 * @list IDBCursor.advance(n)：指针向前移动 n 个位置。
 * @list IDBCursor.continue()：指针向前移动一个位置。它可以接受一个主键作为参数，这时会跳转到这个主键。
 * @list IDBCursor.continuePrimaryKey()：该方法需要两个参数，第一个是key，第二个是primaryKey，将指针移到符合这两个参数的位置。
 * @list IDBCursor.delete()：用来删除当前位置的记录，返回一个 IDBRequest 对象。该方法不会改变指针的位置。
 * @list IDBCursor.update()：用来更新当前位置的记录，返回一个 IDBRequest 对象。它的参数是要写入数据库的新的值。
 * @returns IDBRequest<IDBCursorWithValue | null>
 * @emits 游标的方法不建议封装可能会进去多次调用
 */
export function getStoreCursor(
	name: string,
	mode?: IDBTransactionMode,
	query?: IDBValidKey | IDBKeyRange | null,
	direction?: IDBCursorDirection,
): Promise<IDBCursorWithValue | null> {
	return new Promise((r, j) => {
		const request = getIDBObjectStoreInfo(name, mode).openCursor(query, direction);
		request.onsuccess = event => {
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
 * @param query 索引键，非值
 * @param direction 字符串，表示指针遍历的方向。共有四个可能的值：next（从头开始向后遍历）、nextunique（从头开始向后遍历，重复的值只遍历一次）
 *、prev（从尾部开始向前遍历）、prevunique（从尾部开始向前遍历，重复的值只遍历一次）。该属性通过IDBObjectStore.openCursor()方法的第二个参数 指定，
 * 一旦指定就不能改变了。
 * @param mode 模式 默认readonly
 * @description 用来获取一个 IDBCursor 对象，用来遍历IDBObjectStore里面的所有条目。
 * @list IDBCursor.source：返回正在遍历的对象仓库或索引。
 * @list IDBCursor.direction：字符串，表示指针遍历的方向。共有四个可能的值：next（从头开始向后遍历）、nextunique（从头开始向后遍历，重复的值只遍历一次）、* prev（从尾部开始向前遍历）、prevunique（从尾部开始向前遍历，重复的值只遍历一次）。该属性通过IDBObjectStore.openCursor()方法的第二个参数指定，一旦指定就*不能改变了。
 * @list IDBCursor.key：返回当前记录的主键。
 * @list IDBCursor.value：返回当前记录的数据值。
 * @list IDBCursor.primaryKey：返回当前记录的主键。对于数据仓库（objectStore）来说，这个属性等同于 IDBCursor.key；对于索引，IDBCursor.key 返回索引的位* 置值，该属性返回数据记录的主键。
 * @list IDBCursor 对象有如下方法。
 * @list IDBCursor.advance(n)：指针向前移动 n 个位置。
 * @list IDBCursor.continue()：指针向前移动一个位置。它可以接受一个主键作为参数，这时会跳转到这个主键。
 * @list IDBCursor.continuePrimaryKey()：该方法需要两个参数，第一个是key，第二个是primaryKey，将指针移到符合这两个参数的位置。
 * @list IDBCursor.delete()：用来删除当前位置的记录，返回一个 IDBRequest 对象。该方法不会改变指针的位置。
 * @list IDBCursor.update()：用来更新当前位置的记录，返回一个 IDBRequest 对象。它的参数是要写入数据库的新的值。
 * @returns IDBRequest<IDBCursorWithValue | null>
 */
export function getIndexCursor(
	name: string,
	indexName: string,
	mode?: IDBTransactionMode,
	query?: IDBValidKey | IDBKeyRange | null,
	direction?: IDBCursorDirection,
): Promise<IDBCursorWithValue | null> {
	return new Promise((r, j) => {
		const request = getIDBIndex(name, indexName, mode).openCursor(query, direction);
		request.onsuccess = () => {
			r(request.result);
		};
		request.onerror = () => {
			j(request.error);
		};
	});
}
// /**
//  *
//  * @param name
//  * @param mode
//  * @param query
//  * @param direction
//  * @param index
//  * @description 指针向前移动 n 个位置。
//  * @error advance函数参数必须大于0的整数
//  */
// export function storeAdvance(
// 	name: string,
// 	index: number,
// 	mode?: IDBTransactionMode,
// 	query?: IDBValidKey | IDBKeyRange | null,
// 	direction?: IDBCursorDirection,
// ) {
// 	const cursor = getStoreCursor(name, mode, query, direction);
// 	cursor.then(res => {
// 		res = res as IDBCursorWithValue;
// 		res.advance(index);
// 	});
// }
// /**
//  *
//  * @param name
//  * @param mode
//  * @param query
//  * @param direction
//  * @param index
//  * @description 指针向前移动一个位置。它可以接受一个主键作为参数，这时会跳转到这个主键。
//  * @error advance函数参数必须大于0的整数
//  */
// export function storeContinue(
// 	name: string,
// 	key?: IDBValidKey,
// 	mode?: IDBTransactionMode,
// 	query?: IDBValidKey | IDBKeyRange | null,
// 	direction?: IDBCursorDirection,
// ) {
// 	const cursor = getStoreCursor(name, mode, query, direction);
// 	cursor.then(res => {
// 		res = res as IDBCursorWithValue;
// 		res.continue(key);
// 	});
// }
