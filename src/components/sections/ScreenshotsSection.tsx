'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'

// 3 stylized screenshots: Staff Dashboard, Admin Panel, Guest Mobile
// Не плейсхолдеры — отрисованы под реальные UI Na-Max

export default function ScreenshotsSection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-white to-brand-surface" id="screenshots">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
          So sieht es aus
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
          Drei Oberflächen, ein System
        </h2>
        <p className="mt-3 text-brand-slate leading-relaxed">
          Gast bestellt am Smartphone. Personal arbeitet im Dashboard.
          Management konfiguriert im Admin-Panel.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {/* 1. Guest Mobile */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          transition={{ ...transition, delay: 0 }}
          className="flex flex-col items-center"
        >
          <GuestPhoneMockup />
          <p className="mt-5 text-sm font-bold text-brand-navy">Gast — am Smartphone</p>
          <p className="text-xs text-brand-muted text-center mt-1 max-w-[14rem]">
            Browser-basiert. Kein App-Download. Bestellung in 3 Klicks.
          </p>
        </motion.div>

        {/* 2. Staff Dashboard */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          transition={{ ...transition, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <StaffDashboardMockup />
          <p className="mt-5 text-sm font-bold text-brand-navy">Personal — Echtzeit-Dashboard</p>
          <p className="text-xs text-brand-muted text-center mt-1 max-w-[14rem]">
            Live-Anfragen mit Filtern, Statusänderung per Klick.
          </p>
        </motion.div>

        {/* 3. Admin Panel */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          transition={{ ...transition, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <AdminPanelMockup />
          <p className="mt-5 text-sm font-bold text-brand-navy">Admin — Konfiguration</p>
          <p className="text-xs text-brand-muted text-center mt-1 max-w-[14rem]">
            Zimmer, Mitarbeiter, Services & Branding pro Hotel.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

// ─────────────────────────────────────────────
// Guest mobile mockup
// ─────────────────────────────────────────────

function GuestPhoneMockup() {
  return (
    <div className="relative w-56">
      <div className="rounded-[2.2rem] border-[5px] border-brand-navy bg-brand-navy shadow-card-hover overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-brand-navy rounded-b-xl z-10" />
        <div className="bg-white rounded-[1.8rem] overflow-hidden">
          {/* status bar */}
          <div className="bg-brand-navy h-6" />
          {/* hotel header */}
          <div className="bg-brand-sky px-4 pt-4 pb-3">
            <p className="text-white text-[10px] font-bold leading-none">Hotel Mirabell</p>
            <p className="text-white/70 text-[8px] mt-1">Zimmer 204 · Online</p>
          </div>
          {/* services */}
          <div className="p-3 space-y-1.5 bg-brand-surface">
            <p className="text-[9px] text-brand-muted uppercase tracking-wider mb-2">
              Wie können wir helfen?
            </p>
            {[
              { e: '🍽', t: 'Frühstück bestellen', sub: '6:00 – 11:00' },
              { e: '🧺', t: 'Frische Handtücher',  sub: 'In 15 Min.' },
              { e: '🅿', t: 'Parkplatz buchen',    sub: 'Pro Nacht' },
              { e: '🌿', t: 'Wellness',             sub: 'Massage, Sauna' },
            ].map((item) => (
              <div key={item.t} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 shadow-sm">
                <span className="text-[14px]">{item.e}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-semibold text-brand-navy leading-tight">{item.t}</p>
                  <p className="text-[7px] text-brand-muted leading-tight">{item.sub}</p>
                </div>
                <svg className="w-2.5 h-2.5 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-brand-sky/20 blur-xl rounded-full" />
    </div>
  )
}

// ─────────────────────────────────────────────
// Staff Dashboard mockup (соответствует реальному /staff/dashboard)
// ─────────────────────────────────────────────

function StaffDashboardMockup() {
  return (
    <div className="w-full max-w-xs rounded-xl border border-slate-200 bg-white overflow-hidden shadow-card-hover">
      {/* header */}
      <div className="bg-brand-navy px-3 py-2.5 flex items-center justify-between">
        <span className="text-white text-xs font-bold">
          Na<span className="text-brand-sky">-</span>Max <span className="text-white/40 mx-1">|</span> Anfragen
        </span>
        <span className="flex items-center gap-1 text-[9px] text-emerald-400">
          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Live
        </span>
      </div>
      {/* tabs */}
      <div className="flex gap-1 p-1.5 bg-[#F1F5F9]">
        <span className="px-2 py-0.5 rounded text-[9px] font-semibold text-white bg-brand-navy">Alle</span>
        <span className="px-2 py-0.5 rounded text-[9px] font-medium text-slate-500 flex items-center gap-1">
          Neu <span className="w-3.5 h-3.5 rounded-full bg-amber-500 text-white text-[7px] font-bold flex items-center justify-center">2</span>
        </span>
        <span className="px-2 py-0.5 rounded text-[9px] font-medium text-slate-500">In Bearb.</span>
      </div>
      {/* request cards */}
      <div className="p-2 space-y-1.5 bg-[#F1F5F9]">
        {[
          { room: '204', cat: 'Zimmerreinigung', time: '5 Min.', status: 'Neu',          dot: 'bg-amber-500',  bg: 'bg-amber-50',  txt: 'text-amber-800'  },
          { room: '102', cat: 'Room Service',    time: '12 Min.', status: 'In Bearb.',   dot: 'bg-sky-500',    bg: 'bg-sky-50',    txt: 'text-sky-800'    },
          { room: '301', cat: 'Frühstück',       time: '18 Min.', status: 'In Bearb.',   dot: 'bg-sky-500',    bg: 'bg-sky-50',    txt: 'text-sky-800'    },
        ].map((r) => (
          <div key={r.room} className="rounded-lg bg-white border border-slate-100 p-2 shadow-sm">
            <div className="flex items-start justify-between mb-1">
              <span className="text-base font-bold text-brand-navy leading-none">{r.room}</span>
              <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${r.bg} ${r.txt} flex items-center gap-1`}>
                <span className={`w-1 h-1 rounded-full ${r.dot}`} />
                {r.status}
              </span>
            </div>
            <p className="text-[9px] text-slate-600">{r.cat}</p>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[7px] text-brand-muted">vor {r.time}</span>
              <button className="text-[8px] font-semibold text-white bg-brand-sky rounded px-1.5 py-0.5">
                Annehmen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Admin Panel mockup
// ─────────────────────────────────────────────

function AdminPanelMockup() {
  return (
    <div className="w-full max-w-xs rounded-xl border border-slate-200 bg-white overflow-hidden shadow-card-hover">
      {/* header */}
      <div className="bg-brand-navy px-3 py-2.5 flex items-center justify-between">
        <span className="text-white text-xs font-bold">
          Na<span className="text-brand-sky">-</span>Max <span className="text-white/40 mx-1">|</span> Admin
        </span>
        <span className="text-[8px] text-white/50">hotel-sacher</span>
      </div>
      {/* tabs */}
      <div className="flex border-b border-slate-100 text-[9px] font-semibold">
        <span className="px-3 py-2 border-b-2 border-brand-sky text-brand-navy">Zimmer</span>
        <span className="px-3 py-2 text-slate-400">Mitarbeiter</span>
        <span className="px-3 py-2 text-slate-400">Services</span>
      </div>
      {/* rooms list */}
      <div className="p-2 bg-[#F8FAFC]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-brand-navy">42 Zimmer</span>
          <button className="text-[8px] font-semibold text-white bg-brand-sky rounded px-2 py-1">
            + Hinzufügen
          </button>
        </div>
        <div className="space-y-1">
          {[
            { num: '101', floor: 'EG',  active: true  },
            { num: '102', floor: 'EG',  active: true  },
            { num: '201', floor: '1. OG', active: true  },
            { num: '301', floor: '2. OG', active: false },
          ].map((r) => (
            <div key={r.num} className="flex items-center justify-between bg-white rounded px-2 py-1.5 border border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${r.active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <div>
                  <p className="text-[10px] font-bold text-brand-navy leading-none">{r.num}</p>
                  <p className="text-[7px] text-brand-muted mt-0.5">{r.floor}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <span className="text-[7px] text-brand-muted">QR</span>
                <svg className="w-2.5 h-2.5 text-brand-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm12 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
