import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  requireAgent,
  prismaMock,
  uploadListingPhoto,
  evaluatePublishGate,
  revalidatePath,
} = vi.hoisted(() => ({
  requireAgent: vi.fn(),
  uploadListingPhoto: vi.fn(),
  evaluatePublishGate: vi.fn(),
  revalidatePath: vi.fn(),
  prismaMock: {
    listing: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    mandate: {
      create: vi.fn(),
      update: vi.fn(),
    },
    mediaAsset: {
      count: vi.fn(),
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    $transaction: vi.fn(async (ops: unknown[]) => ops),
  },
}));

vi.mock("@/lib/session", () => ({
  requireAgent: requireAgent,
  isModeratorOrAbove: (role: string) =>
    ["MODERATOR", "ADMIN", "GER"].includes(role),
}));

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

vi.mock("@/lib/storage/r2", () => ({
  uploadListingPhoto,
  uploadMandatePdf: vi.fn(),
  deletePublicObject: vi.fn(),
  isAllowedImageMime: (mime: string) =>
    ["image/jpeg", "image/png", "image/webp"].includes(mime),
}));

vi.mock("@/lib/listings/publish-gate", async () => {
  const actual = await vi.importActual<
    typeof import("@/lib/listings/publish-gate")
  >("@/lib/listings/publish-gate");
  return {
    ...actual,
    evaluatePublishGate,
  };
});

vi.mock("next/cache", () => ({
  revalidatePath,
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: () => ({ ok: true }),
}));

import {
  archiveListingAction,
  createListingAction,
  publishListingAction,
  uploadListingPhotosAction,
} from "@/app/actions/listings";

function form(data: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.set(k, v);
  return fd;
}

const baseForm = {
  title: "Terrain Almadies",
  description: "Belle parcelle proche mer avec accès bitume.",
  transaction: "SALE",
  propertyType: "LAND",
  paperType: "TF",
  paperVerifiedLevel: "DECLARED",
  priceFcfa: "25000000",
  city: "Dakar",
  quartierLabel: "Almadies",
  reference: "EG-T-777",
  mandateType: "SIMPLE",
  mandateStatus: "ACTIVE",
};

describe("listings actions (integration mocked)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    requireAgent.mockResolvedValue({
      id: "agent1",
      email: "agent@evergreen.sn",
      role: "AGENT",
    });
  });

  it("creates a listing draft OK", async () => {
    prismaMock.listing.create.mockResolvedValue({
      id: "L1",
      slug: "terrain-terrain-almadies-a-vendre-a-dakar-eg-t-777",
    });

    const res = await createListingAction(null, form(baseForm));
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.id).toBe("L1");
      expect(res.slug).toContain("eg-t-777");
    }
    expect(prismaMock.listing.create).toHaveBeenCalled();
  });

  it("returns error on slug/reference conflict", async () => {
    const { Prisma } = await import("@prisma/client");
    prismaMock.listing.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError("Unique", {
        code: "P2002",
        clientVersion: "test",
      }),
    );

    const res = await createListingAction(null, form(baseForm));
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/déjà utilisé/i);
  });

  it("publishes when gate passes and sets PUBLISHED", async () => {
    const listing = {
      id: "L1",
      slug: "slug-1",
      agentId: "agent1",
      status: "DRAFT",
      transaction: "SALE",
      paperType: "TF",
      nicad: null,
      deliberationDisclaimerAck: false,
      paperVerifiedLevel: "DECLARED",
      mandate: { id: "m1", status: "ACTIVE" },
      media: [],
    };
    prismaMock.listing.findUnique.mockResolvedValue(listing);
    evaluatePublishGate.mockReturnValue({ ok: true });
    prismaMock.listing.update.mockResolvedValue({});

    const res = await publishListingAction("L1");
    expect(res.ok).toBe(true);
    expect(prismaMock.listing.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "L1" },
        data: expect.objectContaining({ status: "PUBLISHED" }),
      }),
    );
  });

  it("archives listing", async () => {
    prismaMock.listing.findUnique.mockResolvedValue({
      id: "L1",
      slug: "slug-1",
      agentId: "agent1",
      mandate: null,
      media: [],
    });
    prismaMock.listing.update.mockResolvedValue({});

    const res = await archiveListingAction("L1");
    expect(res.ok).toBe(true);
    expect(prismaMock.listing.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: "ARCHIVED" }),
      }),
    );
  });

  it("uploads photo via mocked R2 and persists MediaAsset", async () => {
    prismaMock.listing.findUnique.mockResolvedValue({
      id: "L1",
      slug: "slug-1",
      agentId: "agent1",
      mandate: null,
      media: [],
    });
    prismaMock.mediaAsset.count.mockResolvedValue(0);
    uploadListingPhoto.mockResolvedValue({
      kind: "PHOTO",
      storage: "PUBLIC",
      key: "listings/L1/photos/x.jpg",
      url: "https://pub-ci.r2.dev/listings/L1/photos/x.jpg",
      mimeType: "image/jpeg",
      sizeBytes: 4,
    });
    prismaMock.mediaAsset.create.mockResolvedValue({});

    const fd = new FormData();
    fd.append(
      "photos",
      new File([Uint8Array.from([1, 2, 3, 4])], "a.jpg", {
        type: "image/jpeg",
      }),
    );

    const res = await uploadListingPhotosAction("L1", fd);
    expect(res.ok).toBe(true);
    expect(uploadListingPhoto).toHaveBeenCalled();
    expect(prismaMock.mediaAsset.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          listingId: "L1",
          key: "listings/L1/photos/x.jpg",
        }),
      }),
    );
  });
});
