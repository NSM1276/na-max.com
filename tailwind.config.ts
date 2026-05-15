import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy':     '#0F1E2E',
        'brand-forest':   '#1A3A2E',
        'brand-sky':      '#0EA5E9',
        'brand-sky-dark': '#0284C7',
        'brand-teal':     '#0D9488',
        'brand-slate':    '#334155',
        'brand-muted':    '#94A3B8',
        'brand-surface':  '#F8FAFC',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':       '0 2px 8px rgba(15,30,46,0.06), 0 1px 2px rgba(15,30,46,0.04)',
        'card-hover': '0 12px 32px rgba(15,30,46,0.10), 0 4px 8px rgba(15,30,46,0.06)',
        'cta':        '0 4px 16px rgba(14,165,233,0.35)',
        'cta-hover':  '0 6px 24px rgba(14,165,233,0.45)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.07) 0%, transparent 70%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
