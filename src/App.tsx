import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppShell, Center, SegmentedControl } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconAdjustmentsHorizontal, IconEye } from "@tabler/icons-react";
import { IconLibrarySidebar } from "./ui/IconLibrarySidebar";
import { PreviewPanel } from "./ui/PreviewPanel";
import {
  defaultAnimation,
  defaultEffects,
} from "./core/constants";
import type { ForegroundStyleState, ParsedSvg } from "./core/types";
import {
  buildCompositeSvg,
  buildPreviewTransform,
} from "./utils/svg";
import { parseSvgBreakout } from "./utils/svg-breakout";
import { buildForegroundComposite } from "./utils/foreground-composite";
import {
  loadIconSettings,
  type ForegroundPathSettings,
} from "./core/icon-history";
import type { IconLockEntry } from "./core/icon-client";
import { useEditorStore } from "./core/editorStore";
import { useIconAssignment } from "./hooks/useIconAssignment";
import { useIconCatalog } from "./hooks/useIconCatalog";

type MobilePanel = "settings" | "preview";

const COMPACT_LAYOUT_MAX_WIDTH = 1280;
const MOBILE_LAYOUT_MAX_WIDTH = 960;
const APP_SHELL_WORKSPACE_BG = "var(--mantine-color-dark-9)";

interface ForegroundPathOption {
  id: string;
  label: string;
}

interface ForegroundPathEditorState {
  enabled: boolean;
  options: ForegroundPathOption[];
  selectedPathId: string | null;
  pathStyles: Record<string, ForegroundStyleState>;
}

interface AppProps {
  forcedIcon?: { path: string; name: string } | null;
  iconCatalog?: IconLockEntry[];
  onIconNavigate?: (iconPath: string, iconName: string) => void;
  onExitEditor?: () => void;
  onOpenGallery?: () => void;
}

