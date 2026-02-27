export type LayerKey = "base" | "overlay";

export interface IconMeta {
  path: string;
  name: string;
  author: string;
  size: number;
  mtimeMs: number;
}

export interface CustomIcon {
  path: string;
  name: string;
  author: string;
  svg: string;
}

export interface LayerState {
  path: string | null;
  svg: string | null;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  fill: string;
}

export interface AnimationState {
  duration: number;
  startX: number;
  startY: number;
  startScale: number;
  startRotate: number;
  endX: number;
  endY: number;
  endScale: number;
  endRotate: number;
}

export interface EffectsState {
  blur: number;
  hueRotate: number;
  saturate: number;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowColor: string;
}

export type SurfaceShadowMode = "outer" | "inner";
export type SurfaceBlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "soft-light"
  | "color"
  | "luminosity";

export type BackgroundType = "none" | "flat" | "gradient";
export type GradientType =
  | "radial"
  | "horizontal"
  | "vertical"
  | "diagonal-forward"
  | "diagonal-backward";
export type BackgroundShape =
  | "circle"
  | "triangle"
  | "square"
  | "square-alt"
  | "rounded-square"
  | "star5"
  | "star5-alt"
  | "star6"
  | "star6-alt"
  | "star7";
export type StrokeStyle =
  | "solid"
  | "dashed"
  | "dotted"
  | "double"
  | "none";

/**
 * Shared style model used by both background and foreground controls.
 * The two aliases below make intent explicit at each call site.
 */
export interface SurfaceStyleState {
  type: BackgroundType;
  flatColor: string;
  gradientFrom: string;
  gradientTo: string;
  gradientType: GradientType;
  shape: BackgroundShape;
  strokeStyle: StrokeStyle;
  frameWidth: number;
  frameColor: string;
  frameRotate: number;
  frameScale: number;
  flipX: boolean;
  flipY: boolean;
  positionX: number;
  positionY: number;
  skewX: number;
  skewY: number;
  clipToBackground: boolean;
  shadowEnabled: boolean;
  shadowMode: SurfaceShadowMode;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  blendMode: SurfaceBlendMode;
  blendOpacity: number;
}

export type BackgroundStyleState = SurfaceStyleState;
export type ForegroundStyleState = SurfaceStyleState;
export type BackgroundState = SurfaceStyleState;

export interface ParsedSvg {
  viewBox: string;
  inner: string;
  defs: string;
}

export interface PieceCandidate {
  id: string;
  label: string;
  markup: string;
}

export interface Preset {
  name: string;
  base: Omit<LayerState, "svg">;
  overlay: Omit<LayerState, "svg">;
  animation: AnimationState;
  effects: EffectsState;
}

export interface SyncJob {
  id: string;
  mode: "sync" | "download";
  status: "running" | "done" | "error";
  remoteTotal: number;
  localTotal: number;
  missingTotal: number;
  totalToDownload: number;
  processed: number;
  downloadedCount: number;
  failedCount: number;
  currentPath: string | null;
  recentDownloaded: string[];
  recentFailed: Array<{ path: string; reason: string }>;
  error?: string;
}

export interface IconAvailability {
  remoteTotal: number;
  localTotal: number;
  missingTotal: number;
  missingSample: string[];
}

export interface IconPagePayload {
  icons: IconMeta[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PreviewTransform {
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export interface EditorStatus {
  message: string;
  error: boolean;
}
