import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ChannelMarquee } from "./components/ChannelMarquee";
import { AudienceSection } from "./components/AudienceSection";
import { PainSection } from "./components/PainSection";
import { DifferentialSection } from "./components/DifferentialSection";
import { MethodSection } from "./components/MethodSection";
import { ServicesSection } from "./components/ServicesSection";
import { DataSection } from "./components/DataSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { ResultsSection } from "./components/ResultsSection";
import { FounderSection } from "./components/FounderSection";
import { OnboardingSection } from "./components/OnboardingSection";
import { FAQSection } from "./components/FAQSection";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";

// LP de tráfego pago para o mercado pet (pet shop, banho e tosa, clínica).
// Estrutura inspirada nas referências (Pet Digital e VoxPet) com a identidade Lagos:
// fundo escuro com blocos claros arredondados, acento caramelo e azul Lagos.
// Todo botão de diagnóstico abre o formulário (LeadModal), que leva ao WhatsApp.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ChannelMarquee />
        <AudienceSection />
        <PainSection />
        <DifferentialSection />
        <MethodSection />
        <ServicesSection />
        <DataSection />
        <ComparisonSection />
        <ResultsSection />
        <FounderSection />
        <OnboardingSection />
        <FAQSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
