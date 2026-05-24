import type {
  AssetType,
  GeneratedAsset,
  Orientation,
  ProductCategory,
  StylePreset,
} from "@/types";
import { ASSETS } from "./platforms";
import { PRODUCTS } from "./products";
import { STYLES } from "./styles";
import { getScene } from "./scenes";

const NEGATIVE_PROMPT =
  "no harsh fluorescent light, no plastic toy look, no cluttered background, no oversaturated colors, no low-quality stock-photo styling, no neon, no ai artifacts, no warped text";

/**
 * IMAGE-TO-IMAGE prompt. Used with OpenAI images.edit — the user's
 * actual product photo is the input. The prompt instructs the model to
 * preserve the product exactly and only restage the environment around it.
 */
export function buildEditPrompt(opts: {
  product: ProductCategory;
  style: StylePreset;
  asset: AssetType;
  customNotes?: string;
}): string {
  const product = PRODUCTS[opts.product];
  const style = STYLES[opts.style];
  const asset = ASSETS[opts.asset];
  const scene = getScene(opts.product, opts.asset);
  const productPhrase = product.keywords[0] ?? product.label.toLowerCase();

  const sections = [
    `Restage the exact ${productPhrase} from the input image into a new premium scene.`,

    // The critical preservation instruction
    `CRITICAL: keep the product itself visually identical — same shape, label, text, colors, branding, proportions, materials, and packaging. Do not redraw, redesign, or change the product. Only the background, lighting, props, and composition change.`,

    `New scene: ${scene}.`,
    `Aesthetic direction: ${style.description} Mood: ${style.mood}.`,
    `Lighting: ${style.lighting}. Surrounding materials & textures: ${style.materials}.`,
    `Color palette for the environment (not the product): ${style.palette.join(", ")}.`,
    `Composition: ${style.composition}. Output as a ${asset.aspect} (${asset.orientation}) ${asset.label.toLowerCase()} for ${asset.platform}.`,
    `Quality: editorial, magazine-grade, premium ecommerce, photoreal, warm and emotional. The product should be the clear hero of the frame.`,
    `Avoid: ${NEGATIVE_PROMPT}.`,
    opts.customNotes ? `Brand notes: ${opts.customNotes}.` : "",
  ];

  return sections.filter(Boolean).join(" ");
}

/**
 * Text-to-image fallback (no user photo). Less faithful, kept for
 * placeholder / preview paths.
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
    "instagram_post",
    "pinterest_pin",
    "ad_creative",
  ],
  tshirt: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "ad_creative",
  ],
  toy: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "pinterest_pin",
  ],
  printable: [
    "premium_product_photo",
    "lifestyle_mockup",
    "pinterest_pin",
    "instagram_post",
    "ad_creative",
  ],
  worksheet: [
    "premium_product_photo",
    "lifestyle_mockup",
    "pinterest_pin",
    "instagram_post",
    "ad_creative",
  ],
  flashcard: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "pinterest_pin",
  ],
  merchandise: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "ad_creative",
  ],
  tote_bag: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "pinterest_pin",
  ],
  mug: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "pinterest_pin",
  ],
  sticker: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "pinterest_pin",
  ],
  educational_product: [
    "premium_product_photo",
    "lifestyle_mockup",
    "ecommerce_thumbnail",
    "instagram_post",
    "ad_creative",
  ],
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
