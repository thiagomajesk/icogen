import type {
  AnimationClipState,
  BackgroundStyleState,
  CustomIcon,
  ForegroundStyleState,
  IconMeta,
} from "../core/editor";
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
  onCombinePaths: () => void;
  onResetForegroundPart: () => void;
  onResetForegroundAll: () => void;
  foregroundPathOptions: Array<{ id: string; label: string }>;
  selectedForegroundPathId: string | null;
  onCycleForegroundPath: (direction: 1 | -1) => void;
  onCycleAnimationTarget: (direction: 1 | -1) => void;
  animationClip: AnimationClipState;
  onAnimationClipChange: (patch: Partial<AnimationClipState>) => void;
  onResetAnimationPart: () => void;
  onResetAnimationAll: () => void;
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
  animationClip,
  onAnimationClipChange,
  onResetAnimationAll,
  onResetAnimationPart,
  onBackgroundChange,
  onBreakApartPaths,
  onCombinePaths,
  onResetForegroundAll,
  onResetForegroundPart,
  onCycleAnimationTarget,
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
        onCombinePaths={onCombinePaths}
        onResetForegroundPart={onResetForegroundPart}
        onResetForegroundAll={onResetForegroundAll}
        onDeselectIcon={onDeselectIcon}
        onForegroundChange={onForegroundChange}
        canBreakApartPaths={canBreakApartPaths}
        isPathsBrokenApart={isPathsBrokenApart}
        foregroundPathOptions={foregroundPathOptions}
        selectedForegroundPathId={selectedForegroundPathId}
        onCycleForegroundPath={onCycleForegroundPath}
        onCycleAnimationTarget={onCycleAnimationTarget}
        animationClip={animationClip}
        onAnimationClipChange={onAnimationClipChange}
        onResetAnimationPart={onResetAnimationPart}
        onResetAnimationAll={onResetAnimationAll}
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
