"use client";

import { motion } from "framer-motion";
import { ASSET_LIST } from "@/lib/prompts/platforms";

export default function GalleryPage() {
  const items = ASSET_LIST.flatMap((a, i) =>
    [1, 2].map((j) => ({ asset: a, seed: i * 10 + j })),
  );

  return (
    <div>
      <span className="chip">Gallery</span>
      <h1 className="heading-display mt-3 text-4xl">All your assets</h1>
      <p className="text-muted mt-2">
        Every kit you've shipped, organized by aesthetic and platform.
      </p>

      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
        {items.map(({ asset, seed }) => {
          const aspect =
            asset.orientation === "portrait"
              ? "aspect-[2/3]"
              : asset.orientation === "landscape"
                ? "aspect-[3/2]"
                : "aspect-square";
          return (
            <motion.div
              key={`${asset.id}-${seed}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="break-inside-avoid mb-4"
            >
              <div className="card overflow-hidden group hover:shadow-softer transition-all">
                <div className={`relative ${aspect}`}>
                  <img
                    src={`https://picsum.photos/seed/babymo-gallery-${seed}-${asset.id}/700/900`}
                    alt={asset.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="chip bg-white/85 backdrop-blur">
                      {asset.label}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
