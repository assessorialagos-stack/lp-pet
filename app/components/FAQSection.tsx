import { whatsappLink } from "@/app/lib/contact";
import { PRICE_FROM, WA_MESSAGE } from "@/app/lib/site";
import { CtaButton } from "./ui/CtaButton";
import { Eyebrow } from "./ui/Eyebrow";
import { FaqAccordion, type FaqItem } from "./ui/FaqAccordion";
import { Reveal } from "./ui/Reveal";
import { PaperSection } from "./ui/Section";

const faq: FaqItem[] = [
  {
    q: "Qual o investimento para ser cliente?",
    a: (
      <p>
        Os planos de assessoria começam em {PRICE_FROM} por mês. A verba de anúncios é separada, vai direto para as
        plataformas e é definida junto com você no diagnóstico, de acordo com a sua região e a sua meta.
      </p>
    ),
  },
  {
    q: "Vocês atendem só pet shop ou clínica veterinária também?",
    a: (
      <p>
        Atendemos pet shop, banho e tosa, clínica veterinária, hotel, creche e adestramento. A estratégia muda de um para o
        outro: banho e tosa pede recorrência, clínica pede confiança e lembrete de vacina, hotel pede ocupação fora do
        feriado.
      </p>
    ),
  },
  {
    q: "Meu pet shop é pequeno, de bairro. Funciona?",
    a: (
      <p>
        Funciona, e é justamente onde anúncio com raio certo faz mais diferença. O que define se vale a pena agora é a relação
        entre verba, ticket e capacidade da sua equipe. Isso a gente avalia no diagnóstico e fala com clareza.
      </p>
    ),
  },
  {
    q: "Em quanto tempo começo a ver resultado?",
    a: (
      <p>
        O primeiro mês é de estrutura e validação: Perfil do Google, rastreamento, roteiro de WhatsApp e primeiras campanhas.
        Os primeiros contatos costumam aparecer nas primeiras semanas de anúncio no ar. O ritmo de crescimento depende da
        verba, da região e da velocidade de execução dos dois lados.
      </p>
    ),
  },
  {
    q: "Quem responde o WhatsApp dos tutores?",
    a: (
      <p>
        A sua equipe, que conhece os pets e a agenda. A Lagos entrega o roteiro de atendimento, as respostas prontas e
        acompanha os números da conversa até o agendamento, para ninguém perder tutor no meio do caminho.
      </p>
    ),
  },
  {
    q: "Preciso aparecer em vídeo?",
    a: (
      <p>
        Não é obrigatório, mas ajuda muito. Bastidores do banho, antes e depois e a equipe cuidando dos pets são o conteúdo
        que mais gera confiança. A gente orienta o que gravar e transforma em anúncio e post.
      </p>
    ),
  },
  {
    q: "Vocês dão garantia de resultado?",
    a: (
      <p>
        Não prometemos número sem conhecer a operação. O que garantimos é método, execução e transparência total. E se a sua
        verba ou a sua estrutura não sustentarem a meta, a gente fala isso antes de assinar, não depois.
      </p>
    ),
  },
  {
    q: "Tem contrato de fidelidade?",
    a: <p>As condições de contrato são apresentadas no diagnóstico, de forma transparente, antes de qualquer assinatura.</p>,
  },
  {
    q: "Como faço para começar?",
    a: (
      <p>
        Clique em qualquer botão da página e preencha o diagnóstico. Ao enviar, você fala na hora com o nosso time no
        WhatsApp.
      </p>
    ),
  },
];

export function FAQSection() {
  return (
    <PaperSection id="faq">
      <div className="grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-[110px]">
          <Reveal className="mb-5">
            <Eyebrow tone="light">Dúvidas</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2.1rem,4.2vw,3.4rem)] text-ink">Perguntas frequentes</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[16px] leading-relaxed">Sem meias palavras. Respostas diretas sobre como a gente trabalha.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 rounded-[24px] bg-ink p-6">
              <b className="block font-display text-[1.15rem] tracking-[-0.02em] text-white">Ficou alguma dúvida?</b>
              <p className="mb-5 mt-1.5 text-[15px] text-night-text">Chama no WhatsApp e fale direto com o nosso time.</p>
              <CtaButton href={whatsappLink(WA_MESSAGE)} variant="whatsapp" size="sm" icon="whatsapp">
                Falar no WhatsApp
              </CtaButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <FaqAccordion items={faq} />
        </Reveal>
      </div>
    </PaperSection>
  );
}
