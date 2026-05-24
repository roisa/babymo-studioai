"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-5xl p-10 sm:p-16 text-center
            bg-gradient-to-br from-terracotta-500 to-terracotta-700 text-white
            shadow-glow"
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cream-100/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sage-100/20 blur-3xl"
          />

          <h2 className="heading-display text-white text-4xl sm:text-5xl leading-tight">
            Your next launch
            <br />
            <span className="italic text-cream-100">looks editorial.</span>
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-cream-100/90">
            Drop in a product photo. Pick a vibe. Get a launch-ready kit you'd be
            proud to put on Pinterest.
          </p>
          <div className="mt-9">
            <Link
              href="/studio"
              className="btn bg-cream-50 text-terracotta-700 hover:bg-white px-7 py-3 text-base"
            >
              Open the Studio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
