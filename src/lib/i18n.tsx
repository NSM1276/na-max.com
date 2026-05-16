'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import * as DE from './constants'
import * as EN from './constants.en'

// ─────────────────────────────────────────────
// UI Strings (sections headings, buttons, etc.)
// ─────────────────────────────────────────────

const UI_DE = {
  nav: {
    badge: 'Hotel',
    howItWorks: 'So funktioniert’s',
    features: 'Funktionen',
    pilot: 'Pilot',
    cta: 'Pilot starten',
  },
  hero: {
    ctaPrimary: '14-Tage Pilot starten',
    ctaSecondary: 'So funktioniert’s',
    socialProof: 'Bereits in Pilothotels in Österreich im Einsatz',
  },
  problem: {
    kicker: 'Der Alltag im Hotel',
    headline: 'Kennen Sie das?',
  },
  howItWorks: {
    kicker: 'Der Ablauf',
    headline: 'So einfach geht’s',
    sub: 'Vier Schritte — vom QR-Code zur erledigten Gästeanfrage.',
    bottomLine: 'Das war’s — kein IT-Projekt, keine Schulung, keine Wartezeit.',
  },
  demo: {
    kicker: 'Live Demo',
    headline: 'Probieren Sie es jetzt aus',
    sub: 'Bearbeiten Sie den Inhalt links — die Gäste-Seite aktualisiert sich sofort. So einfach ist Na-Max.',
    tabEdit: '✏️ Bearbeiten',
    tabPreview: '📱 Vorschau',
    adminPanel: 'Admin-Panel',
    reset: '↺ Reset',
    saved: '✓ Änderungen gespeichert',
    fieldName: 'Name des Objekts',
    fieldCity: 'Stadt',
    fieldWifiName: 'WLAN-Name',
    fieldWifiPass: 'Passwort',
    fieldCheckin: 'Check-in',
    fieldCheckout: 'Check-out',
    fieldBreakfast: 'Frühstück',
    fieldRules: 'Hausordnung',
    previewCaption: 'So sieht Ihr Gast die Seite — in seiner Sprache, direkt nach dem QR-Scan.',
    guestWifi: 'WLAN',
    guestBreakfast: 'Frühstück',
    guestRules: 'Hausordnung',
    guestWelcome: 'Willkommen',
    guestNetwork: 'Netzwerk',
    guestPassword: 'Passwort',
    guestFrom: 'Von',
    guestUntil: 'Bis',
  },
  features: {
    kicker: 'Funktionen',
    headline: 'Was Ihr Hotel gewinnt',
  },
  security: {
    kicker: 'Sicherheit & DSGVO',
    badgeHosted: 'Hosted in DE / AT',
    badgePrivacy: 'DSGVO Art. 25 — Privacy by Design',
    badgeTLS: 'TLS 1.3 verschlüsselt',
  },
  pricing: {
    kicker: 'Preise & Pakete',
    headline: 'Transparent. Monatlich kündbar. Keine Einrichtungsgebühr.',
    sub: 'Ein Tarif pro Betrieb — keine versteckten Kosten pro Anfrage, kein Setup-Fee, keine 24-Monatsverträge. Pilot starten, in 14 Tagen entscheiden.',
    popular: 'Beliebt',
  },
  faq: {
    kicker: 'Häufige Fragen',
    headline: 'Was Hoteliers vor dem Pilot wissen wollen',
    moreQuestions: 'Weitere Fragen?',
  },
  finalCta: {
    headlinePart1: 'Mehr Umsatz.',
    headlinePart2: 'Weniger Aufwand.',
    headlinePart3: 'Ab morgen.',
    sub: 'Starten Sie Ihren kostenlosen 14-Tage-Pilot — fertig in 24 Stunden. Kein Risiko, keine Verpflichtung.',
    cta: 'Pilot starten',
    footer: 'Keine Kreditkarte · Kein IT-Aufwand · Jederzeit kündbar',
  },
  trust: {
    intro: 'Bereits im Einsatz in Pilothotels in Österreich',
    quote: '“Na-Max hat unsere Gästekommunikation komplett verändert. Das Personal spart täglich wertvolle Zeit, und die Gäste bestellen deutlich mehr.”',
    authorRole: 'Hoteldirektor',
    authorLocation: 'Wien, Österreich',
    authorNote: 'Pilot-Teilnehmer (Name auf Anfrage)',
  },
  funnel: {
    kicker: '14-Tage Pilot',
    headline: 'Jetzt kostenlos starten',
    sub: 'Wir melden uns innerhalb eines Werktages und richten alles ein.',
    steps: ['IHR OBJEKT', 'IHRE GÄSTE', 'KONTAKT'],
    propertyTypes: ['Hotel', 'Pension / B&B', 'Apartment', 'Hostel', 'Anderes'],
    roomCounts: ['1 – 5 Zimmer', '6 – 15 Zimmer', '16 – 30 Zimmer', '30+ Zimmer'],
    guestMixes: ['Meist deutschsprachig', 'International gemischt', 'Meist englischsprachig', 'Viele Asiaten / Russen'],
    cities: ['Wien', 'Graz', 'Salzburg', 'Berlin', 'München', 'Andere Stadt'],
    labelType: 'Art des Objekts',
    labelRooms: 'Anzahl der Zimmer',
    labelGuests: 'Woher kommen Ihre Gäste?',
    labelCity: 'Ihre Stadt',
    labelHotelName: 'Name des Hotels / Pension',
    labelEmail: 'Ihre E-Mail',
    labelPhone: 'Telefon',
    optional: 'Optional',
    hotelPlaceholder: 'z.B. Pension Schönbrunn',
    emailPlaceholder: 'ihre@email.at',
    phonePlaceholder: '+43 …',
    back: '← Zurück',
    next: 'Weiter →',
    submit: 'Kostenlos anfragen →',
    sending: 'Wird gesendet…',
    errorMsg: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    legalLine: 'Keine Kreditkarte · Kein Vertrag · Jederzeit kündbar',
    successTitle: 'Vielen Dank!',
    successMsg1: 'Ihre Anfrage für',
    successMsg2: 'ist angekommen. Wir melden uns innerhalb von 24 Stunden — meistens schneller.',
    successReset: 'Weiteres Objekt anmelden',
  },
  mobileCta: {
    label: '14-Tage Pilot starten',
  },
  footer: {
    howItWorks: 'So funktioniert’s',
    features: 'Funktionen',
    pilot: 'Pilot starten',
    contact: 'Kontakt',
    rights: 'Alle Rechte vorbehalten.',
    gdprLine: 'DSGVO-konform · Daten auf EU-Servern',
    impressum: 'Impressum',
    privacy: 'Datenschutz',
  },
  whatsapp: {
    message: 'Hallo, ich interessiere mich für Na-Max für mein Hotel/meine Pension.',
    tooltip: 'Jetzt auf WhatsApp schreiben',
    aria: 'WhatsApp kontaktieren',
  },
}

