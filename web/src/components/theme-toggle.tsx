"use client";

import { THEMES, type Theme } from "@/lib/theme";
import { useTheme } from "@/components/theme-provider";

const LABELS: Record<Theme, string> = {
  light: "Clair",
  dark: "Sombre",
  green: "Vert",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-[var(--color-steel)]/40 bg-[var(--color-surface)] p-0.5"
      role="group"
      aria-label="Thème"
    >
      {THEMES.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTheme(t)}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
            theme === t
              ? "bg-[var(--color-ink)] text-[var(--color-bg)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          }`}
          aria-pressed={theme === t}
        >
          {LABELS[t]}
        </button>
      ))}
    </div>
  );
}
