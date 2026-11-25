import { Router } from 'express';
import { AvaliacaoController } from '../controllers/avaliacaoController';

const router = Router();
const controller = new AvaliacaoController();

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Avaliações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_atendimento: { type: string, example: '2024-05-20' }
 *               turno: { type: string, example: 'manha' }
 *               quem_responde: { type: string, example: 'paciente' }
 *               tipo_atendimento: { type: string, example: 'consulta' }
 *               setor_id: { type: string, example: '123e4567-e89b-12d3-a456-426614174000' }
 *               nota_recepcao: { type: number, example: 5 }
 *               nota_tempo_espera: { type: number, example: 4 }
 *               nota_clareza_info: { type: number, example: 5 }
 *               nota_enfermagem: { type: number, example: 5 }
 *               nota_medico: { type: number, example: 5 }
 *               nota_estrutura: { type: number, example: 4 }
 *               nota_limpeza: { type: number, example: 5 }
 *               nota_nps: { type: number, example: 9 }
 *               ponto_positivo: { type: string, example: 'Atendimento excelente' }
 *               ponto_melhorar: { type: string, example: 'Tempo de espera' }
 *               tipo_manifestacao: { type: string, example: 'elogio' }
 *     responses:
 *       201:
 *         description: Avaliação registrada com sucesso
 */
router.post('/', controller.criar);

/**
 * @swagger
 * /avaliacoes/dashboard:
 *   get:
 *     summary: Retorna os dados do dashboard
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Dados carregados com sucesso
 */
router.get('/dashboard', controller.dashboard);

export default router;