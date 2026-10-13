import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { AgentNav } from "@/components/agent-nav";

export default function AgentSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={<p className="p-6 text-[var(--color-muted)]">Chargement…</p>}
    >
      <AgentShell>{children}</AgentShell>
    </Suspense>
  );
}

async function AgentShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[var(--color-bg)] lg:flex-row">
      <AgentNav email={session?.user?.email} role={session?.user?.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
