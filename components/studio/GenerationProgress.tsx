"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ASSETS } from "@/lib/prompts/platforms";
import type { AssetType } from "@/types";

interface Props {
  playlist: AssetType[];
  completed: number;
}

export function GenerationProgress({ playlist, completed }: Props) {
  const pct = Math.min(100, Math.round((completed / playlist.length) * 100));

  return (
    <div className="card p-8">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 grid place-items-center rounded-2xl bg-gradient-to-br from-terracotta-400 to-terracotta-600 text-white shadow-glow">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
        </div>
        <div>
          <div className="font-serif text-xl text-sand-900 dark:text-cream-50">
            Your AI creative team is styling the kit…
          </div>
          <div className="text-xs text-muted mt-0.5">
            {completed}/{playlist.length} assets ready · {pct}%
          </div>
        </div>
      </div>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-cream-200 dark:bg-sand-800">
        <motion.div
          className="h-full bg-gradient-to-r from-terracotta-400 to-terracotta-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <ul className="mt-6 grid sm:grid-cols-2 gap-2">
        {playlist.map((a, i) => {
          const meta = ASSETS[a];
          const done = i < completed;
          const current = i === completed;
          return (
            <li
              key={a}
              className="flex items-center gap-3 text-sm py-1.5"
            >
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  done
                    ? "bg-sage-500"
                    : current
                      ? "bg-terracotta-400 animate-pulse"
                      : "bg-cream-300 dark:bg-sand-700"
                }`}
              />
              <span
                className={
                  done
                    ? "text-muted line-through"
                    : current
                      ? "text-sand-900 dark:text-cream-50 font-medium"
                      : "text-muted"
                }
              >
                {meta.label}
              </span>
              <span className="ml-auto text-[11px] text-muted">{meta.aspect}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
