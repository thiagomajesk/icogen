import type { ForegroundStyleState, ParsedSvg } from "../editor";
import {
  buildForegroundStyledSvg,
  parseSvgBreakout,
  type ParsedSvgBreakout,
} from "./svg-breakout";

export interface ForegroundPathConfig {
  enabled: boolean;
  pathStyles: Record<string, ForegroundStyleState>;
}

export interface ForegroundPathBlink {
  pathId: string | null;
  token: number;
}

interface BuildForegroundCompositeParams {
  svg: string;
  foreground: ForegroundStyleState;
  pathConfig?: ForegroundPathConfig | null;
  blink?: ForegroundPathBlink | null;
  parsedSvgCache?: Map<string, ParsedSvg>;
  breakoutCache?: Map<string, ParsedSvgBreakout>;
}

interface BuildForegroundCompositeResult {
  svg: string;
  foregroundForComposite: ForegroundStyleState | null;
}

export function buildForegroundComposite({
  svg,
  foreground,
  pathConfig = null,
  blink = null,
  parsedSvgCache,
  breakoutCache,
}: BuildForegroundCompositeParams): BuildForegroundCompositeResult {
  if (!pathConfig?.enabled) {
    return {
      svg,
      foregroundForComposite: foreground,
    };
  }

  const parsedCache = parsedSvgCache ?? new Map<string, ParsedSvg>();
  const breakoutParsedCache = breakoutCache ?? new Map<string, ParsedSvgBreakout>();
  const breakout = parseSvgBreakout(svg, breakoutParsedCache, parsedCache);
  const styledSvg = buildForegroundStyledSvg(
    breakout,
    foreground,
    pathConfig.pathStyles,
    blink,
  );

  return {
    svg: styledSvg,
    foregroundForComposite: null,
  };
}
