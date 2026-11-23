import { cn } from "@/app/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/**
 * Cabeçalho de seção.
 * - `layout="split"` (padrão): título grande à esquerda e apoio à direita,
 *   alinhado pela base (como nas referências).
 * - `layout="center"`: tudo centralizado.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  layout = "split",
  tone = "dark",
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  layout?: "split" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const titleCls = cn(
    "display text-[clamp(2.15rem,4.6vw,3.7rem)]",
    dark ? "text-white" : "text-ink",
  );
  const subCls = cn("text-[clamp(1.02rem,1.4vw,1.14rem)] leading-relaxed", dark ? "text-night-text" : "text-body");

  if (layout === "center") {
    return (
      <div className={cn("mx-auto mb-[clamp(40px,5vw,64px)] max-w-[800px] text-center", className)}>
        {eyebrow && (
          <Reveal className="mb-5">
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 className={titleCls}>{title}</h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.12}>
            <p className={cn(subCls, "mx-auto mt-5 max-w-[640px]")}>{subtitle}</p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-[clamp(40px,5vw,72px)] grid items-end gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <Reveal className="mb-5">
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 className={titleCls}>{title}</h2>
        </Reveal>
      </div>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className={cn(subCls, "lg:pb-2")}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