export default function App({
  forcedIcon = null,
  iconCatalog = [],
  onIconNavigate,
  onExitEditor,
  onOpenGallery,
}: AppProps) {
  const searchInput = useEditorStore((state) => state.searchInput);
  const setSearchInput = useEditorStore((state) => state.setSearchInput);
  const searchQuery = useEditorStore((state) => state.searchQuery);
  const setSearchQuery = useEditorStore((state) => state.setSearchQuery);

  const iconPage = useEditorStore((state) => state.iconPage);
  const setIconPage = useEditorStore((state) => state.setIconPage);
  const iconTotal = useEditorStore((state) => state.iconTotal);
  const setIconTotal = useEditorStore((state) => state.setIconTotal);

  const page = useEditorStore((state) => state.page);
  const setPage = useEditorStore((state) => state.setPage);
  const setStats = useEditorStore((state) => state.setStats);

  const base = useEditorStore((state) => state.base);
  const setBase = useEditorStore((state) => state.setBase);
  const overlay = useEditorStore((state) => state.overlay);
  const setOverlay = useEditorStore((state) => state.setOverlay);

  const background = useEditorStore((state) => state.background);
  const setBackground = useEditorStore((state) => state.setBackground);
  const foreground = useEditorStore((state) => state.foreground);
  const setForeground = useEditorStore((state) => state.setForeground);

  const setStatus = useEditorStore((state) => state.setStatus);
  const customIcons = useEditorStore((state) => state.customIcons);

  const selectedIconPath = useEditorStore((state) => state.selectedIconPath);
  const selectedIconName = useEditorStore((state) => state.selectedIconName);
  const setSelectedIconPath = useEditorStore((state) => state.setSelectedIconPath);
  const saveCurrentIconSettings = useEditorStore(
    (state) => state.saveCurrentIconSettings,
  );

  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("preview");
  const [foregroundPathEditors, setForegroundPathEditors] = useState<
    Record<string, ForegroundPathEditorState>
  >({});
  const [pathBlink, setPathBlink] = useState<{
    iconPath: string | null;
    pathId: string | null;
    token: number;
  }>({
    iconPath: null,
    pathId: null,
    token: 0,
  });

  const parsedSvgCacheRef = useRef<Map<string, ParsedSvg>>(new Map());
  const breakoutCacheRef = useRef<Map<string, ReturnType<typeof parseSvgBreakout>>>(
    new Map(),
  );
  const previousIconNameRef = useRef<string | null>(null);
  const lastForcedIconPathRef = useRef<string | null>(null);

  const setStatusMessage = useCallback(
    (message: string, error = false) => {
      setStatus({ message, error });
    },
    [setStatus],
  );

  useEffect(() => {
    if (!pathBlink.pathId) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setPathBlink((previous) => {
        if (previous.token !== pathBlink.token) {
          return previous;
        }
        return {
          ...previous,
          pathId: null,
        };
      });
    }, 800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pathBlink]);

  const currentPathEditor = useMemo<ForegroundPathEditorState | null>(() => {
    if (!selectedIconPath) {
      return null;
    }

    return foregroundPathEditors[selectedIconPath] ?? null;
  }, [foregroundPathEditors, selectedIconPath]);

  const activePathStyle = useMemo<ForegroundStyleState | null>(() => {
    if (!currentPathEditor?.enabled || !currentPathEditor.selectedPathId) {
      return null;
    }

    return (
      currentPathEditor.pathStyles[currentPathEditor.selectedPathId] ??
      foreground
    );
  }, [currentPathEditor, foreground]);

  const currentForegroundPathSettings = useMemo<ForegroundPathSettings | null>(() => {
    if (!currentPathEditor?.enabled) {
      return null;
    }

    return {
      enabled: true,
      selectedPathId: currentPathEditor.selectedPathId,
      pathStyles: currentPathEditor.pathStyles,
    };
  }, [
    currentPathEditor?.enabled,
    currentPathEditor?.pathStyles,
    currentPathEditor?.selectedPathId,
  ]);

  useEffect(() => {
    if (selectedIconName !== previousIconNameRef.current) {
      previousIconNameRef.current = selectedIconName;
      return;
    }

    if (selectedIconName) {
      saveCurrentIconSettings(currentForegroundPathSettings);
    }
  }, [
    background,
    currentForegroundPathSettings,
    foreground,
    saveCurrentIconSettings,
    selectedIconName,
  ]);

  const { allVisibleIcons, maxPage } = useIconCatalog({
    customIcons,
    iconPage,
    iconTotal,
    page,
    searchInput,
    searchQuery,
    setIconPage,
    setIconTotal,
    setPage,
    setSearchQuery,
    setStats,
    onError: (message) => {
      setStatusMessage(message, true);
    },
  });

  const { assignIcon, handleAssign } = useIconAssignment({
    base,
    customIcons,
    overlay,
    setBase,
    setOverlay,
    setStatusMessage,
  });

  const iconCatalogByPath = useMemo(() => {
    return new Map(iconCatalog.map((icon) => [icon.path, icon]));
  }, [iconCatalog]);

  const selectedIconMetadata = useMemo(() => {
    if (!selectedIconPath) {
      return null;
    }

    const customIcon = customIcons.find((icon) => icon.path === selectedIconPath);
    if (customIcon) {
      return {
        name: customIcon.name,
        author: customIcon.author,
        description: null as string | null,
        tags: [] as string[],
        externalUrl: null as string | null,
      };
    }

    const iconEntry = iconCatalogByPath.get(selectedIconPath);
    if (iconEntry) {
      return {
        name: iconEntry.name,
        author: iconEntry.author,
        description: iconEntry.description,
        tags: iconEntry.tags,
        externalUrl: iconEntry.externalUrl,
      };
    }

    const visibleIcon = allVisibleIcons.find((icon) => icon.path === selectedIconPath);
    if (!visibleIcon) {
      return null;
    }

    return {
      name: visibleIcon.name,
      author: visibleIcon.author,
      description: null as string | null,
      tags: [] as string[],
      externalUrl: null as string | null,
    };
  }, [allVisibleIcons, customIcons, iconCatalogByPath, selectedIconPath]);

  useEffect(() => {
    if (!forcedIcon) {
      return;
    }

    if (lastForcedIconPathRef.current === forcedIcon.path) {
      return;
    }

    lastForcedIconPathRef.current = forcedIcon.path;
    setSelectedIconPath(forcedIcon.path, forcedIcon.name);
    void assignIcon(forcedIcon.path).catch((error) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      setStatusMessage(`Could not assign icon: ${message}`, true);
    });
  }, [assignIcon, forcedIcon, setSelectedIconPath, setStatusMessage]);

  useEffect(() => {
    if (
      !selectedIconPath ||
      !selectedIconName ||
      !base.svg ||
      base.path !== selectedIconPath
    ) {
      return;
    }

    const saved = loadIconSettings(selectedIconName);
    const savedForegroundPaths = saved?.foregroundPaths;
    if (!savedForegroundPaths?.enabled) {
      return;
    }

    const breakout = parseSvgBreakout(
      base.svg,
      breakoutCacheRef.current,
      parsedSvgCacheRef.current,
    );
    if (breakout.pieces.length === 0) {
      return;
    }

    const options = breakout.pieces.map((piece) => ({
      id: piece.id,
      label: piece.label,
    }));
    const optionIds = new Set(options.map((option) => option.id));

    const pathStyles: Record<string, ForegroundStyleState> = {};
    for (const [pathId, style] of Object.entries(savedForegroundPaths.pathStyles)) {
      if (optionIds.has(pathId)) {
        pathStyles[pathId] = style;
      }
    }

    const selectedPathId =
      savedForegroundPaths.selectedPathId &&
      optionIds.has(savedForegroundPaths.selectedPathId)
        ? savedForegroundPaths.selectedPathId
        : options[0]?.id ?? null;

    setForegroundPathEditors((previous) => ({
      ...previous,
      [selectedIconPath]: {
        enabled: true,
        options,
        selectedPathId,
        pathStyles,
      },
    }));
  }, [base.path, base.svg, selectedIconName, selectedIconPath]);

  const displayForeground = activePathStyle ?? foreground;

  const foregroundForComposite = useMemo<ForegroundStyleState | null>(() => {
    if (!currentPathEditor?.enabled) {
      return foreground;
    }

    // Per-path styling is already baked into `baseForComposite`, so skip
    // the global foreground pass entirely to avoid overriding fills.
    return null;
  }, [currentPathEditor?.enabled, foreground]);

  const baseForComposite = useMemo(() => {
    if (
      !selectedIconPath ||
      !base.svg ||
      base.path !== selectedIconPath ||
      !currentPathEditor?.enabled
    ) {
      return base;
    }

    const styledForeground = buildForegroundComposite({
      svg: base.svg,
      foreground,
      pathConfig: {
        enabled: true,
        pathStyles: currentPathEditor.pathStyles,
      },
      blink:
        pathBlink.iconPath === selectedIconPath
          ? { pathId: pathBlink.pathId, token: pathBlink.token }
          : null,
      parsedSvgCache: parsedSvgCacheRef.current,
      breakoutCache: breakoutCacheRef.current,
    });

    return {
      ...base,
      svg: styledForeground.svg,
    };
  }, [
    base,
    currentPathEditor?.enabled,
    currentPathEditor?.pathStyles,
    foreground,
    pathBlink.iconPath,
    pathBlink.pathId,
    pathBlink.token,
    selectedIconPath,
  ]);

  const compositeSvg = useMemo(() => {
    const hasSelection = Boolean(base.path || overlay.path);
    const effectiveBackground = hasSelection
      ? background
      : { ...background, type: "none" as const };
    const effectiveForeground = hasSelection
      ? foregroundForComposite
      : null;

    return buildCompositeSvg(
      baseForComposite,
      overlay,
      defaultEffects,
      defaultAnimation,
      effectiveBackground,
      effectiveForeground,
      parsedSvgCacheRef.current,
      null,
    );
  }, [
    background,
    base.path,
    baseForComposite,
    foregroundForComposite,
    overlay,
  ]);

  const previewTransform = useMemo(() => {
    return buildPreviewTransform(defaultAnimation, 1);
  }, []);

  const breakApartForegroundPaths = useCallback(() => {
    if (!selectedIconPath || !base.svg || base.path !== selectedIconPath) {
      setStatusMessage("Select a foreground icon before breaking paths.", true);
      return;
    }

    const breakout = parseSvgBreakout(
      base.svg,
      breakoutCacheRef.current,
      parsedSvgCacheRef.current,
    );
    if (breakout.pieces.length === 0) {
      setStatusMessage("No editable pieces were found in this icon.", true);
      return;
    }

    setForegroundPathEditors((previous) => {
      const current = previous[selectedIconPath];
      const options = breakout.pieces.map((piece) => ({
        id: piece.id,
        label: piece.label,
      }));
      const optionIds = new Set(options.map((option) => option.id));
      const selectedPathId =
        current?.selectedPathId && optionIds.has(current.selectedPathId)
          ? current.selectedPathId
          : options[0]?.id ?? null;
      const pathStyles: Record<string, ForegroundStyleState> = {};
      for (const [pathId, style] of Object.entries(current?.pathStyles ?? {})) {
        if (optionIds.has(pathId)) {
          pathStyles[pathId] = style;
        }
      }

      return {
        ...previous,
        [selectedIconPath]: {
          enabled: true,
          options,
          selectedPathId,
          pathStyles,
        },
      };
    });
    setStatusMessage("Foreground paths are now editable individually.");
  }, [base.path, base.svg, selectedIconPath, setStatusMessage]);

  const resetBreakApartForegroundPaths = useCallback(() => {
    if (!selectedIconPath) {
      return;
    }

    setForegroundPathEditors((previous) => {
      if (!previous[selectedIconPath]) {
        return previous;
      }

      const { [selectedIconPath]: _removed, ...rest } = previous;
      return rest;
    });

    setPathBlink((previous) => {
      if (previous.iconPath !== selectedIconPath) {
        return previous;
      }

      return {
        iconPath: null,
        pathId: null,
        token: previous.token + 1,
      };
    });

    setStatusMessage("Per-path foreground editing has been reset.");
  }, [selectedIconPath, setStatusMessage]);

  const setSelectedForegroundPathId = useCallback(
    (nextPathId: string, shouldBlink = true) => {
      if (!selectedIconPath) {
        return;
      }

      setForegroundPathEditors((previous) => {
        const current = previous[selectedIconPath];
        if (!current || !current.enabled) {
          return previous;
        }

        if (!current.options.some((option) => option.id === nextPathId)) {
          return previous;
        }

        if (current.selectedPathId === nextPathId) {
          return previous;
        }

        return {
          ...previous,
          [selectedIconPath]: {
            ...current,
            selectedPathId: nextPathId,
          },
        };
      });

      if (!shouldBlink) {
        return;
      }

      setPathBlink((previous) => {
        if (previous.iconPath === selectedIconPath && previous.pathId === nextPathId) {
          return previous;
        }

        return {
          iconPath: selectedIconPath,
          pathId: nextPathId,
          token: previous.token + 1,
        };
      });
    },
    [selectedIconPath],
  );

  const cycleForegroundPath = useCallback(
    (direction: 1 | -1) => {
      if (!selectedIconPath) {
        return;
      }

      const current = foregroundPathEditors[selectedIconPath];
      if (!current?.enabled || current.options.length === 0) {
        return;
      }

      const currentIndex = current.options.findIndex(
        (option) => option.id === current.selectedPathId,
      );
      const nextIndex =
        currentIndex === -1
          ? 0
          : (currentIndex + direction + current.options.length) %
            current.options.length;
      setSelectedForegroundPathId(current.options[nextIndex].id);
    },
    [foregroundPathEditors, selectedIconPath, setSelectedForegroundPathId],
  );

  const handleForegroundChange = useCallback(
    (nextForeground: ForegroundStyleState) => {
      if (
        !selectedIconPath ||
        !currentPathEditor?.enabled ||
        !currentPathEditor.selectedPathId
      ) {
        setForeground(nextForeground);
        return;
      }

      setForegroundPathEditors((previous) => {
        const current = previous[selectedIconPath];
        if (!current || !current.selectedPathId) {
          return previous;
        }

        return {
          ...previous,
          [selectedIconPath]: {
            ...current,
            pathStyles: {
              ...current.pathStyles,
              [current.selectedPathId]: nextForeground,
            },
          },
        };
      });
    },
    [
      currentPathEditor?.enabled,
      currentPathEditor?.selectedPathId,
      selectedIconPath,
      setForeground,
    ],
  );

  const isCompactLayout = useMediaQuery(
    `(max-width: ${COMPACT_LAYOUT_MAX_WIDTH}px)`,
  ) ?? false;
  const isMobileLayout = useMediaQuery(
    `(max-width: ${MOBILE_LAYOUT_MAX_WIDTH}px)`,
  ) ?? false;
  const leftColumnWidth = isCompactLayout ? 300 : 340;

  const iconLibraryPanel = (
    <IconLibrarySidebar
      icons={allVisibleIcons}
      customIcons={customIcons}
      searchInput={searchInput}
      onSearchChange={setSearchInput}
      page={page}
      maxPage={maxPage}
      onPrev={() => setPage(Math.max(1, page - 1))}
      onNext={() => setPage(Math.min(maxPage, page + 1))}
      onAssign={(iconPath) => {
        const icon = allVisibleIcons.find((item) => item.path === iconPath);
        const iconName = icon?.name ?? null;
        setSelectedIconPath(iconPath, icon?.name || null);
        handleAssign(iconPath);
        if (iconName && onIconNavigate) {
          onIconNavigate(iconPath, iconName);
        }
      }}
      onOpenGallery={onOpenGallery}
      selectedIconPath={selectedIconPath}
      onDeselectIcon={() => {
        setSelectedIconPath(null);
        if (onExitEditor) {
          onExitEditor();
          return;
        }
      }}
      background={background}
      onBackgroundChange={setBackground}
      foreground={displayForeground}
      onForegroundChange={handleForegroundChange}
      canBreakApartPaths={Boolean(base.path === selectedIconPath && base.svg)}
      isPathsBrokenApart={Boolean(currentPathEditor?.enabled)}
      onBreakApartPaths={breakApartForegroundPaths}
      onResetBreakApartPaths={resetBreakApartForegroundPaths}
      foregroundPathOptions={currentPathEditor?.options ?? []}
      selectedForegroundPathId={currentPathEditor?.selectedPathId ?? null}
      onCycleForegroundPath={cycleForegroundPath}
    />
  );

  const previewPanel = (
    <PreviewPanel
      compositeSvg={compositeSvg}
      previewTransform={previewTransform}
      showToolbar={true}
      iconCatalog={iconCatalog}
      customIcons={customIcons}
      onIconSelect={(iconPath, iconName) => {
        setSelectedIconPath(iconPath, iconName);
        handleAssign(iconPath);
        if (onIconNavigate) {
          onIconNavigate(iconPath, iconName);
        }
      }}
      pathsInteractive={Boolean(currentPathEditor?.enabled)}
      onSelectForegroundPath={(pathId) => {
        setSelectedForegroundPathId(pathId, true);
      }}
      selectedIconName={selectedIconMetadata?.name ?? null}
      selectedIconAuthor={selectedIconMetadata?.author ?? null}
      selectedIconDescription={selectedIconMetadata?.description ?? null}
      selectedIconTags={selectedIconMetadata?.tags ?? []}
      selectedIconExternalUrl={selectedIconMetadata?.externalUrl ?? null}
    />
  );

  if (isMobileLayout) {
    return (
      <AppShell padding="xs" style={{ height: "100dvh" }}>
        <AppShell.Main
          style={{
            height: "100%",
            minHeight: 0,
            backgroundColor: APP_SHELL_WORKSPACE_BG,
          }}
        >
          <div
            style={{
              height: "100%",
              minHeight: 0,
              display: "grid",
              gridTemplateRows: "auto minmax(0, 1fr)",
              gap: 8,
            }}
          >
            <SegmentedControl
              value={mobilePanel}
              onChange={(nextValue) => setMobilePanel(nextValue as MobilePanel)}
              fullWidth
              data={[
                {
                  value: "settings",
                  label: (
                    <Center style={{ gap: 6 }}>
                      <IconAdjustmentsHorizontal size={14} stroke={1.8} />
                      <span>Settings</span>
                    </Center>
                  ),
                },
                {
                  value: "preview",
                  label: (
                    <Center style={{ gap: 6 }}>
                      <IconEye size={14} stroke={1.8} />
                      <span>Preview</span>
                    </Center>
                  ),
                },
              ]}
            />
            <div style={{ minHeight: 0, overflow: "auto" }}>
              {mobilePanel === "settings" ? iconLibraryPanel : previewPanel}
            </div>
          </div>
        </AppShell.Main>
      </AppShell>
    );
  }

  return (
    <AppShell
      padding="md"
      style={{ height: "100dvh" }}
      navbar={{ width: leftColumnWidth, breakpoint: "sm" }}
    >
      <AppShell.Navbar p="md" style={{ minHeight: 0, overflow: "hidden" }}>
        {iconLibraryPanel}
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          minHeight: 0,
          overflow: "hidden",
          height: "100%",
          backgroundColor: APP_SHELL_WORKSPACE_BG,
        }}
      >
        {previewPanel}
      </AppShell.Main>
    </AppShell>
  );
}
