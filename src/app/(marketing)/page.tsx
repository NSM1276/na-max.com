import HeroSection                from '@/components/sections/HeroSection'
import ProblemSection             from '@/components/sections/ProblemSection'
import HowItWorksSection          from '@/components/sections/HowItWorksSection'
import FeaturesSection            from '@/components/sections/FeaturesSection'
import SecuritySection            from '@/components/sections/SecuritySection'
import PricingSection             from '@/components/sections/PricingSection'
import FaqSection                 from '@/components/sections/FaqSection'
import RegistrationFunnelSection  from '@/components/sections/RegistrationFunnelSection'
import TrustSection               from '@/components/sections/TrustSection'
import FinalCtaSection            from '@/components/sections/FinalCtaSection'

// Storytelling v2 — Digitale Willkommenskarte:
//   1. Hero                — Versprechen: mehrsprachig, ohne App, 30 Min
//   2. Problem             — Papiermappe, Sprachbarriere, immer dieselben Fragen
//   3. HowItWorks          — 4 Schritte: ausfüllen → QR → Gast scannt → ändern
//   4. Features            — Was das Objekt gewinnt
//   5. Security            — DSGVO, EU-Hosting, Vertrauen
//   6. Pricing             — €29 Starter / €59 Global / Netzwerk
//   7. FAQ                 — letzte Einwände
//   8. RegistrationFunnel  — ORIZ-Stil: klickbare 3-Schritt Form
//   9. Trust               — Social Proof
//  10. FinalCta            — letzter Anstoß

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SecuritySection />
      <PricingSection />
      <FaqSection />
      <RegistrationFunnelSection />
      <TrustSection />
      <FinalCtaSection />
    </>
  )
}
