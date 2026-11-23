import { cn } from "@/app/lib/cn";

/** Largura padrão do conteúdo (1200px + respiro lateral). */
export const container = "relative mx-auto w-full max-w-[1200px] px-5";

/** Espaço vertical padrão das seções. */
export const sectionY = "py-[clamp(76px,9vw,128px)]";

/**
 * Seção escura (fundo da página). Vem com o brilho azul/caramelo nas bordas.
 */
export function NightSection({
  id,
  children,
  className,
  innerClassName,
  glow = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: boolean;
}) {
  return (
    <section id={id} className={cn("relative overflow-hidden", sectionY, className)}>
      {glow && <div aria-hidden className="bg-night-glow pointer-events-none absolute inset-0" />}
      <div className={cn(container, innerClassName)}>{children}</div>
    </section>
  );
}

/**
 * Bloco claro "folha de papel": cantos bem arredondados e recuado das bordas da
 * tela, apoiado sobre o fundo escuro (estrutura das referências).
 */
export function PaperSection({
  id,
  children,
  className,
  innerClassName,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-2.5 overflow-hidden rounded-[28px] bg-paper text-body sm:mx-4 sm:rounded-[44px]",
        sectionY,
        className,
      )}
    >
      <div className={cn(container, innerClassName)}>{children}</div>
    </section>
  );
}
