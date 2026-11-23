import { Wallet } from "lucide-react";
import { PRICE_FROM } from "@/app/lib/site";
import { CtaButton } from "./ui/CtaButton";
import { Reveal } from "./ui/Reveal";
import { NightSection } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const steps = [
  {
    title: "Diagnóstico gratuito",
    text: "Uma conversa com um especialista para entender serviços, região, concorrência e onde a agenda trava.",
  },
  {
    title: "Plano de 90 dias",
    text: "Prioridades, metas e quem faz o quê, do nosso lado e do seu. Tudo escrito, com nome e responsável.",
  },
  {
    title: "Estrutura no ar",
    text: "Perfil do Google, rastreamento, roteiro de WhatsApp e as primeiras campanhas rodando.",
  },
  {
    title: "Rotina semanal",
    text: "Painel ao vivo, reunião com pauta e otimização contínua do que traz tutor para a agenda.",
  },
];

export function OnboardingSection() {
  return (
    <NightSection id="como-comeca">
      <SectionHeading
        eyebrow="Como começa"
        title="Do diagnóstico à agenda cheia, em quatro passos."
        subtitle="Sem proposta enrolada. Você entende o cenário, vê o que faz sentido e decide."
      />

      <ol className="relative grid gap-3.5 md:grid-cols-2 lg:grid-cols-4">
        <span aria-hidden className="absolute left-0 right-0 top-[27px] hidden border-t border-dashed border-white/15 lg:block" />
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07} className="relative h-full">
            <li className="h-full">
              <span className="relative z-[1] grid h-14 w-14 place-items-center rounded-full border-2 border-caramel bg-night font-display text-[18px] font-bold text-caramel shadow-[0_0_0_8px_var(--color-night)]">
                {i + 1}
              </span>
              <h3 className="mt-6 text-[1.4rem] font-semibold tracking-[-0.03em] text-white">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-[clamp(48px,6vw,72px)]">
        <div className="flex flex-col items-start gap-6 rounded-[28px] border border-night-line bg-night-2 p-6 sm:p-8 md:flex-row md:items-center">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-caramel/15 text-caramel">
            <Wallet size={24} />
          </span>
          <div className="flex-1">
            <b className="block font-display text-[1.3rem] tracking-[-0.02em] text-white">
              Assessoria a partir de {PRICE_FROM} por mês
            </b>
            <p className="mt-1.5 max-w-[640px] text-[15px] leading-relaxed">
              A verba de anúncios é separada, vai direto para o Google e a Meta e é definida junto com você no diagnóstico, de
              acordo com a sua região e a sua meta.
            </p>
          </div>
          <CtaButton form="investimento">Quero meu diagnóstico</CtaButton>
        </div>
      </Reveal>
    </NightSection>
  );
}
