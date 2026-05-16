import type { Feature, Step, TrustPillar, ProblemItem } from '@/types'

export const SITE = {
  name:         'Na-Max',
  tagline:      'The digital welcome card for your hotel',
  url:          'https://na-max.com',
  email:        'pilot@na-max.com',
  ctaPrimary:   'Try free for 14 days',
  ctaSecondary: 'See demo',
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

export const HERO = {
  badge:        'Now live in Vienna & Graz',
  headlineLine1: 'Your guests speak',
  headlineLine2: 'many languages.',
  headlineLine3: 'Now your welcome card does too.',
  subheadline:
    'Replace the tired paper folder in the room with a beautiful digital page — on your guest’s phone, in their language. No app, no IT setup.',
  trustLine: 'No credit card · Ready in 30 minutes · GDPR-compliant',
}

// ─────────────────────────────────────────────
// PROBLEMS
// ─────────────────────────────────────────────

export const PROBLEMS: ProblemItem[] = [
  {
    icon:        'DocumentTextIcon',
    title:       'The paper folder is a pain',
    description: 'Yellowed, torn, outdated — and honestly, no guest reads it anyway.',
  },
  {
    icon:        'PhoneIcon',
    title:       'The same questions, every day',
    description: '“What’s the Wi-Fi password?” — asked over and over, in every room.',
  },
  {
    icon:        'GlobeAltIcon',
    title:       'The language barrier',
    description: 'Japanese, Russian, English guests — a German folder doesn’t help them.',
  },
  {
    icon:        'ClockIcon',
    title:       'Updates eat your time',
    description: 'New breakfast hours? Reprint everything, laminate, walk it to every room.',
  },
]

// ─────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────

export const STEPS: Step[] = [
  {
    number:      1,
    title:       'Fill in your profile',
    description: 'Wi-Fi, house rules, breakfast, parking — enter once, done. Takes 30 minutes.',
  },
  {
    number:      2,
    title:       'We generate your QR code',
    description: 'A print-ready A4 card with your QR code. Print it, laminate it, place it on the table.',
  },
  {
    number:      3,
    title:       'Guest scans & reads',
    description: 'Opens straight in the browser — in German, English, or your guest’s own language.',
  },
  {
    number:      4,
    title:       'Update anything in seconds',
    description: 'New opening hours? Change one line — every guest sees it instantly.',
  },
]

// ─────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────

export const FEATURES: Feature[] = [
  {
    icon:        'LanguageIcon',
    title:       'Multilingual',
    description: 'The page opens in your guest’s language automatically. DE & EN in v1, 20+ languages on the Global plan.',
  },
  {
    icon:        'DevicePhoneMobileIcon',
    title:       'No app needed',
    description: 'Guest scans the QR — that’s it. No install, no login, no frustration.',
  },
  {
    icon:        'BoltIcon',
    title:       'Live in 30 minutes',
    description: 'Fill out a simple form, print the QR code. No IT project, no technician on site.',
  },
  {
    icon:        'DocumentArrowDownIcon',
    title:       'Print-ready QR card',
    description: 'A finished A4 PDF with your QR code. Laminate it, place it on the table — professional from day one.',
  },
  {
    icon:        'SparklesIcon',
    title:       'AI writing assistant',
    description: 'English not your strong suit? Our AI writes your welcome text in any language.',
  },
  {
    icon:        'PencilSquareIcon',
    title:       'Instant updates',
    description: 'Breakfast time changed? One click — every guest sees it right away.',
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
    priceUnit:  '/ month',
    roomsLabel: 'up to 30 rooms',
    bestFor:    'B&Bs, guesthouses, apartments',
    features: [
      'Digital welcome card',
      'German + English',
      'QR code + printable PDF',
      'Unlimited updates',
      'GDPR-compliant hosting (EU)',
      'Email support',
    ],
    highlighted: false,
    ctaLabel:   'Try free',
  },
  {
    id:         'global',
    name:       'Global',
    priceLabel: '€ 59',
    priceUnit:  '/ month',
    roomsLabel: 'up to 100 rooms',
    bestFor:    'Hotels with international guests',
    features: [
      'Everything in Starter',
      '20+ languages, automatic',
      'Guest’s language detected automatically',
      'AI text generation included',
      'Visitor analytics',
      'Priority support',
    ],
    highlighted: true,
    ctaLabel:   'Try free',
  },
  {
    id:         'enterprise',
    name:       'Network',
    priceLabel: 'On request',
    priceUnit:  '',
    roomsLabel: 'Multiple properties',
    bestFor:    'Apartment networks & hotel chains',
    features: [
      'Everything in Global',
      'Manage multiple properties',
      'Custom branding / white-label',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    highlighted: false,
    ctaLabel:   'Get in touch',
  },
]

export const PRICING_EXTRAS = [
  '14-day free trial — no credit card',
  'No setup fee',
  'Pay yearly: 2 months free',
  '2026 pilot pricing — locked in for the first 100 properties',
]

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Does my guest need to download an app?',
    a: 'No. Your guest just scans the QR code with their phone’s camera — the page opens directly in the browser. No app, no login, no waiting.',
  },
  {
    q: 'Which languages does it support?',
    a: 'The Starter plan includes German and English — you maintain both versions yourself. The Global plan automatically detects your guest’s device language and shows the content in 20+ languages.',
  },
  {
    q: 'How quickly can I go live?',
    a: 'Usually 30 minutes. Sign up, fill in your details (Wi-Fi, rules, breakfast, etc.), upload a photo — done. You print the QR code yourself.',
  },
  {
    q: 'What does the trial actually cost?',
    a: 'Nothing. 14 days completely free, no credit card required, cancel anytime. After the trial you pick a plan — or you don’t.',
  },
  {
    q: 'What happens to my guests’ data?',
    a: 'The guest page collects no personal data. No cookies, no tracking, no sign-ups. Your content lives on EU servers (Frankfurt).',
  },
  {
    q: 'Can I manage multiple apartments or rooms?',
    a: 'Starter and Global cover one property. For apartment networks with multiple units, we offer the Network plan — get in touch for a custom quote.',
  },
]

