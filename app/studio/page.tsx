"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { UploadZone } from "@/components/studio/UploadZone";
import { ProductPicker } from "@/components/studio/ProductPicker";
import { StylePicker } from "@/components/studio/StylePicker";
import { GenerationProgress } from "@/components/studio/GenerationProgress";
import { ResultsGallery } from "@/components/studio/ResultsGallery";
import type {
  GeneratedAsset,
  ProductCategory,
  StylePreset,
} from "@/types";
import { getAssetPlaylist } from "@/lib/prompts/engine";
import { detectProductFromFilename } from "@/lib/prompts/products";
import { ArrowRight, Sparkles } from "lucide-react";

type Step = "upload" | "configure" | "generating" | "results";

export default function StudioPage() {
  const [step, setStep] = useState<Step>("upload");
  const [image, setImage] = useState<{ url: string; name: string } | null>(null);
  const [product, setProduct] = useState<ProductCategory>("kids_book");
  const [detected, setDetected] = useState<ProductCategory | null>(null);
  const [style, setStyle] = useState<StylePreset>("warm_parenting");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(0);
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);

  const playlist = useMemo(() => getAssetPlaylist(product), [product]);

  useEffect(() => {
    if (image) {
      const guess = detectProductFromFilename(image.name);
      setDetected(guess);
      setProduct(guess);
      setStep("configure");
    }
  }, [image]);

  async function startGeneration() {
    setStep("generating");
    setCompleted(0);
    setAssets([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, style, notes }),
      });
      const data: { assets: GeneratedAsset[] } = await res.json();

      // Reveal one by one for a smooth experience
      for (let i = 0; i < data.assets.length; i++) {
        await new Promise((r) => setTimeout(r, 250));
        setCompleted(i + 1);
        setAssets((prev) => [...prev, data.assets[i]]);
      }

      setStep("results");
    } catch (e) {
      console.error(e);
      setStep("configure");
    }
  }

  function reset() {
    setStep("upload");
    setImage(null);
    setAssets([]);
    setCompleted(0);
    setDetected(null);
  }

  return (
    <>
      <Nav />
      <main className="pt-28 sm:pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <Stepper step={step} />

          <AnimatePresence mode="wait">
            {step === "upload" && (
              <motion.section
                key="upload"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-10"
              >
                <div className="max-w-2xl">
                  <span className="chip">Step 1</span>
                  <h1 className="heading-display mt-3 text-4xl sm:text-5xl">
                    Upload your product
                  </h1>
                  <p className="mt-3 text-muted">
                    Any background. We'll auto-detect what it is and build your
                    creative kit around it.
                  </p>
                </div>
                <div className="mt-8">
                  <UploadZone value={image} onChange={setImage} />
                </div>
              </motion.section>
            )}

            {step === "configure" && image && (
              <motion.section
                key="configure"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8"
              >
                <div className="space-y-10">
                  <ProductPicker
                    value={product}
                    onChange={setProduct}
                    detected={detected}
                  />
                  <StylePicker value={style} onChange={setStyle} />

                  <div>
                    <div className="font-serif text-lg text-sand-900 dark:text-cream-50">
                      Brand notes <span className="text-muted text-sm">(optional)</span>
                    </div>
                    <div className="text-xs text-muted mt-0.5 mb-3">
                      Anything special — brand name, color must-haves, vibe words.
                    </div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. brand name 'Little Fern', sage + cream palette, gentle Montessori feeling"
                      rows={3}
                      className="w-full rounded-2xl border border-cream-200 dark:border-sand-800
                        bg-white dark:bg-sand-900 px-4 py-3 text-sm
                        placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-terracotta-300
                        resize-none"
                    />
                  </div>
                </div>

                <aside className="space-y-5">
                  <div className="card overflow-hidden">
                    <div className="aspect-square bg-cream-100 dark:bg-sand-800 relative">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-4 border-t border-cream-200 dark:border-sand-800 text-xs text-muted truncate">
                      {image.name}
                    </div>
                  </div>

                  <div className="card p-5">
                    <div className="text-xs uppercase tracking-wider text-muted mb-2">
                      You'll get
                    </div>
                    <ul className="space-y-1.5 text-sm">
                      {playlist.slice(0, 6).map((a) => (
                        <li
                          key={a}
                          className="flex items-center gap-2 text-sand-700 dark:text-cream-200"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-terracotta-400" />
                          {a.replace(/_/g, " ")}
                        </li>
                      ))}
                      <li className="text-xs text-muted pt-1">
                        + {playlist.length - 6} more
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={startGeneration}
                    className="btn-accent w-full text-base py-3.5"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate launch kit
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={reset} className="btn-ghost w-full">
                    Start over
                  </button>
                </aside>
              </motion.section>
            )}

            {step === "generating" && (
              <motion.section
                key="generating"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-10 max-w-2xl mx-auto"
              >
                <GenerationProgress
                  playlist={playlist}
                  completed={completed}
                />
              </motion.section>
            )}

            {step === "results" && (
              <motion.section
                key="results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="mt-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div className="max-w-xl">
                    <span className="chip">Done</span>
                    <h1 className="heading-display mt-3 text-4xl sm:text-5xl leading-tight">
                      Your kit is ready,
                      <br />
                      <span className="italic text-terracotta-500">
                        beautifully.
                      </span>
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={reset} className="btn-ghost">
                      New project
                    </button>
                    <button
                      onClick={startGeneration}
                      className="btn-primary"
                    >
                      <Sparkles className="h-4 w-4" />
                      Regenerate all
                    </button>
                  </div>
                </div>

                <div className="mt-10">
                  <ResultsGallery
                    assets={assets}
                    onRegenerate={() => startGeneration()}
                  />
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps: Array<{ id: Step; label: string }> = [
    { id: "upload", label: "Upload" },
    { id: "configure", label: "Configure" },
    { id: "generating", label: "Generate" },
    { id: "results", label: "Results" },
  ];
  const idx = steps.findIndex((s) => s.id === step);

  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              i <= idx ? "bg-terracotta-500" : "bg-cream-300 dark:bg-sand-700"
            }`}
          />
          <span
            className={
              i === idx
                ? "text-sand-900 dark:text-cream-50 font-medium"
                : ""
            }
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <span className="h-px w-6 bg-cream-200 dark:bg-sand-800" />
          )}
        </div>
      ))}
    </div>
  );
}
