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
        ponto_positivo, ponto_melhorar, tipo_manifestacao,
        nome_paciente, telefone_paciente
      } = req.body;

      const protocolo = `AV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
      const id = uuidv4();

            let escala_id = null;
      // A busca na tabela escalas foi desativada para o deploy, pois a tabela não existe no Aiven
      // const [escalas]: any = await pool.query(
      //   `SELECT e.id FROM escalas e JOIN equipes eq ON e.equipe_id = eq.id 
      //    WHERE eq.setor_id = ? AND e.data_plantao = ? AND e.turno = ?`,
      //   [setor_id, data_atendimento, turno]
      // );
      // if (escalas.length > 0) escala_id = escalas[0].id;

      await pool.query(
        `INSERT INTO avaliacoes (id, protocolo, data_atendimento, turno, quem_responde, 
          tipo_atendimento, setor_id, escala_id, nota_recepcao, nota_tempo_espera, 
          nota_clareza_info, nota_enfermagem, nota_medico, nota_estrutura, 
          nota_limpeza, nota_nps, ponto_positivo, ponto_melhorar, tipo_manifestacao,
          nome_paciente, telefone_paciente
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, protocolo, data_atendimento, turno, quem_responde, tipo_atendimento, 
          setor_id, escala_id, nota_recepcao, nota_tempo_espera, nota_clareza_info, 
          nota_enfermagem, nota_medico, nota_estrutura, nota_limpeza, nota_nps, 
          ponto_positivo, ponto_melhorar, tipo_manifestacao,
          nome_paciente || null, telefone_paciente || null
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

  async listar(req: Request, res: Response) {
    try {
      const [avaliacoes]: any = await pool.query('SELECT * FROM avaliacoes ORDER BY data_atendimento DESC');
      return res.json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar avaliações' });
    }
  }

  async buscarPorProtocolo(req: Request, res: Response) {
    try {
      const { protocolo } = req.params;
      const [avaliacao]: any = await pool.query('SELECT * FROM avaliacoes WHERE protocolo = ?', [protocolo]);
      if (avaliacao.length === 0) {
        return res.status(404).json({ error: 'Avaliação não encontrada' });
      }
      return res.json(avaliacao[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar avaliação' });
    }
  }

  async estatisticas(req: Request, res: Response) {
    try {
      const [medias]: any = await pool.query(`
        SELECT 
          ROUND(AVG(nota_recepcao), 1) as media_recepcao,
          ROUND(AVG(nota_enfermagem), 1) as media_enfermagem,
          ROUND(AVG(nota_medico), 1) as media_medico,
          ROUND(AVG(nota_limpeza), 1) as media_limpeza
        FROM avaliacoes
      `);
      return res.json(medias[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao calcular estatísticas' });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM avaliacoes WHERE id = ?', [id]);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar avaliação' });
    }
  }

  // --- NOVAS FUNÇÕES AQUI ---

  async estatisticasPorSetor(req: Request, res: Response) {
    try {
      const [dados]: any = await pool.query(`
        SELECT 
          s.nome as setor, 
          COUNT(a.id) as total_avaliacoes,
          ROUND(AVG(a.nota_nps), 1) as nps_medio
        FROM avaliacoes a
        LEFT JOIN setores s ON a.setor_id = s.id
        GROUP BY a.setor_id, s.nome
        ORDER BY nps_medio DESC
      `);
      return res.json(dados);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar estatísticas por setor' });
    }
  }

  async estatisticasPorTurno(req: Request, res: Response) {
    try {
      const [dados]: any = await pool.query(`
        SELECT 
          turno, 
          COUNT(*) as total,
          ROUND(AVG(nota_nps), 1) as nps_medio
        FROM avaliacoes
        GROUP BY turno
      `);
      return res.json(dados);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar estatísticas por turno' });
    }
  }

  async recentes(req: Request, res: Response) {
    try {
      const [dados]: any = await pool.query(`
        SELECT protocolo, data_atendimento, turno, nota_nps, ponto_positivo, ponto_melhorar 
        FROM avaliacoes 
        ORDER BY data_atendimento DESC 
        LIMIT 5
      `);
      return res.json(dados);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar avaliações recentes' });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { ponto_positivo, ponto_melhorar } = req.body;
      
      await pool.query(
        `UPDATE avaliacoes SET ponto_positivo = ?, ponto_melhorar = ? WHERE id = ?`,
        [ponto_positivo, ponto_melhorar, id]
      );
      
      return res.json({ message: 'Avaliação atualizada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar avaliação' });
    }
  }
} 