import { useNavigate } from 'react-router-dom';


export function Login() {
  const navigate = useNavigate();

  return (
    <div className="pesquisa-container">
      <div className="pesquisa-card" style={{ maxWidth: '400px' }}>
        <div className="pesquisa-conteudo" style={{ textAlign: 'center' }}>
          
          <img src="/logo_FHDOD.png" alt="Logo FHDOD" className="logo-hospital" style={{ margin: '0 auto 24px auto' }} />
          
          <h1 className="titulo-pergunta" style={{ justifyContent: 'center' }}>Área Administrativa</h1>
          <p className="subtitulo">Acesse com suas credenciais para gerenciar o sistema.</p>

          <input type="email" placeholder="E-mail" className="campo-texto" style={{ marginBottom: '12px' }} />
          <input type="password" placeholder="Senha" className="campo-texto" style={{ marginBottom: '24px' }} />

          <button className="botao-principal" onClick={() => navigate('/')} style={{ marginBottom: '16px' }}>
            Entrar
          </button>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ color: '#6B7280' }}>Ainda não tem conta?</span>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cadastro'); }} style={{ color: '#DC2626', fontWeight: '600', textDecoration: 'none' }}>
              Cadastre-se aqui
            </a>
          </div>

        </div>
      </div>
    </div>
  );
} 