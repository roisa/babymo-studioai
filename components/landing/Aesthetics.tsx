"use client";

import { motion } from "framer-motion";
import { STYLE_LIST } from "@/lib/prompts/styles";

export function Aesthetics() {
  return (
    <section id="styles" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <span className="chip">Aesthetics</span>
            <h2 className="heading-display mt-4 text-4xl sm:text-5xl leading-tight">
              Pick a vibe.
              <br />
              <span className="italic text-terracotta-500">
                The whole kit matches.
              </span>
            </h2>
          </div>
          <p className="text-muted max-w-md">
            Ten hand-tuned visual presets — each one a complete creative direction
            with its own palette, lighting, materials and composition rules.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {STYLE_LIST.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="card overflow-hidden hover:shadow-softer hover:-translate-y-0.5 transition-all duration-500 group"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${s.palette.slice(0, 3).join(", ")})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex gap-1.5">
                  {s.palette.map((c) => (
                    <div
                      key={c}
                      className="h-4 w-4 rounded-full border border-white/40 shadow"
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
              <div className="p-4">
                <div className="font-serif text-lg text-sand-900 dark:text-cream-50">
                  {s.label}
                </div>
                <div className="text-xs text-muted mt-0.5">{s.tagline}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
