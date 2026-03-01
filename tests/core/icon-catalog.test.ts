import assert from "node:assert/strict";
import test from "node:test";
import {
  clearIconsLockFileCache,
  fetchLocalIconSvg,
  fetchLocalIconsPage,
  getLocalIconPath,
  getLocalIconStats,
  loadIconsLockFile,
} from "../../src/core/icon-catalog";

const lockFilePayload = {
  syncedAt: "2026-02-28T00:00:00.000Z",
  iconCount: 3,
  icons: [
    {
      path: "lorc/acid-blob.svg",
      name: "Acid Blob",
      author: "Lorc",
      description: null,
      tags: ["goo", "acid"],
      externalUrl: null,
    },
    {
      path: "delapouite/boar.svg",
      name: "Boar",
      author: "Delapouite",
      description: null,
      tags: ["animal"],
      externalUrl: null,
    },
    {
      path: "cathelineau/goo-heart.svg",
      name: "Goo Heart",
      author: "Cathelineau",
      description: null,
      tags: ["goo", "heart"],
      externalUrl: null,
    },
  ],
};

test("loadIconsLockFile throws on non-ok responses", async () => {
  clearIconsLockFileCache();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    return {
      ok: false,
      status: 503,
    } as Response;
  }) as typeof fetch;

  try {
    await assert.rejects(() => loadIconsLockFile(), /503/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("loadIconsLockFile caches successful responses", async () => {
  clearIconsLockFileCache();

  const originalFetch = globalThis.fetch;
  let fetchCount = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    fetchCount += 1;
    assert.equal(String(input), "/icons.lock.json");

    return {
      ok: true,
      status: 200,
      json: async () => lockFilePayload,
    } as Response;
  }) as typeof fetch;

  try {
    const first = await loadIconsLockFile();
    const second = await loadIconsLockFile();

    assert.equal(fetchCount, 1);
    assert.equal(first, second);
    assert.equal(first.iconCount, 3);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("fetchLocalIconsPage filters and paginates from lock file", async () => {
  clearIconsLockFileCache();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    assert.equal(String(input), "/icons.lock.json");

    return {
      ok: true,
      status: 200,
      json: async () => lockFilePayload,
    } as Response;
  }) as typeof fetch;

  try {
    const firstPage = await fetchLocalIconsPage(1, 1, "goo");
    const secondPage = await fetchLocalIconsPage(2, 1, "goo");

    assert.equal(firstPage.total, 2);
    assert.equal(firstPage.icons.length, 1);
    assert.equal(firstPage.icons[0]?.path, "lorc/acid-blob.svg");

    assert.equal(secondPage.total, 2);
    assert.equal(secondPage.icons.length, 1);
    assert.equal(secondPage.icons[0]?.path, "cathelineau/goo-heart.svg");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("fetchLocalIconSvg loads icon markup and reports failures", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);

    if (url === "/icons/lorc/acid-blob.svg") {
      return {
        ok: true,
        status: 200,
        text: async () => "<svg id=\"acid\" />",
      } as Response;
    }

    return {
      ok: false,
      status: 404,
      text: async () => "",
    } as Response;
  }) as typeof fetch;

  try {
    assert.equal(getLocalIconPath("lorc/acid-blob.svg"), "/icons/lorc/acid-blob.svg");
    const svg = await fetchLocalIconSvg("lorc/acid-blob.svg");
    assert.equal(svg, "<svg id=\"acid\" />");

    await assert.rejects(
      () => fetchLocalIconSvg("unknown/missing.svg"),
      /Failed to load icon: 404/,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getLocalIconStats reflects lock metadata", async () => {
  clearIconsLockFileCache();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    assert.equal(String(input), "/icons.lock.json");

    return {
      ok: true,
      status: 200,
      json: async () => lockFilePayload,
    } as Response;
  }) as typeof fetch;

  try {
    const stats = await getLocalIconStats();
    assert.deepEqual(stats, {
      remoteTotal: 3,
      localTotal: 3,
      missingTotal: 0,
      missingSample: [],
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
