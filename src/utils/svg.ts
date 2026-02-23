import {
  AnimationState,
  BackgroundStyleState,
  EffectsState,
  ForegroundStyleState,
  LayerState,
  ParsedSvg,
  PreviewTransform,
} from "../core/types";

export function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function parseViewBoxSize(
  viewBox: string,
): { width: number; height: number } | null {
  const tokens = viewBox.trim().split(/[\s,]+/);
  if (tokens.length < 4) {
    return null;
  }

  const width = Number(tokens[2]);
  const height = Number(tokens[3]);
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    return null;
  }

  return { width, height };
}

function isApproximatelyEqual(left: number, right: number): boolean {
  return Math.abs(left - right) <= 0.001;
}

function hasBlackFillOrDefault(element: Element): boolean {
  const fill = (element.getAttribute("fill") ?? "").trim().toLowerCase();
  return (
    fill === "" ||
    fill === "#000" ||
    fill === "#000000" ||
    fill === "black" ||
    fill === "rgb(0,0,0)"
  );
}

function isSolidCanvasBackground(element: Element, viewBox: string): boolean {
  if (!hasBlackFillOrDefault(element)) {
    return false;
  }

  const size = parseViewBoxSize(viewBox);
  if (!size) {
    return false;
  }

  const tag = element.tagName.toLowerCase();
  if (tag === "path") {
    const d = (element.getAttribute("d") ?? "").trim();
    const match = d.match(
      /^M\s*0(?:\.0+)?\s+0(?:\.0+)?\s*h\s*([0-9.]+)\s*v\s*([0-9.]+)\s*H\s*0(?:\.0+)?\s*z$/i,
    );
    if (!match) {
      return false;
    }

    const width = Number(match[1]);
    const height = Number(match[2]);
    return (
      Number.isFinite(width) &&
      Number.isFinite(height) &&
      isApproximatelyEqual(width, size.width) &&
      isApproximatelyEqual(height, size.height)
    );
  }

  if (tag === "rect") {
    const x = Number(element.getAttribute("x") ?? "0");
    const y = Number(element.getAttribute("y") ?? "0");
    const width = Number(element.getAttribute("width") ?? "0");
    const height = Number(element.getAttribute("height") ?? "0");

    return (
      Number.isFinite(x) &&
      Number.isFinite(y) &&
      Number.isFinite(width) &&
      Number.isFinite(height) &&
      isApproximatelyEqual(x, 0) &&
      isApproximatelyEqual(y, 0) &&
      isApproximatelyEqual(width, size.width) &&
      isApproximatelyEqual(height, size.height)
    );
  }

  return false;
}

export function parseSvg(
  svg: string,
  cache: Map<string, ParsedSvg>,
): ParsedSvg {
  const cached = cache.get(svg);
  if (cached) {
    return cached;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const svgNode = doc.querySelector("svg");
  const serializer = new XMLSerializer();

  if (!svgNode) {
    return { viewBox: "0 0 512 512", inner: "", defs: "" };
  }

  const viewBox = svgNode.getAttribute("viewBox") ?? "0 0 512 512";
  const defs = svgNode.querySelector("defs");

  const inner = Array.from(svgNode.childNodes)
    .filter((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return true;
      }

      const element = node as Element;
      if (element.tagName.toLowerCase() === "defs") {
        return false;
      }

      return !isSolidCanvasBackground(element, viewBox);
    })
    .map((node) => serializer.serializeToString(node))
    .join("");

  const parsed = {
    viewBox,
    inner,
    defs: defs ? serializer.serializeToString(defs) : "",
  };

  cache.set(svg, parsed);
  return parsed;
}

export function wrapWithParentTransforms(
  node: Element,
  serializer: XMLSerializer,
): string {
  let wrapped = serializer.serializeToString(node.cloneNode(true));
  const wrappers: string[] = [];

  let current = node.parentElement;
  while (current && current.tagName.toLowerCase() !== "svg") {
    const attrs: string[] = [];
    const transform = current.getAttribute("transform");
    const opacity = current.getAttribute("opacity");
    const style = current.getAttribute("style");

    if (transform) {
      attrs.push(`transform="${transform}"`);
    }

    if (opacity) {
      attrs.push(`opacity="${opacity}"`);
    }

    if (style) {
      attrs.push(`style="${style}"`);
    }

    if (attrs.length > 0) {
      wrappers.push(`<g ${attrs.join(" ")}>`);
    }

    current = current.parentElement;
  }

  for (let index = wrappers.length - 1; index >= 0; index -= 1) {
    wrapped = `${wrappers[index]}${wrapped}</g>`;
  }

  return wrapped;
}

