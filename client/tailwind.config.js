// tailwind.config.js

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
    mono: ['"Fira Code"', 'monospace'],
    orbitron: ['Orbitron', 'sans-serif'],
  },},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
