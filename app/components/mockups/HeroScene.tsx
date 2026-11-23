"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BellRing, CalendarCheck, Check, CheckCheck, MapPin, PawPrint, Repeat, Search, Star } from "lucide-react";
import { cn } from "@/app/lib/cn";

/**
 * Cenário do topo, montado em código (sem foto de banco):
 * WhatsApp agendando banho e tosa no centro, agenda, Google e lembrete de
 * retorno flutuando em volta. Tudo ilustrativo.
 */
export function HeroScene() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#141C33_0%,#0D1326_100%)] sm:rounded-[40px]">
      {/* luzes de fundo */}
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-[-180px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(242,169,59,0.22),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(59,107,255,0.28),transparent)]" />
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,#000,transparent)]" />

      <div className="relative h-[690px] sm:h-[640px] lg:h-[600px]">
        {/* Celular (centro) */}
        <div className="absolute left-1/2 top-9 w-[272px] -translate-x-1/2 sm:top-12 sm:w-[300px]">
          <WhatsAppPhone />
        </div>

        {/* Desktop: agenda e Google à esquerda */}
        <div className="absolute left-[3.5%] top-14 hidden w-[330px] animate-bob lg:block xl:left-[6%]">
          <AgendaCard />
        </div>
        <div className="absolute bottom-12 left-[6%] hidden w-[290px] animate-bob [animation-delay:-3s] lg:block xl:left-[9%]">
          <GoogleCard />
        </div>

        {/* Desktop: pacote mensal embaixo à direita */}
        <div className="absolute bottom-12 right-[4%] hidden w-[290px] animate-bob [animation-delay:-2.2s] lg:block xl:right-[7%]">
          <PackageCard />
        </div>

        {/* Lembrete de retorno: à direita no desktop; no celular, compacto, na base do aparelho */}
        <div
          className={cn(
            "absolute z-[3] animate-bob [animation-delay:-1.5s]",
            "bottom-3 left-2.5 w-[206px] sm:bottom-10 sm:left-[5%] sm:w-[250px]",
            "lg:bottom-auto lg:left-auto lg:right-[3.5%] lg:top-[64px] lg:w-[300px] xl:right-[6%]",
          )}
        >
          <ReminderCard />
        </div>

        {/* Raio do anúncio: no celular fica sobre a parte vazia do cabeçalho da conversa */}
        <div
          className={cn(
            "absolute z-[3] animate-bob [animation-delay:-4.5s]",
            "right-2.5 top-[80px] sm:right-[5%] sm:top-[120px]",
            "lg:right-[9%] lg:top-[262px] xl:right-[12%]",
          )}
        >
          <RadiusChip />
        </div>

        <span className="absolute bottom-3.5 right-5 z-[4] text-[11px] font-medium text-night-muted">Ilustrativo</span>
      </div>
    </div>
  );
}

// ── WhatsApp ─────────────────────────────────────────────────────────────────

const messages: { from: "in" | "out"; text: string; time: string }[] = [
  { from: "in", text: "Oi! Quanto fica banho e tosa pro meu shih-tzu?", time: "09:12" },
  { from: "out", text: "Oi, Ana! Banho + tosa higiênica do Thor fica R$ 85. Tenho sábado às 10h ou às 14h. Qual prefere?", time: "09:13" },
  { from: "in", text: "Sábado às 10h, por favor!", time: "09:13" },
  { from: "out", text: "Agendado! Na sexta te mando um lembrete. Até sábado, Thor!", time: "09:14" },
];

