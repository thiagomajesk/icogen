export function readLocalJson<T>(
  key: string,
  fallback: T,
  errorMessage?: string,
): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    return parseLocalJson(raw, fallback, errorMessage);
  } catch (error) {
    if (errorMessage) {
      console.error(errorMessage, error);
    }
    return fallback;
  }
}

export function parseLocalJson<T>(
  value: string,
  fallback: T,
  errorMessage?: string,
): T {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    if (errorMessage) {
      console.error(errorMessage, error);
    }
    return fallback;
  }
}
