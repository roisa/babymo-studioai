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
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-serif text-xl text-sand-900 dark:text-cream-50 tracking-tight">
            Product type
          </div>
          {detected && (
            <div className="text-xs text-muted mt-1">
              Auto-detected — change if you'd like.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {PRODUCT_LIST.map((p) => {
          const selected = value === p.id;
          return (
            <motion.button
              key={p.id}
              type="button"
              whileTap={{ scale: 0.965 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              onClick={() => onChange(p.id)}
              aria-pressed={selected}
              className={cn(
                "relative text-left rounded-[1.25rem] p-3.5 overflow-hidden",
                "transition-all duration-300",
                selected
                  ? "bg-terracotta-50 dark:bg-terracotta-900/25"
                  : "bg-white/70 dark:bg-sand-900/50 hover:bg-white dark:hover:bg-sand-900/80",
              )}
              style={{
                border: `1px solid ${
                  selected
                    ? "rgba(213,105,57,0.45)"
                    : "var(--hairline)"
                }`,
                boxShadow: selected
                  ? "inset 0 1px 0 rgba(255,255,255,0.6), 0 0 0 3px rgba(213,105,57,0.18), 0 8px 24px -10px rgba(213,105,57,0.30)"
                  : "inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 2px rgba(40,32,26,0.03)",
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-2xl leading-none">{p.emoji}</div>
                <motion.span
                  initial={false}
                  animate={{
                    scale: selected ? 1 : 0,
                    opacity: selected ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 24 }}
                  className="h-5 w-5 rounded-full bg-terracotta-500 text-white grid place-items-center"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 10px -2px rgba(213,105,57,0.5)",
                  }}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </motion.span>
              </div>
              <div className="mt-2 text-sm font-medium text-sand-900 dark:text-cream-50 tracking-tight">
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