function WhatsAppPhone() {
  // Mesmo `initial` no servidor e no navegador (ver nota no Reveal). Com
  // movimento reduzido as mensagens aparecem na hora, sem a sequência.
  const reduce = useReducedMotion();
  const shown = { opacity: 1, y: 0, scale: 1 };
  const appear = (i: number) => ({
    initial: { opacity: 0, y: 10, scale: 0.98 },
    ...(reduce
      ? { animate: shown, transition: { duration: 0 } }
      : {
          whileInView: shown,
          viewport: { once: true },
          transition: { duration: 0.45, delay: 0.5 + i * 0.75, ease: [0.16, 1, 0.3, 1] as const },
        }),
  });

  return (
    <div className="rounded-[44px] border border-white/10 bg-[#07090F] p-2.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
      <div className="relative overflow-hidden rounded-[36px] bg-[#EFEAE2]">
        {/* notch */}
        <span className="absolute left-1/2 top-2 z-[2] h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-[#07090F]" />

        {/* cabeçalho da conversa */}
        <div className="flex items-center gap-2.5 bg-[#0F4C44] px-4 pb-3 pt-10 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-caramel text-ink">
            <PawPrint size={17} strokeWidth={2.4} />
          </span>
          <span className="leading-tight">
            <b className="block text-[14px] font-semibold">Seu Pet Shop</b>
            <span className="text-[11.5px] text-white/70">online</span>
          </span>
        </div>

        {/* mensagens */}
        <div className="flex min-h-[440px] flex-col gap-2 bg-[radial-gradient(rgba(0,0,0,0.045)_1px,transparent_1px)] px-3 pb-24 pt-3.5 [background-size:14px_14px]">
          <span className="mx-auto mb-1 rounded-md bg-white/80 px-2 py-0.5 text-[10.5px] font-medium text-[#54656F]">HOJE</span>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              {...appear(i)}
              className={cn(
                "max-w-[84%] rounded-[14px] px-3 py-2 text-[12.5px] leading-snug text-[#111B21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]",
                m.from === "in" ? "self-start rounded-tl-[4px] bg-white" : "self-end rounded-tr-[4px] bg-[#D9FDD3]",
              )}
            >
              {m.text}
              <span className="ml-2 inline-flex translate-y-[3px] items-center gap-0.5 float-right text-[10px] text-[#667781]">
                {m.time}
                {m.from === "out" && <CheckCheck size={13} className="text-[#53BDEB]" />}
              </span>
            </motion.div>
          ))}
          <motion.div
            {...appear(messages.length)}
            className="mx-auto mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-caramel/60 bg-caramel-50 px-3 py-1.5 text-[11.5px] font-semibold text-ink"
          >
            <CalendarCheck size={13} className="text-caramel-600" />
            Agendamento confirmado · Sáb, 10:00
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Cards flutuantes ─────────────────────────────────────────────────────────

const slots: { time: string; pet: string; service: string; state?: "done" | "new" }[] = [
  { time: "08:00", pet: "Mel", service: "Banho", state: "done" },
  { time: "09:00", pet: "Bob", service: "Banho + hidratação", state: "done" },
  { time: "10:00", pet: "Thor", service: "Banho + tosa", state: "new" },
  { time: "11:00", pet: "Luna", service: "Tosa na tesoura" },
  { time: "14:00", pet: "Fred", service: "Banho" },
];

