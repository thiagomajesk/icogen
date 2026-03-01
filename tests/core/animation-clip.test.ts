import assert from "node:assert/strict";
import test from "node:test";
import {
  ANIMATION_PRESET_OPTIONS,
  defaultAnimationClip,
  isDefaultAnimationClipState,
  normalizeAnimationClipState,
  resolveAnimationPresetSteps,
} from "../../src/core/editor";
import type { AnimationClipState } from "../../src/core/editor";

test("normalizeAnimationClipState returns defaults for invalid input", () => {
  const normalized = normalizeAnimationClipState(null);
  assert.deepEqual(normalized, defaultAnimationClip);
});

test("normalizeAnimationClipState ignores unknown extra fields", () => {
  const normalized = normalizeAnimationClipState(
    { enabled: true } as unknown as Partial<AnimationClipState>,
  );

  assert.equal(normalized.preset, "none");
});

test("normalizeAnimationClipState rejects unknown presets", () => {
  const normalized = normalizeAnimationClipState({
    preset: "custom-unsupported-preset" as AnimationClipState["preset"],
  });

  assert.equal(normalized.preset, "none");
});

test("resolveAnimationPresetSteps returns null for none", () => {
  assert.equal(resolveAnimationPresetSteps("none"), null);
});

test("resolveAnimationPresetSteps returns three steps for bounce", () => {
  const steps = resolveAnimationPresetSteps("bounce");
  assert.notEqual(steps, null);
  assert.equal(steps?.length, 3);
  assert.equal((steps?.[1].y ?? 0) < 0, true);
});

test("resolveAnimationPresetSteps supports animate.css presets", () => {
  const steps = resolveAnimationPresetSteps("lightSpeedInRight");
  assert.notEqual(steps, null);
  assert.equal(steps?.length, 3);
  assert.equal((steps?.[0].opacity ?? 0) < 1, true);
});

test("ANIMATION_PRESET_OPTIONS is grouped and starts with none", () => {
  assert.ok(ANIMATION_PRESET_OPTIONS.length > 1);
  assert.equal(ANIMATION_PRESET_OPTIONS[0]?.items[0]?.value, "none");
  assert.ok(
    ANIMATION_PRESET_OPTIONS.some((group) => group.group === "Attention seekers"),
  );
});

test("isDefaultAnimationClipState detects non-default preset", () => {
  const modified = {
    ...defaultAnimationClip,
    preset: "pulse" as const,
  };
  const targetOnly = {
    ...defaultAnimationClip,
    targetPathId: "piece-3",
  };

  assert.equal(isDefaultAnimationClipState(defaultAnimationClip), true);
  assert.equal(isDefaultAnimationClipState(targetOnly), true);
  assert.equal(isDefaultAnimationClipState(modified), false);
});
