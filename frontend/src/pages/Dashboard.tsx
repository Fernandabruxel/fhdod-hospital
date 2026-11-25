import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Activity, Users, Star, ClipboardList, MessageSquare } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({ total: 0, nps_medio: 0 });

  useEffect(() => {
    api.get('/avaliacoes/dashboard').then(response => {
      setDados(response.data);
    }).catch(() => console.log('Erro ao carregar dashboard'));
  }, []);

  return (
    <div className="pesquisa-container" style={{ flexDirection: 'column' }}>
      
      {/* Header com Logo e Botões */}
      <div className="header-pagina">
        <img src="/logo_FHDOD.png" alt="Logo FHDOD" className="logo-hospital" style={{ marginBottom: 0 }} />
        <div className="botoes-header">
          <button onClick={() => navigate('/pesquisa')} className="botao-secundario">
            <ClipboardList size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}/> 
            Nova Pesquisa
          </button>
          <button onClick={() => navigate('/ouvidoria')} className="botao-secundario">
            <MessageSquare size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}/> 
            Ouvidoria
          </button>
        </div>
      </div>

      <div className="pesquisa-card" style={{ maxWidth: '800px' }}>
        <div className="pesquisa-conteudo">
          <div className="titulo-principal">
            <Activity className="icone-destaque" size={32} />
            <h1>Painel FHDOD</h1>
          </div>
          <p className="subtitulo">Visão geral da experiência do paciente em tempo real.</p>

          {/* Cards lado a lado no PC, um embaixo do outro no celular */}
          <div className="grid-cards-dashboard">
            <div className="card-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Users size={24} color="#DC2626" />
                <span style={{ fontWeight: '600', color: '#4B5563' }}>Total de Avaliações</span>
              </div>
              <h2 style={{ fontSize: '40px', margin: 0 }}>{dados.total}</h2>
            </div>

            <div className="card-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Star size={24} color="#F59E0B" />
                <span style={{ fontWeight: '600', color: '#4B5563' }}>Média NPS</span>
              </div>
              <h2 style={{ fontSize: '40px', margin: 0 }}>{Number(dados.nps_medio).toFixed(1)}</h2>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: '#FEF2F2', borderRadius: '12px', borderLeft: '4px solid #DC2626' }}>
            <p style={{ margin: 0, fontWeight: '500', color: '#991B1B' }}>
              O sistema está operacional. As avaliações da pesquisa estão sendo registradas em tempo real no banco de dados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}