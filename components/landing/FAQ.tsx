"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    q: "Will the photos really look like my product?",
    a: "Baby Mo Studio uses your uploaded image as the source of truth and rebuilds polished scenes around it. You can re-roll any asset until it feels right.",
  },
  {
    q: "Can I use the images commercially?",
    a: "Yes. Every Studio and Atelier plan includes a commercial-use license for ecommerce listings, ads, packaging and social.",
  },
  {
    q: "Do I need design skills?",
    a: "No. The whole point of Baby Mo is that the styling decisions — palette, lighting, props, composition — are made for you, tuned for warm kids & parenting brands.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. The studio is mobile-first — you can upload, generate and share from your phone in seconds.",
  },
  {
    q: "What product types do you support?",
    a: "Children's books, t-shirts, toys, printables, worksheets, flashcards, merchandise, tote bags, mugs, stickers, and educational kits. More are added regularly.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="chip">FAQ</span>
          <h2 className="heading-display mt-4 text-4xl sm:text-5xl leading-tight">
            Soft questions,
            <br />
            <span className="italic text-terracotta-500">honest answers.</span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <FAQItem key={i} {...f} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  q,
  a,
  defaultOpen,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-serif text-lg text-sand-900 dark:text-cream-50">
          {q}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-5 text-sm text-muted leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
