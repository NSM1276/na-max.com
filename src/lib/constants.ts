import type { Feature, Step, TrustPillar, ProblemItem } from '@/types'

export const SITE = {
  name:         'Na-Max',
  tagline:      'Die digitale Willkommenskarte für Ihr Hotel',
  url:          'https://na-max.com',
  email:        'pilot@na-max.com',
  ctaPrimary:   '14 Tage kostenlos testen',
  ctaSecondary: 'Demo ansehen',
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

export const HERO = {
  badge:        'Jetzt in Wien & Graz im Einsatz',
  headlineLine1: 'Ihre Gäste sprechen',
  headlineLine2: 'viele Sprachen.',
  headlineLine3: 'Ihre Willkommenskarte auch.',
  subheadline:
    'Ersetzen Sie die veraltete Papiermappe im Zimmer durch eine schöne digitale Seite — auf dem Telefon des Gastes, in seiner Sprache, ohne App, ohne IT.',
  trustLine: 'Keine Kreditkarte · In 30 Minuten fertig · DSGVO-konform',
}

// ─────────────────────────────────────────────
// PROBLEMS
// ─────────────────────────────────────────────

export const PROBLEMS: ProblemItem[] = [
  {
    icon:        'DocumentTextIcon',
    title:       'Die Papiermappe nervt',
    description: 'Vergilbt, zerrissen, veraltet — und kein Gast liest sie wirklich.',
  },
  {
    icon:        'PhoneIcon',
    title:       'Immer dieselben Fragen',
    description: '"Wie ist das WLAN-Passwort?" — täglich, mehrfach, für jedes Zimmer.',
  },
  {
    icon:        'GlobeAltIcon',
    title:       'Sprachbarriere',
    description: 'Japanische, russische, englische Gäste — die Mappe hilft ihnen nicht.',
  },
  {
    icon:        'ClockIcon',
    title:       'Aktualisieren kostet Zeit',
    description: 'Neue Frühstückszeiten? Alles neu drucken, laminieren, verteilen.',
  },
]

// ─────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────

export const STEPS: Step[] = [
  {
    number:      1,
    title:       'Sie füllen Ihr Profil aus',
    description: 'WLAN, Regeln, Frühstück, Parken — einmal eingeben, fertig. In 30 Minuten.',
  },
  {
    number:      2,
    title:       'Wir generieren Ihren QR-Code',
    description: 'Druckfertige A4-Karte mit QR-Code. Ausdrucken, laminieren, auf den Tisch stellen.',
  },
  {
    number:      3,
    title:       'Gast scannt & liest',
    description: 'Öffnet sich direkt im Browser — auf Deutsch, Englisch oder der Sprache des Gastes.',
  },
  {
    number:      4,
    title:       'Sie ändern in Sekunden',
    description: 'Neue Öffnungszeiten? Eine Zeile ändern — sofort live für alle Gäste.',
  },
]

// ─────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────

export const FEATURES: Feature[] = [
  {
    icon:        'LanguageIcon',
    title:       'Mehrsprachig',
    description: 'Seite öffnet sich automatisch in der Sprache des Gastes. DE & EN in v1, 20+ Sprachen im Global-Plan.',
  },
  {
    icon:        'DevicePhoneMobileIcon',
    title:       'Ohne App',
    description: 'Gast scannt QR — fertig. Keine Installation, kein Login, kein Frustrationserlebnis.',
  },
  {
    icon:        'BoltIcon',
    title:       'In 30 Minuten fertig',
    description: 'Formular ausfüllen, QR-Code drucken. Kein IT-Projekt, kein Techniker vor Ort.',
  },
  {
    icon:        'DocumentArrowDownIcon',
    title:       'QR-Karte zum Drucken',
    description: 'Fertige A4-PDF mit QR-Code. Laminieren, auf den Tisch — professionell ab Tag 1.',
  },
  {
    icon:        'SparklesIcon',
    title:       'KI-Texthilfe',
    description: 'Kein gutes Englisch? KI schreibt Ihr Willkommenstext in jede Sprache.',
  },
  {
    icon:        'PencilSquareIcon',
    title:       'Sofort aktualisierbar',
    description: 'Frühstückszeit geändert? Einen Klick — alle Gäste sehen es sofort.',
  },
]

// ─────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────

export interface PricingPlan {
  id:          string
  name:        string
  priceLabel:  string
  priceUnit:   string
  roomsLabel:  string
  bestFor:     string
  features:    string[]
  highlighted: boolean
  ctaLabel:    string
}

export const PRICING: PricingPlan[] = [
  {
    id:         'starter',
    name:       'Starter',
    priceLabel: '€ 29',
    priceUnit:  '/ Monat',
    roomsLabel: 'bis 30 Zimmer',
    bestFor:    'Pensionen, B&Bs, Apartments',
    features: [
      'Digitale Willkommenskarte',
      'Deutsch + Englisch',
      'QR-Code + PDF zum Drucken',
      'Unbegrenzt aktualisierbar',
      'DSGVO-konformes Hosting (EU)',
      'E-Mail-Support',
    ],
    highlighted: false,
    ctaLabel:   'Kostenlos testen',
  },
  {
    id:         'global',
    name:       'Global',
    priceLabel: '€ 59',
    priceUnit:  '/ Monat',
    roomsLabel: 'bis 100 Zimmer',
    bestFor:    'Hotels mit internationalen Gästen',
    features: [
      'Alles aus Starter',
      '20+ Sprachen automatisch',
      'Sprache des Gastes wird erkannt',
      'KI-Texterstellung inklusive',
      'Besucher-Statistiken',
      'Priorisierter Support',
    ],
    highlighted: true,
    ctaLabel:   'Kostenlos testen',
  },
  {
    id:         'enterprise',
    name:       'Netzwerk',
    priceLabel: 'Auf Anfrage',
    priceUnit:  '',
    roomsLabel: 'Mehrere Objekte',
    bestFor:    'Apartmentnetzwerke & Hotelketten',
    features: [
      'Alles aus Global',
      'Mehrere Objekte verwalten',
      'Eigenes Branding / White-Label',
      'Persönlicher Ansprechpartner',
      'SLA-Garantie',
    ],
    highlighted: false,
    ctaLabel:   'Kontakt aufnehmen',
  },
]

export const PRICING_EXTRAS = [
  '14 Tage kostenloser Test — keine Kreditkarte',
  'Keine Einrichtungsgebühr',
  'Jährlich zahlen: 2 Monate gratis',
  'Pilotpreise 2026 — gültig für die ersten 100 Objekte',
]

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Muss der Gast eine App herunterladen?',
    a: 'Nein. Der Gast scannt den QR-Code mit der Kamera seines Smartphones — die Seite öffnet sich direkt im Browser. Keine App, kein Login, keine Wartezeit.',
  },
  {
    q: 'In welchen Sprachen funktioniert das?',
    a: 'Im Starter-Plan sind Deutsch und Englisch enthalten — Sie pflegen beide Versionen selbst. Im Global-Plan erkennt die Seite automatisch die Sprache des Gastgeräts und zeigt den Inhalt in über 20 Sprachen.',
  },
  {
    q: 'Wie schnell bin ich live?',
    a: 'In der Regel 30 Minuten. Sie registrieren sich, füllen Ihre Informationen aus (WLAN, Regeln, Frühstück etc.), laden Ihr Foto hoch — fertig. Den QR-Code drucken Sie selbst aus.',
  },
  {
    q: 'Was kostet der Test wirklich?',
    a: 'Nichts. 14 Tage komplett kostenlos, keine Kreditkarte erforderlich, jederzeit kündbar. Nach dem Test wählen Sie einen Tarif — oder nicht.',
  },
  {
    q: 'Was passiert mit den Daten meiner Gäste?',
    a: 'Die Gast-Seite sammelt keine persönlichen Daten der Gäste. Es gibt keine Cookies, kein Tracking, keine Registrierung. Ihr Inhalt liegt auf EU-Servern (Frankfurt).',
  },
  {
    q: 'Kann ich mehrere Apartments oder Zimmer verwalten?',
    a: 'Im Starter- und Global-Plan verwalten Sie ein Objekt. Für Apartmentnetzwerke mit mehreren Einheiten bieten wir den Netzwerk-Plan an — kontaktieren Sie uns für ein individuelles Angebot.',
  },
]

