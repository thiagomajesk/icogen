import type { BackgroundShape } from "../core/editor";

export interface StyleShapeOption {
  value: BackgroundShape;
  label: string;
}

export const STYLE_SHAPE_OPTIONS: StyleShapeOption[] = [
  { value: "circle", label: "Circle" },
  { value: "triangle", label: "Triangle" },
  { value: "square", label: "Square" },
  { value: "rounded-square", label: "Rounded Square" },
  { value: "star5", label: "Star 5" },
  { value: "star6", label: "Star 6" },
  { value: "star7", label: "Star 7" },
  { value: "hexa", label: "Hexa" },
  { value: "octa", label: "Octa" },
];

interface StyleShapeIconProps {
  shape: BackgroundShape;
}

function buildRegularPolygonPoints(sides: number, rotationDeg: number): string {
  const center = 12;
  const radius = 9.5;
  const vertices: string[] = [];

  for (let index = 0; index < sides; index += 1) {
    const angle = ((rotationDeg - 90 + (360 / sides) * index) * Math.PI) / 180;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    vertices.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return vertices.join(" ");
}

function buildStarPoints(points: number, rotationDeg: number): string {
  const center = 12;
  const outer = 10;
  const inner = 4.6;
  const vertices: string[] = [];

  for (let index = 0; index < points * 2; index += 1) {
    const radius = index % 2 === 0 ? outer : inner;
    const angle =
      ((rotationDeg - 90 + (360 / (points * 2)) * index) * Math.PI) / 180;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    vertices.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return vertices.join(" ");
}

export function StyleShapeIcon({ shape }: StyleShapeIconProps) {
  const common = {
    fill: "currentColor",
    stroke: "none",
  } as const;
  const svgProps = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    width: "100%",
    height: "100%",
  } as const;

  if (shape === "circle") {
    return (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="9" {...common} />
      </svg>
    );
  }

  if (shape === "triangle") {
    return (
      <svg {...svgProps}>
        <polygon points="12,3 21,21 3,21" {...common} />
      </svg>
    );
  }

  if (shape === "square") {
    return (
      <svg {...svgProps}>
        <rect x="3" y="3" width="18" height="18" {...common} />
      </svg>
    );
  }

  if (shape === "rounded-square") {
    return (
      <svg {...svgProps}>
        <rect x="3" y="3" width="18" height="18" rx="4" ry="4" {...common} />
      </svg>
    );
  }

  if (shape === "star5") {
    return (
      <svg {...svgProps}>
        <polygon points={buildStarPoints(5, 0)} {...common} />
      </svg>
    );
  }

  if (shape === "star6") {
    return (
      <svg {...svgProps}>
        <polygon points={buildStarPoints(6, 0)} {...common} />
      </svg>
    );
  }

  if (shape === "star7") {
    return (
      <svg {...svgProps}>
        <polygon points={buildStarPoints(7, 0)} {...common} />
      </svg>
    );
  }

  if (shape === "hexa") {
    return (
      <svg {...svgProps}>
        <polygon points={buildRegularPolygonPoints(6, 0)} {...common} />
      </svg>
    );
  }

  return (
    <svg {...svgProps}>
      <polygon points={buildRegularPolygonPoints(8, 0)} {...common} />
    </svg>
  );
}
