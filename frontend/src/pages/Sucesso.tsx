import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Home } from 'lucide-react';

export function Sucesso() {
  const navigate = useNavigate();

  return (
    <div className="pesquisa-container">
      <div className="pesquisa-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <CheckCircle2 size={80} color="#10B981" strokeWidth={1.5} />
        </div>

        <h1 className="titulo-principal" style={{ justifyContent: 'center', marginBottom: '16px' }}>
          Avaliação Enviada!
        </h1>
        
        <p className="subtitulo" style={{ fontSize: '18px', marginBottom: '40px' }}>
          Muito obrigado pelo seu feedback. Sua opinião é essencial para continuarmos melhorando o nosso atendimento no FHDOD.
        </p>

        <button 
          onClick={() => navigate('/')} 
          className="botao-principal"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Home size={20} />
          Voltar para o Início
        </button>

      </div>
    </div>
  );
}