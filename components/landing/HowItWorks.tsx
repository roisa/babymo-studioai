"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Upload your product",
    body: "A book, a t-shirt, a toy, a printable — any one image, any background. The studio handles the rest.",
  },
  {
    n: "02",
    title: "AI detects the category",
    body: "Baby Mo recognizes your product type and loads the right creative briefs behind the scenes.",
  },
  {
    n: "03",
    title: "Pick a visual aesthetic",
    body: "Montessori, Korean Kids, Warm Parenting, Pinterest Mom — one click locks the whole look.",
  },
  {
    n: "04",
    title: "Your launch kit is generated",
    body: "Hero photo, IG post, story, Pinterest pin, Shopee cover, lifestyle mockup, packaging, ad creative.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="chip">How it works</span>
          <h2 className="heading-display mt-4 text-4xl sm:text-5xl leading-tight">
            From one photo to a whole launch
            <br />
            <span className="italic text-terracotta-500">
              in under a minute.
            </span>
          </h2>
        </div>

        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="card p-6 relative"
            >
              <div className="font-serif text-terracotta-500 text-3xl">
                {s.n}
              </div>
              <div className="mt-3 font-serif text-xl text-sand-900 dark:text-cream-50">
                {s.title}
              </div>
              <div className="mt-2 text-sm text-muted leading-relaxed">
                {s.body}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
