import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "EverGreen").slice(0, 80);
  const subtitle = (searchParams.get("subtitle") || "Immobilier au Sénégal").slice(
    0,
    100,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #f2f2f2 0%, #c4ceb8 55%, #9ea9b2 100%)",
          color: "#0f0f09",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
          EverGreen
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#453f22" }}>{subtitle}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    },
  );
}
