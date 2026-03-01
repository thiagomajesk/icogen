import type {
  AnimationClipConfig,
  AnimationClipState,
  BackgroundStyleState,
  ForegroundStyleState,
} from "./types";
import {
  isDefaultBackgroundStyle,
  isDefaultForegroundStyle,
} from "./style-state";
import {
  isDefaultAnimationClipState,
  normalizeAnimationClipState,
} from "./animation-clip";
import { parseLocalJson, readLocalJson } from "../platform";

const ICON_HISTORY_KEY = "icon-history";
const MAX_HISTORY_SIZE = 10;
const RECENT_ICONS_KEY = "recent-icons";
const MAX_RECENT_ICON_ACCESSES = 100;
export const ICON_HISTORY_UPDATED_EVENT = "icon-history-updated";
export const ICON_ACCESSES_UPDATED_EVENT = "icon-accesses-updated";

export interface ForegroundPathSettings {
  enabled: boolean;
  selectedPathId: string | null;
  pathStyles: Record<string, ForegroundStyleState>;
}

export interface AnimationPathSettings {
  enabled: boolean;
  pathClips: Record<string, AnimationClipConfig>;
}

export interface IconSettings {
  background: BackgroundStyleState;
  foreground: ForegroundStyleState;
  foregroundPaths?: ForegroundPathSettings;
  animationClip: AnimationClipState;
  animationPaths?: AnimationPathSettings;
}

export type IconHistory = Record<string, IconSettings>;

function notifyHistoryUpdated(): void {
  window.dispatchEvent(new Event(ICON_HISTORY_UPDATED_EVENT));
}

function notifyIconAccessesUpdated(): void {
  window.dispatchEvent(new Event(ICON_ACCESSES_UPDATED_EVENT));
}

function normalizeForegroundPathSettings(
  foregroundPaths: ForegroundPathSettings | undefined,
): ForegroundPathSettings | undefined {
  if (!foregroundPaths) {
    return undefined;
  }

  const pathStyles = Object.fromEntries(
    Object.entries(foregroundPaths.pathStyles ?? {}).map(([pieceId, style]) => [
      pieceId,
      style,
    ]),
  );

  return {
    enabled: Boolean(foregroundPaths.enabled),
    selectedPathId: foregroundPaths.selectedPathId ?? null,
    pathStyles,
  };
}

function normalizeAnimationPathSettings(
  animationPaths: AnimationPathSettings | undefined,
): AnimationPathSettings | undefined {
  if (!animationPaths?.enabled) {
    return undefined;
  }

  const pathClips = Object.fromEntries(
    Object.entries(animationPaths.pathClips ?? {}).flatMap(([pieceId, clip]) => {
      if (!pieceId) {
        return [];
      }

      const normalized = normalizeAnimationClipState({
        ...(clip as Partial<AnimationClipState>),
        targetPathId: pieceId,
      });
      if (normalized.preset === "none") {
        return [];
      }

      const { targetPathId: _ignoredTargetPathId, ...config } = normalized;
      return [[pieceId, config satisfies AnimationClipConfig]];
    }),
  );

  if (Object.keys(pathClips).length === 0) {
    return undefined;
  }

  return {
    enabled: true,
    pathClips,
  };
}

/**
 * Loads all remembered icon settings from localStorage.
 * Returns an empty object when there is no saved history yet.
 */
export function loadIconHistory(): IconHistory {
  return readLocalJson<IconHistory>(ICON_HISTORY_KEY, {}, "Failed to load icon history:");
}

/**
 * Saves the latest settings for one icon.
 * Keeps only the most recent 10 entries to avoid unbounded localStorage growth.
 */
