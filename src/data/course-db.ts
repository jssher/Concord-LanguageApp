export const COURSE_REV = "12";

export function openCourseDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("concord-course", 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("levels")) db.createObjectStore("levels");
      if (!db.objectStoreNames.contains("packs")) db.createObjectStore("packs");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
