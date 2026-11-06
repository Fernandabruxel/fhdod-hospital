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
          red: '#DC2626',      // Vermelho principal
          light: '#FEF2F2',    // Fundo rosado
          dark: '#991B1B',     // Vermelho escuro para textos
          gray: '#4B5563'      // Cinza para textos secundários
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte moderna
      }
    },
  },
  plugins: [],
}