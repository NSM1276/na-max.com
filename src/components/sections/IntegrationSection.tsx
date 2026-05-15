'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { TRUST_PILLARS } from '@/lib/constants'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import {
  ClockIcon,
  WifiIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

const iconMap: Record<string, React.ElementType> = {
  ClockIcon,
  WifiIcon,
  ShieldCheckIcon,
}

export default function IntegrationSection() {
  return (
    <SectionWrapper dark>
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-12"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
          Keine Integration notwendig
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">
          Kein IT-Projekt.{' '}
          <span className="text-brand-sky">Kein Risiko.</span>{' '}
          Einfach starten.
        </h2>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
          Na-Max läuft neben Ihrem bestehenden System — egal welches. Keine
          Anbindung, keine Migration, keine Änderungen an Ihrer IT.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6 mt-10">
        {TRUST_PILLARS.map((pillar, i) => {
          const Icon = iconMap[pillar.icon] || ClockIcon
          return (
            <motion.div
              key={pillar.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              transition={{ ...transition, delay: i * 0.12 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/8 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-sky/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-brand-sky" />
              </div>
              <h3 className="font-bold text-white text-lg mb-1">{pillar.title}</h3>
              <p className="text-white/60 text-sm">{pillar.subtitle}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.p
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={{ ...transition, delay: 0.45 }}
        className="mt-10 text-center text-sm text-white/40"
      >
        Funktioniert mit jedem Hotelsystem — ohne Zugang, ohne Anpassung.
      </motion.p>
    </SectionWrapper>
  )
}
