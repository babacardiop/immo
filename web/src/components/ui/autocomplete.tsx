"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

export type AutocompleteOption = {
  /** Valeur écrite dans l'input à la sélection (souvent le nom seul). */
  value: string;
  /** Libellé affiché dans la liste (ex. « Almadies · Dakar »). */
  label: string;
};

type AutocompleteProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  /** Appelé quand une option est choisie (permet de sync ville + quartier). */
  onSelectOption?: (option: AutocompleteOption) => void;
  options: AutocompleteOption[];
  placeholder?: string;
  emptyHint?: string;
  required?: boolean;
  "aria-label"?: string;
};

export function Autocomplete({
  id,
  name,
  value,
  onChange,
  onSelectOption,
  options,
  placeholder,
  emptyHint = "Aucun résultat",
  required,
  "aria-label": ariaLabel,
}: AutocompleteProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [options, value]);

  function pick(option: AutocompleteOption) {
    onChange(option.value);
    onSelectOption?.(option);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(options.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && options[active]) {
      e.preventDefault();
      pick(options[active]!);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <Input
        id={id}
        name={name}
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border border-[var(--color-steel)] bg-white py-1 shadow-md"
        >
          {options.length === 0 ? (
            <li className="px-3 py-2 text-sm text-[var(--color-muted)]">
              {emptyHint}
            </li>
          ) : (
            options.map((option, i) => (
              <li key={`${option.label}-${option.value}-${i}`}>
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  className={`block w-full px-3 py-2 text-left text-sm ${
                    i === active
                      ? "bg-[var(--color-sage)]/50"
                      : "hover:bg-[var(--color-sage)]/30"
                  }`}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(option);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
