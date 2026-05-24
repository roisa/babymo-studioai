"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  value: { url: string; name: string } | null;
  onFile: (file: File) => Promise<void> | void;
  onClear: () => void;
}

export function UploadZone({ value, onFile, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setBusy(true);
      try {
        await onFile(file);
      } finally {
        setBusy(false);
      }
    },
    [onFile],
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      {!value ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !busy && inputRef.current?.click()}
          className={cn(
            "relative cursor-pointer rounded-[2rem] overflow-hidden",
            "px-6 py-16 sm:py-24 text-center",
            "transition-all duration-500",
            "glass shadow-glass dark:shadow-glass-dark",
            dragging && "scale-[1.01]",
            busy && "pointer-events-none opacity-90",
          )}
          style={{
            transitionTimingFunction: "var(--ease-spring)",
            ...(dragging
              ? {
                  borderColor: "rgba(213,105,57,0.5)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.6), 0 0 0 4px rgba(213,105,57,0.18), 0 30px 60px -20px rgba(213,105,57,0.25)",
                }
              : {}),
          }}
        >
          {/* ambient inside */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(244,205,180,0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(230,237,225,0.6) 0%, transparent 50%)",
            }}
          />

          <motion.div
            animate={busy ? { scale: 1 } : { scale: [1, 1.04, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-20 w-20 grid place-items-center rounded-[1.5rem] text-terracotta-500"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 28px -8px rgba(213,105,57,0.30), 0 24px 60px -16px rgba(213,105,57,0.18)",
            }}
          >
            {busy ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <Upload className="h-8 w-8" strokeWidth={1.8} />
            )}
          </motion.div>

          <div className="mt-6 font-serif text-2xl sm:text-3xl text-sand-900 dark:text-cream-50 tracking-tight">
            {busy ? "Preparing your photo…" : "Drop your product photo here"}
          </div>
          <p className="mt-2.5 text-sm text-muted max-w-md mx-auto leading-relaxed">
            JPG or PNG. Any background — we'll handle the styling. Or click to
            browse.
          </p>
          <div className="mt-7 flex justify-center flex-wrap gap-2">
            <span className="chip">📖 books</span>
            <span className="chip">👕 t-shirts</span>
            <span className="chip">🧸 toys</span>
            <span className="chip">🖨️ printables</span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] overflow-hidden card shadow-floating"
        >
          <div className="aspect-[16/9] relative bg-cream-100 dark:bg-sand-800">
            <img
              src={value.url}
              alt={value.name}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.10)",
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div className="flex items-center gap-2 min-w-0">
              <ImageIcon className="h-4 w-4 text-muted shrink-0" />
              <span className="text-sm truncate text-sand-700 dark:text-cream-200 tracking-tight">
                {value.name}
              </span>
            </div>
            <button
              onClick={onClear}
              className="btn-glass text-xs px-3.5 py-1.5"
            >
              <X className="h-3 w-3" />
              Replace
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
