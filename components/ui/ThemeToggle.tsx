"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative h-9 w-9 grid place-items-center rounded-full
        text-sand-700 dark:text-cream-200 pressable
        transition-colors"
      style={{
        background: "rgba(var(--glass-tint), 0.7)",
        backdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid var(--hairline)",
        boxShadow:
          "inset 0 1px 0 var(--glass-inner-highlight), 0 1px 2px rgba(40,32,26,0.04)",
      }}
    >
      <Sun
        className={`h-4 w-4 transition-all duration-500 ${
          isDark
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        }`}
        style={{ transitionTimingFunction: "var(--ease-spring)" }}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-spring)" }}
      />
    </button>
  );
}
