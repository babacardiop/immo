"use client";

import Image from "next/image";
import Link from "next/link";
import { logoSrcForTheme } from "@/lib/theme";
import { useTheme } from "@/components/theme-provider";

export function BrandLogo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const { theme } = useTheme();
  const src = logoSrcForTheme(theme);

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="EverGreen Immobilier — accueil"
    >
      <Image
        src={src}
        alt="EverGreen Immobilier"
        width={200}
        height={56}
        priority={priority}
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
