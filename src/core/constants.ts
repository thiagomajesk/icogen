import {
  AnimationState,
  BackgroundStyleState,
  EffectsState,
  ForegroundStyleState,
  LayerState,
} from "./types";

export const PAGE_SIZE = 60;
export const PAGE_CACHE_SIZE = 24;

const defaultStrokeColor = "#000000";

export const defaultBaseLayer: LayerState = {
  path: null,
  svg: null,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  opacity: 1,
  fill: "#111111",
};

export const defaultOverlayLayer: LayerState = {
  path: null,
  svg: null,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  opacity: 1,
  fill: "#8f173f",
};

export const defaultAnimation: AnimationState = {
  duration: 0.6,
  startX: 0,
  startY: 0,
  startScale: 1,
  startRotate: 0,
  endX: 0,
  endY: 0,
  endScale: 1,
  endRotate: 0,
};

export const defaultEffects: EffectsState = {
  blur: 0,
  hueRotate: 0,
  saturate: 100,
  shadowX: 0,
  shadowY: 0,
  shadowBlur: 0,
  shadowColor: "#000000",
};

export const defaultBackground: BackgroundStyleState = {
  type: "flat",
  flatColor: "#000000",
  gradientFrom: "#000000",
  gradientTo: "#222222",
  gradientType: "radial",
  shape: "square",
  strokeStyle: "none",
  frameWidth: 0,
  frameColor: defaultStrokeColor,
  frameRotate: 0,
  frameScale: 100,
  flipX: false,
  flipY: false,
  positionX: 0,
  positionY: 0,
  skewX: 0,
  skewY: 0,
  clipToBackground: false,
  shadowEnabled: false,
  shadowMode: "outer",
  shadowColor: "#000000",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
};

export const defaultForeground: ForegroundStyleState = {
  type: "flat",
  flatColor: "#ffffff",
  gradientFrom: "#ffffff",
  gradientTo: "#cccccc",
  gradientType: "radial",
  shape: "square",
  strokeStyle: "none",
  frameWidth: 0,
  frameColor: defaultStrokeColor,
  frameRotate: 0,
  frameScale: 100,
  flipX: false,
  flipY: false,
  positionX: 0,
  positionY: 0,
  skewX: 0,
  skewY: 0,
  clipToBackground: false,
  shadowEnabled: false,
  shadowMode: "outer",
  shadowColor: "#000000",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
};
