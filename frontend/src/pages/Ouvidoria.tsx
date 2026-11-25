import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowLeft, AlertCircle, Lightbulb, Heart, Send } from 'lucide-react';

export function Ouvidoria() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('reclamacao'); 

  // CardSelecao ajustado para não distorcer os ícones
  const CardSelecao = ({ id, icone: Icone, label }: any) => {
    const isAtivo = tipo === id;
    return (
      <button
        onClick={() => setTipo(id)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 8px', // Padding equilibrado
          borderRadius: '16px',
          border: `2px solid ${isAtivo ? '#DC2626' : '#E5E7EB'}`,
          backgroundColor: isAtivo ? '#FEF2F2' : '#FFFFFF',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          width: '100%',
          gap: '8px',
          height: '100px' // Força todos a terem a mesma altura
        }}
      >
        {/* Tamanho do ícone fixo e cor controlada */}
        <div style={{ height: '32px', display: 'flex', alignItems: 'center' }}>
          <Icone size={28} color={isAtivo ? '#DC2626' : '#9CA3AF'} strokeWidth={isAtivo ? 2.5 : 1.5} />
        </div>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: isAtivo ? '700' : '500', 
          color: isAtivo ? '#DC2626' : '#4B5563' 
        }}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="pesquisa-container">
      <div className="pesquisa-card" style={{ maxWidth: '650px' }}>
        <div className="pesquisa-conteudo">
          
          {/* Header com seta limpa */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <button 
              onClick={() => navigate('/')} 
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowLeft size={24} color="#6B7280" />
            </button>
            <div className="titulo-principal" style={{ margin: 0 }}>
              <MessageSquare className="icone-destaque" size={32} />
              <h1>Ouvidoria</h1>
            </div>
          </div>
          
          <p className="subtitulo">Sua manifestação é muito importante. Por favor, selecione o tipo abaixo e descreva o ocorrido.</p>

          <label className="label-texto">Qual o tipo da sua manifestação?</label>
          
          {/* Grid de Seleção */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <CardSelecao id="reclamacao" icone={AlertCircle} label="Reclamação" />
            <CardSelecao id="sugestao" icone={Lightbulb} label="Sugestão" />
            <CardSelecao id="elogio" icone={Heart} label="Elogio" />
          </div>

          {/* Campos empilhados no celular */}
          <div className="grid-formulario-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label className="label-texto">Setor (opcional)</label>
              <select className="campo-texto" style={{ marginBottom: 0 }}>
                <option>Selecione...</option>
                <option>Recepção</option>
                <option>Enfermagem</option>
                <option>Médico</option>
                <option>Limpeza</option>
              </select>
            </div>
            <div>
              <label className="label-texto">Data do ocorrido</label>
              <input type="date" className="campo-texto" style={{ marginBottom: 0 }} />
            </div>
          </div>

          <label className="label-texto">Descreva o ocorrido *</label>
          <textarea 
            className="campo-texto" 
            rows={4} 
            placeholder="Conte o que aconteceu com o máximo de detalhes possível. Não inclua dados pessoais."
          ></textarea>

          <button 
            className="botao-principal" 
            onClick={() => navigate('/sucesso')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Send size={20} />
            Enviar Manifestação
          </button>

        </div>
      </div>
    </div>
  );
}