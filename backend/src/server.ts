import express from 'express';
import cors from 'cors';
import rotasAvaliacao from './routes/avaliacaoRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/avaliacoes', rotasAvaliacao);

app.listen(3333, () => console.log('🚀 Servidor FHDOD rodando na porta 3333'));