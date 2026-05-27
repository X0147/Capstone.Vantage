/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
          midnight: '#0B132B',
          deep: '#1C2541',
          slate: '#94a3b8',
          surface: '#ffffff',
          accent: '#38bdf8',
          gold: '#D4AF37',
        },
        // map common colors for ease of use
        'bg-primary': '#0B132B',
        'bg-secondary': '#1C2541',
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
