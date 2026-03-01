export interface IconLockEntry {
  path: string;
  name: string;
  author: string;
  description: string | null;
  tags: string[];
  externalUrl: string | null;
}

export interface IconsLockFile {
  syncedAt: string;
  iconCount: number;
  icons: IconLockEntry[];
}

const LOCK_FILE_URL = "/icons.lock.json";
export const ICON_CATALOG_PAGE_SIZE = 60;
export const ICON_CATALOG_PAGE_CACHE_SIZE = 24;

let cachedLockFile: IconsLockFile | null = null;

export function clearIconsLockFileCache(): void {
  cachedLockFile = null;
}

export async function loadIconsLockFile(): Promise<IconsLockFile> {
  if (cachedLockFile) {
    return cachedLockFile;
  }

  const response = await fetch(LOCK_FILE_URL);
  if (!response.ok) {
    throw new Error(`Failed to load icons lock file: ${response.status}`);
  }

  const data = await response.json();
  cachedLockFile = data;
  return data;
}

export interface LocalIconMeta {
  path: string;
  name: string;
  author: string;
  size: number;
  mtimeMs: number;
}

export interface LocalIconPagePayload {
  icons: LocalIconMeta[];
  total: number;
  page: number;
  pageSize: number;
}

export function getLocalIconPath(iconPath: string): string {
  return `/icons/${iconPath}`;
}

export async function fetchLocalIconsPage(
  page: number,
  pageSize: number,
  query?: string,
): Promise<LocalIconPagePayload> {
  const lockFile = await loadIconsLockFile();

  let filteredIcons = lockFile.icons;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredIcons = filteredIcons.filter(
      (icon) =>
        icon.name.toLowerCase().includes(lowerQuery) ||
        icon.author.toLowerCase().includes(lowerQuery) ||
        icon.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    );
  }

  const total = filteredIcons.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageIcons = filteredIcons.slice(start, end);

  return {
    icons: pageIcons.map((icon) => ({
      path: icon.path,
      name: icon.name,
      author: icon.author,
      size: 0,
      mtimeMs: 0,
    })),
    total,
    page,
    pageSize,
  };
}

export async function fetchLocalIconSvg(iconPath: string): Promise<string> {
  const url = getLocalIconPath(iconPath);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load icon: ${response.status}`);
  }
  return response.text();
}

export async function getLocalIconStats(): Promise<{
  remoteTotal: number;
  localTotal: number;
  missingTotal: number;
  missingSample: string[];
}> {
  const lockFile = await loadIconsLockFile();
  return {
    remoteTotal: lockFile.iconCount,
    localTotal: lockFile.iconCount,
    missingTotal: 0,
    missingSample: [],
  };
}
