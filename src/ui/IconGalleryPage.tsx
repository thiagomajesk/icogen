import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActionIcon,
  Anchor,
  AppShell,
  Badge,
  Chip,
  Group,
  Popover,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconHome, IconInfoCircle } from "@tabler/icons-react";
import type { IconLockEntry } from "../core/icon-client";
import { getLocalIconPath } from "../core/icon-client";
import { iconLabel } from "../utils/format";
import { IconPreviewTile } from "./IconPreviewTile";
import { SearchInput } from "./SearchInput";

interface IconGalleryPageProps {
  icons: IconLockEntry[];
  onOpenIcon: (iconPath: string, iconName: string) => void;
  onGoHome: () => void;
}

interface TagCountEntry {
  tag: string;
  count: number;
}

const ICON_PAGE_SIZE = 100;
const GALLERY_MAIN_BG = "var(--mantine-color-dark-9)";

function iconCategory(iconPath: string): string {
  const [category] = iconPath.split("/");
  return category || "misc";
}

function matchesQuery(icon: IconLockEntry, query: string): boolean {
  if (!query) {
    return true;
  }

  const normalized = query.toLowerCase();
  return (
    icon.name.toLowerCase().includes(normalized) ||
    icon.path.toLowerCase().includes(normalized) ||
    icon.author.toLowerCase().includes(normalized) ||
    icon.tags.some((tag) => tag.toLowerCase().includes(normalized))
  );
}

