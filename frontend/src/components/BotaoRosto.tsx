interface Props {
  nota: number;
  selecionada: boolean;
  onClick: () => void;
}

export function BotaoRosto({ nota, selecionada, onClick }: Props) {
  const rostos = ['😠', '🙁', '😐', '🙂', '😄'];
  
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all w-full
        ${selecionada 
          ? 'border-fhdod-red bg-red-50 scale-105 shadow-sm' 
          : 'border-gray-200 bg-white hover:border-red-300 hover:bg-gray-50'}`}
    >
      <span className="text-3xl mb-1">{rostos[nota - 1]}</span>
      <span className={`text-lg font-bold ${selecionada ? 'text-fhdod-red' : 'text-gray-600'}`}>
        {nota}
      </span>
    </button>
  );
}