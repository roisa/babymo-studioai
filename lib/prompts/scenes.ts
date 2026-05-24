import type { AssetType, ProductCategory } from "@/types";

/**
 * Hidden per-(product × asset) scene direction.
 * These are the "creative briefs" that turn a generic prompt into something premium.
 */
type SceneMap = Partial<Record<AssetType, string>>;

const KIDS_BOOK_SCENES: SceneMap = {
  premium_product_photo:
    "the hardcover book standing slightly open on a warm wooden surface, cover clearly visible, a few loose dried flower petals nearby",
  ecommerce_thumbnail:
    "the book photographed top-down on a clean cream paper backdrop, cover perfectly centered, subtle drop shadow",
  instagram_post:
    "a small child's hands holding the open book, soft window light, peaceful afternoon mood",
  instagram_story:
    "vertical composition: the book leaning against a child's bedside lamp at night, plush toy beside it, generous top space for a story headline",
  pinterest_pin:
    "tall flatlay: the book in the center, a knitted blanket corner, a ceramic mug of warm milk, eucalyptus stems, and a tiny pair of baby shoes",
  shopee_cover:
    "vibrant but soft hero shot of the book on a pastel gradient with playful elements like clouds and small stars floating",
  whatsapp_catalog:
    "single product shot of the book centered on a cream background, mobile-friendly, very legible",
  lifestyle_mockup:
    "a parent reading the book to a toddler curled up in their lap on a cozy reading chair, golden hour light",
  packaging_preview:
    "the book gift-wrapped in soft brown kraft paper with twine and a sprig of dried lavender, presented on linen",
  ad_creative:
    "the book held up by tiny child hands against a warm gradient backdrop with bold breathing room for headline text",
};

const TSHIRT_SCENES: SceneMap = {
  premium_product_photo:
    "the t-shirt laid flat on cream textured paper, perfectly folded edges, soft shadow",
  ecommerce_thumbnail:
    "front-facing flat lay of the folded t-shirt on a clean neutral backdrop, ecommerce-ready",
  instagram_post:
    "a toddler wearing the t-shirt giggling in soft natural light, candid lifestyle frame",
  instagram_story:
    "vertical: child running in a sunlit park wearing the t-shirt, room at top for headline",
  pinterest_pin:
    "tall flatlay: the t-shirt with neatly folded baby clothes, wooden hangers, eucalyptus, and tiny sneakers",
  shopee_cover:
    "the folded t-shirt on a vibrant soft-pastel backdrop with playful confetti shapes",
  whatsapp_catalog:
    "centered folded t-shirt on cream backdrop, generous margin, sharp focus",
  lifestyle_mockup:
    "toddler wearing the t-shirt on a playground, soft afternoon sun, candid lifestyle",
  packaging_preview:
    "the t-shirt folded inside a kraft paper box with tissue paper and a thank-you card",
  ad_creative:
    "joyful child wearing the t-shirt mid-laugh, vertical composition, generous space for ad headline",
};

const TOY_SCENES: SceneMap = {
  premium_product_photo:
    "the toy on a warm-toned textured paper, single soft key light, catalog-grade",
  ecommerce_thumbnail:
    "the toy centered on a clean cream backdrop, perfect ecommerce framing",
  instagram_post:
    "small child's hands engaged with the toy on a low oak shelf, Montessori vibe",
  instagram_story:
    "vertical: toy on a child's play mat with morning light, headline space above",
  pinterest_pin:
    "tall composition: the toy among other natural-material toys, woven basket, knitted blanket",
  shopee_cover:
    "the toy on a soft pastel gradient backdrop with floating playful shapes",
  whatsapp_catalog:
    "single toy shot on a neutral backdrop, mobile-friendly clarity",
  lifestyle_mockup:
    "a child concentrating on the toy at a wooden play table, candid soft light",
  packaging_preview:
    "the toy in elegant kraft packaging with a fabric ribbon and brand card",
  ad_creative:
    "hero shot of the toy in use by a child, joyful expression, ad-headline space",
};

