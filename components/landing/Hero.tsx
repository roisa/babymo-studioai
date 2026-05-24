"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Wand2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-warm-gradient dark:bg-warm-gradient-dark opacity-90"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 -top-40 h-[40rem] -z-10
          [mask-image:radial-gradient(closest-side,white,transparent)]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <span className="chip">
            <Sparkles className="h-3 w-3 text-terracotta-500" />
            Your AI creative team for kids & parenting brands
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display mt-6 text-center text-5xl sm:text-6xl lg:text-7xl leading-[1.02]"
        >
          One product photo.
          <br />
          <span className="italic text-terracotta-500">A whole launch kit.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl mx-auto text-center text-lg text-muted"
        >
          Baby Mo Studio turns a single image of your book, toy, t-shirt or
          printable into a complete premium marketing kit — product photos,
          Instagram, Pinterest, Shopee, ads, packaging — all in your chosen
          warm, emotional aesthetic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/studio" className="btn-accent group text-base px-7 py-3">
            <Wand2 className="h-4 w-4" />
            Generate my kit
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
          <a href="#showcase" className="btn-ghost text-base px-6 py-3">
            See what it looks like
          </a>
        </motion.div>

        <HeroShowcase />
      </div>
    </section>
  );
}

const SHOWCASE_TILES = [
  {
    label: "Premium product photo",
    color: "from-cream-200 to-cream-100",
    seed: 11,
    h: "h-72",
  },
  {
    label: "Pinterest pin",
    color: "from-terracotta-100 to-cream-100",
    seed: 22,
    h: "h-96",
  },
  {
    label: "Instagram post",
    color: "from-sage-100 to-cream-100",
    seed: 33,
    h: "h-72",
  },
  {
    label: "Lifestyle mockup",
    color: "from-cream-100 to-terracotta-100",
    seed: 44,
    h: "h-80",
  },
  {
    label: "Story",
    color: "from-cream-100 to-sage-100",
    seed: 55,
    h: "h-96",
  },
  {
    label: "Ad creative",
    color: "from-terracotta-200 to-cream-100",
    seed: 66,
    h: "h-72",
  },
];

function HeroShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 sm:mt-20"
    >
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SHOWCASE_TILES.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35 + i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative ${tile.h} rounded-3xl overflow-hidden
                bg-gradient-to-br ${tile.color}
                border border-cream-200 dark:border-sand-800
                shadow-soft hover:shadow-softer transition-all duration-500
                hover:-translate-y-1 group`}
            >
              <div
                className="absolute inset-0 opacity-90 dark:opacity-80"
                style={{
                  backgroundImage: `url('https://picsum.photos/seed/babymo-hero-${tile.seed}/600/800')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="chip bg-white/80 dark:bg-sand-900/80 border-white/40 backdrop-blur">
                  {tile.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-32 bg-gradient-to-t from-cream-50 dark:from-sand-950 to-transparent" />
      </div>
    </motion.div>
  );
}
