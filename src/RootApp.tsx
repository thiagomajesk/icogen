import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Center, Loader, Stack, Text } from "@mantine/core";
import App from "./App";
import type { IconLockEntry } from "./core/icon-client";
import { loadIconsLockFile } from "./core/icon-client";
import { buildEditorPath, parseAppRoute, routeToIconPath } from "./core/routes";
import { IconGalleryPage } from "./ui/IconGalleryPage";
import { useEditorStore } from "./core/editorStore";

interface SelectedEditorIcon {
  path: string;
  name: string;
}

function getPathnameFromLocation(): string {
  return `${window.location.pathname || "/"}${window.location.search || ""}`;
}

export default function RootApp() {
  const [pathname, setPathname] = useState(() => window.location.pathname || "/");
  const [icons, setIcons] = useState<IconLockEntry[]>([]);
  const [isIconsLoading, setIsIconsLoading] = useState(true);
  const [selectedEditorIcon, setSelectedEditorIcon] =
    useState<SelectedEditorIcon | null>(null);
  const invalidRouteRef = useRef<string | null>(null);
  const clearSelectedIcon = useEditorStore((state) => state.setSelectedIconPath);

  const route = useMemo(() => parseAppRoute(pathname), [pathname]);

  const navigate = useCallback((nextPath: string, replace = false) => {
    if (replace) {
      window.history.replaceState(null, "", nextPath);
    } else {
      window.history.pushState(null, "", nextPath);
    }
    setPathname(window.location.pathname || "/");
  }, []);

  const navigateBackOrHome = useCallback(
    (message: string) => {
      window.alert(message);
      if (window.history.length > 1) {
        window.history.back();
        return;
      }
      navigate("/", true);
    },
    [navigate],
  );

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname || "/");
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const lockFile = await loadIconsLockFile();
        if (cancelled) {
          return;
        }
        setIcons(lockFile.icons);
      } finally {
        if (!cancelled) {
          setIsIconsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (route) {
      invalidRouteRef.current = null;
      return;
    }

    if (invalidRouteRef.current === pathname) {
      return;
    }

    invalidRouteRef.current = pathname;
    navigateBackOrHome(`Route "${getPathnameFromLocation()}" is invalid.`);
  }, [navigateBackOrHome, pathname, route]);

  const iconByPath = useMemo(() => {
    return new Map(icons.map((icon) => [icon.path, icon]));
  }, [icons]);

  useEffect(() => {
    if (!route || route.kind !== "icon") {
      setSelectedEditorIcon(null);
      return;
    }

    if (isIconsLoading) {
      return;
    }

    const iconPath = routeToIconPath(route);
    const icon = iconByPath.get(iconPath);
    if (!icon) {
      navigateBackOrHome(
        `Icon "${route.category}/${route.icon}" was not found.`,
      );
      return;
    }

    setSelectedEditorIcon({
      path: icon.path,
      name: icon.name,
    });
  }, [iconByPath, isIconsLoading, navigateBackOrHome, route]);

  useEffect(() => {
    if (route?.kind === "icon") {
      return;
    }

    clearSelectedIcon(null);
  }, [clearSelectedIcon, route]);

  if (!route) {
    return null;
  }

  if (route.kind === "home") {
    return (
      <App
        iconCatalog={icons}
        onOpenGallery={() => navigate("/gallery")}
        onIconNavigate={(iconPath) => {
          const nextPath = buildEditorPath(iconPath);
          if (!nextPath || nextPath === pathname) {
            return;
          }
          navigate(nextPath);
        }}
      />
    );
  }

  if (route.kind === "gallery") {
    return (
      <IconGalleryPage
        icons={icons}
        onGoHome={() => navigate("/")}
        onOpenIcon={(iconPath) => {
          const nextPath = buildEditorPath(iconPath);
          if (!nextPath) {
            return;
          }
          navigate(nextPath);
        }}
      />
    );
  }

  if (!selectedEditorIcon) {
    return (
      <Center h="100dvh">
        <Stack gap="sm" align="center">
          <Loader size="xl" />
          <Text c="dimmed">Loading editor…</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <App
      forcedIcon={selectedEditorIcon}
      iconCatalog={icons}
      onExitEditor={() => navigate("/")}
      onOpenGallery={() => navigate("/gallery")}
      onIconNavigate={(iconPath) => {
        const nextPath = buildEditorPath(iconPath);
        if (!nextPath || nextPath === pathname) {
          return;
        }
        navigate(nextPath);
      }}
    />
  );
}
