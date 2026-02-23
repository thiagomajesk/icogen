import assert from "node:assert/strict";
import test from "node:test";
import { iconLabel, parseNumber, slugify } from "./format";

test("parseNumber returns fallback for invalid values", () => {
  assert.equal(parseNumber("42"), 42);
  assert.equal(parseNumber("oops", 7), 7);
  assert.equal(parseNumber(undefined, 9), 9);
});

test("slugify keeps identifiers simple and URL-safe", () => {
  assert.equal(slugify("  Fire & Ice / 2026  "), "fire-ice-2026");
  assert.equal(slugify("---"), "");
});

test("iconLabel converts icon paths into human-readable labels", () => {
  assert.equal(iconLabel("delapouite/coffee-pot.svg"), "coffee pot");
  assert.equal(iconLabel("plain-name"), "plain name");
});
