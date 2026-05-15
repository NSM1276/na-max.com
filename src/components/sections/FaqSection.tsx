'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import { FAQ } from '@/lib/constants'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionWrapper className="bg-brand-surface" id="faq">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
          Häufige Fragen
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
          Was Hoteliers vor dem Pilot wissen wollen
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <motion.div
              key={item.q}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              transition={{ ...transition, delay: i * 0.04 }}
              className={`
                rounded-2xl border bg-white overflow-hidden transition-all duration-200
                ${isOpen ? 'border-brand-sky/40 shadow-card' : 'border-slate-200 shadow-sm hover:shadow-card'}
              `}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className={`text-sm sm:text-[15px] font-semibold leading-snug transition-colors ${isOpen ? 'text-brand-navy' : 'text-brand-navy'}`}>
                  {item.q}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 flex-shrink-0 text-brand-sky transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 pb-4 text-sm text-brand-slate leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Contact fallback */}
      <motion.p
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={{ ...transition, delay: 0.3 }}
        className="mt-8 text-center text-sm text-brand-muted"
      >
        Weitere Fragen?{' '}
        <a href="mailto:pilot@na-max.com" className="text-brand-sky font-semibold hover:underline">
          pilot@na-max.com
        </a>
      </motion.p>
    </SectionWrapper>
  )
}
