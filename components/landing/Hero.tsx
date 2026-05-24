"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Wand2 } from "lucide-react";

const SPRING = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-24 overflow-hidden">
      {/* Layered ambient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark opacity-95"
      />
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="orb bg-terracotta-300/55 dark:bg-terracotta-500/30 animate-drift-slow"
          style={{ top: "-6rem", left: "-4rem", width: "26rem", height: "26rem" }}
        />
        <div
          className="orb bg-sage-200/60 dark:bg-sage-600/25 animate-drift-slow"
          style={{ top: "6rem", right: "-6rem", width: "30rem", height: "30rem", animationDelay: "-6s" }}
        />
        <div
          className="orb bg-cream-300/60 dark:bg-cream-400/15 animate-drift-slow"
          style={{ bottom: "-8rem", left: "30%", width: "32rem", height: "32rem", animationDelay: "-12s" }}
        />
      </div>

      {/* Subtle grain on top */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grain opacity-[0.18] dark:opacity-[0.10] mix-blend-overlay"
      />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING}
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
          transition={{ ...SPRING, delay: 0.05 }}
          className="heading-display mt-6 text-center text-[2.75rem] sm:text-6xl lg:text-7xl leading-[1.02]"
        >
          One product photo.
          <br />
          <span className="italic text-terracotta-500">
            A whole launch kit.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.12 }}
          className="mt-6 max-w-2xl mx-auto text-center text-lg sm:text-[1.15rem] leading-relaxed text-muted"
        >
          Baby Mo Studio restages your actual product into premium product
          photos, Instagram, Pinterest, Shopee, ad creatives and packaging —
          in a warm, emotional aesthetic, in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/studio"
            className="btn-accent group text-base px-7 py-3.5"
          >
            <Wand2 className="h-4 w-4" />
            Generate my kit
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
          <a
            href="#showcase"
            className="btn-glass text-base px-6 py-3.5"
          >
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
    tilt: -1.2,
  },
  {
    label: "Pinterest pin",
    color: "from-terracotta-100 to-cream-100",
    seed: 22,
    h: "h-96",
    tilt: 0.8,
  },
  {
    label: "Instagram post",
    color: "from-sage-100 to-cream-100",
    seed: 33,
    h: "h-72",
    tilt: -0.6,
  },
  {
    label: "Lifestyle mockup",
    color: "from-cream-100 to-terracotta-100",
    seed: 44,
    h: "h-80",
    tilt: 1.0,
  },
  {
    label: "Story",
    color: "from-cream-100 to-sage-100",
    seed: 55,
    h: "h-96",
    tilt: -0.9,
  },
  {
    label: "Ad creative",
    color: "from-terracotta-200 to-cream-100",
    seed: 66,
    h: "h-72",
    tilt: 0.6,
  },
];

function HeroShowcase() {
  return (
    <motion.div
      id="showcase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mt-20 sm:mt-24"
    >
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SHOWCASE_TILES.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: tile.tilt,
              }}
              whileHover={{ y: -8, scale: 1.03, rotate: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.4 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative ${tile.h} rounded-[1.75rem] overflow-hidden
                shadow-floating group sheen
                bg-gradient-to-br ${tile.color}`}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('https://picsum.photos/seed/babymo-hero-${tile.seed}/600/800')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Inner highlight & gradient base */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.20)",
                }}
              />

              <div className="absolute bottom-3 left-3 right-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight
                    text-sand-900 bg-white/85 backdrop-blur-md
                    border border-white/40
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_12px_-4px_rgba(0,0,0,0.2)]"
                >
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
