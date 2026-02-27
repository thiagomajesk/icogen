import { defaultBackground, defaultForeground } from "./constants";
import type { SurfaceStyleState } from "./types";

const SURFACE_STYLE_KEYS: Array<keyof SurfaceStyleState> = [
  "type",
  "flatColor",
  "gradientFrom",
  "gradientTo",
  "gradientType",
  "shape",
  "strokeStyle",
  "frameWidth",
  "frameColor",
  "frameRotate",
  "frameScale",
  "flipX",
  "flipY",
  "positionX",
  "positionY",
  "skewX",
  "skewY",
  "clipToBackground",
  "shadowEnabled",
  "shadowMode",
  "shadowColor",
  "shadowBlur",
  "shadowOffsetX",
  "shadowOffsetY",
];

export function areSurfaceStylesEqual(
  left: SurfaceStyleState,
  right: SurfaceStyleState,
): boolean {
  return SURFACE_STYLE_KEYS.every((key) => left[key] === right[key]);
}

export function isDefaultBackgroundStyle(style: SurfaceStyleState): boolean {
  return areSurfaceStylesEqual(style, defaultBackground);
}

export function isDefaultForegroundStyle(style: SurfaceStyleState): boolean {
  return areSurfaceStylesEqual(style, defaultForeground);
}
