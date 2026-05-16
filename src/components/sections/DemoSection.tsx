'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import { useContent } from '@/lib/i18n'

// ─── Demo default data ────────────────────────────────────────────────────────
const DEFAULTS = {
  name:       'Pension Schönbrunn',
  city:       'Wien',
  wifi_name:  'GuestWifi',
  wifi_pass:  'wien2024',
  checkin:    '15:00',
  checkout:   '10:00',
  breakfast:  '7:00 – 10:00, Frühstücksraum EG',
  rules:      'Bitte Ruhezeiten von 22:00 – 8:00 einhalten.',
}

type DemoData = typeof DEFAULTS

// ─── Phone mockup wrapper ─────────────────────────────────────────────────────
function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[220px] sm:w-[260px]">
      {/* phone shell */}
      <div className="rounded-[2.5rem] border-[6px] border-brand-ink bg-brand-ink shadow-2xl overflow-hidden">
        {/* notch */}
        <div className="bg-brand-ink flex justify-center py-1.5">
          <div className="w-16 h-1.5 rounded-full bg-slate-700" />
        </div>
        {/* screen */}
        <div className="bg-white overflow-y-auto" style={{ height: 480 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Guest page preview (inside phone) ───────────────────────────────────────
function GuestPreview({ data, lang }: { data: DemoData; lang: 'de' | 'en' }) {
  const t = lang === 'de' ? {
    wifi: 'WLAN', checkin: 'Check-in', checkout: 'Check-out',
    breakfast: 'Frühstück', rules: 'Hausordnung', welcome: 'Willkommen',
    network: 'Netzwerk', password: 'Passwort', from: 'Von', until: 'Bis',
  } : {
    wifi: 'Wi-Fi', checkin: 'Check-in', checkout: 'Check-out',
    breakfast: 'Breakfast', rules: 'House Rules', welcome: 'Welcome',
    network: 'Network', password: 'Password', from: 'From', until: 'Until',
  }

  return (
    <div className="text-xs font-sans">
      {/* header photo placeholder */}
      <div className="w-full h-24 bg-gradient-to-br from-brand-sky/30 to-brand-sky/10 flex items-center justify-center">
        <span className="text-2xl">🏨</span>
      </div>

      {/* title bar */}
      <div className="px-3 pt-2 pb-1 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="font-bold text-[11px] text-brand-ink leading-tight">{data.name}</div>
          <div className="text-[9px] text-slate-400">{data.city} · {t.welcome}</div>
        </div>
        {/* DE/EN badge */}
        <div className="flex gap-0.5 text-[8px] font-semibold">
          <span className={`px-1 py-0.5 rounded ${lang === 'de' ? 'bg-brand-sky text-white' : 'text-slate-400'}`}>DE</span>
          <span className={`px-1 py-0.5 rounded ${lang === 'en' ? 'bg-brand-sky text-white' : 'text-slate-400'}`}>EN</span>
        </div>
      </div>

      {/* blocks */}
      <div className="px-3 py-2 flex flex-col gap-2">
        {/* WiFi */}
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <span>📶</span>
            <span className="font-semibold text-[10px] text-brand-ink">{t.wifi}</span>
          </div>
          <div className="text-[9px] text-slate-500">{t.network}: <span className="font-medium text-brand-ink">{data.wifi_name}</span></div>
          <div className="text-[9px] text-slate-500">{t.password}: <span className="font-medium text-brand-ink">{data.wifi_pass}</span></div>
        </div>

        {/* Check-in/out */}
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <span>🕐</span>
            <span className="font-semibold text-[10px] text-brand-ink">Check-in / Check-out</span>
          </div>
          <div className="text-[9px] text-slate-500">{t.from}: <span className="font-medium text-brand-ink">{data.checkin}</span></div>
          <div className="text-[9px] text-slate-500">{t.until}: <span className="font-medium text-brand-ink">{data.checkout}</span></div>
        </div>

        {/* Breakfast */}
        {data.breakfast && (
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="flex items-center gap-1 mb-1">
              <span>🍳</span>
              <span className="font-semibold text-[10px] text-brand-ink">{t.breakfast}</span>
            </div>
            <div className="text-[9px] text-slate-500">{data.breakfast}</div>
          </div>
        )}

        {/* Rules */}
        {data.rules && (
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="flex items-center gap-1 mb-1">
              <span>📋</span>
              <span className="font-semibold text-[10px] text-brand-ink">{t.rules}</span>
            </div>
            <div className="text-[9px] text-slate-500">{data.rules}</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Field component ──────────────────────────────────────────────────────────
function Field({
  label, value, onChange, multiline = false
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const cls = "w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-sky/40 bg-white placeholder:text-slate-300 text-brand-ink"
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{label}</label>
      {multiline ? (
        <textarea
          className={cls + ' resize-none'}
          rows={2}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          className={cls}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function DemoSection() {
  const [data, setData]   = useState<DemoData>(DEFAULTS)
  const [lang, setLang]   = useState<'de' | 'en'>('de')
  const [tab, setTab]     = useState<'content' | 'preview'>('content')
  const { UI } = useContent()

  function set(key: keyof DemoData) {
    return (v: string) => setData(d => ({ ...d, [key]: v }))
  }

  function reset() {
    setData(DEFAULTS)
  }

  return (
    <SectionWrapper id="demo" className="bg-white">
      {/* heading */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
          {UI.demo.kicker}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink mb-4">
          {UI.demo.headline}
        </h2>
        <p className="text-brand-muted max-w-xl mx-auto">
          {UI.demo.sub}
        </p>
      </motion.div>

      {/* demo container */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={{ ...transition, delay: 0.1 }}
        className="max-w-4xl mx-auto"
      >
        {/* mobile tab switcher (hidden on lg) */}
        <div className="flex lg:hidden mb-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <button
            onClick={() => setTab('content')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${tab === 'content' ? 'bg-brand-sky text-white' : 'text-slate-500'}`}
          >
            {UI.demo.tabEdit}
          </button>
          <button
            onClick={() => setTab('preview')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${tab === 'preview' ? 'bg-brand-sky text-white' : 'text-slate-500'}`}
          >
            {UI.demo.tabPreview}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* ── LEFT: Editor ── */}
          <div className={`${tab === 'preview' ? 'hidden lg:block' : ''}`}>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4">
              {/* editor header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs font-semibold text-slate-400">{UI.demo.adminPanel}</span>
                </div>
                <button
                  onClick={reset}
                  className="text-[10px] text-slate-400 hover:text-brand-sky font-medium transition-colors"
                >
                  {UI.demo.reset}
                </button>
              </div>

              {/* fields */}
              <Field label={UI.demo.fieldName} value={data.name} onChange={set('name')} />
              <Field label={UI.demo.fieldCity} value={data.city} onChange={set('city')} />

              <div className="grid grid-cols-2 gap-3">
                <Field label={UI.demo.fieldWifiName} value={data.wifi_name} onChange={set('wifi_name')} />
                <Field label={UI.demo.fieldWifiPass} value={data.wifi_pass} onChange={set('wifi_pass')} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label={UI.demo.fieldCheckin} value={data.checkin} onChange={set('checkin')} />
                <Field label={UI.demo.fieldCheckout} value={data.checkout} onChange={set('checkout')} />
              </div>

              <Field label={UI.demo.fieldBreakfast} value={data.breakfast} onChange={set('breakfast')} multiline />
              <Field label={UI.demo.fieldRules} value={data.rules} onChange={set('rules')} multiline />

              {/* fake save button */}
              <button
                className="w-full py-2.5 rounded-xl bg-brand-sky text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                onClick={() => {}} // intentionally no-op
              >
                {UI.demo.saved}
              </button>
            </div>
          </div>

          {/* ── RIGHT: Phone Preview ── */}
          <div className={`flex flex-col items-center gap-5 ${tab === 'content' ? 'hidden lg:flex' : ''}`}>
            {/* lang switcher */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1">
              <button
                onClick={() => setLang('de')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${lang === 'de' ? 'bg-white shadow text-brand-ink' : 'text-slate-400'}`}
              >
                🇩🇪 Deutsch
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${lang === 'en' ? 'bg-white shadow text-brand-ink' : 'text-slate-400'}`}
              >
                🇬🇧 English
              </button>
            </div>

            <PhoneMockup>
              <GuestPreview data={data} lang={lang} />
            </PhoneMockup>

            <p className="text-[11px] text-slate-400 text-center max-w-[220px]">
              {UI.demo.previewCaption}
            </p>
          </div>

        </div>
      </motion.div>
    </SectionWrapper>
  )
}