function AgendaCard() {
  return (
    <div className="rounded-[22px] border border-white/60 bg-card p-4 shadow-float">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-lagos-50 text-lagos">
            <CalendarCheck size={16} />
          </span>
          Agenda de sábado
        </span>
        <span className="rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-bold text-success">92% ocupada</span>
      </div>
      <div className="mt-3 grid gap-1.5">
        {slots.map((s) => (
          <div
            key={s.time}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-3 py-2 text-[12.5px]",
              s.state === "new" ? "border-caramel/70 bg-caramel-50" : "border-line",
            )}
          >
            <span className="font-mono text-[11.5px] text-muted">{s.time}</span>
            <span className={cn("min-w-0 flex-1 truncate", s.state === "done" ? "text-muted line-through decoration-line-strong" : "text-ink")}>
              <b className="font-semibold">{s.pet}</b> · {s.service}
            </span>
            {s.state === "new" && <span className="rounded-full bg-caramel px-2 py-0.5 text-[10.5px] font-bold text-ink">Novo</span>}
            {s.state === "done" && <Check size={14} className="text-success" />}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2.5 text-[11.5px] text-muted">
        Semana
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-2">
          <span className="block h-full w-[86%] rounded-full bg-lagos" />
        </span>
        86%
      </div>
    </div>
  );
}

function GoogleCard() {
  return (
    <div className="rounded-[20px] border border-white/60 bg-card p-3.5 shadow-float">
      <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-2 text-[12.5px] text-body">
        <Search size={14} className="text-muted" />
        pet shop perto de mim
      </div>
      <div className="mt-3 flex gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lagos text-white">
          <MapPin size={18} />
        </span>
        <div className="min-w-0 leading-tight">
          <b className="block text-[13.5px] text-ink">Seu Pet Shop</b>
          <span className="mt-1 flex items-center gap-1 text-[11.5px] text-body">
            4,9
            <span className="flex text-caramel">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            (128)
          </span>
          <span className="mt-0.5 block text-[11.5px] text-success">Aberto agora · 1,2 km</span>
        </div>
      </div>
    </div>
  );
}

function ReminderCard() {
  return (
    <div className="rounded-[20px] border border-white/60 bg-card p-3.5 shadow-float sm:p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success-soft text-success">
          <BellRing size={15} />
        </span>
        <b className="flex-1 text-[13px] text-ink">Lembrete de retorno</b>
        <span className="text-[10.5px] text-muted">agora</span>
      </div>
      <p className="mt-2 hidden text-[12px] leading-snug text-body sm:block">
        A Mel tomou banho há 28 dias. A tutora recebeu o convite para voltar.
      </p>
      <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-bold text-success">
        <Check size={12} strokeWidth={3} /> Reagendou para quinta, 15h
      </span>
    </div>
  );
}

function PackageCard() {
  return (
    <div className="rounded-[20px] border border-white/60 bg-card p-4 shadow-float">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-caramel-50 text-caramel-600">
          <Repeat size={15} />
        </span>
        <b className="flex-1 text-[13px] text-ink">Pacote mensal de banho</b>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-paper px-3 py-2">
          <small className="block text-[10.5px] text-muted">Tutores ativos</small>
          <b className="font-display text-[18px] tracking-[-0.02em] text-ink">37</b>
        </div>
        <div className="rounded-xl bg-paper px-3 py-2">
          <small className="block text-[10.5px] text-muted">Receita recorrente</small>
          <b className="whitespace-nowrap font-display text-[18px] tracking-[-0.02em] text-ink">R$ 6,3 mil</b>
        </div>
      </div>
      <span className="mt-2.5 block text-[11.5px] text-body">4 banhos por mês, pagos no início do mês</span>
    </div>
  );
}

function RadiusChip() {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-night-3/95 p-2 pr-3.5 shadow-float backdrop-blur-md sm:gap-3 sm:p-2.5 sm:pr-4">
      <svg viewBox="0 0 44 44" className="h-9 w-9 shrink-0 sm:h-11 sm:w-11" aria-hidden>
        <circle cx="22" cy="22" r="20" fill="rgba(59,107,255,0.12)" stroke="rgba(143,180,255,0.35)" />
        <circle cx="22" cy="22" r="13" fill="none" stroke="rgba(143,180,255,0.35)" strokeDasharray="2 3" />
        <circle cx="22" cy="22" r="6" fill="rgba(59,107,255,0.35)" />
        <circle cx="22" cy="22" r="3" fill="#F2A93B" />
      </svg>
      <span className="leading-tight">
        <b className="block text-[12.5px] text-white sm:text-[13px]">
          <span className="sm:hidden">Raio de 3 km</span>
          <span className="hidden sm:inline">Anúncio no raio de 3 km</span>
        </b>
        <span className="hidden text-[11.5px] text-night-muted sm:block">Google + Meta, só no seu bairro</span>
      </span>
    </div>
  );
}
