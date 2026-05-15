'use client'

import { useState, useEffect } from 'react'
import type { Property, ContentBlock, Photo, Lang } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'

// ─── Icon map for block types ──────────────────────────────────────────────────
const BLOCK_ICONS: Record<string, string> = {
  wifi:      '📶',
  rules:     '📋',
  parking:   '🅿️',
  breakfast: '🍳',
  contact:   '📞',
  checkin:   '🔑',
  checkout:  '🕐',
  other:      'ℹ️',
}

// ─── Affiliate links (Na-Max controlled — not editable by hotel) ───────────────
const AFFILIATE_ITEMS = [
  {
    icon: '🎭',
    title_de: 'Wiener Oper — Tickets',
    title_en: 'Vienna Opera — Tickets',
    url: 'https://www.getyourguide.com/vienna-l29/?partner_id=namax',
  },
  {
    icon: '🚌',
    title_de: 'Stadtrundfahrt Wien',
    title_en: 'Vienna City Tour',
    url: 'https://www.getyourguide.com/vienna-l29/tours-tc2/?partner_id=namax',
  },
  {
    icon: '🎡',
    title_de: 'Prater & Riesenrad',
    title_en: 'Prater & Giant Wheel',
    url: 'https://www.getyourguide.com/vienna-l29/?partner_id=namax',
  },
]

interface Props {
  property: Property
  blocks:   ContentBlock[]
  photos:   Photo[]
}

export default function GuestPageClient({ property, blocks, photos }: Props) {
  const [lang, setLang] = useState<Lang>('de')

  // Auto-detect browser language
  useEffect(() => {
    const browserLang = navigator.language?.toLowerCase() ?? 'de'
    setLang(browserLang.startsWith('de') ? 'de' : 'en')
  }, [])

  const t = (de: string, en: string) => lang === 'de' ? de : en
  const blockTitle = (b: ContentBlock) => lang === 'de' ? (b.title_de || b.title_en) : (b.title_en || b.title_de)
  const blockBody  = (b: ContentBlock) => lang === 'de' ? (b.body_de  || b.body_en)  : (b.body_en  || b.body_de)

  const mainPhoto = photos.find(p => p.position === 0)
  const photoUrl  = mainPhoto
    ? supabase.storage.from('property-photos').getPublicUrl(mainPhoto.storage_path).data.publicUrl
    : null

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Header foto + Name ────────────────────────────────────────────── */}
      <div className="relative">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={property.name}
            className="w-full h-48 sm:h-64 object-cover"
          />
        ) : (
          <div className="w-full h-32 bg-gradient-to-br from-brand-navy to-brand-sky" />
        )}

        {/* Lang switcher */}
        <div className="absolute top-3 right-3 flex rounded-lg overflow-hidden shadow-sm border border-white/30">
          {(['de', 'en'] as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                lang === l
                  ? 'bg-brand-sky text-white'
                  : 'bg-white/80 text-brand-navy hover:bg-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* ── Property name + city ──────────────────────────────────────────── */}
      <div className="bg-white px-5 py-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-brand-navy">{property.name}</h1>
        <p className="text-sm text-brand-muted mt-0.5">
          {property.city} · {t('Willkommen!', 'Welcome!')}
        </p>
      </div>

      {/* ── Content blocks ────────────────────────────────────────────────── */}
      <div className="px-4 py-4 space-y-3 max-w-lg mx-auto">

        {blocks.length === 0 && (
          <div className="text-center py-8 text-brand-muted text-sm">
            {t('Informationen werden bald verfügbar.', 'Information coming soon.')}
          </div>
        )}

        {blocks.map(block => (
          <div
            key={block.id}
            className="bg-white rounded-2xl shadow-card border border-slate-100 px-4 py-4"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5">
                {BLOCK_ICONS[block.type] ?? '📌'}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-brand-navy text-sm">
                  {blockTitle(block)}
                </h3>
                {blockBody(block) && (
                  <p className="mt-1 text-sm text-brand-slate leading-relaxed whitespace-pre-line">
                    {blockBody(block)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ── Divider: Stadt entdecken (Na-Max affiliate section) ─────────── */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
            {t(`${property.city} entdecken`, `Explore ${property.city}`)}
          </p>

          <div className="space-y-2">
            {AFFILIATE_ITEMS.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-2xl shadow-card border border-slate-100
                           px-4 py-3.5 hover:shadow-card-hover transition-shadow group"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="flex-1 text-sm font-medium text-brand-navy">
                  {lang === 'de' ? item.title_de : item.title_en}
                </span>
                <span className="text-brand-sky text-sm group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Powered by Na-Max ─────────────────────────────────────────────── */}
        <div className="text-center pt-4 pb-6">
          <a
            href="https://na-max.com"
            className="text-xs text-brand-muted hover:text-brand-sky transition-colors"
          >
            {t('Powered by', 'Powered by')} <span className="font-semibold">Na-Max</span>
          </a>
        </div>
      </div>
    </div>
  )
}
