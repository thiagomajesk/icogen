import React, { useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Anchor,
  Badge,
  Group,
  Paper,
  Popover,
  ScrollArea,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { IconHistory, IconInfoCircle, IconTemplate } from "@tabler/icons-react";
import type {
  CustomIcon,
  LayerState,
  ParsedSvg,
  PreviewTransform,
} from "../core/types";
import { ThreePreview } from "./ThreePreview";
import { ICON_HISTORY_UPDATED_EVENT, loadIconHistory } from "../core/icon-history";
import { buildCompositeSvg } from "../utils/svg";
import { type ParsedSvgBreakout } from "../utils/svg-breakout";
import { buildForegroundComposite } from "../utils/foreground-composite";
import { fetchLocalIconSvg } from "../core/icon-client";
import { IconPreviewTile } from "./IconPreviewTile";
import {
  defaultAnimation,
  defaultBaseLayer,
  defaultEffects,
  defaultOverlayLayer,
} from "../core/constants";

interface PreviewPanelProps {
  compositeSvg: string;
  previewTransform: PreviewTransform;
  showToolbar: boolean;
  iconCatalog: Array<{ name: string; path: string }>;
  customIcons: CustomIcon[];
  onIconSelect: (iconPath: string, iconName: string) => void;
  pathsInteractive: boolean;
  onSelectForegroundPath: (pathId: string) => void;
  selectedIconName: string | null;
  selectedIconAuthor: string | null;
  selectedIconDescription: string | null;
  selectedIconTags: string[];
  selectedIconExternalUrl: string | null;
}

interface HistoryIconRef {
  name: string;
  path: string;
  svg: string | undefined;
  isCustom: boolean;
}

interface HistoryItem {
  name: string;
  path: string;
  compositeSvg: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  compositeSvg,
  previewTransform,
  showToolbar,
  iconCatalog,
  customIcons,
  onIconSelect,
  pathsInteractive,
  onSelectForegroundPath,
  selectedIconName,
  selectedIconAuthor,
  selectedIconDescription,
  selectedIconTags,
  selectedIconExternalUrl,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>("history");
  const [iconSvgs, setIconSvgs] = useState<Record<string, string>>({});
  const [historyRevision, setHistoryRevision] = useState(0);
  const historyPreviewTransform: PreviewTransform = {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
  };

  useEffect(() => {
    const handleHistoryUpdated = (): void => {
      setHistoryRevision((current) => current + 1);
    };

    window.addEventListener(ICON_HISTORY_UPDATED_EVENT, handleHistoryUpdated);
    return () => {
      window.removeEventListener(ICON_HISTORY_UPDATED_EVENT, handleHistoryUpdated);
    };
  }, []);

  const historyIconRefs = useMemo(() => {
    const history = loadIconHistory();
    return Object.keys(history).flatMap<HistoryIconRef>((name) => {
      const icon = iconCatalog.find((item) => item.name === name);
      const customIcon = customIcons.find((item) => item.name === name);
      if (!icon && !customIcon) {
        return [];
      }

      return [
        {
          name,
          path: customIcon?.path ?? icon!.path,
          svg: customIcon?.svg,
          isCustom: !!customIcon,
        },
      ];
    });
  }, [iconCatalog, customIcons, historyRevision]);

  useEffect(() => {
    let cancelled = false;
    const fetchSvgs = async (): Promise<void> => {
      const svgsToFetch = historyIconRefs.filter(
        (item) => !item.isCustom && !iconSvgs[item.name],
      );
      if (svgsToFetch.length === 0) {
        return;
      }

      const loadedSvgs: Record<string, string> = {};
      await Promise.all(
        svgsToFetch.map(async (item) => {
          try {
            loadedSvgs[item.name] = await fetchLocalIconSvg(item.path);
          } catch {
            // Ignore history preview failures to keep editor usable.
          }
        }),
      );

      if (cancelled || Object.keys(loadedSvgs).length === 0) {
        return;
      }

      setIconSvgs((previous) => ({
        ...previous,
        ...loadedSvgs,
      }));
    };

    void fetchSvgs();
    return () => {
      cancelled = true;
    };
  }, [historyIconRefs, iconSvgs, historyRevision]);

  const historyItems = useMemo(() => {
    const history = loadIconHistory();
    const parsedCache = new Map<string, ParsedSvg>();
    const breakoutCache = new Map<string, ParsedSvgBreakout>();

    return historyIconRefs.flatMap<HistoryItem>((item) => {
      const svg = item.isCustom ? item.svg : iconSvgs[item.name];
      const settings = history[item.name];
      if (!svg || !settings) {
        return [];
      }

      const styledForeground = buildForegroundComposite({
        svg,
        foreground: settings.foreground,
        pathConfig: settings.foregroundPaths
          ? {
              enabled: settings.foregroundPaths.enabled,
              pathStyles: settings.foregroundPaths.pathStyles,
            }
          : null,
        parsedSvgCache: parsedCache,
        breakoutCache,
      });

      const baseLayer: LayerState = {
        ...defaultBaseLayer,
        path: item.path,
        svg: styledForeground.svg,
      };

      const compositeHistorySvg = buildCompositeSvg(
        baseLayer,
        defaultOverlayLayer,
        defaultEffects,
        defaultAnimation,
        settings.background,
        styledForeground.foregroundForComposite,
        parsedCache,
        null,
      );

      return [
        {
          name: item.name,
          path: item.path,
          compositeSvg: compositeHistorySvg,
        },
      ];
    });
  }, [historyIconRefs, iconSvgs]);
  const hasIconInfo = Boolean(
    selectedIconName ||
      selectedIconAuthor ||
      selectedIconDescription ||
      selectedIconExternalUrl ||
      selectedIconTags.length > 0,
  );

  return (
    <div
      style={{
        height: "100%",
        minHeight: 0,
        display: "grid",
        gridTemplateRows: "minmax(0, 1fr) auto",
      }}
    >
      <div
        style={{
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          padding: "8px 0 12px",
          gap: 8,
          position: "relative",
        }}
      >
        {hasIconInfo ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 2,
            }}
          >
            <Popover width={360} position="bottom-end" withArrow shadow="md">
              <Popover.Target>
                <ActionIcon
                  size="xl"
                  variant="subtle"
                  color="gray"
                  aria-label="Open icon info"
                >
                  <IconInfoCircle size={22} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack gap={6}>
                  {selectedIconExternalUrl && selectedIconName ? (
                    <Anchor
                      href={selectedIconExternalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      fw={700}
                      size="sm"
                    >
                      {selectedIconName}
                    </Anchor>
                  ) : (
                    <Text fw={700} size="sm">
                      {selectedIconName ?? "Unknown icon"}
                    </Text>
                  )}
                  <Text size="sm">
                    <strong>Authored by</strong>{" "}
                    {selectedIconAuthor ?? "Unknown author"}
                  </Text>
                  {selectedIconTags.length > 0 ? (
                    <Group gap={6} wrap="wrap">
                      {selectedIconTags.map((tag, index) => (
                        <Badge key={`${tag}-${index}`} variant="light">
                          {tag}
                        </Badge>
                      ))}
                    </Group>
                  ) : null}
                  <Text size="sm" style={{ fontStyle: "italic" }}>
                    {selectedIconDescription ?? "No description available."}
                  </Text>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </div>
        ) : null}
        <div
          style={{
            width: "min(100%, clamp(260px, calc(100dvh - 320px), 700px))",
            maxWidth: "100%",
            minWidth: 300,
          }}
        >
          <div
            className="ps-preview-canvas"
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: 0,
              aspectRatio: "1 / 1",
            }}
          >
            <ThreePreview
              svg={compositeSvg}
              transform={previewTransform}
              readOnly={!pathsInteractive}
              onClickPath={pathsInteractive ? onSelectForegroundPath : undefined}
            />
          </div>
        </div>
      </div>

      {showToolbar ? (
        <Paper
          withBorder
          radius="md"
          p="xs"
          style={{ boxShadow: "0 -10px 24px rgba(0, 0, 0, 0.38)" }}
        >
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab
                value="history"
                leftSection={<IconHistory size={14} stroke={1.8} />}
              >
                History
              </Tabs.Tab>
              <Tabs.Tab
                value="presets"
                leftSection={<IconTemplate size={14} stroke={1.8} />}
              >
                Presets
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="history" pt="xs">
              {historyItems.length > 0 ? (
                <ScrollArea
                  type="auto"
                  scrollbars="x"
                  viewportProps={{
                    style: { overflowY: "hidden", paddingBottom: 0 },
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: 6,
                      width: "max-content",
                    }}
                  >
                    {historyItems.map((item) => (
                      <IconPreviewTile
                        key={item.name}
                        className="ps-history-preview-tile"
                        onClick={() => onIconSelect(item.path, item.name)}
                        title={item.name}
                        style={{
                          width: 80,
                          flex: "0 0 auto",
                        }}
                        media={
                          <div className="ps-icon-preview-content">
                            <ThreePreview
                              svg={item.compositeSvg}
                              transform={historyPreviewTransform}
                              readOnly
                            />
                          </div>
                        }
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <Text size="sm" c="dimmed">
                  No recent icons
                </Text>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="presets" pt="sm">
              <Text size="sm" c="dimmed">
                Presets coming soon...
              </Text>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      ) : null}
    </div>
  );
};
