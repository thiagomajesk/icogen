import {
  clearIconCacheDir,
  listLocalIcons,
  readIconsLockFile,
  writeIconsLockFile,
  writeLocalIconSvg,
} from "./icon-store.js";

const GITHUB_TREE_URL =
  "https://api.github.com/repos/game-icons/icons/git/trees/master?recursive=1";
const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/game-icons/icons/master";
const GAME_ICONS_BASE_URL = "https://game-icons.net";

interface TreeEntry {
  path: string;
  type: string;
}

interface SyncOptions {
  concurrency?: number;
  onProgress?: (event: SyncProgressEvent) => void;
  onLog?: (event: SyncLogEvent) => void;
}

type MetadataSyncMode = "all" | "missing";

interface MetadataRecord {
  tags: string[];
  description: string | null;
  externalUrl: string | null;
}

export interface SyncReport {
  remoteTotal: number;
  localTotal: number;
  missingTotal: number;
  downloaded: string[];
  failed: Array<{ path: string; reason: string }>;
}

export interface IconAvailability {
  remoteTotal: number;
  localTotal: number;
  missingTotal: number;
  missingSample: string[];
}

export interface SyncProgressEvent {
  path: string;
  processed: number;
  total: number;
  status: "downloaded" | "failed";
  reason?: string;
}

export interface SyncLogEvent {
  level: "info" | "error";
  line: string;
}

const REMOTE_CACHE_TTL_MS = 5 * 60 * 1000;
let remoteCache: { paths: string[]; fetchedAt: number } | null = null;

