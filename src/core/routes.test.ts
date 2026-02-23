import assert from "node:assert/strict";
import test from "node:test";
import { buildEditorPath, parseAppRoute, routeToIconPath } from "./routes";

test("parseAppRoute parses home and gallery routes", () => {
  assert.deepEqual(parseAppRoute("/"), { kind: "home" });
  assert.deepEqual(parseAppRoute("/gallery"), { kind: "gallery" });
  assert.deepEqual(parseAppRoute("/gallery/"), { kind: "gallery" });
});

test("parseAppRoute parses icon route and decodes URL components", () => {
  assert.deepEqual(parseAppRoute("/lorc/acid-blob"), {
    kind: "icon",
    category: "lorc",
    icon: "acid-blob",
  });

  assert.deepEqual(parseAppRoute("/custom%20set/icon%20name"), {
    kind: "icon",
    category: "custom set",
    icon: "icon name",
  });
});

test("parseAppRoute returns null for invalid routes", () => {
  assert.equal(parseAppRoute("/unknown"), null);
  assert.equal(parseAppRoute("/editor"), null);
  assert.deepEqual(parseAppRoute("/editor/only-category"), {
    kind: "icon",
    category: "editor",
    icon: "only-category",
  });
  assert.equal(parseAppRoute("/a/b/c"), null);
});

test("buildEditorPath and routeToIconPath are inverse for valid icon paths", () => {
  const path = buildEditorPath("lorc/acid-blob.svg");
  assert.equal(path, "/lorc/acid-blob");

  const route = parseAppRoute(path!);
  assert.ok(route && route.kind === "icon");
  assert.equal(routeToIconPath(route), "lorc/acid-blob.svg");
});
