/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#27f5ff',
          green: '#72ffa0',
          panel: '#0d1727',
          border: '#1d314d',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(39, 245, 255, 0.18)',
      },
    },
  },
  plugins: [],
};
