import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <span className="text-5xl">🏥</span>
            <h1 className="text-4xl font-black tracking-tighter">FHDOD</h1>
          </div>
          <p className="text-sm text-gray-500">Fundação Hospitalar Dr. Oswaldo Diesel</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo(a)!</h2>
        <p className="text-gray-600 mb-8">
          Sua opinião é muito importante para melhorarmos nossos serviços todos os dias.
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-md"
          >
            Responder Pesquisa Rápida
          </button>
          
          <button 
            onClick={() => navigate('/ouvidoria')} 
            className="w-full bg-white text-red-600 border-2 border-red-600 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition"
          >
            Ir para a Ouvidoria
          </button>
        </div>

        <div className="mt-8 text-xs text-gray-400">
          <p>🛡️ Pesquisa anônima e segura</p>
          <p>⏱️ Leva cerca de 2 minutos</p>
        </div>
      </div>
    </div>
  );
}