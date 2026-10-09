import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isModeratorOrAbove } from "@/lib/session";
import { ListingForm } from "@/components/listing-form";
import { ListingPhotos } from "@/components/listing-photos";
import { PublishControls } from "@/components/publish-controls";
import { PaperBadge } from "@/components/paper-badge";
import { MandatePdfUpload } from "@/components/mandate-pdf-upload";

export default async function AnnonceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return null;

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      mandate: { include: { media: true } },
      media: {
        where: { kind: "PHOTO" },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!listing) notFound();
  if (
    listing.agentId !== session.user.id &&
    !isModeratorOrAbove(session.user.role)
  ) {
    notFound();
  }

  const photos = listing.media;
  const vaultDocs = listing.mandate?.media ?? [];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {listing.title}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {listing.status} · {listing.slug}
          </p>
          <div className="mt-2">
            <PaperBadge type={listing.paperType} />
          </div>
        </div>
        <PublishControls
          listingId={listing.id}
          status={listing.status}
          transaction={listing.transaction}
          paperType={listing.paperType}
        />
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Fiche</h2>
        <ListingForm listing={listing} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Photos</h2>
        <ListingPhotos listingId={listing.id} photos={photos} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Mandat PDF (vault)</h2>
        <MandatePdfUpload
          listingId={listing.id}
          docsCount={vaultDocs.length}
        />
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          {vaultDocs.length} document(s) vault — non listable publiquement.
        </p>
      </section>
    </div>
  );
}
