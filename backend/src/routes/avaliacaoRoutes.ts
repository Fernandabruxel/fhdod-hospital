import { Router } from 'express';
import { AvaliacaoController } from '../controllers/avaliacaoController';

const router = Router();
const controller = new AvaliacaoController();

router.post('/', controller.criar);
router.get('/dashboard', controller.dashboard);

export default router;