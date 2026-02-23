import assert from "node:assert/strict";
import test from "node:test";
import { splitPathDataOnMoveTo } from "./svg-breakout";

test("splitPathDataOnMoveTo keeps single-subpath path untouched", () => {
  const pathData = "M10 10L20 20L30 10Z";
  assert.deepEqual(splitPathDataOnMoveTo(pathData), [pathData]);
});

test("splitPathDataOnMoveTo splits multiple subpaths", () => {
  const pathData = "M10 10L20 20Z M40 40L50 50Z M70 70L90 90Z";
  assert.deepEqual(splitPathDataOnMoveTo(pathData), [
    "M10 10L20 20Z",
    "M40 40L50 50Z",
    "M70 70L90 90Z",
  ]);
});

test("splitPathDataOnMoveTo splits relative lowercase move commands", () => {
  const pathData = "m10 10 l20 20 z m40 40 l10 10 z";
  assert.deepEqual(splitPathDataOnMoveTo(pathData), [
    "M10 10l20 20 z",
    "M50 50l10 10 z",
  ]);
});

test("splitPathDataOnMoveTo splits only on absolute move commands", () => {
  const pathData = "m10 10 l20 20 z M40 40L50 50Z M70 70L90 90Z";
  assert.deepEqual(splitPathDataOnMoveTo(pathData), [
    "M10 10l20 20 z",
    "M40 40L50 50Z",
    "M70 70L90 90Z",
  ]);
});

test("splitPathDataOnMoveTo converts extra relative moveto pairs to relative lineto", () => {
  const pathData = "M0 0zm10 10 5 0z";
  assert.deepEqual(splitPathDataOnMoveTo(pathData), [
    "M0 0z",
    "M10 10 l5 0z",
  ]);
});
