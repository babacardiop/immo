import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canMutateListing } from "@/lib/listings/acl";
import { getVaultObjectBuffer } from "@/lib/storage/r2";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ mediaId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mediaId } = await ctx.params;
  const media = await prisma.mediaAsset.findUnique({
    where: { id: mediaId },
    include: { mandate: { include: { listing: true } } },
  });

  if (!media?.mandate?.listing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const listing = media.mandate.listing;
  if (
    !canMutateListing({
      listingAgentId: listing.agentId,
      actorId: session.user.id,
      actorRole: session.user.role,
    })
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (media.storage !== "VAULT" || media.kind !== "DOCUMENT") {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }

  try {
    const { bytes, contentType } = await getVaultObjectBuffer(media.key);
    const filename = (media.alt || "mandat.pdf").replace(/[^\w.\-]+/g, "_");
    return new NextResponse(new Uint8Array(bytes), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Read failed" }, { status: 502 });
  }
}
