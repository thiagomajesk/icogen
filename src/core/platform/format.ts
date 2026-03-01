export function parseNumber(
  value: string | number | null | undefined,
  fallback = 0,
): number {
  const next = Number(value);
  return Number.isFinite(next) ? next : fallback;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function iconLabel(path: string): string {
  return (
    path
      .split("/")
      .pop()
      ?.replace(/\.svg$/i, "")
      .replace(/[-_]/g, " ") ?? path
  );
}
