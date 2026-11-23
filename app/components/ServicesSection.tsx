import { CtaButton } from "./ui/CtaButton";
import { Reveal } from "./ui/Reveal";
import { PaperSection } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const services = [
  {
    title: "Tráfego pago local",
    text: "Google Ads e Meta Ads com raio definido por bairro, para quem procura banho e tosa, ração ou veterinário perto de você agora.",
    chips: ["Google Ads", "Meta Ads", "Raio por bairro", "Campanha para dias fracos"],
  },
  {
    title: "Perfil da Empresa no Google",
    text: "Fotos, horário, serviços, posts e estratégia de avaliações para aparecer no “pet shop perto de mim” e no mapa.",
    chips: ["Google Maps", "Avaliações", "Busca local"],
  },
  {
    title: "WhatsApp que agenda",
    text: "Roteiro de atendimento, respostas rápidas e mensagens prontas para o tutor sair da conversa com horário marcado.",
    chips: ["Roteiro de atendimento", "Respostas rápidas", "Confirmação e lembrete"],
  },
  {
    title: "Recorrência e retorno",
    text: "Lembrete de banho no intervalo certo, pacote mensal e reativação de quem sumiu. O tutor que já conhece você é o cliente mais barato que existe.",
    chips: ["Lembrete de retorno", "Pacotes", "Reativação de base"],
  },
  {
    title: "Criativos e redes sociais",
    text: "Conteúdo com os pets da casa, antes e depois, bastidores e prova social. Post que gera confiança e contato, não só curtida.",
    chips: ["Vídeo curto", "Antes e depois", "Instagram"],
  },
  {
    title: "Painel e reunião semanal",
    text: "Investimento, contatos, agendamentos e custo por cliente num painel ao vivo, com acompanhamento toda semana e pauta clara.",
    chips: ["Painel ao vivo", "Funil no CRM", "Reunião com pauta"],
  },
];

export function ServicesSection() {
  return (
    <PaperSection id="servicos">
      <SectionHeading
        tone="light"
        eyebrow="O que entregamos"
        title="Tudo o que o seu negócio pet precisa para crescer, num time só."
        subtitle="Você não contrata um serviço solto. Coloca especialistas dentro da operação, sem o custo de montar uma equipe de marketing."
      />

      <div className="border-t border-line-strong">
        {services.map((s, i) => (
          <Reveal key={s.title}>
            <article className="group grid gap-4 border-b border-line-strong py-8 md:grid-cols-[72px_1fr_1.1fr] md:gap-8 md:py-10">
              <span className="font-mono text-[13px] text-caramel-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink transition-colors group-hover:text-lagos-600">
                {s.title}
              </h3>
              <div>
                <p className="text-[15.5px] leading-relaxed">{s.text}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.chips.map((c) => (
                    <span key={c} className="rounded-full border border-line-strong bg-card px-3 py-1.5 text-[12.5px] font-semibold text-body">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <CtaButton form="servicos" variant="ink">
          Quero esse time no meu negócio
        </CtaButton>
      </Reveal>
    </PaperSection>
  );
}
