"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Listing, Mandate, PaperType, TransactionType } from "@prisma/client";
import {
  createListingAction,
  updateListingAction,
  type ActionResult,
} from "@/app/actions/listings";
import { isSaleLike } from "@/lib/listings/paper";
import { listingPath } from "@/lib/listings/slug";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Autocomplete } from "@/components/ui/autocomplete";
import { PaperBadge } from "@/components/paper-badge";
import {
  filterCityNames,
  filterQuartierEntries,
} from "@/lib/locations/filter";
import { formatQuartierWithCity } from "@/lib/locations/format";
import { useLocations } from "@/hooks/use-locations";

type ListingWithMandate = Listing & { mandate: Mandate | null };

const initial: ActionResult | null = null;

export function ListingForm({
  listing,
}: {
  listing?: ListingWithMandate;
}) {
  const router = useRouter();
  const action = listing
    ? updateListingAction.bind(null, listing.id)
    : createListingAction;

  const [state, formAction, pending] = useActionState(action, initial);
  const [transaction, setTransaction] = useState<TransactionType>(
    listing?.transaction ?? "SALE",
  );
  const [paperType, setPaperType] = useState<PaperType>(
    listing?.paperType ?? "TF",
  );
  const [city, setCity] = useState(listing?.city ?? "");
  const [quartierLabel, setQuartierLabel] = useState(
    listing?.quartierLabel ?? "",
  );
  const { cities, quartiers } = useLocations();

  const showSalePaperFields = isSaleLike(transaction);
  const cityOptions = filterCityNames(cities, city).map((name) => ({
    value: name,
    label: name,
  }));
  const quartierOptions = filterQuartierEntries(
    quartiers,
    quartierLabel,
    city,
  ).map((q) => ({
    value: q.name,
    label: formatQuartierWithCity(q.name, q.city),
    city: q.city,
  }));

  useEffect(() => {
    if (!state?.ok || !state.slug) return;
    if (!listing || listing.slug !== state.slug) {
      router.push(listingPath(state.slug));
    }
  }, [state, listing, router]);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            name="title"
            required
            maxLength={80}
            defaultValue={listing?.title ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="reference">Référence</Label>
          <Input
            id="reference"
            name="reference"
            required
            placeholder="EG-T-042"
            defaultValue={listing?.reference ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="priceFcfa">
            {transaction === "SHORT_TERM_RENT"
              ? "Loyer (FCFA / nuit)"
              : transaction === "RENT"
                ? "Loyer (FCFA / mois)"
                : "Prix (FCFA)"}
          </Label>
          <Input
            id="priceFcfa"
            name="priceFcfa"
            type="number"
            required
            min={1}
            defaultValue={listing?.priceFcfa ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="transaction">Transaction</Label>
          <select
            id="transaction"
            name="transaction"
            className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
            value={transaction}
            onChange={(e) =>
              setTransaction(e.target.value as TransactionType)
            }
          >
            <option value="SALE">Vente</option>
            <option value="RENT">Location</option>
            <option value="SHORT_TERM_RENT">Location courte durée</option>
            <option value="RENT_TO_OWN">Location-vente</option>
            <option value="INSTALLMENT_SALE">Vente étalée</option>
          </select>
        </div>
        <div>
          <Label htmlFor="propertyType">Type de bien</Label>
          <select
            id="propertyType"
            name="propertyType"
            className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
            defaultValue={listing?.propertyType ?? "LAND"}
          >
            <option value="LAND">Terrain</option>
            <option value="HOUSE">Maison</option>
            <option value="APARTMENT">Appartement</option>
            <option value="OFFICE">Bureau</option>
          </select>
        </div>

        {showSalePaperFields ? (
          <>
            <div>
              <Label htmlFor="paperType">Papier</Label>
              <select
                id="paperType"
                name="paperType"
                className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
                value={paperType}
                onChange={(e) => setPaperType(e.target.value as PaperType)}
              >
                <option value="TF">Titre foncier</option>
                <option value="BAIL_EMPHYTEOTIQUE">Bail emphytéotique</option>
                <option value="BAIL_ORDINAIRE">Bail</option>
                <option value="DELIBERATION">Délibération</option>
                <option value="OTHER">Autre (non publiable)</option>
              </select>
              <div className="mt-2">
                <PaperBadge type={paperType} />
              </div>
            </div>
            <div>
              <Label htmlFor="paperVerifiedLevel">Niveau vérif.</Label>
              <select
                id="paperVerifiedLevel"
                name="paperVerifiedLevel"
                className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
                defaultValue={listing?.paperVerifiedLevel ?? "DECLARED"}
              >
                <option value="DECLARED">Déclaré</option>
                <option value="DOCS_ON_FILE">Docs en dossier</option>
                <option value="DILIGENCE_DONE">Diligence faite</option>
              </select>
            </div>
            <div>
              <Label htmlFor="nicad">NICAD</Label>
              <Input
                id="nicad"
                name="nicad"
                maxLength={16}
                defaultValue={listing?.nicad ?? ""}
              />
            </div>
          </>
        ) : null}

        <div>
          <Label htmlFor="city">Ville</Label>
          <Autocomplete
            id="city"
            name="city"
            aria-label="Ville"
            value={city}
            onChange={setCity}
            options={cityOptions}
            placeholder="Dakar, Thiès…"
            required
          />
        </div>
        <div>
          <Label htmlFor="quartierLabel">Quartier</Label>
          <Autocomplete
            id="quartierLabel"
            name="quartierLabel"
            aria-label="Quartier"
            value={quartierLabel}
            onChange={setQuartierLabel}
            onSelectOption={(opt) => {
              setQuartierLabel(opt.value);
              const match = quartierOptions.find(
                (o) => o.value === opt.value && o.label === opt.label,
              );
              if (match?.city) setCity(match.city);
            }}
            options={quartierOptions}
            placeholder="Almadies · Dakar…"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="addressPublic">Adresse publique (approx.)</Label>
          <Input
            id="addressPublic"
            name="addressPublic"
            defaultValue={listing?.addressPublic ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="areaM2">Surface m²</Label>
          <Input
            id="areaM2"
            name="areaM2"
            type="number"
            step="0.01"
            defaultValue={listing?.areaM2?.toString() ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="waPhone">WhatsApp</Label>
          <Input
            id="waPhone"
            name="waPhone"
            placeholder="22177…"
            defaultValue={listing?.waPhone ?? ""}
          />
        </div>
        <div className="flex items-end gap-2 pb-2">
          <input
            id="negotiable"
            name="negotiable"
            type="checkbox"
            defaultChecked={listing?.negotiable ?? false}
            className="h-4 w-4"
          />
          <Label htmlFor="negotiable">Négociable</Label>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            required
            rows={6}
            className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
            defaultValue={listing?.description ?? ""}
          />
        </div>
      </div>

      <fieldset className="rounded-md border border-[var(--color-steel)]/50 p-4">
        <legend className="px-1 text-sm font-medium">Mandat</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="mandateType">Type</Label>
            <select
              id="mandateType"
              name="mandateType"
              className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
              defaultValue={listing?.mandate?.type ?? "SIMPLE"}
            >
              <option value="SIMPLE">Simple</option>
              <option value="EXCLUSIVE">Exclusif</option>
            </select>
          </div>
          <div>
            <Label htmlFor="mandateStatus">Statut</Label>
            <select
              id="mandateStatus"
              name="mandateStatus"
              className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
              defaultValue={listing?.mandate?.status ?? "DRAFT"}
            >
              <option value="DRAFT">Brouillon</option>
              <option value="ACTIVE">Actif</option>
              <option value="ENDED">Terminé</option>
            </select>
          </div>
          <div>
            <Label htmlFor="mandateReference">N° mandat</Label>
            <Input
              id="mandateReference"
              name="mandateReference"
              defaultValue={listing?.mandate?.reference ?? ""}
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          Pour publier, le statut mandat doit être <strong>Actif</strong>.
        </p>
      </fieldset>

      {showSalePaperFields && paperType === "DELIBERATION" ? (
        <div className="flex items-start gap-2">
          <input
            id="deliberationDisclaimerAck"
            name="deliberationDisclaimerAck"
            type="checkbox"
            defaultChecked={listing?.deliberationDisclaimerAck ?? false}
            className="mt-1 h-4 w-4"
          />
          <Label htmlFor="deliberationDisclaimerAck">
            J’accuse réception : une délibération n’est pas un titre foncier.
          </Label>
        </div>
      ) : null}

      {state && !state.ok ? (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p className="text-sm text-[var(--color-olive)]">Enregistré.</p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : listing ? "Enregistrer" : "Créer le brouillon"}
      </Button>
    </form>
  );
}
