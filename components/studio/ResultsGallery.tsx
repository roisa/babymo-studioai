"use client";

import { motion } from "framer-motion";
import { Download, RefreshCw, Heart } from "lucide-react";
import { ASSETS } from "@/lib/prompts/platforms";
import type { GeneratedAsset } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  assets: GeneratedAsset[];
  onRegenerate?: (asset: GeneratedAsset) => void;
}

export function ResultsGallery({ assets, onRegenerate }: Props) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
      {assets.map((asset, i) => {
        const meta = ASSETS[asset.assetType];
        const aspect =
          asset.orientation === "portrait"
            ? "aspect-[2/3]"
            : asset.orientation === "landscape"
              ? "aspect-[3/2]"
              : "aspect-square";

        return (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="break-inside-avoid mb-4 group"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="card overflow-hidden transition-shadow duration-500 hover:shadow-floating"
            >
              <div
                className={cn(
                  "relative overflow-hidden bg-cream-100 dark:bg-sand-800",
                  aspect,
                )}
              >
                {asset.url ? (
                  <img
                    src={asset.url}
                    alt={meta.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    style={{ transitionTimingFunction: "var(--ease-out-ios)" }}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-muted text-sm">
                    Loading…
                  </div>
                )}

                {/* Inner highlight border */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.15)",
                  }}
                />

                {/* Hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-t from-black/65 via-black/15 to-transparent"
                />

                <div className="absolute top-3 left-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight
                      text-sand-900 bg-white/85 backdrop-blur-md border border-white/40"
                    style={{
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 12px -4px rgba(0,0,0,0.2)",
                    }}
                  >
                    {meta.aspect} · {meta.platform}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-serif text-white text-lg drop-shadow-lg tracking-tight">
                    {meta.label}
                  </div>
                  <div className="flex gap-2">
                    {onRegenerate && (
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => onRegenerate(asset)}
                        title="Regenerate"
                        className="h-9 w-9 grid place-items-center rounded-full text-sand-900"
                        style={{
                          background: "rgba(255,255,255,0.92)",
                          backdropFilter: "blur(16px)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.5), 0 6px 16px -4px rgba(0,0,0,0.25)",
                        }}
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </motion.button>
                    )}
                    <motion.a
                      whileTap={{ scale: 0.92 }}
                      href={asset.url}
                      target="_blank"
                      rel="noreferrer"
                      title="Download"
                      className="h-9 w-9 grid place-items-center rounded-full text-white"
                      style={{
                        background:
                          "linear-gradient(180deg, rgb(226,134,88), rgb(213,105,57))",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.3), 0 6px 16px -4px rgba(213,105,57,0.5)",
                      }}
                    >
                      <Download className="h-3.5 w-3.5" />
                    </motion.a>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-sand-900 dark:text-cream-50 tracking-tight">
                    {meta.label}
                  </div>
                  <div className="text-[11px] text-muted">
                    {meta.pixelHint} · {meta.platform}
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  className="h-9 w-9 grid place-items-center rounded-full text-muted hover:text-terracotta-500 hover:bg-cream-100/80 dark:hover:bg-sand-800/80 transition-colors"
                  title="Save"
                >
                  <Heart className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
