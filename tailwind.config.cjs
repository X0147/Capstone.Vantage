/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        // Enforcing strict 8px grid scales
        '2xs': '4px',
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        '2xl': '64px',
      },
      colors: {
        vantage: {
          midnight: '#050A15', // Richer, deeper black-navy
          deep: '#0F172A',     // Slate 900 for dark mode elevation
          slate: '#94a3b8',
          surface: '#ffffff',
          accent: '#38bdf8',   // Kept the bright sky blue accent
          gold: '#C5A059',     // Refined, subtle gold
          muted: '#64748B',    // Slate 500 for secondary text
        },
        // map common colors for ease of use
        'bg-primary': '#050A15',
        'bg-secondary': '#0F172A',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
