import { useCallback, useRef } from "react";
import { fetchLocalIconSvg } from "../core/icon-catalog";
import type { CustomIcon, LayerKey, LayerState } from "../core/editor";
import { iconLabel } from "../core/platform";

interface UseIconAssignmentParams {
  base: LayerState;
  customIcons: CustomIcon[];
  overlay: LayerState;
  setBase: (value: LayerState) => void;
  setOverlay: (value: LayerState) => void;
  setStatusMessage: (message: string, error?: boolean) => void;
}

interface UseIconAssignmentResult {
  assignIcon: (iconPath: string, target?: LayerKey) => Promise<void>;
  handleAssign: (iconPath: string) => void;
}

/**
 * Handles icon SVG caching and assignment to base/overlay layers.
 */
export function useIconAssignment({
  base,
  customIcons,
  overlay,
  setBase,
  setOverlay,
  setStatusMessage,
}: UseIconAssignmentParams): UseIconAssignmentResult {
  const svgCacheRef = useRef<Map<string, string>>(new Map());

  const loadIconSvg = useCallback(
    async (iconPath: string): Promise<string> => {
      const cached = svgCacheRef.current.get(iconPath);
      if (cached) {
        return cached;
      }

      const custom = customIcons.find((icon) => icon.path === iconPath);
      if (custom) {
        svgCacheRef.current.set(iconPath, custom.svg);
        return custom.svg;
      }

      const svg = await fetchLocalIconSvg(iconPath);
      svgCacheRef.current.set(iconPath, svg);
      return svg;
    },
    [customIcons],
  );

  const assignIcon = useCallback(
    async (iconPath: string, target?: LayerKey) => {
      const svg = await loadIconSvg(iconPath);
      const resolvedTarget = target ?? "base";

      if (resolvedTarget === "base") {
        setBase({ ...base, path: iconPath, svg });
        if (!target) {
          setOverlay({ ...overlay, path: null, svg: null });
        }
      } else {
        setOverlay({ ...overlay, path: iconPath, svg });
      }

      setStatusMessage(
        `${iconLabel(iconPath)} assigned to ${resolvedTarget} layer.`,
      );
    },
    [base, loadIconSvg, overlay, setBase, setOverlay, setStatusMessage],
  );

  const handleAssign = useCallback(
    (iconPath: string) => {
      void assignIcon(iconPath).catch((error) => {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        setStatusMessage(`Could not assign icon: ${message}`, true);
      });
    },
    [assignIcon, setStatusMessage],
  );

  return {
    assignIcon,
    handleAssign,
  };
}
