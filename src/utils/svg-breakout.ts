import type { ForegroundStyleState } from "../core/types";
import {
  buildCenteredForegroundTransform,
  buildForegroundGradientDef,
  isAutoColorFill,
} from "./foreground-style";
import { parseSvg, wrapWithParentTransforms } from "./svg";

export interface SvgPathPiece {
  id: string;
  label: string;
  markup: string;
}

export interface ParsedSvgBreakout {
  viewBox: string;
  defs: string;
  inner: string;
  pieces: SvgPathPiece[];
}

const PIECE_HOVER_VIGNETTE_FILTER_ID = "aikon-piece-hover-vignette";
const PIECE_HOVER_VIGNETTE_FILTER = `<filter id="${PIECE_HOVER_VIGNETTE_FILTER_ID}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feFlood flood-color="#3a9cff" flood-opacity="0.24" result="blue-veil" /><feComposite in="blue-veil" in2="SourceAlpha" operator="in" result="veil-fill" /><feBlend in="SourceGraphic" in2="veil-fill" mode="screen" result="tinted" /><feGaussianBlur in="SourceAlpha" stdDeviation="6" result="alpha-blur" /><feFlood flood-color="#3a9cff" flood-opacity="0.26" result="blue-glow-color" /><feComposite in="blue-glow-color" in2="alpha-blur" operator="in" result="blue-glow" /><feMerge><feMergeNode in="tinted" /><feMergeNode in="blue-glow" /></feMerge></filter>`;

const BREAKOUT_ELEMENT_SELECTOR =
  "path,circle,rect,ellipse,polygon,polyline,line";

function unwrapDefs(defsMarkup: string): string {
  if (!defsMarkup.trim()) {
    return "";
  }

  const match = defsMarkup.match(/^<defs[^>]*>([\s\S]*)<\/defs>$/i);
  return match ? match[1] : defsMarkup;
}

function toTitleCase(input: string): string {
  if (!input) {
    return input;
  }
  return `${input[0].toUpperCase()}${input.slice(1).toLowerCase()}`;
}

const PATH_SEGMENT_REGEX = /([AaCcHhLlMmQqSsTtVvZz])([^AaCcHhLlMmQqSsTtVvZz]*)/g;
const PATH_NUMBER_REGEX = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;

interface PathCursor {
  currentX: number;
  currentY: number;
  subpathStartX: number;
  subpathStartY: number;
}

function parsePathNumbers(input: string): number[] {
  const matches = input.match(PATH_NUMBER_REGEX);
  if (!matches) {
    return [];
  }

  return matches
    .map((token) => Number(token))
    .filter((value) => Number.isFinite(value));
}

