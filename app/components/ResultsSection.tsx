/* eslint-disable @next/next/no-img-element */
import { MonitorCheck } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { CtaButton } from "./ui/CtaButton";
import { Reveal } from "./ui/Reveal";
import { NightSection } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { ZoomImage } from "./ui/ZoomImage";

const stats = [
  { value: "< 5h", label: "para a primeira resposta" },
  { value: "7 frentes", label: "integradas em um só time" },
  { value: "1 nome", label: "responsável pela sua conta" },
  { value: "Brasil", label: "atendimento 100% online" },
];

// Cases reais de clientes Lagos (mesmos das outras páginas). Quando houver case
// do mercado pet, troque aqui: imagem em public/cases e os números do painel.
const cases = [
  {
    img: "/cases/case-1.png",
    alt: "Painel da Meta: 345 conversas iniciadas a R$ 0,97 cada, R$ 333,44 investidos, custo 71% menor que anúncios semelhantes",
    seg: "Acessórios · Semijoias",
    num: "R$ 0,97",
    lbl: "por conversa no WhatsApp",
    chips: ["R$ 333 investidos", "345 conversas", "71% abaixo do mercado"],
    text: "Primeiro mês de teste de uma loja que fecha a venda no WhatsApp, igual ao balcão de um pet shop. Custo por conversa 71% menor que o de anúncios semelhantes, segundo a própria Meta.",
    src: "Gerenciador de Anúncios da Meta",
  },
  {
    img: "/cases/case-3.png",
    alt: "Painel do Gerenciador de Anúncios da Meta: 97 vendas no site, ROAS 14,2x, R$ 2.542,03 investidos",
    seg: "Moda · Venda no site",
    num: "14,2x",
    lbl: "de retorno sobre o anúncio em 30 dias",
    chips: ["R$ 2.542 investidos", "97 vendas", "≈ R$ 36 mil atribuídos"],
    text: "Cada R$ 1 investido em anúncio voltou R$ 14,20 em vendas no período.",
    src: "Gerenciador de Anúncios da Meta",
  },
  {
    img: "/cases/case-2.png",
    alt: "Painel da loja: 8.381 visitas únicas, 23 vendas, faturamento de R$ 35.067,22 e ticket médio de R$ 1.524,66 na semana",
    seg: "Tecnologia · Ticket alto",
    num: "R$ 35 mil",
    lbl: "em vendas numa única semana",
    chips: ["23 pedidos", "Ticket médio R$ 1.524", "8.381 visitas"],
    text: "Operação onde cada venda pede confiança. Faturamento de R$ 35.067 em uma semana.",
    src: "Painel da plataforma do cliente",
    pos: "center top",
  },
];

const talks = [
  { img: "/depoimentos/conversa-3.jpg", alt: "Cliente no WhatsApp: fomos surpreendidos positivamente, trabalho começou com o pé direito" },
  { img: "/depoimentos/conversa-1.jpg", alt: "Cliente no WhatsApp comemorando conversão de quase 50% no funil" },
  { img: "/depoimentos/conversa-2.jpg", alt: "Cliente no WhatsApp: os resultados estão aparecendo" },
];

export function ResultsSection() {
  return (
    <NightSection id="resultados">
      <SectionHeading
        eyebrow="Resultados"
        title="Operações reais, com contexto."
        subtitle="Números tirados dos painéis dos próprios clientes da Lagos, com investimento, período e fonte. Número solto não diz nada sobre o seu negócio."
      />

      <div className="mb-[clamp(40px,5vw,64px)] grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05} className="h-full">
            <div
              className={cn(
                "flex h-full flex-col justify-between rounded-[24px] border p-5 sm:p-6",
                i === 0 ? "border-caramel bg-caramel text-ink" : "border-night-line bg-night-2",
              )}
            >
              <b className={cn("display text-[clamp(1.8rem,3.4vw,2.7rem)]", i === 0 ? "text-ink" : "text-white")}>{s.value}</b>
              <span className={cn("mt-6 block text-[14px]", i === 0 ? "text-ink/75" : "text-night-text")}>{s.label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal key={c.num} delay={i * 0.07} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-[26px] border border-night-line bg-night-2 transition duration-300 hover:-translate-y-1 hover:border-lagos-300/30">
              <ZoomImage src={c.img} alt={c.alt} label={`Ampliar painel: ${c.seg}`} className="relative block aspect-[16/9] w-full overflow-hidden bg-white">
                <img src={c.img} alt={c.alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: c.pos ?? "left top" }} />
                <span className="absolute bottom-2.5 right-2.5 rounded-lg bg-night/80 px-2 py-1 text-[11.5px] font-semibold text-white">Ver painel</span>
              </ZoomImage>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-caramel">{c.seg}</span>
                <div className="display mt-3 text-[clamp(2.4rem,4vw,3.1rem)] text-white">{c.num}</div>
                <div className="mt-1.5 font-medium text-white">{c.lbl}</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.chips.map((ch) => (
                    <span key={ch} className="rounded-full border border-night-line bg-night-3 px-2.5 py-1 text-[12px] font-semibold text-[#C9CCDA]">
                      {ch}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed">{c.text}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-[12px] text-night-muted">
                  <MonitorCheck size={14} /> Fonte: {c.src}
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mx-auto mt-7 max-w-[760px] text-center text-[14px] text-night-muted">
          Cases de clientes Lagos em outros segmentos. Resultado depende de oferta, região, verba e execução dos dois lados,
          por isso o diagnóstico vem antes de qualquer promessa.
        </p>
      </Reveal>

      {/* Conversas reais */}
      <div className="mt-[clamp(64px,8vw,104px)]">
        <SectionHeading
          layout="center"
          eyebrow="Prova social"
          title="Conversas reais com clientes"
          subtitle="Prints dos grupos de atendimento, do jeito que chegam. Toque para ampliar."
        />
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 md:mx-auto md:grid md:max-w-[980px] md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {talks.map((t, i) => (
            <Reveal key={t.img} delay={i * 0.08} className="w-[74%] shrink-0 snap-center md:w-auto">
              <ZoomImage
                src={t.img}
                alt={t.alt}
                label="Ampliar conversa com cliente"
                className="relative block w-full rounded-[34px] bg-[#05070D] p-2 shadow-float ring-1 ring-white/10 transition duration-300 hover:-translate-y-1.5 hover:-rotate-[0.6deg]"
              >
                <span className="absolute left-1/2 top-4 z-[2] h-1.5 w-[70px] -translate-x-1/2 rounded-full bg-[#1E2130]" />
                <span className="block aspect-[9/16] overflow-hidden rounded-[26px] bg-[#111]">
                  <img src={t.img} alt={t.alt} loading="lazy" className="h-full w-full object-cover object-top" />
                </span>
              </ZoomImage>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex justify-center">
          <CtaButton form="depoimentos">Quero resultados assim no meu negócio</CtaButton>
        </Reveal>
      </div>
    </NightSection>
  );
}
