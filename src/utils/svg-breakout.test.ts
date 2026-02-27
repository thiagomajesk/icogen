import assert from "node:assert/strict";
import test from "node:test";
import "../test/dom-shim";
import { defaultForeground } from "../core/constants";
import { buildForegroundStyledSvg, parseSvgBreakout, splitPathDataOnMoveTo } from "./svg-breakout";

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

test("splitPathDataOnMoveTo normalizes a relative moveto with no trailing lineto pairs", () => {
  assert.deepEqual(splitPathDataOnMoveTo("m10 10 z"), ["M10 10z"]);
});

test("splitPathDataOnMoveTo returns empty for blank input", () => {
  assert.deepEqual(splitPathDataOnMoveTo("  "), []);
});

test("splitPathDataOnMoveTo keeps unknown path text as a single chunk", () => {
  assert.deepEqual(splitPathDataOnMoveTo("----"), ["----"]);
});

test("splitPathDataOnMoveTo handles all major SVG commands without splitting", () => {
  const pathData = "M0 0L10 10l1 2H8h2V9v1C1 2 3 4 5 6c1 1 1 1 2 2S1 1 2 2s1 1 2 2Q1 1 2 2q1 1 2 2T3 3t1 1A1 1 0 0 1 4 4a1 1 0 0 1 1 1Z";
  const chunks = splitPathDataOnMoveTo(pathData);
  assert.equal(chunks.length, 1);
  assert.equal(chunks[0], pathData);
});

test("splitPathDataOnMoveTo handles uppercase quadratic commands in cursor advancement", () => {
  const chunks = splitPathDataOnMoveTo("M0 0Q5 5 10 10 M20 20L30 30");
  assert.deepEqual(chunks, ["M0 0Q5 5 10 10", "M20 20L30 30"]);
});

test("parseSvgBreakout extracts defs, labels pieces, and preserves parent transforms", () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g1"><stop offset="0%" stop-color="#111"/></linearGradient></defs><g transform="translate(2 4)" opacity="0.5"><path id="snake" fill="#000" d="M0 0L10 10Z M20 20L30 30Z" /><path id="wing" fill="#000" d="M40 40L45 45Z" /></g><circle cx="10" cy="10" r="6" /><rect id="box" x="1" y="1" width="8" height="8" /></svg>`;
  const parsed = parseSvgBreakout(svg, new Map(), new Map());

  assert.equal(parsed.viewBox, "0 0 64 64");
  assert.match(parsed.defs, /<linearGradient id="g1"/);
  assert.equal(parsed.defs.includes("<defs"), false);
  assert.deepEqual(
    parsed.pieces.map((piece) => piece.label),
    ["snake 1", "snake 2", "wing", "Circle 1", "box"],
  );
  assert.match(parsed.pieces[2].markup, /transform="translate\(2 4\)"/);
  assert.match(parsed.pieces[2].markup, /opacity="0.5"/);
});

test("parseSvgBreakout uses cache and handles SVG without defs", () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M1 1L2 2Z" /></svg>`;
  const cache = new Map();
  const compositeCache = new Map();
  const first = parseSvgBreakout(svg, cache, compositeCache);
  const second = parseSvgBreakout(svg, cache, compositeCache);

  assert.equal(first, second);
  assert.equal(first.defs, "");
  assert.equal(first.pieces.length, 1);
});

test("buildForegroundStyledSvg applies per-piece styles, gradients, and blink ordering", () => {
  const breakout = {
    viewBox: "0 0 64 64",
    defs: `<linearGradient id="existing"><stop offset="0%" stop-color="#000"/></linearGradient>`,
    inner: "",
    pieces: [
      { id: "piece-1", label: "one", markup: `<path fill="#000" d="M1 1L2 2Z" />` },
      { id: "piece-2", label: "two", markup: `<path style="fill:#fff;stroke:#222" d="M2 2L3 3Z" />` },
      { id: "piece-3", label: "three", markup: `<circle fill="#00ff00" cx="5" cy="5" r="2" />` },
      { id: "piece-4", label: "four", markup: `<rect x="1" y="1" width="4" height="4" />` },
    ],
  };

  const svg = buildForegroundStyledSvg(
    breakout,
    {
      ...defaultForeground,
      type: "flat",
      flatColor: "#123456",
    },
    {
      "piece-2": {
        ...defaultForeground,
        type: "gradient",
        gradientType: "vertical",
        gradientFrom: "#101010",
        gradientTo: "#f0f0f0",
        blendMode: "screen",
        blendOpacity: 0.4,
        shadowEnabled: true,
        shadowMode: "outer",
        shadowColor: "#224466",
        shadowBlur: 5,
        shadowOffsetX: 3,
        shadowOffsetY: -2,
        strokeStyle: "dashed",
        frameWidth: 2,
        frameColor: "#ff00ff",
      },
      "piece-3": {
        ...defaultForeground,
        type: "none",
        shadowEnabled: true,
        shadowMode: "inner",
        shadowColor: "#ff000080",
        shadowBlur: 6,
        shadowOffsetX: -1,
        shadowOffsetY: 4,
      },
      "piece-4": {
        ...defaultForeground,
        type: "none",
        frameRotate: 20,
        frameScale: 120,
        positionX: 10,
        positionY: -10,
        skewX: 5,
        skewY: -2,
        strokeStyle: "dotted",
        frameWidth: 3,
        frameColor: "#00aa00",
      },
    },
    { pathId: "piece-2", token: 42 },
  );

  assert.match(svg, /id="aikon-piece-hover-vignette"/);
  assert.match(svg, /id="existing"/);
  assert.match(svg, /id="fg-piece-gradient-1"/);
  assert.match(svg, /id="fg-piece-inner-shadow-1"/);
  assert.match(svg, /data-foreground-piece-id="piece-1"/);
  assert.match(svg, /fill="#123456"/);
  assert.match(svg, /data-foreground-piece-id="piece-2" data-blink-token="42"/);
  assert.match(svg, /<animate attributeName="opacity"/);
  assert.match(
    svg,
    /<g style="filter:drop-shadow\(3px -2px 5px #224466\);mix-blend-mode:screen;opacity:0.4;">/,
  );
  assert.match(svg, /fill:url\(#fg-piece-gradient-1\)/);
  assert.match(svg, /stroke:#ff00ff/);
  assert.match(svg, /stroke-width:2/);
  assert.match(svg, /stroke-dasharray:8,4/);
  assert.match(svg, /data-foreground-piece-id="piece-3" filter="url\(#fg-piece-inner-shadow-1\)"/);
  assert.match(svg, /fill="#00ff00"/);
  assert.match(svg, /data-foreground-piece-id="piece-4"/);
  assert.match(
    svg,
    /translate\(256 256\) translate\(25.6 -25.6\) rotate\(20\) scale\(1.2 1.2\) skewX\(5\) skewY\(-2\) translate\(-256 -256\)/,
  );
  assert.match(svg, /stroke="#00aa00"/);
  assert.match(svg, /stroke-dasharray="3,3"/);
  assert.match(svg, /stroke-linecap="round"/);
  assert.match(svg, /fill="none"/);

  const piece1Index = svg.indexOf('data-foreground-piece-id="piece-1"');
  const piece2Index = svg.indexOf('data-foreground-piece-id="piece-2"');
  const piece4Index = svg.indexOf('data-foreground-piece-id="piece-4"');
  assert.equal(piece2Index > piece4Index && piece4Index > piece1Index, true);
});
