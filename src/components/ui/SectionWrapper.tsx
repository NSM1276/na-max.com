import type { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  dark?: boolean
  className?: string
}

export default function SectionWrapper({ children, id, dark, className = '' }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28 ${
        dark ? 'bg-brand-forest text-white' : 'bg-white'
      } ${className}`}
    >
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  )
}
