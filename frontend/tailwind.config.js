/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fhdod: {
          red: '#DC2626',   // O vermelho principal
          light: '#FEF2F2', // O fundo rosado claro
          dark: '#991B1B'   // Vermelho escuro para hover
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte moderna
      }
    },
  },
  plugins: [],
}