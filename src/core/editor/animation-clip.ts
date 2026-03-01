import { defaultAnimationClip } from "./constants";
import type {
  AnimationClipState,
  AnimationPresetValue,
  AnimationStepTransform,
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

export interface AnimationPresetOption {
  value: AnimationPresetValue;
  label: string;
}

export interface AnimationPresetOptionGroup {
  group: string;
  items: AnimationPresetOption[];
}

interface AnimationPresetCategory {
  group: string;
  presets: AnimationClipPreset[];
}

type Direction = "left" | "right" | "up" | "down";
type Corner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

const BASE_STEP: AnimationStepTransform = {
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  opacity: 1,
  skewX: 0,
  skewY: 0,
};

function step(overrides: Partial<AnimationStepTransform>): AnimationStepTransform {
  return { ...BASE_STEP, ...overrides };
}

function makeThreeStep(
  start: Partial<AnimationStepTransform>,
  middle: Partial<AnimationStepTransform>,
  end: Partial<AnimationStepTransform>,
): ThreeStepAnimation {
  return [step(start), step(middle), step(end)];
}

function labelFromPresetValue(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function makePreset(
  value: Exclude<AnimationPresetValue, "none">,
  steps: ThreeStepAnimation,
  description = `${labelFromPresetValue(value)} motion`,
): AnimationClipPreset {
  return {
    value,
    label: labelFromPresetValue(value),
    description,
    steps,
  };
}

function vectorForDirectionIn(direction: Direction): { x: number; y: number } {
  if (direction === "left") {
    return { x: -1, y: 0 };
  }
  if (direction === "right") {
    return { x: 1, y: 0 };
  }
  if (direction === "up") {
    return { x: 0, y: 1 };
  }
  return { x: 0, y: -1 };
}

function vectorForDirectionOut(direction: Direction): { x: number; y: number } {
  if (direction === "left") {
    return { x: -1, y: 0 };
  }
  if (direction === "right") {
    return { x: 1, y: 0 };
  }
  if (direction === "up") {
    return { x: 0, y: -1 };
  }
  return { x: 0, y: 1 };
}

function vectorForCorner(corner: Corner): { x: number; y: number } {
  if (corner === "topLeft") {
    return { x: -1, y: -1 };
  }
  if (corner === "topRight") {
    return { x: 1, y: -1 };
  }
  if (corner === "bottomLeft") {
    return { x: -1, y: 1 };
  }
  return { x: 1, y: 1 };
}

function makeFadeInSteps(offset: { x: number; y: number }): ThreeStepAnimation {
  return makeThreeStep(
    { x: offset.x, y: offset.y, opacity: 0 },
    { x: -offset.x * 0.1, y: -offset.y * 0.1, opacity: 1 },
    {},
  );
}

function makeFadeOutSteps(offset: { x: number; y: number }): ThreeStepAnimation {
  return makeThreeStep(
    {},
    { x: offset.x * 0.1, y: offset.y * 0.1, opacity: 0.7 },
    { x: offset.x, y: offset.y, opacity: 0 },
  );
}

function makeSlideInSteps(direction: Direction): ThreeStepAnimation {
  const vector = vectorForDirectionIn(direction);
  const distance = 180;
  return makeThreeStep(
    { x: vector.x * distance, y: vector.y * distance },
    { x: -vector.x * 18, y: -vector.y * 18 },
    {},
  );
}

function makeSlideOutSteps(direction: Direction): ThreeStepAnimation {
  const vector = vectorForDirectionOut(direction);
  const distance = 180;
  return makeThreeStep(
    {},
    { x: vector.x * 18, y: vector.y * 18 },
    { x: vector.x * distance, y: vector.y * distance },
  );
}

function makeBackInSteps(direction: Direction): ThreeStepAnimation {
  const vector = vectorForDirectionIn(direction);
  const distance = 150;
  return makeThreeStep(
    { x: vector.x * distance, y: vector.y * distance, scale: 0.72, opacity: 0.3 },
    { x: -vector.x * 16, y: -vector.y * 16, scale: 0.9, opacity: 1 },
    {},
  );
}

function makeBackOutSteps(direction: Direction): ThreeStepAnimation {
  const vector = vectorForDirectionOut(direction);
  const distance = 150;
  return makeThreeStep(
    {},
    { x: vector.x * 16, y: vector.y * 16, scale: 0.92, opacity: 0.8 },
    { x: vector.x * distance, y: vector.y * distance, scale: 0.72, opacity: 0 },
  );
}

function makeBounceInSteps(direction?: Direction): ThreeStepAnimation {
  if (!direction) {
    return makeThreeStep(
      { scale: 0.32, opacity: 0 },
      { scale: 1.08, opacity: 1 },
      {},
    );
  }

  const vector = vectorForDirectionIn(direction);
  const distance = 170;
  return makeThreeStep(
    { x: vector.x * distance, y: vector.y * distance, scale: 0.36, opacity: 0 },
    { x: -vector.x * 28, y: -vector.y * 28, scale: 1.08, opacity: 1 },
    {},
  );
}

function makeBounceOutSteps(direction?: Direction): ThreeStepAnimation {
  if (!direction) {
    return makeThreeStep(
      {},
      { scale: 0.92, opacity: 0.8 },
      { scale: 0.32, opacity: 0 },
    );
  }

  const vector = vectorForDirectionOut(direction);
  const distance = 170;
  return makeThreeStep(
    {},
    { x: vector.x * 24, y: vector.y * 24, scale: 0.92, opacity: 0.85 },
    { x: vector.x * distance, y: vector.y * distance, scale: 0.36, opacity: 0 },
  );
}

function makeZoomInSteps(direction?: Direction): ThreeStepAnimation {
  if (!direction) {
    return makeThreeStep(
      { scale: 0.25, opacity: 0 },
      { scale: 1.08, opacity: 1 },
      {},
    );
  }

  const vector = vectorForDirectionIn(direction);
  const distance = 180;
  return makeThreeStep(
    { x: vector.x * distance, y: vector.y * distance, scale: 0.2, opacity: 0 },
    { x: -vector.x * 20, y: -vector.y * 20, scale: 1.06, opacity: 1 },
    {},
  );
}

function makeZoomOutSteps(direction?: Direction): ThreeStepAnimation {
  if (!direction) {
    return makeThreeStep(
      {},
      { scale: 0.82, opacity: 0.8 },
      { scale: 0.2, opacity: 0 },
    );
  }

  const vector = vectorForDirectionOut(direction);
  const distance = 180;
  return makeThreeStep(
    {},
    { x: vector.x * 20, y: vector.y * 20, scale: 0.88, opacity: 0.8 },
    { x: vector.x * distance, y: vector.y * distance, scale: 0.2, opacity: 0 },
  );
}

function makeRotateInSteps(
  angle: number,
  offset: { x: number; y: number } = { x: 0, y: 0 },
): ThreeStepAnimation {
  return makeThreeStep(
    { x: offset.x, y: offset.y, rotate: angle, opacity: 0 },
    { x: -offset.x * 0.12, y: -offset.y * 0.12, rotate: angle * 0.2, opacity: 1 },
    {},
  );
}

function makeRotateOutSteps(
  angle: number,
  offset: { x: number; y: number } = { x: 0, y: 0 },
): ThreeStepAnimation {
  return makeThreeStep(
    {},
    { x: offset.x * 0.12, y: offset.y * 0.12, rotate: angle * 0.2, opacity: 0.85 },
    { x: offset.x, y: offset.y, rotate: angle, opacity: 0 },
  );
}

const ATTENTION_SEEKER_PRESETS: AnimationClipPreset[] = [
  makePreset(
    "bounce",
    makeThreeStep(
      {},
      { y: -26, scale: 1.04 },
      { y: 10, scale: 0.98 },
    ),
    "Vertical bounce",
  ),
  makePreset("flash", makeThreeStep({}, { opacity: 0.18 }, { opacity: 1 })),
  makePreset(
    "pulse",
    makeThreeStep(
      {},
      { scale: 1.12 },
      { scale: 0.96 },
    ),
    "Soft breathing scale",
  ),
  makePreset(
    "rubberBand",
    makeThreeStep(
      {},
      { scale: 1.14, skewX: 6, skewY: -4 },
      { scale: 0.92, skewX: -6, skewY: 4 },
    ),
  ),
  makePreset("shakeX", makeThreeStep({}, { x: -20 }, { x: 20 })),
  makePreset("shakeY", makeThreeStep({}, { y: -20 }, { y: 20 })),
  makePreset("headShake", makeThreeStep({}, { x: -14, rotate: -6 }, { x: 14, rotate: 6 })),
  makePreset("swing", makeThreeStep({}, { rotate: -12 }, { rotate: 12 })),
  makePreset("tada", makeThreeStep({}, { scale: 1.08, rotate: -7 }, { scale: 0.92, rotate: 7 })),
  makePreset("wobble", makeThreeStep({}, { x: -22, rotate: -6 }, { x: 18, rotate: 5 })),
  makePreset("jello", makeThreeStep({}, { skewX: 16, skewY: -8 }, { skewX: -12, skewY: 6 })),
  makePreset("heartBeat", makeThreeStep({}, { scale: 1.14 }, { scale: 0.92 })),
];

const BACK_ENTRANCE_PRESETS: AnimationClipPreset[] = ([
  { value: "backInDown", direction: "down" },
  { value: "backInLeft", direction: "left" },
  { value: "backInRight", direction: "right" },
  { value: "backInUp", direction: "up" },
] as const).map(({ value, direction }) =>
  makePreset(value, makeBackInSteps(direction), "Back entrance motion"),
);

const BACK_EXIT_PRESETS: AnimationClipPreset[] = ([
  { value: "backOutDown", direction: "down" },
  { value: "backOutLeft", direction: "left" },
  { value: "backOutRight", direction: "right" },
  { value: "backOutUp", direction: "up" },
] as const).map(({ value, direction }) =>
  makePreset(value, makeBackOutSteps(direction), "Back exit motion"),
);

const BOUNCE_ENTRANCE_PRESETS: AnimationClipPreset[] = [
  makePreset("bounceIn", makeBounceInSteps(), "Bounce entrance"),
  ...([
    { value: "bounceInDown", direction: "down" },
    { value: "bounceInLeft", direction: "left" },
    { value: "bounceInRight", direction: "right" },
    { value: "bounceInUp", direction: "up" },
  ] as const).map(({ value, direction }) =>
    makePreset(value, makeBounceInSteps(direction), "Bounce entrance"),
  ),
];

const BOUNCE_EXIT_PRESETS: AnimationClipPreset[] = [
  makePreset("bounceOut", makeBounceOutSteps(), "Bounce exit"),
  ...([
    { value: "bounceOutDown", direction: "down" },
    { value: "bounceOutLeft", direction: "left" },
    { value: "bounceOutRight", direction: "right" },
    { value: "bounceOutUp", direction: "up" },
  ] as const).map(({ value, direction }) =>
    makePreset(value, makeBounceOutSteps(direction), "Bounce exit"),
  ),
];

const FADE_ENTRANCE_PRESETS: AnimationClipPreset[] = [
  makePreset("fadeIn", makeFadeInSteps({ x: 0, y: 0 }), "Fade entrance"),
  ...[
    { value: "fadeInDown", offset: { x: 0, y: -90 } },
    { value: "fadeInDownBig", offset: { x: 0, y: -180 } },
    { value: "fadeInLeft", offset: { x: -90, y: 0 } },
    { value: "fadeInLeftBig", offset: { x: -180, y: 0 } },
    { value: "fadeInRight", offset: { x: 90, y: 0 } },
    { value: "fadeInRightBig", offset: { x: 180, y: 0 } },
    { value: "fadeInUp", offset: { x: 0, y: 90 } },
    { value: "fadeInUpBig", offset: { x: 0, y: 180 } },
  ].map(({ value, offset }) =>
    makePreset(value, makeFadeInSteps(offset), "Fade entrance"),
  ),
  ...([
    { value: "fadeInTopLeft", corner: "topLeft" },
    { value: "fadeInTopRight", corner: "topRight" },
    { value: "fadeInBottomLeft", corner: "bottomLeft" },
    { value: "fadeInBottomRight", corner: "bottomRight" },
  ] as const).map(({ value, corner }) =>
    makePreset(
      value,
      makeFadeInSteps({
        x: vectorForCorner(corner).x * 120,
        y: vectorForCorner(corner).y * 120,
      }),
      "Fade entrance",
    ),
  ),
];

const FADE_EXIT_PRESETS: AnimationClipPreset[] = [
  makePreset("fadeOut", makeFadeOutSteps({ x: 0, y: 0 }), "Fade exit"),
  ...[
    { value: "fadeOutDown", offset: { x: 0, y: 90 } },
    { value: "fadeOutDownBig", offset: { x: 0, y: 180 } },
    { value: "fadeOutLeft", offset: { x: -90, y: 0 } },
    { value: "fadeOutLeftBig", offset: { x: -180, y: 0 } },
    { value: "fadeOutRight", offset: { x: 90, y: 0 } },
    { value: "fadeOutRightBig", offset: { x: 180, y: 0 } },
    { value: "fadeOutUp", offset: { x: 0, y: -90 } },
    { value: "fadeOutUpBig", offset: { x: 0, y: -180 } },
  ].map(({ value, offset }) =>
    makePreset(value, makeFadeOutSteps(offset), "Fade exit"),
  ),
  ...([
    { value: "fadeOutTopLeft", corner: "topLeft" },
    { value: "fadeOutTopRight", corner: "topRight" },
    { value: "fadeOutBottomLeft", corner: "bottomLeft" },
    { value: "fadeOutBottomRight", corner: "bottomRight" },
  ] as const).map(({ value, corner }) =>
    makePreset(
      value,
      makeFadeOutSteps({
        x: vectorForCorner(corner).x * 120,
        y: vectorForCorner(corner).y * 120,
      }),
      "Fade exit",
    ),
  ),
];

const FLIPPER_PRESETS: AnimationClipPreset[] = [
  makePreset("flip", makeThreeStep({ rotate: -12, scale: 0.94 }, { rotate: 12, scale: 1.04 }, {})),
  makePreset(
    "flipInX",
    makeThreeStep(
      { rotate: -90, opacity: 0 },
      { rotate: 12, opacity: 1 },
      {},
    ),
  ),
  makePreset(
    "flipInY",
    makeThreeStep(
      { skewY: -45, opacity: 0 },
      { skewY: 10, opacity: 1 },
      {},
    ),
  ),
  makePreset(
    "flipOutX",
    makeThreeStep(
      {},
      { rotate: 20, opacity: 0.8 },
      { rotate: 90, opacity: 0 },
    ),
  ),
  makePreset(
    "flipOutY",
    makeThreeStep(
      {},
      { skewY: -14, opacity: 0.8 },
      { skewY: 45, opacity: 0 },
    ),
  ),
];

const LIGHTSPEED_PRESETS: AnimationClipPreset[] = [
  makePreset(
    "lightSpeedInRight",
    makeThreeStep(
      { x: 180, skewX: -28, opacity: 0 },
      { x: -24, skewX: 12, opacity: 1 },
      {},
    ),
  ),
  makePreset(
    "lightSpeedInLeft",
    makeThreeStep(
      { x: -180, skewX: 28, opacity: 0 },
      { x: 24, skewX: -12, opacity: 1 },
      {},
    ),
  ),
  makePreset(
    "lightSpeedOutRight",
    makeThreeStep(
      {},
      { x: 24, skewX: -12, opacity: 0.8 },
      { x: 180, skewX: 28, opacity: 0 },
    ),
  ),
  makePreset(
    "lightSpeedOutLeft",
    makeThreeStep(
      {},
      { x: -24, skewX: 12, opacity: 0.8 },
      { x: -180, skewX: -28, opacity: 0 },
    ),
  ),
];

const ROTATE_ENTRANCE_PRESETS: AnimationClipPreset[] = [
  makePreset("rotateIn", makeRotateInSteps(-90), "Rotate entrance"),
  ...[
    { value: "rotateInDownLeft", angle: -50, offset: { x: -120, y: -120 } },
    { value: "rotateInDownRight", angle: 50, offset: { x: 120, y: -120 } },
    { value: "rotateInUpLeft", angle: 50, offset: { x: -120, y: 120 } },
    { value: "rotateInUpRight", angle: -50, offset: { x: 120, y: 120 } },
  ].map(({ value, angle, offset }) =>
    makePreset(value, makeRotateInSteps(angle, offset), "Rotate entrance"),
  ),
];

const ROTATE_EXIT_PRESETS: AnimationClipPreset[] = [
  makePreset("rotateOut", makeRotateOutSteps(90), "Rotate exit"),
  ...[
    { value: "rotateOutDownLeft", angle: 50, offset: { x: -120, y: 120 } },
    { value: "rotateOutDownRight", angle: -50, offset: { x: 120, y: 120 } },
    { value: "rotateOutUpLeft", angle: -50, offset: { x: -120, y: -120 } },
    { value: "rotateOutUpRight", angle: 50, offset: { x: 120, y: -120 } },
  ].map(({ value, angle, offset }) =>
    makePreset(value, makeRotateOutSteps(angle, offset), "Rotate exit"),
  ),
];

const SPECIAL_PRESETS: AnimationClipPreset[] = [
  makePreset(
    "hinge",
    makeThreeStep(
      {},
      { rotate: 75, y: 20 },
      { rotate: 70, y: 180, opacity: 0 },
    ),
  ),
  makePreset(
    "jackInTheBox",
    makeThreeStep(
      { scale: 0.12, rotate: 30, opacity: 0 },
      { scale: 0.8, rotate: -12, opacity: 1 },
      {},
    ),
  ),
  makePreset(
    "rollIn",
    makeThreeStep(
      { x: -180, rotate: -120, opacity: 0 },
      { x: 24, rotate: 14, opacity: 1 },
      {},
    ),
  ),
  makePreset(
    "rollOut",
    makeThreeStep(
      {},
      { x: -24, rotate: -14, opacity: 0.8 },
      { x: 180, rotate: 120, opacity: 0 },
    ),
  ),
];

const ZOOM_ENTRANCE_PRESETS: AnimationClipPreset[] = [
  makePreset("zoomIn", makeZoomInSteps(), "Zoom entrance"),
  ...([
    { value: "zoomInDown", direction: "down" },
    { value: "zoomInLeft", direction: "left" },
    { value: "zoomInRight", direction: "right" },
    { value: "zoomInUp", direction: "up" },
  ] as const).map(({ value, direction }) =>
    makePreset(value, makeZoomInSteps(direction), "Zoom entrance"),
  ),
];

const ZOOM_EXIT_PRESETS: AnimationClipPreset[] = [
  makePreset("zoomOut", makeZoomOutSteps(), "Zoom exit"),
  ...([
    { value: "zoomOutDown", direction: "down" },
    { value: "zoomOutLeft", direction: "left" },
    { value: "zoomOutRight", direction: "right" },
    { value: "zoomOutUp", direction: "up" },
  ] as const).map(({ value, direction }) =>
    makePreset(value, makeZoomOutSteps(direction), "Zoom exit"),
  ),
];

const SLIDE_ENTRANCE_PRESETS: AnimationClipPreset[] = ([
  { value: "slideInDown", direction: "down" },
  { value: "slideInLeft", direction: "left" },
  { value: "slideInRight", direction: "right" },
  { value: "slideInUp", direction: "up" },
] as const).map(({ value, direction }) =>
  makePreset(value, makeSlideInSteps(direction), "Slide entrance"),
);

const SLIDE_EXIT_PRESETS: AnimationClipPreset[] = ([
  { value: "slideOutDown", direction: "down" },
  { value: "slideOutLeft", direction: "left" },
  { value: "slideOutRight", direction: "right" },
  { value: "slideOutUp", direction: "up" },
] as const).map(({ value, direction }) =>
  makePreset(value, makeSlideOutSteps(direction), "Slide exit"),
);

const ANIMATION_PRESET_CATEGORIES: AnimationPresetCategory[] = [
  { group: "Attention seekers", presets: ATTENTION_SEEKER_PRESETS },
  { group: "Back entrances", presets: BACK_ENTRANCE_PRESETS },
  { group: "Back exits", presets: BACK_EXIT_PRESETS },
  { group: "Bouncing entrances", presets: BOUNCE_ENTRANCE_PRESETS },
  { group: "Bouncing exits", presets: BOUNCE_EXIT_PRESETS },
  { group: "Fading entrances", presets: FADE_ENTRANCE_PRESETS },
  { group: "Fading exits", presets: FADE_EXIT_PRESETS },
  { group: "Flippers", presets: FLIPPER_PRESETS },
  { group: "Light speed", presets: LIGHTSPEED_PRESETS },
  { group: "Rotating entrances", presets: ROTATE_ENTRANCE_PRESETS },
  { group: "Rotating exits", presets: ROTATE_EXIT_PRESETS },
  { group: "Specials", presets: SPECIAL_PRESETS },
  { group: "Zooming entrances", presets: ZOOM_ENTRANCE_PRESETS },
  { group: "Zooming exits", presets: ZOOM_EXIT_PRESETS },
  { group: "Sliding entrances", presets: SLIDE_ENTRANCE_PRESETS },
  { group: "Sliding exits", presets: SLIDE_EXIT_PRESETS },
];

export const ANIMATION_PRESETS: AnimationClipPreset[] = ANIMATION_PRESET_CATEGORIES.flatMap(
  (category) => category.presets,
);

export const ANIMATION_PRESET_OPTIONS: AnimationPresetOptionGroup[] = [
  {
    group: "General",
    items: [{ value: "none", label: "None" }],
  },
  ...ANIMATION_PRESET_CATEGORIES.map((category) => ({
    group: category.group,
    items: category.presets.map((preset) => ({
      value: preset.value,
      label: preset.label,
    })),
  })),
];

const ANIMATION_PRESET_BY_VALUE = new Map(
  ANIMATION_PRESETS.map((preset) => [preset.value, preset]),
);

export function resolveAnimationPresetSteps(
  presetValue: AnimationPresetValue,
): ThreeStepAnimation | null {
  if (presetValue === "none") {
    return null;
  }

  const preset = ANIMATION_PRESET_BY_VALUE.get(presetValue);
  return preset?.steps ?? null;
}

function normalizePresetValue(input: unknown): AnimationPresetValue {
  if (input === "none") {
    return "none";
  }

  if (typeof input === "string") {
    if (ANIMATION_PRESET_BY_VALUE.has(input as AnimationPresetValue)) {
      return input as AnimationPresetValue;
    }
  }

  return defaultAnimationClip.preset;
}

export function normalizeAnimationClipState(
  clip: Partial<AnimationClipState> | null | undefined,
): AnimationClipState {
  const preset = normalizePresetValue(clip?.preset);

  return {
    preset,
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
