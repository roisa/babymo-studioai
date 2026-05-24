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
  AssetType,
  GeneratedAsset,
  ProductCategory,
  StylePreset,
} from "@/types";
import { getAssetPlaylist } from "@/lib/prompts/engine";
import { detectProductFromFilename } from "@/lib/prompts/products";
import { fileToCompressedDataUrl } from "@/lib/image";
import { ASSETS } from "@/lib/prompts/platforms";
import { ArrowRight, Sparkles, AlertCircle } from "lucide-react";

type Step = "upload" | "configure" | "generating" | "results";

interface UploadedImage {
  url: string;
  name: string;
  dataUrl: string;
}

interface AssetError {
  asset: AssetType;
  message: string;
  hint?: string;
}

export default function StudioPage() {
  const [step, setStep] = useState<Step>("upload");
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [product, setProduct] = useState<ProductCategory>("kids_book");
  const [detected, setDetected] = useState<ProductCategory | null>(null);
  const [style, setStyle] = useState<StylePreset>("warm_parenting");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(0);
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);
  const [errors, setErrors] = useState<AssetError[]>([]);

  const playlist = useMemo(() => getAssetPlaylist(product), [product]);

  useEffect(() => {
    if (image) {
      const guess = detectProductFromFilename(image.name);
      setDetected(guess);
      setProduct(guess);
      setStep("configure");
    }
  }, [image]);

  async function handleFile(file: File) {
    const dataUrl = await fileToCompressedDataUrl(file, 1024, "image/jpeg", 0.9);
    setImage({
      url: URL.createObjectURL(file),
      name: file.name,
      dataUrl,
    });
  }

  async function startGeneration() {
    if (!image) return;
    setStep("generating");
    setCompleted(0);
    setAssets([]);
    setErrors([]);

    // Fire one request per asset in parallel — each runs in its own
    // 60-second Vercel function so we don't share a single timeout budget.
    await Promise.all(
      playlist.map(async (asset) => {
        try {
          const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product,
              style,
              asset,
              notes,
              imageDataUrl: image.dataUrl,
            }),
          });

          if (!res.ok) {
            const body = (await res.json().catch(() => ({}))) as {
              error?: string;
              hint?: string;
            };
            setErrors((prev) => [
              ...prev,
              {
                asset,
                message: body.error ?? `HTTP ${res.status}`,
                hint: body.hint,
              },
            ]);
            setCompleted((c) => c + 1);
            return;
          }

          const data = (await res.json()) as { asset: GeneratedAsset };
          setAssets((prev) => [...prev, data.asset]);
          setCompleted((c) => c + 1);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Network error";
          setErrors((prev) => [...prev, { asset, message }]);
          setCompleted((c) => c + 1);
        }
      }),
    );

    setStep("results");
  }

  function reset() {
    setStep("upload");
    setImage(null);
    setAssets([]);
    setCompleted(0);
    setDetected(null);
    setErrors([]);
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
                    Any background. We'll auto-detect what it is and restage your
                    actual product in premium scenes.
                  </p>
                </div>
                <div className="mt-8">
                  <UploadZone
                    value={image}
                    onFile={handleFile}
                    onClear={() => setImage(null)}
                  />
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
                      {playlist.map((a) => (
                        <li
                          key={a}
                          className="flex items-center gap-2 text-sand-700 dark:text-cream-200"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-terracotta-400" />
                          {ASSETS[a].label}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-[11px] text-muted leading-relaxed">
                      Your actual product photo is used as the reference — same
                      product, restaged in {playlist.length} scenes.
                    </div>
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
                <p className="mt-4 text-xs text-center text-muted">
                  This typically takes 20–45 seconds per asset. They appear as
                  they finish.
                </p>
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
                      {assets.length > 0 ? (
                        <>
                          Your kit is ready,
                          <br />
                          <span className="italic text-terracotta-500">
                            beautifully.
                          </span>
                        </>
                      ) : (
                        <>
                          Nothing landed.
                          <br />
                          <span className="italic text-terracotta-500">
                            See the errors below.
                          </span>
                        </>
                      )}
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

                {errors.length > 0 && (
                  <div className="mt-8 space-y-2">
                    {errors.map((e, i) => (
                      <div
                        key={i}
                        className="flex gap-3 rounded-2xl border border-terracotta-200 bg-terracotta-50/60 dark:border-terracotta-800 dark:bg-terracotta-900/20 p-4"
                      >
                        <AlertCircle className="h-4 w-4 text-terracotta-500 shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium text-sand-900 dark:text-cream-50">
                            {ASSETS[e.asset].label} failed
                          </div>
                          <div className="text-muted mt-0.5 break-words">
                            {e.message}
                          </div>
                          {e.hint && (
                            <div className="mt-1.5 text-xs text-terracotta-700 dark:text-terracotta-300">
                              {e.hint}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {assets.length > 0 && (
                  <div className="mt-10">
                    <ResultsGallery
                      assets={assets}
                      onRegenerate={() => startGeneration()}
                    />
                  </div>
                )}
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
