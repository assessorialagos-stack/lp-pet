"use client";

import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { FOUNDER } from "@/app/lib/site";

/**
 * Moldura da foto do fundador.
 * Enquanto public/fundador.png não existir, mostra o espaço vazio marcado.
 * Quando a foto for salva, ela aparece sozinha.
 */
export function FounderPhoto({ className }: { className?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "missing">("loading");

  // A imagem pode terminar de carregar (ou falhar) antes do React hidratar;
  // nesse caso o onLoad/onError não dispara, então conferimos aqui.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "ok" : "missing");
  }, []);

  const hasPhoto = status === "ok";

  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-[radial-gradient(120%_80%_at_50%_100%,#F8C878_0%,#FBE3B8_45%,#FFF6E6_100%)] shadow-card",
        className,
      )}
    >
      {/* ondas da Lagos no rodapé da moldura */}
      <svg viewBox="0 0 400 160" fill="currentColor" aria-hidden className="absolute -left-[10%] bottom-[-2px] w-[120%] text-caramel-600/15">
        <path d="M0 60c60-40 120-40 200 0s140 40 200 0v100H0Z" />
        <path d="M0 100c60-40 120-40 200 0s140 40 200 0v60H0Z" />
      </svg>

      {!hasPhoto && (
        <div className="absolute inset-3.5 flex flex-col items-center justify-center gap-2 rounded-[22px] border-2 border-dashed border-caramel-600/45 p-6 text-center">
          <span className="mb-2 grid h-[84px] w-[84px] place-items-center rounded-full bg-white text-caramel-600 shadow-card">
            <UserRound size={40} strokeWidth={1.6} />
          </span>
          <strong className="font-display text-xl tracking-tight text-ink">Seu rosto aqui</strong>
          <span className="hidden max-w-[220px] text-[13.5px] leading-snug text-body sm:block">
            Foto recortada, fundo transparente, proporção 4:5 (ex.: 1200 × 1500 px)
          </span>
          <code className="mt-1 rounded-lg border border-caramel/40 bg-white px-2.5 py-1 text-[12.5px] text-caramel-600">
            public/fundador.png
          </code>
        </div>
      )}

      {status !== "missing" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={FOUNDER.photo}
          alt={`${FOUNDER.name}, ${FOUNDER.role}`}
          onLoad={() => setStatus("ok")}
          onError={() => setStatus("missing")}
          className={cn(
            "absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom",
            !hasPhoto && "opacity-0",
          )}
        />
      )}
    </div>
  );
}
