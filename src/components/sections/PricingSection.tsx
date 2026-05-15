'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import { PRICING, PRICING_EXTRAS } from '@/lib/constants'
import { CheckIcon } from '@heroicons/react/24/solid'

export default function PricingSection() {
  return (
    <SectionWrapper className="bg-white" id="pricing">
      {/* Heading */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
          Preise & Pakete
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
          Transparent. Monatlich kündbar. Keine Einrichtungsgebühr.
        </h2>
        <p className="mt-3 text-brand-slate leading-relaxed">
          Ein Tarif pro Betrieb — keine versteckten Kosten pro Anfrage, kein Setup-Fee,
          keine 24-Monatsverträge. Pilot starten, in 14 Tagen entscheiden.
        </p>
      </motion.div>

      {/* Pricing grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {PRICING.map((plan, i) => (
          <motion.div
            key={plan.id}
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            transition={{ ...transition, delay: i * 0.08 }}
            className={`
              relative flex flex-col rounded-2xl border bg-white overflow-hidden
              transition-all duration-300
              ${plan.highlighted
                ? 'border-brand-sky shadow-cta scale-100 lg:scale-[1.04] lg:-translate-y-1'
                : 'border-slate-200 shadow-card hover:shadow-card-hover'}
            `}
          >
            {/* "Beliebt" badge */}
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-brand-sky rounded-b-md">
                  Beliebt
                </span>
              </div>
            )}

            {/* Header */}
            <div className="p-6 pt-7">
              <h3 className="text-base font-bold text-brand-navy">{plan.name}</h3>
              <p className="mt-1 text-xs text-brand-muted">{plan.bestFor}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-brand-navy tracking-tight">
                  {plan.priceLabel}
                </span>
                <span className="text-sm text-brand-muted">{plan.priceUnit}</span>
              </div>
              <p className="mt-1 text-xs text-brand-muted font-medium">
                {plan.roomsLabel}
              </p>
            </div>

            {/* Features */}
            <ul className="flex-1 px-6 pb-6 space-y-2.5 border-t border-slate-100 pt-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-slate leading-snug">
                  <CheckIcon
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-brand-sky' : 'text-emerald-500'}`}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="p-5 pt-0">
              <a
                href="#pilot"
                className={`
                  block w-full text-center py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-150
                  ${plan.highlighted
                    ? 'bg-brand-sky text-white hover:bg-brand-sky-dark shadow-cta'
                    : 'bg-brand-navy/5 text-brand-navy hover:bg-brand-navy/10'}
                `}
              >
                {plan.ctaLabel}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Extras row */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={{ ...transition, delay: 0.3 }}
        className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto"
      >
        {PRICING_EXTRAS.map((extra) => (
          <div key={extra} className="flex items-start gap-2 text-xs text-brand-slate leading-snug">
            <CheckIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand-sky" />
            <span>{extra}</span>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
