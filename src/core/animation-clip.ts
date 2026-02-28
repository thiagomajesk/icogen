import { defaultAnimationClip } from "./constants";
import type {
  AnimationClipState,
  AnimationPresetValue,
  ThreeStepAnimation,
} from "./types";

export interface AnimationClipPreset {
  value: Exclude<AnimationPresetValue, "none">;
  label: string;
  description: string;
  steps: ThreeStepAnimation;
}

export const ANIMATION_EASING_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "linear", label: "Linear" },
  { value: "inOutSine", label: "InOut Sine" },
  { value: "inOutQuad", label: "InOut Quad" },
  { value: "inOutBack", label: "InOut Back" },
  { value: "outElastic", label: "Out Elastic" },
  { value: "inOutExpo", label: "InOut Expo" },
];

export const ANIMATION_PRESET_OPTIONS: Array<{
  value: AnimationPresetValue;
  label: string;
}> = [
  { value: "none", label: "None" },
  { value: "wiggle", label: "Wiggle" },
  { value: "bounce", label: "Bounce" },
  { value: "pulse", label: "Pulse" },
];

export const ANIMATION_PRESETS: AnimationClipPreset[] = [
  {
    value: "wiggle",
    label: "Wiggle",
    description: "Side-to-side sway",
    steps: [
      { x: 0, y: 0, scale: 1, rotate: 0 },
      { x: -14, y: 0, scale: 1, rotate: -8 },
      { x: 14, y: 0, scale: 1, rotate: 8 },
    ],
  },
  {
    value: "bounce",
    label: "Bounce",
    description: "Vertical bounce",
    steps: [
      { x: 0, y: 0, scale: 1, rotate: 0 },
      { x: 0, y: -26, scale: 1.04, rotate: 0 },
      { x: 0, y: 10, scale: 0.98, rotate: 0 },
    ],
  },
  {
    value: "pulse",
    label: "Pulse",
    description: "Soft breathing scale",
    steps: [
      { x: 0, y: 0, scale: 1, rotate: 0 },
      { x: 0, y: 0, scale: 1.12, rotate: 0 },
      { x: 0, y: 0, scale: 0.96, rotate: 0 },
    ],
  },
];

export function resolveAnimationPresetSteps(
  presetValue: AnimationPresetValue,
): ThreeStepAnimation | null {
  if (presetValue === "none") {
    return null;
  }

  const preset = ANIMATION_PRESETS.find((entry) => entry.value === presetValue);
  return preset?.steps ?? null;
}

function normalizePresetValue(input: unknown): AnimationPresetValue {
  if (
    input === "none" ||
    input === "wiggle" ||
    input === "bounce" ||
    input === "pulse"
  ) {
    return input;
  }

  return defaultAnimationClip.preset;
}

export function normalizeAnimationClipState(
  clip: Partial<AnimationClipState> | null | undefined,
): AnimationClipState {
  // Backward compatibility with previous shape where `enabled` existed.
  const legacyEnabled =
    clip && typeof (clip as Record<string, unknown>).enabled === "boolean"
      ? Boolean((clip as Record<string, unknown>).enabled)
      : false;

  const preset = normalizePresetValue(clip?.preset);

  return {
    preset: preset === "none" && legacyEnabled ? "wiggle" : preset,
    durationMs:
      typeof clip?.durationMs === "number" && Number.isFinite(clip.durationMs)
        ? Math.max(200, Math.round(clip.durationMs))
        : defaultAnimationClip.durationMs,
    ease:
      typeof clip?.ease === "string" && clip.ease.trim().length > 0
        ? clip.ease
        : defaultAnimationClip.ease,
    loop: typeof clip?.loop === "boolean" ? clip.loop : defaultAnimationClip.loop,
    alternate:
      typeof clip?.alternate === "boolean"
        ? clip.alternate
        : defaultAnimationClip.alternate,
    targetPathId:
      typeof clip?.targetPathId === "string" && clip.targetPathId.length > 0
        ? clip.targetPathId
        : null,
  };
}

export function isDefaultAnimationClipState(clip: AnimationClipState): boolean {
  return (
    clip.preset === defaultAnimationClip.preset &&
    clip.durationMs === defaultAnimationClip.durationMs &&
    clip.ease === defaultAnimationClip.ease &&
    clip.loop === defaultAnimationClip.loop &&
    clip.alternate === defaultAnimationClip.alternate
  );
}
