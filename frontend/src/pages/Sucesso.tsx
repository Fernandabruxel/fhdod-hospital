import { useNavigate } from 'react-router-dom';

interface SucessoProps {
  protocolo: string;
}

export function Sucesso({ protocolo }: SucessoProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full">
        
        {/* Ícone de Check verde */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-green-500">✓</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Obrigado por avaliar a FHDOD!</h1>
        <p className="text-gray-600 mb-8">
          Sua opinião foi registrada e contribuirá para a melhoria contínua dos nossos serviços.
        </p>

        {/* Caixa do Protocolo */}
        <div className="bg-gray-100 p-5 rounded-xl mb-8">
          <p className="text-sm text-gray-500 mb-1">Protocolo da avaliação</p>
          <p className="text-xl font-bold text-gray-800 tracking-wider">
            {protocolo || 'AV-XXXX-XXXXX'}
          </p>
        </div>

        <button 
          onClick={() => navigate('/home')} 
          className="w-full bg-white text-gray-700 border-2 border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
}