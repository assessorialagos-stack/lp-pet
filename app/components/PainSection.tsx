import { CtaButton } from "./ui/CtaButton";
import { Reveal } from "./ui/Reveal";
import { PaperSection } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const pains = [
  {
    title: "Tutor pergunta o preço e some",
    text: "Orçamento respondido no fim do dia é horário marcado no concorrente. Sem roteiro no WhatsApp, o contato esfria antes de virar agendamento.",
  },
  {
    title: "Sábado lotado, terça vazia",
    text: "A equipe fica parada no meio da semana e corre no fim de semana. Sem campanha para os dias fracos, a agenda nunca equilibra.",
  },
  {
    title: "O tutor toma um banho e não volta",
    text: "O certo seria a cada 15 ou 30 dias. Sem lembrete e sem pacote, vira um banho a cada três meses, quando o pelo já está embolado.",
  },
  {
    title: "Anúncio para a cidade inteira",
    text: "Clique de quem mora a 20 km e nunca vai trazer o cachorro. Negócio local precisa de anúncio com raio, horário e serviço certos.",
  },
  {
    title: "Invisível no “pet shop perto de mim”",
    text: "Perfil do Google com foto antiga, horário errado e poucas avaliações. Quem procura agora escolhe o primeiro do mapa.",
  },
  {
    title: "Tudo depende da indicação",
    text: "Tem mês bom e mês ruim, e ninguém sabe explicar por quê. Sem número, cada decisão de marketing vira aposta.",
  },
];

export function PainSection() {
  return (
    <PaperSection id="diagnostico">
      <SectionHeading
        tone="light"
        eyebrow="O que trava o crescimento"
        title="Seu negócio atende bem. Mas a agenda ainda tem buraco."
        subtitle="Banho e tosa cheio num dia e vazio no outro, tutor que some depois do primeiro atendimento, WhatsApp cheio de orçamento que não vira horário. A causa quase nunca é uma só."
      />

      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {pains.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.06}>
            <article>
              <span className="inline-grid h-8 min-w-[42px] place-items-center rounded-full bg-ink px-3 font-mono text-[12px] font-medium text-caramel">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[1.4rem] font-semibold leading-tight tracking-[-0.03em] text-ink">{p.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed">{p.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-[clamp(48px,6vw,72px)]">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-ink px-7 py-7 sm:px-9 md:flex-row md:items-center">
          <p className="max-w-[720px] text-[clamp(1.02rem,1.5vw,1.2rem)] leading-relaxed text-night-text">
            <b className="text-white">O problema quase nunca é só o anúncio.</b> A agenda trava no elo mais fraco: atrair,
            atender ou fazer voltar. É por ele que a gente começa.
          </p>
          <CtaButton form="dor">Encontrar o meu elo fraco</CtaButton>
        </div>
      </Reveal>
    </PaperSection>
  );
}
