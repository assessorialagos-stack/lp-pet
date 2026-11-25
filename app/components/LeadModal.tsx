"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LoaderCircle, ShieldCheck, X } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { whatsappLink } from "@/app/lib/contact";
import { newEventId, trackPixel } from "@/app/lib/metaPixel";
import { useMounted } from "@/app/lib/useMounted";
import { Eyebrow } from "./ui/Eyebrow";

// ── Contexto: qualquer botão da página abre o formulário ─────────────────────
// `origem` diz qual CTA foi clicado (hero, faixa, rodapé...) e vai junto no
// e-mail do lead, para sabermos qual chamada converte mais.

type LeadModalContext = { open: (origem: string) => void };

const Ctx = createContext<LeadModalContext | null>(null);

export function useLeadModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLeadModal precisa estar dentro de <LeadModalProvider>.");
  return ctx;
}

type LenisLike = { stop: () => void; start: () => void };
const getLenis = () => (window as unknown as { lenis?: LenisLike }).lenis;

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [origem, setOrigem] = useState<string | null>(null);
  const mounted = useMounted();

  const open = useCallback((o: string) => setOrigem(o), []);
  const close = useCallback(() => setOrigem(null), []);
  const value = useMemo(() => ({ open }), [open]);

  // Trava a rolagem da página enquanto o formulário está aberto.
  useEffect(() => {
    if (origem === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [origem, close]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {origem !== null && <LeadDialog key="lead" origem={origem} onClose={close} />}
          </AnimatePresence>,
          document.body,
        )}
    </Ctx.Provider>
  );
}

// ── Formulário ───────────────────────────────────────────────────────────────

type LeadData = {
  nome: string;
  negocio: string;
  cidade: string;
  tipo: string;
  faturamento: string;
  objetivo: string;
  investimento: string;
};

const empty: LeadData = {
  nome: "",
  negocio: "",
  cidade: "",
  tipo: "",
  faturamento: "",
  objetivo: "",
  investimento: "",
};

const TIPOS = [
  "Pet shop",
  "Banho e tosa",
  "Pet shop com clínica",
  "Clínica veterinária",
  "Hotel ou creche pet",
  "Outro negócio pet",
];
const FATURAMENTOS = [
  "Até R$ 20 mil",
  "R$ 20 mil a R$ 50 mil",
  "R$ 50 mil a R$ 100 mil",
  "R$ 100 mil a R$ 300 mil",
  "Acima de R$ 300 mil",
];
const OBJETIVOS = ["Encher a agenda", "Fazer o tutor voltar", "Aparecer no Google", "Organizar o WhatsApp"];
const INVESTIMENTOS = ["Sim", "Não", "Quero entender melhor"];

const fieldOrder: (keyof LeadData)[] = [
  "nome",
  "negocio",
  "cidade",
  "tipo",
  "faturamento",
  "objetivo",
  "investimento",
];

// Texto da pergunta de investimento (formulário, WhatsApp e e-mail usam o mesmo valor).
const INVESTIMENTO_MIN = "R$ 2.500";

function buildTracking() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    pagina_origem: window.location.pathname,
    pagina_url: window.location.href,
    data_hora: new Date().toISOString(),
  };
}

// Mensagem que abre no WhatsApp já preenchida com as respostas.
function buildWhatsAppMessage(d: LeadData) {
  return [
    "Olá! Quero um diagnóstico gratuito para o meu negócio pet.",
    "",
    `*Nome:* ${d.nome}`,
    `*Negócio:* ${d.negocio}`,
    `*Cidade:* ${d.cidade}`,
    `*Tipo de negócio:* ${d.tipo}`,
    `*Faturamento mensal:* ${d.faturamento}`,
    `*Objetivo:* ${d.objetivo}`,
    `*Consegue investir a partir de ${INVESTIMENTO_MIN}/mês:* ${d.investimento}`,
  ].join("\n");
}

