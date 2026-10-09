"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";
import { listingFormSchema } from "@/lib/listings/schema";
import { canMutateListing } from "@/lib/listings/acl";
import { paperFieldsForTransaction } from "@/lib/listings/paper";
import { buildListingSlug, listingPath } from "@/lib/listings/slug";
import { evaluatePublishGate } from "@/lib/listings/publish-gate";
import {
  deletePublicObject,
  isAllowedImageMime,
  uploadListingPhoto,
  uploadMandatePdf,
} from "@/lib/storage/r2";

export type ActionResult =
  | { ok: true; id?: string; slug?: string }
  | { ok: false; error: string; code?: string };

function revalidateListing(slug: string | null | undefined, id: string) {
  revalidatePath("/espace/agent");
  revalidatePath("/espace/agent/annonces");
  if (slug) revalidatePath(listingPath(slug));
  revalidatePath(listingPath(id)); // legacy id URLs during transition
  // Public catalogue + fiches (S02)
  revalidatePath("/");
  revalidatePath("/acheter");
  revalidatePath("/louer");
  if (slug) {
    revalidatePath(`/acheter/${slug}`);
    revalidatePath(`/louer/${slug}`);
  }
  revalidatePath("/sitemap.xml");
}

async function assertCanMutate(listingId: string, userId: string, role: string) {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: { mandate: true, media: true },
  });
  if (!listing) throw new Error("NOT_FOUND");
  if (
    !canMutateListing({
      listingAgentId: listing.agentId,
      actorId: userId,
      actorRole: role as never,
    })
  ) {
    throw new Error("FORBIDDEN");
  }
  return listing;
}

function parseForm(formData: FormData) {
  const raw = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    transaction: String(formData.get("transaction") ?? "SALE"),
    propertyType: String(formData.get("propertyType") ?? "LAND"),
    paperType: formData.get("paperType")
      ? String(formData.get("paperType"))
      : null,
    paperVerifiedLevel: String(
      formData.get("paperVerifiedLevel") ?? "DECLARED",
    ),
    deliberationDisclaimerAck:
      formData.get("deliberationDisclaimerAck") === "on" ||
      formData.get("deliberationDisclaimerAck") === "true",
    priceFcfa: formData.get("priceFcfa"),
    areaM2: formData.get("areaM2") || null,
    city: String(formData.get("city") ?? ""),
    quartierLabel: String(formData.get("quartierLabel") ?? ""),
    addressPublic: formData.get("addressPublic")
      ? String(formData.get("addressPublic"))
      : null,
    reference: String(formData.get("reference") ?? ""),
    mandateType: String(formData.get("mandateType") ?? "SIMPLE"),
    mandateReference: formData.get("mandateReference")
      ? String(formData.get("mandateReference"))
      : null,
    mandateStatus: String(formData.get("mandateStatus") ?? "DRAFT"),
    nicad: formData.get("nicad") ? String(formData.get("nicad")) : null,
    waPhone: formData.get("waPhone") ? String(formData.get("waPhone")) : null,
    negotiable:
      formData.get("negotiable") === "on" ||
      formData.get("negotiable") === "true",
  };

  return listingFormSchema.safeParse(raw);
}

export async function createListingAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const user = await requireAgent();
    const limited = rateLimit(`listing:mutate:${user.id}`);
    if (!limited.ok) {
      return { ok: false, error: "Trop de requêtes. Réessayez bientôt." };
    }

    const parsed = parseForm(formData);
    if (!parsed.success) {
      return { ok: false, error: "Champs invalides.", code: "VALIDATION" };
    }
    const data = parsed.data;
    const paper = paperFieldsForTransaction(data.transaction, data);
    const slug = buildListingSlug({
      title: data.title,
      reference: data.reference,
      city: data.city,
      transaction: data.transaction,
      propertyType: data.propertyType,
    });

    const listing = await prisma.listing.create({
      data: {
        title: data.title,
        description: data.description,
        transaction: data.transaction,
        propertyType: data.propertyType,
        paperType: paper.paperType,
        paperVerifiedLevel: paper.paperVerifiedLevel,
        deliberationDisclaimerAck: paper.deliberationDisclaimerAck,
        priceFcfa: data.priceFcfa,
        areaM2: data.areaM2 ?? null,
        city: data.city,
        quartierLabel: data.quartierLabel,
        addressPublic: data.addressPublic,
        reference: data.reference,
        slug,
        nicad: paper.nicad,
        waPhone: data.waPhone,
        negotiable: data.negotiable,
        agentId: user.id,
        status: "DRAFT",
        mandate: {
          create: {
            type: data.mandateType,
            reference: data.mandateReference,
            status: data.mandateStatus,
            agentId: user.id,
          },
        },
      },
    });

    revalidateListing(listing.slug, listing.id);
    return { ok: true, id: listing.id, slug: listing.slug ?? slug };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { ok: false, error: "Référence ou slug déjà utilisé." };
    }
    console.error(e);
    return { ok: false, error: "Création impossible." };
  }
}

