/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#2d2d2d', // Base dark blue
        lightBlue: '#3B82F6', // Accent blue
        deepBlue: '#111827', // Background blue
        grayishBlue: '#64748B', // Text and muted colors
      },
    },
  },
  plugins: [],
}

