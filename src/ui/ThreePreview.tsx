import { useCallback, useMemo, useRef } from "react";
import type { MouseEvent } from "react";
import { PreviewTransform } from "../core/types";

interface ThreePreviewProps {
  svg: string;
  transform: PreviewTransform;
  onHoverPath?: (pathId: string) => void;
  onClickPath?: (pathId: string) => void;
  readOnly?: boolean;
}

export function ThreePreview({
  svg,
  transform,
  onHoverPath,
  onClickPath,
  readOnly = false,
}: ThreePreviewProps) {
  const lastHoveredPathIdRef = useRef<string | null>(null);
  const isInteractive = !readOnly && Boolean(onHoverPath || onClickPath);
  const compositeTransform = useMemo(() => {
    return `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotate}deg)`;
  }, [transform]);

  const resolvePathId = useCallback((target: EventTarget | null): string | null => {
    if (!(target instanceof Element)) {
      return null;
    }

    const piece = target.closest("[data-foreground-piece-id]");
    if (!piece) {
      return null;
    }

    return piece.getAttribute("data-foreground-piece-id");
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (readOnly || !onHoverPath) {
        return;
      }

      const pathId = resolvePathId(event.target);
      if (!pathId || pathId === lastHoveredPathIdRef.current) {
        return;
      }

      lastHoveredPathIdRef.current = pathId;
      onHoverPath(pathId);
    },
    [onHoverPath, readOnly, resolvePathId],
  );

  const handleMouseLeave = useCallback(() => {
    lastHoveredPathIdRef.current = null;
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (readOnly || !onClickPath) {
        return;
      }

      const pathId = resolvePathId(event.target);
      if (!pathId) {
        return;
      }

      onClickPath(pathId);
    },
    [onClickPath, readOnly, resolvePathId],
  );

  return (
    <div
      className={`ps-preview-svg-host ${isInteractive ? "ps-preview-svg-host--interactive" : "ps-preview-svg-host--readonly"}`}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "1 / 1",
        borderRadius: "var(--mantine-radius-md)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: compositeTransform,
          transformOrigin: "50% 50%",
          cursor: isInteractive ? "pointer" : "default",
          pointerEvents: readOnly ? "none" : "auto",
        }}
        onMouseMove={isInteractive ? handleMouseMove : undefined}
        onMouseLeave={isInteractive ? handleMouseLeave : undefined}
        onClick={isInteractive ? handleClick : undefined}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
