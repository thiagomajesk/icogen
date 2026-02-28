import assert from "node:assert/strict";
import test from "node:test";
import "../dom-shim";
import { defaultForeground } from "../../src/core/constants";
import type { ForegroundStyleState } from "../../src/core/types";
import { buildForegroundComposite } from "../../src/utils/foreground-composite";

const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#000" d="M1 1L2 2Z"/><path fill="#fff" d="M3 3L4 4Z"/></svg>`;

test("buildForegroundComposite keeps regular composite flow when path styling is disabled", () => {
  const foreground: ForegroundStyleState = {
    ...defaultForeground,
    type: "flat",
    flatColor: "#abcdef",
  };

  const result = buildForegroundComposite({
    svg: sampleSvg,
    foreground,
    pathConfig: {
      enabled: false,
      pathStyles: {},
    },
  });

  assert.equal(result.svg, sampleSvg);
  assert.equal(result.foregroundForComposite, foreground);
});

test("buildForegroundComposite creates path-styled SVG and consumes foreground when enabled", () => {
  const flatForeground: ForegroundStyleState = {
    ...defaultForeground,
    type: "flat",
    flatColor: "#123456",
  };
  const noneForeground: ForegroundStyleState = {
    ...defaultForeground,
    type: "none",
  };

  const result = buildForegroundComposite({
    svg: sampleSvg,
    foreground: flatForeground,
    pathConfig: {
      enabled: true,
      pathStyles: {
        "piece-2": noneForeground,
      },
    },
    blink: {
      pathId: "piece-1",
      token: 7,
    },
  });

  assert.equal(result.foregroundForComposite, null);
  assert.match(result.svg, /data-foreground-piece-id="piece-1" data-blink-token="7"/);
  assert.match(result.svg, /fill="#123456"/);
  assert.match(result.svg, /data-foreground-piece-id="piece-2"/);
  assert.match(result.svg, /fill="none"/);
});
