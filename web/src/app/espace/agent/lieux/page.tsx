import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isModeratorOrAbove } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import { LieuxAdmin } from "@/components/lieux-admin";

export const metadata = {
  title: "Lieux | EverGreen",
};

export default async function LieuxPage() {
  const session = await auth();
  if (!session?.user?.role || !isModeratorOrAbove(session.user.role)) {
    redirect("/espace/agent");
  }

  const [cities, quartiers] = await Promise.all([
    prisma.city.findMany({
      orderBy: [{ name: "asc" }],
      include: { _count: { select: { quartiers: true } } },
    }),
    prisma.quartier.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        city: { select: { id: true, name: true, region: true } },
      },
    }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Lieux</h1>
      <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
        Thesaurus hiérarchique région → ville → quartier. Affichage type
        « Almadies · Dakar · Dakar ».
      </p>
      <div className="mt-8">
        <LieuxAdmin cities={cities} quartiers={quartiers} />
      </div>
    </div>
  );
}
