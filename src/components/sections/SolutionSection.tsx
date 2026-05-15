'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeInLeft, fadeInRight, transition, viewportOptions } from '@/lib/motion'
import { SOLUTION } from '@/lib/constants'

export default function SolutionSection() {
  return (
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — copy + metrics */}
        <motion.div
          variants={fadeInLeft}
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          transition={transition}
          className="flex flex-col gap-6"
        >
          <div>
            <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
              Die Lösung
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight text-balance">
              {SOLUTION.headline}
            </h2>
          </div>

          <p className="text-brand-slate leading-relaxed text-lg">
            {SOLUTION.body}
          </p>

          {/* Metrics grid — 2×2 */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {SOLUTION.bullets.map((b) => (
              <div
                key={b.label}
                className="rounded-xl border border-slate-100 bg-white p-4 shadow-card"
              >
                <p className="text-2xl sm:text-[1.7rem] font-bold text-brand-sky leading-none tracking-tight">
                  {b.kpi}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-brand-navy leading-snug">
                  {b.label}
                </p>
                <p className="mt-1 text-[11px] text-brand-muted leading-snug">
                  {b.note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — phone frame */}
        <motion.div
          variants={fadeInRight}
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          transition={transition}
          className="flex justify-center"
        >
          <PhoneFrame />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

function PhoneFrame() {
  return (
    <div className="relative w-56 mx-auto">
      {/* Phone shell */}
      <div className="relative rounded-[2.5rem] border-[6px] border-brand-navy bg-brand-navy shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-brand-navy rounded-b-xl z-10" />

        {/* Screen */}
        <div className="bg-white rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="bg-brand-navy h-8" />

          {/* App header */}
          <div className="bg-brand-sky px-4 py-3">
            <p className="text-white text-[11px] font-bold">Hotel Mirabell · Zimmer 301</p>
            <p className="text-white/70 text-[9px] mt-0.5">Guten Morgen! Was darf es sein?</p>
          </div>

          {/* Content */}
          <div className="p-3 space-y-2 bg-brand-surface">
            {[
              { emoji: '☕', text: 'Frühstück bestellen' },
              { emoji: '🧹', text: 'Zimmerservice' },
              { emoji: '🅿️', text: 'Parkplatz verlängern' },
              { emoji: '🌿', text: 'Spa buchen' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm"
              >
                <span className="text-sm">{item.emoji}</span>
                <span className="text-[10px] font-medium text-brand-navy">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="bg-white px-4 py-3 border-t border-gray-100 flex items-center gap-1.5">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400" />
            <span className="text-[9px] text-brand-muted">Powered by Na-Max</span>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-brand-sky/20 blur-xl rounded-full" />
    </div>
  )
}
