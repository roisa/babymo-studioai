import { NextResponse } from "next/server";
import {
  buildJobPrompts,
  placeholderAsset,
} from "@/lib/prompts/engine";
import { generateImage } from "@/lib/openai";
import type {
  GeneratedAsset,
  ProductCategory,
  StylePreset,
} from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

interface Body {
  product: ProductCategory;
  style: StylePreset;
  notes?: string;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.product || !body.style) {
    return NextResponse.json(
      { error: "Missing product or style." },
      { status: 400 },
    );
  }

  const prompts = buildJobPrompts({
    product: body.product,
    style: body.style,
    customNotes: body.notes,
  });

  const hasOpenAI = !!process.env.OPENAI_API_KEY;

  const assets: GeneratedAsset[] = await Promise.all(
    prompts.map(async (p, i): Promise<GeneratedAsset> => {
      if (!hasOpenAI) {
        return placeholderAsset(p.assetType, i + 1);
      }
      try {
        const url = await generateImage({
          prompt: p.prompt,
          orientation: p.orientation,
        });
        return {
          id: `${p.assetType}-${Date.now()}-${i}`,
          assetType: p.assetType,
          prompt: p.prompt,
          url: url ?? placeholderAsset(p.assetType, i + 1).url,
          orientation: p.orientation,
          createdAt: new Date().toISOString(),
        };
      } catch (err) {
        console.error("image gen failed", err);
        return placeholderAsset(p.assetType, i + 1);
      }
    }),
  );

  return NextResponse.json({ assets });
}
