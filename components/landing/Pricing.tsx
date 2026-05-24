"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Seedling",
    price: "$0",
    period: "free forever",
    description: "Try the studio. Perfect for a first product test.",
    highlights: [
      "5 generations / month",
      "All 10 aesthetic presets",
      "Standard resolution",
      "Watermarked downloads",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Studio",
    price: "$29",
    period: "per month",
    description: "For Etsy, indie brands and small kid shops shipping weekly.",
    highlights: [
      "200 generations / month",
      "All aesthetics + custom brand notes",
      "Full HD downloads, no watermark",
      "Asset gallery & versioning",
      "Commercial-use license",
    ],
    cta: "Open Studio",
    featured: true,
  },
  {
    name: "Atelier",
    price: "$89",
    period: "per month",
    description: "For agencies, multi-brand sellers and high-volume Pinterest shops.",
    highlights: [
      "Unlimited generations",
      "Brand kits & saved style mixes",
      "4K upscales",
      "Priority queue + early features",
      "Team seats",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="chip">Pricing</span>
          <h2 className="heading-display mt-4 text-4xl sm:text-5xl leading-tight">
            Tiny brand budgets,
            <br />
            <span className="italic text-terracotta-500">
              big brand output.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted">
            Cancel anytime. Every plan includes all 10 aesthetics and the full
            asset playlist.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-4 items-stretch">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative card p-7 flex flex-col ${
                p.featured
                  ? "ring-1 ring-terracotta-300 shadow-glow"
                  : ""
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="chip bg-terracotta-500 text-white border-terracotta-500">
                    <Sparkles className="h-3 w-3" /> Most loved
                  </span>
                </div>
              )}
              <div className="font-serif text-2xl text-sand-900 dark:text-cream-50">
                {p.name}
              </div>
              <div className="mt-1 text-sm text-muted">{p.description}</div>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-serif text-5xl text-sand-900 dark:text-cream-50">
                  {p.price}
                </span>
                <span className="text-sm text-muted">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-sand-700 dark:text-cream-200"
                  >
                    <span className="h-5 w-5 grid place-items-center rounded-full bg-sage-100 dark:bg-sage-900/40 text-sage-600 dark:text-sage-300 shrink-0">
                      <Check className="h-3 w-3" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Link
                  href="/studio"
                  className={p.featured ? "btn-accent w-full" : "btn-primary w-full"}
                >
                  {p.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
