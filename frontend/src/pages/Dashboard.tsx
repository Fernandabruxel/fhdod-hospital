import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function Dashboard() {
  const [dados, setDados] = useState({ total: 0, nps_medio: 0 });

  useEffect(() => {
    api.get('/avaliacoes/dashboard').then(response => {
      setDados(response.data);
    }).catch(() => console.log('Erro ao carregar dashboard'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Painel da Gestão</h1>
          <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">Tempo Real</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-600">
            <p className="text-gray-500 font-semibold mb-2">Total de Avaliações</p>
            <p className="text-5xl font-bold text-gray-800">{dados.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <p className="text-gray-500 font-semibold mb-2">Média NPS (0 a 10)</p>
            <p className="text-5xl font-bold text-gray-800">{Number(dados.nps_medio).toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}