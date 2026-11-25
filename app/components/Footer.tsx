import { WHATSAPP_DISPLAY, whatsappLink } from "@/app/lib/contact";
import { WA_MESSAGE } from "@/app/lib/site";
import { LagosLogo } from "./ui/LagosMark";
import { container } from "./ui/Section";

const nav = [
  { href: "#para-quem", label: "Para quem é" },
  { href: "#metodo", label: "Método Maré" },
  { href: "#servicos", label: "Serviços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#faq", label: "Perguntas frequentes" },
];

export function Footer() {
  return (
    <footer className="px-2.5 pb-2.5 sm:px-4 sm:pb-4">
      <div className="rounded-[28px] border border-night-line bg-night-2 pb-28 pt-14 text-[15px] sm:rounded-[40px] md:pb-8">
        <div className={container}>
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <a href="#top" aria-label="Lagos Assessoria, início">
                <LagosLogo />
              </a>
              <p className="mt-4 max-w-[340px]">Marketing para pet shop, banho e tosa e clínica veterinária, feito por quem olha para a agenda e para o caixa.</p>
            </div>
            <div>
              <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white">Navegação</h4>
              <ul className="grid gap-2.5">
                {nav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white">Contato</h4>
              <ul className="grid gap-2.5">
                <li>
                  <a href={whatsappLink(WA_MESSAGE)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    WhatsApp: {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li>Atendimento para todo o Brasil</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-night-line pt-6 text-[13.5px] text-night-muted">
            <span>© {new Date().getFullYear()} Lagos Assessoria. Todos os direitos reservados.</span>
            <a href="#top" className="transition-colors hover:text-white">
              Voltar ao topo ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
