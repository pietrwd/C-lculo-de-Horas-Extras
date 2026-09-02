# Backend — Dashboard de Horas Extras (Transportadora Ajofer)

API em Node.js + Express, com banco de dados PostgreSQL, responsável por:
- Login, cadastro de funcionário e "esqueci minha senha" (senhas com hash bcrypt + token JWT);
- Guardar e devolver os dados do dashboard (meses, semanas, lançamentos e logotipo).

O site (arquivo `.html`) chama esta API pela internet — por isso ela precisa estar publicada
em algum lugar com uma URL fixa.

## 1. Rodando localmente (para testar antes de publicar)

Pré-requisitos: Node.js 18+ e um Postgres (local, Docker, ou já na nuvem).

```bash
cd ajofer-backend
npm install
cp .env.example .env
# edite o .env e coloque sua DATABASE_URL, JWT_SECRET, etc.
npm run migrate   # cria as tabelas no banco
npm start         # sobe a API em http://localhost:3000
```

Teste rapidamente:
```bash
curl http://localhost:3000/api/health
```

## 2. Banco de dados gratuito — Neon (recomendado)

1. Crie uma conta em https://neon.tech (tem plano gratuito).
2. Crie um projeto novo, por exemplo "ajofer-dashboard".
3. Copie a "Connection string" (algo como `postgresql://usuario:senha@ep-xxxx.neon.tech/neondb?sslmode=require`).
4. Cole essa string na variável `DATABASE_URL` do seu `.env` (localmente) e depois nas
   variáveis de ambiente do Render (passo 3).

Alternativas gratuitas: Supabase (Database → Connection string) ou o próprio
Postgres gratuito do Render.

## 3. Publicando a API — Render (recomendado, plano free)

1. Suba a pasta `ajofer-backend` para um repositório no GitHub.
2. Em https://render.com, clique em "New +" → "Web Service" e conecte o repositório.
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `DATABASE_URL` → a connection string do Neon/Supabase
     - `DATABASE_SSL` → `true`
     - `JWT_SECRET` → um valor aleatório e longo (gere com `openssl rand -hex 32`)
     - `FRONTEND_ORIGIN` → a URL onde o site (`.html`) vai ficar hospedado, ex:
       `https://ajofer-dashboard.netlify.app` (pode colocar depois de publicar o site)
4. Depois do primeiro deploy, abra um "Shell" do próprio Render (ou rode localmente
   apontando para o mesmo `DATABASE_URL`) e execute `npm run migrate` uma vez, para
   criar as tabelas no banco.
5. Anote a URL pública que o Render gera, por exemplo:
   `https://ajofer-dashboard-backend.onrender.com`

> **Nota sobre o plano gratuito do Render:** o serviço "dorme" depois de alguns
> minutos sem uso e demora ~30-50 segundos para acordar na próxima requisição.
> Para uso interno de uma pequena transportadora isso costuma ser aceitável;
> se incomodar, dá para trocar depois para um plano pago ou outro provedor
> (Railway, Fly.io) sem mudar o código.

## 4. Conectando o site (frontend) a esta API

No arquivo `js/api.js` do frontend, logo no início, existe esta linha:

```js
window.AJOFER_API_BASE = window.AJOFER_API_BASE || 'http://localhost:3000';
```

Troque `'http://localhost:3000'` pela URL pública do seu backend no Render, por
exemplo:

```js
window.AJOFER_API_BASE = window.AJOFER_API_BASE || 'https://ajofer-dashboard-backend.onrender.com';
```

Depois é só publicar a pasta do frontend (Netlify, GitHub Pages, etc.) normalmente.
Veja o `GUIA-GITHUB-VSCODE.md` (na raiz do projeto) para o passo a passo completo,
do zero, usando GitHub + VS Code.

## 5. Estrutura do banco de dados

Veja `src/schema.sql`. Resumo:

- **users**: um registro por funcionário com acesso (nome, e-mail, login, senha
  com hash, papel).
- **dashboard_data**: uma linha única (`workspace_id = 'default'`) guardando todo
  o estado do dashboard (meses/semanas/lançamentos) em uma coluna `JSONB`, mais o
  logotipo customizado. Isso reflete a mesma estrutura de dados que o dashboard já
  usa no navegador — dá para normalizar em tabelas separadas (funcionários, meses,
  semanas, lançamentos) no futuro, se o volume de dados justificar.

## 6. Endpoints da API

| Método | Rota                       | Autenticação | Descrição |
|--------|-----------------------------|--------------|-----------|
| GET    | `/api/health`               | não          | Verifica se a API está no ar |
| POST   | `/api/auth/register`        | não          | Cadastra um novo funcionário/login |
| POST   | `/api/auth/login`           | não          | Login, devolve um token JWT |
| POST   | `/api/auth/forgot-password` | não          | Redefine a senha (confirma login + e-mail) |
| GET    | `/api/auth/me`               | sim          | Retorna o usuário logado (valida o token) |
| GET    | `/api/dashboard`            | sim          | Retorna o estado atual do dashboard |
| PUT    | `/api/dashboard`            | sim          | Salva o estado do dashboard ("Salvar alterações") |

Rotas com "sim" exigem o cabeçalho `Authorization: Bearer <token>`.

## 7. Pontos de atenção / próximos passos possíveis

- **Cadastro de funcionário é aberto**: qualquer pessoa que acesse o site pode
  criar um login (é assim que o primeiro acesso é criado, já que não existe um
  administrador pré-cadastrado). Se quiser restringir isso só a quem já está
  logado, dá para exigir token também no `/api/auth/register` — me avise que eu
  ajusto.
- **"Esqueci a senha" não envia e-mail de verdade**: hoje ela troca a senha assim
  que login + e-mail cadastrados batem. Para enviar um e-mail real com link de
  confirmação, dá para integrar um serviço como Resend ou SendGrid — também é um
  próximo passo natural.
- **Perfis/permissões**: já existe uma coluna `role` (`admin`/`funcionario`) no
  banco, mas hoje todos os logados têm o mesmo acesso. Se quiser, por exemplo,
  que só admins vejam certos dados, dá para usar essa coluna para bloquear rotas.
