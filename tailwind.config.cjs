/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '3xs': '2px',
        '2xs': '4px',
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        '2xl': '64px',
        '3xl': '96px',
      },
      colors: {
        vantage: {
          midnight: '#040810',
          deep: '#0a1120',
          dark: '#0f1a2e',
          slate: '#1e2d4a',
          muted: '#64748b',
          text: '#cbd5e1',
          surface: '#f1f5f9',
          accent: '#38bdf8',
          'accent-dark': '#0ea5e9',
          gold: '#c5a059',
          'gold-light': '#d4b06a',
          emerald: '#34d399',
        },
      },
      boxShadow: {
        'glow-accent': '0 0 30px rgba(56, 189, 248, 0.25), 0 0 60px rgba(56, 189, 248, 0.1)',
        'glow-gold': '0 0 30px rgba(197, 160, 89, 0.25), 0 0 60px rgba(197, 160, 89, 0.1)',
        'glow-sm': '0 0 15px rgba(56, 189, 248, 0.2)',
        'card': '0 4px 32px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05)',
        'card-hover': '0 8px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(56, 189, 248, 0.15)',
        'nav': '0 1px 0 rgba(255, 255, 255, 0.06), 0 4px 32px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom, rgba(4,8,16,0) 0%, rgba(4,8,16,0.6) 40%, rgba(4,8,16,1) 100%)',
        'card-overlay': 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
        'shimmer-gold': 'linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.15) 50%, transparent 100%)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'shimmer-gold': 'shimmerPass 3s infinite linear',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shimmerPass: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(56, 189, 248, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
