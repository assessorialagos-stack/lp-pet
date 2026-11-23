import { Check } from "lucide-react";
import { CtaButton } from "./ui/CtaButton";
import { LagosMark } from "./ui/LagosMark";
import { Reveal } from "./ui/Reveal";
import { container, sectionY } from "./ui/Section";
import { cn } from "@/app/lib/cn";

const points = [
  "Anúncio no raio certo, só para quem pode vir até você",
  "Roteiro de WhatsApp para o orçamento virar horário marcado",
  "Lembrete de retorno e pacote de banho para o tutor voltar",
  "Painel com contatos, agendamentos e custo por cliente",
  "Um responsável com nome para a sua conta",
];

/** Faixa azul Lagos com o posicionamento (equivalente à faixa de diferencial da VoxPet). */
export function DifferentialSection() {
  return (
    <section id="assessoria" className={cn("relative", sectionY)}>
      <div className={container}>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(125deg,#2141B8_0%,#3B6BFF_55%,#6A92FF_100%)] p-[clamp(28px,5vw,64px)] text-lagos-100 shadow-[0_40px_90px_-40px_rgba(59,107,255,0.7)] sm:rounded-[40px]">
            <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.22),transparent)]" />
            <LagosMark className="pointer-events-none absolute -bottom-16 -left-10 h-[220px] w-[320px] text-white/[0.06]" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 [&>*]:min-w-0">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.06em] text-white">
                  Assessoria, não fornecedor de post
                </span>
                <h2 className="display mt-6 text-[clamp(2rem,4vw,3.25rem)] text-white">
                  Um time só cuidando de atrair, atender e fazer o tutor voltar.
                </h2>
                <p className="mt-5 max-w-[560px] text-[clamp(1rem,1.4vw,1.12rem)] leading-relaxed">
                  A gente olha para o negócio, não só para a campanha: serviços que dão margem, capacidade da equipe, região e
                  sazonalidade. E assume o crescimento junto com você.
                </p>
                <CtaButton form="diferencial" variant="white" className="mt-8">
                  Falar com especialista
                </CtaButton>
              </div>

              <ul className="grid gap-2.5">
                {points.map((p, i) => (
                  <Reveal key={p} delay={0.08 + i * 0.06}>
                    <li className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/[0.09] px-4 py-3.5 text-[15px] font-medium text-white">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-caramel text-ink">
                        <Check size={15} strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
