'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { useContent } from '@/lib/i18n'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'

export default function HowItWorksSection() {
  const { STEPS, UI } = useContent()
  return (
    <SectionWrapper id="how-it-works" className="bg-brand-surface">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-14"
      >
        <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
          {UI.howItWorks.kicker}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy text-balance">
          {UI.howItWorks.headline}
        </h2>
        <p className="mt-3 text-brand-slate max-w-xl mx-auto">
          {UI.howItWorks.sub}
        </p>
      </motion.div>

      {/* Steps */}
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-sky/30 to-transparent" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              transition={{ ...transition, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number circle */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-brand-sky flex items-center justify-center shadow-cta mb-5">
                <span className="text-white text-xl font-bold">{step.number}</span>
              </div>

              <h3 className="font-semibold text-brand-navy text-base mb-2">{step.title}</h3>
              <p className="text-sm text-brand-slate leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA hint */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={{ ...transition, delay: 0.5 }}
        className="mt-14 text-center"
      >
        <p className="text-sm text-brand-muted">
          {UI.howItWorks.bottomLine}
        </p>
      </motion.div>
    </SectionWrapper>
  )
}
