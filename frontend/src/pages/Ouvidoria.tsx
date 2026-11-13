import { useState } from 'react';

export function Ouvidoria() {
  const [tipo, setTipo] = useState('Reclamação');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Manifestação enviada à Ouvidoria com sucesso!');
  };

  return (
    <div className="min-h-screen bg-red-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ouvidoria</h1>
        <p className="text-gray-500 mb-6">Registre uma reclamação, sugestão ou elogio. A identificação é opcional.</p>

        <div className="flex gap-4 mb-8">
          {['Reclamação', 'Sugestão', 'Elogio'].map((t) => (
            <button
              key={t}
              onClick={() => setTipo(t)}
              className={`flex-1 py-4 rounded-xl border-2 font-semibold flex flex-col items-center gap-2 transition
                ${tipo === t ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-red-300'}`}
            >
              <span className="text-2xl">{t === 'Reclamação' ? '😠' : t === 'Sugestão' ? '💡' : '❤️'}</span>
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Setor</label>
              <select className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500">
                <option>Selecione (opcional)</option>
                <option>Pronto Atendimento</option>
                <option>Internação</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Data do ocorrido</label>
              <input type="date" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição *</label>
            <textarea required placeholder="Conte o que aconteceu. Evite informar dados clínicos." className="w-full p-4 border border-gray-300 rounded-xl h-32 outline-none focus:ring-2 focus:ring-red-500"></textarea>
          </div>

          <button type="submit" className="bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition mt-4">
            Enviar Manifestação
          </button>
        </form>
      </div>
    </div>
  );
} 