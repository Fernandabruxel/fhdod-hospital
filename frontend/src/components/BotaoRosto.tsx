import { Frown, Annoyed, Meh, Smile, Laugh } from 'lucide-react';

interface Props {
  nota: number;
  selecionada: boolean;
  onClick: () => void;
}

export function BotaoRosto({ nota, selecionada, onClick }: Props) {
  const icones = [
    { Icon: Frown, cor: '#EF4444', bg: '#FEF2F2' },     // 1 - Vermelho
    { Icon: Annoyed, cor: '#F59E0B', bg: '#FFFBEB' },   // 2 - Laranja
    { Icon: Meh, cor: '#EAB308', bg: '#FEFCE8' },       // 3 - Amarelo
    { Icon: Smile, cor: '#84CC16', bg: '#F7FEE7' },     // 4 - Limão
    { Icon: Laugh, cor: '#10B981', bg: '#ECFDF5' }      // 5 - Verde
  ];

  const { Icon, cor, bg } = icones[nota - 1];

  return (
    <button
      onClick={onClick}
      type="button"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 8px', 
        width: '100%',
        backgroundColor: selecionada ? bg : '#FFFFFF',
        border: `2px solid ${selecionada ? cor : '#E5E7EB'}`,
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: selecionada ? 'scale(1.05)' : 'scale(1)',
        boxShadow: selecionada ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <Icon 
        size={36} 
        style={{ color: selecionada ? cor : '#9CA3AF', marginBottom: '8px' }} 
        strokeWidth={1.5}
      />
      <span style={{ 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: selecionada ? cor : '#4B5563' 
      }}>
        {nota}
      </span>
    </button>
  );
} 