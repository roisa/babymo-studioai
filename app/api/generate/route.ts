import { NextResponse } from "next/server";
import { ASSETS } from "@/lib/prompts/platforms";
import { buildEditPrompt, placeholderAsset } from "@/lib/prompts/engine";
import { editImage } from "@/lib/openai";
import { dataUrlToBuffer } from "@/lib/image";
import type {
  AssetType,
  GeneratedAsset,
  ProductCategory,
  StylePreset,
} from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

interface Body {
  product: ProductCategory;
  style: StylePreset;
  asset: AssetType;
  imageDataUrl: string;
  notes?: string;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.product || !body.style || !body.asset || !body.imageDataUrl) {
    return NextResponse.json(
      { error: "Missing product, style, asset, or imageDataUrl." },
      { status: 400 },
    );
  }

  const meta = ASSETS[body.asset];

  const prompt = buildEditPrompt({
    product: body.product,
    style: body.style,
    asset: body.asset,
    customNotes: body.notes,
  });

  if (!process.env.OPENAI_API_KEY) {
    const placeholder = placeholderAsset(body.asset, Date.now());
    return NextResponse.json({ asset: placeholder, prompt });
  }

  try {
    const { buffer, ext, mime } = dataUrlToBuffer(body.imageDataUrl);
    const url = await editImage({
      prompt,
      orientation: meta.orientation,
      imageBuffer: buffer,
      imageExt: ext,
      imageMime: mime,
      quality: "medium",
    });

    if (!url) {
      return NextResponse.json(
        { error: "Image generation returned no result." },
        { status: 502 },
      );
    }

    const asset: GeneratedAsset = {
      id: `${body.asset}-${Date.now()}`,
      assetType: body.asset,
      prompt,
      url,
      orientation: meta.orientation,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ asset, prompt });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown image generation error.";
    console.error("image edit failed", err);
    return NextResponse.json(
      { error: message, hint: errorHint(message) },
      { status: 502 },
    );
  }
}

function errorHint(message: string): string | undefined {
  const lower = message.toLowerCase();
  if (lower.includes("must be verified")) {
    return "Your OpenAI organization needs to be verified to use gpt-image-1. Go to platform.openai.com → Settings → Organization → Verify, then redeploy.";
  }
  if (lower.includes("rate") && lower.includes("limit")) {
    return "OpenAI rate limit hit. Wait a minute and try again, or generate fewer assets at once.";
  }
  if (lower.includes("billing") || lower.includes("insufficient")) {
    return "OpenAI billing issue — top up credits at platform.openai.com → Billing.";
  }
  return undefined;
}
