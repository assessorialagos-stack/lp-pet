import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { GoogleTagManager } from "./components/GoogleTagManager";
import { LeadModalProvider } from "./components/LeadModal";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { MobileCtaBar } from "./components/MobileCtaBar";
import { META_PIXEL_ID } from "./lib/metaPixel";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketing para Pet Shop | Lagos Assessoria",
  description:
    "Assessoria de marketing para pet shop, banho e tosa e clínica veterinária. Anúncio local, WhatsApp que agenda e recorrência para o tutor voltar todo mês. Diagnóstico gratuito.",
  openGraph: {
    title: "Marketing para Pet Shop | Lagos Assessoria",
    description: "Mais tutores na agenda. E voltando todo mês. Diagnóstico gratuito com um especialista.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F1C",
};

// ── Mapa de fontes (padrão Lagos: uma fonte por destino) ─────────────────────
// Meta (navegador): pixel inline abaixo. PageView + Contact (clique no WhatsApp)
//                   + Lead (formulário, com event_id).
// Meta (servidor):  API de Conversões em /api/lead, mesmo event_id do Lead.
// Clarity:          script inline abaixo.
// GA4/Google Ads:   GTM, só se NEXT_PUBLIC_GTM_ID existir. O GTM NÃO deve
//                   disparar o pixel da Meta, senão o evento conta duas vezes.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${interTight.variable} ${jetbrains.variable} antialiased`}>
      <head>
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* Meta Pixel: evento Contact nos cliques em links de WhatsApp */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('click', function (e) {
  var link = e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com/send"]');
  if (!link || typeof fbq !== 'function') return;
  fbq('track', 'Contact');
  if (link.target !== '_blank') {
    e.preventDefault();
    setTimeout(function () { window.location.href = link.href; }, 300);
  }
}, true);`,
          }}
        />
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "z80dxjrvhc");`,
          }}
        />
      </head>
      <body className="min-h-full overflow-x-hidden">
        <GoogleTagManager />
        <SmoothScroll />
        <LeadModalProvider>
          {children}
          <WhatsAppFloat />
          <MobileCtaBar />
        </LeadModalProvider>
      </body>
    </html>
  );
}
