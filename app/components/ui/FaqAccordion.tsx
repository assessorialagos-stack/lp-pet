"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/app/lib/cn";

export type FaqItem = { q: string; a: React.ReactNode };

/** Acordeão do FAQ em cartões: um aberto por vez, com transição de altura. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid gap-2.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `faq-${i}`;
        return (
          <div
            key={item.q}
            className={cn(
              "rounded-[20px] border bg-card transition-colors duration-300",
              isOpen ? "border-line-strong shadow-soft" : "border-line",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-5 px-5 py-[18px] text-left font-display text-[clamp(1rem,1.35vw,1.1rem)] font-semibold tracking-[-0.015em] text-ink sm:px-6"
            >
              {item.q}
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full transition duration-300",
                  isOpen ? "rotate-45 bg-caramel text-ink" : "bg-paper-2 text-ink",
                )}
              >
                <Plus size={15} strokeWidth={2.6} />
              </span>
            </button>
            <div
              id={id}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-2.5 px-5 pb-6 pr-14 text-[15.5px] leading-relaxed text-body sm:px-6">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
