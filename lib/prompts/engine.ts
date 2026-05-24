import type {
  AssetType,
  GeneratedAsset,
  Orientation,
  ProductCategory,
  StylePreset,
} from "@/types";
import { ASSETS, ASSET_LIST } from "./platforms";
import { PRODUCTS } from "./products";
import { STYLES } from "./styles";
import { getScene } from "./scenes";

const NEGATIVE_PROMPT =
  "no harsh fluorescent light, no plastic toy look, no cluttered background, no oversaturated colors, no low-quality stock-photo styling, no neon, no ai artifacts, no warped text";

/**
 * Build a single hidden prompt by composing:
 *   product brief × style direction × asset/platform spec × scene
 */
export function buildPrompt(opts: {
  product: ProductCategory;
  style: StylePreset;
  asset: AssetType;
  customNotes?: string;
}): string {
  const product = PRODUCTS[opts.product];
  const style = STYLES[opts.style];
  const asset = ASSETS[opts.asset];
  const scene = getScene(opts.product, opts.asset);

  const productPhrase =
    product.keywords[0] ?? product.label.toLowerCase();

  const sections = [
    // 1. Headline brief
    `Premium ${asset.label.toLowerCase()} for a "${style.label}" aesthetic kids & parenting brand featuring ${productPhrase}.`,

    // 2. Scene direction
    `Scene: ${scene}.`,

    // 3. Aesthetic
    `Aesthetic: ${style.description} Mood: ${style.mood}.`,

    // 4. Lighting & materials
    `Lighting: ${style.lighting}. Materials & textures: ${style.materials}.`,

    // 5. Palette
    `Color palette: ${style.palette.join(", ")}.`,

    // 6. Composition
    `Composition: ${style.composition}. Framed as ${asset.aspect} (${asset.orientation}) for ${asset.platform}.`,

    // 7. Quality bar
    `Quality: editorial, magazine-grade, ultra-high resolution, photoreal, premium ecommerce, warm and emotional, hand-styled feeling, never generic.`,

    // 8. Negatives
    `Avoid: ${NEGATIVE_PROMPT}.`,

    opts.customNotes
      ? `Brand notes: ${opts.customNotes}.`
      : "",
  ];

  return sections.filter(Boolean).join(" ");
}

/**
 * Per-product asset playlist — these are the curated default outputs
 * that match the spec's "if user uploads X, generate Y" mapping.
 */
const ASSET_PLAYLISTS: Record<ProductCategory, AssetType[]> = {
  kids_book: [
    "premium_product_photo",
    "lifestyle_mockup",
    "pinterest_pin",
    "instagram_post",
    "instagram_story",
    "ecommerce_thumbnail",
    "ad_creative",
    "shopee_cover",
    "packaging_preview",
    "whatsapp_catalog",
  ],
  tshirt: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "pinterest_pin",
    "instagram_story",
    "shopee_cover",
    "ad_creative",
    "packaging_preview",
    "whatsapp_catalog",
  ],
  toy: [
    "premium_product_photo",
    "ecommerce_thumbnail",
    "lifestyle_mockup",
    "instagram_post",
    "pinterest_pin",
    "instagram_story",
    "shopee_cover",
    "packaging_preview",
    "ad_creative",
    "whatsapp_catalog",
  ],
  printable: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "pinterest_pin",
    "instagram_post",
    "instagram_story",
    "ad_creative",
    "shopee_cover",
    "packaging_preview",
    "whatsapp_catalog",
  ],
  worksheet: [
    "premium_product_photo",
    "lifestyle_mockup",
    "pinterest_pin",
    "ecommerce_thumbnail",
    "instagram_post",
    "instagram_story",
    "ad_creative",
    "shopee_cover",
    "packaging_preview",
    "whatsapp_catalog",
  ],
  flashcard: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "pinterest_pin",
    "instagram_story",
    "shopee_cover",
    "packaging_preview",
    "ad_creative",
    "whatsapp_catalog",
  ],
  merchandise: ASSET_LIST.map((a) => a.id),
  tote_bag: ASSET_LIST.map((a) => a.id),
  mug: ASSET_LIST.map((a) => a.id),
  sticker: ASSET_LIST.map((a) => a.id),
  educational_product: ASSET_LIST.map((a) => a.id),
};

export function getAssetPlaylist(product: ProductCategory): AssetType[] {
  return ASSET_PLAYLISTS[product];
}

/**
 * Build all prompts for a full job: one per asset in the playlist.
 * Returns an array of prompt records ready to feed to the image API.
 */
export function buildJobPrompts(opts: {
  product: ProductCategory;
  style: StylePreset;
  customNotes?: string;
}) {
  const playlist = getAssetPlaylist(opts.product);
  return playlist.map((asset) => ({
    assetType: asset,
    label: ASSETS[asset].label,
    orientation: ASSETS[asset].orientation,
    aspect: ASSETS[asset].aspect,
    prompt: buildPrompt({ ...opts, asset }),
  }));
}

/**
 * Local placeholder used when the OpenAI key isn't set, so the demo
 * still renders a believable masonry gallery.
 */
export function placeholderAsset(
  assetType: AssetType,
  seed: number,
): GeneratedAsset {
  const meta = ASSETS[assetType];
  const dims = orientationDims(meta.orientation);
  return {
    id: `${assetType}-${seed}`,
    assetType,
    prompt: "(placeholder — OPENAI_API_KEY not configured)",
    url: `https://picsum.photos/seed/babymo-${assetType}-${seed}/${dims.w}/${dims.h}`,
    orientation: meta.orientation,
    createdAt: new Date().toISOString(),
  };
}

function orientationDims(o: Orientation) {
  if (o === "portrait") return { w: 800, h: 1200 };
  if (o === "landscape") return { w: 1200, h: 800 };
  return { w: 1000, h: 1000 };
}
