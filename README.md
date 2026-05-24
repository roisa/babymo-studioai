# Baby Mo Studio

Your AI creative team for warm, premium kids & parenting brands.

Upload one product photo → get a complete launch kit: hero photo, Instagram
post, story, Pinterest pin, Shopee cover, lifestyle mockup, packaging preview,
ad creative — all styled in your chosen aesthetic.

> Not another generic AI image tool. A specialized creative studio for tiny
> kids, parenting, and educational brands.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Froisa%2Fbabymo-studioai&project-name=baby-mo-studio&repository-name=baby-mo-studio&env=OPENAI_API_KEY,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY&envDescription=OpenAI%20key%20powers%20image%20generation.%20Supabase%20keys%20are%20optional%20%E2%80%94%20leave%20blank%20to%20skip%20persistence.&envLink=https%3A%2F%2Fgithub.com%2Froisa%2Fbabymo-studioai%2Fblob%2Fmain%2F.env.example)

Click the button → Vercel clones the repo, prompts for env vars, builds, and
hands you a `https://baby-mo-studio.vercel.app` URL you can share with your
team. Every git branch also gets its own preview URL automatically.

**Required env var for real generations:** `OPENAI_API_KEY`. Without it, the
app gracefully falls back to warm placeholder images so previews still render.

**Optional:** `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` +
`SUPABASE_SERVICE_ROLE_KEY` if you wire up auth / persistence.

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
