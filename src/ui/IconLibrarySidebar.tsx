import {
  BackgroundStyleState,
  CustomIcon,
  ForegroundStyleState,
  IconMeta,
} from "../core/types";
import { IconBrowserPanel } from "./IconBrowserPanel";
import { SelectedIconStylePanel } from "./SelectedIconStylePanel";

interface IconLibrarySidebarProps {
  icons: IconMeta[];
  customIcons: CustomIcon[];
  searchInput: string;
  onSearchChange: (value: string) => void;
  page: number;
  maxPage: number;
  onPrev: () => void;
  onNext: () => void;
  onAssign: (iconPath: string) => void;
  onOpenGallery?: () => void;
  selectedIconPath: string | null;
  onDeselectIcon: () => void;
  background: BackgroundStyleState;
  onBackgroundChange: (background: BackgroundStyleState) => void;
  foreground: ForegroundStyleState;
  onForegroundChange: (foreground: ForegroundStyleState) => void;
  canBreakApartPaths: boolean;
  isPathsBrokenApart: boolean;
  onBreakApartPaths: () => void;
  onResetBreakApartPaths: () => void;
  foregroundPathOptions: Array<{ id: string; label: string }>;
  selectedForegroundPathId: string | null;
  onCycleForegroundPath: (direction: 1 | -1) => void;
}

export function IconLibrarySidebar({
  background,
  canBreakApartPaths,
  customIcons,
  foreground,
  icons,
  isPathsBrokenApart,
  maxPage,
  onAssign,
  onBackgroundChange,
  onBreakApartPaths,
  onResetBreakApartPaths,
  onCycleForegroundPath,
  onDeselectIcon,
  onForegroundChange,
  onNext,
  onOpenGallery,
  onPrev,
  onSearchChange,
  page,
  searchInput,
  foregroundPathOptions,
  selectedForegroundPathId,
  selectedIconPath,
}: IconLibrarySidebarProps) {
  const hasSelectedIcon = Boolean(selectedIconPath);

  if (hasSelectedIcon) {
    return (
      <SelectedIconStylePanel
        background={background}
        foreground={foreground}
        onBackgroundChange={onBackgroundChange}
        onBreakApartPaths={onBreakApartPaths}
        onResetBreakApartPaths={onResetBreakApartPaths}
        onDeselectIcon={onDeselectIcon}
        onForegroundChange={onForegroundChange}
        canBreakApartPaths={canBreakApartPaths}
        isPathsBrokenApart={isPathsBrokenApart}
        foregroundPathOptions={foregroundPathOptions}
        selectedForegroundPathId={selectedForegroundPathId}
        onCycleForegroundPath={onCycleForegroundPath}
      />
    );
  }

  return (
    <IconBrowserPanel
      customIcons={customIcons}
      icons={icons}
      maxPage={maxPage}
      onAssign={onAssign}
      onOpenGallery={onOpenGallery}
      onNext={onNext}
      onPrev={onPrev}
      onSearchChange={onSearchChange}
      page={page}
      searchInput={searchInput}
    />
  );
}
