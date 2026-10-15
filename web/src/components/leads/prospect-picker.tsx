"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProspectSearchHit } from "@/lib/leads/prospect-search";

export type ProspectSelection = {
  id?: string;
  name: string;
  phone: string;
  email?: string;
};

type Mode = "search" | "create";

function formatHit(p: ProspectSearchHit): string {
  const name = p.name?.trim() || "Sans nom";
  const phone = p.phone?.trim() || "—";
  return `${name} · ${phone}`;
}

function fromDefault(
  d?: ProspectSelection,
): ProspectSelection | null {
  if (!d) return null;
  if (!d.id && !d.name && !d.phone) return null;
  return {
    id: d.id,
    name: d.name ?? "",
    phone: d.phone ?? "",
    email: d.email ?? "",
  };
}

export function ProspectPicker({
  defaultSelection,
  locked = false,
}: {
  defaultSelection?: ProspectSelection;
  /** Lead detail : identité figée, pas de recherche. */
  locked?: boolean;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const initial = fromDefault(defaultSelection);

  const [mode, setMode] = useState<Mode>("search");
  const [selected, setSelected] = useState<ProspectSelection | null>(
    initial?.id || locked ? initial : null,
  );
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<ProspectSearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pending, startTransition] = useTransition();

  const [createName, setCreateName] = useState(initial?.name ?? "");
  const [createPhone, setCreatePhone] = useState(initial?.phone ?? "");
  const [createEmail, setCreateEmail] = useState(initial?.email ?? "");

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (mode !== "search" || selected || query.trim().length < 2) {
      setHits([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      startTransition(async () => {
        try {
          const res = await fetch(
            `/api/espace/prospects/search?q=${encodeURIComponent(query.trim())}`,
            { signal: ctrl.signal },
          );
          if (!res.ok) return;
          const data = (await res.json()) as { results: ProspectSearchHit[] };
          setHits(data.results ?? []);
          setOpen(true);
          setActive(0);
        } catch {
          /* abort / network */
        }
      });
    }, 220);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query, mode, selected]);

  function pick(hit: ProspectSearchHit) {
    setSelected({
      id: hit.id,
      name: hit.name ?? "",
      phone: hit.phone ?? "",
      email: hit.email ?? "",
    });
    setQuery("");
    setHits([]);
    setOpen(false);
  }

  function startCreate() {
    setSelected(null);
    setMode("create");
    setHits([]);
    setOpen(false);
    const q = query.trim();
    if (q) {
      const digits = q.replace(/\D/g, "");
      if (digits.length >= 6) {
        setCreatePhone(q);
      } else if (!createName) {
        setCreateName(q);
      }
    }
    setQuery("");
  }

  function clearSelection() {
    setSelected(null);
    setMode("search");
    setQuery("");
  }

  if (locked && selected) {
    return (
      <div>
        <Label>Prospect *</Label>
        <div className="mt-1 rounded-2xl bg-[var(--color-bg)] px-3 py-3 text-sm">
          <input type="hidden" name="leadId" value={selected.id ?? ""} />
          <input type="hidden" name="name" value={selected.name} />
          <input type="hidden" name="phone" value={selected.phone} />
          <input type="hidden" name="email" value={selected.email ?? ""} />
          <p className="font-medium">
            {selected.name || "Sans nom"} · {selected.phone || "—"}
          </p>
          {selected.email ? (
            <p className="text-[var(--color-muted)]">{selected.email}</p>
          ) : null}
        </div>
      </div>
    );
  }

  if (selected?.id) {
    return (
      <div>
        <Label>Prospect *</Label>
        <div className="mt-1 flex items-start gap-2 rounded-2xl bg-[var(--color-bg)] px-3 py-3">
          <input type="hidden" name="leadId" value={selected.id} />
          <input type="hidden" name="name" value={selected.name} />
          <input type="hidden" name="phone" value={selected.phone} />
          <input type="hidden" name="email" value={selected.email ?? ""} />
          <div className="min-w-0 flex-1 text-sm">
            <p className="truncate font-medium">
              {selected.name || "Sans nom"} · {selected.phone || "—"}
            </p>
            {selected.email ? (
              <p className="truncate text-[var(--color-muted)]">
                {selected.email}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={clearSelection}
            className="shrink-0 text-sm text-[var(--color-olive)] hover:underline"
          >
            Changer
          </button>
        </div>
      </div>
    );
  }

  if (mode === "create") {
    return (
      <div className="space-y-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-steel)]/50 p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Nouveau prospect *</p>
          <button
            type="button"
            onClick={() => setMode("search")}
            className="text-sm text-[var(--color-muted)] hover:underline"
          >
            Annuler
          </button>
        </div>
        <div>
          <Label htmlFor="pp-name">Nom / prénom *</Label>
          <Input
            id="pp-name"
            name="name"
            required
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
            placeholder="Prénom Nom"
          />
        </div>
        <div>
          <Label htmlFor="pp-phone">Téléphone *</Label>
          <Input
            id="pp-phone"
            name="phone"
            type="tel"
            required
            value={createPhone}
            onChange={(e) => setCreatePhone(e.target.value)}
            placeholder="77…"
          />
        </div>
        <div>
          <Label htmlFor="pp-email">Email (optionnel)</Label>
          <Input
            id="pp-email"
            name="email"
            type="email"
            value={createEmail}
            onChange={(e) => setCreateEmail(e.target.value)}
          />
        </div>
      </div>
    );
  }

  const showList = open && query.trim().length >= 2;

  return (
    <div ref={rootRef}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <Label htmlFor="pp-search" className="mb-0">
          Prospect *
        </Label>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-ink)] text-lg leading-none text-white hover:opacity-90"
          aria-label="Nouveau prospect"
          title="Nouveau prospect"
        >
          +
        </button>
      </div>
      <p className="mb-1 text-xs text-[var(--color-muted)]">
        Rechercher par nom, prénom ou téléphone — ou + si absent.
      </p>
      <div className="relative">
        <Input
          id="pp-search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Ex. Amadou… ou 77…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!showList) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" && hits[active]) {
              e.preventDefault();
              pick(hits[active]!);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        {/* Bloque le submit tant qu’aucun prospect n’est choisi */}
        <input
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          required
          value=""
          onChange={() => {}}
        />
        {showList ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border border-[var(--color-steel)] bg-white py-1 shadow-md"
          >
            {pending && hits.length === 0 ? (
              <li className="px-3 py-2 text-sm text-[var(--color-muted)]">
                Recherche…
              </li>
            ) : hits.length === 0 ? (
              <li className="px-3 py-2 text-sm text-[var(--color-muted)]">
                Aucun prospect —{" "}
                <button
                  type="button"
                  className="text-[var(--color-olive)] underline"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    startCreate();
                  }}
                >
                  créer (+)
                </button>
              </li>
            ) : (
              hits.map((hit, i) => (
                <li key={hit.id}>
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
                      pick(hit);
                    }}
                  >
                    {formatHit(hit)}
                    {hit.email ? (
                      <span className="block text-xs text-[var(--color-muted)]">
                        {hit.email}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : open && query.trim().length < 2 ? (
          <p className="absolute z-20 mt-1 w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm text-[var(--color-muted)] shadow-md">
            Tapez au moins 2 caractères…
          </p>
        ) : null}
      </div>
    </div>
  );
}
