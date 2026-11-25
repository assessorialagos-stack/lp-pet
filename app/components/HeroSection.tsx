import { Check, PawPrint } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { CtaButton } from "./ui/CtaButton";
import { Reveal } from "./ui/Reveal";
import { container } from "./ui/Section";
import { HeroScene } from "./mockups/HeroScene";

const ticks = ["Diagnóstico sem compromisso", "Resposta em menos de 5h", "Atendimento em todo o Brasil"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-[clamp(56px,7vw,96px)] pt-[clamp(128px,14vw,176px)]">
      <div aria-hidden className="bg-night-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-260px] h-[720px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(59,107,255,0.22),transparent)]"
      />

      <div className={cn(container, "@container z-[1] text-center")}>
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-[13.5px] font-medium text-night-text">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-caramel text-ink">
              <PawPrint size={15} strokeWidth={2.4} />
            </span>
            Marketing para pet shop, banho e tosa e clínica
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          {/* Sempre duas linhas: cada frase não quebra, e a fonte é medida pela largura do
              bloco (cqw). A linha mais longa ocupa ~9,8x o tamanho da fonte; 8,6cqw deixa
              ~15% de folga para navegadores que desenham o texto mais largo. Se uma linha
              estourasse, ela encostaria na esquerda e perderia a centralização. */}
          <h1 className="display mx-auto mt-7 text-[length:clamp(1.75rem,8.6cqw,6rem)] leading-[1] text-white">
            <span className="block whitespace-nowrap">Mais tutores na agenda.</span>
            <em className="block whitespace-nowrap font-semibold italic tracking-[-0.05em] text-caramel">E voltando todo mês.</em>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-[640px] text-[clamp(1.05rem,1.5vw,1.22rem)] leading-relaxed text-night-text">
            A Lagos cuida do marketing do seu negócio pet de ponta a ponta: anúncio no bairro certo, WhatsApp que vira
            horário marcado e recorrência de banho e tosa. Você cuida dos pets. A gente traz o tutor e faz ele voltar.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <CtaButton form="hero">Quero meu diagnóstico gratuito</CtaButton>
          <CtaButton href="#metodo" variant="outline-dark" icon="none">
            Ver como funciona
          </CtaButton>
        </Reveal>

        <Reveal delay={0.24}>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2.5 text-[14px] text-night-text">
            {ticks.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check size={16} strokeWidth={2.6} className="text-caramel" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="relative z-[1] mx-auto mt-[clamp(48px,6vw,80px)] w-full max-w-[1240px] px-2.5 sm:px-4">
        <Reveal delay={0.1}>
          <HeroScene />
        </Reveal>
      </div>
    </section>
  );
}
