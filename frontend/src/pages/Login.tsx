import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [modo, setModo] = useState<'entrar' | 'criar'>('entrar');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login para demonstração (No projeto real, chamaria a API)
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        
        {/* Logo Simulada (pode colocar a imagem real depois) */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <span className="text-4xl">🏥</span>
            <h1 className="text-3xl font-black tracking-tighter">FHDOD</h1>
          </div>
          <p className="text-sm text-gray-500">Fundação Hospitalar Dr. Oswaldo Diesel</p>
          <div className="flex items-center gap-2 mt-4 text-gray-600">
            <span>🔒</span>
            <span className="font-semibold">Área administrativa</span>
          </div>
        </div>

        {/* Abas Entrar / Criar Conta */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setModo('entrar')}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${modo === 'entrar' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
          >
            Entrar
          </button>
          <button
            onClick={() => setModo('criar')}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${modo === 'criar' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {modo === 'criar' && (
            <input type="text" placeholder="Nome completo" required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
          )}
          <input type="email" placeholder="E-mail" required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
          <input type="password" placeholder="Senha" required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
          
          <button type="submit" className="mt-2 w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition">
            {modo === 'entrar' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        {modo === 'criar' && (
          <p className="text-xs text-gray-500 text-center mt-4">
            Após criar a conta, um administrador geral precisa liberar seu acesso.
          </p>
        )}
      </div>
    </div>
  );
} 