function advancePathCursor(command: string, args: string, cursor: PathCursor): void {
  const values = parsePathNumbers(args);

  switch (command) {
    case "M": {
      if (values.length < 2) {
        return;
      }
      cursor.currentX = values[0];
      cursor.currentY = values[1];
      cursor.subpathStartX = cursor.currentX;
      cursor.subpathStartY = cursor.currentY;
      for (let index = 2; index + 1 < values.length; index += 2) {
        cursor.currentX = values[index];
        cursor.currentY = values[index + 1];
      }
      return;
    }
    case "m": {
      if (values.length < 2) {
        return;
      }
      cursor.currentX += values[0];
      cursor.currentY += values[1];
      cursor.subpathStartX = cursor.currentX;
      cursor.subpathStartY = cursor.currentY;
      for (let index = 2; index + 1 < values.length; index += 2) {
        cursor.currentX += values[index];
        cursor.currentY += values[index + 1];
      }
      return;
    }
    case "L":
      for (let index = 0; index + 1 < values.length; index += 2) {
        cursor.currentX = values[index];
        cursor.currentY = values[index + 1];
      }
      return;
    case "l":
      for (let index = 0; index + 1 < values.length; index += 2) {
        cursor.currentX += values[index];
        cursor.currentY += values[index + 1];
      }
      return;
    case "H":
      for (const value of values) {
        cursor.currentX = value;
      }
      return;
    case "h":
      for (const value of values) {
        cursor.currentX += value;
      }
      return;
    case "V":
      for (const value of values) {
        cursor.currentY = value;
      }
      return;
    case "v":
      for (const value of values) {
        cursor.currentY += value;
      }
      return;
    case "C":
      for (let index = 0; index + 5 < values.length; index += 6) {
        cursor.currentX = values[index + 4];
        cursor.currentY = values[index + 5];
      }
      return;
    case "c":
      for (let index = 0; index + 5 < values.length; index += 6) {
        cursor.currentX += values[index + 4];
        cursor.currentY += values[index + 5];
      }
      return;
    case "S":
    case "Q":
      for (let index = 0; index + 3 < values.length; index += 4) {
        cursor.currentX = values[index + 2];
        cursor.currentY = values[index + 3];
      }
      return;
    case "s":
    case "q":
      for (let index = 0; index + 3 < values.length; index += 4) {
        cursor.currentX += values[index + 2];
        cursor.currentY += values[index + 3];
      }
      return;
    case "T":
      for (let index = 0; index + 1 < values.length; index += 2) {
        cursor.currentX = values[index];
        cursor.currentY = values[index + 1];
      }
      return;
    case "t":
      for (let index = 0; index + 1 < values.length; index += 2) {
        cursor.currentX += values[index];
        cursor.currentY += values[index + 1];
      }
      return;
    case "A":
      for (let index = 0; index + 6 < values.length; index += 7) {
        cursor.currentX = values[index + 5];
        cursor.currentY = values[index + 6];
      }
      return;
    case "a":
      for (let index = 0; index + 6 < values.length; index += 7) {
        cursor.currentX += values[index + 5];
        cursor.currentY += values[index + 6];
      }
      return;
    case "Z":
    case "z":
      cursor.currentX = cursor.subpathStartX;
      cursor.currentY = cursor.subpathStartY;
      return;
    default:
      return;
  }
}

function normalizeMoveSegment(command: string, args: string, cursor: PathCursor): string {
  if (command !== "m") {
    return `${command}${args}`;
  }

  const values = parsePathNumbers(args);
  if (values.length < 2) {
    return `${command}${args}`;
  }

  const absX = cursor.currentX + values[0];
  const absY = cursor.currentY + values[1];
  const lineValues = values.slice(2);
  if (lineValues.length === 0) {
    return `M${absX} ${absY}`;
  }

  return `M${absX} ${absY} l${lineValues.join(" ")}`;
}

/**
 * Splits one SVG path "d" value into subpaths, each starting with M/m.
 * This allows "break apart" when an icon is encoded as a single <path>, while
 * keeping relative `m` subpaths valid as standalone paths.
 */
