import type {
  Listing,
  Mandate,
  MediaAsset,
  PaperType,
  TransactionType,
} from "@prisma/client";
import {
  canPublishPaper,
  MIN_PHOTOS_TO_PUBLISH,
  paperLabel,
} from "@/lib/listings/paper";

export type PublishGateInput = Listing & {
  mandate: Mandate | null;
  media: MediaAsset[];
};

export type PublishGateResult =
  | { ok: true }
  | { ok: false; code: string; message: string };

export function evaluatePublishGate(
  listing: PublishGateInput,
): PublishGateResult {
  if (listing.status === "ARCHIVED") {
    return {
      ok: false,
      code: "ARCHIVED",
      message: "Impossible de publier une annonce archivée.",
    };
  }

  if (!listing.title?.trim()) {
    return {
      ok: false,
      code: "TITLE",
      message: "Titre requis pour publier.",
    };
  }

  if (!listing.description?.trim()) {
    return {
      ok: false,
      code: "DESCRIPTION",
      message: "Description requise pour publier.",
    };
  }

  if (listing.priceFcfa == null || listing.priceFcfa <= 0) {
    return {
      ok: false,
      code: "PRICE",
      message: "Prix (FCFA) requis pour publier.",
    };
  }

  if (!listing.city?.trim() || !listing.quartierLabel?.trim()) {
    return {
      ok: false,
      code: "LOCATION",
      message: "Ville et quartier requis pour publier.",
    };
  }

  if (!listing.slug?.trim() || !listing.reference?.trim()) {
    return {
      ok: false,
      code: "IDENTITY",
      message: "Référence et slug requis pour publier.",
    };
  }

  if (
    !canPublishPaper(
      listing.transaction as TransactionType,
      listing.paperType as PaperType | null,
    )
  ) {
    return {
      ok: false,
      code: "PAPER",
      message: `Publication refusée : type de papier « ${paperLabel(listing.paperType)} » non autorisé. Requis : TF, Bail ou Délibération.`,
    };
  }

  if (
    listing.paperType === "DELIBERATION" &&
    !listing.deliberationDisclaimerAck
  ) {
    return {
      ok: false,
      code: "DELIB_ACK",
      message:
        "Pour une délibération, cochez l’accusé disclaimer avant de publier.",
    };
  }

  if (!listing.mandate || listing.mandate.status !== "ACTIVE") {
    return {
      ok: false,
      code: "MANDATE",
      message: "Un mandat actif est requis pour publier.",
    };
  }

  const photos = listing.media.filter(
    (m) => m.kind === "PHOTO" && m.storage === "PUBLIC",
  );
  if (photos.length < MIN_PHOTOS_TO_PUBLISH) {
    return {
      ok: false,
      code: "PHOTOS",
      message: `Au moins ${MIN_PHOTOS_TO_PUBLISH} photos sont requises pour publier (${photos.length} actuelle(s)).`,
    };
  }

  return { ok: true };
}