export function saveIconSettings(
  iconName: string,
  settings: IconSettings,
): void {
  try {
    const history = loadIconHistory();
    const hasForegroundPathSettings = Boolean(settings.foregroundPaths?.enabled);
    const normalizedAnimationClip = normalizeAnimationClipState(settings.animationClip);
    const normalizedAnimationPaths = normalizeAnimationPathSettings(
      settings.animationPaths,
    );
    const hasCustomAnimation = !isDefaultAnimationClipState(normalizedAnimationClip);
    const hasPathAnimationSettings = Boolean(normalizedAnimationPaths?.enabled);

    const isDefaultSettings =
      isDefaultBackgroundStyle(settings.background) &&
      isDefaultForegroundStyle(settings.foreground) &&
      !hasForegroundPathSettings &&
      !hasCustomAnimation &&
      !hasPathAnimationSettings;

    if (isDefaultSettings) {
      if (!history[iconName]) {
        return;
      }

      delete history[iconName];
      localStorage.setItem(ICON_HISTORY_KEY, JSON.stringify(history));
      notifyHistoryUpdated();
      return;
    }

    const nextSettings: IconSettings = {
      ...settings,
      animationClip: normalizedAnimationClip,
    };
    if (normalizedAnimationPaths) {
      nextSettings.animationPaths = normalizedAnimationPaths;
    }

    history[iconName] = nextSettings;

    // If we exceed max size, remove the first key
    const keys = Object.keys(history);
    if (keys.length > MAX_HISTORY_SIZE) {
      delete history[keys[0]];
    }

    localStorage.setItem(ICON_HISTORY_KEY, JSON.stringify(history));
    notifyHistoryUpdated();
  } catch (error) {
    console.error("Failed to save icon settings:", error);
  }
}

/**
 * Loads saved settings for a specific icon name.
 */
export function loadIconSettings(iconName: string): IconSettings | null {
  const history = loadIconHistory();
  const settings = history[iconName];
  if (!settings || !settings.animationClip) {
    return null;
  }

  const normalizedForegroundPaths = normalizeForegroundPathSettings(
    settings.foregroundPaths,
  );
  const normalizedAnimationPaths = normalizeAnimationPathSettings(
    settings.animationPaths,
  );

  return {
    ...settings,
    background: settings.background,
    foreground: settings.foreground,
    animationClip: normalizeAnimationClipState(settings.animationClip),
    ...(settings.foregroundPaths
      ? { foregroundPaths: normalizedForegroundPaths }
      : {}),
    ...(normalizedAnimationPaths ? { animationPaths: normalizedAnimationPaths } : {}),
  };
}

/**
 * Clears all saved icon history and selected icon state.
 */
export function clearIconHistory(): void {
  try {
    localStorage.removeItem(ICON_HISTORY_KEY);
    localStorage.removeItem(RECENT_ICONS_KEY);
    notifyHistoryUpdated();
    notifyIconAccessesUpdated();
  } catch (error) {
    console.error("Failed to clear icon history:", error);
  }
}

/**
 * Loads the latest accessed icon paths (most recent first).
 */
export function loadRecentIconAccesses(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_ICONS_KEY);
    if (!stored) {
      return [];
    }

    const parsed = parseLocalJson<unknown[]>(
      stored,
      [],
      "Failed to load recent icon accesses:",
    );
    if (!Array.isArray(parsed)) {
      return [];
    }

    const normalized = parsed
      .filter((value): value is string => typeof value === "string")
      .slice(0, MAX_RECENT_ICON_ACCESSES);

    return normalized;
  } catch (error) {
    console.error("Failed to load recent icon accesses:", error);
    return [];
  }
}

/**
 * Records an icon path access and keeps only the latest 100 unique paths.
 */
export function saveRecentIconAccess(iconPath: string): void {
  if (!iconPath) {
    return;
  }

  try {
    const previous = loadRecentIconAccesses();
    const deduped = previous.filter((path) => path !== iconPath);
    const next = [iconPath, ...deduped].slice(0, MAX_RECENT_ICON_ACCESSES);
    localStorage.setItem(RECENT_ICONS_KEY, JSON.stringify(next));
    notifyIconAccessesUpdated();
  } catch (error) {
    console.error("Failed to save recent icon access:", error);
  }
}
