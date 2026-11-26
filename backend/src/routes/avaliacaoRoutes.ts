import { Router } from 'express';
import { AvaliacaoController } from '../controllers/avaliacaoController';

const router = Router();
const controller = new AvaliacaoController();

/**
 * @swagger
 * tags:
 *   name: Avaliações
 *   description: Gerenciamento das avaliações de experiência do paciente
 */

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
 *               nota_recepcao: { type: number, example: 5 }
 *               nota_nps: { type: number, example: 9 }
 *               nome_paciente: { type: string, example: 'João Silva' }
 *               telefone_paciente: { type: string, example: '11999999999' }
 *     responses:
 *       201:
 *         description: Avaliação registrada com sucesso
 *   get:
 *     summary: Lista todas as avaliações
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */
router.post('/', controller.criar);
router.get('/', controller.listar);

/**
 * @swagger
 * /avaliacoes/dashboard:
 *   get:
 *     summary: Retorna dados gerais do dashboard
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Dados carregados com sucesso
 */
router.get('/dashboard', controller.dashboard);

/**
 * @swagger
 * /avaliacoes/estatisticas:
 *   get:
 *     summary: Retorna a média das notas por setor
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Estatísticas calculadas com sucesso
 */
router.get('/estatisticas', controller.estatisticas);

/**
 * @swagger
 * /avaliacoes/estatisticas/setores:
 *   get:
 *     summary: Retorna a média do NPS agrupada por setor
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Estatísticas por setor retornadas com sucesso
 */
router.get('/estatisticas/setores', controller.estatisticasPorSetor);

/**
 * @swagger
 * /avaliacoes/estatisticas/turnos:
 *   get:
 *     summary: Retorna a média do NPS agrupada por turno
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Estatísticas por turno retornadas com sucesso
 */
router.get('/estatisticas/turnos', controller.estatisticasPorTurno);

/**
 * @swagger
 * /avaliacoes/recentes:
 *   get:
 *     summary: Retorna as 5 avaliações mais recentes
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Avaliações recentes retornadas com sucesso
 */
router.get('/recentes', controller.recentes);

/**
 * @swagger
 * /avaliacoes/{protocolo}:
 *   get:
 *     summary: Busca uma avaliação pelo número de protocolo
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: protocolo
 *         required: true
 *         schema:
 *           type: string
 *         description: Protocolo gerado (ex AV-2024-00001)
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *       404:
 *         description: Avaliação não encontrada
 */
router.get('/:protocolo', controller.buscarPorProtocolo);

/**
 * @swagger
 * /avaliacoes/{id}:
 *   put:
 *     summary: Atualiza os comentários de uma avaliação existente
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ponto_positivo: { type: string, example: 'Novo elogio' }
 *               ponto_melhorar: { type: string, example: 'Nova crítica' }
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *   delete:
 *     summary: Deleta uma avaliação pelo ID
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da avaliação
 *     responses:
 *       204:
 *         description: Avaliação deletada com sucesso
 */
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router; 