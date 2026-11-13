interface Props {
  nota: number;
  selecionada: boolean;
  onClick: () => void;
}

export function BotaoRosto({ nota, selecionada, onClick }: Props) {
  // Rostos em SVG ou Emojis grandes
  const rostos = ['😠', '🙁', '😐', '🙂', '😄'];
  
  return (
    <button
      onClick={onClick}
      type="button"
<<<<<<< HEAD
      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all w-full
        ${selecionada 
          ? 'border-fhdod-red bg-red-50 scale-105 shadow-sm' 
          : 'border-gray-200 bg-white hover:border-red-300 hover:bg-gray-50'}`}
=======
      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all w-full
        ${selecionada ? 'border-red-600 bg-red-50 scale-105 shadow-md' : 'border-gray-200 bg-white hover:border-red-300'}`}
>>>>>>> c9d6cd021894003d615d3045a8345270e5e7d58e
    >
      <span className="text-3xl mb-1">{rostos[nota - 1]}</span>
      <span className={`text-lg font-bold ${selecionada ? 'text-fhdod-red' : 'text-gray-600'}`}>
        {nota}
      </span>
    </button>
  );
}