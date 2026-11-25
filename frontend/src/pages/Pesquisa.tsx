import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BotaoRosto } from '../components/BotaoRosto';
import { api } from '../services/api';
import { User, Clock, FileText, HeartPulse, Stethoscope, Building2, Sparkles } from 'lucide-react';

export function Pesquisa() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1); 
  
  const [dados, setDados] = useState({
    turno: '', quem_responde: '', tipo_atendimento: '', setor_id: null, 
    nota_recepcao: 0, nota_tempo_espera: 0, nota_clareza_info: 0, nota_enfermagem: 0, nota_medico: 0,
    nota_estrutura: 0, nota_limpeza: 0, nota_nps: -1,
    ponto_positivo: '', ponto_melhorar: '', tipo_manifestacao: 'pesquisa'
  });

  const avancar = (campo: string, valor: any) => {
    setDados(prev => ({ ...prev, [campo]: valor }));
    setTimeout(() => setEtapa(prev => prev + 1), 300); 
  };

  const enviarPesquisa = async () => {
    try {
      const dataFormatada = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split('/').reverse().join('-');
      
      await api.post('/avaliacoes', {
        ...dados,
        data_atendimento: dataFormatada, 
      });
      navigate('/sucesso');
    } catch (error: any) {
      console.error("Erro detalhado do Backend:", error.response?.data || error.message);
      alert('Erro no servidor: ' + JSON.stringify(error.response?.data || error.message)); 
    }
  };

  // Componente visual interno usando CSS clássico
  const BotaoOpcao = ({ icone: Icone, label, selecionado, onClick }: any) => (
    <button
      onClick={onClick}
      className={`botao-opcao ${selecionado ? 'ativo' : ''}`}
    >
      <Icone size={24} />
      {label}
    </button>
  );

  return (
    <div className="pesquisa-container">
      <div className="pesquisa-card">
        
        {/* Barra de Progresso */}
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(etapa / 12) * 100}%` }}
          ></div>
        </div>

        <div className="pesquisa-conteudo">
          {/* ETAPA 1: Boas Vindas e Turno */}
          {etapa === 1 && (
            <div className="animar-entrada">
              <div className="titulo-principal">
                <Sparkles className="icone-destaque" size={32} />
                <h1>Bem-vindo(a)!</h1>
              </div>
              <p className="subtitulo">Sua opinião é fundamental para melhorarmos nosso atendimento. Vamos começar?</p>
              
              <h2 className="titulo-pergunta">Qual o turno do seu atendimento?</h2>
              <div className="grid-opcoes">
                {['Manhã', 'Tarde', 'Noite', 'Dia'].map(t => (
                  <BotaoOpcao key={t} label={t} icone={Clock} onClick={() => avancar('turno', t.toLowerCase())} />
                ))}
              </div>
            </div>
          )}

          {/* ETAPA 2: Quem está respondendo */}
          {etapa === 2 && (
            <div className="animar-entrada">
              <h2 className="titulo-pergunta">Quem está respondendo esta pesquisa?</h2>
              <div className="grid-opcoes">
                {['Paciente', 'Familiar', 'Responsável', 'Outro'].map(t => (
                  <BotaoOpcao key={t} label={t} icone={User} onClick={() => avancar('quem_responde', t.toLowerCase())} />
                ))}
              </div>
            </div>
          )}

          {/* ETAPA 3: Tipo de atendimento */}
          {etapa === 3 && (
            <div className="animar-entrada">
              <h2 className="titulo-pergunta">Qual o tipo do seu atendimento?</h2>
              <div className="grid-opcoes">
                {['Particular', 'Plano de Saúde', 'SUS', 'Outro'].map(t => (
                  <BotaoOpcao key={t} label={t} icone={FileText} onClick={() => avancar('tipo_atendimento', t.toLowerCase())} />
                ))}
              </div>
            </div>
          )}

          {/* ETAPAS 4 a 10: Perguntas com Carinhas */}
          {[
            { id: 'nota_recepcao', titulo: 'Atendimento da Recepção', icone: User },
            { id: 'nota_tempo_espera', titulo: 'Tempo de Espera', icone: Clock },
            { id: 'nota_clareza_info', titulo: 'Clareza das Informações', icone: FileText },
            { id: 'nota_enfermagem', titulo: 'Atendimento da Enfermagem', icone: HeartPulse },
            { id: 'nota_medico', titulo: 'Atendimento Médico', icone: Stethoscope },
            { id: 'nota_estrutura', titulo: 'Estrutura do Hospital', icone: Building2 },
            { id: 'nota_limpeza', titulo: 'Limpeza do Ambiente', icone: Sparkles },
          ].map((pergunta, index) => {
            const numEtapa = index + 4;
            const Icone = pergunta.icone;
            return etapa === numEtapa && (
              <div key={pergunta.id} className="animar-entrada">
                <div className="titulo-principal" style={{ fontSize: '22px', marginBottom: '16px' }}>
                  <Icone className="icone-destaque" size={28} />
                  <h2>{pergunta.titulo}</h2>
                </div>
                <p className="subtitulo" style={{ marginBottom: '24px' }}>Como você avalia este quesito?</p>
                <div className="grid-carinhas">
                  {[1, 2, 3, 4, 5].map(nota => (
                    <BotaoRosto 
                      key={nota} 
                      nota={nota} 
                      selecionada={dados[pergunta.id as keyof typeof dados] === nota} 
                      onClick={() => avancar(pergunta.id, nota)} 
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* ETAPA 11: NPS (Escala 0 a 10) */}
          {etapa === 11 && (
            <div className="animar-entrada">
              <h2 className="titulo-pergunta">De 0 a 10, qual a chance de você recomendar o FHDOD?</h2>
              <p className="subtitulo">Sendo 0 para "Nada provável" e 10 para "Muito provável".</p>
              
              <div className="grid-nps">
                {Array.from({ length: 11 }, (_, i) => i).map(nota => {
                  const isSelected = dados.nota_nps === nota;
                  let classeCor = '';
                  if (isSelected) {
                    if (nota <= 6) classeCor = 'vermelho';
                    else if (nota <= 8) classeCor = 'amarelo';
                    else classeCor = 'verde';
                  }

                  return (
                    <button
                      key={nota}
                      onClick={() => setDados(prev => ({ ...prev, nota_nps: nota }))}
                      className={`botao-nps ${isSelected ? `ativo ${classeCor}` : ''}`}
                    >
                      {nota}
                    </button>
                  );
                })}
              </div>
              
              <button
                disabled={dados.nota_nps === -1}
                onClick={() => setEtapa(12)}
                className="botao-principal"
              >
                Continuar
              </button>
            </div>
          )}

          {/* ETAPA 12: Comentários Finais */}
          {etapa === 12 && (
            <div className="animar-entrada">
              <h2 className="titulo-pergunta">Quase lá!</h2>
              
              <label className="label-texto">O que foi positivo no seu atendimento?</label>
              <textarea 
                className="campo-texto"
                rows={3}
                placeholder="Deixe seu elogio..."
                value={dados.ponto_positivo}
                onChange={e => setDados(prev => ({ ...prev, ponto_positivo: e.target.value }))}
              />

              <label className="label-texto">O que podemos melhorar?</label>
              <textarea 
                className="campo-texto"
                rows={3}
                placeholder="Deixe sua sugestão ou crítica..."
                value={dados.ponto_melhorar}
                onChange={e => setDados(prev => ({ ...prev, ponto_melhorar: e.target.value }))}
              />

              <button onClick={enviarPesquisa} className="botao-principal">
                Finalizar e Enviar
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}