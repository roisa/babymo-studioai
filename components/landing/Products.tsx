"use client";

import { motion } from "framer-motion";
import { PRODUCT_LIST } from "@/lib/prompts/products";

export function Products() {
  return (
    <section id="showcase" className="py-24 sm:py-32 relative">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-warm-gradient dark:bg-warm-gradient-dark opacity-60"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="chip">Works with</span>
          <h2 className="heading-display mt-4 text-4xl sm:text-5xl leading-tight">
            Made for the products
            <br />
            <span className="italic text-terracotta-500">
              tiny brands actually sell.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted">
            Books, t-shirts, toys, printables, flashcards, merch, totes, mugs,
            stickers, kits — Baby Mo speaks all of them fluently.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {PRODUCT_LIST.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="card p-5 hover:shadow-softer hover:-translate-y-0.5 transition-all"
            >
              <div className="text-3xl">{p.emoji}</div>
              <div className="mt-3 font-serif text-lg text-sand-900 dark:text-cream-50">
                {p.label}
              </div>
              <div className="text-xs text-muted mt-1">{p.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
