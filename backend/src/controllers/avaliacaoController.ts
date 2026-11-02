import { Request, Response } from 'express';
import { pool } from '../config/db';
import { v4 as uuidv4 } from 'uuid';

export class AvaliacaoController {
  
  // Imagem 4, 5, 6, 7, 8, 9, 10: Salvar a pesquisa completa
  async criar(req: Request, res: Response) {
    try {
      const {
        data_atendimento, horario_atendimento, turno, quem_responde, tipo_atendimento,
        setor_id, servicos_utilizados, nota_recepcao, nota_tempo_espera, nota_clareza_info,
        nota_enfermagem, nota_medico, nota_estrutura, nota_limpeza, nota_nps,
        ponto_positivo, ponto_melhorar, tipo_manifestacao, quer_contato, telefone_contato
      } = req.body;

      const protocolo = `AV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
      const id = uuidv4();

      // Lógica de Cruzamento (Briefing): Buscar a equipe baseada no setor, data e turno
      let escala_id = null;
      const [escalas]: any = await pool.query(
        `SELECT e.id FROM escalas e 
         JOIN equipes eq ON e.equipe_id = eq.id 
         WHERE eq.setor_id = ? AND e.data_plantao = ? AND e.turno = ?`,
        [setor_id, data_atendimento, turno]
      );
      if (escalas.length > 0) escala_id = escalas[0].id;

      // Inserção no Banco
      await pool.query(
        `INSERT INTO avaliacoes (
          id, protocolo, data_atendimento, horario_atendimento, turno, quem_responde, 
          tipo_atendimento, setor_id, escala_id, servicos_utilizados, 
          nota_recepcao, nota_tempo_espera, nota_clareza_info, nota_enfermagem, 
          nota_medico, nota_estrutura, nota_limpeza, nota_nps, 
          ponto_positivo, ponto_melhorar, tipo_manifestacao, quer_contato, telefone_contato
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, protocolo, data_atendimento, horario_atendimento, turno, quem_responde,
          tipo_atendimento, setor_id, escala_id, JSON.stringify(servicos_utilizados || []),
          nota_recepcao, nota_tempo_espera, nota_clareza_info, nota_enfermagem,
          nota_medico, nota_estrutura, nota_limpeza, nota_nps,
          ponto_positivo, ponto_melhorar, tipo_manifestacao, quer_contato, telefone_contato
        ]
      );

      return res.status(201).json({ message: 'Avaliação registrada!', protocolo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao registrar avaliação' });
    }
  }

  // Dashboard (Imagem de gestão): Agregação de dados
  async dashboard(req: Request, res: Response) {
    try {
      const [total]: any = await pool.query('SELECT COUNT(*) as total FROM avaliacoes');
      const [media]: any = await pool.query('SELECT AVG(nota_nps) as nps_medio, AVG(nota_recepcao) as media_recepcao FROM avaliacoes');
      
      // Agrupamento por Setor para o gráfico
      const [porSetor]: any = await pool.query(`
        SELECT s.nome, AVG(a.nota_nps) as media_nps, COUNT(a.id) as total_avaliacoes
        FROM avaliacoes a JOIN setores s ON a.setor_id = s.id
        GROUP BY s.nome
      `);

      return res.json({
        total: total[0].total,
        nps_medio: media[0].nps_medio || 0,
        media_recepcao: media[0].media_recepcao || 0,
        porSetor
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao carregar dashboard' });
    }
  }
}