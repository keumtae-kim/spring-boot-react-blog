
const StorageType = Object.freeze({
  SESSION:   Symbol("session"),
  LOCAL:  Symbol("local")
});

export const getStorage = (storageType) => {
  if (storageType === StorageType.SESSION) {
    return window.sessionStorage;
  }
  return window.localStorage;
};

const setItem = (storageType) => (key, value) => {
  getStorage(storageType).setItem(key, JSON.stringify(value));
};

const getItem = (storageType) => (key, defaultVal) => {
  const val = getStorage(storageType).getItem(key);
  if (!val || val === 'undefined') return defaultVal;
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
};

const removeItem = (storageType) => (key) => {
  getStorage(storageType).removeItem(key);
};

export const Storage = {
  session: {
    get: getItem(StorageType.SESSION),
    set: setItem(StorageType.SESSION),
    remove: removeItem(StorageType.SESSION)
  },
  local: {
    get: getItem(StorageType.LOCAL),
    set: setItem(StorageType.LOCAL),
    remove: removeItem(StorageType.LOCAL)
  }
};
