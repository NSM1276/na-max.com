'use client'

import { useState, useEffect } from 'react'

const PHONE = '4367764292055' // международный формат без +
const MESSAGE = encodeURIComponent('Hallo, ich interessiere mich für Na-Max für mein Hotel/meine Pension.')
const WA_URL = `https://wa.me/${PHONE}?text=${MESSAGE}`

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  // Появляется через 3 секунды — не мешает первому взгляду на сайт
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp kontaktieren"
      className="fixed bottom-24 right-5 z-40 group"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Pulsing rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping [animation-delay:0.4s]" />

      {/* Button */}
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 group-hover:scale-110 transition-transform duration-200">
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.651 4.83 1.79 6.858L2 30l7.347-1.768A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.89-1.608l-.422-.252-4.36 1.05 1.08-4.24-.277-.437A11.56 11.56 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4S27.6 9.59 27.6 16 22.41 27.6 16 27.6zm6.34-8.64c-.347-.174-2.055-1.013-2.374-1.129-.32-.116-.552-.174-.784.174-.232.347-.9 1.129-1.103 1.361-.203.232-.406.26-.753.087-.347-.174-1.465-.54-2.79-1.72-1.03-.92-1.726-2.055-1.929-2.402-.203-.347-.022-.535.152-.708.157-.156.347-.406.52-.61.174-.203.232-.347.347-.579.116-.232.058-.435-.029-.61-.087-.174-.784-1.89-1.074-2.589-.283-.68-.57-.587-.784-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.347-1.218 1.19-1.218 2.9s1.247 3.363 1.42 3.595c.174.232 2.452 3.74 5.942 5.246.83.358 1.479.572 1.984.732.834.265 1.593.228 2.193.138.669-.1 2.055-.84 2.345-1.652.29-.812.29-1.508.203-1.652-.086-.145-.318-.232-.666-.406z"/>
        </svg>
      </span>

      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-brand-ink text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
        Jetzt auf WhatsApp schreiben
        <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-brand-ink" />
      </span>
    </a>
  )
}
