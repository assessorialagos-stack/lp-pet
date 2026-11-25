"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/lib/cn";
import { LagosLogo } from "./ui/LagosMark";
import { CtaButton } from "./ui/CtaButton";

const links = [
  { href: "#para-quem", label: "Para quem" },
  { href: "#metodo", label: "Método" },
  { href: "#servicos", label: "Serviços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#faq", label: "Dúvidas" },
];

/** Cabeçalho em pílula flutuante (estilo das referências). */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-4 sm:pt-3.5">
      <div
        className={cn(
          "mx-auto flex h-[64px] max-w-[1240px] items-center justify-between gap-6 rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-300 sm:h-[68px] sm:pl-6",
          scrolled
            ? "border-white/10 bg-night/85 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-white/[0.07] bg-white/[0.03] backdrop-blur-md",
        )}
      >
        <a href="#top" aria-label="Lagos Assessoria, início">
          <LagosLogo />
        </a>
        <nav aria-label="Principal" className="hidden gap-7 text-[14.5px] font-medium text-night-text lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <CtaButton form="header" size="sm">
          <span className="max-[400px]:hidden">Falar com especialista</span>
          <span className="hidden max-[400px]:inline">Diagnóstico</span>
        </CtaButton>
      </div>
    </header>
  );
}
