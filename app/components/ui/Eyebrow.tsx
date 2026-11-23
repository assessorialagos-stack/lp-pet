import { PawPrint } from "lucide-react";
import { cn } from "@/app/lib/cn";

/**
 * Rótulo acima dos títulos de seção: patinha + texto.
 * `tone="dark"` (padrão) para fundo escuro, `tone="light"` para os blocos claros.
 */
export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[13.5px] font-semibold leading-none tracking-[0.01em]",
        tone === "dark" ? "text-caramel" : "text-lagos-600",
        className,
      )}
    >
      <PawPrint size={15} strokeWidth={2.2} aria-hidden />
      {children}
    </span>
  );
}
