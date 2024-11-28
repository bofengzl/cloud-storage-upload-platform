import { openDB,DBSchema } from 'idb';

interface UploadRecord {
  id?: number;
  filename: string;
  url: string;
  timestamp: number;
}

interface MyDB extends DBSchema {
  'upload-history': {
    key: number;
    value: UploadRecord;
    indexes: { 'by-timestamp': number };
  };
}

// @ts-ignore
const dbPromise = openDB<MyDB>('cloud-storage-upload', 1, {
  upgrade(db) {
    const store = db.createObjectStore('upload-history', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('by-timestamp', 'timestamp');
  },
});

export async function addUploadRecord(record: Omit<UploadRecord, 'id'>) {
  const db = await dbPromise;
  return db.add('upload-history', record);
}

export async function getUploadHistory(): Promise<UploadRecord[]> {
  const db = await dbPromise;
  return db.getAllFromIndex('upload-history', 'by-timestamp');
}

