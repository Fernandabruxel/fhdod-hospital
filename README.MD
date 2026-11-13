#  Sistema de Gestão da Experiência do Paciente - FHDOD

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-success)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

##  1. Contexto e O Problema (Briefing)
A Ouvidoria da **Fundação Hospitalar Dr. Oswaldo Diesel (FHDOD)** enfrentava um cenário crítico: a pesquisa de satisfação era realizada em papel. Isso resultava em uma taxa de resposta pífia (apenas 3 respostas para cada 500 atendimentos), formulários incompletos, perda de elogios, impossibilidade de rastrear a equipe responsável e um enorme retrabalho de transcrição manual para planilhas. Além disso, apenas pacientes insatisfeitos respondiam.

##  2. A Solução
Desenvolvemos uma plataforma web corporativa **mobile-first**, acessível via QR Code nos setores do hospital. A interface foi projetada para ser "à prova de falhas", utilizando botões grandes, ícones de rostinhos e etapas curtas, garantindo que qualquer paciente ou acompanhante consiga responder em menos de 2 minutos.

##  3. Decisões de Produto (Requisitos Atendidos)
Atendendo ao briefing, a equipe tomou as seguintes decisões estratégicas justificadas:
*   **Pergunta Obrigatória:** Optamos por colocar a avaliação geral por **rostinhos (1 a 5) no início** do fluxo. Isso garante que, mesmo se o paciente abandonar a pesquisa no meio, tenhamos o dado principal (NPS e satisfação geral).
*   **Régua da Ouvidoria:** Notas **1 ou 2** disparam um convite automático para o paciente registrar uma reclamação formal na Ouvidoria, com opção de deixar telefone para retorno.
*   **Cruzamento de Dados (O Diferencial):** Através da data e do turno informados, o sistema cruza a avaliação com a **escala de trabalho mensal**, permitindo identificar a equipe envolvida sem responsabilizar injustamente um único profissional (o foco é a equipe/setor).
*   **LGPD:** O telefone do paciente é um campo opcional. Apenas usuários com o perfil `OUVIDORIA` têm permissão no banco de dados para visualizar esse dado sensível. O TV Wall exibe apenas dados agregados (médias), nunca relatos individuais.
*   **Canal Priorizado:** O celular (via QR Code) foi escolhido como canal principal por ser o dispositivo que o paciente já possui, dispensando filas em totens.

##  4. Funcionalidades do Sistema
*   **Pesquisa do Paciente:** Acesso via QR Code, interface por toques, fluxo por jornada (Recepção, Enfermagem, Médico, etc).
*   **Ouvidoria:** Canal direto para elogios, sugestões e reclamações, com opção de anonimato.
*   **Dashboard da Gestão:** Navegação hierárquica (Hospital > Setor > Turno), visualização de NPS e exportação de dados.
*   **TV Wall:** Tela com indicadores em tempo real para exibição na recepção do hospital.
*   **Perfis de Acesso:** Super Admin, Admin de Setor, Gestão, Ouvidoria e Visualizador.

##  5. Arquitetura e Tecnologias
*   **Frontend:** React, TypeScript, Tailwind CSS, Vite, React Router.
*   **Backend:** Node.js, Express, TypeScript.
*   **Banco de Dados:** **MySQL (Relacional)**. A escolha justifica-se pela necessidade de integridade referencial e consultas complexas (JOINs) entre Avaliações, Setores e Escalas de Trabalho.
*   **ORM/Driver:** `mysql2` (conexão direta e performática).

##  6. Plano de Negócio (SaaS)
**Modelo de Monetização:** Assinatura mensal (SaaS - Software as a Service) B2B.
**Proposta de Valor:** Redução de custos operacionais com papel e digitação, aumento da retenção de pacientes (ao demonstrar que a ouvidoria funciona) e melhoria contínua baseada em dados reais.
**Escalabilidade:** O sistema foi arquitetado para ser *multi-tenant* (atender múltiplos hospitais). Pode ser licenciado por leito ou por unidade, com baixo custo de implantação e alto potencial de receita recorrente.

##  7. Como Rodar o Projeto (Manual do Desenvolvedor)

### Pré-requisitos
*   Node.js (v18+)
*   MySQL (v8+)

### Passo 1: Configurar o Banco de Dados
1. Abra seu terminal MySQL.
2. Crie o banco e as tabelas rodando o script `script.sql` localizado na raiz da pasta `backend`.

### Passo 2: Configurar o Backend
1. Acesse a pasta: `cd backend`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz do backend com as suas credenciais:
   ```env
   PORT=3333
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=sua_senha_aqui
   DB_NAME=fhdod_experiencia

## Inicie o servidor: npx ts-node-dev src/server.ts

## Passo 3: Configurar o Frontend

Abra um novo terminal e acesse: cd frontend
Instale as dependências: npm install
Inicie a aplicação: npm run dev

## Passo 4: Acessar o Sistema
Pesquisa (Paciente): http://localhost:5173/

Dashboard (Gestão): http://localhost:5173/dashboard

Login Admin: http://localhost:5173/login

Ouvidoria: http://localhost:5173/ouvidoria