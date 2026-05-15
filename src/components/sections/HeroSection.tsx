'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import { fadeInUp, transition } from '@/lib/motion'
import { HERO } from '@/lib/constants'

// 15-секундная hero-анимация. SSR=false — внутри используются
// requestAnimationFrame / ResizeObserver, server-rendering невозможен.
// Loading-fallback держит ту же высоту, чтобы layout не прыгал.
const NaMaxHero = dynamic(() => import('@/components/hero/NaMaxVideo'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 animate-pulse"
      aria-hidden="true"
    />
  ),
})

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-hero-radial flex items-center pt-16 pb-12 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 self-start"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-sky animate-pulse" />
              <span className="text-xs font-semibold text-brand-sky uppercase tracking-widest">
                {HERO.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ ...transition, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-brand-navy leading-[1.05] tracking-tight text-balance"
            >
              {HERO.headlineLine1}
              <br />
              <span className="text-brand-sky">{HERO.headlineLine2}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ ...transition, delay: 0.2 }}
              className="text-lg text-brand-slate leading-relaxed max-w-xl"
            >
              {HERO.subheadline}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ ...transition, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <Button href="#pilot" size="lg">
                14-Tage Pilot starten
              </Button>
              <Button href="#how-it-works" variant="ghost" size="lg">
                So funktioniert&apos;s
              </Button>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ ...transition, delay: 0.45 }}
              className="text-xs text-brand-muted"
            >
              {HERO.trustLine}
            </motion.p>
          </div>

          {/* Right — hero animation (15s loop, autoplay) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-card-hover ring-1 ring-slate-200/50 bg-[#f5f7fa]"
              role="img"
              aria-label="Na-Max Demo: Gast scannt QR-Code, Personal erhält Anfrage in Echtzeit"
            >
              <NaMaxHero />
            </div>
          </motion.div>
        </div>

        {/* Social proof micro-line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-14 flex items-center gap-3 text-sm text-brand-muted"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-sky/30 to-brand-teal/30 border-2 border-white"
              />
            ))}
          </div>
          <span>Bereits in Pilothotels in Österreich im Einsatz</span>
        </motion.div>
      </div>
    </section>
  )
}
