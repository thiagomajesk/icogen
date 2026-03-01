import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  fetchLocalIconsPage,
  getLocalIconStats,
  ICON_CATALOG_PAGE_CACHE_SIZE,
  ICON_CATALOG_PAGE_SIZE,
} from "../core/icon-catalog";
import type {
  CustomIcon,
  IconAvailability,
  IconMeta,
  IconPagePayload,
} from "../core/editor";

interface UseIconCatalogParams {
  customIcons: CustomIcon[];
  iconPage: IconMeta[];
  iconTotal: number;
  page: number;
  searchInput: string;
  searchQuery: string;
  setIconPage: (value: IconMeta[]) => void;
  setIconTotal: (value: number) => void;
  setPage: (value: number) => void;
  setSearchQuery: (value: string) => void;
  setStats: (value: IconAvailability) => void;
  onError: (message: string) => void;
}

interface UseIconCatalogResult {
  allVisibleIcons: IconMeta[];
  maxPage: number;
}

/**
 * Handles icon page loading, prefetch, stats refresh, and search debouncing.
 * App components can stay focused on rendering and event wiring.
 */
export function useIconCatalog({
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
  onError,
}: UseIconCatalogParams): UseIconCatalogResult {
  const pageCacheRef = useRef<Map<string, IconPagePayload>>(new Map());

  const pageKey = useCallback((targetPage: number, query: string): string => {
    return `${query}|${targetPage}|${ICON_CATALOG_PAGE_SIZE}`;
  }, []);

  const rememberPage = useCallback((key: string, payload: IconPagePayload) => {
    pageCacheRef.current.set(key, payload);
    while (pageCacheRef.current.size > ICON_CATALOG_PAGE_CACHE_SIZE) {
      const firstKey = pageCacheRef.current.keys().next().value;
      if (!firstKey) {
        break;
      }
      pageCacheRef.current.delete(firstKey);
    }
  }, []);

  const requestIcons = useCallback(
    async (targetPage: number, query: string): Promise<IconPagePayload> => {
      return fetchLocalIconsPage(
        targetPage,
        ICON_CATALOG_PAGE_SIZE,
        query || undefined,
      );
    },
    [],
  );

  const prefetchPage = useCallback(
    async (targetPage: number, query: string): Promise<void> => {
      if (targetPage < 1) {
        return;
      }

      const key = pageKey(targetPage, query);
      if (pageCacheRef.current.has(key)) {
        return;
      }

      try {
        const payload = await requestIcons(targetPage, query);
        rememberPage(key, payload);
      } catch {
        // Prefetch is best-effort only.
      }
    },
    [pageKey, rememberPage, requestIcons],
  );

  const refreshStats = useCallback(async () => {
    const stats = await getLocalIconStats();
    setStats(stats);
  }, [setStats]);

  const refreshPage = useCallback(
    async (targetPage: number, query: string): Promise<void> => {
      const key = pageKey(targetPage, query);
      const cached = pageCacheRef.current.get(key);

      if (cached) {
        setIconPage(cached.icons);
        setIconTotal(cached.total);
        return;
      }

      const payload = await requestIcons(targetPage, query);
      rememberPage(key, payload);
      setIconPage(payload.icons);
      setIconTotal(payload.total);
    },
    [pageKey, rememberPage, requestIcons, setIconPage, setIconTotal],
  );

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setPage(1);
      setSearchQuery(searchInput.trim().toLowerCase());
    }, 220);

    return () => {
      window.clearTimeout(handle);
    };
  }, [searchInput, setPage, setSearchQuery]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        await refreshPage(page, searchQuery);
        if (cancelled) {
          return;
        }

        void prefetchPage(page + 1, searchQuery);
        void prefetchPage(page - 1, searchQuery);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        if (!cancelled) {
          onError(`Could not load icons: ${message}`);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onError, page, prefetchPage, refreshPage, searchQuery]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        await refreshStats();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        if (!cancelled) {
          onError(`Could not load availability stats: ${message}`);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onError, refreshStats]);

  const allVisibleIcons = useMemo(() => {
    const custom = customIcons
      .filter((icon) => {
        if (!searchQuery) {
          return true;
        }

        return (
          icon.path.toLowerCase().includes(searchQuery) ||
          icon.name.toLowerCase().includes(searchQuery) ||
          icon.author.toLowerCase().includes(searchQuery)
        );
      })
      .map<IconMeta>((icon) => ({
        path: icon.path,
        name: icon.name,
        author: icon.author,
        size: icon.svg.length,
        mtimeMs: Date.now(),
      }));

    return [...custom, ...iconPage];
  }, [customIcons, iconPage, searchQuery]);

  const maxPage = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(Math.max(iconTotal, 1) / ICON_CATALOG_PAGE_SIZE),
    );
  }, [iconTotal]);

  return {
    allVisibleIcons,
    maxPage,
  };
}
