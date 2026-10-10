import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { QuartierCta } from "@/components/quartier-cta";
import {
  getQuartierLanding,
  listQuartierLandings,
  quartierCatalogueHref,
} from "@/lib/content/quartiers";
import { absoluteUrl } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listQuartierLandings().map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const landing = getQuartierLanding(slug);
  if (!landing) return { title: "Quartier introuvable" };
  return {
    title: `${landing.title} | EverGreen`,
    description: landing.description,
    alternates: { canonical: absoluteUrl(`/quartiers/${landing.slug}`) },
    openGraph: {
      title: landing.title,
      description: landing.description,
      url: absoluteUrl(`/quartiers/${landing.slug}`),
      locale: "fr_SN",
      images: [
        {
          url: absoluteUrl(
            `/api/og?title=${encodeURIComponent(landing.name)}`,
          ),
        },
      ],
    },
  };
}

export default async function QuartierLandingPage({ params }: Props) {
  const { slug } = await params;
  const landing = getQuartierLanding(slug);
  if (!landing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: landing.title,
    description: landing.description,
    about: {
      "@type": "Place",
      name: landing.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: landing.city,
        addressRegion: landing.region,
        addressCountry: "SN",
      },
    },
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px]">
        <Image
          src="/images/discover-photo.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/25" />
        <div className="relative z-10 mx-auto flex h-full min-h-[280px] max-w-6xl flex-col justify-end px-6 pb-10 pt-16 sm:min-h-[340px]">
          <PageBreadcrumb
            items={[
              { href: "/", label: "Accueil" },
              { label: landing.name },
            ]}
          />
          <p className="mt-2 text-sm text-white/75">
            {landing.city} · {landing.region}
          </p>
          <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {landing.title}
          </h1>
          <p className="mt-3 max-w-xl text-white/85">{landing.promise}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Pourquoi {landing.name}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--color-muted)]">
              {landing.why.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <QuartierCta landing={landing} channel="acheter" />
            <div className="mt-3">
              <Link
                href={quartierCatalogueHref(landing, "louer")}
                className="text-sm font-medium text-[var(--color-leaf)] underline-offset-2 hover:underline"
              >
                Voir aussi les locations à {landing.name} →
              </Link>
            </div>
          </section>

          <aside className="flex flex-col gap-4">
            <div className="rounded-[var(--radius-card)] bg-[var(--color-sage)]/30 p-6">
              <h2 className="font-semibold">Catalogue</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Filtrez les biens publiés dans ce quartier — vente ou location.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={quartierCatalogueHref(landing, "acheter")}
                  className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-bg)]"
                >
                  Acheter
                </Link>
                <Link
                  href={quartierCatalogueHref(landing, "louer")}
                  className="inline-flex rounded-[var(--radius-pill)] border border-[var(--color-ink)]/20 bg-[var(--color-surface)] px-4 py-2 text-sm font-medium"
                >
                  Louer
                </Link>
              </div>
            </div>

            {landing.faq.length > 0 ? (
              <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-6">
                <h2 className="font-semibold">FAQ</h2>
                <dl className="mt-4 space-y-4">
                  {landing.faq.map((item) => (
                    <div key={item.q}>
                      <dt className="text-sm font-medium">{item.q}</dt>
                      <dd className="mt-1 text-sm text-[var(--color-muted)]">
                        {item.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