export function splitPathDataOnMoveTo(pathData: string): string[] {
  const trimmed = pathData.trim();
  if (!trimmed) {
    return [];
  }

  const segments = Array.from(trimmed.matchAll(PATH_SEGMENT_REGEX));
  if (segments.length === 0) {
    return [trimmed];
  }

  const cursor: PathCursor = {
    currentX: 0,
    currentY: 0,
    subpathStartX: 0,
    subpathStartY: 0,
  };

  const chunks: string[] = [];
  let currentChunk = "";

  for (const segment of segments) {
    const command = segment[1];
    const args = segment[2] ?? "";
    const isMove = command === "M" || command === "m";

    if (isMove && currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }

    currentChunk += normalizeMoveSegment(command, args, cursor);
    advancePathCursor(command, args, cursor);
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks.length > 0 ? chunks : [trimmed];
}

function getStylePropertyValue(style: string, property: string): string | null {
  const declarations = style.split(";");
  for (const declaration of declarations) {
    const [rawKey, rawValue] = declaration.split(":");
    if (!rawKey || rawValue === undefined) {
      continue;
    }
    if (rawKey.trim().toLowerCase() === property.toLowerCase()) {
      return rawValue.trim();
    }
  }
  return null;
}

function setStylePropertyValue(
  style: string,
  property: string,
  value: string,
): string {
  const declarations = style
    .split(";")
    .map((declaration) => declaration.trim())
    .filter((declaration) => declaration.length > 0);

  let didReplace = false;
  const nextDeclarations = declarations.map((declaration) => {
    const [rawKey] = declaration.split(":");
    if (!rawKey || rawKey.trim().toLowerCase() !== property.toLowerCase()) {
      return declaration;
    }

    didReplace = true;
    return `${property}:${value}`;
  });

  if (!didReplace) {
    nextDeclarations.push(`${property}:${value}`);
  }

  return nextDeclarations.join("; ");
}

function removeStyleProperty(style: string, property: string): string {
  return style
    .split(";")
    .map((declaration) => declaration.trim())
    .filter((declaration) => declaration.length > 0)
    .filter((declaration) => {
      const [rawKey] = declaration.split(":");
      return (
        rawKey &&
        rawKey.trim().toLowerCase() !== property.toLowerCase()
      );
    })
    .join("; ");
}

function getStyleFillValue(style: string): string | null {
  return getStylePropertyValue(style, "fill");
}

function setStyleFillValue(style: string, fillValue: string): string {
  return setStylePropertyValue(style, "fill", fillValue);
}

function applyFillWithDomParser(markup: string, fillValue: string): string {
  const parser = new DOMParser();
  const serializer = new XMLSerializer();
  const doc = parser.parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`,
    "image/svg+xml",
  );

  const targets = Array.from(doc.querySelectorAll(BREAKOUT_ELEMENT_SELECTOR));
  for (const node of targets) {
    const fillAttr = (node.getAttribute("fill") ?? "").trim();
    const styleAttr = (node.getAttribute("style") ?? "").trim();
    const styleFill = styleAttr ? getStyleFillValue(styleAttr) : null;
    const hasExplicitFill = fillAttr.length > 0 || styleFill !== null;
    const fillSource = styleFill ?? fillAttr;

    if (hasExplicitFill && !isAutoColorFill(fillSource)) {
      continue;
    }

    if (styleFill !== null) {
      node.setAttribute("style", setStyleFillValue(styleAttr, fillValue));
      continue;
    }

    node.setAttribute("fill", fillValue);
  }

  return Array.from(doc.documentElement.childNodes)
    .map((node) => serializer.serializeToString(node))
    .join("");
}

function getStrokePattern(
  strokeStyle: ForegroundStyleState["strokeStyle"],
  strokeWidth: number,
): { dashArray: string | null; lineCap: string | null } {
  if (strokeStyle === "dashed") {
    return {
      dashArray: `${strokeWidth * 4},${strokeWidth * 2}`,
      lineCap: null,
    };
  }

  if (strokeStyle === "dotted") {
    return {
      dashArray: `${strokeWidth},${strokeWidth}`,
      lineCap: "round",
    };
  }

  if (strokeStyle === "double") {
    return {
      dashArray: `${strokeWidth * 2},${strokeWidth * 0.5}`,
      lineCap: "butt",
    };
  }

  return {
    dashArray: null,
    lineCap: null,
  };
}

function applyStrokeWithDomParser(
  markup: string,
  foreground: ForegroundStyleState,
): string {
  const strokeWidth = Math.max(0, foreground.frameWidth ?? 0);
  if (strokeWidth <= 0 || foreground.strokeStyle === "none") {
    return markup;
  }

  const parser = new DOMParser();
  const serializer = new XMLSerializer();
  const doc = parser.parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`,
    "image/svg+xml",
  );

  const strokeColor = foreground.frameColor || "#000000";
  const strokePattern = getStrokePattern(foreground.strokeStyle, strokeWidth);
  const targets = Array.from(doc.querySelectorAll(BREAKOUT_ELEMENT_SELECTOR));
  for (const node of targets) {
    const styleAttr = (node.getAttribute("style") ?? "").trim();
    if (styleAttr) {
      let nextStyle = setStylePropertyValue(styleAttr, "stroke", strokeColor);
      nextStyle = setStylePropertyValue(
        nextStyle,
        "stroke-width",
        String(strokeWidth),
      );

      nextStyle = strokePattern.dashArray
        ? setStylePropertyValue(
            nextStyle,
            "stroke-dasharray",
            strokePattern.dashArray,
          )
        : removeStyleProperty(nextStyle, "stroke-dasharray");

      nextStyle = strokePattern.lineCap
        ? setStylePropertyValue(nextStyle, "stroke-linecap", strokePattern.lineCap)
        : removeStyleProperty(nextStyle, "stroke-linecap");

      node.setAttribute("style", nextStyle);
      continue;
    }

    node.setAttribute("stroke", strokeColor);
    node.setAttribute("stroke-width", String(strokeWidth));

    if (strokePattern.dashArray) {
      node.setAttribute("stroke-dasharray", strokePattern.dashArray);
    } else {
      node.removeAttribute("stroke-dasharray");
    }

    if (strokePattern.lineCap) {
      node.setAttribute("stroke-linecap", strokePattern.lineCap);
    } else {
      node.removeAttribute("stroke-linecap");
    }
  }

  return Array.from(doc.documentElement.childNodes)
    .map((node) => serializer.serializeToString(node))
    .join("");
}

