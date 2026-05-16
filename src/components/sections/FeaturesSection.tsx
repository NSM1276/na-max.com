'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { useContent } from '@/lib/i18n'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import {
  ShoppingCartIcon,
  BellSlashIcon,
  BoltIcon,
  LanguageIcon,
  ChartBarIcon,
  SignalIcon,
} from '@heroicons/react/24/outline'

const iconMap: Record<string, React.ElementType> = {
  ShoppingCartIcon,
  BellSlashIcon,
  BoltIcon,
  LanguageIcon,
  ChartBarIcon,
  SignalIcon,
}

export default function FeaturesSection() {
  const { FEATURES, UI } = useContent()
  return (
    <SectionWrapper id="features">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
          {UI.features.kicker}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy text-balance">
          {UI.features.headline}
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((feature, i) => {
          const Icon = iconMap[feature.icon] || BoltIcon
          return (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              transition={{ ...transition, delay: i * 0.08 }}
              whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(15,30,46,0.10)' }}
              className="relative flex flex-col gap-3 p-6 rounded-2xl bg-brand-surface border border-gray-100 shadow-card transition-colors duration-200 cursor-default"
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal text-[10px] font-semibold uppercase tracking-wider">
                  {feature.badge}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-brand-sky/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-sky" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-navy text-base mb-1">{feature.title}</h3>
                <p className="text-sm text-brand-slate leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
