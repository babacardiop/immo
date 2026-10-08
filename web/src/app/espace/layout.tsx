import Link from "next/link";

export default function EspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-[var(--color-steel)]/40 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            EverGreen
          </Link>
          <span className="text-sm text-[var(--color-muted)]">Espace pro</span>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        {children}
      </div>
    </div>
  );
}
