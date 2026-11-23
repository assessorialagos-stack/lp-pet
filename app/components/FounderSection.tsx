import { FOUNDER } from "@/app/lib/site";
import { Eyebrow } from "./ui/Eyebrow";
import { FounderPhoto } from "./ui/FounderPhoto";
import { Reveal } from "./ui/Reveal";
import { PaperSection } from "./ui/Section";

export function FounderSection() {
  const placeholder = FOUNDER.name === "Nome do fundador";
  return (
    <PaperSection id="quem">
      <div className="grid items-center gap-[clamp(40px,6vw,88px)] lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="mx-auto w-full max-w-[420px]">
          <FounderPhoto />
        </Reveal>

        <div>
          <Reveal className="mb-5">
            <Eyebrow tone="light">De dono para dono</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2.1rem,4.2vw,3.4rem)] text-ink">Você fala com quem decide, não com um atendente.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 text-[clamp(1.02rem,1.4vw,1.12rem)] leading-relaxed">
              <p>
                Montei a Lagos depois de ver muito dono de negócio pagando agência que entrega relatório de curtida. No mercado
                pet, o número que importa é outro: quantos tutores agendaram, quantos voltaram e quanto custou cada um.
              </p>
              <p className="my-7 border-l-[3px] border-caramel pl-5 font-display text-[clamp(1.25rem,2vw,1.6rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">
                “Aqui cada conta tem nome e responsável. E eu acompanho de perto as decisões que mexem na sua agenda e no seu
                caixa.”
              </p>
              <p>
                Se a sua verba ou a sua estrutura não sustentarem a meta, eu prefiro te dizer isso no diagnóstico do que depois
                de três meses de contrato.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 border-t border-line-strong pt-6">
              <b className="block text-[17px] text-ink">
                {placeholder ? (
                  <span className="rounded-md border-[1.5px] border-dashed border-caramel bg-caramel-50 px-2 py-0.5">{FOUNDER.name}</span>
                ) : (
                  FOUNDER.name
                )}
              </b>
              <span className="mt-1 block text-[14px] text-muted">{FOUNDER.role}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </PaperSection>
  );
}
