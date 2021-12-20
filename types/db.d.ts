declare let IDB: IDBDatabase;
/**
 * @param indexName 索引名
 * @param keyPath 主键
 * @param objectParameters 配置对象（可选）
 * @description IDBObjectStore.createIndex()方法用于新建当前数据库的一个索引。该方法只能在VersionChange监听函数里面调用。
 */
declare interface StoreParameters {
	indexName: string;
	keyPath: string | string[];
	objectParameters?: IDBIndexParameters;
}
/**
 * @param name 表名
 * @param isDelete 是否删除当前表
 * @param options 表配置属性：主键，递增
 * @param storeIndex 索引创建属性StoreParameters
 * @description IDBObjectStore创建配置以及表索引配置
 */
declare interface DatabaseStore {
	name: string;
	isDelete?: boolean;
	options?: IDBObjectStoreParameters;
	storeIndex?: Array<StoreParameters>;
	deleteIndex?: Array<string>;
}
