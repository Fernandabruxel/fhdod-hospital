import { Request, Response } from 'express';
import { pool } from '../config/db';
import { v4 as uuidv4 } from 'uuid';

export class AvaliacaoController {
  async criar(req: Request, res: Response) {
    try {
      const {
        data_atendimento, turno, quem_responde, tipo_atendimento, setor_id,
        nota_recepcao, nota_tempo_espera, nota_clareza_info, nota_enfermagem,
        nota_medico, nota_estrutura, nota_limpeza, nota_nps,
        ponto_positivo, ponto_melhorar, tipo_manifestacao
      } = req.body;

      const protocolo = `AV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
      const id = uuidv4();

      let escala_id = null;
      const [escalas]: any = await pool.query(
        `SELECT e.id FROM escalas e JOIN equipes eq ON e.equipe_id = eq.id 
         WHERE eq.setor_id = ? AND e.data_plantao = ? AND e.turno = ?`,
        [setor_id, data_atendimento, turno]
      );
      if (escalas.length > 0) escala_id = escalas[0].id;

      await pool.query(
        `INSERT INTO avaliacoes (id, protocolo, data_atendimento, turno, quem_responde, 
          tipo_atendimento, setor_id, escala_id, nota_recepcao, nota_tempo_espera, 
          nota_clareza_info, nota_enfermagem, nota_medico, nota_estrutura, 
          nota_limpeza, nota_nps, ponto_positivo, ponto_melhorar, tipo_manifestacao
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, protocolo, data_atendimento, turno, quem_responde, tipo_atendimento, 
          setor_id, escala_id, nota_recepcao, nota_tempo_espera, nota_clareza_info, 
          nota_enfermagem, nota_medico, nota_estrutura, nota_limpeza, nota_nps, 
          ponto_positivo, ponto_melhorar, tipo_manifestacao
        ]
      );
      return res.status(201).json({ message: 'Avaliação registrada!', protocolo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao registrar avaliação' });
    }
  }

  async dashboard(req: Request, res: Response) {
    try {
      const [total]: any = await pool.query('SELECT COUNT(*) as total FROM avaliacoes');
      const [media]: any = await pool.query('SELECT AVG(nota_nps) as nps_medio FROM avaliacoes');
      return res.json({ total: total[0].total, nps_medio: media[0].nps_medio || 0 });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao carregar dashboard' });
    }
  }
} 