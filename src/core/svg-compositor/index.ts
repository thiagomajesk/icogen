export {
  svgToDataUri,
  parseSvg,
  wrapWithParentTransforms,
  buildCompositeSvg,
  buildPreviewTransform,
} from "./svg";

export type { SvgPathPiece, ParsedSvgBreakout } from "./svg-breakout";
export {
  splitPathDataOnMoveTo,
  parseSvgBreakout,
  buildForegroundStyledSvg,
} from "./svg-breakout";

export type {
  ForegroundPathConfig,
  ForegroundPathBlink,
} from "./foreground-composite";
export { buildForegroundComposite } from "./foreground-composite";
