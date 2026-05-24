"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wand2,
  ImageIcon,
  Heart,
  Settings,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/studio", label: "Studio", icon: Wand2 },
  { href: "/dashboard/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-[calc(100vh-3rem)] sticky top-6
      rounded-3xl border border-cream-200 dark:border-sand-800
      bg-white/70 dark:bg-sand-900/60 backdrop-blur-xl
      p-5 shadow-soft">
      <Logo />

      <nav className="mt-8 flex-1 space-y-1">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-terracotta-50 dark:bg-terracotta-900/30 text-terracotta-700 dark:text-terracotta-300"
                  : "text-sand-700 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-sand-800",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 text-white p-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          Studio plan
        </div>
        <div className="mt-2 text-xs text-cream-100/90">
          145 / 200 generations this month
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full bg-cream-50 rounded-full" style={{ width: "72%" }} />
        </div>
        <Link
          href="/#pricing"
          className="mt-4 block text-center text-xs font-medium bg-white/15 hover:bg-white/25
            rounded-full py-1.5 transition-colors"
        >
          Upgrade to Atelier
        </Link>
      </div>
    </aside>
  );
}
