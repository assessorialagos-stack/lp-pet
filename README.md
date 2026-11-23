# LP Pet (Lagos Assessoria)

Landing page de tráfego pago para o mercado pet: pet shop, banho e tosa, clínica veterinária, hotel e creche.
Mesma base das outras páginas da Lagos (Next 16, React 19, Tailwind 4, framer-motion).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## O que falta preencher antes de subir

| O quê | Onde |
|---|---|
| Foto do fundador (PNG recortado, fundo transparente, 4:5) | `public/fundador.png` |
| Nome do fundador | `app/lib/site.ts` (`FOUNDER.name`) |
| Cases do mercado pet, quando houver | `app/components/ResultsSection.tsx` (hoje usa os cases reais de outros segmentos, sinalizados na página) |
| Número do WhatsApp, se mudar | `app/lib/contact.ts` |

Os números dentro dos mockups (agenda, painel, pacote mensal) são ilustrativos e estão marcados como "Ilustrativo" na página.

## Variáveis de ambiente

| Variável | Para quê |
|---|---|
| `META_CAPI_TOKEN` | Token da API de Conversões. Sem ele, o Lead vai só pelo pixel do navegador. |
| `META_TEST_EVENT_CODE` | Opcional. Código de "Eventos de teste" do Gerenciador. Remover depois de testar. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Opcional. Padrão: pixel da Lagos (`2236261557301574`). |
| `FORMSUBMIT_ID` | Opcional. String do e-mail de ativação do FormSubmit (esconde o e-mail). |
| `LEAD_CC` | Opcional. Cópia do e-mail do lead. |
| `LEAD_WEBHOOK_URL` | Opcional. Manda o lead cru para planilha ou CRM (vai com `segmento: "pet"`). |
| `NEXT_PUBLIC_GTM_ID` | Opcional. Liga o GTM (para GA4 e Google Ads). |

## Mapa de fontes (uma fonte por destino)

| Destino | Eventos | Fonte |
|---|---|---|
| Meta (navegador) | PageView, Contact (clique em link de WhatsApp), Lead (envio do formulário) | Pixel inline em `app/layout.tsx` e `app/lib/metaPixel.ts` |
| Meta (servidor) | Lead, com o mesmo `event_id` do navegador (deduplicado) | `app/api/lead/route.ts` + `app/lib/metaCapi.ts` |
| Clarity | Sessões | Script inline em `app/layout.tsx` |
| GA4 e Google Ads | O que for configurado | GTM, só com `NEXT_PUBLIC_GTM_ID` |

O GTM **não** deve disparar o pixel da Meta. Se disparar, o evento conta duas vezes.

## Fluxo do lead

Botão "diagnóstico" abre o formulário. No envio: Lead no pixel, POST em `/api/lead` (e-mail via FormSubmit + CAPI, com limite de 6 s)
e depois o WhatsApp abre com as respostas prontas. O campo "Botão clicado" no e-mail diz qual CTA converteu.

O primeiro envio em produção dispara o e-mail de ativação do FormSubmit em `assessorialagoscontato@gmail.com`. Até alguém clicar em
"Activate Form", o e-mail não chega (o lead ainda chega pelo WhatsApp e fica no log do servidor).

## Deploy

Vercel (como o Site Principal) ou HostGator via `npm run deploy` (`deploy.js`, com `FTP_HOST`, `FTP_USER`, `FTP_PASS` e
`FTP_REMOTE_DIR` em `.env.local`).
