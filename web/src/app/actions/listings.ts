"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAgent, isModeratorOrAbove } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";
import { listingFormSchema } from "@/lib/listings/schema";
import { buildListingSlug } from "@/lib/listings/slug";
import { evaluatePublishGate } from "@/lib/listings/publish-gate";
import {
  deletePublicObject,
  isAllowedImageMime,
  uploadListingPhoto,
  uploadMandatePdf,
} from "@/lib/storage/r2";

export type ActionResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; code?: string };

async function assertCanMutate(listingId: string, userId: string, role: string) {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: { mandate: true, media: true },
  });
  if (!listing) throw new Error("NOT_FOUND");
  if (
    listing.agentId !== userId &&
    !isModeratorOrAbove(role as never)
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
    const slug = buildListingSlug(data.title, data.reference);

    const listing = await prisma.listing.create({
      data: {
        title: data.title,
        description: data.description,
        transaction: data.transaction,
        propertyType: data.propertyType,
        paperType: data.paperType ?? null,
        paperVerifiedLevel: data.paperVerifiedLevel,
        deliberationDisclaimerAck: data.deliberationDisclaimerAck,
        priceFcfa: data.priceFcfa,
        areaM2: data.areaM2 ?? null,
        city: data.city,
        quartierLabel: data.quartierLabel,
        addressPublic: data.addressPublic,
        reference: data.reference,
        slug,
        nicad: data.nicad,
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

    revalidatePath("/espace/agent");
    revalidatePath("/espace/agent/annonces");
    return { ok: true, id: listing.id };
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
    const slug = buildListingSlug(data.title, data.reference);

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        title: data.title,
        description: data.description,
        transaction: data.transaction,
        propertyType: data.propertyType,
        paperType: data.paperType ?? null,
        paperVerifiedLevel: data.paperVerifiedLevel,
        deliberationDisclaimerAck: data.deliberationDisclaimerAck,
        priceFcfa: data.priceFcfa,
        areaM2: data.areaM2 ?? null,
        city: data.city,
        quartierLabel: data.quartierLabel,
        addressPublic: data.addressPublic,
        reference: data.reference,
        slug,
        nicad: data.nicad,
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

    revalidatePath("/espace/agent");
    revalidatePath("/espace/agent/annonces");
    revalidatePath(`/espace/agent/annonces/${listingId}`);
    return { ok: true, id: listingId };
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

    const listing = await assertCanMutate(listingId, user.id, user.role);
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

    revalidatePath("/espace/agent/annonces");
    revalidatePath(`/espace/agent/annonces/${listingId}`);
    return { ok: true, id: listingId };
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
    await assertCanMutate(listingId, user.id, user.role);

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        status: "ARCHIVED",
        archivedAt: new Date(),
      },
    });

    revalidatePath("/espace/agent/annonces");
    return { ok: true, id: listingId };
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

    await assertCanMutate(listingId, user.id, user.role);

    const files = formData.getAll("photos").filter((f): f is File => f instanceof File);
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

    revalidatePath(`/espace/agent/annonces/${listingId}`);
    return { ok: true, id: listingId };
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
      media.listing.agentId !== user.id &&
      !isModeratorOrAbove(user.role)
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
    revalidatePath(`/espace/agent/annonces/${media.listingId}`);
    return { ok: true };
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

    revalidatePath(`/espace/agent/annonces/${listingId}`);
    return { ok: true, id: listingId };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Upload vault impossible." };
  }
}
