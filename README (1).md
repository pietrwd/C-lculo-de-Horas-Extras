# Dashboard de Horas Extras — Transportadora Ajofer

Sistema web para controle e lançamento de horas extras dos colaboradores PJ da
**Transportadora Ajofer**, com login por usuário/senha, cadastro de
funcionários e todos os dados salvos em um banco de dados real (não em
`localStorage`).

---

## ✨ Funcionalidades

- **Login** com usuário e senha, e opção de **"Esqueci minha senha"**.
- **Cadastro de funcionário** (nome completo, e-mail, usuário e senha com
  regras de segurança) direto pelo dashboard.
- **Lançamento de horas extras** por dia/semana/mês, com edição em célula e
  gráficos de acompanhamento.
- **Exportação** dos dados para Excel/JSON.
- **Logotipo customizável** da empresa.
- Botão **"Salvar alterações"** grava tudo no banco de dados, disponível para
  todos os usuários, em qualquer computador.
- Autenticação real via **token JWT** e senhas protegidas com **hash bcrypt**.

---

## 🗂️ Estrutura do projeto

```
ajofer-dashboard/
├── README.md                   → este arquivo
├── GUIA-GITHUB-VSCODE.md       → passo a passo de deploy (GitHub + VS Code)
├── backend/                    → API (Node.js + Express + PostgreSQL)
│   ├── src/
│   │   ├── index.js            → ponto de entrada do servidor
│   │   ├── db.js               → conexão com o PostgreSQL
│   │   ├── migrate.js          → script que cria as tabelas
│   │   ├── schema.sql          → estrutura do banco de dados
│   │   ├── middleware/auth.js  → autenticação (JWT) e validação de senha
│   │   └── routes/
│   │       ├── auth.js         → login, cadastro, esqueci senha
│   │       └── dashboard.js    → salvar/carregar os dados do dashboard
│   ├── package.json
│   ├── .env.example            → modelo de variáveis de ambiente
│   └── README.md                → detalhes técnicos da API e do banco
└── frontend/                   → site (HTML + CSS + JS separados)
    ├── index.html               → estrutura das telas
    ├── css/style.css            → todo o visual
    ├── js/api.js                → conexão com a API (defina a URL aqui)
    ├── js/dashboard.js          → lógica do dashboard
    ├── js/auth.js               → lógica de login/cadastro/senha
    └── assets/logo.jpg          → logotipo da Ajofer
```

---

## 🛠️ Tecnologias utilizadas

**Backend:** Node.js, Express, PostgreSQL, JWT (`jsonwebtoken`), `bcryptjs`

**Frontend:** HTML5, CSS3, JavaScript puro (sem frameworks), Chart.js e
SheetJS/xlsx via CDN

---

## 🚀 Como rodar localmente

Pré-requisitos: [Node.js 18+](https://nodejs.org) e uma conta gratuita no
[Neon](https://neon.tech) (ou qualquer PostgreSQL).

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env        # depois edite o .env com sua DATABASE_URL e JWT_SECRET
npm run migrate             # cria as tabelas no banco (rodar uma vez)
npm start                   # sobe a API em http://localhost:3000

# 2. Frontend (em outro terminal)
cd frontend
python3 -m http.server 8080 # ou use a extensão "Live Server" do VS Code
# acesse http://localhost:8080
```

O passo a passo completo — do zero, incluindo GitHub, VS Code e deploy
gratuito (Render + Neon + Netlify) — está no arquivo
**[`GUIA-GITHUB-VSCODE.md`](./GUIA-GITHUB-VSCODE.md)**.

---

## 🔐 Variáveis de ambiente (backend)

| Variável          | Descrição                                                        |
|-------------------|--------------------------------------------------------------------|
| `DATABASE_URL`    | String de conexão do PostgreSQL                                   |
| `DATABASE_SSL`    | `true` em produção (Neon/Render exigem SSL); `false` em banco local |
| `JWT_SECRET`      | Texto aleatório e longo usado para assinar os tokens de login      |
| `FRONTEND_ORIGIN` | URL do site publicado, para liberar o CORS                        |
| `PORT`            | Porta da API (padrão `3000`)                                      |

Veja `backend/.env.example` para o modelo completo.

---

## 📡 Endpoints da API

| Método | Rota                         | Autenticação | Descrição                                  |
|--------|-------------------------------|--------------|---------------------------------------------|
| GET    | `/api/health`                 | não          | Verifica se a API está no ar                |
| POST   | `/api/auth/register`          | não          | Cadastra um novo funcionário/login          |
| POST   | `/api/auth/login`             | não          | Login, devolve um token JWT                 |
| POST   | `/api/auth/forgot-password`   | não          | Redefine a senha (confirma login + e-mail)  |
| GET    | `/api/auth/me`                 | sim          | Retorna o usuário logado                    |
| GET    | `/api/dashboard`              | sim          | Retorna o estado atual do dashboard         |
| PUT    | `/api/dashboard`              | sim          | Salva o estado do dashboard                 |

Rotas com "sim" exigem o cabeçalho `Authorization: Bearer <token>`.

---

## ⚠️ Pontos de atenção

- O **cadastro de funcionário é aberto**: qualquer pessoa com acesso ao site
  pode criar um login (é assim que o primeiro acesso é criado). Se quiser
  restringir isso só a administradores, dá para ajustar exigindo token também
  em `/api/auth/register`.
- O **"Esqueci a senha" não envia e-mail de verdade** — ele troca a senha na
  hora, após confirmar login + e-mail cadastrados. Para um fluxo com e-mail
  real, dá para integrar um serviço como Resend ou SendGrid.
- Já existe uma coluna `role` (`admin`/`funcionario`) na tabela de usuários
  para, no futuro, diferenciar permissões.

---

## 📄 Licença

Projeto de uso interno da Transportadora Ajofer.