async function fetchRemoteIconPaths(): Promise<string[]> {
  const response = await fetch(GITHUB_TREE_URL, {
    headers: {
      "User-Agent": "aikon-sync-agent",
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub tree request failed with ${response.status}`);
  }

  const payload = (await response.json()) as { tree?: TreeEntry[] };
  const tree = payload.tree ?? [];

  return tree
    .filter((entry) => entry.type === "blob" && entry.path.endsWith(".svg"))
    .map((entry) => entry.path)
    .sort((a, b) => a.localeCompare(b));
}

export async function getRemoteIconPaths(force = false): Promise<string[]> {
  const now = Date.now();

  if (
    !force &&
    remoteCache &&
    now - remoteCache.fetchedAt < REMOTE_CACHE_TTL_MS
  ) {
    return remoteCache.paths;
  }

  const paths = await fetchRemoteIconPaths();
  remoteCache = { paths, fetchedAt: now };
  return paths;
}

export async function getIconAvailability(
  sampleSize = 24,
): Promise<IconAvailability> {
  const [remotePaths, localIcons] = await Promise.all([
    getRemoteIconPaths(),
    listLocalIcons(),
  ]);
  const localPathSet = new Set(localIcons.map((icon) => icon.path));
  const missing = remotePaths.filter((iconPath) => !localPathSet.has(iconPath));

  return {
    remoteTotal: remotePaths.length,
    localTotal: localIcons.length,
    missingTotal: missing.length,
    missingSample: missing.slice(0, Math.max(0, sampleSize)),
  };
}

async function runConcurrencyPool<T>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<void>,
): Promise<void> {
  let index = 0;

  async function workLoop(): Promise<void> {
    while (index < items.length) {
      const current = items[index++];
      await worker(current);
    }
  }

  const tasks = Array.from(
    { length: Math.min(concurrency, Math.max(items.length, 1)) },
    () => workLoop(),
  );
  await Promise.all(tasks);
}

async function downloadIcons(
  iconPaths: string[],
  options: SyncOptions,
): Promise<{
  downloaded: string[];
  failed: Array<{ path: string; reason: string }>;
  metadataByPath: Map<string, MetadataRecord>;
}> {
  const downloaded: string[] = [];
  const failed: Array<{ path: string; reason: string }> = [];
  const metadataByPath = new Map<string, MetadataRecord>();
  let processed = 0;
  const total = iconPaths.length;

  await runConcurrencyPool(
    iconPaths,
    options.concurrency ?? 8,
    async (iconPath) => {
      try {
        const url = `${GITHUB_RAW_BASE}/${iconPath}`;
        options.onLog?.({ level: "info", line: `request GET ${url}` });
        const response = await fetch(url, {
          headers: { "User-Agent": "aikon-sync-agent" },
        });

        if (!response.ok) {
          options.onLog?.({
            level: "error",
            line: `response ${response.status} ${url}`,
          });
          throw new Error(`download failed (${response.status})`);
        }

        const svg = await response.text();
        options.onLog?.({
          level: "info",
          line: `response ${response.status} ${url}`,
        });
        await writeLocalIconSvg(iconPath, svg);
        options.onLog?.({ level: "info", line: `write svg ${iconPath}` });
        options.onLog?.({ level: "info", line: `downloaded ${iconPath}` });
        downloaded.push(iconPath);
        processed += 1;
        options.onProgress?.({
          path: iconPath,
          processed,
          total,
          status: "downloaded",
        });
      } catch (error) {
        const reason = error instanceof Error ? error.message : "Unknown error";
        failed.push({ path: iconPath, reason });
        options.onLog?.({
          level: "error",
          line: `failed ${iconPath}: ${reason}`,
        });
        processed += 1;
        options.onProgress?.({
          path: iconPath,
          processed,
          total,
          status: "failed",
          reason,
        });
      }
    },
  );

  return { downloaded, failed, metadataByPath };
}

export async function syncMissingIcons(
  options: SyncOptions = {},
): Promise<SyncReport> {
  return syncMetadataForLocalIcons(options);
}

export async function syncMetadataForLocalIcons(
  options: SyncOptions = {},
): Promise<SyncReport> {
  const [remotePaths, localIcons] = await Promise.all([
    getRemoteIconPaths(),
    listLocalIcons(),
  ]);
  await updateIconsLockFile(new Map(), options.onLog, "all");

  return {
    remoteTotal: remotePaths.length,
    localTotal: localIcons.length,
    missingTotal: remotePaths.length - localIcons.length,
    downloaded: [],
    failed: [],
  };
}

export async function refreshAllIcons(
  options: SyncOptions = {},
): Promise<SyncReport> {
  return downloadAllIcons(options);
}

export async function downloadAllIcons(
  options: SyncOptions = {},
): Promise<SyncReport> {
  const [remotePaths, localIcons] = await Promise.all([
    getRemoteIconPaths(true),
    listLocalIcons(),
  ]);
  await clearIconCacheDir();
  const { downloaded, failed, metadataByPath } = await downloadIcons(
    remotePaths,
    options,
  );
  await updateIconsLockFile(metadataByPath, options.onLog, "missing");

  return {
    remoteTotal: remotePaths.length,
    localTotal: localIcons.length,
    missingTotal: remotePaths.length - localIcons.length,
    downloaded,
    failed,
  };
}

async function updateIconsLockFile(
  metadataByPath: Map<string, MetadataRecord>,
  onLog?: (event: SyncLogEvent) => void,
  mode: MetadataSyncMode = "all",
): Promise<void> {
  const localIcons = await listLocalIcons(true);
  onLog?.({
    level: "info",
    line: `metadata sync started (${localIcons.length} icon(s), mode: ${mode})`,
  });
  const currentLock = await readIconsLockFile();
  const baseByPath = new Map<string, MetadataRecord>();

  for (const icon of currentLock?.icons ?? []) {
    const previousRecord: MetadataRecord = {
      description:
        typeof icon.description === "string" ? icon.description : null,
      tags: Array.isArray(icon.tags)
        ? icon.tags.filter((tag): tag is string => typeof tag === "string")
        : [],
      externalUrl:
        typeof icon.externalUrl === "string" &&
        icon.externalUrl.startsWith(GAME_ICONS_BASE_URL)
          ? icon.externalUrl
          : null,
    };

    if (
      previousRecord.description ||
      previousRecord.tags.length > 0 ||
      previousRecord.externalUrl
    ) {
      baseByPath.set(icon.path, previousRecord);
    }
  }

  for (const [iconPath, record] of metadataByPath.entries()) {
    baseByPath.set(iconPath, record);
  }

  const pathsToScrape =
    mode === "all"
      ? localIcons.map((icon) => icon.path)
      : localIcons
          .filter((icon) => {
            const record = baseByPath.get(icon.path);
            if (!record) {
              return true;
            }

            const hasTags = record.tags.length > 0;
            const hasDescription = Boolean(record.description);
            return !hasTags && !hasDescription;
          })
          .map((icon) => icon.path);

  const scrapedByPath = await scrapeMetadataForIcons(
    pathsToScrape,
    baseByPath,
    onLog,
  );

  const icons = localIcons.map((icon) => {
    const record =
      scrapedByPath.get(icon.path) ?? baseByPath.get(icon.path) ?? null;

    return {
      path: icon.path,
      name: icon.name,
      author: icon.author,
      description: record?.description ?? null,
      tags: record?.tags ?? [],
      externalUrl: record?.externalUrl ?? buildGameIconPageUrl(icon.path),
    };
  });

  await writeIconsLockFile({
    syncedAt: new Date().toISOString(),
    iconCount: icons.length,
    icons,
  });
  onLog?.({
    level: "info",
    line: "write lock file public/icons.lock.json",
  });
  onLog?.({
    level: "info",
    line: `metadata sync finished (${icons.length} icon(s))`,
  });
}

async function scrapeMetadataForIcons(
  iconPaths: string[],
  seedByPath: Map<string, MetadataRecord>,
  onLog?: (event: SyncLogEvent) => void,
): Promise<Map<string, MetadataRecord>> {
  const metadataByPath = new Map<string, MetadataRecord>(seedByPath);
  let processed = 0;
  const total = iconPaths.length;

  await runConcurrencyPool(iconPaths, 10, async (iconPath) => {
    const scraped = await scrapeIconMetadata(iconPath, onLog);
    processed += 1;
    if (scraped) {
      metadataByPath.set(iconPath, scraped);
      onLog?.({
        level: "info",
        line: `[metadata ${processed}/${total}] ${iconPath}`,
      });
      return;
    }

    onLog?.({
      level: "error",
      line: `[metadata ${processed}/${total}] missing ${iconPath}`,
    });
  });

  return metadataByPath;
}

async function scrapeIconMetadata(
  iconPath: string,
  onLog?: (event: SyncLogEvent) => void,
): Promise<MetadataRecord | null> {
  const pageUrl = buildGameIconPageUrl(iconPath);
  if (!pageUrl) {
    return null;
  }

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      onLog?.({ level: "info", line: `request GET ${pageUrl}` });
      const response = await fetch(pageUrl, {
        headers: {
          "User-Agent": "aikon-sync-agent",
          Accept: "text/html",
        },
      });

      if (!response.ok) {
        onLog?.({
          level: "error",
          line: `response ${response.status} ${pageUrl}`,
        });
        // continue and retry once
        continue;
      }

      const html = await response.text();
      onLog?.({
        level: "info",
        line: `response ${response.status} ${pageUrl}`,
      });
      const tags = extractTags(html);
      const description = extractDescription(html);

      return {
        tags,
        description,
        externalUrl: pageUrl,
      };
    } catch {
      // retry once before giving up on this icon metadata
      onLog?.({ level: "error", line: `request failed ${pageUrl}` });
    }
  }
  return null;
}

function buildGameIconPageUrl(iconPath: string): string | null {
  const normalizedPath = stripSvgExtension(iconPath);
  const segments = normalizedPath.split("/").filter(Boolean);
  if (segments.length < 2) {
    return null;
  }

  const author = segments[0];
  const slug = segments[segments.length - 1];
  return `${GAME_ICONS_BASE_URL}/1x1/${author}/${slug}.html`;
}

function extractTags(html: string): string[] {
  const matches = [
    ...html.matchAll(/<a[^>]*rel=["']tag["'][^>]*>([^<]+)<\/a>/gi),
  ];
  const tags = matches
    .map((match) => decodeHtmlEntities(match[1] ?? "").trim())
    .filter(Boolean);
  return Array.from(new Set(tags));
}

function extractDescription(html: string): string | null {
  const sectionMatch = html.match(
    /<div[^>]*itemprop=["']description["'][^>]*>([\s\S]*?)<\/div>/i,
  );
  if (sectionMatch && sectionMatch[1]) {
    const text = decodeHtmlEntities(stripHtml(sectionMatch[1])).trim();
    if (text) {
      return text;
    }
  }

  const metaMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
  );
  if (!metaMatch || !metaMatch[1]) {
    return null;
  }

  const fallback = decodeHtmlEntities(metaMatch[1]).trim();
  return fallback || null;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ");
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripSvgExtension(value: string): string {
  return value
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/\.svg$/i, "");
}
