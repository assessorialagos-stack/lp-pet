import { CalendarClock, LayoutDashboard, Route } from "lucide-react";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { NightSection } from "./ui/Section";

const points = [
  { icon: LayoutDashboard, title: "Painel ao vivo", text: "Sem planilha bagunçada e sem achismo. Você abre e vê." },
  { icon: Route, title: "Origem de cada contato", text: "Rastreamento para saber qual campanha trouxe qual tutor até a sua agenda." },
  { icon: CalendarClock, title: "Rotina com pauta", text: "Acompanhamento semanal: o que funcionou, o que muda e quem faz." },
];

const kpis = [
  { label: "Investimento", value: "R$ 2,4 mil" },
  { label: "Conversas", value: "312" },
  { label: "Agendamentos", value: "148", delta: "+18% no mês" },
  { label: "Custo por agendamento", value: "R$ 16" },
];

const funnel = [
  { label: "Conversas no WhatsApp", value: 312, color: "#5B84FF" },
  { label: "Agendaram", value: 148, color: "#3B6BFF" },
  { label: "Compareceram", value: 131, color: "#2A52CC" },
  { label: "Voltaram em 30 dias", value: 74, color: "#F2A93B" },
];

export function DataSection() {
  const max = funnel[0].value;
  return (
    <NightSection id="dados">
      <div className="grid items-center gap-[clamp(40px,6vw,88px)] lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal className="mb-5">
            <Eyebrow>Transparência total</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2.1rem,4.2vw,3.4rem)] text-white">
              Você vê quantos tutores chegaram, agendaram e <span className="text-caramel">voltaram.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[clamp(1rem,1.35vw,1.1rem)] leading-relaxed">
              O funil vai até o fim: contato, agendamento, comparecimento e retorno, registrados no CRM. Decisão de verba em
              cima de número real, não de curtida.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5">
            {points.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={0.12 + i * 0.06}>
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-lagos-300/20 bg-lagos/15 text-lagos-300">
                      <Icon size={20} />
                    </span>
                    <div>
                      <b className="block text-[16.5px] tracking-[-0.01em] text-white">{p.title}</b>
                      <p className="mt-0.5 text-[15px]">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1} direction="left">
          <div className="relative overflow-hidden rounded-[28px] border border-night-line bg-night-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-2 border-b border-night-line bg-night-3 px-5 py-3.5">
              <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-2.5 text-[12.5px] font-medium text-night-muted">Painel Lagos · Seu pet shop</span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#7EE2A8]">
                <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-[#2FD07A] shadow-[0_0_0_4px_rgba(47,208,122,0.15)]" />
                Ao vivo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 p-5 sm:grid-cols-4">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-2xl border border-night-line bg-night-3 p-3">
                  <small className="block text-[11.5px] leading-tight text-night-muted">{k.label}</small>
                  <b className="mt-1 block whitespace-nowrap font-display text-[clamp(16px,1.7vw,21px)] tracking-[-0.02em] text-white tabular-nums">
                    {k.value}
                  </b>
                  {k.delta && <em className="text-[11px] font-semibold not-italic text-[#7EE2A8]">{k.delta}</em>}
                </div>
              ))}
            </div>

            <div className="px-5 pb-12">
              <div className="mb-3 flex items-center justify-between text-[12.5px] text-night-text">
                <span>Funil do mês</span>
                <b className="text-white">24% voltaram em 30 dias</b>
              </div>
              <div className="grid gap-2.5">
                {funnel.map((f) => (
                  <div key={f.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[150px_1fr_auto]">
                    <span className="truncate text-[12.5px] text-night-text">{f.label}</span>
                    <span className="order-3 col-span-2 h-2.5 overflow-hidden rounded-full bg-[#232A42] sm:order-none sm:col-span-1">
                      <span className="block h-full rounded-full" style={{ width: `${(f.value / max) * 100}%`, background: f.color }} />
                    </span>
                    <b className="text-right font-mono text-[12.5px] text-white tabular-nums">{f.value}</b>
                  </div>
                ))}
              </div>
            </div>
            <span className="absolute bottom-3.5 right-5 text-[11px] font-medium text-night-muted">Ilustrativo</span>
          </div>
        </Reveal>
      </div>
    </NightSection>
  );
}
