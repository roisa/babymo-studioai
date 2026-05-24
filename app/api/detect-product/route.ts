import { NextResponse } from "next/server";
import { detectProductFromFilename } from "@/lib/prompts/products";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { filename?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const guess = detectProductFromFilename(body.filename ?? "");
  return NextResponse.json({ category: guess });
}