const inputCls =
  "w-full appearance-none rounded-xl border-[1.5px] border-line bg-paper px-3.5 py-3 text-[15.5px] text-ink placeholder:text-muted transition focus:border-lagos focus:bg-card focus:outline-none focus:ring-4 focus:ring-lagos/10";
const errCls = "border-danger bg-danger-soft";
const labelCls = "text-[13.5px] font-semibold text-ink";

function LeadDialog({ origem, onClose }: { origem: string; onClose: () => void }) {
  const [data, setData] = useState<LeadData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [honey, setHoney] = useState("");
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => firstRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  const set = (name: keyof LeadData, value: string) => {
    setData((d) => ({ ...d, [name]: value }));
    setErrors((e) => ({ ...e, [name]: false }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const next: Partial<Record<keyof LeadData, boolean>> = {};
    for (const k of fieldOrder) {
      if (!data[k].trim()) next[k] = true;
    }
    setErrors(next);
    const firstErr = fieldOrder.find((k) => next[k]);
    if (firstErr) {
      document.querySelector<HTMLElement>(`[data-field="${firstErr}"] input, [data-field="${firstErr}"] select`)?.focus();
      return;
    }

    setSubmitting(true);
    const tracking = buildTracking();

    // Lead no pixel (navegador). O servidor manda o mesmo evento pela API de
    // Conversões com este event_id, e a Meta conta uma vez só.
    const eventId = newEventId();
    if (!honey) trackPixel("Lead", eventId);

    // 1) Servidor: e-mail do lead (FormSubmit) + API de Conversões.
    //    Com limite de tempo, para nunca travar a ida ao WhatsApp.
    try {
      const ctrl = new AbortController();
      const timer = window.setTimeout(() => ctrl.abort(), 6000);
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...tracking, cta: origem, event_id: eventId, _honey: honey }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
    } catch (err) {
      console.warn("Falha ao falar com /api/lead:", err);
    }

    // 2) WhatsApp com a mensagem pronta. Mesmo que o e-mail falhe, o lead chega inteiro por aqui.
    window.location.href = whatsappLink(buildWhatsAppMessage(data));
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <motion.div
        className="absolute inset-0 bg-night/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        data-lenis-prevent
        className="relative max-h-[94vh] w-full overflow-y-auto rounded-t-[28px] bg-card shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] sm:max-h-[calc(100vh-40px)] sm:w-[min(580px,100%)] sm:rounded-[28px]"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.2, 0.9, 0.3, 1.1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 grid h-[38px] w-[38px] place-items-center rounded-full border border-line bg-card text-body transition hover:bg-paper"
        >
          <X size={16} />
        </button>

        <div className="px-[22px] pt-6 sm:px-[30px] sm:pt-7">
          <Eyebrow tone="light" className="mb-3.5">
            Diagnóstico gratuito
          </Eyebrow>
          <h3 id="lead-title" className="display text-[clamp(1.6rem,3.2vw,2rem)] text-ink">
            Vamos entender o seu negócio pet
          </h3>
          <p className="mt-2 text-[15px] text-body">
            Leva menos de 1 minuto. Ao enviar, você fala na hora com o nosso time no WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="grid gap-3.5 px-[22px] pb-[26px] pt-[18px] sm:px-[30px] sm:pb-[30px] sm:pt-[22px]">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1.5" data-field="nome">
              <label htmlFor="f-nome" className={labelCls}>
                Nome completo <span className="text-caramel-600">*</span>
              </label>
              <input
                ref={firstRef}
                id="f-nome"
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                value={data.nome}
                onChange={(e) => set("nome", e.target.value)}
                className={cn(inputCls, errors.nome && errCls)}
              />
            </div>
            <div className="grid gap-1.5" data-field="negocio">
              <label htmlFor="f-negocio" className={labelCls}>
                Nome ou @ do negócio <span className="text-caramel-600">*</span>
              </label>
              <input
                id="f-negocio"
                placeholder="@meupetshop"
                value={data.negocio}
                onChange={(e) => set("negocio", e.target.value)}
                className={cn(inputCls, errors.negocio && errCls)}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1.5" data-field="cidade">
              <label htmlFor="f-cidade" className={labelCls}>
                Cidade e estado <span className="text-caramel-600">*</span>
              </label>
              <input
                id="f-cidade"
                autoComplete="address-level2"
                placeholder="Curitiba, PR"
                value={data.cidade}
                onChange={(e) => set("cidade", e.target.value)}
                className={cn(inputCls, errors.cidade && errCls)}
              />
            </div>
            <Select id="f-tipo" label="Tipo de negócio" name="tipo" options={TIPOS} value={data.tipo} error={errors.tipo} onChange={set} />
          </div>

          <Select id="f-fat" label="Faturamento mensal" name="faturamento" options={FATURAMENTOS} value={data.faturamento} error={errors.faturamento} onChange={set} />

          <Options label="Principal objetivo agora" name="objetivo" options={OBJETIVOS} value={data.objetivo} error={errors.objetivo} onChange={set} />
          <Options
            label={`Você consegue investir a partir de ${INVESTIMENTO_MIN}/mês?`}
            name="investimento"
            options={INVESTIMENTOS}
            value={data.investimento}
            error={errors.investimento}
            onChange={set}
          />

          {/* Honeypot do FormSubmit (_honey): invisível para gente, visível para robô. */}
          <input
            type="text"
            name="_honey"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: "none" }}
          />

          {hasErrors && (
            <p role="alert" className="rounded-[10px] border border-[#F7CFD0] bg-[#FFF2F2] px-3 py-2.5 text-[13.5px] font-semibold text-[#C93035]">
              Preencha os campos destacados para continuar.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1.5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-caramel px-6 py-[18px] text-base font-semibold text-ink shadow-caramel transition hover:-translate-y-0.5 hover:bg-caramel-300 disabled:translate-y-0 disabled:opacity-70"
          >
            {submitting ? (
              <>
                <LoaderCircle size={18} className="animate-spin" /> Abrindo o WhatsApp...
              </>
            ) : (
              <>
                Solicitar diagnóstico <ArrowRight size={18} />
              </>
            )}
          </button>
          <p className="flex items-center justify-center gap-2 text-center text-[12.5px] text-muted">
            <ShieldCheck size={14} className="shrink-0" /> Seus dados ficam só com a Lagos. Sem spam.
          </p>
        </form>
      </motion.div>
    </div>
  );
}

function Select({
  id,
  label,
  name,
  options,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  name: keyof LeadData;
  options: string[];
  value: string;
  error?: boolean;
  onChange: (name: keyof LeadData, value: string) => void;
}) {
  return (
    <div className="grid gap-1.5" data-field={name}>
      <label htmlFor={id} className={labelCls}>
        {label} <span className="text-caramel-600">*</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={cn(
          inputCls,
          "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2380859A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[length:18px] bg-[position:right_12px_center] bg-no-repeat pr-10",
          error && errCls,
        )}
      >
        <option value="">Selecione</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Options({
  label,
  name,
  options,
  value,
  error,
  onChange,
}: {
  label: string;
  name: keyof LeadData;
  options: string[];
  value: string;
  error?: boolean;
  onChange: (name: keyof LeadData, value: string) => void;
}) {
  return (
    <fieldset className="grid gap-2" data-field={name}>
      <legend className={cn(labelCls, "mb-2")}>
        {label} <span className="text-caramel-600">*</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(name, o)}
              className="peer absolute opacity-0"
            />
            <span
              className={cn(
                "inline-block rounded-full border-[1.5px] border-line bg-paper px-3.5 py-2 text-sm font-medium text-body transition",
                "peer-checked:border-lagos peer-checked:bg-lagos-50 peer-checked:font-semibold peer-checked:text-lagos-600",
                "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lagos-300",
                error && "border-[#F2B8BA]",
              )}
            >
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
