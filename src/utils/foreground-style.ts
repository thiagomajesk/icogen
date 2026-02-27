import type { ForegroundStyleState } from "../core/types";

function normalizeFillColor(fill: string): string {
  return fill.trim().toLowerCase().replace(/\s+/g, "");
}

const AUTO_COLOR_FILLS = new Set([
  "",
  "#000",
  "#000000",
  "black",
  "rgb(0,0,0)",
  "#fff",
  "#ffffff",
  "white",
  "rgb(255,255,255)",
]);

const AUTO_FILL_ATTRIBUTE_PATTERN =
  /fill=("|')((#000|#000000|black|rgb\(0,0,0\)|#fff|#ffffff|white|rgb\(255, ?255, ?255\)|))("|')/gi;

export function isAutoColorFill(fill: string): boolean {
  return AUTO_COLOR_FILLS.has(normalizeFillColor(fill));
}

export function replaceAutoFillAttributes(
  markup: string,
  fillValue: string,
): string {
  return markup.replace(AUTO_FILL_ATTRIBUTE_PATTERN, `fill="${fillValue}"`);
}

export function buildForegroundGradientDef(
  foreground: Pick<
    ForegroundStyleState,
    "gradientType" | "gradientFrom" | "gradientTo"
  >,
  gradientId: string,
): string {
  const gradientConfig = {
    radial: `<radialGradient id="${gradientId}" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></radialGradient>`,
    horizontal: `<linearGradient id="${gradientId}" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></linearGradient>`,
    vertical: `<linearGradient id="${gradientId}" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></linearGradient>`,
    "diagonal-forward": `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></linearGradient>`,
    "diagonal-backward": `<linearGradient id="${gradientId}" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></linearGradient>`,
  };

  return gradientConfig[foreground.gradientType];
}

export function buildForegroundTransformOperations(
  foreground: ForegroundStyleState,
): string {
  const fgScale = foreground.frameScale / 100;
  const flipXScale = foreground.flipX ? -1 : 1;
  const flipYScale = foreground.flipY ? -1 : 1;
  const combinedScale = fgScale * flipXScale;
  const combinedScaleY = fgScale * flipYScale;

  let operations = "";
  if (foreground.positionX !== 0 || foreground.positionY !== 0) {
    const scaledPosX = (foreground.positionX / 100) * 256;
    const scaledPosY = (foreground.positionY / 100) * 256;
    operations += ` translate(${scaledPosX} ${scaledPosY})`;
  }

  if (foreground.frameRotate !== 0) {
    operations += ` rotate(${foreground.frameRotate})`;
  }
  if (combinedScale !== 1 || combinedScaleY !== 1) {
    operations += ` scale(${combinedScale} ${combinedScaleY})`;
  }
  if (foreground.skewX !== 0) {
    operations += ` skewX(${foreground.skewX})`;
  }
  if (foreground.skewY !== 0) {
    operations += ` skewY(${foreground.skewY})`;
  }

  return operations;
}

export function buildCenteredForegroundTransform(
  foreground: ForegroundStyleState,
): string {
  const operations = buildForegroundTransformOperations(foreground);
  if (!operations) {
    return "";
  }
  return `translate(256 256)${operations} translate(-256 -256)`;
}
