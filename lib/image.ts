/**
 * Browser-side helper: take a File, downscale it to a max dimension
 * (so we keep payloads under Vercel's 4.5MB serverless body limit),
 * and return a base64 data URL ready to POST to the API.
 */
export async function fileToCompressedDataUrl(
  file: File,
  maxDim = 1024,
  mime: "image/jpeg" | "image/png" = "image/jpeg",
  quality = 0.92,
): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d context unavailable");
  ctx.drawImage(bitmap, 0, 0, w, h);

  return await new Promise<string>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("toBlob failed"));
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      },
      mime,
      quality,
    );
  });
}

export function dataUrlToBuffer(dataUrl: string): {
  buffer: Buffer;
  mime: string;
  ext: string;
} {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error("invalid data URL");
  const mime = match[1];
  const buffer = Buffer.from(match[2], "base64");
  const ext = mime.split("/")[1] ?? "png";
  return { buffer, mime, ext };
}