// ─────────────────────────────────────────────
// TRUST PILLARS
// ─────────────────────────────────────────────

export const TRUST_PILLARS: TrustPillar[] = [
  {
    icon:     'ClockIcon',
    title:    '30-min setup',
    subtitle: 'Set up today, live today',
  },
  {
    icon:     'WifiIcon',
    title:    'No IT required',
    subtitle: 'Fill in a form — that’s it',
  },
  {
    icon:     'ShieldCheckIcon',
    title:    'GDPR-compliant',
    subtitle: 'Servers in Frankfurt (EU)',
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
// SECURITY / GDPR
// ─────────────────────────────────────────────

export const SECURITY = {
  headline: 'Security & GDPR — built in, not bolted on',
  body:
    'Na-Max was built for the European market. No US cloud, no cookies, no guest data collected without a reason.',
  pillars: [
    {
      icon:  'ShieldCheckIcon',
      title: 'Hosted in the EU',
      text:  'Servers in Frankfurt. No data leaves the EU.',
    },
    {
      icon:  'LockClosedIcon',
      title: 'No guest data',
      text:  'The guest page collects no personal data. No tracking, no cookies.',
    },
    {
      icon:  'ArchiveBoxIcon',
      title: 'Automatic deletion',
      text:  'Inquiries are automatically deleted after 90 days, GDPR-compliant.',
    },
    {
      icon:  'ClipboardDocumentCheckIcon',
      title: 'Transparency',
      text:  'Clear privacy notices for your guests — in multiple languages if you’d like.',
    },
  ],
}

export const PILOT_BULLETS = [
  'No credit card required',
  'Set up in 30 minutes',
  'German & English included',
  'Cancel anytime',
]
