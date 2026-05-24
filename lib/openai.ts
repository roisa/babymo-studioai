import OpenAI, { toFile } from "openai";
import type { Orientation } from "@/types";

let _client: OpenAI | null = null;

export function openai() {
  if (_client) return _client;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  _client = new OpenAI({ apiKey: key });
  return _client;
}

export function orientationToEditSize(
  o: Orientation,
): "1024x1024" | "1024x1536" | "1536x1024" {
  if (o === "portrait") return "1024x1536";
  if (o === "landscape") return "1536x1024";
  return "1024x1024";
}

/**
 * Image-to-image: take the user's uploaded product photo, restage it
 * into the prompt's scene. The product itself stays visually identical;
 * only the environment, lighting, and props change.
 */
export async function editImage(opts: {
  prompt: string;
  orientation: Orientation;
  imageBuffer: Buffer;
  imageExt: string;
  imageMime: string;
  quality?: "low" | "medium" | "high";
}): Promise<string | null> {
  const client = openai();
  if (!client) return null;

  const file = await toFile(opts.imageBuffer, `input.${opts.imageExt}`, {
    type: opts.imageMime,
  });

  const result = await client.images.edit({
    model: "gpt-image-1",
    image: file,
    prompt: opts.prompt,
    size: orientationToEditSize(opts.orientation),
    n: 1,
    quality: opts.quality ?? "medium",
  });

  const item = result.data?.[0];
  if (!item) return null;
  if (item.b64_json) return `data:image/png;base64,${item.b64_json}`;
  if (item.url) return item.url;
  return null;
}
