"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#styles", label: "Aesthetics" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[padding] duration-500",
        scrolled ? "pt-2.5" : "pt-4",
      )}
      style={{ transitionTimingFunction: "var(--ease-out-ios)" }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "relative flex items-center justify-between gap-3 rounded-full",
            "px-2.5 sm:px-3 py-2 transition-all duration-500",
            scrolled
              ? "glass-thick shadow-floating max-w-3xl mx-auto"
              : "glass shadow-glass",
          )}
          style={{ transitionTimingFunction: "var(--ease-out-ios)" }}
        >
          <div className="pl-2">
            <Logo />
          </div>

          <nav className="hidden md:flex items-center">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-3.5 py-1.5 text-sm font-medium tracking-tight",
                  "text-sand-700 dark:text-cream-200 rounded-full",
                  "transition-colors duration-200",
                  "hover:text-sand-900 dark:hover:text-cream-50",
                )}
              >
                <span className="relative z-10">{l.label}</span>
                <span
                  className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200
                    bg-white/60 dark:bg-sand-800/50"
                  aria-hidden
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 pr-1">
            <ThemeToggle />
            <Link
              href="/studio"
              className="btn-accent group text-sm py-2 px-4"
            >
              <span className="hidden sm:inline">Open Studio</span>
              <span className="sm:hidden">Studio</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