const PRINTABLE_SCENES: SceneMap = {
  premium_product_photo:
    "the printable mounted in a thin oak frame, leaning against a soft cream wall",
  ecommerce_thumbnail:
    "the printable framed and centered on a neutral wall, Etsy listing aesthetic",
  instagram_post:
    "the printable framed above a child's reading nook with books and a plush",
  instagram_story:
    "vertical: framed printable hanging above a child's bed, headline space above",
  pinterest_pin:
    "tall composition: the printable framed on a wall above a styled nursery dresser with vase and books",
  shopee_cover:
    "the printable framed centered on a soft pastel backdrop",
  whatsapp_catalog:
    "single framed printable on a cream backdrop, very clear product focus",
  lifestyle_mockup:
    "the printable framed in a real styled nursery, warm afternoon light",
  packaging_preview:
    "the print rolled in a kraft tube with twine and a brand sticker beside it",
  ad_creative:
    "the framed printable hero shot with bold breathing room and warm tones",
};

const WORKSHEET_SCENES: SceneMap = {
  premium_product_photo:
    "the worksheet laid on a warm wooden child's desk with sharpened wooden pencils nearby",
  ecommerce_thumbnail:
    "top-down centered shot of the worksheet on cream paper, ecommerce framing",
  instagram_post:
    "small hands tracing on the worksheet, soft window light, homeschooling moment",
  instagram_story:
    "vertical: worksheet on a desk with a mug of tea and a houseplant, headline space",
  pinterest_pin:
    "tall flatlay: worksheets stacked with crayons, an apple, a pair of round glasses",
  shopee_cover:
    "the worksheet on a pastel desk with playful school items floating around",
  whatsapp_catalog:
    "the worksheet centered on neutral paper, sharp and legible",
  lifestyle_mockup:
    "a child at a wooden desk working on the worksheet, focused and content",
  packaging_preview:
    "a printed worksheet pack tied with twine and a brand label on linen",
  ad_creative:
    "worksheet in use by a focused child, vertical composition with ad headline space",
};

const FLASHCARD_SCENES: SceneMap = {
  premium_product_photo:
    "the flashcards fanned out beautifully on textured paper, soft shadow",
  ecommerce_thumbnail:
    "top-down of the stacked deck with one card raised, neutral background",
  instagram_post:
    "child holding a flashcard up, parent's hand visible, soft warm light",
  instagram_story:
    "vertical: flashcards arranged on a Montessori tray, headline space above",
  pinterest_pin:
    "tall composition: flashcards stacked among learning tools, wooden letters, a small plant",
  shopee_cover:
    "fanned flashcards on a vibrant soft-pastel gradient with playful floating shapes",
  whatsapp_catalog:
    "the deck of cards centered on a cream backdrop, clear and crisp",
  lifestyle_mockup:
    "parent and child playing with the flashcards on a wool rug, candid lifestyle",
  packaging_preview:
    "the cards in their kraft box with brand sleeve, presented on linen",
  ad_creative:
    "child reading a flashcard with delighted expression, ad-headline space",
};

const MERCH_SCENES: SceneMap = {
  premium_product_photo:
    "the merchandise piece on warm textured paper, catalog-precise framing",
  ecommerce_thumbnail:
    "centered shot of the merch on a neutral backdrop, clean and crisp",
  instagram_post:
    "child interacting with the merch in a real cozy scene",
  instagram_story:
    "vertical: merch styled in a kids' room corner, headline space",
  pinterest_pin:
    "tall flatlay: merch surrounded by neutral lifestyle props",
  shopee_cover:
    "merch on vibrant soft pastel backdrop with playful shapes",
  whatsapp_catalog:
    "single merch shot centered on cream, mobile-friendly",
  lifestyle_mockup:
    "merch in use in a real family setting, candid warm light",
  packaging_preview:
    "merch in a beautifully designed gift box with brand card",
  ad_creative:
    "merch hero shot with bold breathing room for headline text",
};

const TOTE_SCENES: SceneMap = {
  premium_product_photo:
    "the tote bag hung on a brass hook against a cream wall, soft shadow",
  ecommerce_thumbnail:
    "the tote laid flat on cream paper, handles arranged neatly",
  instagram_post:
    "a parent walking with the tote in golden hour light, candid",
  instagram_story:
    "vertical: tote on a wooden bench in a sunlit park, headline space",
  pinterest_pin:
    "tall flatlay: tote with library books, a thermos, dried flowers, sunglasses spilling out",
  shopee_cover:
    "the tote on a pastel gradient with floating playful elements",
  whatsapp_catalog:
    "the tote centered on cream backdrop, clear product focus",
  lifestyle_mockup:
    "parent carrying the tote on a school run, warm candid light",
  packaging_preview:
    "the tote folded inside kraft packaging with twine and brand card",
  ad_creative:
    "tote in use by a stylish parent, vertical headline space",
};

