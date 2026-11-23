import { prismaLab } from "@/lib/db";

export const metadata = { title: "Sources" };
export const dynamic = "force-dynamic";

const VERDICT_STYLE: Record<string, string> = {
  OK: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
  CAUTION: "bg-[var(--color-warn)]/15 text-[var(--color-warn)]",
  NO: "bg-[var(--color-danger)]/15 text-[var(--color-danger)]",
};

export default async function SourcesPage() {
  const sources = await prismaLab.source.findMany({
    orderBy: [{ priority: "asc" }, { verdict: "asc" }, { name: "asc" }],
    include: { _count: { select: { listings: true } } },
  });
  const counts = sources.reduce<Record<string, number>>((acc, s) => {
    const k = s.verdict ?? "none";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-bold">Sources</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {sources.length} sites · OK {counts.OK ?? 0} · Prudence {counts.CAUTION ?? 0} · Non{" "}
        {counts.NO ?? 0} · non sondés {counts.none ?? 0}. Verdict technique (robots, anti-bot,
        rendu) — les CGU restent à relire à la main avant tout connecteur.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-[var(--color-surface)]">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="text-xs uppercase text-[var(--color-muted)]">
            <tr>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">P</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Verdict</th>
              <th className="px-4 py-3">Rendu</th>
              <th className="px-4 py-3">Robots</th>
              <th className="px-4 py-3">Raisons</th>
              <th className="px-4 py-3 text-right">Annonces</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => (
              <tr key={s.id} className="border-t border-[var(--color-steel)]/20 align-top">
                <td className="px-4 py-3">
                  <a
                    href={s.listingUrl ?? s.baseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium hover:underline"
                  >
                    {s.name}
                  </a>
                  <div className="text-xs text-[var(--color-muted)]">{new URL(s.baseUrl).hostname}</div>
                </td>
                <td className="px-4 py-3">{s.kind}</td>
                <td className="px-4 py-3">P{s.priority}</td>
                <td className="px-4 py-3">{s.status}</td>
                <td className="px-4 py-3">
                  {s.verdict ? (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${VERDICT_STYLE[s.verdict]}`}>
                      {s.verdict}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">{s.renderMode ?? "—"}</td>
                <td className="px-4 py-3">
                  {s.robotsAllowed == null ? "—" : s.robotsAllowed ? "autorisé" : "interdit"}
                  {s.crawlDelaySec ? ` · delay ${s.crawlDelaySec}s` : ""}
                </td>
                <td className="px-4 py-3 text-xs text-[var(--color-muted)]">{s.verdictReasons.join(" · ")}</td>
                <td className="px-4 py-3 text-right">{s._count.listings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
