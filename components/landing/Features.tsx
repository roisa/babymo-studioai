"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Heart,
  Layers,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI auto-detects your product",
    body:
      "Drop a photo of a book, toy, t-shirt, mug or printable — the studio knows what it is and what shots to make.",
  },
  {
    icon: Palette,
    title: "10 warm, emotional aesthetics",
    body:
      "Montessori, Scandinavian Nursery, Korean Kids, Pinterest Mom — pick a vibe, the whole kit matches.",
  },
  {
    icon: Layers,
    title: "A complete launch kit",
    body:
      "Hero photo, IG post, story, Pinterest pin, Shopee cover, lifestyle mockup, packaging, ad creative — done.",
  },
  {
    icon: Camera,
    title: "Hidden prompt engine",
    body:
      "Per-product × per-platform creative briefs are tuned in the background so every asset feels art-directed.",
  },
  {
    icon: Heart,
    title: "Made for tiny brands",
    body:
      "Etsy printable creators, indie book authors, kids merch sellers — built for small teams shipping fast.",
  },
  {
    icon: Zap,
    title: "Seconds, not days",
    body:
      "What used to be a week with a stylist + photographer + designer is now a 60-second flow.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="chip">Why Baby Mo</span>
          <h2 className="heading-display mt-4 text-4xl sm:text-5xl leading-tight">
            Not another AI image tool.
            <br />
            <span className="italic text-terracotta-500">
              An AI creative team.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted">
            Trained for warm, premium, kid-and-parent feeling. Tuned by aesthetic.
            Built around what small kids and parenting brands actually need to ship.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="card p-6 transition-shadow duration-500 hover:shadow-lift"
            >
              <div
                className="h-11 w-11 grid place-items-center rounded-2xl text-terracotta-500"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(244,205,180,0.5))",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -4px rgba(213,105,57,0.20)",
                }}
              >
                <f.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div className="mt-5 font-serif text-xl text-sand-900 dark:text-cream-50 tracking-tight">
                {f.title}
              </div>
              <p className="mt-2 text-sm text-muted leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
