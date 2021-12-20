const version = 2;
const IDBDatabaseName = 'byl-indexedDB';
const objectStoreNames: Array<DatabaseStore> = [
	{
		name: 'banner',
		isDelete: false,
		options: { keyPath: 'bannerId' },
		storeIndex: [
			{
				indexName: 'pic',
				keyPath: 'pic',
				objectParameters: { unique: false },
			},
		],
		deleteIndex: ['name', 'id'],
	},
	{
		name: 'test',
		isDelete: false,
		options: { autoIncrement: true },
		storeIndex: [
			{
				indexName: 'id',
				keyPath: 'id',
				objectParameters: { unique: false },
			},
		],
		deleteIndex: ['name', 'id'],
	},
];

export { version, IDBDatabaseName, objectStoreNames };
