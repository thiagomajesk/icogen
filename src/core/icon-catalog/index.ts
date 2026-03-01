export type { IconLockEntry, IconsLockFile, LocalIconMeta, LocalIconPagePayload } from "./icon-client";
export {
  ICON_CATALOG_PAGE_SIZE,
  ICON_CATALOG_PAGE_CACHE_SIZE,
  clearIconsLockFileCache,
  loadIconsLockFile,
  getLocalIconPath,
  fetchLocalIconsPage,
  fetchLocalIconSvg,
  getLocalIconStats,
} from "./icon-client";
