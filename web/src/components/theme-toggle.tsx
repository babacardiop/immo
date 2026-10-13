"use client";

import { useEffect, useId, useRef, useState } from "react";
import { THEMES, type Theme } from "@/lib/theme";
import { useTheme } from "@/components/theme-provider";

const LABELS: Record<Theme, string> = {
  light: "Clair",
  dark: "Sombre",
  green: "Vert",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-steel)]/45 bg-[var(--color-surface)] text-[var(--color-ink)] transition hover:border-[var(--color-olive)]"
        aria-label="Changer le thème"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <ThemeIcon theme={theme} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Thème"
          className="absolute right-0 z-[60] mt-2 min-w-[10rem] overflow-hidden rounded-2xl border border-[var(--color-steel)]/35 bg-[var(--color-surface)] py-1 shadow-lg"
        >
          {THEMES.map((t) => {
            const active = theme === t;
            return (
              <button
                key={t}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "bg-[var(--color-ink)] font-medium text-[var(--color-bg)]"
                    : "text-[var(--color-ink)] hover:bg-[var(--color-bg)]"
                }`}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
              >
                <ThemeIcon theme={t} className="h-4 w-4 shrink-0" />
                {LABELS[t]}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ThemeIcon({
  theme,
  className = "h-5 w-5",
}: {
  theme: Theme;
  className?: string;
}) {
  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
        <path d="M21 14.3A8.5 8.5 0 0 1 9.7 3 7 7 0 1 0 21 14.3Z" />
      </svg>
    );
  }
  if (theme === "green") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
        <path d="M12 3c-1.5 4-1.5 7 0 11 1.2-1.8 3-3 5.5-3.5C15.8 14.8 13 18 9.5 19.5 6.5 20.8 4 20 3 18c3.5-.5 6-2.2 7.5-5C9 9.5 9 6 12 3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5-4.5a1 1 0 0 1-1 1H17a1 1 0 1 1 0-2h1.5a1 1 0 0 1 1 1ZM7 12a1 1 0 0 1-1 1H4.5a1 1 0 1 1 0-2H6a1 1 0 0 1 1 1Zm9.95 5.45a1 1 0 0 1-1.4 0l-1.06-1.06a1 1 0 1 1 1.4-1.42l1.07 1.06a1 1 0 0 1 0 1.42ZM9.5 8.04a1 1 0 0 1-1.41 0L7.03 6.98A1 1 0 0 1 8.44 5.56L9.5 6.63a1 1 0 0 1 0 1.41Zm0 7.92a1 1 0 0 1 0 1.41l-1.06 1.07A1 1 0 1 1 7.03 17.02L8.1 15.96a1 1 0 0 1 1.4 0Zm6.9-7.92a1 1 0 0 1 0-1.41l1.06-1.07a1 1 0 0 1 1.42 1.42L17.8 8.04a1 1 0 0 1-1.4 0Z" />
    </svg>
  );
}
