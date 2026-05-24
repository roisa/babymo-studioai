import type { StyleMeta, StylePreset } from "@/types";

export const STYLES: Record<StylePreset, StyleMeta> = {
  montessori: {
    id: "montessori",
    label: "Montessori",
    tagline: "Natural materials, child-led calm",
    description:
      "Earthy neutrals, wooden surfaces, real-life proportions, uncluttered shelves.",
    palette: ["#e9dcc2", "#c9a574", "#8a6e4a", "#3e2f23", "#f7f1e6"],
    mood: "calm, intentional, grounded, educational, child-led",
    lighting:
      "soft diffused daylight from a tall window, gentle long shadows, warm undertones",
    materials:
      "raw oak wood, natural linen, woven rattan baskets, ceramic, beeswax finishes",
    composition:
      "minimal arrangement on a low wooden shelf at child-height, generous negative space",
  },
  scandinavian_nursery: {
    id: "scandinavian_nursery",
    label: "Scandinavian Nursery",
    tagline: "Bright, airy, minimalist nursery",
    description:
      "Crisp whites, light oak, muted dusty pastels, hygge softness.",
    palette: ["#fbfbfa", "#e7e2dc", "#d2c7bd", "#a89e93", "#f0d2c2"],
    mood: "serene, fresh, minimal, hygge, calm",
    lighting:
      "soft northern daylight, very bright, low contrast, no harsh shadows",
    materials:
      "pale ash wood, white linen, muslin, knitted cotton, matte ceramics",
    composition:
      "centered subject, lots of negative space, airy framing, white walls",
  },
  korean_kids: {
    id: "korean_kids",
    label: "Korean Kids Brand",
    tagline: "Clean, premium, editorial K-baby",
    description:
      "High-end Korean ecommerce styling: soft beige, cream, dusty pink accents, magazine-clean.",
    palette: ["#f6efe6", "#ead9c8", "#d4a89a", "#b07b6b", "#1f1a16"],
    mood: "premium, editorial, polished, gentle, refined",
    lighting:
      "soft studio lighting, paper-diffused, very even, slight warm cast",
    materials:
      "organic cotton, brushed paper, cream resin, matte ceramic, fine knit",
    composition:
      "centered flat lay or hero shot, perfect symmetry, generous margins, premium ecommerce framing",
  },
  warm_parenting: {
    id: "warm_parenting",
    label: "Warm Parenting",
    tagline: "Tender family moments",
    description:
      "Honey-warm tones, soft golden hour, candid parent-and-child intimacy.",
    palette: ["#fbe6d0", "#f3c19a", "#d49872", "#8c5a3c", "#3a2418"],
    mood: "tender, emotional, intimate, nostalgic, loving",
    lighting:
      "golden hour sun streaming through sheer curtains, warm backlight, soft skin glow",
    materials:
      "knitted wool, weathered linen, vintage cotton, warm wood floors",
    composition:
      "candid lifestyle framing, slight bokeh, hands holding objects, depth of field",
  },
  storybook: {
    id: "storybook",
    label: "Storybook Style",
    tagline: "Whimsical illustrated world",
    description:
      "Painterly, illustrative, fairytale composition with hand-painted texture.",
    palette: ["#f9ecd2", "#e8b07a", "#a05d3b", "#5a8a6d", "#2e3a4d"],
    mood: "whimsical, dreamy, fairytale, imaginative, magical",
    lighting:
      "soft painted light, watercolor washes, gentle gradients, storybook glow",
    materials:
      "watercolor paper, gouache textures, painted backdrops, hand-drawn elements",
    composition:
      "scene-based, narrative framing, character interaction, illustrated environment",
  },
  soft_pastel: {
    id: "soft_pastel",
    label: "Soft Pastel",
    tagline: "Dreamy pastel cloud",
    description:
      "Cotton-candy pastels, blush, mint, butter, lilac — extremely soft and airy.",
    palette: ["#fde2e2", "#fff1c8", "#d9f0e1", "#e2dcf2", "#fbfbfb"],
    mood: "dreamy, sweet, gentle, playful, airy",
    lighting: "diffused soft light, low contrast, milky pastel air",
    materials:
      "matte pastel paper, soft felt, fluffy textiles, smooth resin",
    composition:
      "pastel gradient backdrop, floating composition, soft drop shadows",
  },
  wooden_toy_catalog: {
    id: "wooden_toy_catalog",
    label: "Wooden Toy Catalog",
    tagline: "Premium handcrafted wood",
    description:
      "Catalog-grade product shots on warm wood: natural grain, honey tones, artisanal.",
    palette: ["#f1e0c4", "#d2a86a", "#9b6b3f", "#5a3a22", "#2b1c11"],
    mood: "artisan, handcrafted, premium, heirloom, tactile",
    lighting:
      "directional warm light, single soft key, gentle rim, museum-catalog quality",
    materials:
      "beech, maple, beeswax-polished oak, natural cotton string, brass details",
    composition:
      "isolated product on textured paper or wood, catalog-precise framing",
  },
  pinterest_mom: {
    id: "pinterest_mom",
    label: "Pinterest Mom Aesthetic",
    tagline: "Aspirational flatlay vibes",
    description:
      "Curated flatlays, neutral linen backdrop, eucalyptus, marble, ceramic.",
    palette: ["#f5f0e8", "#dcd0bb", "#b5a48c", "#7e8b6a", "#1f201c"],
    mood: "curated, aspirational, lifestyle, neutral, balanced",
    lighting:
      "bright window light, top-down even, slight warm tone, blog-ready",
    materials:
      "linen napkin, dried botanicals, ceramic plate, marble slab, raffia",
    composition:
      "top-down flat lay, rule-of-thirds, layered props, instagram-perfect",
  },
  minimal_ecommerce: {
    id: "minimal_ecommerce",
    label: "Minimal Ecommerce",
    tagline: "Clean catalog hero shot",
    description:
      "Pure neutral backdrop, product-focused, ecommerce conversion-ready.",
    palette: ["#ffffff", "#f4f1ec", "#e0dcd6", "#857c70", "#1a1a1a"],
    mood: "clean, premium, professional, conversion-focused",
    lighting:
      "even studio softbox, no harsh shadows, optional contact shadow, paper-clean",
    materials:
      "seamless paper backdrop, subtle texture, matte surface",
    composition:
      "centered hero, generous whitespace, perfect cropping, retail-ready",
  },
  cozy_learning: {
    id: "cozy_learning",
    label: "Cozy Learning Space",
    tagline: "Homeschool warmth",
    description:
      "Soft homeschool reading nook: books, blankets, mug of tea, child-friendly desk.",
    palette: ["#efe2c8", "#caa37c", "#8a6c4a", "#496a4a", "#2a2018"],
    mood: "cozy, inviting, focused, warm, learning-rich",
    lighting:
      "warm lamp light mixed with afternoon window light, golden ambient",
    materials:
      "wool blanket, well-loved books, oak desk, ceramic mug, soft rug",
    composition:
      "scene framing of a real learning corner, books and tools arranged naturally",
  },
};

export const STYLE_LIST: StyleMeta[] = Object.values(STYLES);
