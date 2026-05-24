"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  value: { url: string; name: string } | null;
  onChange: (val: { url: string; name: string } | null) => void;
}

export function UploadZone({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      onChange({ url, name: file.name });
    },
    [onChange],
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
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
          if (file) handleFile(file);
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
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative cursor-pointer rounded-4xl border-2 border-dashed",
            "px-6 py-14 sm:py-20 text-center transition-all duration-300",
            "bg-white/60 dark:bg-sand-900/40 backdrop-blur-sm",
            dragging
              ? "border-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/20 scale-[1.01]"
              : "border-cream-300 dark:border-sand-700 hover:border-terracotta-300",
          )}
        >
          <div className="mx-auto h-16 w-16 grid place-items-center rounded-3xl bg-cream-100 dark:bg-sand-800 text-terracotta-500 shadow-soft">
            <Upload className="h-7 w-7" />
          </div>
          <div className="mt-5 font-serif text-2xl text-sand-900 dark:text-cream-50">
            Drop your product photo here
          </div>
          <p className="mt-2 text-sm text-muted max-w-md mx-auto">
            JPG or PNG. Any background — we'll handle the styling. Or click to
            browse.
          </p>
          <div className="mt-6 flex justify-center gap-2 text-xs text-muted">
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
          className="relative rounded-4xl overflow-hidden border border-cream-200 dark:border-sand-800 bg-white dark:bg-sand-900 shadow-soft"
        >
          <div className="aspect-[16/9] relative bg-cream-100 dark:bg-sand-800">
            <img
              src={value.url}
              alt={value.name}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-cream-200 dark:border-sand-800">
            <div className="flex items-center gap-2 min-w-0">
              <ImageIcon className="h-4 w-4 text-muted shrink-0" />
              <span className="text-sm truncate text-sand-700 dark:text-cream-200">
                {value.name}
              </span>
            </div>
            <button
              onClick={() => onChange(null)}
              className="btn-ghost text-xs px-3 py-1.5"
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
