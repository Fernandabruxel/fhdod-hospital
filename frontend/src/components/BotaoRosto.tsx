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
      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all w-full
        ${selecionada ? 'border-red-600 bg-red-50 scale-105 shadow-md' : 'border-gray-200 bg-white hover:border-red-300'}`}
    >
      <span className="text-3xl mb-1">{rostos[nota - 1]}</span>
      <span className={`text-lg font-bold ${selecionada ? 'text-red-600' : 'text-gray-600'}`}>{nota}</span>
    </button>
  );
}