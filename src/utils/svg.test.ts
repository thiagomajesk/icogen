import assert from "node:assert/strict";
import test from "node:test";
import { defaultAnimation, defaultBackground, defaultBaseLayer, defaultEffects, defaultForeground, defaultOverlayLayer } from "../core/constants";
import {
  buildCompositeSvg,
  buildPreviewTransform,
} from "./svg";

test("buildPreviewTransform interpolates animation values", () => {
  const transform = buildPreviewTransform(
    {
      ...defaultAnimation,
      startX: 0,
      endX: 100,
      startScale: 1,
      endScale: 2,
    },
    0.5,
  );

  assert.deepEqual(transform, {
    x: 50,
    y: 0,
    scale: 1.5,
    rotate: 0,
  });
});

test("buildCompositeSvg creates deterministic output for the same inputs", () => {
  const background = {
    ...defaultBackground,
    type: "flat" as const,
    flatColor: "#112233",
    shape: "circle" as const,
  };
  const foreground = {
    ...defaultForeground,
    clipToBackground: true,
  };

  const first = buildCompositeSvg(
    defaultBaseLayer,
    defaultOverlayLayer,
    defaultEffects,
    defaultAnimation,
    background,
    foreground,
    new Map(),
    null,
  );

  const second = buildCompositeSvg(
    defaultBaseLayer,
    defaultOverlayLayer,
    defaultEffects,
    defaultAnimation,
    background,
    foreground,
    new Map(),
    null,
  );

  assert.equal(first, second);
  assert.match(first, /clip-path="url\(#bg-clip\)"/);
  assert.match(first, /fill="#112233"/);
});

test(
  "buildCompositeSvg preserves layer defs referenced by inner fills",
  { skip: typeof DOMParser === "undefined" },
  () => {
    const baseWithDefs = {
      ...defaultBaseLayer,
      path: "custom/defs.svg",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="layer-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ff0000" /><stop offset="100%" stop-color="#00ff00" /></linearGradient></defs><path fill="url(#layer-grad)" d="M80 80L432 80L256 432Z"/></svg>`,
    };

    const composite = buildCompositeSvg(
      baseWithDefs,
      defaultOverlayLayer,
      defaultEffects,
      defaultAnimation,
      defaultBackground,
      null,
      new Map(),
      null,
    );

    assert.match(composite, /<linearGradient id="layer-grad"/);
    assert.match(composite, /fill="url\(#layer-grad\)"/);
  },
);
