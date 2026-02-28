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
import { defaultAnimationClip, defaultBackground, defaultForeground } from "./constants";

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
  animationClip: defaultAnimationClip,
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

const animationPathSettings = {
  enabled: true,
  pathClips: {
    "piece-2": {
      preset: "bounce" as const,
      durationMs: 900,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    },
  },
};

const defaultSettings = {
  background: defaultBackground,
  foreground: defaultForeground,
  animationClip: defaultAnimationClip,
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

test("animation path settings are persisted and restored", () => {
  localStorageMock.clear();

  saveIconSettings("manticore", {
    ...settings,
    animationPaths: animationPathSettings,
  });

  const restored = loadIconSettings("manticore");
  assert.deepEqual(restored?.animationPaths, animationPathSettings);
});

test("animation path settings keep an icon entry even with default base settings", () => {
  localStorageMock.clear();

  saveIconSettings("chimera", {
    ...defaultSettings,
    animationPaths: animationPathSettings,
  });

  const restored = loadIconSettings("chimera");
  assert.notEqual(restored, null);
  assert.deepEqual(restored?.animationPaths, animationPathSettings);
});

test("loadIconSettings normalizes legacy surface styles with missing shadow fields", () => {
  localStorageMock.clear();

  const legacyBackground = {
    ...defaultBackground,
    flatColor: "#123456",
  } as Record<string, unknown>;
  delete legacyBackground.shadowEnabled;
  delete legacyBackground.shadowMode;
  delete legacyBackground.shadowColor;
  delete legacyBackground.shadowBlur;
  delete legacyBackground.shadowOffsetX;
  delete legacyBackground.shadowOffsetY;

  const legacyForeground = {
    ...defaultForeground,
    flatColor: "#abcdef",
  } as Record<string, unknown>;
  delete legacyForeground.shadowEnabled;
  delete legacyForeground.shadowMode;
  delete legacyForeground.shadowColor;
  delete legacyForeground.shadowBlur;
  delete legacyForeground.shadowOffsetX;
  delete legacyForeground.shadowOffsetY;

  localStorageMock.setItem(
    "icon-history",
    JSON.stringify({
      legacy: {
        background: legacyBackground,
        foreground: legacyForeground,
      },
    }),
  );

  const restored = loadIconSettings("legacy");
  assert.notEqual(restored, null);
  assert.equal(restored?.background.flatColor, "#123456");
  assert.equal(restored?.foreground.flatColor, "#abcdef");
  assert.equal(restored?.background.shadowEnabled, false);
  assert.equal(restored?.background.shadowMode, "outer");
  assert.equal(restored?.foreground.shadowEnabled, false);
  assert.equal(restored?.foreground.shadowMode, "outer");
});

test("loadIconSettings normalizes legacy foreground path styles", () => {
  localStorageMock.clear();

  const legacyPathStyle = {
    ...defaultForeground,
    flatColor: "#33aaee",
  } as Record<string, unknown>;
  delete legacyPathStyle.shadowEnabled;
  delete legacyPathStyle.shadowMode;
  delete legacyPathStyle.shadowColor;
  delete legacyPathStyle.shadowBlur;
  delete legacyPathStyle.shadowOffsetX;
  delete legacyPathStyle.shadowOffsetY;

  localStorageMock.setItem(
    "icon-history",
    JSON.stringify({
      legacy: {
        background: defaultBackground,
        foreground: defaultForeground,
        foregroundPaths: {
          enabled: true,
          selectedPathId: "piece-9",
          pathStyles: {
            "piece-9": legacyPathStyle,
          },
        },
      },
    }),
  );

  const restored = loadIconSettings("legacy");
  assert.notEqual(restored?.foregroundPaths, undefined);
  assert.equal(restored?.foregroundPaths?.pathStyles["piece-9"]?.flatColor, "#33aaee");
  assert.equal(
    restored?.foregroundPaths?.pathStyles["piece-9"]?.shadowEnabled,
    false,
  );
  assert.equal(restored?.foregroundPaths?.pathStyles["piece-9"]?.shadowMode, "outer");
});

test("loadIconSettings adds default animation clip for legacy settings", () => {
  localStorageMock.clear();
  localStorageMock.setItem(
    "icon-history",
    JSON.stringify({
      legacy: {
        background: defaultBackground,
        foreground: defaultForeground,
      },
    }),
  );

  const restored = loadIconSettings("legacy");
  assert.deepEqual(restored?.animationClip, defaultAnimationClip);
});

test("loadIconSettings normalizes legacy animation path clips", () => {
  localStorageMock.clear();
  localStorageMock.setItem(
    "icon-history",
    JSON.stringify({
      legacy: {
        background: defaultBackground,
        foreground: defaultForeground,
        animationPaths: {
          enabled: true,
          pathClips: {
            "piece-1": {
              preset: "pulse",
              durationMs: 745.2,
              ease: "",
              loop: true,
              alternate: true,
              targetPathId: "piece-1",
            },
            "piece-2": {
              preset: "none",
              durationMs: 1200,
              ease: "inOutSine",
              loop: true,
              alternate: true,
            },
          },
        },
      },
    }),
  );

  const restored = loadIconSettings("legacy");
  assert.notEqual(restored?.animationPaths, undefined);
  assert.deepEqual(restored?.animationPaths?.pathClips["piece-1"], {
    preset: "pulse",
    durationMs: 745,
    ease: "inOutSine",
    loop: true,
    alternate: true,
  });
  assert.equal(restored?.animationPaths?.pathClips["piece-2"], undefined);
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

test("loadRecentIconAccesses migrates legacy key to the new key", () => {
  localStorageMock.clear();
  localStorageMock.setItem(
    "recent-icon-accesses",
    JSON.stringify(["lorc/acid-blob.svg", 123, "cathelineau/boar.svg"]),
  );

  const recent = loadRecentIconAccesses();

  assert.deepEqual(recent, ["lorc/acid-blob.svg", "cathelineau/boar.svg"]);
  assert.equal(localStorageMock.getItem("recent-icon-accesses"), null);
  assert.equal(
    localStorageMock.getItem("recent-icons"),
    JSON.stringify(["lorc/acid-blob.svg", "cathelineau/boar.svg"]),
  );
});

test("loadRecentIconAccesses returns empty for invalid JSON payload shapes", () => {
  localStorageMock.clear();
  localStorageMock.setItem("recent-icons", JSON.stringify({ wrong: true }));
  assert.deepEqual(loadRecentIconAccesses(), []);
});

test("saveRecentIconAccess ignores empty paths", () => {
  localStorageMock.clear();

  let updateCount = 0;
  const listener = () => {
    updateCount += 1;
  };

  windowMock.addEventListener(ICON_ACCESSES_UPDATED_EVENT, listener);
  saveRecentIconAccess("");
  windowMock.removeEventListener(ICON_ACCESSES_UPDATED_EVENT, listener);

  assert.equal(updateCount, 0);
  assert.deepEqual(loadRecentIconAccesses(), []);
});

test("icon history APIs return safe fallbacks when storage throws", () => {
  localStorageMock.clear();

  const originalGetItem = localStorageMock.getItem;
  const originalSetItem = localStorageMock.setItem;
  const originalRemoveItem = localStorageMock.removeItem;
  const originalConsoleError = console.error;
  const errors: unknown[] = [];

  console.error = (...args: unknown[]) => {
    errors.push(args);
  };

  localStorageMock.getItem = () => {
    throw new Error("getItem failed");
  };
  localStorageMock.setItem = () => {
    throw new Error("setItem failed");
  };
  localStorageMock.removeItem = () => {
    throw new Error("removeItem failed");
  };

  assert.deepEqual(loadIconHistory(), {});
  assert.equal(getCurrentIcon(), null);
  assert.equal(loadIconSettings("any"), null);
  assert.deepEqual(loadRecentIconAccesses(), []);

  saveIconSettings("shield", settings);
  saveRecentIconAccess("lorc/acid-blob.svg");
  clearIconHistory();
  setCurrentIcon("falcon");
  setCurrentIcon(null);

  localStorageMock.getItem = originalGetItem;
  localStorageMock.setItem = originalSetItem;
  localStorageMock.removeItem = originalRemoveItem;
  console.error = originalConsoleError;

  assert.equal(errors.length > 0, true);
});
