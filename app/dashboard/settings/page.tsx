"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted ? (theme === "system" ? resolvedTheme : theme) : "light";

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <span className="chip">Settings</span>
        <h1 className="heading-display mt-3 text-4xl">Studio preferences</h1>
      </div>

      <section className="card p-6">
        <div className="font-serif text-xl text-sand-900 dark:text-cream-50">
          Appearance
        </div>
        <p className="text-sm text-muted mt-1">
          Choose how the studio looks. Mirrors your system by default.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {(["light", "dark", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                (t === "system" ? theme === "system" : active === t)
                  ? "border-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/20"
                  : "border-cream-200 dark:border-sand-800 hover:border-terracotta-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {t === "light" && <Sun className="h-4 w-4 text-terracotta-500" />}
                {t === "dark" && <Moon className="h-4 w-4 text-terracotta-500" />}
                {t === "system" && (
                  <span className="text-terracotta-500 text-xs font-bold">⌘</span>
                )}
                <span className="text-sm font-medium capitalize">{t}</span>
              </div>
              <div className="text-xs text-muted mt-1">
                {t === "light" && "Warm cream & sand"}
                {t === "dark" && "Cozy candle-lit"}
                {t === "system" && "Follow OS"}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <div className="font-serif text-xl text-sand-900 dark:text-cream-50">
          Brand defaults
        </div>
        <p className="text-sm text-muted mt-1">
          Save these once and every project uses them.
        </p>
        <div className="mt-5 space-y-4">
          <Field label="Brand name" placeholder="e.g. Little Fern Studio" />
          <Field label="Default aesthetic" placeholder="Warm Parenting" />
          <Field label="Brand notes" placeholder="sage + cream palette, gentle Montessori feel" />
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-2xl border border-cream-200 dark:border-sand-800
          bg-white dark:bg-sand-900 px-4 py-2.5 text-sm
          placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-terracotta-300"
      />
    </label>
  );
}
