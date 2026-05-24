"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STYLE_LIST } from "@/lib/prompts/styles";
import type { StylePreset } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  value: StylePreset;
  onChange: (v: StylePreset) => void;
}

export function StylePicker({ value, onChange }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-serif text-xl text-sand-900 dark:text-cream-50 tracking-tight">
            Aesthetic
          </div>
          <div className="text-xs text-muted mt-1">
            Pick a creative direction — it shapes every asset.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {STYLE_LIST.map((s) => {
          const selected = value === s.id;
          return (
            <motion.button
              key={s.id}
              type="button"
              whileTap={{ scale: 0.965 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              onClick={() => onChange(s.id)}
              aria-pressed={selected}
              className={cn(
                "relative text-left rounded-[1.25rem] overflow-hidden transition-all duration-300 group",
              )}
              style={{
                border: `1px solid ${
                  selected
                    ? "rgba(213,105,57,0.5)"
                    : "var(--hairline)"
                }`,
                boxShadow: selected
                  ? "inset 0 1px 0 rgba(255,255,255,0.5), 0 0 0 3px rgba(213,105,57,0.18), 0 14px 32px -10px rgba(213,105,57,0.30)"
                  : "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 6px -2px rgba(40,32,26,0.06)",
              }}
            >
              <div className="aspect-[5/4] relative">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${s.palette.slice(0, 3).join(", ")})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.15)",
                  }}
                />
                <motion.span
                  initial={false}
                  animate={{
                    scale: selected ? 1 : 0,
                    opacity: selected ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 24 }}
                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-terracotta-500 text-white grid place-items-center"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 14px -2px rgba(213,105,57,0.5)",
                  }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.span>

                <div className="absolute bottom-2 left-2 flex gap-1">
                  {s.palette.slice(0, 4).map((c) => (
                    <div
                      key={c}
                      className="h-3 w-3 rounded-full"
                      style={{
                        background: c,
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.4), 0 0 0 1px rgba(255,255,255,0.45)",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-3 bg-white/85 dark:bg-sand-900/85 backdrop-blur-sm">
                <div className="text-sm font-medium text-sand-900 dark:text-cream-50 tracking-tight">
                  {s.label}
                </div>
                <div className="text-[11px] text-muted line-clamp-1 mt-0.5">
                  {s.tagline}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
