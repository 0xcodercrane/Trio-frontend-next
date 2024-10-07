import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  safelist: [
    'bg-gradient-to-b',
    'bg-gradient-to-bl',
    'bg-gradient-to-br',
    'bg-gradient-to-l',
    'bg-gradient-to-r',
    'bg-gradient-to-t',
    'bg-gradient-to-tl',
    'bg-gradient-to-tr',
    'w-[350px]'
  ],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    screens: {
      xs: '320px',

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1092px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1600px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '2048px'
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-satoshi-variable)']
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        'ob-white-20': 'rgba(255, 255, 255, 0.2)',
        'ob-white-30': 'rgba(255, 255, 255, 0.3)',
        'ob-white-40': 'rgba(255, 255, 255, 0.4)',
        'ob-white-50': 'rgba(255, 255, 255, 0.5)',
        'ob-white-60': 'rgba(255, 255, 255, 0.6)',
        'ob-white-70': 'rgba(255, 255, 255, 0.7)',
        'ob-white-80': 'rgba(255, 255, 255, 0.8)',
        'ob-black': '#0D0D0D',
        'ob-black-light': '#1b1b1b',
        'ob-black-lighter': '#131313',
        'ob-black-lightest': '#161616',
        'ob-grey': '#242424',
        'ob-grey-light': '#252525',
        'ob-grey-lighter': '#727272',
        'ob-grey-lightest': '#B5B5B5',
        'ob-text-grey': '#868686',
        'ob-blue': '#3349FF',
        'ob-green-light': '#33FF81',
        'ob-green': '#13C657',
        'ob-red-dark': '#E60019',
        'ob-red': '#FF001B',
        'ob-red-light': '#FF1A32',
        'ob-red-lighter': '#FF3349',
        'ob-red-lightest': '#FF6677',
        'ob-turquoise': '#30D5C8'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [tailwindcssAnimate]
} satisfies Config;

export default config;
