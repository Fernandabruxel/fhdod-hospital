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
<<<<<<< HEAD
          red: '#DC2626',   // O vermelho principal
          light: '#FEF2F2', // O fundo rosado claro
          dark: '#991B1B'   // Vermelho escuro para hover
=======
          red: '#DC2626',      // Vermelho principal
          light: '#FEF2F2',    // Fundo rosado
          dark: '#991B1B',     // Vermelho escuro para textos
          gray: '#4B5563'      // Cinza para textos secundários
>>>>>>> c9d6cd021894003d615d3045a8345270e5e7d58e
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte moderna
      }
    },
  },
  plugins: [],
}