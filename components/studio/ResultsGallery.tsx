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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="break-inside-avoid mb-4 group"
          >
            <div className="card overflow-hidden hover:shadow-softer transition-all duration-500">
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
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-muted text-sm">
                    Loading…
                  </div>
                )}

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                    bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                />

                <div className="absolute top-3 left-3">
                  <span className="chip bg-white/85 dark:bg-sand-900/85 border-white/40 backdrop-blur">
                    {meta.aspect} · {meta.platform}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="font-serif text-white text-lg drop-shadow">
                    {meta.label}
                  </div>
                  <div className="flex gap-2">
                    {onRegenerate && (
                      <button
                        onClick={() => onRegenerate(asset)}
                        title="Regenerate"
                        className="h-8 w-8 grid place-items-center rounded-full bg-white/90 hover:bg-white text-sand-900 transition-colors"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noreferrer"
                      title="Download"
                      className="h-8 w-8 grid place-items-center rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-sand-900 dark:text-cream-50">
                    {meta.label}
                  </div>
                  <div className="text-[11px] text-muted">
                    {meta.pixelHint} · {meta.platform}
                  </div>
                </div>
                <button
                  className="h-8 w-8 grid place-items-center rounded-full text-muted hover:text-terracotta-500 hover:bg-cream-100 dark:hover:bg-sand-800 transition-colors"
                  title="Save"
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
