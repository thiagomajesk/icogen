import {
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface IconMeta {
  path: string;
  name: string;
  author: string;
  size: number;
  mtimeMs: number;
}

export const CACHE_DIR = path.resolve(__dirname, "../public/icons");
export const LOCK_FILE = path.resolve(__dirname, "../public/icons.lock.json");
const LOCAL_ICON_CACHE_TTL_MS = 60_000;
let localIconCache: { icons: IconMeta[]; cachedAt: number } | null = null;

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

export async function ensureCacheDir(): Promise<void> {
  await mkdir(CACHE_DIR, { recursive: true });
}

export function invalidateLocalIconsCache(): void {
  localIconCache = null;
}

function safeResolve(relativePath: string): string {
  const clean = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  const resolved = path.resolve(CACHE_DIR, clean);
  const allowedPrefix = `${CACHE_DIR}${path.sep}`;

  if (resolved !== CACHE_DIR && !resolved.startsWith(allowedPrefix)) {
    throw new Error("Unsafe icon path");
  }

  return resolved;
}

async function walkSvgFiles(dir: string, root = dir): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const abs = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkSvgFiles(abs, root)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".svg")) {
      files.push(path.relative(root, abs).split(path.sep).join("/"));
    }
  }

  return files;
}

export async function listLocalIcons(force = false): Promise<IconMeta[]> {
  const now = Date.now();
  if (
    !force &&
    localIconCache &&
    now - localIconCache.cachedAt < LOCAL_ICON_CACHE_TTL_MS
  ) {
    return localIconCache.icons;
  }

  await ensureCacheDir();
  const relFiles = await walkSvgFiles(CACHE_DIR);

  const data = await Promise.all(
    relFiles.map(async (filePath) => {
      const abs = safeResolve(filePath);
      const details = await stat(abs);
      const author = filePath.includes("/")
        ? filePath.slice(0, filePath.indexOf("/"))
        : "unknown";
      const base = filePath.split("/").pop() ?? filePath;
      const name = base.replace(/\.svg$/i, "").replace(/[-_]/g, " ");

      return {
        path: filePath,
        name,
        author,
        size: details.size,
        mtimeMs: details.mtimeMs,
      } satisfies IconMeta;
    }),
  );

  data.sort((a, b) => a.name.localeCompare(b.name));
  localIconCache = { icons: data, cachedAt: now };
  return data;
}

export async function readLocalIconSvg(relativePath: string): Promise<string> {
  const abs = safeResolve(relativePath);
  return readFile(abs, "utf-8");
}

export async function writeLocalIconSvg(
  relativePath: string,
  svg: string,
): Promise<void> {
  const abs = safeResolve(relativePath);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, svg, "utf-8");
  invalidateLocalIconsCache();
}

export async function clearIconCacheDir(): Promise<void> {
  await rm(CACHE_DIR, { recursive: true, force: true });
  await ensureCacheDir();
  invalidateLocalIconsCache();
}

export async function writeIconsLockFile(
  lockData: IconsLockFile,
): Promise<void> {
  await mkdir(path.dirname(LOCK_FILE), { recursive: true });
  await writeFile(
    LOCK_FILE,
    `${JSON.stringify(lockData, null, 2)}\n`,
    "utf-8",
  );
}

export async function readIconsLockFile(): Promise<IconsLockFile | null> {
  try {
    const raw = await readFile(LOCK_FILE, "utf-8");
    const parsed = JSON.parse(raw) as IconsLockFile;
    if (!parsed || !Array.isArray(parsed.icons)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
