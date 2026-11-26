import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API FHDOD - Experiência do Paciente',
      version: '1.0.0',
      description: 'Documentação interativa da API do sistema FHDOD.',
    },
    servers: [{ url: 'https://fhdod-hospital.onrender.com/api' }], 
  },
  apis: ['./src/routes/*.ts'], // Onde estão as rotas
};

export const swaggerSpec = swaggerJsdoc(options);