const UI_EN: typeof UI_DE = {
  nav: {
    badge: 'Hotel',
    howItWorks: 'How it works',
    features: 'Features',
    pilot: 'Pilot',
    cta: 'Start pilot',
  },
  hero: {
    ctaPrimary: 'Start your 14-day pilot',
    ctaSecondary: 'How it works',
    socialProof: 'Already running in pilot hotels across Austria',
  },
  problem: {
    kicker: 'Daily life in a hotel',
    headline: 'Sound familiar?',
  },
  howItWorks: {
    kicker: 'The flow',
    headline: 'It really is this simple',
    sub: 'Four steps — from QR code to happy guest.',
    bottomLine: 'That’s it — no IT project, no training, no waiting around.',
  },
  demo: {
    kicker: 'Live demo',
    headline: 'Try it right now',
    sub: 'Edit the content on the left — the guest page updates instantly. That’s how easy Na-Max is.',
    tabEdit: '✏️ Edit',
    tabPreview: '📱 Preview',
    adminPanel: 'Admin panel',
    reset: '↺ Reset',
    saved: '✓ Changes saved',
    fieldName: 'Property name',
    fieldCity: 'City',
    fieldWifiName: 'Wi-Fi name',
    fieldWifiPass: 'Password',
    fieldCheckin: 'Check-in',
    fieldCheckout: 'Check-out',
    fieldBreakfast: 'Breakfast',
    fieldRules: 'House rules',
    previewCaption: 'This is what your guest sees — in their language, right after scanning the QR.',
    guestWifi: 'Wi-Fi',
    guestBreakfast: 'Breakfast',
    guestRules: 'House Rules',
    guestWelcome: 'Welcome',
    guestNetwork: 'Network',
    guestPassword: 'Password',
    guestFrom: 'From',
    guestUntil: 'Until',
  },
  features: {
    kicker: 'Features',
    headline: 'What your hotel gets',
  },
  security: {
    kicker: 'Security & GDPR',
    badgeHosted: 'Hosted in DE / AT',
    badgePrivacy: 'GDPR Art. 25 — Privacy by Design',
    badgeTLS: 'TLS 1.3 encrypted',
  },
  pricing: {
    kicker: 'Pricing & plans',
    headline: 'Transparent. Cancel monthly. No setup fee.',
    sub: 'One plan per property — no hidden per-request fees, no setup costs, no 24-month contracts. Start your pilot, decide in 14 days.',
    popular: 'Popular',
  },
  faq: {
    kicker: 'FAQ',
    headline: 'What hoteliers want to know before the pilot',
    moreQuestions: 'More questions?',
  },
  finalCta: {
    headlinePart1: 'More revenue.',
    headlinePart2: 'Less hassle.',
    headlinePart3: 'Starting tomorrow.',
    sub: 'Start your free 14-day pilot — ready in 24 hours. No risk, no commitment.',
    cta: 'Start pilot',
    footer: 'No credit card · No IT setup · Cancel anytime',
  },
  trust: {
    intro: 'Already running in pilot hotels across Austria',
    quote: '“Na-Max has completely changed how we communicate with guests. Our staff saves valuable time every day, and guests order noticeably more.”',
    authorRole: 'Hotel Director',
    authorLocation: 'Vienna, Austria',
    authorNote: 'Pilot participant (name available on request)',
  },
  funnel: {
    kicker: '14-day pilot',
    headline: 'Start free today',
    sub: 'We’ll get back to you within one business day and set everything up.',
    steps: ['YOUR PROPERTY', 'YOUR GUESTS', 'CONTACT'],
    propertyTypes: ['Hotel', 'Guesthouse / B&B', 'Apartment', 'Hostel', 'Other'],
    roomCounts: ['1 – 5 rooms', '6 – 15 rooms', '16 – 30 rooms', '30+ rooms'],
    guestMixes: ['Mostly German-speaking', 'International mix', 'Mostly English-speaking', 'Many Asian / Russian guests'],
    cities: ['Vienna', 'Graz', 'Salzburg', 'Berlin', 'Munich', 'Other city'],
    labelType: 'Property type',
    labelRooms: 'Number of rooms',
    labelGuests: 'Where are your guests from?',
    labelCity: 'Your city',
    labelHotelName: 'Hotel / guesthouse name',
    labelEmail: 'Your email',
    labelPhone: 'Phone',
    optional: 'Optional',
    hotelPlaceholder: 'e.g. Pension Schönbrunn',
    emailPlaceholder: 'your@email.com',
    phonePlaceholder: '+43 …',
    back: '← Back',
    next: 'Next →',
    submit: 'Request free pilot →',
    sending: 'Sending…',
    errorMsg: 'Something went wrong. Please try again.',
    legalLine: 'No credit card · No contract · Cancel anytime',
    successTitle: 'Thank you!',
    successMsg1: 'Your request for',
    successMsg2: 'has arrived. We’ll get back to you within 24 hours — usually faster.',
    successReset: 'Register another property',
  },
  mobileCta: {
    label: 'Start 14-day pilot',
  },
  footer: {
    howItWorks: 'How it works',
    features: 'Features',
    pilot: 'Start pilot',
    contact: 'Contact',
    rights: 'All rights reserved.',
    gdprLine: 'GDPR-compliant · Data on EU servers',
    impressum: 'Imprint',
    privacy: 'Privacy',
  },
  whatsapp: {
    message: 'Hi, I’m interested in Na-Max for my hotel/guesthouse.',
    tooltip: 'Message us on WhatsApp',
    aria: 'Contact via WhatsApp',
  },
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

export type Lang = 'de' | 'en'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'de',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de')

  // Hydrate from localStorage / browser language
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('namax-lang') : null
    if (stored === 'de' || stored === 'en') {
      setLangState(stored)
      return
    }
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.toLowerCase()
      if (!browserLang.startsWith('de')) setLangState('en')
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') localStorage.setItem('namax-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

// ─────────────────────────────────────────────
// Content hook — returns the active bundle
// ─────────────────────────────────────────────

export function useContent() {
  const { lang } = useContext(LanguageContext)
  const bundle = lang === 'en' ? EN : DE
  const ui = lang === 'en' ? UI_EN : UI_DE
  return {
    SITE: bundle.SITE,
    HERO: bundle.HERO,
    PROBLEMS: bundle.PROBLEMS,
    STEPS: bundle.STEPS,
    FEATURES: bundle.FEATURES,
    PRICING: bundle.PRICING,
    PRICING_EXTRAS: bundle.PRICING_EXTRAS,
    FAQ: bundle.FAQ,
    TRUST_PILLARS: bundle.TRUST_PILLARS,
    SECURITY: bundle.SECURITY,
    PILOT_BULLETS: bundle.PILOT_BULLETS,
    UI: ui,
    lang,
  }
}
