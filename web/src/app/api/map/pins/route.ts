import { NextResponse } from "next/server";
import { listMapPins } from "@/lib/listings/map-pins";
import type { CatalogueChannel } from "@/lib/listings/public-query";
import { parseCatalogueSearchParams } from "@/lib/listings/parse-filters";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const channelParam = url.searchParams.get("channel");
  const channel: CatalogueChannel =
    channelParam === "louer" ? "louer" : "acheter";

  const filters = parseCatalogueSearchParams(
    Object.fromEntries(url.searchParams.entries()),
  );

  const pins = await listMapPins(channel, filters);
  return NextResponse.json({ pins });
}
