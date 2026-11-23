import { Dog, Scissors, Stethoscope, Store } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { CtaButton } from "./ui/CtaButton";
import { Reveal } from "./ui/Reveal";
import { NightSection } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const segments = [
  {
    icon: Scissors,
    title: "Banho e tosa",
    text: "Agenda cheia a semana inteira, não só no sábado. E o tutor voltando no intervalo certo, sem você precisar lembrar.",
  },
  {
    icon: Store,
    title: "Pet shop e ração",
    text: "Mais gente no balcão e no delivery. Giro de ração, petisco e acessório para quem mora perto da loja.",
  },
  {
    icon: Stethoscope,
    title: "Clínica veterinária",
    text: "Consulta, vacina e exame com o tutor da região. Lembrete de vacina e de retorno direto no WhatsApp.",
  },
  {
    icon: Dog,
    title: "Hotel, creche e adestramento",
    text: "Ocupação o ano todo, não só no feriado. Pacotes e planos mensais que viram receita recorrente.",
  },
];

export function AudienceSection() {
  return (
    <NightSection id="para-quem">
      <SectionHeading
        eyebrow="Para quem é"
        title={
          <>
            Feito para quem vive do <span className="text-caramel">mercado pet.</span>
          </>
        }
        subtitle="A estratégia muda de um negócio para o outro. O que não muda é o objetivo: mais tutores chegando, agendando e voltando."
      />

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {segments.map((s, i) => {
          const featured = i === 0;
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={i * 0.06} className="h-full">
              <article
                className={cn(
                  "flex h-full flex-col rounded-[28px] border p-6 transition duration-300 hover:-translate-y-1 sm:p-7",
                  featured ? "border-caramel bg-caramel text-ink" : "border-night-line bg-night-2 hover:border-white/20",
                )}
              >
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl",
                    featured ? "bg-ink text-caramel" : "bg-caramel/12 text-caramel",
                  )}
                >
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3
                  className={cn(
                    "mt-10 text-[1.45rem] font-semibold leading-tight tracking-[-0.03em]",
                    featured ? "text-ink" : "text-white",
                  )}
                >
                  {s.title}
                </h3>
                <p className={cn("mt-2.5 text-[15px] leading-relaxed", featured ? "text-ink/75" : "text-night-text")}>
                  {s.text}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
        <span className="text-[16px] text-white">Seu negócio se encaixa em um desses?</span>
        <CtaButton form="para-quem" variant="white">
          Fala com a gente
        </CtaButton>
      </Reveal>
    </NightSection>
  );
}
