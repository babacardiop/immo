import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Libre_Bodoni } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyWa } from "@/components/sticky-wa";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { siteUrl } from "@/lib/seo/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brandSerif = Libre_Bodoni({
  variable: "--font-brand-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "EverGreen Immobilier",
    template: "%s | EverGreen Immobilier",
  },
  description: "Agence immobilière full-service au Sénégal",
  icons: {
    icon: [{ url: "/brand/favicon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/brand/favicon.jpg" }],
  },
  openGraph: {
    locale: "fr_SN",
    siteName: "EverGreen Immobilier",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${brandSerif.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        <ThemeProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Suspense fallback={null}>
            <StickyWa />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
