const isBrowser = typeof window !== "undefined";

export const getItem = (key) => {
  if (!isBrowser) return null;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const setItem = (key, value) => {
  if (!isBrowser) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const removeItem = (key) => {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(key);
  } catch {}
};