import { Check, X } from "lucide-react";
import { LagosMark } from "./ui/LagosMark";
import { Reveal } from "./ui/Reveal";
import { PaperSection } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const generic = [
  "Fala de alcance, curtida e seguidor",
  "Anuncia para a cidade inteira",
  "Posta para preencher calendário",
  "Não sabe quantos tutores agendaram",
  "Some depois que o contrato é assinado",
  "Relatório mensal difícil de entender",
];

const lagos = [
  "Fala de agendamento, retorno e custo por cliente",
  "Anúncio com o raio do seu bairro",
  "Conteúdo que gera confiança e contato",
  "Painel com conversa, agendamento e retorno",
  "Acompanhamento semanal com pauta",
  "Se a verba não pagar o custo por cliente da sua região, avisa antes de assinar",
];

export function ComparisonSection() {
  return (
    <PaperSection id="diferenca">
      <SectionHeading
        tone="light"
        layout="center"
        eyebrow="Comparativo"
        title="Por que a Lagos é diferente"
      />

      <div className="grid items-stretch gap-4 md:grid-cols-2">
        <Reveal className="h-full">
          <div className="h-full rounded-[28px] border border-line bg-card p-[clamp(24px,3vw,38px)]">
            <h3 className="flex items-center gap-3 text-[1.35rem] font-semibold tracking-[-0.03em] text-ink">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-paper-2 text-lg text-muted">?</span>
              Agência genérica
            </h3>
            <ul className="mt-6 grid gap-4">
              {generic.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[15.5px]">
                  <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-danger-soft text-danger">
                    <X size={13} strokeWidth={3} />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="h-full">
          <div className="relative h-full rounded-[28px] bg-night p-[clamp(24px,3vw,38px)] shadow-[0_40px_70px_-40px_rgba(10,15,28,0.9)]">
            <span className="absolute -top-3.5 right-6 rounded-full bg-caramel px-3 py-1.5 text-[12px] font-bold text-ink">
              Lagos Assessoria
            </span>
            <h3 className="flex items-center gap-3 text-[1.35rem] font-semibold tracking-[-0.03em] text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-lagos text-white">
                <LagosMark className="h-[17px] w-6" />
              </span>
              Lagos
            </h3>
            <ul className="mt-6 grid gap-4">
              {lagos.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[15.5px] font-medium text-white">
                  <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-caramel text-ink">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </PaperSection>
  );
}
