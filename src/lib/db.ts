import { openDB, DBSchema } from 'idb';

type dv = typeof DBSchema;

interface UploadRecord {
  id?: number;
  filename: string;
  url: string;
  timestamp: number;
}

interface MyDB extends dv {
  'upload-history': {
    key: number;
    value: UploadRecord;
    indexes: { 'by-timestamp': number };
  };
}

// 检查是否在浏览器环境中
const isBrowser = typeof window !== 'undefined';

// @ts-expect-error
let dbPromise: Promise<ReturnType<typeof openDB<MyDB>>> | null = null;

if (isBrowser) {
  // @ts-expect-error
  // 只有在浏览器中才初始化 dbPromise
  dbPromise = openDB<MyDB>('cloud-storage-upload', 1, {
    upgrade(db: any) {
      const store = db.createObjectStore('upload-history', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('by-timestamp', 'timestamp');
    },
  });
}

export async function addUploadRecord(record: Omit<UploadRecord, 'id'>) {
  if (!dbPromise) throw new Error("Database not initialized");
  const db = await dbPromise;
  return db.add('upload-history', record);
}

export async function getUploadHistory(): Promise<UploadRecord[]> {
  if (!dbPromise) throw new Error("Database not initialized");
  const db = await dbPromise;
  return db.getAllFromIndex('upload-history', 'by-timestamp');
}
