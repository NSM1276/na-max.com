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
import DemoSection                from '@/components/sections/DemoSection'

// Storytelling v2 — Digitale Willkommenskarte:
//   1. Hero                — Versprechen: mehrsprachig, ohne App, 30 Min
//   2. Problem             — Papiermappe, Sprachbarriere, immer dieselben Fragen
//   3. HowItWorks          — 4 Schritte: ausfüllen → QR → Gast scannt → ändern
//   4. Demo                — Live Preview: Editor + Phone Mockup (interactive)
//   5. Features            — Was das Objekt gewinnt
//   6. Security            — DSGVO, EU-Hosting, Vertrauen
//   7. Pricing             — €29 Starter / €59 Global / Netzwerk
//   8. FAQ                 — letzte Einwände
//   9. RegistrationFunnel  — ORIZ-Stil: klickbare 3-Schritt Form
//  10. Trust               — Social Proof
//  11. FinalCta            — letzter Anstoß

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <DemoSection />
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
