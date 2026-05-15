'use client'

import { motion } from 'framer-motion'
import { scaleIn, transition, viewportOptions } from '@/lib/motion'

export default function FinalCtaSection() {
  return (
    <section id="final-cta" className="w-full bg-brand-navy px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <motion.div
        variants={scaleIn}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight text-balance">
          Mehr Umsatz.{' '}
          <span className="text-brand-sky">Weniger Aufwand.</span>{' '}
          Ab morgen.
        </h2>

        <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
          Starten Sie Ihren kostenlosen 14-Tage-Pilot — fertig in 24 Stunden.
          Kein Risiko, keine Verpflichtung.
        </p>

        <div className="mt-10">
          <motion.a
            href="mailto:pilot@na-max.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-8 py-4 rounded-xl bg-brand-sky text-white font-bold text-lg shadow-cta hover:bg-brand-sky-dark hover:shadow-cta-hover transition-all duration-200"
          >
            Pilot starten
          </motion.a>
        </div>

        <p className="mt-5 text-sm text-white/35">
          Keine Kreditkarte&nbsp;·&nbsp;Kein IT-Aufwand&nbsp;·&nbsp;Jederzeit kündbar
        </p>
      </motion.div>
    </section>
  )
}
