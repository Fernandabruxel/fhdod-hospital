# Sistema de Gestão da Experiência do Paciente - FHDOD

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-success)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Swagger](https://img.shields.io/badge/API-Swagger-yellow)

> **Projeto Acadêmico:** Desenvolvido por **Fernanda Bruxel** e **Lucas Beier** como requisito para avaliação de disciplina. O objetivo era resolver um problema real de gestão hospitalar através da tecnologia.

---

## 1. Contexto e O Problema (Briefing)

A Ouvidoria da **Fundação Hospitalar Dr. Oswaldo Diesel (FHDOD)** enfrentava um cenário crítico com sua pesquisa de satisfação: o processo era realizado inteiramente em papel. Isso resultava em:
* Taxa de resposta pífia (apenas 3 respostas para cada 500 atendimentos).
* Formulários incompletos e perda de elogios.
* Impossibilidade de rastrear a equipe responsável.
* Enorme retrabalho de transcrição manual para planilhas.
* Viés de resposta (apenas pacientes insatisfeitos respondiam).

## 2. A Solução

Desenvolvemos uma plataforma web corporativa **mobile-first**, acessível via QR Code nos setores do hospital. A interface foi projetada para ser "à prova de falhas", utilizando botões grandes, ícones de rostinhos e etapas curtas, garantindo que qualquer paciente ou acompanhante consiga responder em menos de 2 minutos.

## 3. Decisões de Produto e Regras de Negócio

* **Pergunta Obrigatória:** A avaliação geral por rostinhos (1 a 5) é a primeira etapa. Isso garante o dado principal mesmo em caso de abandono.
* **Régua da Ouvidoria:** Notas 1 ou 2 disparam um convite automático para o paciente registrar uma reclamação formal na Ouvidoria.
* **Cruzamento de Dados (O Diferencial):** Através da data e do turno informados, o sistema cruza a avaliação com a escala de trabalho mensal, permitindo identificar a equipe envolvida sem responsabilizar injustamente um único profissional.
* **LGPD:** O telefone do paciente é um campo opcional. Apenas usuários com o perfil OUVIDORIA têm permissão no banco de dados para visualizar esse dado sensível.
* **Canal Priorizado:** O celular (via QR Code) foi escolhido como canal principal por ser o dispositivo que o paciente já possui.

## 4. Arquitetura e Tecnologias

* **Frontend:** React, TypeScript, Vite, React Router, CSS3 (Design Responsivo).
* **Backend:** Node.js, Express, TypeScript.
* **Banco de Dados:** MySQL (Relacional). A escolha justifica-se pela necessidade de integridade referencial e consultas complexas (JOINs) entre Avaliações, Setores e Escalas.
* **ORM/Driver:** mysql2 (conexão direta e performática).
* **Documentação:** Swagger UI / OpenAPI 3.0.

## 5. Plano de Negócio (SaaS)

* **Modelo de Monetização:** Assinatura mensal (SaaS - Software as a Service) B2B.
* **Proposta de Valor:** Redução de custos operacionais com papel, aumento da retenção de pacientes e melhoria contínua baseada em dados reais.
* **Escalabilidade:** O sistema foi arquitetado para ser multi-tenant (atender múltiplos hospitais).

---

## 6. Como Rodar o Projeto (Passo a Passo)

### Pré-requisitos
* Node.js (v18+)
* MySQL (v8+)
* Git (opcional)

### Passo 1: Clonar o repositório
Abra o seu terminal e rode:
git clone https://github.com/Fernandabruxel/fhdod-hospital.git
cd fhdod-hospital

### Passo 2: Configurar o Banco de Dados
1. Abra o seu gerenciador MySQL (XAMPP, Workbench ou terminal).
2. Crie um banco de dados chamado fhdod_experiencia.
3. Execute o script SQL para criar as tabelas necessárias (estrutura de avaliacoes, setores, escalas, etc).

### Passo 3: Configurar o Backend
1. No terminal, acesse a pasta do backend:
cd backend

2. Instale as dependências:
npm install

3. Crie um arquivo .env na raiz da pasta backend com as suas credenciais:
PORT=3333
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha_do_mysql
DB_NAME=fhdod_experiencia

4. Inicie o servidor backend:
npm run dev

(O terminal deve exibir: "Servidor FHDOD rodando na porta 3333" e "Swagger disponível em http://localhost:3333/api-docs")

### Passo 4: Configurar o Frontend
1. Abra um novo terminal e volte para a raiz do projeto.
2. Acesse a pasta do frontend:
cd frontend

3. Instale as dependências:
npm install

4. Inicie a aplicação:
npm run dev

---

## 7. Como Testar (Guia de Apresentação)

Para validar o funcionamento do sistema, siga este roteiro:

1. **Testar o Frontend (Pesquisa):**
   * Acesse: http://localhost:5173/pesquisa
   * Preencha a pesquisa clicando nas opções e nas carinhas (o fluxo passa sozinho para a próxima pergunta).
   * No final, preencha os dados opcionais de contato e clique em "Finalizar e Enviar".
   * Você deve ser redirecionado para a tela de Sucesso.

2. **Testar o Dashboard:**
   * Acesse: http://localhost:5173/
   * Verifique se o número de "Total de Avaliações" e a "Média NPS" foram atualizados automaticamente com a sua resposta.

3. **Testar a Documentação da API (Swagger):**
   * Acesse: http://localhost:3333/api-docs
   * Você verá 10 rotas documentadas. Clique em GET /avaliacoes e depois em "Try it out" > "Execute". Você verá o JSON com todas as avaliações salvas no banco de dados.

4. **Testar a Ouvidoria:**
   * Acesse: http://localhost:5173/ouvidoria
   * Teste a seleção entre Reclamação, Sugestão e Elogio (os cards ficam vermelhos ao clicar).

---

## Desenvolvedores

* **Fernanda Eduarda de Oliveira Bruxel**
* **Lucas Beier da Silva**
* **Estudantes da Escola Técnica Estadual Monteiro Lobato (CIMOL)**
* **Curso Técnico de Informática**


*Projeto desenvolvido para fins acadêmicos.*