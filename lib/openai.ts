import OpenAI from "openai";
import type { Orientation } from "@/types";

let _client: OpenAI | null = null;

export function openai() {
  if (_client) return _client;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  _client = new OpenAI({ apiKey: key });
  return _client;
}

export function orientationToSize(
  o: Orientation,
): "1024x1024" | "1024x1792" | "1792x1024" {
  if (o === "portrait") return "1024x1792";
  if (o === "landscape") return "1792x1024";
  return "1024x1024";
}

export async function generateImage(opts: {
  prompt: string;
  orientation: Orientation;
}): Promise<string | null> {
  const client = openai();
  if (!client) return null;
  const result = await client.images.generate({
    model: "gpt-image-1",
    prompt: opts.prompt,
    size: orientationToSize(opts.orientation),
    n: 1,
  });
  const item = result.data?.[0];
  if (!item) return null;
  if (item.url) return item.url;
  if (item.b64_json) return `data:image/png;base64,${item.b64_json}`;
  return null;
}
