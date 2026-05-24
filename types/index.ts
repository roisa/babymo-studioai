export type ProductCategory =
  | "kids_book"
  | "tshirt"
  | "toy"
  | "printable"
  | "worksheet"
  | "flashcard"
  | "merchandise"
  | "tote_bag"
  | "mug"
  | "sticker"
  | "educational_product";

export type StylePreset =
  | "montessori"
  | "scandinavian_nursery"
  | "korean_kids"
  | "warm_parenting"
  | "storybook"
  | "soft_pastel"
  | "wooden_toy_catalog"
  | "pinterest_mom"
  | "minimal_ecommerce"
  | "cozy_learning";

export type AssetType =
  | "premium_product_photo"
  | "ecommerce_thumbnail"
  | "instagram_post"
  | "instagram_story"
  | "pinterest_pin"
  | "shopee_cover"
  | "whatsapp_catalog"
  | "lifestyle_mockup"
  | "packaging_preview"
  | "ad_creative";

export type Orientation = "square" | "portrait" | "landscape";

export interface ProductMeta {
  id: ProductCategory;
  label: string;
  emoji: string;
  description: string;
  keywords: string[];
}

export interface StyleMeta {
  id: StylePreset;
  label: string;
  tagline: string;
  description: string;
  palette: string[];
  mood: string;
  lighting: string;
  materials: string;
  composition: string;
}

export interface AssetMeta {
  id: AssetType;
  label: string;
  description: string;
  orientation: Orientation;
  aspect: string;
  pixelHint: string;
  platform: string;
}

export interface GeneratedAsset {
  id: string;
  assetType: AssetType;
  prompt: string;
  url: string;
  orientation: Orientation;
  createdAt: string;
}

export interface GenerationJob {
  id: string;
  productCategory: ProductCategory;
  stylePreset: StylePreset;
  sourceImageUrl: string;
  status: "pending" | "generating" | "complete" | "failed";
  assets: GeneratedAsset[];
  createdAt: string;
}
