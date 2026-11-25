import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Activity, Users, Star } from 'lucide-react';

export function Dashboard() {
  const [dados, setDados] = useState({ total: 0, nps_medio: 0 });

  useEffect(() => {
    api.get('/avaliacoes/dashboard').then(response => {
      setDados(response.data);
    }).catch(() => console.log('Erro ao carregar dashboard'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Painel FHDOD</h1>
            <p className="text-gray-500 mt-1">Visão geral da experiência do paciente</p>
          </div>
          <span className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
            <Activity size={16} className="animate-pulse" />
            Tempo Real
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-red-50 rounded-2xl">
              <Users size={32} className="text-red-600" />
            </div>
            <div>
              <p className="text-gray-500 font-medium">Total de Avaliações</p>
              <p className="text-4xl font-extrabold text-gray-900">{dados.total}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-yellow-50 rounded-2xl">
              <Star size={32} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-500 font-medium">Média NPS (0 a 10)</p>
              <p className="text-4xl font-extrabold text-gray-900">{Number(dados.nps_medio).toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Banner de status */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Status do Sistema</h2>
          <p className="text-red-100">
            O servidor está operacional e as avaliações estão sendo registradas em tempo real.
          </p>
        </div>
      </div>
    </div>
  );
}