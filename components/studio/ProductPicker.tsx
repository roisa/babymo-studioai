"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRODUCT_LIST } from "@/lib/prompts/products";
import type { ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  value: ProductCategory;
  onChange: (v: ProductCategory) => void;
  detected?: ProductCategory | null;
}

export function ProductPicker({ value, onChange, detected }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-serif text-lg text-sand-900 dark:text-cream-50">
            Product type
          </div>
          {detected && (
            <div className="text-xs text-muted mt-0.5">
              Auto-detected — change if you'd like.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {PRODUCT_LIST.map((p) => {
          const selected = value === p.id;
          return (
            <motion.button
              key={p.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(p.id)}
              className={cn(
                "relative text-left rounded-2xl border p-3.5 transition-all",
                selected
                  ? "border-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/20 shadow-soft"
                  : "border-cream-200 dark:border-sand-800 bg-white dark:bg-sand-900 hover:border-terracotta-200",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-2xl">{p.emoji}</div>
                {selected && (
                  <span className="h-5 w-5 rounded-full bg-terracotta-500 text-white grid place-items-center shadow">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
              <div className="mt-2 text-sm font-medium text-sand-900 dark:text-cream-50">
                {p.label}
              </div>
              <div className="text-[11px] text-muted leading-snug mt-0.5 line-clamp-2">
                {p.description}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
