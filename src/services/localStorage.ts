// localStorage.ts
import { version } from "../../package.json";

interface StorageItem<T> {
  value: T;
  expiry: number;
  version: string;
}

/**
 * Save data to local storage with an expiration time
 * @param key - The key under which the data will be stored
 * @param value - The data to be stored
 * @param days - The number of days after which the data will expire
 */
export function saveToLocalStorage<T = string>(key: string, value: T, days: number = 7): void {
  try {
    const now = new Date();
    const expiry = now.getTime() + days * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const storageItem: StorageItem<T> = { value, expiry, version };
    const serializedValue = JSON.stringify(storageItem);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
}

function versionIsValid(storageItem: StorageItem<unknown>): boolean {
  const [appMajor, appMinor] = version.split(".");
  const [storageMajor, storageMinor] = storageItem.version.split(".");
  return appMajor === storageMajor && appMinor === storageMinor;
}

/**
 * Retrieve data from local storage
 * @param key - The key under which the data is stored
 * @returns The retrieved data or null if the key does not exist or has expired
 */
export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    const storageItem: StorageItem<T> = JSON.parse(serializedValue);
    const now = new Date();
    if (now.getTime() > storageItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    if (!versionIsValid(storageItem)) {
      console.warn("Version mismatch in local storage data");
      return null;
    }
    return storageItem.value;
  } catch (error) {
    console.error("Error retrieving from local storage", error);
    return null;
  }
}

/**
 * Remove data from local storage
 * @param key - The key under which the data is stored
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from local storage", error);
  }
}
