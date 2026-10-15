"use client";

import { Label } from "@/components/ui/label";
import type { ListingOption } from "@/lib/leads/listings-for-picker";

export type { ListingOption };

export function ListingPicker({
  options,
  name = "listingId",
  id = "listingId",
  label = "Bien visité",
  defaultValue,
  required = true,
  hint,
}: {
  options: ListingOption[];
  name?: string;
  id?: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </Label>
      {hint ? (
        <p className="mt-0.5 text-xs text-[var(--color-muted)]">{hint}</p>
      ) : null}
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
      >
        <option value="">
          {required ? "— Choisir le bien —" : "— Aucun / à préciser —"}
        </option>
        {options.map((l) => (
          <option key={l.id} value={l.id}>
            {l.title}
            {l.reference ? ` · ${l.reference}` : ""}
            {l.city ? ` · ${l.city}` : ""}
            {l.status !== "PUBLISHED" ? ` (${l.status})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
