import { NextResponse } from "next/server";
import { getApplicationDocForViewer } from "@/app/actions/applications";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ documentId: string }> },
) {
  const { documentId } = await ctx.params;
  const result = await getApplicationDocForViewer({ documentId });
  if (!result.ok) {
    const status =
      result.code === "FORBIDDEN"
        ? 403
        : result.code === "NOT_FOUND"
          ? 404
          : 500;
    return NextResponse.json({ error: result.code }, { status });
  }
  return new NextResponse(new Uint8Array(result.bytes), {
    status: 200,
    headers: {
      "Content-Type": result.contentType,
      "Content-Disposition": `inline; filename="${result.filename.replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
