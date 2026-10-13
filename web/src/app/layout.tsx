import type { Metadata } from "next";
import { Suspense } from "react";
import { DM_Sans, Geist_Mono, Syne } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyWa } from "@/components/sticky-wa";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { siteUrl } from "@/lib/seo/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brandDisplay = Syne({
  variable: "--font-brand-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "EverGreen Immobilier",
    template: "%s | EverGreen Immobilier",
  },
  description: "Agence immobilière full-service au Sénégal",
  icons: {
    icon: [
      { url: "/brand/favicon.png", type: "image/png" },
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/brand/icon-180.png", sizes: "180x180", type: "image/png" }],
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
      className={`${dmSans.variable} ${geistMono.variable} ${brandDisplay.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        <ThemeProvider>
          <Suspense fallback={null}>
            <SiteHeader />
          </Suspense>
          {children}
          <Suspense fallback={null}>
            <SiteFooter />
          </Suspense>
          <Suspense fallback={null}>
            <StickyWa />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
