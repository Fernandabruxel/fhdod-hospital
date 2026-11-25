import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import rotasAvaliacao from './routes/avaliacaoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rota do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }', // Remove a barra padrão feia
  customSiteTitle: 'FHDOD - Documentação da API'
}));

app.use('/api/avaliacoes', rotasAvaliacao);

app.listen(3333, () => {
  console.log('🚀 Servidor FHDOD rodando na porta 3333');
  console.log('📄 Swagger disponível em http://localhost:3333/api-docs');
});