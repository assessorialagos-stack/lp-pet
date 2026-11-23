import { cn } from "@/app/lib/cn";

/** Símbolo da Lagos (duas ondas), em vetor. A cor vem de `text-*`. */
export function LagosMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" fill="currentColor" className={className} aria-hidden>
      <path d="M2 8.5c5 6.3 13 6.6 20 1.6 5-3.6 9.6-5 15.5-3.6-6-.6-10.3 2-14.4 5.8C15.4 18.9 6.6 17 2 8.5Z" />
      <path d="M2 17.5c5 6.3 13 6.6 20 1.6 5-3.6 9.6-5 15.5-3.6-6-.6-10.3 2-14.4 5.8C15.4 27.9 6.6 26 2 17.5Z" />
    </svg>
  );
}

/** Logo completo: símbolo + LAGOS + linha de apoio "Assessoria pet". */
export function LagosLogo({ tone = "dark", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LagosMark className="h-[26px] w-[37px] text-lagos" />
      <span className="leading-none">
        <b
          className={cn(
            "block font-display text-[18px] font-extrabold tracking-[0.14em]",
            tone === "dark" ? "text-white" : "text-ink",
          )}
        >
          LAGOS
        </b>
        <small
          className={cn(
            "mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] max-[380px]:hidden",
            tone === "dark" ? "text-caramel" : "text-caramel-600",
          )}
        >
          Assessoria pet
        </small>
      </span>
    </span>
  );
}
