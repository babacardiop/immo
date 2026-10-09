import { NextResponse } from "next/server";
import { loadLocationsSnapshot } from "@/lib/locations/query";

export async function GET() {
  const data = await loadLocationsSnapshot();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
