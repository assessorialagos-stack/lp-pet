import { cn } from "@/app/lib/cn";
import { CtaButton } from "./ui/CtaButton";
import { Reveal } from "./ui/Reveal";
import { NightSection } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const steps = [
  { n: "00", k: "O alicerce", title: "Oferta", text: "Serviço carro-chefe, pacotes e preço que fazem sentido antes de qualquer anúncio." },
  { n: "01", k: "Alcance", title: "Descoberta", text: "Google e Meta no raio do seu bairro, para quem procura banho, tosa, ração ou veterinário." },
  { n: "02", k: "Atendimento", title: "Conversa", text: "Roteiro e respostas rápidas no WhatsApp para o orçamento não esfriar." },
  { n: "03", k: "Decisão", title: "Agendamento", text: "Horário marcado, lembrete na véspera e menos falta na agenda." },
  { n: "04", k: "Recorrência", title: "Retorno", text: "Lembrete no intervalo certo, pacote mensal e reativação de quem sumiu." },
];

export function MethodSection() {
  return (
    <NightSection id="metodo">
      <SectionHeading
        eyebrow="Método Maré"
        title={
          <>
            Do primeiro clique ao <em className="font-semibold italic text-caramel">banho de todo mês.</em>
          </>
        }
        subtitle="A maioria das agências traz contato novo e para por aí. A Lagos monta a oferta, atrai o tutor certo, transforma a conversa em horário marcado e faz ele voltar."
      />

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => {
          const base = i === 0;
          return (
            <Reveal key={s.n} delay={i * 0.07} className={cn("h-full", base && "sm:col-span-2 lg:col-span-1")}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-[28px] border p-6 sm:min-h-[250px] lg:min-h-[320px]",
                  base ? "border-caramel bg-caramel text-ink" : "border-night-line bg-night-2",
                )}
              >
                <span className={cn("font-mono text-[12.5px]", base ? "text-ink/70" : "text-lagos-300")}>{s.n}</span>
                <div className="mt-auto pt-6 sm:pt-10">
                  <span
                    className={cn(
                      "text-[12px] font-bold uppercase tracking-[0.08em]",
                      base ? "text-ink/70" : "text-caramel",
                    )}
                  >
                    {s.k}
                  </span>
                  <h3
                    className={cn(
                      "mt-1.5 text-[1.65rem] font-semibold leading-none tracking-[-0.035em]",
                      base ? "text-ink" : "text-white",
                    )}
                  >
                    {s.title}
                  </h3>
                  <p className={cn("mt-3 text-[14.5px] leading-relaxed", base ? "text-ink/75" : "text-night-text")}>{s.text}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12 flex flex-col items-center gap-6 text-center">
        <p className="max-w-[780px] text-[clamp(1.02rem,1.5vw,1.18rem)] leading-relaxed text-night-text">
          Antes de aumentar a verba, a gente encontra o elo que trava a agenda.{" "}
          <b className="text-white">Plano bonito que a sua equipe não consegue rodar é pior que plano simples que roda.</b>
        </p>
        <CtaButton form="metodo" variant="white">
          Falar sobre o diagnóstico
        </CtaButton>
      </Reveal>
    </NightSection>
  );
}
