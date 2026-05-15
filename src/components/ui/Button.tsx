'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'lg'
  href?: string
  onClick?: () => void
  children: ReactNode
  fullWidth?: boolean
  className?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  fullWidth,
  className = '',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer'

  const sizes = {
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  const variants = {
    primary: 'bg-brand-sky text-white shadow-cta hover:bg-brand-sky-dark hover:shadow-cta-hover',
    ghost: 'border border-brand-navy/20 text-brand-navy hover:border-brand-navy/50 hover:bg-brand-navy/5',
  }

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