const MUG_SCENES: SceneMap = {
  premium_product_photo:
    "the mug on warm linen with steam gently rising, single soft light",
  ecommerce_thumbnail:
    "the mug centered on a neutral backdrop, handle slightly angled",
  instagram_post:
    "a parent's hands cradling the mug in golden hour kitchen light",
  instagram_story:
    "vertical: mug on a windowsill with rain outside, headline space above",
  pinterest_pin:
    "tall flatlay: mug on a stack of books, a journal, a candle, dried botanicals",
  shopee_cover:
    "the mug on a soft pastel gradient with floating playful shapes",
  whatsapp_catalog:
    "the mug centered on a cream backdrop, mobile-friendly",
  lifestyle_mockup:
    "parent sipping from the mug in a sunlit kitchen, candid lifestyle",
  packaging_preview:
    "the mug in a kraft gift box with shredded paper and a brand card",
  ad_creative:
    "mug hero shot with steam and warm breathing room for headline",
};

const STICKER_SCENES: SceneMap = {
  premium_product_photo:
    "stickers arranged neatly on warm cream paper, single soft light",
  ecommerce_thumbnail:
    "top-down of the sticker sheet centered on a neutral backdrop",
  instagram_post:
    "child's hands peeling a sticker, candid warm light",
  instagram_story:
    "vertical: stickers stuck on a notebook on a desk, headline space",
  pinterest_pin:
    "tall flatlay: stickers among journaling tools, washi tape, a fountain pen",
  shopee_cover:
    "stickers fanned out on a vibrant pastel gradient backdrop",
  whatsapp_catalog:
    "single sticker sheet centered on cream, very clear",
  lifestyle_mockup:
    "stickers being applied to a child's water bottle, candid scene",
  packaging_preview:
    "sticker pack in kraft envelope with brand stamp and twine",
  ad_creative:
    "stickers floating around a child's joyful face, ad headline space",
};

const EDUCATIONAL_SCENES: SceneMap = {
  premium_product_photo:
    "the educational product on warm textured paper, museum-catalog lighting",
  ecommerce_thumbnail:
    "the product centered on a clean cream backdrop, ecommerce-ready",
  instagram_post:
    "small hands using the product on a Montessori shelf in soft daylight",
  instagram_story:
    "vertical: product on a play tray with a child mid-activity, headline space",
  pinterest_pin:
    "tall flatlay: the product surrounded by natural-material learning tools",
  shopee_cover:
    "the product on a soft pastel gradient with playful learning icons",
  whatsapp_catalog:
    "single product shot centered on cream, clear and inviting",
  lifestyle_mockup:
    "a child fully absorbed in using the product at a wooden table",
  packaging_preview:
    "the product in elegant kraft packaging with brand card and ribbon",
  ad_creative:
    "child engaged with the product, joyful focus, ad headline space",
};

export const SCENES: Record<ProductCategory, SceneMap> = {
  kids_book: KIDS_BOOK_SCENES,
  tshirt: TSHIRT_SCENES,
  toy: TOY_SCENES,
  printable: PRINTABLE_SCENES,
  worksheet: WORKSHEET_SCENES,
  flashcard: FLASHCARD_SCENES,
  merchandise: MERCH_SCENES,
  tote_bag: TOTE_SCENES,
  mug: MUG_SCENES,
  sticker: STICKER_SCENES,
  educational_product: EDUCATIONAL_SCENES,
};

const DEFAULT_SCENE_FALLBACK: Record<AssetType, string> = {
  premium_product_photo:
    "the product on warm textured paper, single soft key light, catalog-grade framing",
  ecommerce_thumbnail:
    "the product centered on a clean cream backdrop, ecommerce-ready",
  instagram_post:
    "the product in a candid lifestyle scene, soft natural light",
  instagram_story:
    "vertical composition of the product in lifestyle context, headline space above",
  pinterest_pin:
    "tall flatlay arrangement of the product with neutral lifestyle props",
  shopee_cover:
    "the product on a vibrant soft pastel gradient with floating playful elements",
  whatsapp_catalog:
    "single centered product shot on cream backdrop, mobile-friendly",
  lifestyle_mockup:
    "the product in real human use, candid warm light",
  packaging_preview:
    "the product in elegant kraft packaging with brand card and ribbon",
  ad_creative:
    "the product hero shot with breathing room for ad headline copy",
};

export function getScene(
  product: ProductCategory,
  asset: AssetType,
): string {
  return SCENES[product][asset] ?? DEFAULT_SCENE_FALLBACK[asset];
}