// ─────────────────────────────────────────────
// TRUST PILLARS
// ─────────────────────────────────────────────

export const TRUST_PILLARS: TrustPillar[] = [
  {
    icon:     'ClockIcon',
    title:    '30 Min Setup',
    subtitle: 'Heute einrichten, heute live',
  },
  {
    icon:     'WifiIcon',
    title:    'Kein IT nötig',
    subtitle: 'Formular ausfüllen — fertig',
  },
  {
    icon:     'ShieldCheckIcon',
    title:    'DSGVO-konform',
    subtitle: 'Server in Frankfurt (EU)',
  },
]

// ─────────────────────────────────────────────
// SOLUTION (legacy — kept for TS compatibility)
// ─────────────────────────────────────────────

export const SOLUTION = {
  headline: '',
  body: '',
  bullets: [] as { kpi: string; label: string; note: string }[],
}

// ─────────────────────────────────────────────
// SECURITY / DSGVO
// ─────────────────────────────────────────────

export const SECURITY = {
  headline: 'Sicherheit & DSGVO — eingebaut, nicht nachgerüstet',
  body:
    'Na-Max wurde für den europäischen Markt entwickelt. Keine US-Cloud, keine Cookies, keine personenbezogenen Gästedaten ohne Zweck.',
  pillars: [
    {
      icon:  'ShieldCheckIcon',
      title: 'Hosting in der EU',
      text:  'Server in Frankfurt. Keine Datenübertragung außerhalb der EU.',
    },
    {
      icon:  'LockClosedIcon',
      title: 'Keine Gästedaten',
      text:  'Die Gast-Seite sammelt keine persönlichen Daten. Kein Tracking, keine Cookies.',
    },
    {
      icon:  'ArchiveBoxIcon',
      title: 'Automatische Löschung',
      text:  'Anfragen werden nach 90 Tagen DSGVO-konform automatisch entfernt.',
    },
    {
      icon:  'ClipboardDocumentCheckIcon',
      title: 'Transparenz',
      text:  'Klare Datenschutzhinweise für Ihre Gäste — auf Wunsch in mehreren Sprachen.',
    },
  ],
}

export const PILOT_BULLETS = [
  'Keine Kreditkarte erforderlich',
  'In 30 Minuten eingerichtet',
  'Deutsch & Englisch inklusive',
  'Jederzeit kündbar',
]
