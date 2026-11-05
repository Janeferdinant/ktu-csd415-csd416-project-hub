/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040711',
          900: '#070B19',
          800: '#0D152E',
          700: '#142045',
          600: '#1C2C5E',
        },
        burgundy: {
          950: '#2A050B',
          900: '#4A0E17',
          800: '#6B1724',
          700: '#8A1D2E',
          600: '#B02A40',
        },
        gold: {
          50: '#FAF7EE',
          100: '#F3EDD5',
          200: '#E7DBAC',
          300: '#DBC882',
          400: '#D4AF37', // Champagne Gold
          500: '#BF9829',
          600: '#9E7A1C',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-gold': '0 8px 32px 0 rgba(212, 175, 55, 0.15)',
        'glass-burgundy': '0 8px 32px 0 rgba(107, 23, 36, 0.25)',
      }
    },
  },
  plugins: [],
}

