export type AppRoute =
  | { kind: "home" }
  | { kind: "gallery" }
  | { kind: "icon"; category: string; icon: string };

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const trimmed = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return trimmed || "/";
}

export function parseAppRoute(pathname: string): AppRoute | null {
  const normalized = normalizePathname(pathname);
  if (normalized === "/") {
    return { kind: "home" };
  }

  if (normalized === "/gallery") {
    return { kind: "gallery" };
  }

  const segments = normalized.split("/").filter(Boolean);
  if (segments.length !== 2) {
    return null;
  }

  try {
    const category = decodeURIComponent(segments[0]);
    const icon = decodeURIComponent(segments[1]);
    if (!category || !icon) {
      return null;
    }

    return {
      kind: "icon",
      category,
      icon,
    };
  } catch {
    return null;
  }
}

export function buildEditorPath(iconPath: string): string | null {
  const [category, ...rest] = iconPath.split("/");
  if (!category || rest.length === 0) {
    return null;
  }

  const iconFile = rest.join("/");
  const iconName = iconFile.replace(/\.svg$/i, "");
  if (!iconName) {
    return null;
  }

  return `/${encodeURIComponent(category)}/${encodeURIComponent(iconName)}`;
}

export function routeToIconPath(route: Extract<AppRoute, { kind: "icon" }>): string {
  return `${route.category}/${route.icon}.svg`;
}
