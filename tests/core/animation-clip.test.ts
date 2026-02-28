import assert from "node:assert/strict";
import test from "node:test";
import { defaultAnimationClip } from "../../src/core/constants";
import type { AnimationClipState } from "../../src/core/types";
import {
  ANIMATION_PRESET_OPTIONS,
  isDefaultAnimationClipState,
  normalizeAnimationClipState,
  resolveAnimationPresetSteps,
} from "../../src/core/animation-clip";

test("normalizeAnimationClipState returns defaults for invalid input", () => {
  const normalized = normalizeAnimationClipState(null);
  assert.deepEqual(normalized, defaultAnimationClip);
});

test("normalizeAnimationClipState upgrades legacy enabled state", () => {
  const normalized = normalizeAnimationClipState(
    { enabled: true } as unknown as Partial<AnimationClipState>,
  );

  assert.equal(normalized.preset, "headShake");
});

test("normalizeAnimationClipState maps legacy wiggle preset", () => {
  const normalized = normalizeAnimationClipState({
    preset: "wiggle" as AnimationClipState["preset"],
  });

  assert.equal(normalized.preset, "headShake");
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
