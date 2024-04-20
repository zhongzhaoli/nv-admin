export function setLocalStorage(key: string, value: any): void {
  window.localStorage.setItem(key, value);
}

export function getLocalStorage(key: string): any {
  return window.localStorage.getItem(key);
}

export function removeLocalStorage(key: string): void {
  window.localStorage.removeItem(key);
}

export function cleanLocalStorage(): void {
  window.localStorage.clear();
}
