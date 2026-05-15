'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import { PILOT_BULLETS } from '@/lib/constants'
import { scaleIn, transition, viewportOptions } from '@/lib/motion'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function PilotSection() {
  return (
    <SectionWrapper id="pilot" className="bg-brand-surface">
      <motion.div
        variants={scaleIn}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="relative rounded-3xl bg-gradient-to-br from-white to-brand-sky/5 border border-brand-sky/15 shadow-card-hover px-8 py-12 sm:px-16 sm:py-16 text-center overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-sky/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-teal/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-sky/10 text-brand-sky text-xs font-bold uppercase tracking-widest mb-6">
            14-Tage Pilot
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy text-balance mb-4">
            14 Tage testen — ohne Risiko,{' '}
            <span className="text-brand-sky">ohne Verpflichtung</span>
          </h2>

          <p className="text-brand-slate text-lg max-w-xl mx-auto mb-10">
            Aktivieren Sie Na-Max in Ihrem Hotel und sehen Sie das Ergebnis.
            Wenn Sie nicht begeistert sind, kostet Sie das nichts.
          </p>

          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
            {PILOT_BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2 text-sm text-brand-slate font-medium">
                <CheckCircleIcon className="w-4 h-4 text-brand-sky flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="mailto:pilot@na-max.com" size="lg">
              Jetzt Pilot starten
            </Button>
            <a
              href="mailto:pilot@na-max.com?subject=Demo%20anfragen"
              className="text-sm text-brand-sky hover:underline underline-offset-4 font-medium"
            >
              Lieber erst eine Demo ansehen →
            </a>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
