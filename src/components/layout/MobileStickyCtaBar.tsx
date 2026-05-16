'use client'

import { useEffect, useRef, useState } from 'react'
import { useContent } from '@/lib/i18n'

export default function MobileStickyCtaBar() {
  const [visible, setVisible] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { UI } = useContent()

  useEffect(() => {
    const target = document.getElementById('final-cta')
    if (!target) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    observerRef.current.observe(target)

    return () => observerRef.current?.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-100 shadow-lg md:hidden">
      <a
        href="#pilot"
        className="block w-full text-center px-6 py-3.5 rounded-xl bg-brand-sky text-white font-semibold text-base shadow-cta hover:bg-brand-sky-dark transition-all duration-200"
      >
        {UI.mobileCta.label}
      </a>
    </div>
  )
}
