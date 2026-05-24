import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <a
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 group",
        className,
      )}
      aria-label="Baby Mo Studio"
    >
      <span
        aria-hidden
        className="relative grid place-items-center h-9 w-9 rounded-2xl
          bg-gradient-to-br from-terracotta-400 to-terracotta-600
          shadow-soft ring-1 ring-terracotta-300/40"
      >
        <span className="absolute inset-1 rounded-xl bg-cream-50/70 backdrop-blur-sm" />
        <span className="relative font-serif font-semibold text-terracotta-700 text-sm">
          bm
        </span>
      </span>
      {showWordmark && (
        <span className="font-serif text-lg tracking-tight text-sand-900 dark:text-cream-50">
          Baby Mo <span className="text-terracotta-500">Studio</span>
        </span>
      )}
    </a>
  );
}
