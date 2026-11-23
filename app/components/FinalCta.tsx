import { Check } from "lucide-react";
import { whatsappLink } from "@/app/lib/contact";
import { WA_MESSAGE } from "@/app/lib/site";
import { CtaButton } from "./ui/CtaButton";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { container } from "./ui/Section";

const ticks = ["Diagnóstico sem compromisso", "Resposta em menos de 5h", "Atendimento em todo o Brasil"];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-[clamp(96px,12vw,160px)] text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[640px] w-[980px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(242,169,59,0.2),transparent)]"
      />
      <div aria-hidden className="bg-night-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className={container}>
        <Reveal className="mb-6">
          <Eyebrow>Diagnóstico gratuito</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mx-auto max-w-[940px] text-[clamp(2.4rem,6vw,5rem)] text-white">
            Vamos descobrir onde está o <em className="font-semibold italic text-caramel">buraco da sua agenda.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[620px] text-[clamp(1.02rem,1.5vw,1.18rem)] leading-relaxed">
            Sem promessa mágica. Só método, execução e foco no que importa para quem vive do mercado pet: tutor agendado e
            voltando todo mês.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex flex-wrap justify-center gap-3">
          <CtaButton form="final">Quero meu diagnóstico gratuito</CtaButton>
          <CtaButton href={whatsappLink(WA_MESSAGE)} variant="outline-dark" icon="whatsapp">
            Prefiro o WhatsApp
          </CtaButton>
        </Reveal>
        <Reveal delay={0.2}>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2.5 text-[14px]">
            {ticks.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check size={16} strokeWidth={2.6} className="text-caramel" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
