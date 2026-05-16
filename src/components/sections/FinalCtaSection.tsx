'use client'

import { motion } from 'framer-motion'
import { scaleIn, transition, viewportOptions } from '@/lib/motion'
import { useContent } from '@/lib/i18n'

export default function FinalCtaSection() {
  const { UI } = useContent()
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
          {UI.finalCta.headlinePart1}{' '}
          <span className="text-brand-sky">{UI.finalCta.headlinePart2}</span>{' '}
          {UI.finalCta.headlinePart3}
        </h2>

        <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
          {UI.finalCta.sub}
        </p>

        <div className="mt-10">
          <motion.a
            href="mailto:pilot@na-max.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-8 py-4 rounded-xl bg-brand-sky text-white font-bold text-lg shadow-cta hover:bg-brand-sky-dark hover:shadow-cta-hover transition-all duration-200"
          >
            {UI.finalCta.cta}
          </motion.a>
        </div>

        <p className="mt-5 text-sm text-white/35">
          {UI.finalCta.footer}
        </p>
      </motion.div>
    </section>
  )
}
