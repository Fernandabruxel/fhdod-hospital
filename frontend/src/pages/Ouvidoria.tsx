import { useState } from 'react';

export function Ouvidoria() {
  const [tipo, setTipo] = useState('Reclamação');
  const [setor, setSetor] = useState('');
  const [desejaSeIdentificar, setDesejaSeIdentificar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui no futuro você pode integrar com uma rota do backend
    alert('Manifestação enviada à Ouvidoria com sucesso!');
  };

  return (
    <div className="min-h-screen bg-red-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm mt-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Ouvidoria</h1>
          <p className="text-gray-500 mb-2">Registre uma reclamação, sugestão ou elogio. A identificação é opcional.</p>
          <a href="#" className="text-red-600 font-semibold text-sm hover:underline">
            Já tenho um protocolo →
          </a>
        </div>

        {/* Botões de Tipo de Manifestação */}
        <div className="flex gap-4 mb-8">
          {['Reclamação', 'Sugestão', 'Elogio'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className={`flex-1 py-4 rounded-xl border-2 font-semibold flex flex-col items-center gap-2 transition
                ${tipo === t ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-red-300'}`}
            >
              <span className="text-2xl">
                {t === 'Reclamação' ? '😠' : t === 'Sugestão' ? '💡' : '❤️'}
              </span>
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Campos de Setor e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Setor</label>
              <select 
                value={setor} 
                onChange={(e) => setSetor(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                <option value="">Selecione (opcional)</option>
                <option value="Pronto Atendimento">Pronto Atendimento</option>
                <option value="Internação">Internação</option>
                <option value="Raio X">Raio X</option>
                <option value="Recepção">Recepção</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Data do ocorrido</label>
              <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-700" 
              />
            </div>
          </div>

          {/* Campo de Descrição */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição *</label>
            <textarea 
              required 
              placeholder="Conte o que aconteceu. Evite informar dados clínicos." 
              className="w-full p-4 border border-gray-300 rounded-xl h-32 outline-none focus:ring-2 focus:ring-red-500 resize-none"
            ></textarea>
          </div>

          {/* Campo de Identificação (Opcional) */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={desejaSeIdentificar}
                onChange={(e) => setDesejaSeIdentificar(e.target.checked)}
                className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-300"
              />
              <span className="text-gray-700 font-medium">Desejo me identificar</span>
            </label>
            
            {desejaSeIdentificar && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                <input type="text" placeholder="Seu nome" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500" />
                <input type="tel" placeholder="Telefone para retorno" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500" />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition mt-2 shadow-md"
          >
            Enviar Manifestação
          </button>
        </form>
      </div>
    </div>
  );
}