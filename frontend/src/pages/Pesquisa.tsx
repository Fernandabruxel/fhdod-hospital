import { useState } from 'react';
import { BotaoRosto } from '../components/BotaoRosto';
import { api } from '../services/api';

export function Pesquisa() {
  const [step, setStep] = useState(1);
  const [protocoloGerado, setProtocoloGerado] = useState('');

  const [dados, setDados] = useState({
    setor_id: 's1',
    data_atendimento: new Date().toISOString().split('T')[0],
    turno: 'Manhã', 
    quem_responde: 'Paciente', 
    tipo_atendimento: 'SUS',
    nota_recepcao: 0, nota_tempo_espera: 0, nota_clareza_info: 0,
    nota_enfermagem: 0, nota_medico: 0, nota_estrutura: 0, nota_limpeza: 0, nota_nps: 0,
    ponto_positivo: '', ponto_melhorar: '', tipo_manifestacao: 'Não desejo registrar'
  });

  const atualizarNota = (campo: string, valor: number) => {
    setDados(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post('/avaliacoes', dados);
      setProtocoloGerado(response.data.protocolo);
      setStep(10);
    } catch (error) {
      alert('Erro ao enviar avaliação. Verifique se o backend está rodando.');
    }
  };

  if (step === 1) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pesquisa de Satisfação</h1>
        <p className="text-sm text-green-600 mb-6 flex items-center gap-2">
          <span>🛡️</span> Pesquisa anônima — não pedimos seu nome.
        </p>
        
        <label className="mb-2 font-semibold text-gray-700 block">Turno</label>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {['Manhã', 'Tarde', 'Noite', 'Dia'].map(t => (
            <button key={t} onClick={() => setDados({...dados, turno: t})}
              className={`py-3 rounded-xl border-2 font-semibold transition ${dados.turno === t ? 'border-fhdod-red bg-red-50 text-fhdod-red' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
              {t}
            </button>
          ))}
        </div>

        <label className="mb-2 font-semibold text-gray-700 block">Quem está respondendo?</label>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {['Paciente', 'Familiar', 'Responsável', 'Outro'].map(q => (
            <button key={q} onClick={() => setDados({...dados, quem_responde: q})}
              className={`py-3 rounded-xl border-2 font-semibold transition ${dados.quem_responde === q ? 'border-fhdod-red bg-red-50 text-fhdod-red' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
              {q}
            </button>
          ))}
        </div>

        <label className="mb-2 font-semibold text-gray-700 block">Tipo de atendimento</label>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {['Particular', 'Plano de Saúde', 'SUS', 'Outro'].map(t => (
            <button key={t} onClick={() => setDados({...dados, tipo_atendimento: t})}
              className={`py-3 rounded-xl border-2 font-semibold transition ${dados.tipo_atendimento === t ? 'border-fhdod-red bg-red-50 text-fhdod-red' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
              {t}
            </button>
          ))}
        </div>

        <button onClick={() => setStep(2)} className="w-full bg-fhdod-red text-white py-4 rounded-xl font-bold text-lg hover:bg-fhdod-dark transition shadow-lg shadow-red-200">
          Continuar →
        </button>
      </div>
    </div>
  );

  if (step === 2) return (
    <div className="min-h-screen flex items-start justify-center p-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Como você avalia?</h2>
        <p className="text-sm text-gray-500 mb-6">1 = Muito insatisfeito · 5 = Muito satisfeito</p>
        
        {[
          { campo: 'nota_recepcao', label: 'Atendimento da Recepção' },
          { campo: 'nota_tempo_espera', label: 'Tempo de Espera' },
          { campo: 'nota_clareza_info', label: 'Clareza das Informações' },
          { campo: 'nota_enfermagem', label: 'Atendimento da Enfermagem' },
          { campo: 'nota_medico', label: 'Atendimento Médico' },
          { campo: 'nota_estrutura', label: 'Estrutura e Conforto' },
          { campo: 'nota_limpeza', label: 'Limpeza e Higienização' }
        ].map(item => (
          <div key={item.campo} className="mb-6">
            <p className="font-semibold text-gray-700 mb-3">{item.label} *</p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <BotaoRosto key={n} nota={n} 
                  selecionada={dados[item.campo as keyof typeof dados] === n} 
                  onClick={() => atualizarNota(item.campo, n)} />
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-3 mt-8">
          <button onClick={() => setStep(1)} className="w-1/3 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition">← Voltar</button>
          <button onClick={() => setStep(3)} className="w-2/3 bg-fhdod-red text-white py-3 rounded-xl font-bold hover:bg-fhdod-dark transition shadow-lg shadow-red-200">Continuar →</button>
        </div>
      </div>
    </div>
  );

  if (step === 3) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Em uma escala de 0 a 10, qual a probabilidade de você recomendar a FHDOD?
        </h2>
        <div className="grid grid-cols-6 gap-2 mb-4">
          {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
            <button key={n} onClick={() => setDados({...dados, nota_nps: n})}
              className={`py-3 rounded-xl font-bold text-lg border-2 transition ${dados.nota_nps === n ? 'bg-fhdod-red text-white border-fhdod-red scale-105 shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'}`}>
              {n}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-8">
          <span>Nada provável</span><span>Muito provável</span>
        </div>
        <button onClick={() => setStep(4)} className="w-full bg-fhdod-red text-white py-4 rounded-xl font-bold text-lg hover:bg-fhdod-dark transition shadow-lg shadow-red-200">Continuar →</button>
      </div>
    </div>
  );

  if (step === 4) return (
    <div className="min-h-screen flex items-start justify-center p-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">O que você mais gostou?</h2>
        <textarea className="w-full p-4 rounded-xl border border-gray-200 mb-6 h-24 focus:ring-2 focus:ring-fhdod-red outline-none bg-gray-50" placeholder="Opcional" onChange={(e) => setDados({...dados, ponto_positivo: e.target.value})} />
        
        <h2 className="text-xl font-bold text-gray-800 mb-4">O que poderia ser melhorado?</h2>
        <textarea className="w-full p-4 rounded-xl border border-gray-200 mb-6 h-24 focus:ring-2 focus:ring-fhdod-red outline-none bg-gray-50" placeholder="Opcional" onChange={(e) => setDados({...dados, ponto_melhorar: e.target.value})} />

        <h2 className="text-xl font-bold text-gray-800 mb-4">Gostaria de deixar algum elogio, reclamação ou sugestão?</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {['Elogio', 'Sugestão', 'Reclamação', 'Não desejo registrar'].map(t => (
            <button key={t} onClick={() => setDados({...dados, tipo_manifestacao: t})}
              className={`py-3 rounded-xl border-2 font-semibold text-sm transition ${dados.tipo_manifestacao === t ? 'border-fhdod-red bg-red-50 text-fhdod-red' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => setStep(3)} className="w-1/3 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition">← Voltar</button>
          <button onClick={handleSubmit} className="w-2/3 bg-fhdod-red text-white py-3 rounded-xl font-bold hover:bg-fhdod-dark transition shadow-lg shadow-red-200">Enviar Avaliação ✓</button>
        </div>
      </div>
    </div>
  );

  if (step === 10) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-sm w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-green-600 text-4xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Obrigado por avaliar a FHDOD!</h1>
        <p className="text-gray-500 mb-6 text-sm">Sua opinião foi registrada e contribuirá para a melhoria contínua dos nossos serviços.</p>
        
        <div className="bg-gray-50 p-4 rounded-xl mb-8 border border-gray-100">
          <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Protocolo da avaliação</p>
          <p className="text-xl font-bold text-gray-800">{protocoloGerado}</p>
        </div>
        
        <button onClick={() => window.location.reload()} className="w-full border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
          Voltar ao início
        </button>
      </div>
    </div>
  );

  return null;
}