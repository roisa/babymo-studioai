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
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-serif text-lg text-sand-900 dark:text-cream-50">
            Aesthetic
          </div>
          <div className="text-xs text-muted mt-0.5">
            Pick a creative direction — it shapes every asset.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {STYLE_LIST.map((s) => {
          const selected = value === s.id;
          return (
            <motion.button
              key={s.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(s.id)}
              className={cn(
                "relative text-left rounded-2xl border overflow-hidden transition-all group",
                selected
                  ? "border-terracotta-400 shadow-soft ring-2 ring-terracotta-200"
                  : "border-cream-200 dark:border-sand-800 hover:border-terracotta-200",
              )}
            >
              <div className="aspect-[5/4] relative">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${s.palette.slice(0, 3).join(", ")})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                {selected && (
                  <span className="absolute top-2 right-2 h-6 w-6 rounded-full bg-terracotta-500 text-white grid place-items-center shadow">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
                <div className="absolute bottom-2 left-2 flex gap-1">
                  {s.palette.slice(0, 4).map((c) => (
                    <div
                      key={c}
                      className="h-3 w-3 rounded-full border border-white/40"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-2.5 bg-white dark:bg-sand-900">
                <div className="text-sm font-medium text-sand-900 dark:text-cream-50">
                  {s.label}
                </div>
                <div className="text-[11px] text-muted line-clamp-1">
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
