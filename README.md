# Baby Mo Studio

Your AI creative team for warm, premium kids & parenting brands.

Upload one product photo → get a complete launch kit: hero photo, Instagram
post, story, Pinterest pin, Shopee cover, lifestyle mockup, packaging preview,
ad creative — all styled in your chosen aesthetic.

> Not another generic AI image tool. A specialized creative studio for tiny
> kids, parenting, and educational brands.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + custom design tokens (warm cream / terracotta palette)
- **Framer Motion** for premium animations
- **OpenAI** image API (gpt-image-1) integration
- **Supabase** (auth + storage scaffolding)
- **next-themes** for dark / light mode
- **lucide-react** icons, **Fraunces** + **Inter** typography

## Routes

| Route                          | What it is                                          |
| ------------------------------ | --------------------------------------------------- |
| `/`                            | Marketing landing page                              |
| `/studio`                      | Upload → configure → generate flow                  |
| `/dashboard`                   | Logged-in overview                                  |
| `/dashboard/gallery`           | All generated assets in masonry grid                |
| `/dashboard/favorites`         | Saved assets                                        |
| `/dashboard/settings`          | Theme + brand defaults                              |
| `POST /api/detect-product`     | Filename → product category                         |
| `POST /api/generate`           | Build full launch kit from {product, style, notes}  |

## The Prompt Engine

The differentiator. Lives in `lib/prompts/`:

```
lib/prompts/
├── products.ts    — 11 product categories with detection hints
├── styles.ts      — 10 aesthetics with palette, lighting, materials, composition
├── platforms.ts   — 10 asset types with aspect ratios, platforms, pixel hints
├── scenes.ts      — hidden (product × asset) scene direction map
└── engine.ts      — composes product × style × asset → polished prompts
```

Every generation pipes through `buildJobPrompts({ product, style, notes })`,
which expands to a curated playlist of assets for that product type, and for
each asset builds a multi-section prompt:

1. Headline brief
2. Scene direction (per product × asset)
3. Aesthetic (mood + description)
4. Lighting & materials
5. Color palette
6. Composition + aspect ratio
7. Quality bar
8. Negative prompts
9. Optional brand notes

Users never see these prompts — they just see the finished kit.

## Local dev

```bash
npm install
cp .env.example .env.local
# (optional) add OPENAI_API_KEY and Supabase keys
npm run dev
```

Without an `OPENAI_API_KEY` the `/api/generate` route returns warm placeholder
images so the full UX is still demoable.

## Design

- **Light mode**: cream `#fdfaf5` background, sand serif `Fraunces` headlines,
  warm terracotta accents, soft drop shadows, glassmorphic nav.
- **Dark mode**: deep sand `#15110d`, warm amber accents, candle-lit feel.
- Mobile-first; every screen designed for phones first then enhanced for desktop.
- Apple-clean spacing + Korean ecommerce sensibility.
