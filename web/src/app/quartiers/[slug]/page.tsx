import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-sm text-[var(--color-muted)]">
        {landing.city} · {landing.region}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-brand-serif)] text-4xl font-semibold tracking-tight">
        {landing.title}
      </h1>
      <p className="mt-3 text-lg text-[var(--color-muted)]">{landing.promise}</p>

      <h2 className="mt-10 text-2xl font-semibold">Pourquoi {landing.name}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--color-muted)]">
        {landing.why.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <QuartierCta landing={landing} channel="acheter" />
      <div className="mt-3">
        <Link
          href={quartierCatalogueHref(landing, "louer")}
          className="text-sm text-[var(--color-olive)] underline-offset-2 hover:underline"
        >
          Voir aussi les locations à {landing.name}
        </Link>
      </div>

      {landing.faq.length > 0 ? (
        <>
          <h2 className="mt-12 text-2xl font-semibold">FAQ</h2>
          <dl className="mt-4 space-y-4">
            {landing.faq.map((item) => (
              <div key={item.q}>
                <dt className="font-medium">{item.q}</dt>
                <dd className="mt-1 text-[var(--color-muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : null}
    </main>
  );
}