function applyForegroundPaintToMarkup(
  markup: string,
  foreground: ForegroundStyleState,
  defsOut: string[],
  nextGradientId: () => string,
): string {
  let fillApplied = markup;
  if (foreground.type === "flat") {
    fillApplied = applyFillWithDomParser(markup, foreground.flatColor);
  } else if (foreground.type === "none") {
    fillApplied = applyFillWithDomParser(markup, "none");
  } else {
    const gradId = nextGradientId();
    defsOut.push(buildForegroundGradientDef(foreground, gradId));
    fillApplied = applyFillWithDomParser(markup, `url(#${gradId})`);
  }

  return applyStrokeWithDomParser(fillApplied, foreground);
}

function clampBlendOpacity(value: number): number {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.max(0, Math.min(1, value));
}

function buildPieceStyleAttribute(style: ForegroundStyleState): string {
  const declarations: string[] = [];
  const blendMode = style.blendMode ?? "normal";
  if (blendMode !== "normal") {
    declarations.push(`mix-blend-mode:${blendMode}`);
  }

  const blendOpacity = clampBlendOpacity(style.blendOpacity ?? 1);
  if (blendOpacity !== 1) {
    declarations.push(`opacity:${blendOpacity}`);
  }

  if (declarations.length === 0) {
    return "";
  }

  return ` style="${declarations.join(";")};"`;
}

