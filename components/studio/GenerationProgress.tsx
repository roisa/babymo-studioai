"use client";

import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { ASSETS } from "@/lib/prompts/platforms";
import type { AssetType } from "@/types";

interface Props {
  playlist: AssetType[];
  completed: number;
}

export function GenerationProgress({ playlist, completed }: Props) {
  const pct = Math.min(100, Math.round((completed / playlist.length) * 100));

  return (
    <div className="card p-7 sm:p-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div
            className="h-12 w-12 grid place-items-center rounded-[1rem] text-white"
            style={{
              background:
                "linear-gradient(135deg, rgb(226,134,88), rgb(191,82,45))",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.32), 0 8px 22px -6px rgba(213,105,57,0.55)",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
          </div>
          {/* Pulsing halo */}
          <motion.div
            className="absolute inset-0 rounded-[1rem] -z-10"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "rgb(213,105,57)",
              filter: "blur(16px)",
            }}
          />
        </div>
        <div>
          <div className="font-serif text-xl text-sand-900 dark:text-cream-50 tracking-tight">
            Restaging your product…
          </div>
          <div className="text-xs text-muted mt-1">
            {completed}/{playlist.length} ready · {pct}%
          </div>
        </div>
      </div>

      <div
        className="mt-6 h-2 w-full overflow-hidden rounded-full"
        style={{
          backgroundColor: "rgba(40,32,26,0.06)",
          boxShadow: "inset 0 1px 2px rgba(40,32,26,0.08)",
        }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "linear-gradient(90deg, rgb(226,134,88), rgb(213,105,57), rgb(191,82,45))",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.3), 0 0 12px rgba(213,105,57,0.4)",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      <ul className="mt-6 space-y-1">
        {playlist.map((a, i) => {
          const meta = ASSETS[a];
          const done = i < completed;
          const current = i === completed;
          return (
            <motion.li
              key={a}
              layout
              className="flex items-center gap-3 text-sm py-2 px-2 rounded-xl transition-colors"
              style={{
                backgroundColor: current
                  ? "rgba(213,105,57,0.06)"
                  : "transparent",
              }}
            >
              <span className="relative h-5 w-5 grid place-items-center shrink-0">
                {done ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 24 }}
                    className="h-5 w-5 rounded-full bg-sage-500 text-white grid place-items-center"
                    style={{
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 10px -2px rgba(80,108,68,0.4)",
                    }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </motion.span>
                ) : current ? (
                  <>
                    <span className="absolute h-3 w-3 rounded-full bg-terracotta-400" />
                    <motion.span
                      className="absolute h-3 w-3 rounded-full bg-terracotta-400"
                      animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  </>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-cream-300 dark:bg-sand-700" />
                )}
              </span>
              <span
                className={
                  done
                    ? "text-muted"
                    : current
                      ? "text-sand-900 dark:text-cream-50 font-medium tracking-tight"
                      : "text-muted"
                }
              >
                {meta.label}
              </span>
              <span className="ml-auto text-[11px] text-muted font-mono">
                {meta.aspect}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