function buildLayerMarkup(
  layer: LayerState,
  parsedCache: Map<string, ParsedSvg>,
  foreground: ForegroundStyleState | null = null,
  defsOut: string[] = [],
  nextGradientId: () => string = () =>
    `fg-gradient-${Math.random().toString(36).slice(2, 10)}`,
): string {
  if (!layer.svg) {
    return "";
  }

  const parsed = parseSvg(layer.svg, parsedCache);
  
  // Build base transform
  let transform = `translate(256 256) translate(${layer.x} ${layer.y}) rotate(${layer.rotate}) scale(${layer.scale})`;
  
  // Apply foreground transformations if present
  if (foreground) {
    const fgScale = (foreground.frameScale / 100);
    const flipXScale = foreground.flipX ? -1 : 1;
    const flipYScale = foreground.flipY ? -1 : 1;
    const combinedScale = fgScale * flipXScale;
    const combinedScaleY = fgScale * flipYScale;
    
    // Add foreground position (scale from percentage to pixels where 100% = center touches edge)
    if (foreground.positionX !== 0 || foreground.positionY !== 0) {
      const scaledPosX = (foreground.positionX / 100) * 256;
      const scaledPosY = (foreground.positionY / 100) * 256;
      transform += ` translate(${scaledPosX} ${scaledPosY})`;
    }
    
    // Add foreground rotation and scale/flip
    if (foreground.frameRotate !== 0) {
      transform += ` rotate(${foreground.frameRotate})`;
    }
    if (combinedScale !== 1 || combinedScaleY !== 1) {
      transform += ` scale(${combinedScale} ${combinedScaleY})`;
    }
    
    // Add foreground skew
    if (foreground.skewX !== 0) {
      transform += ` skewX(${foreground.skewX})`;
    }
    if (foreground.skewY !== 0) {
      transform += ` skewY(${foreground.skewY})`;
    }
  }
  
  transform += ` translate(-256 -256)`;
  
  let inner = parsed.inner;

  if (foreground) {
    // Only replace fills that are black/default
      // Replace all solid fills (black, white, and empty) with the foreground color/gradient
      // Covers: #000, #000000, black, rgb(0,0,0), #fff, #ffffff, white, rgb(255,255,255), and empty
      const fillRegex = /fill=("|')((#000|#000000|black|rgb\(0,0,0\)|#fff|#ffffff|white|rgb\(255, ?255, ?255\)|))("|')/gi;
      if (foreground.type === "flat") {
        inner = inner.replace(fillRegex, `fill="${foreground.flatColor}"`);
      } else if (foreground.type === "gradient") {
        const gradId = nextGradientId();
        const gradientConfig = {
          radial: `<radialGradient id="${gradId}" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></radialGradient>`,
          horizontal: `<linearGradient id="${gradId}" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></linearGradient>`,
          vertical: `<linearGradient id="${gradId}" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></linearGradient>`,
          "diagonal-forward": `<linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></linearGradient>`,
          "diagonal-backward": `<linearGradient id="${gradId}" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${foreground.gradientFrom}" /><stop offset="100%" stop-color="${foreground.gradientTo}" /></linearGradient>`,
        };
        defsOut.push(gradientConfig[foreground.gradientType]);
        inner = inner.replace(fillRegex, `fill="url(#${gradId})"`);
      } else if (foreground.type === "none") {
        inner = inner.replace(fillRegex, `fill="none"`);
    }
  }

  return `<g transform="${transform}" opacity="${layer.opacity}"><svg x="0" y="0" width="512" height="512" viewBox="${parsed.viewBox}" preserveAspectRatio="xMidYMid meet">${parsed.defs}${inner}</svg></g>`;
}

function buildAnimationTransform(
  animation: AnimationState,
  progress: number,
): string {
  const x = lerp(animation.startX, animation.endX, progress);
  const y = lerp(animation.startY, animation.endY, progress);
  const scale = lerp(animation.startScale, animation.endScale, progress);
  const rotate = lerp(animation.startRotate, animation.endRotate, progress);
  return `translate(256 256) translate(${x} ${y}) rotate(${rotate}) scale(${scale}) translate(-256 -256)`;
}

export function buildPreviewTransform(
  animation: AnimationState,
  progress: number,
): PreviewTransform {
  return {
    x: lerp(animation.startX, animation.endX, progress),
    y: lerp(animation.startY, animation.endY, progress),
    scale: lerp(animation.startScale, animation.endScale, progress),
    rotate: lerp(animation.startRotate, animation.endRotate, progress),
  };
}

function buildStarPoints(points: number, rotationDeg: number): string {
  const center = 256;
  const outer = 240;
  const inner = 108;
  const vertices: string[] = [];

  for (let index = 0; index < points * 2; index += 1) {
    const radius = index % 2 === 0 ? outer : inner;
    const angle =
      ((rotationDeg - 90 + (360 / (points * 2)) * index) * Math.PI) / 180;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    vertices.push(`${x.toFixed(3)},${y.toFixed(3)}`);
  }

  return vertices.join(" ");
}

function buildShapeElement(
  shape: BackgroundStyleState["shape"],
  fill: string,
  stroke: string,
  strokeWidth: number,
  strokeStyle: BackgroundStyleState["strokeStyle"],
  rotateDeg: number,
  scalePercent: number,
): string {
  const scale = Math.max(0, scalePercent) / 100;
  const needsTransform = rotateDeg !== 0 || scale !== 1;
  const transform = needsTransform
    ? ` transform="translate(256 256) rotate(${rotateDeg}) scale(${scale}) translate(-256 -256)"`
    : "";
  
  // Map stroke style to SVG stroke-dasharray
  let strokeDasharray = "";
  if (strokeWidth > 0 && stroke !== "none") {
    switch (strokeStyle) {
      case "dashed":
        strokeDasharray = ` stroke-dasharray="${strokeWidth * 4},${strokeWidth * 2}"`;
        break;
      case "dotted":
        strokeDasharray = ` stroke-dasharray="${strokeWidth},${strokeWidth}" stroke-linecap="round"`;
        break;
      case "double":
        // For double, we'll use a wider stroke with a pattern
        strokeDasharray = ` stroke-dasharray="${strokeWidth * 2},${strokeWidth * 0.5}" stroke-linecap="butt"`;
        break;
      case "none":
        stroke = "none";
        break;
      case "solid":
      default:
        // No dasharray needed for solid
        break;
    }
  }
  
  const attrs = `fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"${strokeDasharray}${transform}`;

  if (shape === "circle") {
    return `<circle cx="256" cy="256" r="240" ${attrs} />`;
  }

  if (shape === "triangle") {
    return `<polygon points="256,16 496,496 16,496" ${attrs} />`;
  }

  if (shape === "square") {
    return `<rect x="0" y="0" width="512" height="512" ${attrs} />`;
  }

  if (shape === "square-alt") {
    return `<polygon points="256,16 496,256 256,496 16,256" ${attrs} />`;
  }

  if (shape === "rounded-square") {
    return `<rect x="0" y="0" width="512" height="512" rx="64" ry="64" ${attrs} />`;
  }

  if (shape === "star5") {
    return `<polygon points="${buildStarPoints(5, 0)}" ${attrs} />`;
  }

  if (shape === "star5-alt") {
    return `<polygon points="${buildStarPoints(5, 36)}" ${attrs} />`;
  }

  if (shape === "star6") {
    return `<polygon points="${buildStarPoints(6, 0)}" ${attrs} />`;
  }

  if (shape === "star6-alt") {
    return `<polygon points="${buildStarPoints(6, 30)}" ${attrs} />`;
  }

  return `<polygon points="${buildStarPoints(7, 0)}" ${attrs} />`;
}

function buildClipPathShape(
  shape: BackgroundStyleState["shape"],
  rotateDeg: number,
  scalePercent: number,
): string {
  const scale = Math.max(0, scalePercent) / 100;
  const needsTransform = rotateDeg !== 0 || scale !== 1;
  const transform = needsTransform
    ? ` transform="translate(256 256) rotate(${rotateDeg}) scale(${scale}) translate(-256 -256)"`
    : "";

  if (shape === "circle") {
    return `<circle cx="256" cy="256" r="240"${transform} />`;
  }

  if (shape === "triangle") {
    return `<polygon points="256,16 496,496 16,496"${transform} />`;
  }

  if (shape === "square") {
    return `<rect x="0" y="0" width="512" height="512"${transform} />`;
  }

  if (shape === "square-alt") {
    return `<polygon points="256,16 496,256 256,496 16,256"${transform} />`;
  }

  if (shape === "rounded-square") {
    return `<rect x="0" y="0" width="512" height="512" rx="64" ry="64"${transform} />`;
  }

  if (shape === "star5") {
    return `<polygon points="${buildStarPoints(5, 0)}"${transform} />`;
  }

  if (shape === "star5-alt") {
    return `<polygon points="${buildStarPoints(5, 36)}"${transform} />`;
  }

  if (shape === "star6") {
    return `<polygon points="${buildStarPoints(6, 0)}"${transform} />`;
  }

  if (shape === "star6-alt") {
    return `<polygon points="${buildStarPoints(6, 30)}"${transform} />`;
  }

  return `<polygon points="${buildStarPoints(7, 0)}"${transform} />`;
}

function buildBackgroundMarkup(background: BackgroundStyleState): {
  defs: string;
  shape: string;
  clipPath: string;
} {
  const gradientConfig: Record<
    BackgroundStyleState["gradientType"],
    { x1: string; y1: string; x2: string; y2: string; radial?: boolean }
  > = {
    radial: { x1: "50%", y1: "50%", x2: "50%", y2: "50%", radial: true },
    horizontal: { x1: "0%", y1: "50%", x2: "100%", y2: "50%" },
    vertical: { x1: "50%", y1: "0%", x2: "50%", y2: "100%" },
    "diagonal-forward": { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
    "diagonal-backward": { x1: "100%", y1: "0%", x2: "0%", y2: "100%" },
  };

  const hasFrame = background.frameWidth > 0;
  const strokeColor = hasFrame ? background.frameColor : "none";
  const strokeWidth = hasFrame ? background.frameWidth : 0;
  const strokeStyle = background.strokeStyle === "none" ? "none" : background.strokeStyle;

  // Build the clipPath for the background shape
  const clipPathShape = buildClipPathShape(
    background.shape,
    background.frameRotate,
    background.frameScale
  );
  const clipPath = `<clipPath id="bg-clip">${clipPathShape}</clipPath>`;

  if (background.type === "none") {
    if (!hasFrame) {
      return { defs: clipPath, shape: "", clipPath };
    }

    return {
      defs: clipPath,
      shape: buildShapeElement(
        background.shape,
        "none",
        strokeColor,
        strokeWidth,
        strokeStyle,
        background.frameRotate,
        background.frameScale,
      ),
      clipPath,
    };
  }

  if (background.type === "flat") {
    return {
      defs: clipPath,
      shape: buildShapeElement(
        background.shape,
        background.flatColor,
        strokeColor,
        strokeWidth,
        strokeStyle,
        background.frameRotate,
        background.frameScale,
      ),
      clipPath,
    };
  }

  const config = gradientConfig[background.gradientType];
  const gradientDef = config.radial
    ? `<radialGradient id="bg-gradient" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="${background.gradientFrom}" /><stop offset="100%" stop-color="${background.gradientTo}" /></radialGradient>`
    : `<linearGradient id="bg-gradient" x1="${config.x1}" y1="${config.y1}" x2="${config.x2}" y2="${config.y2}"><stop offset="0%" stop-color="${background.gradientFrom}" /><stop offset="100%" stop-color="${background.gradientTo}" /></linearGradient>`;

  return {
    defs: gradientDef + clipPath,
    shape: buildShapeElement(
      background.shape,
      "url(#bg-gradient)",
      strokeColor,
      strokeWidth,
      strokeStyle,
      background.frameRotate,
      background.frameScale,
    ),
    clipPath,
  };
}

export function buildCompositeSvg(
  base: LayerState,
  overlay: LayerState,
  effects: EffectsState,
  animation: AnimationState,
  background: BackgroundStyleState,
  foreground: ForegroundStyleState | null,
  parsedCache: Map<string, ParsedSvg>,
  animationProgress: number | null,
): string {
  // Keep ids stable per render so outputs are predictable and test-friendly.
  const defs: string[] = [];
  let foregroundGradientCounter = 0;
  const nextGradientId = () => {
    foregroundGradientCounter += 1;
    return `fg-gradient-${foregroundGradientCounter}`;
  };
  const baseMarkup = buildLayerMarkup(
    base,
    parsedCache,
    foreground,
    defs,
    nextGradientId,
  );
  const overlayMarkup = buildLayerMarkup(
    overlay,
    parsedCache,
    foreground,
    defs,
    nextGradientId,
  );
  const backgroundMarkup = buildBackgroundMarkup(background);
  const wrapperTransform =
    animationProgress === null
      ? ""
      : ` transform="${buildAnimationTransform(animation, animationProgress)}"`;
  const filter = `drop-shadow(${effects.shadowX}px ${effects.shadowY}px ${effects.shadowBlur}px ${effects.shadowColor}) blur(${effects.blur}px) hue-rotate(${effects.hueRotate}deg) saturate(${effects.saturate}%)`;
  
  const clipPathAttr = foreground?.clipToBackground
    ? ` clip-path="url(#bg-clip)"`
    : "";

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>${backgroundMarkup.defs}${defs.join("")}</defs>
  ${backgroundMarkup.shape}
  <g style="filter:${filter};"${wrapperTransform}${clipPathAttr}>
    ${baseMarkup}
    ${overlayMarkup}
  </g>
</svg>`.trim();
}
