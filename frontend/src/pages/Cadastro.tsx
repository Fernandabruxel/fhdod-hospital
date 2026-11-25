import { useNavigate } from 'react-router-dom';

export function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="pesquisa-container">
      <div className="pesquisa-card" style={{ maxWidth: '400px' }}>
        <div className="pesquisa-conteudo" style={{ textAlign: 'center' }}>
          
          <img src="/logo_FHDOD.png" alt="Logo FHDOD" className="logo-hospital" style={{ margin: '0 auto 24px auto' }} />
          
          <h1 className="titulo-pergunta" style={{ justifyContent: 'center' }}>Criar Conta</h1>
          <p className="subtitulo">Preencha os dados para acessar o painel.</p>

          <input type="text" placeholder="Nome completo" className="campo-texto" style={{ marginBottom: '12px' }} />
          <input type="email" placeholder="E-mail institucional" className="campo-texto" style={{ marginBottom: '12px' }} />
          <input type="password" placeholder="Crie uma senha" className="campo-texto" style={{ marginBottom: '24px' }} />

          <button className="botao-principal" onClick={() => navigate('/login')} style={{ marginBottom: '16px' }}>
            Cadastrar
          </button>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ color: '#6B7280' }}>Já tem uma conta?</span>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} style={{ color: '#DC2626', fontWeight: '600', textDecoration: 'none' }}>
              Faça login
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}