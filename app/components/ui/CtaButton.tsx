"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { smoothScrollTo } from "@/app/lib/scroll";
import { useLeadModal } from "../LeadModal";
import { WhatsAppIcon } from "./SocialIcons";

// Pílula com ícone dentro de um círculo à direita (estilo das referências).
const variants = {
  caramel: { btn: "bg-caramel text-ink shadow-caramel hover:bg-caramel-300", dot: "bg-ink text-caramel" },
  ink: { btn: "bg-ink text-white hover:bg-[#1A1C28]", dot: "bg-caramel text-ink" },
  lagos: { btn: "bg-lagos text-white hover:bg-lagos-600", dot: "bg-white text-lagos" },
  white: { btn: "bg-white text-ink hover:shadow-[0_14px_30px_-14px_rgba(0,0,0,0.55)]", dot: "bg-ink text-white" },
  whatsapp: { btn: "bg-whatsapp text-[#06301A] hover:bg-[#2BE070]", dot: "bg-[#06301A] text-whatsapp" },
  "outline-dark": { btn: "border border-white/20 bg-white/[0.04] text-white hover:border-white/45", dot: "" },
  "outline-light": { btn: "border border-line-strong bg-card text-ink hover:border-ink/40", dot: "" },
};

const sizes = {
  md: {
    withDot: "py-1.5 pl-6 pr-1.5 text-[15.5px] max-[380px]:pl-5 max-[380px]:text-[14px]",
    plain: "px-6 py-[15px] text-[15.5px] max-[380px]:px-5 max-[380px]:text-[14px]",
    dot: "h-10 w-10",
  },
  sm: { withDot: "py-1 pl-4 pr-1 text-[14px]", plain: "px-4 py-[11px] text-[14px]", dot: "h-8 w-8" },
};

type Common = {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Ícone no círculo da direita. `none` deixa o botão simples. */
  icon?: "arrow" | "whatsapp" | "none";
  className?: string;
};

type Props = Common & ({ form: string; href?: never } | { href: string; form?: never });

/**
 * Botão de chamada da página.
 * - `form="hero"` abre o formulário de diagnóstico (o valor identifica o CTA no lead).
 * - `href` vira link: âncoras (#...) rolam suave, links externos abrem em nova aba.
 */
export function CtaButton({ children, variant = "caramel", size = "md", icon = "arrow", className, ...rest }: Props) {
  const { open } = useLeadModal();
  const v = variants[variant];
  const s = sizes[size];
  const hasDot = icon !== "none" && v.dot !== "";

  const cls = cn(
    "group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full font-semibold leading-none tracking-[-0.01em] transition duration-200 hover:-translate-y-0.5",
    v.btn,
    hasDot ? s.withDot : s.plain,
    className,
  );

  const iconEl =
    icon === "none" ? null : hasDot ? (
      <span className={cn("grid shrink-0 place-items-center rounded-full", s.dot, v.dot)}>
        {icon === "whatsapp" ? (
          <WhatsAppIcon size={size === "sm" ? 16 : 19} />
        ) : (
          <ArrowRight size={size === "sm" ? 15 : 18} className="transition-transform group-hover:translate-x-[2px]" />
        )}
      </span>
    ) : icon === "whatsapp" ? (
      <WhatsAppIcon size={18} className="shrink-0 text-whatsapp" />
    ) : (
      <ArrowRight size={17} className="shrink-0 transition-transform group-hover:translate-x-[3px]" />
    );

  // Em botões simples (sem círculo) o ícone do WhatsApp vem antes do texto.
  const leading = !hasDot && icon === "whatsapp";

  if (rest.form) {
    const origem = rest.form;
    return (
      <button type="button" className={cls} onClick={() => open(origem)}>
        {leading && iconEl}
        {children}
        {!leading && iconEl}
      </button>
    );
  }

  const href = rest.href!;
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        if (href.startsWith("#")) {
          e.preventDefault();
          smoothScrollTo(href);
        }
      }}
    >
      {leading && iconEl}
      {children}
      {!leading && iconEl}
    </a>
  );
}
