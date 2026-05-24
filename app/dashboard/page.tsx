"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ImageIcon, Sparkles, TrendingUp, Wand2 } from "lucide-react";
import { STYLE_LIST } from "@/lib/prompts/styles";
import { PRODUCT_LIST } from "@/lib/prompts/products";

const STATS = [
  { label: "Generations this month", value: "145", change: "+24 this week", icon: Sparkles },
  { label: "Assets created", value: "1,260", change: "across 18 projects", icon: ImageIcon },
  { label: "Best-performing style", value: "Korean Kids", change: "8 pins saved", icon: TrendingUp },
];

const RECENT = [
  { product: "Children's Book", style: "Warm Parenting", seed: 11 },
  { product: "Toddler T-shirt", style: "Korean Kids", seed: 22 },
  { product: "Printable Art", style: "Pinterest Mom", seed: 33 },
  { product: "Wooden Toy", style: "Wooden Toy Catalog", seed: 44 },
  { product: "Flashcards", style: "Montessori", seed: 55 },
  { product: "Tote Bag", style: "Scandinavian Nursery", seed: 66 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="chip">Welcome back</span>
          <h1 className="heading-display mt-3 text-4xl">
            Studio overview
          </h1>
          <p className="text-muted mt-2">
            Pick up where you left off, or start a new project.
          </p>
        </div>
        <Link href="/studio" className="btn-accent">
          <Wand2 className="h-4 w-4" />
          New project
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted">
                  {s.label}
                </div>
                <div className="mt-2 font-serif text-3xl text-sand-900 dark:text-cream-50">
                  {s.value}
                </div>
                <div className="text-xs text-muted mt-1">{s.change}</div>
              </div>
              <div className="h-10 w-10 grid place-items-center rounded-2xl bg-cream-100 dark:bg-sand-800 text-terracotta-500">
                <s.icon className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="font-serif text-2xl text-sand-900 dark:text-cream-50">
              Recent projects
            </div>
            <div className="text-xs text-muted mt-0.5">
              Your latest generated kits.
            </div>
          </div>
          <Link
            href="/dashboard/gallery"
            className="text-sm text-terracotta-500 hover:text-terracotta-600"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {RECENT.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card overflow-hidden group hover:shadow-softer transition-all"
            >
              <div className="aspect-[4/5] relative bg-cream-100 dark:bg-sand-800 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/babymo-dash-${r.seed}/600/750`}
                  alt={r.product}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="text-white font-serif">{r.product}</div>
                  <div className="text-xs text-cream-100/80">{r.style}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="font-serif text-xl text-sand-900 dark:text-cream-50">
            Quick start
          </div>
          <div className="text-xs text-muted mt-0.5">
            Hop straight into a product flow.
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {PRODUCT_LIST.slice(0, 8).map((p) => (
              <Link
                key={p.id}
                href="/studio"
                className="flex items-center gap-2 rounded-2xl border border-cream-200 dark:border-sand-800
                  bg-white dark:bg-sand-900 px-3 py-2.5 text-sm hover:border-terracotta-200 transition-colors"
              >
                <span className="text-xl">{p.emoji}</span>
                <span className="text-sand-700 dark:text-cream-200">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="font-serif text-xl text-sand-900 dark:text-cream-50">
            Aesthetics
          </div>
          <div className="text-xs text-muted mt-0.5">
            Your saved style is ready to reuse.
          </div>
          <div className="mt-5 grid grid-cols-5 gap-2">
            {STYLE_LIST.map((s) => (
              <div key={s.id} className="text-center">
                <div
                  className="aspect-square rounded-2xl border border-cream-200 dark:border-sand-800"
                  style={{
                    background: `linear-gradient(135deg, ${s.palette.slice(0, 3).join(", ")})`,
                  }}
                  title={s.label}
                />
                <div className="text-[10px] text-muted mt-1 line-clamp-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
