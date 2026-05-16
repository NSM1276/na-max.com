'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import { useContent } from '@/lib/i18n'

const placeholderLogos = [
  { name: 'Hotel Sacher', initials: 'HS' },
  { name: 'Grand Hotel', initials: 'GH' },
  { name: 'Hotel Mirabell', initials: 'HM' },
  { name: 'Boutique Suites', initials: 'BS' },
]

export default function TrustSection() {
  const { UI } = useContent()
  return (
    <SectionWrapper className="border-t border-gray-100">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-10"
      >
        <p className="text-sm text-brand-muted font-medium">
          {UI.trust.intro}
        </p>
      </motion.div>

      {/* Logo row */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={{ ...transition, delay: 0.1 }}
        className="flex items-center justify-center flex-wrap gap-6 mb-14"
      >
        {placeholderLogos.map((logo) => (
          <div
            key={logo.name}
            title={logo.name}
            className="flex items-center justify-center w-28 h-12 rounded-xl border border-gray-200 bg-brand-surface opacity-50 hover:opacity-80 transition-opacity duration-300 cursor-default"
          >
            <span className="text-xs font-bold text-brand-slate tracking-widest">{logo.initials}</span>
          </div>
        ))}
      </motion.div>

      {/* Testimonial */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={{ ...transition, delay: 0.2 }}
        className="max-w-2xl mx-auto text-center"
      >
        <svg
          className="w-8 h-8 text-brand-sky/40 mx-auto mb-4"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.657 1.343-3 3-3V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.657 1.343-3 3-3V8z" />
        </svg>

        <blockquote className="text-lg text-brand-navy font-medium leading-relaxed text-balance italic">
          {UI.trust.quote}
        </blockquote>

        <div className="mt-5 text-sm text-brand-muted">
          <span className="font-semibold text-brand-slate">{UI.trust.authorRole}</span>
          {' · '}
          <span>{UI.trust.authorLocation}</span>
          {' · '}
          <span className="italic">{UI.trust.authorNote}</span>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
