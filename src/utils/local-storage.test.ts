import assert from "node:assert/strict";
import test from "node:test";
import { parseLocalJson, readLocalJson } from "./local-storage";

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

function createMemoryStorage(): StorageLike {
  const values = new Map<string, string>();
  return {
    getItem(key) {
      return values.has(key) ? values.get(key)! : null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
    removeItem(key) {
      values.delete(key);
    },
    clear() {
      values.clear();
    },
  };
}

const localStorageMock = createMemoryStorage();
Object.assign(globalThis, { localStorage: localStorageMock });

test("readLocalJson returns parsed JSON for existing keys", () => {
  localStorageMock.clear();
  localStorageMock.setItem("prefs", JSON.stringify({ page: 3 }));
  assert.deepEqual(readLocalJson("prefs", { page: 1 }), { page: 3 });
});

test("readLocalJson returns fallback for missing keys", () => {
  localStorageMock.clear();
  assert.deepEqual(readLocalJson("missing", { page: 1 }), { page: 1 });
});

test("readLocalJson returns fallback for invalid JSON", () => {
  localStorageMock.clear();
  localStorageMock.setItem("broken", "{nope}");
  assert.deepEqual(readLocalJson("broken", { page: 2 }), { page: 2 });
});

test("readLocalJson returns fallback when storage throws", () => {
  const originalGetItem = localStorageMock.getItem;
  localStorageMock.getItem = () => {
    throw new Error("storage down");
  };
  assert.deepEqual(readLocalJson("any", { page: 4 }), { page: 4 });
  localStorageMock.getItem = originalGetItem;
});

test("readLocalJson logs error message when provided and storage fails", () => {
  const originalConsoleError = console.error;
  const errors: unknown[][] = [];
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };

  localStorageMock.setItem("bad", "not-json");
  readLocalJson("bad", null, "Read failed:");

  console.error = originalConsoleError;

  assert.equal(errors.length, 1);
  assert.equal(errors[0][0], "Read failed:");
});

test("readLocalJson does not log when no error message is provided", () => {
  const originalConsoleError = console.error;
  let logged = false;
  console.error = () => {
    logged = true;
  };

  localStorageMock.setItem("bad", "not-json");
  readLocalJson("bad", null);

  console.error = originalConsoleError;

  assert.equal(logged, false);
});

test("parseLocalJson returns parsed value for valid JSON", () => {
  assert.deepEqual(parseLocalJson('{"a":1}', {}), { a: 1 });
  assert.deepEqual(parseLocalJson("[1,2,3]", []), [1, 2, 3]);
});

test("parseLocalJson returns fallback for invalid JSON", () => {
  assert.deepEqual(parseLocalJson("{bad}", { x: 0 }), { x: 0 });
});

test("parseLocalJson logs error message when provided", () => {
  const originalConsoleError = console.error;
  const errors: unknown[][] = [];
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };

  parseLocalJson("{bad}", null, "Parse failed:");

  console.error = originalConsoleError;

  assert.equal(errors.length, 1);
  assert.equal(errors[0][0], "Parse failed:");
});
