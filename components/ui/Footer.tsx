import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-cream-200 dark:border-sand-800">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted">
            An AI creative team specialized for warm, emotional, premium kids &
            parenting brands. Upload one product photo, ship a full launch kit.
          </p>
        </div>
        <FooterCol
          title="Product"
          links={[
            { href: "/#features", label: "Features" },
            { href: "/#styles", label: "Aesthetics" },
            { href: "/studio", label: "Open Studio" },
            { href: "/dashboard", label: "Dashboard" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { href: "/#pricing", label: "Pricing" },
            { href: "/#faq", label: "FAQ" },
            { href: "mailto:hello@babymo.studio", label: "Contact" },
          ]}
        />
      </div>
      <div className="border-t border-cream-200 dark:border-sand-800 py-6 px-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Baby Mo Studio. Made with warmth for tiny brands.
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted mb-3">
        {title}
      </div>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-sm text-sand-700 dark:text-cream-200 hover:text-terracotta-500 transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
