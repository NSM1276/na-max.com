'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { useContent } from '@/lib/i18n'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import {
  UserGroupIcon,
  CurrencyEuroIcon,
  GlobeAltIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline'

const iconMap: Record<string, React.ElementType> = {
  UserGroupIcon,
  CurrencyEuroIcon,
  GlobeAltIcon,
  EyeSlashIcon,
}

export default function ProblemSection() {
  const { PROBLEMS, UI } = useContent()
  return (
    <SectionWrapper className="bg-brand-surface">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
          {UI.problem.kicker}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy text-balance">
          {UI.problem.headline}
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {PROBLEMS.map((problem, i) => {
          const Icon = iconMap[problem.icon] || UserGroupIcon
          return (
            <motion.div
              key={problem.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              transition={{ ...transition, delay: i * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-sky/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-sky" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-navy text-base mb-1">{problem.title}</h3>
                <p className="text-sm text-brand-slate leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