export function IconGalleryPage({
  icons,
  onOpenIcon,
  onGoHome,
}: IconGalleryPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ICON_PAGE_SIZE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const query = search.trim().toLowerCase();

  const categories = useMemo(() => {
    return [...new Set(icons.map((icon) => iconCategory(icon.path)))]
      .sort((left, right) => left.localeCompare(right))
      .map((categoryValue) => ({
        value: categoryValue,
        label: categoryValue,
      }));
  }, [icons]);

  const visibleTagCounts = useMemo<TagCountEntry[]>(() => {
    const counts = new Map<string, number>();
    for (const icon of icons) {
      if (category !== "all" && iconCategory(icon.path) !== category) {
        continue;
      }
      if (!matchesQuery(icon, query)) {
        continue;
      }

      for (const tag of icon.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }

    return [...counts.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((left, right) => left.tag.localeCompare(right.tag));
  }, [category, icons, query]);

  const filteredIcons = useMemo(() => {
    return icons
      .filter((icon) => {
        if (category !== "all" && iconCategory(icon.path) !== category) {
          return false;
        }
        if (selectedTag && !icon.tags.includes(selectedTag)) {
          return false;
        }
        return matchesQuery(icon, query);
      })
      .sort((left, right) => {
        const categoryOrder = iconCategory(left.path).localeCompare(
          iconCategory(right.path),
        );
        if (categoryOrder !== 0) {
          return categoryOrder;
        }
        return left.name.localeCompare(right.name);
      });
  }, [category, icons, query, selectedTag]);

  const visibleIcons = useMemo(() => {
    return filteredIcons.slice(0, visibleCount);
  }, [filteredIcons, visibleCount]);

  const hasMoreIcons = visibleIcons.length < filteredIcons.length;
  const activeSectionLabel = category === "all" ? "All categories" : category;

  useEffect(() => {
    setVisibleCount(ICON_PAGE_SIZE);
    window.scrollTo({ top: 0 });
  }, [category, query, selectedTag]);

  useEffect(() => {
    if (!selectedTag) {
      return;
    }
    const hasSelectedTag = visibleTagCounts.some((item) => item.tag === selectedTag);
    if (!hasSelectedTag) {
      setSelectedTag(null);
    }
  }, [selectedTag, visibleTagCounts]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasMoreIcons) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }
        setVisibleCount((previous) =>
          Math.min(previous + ICON_PAGE_SIZE, filteredIcons.length),
        );
      },
      {
        rootMargin: "320px 0px",
      },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, [filteredIcons.length, hasMoreIcons]);

  return (
    <AppShell
      navbar={{ width: 320, breakpoint: "sm" }}
      padding="md"
      style={{ minHeight: "100dvh" }}
    >
      <AppShell.Navbar p="md" withBorder>
        <Stack h="100%" gap="sm" style={{ minHeight: 0 }}>
          <Group justify="space-between" align="center">
            <Text fw={700}>Gallery</Text>
            <ActionIcon
              variant="default"
              aria-label="Go to home"
              onClick={onGoHome}
            >
              <IconHome size={16} />
            </ActionIcon>
          </Group>
          <Select
            aria-label="Category"
            data={[{ value: "all", label: "All categories" }, ...categories]}
            value={category}
            onChange={(value) => setCategory(value ?? "all")}
            allowDeselect={false}
          />
          <ScrollArea
            style={{ flex: 1, minHeight: 0 }}
            type="auto"
            scrollbars="y"
            offsetScrollbars="present"
            viewportProps={{ style: { paddingRight: 12 } }}
          >
            <Group gap="xs" align="flex-start">
              {visibleTagCounts.map((item) => (
                <Chip
                  key={item.tag}
                  checked={selectedTag === item.tag}
                  onChange={(checked) => {
                    setSelectedTag(checked ? item.tag : null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  variant="filled"
                  size="sm"
                >
                  {`${item.tag} (${item.count})`}
                </Chip>
              ))}
            </Group>
          </ScrollArea>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: GALLERY_MAIN_BG }}>
        <Stack style={{ minWidth: 0 }} gap="sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search icons..."
          />
          <Text fw={700} size="xl" tt="capitalize">
            {activeSectionLabel}
          </Text>

          {visibleIcons.length === 0 ? (
            <Text c="dimmed">No icons found for the current filters.</Text>
          ) : (
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing="sm">
              {visibleIcons.map((icon) => (
                <IconPreviewTile
                  key={icon.path}
                  clickTarget="media"
                  type="button"
                  onClick={() => onOpenIcon(icon.path, icon.name)}
                  title={`${icon.name} (${icon.author})`}
                  media={
                    <img
                      className="ps-icon-preview-content"
                      loading="lazy"
                      decoding="async"
                      src={getLocalIconPath(icon.path)}
                      alt={icon.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  }
                  label={
                    <Group justify="center" align="center" gap={4} wrap="nowrap">
                      <Popover width={320} position="bottom" withArrow shadow="md">
                        <Popover.Target>
                          <ActionIcon
                            component="span"
                            size="xs"
                            variant="subtle"
                            color="gray"
                            aria-label={`Open info for ${icon.name}`}
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                            onMouseDown={(event) => {
                              event.stopPropagation();
                            }}
                          >
                            <IconInfoCircle size={14} />
                          </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown onClick={(event) => event.stopPropagation()}>
                          <Stack gap={6}>
                            {icon.externalUrl ? (
                              <Anchor
                                href={icon.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                fw={700}
                                size="sm"
                              >
                                {icon.name}
                              </Anchor>
                            ) : (
                              <Text fw={700} size="sm">
                                {icon.name}
                              </Text>
                            )}
                            <Text size="sm">
                              <strong>Authored by</strong> {icon.author}
                            </Text>
                            {icon.tags.length > 0 ? (
                              <Group gap={6} wrap="wrap">
                                {icon.tags.map((tag, index) => (
                                  <Badge key={`${icon.path}-${tag}-${index}`} variant="light">
                                    {tag}
                                  </Badge>
                                ))}
                              </Group>
                            ) : null}
                            <Text size="sm" style={{ fontStyle: "italic" }}>
                              {icon.description ?? "No description available."}
                            </Text>
                          </Stack>
                        </Popover.Dropdown>
                      </Popover>
                      <Text size="sm" ta="center" lh={1.2} style={{ minWidth: 0 }}>
                        {iconLabel(icon.path)}
                      </Text>
                    </Group>
                  }
                />
              ))}
            </SimpleGrid>
          )}

          {hasMoreIcons ? <div ref={loadMoreRef} style={{ width: "100%", height: 1 }} /> : null}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
