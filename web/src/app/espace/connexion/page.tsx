import { Suspense } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/login-form";
import { BrandLogo } from "@/components/brand-logo";

export default function ConnexionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center p-8 text-[var(--color-muted)]">
          Chargement…
        </div>
      }
    >
      <ConnexionContent />
    </Suspense>
  );
}

async function ConnexionContent() {
  const session = await auth();
  if (session?.user) {
    redirect("/espace/agent");
  }

  return (
    <div className="relative flex min-h-[70vh] flex-1 items-center justify-center px-4 py-16">
      <Image
        src="/images/hero-photo.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-md rounded-[var(--radius-card)] bg-[var(--color-surface)] p-8 shadow-xl">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <BrandLogo />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Espace · Connexion
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Accès réservé aux agents, OD et admins.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
