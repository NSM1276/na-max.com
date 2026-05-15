import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
}

export const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const transition = {
  duration: 0.45,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
}

export const viewportOptions = { once: true, margin: '-60px' }
