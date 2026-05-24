import type { ProductCategory, ProductMeta } from "@/types";

export const PRODUCTS: Record<ProductCategory, ProductMeta> = {
  kids_book: {
    id: "kids_book",
    label: "Children's Book",
    emoji: "📖",
    description: "Picture books, board books, storybooks",
    keywords: ["children's book", "hardcover storybook", "picture book"],
  },
  tshirt: {
    id: "tshirt",
    label: "T-shirt",
    emoji: "👕",
    description: "Kids apparel, toddler tees, baby onesies",
    keywords: ["toddler t-shirt", "kids cotton tee", "soft apparel"],
  },
  toy: {
    id: "toy",
    label: "Toy",
    emoji: "🧸",
    description: "Wooden toys, plush, sensory play",
    keywords: ["wooden toy", "soft plush toy", "sensory play object"],
  },
  printable: {
    id: "printable",
    label: "Printable",
    emoji: "🖨️",
    description: "Etsy digital downloads, posters, art prints",
    keywords: [
      "printable poster",
      "digital art print",
      "instant download artwork",
    ],
  },
  worksheet: {
    id: "worksheet",
    label: "Worksheet",
    emoji: "📝",
    description: "Activity sheets, tracing pages, math practice",
    keywords: [
      "kids activity worksheet",
      "homeschool printable",
      "educational worksheet",
    ],
  },
  flashcard: {
    id: "flashcard",
    label: "Flashcards",
    emoji: "🃏",
    description: "ABC cards, sight words, learning cards",
    keywords: [
      "learning flashcards",
      "vocabulary cards",
      "Montessori cards",
    ],
  },
  merchandise: {
    id: "merchandise",
    label: "Merchandise",
    emoji: "🎁",
    description: "Branded goods, gift sets, character merch",
    keywords: [
      "branded merchandise",
      "kids gift product",
      "character merch",
    ],
  },
  tote_bag: {
    id: "tote_bag",
    label: "Tote Bag",
    emoji: "👜",
    description: "Canvas tote, library bag, mom bag",
    keywords: ["canvas tote bag", "natural cotton tote", "everyday carry bag"],
  },
  mug: {
    id: "mug",
    label: "Mug",
    emoji: "☕",
    description: "Ceramic mug, kids cup, parent mug",
    keywords: ["ceramic mug", "matte coffee cup", "printed mug"],
  },
  sticker: {
    id: "sticker",
    label: "Sticker",
    emoji: "🌟",
    description: "Die-cut, sticker sheet, kiss-cut",
    keywords: ["vinyl sticker", "die-cut sticker", "sticker sheet"],
  },
  educational_product: {
    id: "educational_product",
    label: "Educational Product",
    emoji: "🎓",
    description: "Learning kits, montessori boards, sensory boxes",
    keywords: [
      "educational kit",
      "learning material",
      "montessori product",
    ],
  },
};

export const PRODUCT_LIST: ProductMeta[] = Object.values(PRODUCTS);

const DETECTION_HINTS: Array<{ keyword: RegExp; category: ProductCategory }> = [
  { keyword: /\b(book|storybook|picture\s?book|board\s?book)\b/i, category: "kids_book" },
  { keyword: /\b(tshirt|t-shirt|tee|onesie|romper|apparel)\b/i, category: "tshirt" },
  { keyword: /\b(toy|plush|teddy|rattle|blocks|puzzle)\b/i, category: "toy" },
  { keyword: /\b(worksheet|tracing|practice\s?sheet)\b/i, category: "worksheet" },
  { keyword: /\b(flashcard|flash\s?card|sight\s?word)\b/i, category: "flashcard" },
  { keyword: /\b(printable|poster|wall\s?art|print)\b/i, category: "printable" },
  { keyword: /\b(tote|bag)\b/i, category: "tote_bag" },
  { keyword: /\b(mug|cup)\b/i, category: "mug" },
  { keyword: /\b(sticker|decal)\b/i, category: "sticker" },
  { keyword: /\b(montessori|sensory|learning\s?kit|educational)\b/i, category: "educational_product" },
  { keyword: /\b(merch|merchandise|gift\s?set)\b/i, category: "merchandise" },
];

export function detectProductFromFilename(filename: string): ProductCategory {
  for (const hint of DETECTION_HINTS) {
    if (hint.keyword.test(filename)) return hint.category;
  }
  return "kids_book";
}
