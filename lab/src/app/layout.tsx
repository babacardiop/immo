import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "EverGreen Lab", template: "%s | EverGreen Lab" },
  description: "Research Lab interne — usage restreint",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
