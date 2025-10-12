import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cid = searchParams.get("cid");
    if (!cid) {
      return NextResponse.json({ error: "CID is required" }, { status: 400 });
    }

    const gatewayUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/${cid}`;

    return NextResponse.json({ gatewayUrl }, { status: 200 });
  } catch (error: any) {
    console.error("error retrieving image from pinata", error.message || error);
    return NextResponse.json(
      { error: "Failed to retrieve image", details: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
