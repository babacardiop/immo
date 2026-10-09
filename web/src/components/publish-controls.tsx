"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  archiveListingAction,
  publishListingAction,
} from "@/app/actions/listings";
import { Button } from "@/components/ui/button";
import { canPublishPaper } from "@/lib/listings/paper";
import type {
  ListingStatus,
  MandateStatus,
  PaperType,
  TransactionType,
} from "@prisma/client";

export function PublishControls({
  listingId,
  status,
  transaction,
  paperType,
  mandateStatus,
  photoCount,
}: {
  listingId: string;
  status: ListingStatus;
  transaction: TransactionType;
  paperType: PaperType | null;
  mandateStatus: MandateStatus | null;
  photoCount: number;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const paperOk = canPublishPaper(transaction, paperType);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-[var(--color-muted)]">
        Mandat DB : {mandateStatus ?? "aucun"} · Photos : {photoCount}/3
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          disabled={pending || status === "PUBLISHED" || !paperOk}
          title={
            !paperOk
              ? "Papier TF / Bail / Délibération requis"
              : undefined
          }
          onClick={() => {
            setError(null);
            startTransition(async () => {
              const res = await publishListingAction(listingId);
              if (!res.ok) setError(res.error);
              else router.refresh();
            });
          }}
        >
          {status === "PUBLISHED" ? "Déjà publié" : "Publier"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={pending || status === "ARCHIVED"}
          onClick={() => {
            setError(null);
            startTransition(async () => {
              const res = await archiveListingAction(listingId);
              if (!res.ok) setError(res.error);
              else router.refresh();
            });
          }}
        >
          Archiver
        </Button>
      </div>
      {!paperOk ? (
        <p className="text-sm text-[var(--color-bronze)]">
          Publication désactivée : le type de papier ne passe pas la gate
          (TF, Bail ou Délibération requis pour la vente).
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
