import assert from "node:assert/strict";
import test from "node:test";
import {
  clearIconHistory,
  getCurrentIcon,
  ICON_ACCESSES_UPDATED_EVENT,
  loadIconHistory,
  loadRecentIconAccesses,
  loadIconSettings,
  saveIconSettings,
  saveRecentIconAccess,
  setCurrentIcon,
  ICON_HISTORY_UPDATED_EVENT,
} from "./icon-history";
import { defaultBackground, defaultForeground } from "./constants";

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

function createMemoryStorage(): StorageLike {
  const store = new Map<string, string>();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key, value) {
      store.set(key, value);
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

type Listener = (event: Event) => void;

function createWindowMock() {
  const listeners = new Map<string, Set<Listener>>();

  return {
    addEventListener(type: string, listener: Listener) {
      const entry = listeners.get(type) ?? new Set<Listener>();
      entry.add(listener);
      listeners.set(type, entry);
    },
    removeEventListener(type: string, listener: Listener) {
      listeners.get(type)?.delete(listener);
    },
    dispatchEvent(event: Event): boolean {
      for (const listener of listeners.get(event.type) ?? []) {
        listener(event);
      }
      return true;
    },
  };
}

const localStorageMock = createMemoryStorage();
const windowMock = createWindowMock();

Object.assign(globalThis, {
  localStorage: localStorageMock,
  window: windowMock,
});

const settings = {
  background: {
    ...defaultBackground,
    flatColor: "#112233",
  },
  foreground: {
    ...defaultForeground,
    flatColor: "#aabbcc",
  },
};

const foregroundPathSettings = {
  enabled: true,
  selectedPathId: "piece-2",
  pathStyles: {
    "piece-2": {
      ...defaultForeground,
      flatColor: "#44aaff",
    },
  },
};

const defaultSettings = {
  background: defaultBackground,
  foreground: defaultForeground,
};

test("icon history persists and restores icon settings", () => {
  localStorageMock.clear();

  saveIconSettings("crossbow", settings);

  const restored = loadIconSettings("crossbow");
  assert.deepEqual(restored, settings);
});

test("icon history keeps only the latest 10 entries", () => {
  localStorageMock.clear();

  for (let index = 1; index <= 11; index += 1) {
    saveIconSettings(`icon-${index}`, settings);
  }

  const history = loadIconHistory();
  assert.equal(Object.keys(history).length, 10);
  assert.equal(history["icon-1"], undefined);
  assert.notEqual(history["icon-11"], undefined);
});

test("current icon can be set, loaded, and cleared", () => {
  localStorageMock.clear();

  setCurrentIcon("falcon");
  assert.equal(getCurrentIcon(), "falcon");

  setCurrentIcon(null);
  assert.equal(getCurrentIcon(), null);
});

test("saving and clearing history dispatches update events", () => {
  localStorageMock.clear();

  let updateCount = 0;
  const listener = () => {
    updateCount += 1;
  };

  windowMock.addEventListener(ICON_HISTORY_UPDATED_EVENT, listener);
  saveIconSettings("shield", settings);
  clearIconHistory();
  windowMock.removeEventListener(ICON_HISTORY_UPDATED_EVENT, listener);

  assert.equal(updateCount, 2);
});

test("default settings are not persisted and reset removes existing entry", () => {
  localStorageMock.clear();

  saveIconSettings("falcon", defaultSettings);
  assert.equal(loadIconSettings("falcon"), null);

  saveIconSettings("falcon", settings);
  assert.deepEqual(loadIconSettings("falcon"), settings);

  saveIconSettings("falcon", defaultSettings);
  assert.equal(loadIconSettings("falcon"), null);
});

test("foreground path settings are persisted and restored", () => {
  localStorageMock.clear();

  saveIconSettings("hydra", {
    ...settings,
    foregroundPaths: foregroundPathSettings,
  });

  const restored = loadIconSettings("hydra");
  assert.deepEqual(restored?.foregroundPaths, foregroundPathSettings);
});

test("foreground path settings keep an icon entry even with default surface styles", () => {
  localStorageMock.clear();

  saveIconSettings("wyrm", {
    ...defaultSettings,
    foregroundPaths: foregroundPathSettings,
  });

  const restored = loadIconSettings("wyrm");
  assert.notEqual(restored, null);
  assert.deepEqual(restored?.foregroundPaths, foregroundPathSettings);
});

test("recent icon accesses keep latest 100 unique entries", () => {
  localStorageMock.clear();

  for (let index = 1; index <= 101; index += 1) {
    saveRecentIconAccess(`category/icon-${index}.svg`);
  }

  saveRecentIconAccess("category/icon-80.svg");

  const recent = loadRecentIconAccesses();
  assert.equal(recent.length, 100);
  assert.equal(recent[0], "category/icon-80.svg");
  assert.equal(recent.includes("category/icon-1.svg"), false);
});

test("saving icon accesses dispatches update events", () => {
  localStorageMock.clear();

  let updateCount = 0;
  const listener = () => {
    updateCount += 1;
  };

  windowMock.addEventListener(ICON_ACCESSES_UPDATED_EVENT, listener);
  saveRecentIconAccess("lorc/acid-blob.svg");
  windowMock.removeEventListener(ICON_ACCESSES_UPDATED_EVENT, listener);

  assert.equal(updateCount, 1);
});
