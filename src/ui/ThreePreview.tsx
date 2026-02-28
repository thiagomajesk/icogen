import { useCallback, useEffect, useMemo, useRef } from "react";
import type { MouseEvent } from "react";
import { createTimeline } from "animejs";
import {
  normalizeAnimationClipState,
  resolveAnimationPresetSteps,
} from "../core/animation-clip";
import { defaultAnimationClip } from "../core/constants";
import type { AnimationClipState, PreviewTransform } from "../core/types";

interface ThreePreviewProps {
  svg: string;
  transform: PreviewTransform;
  animationClip?: AnimationClipState;
  pathAnimationClips?: Record<string, AnimationClipState>;
  onHoverPath?: (pathId: string) => void;
  onClickPath?: (pathId: string) => void;
  readOnly?: boolean;
}

const PATH_SELECTOR = "[data-foreground-piece-id]";
const FOREGROUND_ROOT_SELECTOR = '[data-foreground-root="true"]';

function resetAnimatedTransforms(host: HTMLDivElement): void {
  const nodes = host.querySelectorAll(`${FOREGROUND_ROOT_SELECTOR}, ${PATH_SELECTOR}`);
  for (const node of nodes) {
    if (!(node instanceof SVGElement)) {
      continue;
    }

    node.style.transform = "";
    node.style.translate = "";
    node.style.rotate = "";
    node.style.scale = "";
    node.style.opacity = "";
    node.style.willChange = "";
  }
}

export function ThreePreview({
  svg,
  transform,
  animationClip = defaultAnimationClip,
  pathAnimationClips,
  onHoverPath,
  onClickPath,
  readOnly = false,
}: ThreePreviewProps) {
  const lastHoveredPathIdRef = useRef<string | null>(null);
  const animationLayerRef = useRef<HTMLDivElement | null>(null);
  const animationTimelinesRef = useRef<Array<ReturnType<typeof createTimeline>>>([]);
  const isInteractive = !readOnly && Boolean(onHoverPath || onClickPath);
  const compositeTransform = useMemo(() => {
    return `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotate}deg)`;
  }, [transform]);

  useEffect(() => {
    const host = animationLayerRef.current;
    if (!host) {
      return;
    }

    if (host.innerHTML !== svg) {
      host.innerHTML = svg;
    }
  }, [svg]);

  useEffect(() => {
    const host = animationLayerRef.current;
    if (!host) {
      return;
    }

    for (const timeline of animationTimelinesRef.current) {
      timeline.revert();
    }
    animationTimelinesRef.current = [];

    const globalClip = normalizeAnimationClipState({
      ...animationClip,
      targetPathId: null,
    });
    const normalizedPathClips = Object.entries(pathAnimationClips ?? {}).map(
      ([pathId, clip]) =>
        normalizeAnimationClipState({
          ...clip,
          targetPathId: pathId,
        }),
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const foregroundRoot = host.querySelector(FOREGROUND_ROOT_SELECTOR);
    const pathPieces = host.querySelectorAll(PATH_SELECTOR);

    if (foregroundRoot instanceof SVGElement) {
      foregroundRoot.style.transformOrigin = "center";
      foregroundRoot.style.transformBox = "fill-box";
    }

    for (const piece of pathPieces) {
      if (!(piece instanceof SVGElement)) {
        continue;
      }

      piece.style.transformOrigin = "center";
      piece.style.transformBox = "fill-box";
    }

    if (prefersReducedMotion || !(foregroundRoot instanceof SVGElement)) {
      resetAnimatedTransforms(host);
      return;
    }

    const clipsToAnimate = [globalClip, ...normalizedPathClips].filter(
      (entry) => entry.preset !== "none",
    );
    if (clipsToAnimate.length === 0) {
      resetAnimatedTransforms(host);
      return;
    }

    const timelines: Array<ReturnType<typeof createTimeline>> = [];
    for (const clip of clipsToAnimate) {
      const steps = resolveAnimationPresetSteps(clip.preset);
      if (!steps) {
        continue;
      }

      const target = clip.targetPathId
        ? host.querySelector(`[data-foreground-piece-id="${clip.targetPathId}"]`)
        : foregroundRoot;
      if (!(target instanceof SVGElement)) {
        continue;
      }

      target.style.willChange = "transform, opacity";
      const segmentDuration = Math.max(60, Math.round(clip.durationMs / 2));
      const [startStep, middleStep, endStep] = steps;

      const timeline = createTimeline({
        autoplay: false,
        loop: clip.loop,
        alternate: clip.alternate,
      });

      timeline
        .add(
          target,
          {
            translateX: [startStep.x, middleStep.x],
            translateY: [startStep.y, middleStep.y],
            scale: [startStep.scale, middleStep.scale],
            rotate: [`${startStep.rotate}deg`, `${middleStep.rotate}deg`],
            opacity: [startStep.opacity ?? 1, middleStep.opacity ?? 1],
            skewX: [`${startStep.skewX ?? 0}deg`, `${middleStep.skewX ?? 0}deg`],
            skewY: [`${startStep.skewY ?? 0}deg`, `${middleStep.skewY ?? 0}deg`],
            ease: clip.ease,
            duration: segmentDuration,
          },
          0,
        )
        .add(
          target,
          {
            translateX: [middleStep.x, endStep.x],
            translateY: [middleStep.y, endStep.y],
            scale: [middleStep.scale, endStep.scale],
            rotate: [`${middleStep.rotate}deg`, `${endStep.rotate}deg`],
            opacity: [middleStep.opacity ?? 1, endStep.opacity ?? 1],
            skewX: [`${middleStep.skewX ?? 0}deg`, `${endStep.skewX ?? 0}deg`],
            skewY: [`${middleStep.skewY ?? 0}deg`, `${endStep.skewY ?? 0}deg`],
            ease: clip.ease,
            duration: segmentDuration,
          },
          segmentDuration,
        );

      timeline.play();
      timelines.push(timeline);
    }

    if (timelines.length === 0) {
      resetAnimatedTransforms(host);
      return;
    }

    animationTimelinesRef.current = timelines;

    return () => {
      for (const timeline of timelines) {
        timeline.revert();
      }
      animationTimelinesRef.current = [];
      resetAnimatedTransforms(host);
    };
  }, [animationClip, pathAnimationClips, svg]);

  const resolvePathId = useCallback((target: EventTarget | null): string | null => {
    if (!(target instanceof Element)) {
      return null;
    }

    const piece = target.closest(PATH_SELECTOR);
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
      >
        <div
          ref={animationLayerRef}
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: "50% 50%",
          }}
        />
      </div>
    </div>
  );
}
