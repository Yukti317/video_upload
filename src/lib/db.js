
import { openDB } from "idb";
let dbPromise;

export function getDB() {
  if (typeof window === "undefined") return null;

  if (!dbPromise) {
    dbPromise = openDB("video-gallery", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("videos")) {
          db.createObjectStore("videos", { keyPath: "id", autoIncrement: true });
        }
      },
    });
  }

  return dbPromise;
}

export async function addVideo(file) {
  const db = getDB();
  if (!db) return;
  return (await db).add("videos", { file });
}

export async function getAllVideos() {
  const db = getDB();
  if (!db) return [];
  return (await db).getAll("videos");
}