export async function updateListingAction(
  listingId: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const user = await requireAgent();
    const limited = rateLimit(`listing:mutate:${user.id}`);
    if (!limited.ok) {
      return { ok: false, error: "Trop de requêtes. Réessayez bientôt." };
    }

    await assertCanMutate(listingId, user.id, user.role);

    const parsed = parseForm(formData);
    if (!parsed.success) {
      return { ok: false, error: "Champs invalides.", code: "VALIDATION" };
    }
    const data = parsed.data;
    const paper = paperFieldsForTransaction(data.transaction, data);
    const slug = buildListingSlug({
      title: data.title,
      reference: data.reference,
      city: data.city,
      transaction: data.transaction,
      propertyType: data.propertyType,
    });

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        title: data.title,
        description: data.description,
        transaction: data.transaction,
        propertyType: data.propertyType,
        paperType: paper.paperType,
        paperVerifiedLevel: paper.paperVerifiedLevel,
        deliberationDisclaimerAck: paper.deliberationDisclaimerAck,
        priceFcfa: data.priceFcfa,
        areaM2: data.areaM2 ?? null,
        city: data.city,
        quartierLabel: data.quartierLabel,
        addressPublic: data.addressPublic,
        reference: data.reference,
        slug,
        nicad: paper.nicad,
        waPhone: data.waPhone,
        negotiable: data.negotiable,
        mandate: {
          upsert: {
            create: {
              type: data.mandateType,
              reference: data.mandateReference,
              status: data.mandateStatus,
              agentId: user.id,
            },
            update: {
              type: data.mandateType,
              reference: data.mandateReference,
              status: data.mandateStatus,
            },
          },
        },
      },
    });

    revalidateListing(slug, listingId);
    return { ok: true, id: listingId, slug };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé.", code: "FORBIDDEN" };
    }
    console.error(e);
    return { ok: false, error: "Mise à jour impossible." };
  }
}

export async function publishListingAction(
  listingId: string,
): Promise<ActionResult> {
  try {
    const user = await requireAgent();
    const limited = rateLimit(`listing:publish:${user.id}`, 10);
    if (!limited.ok) {
      return { ok: false, error: "Trop de publications. Réessayez bientôt." };
    }

    let listing = await assertCanMutate(listingId, user.id, user.role);

    // Publishing implies an active mandate: create or activate so agents
    // are not blocked by forgetting to click « Enregistrer » after the dropdown.
    if (!listing.mandate) {
      await prisma.mandate.create({
        data: {
          listingId,
          type: "SIMPLE",
          status: "ACTIVE",
          agentId: user.id,
        },
      });
    } else if (listing.mandate.status !== "ACTIVE") {
      await prisma.mandate.update({
        where: { id: listing.mandate.id },
        data: { status: "ACTIVE" },
      });
    }

    listing = await assertCanMutate(listingId, user.id, user.role);

    // Rentals must not keep stale sale paper/NICAD.
    const paper = paperFieldsForTransaction(listing.transaction, listing);
    if (
      paper.paperType !== listing.paperType ||
      paper.nicad !== listing.nicad ||
      paper.deliberationDisclaimerAck !== listing.deliberationDisclaimerAck
    ) {
      await prisma.listing.update({
        where: { id: listingId },
        data: {
          paperType: paper.paperType,
          paperVerifiedLevel: paper.paperVerifiedLevel,
          deliberationDisclaimerAck: paper.deliberationDisclaimerAck,
          nicad: paper.nicad,
        },
      });
      listing = await assertCanMutate(listingId, user.id, user.role);
    }

    const gate = evaluatePublishGate(listing);
    if (!gate.ok) {
      return { ok: false, error: gate.message, code: gate.code };
    }

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });

    revalidateListing(listing.slug, listingId);
    return { ok: true, id: listingId, slug: listing.slug ?? undefined };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé.", code: "FORBIDDEN" };
    }
    console.error(e);
    return { ok: false, error: "Publication impossible." };
  }
}

export async function archiveListingAction(
  listingId: string,
): Promise<ActionResult> {
  try {
    const user = await requireAgent();
    const listing = await assertCanMutate(listingId, user.id, user.role);

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        status: "ARCHIVED",
        archivedAt: new Date(),
      },
    });

    revalidateListing(listing.slug, listingId);
    return { ok: true, id: listingId, slug: listing.slug ?? undefined };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé.", code: "FORBIDDEN" };
    }
    return { ok: false, error: "Archivage impossible." };
  }
}

