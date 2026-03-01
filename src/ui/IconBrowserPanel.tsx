import {
  ActionIcon,
  Button,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconLayoutGrid } from "@tabler/icons-react";
import type { CustomIcon, IconMeta } from "../core/editor";
import { getLocalIconPath } from "../core/icon-catalog";
import { svgToDataUri } from "../core/svg-compositor";
import { IconPreviewTile } from "./IconPreviewTile";
import { SearchInput } from "./SearchInput";

interface IconBrowserPanelProps {
  customIcons: CustomIcon[];
  icons: IconMeta[];
  maxPage: number;
  onAssign: (iconPath: string) => void;
  onOpenGallery?: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSearchChange: (value: string) => void;
  page: number;
  searchInput: string;
}

export function IconBrowserPanel({
  customIcons,
  icons,
  maxPage,
  onAssign,
  onOpenGallery,
  onNext,
  onPrev,
  onSearchChange,
  page,
  searchInput,
}: IconBrowserPanelProps) {
  const customByPath = new Map(customIcons.map((icon) => [icon.path, icon]));

  return (
    <Stack h="100%" gap="sm" style={{ minHeight: 0 }}>
      <Group justify="space-between" align="center">
        <Text fw={700}>Quick Search</Text>
        {onOpenGallery ? (
          <ActionIcon
            variant="default"
            aria-label="Open gallery"
            onClick={onOpenGallery}
          >
            <IconLayoutGrid size={16} />
          </ActionIcon>
        ) : null}
      </Group>

      <SearchInput
        value={searchInput}
        onChange={onSearchChange}
        placeholder="Search in sidebar..."
      />

      <ScrollArea
        style={{ flex: 1, minHeight: 0 }}
        type="hover"
        scrollbars="y"
      >
        <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
          {icons.map((icon) => {
            const custom = customByPath.get(icon.path);
            const thumbSrc = custom
              ? svgToDataUri(custom.svg)
              : `${getLocalIconPath(icon.path)}?v=${Math.trunc(icon.mtimeMs)}`;

            return (
              <IconPreviewTile
                key={icon.path}
                ariaLabel={`Use ${icon.name}`}
                onClick={() => onAssign(icon.path)}
                title={`${icon.name} (${icon.author})`}
                media={
                  <img
                    className="ps-icon-preview-content"
                    loading="lazy"
                    decoding="async"
                    src={thumbSrc}
                    alt={icon.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                }
              />
            );
          })}
        </SimpleGrid>
      </ScrollArea>

      <Group grow>
        <Button
          variant="default"
          onClick={onPrev}
          disabled={page <= 1}
          leftSection={<IconChevronLeft size={16} />}
        >
          Prev
        </Button>
        <Button
          variant="default"
          onClick={onNext}
          disabled={page >= maxPage}
          rightSection={<IconChevronRight size={16} />}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
}
