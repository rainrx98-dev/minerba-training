import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts}',
  ],
  safelist: [
    // Persona hover backgrounds (constructed dynamically as `hover:${persona.bgClass}`)
    'hover:bg-amber-50',
    'hover:bg-blue-50',
    'hover:bg-red-50',
    'hover:bg-navy-50',
    'hover:bg-green-50',
    // Persona border-l variants (constructed dynamically in ChatInterface)
    'border-l-4',
    'border-amber-500',
    'border-blue-600',
    'border-red-500',
    'border-navy-500',
    'border-green-600',
  ],
  theme: {
    extend: {
      colors: {
        // MINERBA brand palette — anchored to #005A9E (extracted from logo)
        navy: {
          50:  '#E8F3FA',
          100: '#C5DCF1',
          200: '#89BDE3',
          300: '#4C9FD4',
          400: '#1A7FC0',
          500: '#005A9E',   // ← MINERBA brand blue (primary CTA, accents)
          600: '#004A83',
          700: '#003A68',   // ← dark hero / nav backgrounds
          800: '#002A4D',
          900: '#001A31',
        },
        gold: {
          DEFAULT: '#C9922A',
          light: '#e6b84f',
          dark:  '#a37220',
        },
        crisis: {
          red:        '#8B1A1A',
          redLight:   '#fef2f2',
          amber:      '#B45309',
          amberLight: '#fffbeb',
          green:      '#166534',
          greenLight: '#f0fdf4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1A1A2E',
            h1: { color: '#003A68', fontWeight: '700' },
            h2: { color: '#003A68', fontWeight: '600' },
            h3: { color: '#003A68', fontWeight: '600' },
            'thead th': { color: '#003A68' },
            a: { color: '#005A9E' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
