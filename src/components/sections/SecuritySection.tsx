'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import { SECURITY } from '@/lib/constants'
import {
  ShieldCheckIcon,
  LockClosedIcon,
  ArchiveBoxIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'

const iconMap: Record<string, React.ElementType> = {
  ShieldCheckIcon,
  LockClosedIcon,
  ArchiveBoxIcon,
  ClipboardDocumentCheckIcon,
}

export default function SecuritySection() {
  return (
    <SectionWrapper className="bg-brand-navy text-white" id="security">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
          Sicherheit & DSGVO
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
          {SECURITY.headline}
        </h2>
        <p className="mt-4 text-white/70 leading-relaxed">
          {SECURITY.body}
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SECURITY.pillars.map((p, i) => {
          const Icon = iconMap[p.icon] ?? ShieldCheckIcon
          return (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              transition={{ ...transition, delay: i * 0.08 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/[0.08] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-sky/15 border border-brand-sky/30 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand-sky" />
              </div>
              <h3 className="text-base font-bold mb-1.5">{p.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{p.text}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Compliance badges */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={{ ...transition, delay: 0.4 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/40 font-medium uppercase tracking-widest"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Hosted in DE / AT
        </span>
        <span className="hidden sm:inline opacity-30">·</span>
        <span>DSGVO Art. 25 — Privacy by Design</span>
        <span className="hidden sm:inline opacity-30">·</span>
        <span>TLS 1.3 verschlüsselt</span>
      </motion.div>
    </SectionWrapper>
  )
}
