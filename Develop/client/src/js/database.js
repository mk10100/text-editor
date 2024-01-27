import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const id = await store.put({ content });
  console.log(`Added content with ID: ${id}`);
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const allContent = await store.getAll();
  console.log("All content retrieved:", allContent);
  return allContent;
};

initdb();
