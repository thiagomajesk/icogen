import { create } from "zustand";
import type {
  BackgroundStyleState,
  CustomIcon,
  EditorStatus,
  ForegroundStyleState,
  IconAvailability,
  IconMeta,
} from "./types";
import {
  defaultBaseLayer,
  defaultOverlayLayer,
  defaultBackground,
  defaultForeground,
} from "./constants";
import {
  type ForegroundPathSettings,
  saveIconSettings,
  saveRecentIconAccess,
  setCurrentIcon,
  loadIconSettings,
} from "./icon-history";

interface EditorState {
  searchInput: string;
  searchQuery: string;
  iconPage: IconMeta[];
  iconTotal: number;
  page: number;
  stats: IconAvailability;
  base: typeof defaultBaseLayer;
  overlay: typeof defaultOverlayLayer;
  background: BackgroundStyleState;
  foreground: ForegroundStyleState;
  status: EditorStatus;
  customIcons: CustomIcon[];
  selectedIconPath: string | null;
  selectedIconName: string | null;
  setSearchInput: (v: string) => void;
  setSearchQuery: (v: string) => void;
  setIconPage: (v: IconMeta[]) => void;
  setIconTotal: (v: number) => void;
  setPage: (v: number) => void;
  setStats: (v: IconAvailability) => void;
  setBase: (v: typeof defaultBaseLayer) => void;
  setOverlay: (v: typeof defaultOverlayLayer) => void;
  setBackground: (v: BackgroundStyleState) => void;
  setForeground: (v: ForegroundStyleState) => void;
  setStatus: (v: EditorStatus) => void;
  setCustomIcons: (v: CustomIcon[]) => void;
  setSelectedIconPath: (v: string | null, name?: string | null) => void;
  saveCurrentIconSettings: (foregroundPaths?: ForegroundPathSettings | null) => void;
  loadIconSettingsFromHistory: (iconName: string) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  searchInput: "",
  searchQuery: "",
  iconPage: [],
  iconTotal: 0,
  page: 1,
  stats: {
    remoteTotal: 0,
    localTotal: 0,
    missingTotal: 0,
    missingSample: [],
  },
  base: defaultBaseLayer,
  overlay: defaultOverlayLayer,
  background: defaultBackground,
  foreground: defaultForeground,
  status: { message: "Ready.", error: false },
  customIcons: [],
  selectedIconPath: null,
  selectedIconName: null,
  setSearchInput: (searchInput) => set({ searchInput }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setIconPage: (iconPage) => set({ iconPage }),
  setIconTotal: (iconTotal) => set({ iconTotal }),
  setPage: (page) => set({ page }),
  setStats: (stats) => set({ stats }),
  setBase: (base) => set({ base }),
  setOverlay: (overlay) => set({ overlay }),
  setBackground: (background) => set({ background }),
  setForeground: (foreground) => set({ foreground }),
  setStatus: (status) => set({ status }),
  setCustomIcons: (customIcons) => set({ customIcons }),
  setSelectedIconPath: (selectedIconPath, name = null) => {
    // Legacy key is no longer used by routing/state and should not persist.
    setCurrentIcon(null);
    set({ selectedIconPath, selectedIconName: name });

    if (selectedIconPath) {
      saveRecentIconAccess(selectedIconPath);
    }
    
    // Load settings for newly selected icon
    if (name) {
      get().loadIconSettingsFromHistory(name);
    } else {
      // Reset to defaults when deselecting
      set({
        base: defaultBaseLayer,
        overlay: defaultOverlayLayer,
        background: defaultBackground,
        foreground: defaultForeground,
      });
    }
  },
  saveCurrentIconSettings: (foregroundPaths = null) => {
    const state = get();
    if (state.selectedIconName) {
      saveIconSettings(state.selectedIconName, {
        background: state.background,
        foreground: state.foreground,
        foregroundPaths: foregroundPaths ?? undefined,
      });
    }
  },
  loadIconSettingsFromHistory: (iconName: string) => {
    const settings = loadIconSettings(iconName);
    if (settings) {
      set({
        background: settings.background,
        foreground: settings.foreground,
      });
    }
  },
}));
