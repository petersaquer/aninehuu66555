import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx,jsx,js}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        sm: '0.875rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
