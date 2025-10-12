import { NextResponse } from "next/server";

export async function POST() {
  try {
    const JWT = process.env.PINATA_JWT_KEYS;

    const text = "hello world!";
    const blob = new Blob([text], { type: "text/plain" });
    const file = new File([blob], "hello.txt");
    const data = new FormData();
    data.append("file", file);
    data.append("network", "public");

    const request = await fetch("https://uploads.pinata.cloud/v3/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: data,
    });

    const response = await request.json();
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
