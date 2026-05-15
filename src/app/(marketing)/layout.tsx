import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileStickyCtaBar from '@/components/layout/MobileStickyCtaBar'

export const metadata: Metadata = {
  metadataBase: new URL('https://na-max.com'),
  title: 'Na-Max | Digitale Gästebetreuung für Hotels',
  description:
    'Mehr Umsatz pro Gast — ohne App, ohne IT-Integration, in 24 Stunden aktiv. Na-Max gibt Ihrem Hotel eine digitale Serviceplattform für jedes Zimmer.',
  keywords: [
    'Hotel Digitalisierung',
    'digitale Gästebetreuung',
    'Hotel SaaS Österreich',
    'Hotel QR Service',
    'Hotel Software DACH',
    'Gast App Hotel ohne Download',
  ],
  openGraph: {
    title: 'Na-Max — Mehr Umsatz pro Gast. Ohne App. Ohne IT.',
    description:
      'Digitale Serviceplattform für Hotels. QR-basiert, kein App-Download, kein IT-Projekt. 14-Tage Pilot kostenlos.',
    url: 'https://na-max.com',
    siteName: 'Na-Max',
    locale: 'de_AT',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Na-Max' }],
  },
  alternates: { canonical: 'https://na-max.com' },
  robots: { index: true, follow: true },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileStickyCtaBar />
    </>
  )
}
