import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT request to update the J.A.T.E database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const req = store.put({ id: 1, value: content });
  const res = await req;
  console.log('Data saved to the J.A.T.E database', res);

};


export const getDb = async () => {
  console.log('GET from the J.A.T.E database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const req = store.getAll();
  const res = await req;
  console.log('result.value', res);
  return res?.value;

};

initdb();
