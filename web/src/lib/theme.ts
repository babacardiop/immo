export const THEMES = ["light", "dark", "green"] as const;

export type Theme = (typeof THEMES)[number];

export const THEME_STORAGE_KEY = "eg-theme";

export function isTheme(value: unknown): value is Theme {
  return (
    typeof value === "string" && (THEMES as readonly string[]).includes(value)
  );
}

export function logoSrcForTheme(theme: Theme): string {
  switch (theme) {
    case "dark":
      return "/brand/logo-full-on-dark.png";
    case "green":
      return "/brand/logo-full-on-green.png";
    default:
      return "/brand/logo-full.png";
  }
}
