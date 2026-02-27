import type { BackgroundShape } from "../core/types";

export interface StyleShapeOption {
  value: BackgroundShape;
  label: string;
}

export const STYLE_SHAPE_OPTIONS: StyleShapeOption[] = [
  { value: "circle", label: "Circle" },
  { value: "triangle", label: "Triangle" },
  { value: "square", label: "Square" },
  { value: "square-alt", label: "Square Alt" },
  { value: "rounded-square", label: "Rounded Square" },
  { value: "star5", label: "Star 5" },
  { value: "star5-alt", label: "Star 5 Alt" },
  { value: "star6", label: "Star 6" },
  { value: "star6-alt", label: "Star 6 Alt" },
  { value: "star7", label: "Star 7" },
];

interface StyleShapeIconProps {
  shape: BackgroundShape;
}

export function StyleShapeIcon({ shape }: StyleShapeIconProps) {
  const common = {
    fill: "currentColor",
    stroke: "none",
  } as const;

  if (shape === "circle") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="9" {...common} />
      </svg>
    );
  }

  if (shape === "triangle") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <polygon points="12,3 21,21 3,21" {...common} />
      </svg>
    );
  }

  if (shape === "square") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="3" width="18" height="18" {...common} />
      </svg>
    );
  }

  if (shape === "square-alt") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <polygon points="12,2 22,12 12,22 2,12" {...common} />
      </svg>
    );
  }

  if (shape === "rounded-square") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="4" ry="4" {...common} />
      </svg>
    );
  }

  if (shape === "star5") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <polygon
          points="12,2 14.7,8.2 21.5,8.8 16.3,13.3 17.9,20 12,16.1 6.1,20 7.7,13.3 2.5,8.8 9.3,8.2"
          {...common}
        />
      </svg>
    );
  }

  if (shape === "star5-alt") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <polygon
          points="12,2 16,7.5 22,10 16,12.5 12,18 8,12.5 2,10 8,7.5"
          {...common}
        />
      </svg>
    );
  }

  if (shape === "star6") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <polygon
          points="12,2 15.5,8.5 22,12 15.5,15.5 12,22 8.5,15.5 2,12 8.5,8.5"
          {...common}
        />
      </svg>
    );
  }

  if (shape === "star6-alt") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <polygon
          points="12,2 16.2,7.8 22,12 16.2,16.2 12,22 7.8,16.2 2,12 7.8,7.8"
          {...common}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <polygon
        points="12,2 14.4,7 19.8,6.5 17,11.1 21.2,14.7 15.8,15.6 16.2,21 12,17.5 7.8,21 8.2,15.6 2.8,14.7 7,11.1 4.2,6.5 9.6,7"
        {...common}
      />
    </svg>
  );
}