function parseBreakoutPieces(inner: string): SvgPathPiece[] {
  const parser = new DOMParser();
  const serializer = new XMLSerializer();
  const doc = parser.parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg">${inner}</svg>`,
    "image/svg+xml",
  );
  const nodes = Array.from(doc.querySelectorAll(BREAKOUT_ELEMENT_SELECTOR));

  let pieceIndex = 0;
  let pathNodeIndex = 0;
  const primitiveIndexByTag = new Map<string, number>();
  const pieces: SvgPathPiece[] = [];

  for (const node of nodes) {
    const tagName = node.tagName.toLowerCase();
    const sourceId = (node.getAttribute("id") ?? "").trim();

    if (tagName === "path") {
      pathNodeIndex += 1;
      const d = (node.getAttribute("d") ?? "").trim();
      const subpaths = splitPathDataOnMoveTo(d);

      if (subpaths.length > 1) {
        for (let index = 0; index < subpaths.length; index += 1) {
          const clone = node.cloneNode(true) as Element;
          clone.setAttribute("d", subpaths[index]);
          pieceIndex += 1;
          pieces.push({
            id: `piece-${pieceIndex}`,
            label: sourceId
              ? `${sourceId} ${index + 1}`
              : `Path ${pathNodeIndex}.${index + 1}`,
            markup: wrapWithParentTransforms(clone, serializer),
          });
        }
        continue;
      }

      pieceIndex += 1;
      pieces.push({
        id: `piece-${pieceIndex}`,
        label: sourceId || `Path ${pathNodeIndex}`,
        markup: wrapWithParentTransforms(node, serializer),
      });
      continue;
    }

    const primitiveIndex = (primitiveIndexByTag.get(tagName) ?? 0) + 1;
    primitiveIndexByTag.set(tagName, primitiveIndex);
    pieceIndex += 1;
    pieces.push({
      id: `piece-${pieceIndex}`,
      label: sourceId || `${toTitleCase(tagName)} ${primitiveIndex}`,
      markup: wrapWithParentTransforms(node, serializer),
    });
  }

  return pieces;
}

export function parseSvgBreakout(
  svg: string,
  parsedCache: Map<string, ParsedSvgBreakout>,
  compositeCache: Map<string, ReturnType<typeof parseSvg>>,
): ParsedSvgBreakout {
  const cached = parsedCache.get(svg);
  if (cached) {
    return cached;
  }

  const parsed = parseSvg(svg, compositeCache);
  const breakout: ParsedSvgBreakout = {
    viewBox: parsed.viewBox,
    defs: unwrapDefs(parsed.defs),
    inner: parsed.inner,
    pieces: parseBreakoutPieces(parsed.inner),
  };

  parsedCache.set(svg, breakout);
  return breakout;
}

export function buildForegroundStyledSvg(
  breakout: ParsedSvgBreakout,
  defaultForeground: ForegroundStyleState,
  pathForegroundStyles: Record<string, ForegroundStyleState>,
  blink: { pathId: string | null; token: number } | null = null,
): string {
  const defs: string[] = [PIECE_HOVER_VIGNETTE_FILTER];
  let gradientCounter = 0;
  const nextGradientId = () => {
    gradientCounter += 1;
    return `fg-piece-gradient-${gradientCounter}`;
  };
  const staticPieces: string[] = [];
  let blinkingPieceMarkup: string | null = null;

  for (const piece of breakout.pieces) {
    const style = pathForegroundStyles[piece.id] ?? defaultForeground;
    const paintApplied = applyForegroundPaintToMarkup(
      piece.markup,
      style,
      defs,
      nextGradientId,
    );
    const transform = buildCenteredForegroundTransform(style);
    const pieceStyle = buildPieceStyleAttribute(style);
    const transformedMarkup = transform
      ? `<g transform="${transform}">${paintApplied}</g>`
      : paintApplied;

    if (blink?.pathId && blink.pathId === piece.id) {
      blinkingPieceMarkup = `<g data-foreground-piece-id="${piece.id}" data-blink-token="${blink.token}"><animate attributeName="opacity" values="1;0.15;1;0.15;1" dur="0.75s" repeatCount="1" /><g${pieceStyle}>${transformedMarkup}</g></g>`;
      continue;
    }

    staticPieces.push(
      `<g data-foreground-piece-id="${piece.id}"${pieceStyle}>${transformedMarkup}</g>`,
    );
  }

  // Render the blinking piece last so it stays visible even for overlapping shapes.
  if (blinkingPieceMarkup) {
    staticPieces.push(blinkingPieceMarkup);
  }

  const piecesMarkup = staticPieces.join("");

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${breakout.viewBox}">
  <defs>${breakout.defs}${defs.join("")}</defs>
  ${piecesMarkup}
</svg>`.trim();
}
