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
          red: '#DC2626',      // O vermelho principal dos botões
          hover: '#B91C1C',    // Vermelho escuro para o hover
          light: '#FEF2F2',    // Fundo rosado bem clarinho
          bg: '#FFF5F5',       // Fundo geral da página (degradê suave)
          text: '#1F2937'      // Cor do texto (cinza escuro)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte limpa e moderna
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // Sombra suave das imagens
      }
    },
  },
  plugins: [],
}