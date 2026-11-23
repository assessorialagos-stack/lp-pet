const items = [
  "Google Ads",
  "Meta Ads",
  "Perfil da Empresa no Google",
  "WhatsApp que agenda",
  "Instagram",
  "Pacotes de banho",
  "Lembrete de retorno",
  "Painel ao vivo",
];

/** Faixa de canais rolando (como nas referências), com marcadores caramelo. */
export function ChannelMarquee() {
  const row = (dup: boolean) =>
    items.map((t) => (
      <span
        key={`${t}-${dup}`}
        className={`inline-flex items-center gap-7 whitespace-nowrap font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium tracking-[-0.035em] text-white/85 ${dup ? "marquee-dup" : ""}`}
      >
        <i className="h-2.5 w-2.5 rounded-full bg-caramel" />
        {t}
      </span>
    ));

  return (
    <div className="border-y border-night-line py-7" aria-label={items.join(", ")}>
      <div className="mask-fade-x overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee gap-7 hover:[animation-play-state:paused]" aria-hidden>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
