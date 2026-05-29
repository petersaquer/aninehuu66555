import type { Config } from 'tailwindcss';

export default {
  content: [
    './client/src/**/*.{ts,tsx,jsx,js}',
    './client/index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Sora', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    extend: {
      spacing: {
        15: '3.75rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