export async function uploadListingPhotosAction(
  listingId: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const user = await requireAgent();
    const limited = rateLimit(`listing:upload:${user.id}`, 20);
    if (!limited.ok) {
      return { ok: false, error: "Trop d’uploads. Réessayez bientôt." };
    }

    const listing = await assertCanMutate(listingId, user.id, user.role);

    const files = formData
      .getAll("photos")
      .filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length === 0) {
      return { ok: false, error: "Aucun fichier." };
    }

    const existingCount = await prisma.mediaAsset.count({
      where: { listingId, kind: "PHOTO" },
    });

    let order = existingCount;
    for (const file of files) {
      if (!isAllowedImageMime(file.type)) {
        return {
          ok: false,
          error: "Formats autorisés : JPG, PNG, WebP.",
          code: "MIME",
        };
      }
      if (file.size > 8 * 1024 * 1024) {
        return { ok: false, error: "Fichier trop volumineux (max 8 Mo)." };
      }

      const bytes = Buffer.from(await file.arrayBuffer());
      const uploaded = await uploadListingPhoto({
        listingId,
        bytes,
        mimeType: file.type,
        sortOrder: order,
      });

      await prisma.mediaAsset.create({
        data: {
          listingId,
          kind: uploaded.kind,
          storage: uploaded.storage,
          key: uploaded.key,
          url: uploaded.url,
          mimeType: uploaded.mimeType,
          sizeBytes: uploaded.sizeBytes,
          sortOrder: order,
        },
      });
      order += 1;
    }

    revalidateListing(listing.slug, listingId);
    return { ok: true, id: listingId, slug: listing.slug ?? undefined };
  } catch (e) {
    if (e instanceof Error && e.message === "MIME_NOT_ALLOWED") {
      return { ok: false, error: "Formats autorisés : JPG, PNG, WebP.", code: "MIME" };
    }
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé.", code: "FORBIDDEN" };
    }
    console.error(e);
    return { ok: false, error: "Upload impossible." };
  }
}

export async function reorderListingPhotoAction(
  mediaId: string,
  direction: "up" | "down",
): Promise<ActionResult> {
  try {
    const user = await requireAgent();
    const media = await prisma.mediaAsset.findUnique({
      where: { id: mediaId },
      include: { listing: true },
    });
    if (!media?.listingId || !media.listing) {
      return { ok: false, error: "Introuvable." };
    }
    if (
      !canMutateListing({
        listingAgentId: media.listing.agentId,
        actorId: user.id,
        actorRole: user.role,
      })
    ) {
      return { ok: false, error: "Accès refusé.", code: "FORBIDDEN" };
    }

    const photos = await prisma.mediaAsset.findMany({
      where: { listingId: media.listingId, kind: "PHOTO" },
      orderBy: { sortOrder: "asc" },
    });
    const index = photos.findIndex((p) => p.id === mediaId);
    if (index < 0) return { ok: false, error: "Introuvable." };
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= photos.length) {
      return { ok: true, id: media.listingId, slug: media.listing.slug ?? undefined };
    }

    const a = photos[index]!;
    const b = photos[swapWith]!;
    await prisma.$transaction([
      prisma.mediaAsset.update({
        where: { id: a.id },
        data: { sortOrder: b.sortOrder },
      }),
      prisma.mediaAsset.update({
        where: { id: b.id },
        data: { sortOrder: a.sortOrder },
      }),
    ]);

    revalidateListing(media.listing.slug, media.listingId);
    return { ok: true, id: media.listingId, slug: media.listing.slug ?? undefined };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Réordonnancement impossible." };
  }
}

export async function deleteListingPhotoAction(
  mediaId: string,
): Promise<ActionResult> {
  try {
    const user = await requireAgent();
    const media = await prisma.mediaAsset.findUnique({
      where: { id: mediaId },
      include: { listing: true },
    });
    if (!media?.listing) return { ok: false, error: "Introuvable." };
    if (
      !canMutateListing({
        listingAgentId: media.listing.agentId,
        actorId: user.id,
        actorRole: user.role,
      })
    ) {
      return { ok: false, error: "Accès refusé.", code: "FORBIDDEN" };
    }

    if (media.storage === "PUBLIC") {
      try {
        await deletePublicObject(media.key);
      } catch (e) {
        console.error("R2 delete failed", e);
      }
    }

    await prisma.mediaAsset.delete({ where: { id: mediaId } });
    revalidateListing(media.listing.slug, media.listing.id);
    return { ok: true, id: media.listing.id, slug: media.listing.slug ?? undefined };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}

export async function uploadMandatePdfAction(
  listingId: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const user = await requireAgent();
    const listing = await assertCanMutate(listingId, user.id, user.role);
    if (!listing.mandate) {
      return { ok: false, error: "Créez d’abord le mandat." };
    }

    const file = formData.get("pdf");
    if (!(file instanceof File)) {
      return { ok: false, error: "PDF requis." };
    }
    if (file.type !== "application/pdf") {
      return { ok: false, error: "PDF uniquement.", code: "MIME" };
    }
    if (file.size > 15 * 1024 * 1024) {
      return { ok: false, error: "PDF trop volumineux (max 15 Mo)." };
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadMandatePdf({
      mandateId: listing.mandate.id,
      bytes,
      mimeType: file.type,
    });

    await prisma.mediaAsset.create({
      data: {
        mandateId: listing.mandate.id,
        kind: uploaded.kind,
        storage: uploaded.storage,
        key: uploaded.key,
        url: null,
        mimeType: uploaded.mimeType,
        sizeBytes: uploaded.sizeBytes,
      },
    });

    revalidateListing(listing.slug, listingId);
    return { ok: true, id: listingId, slug: listing.slug ?? undefined };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Upload vault impossible." };
  }
}
